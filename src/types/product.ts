export interface ProductsProps {
  id: string;
  title: string;
  price: number;
  old_price: number;
  rating: number;
  promotion_time: number;
  description: string;
  products_sold: number;
  endDate: string;
  bigsale: boolean;
  sku: string;
  stock: number;
  category: string;
  brand: string;
  tags: string[],
  weight: number;
  width: number;
  height: number;
  length: number;
  isActive: boolean;
  featured: boolean;
  emphasis: boolean;
  color: string[],
  size: string[],
  categoryId: string;
  createdAt: Date;
  updatedAt: Date;
  images: ImageCardPrps[];
}

interface ImageCardPrps {
  id: string;
  image: string;
  productId: string;
}
