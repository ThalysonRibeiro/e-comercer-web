"use client"
import { useAppContext } from "@/context/AppContext";
import { Moon, Sun } from "lucide-react";
import { useState } from "react";

export function SwitchTheme() {
  const { IsActiveTheme } = useAppContext();
  const [isDark, setIsDark] = useState(false);

  const toggleTheme = () => {
    IsActiveTheme();
    setIsDark(!isDark);
  };

  return (

    <button
      onClick={toggleTheme}
      className="w-fit relative cursor-pointer hover:text-hover p-2 rounded-full shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden"
    >
      <div className={`transition-all duration-500 ${isDark ? 'opacity-0 -rotate-90 scale-0' : 'opacity-100 rotate-0 scale-100'}`}>
        <Moon size={24} />
      </div>

      <div className={`absolute inset-0 flex items-center justify-center transition-all duration-500 ${isDark ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 rotate-90 scale-0'}`}>
        <Sun size={24} />
      </div>
    </button>

  );
}