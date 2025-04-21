"use client"
import Image from "next/image";
import { StarRating } from "../starRating";
import { ProductsProps } from "@/types/product";
import Link from "next/link";
import { formatCurrency } from "@/utils/formatCurrency";
import { convertRealToCents } from "@/utils/convertCurrency";

interface CardSearchProps {
  products: ProductsProps[] | null;
}

export function CardSearch({ products }: CardSearchProps) {
  return (
    <div className="w-full max-h-150 overflow-auto space-y-4 p-3 bg-bgCard border border-textButton rounded-lg relative">
      {(!products || products.length === 0) ? (
        <div className="text-center py-4 text-oldPrice">
          No products found
        </div>
      ) : (
        products.map(item => (
          <Link
            href={`/products/${item.id}`}
            key={item.id}
            className="w-full h-40 flex justify-between p-2 rounded-lg border border-textButton hover:bg-themeColor transition-colors"
          >
            <div className="max-h-40 max-w-32 w-full relative rounded-lg overflow-hidden">
              <Image
                src={item.images[0].image}
                alt={`Image of ${item.title}`}
                // width={150}
                // height={150}
                fill
                className="object-cover"
              />
            </div>
            <div className="w-full flex flex-col justify-between ml-2">
              <StarRating rating={item.rating} />
              <p className="line-clamp-2 font-medium">{item.title}</p>
              <p className="text-xl text-price font-semibold">
                {formatCurrency((item.price / 100))}
              </p>
            </div>
          </Link>
        ))
      )}
    </div>
  )
}