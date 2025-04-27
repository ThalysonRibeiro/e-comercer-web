"use client"
import Image from "next/image";
import { StarRating } from "../ui/starRating";
import { ProductsProps } from "@/types/product";
import Link from "next/link";
import { formatCurrency } from "@/utils/formatCurrency";
import WishButton from "../ui/wishButton";
import { useAppContext } from "@/context/AppContext";


interface CardSearchProps {
  products: ProductsProps[] | null;
}

export function CardSearch({ products }: CardSearchProps) {
  const { addItemCart, addItemWishlist, removeFromWishlist } = useAppContext();

  function handleItemWishList(productId: string) {
    addItemWishlist(productId)
  }

  return (
    <div className="w-full max-h-150 overflow-auto p-3 bg-bgCard border border-textButton rounded-lg relative grid grid-cols-1 md:grid-cols-2 gap-4">
      {(!products || products.length === 0) ? (
        <div className="text-center py-4 text-oldPrice">
          No products found
        </div>
      ) : (
        products.map(item => (
          <Link
            href={`/products/${item.id}`}
            key={item.id}
            className="w-full h-30 flex justify-between p-2 rounded-lg border border-textButton hover:bg-themeColor transition-colors"
          >
            <div className="max-h-30 max-w-25 w-full relative rounded-lg overflow-hidden">
              <Image
                src={item.images[0].image}
                alt={`Image of ${item.title}`}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover"
              />
            </div>
            <div className="w-full flex flex-col justify-between ml-2">
              <div className="flex justify-between">
                <StarRating rating={item.rating} />
                <button
                  onClick={() => handleItemWishList(item.id)}
                  className='flex items-center w-7 h-7 text-primaryColor'>
                  <WishButton animate={item.isLiked ? true : false} liked={item.isLiked ? true : false} />
                </button>
              </div>
              <p className="text-sm line-clamp-2 font-medium">{item.title}</p>
              <p className="text-price font-semibold">
                {formatCurrency((item.price / 100))}
              </p>
            </div>
          </Link>
        ))
      )}
    </div>
  )
}