"use client"
import { Category } from '@/types/category';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';
import React, { useState, useRef, useEffect } from 'react';

export interface MenuProps {
  category: Category[];
}

function DropdownMenu({ category }: MenuProps) {
  // Estado para controlar menu mobile aberto/fechado
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  // Estado para controlar qual submenu está aberto
  const [openMenuIndex, setOpenMenuIndex] = useState<number | null>(null);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  // Função para alternar um menu específico
  const toggleDropdown = (index: number) => {
    setOpenMenuIndex(openMenuIndex === index ? null : index);
  };

  // Alternar o menu mobile
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    // Fechar os submenus ao fechar o menu principal
    if (isMobileMenuOpen) {
      setOpenMenuIndex(null);
    }
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpenMenuIndex(null);
        setIsMobileMenuOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Menu Desktop - escondido em mobile */}
      <div className="hidden lg:flex space-x-2">
        {category.map((item, index) => (
          <div key={item.name} className="relative">
            <button
              onClick={() => toggleDropdown(index)}
              className="cursor-pointer text-sm text-title transition duration-300 hover:text-hover flex items-center justify-between px-1 py-1 rounded-md focus:outline-none focus:ring-1 focus:ring-hover"
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
              <div className="absolute -left-10 min-w-40 mt-2 origin-top-left bg-bgCard rounded-md shadow-lg ring-1 ring-borderColor ring-opacity-5 focus:outline-none z-10">
                <div className="py-1">
                  {item.children.map(subItem => (
                    <Link
                      key={subItem.id}
                      href={`/categoria/${subItem.id}`}
                      onClick={() => setOpenMenuIndex(null)}
                      className="block w-full px-4 py-2 text-xs text-textColor hover:bg-hover hover:text-textButton"
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

      {/* Botão do Menu Hambúrguer - visível apenas em mobile */}
      <div className="lg:hidden">
        <button
          onClick={toggleMobileMenu}
          className="text-title hover:text-hover focus:outline-none border rounded-sm w-9 h-9 flex items-center justify-center"
          aria-label="Menu"
        >
          {isMobileMenuOpen ? (
            <X size={30} />
          ) : (
            <Menu size={30} />
          )}
        </button>
      </div>

      {/* Menu Mobile - aparece quando clica no hambúrguer */}
      {isMobileMenuOpen && (
        <div className="lg:hidden absolute top-10 -left-34 bg-bgCard rounded-lg shadow-lg z-20">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {category.map((item, index) => (
              <div key={item.name} className="block">
                <button
                  onClick={() => toggleDropdown(index)}
                  className="w-full text-left text-title hover:bg-bgCard px-3 py-2 rounded-md text-base font-medium flex justify-between items-center"
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

                {/* Submenu para mobile */}
                {item.children && item.children.length > 0 && openMenuIndex === index && (
                  <div className="pl-4 bg-bgCard rounded-md mt-1">
                    {item.children.map(subItem => (
                      <Link
                        key={subItem.id}
                        href={`/categoria/${subItem.id}`}
                        onClick={() => {
                          setOpenMenuIndex(null);
                          setIsMobileMenuOpen(false);
                        }}
                        className="block w-full px-3 py-2 text-sm text-textColor hover:bg-textButton"
                      >
                        {subItem.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default DropdownMenu;