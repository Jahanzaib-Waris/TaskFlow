# Deploying TaskFlow to Vercel

TaskFlow deploys as **two separate Vercel projects** pointing at the same
GitHub repo: one for `client` (Vite/React, static + SPA rewrite) and one
for `server` (Express, wrapped as a Vercel serverless function).

## Prerequisites

- A Vercel account connected to this GitHub repo.
- A MongoDB Atlas cluster with **Network Access set to allow 0.0.0.0/0**
  (all IPs) — Vercel serverless functions run on rotating IPs, so you
  can't allowlist a fixed address.

## What's already set up in the repo

- `server/app.js` — the Express app (middleware, routes, error handling).
- `server/server.js` — local dev only (`npm run dev`), calls `app.listen`.
- `server/api/index.js` — the Vercel serverless entry point; imports the
  same Express app and connects to MongoDB per invocation (connection is
  cached across warm invocations in `server/config/db.js`).
- `server/vercel.json` — rewrites all incoming requests to that function.
- `client/vercel.json` — SPA rewrite so deep links like `/projects/:id`
  don't 404 on refresh.
- CORS in `server/app.js` reads `CLIENT_URL` from the environment and
  locks down to that origin in production (falls back to `*` if unset,
  which is what local dev uses).

## 1. Deploy the server

1. Vercel dashboard → **New Project** → import this repo.
2. **Root Directory**: `server`.
3. Framework preset: **Other** (no build command needed — it's a plain
   Node/Express app).
4. Environment variables:
   - `MONGO_URI` — your Atlas connection string.
   - `JWT_SECRET` — a long random string.
   - `CLIENT_URL` — leave this blank for now; you'll fill it in after
     step 2.
5. Deploy. Note the resulting URL, e.g. `https://taskflow-server.vercel.app`.

## 2. Deploy the client

1. Vercel dashboard → **New Project** → same repo again.
2. **Root Directory**: `client`.
3. Framework preset: **Vite** (auto-detected).
4. Environment variable:
   - `VITE_API_URL` = `https://taskflow-server.vercel.app/api` (the
     server URL from step 1, with `/api` appended).
5. Deploy. Note the client URL, e.g. `https://taskflow-client.vercel.app`.

## 3. Close the CORS loop

Go back to the **server** project's environment variables, set
`CLIENT_URL` to the client's actual Vercel URL from step 2, and
redeploy the server so CORS allows requests from it.

## Notes

- Preview deployments (per-branch/PR URLs) will get a different origin
  than `CLIENT_URL` and will be blocked by CORS. For a portfolio project
  this is an acceptable tradeoff — if you need preview deploys to work
  against the API too, loosen `CLIENT_URL` to a regex/allowlist instead
  of a single origin.
- Local development is unaffected by any of this: `npm run dev` in both
  `client/` and `server/` still works exactly as before, using your
  local `.env` files.
