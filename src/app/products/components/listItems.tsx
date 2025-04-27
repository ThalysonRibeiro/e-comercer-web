"use client"
import { CardProduct } from "@/components/ui/cardProduct";
import { ProductsProps } from "@/types/product";
import { useState } from "react";


export function ListItems({ AllProducts }: { AllProducts: ProductsProps[] }) {

  const [products, setProducts] = useState<ProductsProps[]>(AllProducts);

  return (
    <>
      <div className="grid grid-cols-4 gap-6 w-full">
        {products?.map(item => (
          <CardProduct key={item?.id} product={item} />
        ))}
      </div>
    </>
  )
}