"use client"
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import { Flex } from "../ui/flex";
import { useIsMobile } from '@/app/hooks/useIsMobile';


export function ServiceHero({ service }: { service: string[] }) {
  const isMobile = useIsMobile();
  const isTablet = useIsMobile(768);
  let responsive;
  if (isTablet) {
    responsive = 2
  }
  if (isMobile) {
    responsive = 1
  }
  return (
    <Flex className="gap-3 w-full justify-between mt-6">
      <Swiper
        spaceBetween={40}
        slidesPerView={responsive ? responsive : 3}
        loop={true}
        modules={[Autoplay]}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        className='w-[1280]'
      >
        {service.map(item => (
          <SwiperSlide key={item} className='cursor-default backdrop-blur-lg bg-transparent rounded-lg py-2 border border-borderColor flex items-center justify-center border-r uppercase text-center text-sm text-primaryColor'>
            {item}
          </SwiperSlide>
        ))}
      </Swiper>
    </Flex>
  )
}