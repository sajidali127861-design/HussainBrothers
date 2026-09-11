import { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { ReactNode } from 'react';

interface CategoryCarouselProps {
  children: ReactNode[];
}

/**
 * Wraps a list of <CategoryCard /> elements in a single horizontally
 * scrollable row, with "← Previous" / "Next →" buttons below it.
 *
 * IMPORTANT: this component only controls LAYOUT (how cards are arranged
 * on screen). It does not render or restyle the cards themselves — each
 * child is rendered exactly as passed in, so CategoryCard's own design,
 * images, text, fonts and colors are completely untouched.
 */
export default function CategoryCarousel({ children }: CategoryCarouselProps) {
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
          <div key={i} className="w-[70vw] shrink-0 sm:w-[280px]">
            {child}
          </div>
        ))}
      </div>

      <div className="mt-5 flex items-center justify-center gap-3">
        <button
          type="button"
          onClick={() => scrollByAmount('prev')}
          aria-label="Previous categories"
          className="btn-outline"
        >
          <ChevronLeft size={16} />
          Previous
        </button>
        <button
          type="button"
          onClick={() => scrollByAmount('next')}
          aria-label="Next categories"
          className="btn-outline"
        >
          Next
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
}
