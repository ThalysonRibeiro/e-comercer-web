"use client"
import Image from "next/image";
import no_image from "@/assets/no-image.png";
import { PromotionsProps } from "@/types/siteContent";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import CopyButton from "@/components/LimitedTimeOffer//buttonCopy";
import 'swiper/css';
import { CountdownCard } from "./LimitedTimeOffer/countdownCard";
import { Flex } from "./ui/flex";
import { useIsMobile } from "@/app/hooks/useIsMobile";

export function PromotionalAnnouncement({ promotionBot }: { promotionBot: PromotionsProps[] }) {

  const isXl = useIsMobile(1250);
  const isLg = useIsMobile(960);
  const isMd = useIsMobile(768);
  const isMobile = useIsMobile();
  let responsive;
  let between;
  if (isXl) {
    responsive = 4;
    between = 10;
  }
  if (isLg) {
    responsive = 3;
    between = 10
  }
  if (isMd) {
    responsive = 2;
    between = 10
  }
  if (isMobile) {
    responsive = 1;
    between = 0;
  }
  return (
    <Flex className="max-w-[1280] w-full items-center">
      <Swiper
        spaceBetween={between ? between : 30}
        slidesPerView={responsive ? responsive : 4}
        loop={true}
        modules={[Autoplay]}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true
        }}
        className='w-[1280px]'
      >
        {promotionBot.map(item => (
          <SwiperSlide key={item.id} className="relative group rounded-lg overflow-hidden">
            <div className="w-full min-h-60 relative">
              <Image
                src={item?.banner ? item?.banner : no_image}
                alt={item.title}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover rounded-lg"
              />
            </div>
            <Flex className="absolute z-10 bottom-0 w-full items-center justify-center bg-bgCard/90">
              <CountdownCard endDate={item.endDate} gap="1" style="flex flex-col items-center text-title" />
            </Flex>

            {/* Conteúdo que aparece no hover */}
            <Flex className="flex-col gap-1 items-center justify-between z-10 absolute inset-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-bgCard/99">
              <h2 className="text-sm font-semibold uppercase text-primaryColor">{item.title}</h2>
              <p className="text-sm line-clamp-1 text-center">{item.description}</p>

              <CopyButton
                couponCode={item.couponCode}
                discountText={item.discountType}
              />

            </Flex>
          </SwiperSlide>
        ))}
      </Swiper>
    </Flex>
  )
}