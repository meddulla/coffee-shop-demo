# ☕ Bean & Brew — Coffee Shop Demo

A tiny React + Vite + Cloudflare Workers demo app showcasing a modern coffee shop website with ordering, checkout, and feedback functionality. All API endpoints are mocks that echo back submitted data.

## What's inside

- **React SPA** (`src/`) with pages: Home, About, Menu, Order, Checkout, Feedback, Confirmation, 404
- **Worker API** (`src/worker/index.ts`) with `/api/orders`, `/api/checkout`,
  `/api/feedback`
- **Storybook 8** stories for every component and page
- **Vite** builds the SPA to `./dist`, served by Workers Assets
- **Storybook** builds to `./dist/_/storybook` and is served by the same Worker at `/_/storybook/`

## Scripts

```bash
pnpm install
pnpm dev            # wrangler dev (SPA + API together)
pnpm dev:vite       # vite only (no /api/*)
pnpm build          # vite build + storybook build -> ./dist (SPA + /_/storybook)
pnpm build:app      # vite build only (skip storybook)
pnpm typecheck      # tsc --noEmit
pnpm lint           # oxfmt --check + oxlint
pnpm lint:fix       # oxfmt + oxlint --fix
pnpm check          # typecheck + lint (CI entry point)
pnpm storybook      # storybook dev on :6006
pnpm build-storybook
pnpm run deploy     # vite build + wrangler deploy
```

## Form pages

- `/order` — dropdown, radios, checkboxes, textarea, name (required)
- `/checkout` — email, card, expiry, CVC, country, postal code, terms checkbox,
  with inline validation
- `/feedback` — name, email, topic select, rating radios, message textarea
