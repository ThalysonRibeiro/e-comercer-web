import { ProductsProps } from "./product";

export interface Category {
  id: string;
  name: string;
  description: string | null;
  image: string | null;
  parentId: string | null;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  children: Category[];
  products: ProductsProps[]; // tipagem dos produtos você já tem, então deixei como unknown[]
}
