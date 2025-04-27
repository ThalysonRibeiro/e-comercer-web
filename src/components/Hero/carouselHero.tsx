"use client"
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css'
import { Flex } from '../ui/flex';
import Link from 'next/link';
import Image from 'next/image';
import { PromotionHeroProps } from '@/types/siteContent';
import { LinkBUtton } from '../ui/link';



export function CarouselHero({ promotionHero }: { promotionHero: PromotionHeroProps[] }) {

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

        {promotionHero.map(item => (
          <SwiperSlide key={item.id}>
            <Flex className="flex-col-reverse md:flex-row w-full md:h-110 h-150 backdrop-blur-lg bg-transparent rounded-lg overflow-auto border border-borderColor">

              <Flex className="flex-col lg:w-2/5 md:w-1/3 w-full gap-3 p-5 justify-center">
                <h1 className="font-semibold text-4xl text-title uppercase">{item.title}</h1>
                <h2 className="font-semibold text-3xl text-primaryColor capitalize">{item.subTitle}</h2>
                <h3 className="font-semibold text-xl text-title">{item.sale}</h3>
                <p className='line-clamp-4'>{item.description}</p>
                {item.buttonLink && (
                  <LinkBUtton
                    link={item.buttonLink as string}
                    className='w-fit px-4'
                  >
                    {item.buttonText}
                  </LinkBUtton>
                )}
              </Flex>

              <Flex className="lg:w-3/5 md:w-2/3 w-full h-full  ">
                <Link
                  href="/"
                  className='relative w-full'
                >
                  <Image
                    alt="imagem promotion"
                    src={item.image as string}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="w-full h-full object-cover"
                  />
                </Link>
              </Flex>
            </Flex>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  )
}