"use client"
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css'
import { HeroPromotioProps } from './hero';
import { Flex } from '../ui/flex';
import Link from 'next/link';
import Image from 'next/image';


export function CarouselHero({ data }: { data: HeroPromotioProps }) {
  return (
    <>
      <Swiper
        spaceBetween={30}
        slidesPerView={1}
        loop={true}
        modules={[Autoplay]}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        className='w-full'
      >

        {data.promotionHero.map(item => (
          <SwiperSlide key={item.id}>
            <Flex className="w-full h-110 backdrop-blur-lg bg-transparent rounded-lg overflow-auto border border-gray-500">
              <Flex className="flex-col w-2/5 gap-3 p-5 justify-center">
                <h1 className="font-semibold text-4xl text-gray-100">{item.title}</h1>
                <h2 className="font-semibold text-3xl text-primary">{item.subTitle}</h2>
                <h3 className="font-semibold text-xl text-gray-100">{item.sale}</h3>
                <p>{item.description}</p>
              </Flex>

              <Flex className="w-3/5 h-full">
                <Link href="/">
                  <Image alt="imagem promotion" src={item.image} width={780} height={440} className="w-full h-full object-cover" />
                </Link>
              </Flex>
            </Flex>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  )
}