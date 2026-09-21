# GHAFRA Dashboard

The admin dashboard is a React 19, TypeScript, and Vite application. It uses
Supabase authentication and calls the GHAFRA backend API.

## Requirements and setup

- Node.js 20+
- npm

```bash
cd dashboard
cp .env.example .env
# Set the Google OAuth client ID, API URL, and Supabase public values.
npm ci
npm run dev
```

Open `http://localhost:5173`. Google OAuth must allow that origin, and the
backend must be running at `VITE_API_URL`.

## Commands

```bash
npm run dev
npm run build
npm run lint
npm run preview
```

`npm ci` uses the committed lockfile and does not add new dependencies.

## Environment

See `.env.example` for:

- `VITE_API_URL`
- `VITE_GOOGLE_CLIENT_ID`
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

Only public browser values belong in this file. Do not expose backend service
keys, Stripe secrets, or Firebase private keys.

