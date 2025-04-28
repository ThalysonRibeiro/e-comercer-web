'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { Flex } from "@/components/ui/flex";
import { AllProductsProps } from "@/types/product";
import { useState, useEffect, useTransition } from 'react';
import { Button } from '@/components/ui/button';

export function FiltersProducts({ products }: { products: AllProductsProps }) {
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
    <Flex className="w-fit h-10 justify-between items-center gap-4 mb-4">
      <span className="text-title">Ordenar:</span>
      <div className="bg-bgCard h-10 rounded-lg flex px-1 border border-borderColor">
        <select
          className="bg-bgCard outline-0"
          value={currentSort}
          onChange={(e) => handleSortChange(e.target.value)}
          disabled={isPending}
        >
          <option value="az">De A a Z</option>
          <option value="za">De Z a A</option>
          <option value="topRated">Melhor avaliado</option>
          <option value="priceAsc">Preço crescente</option>
          <option value="priceDesc">Preço decrescente</option>
        </select>
      </div>

      <span className="text-title">Exibir:</span>
      <div className="bg-bgCard h-10 rounded-lg flex px-1 border border-borderColor">
        <select
          className="bg-bgCard outline-0"
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


      <span className="text-title">{isPending ? '...' : products.total} Produtos</span>
      <Button
        onClick={handleClearFilters}
        className='w-fit px-4'
      >
        Limpar filtros
      </Button>
    </Flex>
  );
}