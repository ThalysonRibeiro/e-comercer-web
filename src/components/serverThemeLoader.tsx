// app/components/ServerThemeLoader.tsx
import { getThemeColors } from '@/lib/theme-api'

interface ThemeColorsProps {
  primaryColor: string
  secondaryColor: string
  hover: string
  star: string
  danger: string
  success: string
  warning: string
  shadowColor: string
  price: string
  title: string
  textColor: string
  textHover: string
  oldPrice: string
  borderColor: string
  textButton: string
  bgCard: string
  themeColor: string
  bgFooterColor: string
}

export default async function ServerThemeLoader() {
  let themeData: ThemeColorsProps | null = null

  try {
    // Buscar o tema ativo da API (sempre retorna um tema)
    themeData = await getThemeColors()
  } catch (error) {
    console.error('Erro ao buscar tema da API:', error)
    // Tema padrão como fallback
    themeData = {
      primaryColor: '#3b82f6',
      secondaryColor: '#64748b',
      hover: '#2563eb',
      star: '#fbbf24',
      danger: '#ef4444',
      success: '#10b981',
      warning: '#f59e0b',
      shadowColor: 'rgba(0, 0, 0, 0.1)',
      price: '#059669',
      title: '#1f2937',
      textColor: '#374151',
      textHover: '#111827',
      oldPrice: '#9ca3af',
      borderColor: '#d1d5db',
      textButton: '#ffffff',
      bgCard: '#ffffff',
      themeColor: '#f8fafc',
      bgFooterColor: '#1f2937'
    }
  }

  if (!themeData) return null

  // Gerar CSS inline para injetar no head
  const cssVariables = `
    :root {
      --color-primaryColor: ${themeData.primaryColor};
      --color-secondaryColor: ${themeData.secondaryColor};
      --color-hover: ${themeData.hover};
      --color-star: ${themeData.star};
      --color-danger: ${themeData.danger};
      --color-success: ${themeData.success};
      --color-warning: ${themeData.warning};
      --color-shadowColor: ${themeData.shadowColor};
      --color-price: ${themeData.price};
      --color-title: ${themeData.title};
      --color-textColor: ${themeData.textColor};
      --color-textHover: ${themeData.textHover};
      --color-oldPrice: ${themeData.oldPrice};
      --color-borderColor: ${themeData.borderColor};
      --color-textButton: ${themeData.textButton};
      --color-bgCard: ${themeData.bgCard};
      --color-themeColor: ${themeData.themeColor};
      --color-bgFooterColor: ${themeData.bgFooterColor};
    }
  `

  return (
    <style
      dangerouslySetInnerHTML={{ __html: cssVariables }}
      suppressHydrationWarning
    />
  )
}