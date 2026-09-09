import type { Product } from '@/types';

/**
 * Placeholder product images.
 * Replace these URLs with real product photography before launch —
 * simply swap the `images` array per product; no other code needs to change.
 */
const placeholder = (label: string, bg: string) =>
  `https://placehold.co/800x800/${bg}/FAF6EC?font=playfair-display&text=${encodeURIComponent(label)}`;

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
    images: [placeholder('Mamra Almonds', '0F3D2E'), placeholder('Almonds Close-up', '164B34')],
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
    images: [placeholder('Kaghzi Walnuts', '1C5C40'), placeholder('Walnut Kernels', '0B2E22')],
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
    images: [placeholder('Dried Apricots', 'AD843A'), placeholder('Apricot Basket', '87652D')],
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
    images: [placeholder('Apricot Kernels', 'C9A24B'), placeholder('Khubani Giri', 'AD843A')],
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
    images: [placeholder('Pistachios', '3F7A5C'), placeholder('Pista Bowl', '164B34')],
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
    images: [placeholder('Cashews', 'E7D9B4'), placeholder('Cashew Nuts', 'DFC26D')],
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
    images: [placeholder('Shilajit Resin', '5F4720'), placeholder('Salajeet Jar', '3A2C14')],
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
    images: [placeholder('Golden Raisins', 'EAD59A'), placeholder('Kishmish', 'DFC26D')],
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
    images: [placeholder('Dried Mulberries', 'C9DBD1'), placeholder('Toot Khushk', '9FBFAE')],
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
    images: [placeholder('Chilghoza', '6E9C82'), placeholder('Pine Nuts', '3F7A5C')],
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
    images: [placeholder('Walnut Kernels', '0F3D2E'), placeholder('Walnut Halves', '164B34')],
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
    images: [placeholder('Wild Honey', 'C9A24B'), placeholder('Honey Jar', 'AD843A')],
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
    images: [placeholder('Walnut Oil', '0B2E22'), placeholder('Oil Bottle', '071F17')],
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
    images: [placeholder('Dried Figs', 'DFC26D'), placeholder('Anjeer', 'C9A24B')],
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
    name: 'Dry Fruits',
    description: 'Sun-dried apricots, raisins, figs and more.',
    image: placeholder('Dry Fruits', 'AD843A'),
  },
  {
    name: 'Nuts',
    description: 'Almonds, walnuts, pistachios and cashews.',
    image: placeholder('Nuts', '164B34'),
  },
  {
    name: 'Dried Fruits',
    description: 'Naturally sweet, preservative-free dried fruit.',
    image: placeholder('Dried Fruits', 'DFC26D'),
  },
  {
    name: 'Kernels',
    description: 'Apricot kernels, pine nuts and walnut kernels.',
    image: placeholder('Kernels', '3F7A5C'),
  },
  {
    name: 'Natural Products',
    description: 'Wild honey and cold-pressed oils.',
    image: placeholder('Natural Products', 'C9A24B'),
  },
  {
    name: 'Shilajit',
    description: 'Pure, lab-tested Shilajit from the Karakoram range.',
    image: placeholder('Shilajit', '5F4720'),
  },
];
