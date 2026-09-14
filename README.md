# Halstead Veterinary Group — People Analytics Dashboard

Next.js app with a landing page and workforce dashboard for the Halstead synthetic case (People Analytics Bootcamp).

## Run locally

In a terminal **inside this folder**:

```bash
npm install
npm run dev:clean
```

If the page looks unstyled (plain black text, blue links), the CSS bundle did not load. Stop the server (Ctrl+C), run **`npm run dev:clean`**, wait for `Ready`, then hard-refresh the browser (Ctrl+Shift+R).

Wait until you see `Ready` in the terminal, then open **http://127.0.0.1:3000**. Use **Dashboard** on the home page to go to **`/app/dashboard`** (also available at `/dashboard`).

If the page spins or never loads:

1. Confirm `npm run dev` is still running (stop it with Ctrl+C and start again).
2. Use **127.0.0.1** instead of `localhost` in the browser.
3. Keep the project on a local disk if OneDrive sync causes hangs (copy outside OneDrive).

## Stack

- Next.js App Router (`/`, `/dashboard`)
- Tailwind CSS
- Recharts for visuals
- Metrics in `lib/halstead-metrics.ts` (sourced from participant materials)
