"use client"
import Image from "next/image";
import no_image from "@/assets/no-image.png";
import { PromotionsProps } from "@/types/siteContent";
import { ArrowRight } from "lucide-react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import CopyButton from "@/components/LimitedTimeOffer//buttonCopy";
import 'swiper/css';
import { LinkBUtton } from "./ui/link";
import { CountdownCard } from "./LimitedTimeOffer/countdownCard";
import { Flex } from "./ui/flex";

export function PromotionalAnnouncement({ promotionBot }: { promotionBot: PromotionsProps[] }) {
  return (
    <div className="w-full min-h-56.5 overflow-hidden">
      <Swiper
        spaceBetween={30}
        slidesPerView={4}
        loop={true}
        modules={[Autoplay]}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        className='w-[1280px]'
      >
        {promotionBot.map(item => (
          <SwiperSlide key={item.id} className="relative group rounded-lg overflow-hidden">
            <div className="min-w-75 h-56.5 relative">
              <Image
                src={item?.banner ? item?.banner : no_image}
                alt="imagem anuncio"
                fill
                className="w-full h-full bg-cover bg-no-repeat object-cover"
              />
            </div>
            <Flex className="absolute z-10 bottom-0 w-full items-center justify-center bg-bgCard/90">
              <CountdownCard endDate={item.endDate} gap="1" style="flex flex-col items-center text-title" />
            </Flex>

            {/* Conteúdo que aparece no hover */}
            <Flex className="flex-col gap-1 items-center justify-between z-10 absolute inset-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-bgCard/99">
              <h2 className="text-sm font-semibold uppercase text-primaryColor">{item.title}</h2>
              <p className="text-sm line-clamp-1">{item.description}</p>

              <CopyButton
                couponCode={item.couponCode}
                discountText={item.discountType}
              />

            </Flex>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}