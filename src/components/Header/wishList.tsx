"use client"
import Image from "next/image";
import Link from "next/link";
import { formatCurrency } from "@/utils/formatCurrency";
import { useEffect, useRef, useState } from "react";
import { Heart, ShoppingCart } from "lucide-react";
import { ProductsProps } from "@/types/product";
import { useAppContext } from "@/context/AppContext";

interface ListProps {
  userid: string;
  addItem: (newItem: ProductsProps) => void;
}

export function WishList({ userid, addItem }: ListProps) {
  const { wishList, addItemWishlist, removeFromWishlist } = useAppContext();
  const [openWishList, setOpenWishList] = useState<boolean>(false);
  const wishListRef = useRef<HTMLDivElement>(null);

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


  return (

    <div ref={wishListRef} className="relative flex items-center">
      <button
        className="transition duration-300 hover:text-accent cursor-pointer"
        onClick={wishToggleDropdown}
        aria-haspopup="true"
        aria-expanded={openWishList}
        aria-controls="user-dropdown"
      >
        <Heart className="size-6" />
      </button>
      {openWishList && (
        <div className="absolute top-15 -right-15 z-10">
          <div className="absolute z-10 -top-2.5 right-16 w-0 h-0 border-card border-l-8 border-r-8 border-b-8 border-l-transparent border-r-transparent border-b-black animate-bounce" />
          <div className="w-90 max-h-120 overflow-auto space-y-4 p-3 bg-card border border-border rounded-lg relative">
            <div className="inline-flex justify-between w-full">
              <h1 className="text-lg font-semibold">
                Lista de desejos
              </h1>
              <Link
                href="/"
                className="text-primary transition-colors duration-300 hover:text-accent"
              >
                Lista completa
              </Link>
            </div>
            {(!wishList?.items || wishList.items.length === 0) ? (
              <div className="text-center py-4">
                <p> Sua lista de desejos está vazia</p>
                <p> Adicione produtos!</p>
              </div>
            ) : (
              wishList?.items.map(item => (
                <div
                  key={item?.id}
                  className="w-full h-25 flex justify-between p-2 rounded-lg border border-border hover:bg-background transition-colors"
                >
                  <div className="max-h-25 max-w-24 w-full relative rounded-lg overflow-hidden">
                    <Image
                      src={item?.product?.images[0]?.image}
                      alt={`Imagem do ${item?.product?.title}`}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover"
                    />
                  </div>
                  <div className="w-full flex flex-col justify-between ml-2 pl-2 border-l border-l-border">
                    <p className="line-clamp-1 text-sm font-medium">{item?.product?.title}</p>
                    <p className="text-price font-semibold">
                      {formatCurrency((item?.product?.price / 100))}
                    </p>
                    <div className="flex justify-between text-sm ">
                      <button
                        onClick={() => addItem(item?.product)}
                        className="inline-flex items-center gap-2 cursor-pointer hover:text-accent">
                        <ShoppingCart className="size-6" />
                        Adicionar
                      </button>
                      <button
                        onClick={() => removeFromWishlist(item?.id)}
                        className="cursor-pointer hover:text-accent"
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