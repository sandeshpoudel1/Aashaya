# Invitation

Digital wedding invitation for Sahana & Sandesh, built with TanStack Start, React, and Tailwind CSS.
Nepali and English (switchable, Nepali default), light and dark looks (switchable, light default).

All content lives in `src/config/invitation.ts`.

## Development

Requires [Bun](https://bun.sh).

```sh
bun install
bun run dev      # http://localhost:8080
```

## Deploy to Vercel

The build targets Vercel directly (Nitro `vercel` preset writes `.vercel/output`), so no `vercel.json` is needed.

1. Push this repo to GitHub.
2. In Vercel: **Add New Project**, import `invitation`. Keep the detected settings:
   - Install command: `bun install`
   - Build command: `bun run build`
3. Deploy.

The link preview image (WhatsApp, Messenger) uses the production URL automatically.
For a custom domain, add an environment variable `SITE_URL` (e.g. `https://sahana-sandesh.com`) and redeploy.

## Scripts

- `bun run build` builds for production
- `bun run lint` runs ESLint
- `bun run test` runs Vitest
