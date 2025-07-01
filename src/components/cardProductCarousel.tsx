"use client"
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import Image from "next/image";
import { Button } from "./ui/button";
import { Flex } from "./ui/flex";
import { StarRating } from "./ui/starRating";
import { ProductsProps } from "@/types/product";
import { useAppContext } from '@/context/AppContext';
import Link from 'next/link';
import { useIsMobile } from '@/app/hooks/useIsMobile';
import no_image from "@/assets/no-image.png";
import { formatCurrency } from '@/utils/formatCurrency';
import WishButton from './ui/wishButton';
import { Share, Share2, ShoppingBag, ShoppingCart } from 'lucide-react';

export interface CardProductsProps {
  products: ProductsProps[]
}

export function CardProductCarousel({ products }: CardProductsProps) {
  const { addItemCart, addItemWishlist, removeFromWishlist, userData } = useAppContext();

  function handleItemWishList(productId: string) {
    addItemWishlist(productId)
  }

  function handleAddCartItem(product: ProductsProps) {
    addItemCart(product);
  }

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
    <Flex className='w-full items-center mt-6'>
      <Swiper
        spaceBetween={between ? between : 30}
        slidesPerView={responsive ? responsive : 4}
        loop={true}
        modules={[Autoplay]}
        autoplay={{
          delay: 5500,
          disableOnInteraction: false,
          pauseOnMouseEnter: true
        }}
        className="w-full"
      >
        {products?.map(product => (
          <SwiperSlide key={product.id}>
            <div key={product.id} className="relative overflow-hidden flex flex-col justify-between border border-border min-w-50 md:h-125 bg-card rounded-lg p-4">
              <Link href={`/products/${product.id}`} className='flex flex-row md:flex-col gap-2'>
                {product.bigsale && (
                  <div className="bg-primary font-semibold w-35 text-center absolute rotate-45 -right-8 top-7 z-10">Big sale</div>
                )}
                {product.stock === 1 && (
                  <p className="font-bold capitalize w-full text-center bg-primary absolute z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">ultimo disponível</p>
                )}
                <div className='relative w-80 md:w-full h-30 md:min-h-65 border rounded-lg'>
                  <Image
                    src={product.images && product.images.length > 0 ? product.images[0].image : no_image}
                    alt={product.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-contain rounded-lg"
                  />
                </div>
                <div>
                  <Flex className="my-2">
                    <StarRating rating={product.rating} />
                    <p className="text-xs ml-1">({product.products_sold})</p>
                  </Flex>
                  <h2 className="font-semibold text-sm line-clamp-2 mb-2">
                    {product.title}
                  </h2>
                  <Flex className="items-center justify-between">
                    <span className="text-xl text-price font-semibold">
                      {formatCurrency(product.price / 100)}
                    </span>
                    <span className="text-sm line-through text-oldPrice">
                      {formatCurrency(product.old_price / 100)}
                    </span>
                  </Flex>
                  <div className="mb-2">
                    <p className="text-oldPrice text-sm">À vista no PIX</p>
                    <p className="text-oldPrice text-sm">ou até <span className="font-semibold">10x de R$ {(Number((product.price / 100)) / 10).toFixed(2)}</span></p>
                  </div>
                </div>
              </Link>
              <Flex className='justify-center gap-2.5'>
                <Button variant='outline' onClick={() => handleAddCartItem(product)} className='border border-border'>
                  <span className="text-sm">Adicionar</span>
                  <ShoppingCart className="size-6" />
                </Button>
                {userData && (
                  <Button
                    onClick={() => handleItemWishList(product.id)}
                    className="w-10 border border-border bg-primary">
                    <WishButton animate={!!product.isLiked} liked={!!product.isLiked} />
                  </Button>
                )}
              </Flex>
            </div>

          </SwiperSlide>
        ))}
      </Swiper>
    </Flex>
  )
}