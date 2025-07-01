import { ButtonCart } from "@/components/buttonCart";
import { Hero } from "@/components/Hero/hero";
import { CardAnnouncement } from "@/components/LimitedTimeOffer/cardAnnouncement";
import { LimitedTimeOffer } from "@/components/LimitedTimeOffer/limitedTimeOffer";
import { Flex } from "@/components/ui/flex";
import { ReviewList } from "@/components/reviewList";
import { PromotionalAnnouncement } from "@/components/promotionalAnnouncement";
import { fetchData } from "@/utils/fetchData";
import { AllProductsProps, ProductsProps } from "@/types/product";
import { PromotionsProps, SiteContentProps } from "@/types/siteContent";
import { ReviewProps } from "@/types/review";
import { ProductsClient } from "@/components/ProductsClient";
import { CardBrands } from "@/components/cardBrands";
import { BrandsProps } from "@/types/brands";
import { Button } from "@/components/ui/button";
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export const revalidate = 120;



export default async function Home() {
  const totalProductsData = await fetchData<{ total: number }>('/products?stock=true&emphasis=true');
  const total = totalProductsData.total;

  const maxCarousels = 3;
  const limit = total <= 5 ? total : Math.ceil(total / maxCarousels);
  const carousels = Math.ceil(total / limit);

  const featuredProductsPromise = fetchData<AllProductsProps>('/products?endDate=true&isActive=true&featured=true&stock=true&emphasis=true');
  const promotionTopPromise = fetchData<PromotionsProps[]>('/promotions?active=true&position=top');
  const promotionBotPromise = fetchData<PromotionsProps[]>('/promotions?active=true&position=bot');
  const siteContentPromise = fetchData<SiteContentProps[]>('/site-content').then(data => data[0]);
  const reviewDataPromise = fetchData<ReviewProps[]>('/review');

  const productsPagesPromises = Array.from({ length: carousels }, (_, pageIndex) =>
    fetchData<{ products: ProductsProps[] }>(`/products?limit=${limit}&offset=${pageIndex * limit}&stock=true&emphasis=true`).then(data => data.products)
  );

  const brandsPromisse = fetchData<BrandsProps[]>('/brands');

  const [
    featuredProducts,
    promotionTop,
    promotionBot,
    siteContent,
    reviewData,
    brands,
    ...productsGroups
  ] = await Promise.all([
    featuredProductsPromise,
    promotionTopPromise,
    promotionBotPromise,
    siteContentPromise,
    reviewDataPromise,
    brandsPromisse,
    ...productsPagesPromises,
  ]);

  if (!siteContent) {
    return (
      <p>site content não confugurado</p>
    )
  }

  return (
    <main className="w-full pt-6 space-y-6">

      <ButtonCart />
      <Hero
        hero={siteContent.promotionHero}
        service={siteContent.service}
      />

      <section className="container mx-auto w-full flex items-center justify-center px-6">
        <Flex className="justify-around flex-row w-full gap-2">
          <CardAnnouncement promotionTop={promotionTop} />
          <LimitedTimeOffer products={featuredProducts.products} />
        </Flex>
      </section>

      <ProductsClient productsGroups={productsGroups} />

      <section className="container mx-auto w-full flex flex-col gap-6 items-center justify-center px-6">
        <ReviewList reviewData={reviewData} />
      </section>

      <section className="container mx-auto w-full flex flex-col gap-6 items-center justify-center px-6">
        <CardBrands brands={brands} />
      </section>

      <section className="container mx-auto w-full flex flex-col gap-6 items-center justify-center px-6">
        <PromotionalAnnouncement promotionBot={promotionBot} />
      </section>
    </main>
  );
}
