"use client"
import Image from "next/image";
import { ProductsProps } from "@/types/product";
import { StarRating } from './starRating';
import { Flex } from './flex';
import { Button } from './button';
import { useAppContext } from "@/context/AppContext";
import Link from "next/link";
import { formatCurrency } from "@/utils/formatCurrency";
import no_image from "@/assets/no-image.png";
import { ShoppingCart } from "lucide-react";
import WishButton from "./wishButton";



export function CardProduct({ product }: { product: ProductsProps }) {
  const { addItemCart, userData, addItemWishlist } = useAppContext();

  function handleItemWishList(productId: string) {
    addItemWishlist(productId)
  }

  function handleAddCartItem(product: ProductsProps) {
    addItemCart(product);
  }

  return (
    <>
      <div key={product.id} className="relative overflow-hidden flex flex-col justify-between border border-borderColor w-full h-105 bg-bgCard rounded-lg p-4">
        <Link href={`/products/${product.id}`}>
          {product.bigsale && (
            <div className="bg-primaryColor text-title font-semibold w-35 text-center absolute rotate-45 -right-8 top-7 z-5">Big sale</div>
          )}
          <Flex className="my-2">
            <StarRating rating={product.rating} />
            <p className="text-xs ml-1">({product.products_sold})</p>

            {product.stock === 1 && (
              <p className="font-bold capitalize w-full text-center text-title bg-primaryColor absolute z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">ultimo disponível</p>
            )}
          </Flex>
          <div className='relative min-w-45 min-h-45'>
            <Image
              src={product.images && product.images.length > 0 ? product.images[0].image : no_image}
              alt={product.title}
              fill
              className="object-cover rounded-lg"
            />
          </div>
          <h1 className="text-title font-semibold text-sm line-clamp-2 mb-2">
            {product.title}
          </h1>
          <Flex className="items-center justify-between">
            <span className="text-xl text-price font-semibold">
              {formatCurrency(product.price / 100)}
            </span>
            <span className="text-sm line-through text-oldPrice">
              {formatCurrency(product.old_price / 100)}
            </span>
          </Flex>
          <div className="mb-2">
            <p className="text-oldPrice text-sm">À vista no PIX</p>
            <p className="text-oldPrice text-sm">ou até <span className="font-semibold">10x de R$ {(Number((product.price / 100)) / 10).toFixed(2)}</span></p>
          </div>
        </Link>
        <Flex className='justify-between gap-2.5'>
          <Button onClick={() => handleAddCartItem(product)} className='gap-3 border border-borderColor'>
            <span className="text-sm">Adicionar</span>
            <ShoppingCart className="size-6" />
          </Button>
          {userData && (
            <Button
              onClick={() => handleItemWishList(product.id)}
              className="w-10 border border-borderColor bg-primaryColor">
              <WishButton animate={!!product.isLiked} liked={!!product.isLiked} />
            </Button>
          )}
        </Flex>
      </div>
    </>
  )
}