export type Category =
  | 'Nuts'
  | 'Dried Fruits'
  | 'Kernels'
  | 'Natural Products'
  | 'Shilajit';

export interface ProductVariant {
  weight: string; // e.g. "250g", "500g", "1kg"
  price: number; // in PKR
  stock: number;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  longDescription?: string;
  category: Category;
  origin: string;
  images: string[];
  featured: boolean;
  variants: ProductVariant[];
}

export interface CartItem {
  productId: string;
  name: string;
  slug: string;
  image: string;
  weight: string;
  price: number;
  quantity: number;
}

export interface CustomerDetails {
  name: string;
  phone: string;
  city: string;
  address: string;
  note?: string;
}

export type SortOption = 'featured' | 'price-asc' | 'price-desc' | 'name-asc';

/** One line item as sent to the Google Apps Script order endpoint. */
export interface OrderItemPayload {
  productName: string;
  weight: string;
  quantity: number;
  price: number;
}

/** Full request body sent to the Google Apps Script Web App. */
export interface OrderPayload {
  orderRef: string;
  date: string;
  customer: CustomerDetails;
  items: OrderItemPayload[];
  subtotal: number;
  total: number;
}

/** Response shape returned by the Google Apps Script Web App. */
export interface OrderApiResponse {
  success: boolean;
  orderRef?: string;
  message: string;
}

/** What gets passed to the Order Success page after a confirmed order. */
export interface PlacedOrder {
  orderRef: string;
  customer: CustomerDetails;
  items: CartItem[];
  subtotal: number;
}
