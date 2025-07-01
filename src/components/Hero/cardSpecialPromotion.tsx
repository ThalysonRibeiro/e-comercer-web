import InfiniteTextCarousel from "../ui/carouselText";
import { Flex } from "../ui/flex";



export function CardSpecialPromotion() {
  return (
    <Flex className="w-full mt-6 justify-between">
      <span
        className="w-2/5 flex justify-center items-center uppercase  lg:text-3xl md:text-xl text-sm font-semibold bg-primary h-15  rounded-l-lg pr-3"
      >
        mega promoção!
      </span>
      <div
        className="w-3/4 text-2xl bg-card border border-border rounded-r-lg text-center marquee"
        style={{
          clipPath: "polygon(30px 0, 100% 0, 100% 100%, 0 100%)",
          marginLeft: "-30px",
        }}
      >
        <InfiniteTextCarousel
          speed={3}
          items={[
            "🎉 Mega Promoção de Eletrônicos! ⚡",
            "💥 Produtos com até 50% OFF e condições especiais no cartão!",
            "📦 Frete grátis para diversas regiões",
            "🕒 Promoção por tempo limitado ou enquanto durarem os estoques!"
          ]} />
      </div>

    </Flex>
  )
}