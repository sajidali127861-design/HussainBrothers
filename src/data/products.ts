import type { Product } from '@/types';
import { PRODUCT_IMAGES, CATEGORY_IMAGES, getFallbackImage } from './media';

/**
 * Product catalogue.
 *
 * Images are intentionally NOT written inline here — they live in
 * `src/data/media.ts`, keyed by each product's `slug`. This means you
 * (or whoever manages the site later) can change every photo on the
 * site from ONE file, without touching this data or any UI component.
 *
 * To add a new product: add an entry below with a new `slug`, then add
 * a matching entry in `PRODUCT_IMAGES` inside media.ts. If you forget,
 * the site still works — it falls back to a labelled placeholder image
 * automatically, so nothing breaks.
 */

const imagesFor = (slug: string, label: string): string[] =>
  PRODUCT_IMAGES[slug] ?? [getFallbackImage(label)];

export const products: Product[] = [
  {
    id: 'p01',
    name: 'Premium Mamra Almonds',
    slug: 'premium-mamra-almonds',
    description: 'Hand-picked, thin-shelled Mamra almonds with a rich, buttery flavour.',
    longDescription:
      'Our Mamra almonds are sourced from high-altitude orchards and sun-dried the traditional way. Known for their thin shell, deep flavour and high oil content, they are considered among the finest almonds available. Great for daily eating, soaking overnight, or gifting.',
    category: 'Nuts',
    origin: 'Skardu Valley',
    images: imagesFor('premium-mamra-almonds', 'Mamra Almonds'),
    featured: true,
    variants: [
      { weight: '250g', price: 1200, stock: 40 },
      { weight: '500g', price: 2300, stock: 30 },
      { weight: '1kg', price: 4400, stock: 18 },
    ],
  },
  {
    id: 'p02',
    name: 'Kaghzi Walnuts (Paper Shell)',
    slug: 'kaghzi-walnuts',
    description: 'Thin, easy-to-crack walnuts with soft, creamy kernels.',
    longDescription:
      'Kaghzi walnuts are prized for their paper-thin shells that crack open easily to reveal plump, creamy kernels. Grown in the mountain valleys of Gilgit-Baltistan, they are naturally rich in omega-3 fatty acids.',
    category: 'Nuts',
    origin: 'Gilgit-Baltistan',
    images: imagesFor('kaghzi-walnuts', 'Kaghzi Walnuts'),
    featured: true,
    variants: [
      { weight: '250g', price: 950, stock: 45 },
      { weight: '500g', price: 1800, stock: 32 },
      { weight: '1kg', price: 3400, stock: 20 },
    ],
  },
  {
    id: 'p03',
    name: 'Sun-Dried Skardu Apricots',
    slug: 'sun-dried-skardu-apricots',
    description: 'Naturally sweet apricots, sun-dried on rooftops the traditional way.',
    longDescription:
      'These apricots are dried under the open Skardu sun on traditional rooftops, without any added sugar or preservatives. Soft, tangy-sweet, and packed with fibre and vitamin A.',
    category: 'Dried Fruits',
    origin: 'Skardu Valley',
    images: imagesFor('sun-dried-skardu-apricots', 'Dried Apricots'),
    featured: true,
    variants: [
      { weight: '250g', price: 700, stock: 50 },
      { weight: '500g', price: 1300, stock: 38 },
      { weight: '1kg', price: 2500, stock: 22 },
    ],
  },
  {
    id: 'p04',
    name: 'Apricot Kernels (Khubani Giri)',
    slug: 'apricot-kernels',
    description: 'Sweet apricot kernels, a local delicacy with a mild nutty taste.',
    category: 'Kernels',
    origin: 'Skardu Valley',
    images: imagesFor('apricot-kernels', 'Apricot Kernels'),
    featured: false,
    variants: [
      { weight: '250g', price: 850, stock: 25 },
      { weight: '500g', price: 1600, stock: 16 },
    ],
  },
  {
    id: 'p05',
    name: 'Roasted & Salted Pistachios',
    slug: 'roasted-salted-pistachios',
    description: 'Premium green pistachios, lightly roasted and salted.',
    longDescription:
      'Our pistachios are carefully sorted for size and colour, then lightly roasted with a touch of natural salt to bring out their signature flavour without overpowering it.',
    category: 'Nuts',
    origin: 'Imported, roasted in Pakistan',
    images: imagesFor('roasted-salted-pistachios', 'Pistachios'),
    featured: true,
    variants: [
      { weight: '250g', price: 1400, stock: 30 },
      { weight: '500g', price: 2700, stock: 20 },
      { weight: '1kg', price: 5200, stock: 12 },
    ],
  },
  {
    id: 'p06',
    name: 'Whole Cashews (W240 Grade)',
    slug: 'whole-cashews-w240',
    description: 'Large, whole, creamy-white cashews of premium W240 grade.',
    category: 'Nuts',
    origin: 'Imported, packed in Pakistan',
    images: imagesFor('whole-cashews-w240', 'Cashews'),
    featured: false,
    variants: [
      { weight: '250g', price: 1100, stock: 35 },
      { weight: '500g', price: 2100, stock: 24 },
      { weight: '1kg', price: 4000, stock: 15 },
    ],
  },
  {
    id: 'p07',
    name: 'Pure Skardu Shilajit (Salajeet)',
    slug: 'pure-skardu-shilajit',
    description: 'Authentic, lab-tested Shilajit resin sourced from Karakoram rocks.',
    longDescription:
      'Collected from the high rock formations of the Karakoram range near Skardu, our Shilajit is purified using traditional methods and tested for purity. A trusted natural supplement valued for generations in the region.',
    category: 'Shilajit',
    origin: 'Karakoram Range, Skardu',
    images: imagesFor('pure-skardu-shilajit', 'Shilajit Resin'),
    featured: true,
    variants: [
      { weight: '20g', price: 2200, stock: 20 },
      { weight: '50g', price: 4800, stock: 12 },
      { weight: '100g', price: 8800, stock: 6 },
    ],
  },
  {
    id: 'p08',
    name: 'Golden Raisins (Kishmish)',
    slug: 'golden-raisins-kishmish',
    description: 'Soft, seedless golden raisins with a naturally sweet taste.',
    category: 'Dried Fruits',
    origin: 'Northern Pakistan',
    images: imagesFor('golden-raisins-kishmish', 'Golden Raisins'),
    featured: false,
    variants: [
      { weight: '250g', price: 450, stock: 60 },
      { weight: '500g', price: 850, stock: 40 },
      { weight: '1kg', price: 1600, stock: 25 },
    ],
  },
  {
    id: 'p09',
    name: 'Dried Mulberries (Toot Khushk)',
    slug: 'dried-mulberries',
    description: 'Naturally sweet, sun-dried mulberries from mountain orchards.',
    category: 'Dried Fruits',
    origin: 'Gilgit-Baltistan',
    images: imagesFor('dried-mulberries', 'Dried Mulberries'),
    featured: false,
    variants: [
      { weight: '250g', price: 500, stock: 42 },
      { weight: '500g', price: 950, stock: 30 },
    ],
  },
  {
    id: 'p10',
    name: 'Pine Nuts (Chilghoza)',
    slug: 'pine-nuts-chilghoza',
    description: 'Rare, hand-shelled pine nuts with a distinct rich flavour.',
    longDescription:
      'Chilghoza pine nuts are harvested from wild pine forests in the northern mountains and hand-shelled — a labour-intensive process that makes them one of the more precious dry fruits in the region.',
    category: 'Kernels',
    origin: 'Northern Pakistan',
    images: imagesFor('pine-nuts-chilghoza', 'Chilghoza'),
    featured: true,
    variants: [
      { weight: '250g', price: 1800, stock: 18 },
      { weight: '500g', price: 3500, stock: 10 },
    ],
  },
  {
    id: 'p11',
    name: 'Walnut Kernels (Ready to Eat)',
    slug: 'walnut-kernels',
    description: 'Shelled walnut halves, cleaned and ready to eat.',
    category: 'Kernels',
    origin: 'Gilgit-Baltistan',
    images: imagesFor('walnut-kernels', 'Walnut Kernels'),
    featured: false,
    variants: [
      { weight: '250g', price: 1050, stock: 28 },
      { weight: '500g', price: 2000, stock: 18 },
    ],
  },
  {
    id: 'p12',
    name: 'Wild Forest Honey',
    slug: 'wild-forest-honey',
    description: 'Raw, unprocessed honey collected from wild mountain flora.',
    longDescription:
      'Collected from wild beehives across the forested slopes of Gilgit-Baltistan, this honey is raw and unprocessed — no heating, no added sugar. Naturally crystallises over time, a sign of purity.',
    category: 'Natural Products',
    origin: 'Gilgit-Baltistan',
    images: imagesFor('wild-forest-honey', 'Wild Honey'),
    featured: true,
    variants: [
      { weight: '250g', price: 1300, stock: 24 },
      { weight: '500g', price: 2400, stock: 16 },
      { weight: '1kg', price: 4500, stock: 9 },
    ],
  },
  {
    id: 'p13',
    name: 'Cold-Pressed Walnut Oil',
    slug: 'cold-pressed-walnut-oil',
    description: 'Traditionally extracted walnut oil, cold-pressed for purity.',
    category: 'Natural Products',
    origin: 'Skardu Valley',
    images: imagesFor('cold-pressed-walnut-oil', 'Walnut Oil'),
    featured: false,
    variants: [
      { weight: '250ml', price: 1600, stock: 20 },
      { weight: '500ml', price: 3000, stock: 12 },
    ],
  },
  {
    id: 'p14',
    name: 'Dried Fig (Anjeer)',
    slug: 'dried-fig-anjeer',
    description: 'Soft, naturally sweet dried figs, rich in fibre.',
    category: 'Dried Fruits',
    origin: 'Imported, packed in Pakistan',
    images: imagesFor('dried-fig-anjeer', 'Dried Figs'),
    featured: false,
    variants: [
      { weight: '250g', price: 900, stock: 33 },
      { weight: '500g', price: 1700, stock: 21 },
    ],
  },
];

export const getFeaturedProducts = () => products.filter((p) => p.featured);

export const getProductBySlug = (slug: string) => products.find((p) => p.slug === slug);

export const getProductsByCategory = (category: string) =>
  products.filter((p) => p.category === category);

export const getMinPrice = (product: Product) =>
  Math.min(...product.variants.map((v) => v.price));

export const CATEGORIES: { name: Product['category']; description: string; image: string }[] = [

  {
    name: 'Nuts',
    description: 'Almonds, walnuts, pistachios and cashews.',
    image: CATEGORY_IMAGES['Nuts'] ?? getFallbackImage('Nuts'),
  },
  {
    name: 'Dried Fruits',
    description: 'Naturally sweet, preservative-free dried fruit.',
    image: CATEGORY_IMAGES['Dried Fruits'] ?? getFallbackImage('Dried Fruits'),
  },
  {
    name: 'Kernels',
    description: 'Apricot kernels, pine nuts and walnut kernels.',
    image: CATEGORY_IMAGES['Kernels'] ?? getFallbackImage('Kernels'),
  },
  {
    name: 'Natural Products',
    description: 'Wild honey and cold-pressed oils.',
    image: CATEGORY_IMAGES['Natural Products'] ?? getFallbackImage('Natural Products'),
  },
  {
    name: 'Shilajit',
    description: 'Pure, lab-tested Shilajit from the Karakoram range.',
    image: CATEGORY_IMAGES['Shilajit'] ?? getFallbackImage('Shilajit'),
  },
];
