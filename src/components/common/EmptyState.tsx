import type { LucideIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  actionLabel?: string;
  actionHref?: string;
}

export default function EmptyState({ icon: Icon, title, description, actionLabel, actionHref }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-pine-200 bg-white/60 px-6 py-16 text-center">
      <span className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-pine-50 text-pine-600">
        <Icon size={28} strokeWidth={1.5} />
      </span>
      <h3 className="font-display text-xl font-semibold text-pine-800">{title}</h3>
      <p className="mt-2 max-w-sm text-sm text-pine-500">{description}</p>
      {actionLabel && actionHref && (
        <Link to={actionHref} className="btn-primary mt-6">
          {actionLabel}
        </Link>
      )}
    </div>
  );
}
