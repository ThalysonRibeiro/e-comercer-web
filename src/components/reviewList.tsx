"use client"
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import { Review } from './ui/review';
import { ReviewProps } from '@/types/review';
import Link from 'next/link';
import { Flex } from './ui/flex';
import { useIsMobile } from '@/app/hooks/useIsMobile';

export function ReviewList({ reviewData }: { reviewData: ReviewProps[] }) {
  const isMobile = useIsMobile();
  const isXl = useIsMobile(1250);
  const isLg = useIsMobile(960);
  let responsive;
  if (isXl) {
    responsive = 3;
  }
  if (isLg) {
    responsive = 2;
  }
  if (isMobile) {
    responsive = 1;
  }
  return (
    <Flex className='w-full'>
      <Swiper
        spaceBetween={30}
        slidesPerView={responsive ? responsive : 3}
        loop={true}
        modules={[Autoplay]}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
          pauseOnMouseEnter: true
        }}
        className='w-[1280px]'
      >
        {reviewData.map(item => (
          <SwiperSlide key={item.id}>
            <Link href={`/products/${item.productId}`}>
              <Review reviewData={item} />
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </Flex>
  )
}