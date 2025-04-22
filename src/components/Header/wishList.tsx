"use client"
import Image from "next/image";
import Link from "next/link";
import { formatCurrency } from "@/utils/formatCurrency";
import { useEffect, useRef, useState } from "react";
import { WishlistProps } from "@/types/user";
import { Heart, ShoppingCart } from "lucide-react";
import { ProductsProps } from "@/types/product";
import api from "@/lib/axios";
import { toast } from "react-toastify";

interface ListProps {
  userid: string;
  addItem: (newItem: ProductsProps) => void;
}

export function WishList({ userid, addItem }: ListProps) {
  const [openWishList, setOpenWishList] = useState<boolean>(false);
  const wishListRef = useRef<HTMLDivElement>(null);
  const [wishList, setWishList] = useState<WishlistProps | null>(null);

  // useEffect(() => {
  // }, [wishList]);


  function wishToggleDropdown() {
    setOpenWishList(prev => !prev);
  }

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wishListRef.current && !wishListRef.current.contains(event.target as Node)) {
        setOpenWishList(false);
      }
    }

    function handleEsKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpenWishList(false);
      }
    }

    if (openWishList) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleEsKey);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEsKey);
    }
  }, [openWishList]);

  useEffect(() => {
    async function getWishList() {
      const { data } = await api.get(`/wishlist/user/${userid}`)
      setWishList(data);
    }
    getWishList();
  }, []);

  async function handleRemoveFromWishlist(itemId: string) {
    try {
      const { data } = await api.delete(`/wishlist/${itemId}`);

      setWishList(prev => ({
        ...prev!,
        items: prev!.items.filter(item => item.id !== itemId)
      }));
      console.log(data);

      return toast.success(`${data.message}`)
    } catch (error) {
      console.log(error);
      toast.error('Erro ao tentar remover item da lista de desejos');
    }
  }



  return (

    <div ref={wishListRef} className="relative flex items-center">
      <button
        className="transition duration-300 hover:text-hover cursor-pointer"
        onClick={wishToggleDropdown}
        aria-haspopup="true"
        aria-expanded={openWishList}
        aria-controls="user-dropdown"
      >
        <Heart className="size-6" />
      </button>
      {openWishList && (
        <div className="absolute top-15 -right-15 z-10">
          <div className="absolute z-10 -top-2.5 right-16 w-0 h-0 border-textButton border-l-8 border-r-8 border-b-8 border-l-transparent border-r-transparent border-b-black animate-bounce" />
          <div className="w-90 max-h-120 overflow-auto space-y-4 p-3 bg-bgCard border border-textButton rounded-lg relative">
            <div className="inline-flex justify-between w-full">
              <h1 className="text-lg font-semibold">
                Lista de desejos
              </h1>
              <Link
                href="/"
                className="text-primaryColor transition-colors duration-300 hover:text-hover"
              >
                Lista completa
              </Link>
            </div>
            {(!wishList?.items || wishList.items.length === 0) ? (
              <div className="text-center py-4 text-oldPrice">
                <p> Sua lista de desejos está vazia</p>
                <p> Adicione produtos!</p>
              </div>
            ) : (
              wishList.items.map(item => (
                <div
                  key={item.id}
                  className="w-full h-25 flex justify-between p-2 rounded-lg border border-textButton hover:bg-themeColor transition-colors"
                >
                  <div className="max-h-25 max-w-24 w-full relative rounded-lg overflow-hidden">
                    <Image
                      src={item.product.images[0].image}
                      alt={`Imagem do ${item.product.title}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="w-full flex flex-col justify-between ml-2 pl-2 border-l border-l-textButton">
                    <p className="line-clamp-1 text-sm font-medium">{item.product.title}</p>
                    <p className="text-price font-semibold">
                      {formatCurrency((item.product.price / 100))}
                    </p>
                    <div className="flex justify-between text-sm ">
                      <button
                        onClick={() => addItem(item.product)}
                        className="inline-flex items-center gap-2 cursor-pointer hover:text-hover">
                        <ShoppingCart className="size-6" />
                        Adicionar
                      </button>
                      <button
                        onClick={() => handleRemoveFromWishlist(item.id)}
                        className="cursor-pointer hover:text-hover"
                      >
                        Excluir
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  )
}