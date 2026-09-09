import type { Product } from '@/types';
import ProductCard from './ProductCard';
import EmptyState from '@/components/common/EmptyState';
import { SearchX } from 'lucide-react';

interface ProductGridProps {
  products: Product[];
  loading?: boolean;
}

function ProductCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-2xl bg-white shadow-card">
      <div className="aspect-square animate-pulse bg-pine-100" />
      <div className="space-y-2 p-4">
        <div className="h-3 w-1/3 animate-pulse rounded bg-pine-100" />
        <div className="h-4 w-3/4 animate-pulse rounded bg-pine-100" />
        <div className="h-3 w-full animate-pulse rounded bg-pine-100" />
        <div className="h-8 w-1/2 animate-pulse rounded bg-pine-100" />
      </div>
    </div>
  );
}

export default function ProductGrid({ products, loading }: ProductGridProps) {
  if (loading) {
    return (
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-5 lg:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <ProductCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <EmptyState
        icon={SearchX}
        title="No products found"
        description="Try adjusting your search or filters to find what you're looking for."
        actionLabel="View all products"
        actionHref="/shop"
      />
    );
  }

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-5 lg:grid-cols-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
