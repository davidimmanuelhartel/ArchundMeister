export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  material: string;
  dimensions: string;
  sustainability: string;
  images: string[];
  tagline: string;
}

export interface OrderForm {
  name: string;
  email: string;
  phone: string;
  street: string;
  houseNumber: string;
  postcode: string;
  country: string;
}

export enum View {
  HOME = 'home',
  SHOP = 'shop',
  PRODUCT = 'product',
  CHECKOUT = 'checkout',
  CONFIRMATION = 'confirmation',
  IMPRINT = 'imprint',
  PRIVACY = 'privacy',
  TERMS = 'terms',
  SHIPPING = 'shipping',
  WITHDRAWAL = 'withdrawal'
}