import { MessageCircle } from 'lucide-react';
import { buildWhatsAppUrl } from '@/utils/whatsapp';
import { BUSINESS_NAME } from '@/config/business';

const GENERAL_MESSAGE = `Assalam o Alaikum ${BUSINESS_NAME}, I have a question about your products.`;

export default function WhatsAppFloatButton() {
  return (
    <a
      href={buildWhatsAppUrl(GENERAL_MESSAGE)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#1F7A5C] text-white shadow-soft transition-transform hover:scale-105 active:scale-95 md:bottom-6 md:right-6"
    >
      <MessageCircle size={26} fill="currentColor" className="text-white" strokeWidth={0} />
      <span className="absolute inset-0 -z-10 animate-ping rounded-full bg-[#1F7A5C]/40" />
    </a>
  );
}
