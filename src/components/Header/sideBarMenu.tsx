"use client"
import { Heart, LogOut, Settings, ShoppingBag, User, X } from "lucide-react";
import { useState } from "react";
import { MenuProps } from "./dropdown";
import Link from "next/link";
import { Flex } from "../ui/flex";
import { useAppContext } from "@/context/AppContext";
import { signOut } from "next-auth/react";
import Image from "next/image";

export function SideBarMenu({ category }: MenuProps) {
  const { userData, toggleSideBar, openSideBar, sideBarRef, openCloseModalLogin, openCloseModalRegister } = useAppContext();
  const [openMenuIndex, setOpenMenuIndex] = useState<number | null>(null);

  const toggleDropdown = (index: number) => {
    setOpenMenuIndex(openMenuIndex === index ? null : index);
  };


  return (
    <div ref={sideBarRef} className="absolute top-0 right-0 z-10 w-full">
      <Flex className={`w-60 h-screen flex-col bg-card absolute top-0 border-l border-l-border floatingMenu ${openSideBar ? 'right-0 flex' : '-right-60 hidden'}`}>
        <Flex className="justify-between p-1">
          <p>Menu</p>
          <button
            onClick={toggleSideBar}
          >
            <X />
          </button>
        </Flex>
        <div className="">
          <Flex className="mx-1 mt-2 flex-col justify-between relative">
            {userData === null ? (
              <div className="flex items-center justify-between gap-4 w-full px-6 py-3">
                <button onClick={openCloseModalLogin} className="transition duration-300 hover:text-accent cursor-pointer">Login</button>
                <button onClick={openCloseModalRegister} className="transition duration-300 hover:text-accent cursor-pointer">Register</button>
              </div>
            ) : (
              <>
                <div
                  className="w-10 border-2 rounded-full absolute right-1"
                >
                  <Image
                    src={userData.image || ""}
                    alt="user"
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                </div>

                <div className="py-1 capitalize">
                  <Link
                    href={`/profile`}
                    className="inline-flex items-center gap-2.5 w-full px-2 py-2 text-xs hover:text-accent"
                    role="menuitem"
                  >
                    <User size={22} />
                    Perfil
                  </Link>
                  <Link
                    href={`/wishlist`}
                    className="inline-flex items-center gap-2.5 w-full px-2 py-2 text-xs hover:text-accent"
                    role="menuitem"
                  >
                    <Heart size={22} />
                    wishlist
                  </Link>
                  <Link
                    href={`/`}
                    className="inline-flex items-center gap-2.5 w-full px-2 py-2 text-xs hover:text-accent"
                    role="menuitem"
                  >
                    <Settings size={22} />
                    Configuraões
                  </Link>
                  <Link
                    href={`/`}
                    className="inline-flex items-center gap-2.5 w-full px-2 py-2 text-xs hover:text-accent"
                    role="menuitem"
                  >
                    <ShoppingBag size={22} />
                    Compras
                  </Link>
                  <button
                    onClick={() => signOut()}
                    className="inline-flex items-center gap-2.5 w-full px-2 py-2 text-xs text-start hover:text-accent cursor-pointer"
                    role="menuitem"
                  >
                    <LogOut size={22} />
                    Sair
                  </button>
                </div>
              </>
            )}
          </Flex>
          <p className="text-textColor/50 ml-1">
            Categorias
          </p>
          {openSideBar && (
            <div>
              {category.map((item, index) => (
                <div key={item.name} className="block">
                  <button
                    onClick={() => toggleDropdown(index)}
                    className="w-full capitalize text-left hover:text-accent px-3 py-2 text-base font-medium flex justify-between items-center"
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
                    <div className="pl-4 bg-card rounded-md mt-1">
                      {item.children.map(subItem => (
                        <Link
                          key={subItem.id}
                          href={`?category=${subItem.name}`}
                          onClick={() => {
                            setOpenMenuIndex(null);
                            toggleSideBar();
                          }}
                          className="block w-full px-3 py-2 capitalize text-sm hover:text-accent rounded-s-md"
                        >
                          {subItem.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </Flex>
    </div>
  )
}
