import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import type { Category } from '@/types';

interface CategoryCardProps {
  name: Category;
  description: string;
  image: string;
}

export default function CategoryCard({ name, description, image }: CategoryCardProps) {
  return (
    <Link
      to={`/shop?category=${encodeURIComponent(name)}`}
      className="group relative flex aspect-[4/5] flex-col justify-end overflow-hidden rounded-2xl"
    >
      <img
        src={image}
        alt={name}
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-pine-950/90 via-pine-900/20 to-transparent" />
      <div className="relative flex items-end justify-between gap-2 p-5">
        <div>
          <h3 className="font-display text-lg font-semibold text-cream-100">{name}</h3>
          <p className="mt-1 text-xs text-cream-300">{description}</p>
        </div>
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gold-500 text-pine-900 transition-transform group-hover:rotate-45">
          <ArrowUpRight size={16} />
        </span>
      </div>
    </Link>
  );
}
