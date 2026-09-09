import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, ShoppingBag, X } from 'lucide-react';
import Logo from '@/components/common/Logo';
import { useCart } from '@/context/CartContext';

const NAV_LINKS = [
  { label: 'Home', to: '/' },
  { label: 'Shop', to: '/shop' },
  { label: 'Categories', to: '/categories' },
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/contact' },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { cartItemCount } = useCart();
  const location = useLocation();

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  return (
    <header className="sticky top-0 z-50 border-b border-pine-100 bg-cream-100/95 backdrop-blur">
      <div className="container-page flex h-16 items-center justify-between md:h-20">
        <Link to="/" aria-label="Hussain Brothers home">
          <Logo />
        </Link>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/'}
              className={({ isActive }) =>
                `text-sm font-medium transition-colors ${
                  isActive ? 'text-pine-800' : 'text-pine-500 hover:text-pine-800'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            to="/cart"
            aria-label={`View cart, ${cartItemCount} items`}
            className="relative flex h-10 w-10 items-center justify-center rounded-full text-pine-700 transition-colors hover:bg-pine-50"
          >
            <ShoppingBag size={22} strokeWidth={1.75} />
            {cartItemCount > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-5 min-w-[1.25rem] items-center justify-center rounded-full bg-gold-500 px-1 text-[11px] font-semibold text-pine-900">
                {cartItemCount}
              </span>
            )}
          </Link>

          <button
            type="button"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
            className="flex h-10 w-10 items-center justify-center rounded-full text-pine-700 hover:bg-pine-50 md:hidden"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav
          className="animate-fade-in border-t border-pine-100 bg-cream-100 px-4 pb-6 pt-2 md:hidden"
          aria-label="Mobile"
        >
          <ul className="flex flex-col divide-y divide-pine-100">
            {NAV_LINKS.map((link) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  end={link.to === '/'}
                  className={({ isActive }) =>
                    `block py-3.5 text-base font-medium ${isActive ? 'text-pine-800' : 'text-pine-600'}`
                  }
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
