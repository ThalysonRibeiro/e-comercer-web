"use client"
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import { Flex } from "./ui/flex";
import { useIsMobile } from '@/app/hooks/useIsMobile';

import { BrandsProps } from "@/types/brands";
import Link from 'next/link';
import Image from 'next/image';

export function CardBrands({ brands }: { brands: BrandsProps[] }) {

  const isXl = useIsMobile(1250);
  const isLg = useIsMobile(960);
  const isMd = useIsMobile(768);
  const isMobile = useIsMobile();
  let responsive;
  let between;
  if (isXl) {
    responsive = 8;
    between = 10;
  }
  if (isLg) {
    responsive = 6;
    between = 10
  }
  if (isMd) {
    responsive = 5;
    between = 10
  }
  if (isMobile) {
    responsive = 4;
    between = 0;
  }


  return (
    <Flex className='w-full items-center'>
      <Swiper
        spaceBetween={between ? between : 30}
        slidesPerView={responsive ? responsive : 10}
        loop={true}
        modules={[Autoplay]}
        autoplay={{
          delay: 800,
          disableOnInteraction: false,
          pauseOnMouseEnter: true
        }}
        className="w-full"
      >
        {brands?.map(item => (
          <SwiperSlide key={item.id}>
            <Link href={`/products?brand=${item.name}`}>
              <div className='relative w-25 h-25 bg-card border border-border overflow-hidden rounded-lg'>
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover"
                />
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </Flex>
  )
}