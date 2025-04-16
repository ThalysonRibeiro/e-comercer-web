"use client"
import { UserData } from "@/app/api/auth/[...nextauth]/route";
import { getServerAuthSession } from "@/lib/auth";
import { ProductsProps } from "@/types/product";
import { createContext, ReactNode, useEffect, useRef, useState } from "react";
import { useSession } from "next-auth/react";

export interface ContextType {
  cart: CartProps[];
  cartAmount: number;
  total: string;
  addItemCart: (newItem: ProductsProps) => void;
  removeItemCart: (pruduct: CartProps) => void;
  openCloseModal: () => void;
  isOpen: boolean;
  userData: UserData | null; // Pode ser null quando não há usuário logado
  loading: boolean;
  openModalRef: React.RefObject<HTMLDivElement | null>;
}

interface CartProps extends ProductsProps {
  amount: number;
  total: number;
}

interface ProviderProps {
  children: ReactNode;
}

interface UserProps {
  user: UserData
}

export const Context = createContext({} as ContextType);

function ProviderContext({ children }: ProviderProps) {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const openModalRef = useRef<HTMLDivElement>(null);

  const [cart, setCart] = useState<CartProps[]>([]);
  const [total, setTotal] = useState("");

  useEffect(() => {
    async function fetchUserData() {
      try {
        setLoading(true);
        const response = await fetch('/api/session');

        const data: UserProps = await response.json();
        setUserData(data.user);

        if (!data.user) {
          setUserData(null);
          return;
        }

        setUserData(data.user);
      } catch (err) {
        console.error('Erro ao buscar dados do usuário:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchUserData();
  }, []);

  function addItemCart(newItem: ProductsProps) {
    const indexItem = cart.findIndex(item => item.id == newItem.id);

    if (indexItem !== -1) {
      let updateCart = cart;

      updateCart[indexItem].amount = updateCart[indexItem].amount + 1;
      updateCart[indexItem].total = updateCart[indexItem].amount * Number(updateCart[indexItem].price);

      setCart(updateCart)
      totalResultCart(updateCart)
      return;
    }

    let data: CartProps = {
      ...newItem,
      amount: 1,
      total: Number(newItem.price)
    }
    setCart(products => [...products, data]);
    totalResultCart([...cart, data])
  }

  function removeItemCart(product: CartProps) {
    const indexItem = cart.findIndex(item => item.id == product.id);

    if (cart[indexItem]?.amount === 0 && isOpen === true) {
      return setIsOpen(false);
    }

    if (cart[indexItem]?.amount > 1) {
      let updateCart = cart;
      updateCart[indexItem].amount = updateCart[indexItem].amount - 1;
      updateCart[indexItem].total = updateCart[indexItem].total - Number(updateCart[indexItem].price);

      setCart(updateCart);
      totalResultCart(updateCart);
      return;
    }

    const removeItem = cart.filter(item => item.id !== product.id);
    setCart(removeItem);
    totalResultCart(removeItem);

  }

  function totalResultCart(items: CartProps[]) {
    let myCart = items;
    let result = myCart.reduce((acc, obj) => { return acc + obj.total }, 0);
    const resultFomated = result.toLocaleString("pt-br", { style: "currency", currency: "BRL" });
    console.log(resultFomated);
    console.log(Number(resultFomated));

    setTotal(resultFomated);
  }

  function openCloseModal() {
    setIsOpen(!isOpen);
  }

  useEffect(() => {
    if (cart.length === 0) {
      return setIsOpen(false);
    }
  }, [cart]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (openModalRef.current && !openModalRef.current.contains(event.target as Node) && isOpen) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <Context
      value={{
        cart,
        total,
        addItemCart,
        removeItemCart,
        cartAmount: cart.length,
        openCloseModal,
        isOpen,
        userData, // Usando o userData do state
        loading, // Adicionando loading ao contexto
        openModalRef
      }}
    >
      {children}
    </Context>
  )
}

export default ProviderContext;