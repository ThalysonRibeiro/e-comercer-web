import { ListItems } from "./components/listItems";
import { MenuCategory } from "./components/menuCategory";
import { CarouselHero } from "@/components/Hero/carouselHero";
import { fetchData } from "@/utils/fetchData";
import { PromotionHeroProps } from "@/types/siteContent";
import { AllProductsProps, } from "@/types/product";
import { Category } from "@/types/category";
import { FiltersProducts } from "./components/filters";
import { buildQueryString } from "@/utils/buildQueryString";
import ReloadOnParamChange from "@/components/reloadOnParamChange";
import { CardSpecialPromotion } from "@/components/Hero/cardSpecialPromotion";



interface Props {
  searchParams: {
    category?: string;
    priceMin?: string;
    priceMax?: string;
    brand?: string;
    tags?: string;
    sort?: string;
    limit?: string; // 👈 adicionei aqui
  };
}
export default async function Products({ searchParams }: Props) {
  const { category, priceMin, priceMax, brand, tags, sort, limit } = await searchParams;

  // Build the filters object
  const filters: any = {};
  if (category) filters.category = category;
  if (priceMin) filters.price = priceMin;
  if (priceMax) filters['-price'] = priceMax;
  if (brand) filters.brand = brand;
  if (tags) filters.tags = tags;
  if (sort) filters.sort = sort;
  if (limit) filters.limit = limit;

  // Clean the object to remove undefined or empty values
  function cleanObject(obj: any) {
    return Object.fromEntries(
      Object.entries(obj).filter(([_, value]) => value !== undefined && value !== '')
    );
  }

  // Build the query string
  const queryString = buildQueryString(cleanObject(filters));

  const productsPromise = fetchData<AllProductsProps>(`/products?offset=0${queryString}`);
  const promotionHeroPromise = fetchData<PromotionHeroProps[]>(`/promotion-hero?active=true&limit=5&offset=0&position=top`);
  const categoryPromise = fetchData<Category[]>(`/category?hasChildren=true&limit=6&offset=0`);


  const [
    promotionHero,
    products,
    menucategory
  ] = await Promise.all([
    promotionHeroPromise,
    productsPromise,
    categoryPromise
  ]);



  return (
    <main className="max-w-7xl w-full mx-auto">
      <ReloadOnParamChange />
      <section className=" w-full mx-auto flex mt-6">
        {/* <CarouselHero promotionHero={promotionHero} /> */}
      </section>
      <section className=" w-full mx-auto flex mt-6">
        <MenuCategory allCategory={menucategory}>
          <div className="w-full">
            <FiltersProducts products={products} />
            <ListItems AllProducts={products.products} />
          </div>
        </MenuCategory>
      </section>
    </main>
  );
}

