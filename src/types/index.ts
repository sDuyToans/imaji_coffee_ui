import React from "react";

export interface navItem {
  id: number;
  label: string;
  href: string;
}

export interface imageItem {
  id: number;
  imageUrl: string;
  isMain: boolean;
}

export enum ProductCategory {
  coffee_baverage = "coffee_baverage",
  food_snack = "food_snack",
  at_home = "at_home",
}
export interface ProductItem {
  productId: number;
  name: string;
  description: string;
  price: number;
  oldPrice: number;
  images: imageItem[];
  isAvailableAtWeb: boolean;
  category: ProductCategory;
  quantity: number;
  app_sale_percentage: number;
}

export interface ProductPageResponse {
  items: ProductItem[];
  totalPages: number;
  totalElements: number;
}

export interface SliderItem {
  id: number;
  name: string;
  type: string;
  image: string;
  to?: string;
}

export interface NewItem {
  newId: number;
  title: string;
  description: string;
  image: string;
  createdAt: string;
  time: string;
}

export interface EventItem {
  eventId: number;
  name: string;
  start_date: string;
  duration: string;
  image: string;
}

export interface Option {
  key: string;
  label: string;
}

export interface BreadCrumbItem {
  label: string;
  path?: string;
}

export interface PromoItem {
  promoId: number;
  code: string;
  title: string;
  description: string;
  discountType: "percentage" | "fixed" | "free_shipping";
  discountValue: number;
  startAt: string;
  endAt: string;
  isActive: boolean;
}

export interface PromosProduct {
  productId: number;
  availablePromos: PromoItem[];
  unavailablePromos: PromoItem[];
}

export interface ShippingMethodItem {
  map(
    arg0: (s: ShippingMethodItem) => import("react/jsx-runtime").JSX.Element,
  ): import("react").ReactNode;
  methodId: number;
  methodName: string;
  expectedArrival: string;
  price: number;
  value: "F" | "R" | "E" | "I";
}

export interface ShippingAddress {
  name: string;
  country: string;
  province: string;
  city: string;
  postalCode: string;
  street: string;
  apartment?: string;
  phoneNumber: string;
}

export interface CheckoutItem {
  productId: number;
  quantity: number;
  price: number;
}

export interface CheckoutData {
  userId: number | null;
  email: string;
  shipMethodId: number;
  shippingAddress: ShippingAddress;
  paymentMethod: "cod" | "paypal" | "card";
  items: CheckoutItem[];
}

export type ElementErrors = {
  cardNumber: string;
  cardExpiry: string;
  cardCVC: string;
};

export type StripeCheckoutProps = {
  errorMessage: string;
  isProcessing: boolean;
  elementErrors: ElementErrors;
  setElementErrors: React.Dispatch<React.SetStateAction<ElementErrors>>;
  setCardName: React.Dispatch<React.SetStateAction<string>>;
};

export interface CountrySelect {
  code: string;
  name: string;
}
