"use client"
import Image from "next/image";
import { LayoutGrid, ChevronRight, ShoppingCart, Bell } from "lucide-react";
import { Button } from "../ui/button";
import { InputSearch } from "./inputSearch";
import Link from "next/link";
import { Flex } from "../ui/flex";
import DropdownMenu, { MenuProps } from "./dropdown";
import { useAppContext } from "@/context/AppContext";
import { UserDropdown } from "./userDropdown";
import { WishList } from "./wishList";
import { SiteContentProps } from "@/types/siteContent";
import { SwitchTheme } from "./switchTheme";
import { SideBarMenu } from "./sideBarMenu";
import no_image from "@/assets/no-image.png";

interface HeaderProps extends MenuProps {
  siteContent: SiteContentProps;
}


export function Header({ category, siteContent }: HeaderProps) {
  const { userData, openCloseModalCart, openCloseModalLogin, openCloseModalRegister, cartAmount, addItemCart, openSideBar } = useAppContext();

  return (
    <header className="w-full min-h-40 px-6 flex items-center justify-center border-b border-b-borderColor">
      <div className="max-w-7xl w-full">
        <div className="flex gap-3 justify-between items-center">
          <Link href="/">
            <Flex className="items-center gap-3">
              {siteContent?.image_logo === null
                ? (<div className="w-15 h-15 bg-cover">
                  <Image
                    width={320}
                    height={100}
                    src={!siteContent?.image_logo ? no_image : siteContent.image_logo}
                    alt="logo do site"
                  />
                </div>
                )
                : (<p className="font-semibold text-xl text-title capitalize">
                  {siteContent?.title === null ? "e-commerce" : siteContent?.title}
                </p>
                )
              }
            </Flex>
          </Link>
          <InputSearch />
          <SideBarMenu category={category} />

          <div className=" hidden md:flex items-center justify-center gap-4 text-title">
            <div className="lg:flex hidden">
              <SwitchTheme />
            </div>
            {userData === null ? (
              <>
                <button onClick={openCloseModalLogin} className="transition duration-300 hover:text-hover cursor-pointer">Login</button>
                <button onClick={openCloseModalRegister} className="transition duration-300 hover:text-hover cursor-pointer">Register</button>
              </>
            ) : (
              <>
                <div className="lg:flex gap-4 hidden">
                  <UserDropdown avatar={userData?.image as string} />
                  <WishList userid={userData.id} addItem={addItemCart} />
                  <Flex className="items-center">
                    <Bell />
                  </Flex>
                </div>


                <button onClick={openCloseModalCart} className="transition duration-300 hover:text-hover cursor-pointer">
                  {cartAmount === 0 ? (
                    <ShoppingCart className="size-6" />
                  ) : (
                    <div className="flex flex-col items-center justify-center relative">
                      <div className="text-xs text-textButton font-semibold bg-primaryColor rounded-full w-4 absolute -top-1 left-4.5">
                        {cartAmount}
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