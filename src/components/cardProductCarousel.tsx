"use client"
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import Image from "next/image";
import { Button } from "./ui/button";
import { Flex } from "./ui/flex";
import { StarRating } from "./ui/starRating";
import { ProductsProps } from "@/types/product";
import { useContext } from 'react';
import { Context, ContextType } from '@/context/Context';
import Link from 'next/link';
import { CardProduct } from './ui/cardProduct';
import { useIsMobile } from '@/app/hooks/useIsMobile';

export interface CardProductsProps {
  products: ProductsProps[]
}

export function CardProductCarousel({ products }: CardProductsProps) {
  const isMobile = useIsMobile();
  const isXl = useIsMobile(1250);
  const isLg = useIsMobile(960);
  let responsive;
  let width;
  let between;
  if (isXl) {
    responsive = 4;
    width = "1200";
    between = 310;
  }
  if (isLg) {
    responsive = 3;
    width = "960";
    between = 300
  }
  if (isMobile) {
    responsive = 2;
    width = "640";
    between = 200;
  }


  return (
    <Flex className={`${width ? width : 'max-w-[1250]'} w-full items-center mt-6`}>
      <Swiper
        spaceBetween={between ? between : 100}
        slidesPerView={responsive ? responsive : 4}
        loop={true}
        modules={[Autoplay]}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        className="w-full"
      >
        {products?.map(product => (
          <SwiperSlide key={product.id}>

            <CardProduct product={product} />

          </SwiperSlide>
        ))}
      </Swiper>
    </Flex>
  )
}