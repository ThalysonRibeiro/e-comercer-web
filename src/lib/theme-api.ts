// lib/theme-api.ts - API simplificada para um tema único
import { cache } from 'react'

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

// Cache da função para evitar requisições desnecessárias
export const getThemeColors = cache(async (): Promise<ThemeColorsProps> => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/theme-color`, {
      headers: {
        'x-api-key': process.env.NEXT_PUBLIC_BACKEND_API_KEY as string
      },
      next: {
        revalidate: 300, // Cache por 5 minutos (tema pode mudar na dashboard)
        tags: ['active-theme'] // Para revalidação manual quando admin trocar
      },

    })

    if (!response.ok) {
      throw new Error(`Falha ao buscar tema: ${response.status}`)
    }

    const data = await response.json()

    // Se a API retorna um array, pega o primeiro
    // Se retorna um objeto, usa diretamente
    return Array.isArray(data) ? data[0] : data

  } catch (error) {
    console.error('Erro ao buscar tema:', error)
    throw error
  }
})

// Função para revalidar o tema (pode ser chamada via webhook quando admin muda)
export async function revalidateTheme() {
  const { revalidateTag } = await import('next/cache')
  revalidateTag('active-theme')
}