import { BUSINESS_NAME, WHATSAPP_NUMBER } from '@/config/business';

/**
 * Builds a wa.me URL for the configured business number and message.
 * Used for general "Chat on WhatsApp" contact buttons across the site
 * (header float button, footer, contact page, product inquiries) — NOT
 * for order submission, which now goes through the Google Apps Script
 * API instead (see src/utils/order.ts).
 */
export function buildWhatsAppUrl(message: string, phoneNumber: string = WHATSAPP_NUMBER): string {
  return `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
}

/**
 * A short, general "ask about a product" message used on product pages.
 */
export function buildProductInquiryMessage(productName: string, weight?: string): string {
  const weightLine = weight ? ` (${weight})` : '';
  return `Assalam o Alaikum ${BUSINESS_NAME}\n\nI'm interested in ${productName}${weightLine}. Could you share more details?`;
}
