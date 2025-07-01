"use client"
import Image from "next/image";
import no_image from "@/assets/no-image.png";
import { PromotionsProps } from "@/types/siteContent";
import { Flex } from "../ui/flex";
import { CountdownCard } from "./countdownCard";
import { ArrowRight } from "lucide-react";
import CopyButton from "./buttonCopy";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFlip } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-flip';
import Link from "next/link";
import { Button } from "../ui/button";
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";




export function CardAnnouncement({ promotionTop }: { promotionTop: PromotionsProps[] }) {
  return (
    <div className="max-w-75 w-full h-112.5 border border-border rounded-lg overflow-hidden hidden lg:block">
      <Swiper
        effect={'flip'}
        spaceBetween={30}
        slidesPerView={1}
        loop={true}
        modules={[Autoplay, EffectFlip]}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true
        }}
        className="mySwiper"
      >
        {promotionTop.map(item => (
          <SwiperSlide key={item.id} className="relative group">
            <div className="min-w-75 h-112.5 relative">
              <Image
                src={item?.banner ? item?.banner : no_image}
                alt="imagem anuncio"
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="w-full h-full bg-cover bg-no-repeat object-cover"
              />
            </div>

            {/* Conteúdo que aparece no hover */}
            <Card className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <CardHeader>
                <CardTitle>{item.title}</CardTitle>
                <CardDescription className="line-clamp-3">
                  {item.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <CopyButton
                  couponCode={item.couponCode}
                  discountText={item.discountType}
                />
                <Button>
                  <Link href={item.buttonLink as string} className="inline-flex gap-1">
                    {item.buttonText} <ArrowRight />
                  </Link>
                </Button>
              </CardContent>
              <CardFooter>
                <CountdownCard endDate={item.endDate} gap="1" />
              </CardFooter>
            </Card>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}
