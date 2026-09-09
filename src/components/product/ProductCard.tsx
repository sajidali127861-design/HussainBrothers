import { type MouseEvent } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag } from 'lucide-react';
import type { Product } from '@/types';
import { getMinPrice } from '@/data/products';
import { formatPrice } from '@/utils/currency';
import { useCart } from '@/context/CartContext';
import { useToast } from '@/context/ToastContext';

export default function ProductCard({ product }: { product: Product }) {
  const { addToCart } = useCart();
  const { showToast } = useToast();
  const startingPrice = getMinPrice(product);
  const defaultVariant = product.variants[0];

  const handleQuickAdd = (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(
      {
        productId: product.id,
        name: product.name,
        slug: product.slug,
        image: product.images[0],
        weight: defaultVariant.weight,
        price: defaultVariant.price,
      },
      1
    );
    showToast(`${product.name} (${defaultVariant.weight}) added to cart`);
  };

  return (
    <Link
      to={`/product/${product.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl bg-white shadow-card transition-shadow hover:shadow-soft"
    >
      <div className="relative aspect-square overflow-hidden bg-pine-50">
        <img
          src={product.images[0]}
          alt={product.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {product.featured && (
          <span className="absolute left-3 top-3 rounded-full bg-gold-500 px-3 py-1 text-[11px] font-semibold text-pine-900">
            Featured
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-4">
        <span className="text-xs font-medium text-gold-600">{product.category}</span>
        <h3 className="mt-1 font-display text-base font-semibold leading-snug text-pine-800">
          {product.name}
        </h3>
        <p className="mt-1 line-clamp-2 flex-1 text-sm text-pine-500">{product.description}</p>

        <div className="mt-2 flex flex-wrap gap-1.5">
          {product.variants.map((v) => (
            <span key={v.weight} className="rounded-full border border-pine-100 px-2 py-0.5 text-[11px] text-pine-500">
              {v.weight}
            </span>
          ))}
        </div>

        <div className="mt-4 flex items-center justify-between">
          <div>
            <span className="text-[11px] text-pine-400">Starting from</span>
            <p className="font-display text-lg font-semibold text-pine-800">{formatPrice(startingPrice)}</p>
          </div>
          <button
            type="button"
            onClick={handleQuickAdd}
            aria-label={`Add ${product.name} to cart`}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-pine-700 text-cream-100 transition-colors hover:bg-pine-800"
          >
            <ShoppingBag size={17} />
          </button>
        </div>
      </div>
    </Link>
  );
}
