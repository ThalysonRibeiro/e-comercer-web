"use client"

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
        className="min-w-10"
      >
        <Image
          src={avatar}
          alt="user"
          width={42}
          height={42}
          className="rounded-full"
        />
      </button>
      {openUserSettings && (
        <div className="absolute top-18 left-0 z-10 transition-all duration-200 ease-out">

          <div
            className="absolute z-10 -top-2.5 -left-5 min-w-40 mt-2 bg-gray-600 rounded-md shadow-lg ring-1 ring-gray-400 ring-opacity-5 focus:outline-none"
            role="menu"
            aria-hidden={!openUserSettings}
          >
            <div className="absolute z-10 -top-3 right-28 w-0 h-0 border-gray-500 border-l-8 border-r-8 border-b-8 border-l-transparent border-r-transparent border-b-black animate-bounce" />
            <div className="py-1">
              <Link
                href={`/`}
                className="block w-full px-4 py-2 text-xs text-gray-200 hover:bg-hover hover:text-gray-500"
                role="menuitem"
              >
                Perfil
              </Link>
              <Link
                href={`/`}
                className="block w-full px-4 py-2 text-xs text-gray-200 hover:bg-hover hover:text-gray-500"
                role="menuitem"
              >
                Configuraões
              </Link>
              <Link
                href={`/`}
                className="block w-full px-4 py-2 text-xs text-gray-200 hover:bg-hover hover:text-gray-500"
                role="menuitem"
              >
                Compras
              </Link>
              <button
                onClick={() => signOut()}
                className="block w-full px-4 py-2 text-xs text-start text-gray-200 hover:bg-hover hover:text-gray-500 cursor-pointer"
                role="menuitem"
              >
                Sair
              </button>
            </div>
          </div>

        </div>
      )}
    </div>
  )
}