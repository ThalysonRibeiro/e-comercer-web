"use client"
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css'
import Image from 'next/image';
import { ProductsProps } from '@/types/product';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import api from '@/lib/axios';
import { formatCurrency } from '@/utils/formatCurrency';

export function ProductSuggestion() {
  const [products, setProducts] = useState<ProductsProps[] | null>();


  useEffect(() => {
    async function getProduct() {
      const { data } = await api.get(`/products`);
      setProducts(data.products)
    }
    getProduct();
  }, [])

  return (
    <>
      <Swiper
        spaceBetween={30}
        slidesPerView={7}
        loop={true}
        modules={[Autoplay]}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        className='w-7xl my-8'
      >
        {products?.length === 0 ? (
          <p>Sem ProductSuggestionao de produtos</p>
        ) : (
          products?.map(item => (
            <SwiperSlide key={item.id}>
              <Link href={`/products/${item.id}`}>
                <div className="text-center border border-borderColor flex flex-col items-center justify-center w-full rounded-lg p-2">
                  <div className='relative w-full h-30'>
                    <Image
                      src={item?.images[0]?.image}
                      alt={item?.title}
                      fill
                      className="object-cover rounded-lg"
                    />
                  </div>
                  <span className="text-xl text-price font-semibold">
                    {formatCurrency((item?.price / 100))}
                  </span>
                </div>
              </Link>
            </SwiperSlide>
          ))
        )}
      </Swiper>
    </>
  )
}