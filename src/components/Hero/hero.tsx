import { BgVideo } from "../bgVideo";
import { Flex } from "../ui/flex";
import { ServiceHero } from "./service";
import { CardSpecialPromotion } from "./cardSpecialPromotion";
import { CarouselHero } from "./carouselHero";
import { PromotionHeroProps } from "@/types/siteContent";

export interface HeroPromotioProps {
  // videoUrl: string;
  hero: PromotionHeroProps[];
  service: string[];
}

export function Hero({ hero, service }: HeroPromotioProps) {


  return (
    <div className="w-full flex items-center justify-center relative pt-6 px-6">
      {/* <BgVideo videoUrl={data.videoUrl} /> */}
      <Flex className="max-w-7xl w-full flex-col ">

        <CarouselHero promotionHero={hero} />

        <ServiceHero service={service} />

        <CardSpecialPromotion />

      </Flex>

    </div>
  )
}