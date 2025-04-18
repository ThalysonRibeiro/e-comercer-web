"use client"
import Image from "next/image";
import { ProductsProps } from "@/types/product";
import { StarRating } from '../starRating';
import { Flex } from './flex';
import { Button } from './button';
import { useContext } from "react";
import { Context, ContextType } from "@/context/Context";
import Link from "next/link";


export function CardProduct({ product }: { product: ProductsProps }) {
  const { addItemCart } = useContext(Context) as ContextType;


  function handleAddCartItem(product: ProductsProps) {
    addItemCart(product);
  }

  return (
    <>

      <div key={product.id} className="relative overflow-hidden flex flex-col justify-between border border-gray-400 w-[300px] h-[500px] bg-gray-600 rounded-lg p-4">
        <Link href={`/products/${product.id}`}>
          {product.bigsale && (
            <div className="bg-primary text-gray-500 font-semibold w-35 text-center absolute rotate-45 -right-8 top-7">Big sale</div>
          )}
          <Flex>
            <StarRating rating={product.assessment} />
            <p className="text-xs ml-1">({product.products_sold})</p>
          </Flex>
          <Image
            src={product.images[0].image}
            alt={product.title}
            width={264}
            height={264}
            className="bg-cover bg-no-repeat bg-center  rounded-lg"
          />
          <h1 className="text-gray-100 font-semibold text-sm line-clamp-2 mb-2">
            {product.title}
          </h1>
          <span className="text-sm line-through text-gray-300">
            R$  {product.old_price}
          </span>
          <span className="text-xl text-green font-semibold">
            R$  {product.price}
          </span>
          <div className="mb-2">
            <p className="text-gray-300 text-sm">À vista no PIX</p>
            <p className="text-gray-300 text-sm">ou até <span className="font-semibold">10x de R$ {(Number(product.price) / 10).toFixed(2)}</span></p>
          </div>
        </Link>
        <Button onClick={() => handleAddCartItem(product)}>
          Add To Cart
        </Button>
      </div>
    </>
  )
}