export interface navItem {
  id: number;
  label: string;
  href: string;
}

export interface imageItem {
  id: number;
  imageUrl: string;
}

export interface ProductItem {
  productId: number;
  name: string;
  description: string;
  price: number;
  oldPrice: number;
  images: imageItem[];
  isAvailableAtWeb: boolean;
}

export interface SliderItem {
  id: number;
  name: string;
  type: string;
  image: string;
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
