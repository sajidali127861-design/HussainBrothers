import { Link } from 'react-router-dom';
import { Trash2 } from 'lucide-react';
import type { CartItem } from '@/types';
import { formatPrice } from '@/utils/currency';
import QuantitySelector from '@/components/common/QuantitySelector';
import { useCart } from '@/context/CartContext';

export default function CartLineItem({ item }: { item: CartItem }) {
  const { updateQuantity, removeFromCart } = useCart();

  return (
    <div className="flex gap-4 border-b border-pine-100 py-5 last:border-0">
      <Link to={`/product/${item.slug}`} className="h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-pine-50 sm:h-24 sm:w-24">
        <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
      </Link>

      <div className="flex flex-1 flex-col justify-between gap-2">
        <div className="flex items-start justify-between gap-2">
          <div>
            <Link to={`/product/${item.slug}`} className="font-display text-sm font-semibold text-pine-800 hover:text-pine-600 sm:text-base">
              {item.name}
            </Link>
            <p className="mt-0.5 text-xs text-pine-400">Weight: {item.weight}</p>
          </div>
          <button
            type="button"
            onClick={() => removeFromCart(item.productId, item.weight)}
            aria-label={`Remove ${item.name} from cart`}
            className="shrink-0 p-1 text-pine-300 hover:text-red-500"
          >
            <Trash2 size={17} />
          </button>
        </div>

        <div className="flex items-center justify-between">
          <QuantitySelector
            quantity={item.quantity}
            onChange={(q) => updateQuantity(item.productId, item.weight, q)}
            size="sm"
          />
          <div className="text-right">
            <p className="font-display text-sm font-semibold text-pine-800 sm:text-base">
              {formatPrice(item.price * item.quantity)}
            </p>
            <p className="text-[11px] text-pine-400">{formatPrice(item.price)} each</p>
          </div>
        </div>
      </div>
    </div>
  );
}
