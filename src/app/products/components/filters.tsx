'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { Flex } from "@/components/ui/flex";
import { AllProductsProps } from "@/types/product";
import { useState, useEffect, useTransition } from 'react';
import { Button } from '@/components/ui/button';
import { FaArrowsSpin } from 'react-icons/fa6';
import { useIsMobile } from '@/app/hooks/useIsMobile';
import { RefreshCcw } from 'lucide-react';

export function FiltersProducts({ products }: { products: AllProductsProps }) {
  const isMobile = useIsMobile(500);
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  // Get current values from URL params
  const currentSort = searchParams.get('sort') || 'az';
  const currentLimit = searchParams.get('limit') || '20';

  function handleClearFilters() {
    router.push('/products'); // navega para /products sem nenhum search param
  }

  // Handler for sort changes
  function handleSortChange(value: string) {
    // Create a new URLSearchParams instance
    const params = new URLSearchParams(searchParams);
    params.set('sort', value);

    // Use startTransition to prevent UI freezing during navigation
    startTransition(() => {
      // This will trigger a navigation and data refresh
      router.push(`/products?${params.toString()}`, { scroll: false });
    });
  }

  // Handler for limit changes
  function handleLimitChange(value: string) {
    // Create a new URLSearchParams instance
    const params = new URLSearchParams(searchParams);
    params.set('limit', value);

    // Use startTransition to prevent UI freezing during navigation
    startTransition(() => {
      // This will trigger a navigation and data refresh
      router.push(`/products?${params.toString()}`, { scroll: false });
    });
  }

  return (
    <Flex className="flex-row items-end w-fit min-h-10  gap-4 mb-4">
      <Flex className='flex-col md:flex-row md:items-center md:gap-2'>
        <span className="text-title text-[10px] md:text-base">Ordenar:</span>
        <div className="bg-bgCard h-10 rounded-lg flex px-1 border border-borderColor">
          <select
            className="bg-bgCard outline-0 text-[12px] md:text-base"
            value={currentSort}
            onChange={(e) => handleSortChange(e.target.value)}
            disabled={isPending}
          >
            <option value="az">De A pra Z</option>
            <option value="za">De Z pra A</option>
            <option value="topRated">Melhor avaliado</option>
            <option value="priceAsc">Preço crescente</option>
            <option value="priceDesc">Preço decrescente</option>
            <option value="bestSelling">Mais vendido</option>
          </select>
        </div>
      </Flex>

      <Flex className='flex-col md:flex-row md:items-center md:gap-2'>
        <span className="text-title text-[10px] md:text-base">Exibir:</span>
        <div className="bg-bgCard h-10 rounded-lg flex px-1 border border-borderColor">
          <select
            className="bg-bgCard outline-0 w-full text-[12px] md:text-base"
            value={currentLimit}
            onChange={(e) => handleLimitChange(e.target.value)}
            disabled={isPending}
          >
            <option value="20">20 por página</option>
            <option value="30">30 por página</option>
            <option value="40">40 por página</option>
            <option value="50">50 por página</option>
          </select>
        </div>
      </Flex>


      <Flex className='flex-col md:flex-row md:items-center md:gap-2'>
        <span className="text-title text-[10px] md:text-base">{isPending ? '...' : products.total} Produtos</span>
        <Button
          onClick={handleClearFilters}
          className={` ${isMobile ? 'w-full' : 'w-fit'} px-4 text-sm md:text-base`}
        >
          {isMobile ? <RefreshCcw /> : "Limpar filtros"}


        </Button>
      </Flex>
    </Flex>
  );
}