import { ProductsProps } from "./product";

export interface ProfileProps {

  id: string;
  status: string;
  type: string;
  name: string;
  cpf_or_cnpj: string;
  genero: string;
  dateOfBirth: Date;
  email: string;
  phone: string;
  resetPasswordToken: string;
  resetPasswordExpires: string;
  emailVerified: Date;
  emailVerificationToken: string;
  googleId: string;
  avatar: string;
  acceptOffers: boolean;
  acceptTerms: boolean;
  documentType: string;
  createdAt: Date;
  updatedAt: Date;
  orderItem: OrderItemsProps[];
  order: OrderProps[];
  addresses: AddressProps[];
  reviews: ReviewProps[];
  wishlist: WishlistProps;
  cart: CartProps;
}

interface OrderItemsProps { }
interface OrderProps { }

interface AddressProps {
  id: string;
  street: string;
  number: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  complemento: string;
  addressType: string;
  isDefault: boolean;
  userId: string;
}
interface ReviewProps {
  id: string;
  userId: string;
  productId: string;
  rating: number;
  comment: string;
  title: string;
  images: string[];
}
export interface WishlistProps {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  items: ItemsProps[];
}

interface ItemsProps {
  id: string;
  wishlistId: string;
  productId: string;
  createdAt: Date;
  updatedAt: Date;
  product: ProductsProps;
}
interface CartProps { }

