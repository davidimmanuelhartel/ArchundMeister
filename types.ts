/** Wählbare Holzart eines Produkts: Aufpreis auf den Grundpreis und eigene Bilder. */
export interface WoodOption {
  id: string;
  name: string;
  /** Kurzer Zusatz unter dem Namen, z. B. „Standard“ oder „schwarz gebeizt“. */
  note: string;
  surcharge: number;
  /** Bilder in dieser Holzart, das erste ist das Hauptbild. */
  images: string[];
  /** Kleines Holzmuster für die Auswahl. */
  swatch: string;
}

export interface Product {
  id: string;
  name: string;
  /** Grundpreis; mit Holzarten der Preis der ersten (Standard-)Holzart. */
  price: number;
  description: string;
  material: string;
  dimensions: string;
  sustainability: string;
  images: string[];
  tagline: string;
  comingSoon?: boolean;
  features?: string[];
  care?: string;
  woodOptions?: WoodOption[];
}

export interface FaqItem {
  question: string;
  answer: string;
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