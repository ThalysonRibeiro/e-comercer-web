"use client"
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import 'swiper/css'
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Flex } from '../ui/flex';
import Link from 'next/link';
import Image from 'next/image';
import { PromotionHeroProps } from '@/types/siteContent';



export function CarouselHero({ promotionHero }: { promotionHero: PromotionHeroProps[] }) {

  return (
    <>
      <Swiper
        spaceBetween={30}
        slidesPerView={1}
        navigation={true}
        pagination={true}
        loop={true}
        modules={[Autoplay, Navigation, Pagination]}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        className='w-full'
      >

        {promotionHero.map(item => (
          <SwiperSlide key={item.id}>
            <Flex className="relative flex-col-reverse md:flex-row w-full h-45 md:h-70 lg:h-125 backdrop-blur-lg bg-transparent rounded-lg overflow-auto border border-border">

              <Flex className="w-full h-full">
                {/* lg:w-3/5 md:w-2/3 */}
                <Link
                  href={item.promotionLink ?? "/"}
                  className='relative w-full'
                >
                  <Image
                    alt="imagem promotion"
                    src={item.image}
                    fill
                    quality={100}
                    priority
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