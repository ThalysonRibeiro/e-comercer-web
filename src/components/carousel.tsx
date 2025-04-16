"use client"
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';

export function Carousel({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Swiper
      spaceBetween={30}
      slidesPerView={1}
      loop={true}
      modules={[Autoplay]}
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
      }}
    // className='w-[900px]'
    >
      {/* <SwiperSlide>Slide 1</SwiperSlide>
      <SwiperSlide>Slide 2</SwiperSlide>
      <SwiperSlide>Slide 3</SwiperSlide>
      <SwiperSlide>Slide 4</SwiperSlide> */}
      {children}
    </Swiper>
  );
};