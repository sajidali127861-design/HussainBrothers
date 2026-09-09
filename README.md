# Hussain Brothers — Skardu Dry Fruits & Natural Products

A frontend-only ecommerce website MVP. No backend, no login, no online payments —
customers browse, build a cart, and confirm orders directly on WhatsApp.

## Tech stack

- React 18 + TypeScript
- Vite
- Tailwind CSS
- React Router
- lucide-react icons
- Cart persisted with `localStorage` (no backend)

## Getting started

```bash
npm install
npm run dev
```

Open the printed local URL (usually `http://localhost:5173`).

## Build for production

```bash
npm run build
npm run preview   # optional: preview the production build locally
```

The production files are output to `dist/`. You can deploy `dist/` to any static
host (Vercel, Netlify, GitHub Pages, cPanel, etc.).

## Before you launch — things to configure

1. **WhatsApp number** — open `src/config/business.ts` and set:
   ```ts
   export const WHATSAPP_NUMBER = '923XXXXXXXXX'; // your real number, country code, no + or spaces
   ```
   This is the only place the number needs to change; every WhatsApp link in the
   app reads from here.

2. **Contact details** — update `phone`, `email`, `location` and `hours` in the
   same `src/config/business.ts` file.

3. **Products** — edit `src/data/products.ts`. Each product has `id`, `name`,
   `slug`, `description`, `category`, `origin`, `images`, `featured` and
   `variants` (weight/price/stock). Add, remove or edit products freely — the
   whole site (Shop, Categories, Home, Product pages) reads from this one file.

4. **Product images** — the catalogue currently uses generated placeholder
   images (via placehold.co) so the site works out of the box. Replace the
   `images` array of each product with real photo URLs (or files placed in
   `public/` and referenced as `/your-image.jpg`) before launch.

5. **Logo** — the header/footer currently use a text-based logo (`src/components/common/Logo.tsx`).
   If you have a real Hussain Brothers logo file, drop it in `src/assets/` and
   swap the icon markup in `Logo.tsx` for an `<img>` tag.

## Project structure

```
src/
├── components/
│   ├── layout/       Header, Footer, Layout wrapper
│   ├── common/        Logo, SEO, EmptyState, QuantitySelector, WhatsApp button
│   ├── product/       ProductCard, ProductGrid, CategoryCard
│   └── cart/          CartLineItem
├── pages/              One file per route (Home, Shop, Categories, ProductDetails,
│                        Cart, Checkout, OrderSuccess, About, Contact, NotFound)
├── data/products.ts     Product catalogue (swap for an API later)
├── types/index.ts        Shared TypeScript types
├── hooks/useCart.ts       Core cart logic (add/remove/update/clear/totals)
├── context/               CartContext + ToastContext (app-wide state)
├── utils/whatsapp.ts       Order-message builder + wa.me URL builder
├── utils/currency.ts        PKR price formatting
└── config/business.ts        WhatsApp number, contact info — single source of truth
```

## How ordering works

Shop → Cart → Checkout (name, phone, city, address, optional note, all validated)
→ "Confirm Order" opens WhatsApp with a pre-filled, formatted order message →
the customer presses Send in WhatsApp themselves (nothing is sent automatically)
→ Order Success page confirms what to do next.

## Future backend migration

This MVP is intentionally structured so a FastAPI backend can later replace
`src/data/products.ts` with real API calls, and the same component/page
structure can stay mostly unchanged — only the data-fetching layer changes.

## A note on this build

This project was generated in an offline sandbox without access to the npm
registry, so `npm install` / `npm run build` could not be executed here to
verify a clean compile. The code was written and manually reviewed carefully
(imports, types, Tailwind classes, icon names), but please run:

```bash
npm install
npm run build
```

after downloading, and let me know if you hit any errors — I can fix them
immediately.
