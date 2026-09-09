import { Link } from 'react-router-dom';
import { MapPin, MessageCircle, Phone } from 'lucide-react';
import Logo from '@/components/common/Logo';
import { CATEGORIES } from '@/data/products';
import { CONTACT } from '@/config/business';
import { buildWhatsAppUrl } from '@/utils/whatsapp';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-pine-900 text-cream-200">
      <div className="container-page grid grid-cols-1 gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4 lg:py-16">
        <div>
          <Logo variant="light" />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-cream-300">
            Premium dry fruits, nuts and natural products sourced from the valleys of Skardu —
            fresh, natural and trusted by families across Pakistan.
          </p>
        </div>

        <div>
          <h4 className="font-display text-sm font-semibold text-cream-100">Navigate</h4>
          <ul className="mt-4 space-y-2.5 text-sm text-cream-300">
            <li><Link to="/" className="hover:text-gold-400">Home</Link></li>
            <li><Link to="/shop" className="hover:text-gold-400">Shop</Link></li>
            <li><Link to="/categories" className="hover:text-gold-400">Categories</Link></li>
            <li><Link to="/about" className="hover:text-gold-400">About</Link></li>
            <li><Link to="/contact" className="hover:text-gold-400">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-display text-sm font-semibold text-cream-100">Categories</h4>
          <ul className="mt-4 space-y-2.5 text-sm text-cream-300">
            {CATEGORIES.map((category) => (
              <li key={category.name}>
                <Link to={`/shop?category=${encodeURIComponent(category.name)}`} className="hover:text-gold-400">
                  {category.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-display text-sm font-semibold text-cream-100">Get in touch</h4>
          <ul className="mt-4 space-y-3 text-sm text-cream-300">
            <li className="flex items-start gap-2.5">
              <MapPin size={16} className="mt-0.5 shrink-0 text-gold-400" />
              <span>{CONTACT.location}</span>
            </li>
            <li className="flex items-start gap-2.5">
              <Phone size={16} className="mt-0.5 shrink-0 text-gold-400" />
              <span>{CONTACT.phone}</span>
            </li>
            <li>
              <a
                href={buildWhatsAppUrl('Assalam o Alaikum, I have a question about your products.')}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-1 inline-flex items-center gap-2 rounded-full bg-[#1F7A5C] px-4 py-2 text-xs font-semibold text-white hover:bg-[#186049]"
              >
                <MessageCircle size={14} />
                Chat on WhatsApp
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-pine-800">
        <div className="container-page flex flex-col items-center justify-between gap-2 py-5 text-xs text-cream-400 sm:flex-row">
          <span>© {year} Hussain Brothers. All rights reserved.</span>
          <span>Skardu, Gilgit-Baltistan · Pakistan</span>
        </div>
      </div>
    </footer>
  );
}
