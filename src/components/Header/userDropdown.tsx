"use client"

import { LogOut, Settings, ShoppingBag, User } from "lucide-react";
import { signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export function UserDropdown({ avatar }: { avatar: string }) {
  const [openUserSettings, setOpenUserSettings] = useState<boolean>(false);
  const userSettingsRef = useRef<HTMLDivElement>(null);

  function userToggleDropdown() {
    setOpenUserSettings(prev => !prev);
  }
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (userSettingsRef.current && !userSettingsRef.current.contains(event.target as Node)) {
        setOpenUserSettings(false);
      }
    }

    function handleEscKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpenUserSettings(false);
      }
    }

    if (openUserSettings) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleEscKey);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscKey);
    };
  }, [openUserSettings]);

  return (
    <div ref={userSettingsRef} className="relative flex items-center">
      <button
        onClick={userToggleDropdown}
        aria-haspopup="true"
        aria-expanded={openUserSettings}
        aria-controls="user-dropdown"
        className="min-w-10 cursor-pointer border-2 rounded-full hover:border-hover"
      >
        <Image
          src={avatar}
          alt="user"
          width={40}
          height={40}
          className="rounded-full"
        />
      </button>
      {openUserSettings && (
        <div className="absolute top-18 left-0 z-10 transition-all duration-200 ease-out">

          <div
            className="absolute z-10 -top-2.5 -left-5 min-w-40 mt-2 bg-bgCard rounded-md shadow-lg ring-1 ring-borderColor ring-opacity-5 focus:outline-none"
            role="menu"
            aria-hidden={!openUserSettings}
          >
            <div className="absolute z-10 -top-3 right-28 w-0 h-0 border-textButton border-l-8 border-r-8 border-b-8 border-l-transparent border-r-transparent border-b-black animate-bounce" />
            <div className="py-1">
              <Link
                href={`/profile`}
                className="inline-flex items-center gap-2.5 w-full px-4 py-2 text-xs text-textColor hover:bg-hover hover:text-textButton"
                role="menuitem"
              >
                <User size={22} />
                Perfil
              </Link>
              <Link
                href={`/`}
                className="inline-flex items-center gap-2.5 w-full px-4 py-2 text-xs text-textColor hover:bg-hover hover:text-textButton"
                role="menuitem"
              >
                <Settings size={22} />
                Configuraões
              </Link>
              <Link
                href={`/`}
                className="inline-flex items-center gap-2.5 w-full px-4 py-2 text-xs text-textColor hover:bg-hover hover:text-textButton"
                role="menuitem"
              >
                <ShoppingBag size={22} />
                Compras
              </Link>
              <button
                onClick={() => signOut()}
                className="inline-flex items-center gap-2.5 w-full px-4 py-2 text-xs text-start text-textColor hover:bg-hover hover:text-textButton cursor-pointer"
                role="menuitem"
              >
                <LogOut size={22} />
                Sair
              </button>
            </div>
          </div>

        </div>
      )}
    </div>
  )
}