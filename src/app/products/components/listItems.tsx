'use client';

import { CardProduct } from "@/components/ui/cardProduct";
import { ProductsProps } from "@/types/product";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Flex } from "@/components/ui/flex";
import { useSearchParams, useRouter } from "next/navigation";

export function ListItems({ AllProducts }: { AllProducts: ProductsProps[] }) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 20;

  const totalPages = Math.ceil(AllProducts.length / productsPerPage);

  useEffect(() => {
    const pageParam = Number(searchParams.get("page")) || 1;
    if (pageParam !== currentPage) {
      setCurrentPage(pageParam);
    }
  }, [searchParams, currentPage]);

  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const currentProducts = AllProducts.slice(startIndex, endIndex);

  function handlePageClick(pageNumber: number) {
    router.push(`?page=${pageNumber}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function handlePrevPage() {
    if (currentPage > 1) {
      handlePageClick(currentPage - 1);
    }
  }

  function handleNextPage() {
    if (currentPage < totalPages) {
      handlePageClick(currentPage + 1);
    }
  }

  function getPageNumbers() {
    const pages: (number | string)[] = [];

    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, '...', totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1, '...', totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
      }
    }

    return pages;
  }

  const pageNumbers = getPageNumbers();

  return (
    <>
      <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 w-full">
        {currentProducts.map(item => (
          <CardProduct key={item.id} product={item} />
        ))}
      </div>

      {/* Paginação */}
      <Flex className="justify-center items-center gap-2 mt-8">
        <Button onClick={handlePrevPage} disabled={currentPage === 1} className="w-fit px-4">
          &lt;
        </Button>

        {pageNumbers.map((page, index) => (
          <div key={index}>
            {page === '...' ? (
              <span className="px-2 text-gray-500">...</span>
            ) : (
              <Button
                onClick={() => handlePageClick(Number(page))}
                className={`${page === currentPage ? "bg-primaryColor text-title rounded-full" : ""} px-4`}
              >
                {page}
              </Button>
            )}
          </div>
        ))}

        <Button onClick={handleNextPage} disabled={currentPage === totalPages} className="w-fit px-4">
          &gt;
        </Button>
      </Flex>
    </>
  );
}
