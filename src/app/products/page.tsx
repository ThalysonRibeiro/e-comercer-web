import { ListItems } from "./components/listItems";
import { MenuCategory } from "./components/menuCategory";
import { CarouselHero } from "@/components/Hero/carouselHero";
import { fetchData } from "@/utils/fetchData";
import { PromotionHeroProps } from "@/types/siteContent";
import { AllProductsProps, } from "@/types/product";
import { Category } from "@/types/category";
import { Flex } from "@/components/ui/flex";

export default async function Products() {
  const promotionHeroPromise = fetchData<PromotionHeroProps[]>(`/promotion-hero?active=true&limit=5&offset=0&position=top`);
  const productsPromise = fetchData<AllProductsProps>(`/products`);
  const categoryPromise = fetchData<Category[]>(`/category?hasChildren=true&limit=6&offset=0`);
  const [
    promotionHero,
    products,
    category
  ] = await Promise.all([
    promotionHeroPromise,
    productsPromise,
    categoryPromise
  ])
  return (
    <main className="max-w-7xl w-full mx-auto">
      <section className=" w-full mx-auto flex mt-6">
        <CarouselHero promotionHero={promotionHero} />
      </section>
      <section className=" w-full mx-auto flex mt-6">
        <MenuCategory allCategory={category}>
          <div className="w-full">
            <Flex className="w-fit h-10 justify-between items-center gap-4 mb-4">
              <span className="text-title">Ordenar:</span>
              <div className="bg-bgCard h-10 rounded-lg flex px-1 border border-borderColor">
                <select name="" id="" className="bg-bgCard outline-0">
                  <option value="" className="w-50 px-4">De A á Z</option>
                  <option value="" className="w-50 px-4">Melhor avaliado</option>
                  <option value="" className="w-50 px-4">Preço crescente</option>
                  <option value="" className="w-50 px-4">Preço decrescente</option>
                </select>
              </div>
              <span className="text-title">Exibir:</span>
              <div className="bg-bgCard h-10 rounded-lg flex px-1 border border-borderColor">
                <select name="" id="" className="bg-bgCard outline-0">
                  <option value="">20 por página</option>
                  <option value="">30 por página</option>
                  <option value="">40 por página</option>
                  <option value="">50 por página</option>
                </select>
              </div>
              <span className="text-title">{products.total} Produtos</span>
            </Flex>
            <ListItems AllProducts={products.products} />
          </div>
        </MenuCategory>
      </section>
    </main>
  )
}