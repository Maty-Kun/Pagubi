export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
}

export interface ProductInput {
  name: string;
  description: string;
  price: number;
  imageUrl: string;
}