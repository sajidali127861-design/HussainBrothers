import { type ChangeEvent, type FormEvent, useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { Loader2, PackageCheck } from 'lucide-react';
import SEO from '@/components/common/SEO';
import { useCart } from '@/context/CartContext';
import { formatPrice } from '@/utils/currency';
import { buildOrderPayload, generateOrderReference, submitOrder } from '@/utils/order';
import { DELIVERY_NOTE } from '@/config/business';
import type { CustomerDetails, PlacedOrder } from '@/types';

type FormErrors = Partial<Record<keyof CustomerDetails, string>>;

const initialForm: CustomerDetails = {
  name: '',
  phone: '',
  city: '',
  address: '',
  note: '',
};

function validate(form: CustomerDetails): FormErrors {
  const errors: FormErrors = {};

  if (!form.name.trim() || form.name.trim().length < 2) {
    errors.name = 'Please enter your full name.';
  }

  const phoneDigits = form.phone.replace(/\D/g, '');
  if (phoneDigits.length < 10 || phoneDigits.length > 12) {
    errors.phone = 'Please enter a valid phone number.';
  }

  if (!form.city.trim()) {
    errors.city = 'Please enter your city.';
  }

  if (!form.address.trim() || form.address.trim().length < 10) {
    errors.address = 'Please enter your complete address (at least 10 characters).';
  }

  return errors;
}

export default function Checkout() {
  const { items, cartTotal, clearCart } = useCart();
  const navigate = useNavigate();

  const [form, setForm] = useState<CustomerDetails>(initialForm);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  if (items.length === 0) {
    return <Navigate to="/cart" replace />;
  }

  const handleChange = (field: keyof CustomerDetails) => (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // Guard against double-submission (e.g. accidental double-click) —
    // the button is also disabled while submitting, this is a second layer.
    if (submitting) return;

    const validationErrors = validate(form);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    setSubmitError(null);
    setSubmitting(true);

    try {
      const orderRef = generateOrderReference();
      const payload = buildOrderPayload(orderRef, form, items, cartTotal);
      const result = await submitOrder(payload);

      if (!result.success) {
        // Do NOT clear the cart and do NOT show success — the order was
        // not actually recorded, so the customer must be able to retry.
        setSubmitError(result.message || "We couldn't complete your order right now. Please try again.");
        setSubmitting(false);
        return;
      }

      const placedOrder: PlacedOrder = {
        orderRef: result.orderRef || orderRef,
        customer: form,
        items,
        subtotal: cartTotal,
      };

      // Only clear the cart and navigate to success AFTER the backend has
      // confirmed the order was actually saved.
      clearCart();
      navigate('/order-success', { state: { order: placedOrder } });
    } catch {
      // A genuine network failure (no internet, DNS issue, etc) — same
      // rule applies: cart stays intact, customer can try again.
      setSubmitError("We couldn't complete your order right now. Please check your connection and try again.");
      setSubmitting(false);
    }
  };

  return (
    <>
          <SEO title="Checkout" description="Complete your order details to place an order with Hussain Brothers." />

      <section className="container-page py-10 sm:py-14">
        <h1 className="font-display text-3xl font-semibold text-pine-800 sm:text-4xl">Checkout</h1>
        <p className="mt-2 max-w-md text-sm text-pine-500">
          No account needed. Fill in your details below to place your order.
        </p>

        <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-3 lg:gap-12">
          <form onSubmit={handleSubmit} noValidate className="rounded-2xl border border-pine-100 bg-white p-6 lg:col-span-2">
            <h2 className="font-display text-lg font-semibold text-pine-800">Customer Details</h2>

            <div className="mt-5 space-y-5">
              <div>
                <label htmlFor="name" className="label-field">Full Name</label>
                <input
                  id="name"
                  type="text"
                  value={form.name}
                  onChange={handleChange('name')}
                  className="input-field"
                  placeholder="e.g. Ali Hassan"
                  aria-invalid={Boolean(errors.name)}
                  aria-describedby={errors.name ? 'name-error' : undefined}
                />
                {errors.name && <p id="name-error" className="mt-1.5 text-xs text-red-500">{errors.name}</p>}
              </div>

              <div>
                <label htmlFor="phone" className="label-field">Phone Number</label>
                <input
                  id="phone"
                  type="tel"
                  value={form.phone}
                  onChange={handleChange('phone')}
                  className="input-field"
                  placeholder="03XX XXXXXXX"
                  aria-invalid={Boolean(errors.phone)}
                  aria-describedby={errors.phone ? 'phone-error' : undefined}
                />
                {errors.phone && <p id="phone-error" className="mt-1.5 text-xs text-red-500">{errors.phone}</p>}
              </div>

              <div>
                <label htmlFor="city" className="label-field">City</label>
                <input
                  id="city"
                  type="text"
                  value={form.city}
                  onChange={handleChange('city')}
                  className="input-field"
                  placeholder="e.g. Lahore"
                  aria-invalid={Boolean(errors.city)}
                  aria-describedby={errors.city ? 'city-error' : undefined}
                />
                {errors.city && <p id="city-error" className="mt-1.5 text-xs text-red-500">{errors.city}</p>}
              </div>

              <div>
                <label htmlFor="address" className="label-field">Complete Address</label>
                <textarea
                  id="address"
                  value={form.address}
                  onChange={handleChange('address')}
                  className="input-field min-h-[96px] resize-y"
                  placeholder="House / street, area, landmark..."
                  aria-invalid={Boolean(errors.address)}
                  aria-describedby={errors.address ? 'address-error' : undefined}
                />
                {errors.address && <p id="address-error" className="mt-1.5 text-xs text-red-500">{errors.address}</p>}
              </div>

              <div>
                <label htmlFor="note" className="label-field">Order Note (optional)</label>
                <textarea
                  id="note"
                  value={form.note}
                  onChange={handleChange('note')}
                  className="input-field min-h-[72px] resize-y"
                  placeholder="e.g. Please deliver as soon as possible"
                />
              </div>
            </div>

                      {submitError && (
              <div
                role="alert"
                className="mt-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600"
              >
                {submitError}
              </div>
            )}

            <button type="submit" disabled={submitting} className="btn-primary mt-7 w-full">
              {submitting ? (
                <>
                  <Loader2 size={17} className="animate-spin" />
                  Processing your order...
                </>
              ) : (
                <>
                  <PackageCheck size={17} />
                  Confirm Order
                </>
              )}
            </button>
            <p className="mt-3 text-center text-xs text-pine-400">
              {submitting
                ? "Please don't close this page — we're recording your order."
                : "We'll contact you to confirm delivery details after you place your order."}
            </p>
          </form>

          <aside className="h-fit rounded-2xl border border-pine-100 bg-white p-6">
            <div className="flex items-center justify-between gap-3">
              <h2 className="font-display text-lg font-semibold text-pine-800">Order Summary</h2>

              {/* Quick visual preview — up to 3 product photos, stacked */}
              <div className="flex items-center">
                {items.slice(0, 3).map((item, i) => (
                  <img
                    key={`${item.productId}__${item.weight}`}
                    src={item.image}
                    alt={item.name}
                    className="h-9 w-9 rounded-full border-2 border-white object-cover shadow-sm"
                    style={{ marginLeft: i === 0 ? 0 : -10 }}
                  />
                ))}
                {items.length > 3 && (
                  <span
                    className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-white bg-pine-100 text-[11px] font-semibold text-pine-700 shadow-sm"
                    style={{ marginLeft: -10 }}
                  >
                    +{items.length - 3}
                  </span>
                )}
              </div>
            </div>

            <div className="mt-4 space-y-3 border-b border-pine-100 pb-4">
              {items.map((item) => (
                <div key={`${item.productId}__${item.weight}`} className="flex items-center gap-3 text-sm">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-11 w-11 shrink-0 rounded-lg object-cover"
                  />
                  <span className="flex-1 text-pine-600">
                    {item.name} <span className="text-pine-400">({item.weight}) x{item.quantity}</span>
                  </span>
                  <span className="shrink-0 font-medium text-pine-800">{formatPrice(item.price * item.quantity)}</span>
                </div>
              ))}
            </div>
            <div className="mt-4 flex justify-between font-display text-lg font-semibold text-pine-800">
              <span>Subtotal</span>
              <span>{formatPrice(cartTotal)}</span>
            </div>
            <p className="mt-2 text-xs leading-relaxed text-pine-400">{DELIVERY_NOTE}</p>
            <Link to="/cart" className="btn-outline mt-5 w-full">
              Edit Cart
            </Link>
          </aside>
        </div>
      </section>
    </>
  );
}
