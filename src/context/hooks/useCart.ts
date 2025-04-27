import { useState, useEffect, useRef } from "react";
import { CartProps } from "@/types/appContextType";
import { ProductsProps } from "@/types/product";

export function useCart() {
  const [cart, setCart] = useState<CartProps[]>([]);
  const [total, setTotal] = useState("");
  const [isOpenModalCart, setIsOpenModalCart] = useState<boolean>(false);
  const openModalCartRef = useRef<HTMLDivElement | null>(null);

  function addItemCart(newItem: ProductsProps) {
    const indexItem = cart.findIndex(item => item.id == newItem.id);

    if (indexItem !== -1) {
      let updateCart = [...cart];
      updateCart[indexItem].amount = updateCart[indexItem].amount + 1;
      updateCart[indexItem].total = updateCart[indexItem].amount * Number(updateCart[indexItem].price);

      setCart(updateCart);
      totalResultCart(updateCart);
      return;
    }

    let data: CartProps = {
      ...newItem,
      amount: 1,
      total: Number(newItem.price)
    };

    const newCart = [...cart, data];
    setCart(newCart);
    totalResultCart(newCart);
  }

  function removeItemCart(product: CartProps) {
    const indexItem = cart.findIndex(item => item.id == product.id);

    if (cart[indexItem]?.amount === 0 && isOpenModalCart === true) {
      return setIsOpenModalCart(false);
    }

    if (cart[indexItem]?.amount > 1) {
      let updateCart = [...cart];
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
    let result = items.reduce((acc, obj) => { return acc + obj.total }, 0);
    const resultFormatted = result.toLocaleString("pt-br", { style: "currency", currency: "BRL" });
    setTotal(resultFormatted);
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

  return {
    cart,
    total,
    addItemCart,
    removeItemCart,
    cartAmount: cart.length,
    openCloseModalCart,
    isOpenModalCart,
    openModalCartRef
  };
}