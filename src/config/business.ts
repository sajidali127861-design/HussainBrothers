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
export const WHATSAPP_NUMBER = '923495478106';

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
