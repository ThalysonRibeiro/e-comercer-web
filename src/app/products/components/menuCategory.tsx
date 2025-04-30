"use client"
import { Flex } from "@/components/ui/flex";
import { Input } from "@/components/ui/input";
import { BrandsProps } from "@/types/brands";
import { Category } from "@/types/category";
import { el } from "date-fns/locale";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, useCallback } from "react";

export function MenuCategory({
  children,
  allCategory,
  brands
}: {
  children: React.ReactNode;
  allCategory: Category[]
  brands: BrandsProps[]
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [openMenuIndex, setOpenMenuIndex] = useState<number | null>(null);
  const [checkboxfBrand, setCheckboxfBrand] = useState<Record<string, boolean>>({});
  const [bigSale, setBigSale] = useState<boolean>(false);
  const pathname = usePathname();
  // Ao carregar o componente, verifica se bigsale=true está na URL
  useEffect(() => {
    const bigsaleParam = searchParams.get('bigsale');

    // Se bigsale=true está na URL, marca o checkbox
    if (bigsaleParam === 'true') {
      setBigSale(true);
    }
  }, [searchParams]);

  // Função para criar uma nova URL com os parâmetros atualizados
  const createQueryString = useCallback(
    (name: string, value: string | null) => {
      const params = new URLSearchParams(searchParams.toString());

      if (value === null) {
        params.delete(name);
      } else {
        params.set(name, value);
      }

      return params.toString();
    },
    [searchParams]
  );

  // Função para atualizar a URL quando o checkbox mudar
  const handleBigSaleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = e.target.checked;
    setBigSale(isChecked);

    // Atualiza a URL usando o router do Next.js
    const newQueryString = createQueryString('bigsale', isChecked ? 'true' : null);
    router.push(`${pathname}${newQueryString ? `?${newQueryString}` : ''}`);
  };


  // Função para alternar os dropdowns das categorias
  const toggleDropdown = (index: number) => {
    setOpenMenuIndex(openMenuIndex === index ? null : index);
  };

  // Atualiza a URL com base nas marcas selecionadas - definida com useCallback para evitar recriação
  const updateURLWithBrands = useCallback((brandName: string, isActive: boolean) => {
    // Cria um novo objeto URLSearchParams a partir dos parâmetros atuais
    const params = new URLSearchParams(searchParams.toString());

    // Obtém a lista atual de marcas (se existir)
    const currentBrands = params.get('brand')?.split(',').filter(Boolean) || [];

    if (isActive) {
      // Adiciona a marca se ela ainda não estiver na lista
      if (!currentBrands.includes(brandName)) {
        currentBrands.push(brandName);
      }
    } else {
      // Remove a marca se estiver na lista
      const index = currentBrands.indexOf(brandName);
      if (index !== -1) {
        currentBrands.splice(index, 1);
      }
    }

    // Atualiza ou remove o parâmetro 'brand' baseado nas seleções
    if (currentBrands.length > 0) {
      params.set('brand', currentBrands.join(','));
    } else {
      params.delete('brand');
    }

    // Atualiza a URL sem recarregar a página
    const newUrl = `?${params.toString()}`;

    // IMPORTANTE: Use setTimeout para evitar atualização durante renderização
    setTimeout(() => {
      router.push(newUrl);
    }, 0);
  }, [searchParams, router]);

  // Inicializa os checkboxes e verifica quais marcas já estão na URL
  useEffect(() => {
    const initialState: Record<string, boolean> = {};
    const urlBrands = searchParams.get('brand')?.split(',') || [];

    brands.forEach((item) => {
      // Define como true se a marca estiver na URL
      initialState[item.id] = urlBrands.includes(item.name);
    });

    setCheckboxfBrand(initialState);
  }, [brands, searchParams]);

  // Manipula a mudança dos checkboxes
  const handleCheckboxChange = useCallback((id: string, name: string) => {
    setCheckboxfBrand((prev) => {
      const newValue = !prev[id];

      // Atualiza a URL quando o estado do checkbox muda - agora em um timeout
      updateURLWithBrands(name, newValue);

      return {
        ...prev,
        [id]: newValue,
      };
    });
  }, [updateURLWithBrands]);

  return (
    <div className="max-w-7xl w-full mx-auto flex gap-4">
      <div className="w-80 min-h-105 h-fit border border-borderColor rounded-lg p-3 hidden lg:block">
        <h1 className="text-title font-bold text-2xl mb-2">Categorias</h1>

        <div>
          {allCategory.map((item, index) => (
            <div key={item.name} className="block">
              <button
                onClick={() => toggleDropdown(index)}
                className="w-full capitalize text-left text-title hover:bg-hover px-3 py-2 text-base font-medium flex justify-between items-center rounded-t-sm border-b border-borderColor focus-within:bg-hover"
              >
                <span>{item.name}</span>
                {item.children && item.children.length > 0 && (
                  <svg
                    className={`w-5 h-5 transition-transform duration-200 ${openMenuIndex === index ? 'transform rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                  </svg>
                )}
              </button>

              {/* Submenu para categorias */}
              {item.children && item.children.length > 0 && openMenuIndex === index && (
                <div className="pl-4 bg-bgCard rounded-md mt-1">
                  {item.children.map(subItem => (
                    <Link
                      key={subItem.id}
                      href={`?category=${subItem.name}`}
                      onClick={() => {
                        setOpenMenuIndex(null);
                      }}
                      className="block w-full px-3 py-2 capitalize text-sm text-textColor hover:bg-hover/70 rounded-s-md"
                    >
                      {subItem.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        <h2 className="font-bold text-xl my-2">Filtros</h2>

        <div>
          <p className="text-textColor/50 font-bold my-2">Preço</p>
          <Flex className="items-center gap-2">
            <span>R$</span>
            <Input type="number" placeholder="min" />
            <span>-</span>
            <Input type="number" placeholder="max" />
          </Flex>
        </div>

        <div>
          <p className="text-textColor/50 font-bold my-2">Oferta</p>
          <Flex className={`items-center gap-2 border border-borderColor rounded-md px-2 py-1 cursor-pointer mb-2 ${bigSale && 'border-primaryColor'} hover:bg-hover/70`}>
            <input
              type="checkbox"
              checked={bigSale}
              onChange={handleBigSaleChange}
              className="cursor-pointer w-4 h-4 appearance-none checked:bg-primaryColor rounded-full border border-borderColor transition duration-200"
            />
            <p className="capitalize">{'oferta'}</p>
          </Flex>
        </div>

        <div>
          <p className="text-textColor/50 font-bold my-2">Marcas</p>
          {brands.map((item) => (
            <Flex
              key={item.id}
              className={`items-center gap-2 border border-borderColor rounded-md px-2 py-1 cursor-pointer mb-2 ${checkboxfBrand[item.id] && 'border-primaryColor'} hover:bg-hover/70`}
            >
              <input
                type="checkbox"
                checked={checkboxfBrand[item.id] ?? false}
                onChange={() => handleCheckboxChange(item.id, item.name)}
                className="cursor-pointer w-4 h-4 appearance-none checked:bg-primaryColor rounded-full border border-borderColor transition duration-200"
              />
              <p className="capitalize">{item.name}</p>
            </Flex>
          )
          )}
        </div>
      </div>
      {children}
    </div>
  )
}