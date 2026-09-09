import { Link } from 'react-router-dom';
import { CheckCircle2, MessageCircle, ShoppingBag } from 'lucide-react';
import SEO from '@/components/common/SEO';
import { buildWhatsAppUrl } from '@/utils/whatsapp';
import { BUSINESS_NAME } from '@/config/business';

const FOLLOW_UP_MESSAGE = `Assalam o Alaikum ${BUSINESS_NAME}, I just placed an order on your website.`;

export default function OrderSuccess() {
  return (
    <>
      <SEO title="Order Ready" description="Your Hussain Brothers order is ready to be sent on WhatsApp." />

      <section className="container-page flex flex-col items-center py-20 text-center sm:py-28">
        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-pine-50 text-pine-600">
          <CheckCircle2 size={32} strokeWidth={1.5} />
        </span>
        <h1 className="mt-6 font-display text-3xl font-semibold text-pine-800 sm:text-4xl">
          Your order is ready
        </h1>
        <p className="mt-3 max-w-md text-sm text-pine-500 sm:text-base">
          Please send the WhatsApp message to confirm your order. Our team will get in touch to
          confirm delivery details and timing.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <a href={buildWhatsAppUrl(FOLLOW_UP_MESSAGE)} target="_blank" rel="noopener noreferrer" className="btn-whatsapp">
            <MessageCircle size={17} />
            Open WhatsApp
          </a>
          <Link to="/shop" className="btn-outline">
            <ShoppingBag size={17} />
            Continue Shopping
          </Link>
        </div>
      </section>
    </>
  );
}
