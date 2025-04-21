"use client"
import Image from "next/image";
import { LayoutGrid, ChevronRight, Heart, User, ShoppingCart } from "lucide-react";
import { Button } from "../ui/button";
import { InputSearch } from "./inputSearch";
import Link from "next/link";
import { Flex } from "../ui/flex";
import DropdownMenu, { MenuProps } from "./dropdown";
import { useContext, useEffect, useRef, useState } from "react";
import { Context, ContextType } from "@/context/Context";
import { UserDropdown } from "./userDropdown";
import api from "@/lib/axios";
import { WishList } from "./wishList";
import { WishlistProps } from "@/types/user";
import { SiteContentProps } from "@/types/siteContent";

interface HeaderProps extends MenuProps {
  siteContent: SiteContentProps[];
}


export function Header({ category, siteContent }: HeaderProps) {
  const { userData, profileDetail, openCloseModalCart, openCloseModalLogin, openCloseModalRegister, cartAmount, addItemCart } = useContext(Context) as ContextType;



  return (
    <header className="w-full min-h-40 px-6 flex items-center justify-center border-b border-b-gray-500">
      <div className="max-w-7xl w-full">
        <div className="flex gap-3 justify-between items-center">
          <Link href="/">
            <Flex className="items-center gap-3">
              {siteContent[0].image_logo !== ""
                ? (<div className="w-15 h-15 bg-cover">
                  <Image
                    width={320}
                    height={100}
                    src={siteContent[0].image_logo}
                    alt="logo do site"
                  />
                </div>
                )
                : (<p className="font-semibold text-xl text-gray-100 capitalize">
                  {siteContent[0].title}
                </p>
                )
              }
            </Flex>
          </Link>
          <InputSearch />

          <div className="flex items-center justify-center gap-4 text-gray-100">
            {userData === null ? (
              <>
                <button onClick={openCloseModalLogin} className="transition duration-300 hover:text-hover">Login</button>
                <button onClick={openCloseModalRegister} className="transition duration-300 hover:text-hover">Register</button>
              </>
            ) : (
              <>
                <UserDropdown avatar={userData?.avatar as string} />
                <WishList userid={userData.id} addItem={addItemCart} />


                <button onClick={openCloseModalCart} className="transition duration-300 hover:text-hover">
                  {cartAmount === 0 ? (
                    <ShoppingCart className="size-6" />
                  ) : (
                    <div className="flex flex-col items-center justify-center relative">
                      <div className="text-xs text-gray-500 font-semibold bg-primary rounded-full w-4 absolute -top-1 left-4.5">{cartAmount}
                      </div>
                      <ShoppingCart className="size-6" />
                    </div>
                  )}
                </button>
              </>
            )}
          </div>
        </div>

        <nav className="flex items-center justify-between mt-4">
          <div className="w-55">
            <Link href="/products">
              <Button>
                <LayoutGrid className="size-6 mr-3" />
                All category
                <ChevronRight className="size-6 ml-3" />
              </Button>
            </Link>
          </div>

          <Flex className="items-center justify-center">
            <DropdownMenu category={category} />
          </Flex>
        </nav>
      </div>
    </header>
  )
}