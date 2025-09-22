export interface User {
  uid: string;
  email: string;
  displayName?: string;
  photoURL?: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number; // For showing discounts
  image: string;
  images?: string[]; // Multiple product images
  category: string;
  brand: string;
  inStock: boolean;
  stockCount?: number;
  rating?: number;
  reviews?: number;
  features?: string[]; // Key features list
  specifications?: {
    [key: string]: string; // Technical specs
  };
  tags?: string[]; // Search tags
  discount?: number; // Discount percentage
  isNew?: boolean; // New product badge
  isBestseller?: boolean; // Bestseller badge
  deliveryInfo?: {
    freeDelivery: boolean;
    estimatedDays: number;
    expressDelivery?: boolean;
  };
  warranty?: string; // Warranty information
  seller?: string; // Seller name
  highlights?: string[]; // Product highlights
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Cart {
  items: CartItem[];
  total: number;
  itemCount: number;
}

export interface Address {
  id?: string;
  name: string;
  email: string;
  phone: string;
  street: string;
  city: string;
  state: string;
  pincode: string;
  landmark?: string;
  isDefault?: boolean;
}

export interface InvoiceItem {
  productName: string;
  quantity: number;
  price: number;
  total: number;
}

export interface Invoice {
  id: string;
  orderDate: Date;
  items: InvoiceItem[];
  subtotal: number;
  gst: number;
  total: number;
  address: Address;
  paymentMethod?: string;
  orderStatus: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
}

export interface CheckoutData {
  address: Address;
  paymentMethod: string;
  items: CartItem[];
  subtotal: number;
  gst: number;
  total: number;
}

export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, displayName?: string) => Promise<void>;
  logout: () => Promise<void>;
  loading: boolean;
}

export interface CartContextType {
  cart: Cart;
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
}