export interface navItem {
  id: number;
  label: string;
  href: string;
}

export interface ProductItem {
  id: number;
  name: string;
  description: string;
  price: number;
  oldPrice: number;
  images: string[];
  isAvailableAtWeb: boolean;
}

export interface SliderItem {
  id: number;
  name: string;
  type: string;
  image: string;
}
