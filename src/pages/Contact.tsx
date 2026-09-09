import { Clock, Mail, MapPin, MessageCircle, Phone } from 'lucide-react';
import SEO from '@/components/common/SEO';
import { CONTACT } from '@/config/business';
import { buildWhatsAppUrl } from '@/utils/whatsapp';

const CONTACT_ITEMS = [
  { icon: MessageCircle, label: 'WhatsApp', value: CONTACT.phone, href: buildWhatsAppUrl('Assalam o Alaikum, I have a question about your products.') },
  { icon: Phone, label: 'Phone', value: CONTACT.phone, href: `tel:${CONTACT.phone.replace(/\s/g, '')}` },
  { icon: Mail, label: 'Email', value: CONTACT.email, href: `mailto:${CONTACT.email}` },
  { icon: MapPin, label: 'Location', value: CONTACT.location },
  { icon: Clock, label: 'Business Hours', value: CONTACT.hours },
];

export default function Contact() {
  return (
    <>
      <SEO
        title="Contact Us"
        description="Get in touch with Hussain Brothers via WhatsApp, phone or email for orders and enquiries."
      />

      <section className="container-page py-12 sm:py-16">
        <span className="eyebrow">We'd love to hear from you</span>
        <h1 className="mt-2 font-display text-3xl font-semibold text-pine-800 sm:text-4xl">Contact Us</h1>
        <p className="mt-3 max-w-lg text-sm text-pine-500 sm:text-base">
          Questions about a product, bulk orders, or delivery? Reach out — we usually reply within
          the hour on WhatsApp.
        </p>

        <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="space-y-4">
            {CONTACT_ITEMS.map((item) => {
              const content = (
                <div className="flex items-start gap-4 rounded-2xl border border-pine-100 bg-white p-5">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-pine-50 text-pine-700">
                    <item.icon size={19} strokeWidth={1.75} />
                  </span>
                  <div>
                    <p className="text-xs font-medium text-pine-400">{item.label}</p>
                    <p className="mt-0.5 font-medium text-pine-800">{item.value}</p>
                  </div>
                </div>
              );

              return item.href ? (
                <a
                  key={item.label}
                  href={item.href}
                  target={item.href.startsWith('http') ? '_blank' : undefined}
                  rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="block transition-transform hover:-translate-y-0.5"
                >
                  {content}
                </a>
              ) : (
                <div key={item.label}>{content}</div>
              );
            })}
          </div>

          <div className="flex flex-col justify-center rounded-2xl bg-pine-800 p-8 text-center text-cream-100 sm:p-10">
            <MessageCircle size={36} className="mx-auto text-gold-400" strokeWidth={1.5} />
            <h2 className="mt-4 font-display text-xl font-semibold">Fastest way to reach us</h2>
            <p className="mt-2 text-sm text-cream-300">
              Message us directly on WhatsApp for orders, product questions or bulk pricing.
            </p>
            <a
              href={buildWhatsAppUrl('Assalam o Alaikum, I have a question about your products.')}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp mx-auto mt-6"
            >
              <MessageCircle size={17} />
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
