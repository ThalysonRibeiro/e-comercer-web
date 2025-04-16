"use client"
import { CardProduct } from "@/components/ui/cardProduct";
import api from "@/lib/axios";
import { ProductsProps } from "@/types/product";
import { useEffect, useState } from "react";

export function ListItems() {

  const [products, setProducts] = useState<ProductsProps[]>([]);

  useEffect(() => {
    async function getProducts() {
      const response = await api.get('/products');
      setProducts(response.data)
    }
    getProducts();
  }, [])



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