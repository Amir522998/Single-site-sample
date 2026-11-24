export type ScreenId =
  | 'home'
  | 'product-listing'
  | 'cart'
  | 'checkout'
  | 'profile'
  | 'product-detail';

export type TransitionType = 'none' | 'push' | 'push_back';

export type CategoryId = 'all' | 'mobile' | 'laptop' | 'audio' | 'wearable' | 'tablet';

export interface ProductColor {
  id: string;
  name: string;
  hex: string;
}

export interface ProductStorageOption {
  label: string;
  priceDelta: number;
}

export interface ProductSpec {
  label: string;
  value: string;
}

export interface Product {
  id: string;
  name: string;
  persianSubtitle: string;
  brand: string;
  category: Exclude<CategoryId, 'all'>;
  categoryLabel: string;
  basePrice: number;
  originalPrice?: number;
  rating: string;
  reviewCount: number;
  inStock: boolean;
  stockNote: string;
  image: string;
  description: string;
  colors: ProductColor[];
  storageOptions: ProductStorageOption[];
  specs: ProductSpec[];
  featured?: boolean;
}

export interface CartItem {
  key: string;
  productId: string;
  colorName: string;
  colorHex: string;
  storageLabel: string;
  unitPrice: number;
  quantity: number;
}

export interface OrderRecord {
  id: string;
  date: string;
  status: string;
  total: number;
  itemsSummary: string;
  itemCount: number;
}

export interface UserProfile {
  fullName: string;
  email: string;
  phone: string;
  city: string;
  address: string;
  postalCode: string;
  memberSince: string;
}
