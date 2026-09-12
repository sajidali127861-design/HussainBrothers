import { Link, Navigate, useLocation } from 'react-router-dom';
import { CheckCircle2, ShoppingBag } from 'lucide-react';
import SEO from '@/components/common/SEO';
import { formatPrice } from '@/utils/currency';
import type { PlacedOrder } from '@/types';

export default function OrderSuccess() {
  const location = useLocation();
  const order = (location.state as { order?: PlacedOrder } | null)?.order;

  // If someone lands here directly (refresh, bookmarked link, back button
  // after clearing state) without actually placing an order, there's
  // nothing to show — send them back to shop instead of a blank/broken page.
  if (!order) {
    return <Navigate to="/shop" replace />;
  }

  return (
    <>
      <SEO title="Order Confirmed" description="Your Hussain Brothers order has been successfully received." />

      <section className="container-page py-12 sm:py-16">
        <div className="mx-auto max-w-xl rounded-2xl border border-pine-100 bg-white p-6 text-center sm:p-10">
          <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-pine-50 text-pine-600">
            <CheckCircle2 size={32} strokeWidth={1.5} />
          </span>
          <h1 className="mt-6 font-display text-2xl font-semibold text-pine-800 sm:text-3xl">
            Order Successfully Placed
          </h1>
          <p className="mt-2 text-sm text-pine-500 sm:text-base">
            Thank you for shopping with Hussain Brothers! Your order has been successfully received.
          </p>

          <div className="mt-6 inline-flex flex-col items-center rounded-xl bg-gold-50 px-6 py-3">
            <span className="text-xs font-medium text-pine-500">Order Reference</span>
            <span className="font-display text-xl font-semibold text-pine-800">{order.orderRef}</span>
          </div>

          {/* Customer details */}
          <div className="mt-8 grid grid-cols-1 gap-4 border-t border-pine-100 pt-6 text-left sm:grid-cols-2">
            <div>
              <span className="text-xs font-medium text-pine-400">Customer</span>
              <p className="font-medium text-pine-800">{order.customer.name}</p>
            </div>
            <div>
              <span className="text-xs font-medium text-pine-400">Phone</span>
              <p className="font-medium text-pine-800">{order.customer.phone}</p>
            </div>
            <div>
              <span className="text-xs font-medium text-pine-400">City</span>
              <p className="font-medium text-pine-800">{order.customer.city}</p>
            </div>
            <div className="sm:col-span-2">
              <span className="text-xs font-medium text-pine-400">Delivery Address</span>
              <p className="font-medium text-pine-800">{order.customer.address}</p>
            </div>
          </div>

          {/* Order summary */}
          <div className="mt-6 border-t border-pine-100 pt-6 text-left">
            <span className="text-xs font-medium text-pine-400">Order Summary</span>
            <div className="mt-3 space-y-3">
              {order.items.map((item) => (
                <div key={`${item.productId}__${item.weight}`} className="flex items-center gap-3 text-sm">
                  <img
                    src={item.image}
                    alt={item.name}
                    loading="lazy"
                    decoding="async"
                    className="h-11 w-11 shrink-0 rounded-lg object-cover"
                  />
                  <span className="flex-1 text-pine-600">
                    {item.name} <span className="text-pine-400">({item.weight}) x{item.quantity}</span>
                  </span>
                  <span className="shrink-0 font-medium text-pine-800">
                    {formatPrice(item.price * item.quantity)}
                  </span>
                </div>
              ))}
            </div>
            <div className="mt-4 flex justify-between border-t border-pine-100 pt-4 font-display text-lg font-semibold text-pine-800">
              <span>Subtotal</span>
              <span>{formatPrice(order.subtotal)}</span>
            </div>
          </div>

          <p className="mt-6 rounded-xl bg-cream-200 px-4 py-3 text-sm text-pine-600">
            We have received your order and will contact you for confirmation/delivery details.
          </p>

          <Link to="/shop" className="btn-primary mt-6 w-full">
            <ShoppingBag size={17} />
            Continue Shopping
          </Link>
        </div>
      </section>
    </>
  );
}
