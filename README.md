# Hussain Brothers — Skardu Dry Fruits & Natural Products

> **Read this file before making changes.** It exists so that any developer —
> human or AI — can understand this project's structure, conventions, and
> "single source of truth" files in under five minutes, without having to
> read every line of code first.

A frontend-only ecommerce website MVP. There is **no backend, no database,
no login, and no online payment gateway**. Customers browse products, build
a cart (saved in the browser), fill in a checkout form, and the site opens
WhatsApp with a pre-filled order message for them to send manually.

---

## 1. Tech stack

| Layer | Technology | Notes |
|---|---|---|
| UI framework | **React 18** (function components + hooks only, no class components) | |
| Language | **TypeScript** (strict mode on) | `noUnusedLocals` and `noUnusedParameters` are enabled in `tsconfig.json` — unused imports/variables will fail `npm run build` |
| Build tool | **Vite 5** | Dev server + production bundler |
| Styling | **Tailwind CSS 3** (utility classes only, no CSS-in-JS) | Custom design tokens defined in `tailwind.config.ts` |
| Routing | **React Router 6** (`react-router-dom`), client-side only | See `src/App.tsx` for the route table |
| Icons | **lucide-react** | Tree-shakeable icon components, e.g. `import { Leaf } from 'lucide-react'` |
| State/persistence | **React Context + `localStorage`** | No Redux, no Zustand, no external state library |
| Data | Static TypeScript files (`src/data/`) | No API calls anywhere in the app |

No backend, no ORM, no database, no auth library, no payment SDK are used
anywhere in this codebase. If you see a request to add one of those, that is
a new feature, not a bug fix.

---

## 2. The two "single source of truth" files

These two files exist specifically so that **most future edits require
touching only one file**, not every screen. Always check here first before
editing a component.

### `src/config/business.ts` — contact info & WhatsApp number
Holds `WHATSAPP_NUMBER`, phone, email, location, business hours, and the
delivery note shown at checkout. Every screen that shows a phone number or
WhatsApp link imports from here — none of it is duplicated inline.

### `src/data/media.ts` — every image on the site
Holds three exported maps:
- `PRODUCT_IMAGES: Record<slug, string[]>` — product photos, keyed by the
  product's `slug` (see `src/data/products.ts`)
- `CATEGORY_IMAGES: Record<categoryName, string>` — category cover photos
- `STORY_IMAGES` — the Home page "Skardu story" images and the About page
  hero image

`src/data/products.ts` reads from this file via a small `imagesFor(slug,
label)` helper — it never hardcodes an image URL itself. If a product or
category is missing from `media.ts`, `getFallbackImage()` generates a
labelled placeholder automatically so the site never breaks from a missing
image.

**Rule for future work: never write an image URL directly inside a
component or page. Add it to `media.ts` and reference it from there.**

### `tailwind.config.ts` — every color on the site
All brand colors are defined once, as named Tailwind tokens, inside
`tailwind.config.ts` → `theme.extend.colors`:

| Token | Used for |
|---|---|
| `pine` (50–950, plus `DEFAULT`) | Primary dark green — text, buttons, header/footer backgrounds |
| `gold` (50–900, plus `DEFAULT`) | Accent color — CTAs, badges, highlights |
| `cream` (50–400, plus `DEFAULT`) | Background / off-white tones |
| `whatsapp` (`DEFAULT`, `dark`) | WhatsApp-brand green used on WhatsApp buttons only |
| `ink` | Default body text color |

Every component uses these as Tailwind utility classes — e.g. `bg-pine-700`,
`text-gold-500`, `bg-whatsapp hover:bg-whatsapp-dark`. **There should be
zero raw hex codes (`#1F7A5C`, `bg-[#...]`, etc.) anywhere inside
`src/`.** If you ever see one, it's a bug — either it belongs in
`tailwind.config.ts` as a token, or the existing token should be reused.

**To re-theme the entire site (e.g. switch from green/gold to blue/silver):**
edit the hex values inside `tailwind.config.ts` → `colors.pine` /
`colors.gold` / etc. Every screen updates automatically because every
component references the token name, never a literal color.

---

## 3. Folder structure

```
src/
├── main.tsx                 App entry point — wraps App in Router, CartProvider, ToastProvider
├── App.tsx                   Route table (React Router) + scroll-to-top on navigation
├── index.css                 Tailwind layers + shared component classes (.btn-primary, .card, etc.)
│
├── config/
│   └── business.ts            WhatsApp number, phone, email, location, hours, delivery note
│
├── data/
│   ├── products.ts             Product catalogue (14 sample products) + CATEGORIES list
│   └── media.ts                 ALL image URLs — see section 2 above
│
├── types/
│   └── index.ts                  Shared TypeScript types: Product, ProductVariant, CartItem,
│                                   CustomerDetails, Category, SortOption
│
├── hooks/
│   └── useCart.ts                  Core cart logic: addToCart, removeFromCart, updateQuantity,
│                                     clearCart, getCartTotal, getCartItemCount. Persists to
│                                     localStorage under the key `hb_cart_v1`.
│
├── context/
│   ├── CartContext.tsx              Wraps useCart() in a React Context so any component can
│                                      call useCart() without prop drilling
│   └── ToastContext.tsx              Small toast/notification system (e.g. "Added to cart")
│
├── utils/
│   ├── currency.ts                   formatPrice() — formats numbers as "Rs 1,200"
│   └── whatsapp.ts                    buildOrderMessage(), buildWhatsAppUrl(), openWhatsApp(),
│                                       buildProductInquiryMessage() — all WhatsApp message/URL
│                                       logic lives here, nowhere else
│
├── components/
│   ├── layout/
│   │   ├── Header.tsx                  Responsive nav: desktop links, mobile hamburger, cart
│   │   │                                icon with item-count badge
│   │   ├── Footer.tsx                   Logo, nav links, category links, contact info, WhatsApp CTA
│   │   └── Layout.tsx                   Wraps every page: Header + <main> + Footer + floating
│   │                                      WhatsApp button
│   ├── common/
│   │   ├── Logo.tsx                      Text-based logo lockup (swap for <img> if a real logo
│   │   │                                  file is added later)
│   │   ├── SEO.tsx                        Sets document.title + meta description per page
│   │   ├── EmptyState.tsx                  Generic "nothing here" block (empty cart, no search
│   │   │                                    results, 404, etc.)
│   │   ├── QuantitySelector.tsx             +/- stepper control (cart & product page)
│   │   └── WhatsAppFloatButton.tsx           Fixed floating WhatsApp button, shown on every page
│   ├── product/
│   │   ├── ProductCard.tsx                    Product grid card (image, price, quick "add to
│   │   │                                       cart") — used on Home + Shop + related products
│   │   ├── ProductGrid.tsx                     Grid wrapper: loading skeletons + empty state
│   │   └── CategoryCard.tsx                     Category tile with cover photo (Home + Categories)
│   └── cart/
│       └── CartLineItem.tsx                      One row in the Cart page: image, weight,
│                                                   quantity stepper, remove button
│
└── pages/                                          One file per route — see section 4 below
    ├── Home.tsx
    ├── Shop.tsx
    ├── Categories.tsx
    ├── ProductDetails.tsx
    ├── Cart.tsx
    ├── Checkout.tsx
    ├── OrderSuccess.tsx
    ├── About.tsx
    ├── Contact.tsx
    └── NotFound.tsx
```

---

## 4. Every screen and what it does

| Route | File | What it does |
|---|---|---|
| `/` | `pages/Home.tsx` | Hero (headline + "Shop Now" + "Order on WhatsApp" CTAs), featured products grid, category tiles, "why choose us" trust points, Skardu story section with real photography, bottom CTA banner. |
| `/shop` | `pages/Shop.tsx` | Full product catalogue. Debounced search box, category filter sidebar, sort dropdown (featured / price asc / price desc / name), all synced to the URL query string (`?category=...&q=...&sort=...`) so links/filters are shareable. |
| `/categories` | `pages/Categories.tsx` | Grid of all 6 category tiles; each links to `/shop?category=X`. |
| `/product/:slug` | `pages/ProductDetails.tsx` | Image gallery, weight/variant picker (updates price live), quantity stepper, "Add to Cart" + "Order on WhatsApp" buttons, related products from the same category. Redirects to `/shop` if the slug doesn't exist. |
| `/cart` | `pages/Cart.tsx` | Lists cart line items (via `CartLineItem`), subtotal, delivery note, "Proceed to Checkout" button. Shows an empty-state if the cart has nothing in it. |
| `/checkout` | `pages/Checkout.tsx` | Customer form (name, phone, city, address, optional note) with inline validation. Order summary panel shows a stacked 3-photo preview + a thumbnail per line item + subtotal. On submit: validates → builds the WhatsApp message via `buildOrderMessage()` → opens WhatsApp via `openWhatsApp()` → clears the cart → redirects to `/order-success`. Redirects to `/cart` if the cart is empty. |
| `/order-success` | `pages/OrderSuccess.tsx` | Confirms the WhatsApp message was generated and tells the customer to press Send in WhatsApp. "Open WhatsApp again" + "Continue Shopping" buttons. |
| `/about` | `pages/About.tsx` | Brand story, "our values" grid, hero photo. |
| `/contact` | `pages/Contact.tsx` | WhatsApp / phone / email / location / hours, each as a clickable card, plus a prominent "Chat on WhatsApp" panel. |
| `*` (any unmatched route) | `pages/NotFound.tsx` | 404 empty-state with a link back home. |

---

## 5. How the WhatsApp order flow works (important — don't re-architect this without reason)

1. Customer adds items to cart (`useCart` → `addToCart`) — saved to
   `localStorage` immediately via a `useEffect` inside `hooks/useCart.ts`.
2. On `/checkout`, the form is validated client-side (see `validate()` in
   `Checkout.tsx` — checks name length, phone digit count, city presence,
   address length).
3. On successful validation, `utils/whatsapp.ts` → `buildOrderMessage()`
   turns the cart + customer details into the exact plain-text message
   format requested by the client (Assalam o Alaikum greeting → customer
   details → itemised order → subtotal → optional note → thank you).
4. `openWhatsApp()` builds a `https://wa.me/<number>?text=<encoded message>`
   URL (number comes from `config/business.ts` → `WHATSAPP_NUMBER`) and
   opens it in a new tab via `window.open`.
5. **Nothing is sent automatically** — the customer must press Send inside
   WhatsApp themselves. This is intentional (client requirement), don't add
   auto-send behaviour.
6. Cart is cleared and the user is routed to `/order-success`.

---

## 6. State management model

- **Cart** — `hooks/useCart.ts` is the only place cart logic lives. It's
  exposed app-wide via `context/CartContext.tsx` (`useCart()` hook). Backed
  by `localStorage` key `hb_cart_v1`. There is no server sync — this is
  intentionally local-only per the MVP scope.
- **Toasts** — `context/ToastContext.tsx` exposes `useToast().showToast(msg)`
  for lightweight confirmation messages (e.g. "Added to cart"). Auto-dismiss
  after ~3.2s.
- **Everything else** (search text, filters, form fields, selected variant,
  quantity) is local `useState` inside the page/component that needs it. Shop
  page filters are additionally synced to the URL via `useSearchParams`.

There is no global app-wide state library and none should be introduced
without a real need — Context + localStorage is sufficient for this app's
scope.

---

## 7. Known intentional limitations (do not treat these as bugs)

- No backend, no database, no user accounts — by design, this is a frontend
  MVP. See the "IMPORTANT BUSINESS RULE" note in the original spec: a
  FastAPI backend may replace `src/data/products.ts` in a **future** phase,
  which is why the folder structure keeps data/types/services conceptually
  separate already.
- No online payment — orders are confirmed via WhatsApp only.
- The Shilajit product currently uses a styled placeholder image (no
  freely-licensed real photo was available at build time) — see the comment
  directly above `'pure-skardu-shilajit'` in `src/data/media.ts`.
- A few other products (pine nuts, walnut kernels, dried figs, dried
  mulberries, walnut oil) currently reuse a visually-similar real photo as a
  stand-in, also flagged inline in `media.ts`.

---

## 8. Common issues & how to fix them

| Symptom | Likely cause | Fix |
|---|---|---|
| `npm run build` fails with "'X' is declared but never used" | `noUnusedLocals`/`noUnusedParameters` in `tsconfig.json` caught a stray import | Remove the unused import/variable, or use it |
| A page shows a 404 / blank content for `/some-path` after deploying | Client-side routing needs a rewrite rule on the host | Make sure `vercel.json` (rewrites `/(.*)` → `/index.html`) is present and deployed |
| Colors look wrong after an edit | A component used a raw hex value instead of a Tailwind token | Search for `#` inside `src/` (excluding `data/media.ts`) — there should be none. Add a token to `tailwind.config.ts` instead |
| An image doesn't update after editing `media.ts` | Dev server needs a moment to hot-reload, or the slug/category name doesn't match exactly | Double-check the `slug` in `media.ts` matches the product's `slug` in `products.ts` exactly (case-sensitive) |
| WhatsApp opens with the wrong number | `WHATSAPP_NUMBER` not updated | Edit `src/config/business.ts` — it's the only place this value is defined |
| Cart items "disappear" between visits | Browser in private/incognito mode, or `localStorage` cleared | Expected behavior — cart is device/browser-local only, not synced to any server |

---

## 9. Getting started

```bash
npm install
npm run dev        # start local dev server (usually http://localhost:5173)
npm run build      # type-check (tsc -b) + production build to dist/
npm run preview    # preview the production build locally
```

## 10. Before launching

1. Set the real WhatsApp number in `src/config/business.ts`.
2. Update contact details in the same file.
3. Replace placeholder/stand-in images in `src/data/media.ts` with real
   product photography (see inline comments in that file for exactly which
   ones still need it).
4. If a real logo file becomes available, swap the icon markup in
   `src/components/common/Logo.tsx` for an `<img>` tag.
5. Run `npm run build` one final time to confirm a clean compile before
   deploying.

## 11. Deployment

This is a static site (Vite build output in `dist/`) — deployable to
Vercel, Netlify, GitHub Pages, or any static host. A `vercel.json` is
included with a SPA rewrite rule so client-side routes (e.g. `/shop`,
`/product/almonds`) don't 404 on refresh. If deploying elsewhere, add an
equivalent "redirect all routes to index.html" rule for that host.
