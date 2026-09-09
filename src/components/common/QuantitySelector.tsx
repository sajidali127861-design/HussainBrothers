import { Minus, Plus } from 'lucide-react';

interface QuantitySelectorProps {
  quantity: number;
  onChange: (quantity: number) => void;
  min?: number;
  max?: number;
  size?: 'sm' | 'md';
}

export default function QuantitySelector({
  quantity,
  onChange,
  min = 1,
  max = 99,
  size = 'md',
}: QuantitySelectorProps) {
  const dims = size === 'sm' ? 'h-8 w-8' : 'h-10 w-10';
  const textSize = size === 'sm' ? 'text-sm' : 'text-base';

  return (
    <div className="inline-flex items-center rounded-full border border-pine-200 bg-white">
      <button
        type="button"
        aria-label="Decrease quantity"
        disabled={quantity <= min}
        onClick={() => onChange(Math.max(min, quantity - 1))}
        className={`flex ${dims} items-center justify-center rounded-full text-pine-700 transition-colors hover:bg-pine-50 disabled:opacity-30 disabled:hover:bg-transparent`}
      >
        <Minus size={14} />
      </button>
      <span className={`w-8 text-center font-medium ${textSize} text-ink`}>{quantity}</span>
      <button
        type="button"
        aria-label="Increase quantity"
        disabled={quantity >= max}
        onClick={() => onChange(Math.min(max, quantity + 1))}
        className={`flex ${dims} items-center justify-center rounded-full text-pine-700 transition-colors hover:bg-pine-50 disabled:opacity-30 disabled:hover:bg-transparent`}
      >
        <Plus size={14} />
      </button>
    </div>
  );
}
