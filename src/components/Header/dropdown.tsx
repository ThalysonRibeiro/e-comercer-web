"use client"
import { Category } from '@/types/category';
import Link from 'next/link';
import React, { useState, useRef, useEffect } from 'react';

export interface MenuProps {
  category: Category[];
}
function DropdownMenu({ category }: MenuProps) {
  // Criar um estado para cada menu
  const [openMenuIndex, setOpenMenuIndex] = useState<number | null>(null);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  // Função para alternar um menu específico
  const toggleDropdown = (index: number) => {
    setOpenMenuIndex(openMenuIndex === index ? null : index);
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpenMenuIndex(null);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <div className="flex space-x-2">
        {category.map((item, index) => (
          <div key={item.name} className="relative">
            <button
              onClick={() => toggleDropdown(index)}
              className="cursor-pointer text-sm text-gray-100 transition duration-300 hover:text-hover flex items-center justify-between px-1 py-1 rounded-md focus:outline-none focus:ring-1 focus:ring-hover"
            >
              <span>{item.name}</span>
              <svg
                className={`w-5 h-5 ml-2 transition-transform duration-200 ${openMenuIndex === index ? 'transform rotate-180' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </button>

            {item.children && item.children.length > 0 && openMenuIndex === index && (
              <div className="absolute left-0 min-w-50 mt-2 origin-top-left bg-gray-600/90 rounded-md shadow-lg ring-1 ring-gray-400 ring-opacity-5 focus:outline-none z-10">
                <div className="py-1">
                  {item.children.map(subItem => (
                    <Link
                      key={subItem.id}
                      href={`/categoria/${subItem.id}`}
                      onClick={() => setOpenMenuIndex(null)}
                      className="block w-full px-4 py-2 text-xs text-gray-200 hover:bg-hover hover:text-gray-500"
                    >
                      {subItem.name}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default DropdownMenu;