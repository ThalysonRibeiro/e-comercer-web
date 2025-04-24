export interface ReviewProps {
  id: string;
  userId: string;
  productId: string;
  rating: number;
  comment: string;
  title: string;
  images: string[];
  createdAt: Date;
  updatedAt: Date;
  user: {
    name: string;
    avatar: string;
  }
}