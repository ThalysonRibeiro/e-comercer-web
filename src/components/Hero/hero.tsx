import { Flex } from "../ui/flex";
import { ServiceHero } from "./service";
import { CardSpecialPromotion } from "./cardSpecialPromotion";
import { CarouselHero } from "./carouselHero";
import { PromotionHeroProps } from "@/types/siteContent";

export interface HeroPromotioProps {
  hero: PromotionHeroProps[];
  service: string[];
}

export function Hero({ hero, service }: HeroPromotioProps) {


  return (
    <div className="container mx-auto w-full flex items-center justify-center relative px-6">
      <Flex className="w-full flex-col ">

        <CarouselHero promotionHero={hero} />

        <ServiceHero service={service} />

        <CardSpecialPromotion />

      </Flex>

    </div>
  )
}