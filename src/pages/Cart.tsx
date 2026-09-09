import { Link } from 'react-router-dom';
import { ArrowRight, ShoppingBag } from 'lucide-react';
import SEO from '@/components/common/SEO';
import EmptyState from '@/components/common/EmptyState';
import CartLineItem from '@/components/cart/CartLineItem';
import { useCart } from '@/context/CartContext';
import { formatPrice } from '@/utils/currency';
import { DELIVERY_NOTE } from '@/config/business';

export default function Cart() {
  const { items, cartTotal } = useCart();

  return (
    <>
      <SEO title="Your Cart" description="Review the items in your Hussain Brothers cart before checkout." />

      <section className="container-page py-10 sm:py-14">
        <h1 className="font-display text-3xl font-semibold text-pine-800 sm:text-4xl">Your Cart</h1>

        {items.length === 0 ? (
          <div className="mt-8">
            <EmptyState
              icon={ShoppingBag}
              title="Your cart is empty"
              description="Looks like you haven't added any products yet. Explore our range of dry fruits and natural products."
              actionLabel="Start Shopping"
              actionHref="/shop"
            />
          </div>
        ) : (
          <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-3 lg:gap-12">
            <div className="rounded-2xl border border-pine-100 bg-white px-5 lg:col-span-2">
              {items.map((item) => (
                <CartLineItem key={`${item.productId}__${item.weight}`} item={item} />
              ))}
            </div>

            <aside className="h-fit rounded-2xl border border-pine-100 bg-white p-6">
              <h2 className="font-display text-lg font-semibold text-pine-800">Order Summary</h2>

              <div className="mt-4 space-y-2.5 border-b border-pine-100 pb-4 text-sm">
                <div className="flex justify-between text-pine-600">
                  <span>Subtotal</span>
                  <span className="font-medium text-pine-800">{formatPrice(cartTotal)}</span>
                </div>
                <p className="text-xs leading-relaxed text-pine-400">{DELIVERY_NOTE}</p>
              </div>

              <div className="mt-4 flex justify-between font-display text-lg font-semibold text-pine-800">
                <span>Grand Total</span>
                <span>{formatPrice(cartTotal)}</span>
              </div>

              <Link to="/checkout" className="btn-primary mt-6 w-full">
                Proceed to Checkout
                <ArrowRight size={16} />
              </Link>
              <Link to="/shop" className="btn-outline mt-3 w-full">
                Continue Shopping
              </Link>
            </aside>
          </div>
        )}
      </section>
    </>
  );
}
