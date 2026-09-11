import { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { ReactNode } from 'react';

interface ProductCarouselProps {
  children: ReactNode[];
}

/**
 * Wraps a list of <ProductCard /> elements in a single horizontally
 * scrollable row, with "← Previous" / "Next →" buttons below it.
 *
 * IMPORTANT: this component only controls LAYOUT. It does not render or
 * restyle the cards themselves — each child is rendered exactly as
 * passed in, so ProductCard's own design (image, price, quick add-to-cart
 * button, etc.) is completely untouched.
 */
export default function ProductCarousel({ children }: ProductCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollByAmount = (direction: 'prev' | 'next') => {
    const el = scrollRef.current;
    if (!el) return;
    const amount = el.clientWidth * 0.9;
    el.scrollBy({ left: direction === 'next' ? amount : -amount, behavior: 'smooth' });
  };

  return (
    <div>
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto scroll-smooth pb-1 sm:gap-5 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {children.map((child, i) => (
          <div key={i} className="w-[46vw] shrink-0 sm:w-[240px] lg:w-[260px]">
            {child}
          </div>
        ))}
      </div>

      <div className="mt-5 flex items-center justify-center gap-3">
        <button
          type="button"
          onClick={() => scrollByAmount('prev')}
          aria-label="Previous products"
          className="btn-outline"
        >
          <ChevronLeft size={16} />
          Previous
        </button>
        <button
          type="button"
          onClick={() => scrollByAmount('next')}
          aria-label="Next products"
          className="btn-outline"
        >
          Next
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
}
