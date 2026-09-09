import { useEffect } from 'react';
import { BUSINESS_NAME } from '@/config/business';

interface SEOProps {
  title: string;
  description: string;
}

/**
 * Lightweight, dependency-free SEO helper.
 * Sets the document title and meta description per page.
 */
export default function SEO({ title, description }: SEOProps) {
  useEffect(() => {
    document.title = `${title} | ${BUSINESS_NAME}`;

    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', description);

    let ogTitle = document.querySelector('meta[property="og:title"]');
    if (!ogTitle) {
      ogTitle = document.createElement('meta');
      ogTitle.setAttribute('property', 'og:title');
      document.head.appendChild(ogTitle);
    }
    ogTitle.setAttribute('content', `${title} | ${BUSINESS_NAME}`);

    let ogDescription = document.querySelector('meta[property="og:description"]');
    if (!ogDescription) {
      ogDescription = document.createElement('meta');
      ogDescription.setAttribute('property', 'og:description');
      document.head.appendChild(ogDescription);
    }
    ogDescription.setAttribute('content', description);
  }, [title, description]);

  return null;
}
