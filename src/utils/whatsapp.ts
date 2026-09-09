import { BUSINESS_NAME, WHATSAPP_NUMBER } from '@/config/business';
import type { CartItem, CustomerDetails } from '@/types';
import { formatPrice } from './currency';

/**
 * Builds a professional, human-readable order message for WhatsApp.
 */
export function buildOrderMessage(customer: CustomerDetails, items: CartItem[], subtotal: number): string {
  const lines: string[] = [];

  lines.push(`Assalam o Alaikum ${BUSINESS_NAME}`);
  lines.push('');
  lines.push('I would like to place an order.');
  lines.push('');
  lines.push('Customer Details');
  lines.push('');
  lines.push(`Name: ${customer.name}`);
  lines.push(`Phone: ${customer.phone}`);
  lines.push(`City: ${customer.city}`);
  lines.push(`Address: ${customer.address}`);
  lines.push('');
  lines.push('Order Details');
  lines.push('');

  items.forEach((item, index) => {
    lines.push(`${index + 1}. ${item.name}`);
    lines.push(`Weight: ${item.weight}`);
    lines.push(`Quantity: ${item.quantity}`);
    lines.push(`Price: ${formatPrice(item.price * item.quantity)}`);
    lines.push('');
  });

  lines.push(`Subtotal: ${formatPrice(subtotal)}`);

  if (customer.note && customer.note.trim().length > 0) {
    lines.push('');
    lines.push('Order Note:');
    lines.push(customer.note.trim());
  }

  lines.push('');
  lines.push('Thank you');

  return lines.join('\n');
}

/**
 * Builds a wa.me URL for the configured business number and message.
 */
export function buildWhatsAppUrl(message: string, phoneNumber: string = WHATSAPP_NUMBER): string {
  return `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
}

/**
 * Opens WhatsApp with a pre-filled message. Does not send automatically —
 * the customer must press Send inside WhatsApp.
 */
export function openWhatsApp(message: string, phoneNumber: string = WHATSAPP_NUMBER): void {
  const url = buildWhatsAppUrl(message, phoneNumber);
  window.open(url, '_blank', 'noopener,noreferrer');
}

/**
 * A short, general "ask about a product" message used on product pages.
 */
export function buildProductInquiryMessage(productName: string, weight?: string): string {
  const weightLine = weight ? ` (${weight})` : '';
  return `Assalam o Alaikum ${BUSINESS_NAME}\n\nI'm interested in ${productName}${weightLine}. Could you share more details?`;
}
