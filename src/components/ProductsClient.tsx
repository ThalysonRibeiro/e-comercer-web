"use client";

import { useContext } from "react";
import { CardProductCarousel } from "@/components/cardProductCarousel";
import { ProductsProps } from "@/types/product";
import { Context, ContextType } from "@/context/Context";
import { useMemo } from "react";

interface ProductsClientProps {
  productsGroups: ProductsProps[][];
}

export function ProductsClient({ productsGroups }: ProductsClientProps) {
  const { wishList } = useContext(Context) as ContextType;

  const groups = useMemo(() => {
    if (!wishList?.items || wishList.items.length === 0) return productsGroups;

    return productsGroups.map(products =>
      products.map(product => ({
        ...product,
        isLiked: wishList.items.some(item => item.product.id.toString() === product.id.toString()),
      }))
    );
  }, [productsGroups, wishList]);


  return (
    <div className="w-full flex flex-col gap-3 items-center justify-center mt-6 px-6">
      {groups.length === 0 ? (
        <div className="w-full text-center p-6">Nenhum produto disponível.</div>
      ) : (
        groups.map((products, index) => (
          <CardProductCarousel key={index} products={products} />
        ))
      )}
    </div>
  );
}
