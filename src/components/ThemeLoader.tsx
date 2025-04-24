// src/app/ThemeLoader.tsx
'use client'

import useThemeColors from "@/app/hooks/useThemeColors"


export default function ThemeLoader({ isDarkTheme }: { isDarkTheme: boolean }) {
  useThemeColors({ isDarkTheme: isDarkTheme })
  return null // esse componente não renderiza nada, só aplica o efeito
}
