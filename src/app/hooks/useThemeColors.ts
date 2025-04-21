'use client'

import { useEffect } from 'react'
import api from '@/lib/axios'
import { ThemeColorsProps } from '@/types/themeColors'

export default function useThemeColors() {
  useEffect(() => {
    async function fetchColors() {
      const response = await api.get('/theme-color')
      const data: ThemeColorsProps = response.data;

      if (data?.primaryColor) {
        document.documentElement.style.setProperty('--color-primaryColor', data?.primaryColor)
      }
      if (data?.secondaryColor) {
        document.documentElement.style.setProperty('--color-secondaryColor', data?.secondaryColor)
      }
      if (data?.hover) {
        document.documentElement.style.setProperty('--color-hover', data?.hover)
      }
      if (data?.star) {
        document.documentElement.style.setProperty('--color-star', data?.star)
      }
      if (data?.danger) {
        document.documentElement.style.setProperty('--color-danger', data?.danger)
      }
      if (data?.price) {
        document.documentElement.style.setProperty('--color-price', data?.price)
      }
      if (data?.title) {
        document.documentElement.style.setProperty('--color-title', data?.title)
      }
      if (data?.textColor) {
        document.documentElement.style.setProperty('--color-textColor', data?.textColor)
      }
      if (data?.textHover) {
        document.documentElement.style.setProperty('--color-textHover', data?.textHover)
      }
      if (data?.oldPrice) {
        document.documentElement.style.setProperty('--color-oldPrice', data?.oldPrice)
      }
      if (data?.borderColor) {
        document.documentElement.style.setProperty('--color-borderColor', data?.borderColor)
      }
      if (data?.textButton) {
        document.documentElement.style.setProperty('--color-textButton', data?.textButton)
      }
      if (data?.bgCard) {
        document.documentElement.style.setProperty('--color-bgCard', data?.bgCard)
      }
      if (data?.themeColor) {
        document.documentElement.style.setProperty('--color-themeColor', data?.themeColor)
      }
    }
    fetchColors()
  }, [])
}
