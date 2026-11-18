// Gets a Spotify refresh token via the Authorization Code flow and saves it to .env.
//
// One-time setup: add http://127.0.0.1:5173/callback as a Redirect URI in your app's
// settings at https://developer.spotify.com/dashboard.
// Port 5173 is also Vite's dev port, so stop `pnpm run dev` before running this.
//
// Usage: pnpm run spotify:token
// Reads SPOTIFY_CLIENT_ID and SPOTIFY_CLIENT_SECRET from .env.

import { execFile } from 'node:child_process';
import { randomBytes } from 'node:crypto';
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { createServer } from 'node:http';

const ENV_PATH = '.env';
const PORT = 5173;
const REDIRECT_URI = `http://127.0.0.1:${PORT}/callback`;
const SCOPES = [
  'playlist-read-private',
  'playlist-read-collaborative',
  'user-top-read',
  'user-read-recently-played',
  'user-library-read',
  'user-read-currently-playing',
  'user-read-playback-state',
];

if (existsSync(ENV_PATH)) process.loadEnvFile(ENV_PATH);

const { SPOTIFY_CLIENT_ID: clientId, SPOTIFY_CLIENT_SECRET: clientSecret } = process.env;
if (!clientId || !clientSecret) {
  console.error('Missing SPOTIFY_CLIENT_ID or SPOTIFY_CLIENT_SECRET in .env');
  process.exit(1);
}

const state = randomBytes(16).toString('hex');
const authorizeUrl =
  'https://accounts.spotify.com/authorize?' +
  new URLSearchParams({
    client_id: clientId,
    response_type: 'code',
    redirect_uri: REDIRECT_URI,
    scope: SCOPES.join(' '),
    state,
    show_dialog: 'true',
  });

async function exchangeCode(code) {
  const res = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      Authorization: `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString('base64')}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'authorization_code',
      code,
      redirect_uri: REDIRECT_URI,
    }),
  });
  const body = await res.json();
  if (!res.ok || !body.refresh_token) {
    throw new Error(
      `Token exchange failed (${res.status}): ${body.error_description ?? body.error}`,
    );
  }
  return body.refresh_token;
}

function saveToEnv(token) {
  const line = `SPOTIFY_REFRESH_TOKEN=${token}`;
  const current = existsSync(ENV_PATH) ? readFileSync(ENV_PATH, 'utf8') : '';
  const next = /^SPOTIFY_REFRESH_TOKEN=.*$/m.test(current)
    ? current.replace(/^SPOTIFY_REFRESH_TOKEN=.*$/m, line)
    : `${current}${current && !current.endsWith('\n') ? '\n' : ''}${line}\n`;
  writeFileSync(ENV_PATH, next);
}

const server = createServer(async (req, res) => {
  const url = new URL(req.url ?? '/', REDIRECT_URI);
  if (url.pathname !== '/callback') {
    res.writeHead(404).end();
    return;
  }

  const finish = (status, message, exitCode) => {
    res.writeHead(status, { 'Content-Type': 'text/plain' }).end(message);
    server.close();
    process.exitCode = exitCode;
  };

  if (url.searchParams.get('state') !== state) {
    finish(400, 'State mismatch, try again.', 1);
    console.error('State mismatch in callback.');
    return;
  }
  const error = url.searchParams.get('error');
  const code = url.searchParams.get('code');
  if (error || !code) {
    finish(400, `Authorization failed: ${error ?? 'no code'}`, 1);
    console.error(`Authorization failed: ${error ?? 'no code'}`);
    return;
  }

  try {
    const token = await exchangeCode(code);
    saveToEnv(token);
    finish(200, 'Done! Refresh token saved to .env. You can close this tab.', 0);
    console.log('\nRefresh token saved to .env as SPOTIFY_REFRESH_TOKEN.');
    console.log('Remember to update it in Netlify environment variables too.');
  } catch (err) {
    finish(500, 'Token exchange failed, see terminal.', 1);
    console.error(err instanceof Error ? err.message : err);
  }
});

server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`Port ${PORT} is in use (is the dev server running?). Stop it and retry.`);
  } else {
    console.error(err.message);
  }
  process.exit(1);
});

server.listen(PORT, '127.0.0.1', () => {
  console.log('Opening Spotify authorization in your browser...');
  console.log(`If it does not open, visit:\n${authorizeUrl}\n`);
  const opener =
    process.platform === 'darwin' ? 'open' : process.platform === 'win32' ? 'explorer' : 'xdg-open';
  execFile(opener, [authorizeUrl], () => {});
});
