import { Car, CreditCard, ShoppingCart, Star } from "lucide-react";
import { Flex } from "../ui/flex";

export function ServiceHero() {
  return (
    <Flex className="gap-3 w-full justify-between backdrop-blur-lg bg-transparent rounded-lg border border-gray-500 p-4 mt-6">
      <Flex
        className="items-center justify-center hover:text-gray-100 h-8 text-primary border-r border-r-primary flex-1"
      >
        <Car className="mr-3" />SERVICE SHOP
      </Flex>
      <Flex
        className="items-center justify-center hover:text-gray-100 h-8 text-primary border-r border-r-primary flex-1"
      >
        <CreditCard className="mr-3" />SERVICE SHOP
      </Flex>
      <Flex
        className="items-center justify-center hover:text-gray-100 h-8 text-primary border-r border-r-primary flex-1"
      >
        <ShoppingCart className="mr-3" />SERVICE SHOP
      </Flex>
      <Flex
        className="items-center justify-center hover:text-gray-100 h-8 text-primary flex-1"
      >
        <Star className="mr-3" />SERVICE SHOP
      </Flex>
    </Flex>
  )
}