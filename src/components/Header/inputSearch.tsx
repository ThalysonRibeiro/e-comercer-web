"use client"
import { Search } from "lucide-react";
import { CardSearch } from "./cardSearch";
import api from "@/lib/axios";
import { useEffect, useState, useRef } from "react";
import { ProductsProps } from "@/types/product";

export function InputSearch() {
  const [products, setProducts] = useState<ProductsProps[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<ProductsProps[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showResults, setShowResults] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await api.get('/products');
        setProducts(response.data);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    }
    fetchProducts();
  }, []);

  // Add click outside listener
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowResults(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [searchRef]);

  function handleSearch(term: string) {
    const termLowerCase = term.trim().toLowerCase();

    if (!termLowerCase) {
      setFilteredProducts([]);
      setShowResults(false);
      return;
    }

    setShowResults(true);

    const productsFound = products.filter((product) => {
      const { title, category, tags, sku, brand } = product;

      const fieldMatches = (field: string | string[] | undefined): boolean => {
        if (!field) return false;

        if (Array.isArray(field)) {
          return field.some(item => item?.toLowerCase().includes(termLowerCase));
        } else {
          return field.toLowerCase().includes(termLowerCase);
        }
      };

      return fieldMatches(title) ||
        fieldMatches(category) ||
        fieldMatches(tags) ||
        fieldMatches(sku) ||
        fieldMatches(brand);
    });

    setFilteredProducts(productsFound);
  }

  return (
    <section className="max-w-2xl w-full flex flex-col items-center relative" ref={searchRef}>
      <div className="flex h-10 w-full justify-center items-center outline-0 bg-transparent backdrop-blur-sm border border-borderColor focus-within:border-primaryColor rounded-lg">
        <div className="border-r border-r-borderColor px-2 text-borderColor">
          <Search className="size-8" />
        </div>
        <input
          type="text"
          className="outline-0 w-full h-10 px-2"
          placeholder="Pesquisar produtos..."
          value={searchTerm}
          onClick={() => {
            if (searchTerm.trim() !== '') {
              setShowResults(true);
            }
          }}
          onChange={(e) => {
            const newTerm = e.target.value;
            setSearchTerm(newTerm);
            handleSearch(newTerm);
          }}
        />
      </div>
      {showResults && (
        <div className="absolute mx-auto w-full z-10 top-15">
          <CardSearch products={filteredProducts} />
        </div>
      )}
    </section>
  )
}