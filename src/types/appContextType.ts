import { ProductsProps } from "@/types/product";
import { ReactNode } from "react";
import { ProfileProps, WishlistProps } from "@/types/user";
import { User } from "next-auth";

export interface AppContextType {
  cart: CartProps[];
  cartAmount: number;
  total: string;
  addItemCart: (newItem: ProductsProps) => void;
  removeItemCart: (product: CartProps) => void;
  openCloseModalCart: () => void;
  openCloseModalLogin: () => void;
  openCloseModalRegister: () => void;
  isOpenModalCart: boolean;
  isOpenModalLogin: boolean;
  isOpenModalRegister: boolean;
  closeModalRegisterScrollY: () => void;
  userData: User | null;
  loading: boolean;
  openModalCartRef: React.RefObject<HTMLDivElement | null>;
  openModalLoginRef: React.RefObject<HTMLDivElement | null>;
  openModalRegisterRef: React.RefObject<HTMLDivElement | null>;
  profileDetail: ProfileProps | null;
  IsActiveTheme: () => void;
  toggleSideBar: () => void;
  openSideBar: boolean;
  sideBarRef: React.RefObject<HTMLDivElement | null>;
  wishList: WishlistProps | null;
  addItemWishlist: (productId: string) => void;
  removeFromWishlist: (itemId: string) => void;
  reloadWishList: boolean;
}

export interface CartProps extends ProductsProps {
  amount: number;
  total: number;
}

export interface ProviderProps {
  children: ReactNode;
}

export interface UserProps {
  user: User
}