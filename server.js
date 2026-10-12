import 'dotenv/config';
import express from 'express';
import nodemailer from 'nodemailer';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const app = express();
const root = path.dirname(fileURLToPath(import.meta.url));
const port = Number(process.env.API_PORT || process.env.PORT || 3000);

app.use(express.json({ limit: '20kb' }));

app.get('/api/health', (_req, res) => res.json({ ok: true }));

app.post('/api/leads', async (req, res) => {
  const { name, company, email, phone, industry, equipmentType, message } = req.body || {};
  const required = [name, company, email, phone, message];
  if (!required.every((value) => typeof value === 'string' && value.trim()) ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
      required.some((value) => value.length > 2000)) {
    return res.status(400).json({ error: 'Please provide valid contact details and inquiry information.' });
  }

  const { GMAIL_USER, GMAIL_APP_PASSWORD, INQUIRY_TO } = process.env;
  if (!GMAIL_USER || !GMAIL_APP_PASSWORD || !INQUIRY_TO) {
    console.error('Inquiry email is not configured. Set GMAIL_USER, GMAIL_APP_PASSWORD, and INQUIRY_TO.');
    return res.status(503).json({ error: 'Inquiry email is not configured yet. Please contact us directly.' });
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

if (process.env.NODE_ENV !== 'development') {
  app.use(express.static(path.join(root, 'dist')));
  app.get('*', (_req, res) => res.sendFile(path.join(root, 'dist', 'index.html')));
}

app.listen(port, () => console.log(`Inquiry backend listening on port ${port}`));
