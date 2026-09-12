/**
 * ─────────────────────────────────────────────────────────────────────────
 *  CENTRAL IMAGE LIBRARY
 * ─────────────────────────────────────────────────────────────────────────
 *  This is the ONLY file you need to touch to change any image on the
 *  website — product photos, category covers, or the story/hero photos
 *  on Home and About. Nothing in the UI components needs to change.
 *
 *  HOW TO REPLACE AN IMAGE WITH YOUR OWN PHOTO
 *  1. Put your photo file in `public/images/` (create the folder if needed),
 *     e.g. public/images/almonds-1.jpg
 *  2. Replace the matching URL below with '/images/almonds-1.jpg'
 *     (a leading slash + the path inside `public/`).
 *  3. Save. That's it — every page using that image updates automatically.
 *
 *  You can also just paste in any other image URL (from your own CDN,
 *  Google Drive public link, etc.) — anything that is a direct link to
 *  an image file will work.
 * ─────────────────────────────────────────────────────────────────────────
 */

/** Small helper so every photo gets a consistent square crop + good quality. */
const unsplash = (photoId: string, params = 'q=80&w=900&h=900&fit=crop&auto=format') =>
  `https://images.unsplash.com/${photoId}?${params}`;

const placeholder = (label: string, bg: string) =>
  `https://placehold.co/800x800/${bg}/FAF6EC?font=playfair-display&text=${encodeURIComponent(label)}`;

/**
 * PRODUCT IMAGES — keyed by product `slug` (see src/data/products.ts).
 * Each product can have 1 or more images (first one is used as the
 * primary/card image; the rest show as a gallery on the product page).
 */
export const PRODUCT_IMAGES: Record<string, string[]> = {
  'premium-mamra-almonds': [
    unsplash('photo-1641430470762-13c3489762e7'),
    unsplash('photo-1641430470762-13c3489762e7', 'q=80&w=900&h=900&fit=crop&auto=format&flip=h'),
  ],
  'kaghzi-walnuts': [
    unsplash('photo-1524593000379-d4729b2c4f99'),
    unsplash('photo-1524593000379-d4729b2c4f99', 'q=80&w=900&h=900&fit=crop&auto=format&flip=h'),
  ],
  'sun-dried-skardu-apricots': [
    unsplash('photo-1610401882421-f05386f4dfc5'),
    unsplash('photo-1610401882421-f05386f4dfc5', 'q=80&w=900&h=900&fit=crop&auto=format&flip=h'),
  ],
  'apricot-kernels': [
    unsplash('photo-1610401882421-f05386f4dfc5', 'q=80&w=900&h=900&fit=crop&auto=format&sat=-20'),
    unsplash('photo-1610401882421-f05386f4dfc5', 'q=80&w=900&h=900&fit=crop&auto=format&sat=-20&flip=h'),
  ],
  'roasted-salted-pistachios': [
    unsplash('photo-1551238875-13b9d38454db'),
    unsplash('photo-1551238875-13b9d38454db', 'q=80&w=900&h=900&fit=crop&auto=format&flip=h'),
  ],
  'whole-cashews-w240': [
    unsplash('photo-1573555657105-47a0bb37c3ea'),
    unsplash('photo-1573555657105-47a0bb37c3ea', 'q=80&w=900&h=900&fit=crop&auto=format&flip=h'),
  ],
  'pure-skardu-shilajit': [
    '/images/shailajit_one.jpg',
    '/images/shilajit_two.jpg',
  
  ],
  'golden-raisins-kishmish': [
    unsplash('photo-1691657917109-c6e027eac44a'),
    unsplash('photo-1691657917109-c6e027eac44a', 'q=80&w=900&h=900&fit=crop&auto=format&flip=h'),
  ],
  'dried-mulberries': [
    unsplash('photo-1691657917109-c6e027eac44a', 'q=80&w=900&h=900&fit=crop&auto=format&sat=-15'),
    unsplash('photo-1691657917109-c6e027eac44a', 'q=80&w=900&h=900&fit=crop&auto=format&sat=-15&flip=h'),
  ],
  'pine-nuts-chilghoza': [
    unsplash('photo-1524593000379-d4729b2c4f99', 'q=80&w=900&h=900&fit=crop&auto=format&sat=-10'),
    unsplash('photo-1524593000379-d4729b2c4f99', 'q=80&w=900&h=900&fit=crop&auto=format&sat=-10&flip=h'),
  ],
  'walnut-kernels': [
    unsplash('photo-1524593000379-d4729b2c4f99', 'q=80&w=900&h=900&fit=crop&auto=format&flip=h'),
    unsplash('photo-1524593000379-d4729b2c4f99', 'q=80&w=900&h=900&fit=crop&auto=format'),
  ],
  'wild-forest-honey': [
    unsplash('photo-1568657704598-602700bd9694'),
    unsplash('photo-1568657704598-602700bd9694', 'q=80&w=900&h=900&fit=crop&auto=format&flip=h'),
  ],
  'cold-pressed-walnut-oil': [
    unsplash('photo-1568657704598-602700bd9694', 'q=80&w=900&h=900&fit=crop&auto=format&sat=-30'),
    unsplash('photo-1568657704598-602700bd9694', 'q=80&w=900&h=900&fit=crop&auto=format&sat=-30&flip=h'),
  ],
  'dried-fig-anjeer': [
    unsplash('photo-1610401882421-f05386f4dfc5', 'q=80&w=900&h=900&fit=crop&auto=format&flip=h'),
    unsplash('photo-1610401882421-f05386f4dfc5', 'q=80&w=900&h=900&fit=crop&auto=format&sat=-10&flip=h'),
  ],
};

/**
 * CATEGORY COVER IMAGES — keyed by category name exactly as used in
 * src/data/products.ts (CATEGORIES array / Product['category']).
 */
export const CATEGORY_IMAGES: Record<string, string> = {
  Nuts: unsplash('photo-1641430470762-13c3489762e7'),
  'Dried Fruits': unsplash('photo-1691657917109-c6e027eac44a'),
   Kernels: unsplash('photo-1524593000379-d4729b2c4f99'),
  'Natural Products': unsplash('photo-1568657704598-602700bd9694'),
  Shilajit: '/images/shilajit_two.jpg',
};

/**
 * STORY / MARKETING IMAGES — used on Home and About pages
 * (hero side-images, "from Skardu" section, etc.)
 */
export const STORY_IMAGES = {
  mountainValley: unsplash('photo-1650697833340-46caa87b4b5d', 'q=80&w=900&h=1100&fit=crop&auto=format'),
  orchard: unsplash('photo-1641430470762-13c3489762e7', 'q=80&w=800&h=650&fit=crop&auto=format'),
  sunDrying: unsplash('photo-1610401882421-f05386f4dfc5', 'q=80&w=800&h=650&fit=crop&auto=format'),
  aboutHero: unsplash('photo-1650697833340-46caa87b4b5d', 'q=80&w=900&h=1000&fit=crop&auto=format&flip=h'),
};

/** Fallback used only if a product/category is added without an image entry above. */
export const getFallbackImage = (label: string) => placeholder(label, '164B34');
