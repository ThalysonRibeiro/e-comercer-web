"use client"
import { Category } from "@/types/category";
import Link from "next/link";
import { useState } from "react";

export function MenuCategory({
  children,
  allCategory
}: {
  children: React.ReactNode;
  allCategory: Category[]
}) {

  const [openMenuIndex, setOpenMenuIndex] = useState<number | null>(null);

  const toggleDropdown = (index: number) => {
    setOpenMenuIndex(openMenuIndex === index ? null : index);
  };
  return (
    <div className="max-w-7xl w-full mx-auto flex gap-4">
      <div className="w-100 min-h-100 h-125 border border-borderColor rounded-lg p-3">
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

              {/* Submenu para mobile */}
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

      </div>
      {children}
    </div>
  )
}