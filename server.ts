import 'dotenv/config';
import express, { Request, Response } from 'express';
import nodemailer from 'nodemailer';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createServer as createViteServer } from 'vite';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const GOOGLE_SCRIPT_URL =
  process.env.GOOGLE_SCRIPT_URL ||
  'https://script.google.com/macros/s/AKfycbzpJli31wtDGHGRJKkwxm2fWfv86XV9ynWDs95qgkX3G8-SSF7c7xzUQ1kfOCUzej2_Cg/exec';

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: '20kb' }));

  // Health check endpoint
  app.get('/api/health', (_req: Request, res: Response) => {
    res.json({ ok: true });
  });

  // RFQ and Lead generation endpoint
  app.post('/api/leads', async (req: Request, res: Response) => {
    const { name, company, email, phone, industry, equipmentType, message } = req.body || {};
    const required = [name, company, email, phone, message];
    if (
      !required.every((value) => typeof value === 'string' && value.trim()) ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
      required.some((value) => value.length > 2000)
    ) {
      return res.status(400).json({ error: 'Please provide valid contact details and inquiry information.' });
    }

    // Forward lead payload to configured Google Apps Script Web App
    try {
      const gasParams = new URLSearchParams({
        name: name.trim(),
        email: email.trim(),
        mobile: phone.trim(),
        phone: phone.trim(),
        organization: company.trim(),
        company: company.trim(),
        message: message.trim(),
        timestamp: new Date().toISOString(),
      });

      fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: gasParams.toString(),
        redirect: 'follow',
      }).catch((err) => console.warn('Google Apps Script forward notice:', err.message));
    } catch (scriptErr) {
      console.warn('Google Script dispatch notice:', scriptErr);
    }

    const { GMAIL_USER, GMAIL_APP_PASSWORD, INQUIRY_TO } = process.env;
    const isConfigured =
      typeof GMAIL_USER === 'string' &&
      typeof GMAIL_APP_PASSWORD === 'string' &&
      typeof INQUIRY_TO === 'string' &&
      !GMAIL_USER.includes('your-address') &&
      !GMAIL_APP_PASSWORD.includes('your-16-character');

    if (!isConfigured) {
      console.warn('Inquiry email credentials are placeholders or not configured. Captured lead:', {
        name,
        company,
        email,
        phone,
        industry,
        equipmentType,
      });
      return res.status(201).json({
        ok: true,
        note: 'Lead captured successfully (email dispatch awaiting real credentials in environment).',
      });
    }

    try {
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: { user: GMAIL_USER, pass: GMAIL_APP_PASSWORD },
      });
      const details = [
        `Name: ${name.trim()}`,
        `Company: ${company.trim()}`,
        `Email: ${email.trim()}`,
        `Phone: ${phone.trim()}`,
        `Industry: ${String(industry || '').trim()}`,
        `Equipment: ${String(equipmentType || '').trim()}`,
        '',
        'Application details:',
        message.trim(),
      ].join('\n');

      await transporter.sendMail({
        from: GMAIL_USER,
        to: INQUIRY_TO,
        replyTo: email.trim(),
        subject: `Website inquiry from ${company.trim()} — ${name.trim()}`,
        text: details,
      });
      return res.status(201).json({ ok: true });
    } catch (error) {
      console.error('Could not send inquiry email:', error);
      return res.status(502).json({ error: 'We could not send your inquiry. Please try again or contact us directly.' });
    }
  });

  // In development, hook Vite middleware directly for HMR and SPA serving
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    // In production, serve the built static dist directory
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server listening at http://0.0.0.0:${PORT}`);
  });
}

startServer();
