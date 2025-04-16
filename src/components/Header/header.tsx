"use client"
import Image from "next/image";
import logo from "@/assets/logo-pg.png";
import { LayoutGrid, ChevronRight, ChevronDown, Heart, User, ShoppingCart } from "lucide-react";
import { Button } from "../ui/button";
import { InputSearch } from "../inputSearch";
import Link from "next/link";
import { Flex } from "../ui/flex";
import DropdownMenu, { MenuProps } from "./dropdown";
import { useContext, useEffect, useState } from "react";
import { Context, ContextType } from "@/context/Context";
import { UserData } from "@/app/api/auth/[...nextauth]/route";


export function Header({ category }: MenuProps) {
  const { userData, openCloseModal, cartAmount } = useContext(Context) as ContextType;

  return (
    <header className="w-full min-h-40 flex items-center justify-center border-b border-b-gray-500">
      <div className="max-w-7xl w-full">
        <div className="flex gap-3 justify-between">
          <Link href="/">
            <Flex className="items-center gap-3">
              <div className="w-10 h-10 bg-cover">
                <Image
                  width={320}
                  height={100}
                  src={logo}
                  alt="logo do site"
                />
              </div>
              <p className="font-semibold text-xl text-gray-100">POWER GADGET</p>
            </Flex>
          </Link>
          <InputSearch />

          <div className="flex items-center justify-center gap-4 text-gray-100">
            {userData === null ? (
              <>
                <Link href="/login" className="transition duration-300 hover:text-hover">Login</Link>
                <Link href="/register" className="transition duration-300 hover:text-hover">Register</Link>
              </>
            ) : (
              <>
                <Link href="/" className="transition duration-300 hover:text-hover">
                  <User className="size-6" />
                </Link>
                <Link href="/" className="transition duration-300 hover:text-hover">
                  <Heart className="size-6" />
                </Link>
                <div>
                  <Image
                    src={userData?.avatar as string}
                    alt="user"
                    width={50}
                    height={50}
                  />
                </div>

              </>
            )}

            <button onClick={openCloseModal} className="transition duration-300 hover:text-hover">
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