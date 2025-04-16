"use client"
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css'
import Image from 'next/image';
import { ProductsProps } from '@/types/product';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import api from '@/lib/axios';

export function ProductSuggestion() {
  const [products, setProducts] = useState<ProductsProps[]>();
  console.log(products);


  useEffect(() => {
    async function getProduct() {
      const response = await api.get(`/products`);
      setProducts(response.data)
    }
    getProduct();
  }, [])

  return (
    <>
      <Swiper
        spaceBetween={30}
        slidesPerView={6}
        loop={true}
        modules={[Autoplay]}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        className='w-7xl my-8'
      >
        {products?.map(item => (
          <SwiperSlide key={item.id}>
            <Link href={`/products/${item.id}`}>
              <div className="text-center border border-gray-400 flex flex-col items-center justify-center w-full rounded-lg p-2">
                <Image
                  src={item?.images[0]?.image}
                  alt={item?.title}
                  width={200}
                  height={200}
                  className="bg-cover bg-no-repeat bg-center  rounded-lg"
                />
                <span className="text-2xl text-green font-semibold">
                  R$  {item?.price}
                </span>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  )
}