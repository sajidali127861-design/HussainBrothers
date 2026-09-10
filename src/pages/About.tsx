import { Link } from 'react-router-dom';
import { ArrowRight, Leaf, Mountain, ShieldCheck, Users } from 'lucide-react';
import SEO from '@/components/common/SEO';
import { STORY_IMAGES } from '@/data/media';

const VALUES = [
  {
    icon: Mountain,
    title: 'Rooted in Skardu',
    description:
      "We work directly with growers in the valleys of Gilgit-Baltistan, keeping our supply chain short and our produce fresh.",
  },
  {
    icon: Leaf,
    title: 'Natural, always',
    description:
      'No shortcuts, no artificial additives. Our products are dried, sorted and packed the way they have been for generations.',
  },
  {
    icon: ShieldCheck,
    title: 'Quality first',
    description:
      'Every batch is hand-checked before it reaches you — for size, freshness and cleanliness.',
  },
  {
    icon: Users,
    title: 'Built on trust',
    description:
      'From our first customer to our thousandth, we treat every order — big or small — with the same care.',
  },
];

export default function About() {
  return (
    <>
      <SEO
        title="About Us"
        description="Hussain Brothers is a Skardu-based business offering quality dry fruits and natural products, built on freshness and trust."
      />

      <section className="container-page py-12 sm:py-16">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <span className="eyebrow">Our story</span>
            <h1 className="mt-2 text-balance font-display text-3xl font-semibold text-pine-800 sm:text-4xl">
              A Skardu family business, bringing the mountains to your table
            </h1>
            <p className="mt-4 text-sm leading-relaxed text-pine-500 sm:text-base">
              Hussain Brothers began as a small, family-run stall in Skardu, selling almonds and
              apricots grown by local farmers. Over the years, word of our quality spread beyond
              the valley, and we started shipping across Pakistan — while keeping the same
              standards we started with: source responsibly, dry naturally, and never compromise
              on freshness.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-pine-500 sm:text-base">
              Today, we offer a full range of dry fruits, nuts, kernels and natural products,
              including pure Shilajit sourced from the Karakoram range. Every order is still
              packed by hand, by people who know exactly where each product comes from.
            </p>
            <Link to="/shop" className="btn-primary mt-6">
              Explore our products <ArrowRight size={16} />
            </Link>
          </div>

          <img
            src={STORY_IMAGES.aboutHero}
            alt="Hussain Brothers dry fruit stall in Skardu"
            loading="lazy"
            className="aspect-[7/8] w-full rounded-2xl object-cover"
          />
        </div>

        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:mt-20 lg:grid-cols-4">
          {VALUES.map((value) => (
            <div key={value.title} className="rounded-2xl border border-pine-100 bg-white p-6">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-pine-50 text-pine-700">
                <value.icon size={20} strokeWidth={1.75} />
              </span>
              <h3 className="mt-4 font-display text-base font-semibold text-pine-800">{value.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-pine-500">{value.description}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
