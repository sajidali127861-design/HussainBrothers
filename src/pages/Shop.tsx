import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import SEO from '@/components/common/SEO';
import ProductGrid from '@/components/product/ProductGrid';
import { CATEGORIES, getMinPrice, products } from '@/data/products';
import type { Category, SortOption } from '@/types';

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: 'featured', label: 'Featured' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'name-asc', label: 'Name: A to Z' },
];

export default function Shop() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('q') ?? '');
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const activeCategory = (searchParams.get('category') as Category | null) ?? null;
  const sort = (searchParams.get('sort') as SortOption | null) ?? 'featured';

  useEffect(() => {
    const timer = window.setTimeout(() => setLoading(false), 300);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handle = window.setTimeout(() => {
      const next = new URLSearchParams(searchParams);
      if (query) next.set('q', query);
      else next.delete('q');
      setSearchParams(next, { replace: true });
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, 300);
    return () => window.clearTimeout(handle);
  }, [query]);

  const setCategory = (category: Category | null) => {
    const next = new URLSearchParams(searchParams);
    if (category) next.set('category', category);
    else next.delete('category');
    setSearchParams(next, { replace: true });
  };

  const setSort = (value: SortOption) => {
    const next = new URLSearchParams(searchParams);
    next.set('sort', value);
    setSearchParams(next, { replace: true });
  };

  const filteredProducts = useMemo(() => {
    let list = [...products];

    if (activeCategory) {
      list = list.filter((p) => p.category === activeCategory);
    }

    if (query.trim()) {
      const q = query.trim().toLowerCase();
      list = list.filter(
        (p) => p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q)
      );
    }

    switch (sort) {
      case 'price-asc':
        list.sort((a, b) => getMinPrice(a) - getMinPrice(b));
        break;
      case 'price-desc':
        list.sort((a, b) => getMinPrice(b) - getMinPrice(a));
        break;
      case 'name-asc':
        list.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        list.sort((a, b) => Number(b.featured) - Number(a.featured));
    }

    return list;
  }, [activeCategory, query, sort]);

  const hasActiveFilters = Boolean(activeCategory) || Boolean(query);

  return (
    <>
      <SEO
        title="Shop All Products"
        description="Browse the full Hussain Brothers catalogue of dry fruits, nuts, kernels, Shilajit and natural products from Skardu."
      />

      <section className="container-page py-10 sm:py-14">
        <span className="eyebrow">Full catalogue</span>
        <h1 className="mt-2 font-display text-3xl font-semibold text-pine-800 sm:text-4xl">Shop</h1>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <Search size={18} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-pine-300" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search almonds, walnuts, Shilajit..."
              className="input-field pl-11"
              aria-label="Search products"
            />
          </div>

          <div className="flex gap-2">
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as SortOption)}
              aria-label="Sort products"
              className="input-field w-auto cursor-pointer"
            >
              {SORT_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>

            <button
              type="button"
              onClick={() => setFiltersOpen((v) => !v)}
              className="btn-outline sm:hidden"
              aria-expanded={filtersOpen}
            >
              <SlidersHorizontal size={16} />
              Filter
            </button>
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-8 lg:flex-row">
          <aside className={`w-full shrink-0 lg:block lg:w-56 ${filtersOpen ? 'block' : 'hidden'}`}>
            <div className="rounded-2xl border border-pine-100 bg-white p-5">
              <h2 className="font-display text-sm font-semibold text-pine-800">Category</h2>
              <ul className="mt-3 space-y-1">
                <li>
                  <button
                    onClick={() => setCategory(null)}
                    className={`w-full rounded-lg px-3 py-2 text-left text-sm transition-colors ${
                      !activeCategory ? 'bg-pine-50 font-medium text-pine-800' : 'text-pine-500 hover:bg-pine-50'
                    }`}
                  >
                    All Products
                  </button>
                </li>
                {CATEGORIES.map((c) => (
                  <li key={c.name}>
                    <button
                      onClick={() => setCategory(c.name)}
                      className={`w-full rounded-lg px-3 py-2 text-left text-sm transition-colors ${
                        activeCategory === c.name ? 'bg-pine-50 font-medium text-pine-800' : 'text-pine-500 hover:bg-pine-50'
                      }`}
                    >
                      {c.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          <div className="flex-1">
            {hasActiveFilters && (
              <div className="mb-4 flex flex-wrap items-center gap-2">
                {activeCategory && (
                  <button
                    onClick={() => setCategory(null)}
                    className="inline-flex items-center gap-1.5 rounded-full bg-pine-50 px-3 py-1.5 text-xs font-medium text-pine-700"
                  >
                    {activeCategory} <X size={12} />
                  </button>
                )}
                {query && (
                  <button
                    onClick={() => setQuery('')}
                    className="inline-flex items-center gap-1.5 rounded-full bg-pine-50 px-3 py-1.5 text-xs font-medium text-pine-700"
                  >
                    "{query}" <X size={12} />
                  </button>
                )}
              </div>
            )}

            <p className="mb-4 text-xs text-pine-400">
              {loading ? 'Loading products…' : `${filteredProducts.length} product${filteredProducts.length === 1 ? '' : 's'}`}
            </p>

            <ProductGrid products={filteredProducts} loading={loading} />
          </div>
        </div>
      </section>
    </>
  );
}
