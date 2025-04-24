import { ProductsProps } from "./product";

export interface Category {
  id: string;
  name: string;
  description: string | null;
  image: string | null;
  parentId: string | null;
  createdAt: Date;
  updatedAt: Date;
  children: Category[];
  products: ProductsProps[];
}
