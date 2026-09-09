import type { ReactNode } from 'react';
import Header from './Header';
import Footer from './Footer';
import WhatsAppFloatButton from '@/components/common/WhatsAppFloatButton';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-cream-100">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
      <WhatsAppFloatButton />
    </div>
  );
}
