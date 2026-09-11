import { Link } from 'react-router-dom';
import { ArrowRight, Leaf, MessageCircle, Mountain, ShieldCheck, Truck } from 'lucide-react';
import SEO from '@/components/common/SEO';
import ProductCard from '@/components/product/ProductCard';
import ProductCarousel from '@/components/product/ProductCarousel';
import CategoryCard from '@/components/product/CategoryCard';
import CategoryCarousel from '@/components/product/CategoryCarousel';
import { CATEGORIES, getFeaturedProducts } from '@/data/products';
import { STORY_IMAGES } from '@/data/media';
import { buildWhatsAppUrl } from '@/utils/whatsapp';
import { BUSINESS_NAME } from '@/config/business';

const HERO_MESSAGE = `Assalam o Alaikum ${BUSINESS_NAME}, I would like to know more about your products.`;

const TRUST_POINTS = [
  {
    icon: Mountain,
    title: 'Sourced from Skardu',
    description: 'Grown and dried in the high valleys of Gilgit-Baltistan, close to where it matters.',
  },
  {
    icon: Leaf,
    title: '100% natural',
    description: 'No added sugar, no artificial preservatives — just sun, soil and time.',
  },
  {
    icon: ShieldCheck,
    title: 'Quality checked',
    description: 'Every batch is hand-sorted for size, freshness and cleanliness before packing.',
  },
  {
    icon: Truck,
    title: 'Nationwide delivery',
    description: 'Ordered on WhatsApp, packed with care, and shipped across Pakistan.',
  },
];

export default function Home() {
  const featured = getFeaturedProducts().slice(0, 8);
  return (
    <>
      <SEO
        title="Premium Dry Fruits & Natural Products from Skardu"
        description="Hussain Brothers brings you premium almonds, walnuts, dried apricots, pistachios, cashews and Shilajit sourced from Skardu. Order directly on WhatsApp."
      />

      {/* HERO */}
      <section className="relative overflow-hidden bg-pine-800">
        <div className="pointer-events-none absolute inset-0 bg-grain" />
        <div className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-gold-500/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-32 -left-16 h-80 w-80 rounded-full bg-pine-500/20 blur-3xl" />

        <div  className="container-page relative flex flex-col items-start gap-8 py-12 sm:py-14 lg:flex-row lg:items-center lg:gap-16 lg:py-16">
          <div className="max-w-xl animate-slide-up">
            <span className="eyebrow text-gold-400">Skardu, Gilgit-Baltistan</span>
            <h1 className="mt-4 text-balance font-display text-4xl font-semibold leading-[1.1] text-cream-100 sm:text-5xl lg:text-6xl">
              Premium dry fruits &amp; natural products, straight from Skardu
            </h1>
            <p className="mt-5 max-w-md text-base leading-relaxed text-cream-300 sm:text-lg">
              Almonds, walnuts, apricots, pistachios and Shilajit — hand-picked in the mountains
              and delivered fresh to your door.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link to="/shop" className="btn-gold">
                Shop Now
                <ArrowRight size={16} />
              </Link>
              <a href={buildWhatsAppUrl(HERO_MESSAGE)} target="_blank" rel="noopener noreferrer" className="btn-whatsapp">
                <MessageCircle size={16} />
                Order on WhatsApp
              </a>
            </div>
          </div>

          <div className="grid w-full max-w-md grid-cols-2 gap-3 lg:ml-auto">
            {featured.slice(0, 4).map((product) => (
              <div key={product.id} className="overflow-hidden rounded-2xl bg-pine-700/50 p-2 backdrop-blur">
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="aspect-square w-full rounded-xl object-cover"
                  loading="lazy"
                />
                <p className="mt-2 truncate px-1 pb-1 text-xs font-medium text-cream-200">{product.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* POPULAR PRODUCTS */}
      <section className="container-page py-16 sm:py-20">
        <div className="flex items-end justify-between gap-4">
          <div>
            <span className="eyebrow">Handpicked for you</span>
            <h2 className="mt-2 font-display text-2xl font-semibold text-pine-800 sm:text-3xl">
              Popular Products
            </h2>
          </div>
          <Link to="/shop" className="hidden shrink-0 items-center gap-1 text-sm font-medium text-pine-600 hover:text-pine-800 sm:flex">
            View all <ArrowRight size={14} />
          </Link>
        </div>

        <div className="mt-8">
          <ProductCarousel>
            {featured.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </ProductCarousel>
        </div>

        <Link to="/shop" className="mt-8 flex items-center justify-center gap-1 text-sm font-medium text-pine-600 hover:text-pine-800 sm:hidden">
          View all products <ArrowRight size={14} />
        </Link>
      </section>

      {/* CATEGORIES */}
      <section className="bg-cream-200 py-16 sm:py-20">
        <div className="container-page">
          <span className="eyebrow">Explore the range</span>
          <h2 className="mt-2 font-display text-2xl font-semibold text-pine-800 sm:text-3xl">Shop by category</h2>
          <div className="mt-8">
            <CategoryCarousel>
              {CATEGORIES.map((category) => (
                <CategoryCard key={category.name} {...category} />
              ))}
            </CategoryCarousel>
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="container-page py-16 sm:py-20">
        <span className="eyebrow">Why Hussain Brothers</span>
        <h2 className="mt-2 max-w-lg text-balance font-display text-2xl font-semibold text-pine-800 sm:text-3xl">
          Quality you can taste, trust you can count on
        </h2>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {TRUST_POINTS.map((point) => (
            <div key={point.title} className="rounded-2xl border border-pine-100 bg-white p-6">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-pine-50 text-pine-700">
                <point.icon size={20} strokeWidth={1.75} />
              </span>
              <h3 className="mt-4 font-display text-base font-semibold text-pine-800">{point.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-pine-500">{point.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* SKARDU STORY */}
      <section className="bg-pine-900 py-16 text-cream-100 sm:py-20">
        <div className="container-page grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <span className="eyebrow text-gold-400">From the roof of the world</span>
            <h2 className="mt-2 text-balance font-display text-2xl font-semibold sm:text-3xl">
              Grown in Skardu's valleys, dried under its sun
            </h2>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-cream-300 sm:text-base">
              Skardu's high altitude, clean air and cold winters create ideal conditions for
              growing some of the finest almonds, walnuts and apricots in the world. Our family has
              worked with local growers for years, choosing quality over shortcuts at every step —
              from harvest to your doorstep.
            </p>
            <Link to="/about" className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-gold-400 hover:text-gold-300">
              Read our story <ArrowRight size={14} />
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <img
              src={STORY_IMAGES.mountainValley}
              alt="Skardu mountain valley"
              loading="lazy"
              className="col-span-2 h-56 w-full rounded-2xl object-cover sm:h-72"
            />
            <img
              src={STORY_IMAGES.orchard}
              alt="Orchards near Skardu"
              loading="lazy"
              className="h-32 w-full rounded-2xl object-cover sm:h-40"
            />
            <img
              src={STORY_IMAGES.sunDrying}
              alt="Traditional sun-drying of fruit"
              loading="lazy"
              className="h-32 w-full rounded-2xl object-cover sm:h-40"
            />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container-page py-16 sm:py-20">
        <div className="relative overflow-hidden rounded-3xl bg-gold-500 px-6 py-14 text-center sm:px-12 sm:py-16">
          <div className="pointer-events-none absolute inset-0 bg-grain opacity-40" />
          <h2 className="relative text-balance font-display text-2xl font-semibold text-pine-900 sm:text-3xl">
            Ready to taste the difference?
          </h2>
          <p className="relative mx-auto mt-3 max-w-md text-sm text-pine-800 sm:text-base">
            Browse our full range or message us directly on WhatsApp — we're happy to help you
            choose.
          </p>
          <div className="relative mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link to="/shop" className="btn bg-pine-800 text-cream-100 hover:bg-pine-900">
              Shop Now <ArrowRight size={16} />
            </Link>
            <a href={buildWhatsAppUrl(HERO_MESSAGE)} target="_blank" rel="noopener noreferrer" className="btn-whatsapp">
              <MessageCircle size={16} />
              Order on WhatsApp
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
