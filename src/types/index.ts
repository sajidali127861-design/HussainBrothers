export type Category =
  |'Nuts'
  |'Dried Fruits'
  |'Kernels'
  |'Natural Products'
  |'Shilajit';

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

export type SortOption = 'popular' | 'price-asc' | 'price-desc' | 'name-asc';
