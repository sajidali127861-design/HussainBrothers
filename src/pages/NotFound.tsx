import { Compass } from 'lucide-react';
import SEO from '@/components/common/SEO';
import EmptyState from '@/components/common/EmptyState';

export default function NotFound() {
  return (
    <>
      <SEO title="Page Not Found" description="The page you're looking for doesn't exist." />
      <section className="container-page py-20">
        <EmptyState
          icon={Compass}
          title="Page not found"
          description="The page you're looking for doesn't exist or may have moved."
          actionLabel="Back to Home"
          actionHref="/"
        />
      </section>
    </>
  );
}
