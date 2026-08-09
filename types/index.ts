export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  image: string;
  badge?: string;
  rating: number;
}

export interface Review {
  id: string;
  name: string;
  location: string;
  quote: string;
  rating: number;
  initials: string;
}

export interface FeatureItem {
  id: string;
  title: string;
  description: string;
  icon: "leaf" | "recipe" | "delivery" | "secure";
}

export interface InstagramPost {
  id: string;
  image: string;
  likes: number;
}
export interface UserProfile {
  uid: string;
  fullName: string;
  email: string;
  phone: string;
  createdAt: string;
  favorites: string[];
  addresses: string[];
  orders: string[];
} 