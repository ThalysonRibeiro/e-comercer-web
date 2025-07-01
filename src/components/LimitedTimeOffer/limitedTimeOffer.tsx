"use client"
import Image from "next/image";
import { Button } from "../ui/button";
import { CountdownCard } from "./countdownCard";
import { StarRating } from "../ui/starRating";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectCreative } from 'swiper/modules';
import 'swiper/css';
import { ProductsProps } from "@/types/product";
import { useAppContext } from "@/context/AppContext";
import Link from "next/link";
import { formatCurrency } from "@/utils/formatCurrency";
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useIsMobile } from "@/app/hooks/useIsMobile";


export interface LimitedTimeOfferProps {
  products: ProductsProps[];
}


export function LimitedTimeOffer({ products }: LimitedTimeOfferProps) {
  const { addItemCart } = useAppContext();
  const isMobile = useIsMobile();


  return (
    <>
      <Swiper
        spaceBetween={50}
        slidesPerView={1}
        loop={true}
        modules={[Autoplay, EffectCreative]}
        effect={'creative'}
        creativeEffect={{
          prev: {
            shadow: true,
            translate: [0, 0, -400],
          },
          next: {
            translate: ['100%', 0, 0],
          },
        }}
        autoplay={{
          delay: 4000,
          waitForTransition: true,
          disableOnInteraction: false,
          reverseDirection: true,
          pauseOnMouseEnter: true
        }}
        className='w-full md:h-[450px]'
      >
        {products.map(item => (
          <SwiperSlide key={item.id}>
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 border border-border w-full h-full bg-card rounded-lg overflow-hidden p-4">
              <Link href={`/products/${item.id}`} className="w-100  h-105 relative rounded-lg overflow-hidden">
                <Image
                  src={item.images[0]?.image}
                  alt={item.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover"
                />
              </Link>

              <div className="flex-1 flex flex-col justify-between h-full">
                <StarRating rating={item.rating} />
                <h1 className="text-title font-semibold text-xl line-clamp-2 mb-2">
                  {item.title}
                </h1>
                <p className="text-sm line-clamp-4">{item.description}</p>

                <div className="flex gap-6  my-1">
                  <span className="text-3xl text-price font-semibold">{formatCurrency((item.price / 100))}</span>
                  <span className="text-xl line-through text-oldPrice">{formatCurrency((item.old_price / 100))}</span>
                </div>

                <div className="mb-2">
                  <p className="text-oldPrice text-sm">À vista no PIX</p>
                  <p className="text-oldPrice text-sm">
                    ou até <span className="font-semibold">10x de R$ {(Number(item.price) / 10).toFixed(2)}</span>
                  </p>
                </div>
                <Button
                  onClick={() => addItemCart(item)}
                >
                  Adicionar ao carrinho
                </Button>
                <CountdownCard endDate={item.endDate} title="APROVEITE! A OFERTA TERMINA EM:" />
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}