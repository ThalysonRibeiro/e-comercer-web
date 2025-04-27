import { useState, useEffect, useRef } from "react";

export function useUI() {
  const [activeTheme, setActiveTheme] = useState<boolean>(true);
  const [openSideBar, setOpenSideBar] = useState(false);
  const sideBarRef = useRef<HTMLDivElement | null>(null);

  function IsActiveTheme() {
    setActiveTheme(!activeTheme);
  }

  function toggleSideBar() {
    setOpenSideBar(!openSideBar);
  }

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (sideBarRef.current && !sideBarRef.current.contains(event.target as Node)) {
        setOpenSideBar(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return {
    activeTheme,
    openSideBar,
    sideBarRef,
    IsActiveTheme,
    toggleSideBar
  };
}