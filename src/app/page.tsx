import { ButtonCart } from "@/components/buttonCart";
import { CardProductCarousel } from "@/components/cardProductCarousel";
import { Header } from "@/components/Header/header";
import { Hero } from "@/components/Hero/hero";
import { CardAnnouncement } from "@/components/LimitedTimeOffer/cardAnnouncement";
import { LimitedTimeOffer } from "@/components/LimitedTimeOffer/limitedTimeOffer";
import { Flex } from "@/components/ui/flex";
import { serverApi } from "./api/api";





export const revalidate = 120; //renderizar dinamincamente


export default async function Home() {
  const { data: featuredProducts } = await serverApi.get(`/products?endDate=true&isActive=true&featured=true&stock=true&emphasis=true`);
  const { data: categoryMenu } = await serverApi.get(`/category?hasChildren=true&limit=6&offset=0`);
  const { data: siteContent } = await serverApi.get('/site-content')
  // const session = await getSession();

  // if (!session) {
  //   redirect("/")
  // }

  return (
    <div className="w-full">
      <Header
        category={categoryMenu}
        siteContent={siteContent}
      />
      <ButtonCart />
      {/* <Hero data={promotion} /> */}

      <section className="w-full flex items-center justify-center mt-6 px-6">
        <Flex className=" justify-around flex-row max-w-7xl w-full gap-2">
          <CardAnnouncement />
          <LimitedTimeOffer products={featuredProducts} />
        </Flex>
      </section>

      <section className="w-full flex flex-col gap-6  items-center justify-center mt-6">
        {/* <CardProductCarousel products={response.data} />
        <CardProductCarousel products={response.data} />
        <CardProductCarousel products={response.data} /> */}
      </section>

    </div>
  );
}