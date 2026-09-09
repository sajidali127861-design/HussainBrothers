import { Leaf } from 'lucide-react';
import { BUSINESS_NAME, BUSINESS_TAGLINE } from '@/config/business';

interface LogoProps {
  variant?: 'dark' | 'light';
  showTagline?: boolean;
}

/**
 * Text-based logo lockup for Hussain Brothers.
 * If a real logo asset is added under src/assets/logo.png, swap the
 * icon markup below for an <img> tag — nothing else needs to change.
 */
export default function Logo({ variant = 'dark', showTagline = true }: LogoProps) {
  const isDark = variant === 'dark';
  return (
    <div className="flex items-center gap-2.5">
      <span
        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full border ${
          isDark ? 'border-gold-500 text-gold-600' : 'border-gold-400 text-gold-400'
        }`}
      >
        <Leaf size={18} strokeWidth={1.75} />
      </span>
      <span className="flex flex-col leading-tight">
        <span
          className={`font-display text-lg font-semibold ${isDark ? 'text-pine-800' : 'text-cream-100'}`}
        >
          {BUSINESS_NAME}
        </span>
        {showTagline && (
          <span className={`text-[11px] tracking-wide ${isDark ? 'text-pine-400' : 'text-cream-300'}`}>
            {BUSINESS_TAGLINE}
          </span>
        )}
      </span>
    </div>
  );
}
