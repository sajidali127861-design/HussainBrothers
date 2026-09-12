/**
 * Central business configuration.
 * Update these values in ONE place — every component reads from here.
 * Later, when a backend is introduced, this file can be replaced by
 * a config fetched from the API without touching any component.
 */

export const BUSINESS_NAME = 'Hussain Brothers';
export const BUSINESS_TAGLINE = 'Skardu Dry Fruits & Natural Products';

// WhatsApp business number in international format, no "+" and no spaces.
// Example: Pakistani number 0301 2345678 -> "923012345678"
// Still used for the general "Chat on WhatsApp" buttons across the site
// (header, footer, contact page, product inquiries) — NOT for order
// submission anymore, that now goes through ORDER_API_URL below.
export const WHATSAPP_NUMBER = '923XXXXXXXXX';

// The public URL of your deployed Google Apps Script Web App.
// Set this in a `.env` file at the project root (see .env.example) as:
//   VITE_ORDER_API_URL=https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec
// This is safe to expose in the browser — it is just a public endpoint
// address, never a secret. All private Google operations (Sheets, Gmail)
// happen inside the Apps Script itself, never in this frontend code.
export const ORDER_API_URL = import.meta.env.VITE_ORDER_API_URL ?? '';

export const CONTACT = {
  phone: '+92 3XX XXXXXXX',
  whatsapp: WHATSAPP_NUMBER,
  email: 'hello@hussainbrothers.pk',
  location: 'Skardu, Gilgit-Baltistan, Pakistan',
  hours: 'Every day, 9:00 AM – 9:00 PM',
};

export const SOCIAL = {
  instagram: 'https://instagram.com/hussainbrothers',
  facebook: 'https://facebook.com/hussainbrothers',
};

export const DELIVERY_NOTE =
  'Delivery charges are calculated per city and confirmed on WhatsApp before dispatch.';

export const CURRENCY_SYMBOL = 'Rs';
