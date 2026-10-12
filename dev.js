import { spawn } from 'node:child_process';
import process from 'node:process';

const env = { ...process.env, NODE_ENV: 'development' };
const api = spawn(process.execPath, ['server.js'], { stdio: 'inherit', env: { ...env, API_PORT: '3001' } });
const vite = spawn(process.execPath, ['node_modules/vite/bin/vite.js', '--host', '0.0.0.0'], { stdio: 'inherit', env });

for (const child of [api, vite]) child.on('exit', (code) => {
  if (code && code !== 0) process.exitCode = code;
});
for (const signal of ['SIGINT', 'SIGTERM']) process.on(signal, () => {
  api.kill(signal);
  vite.kill(signal);
});
