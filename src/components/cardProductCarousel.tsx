"use client"
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import Image from "next/image";
import { Button } from "./ui/button";
import { Flex } from "./ui/flex";
import { StarRating } from "./starRating";
import { ProductsProps } from "@/types/product";
import { useContext } from 'react';
import { Context, ContextType } from '@/context/Context';
import Link from 'next/link';

export interface CardProductsProps {
  products: ProductsProps[]
}

export function CardProductCarousel({ products }: CardProductsProps) {
  const { addItemCart } = useContext(Context) as ContextType;


  return (
    <>
      <Swiper
        spaceBetween={30}
        slidesPerView={4}
        loop={true}
        modules={[Autoplay]}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        className='w-[1250]'
      >
        {products.map(product => (
          <SwiperSlide key={product.id} className="relative overflow-hidden flex flex-col items-center justify-between border border-borderColor w-[300px] h-[500px] bg-bgCard rounded-lg p-4">
            {product.bigsale && (
              <div className="bg-primaryColor text-textButton font-semibold w-35 text-center absolute rotate-45 -right-8 top-7">Big sale</div>
            )}
            <Link href={`/products/${product.id}`}>
              <Flex>
                <StarRating rating={product.rating} />
                <p className="text-xs ml-1">({product.products_sold})</p>
              </Flex>
              <div className='relative w-65 h-65 border'>
                <Image
                  src={product.images[0].image}
                  alt={product.title}
                  fill
                  className="object-cover rounded-lg"
                />
              </div>
              <h1 className="text-title font-semibold text-sm line-clamp-2 mb-2">
                {product.title}
              </h1>
              <span className="text-sm line-through text-oldPrice">
                R$  {product.old_price}
              </span>
              <span className="text-xl text-price font-semibold">
                R$  {product.price}
              </span>
              <div className="mb-2">
                <p className="text-oldPrice text-sm">À vista no PIX</p>
                <p className="text-oldPrice text-sm">ou até <span className="font-semibold">10x de R$ {(Number(product.price) / 10).toFixed(2)}</span></p>
              </div>
            </Link>
            <Button
              onClick={() => addItemCart(product)}
            >
              Add To Cart
            </Button>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  )
}