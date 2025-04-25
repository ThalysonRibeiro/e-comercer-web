import { ButtonCart } from "@/components/buttonCart";
import { CardProductCarousel } from "@/components/cardProductCarousel";
import { Header } from "@/components/Header/header";
import { Hero } from "@/components/Hero/hero";
import { CardAnnouncement } from "@/components/LimitedTimeOffer/cardAnnouncement";
import { LimitedTimeOffer } from "@/components/LimitedTimeOffer/limitedTimeOffer";
import { Flex } from "@/components/ui/flex";
import { serverApi } from "./api/api";
import { BgVideo } from "@/components/bgVideo";
import { SiteContentProps } from "@/types/siteContent";
import { ReviewList } from "@/components/reviewList";
import { PromotionalAnnouncement } from "@/components/promotionalAnnouncement";
import { Footer } from "@/components/footer";





export const revalidate = 120; //renderizar dinamincamente


export default async function Home() {
  const { data: featuredProducts } = await serverApi.get(`/products?endDate=true&isActive=true&featured=true&stock=true&emphasis=true`);
  const { data: promotionTop } = await serverApi.get(`/promotions?active=true&position=top`);
  const { data: promotionBot } = await serverApi.get(`/promotions?active=true&position=bot`);
  const { data: products1 } = await serverApi.get(`/products?limit=10&offset=0&stock=true&emphasis=true`);
  // const { data: products2 } = await serverApi.get(`/products?limit=3&offset=3&stock=true&emphasis=true`);
  // const { data: products3 } = await serverApi.get(`/products?limit=4&offset=4&stock=true&emphasis=true`);
  const response = await serverApi.get('/site-content');
  const siteContent: SiteContentProps = response.data[0];
  const { data: reviewData } = await serverApi.get('/review');


  return (
    <div className="w-full">
      {siteContent.bg_video && (
        <BgVideo videoUrl={siteContent.bg_video} />
      )}

      <ButtonCart />
      <Hero
        hero={siteContent.promotionHero}
        service={siteContent.service}
      />

      <section className="w-full flex items-center justify-center mt-6 px-6">
        <Flex className=" justify-around flex-row max-w-7xl w-full gap-2">
          <CardAnnouncement promotionTop={promotionTop} />
          <LimitedTimeOffer products={featuredProducts} />
        </Flex>
      </section>


      <section className="w-full flex flex-col gap-3  items-center justify-center mt-6 px-6">
        {products1 && <CardProductCarousel products={products1} />}
        {products1 && <CardProductCarousel products={products1} />}
        {products1 && <CardProductCarousel products={products1} />}
      </section>


      <section className="w-full flex flex-col gap-6  items-center justify-center mt-6 px-6">
        <ReviewList reviewData={reviewData} />
      </section>

      <section className="w-full flex flex-col gap-6  items-center justify-center mt-6 px-6 mb-10">
        <PromotionalAnnouncement promotionBot={promotionBot} />
      </section>


    </div>
  );
}