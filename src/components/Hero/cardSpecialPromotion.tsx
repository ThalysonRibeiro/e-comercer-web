import { Flex } from "../ui/flex";

export function CardSpecialPromotion() {
  return (
    <Flex className="w-full mt-6 justify-between">
      <span
        className="w-1/3 text-gray-100 text-3xl font-semibold bg-primary p-3 rounded-l-lg px-6"
      >
        BLACK FRIDAY SALE!
      </span>
      <div
        className="w-3/4 text-gray-100 text-2xl bg-gray-600 p-3 rounded-r-lg text-center marquee"
        style={{
          clipPath: "polygon(30px 0, 100% 0, 100% 100%, 0 100%)",
          marginLeft: "-30px",
        }}
      >
        <span className="block whitespace-nowrap animate-marquee">ALGUMA COISA SOBRE AS PROMOÇÕES DA BLACK FRIDAY ALGUMA COISA SOBRE AS PROMOÇÕES DA BLACK FRIDAY</span>
      </div>
    </Flex>
  )
}