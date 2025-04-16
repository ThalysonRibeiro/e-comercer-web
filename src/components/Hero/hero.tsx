import { BgVideo } from "../bgVideo";
import { Flex } from "../ui/flex";
import { ServiceHero } from "./service";
import { CardSpecialPromotion } from "./cardSpecialPromotion";
import { CarouselHero } from "./carouselHero";

export interface HeroPromotioProps {
  videoUrl: string;
  promotionHero: PromotionHeroProps[]
}
interface PromotionHeroProps {
  id: string;
  title: string;
  subTitle: string;
  sale: string;
  description: string;
  image: string;
}

export function Hero({ data }: { data: HeroPromotioProps }) {
  console.log(data.videoUrl);

  return (
    <div className="w-full flex items-center justify-center relative sombra-interna pt-6">
      <BgVideo videoUrl={data.videoUrl} />
      <Flex className="max-w-7xl w-full flex-col ">

        <CarouselHero data={data} />

        <ServiceHero />

        <CardSpecialPromotion />

      </Flex>

    </div>
  )
}