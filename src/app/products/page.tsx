import { ListItems } from "./components/listItems";
import { MenuCategory } from "./components/menuCategory";
import { fetchData } from "@/utils/fetchData";
import { AllProductsProps, } from "@/types/product";
import { Category } from "@/types/category";
import { FiltersProducts } from "./components/filters";
import { buildQueryString } from "@/utils/buildQueryString";
import ReloadOnParamChange from "@/components/reloadOnParamChange";
import { BrandsProps } from "@/types/brands";


export default async function Products({ searchParams }: { searchParams: Record<string, string | string[] | undefined> }) {
  const { category, priceMin, priceMax, brand, tags, sort, limit, bigsale } = await searchParams;


  // Build the filters object
  const filters: any = {};
  if (category) filters.category = category;
  if (priceMin) filters.price = priceMin;
  if (priceMax) filters['-price'] = priceMax;
  if (brand) filters.brand = brand;
  if (tags) filters.tags = tags;
  if (sort) filters.sort = sort;
  if (limit) filters.limit = limit;
  if (bigsale) filters.bigsale = true

  // Clean the object to remove undefined or empty values
  function cleanObject(obj: any) {
    return Object.fromEntries(
      Object.entries(obj).filter(([_, value]) => value !== undefined && value !== '')
    );
  }

  // Build the query string
  const queryString = buildQueryString(cleanObject(filters));

  const productsPromise = fetchData<AllProductsProps>(`/products?offset=0${queryString}`);
  const categoryPromise = fetchData<Category[]>(`/category?hasChildren=true&limit=6&offset=0`);
  const brandsPromise = fetchData<BrandsProps[]>('/brands');


  const [
    productsData,
    menucategoryData,
    brandsData
  ] = await Promise.all([
    productsPromise,
    categoryPromise,
    brandsPromise
  ]);



  return (
    <main className="w-full pt-6 space-y-6">
      <ReloadOnParamChange />
      <section className="container mx-auto w-full flex px-6">
        <MenuCategory allCategory={menucategoryData} brands={brandsData}>
          <div className="w-full">
            <FiltersProducts products={productsData} />
            <ListItems AllProducts={productsData.products} />
          </div>
        </MenuCategory>
      </section>
    </main>
  );
}
