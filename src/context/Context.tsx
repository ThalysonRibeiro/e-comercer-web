"use client"
import { UserData } from "@/app/api/auth/[...nextauth]/route";
import { ProductsProps } from "@/types/product";
import { createContext, ReactNode, useEffect, useRef, useState } from "react";
import api from "@/lib/axios";
import { ProfileProps } from "@/types/user";
import { useToastState } from "@/app/hooks/toast/toast";
import { ToastItem, ToastType } from "@/app/hooks/toast/toastItem";
import ThemeLoader from "@/components/ThemeLoader";

export interface ContextType {
  cart: CartProps[];
  cartAmount: number;
  total: string;
  addItemCart: (newItem: ProductsProps) => void;
  removeItemCart: (pruduct: CartProps) => void;
  openCloseModalCart: () => void;
  openCloseModalLogin: () => void;
  openCloseModalRegister: () => void;
  isOpenModalCart: boolean;
  isOpenModalLogin: boolean;
  isOpenModalRegister: boolean;
  closeModalRegisterScrollY: () => void;
  userData: UserData | null; // Pode ser null quando não há usuário logado
  loading: boolean;
  openModalCartRef: React.RefObject<HTMLDivElement | null>;
  openModalLoginRef: React.RefObject<HTMLDivElement | null>;
  openModalRegisterRef: React.RefObject<HTMLDivElement | null>;
  profileDetail: ProfileProps | null;
  addToast: (type: ToastType, message: string, duration?: number) => string;
  removeToast: (id: string) => void;
  IsActiveTheme: () => void;
  toggleSideBar: () => void;
  openSideBar: boolean;
  sideBarRef: React.RefObject<HTMLDivElement | null>;
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
  const [isOpenModalCart, setIsOpenModalCart] = useState<boolean>(false);
  const [isOpenModalLogin, setIsOpenModalLogin] = useState<boolean>(false);
  const [isOpenModalRegister, setIsOpenModalRegister] = useState<boolean>(false);
  const openModalCartRef = useRef<HTMLDivElement>(null);
  const openModalLoginRef = useRef<HTMLDivElement>(null);
  const openModalRegisterRef = useRef<HTMLDivElement>(null);
  const [profileDetail, setProfileDetail] = useState<ProfileProps | null>(null);
  const { toasts, addToast, removeToast } = useToastState();
  const [activeTheme, setActiveTheme] = useState<boolean>(true);
  const [openSideBar, setOpenSideBar] = useState(false);
  const sideBarRef = useRef<HTMLDivElement | null>(null);



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

    if (cart[indexItem]?.amount === 0 && isOpenModalCart === true) {
      return setIsOpenModalCart(false);
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

  function openCloseModalCart() {
    setIsOpenModalCart(!isOpenModalCart);
  }

  useEffect(() => {
    if (cart.length === 0) {
      return setIsOpenModalCart(false);
    }
  }, [cart]);

  useEffect(() => {
    function handleClickOutsideCart(event: MouseEvent) {
      if (openModalCartRef.current && !openModalCartRef.current.contains(event.target as Node) && isOpenModalCart) {
        setIsOpenModalCart(false);
      }
    }

    if (isOpenModalCart) {
      document.addEventListener("mousedown", handleClickOutsideCart);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutsideCart);
    };
  }, [isOpenModalCart]);

  //modal login e register
  function openCloseModalLogin() {
    setIsOpenModalLogin(!isOpenModalLogin);
  }
  useEffect(() => {
    function handleClickOutsideLogin(event: MouseEvent) {
      if (openModalLoginRef.current && !openModalLoginRef.current.contains(event.target as Node) && isOpenModalLogin) {
        setIsOpenModalLogin(false);
      }
    }

    if (isOpenModalLogin) {
      document.addEventListener("mousedown", handleClickOutsideLogin);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutsideLogin);
    };
  }, [isOpenModalLogin]);

  function openCloseModalRegister() {
    setIsOpenModalRegister(!isOpenModalRegister);
  }
  useEffect(() => {
    function handleClickOutsideRegister(event: MouseEvent) {
      if (openModalRegisterRef.current && !openModalRegisterRef.current.contains(event.target as Node) && isOpenModalRegister) {
        setIsOpenModalRegister(false);

      }
    }

    if (isOpenModalRegister) {
      document.addEventListener("mousedown", handleClickOutsideRegister);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutsideRegister);
    };

  }, [isOpenModalRegister]);

  function closeModalRegisterScrollY() {
    setIsOpenModalRegister(false);
  }


  useEffect(() => {
    async function getFullUserDetails() {

      if (!userData?.id) return; // evita request desnecessário

      try {
        const response = await api.get(`/auth/profile/${userData.id}`);
        setProfileDetail(response.data);

      } catch (error) {
        console.error('Erro ao buscar dados do usuário:', error);
      }

    }
    getFullUserDetails();
  }, [userData?.id])

  function IsActiveTheme() {
    setActiveTheme(!activeTheme);
  }

  function toggleSideBar() {
    setOpenSideBar(!openSideBar);
  }

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (sideBarRef.current && !sideBarRef.current.contains(event.target as Node)) {
        setOpenSideBar(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    }
  }, []);


  return (
    <Context
      value={{
        cart,
        total,
        addItemCart,
        removeItemCart,
        cartAmount: cart.length,
        openCloseModalCart,
        isOpenModalCart,
        userData, // Usando o userData do state
        loading, // Adicionando loading ao contexto
        openModalCartRef,
        openModalLoginRef,
        openModalRegisterRef,
        openCloseModalLogin,
        openCloseModalRegister,
        isOpenModalLogin,
        isOpenModalRegister,
        closeModalRegisterScrollY,
        profileDetail,
        addToast,
        removeToast,
        IsActiveTheme,
        toggleSideBar,
        openSideBar,
        sideBarRef
      }}
    >
      <ThemeLoader isDarkTheme={activeTheme} />
      {children}
      <div className="fixed top-4 right-4 w-64 z-50">
        {toasts.map((toast) => (
          <ToastItem
            key={toast.id}
            id={toast.id}
            type={toast.type}
            message={toast.message}
            duration={toast.duration}
            onClose={removeToast}
          />
        ))}
      </div>
    </Context>
  )
}

export default ProviderContext;