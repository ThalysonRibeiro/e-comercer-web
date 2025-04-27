"use client"
import { Button } from "@/components/ui/button";
import { ProductsProps } from "@/types/product";
import { ShoppingCart } from "lucide-react";
import Image from "next/image";
import { useParams, redirect } from "next/navigation";
import { useEffect, useState } from "react";
import { ProductSuggestion } from "../components/productSuggestion";
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import api from "@/lib/axios";
import { useAppContext } from "@/context/AppContext";


export default function ProductId() {
  const { addItemCart } = useAppContext()
  const { id } = useParams();
  const [product, setProduct] = useState<ProductsProps>();
  const [thumbsSwiper, setThumbsSwiper] = useState<any | null>(null);


  useEffect(() => {
    async function getProduct() {
      const response = await api.get(`/products/${id}`);
      setProduct(response.data)
    }
    getProduct();
  }, [id]);

  function buyItem(product: ProductsProps) {
    addItemCart(product);
    redirect('/')
  }

  return (
    <div>
      <div className="max-w-7xl w-full mx-auto flex flex-col items-center justify-center mt-6">
        {product && (
          <div key={product?.id} className=" w-full mt-6 flex">
            <div className="w-1/2">
              <Swiper
                loop={true}
                spaceBetween={10}
                navigation={true}
                thumbs={{ swiper: thumbsSwiper }}
                modules={[FreeMode, Navigation, Thumbs]}
                className='w-full h-100'
              >
                {product?.images.map(item => (
                  <SwiperSlide key={item?.id}>

                    <div className="flex items-center justify-center bg-center cursor-pointer">
                      <Image
                        src={item?.image}
                        alt={product?.title}
                        width={400}
                        height={400}
                        className="bg-cover bg-no-repeat bg-center rounded-lg"
                      />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
              <Swiper
                onSwiper={setThumbsSwiper}
                spaceBetween={30}
                slidesPerView={4}
                freeMode={true}
                watchSlidesProgress={true}
                modules={[FreeMode, Navigation, Thumbs]}
                className='w-full'
              >
                {product?.images.map(item => (
                  <SwiperSlide key={item?.id}>
                    <div className="flex items-center justify-center cursor-pointer">
                      <Image
                        src={item?.image}
                        alt={product?.title}
                        width={400}
                        height={400}
                        className="bg-cover bg-no-repeat bg-center rounded-lg"
                      />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>

            <div className="w-1/2 p-3 flex flex-col">
              <h1 className="mb-6 text-title text-2xl font-semibold">{product?.title}</h1>

              <div className="line-clamp-3">
                <div dangerouslySetInnerHTML={{ __html: product?.description }} />
              </div>

              <div className="flex w-full mt-6">

                <div className="flex flex-col gap-2 w-full">
                  <span className="text-sm line-through text-oldPrice">
                    R$  {product?.old_price}
                  </span>
                  <span className="text-3xl text-price font-semibold">
                    R$  {product?.price}
                  </span>
                  <p className="text-oldPrice text-sm">À vista no PIX</p>
                  <p className="text-oldPrice text-sm">ou até <span className="font-semibold">10x de R$ {(Number(product?.price) / 10).toFixed(2)}</span></p>
                </div>

                <div className="flex w-full gap-3">
                  <Button
                    onClick={() => buyItem(product)}
                  >Comprar</Button>
                  <Button
                    onClick={() => addItemCart(product)}
                    className="w-10"
                  >
                    <ShoppingCart className="size-6" />
                  </Button>
                </div>

              </div>
            </div>


          </div>
        )}

        <ProductSuggestion />

        {product && (
          <div className="p1 mt-6">
            <div dangerouslySetInnerHTML={{ __html: product?.description }} />
          </div>
        )}
      </div>
    </div>
  )
}