import SEO from '@/components/common/SEO';
import CategoryCard from '@/components/product/CategoryCard';
import CategoryCarousel from '@/components/product/CategoryCarousel';
import { CATEGORIES } from '@/data/products';

export default function Categories() {
  return (
    <>
      <SEO
        title="Shop by Category"
        description="Browse Hussain Brothers products by category: Dry Fruits, Nuts, Dried Fruits, Kernels, Natural Products and Shilajit."
      />

      <section className="container-page py-12 sm:py-16">
        <span className="eyebrow">Browse</span>
        <h1 className="mt-2 font-display text-3xl font-semibold text-pine-800 sm:text-4xl">
          Shop by category
        </h1>
        <p className="mt-3 max-w-lg text-sm text-pine-500 sm:text-base">
          From everyday nuts to rare Shilajit resin — find exactly what you're looking for.
        </p>

        <div className="mt-10">
          <CategoryCarousel>
            {CATEGORIES.map((category) => (
              <CategoryCard key={category.name} {...category} />
            ))}
          </CategoryCarousel>
        </div>
      </section>
    </>
  );
}
