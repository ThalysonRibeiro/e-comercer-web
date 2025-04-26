"use client"
import { Context, ContextType } from '@/context/Context';
import { Category } from '@/types/category';
import { Menu } from 'lucide-react';
import Link from 'next/link';
import React, { useState, useRef, useContext, useEffect } from 'react';

export interface MenuProps {
  category: Category[];
}

function DropdownMenu({ category }: MenuProps) {
  const { toggleSideBar } = useContext(Context) as ContextType;
  const [openMenuIndex, setOpenMenuIndex] = useState<number | null>(null);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const [openMenuCategory, setOpenMenuCategory] = useState<boolean>(false);

  const toggleDropdown = (index: number) => {
    setOpenMenuIndex(openMenuIndex === index ? null : index);
    setOpenMenuCategory(prev => !prev);
  };


  useEffect(() => {
    function handleClickOutsideRegister(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpenMenuCategory(false);
        setOpenMenuIndex(null); // <<< adiciona essa linha
      }
    }

    if (openMenuCategory) {
      document.addEventListener("mousedown", handleClickOutsideRegister);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutsideRegister);
    };
  }, [openMenuCategory]);


  return (
    <div className="relative" ref={dropdownRef}>
      <div className="hidden lg:flex space-x-2">
        {category.map((item, index) => (
          <div key={item.id} className="relative">
            <button
              onClick={() => toggleDropdown(index)}
              className="cursor-pointer capitalize text-sm text-title transition duration-300 hover:text-hover flex items-center justify-between px-1 py-1 rounded-md focus:outline-none focus:ring-1 focus:ring-hover"
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
                      className="block w-full px-4 py-2 capitalize text-xs text-textColor hover:bg-hover hover:text-textButton"
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

      <div className="lg:hidden">
        <button
          onClick={toggleSideBar}
          className="text-title hover:text-hover focus:outline-none border rounded-sm w-9 h-9 flex items-center justify-center"
          aria-label="Menu"
        >
          <Menu size={30} />
        </button>
      </div>
    </div>
  );
}

export default DropdownMenu;