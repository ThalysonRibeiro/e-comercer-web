import { Flex } from "../ui/flex";

export function CardSpecialPromotion() {
  return (
    <Flex className="w-full mt-6 justify-between">
      <span
        className="w-2/5 flex justify-center items-center uppercase text-title lg:text-3xl md:text-xl text-sm font-semibold bg-primaryColor h-15  rounded-l-lg pr-3"
      >
        mega promoção!
      </span>
      <div
        className="w-3/4 text-title text-2xl bg-bgCard p-3 rounded-r-lg text-center marquee"
        style={{
          clipPath: "polygon(30px 0, 100% 0, 100% 100%, 0 100%)",
          marginLeft: "-30px",
        }}
      >
        <span className="block whitespace-nowrap animate-marquee">
          🎉 Mega Promoção de Eletrônicos! ⚡ 💥 Produtos com até 50% OFF e condições especiais no cartão! 📦 Frete grátis para diversas regiões 🕒 Promoção por tempo limitado ou enquanto durarem os estoques!
        </span>
      </div>
    </Flex>
  )
}