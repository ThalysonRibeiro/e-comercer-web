"use client"
import Image from "next/image";
import no_image from "@/assets/no-image.png";
import { PromotionsProps } from "@/types/siteContent";
import { LinkBUtton } from "../ui/link";
import { Flex } from "../ui/flex";
import { CountdownCard } from "./countdownCard";
import { ArrowRight } from "lucide-react";
import CopyButton from "./buttonCopy";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFlip } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-flip';



export function CardAnnouncement({ promotionTop }: { promotionTop: PromotionsProps[] }) {
  return (
    <div className="max-w-75 w-full h-112.5 border border-borderColor rounded-lg overflow-hidden">
      <Swiper
        effect={'flip'}
        spaceBetween={30}
        slidesPerView={1}
        loop={true}
        modules={[Autoplay, EffectFlip]}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        className="mySwiper"
      // className='w-[900px]'
      >
        {promotionTop.map(item => (
          <SwiperSlide key={item.id} className="relative group">
            <div className="min-w-75 h-112.5 relative">
              <Image
                src={item?.banner ? item?.banner : no_image}
                alt="imagem anuncio"
                fill
                className="w-full h-full bg-cover bg-no-repeat object-cover"
              />
            </div>

            {/* Conteúdo que aparece no hover */}
            <Flex className="flex-col gap-2 items-center justify-between z-10 absolute inset-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-bgCard/99">
              <h2 className="text-sm font-semibold uppercase text-primaryColor">{item.title}</h2>
              <p className="text-sm line-clamp-3">{item.description}</p>

              <CopyButton
                couponCode={item.couponCode}
                discountText={item.discountType}
              />
              <LinkBUtton link={item.buttonLink as string}>
                {item.buttonText} <ArrowRight />
              </LinkBUtton>
              <CountdownCard endDate={item.endDate} gap="1" />
            </Flex>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}
