// src/app/ThemeLoader.tsx
'use client'

import useThemeColors from './hooks/useThemeColors'

export default function ThemeLoader() {
  useThemeColors()
  return null // esse componente não renderiza nada, só aplica o efeito
}
