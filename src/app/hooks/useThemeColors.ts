// src/app/hooks/useThemeColors.ts
'use client'

import { useEffect } from 'react'
import api from '@/lib/axios'
import { SiteContentProps } from '@/types/siteContent'

export default function useThemeColors() {
  useEffect(() => {
    async function fetchColors() {
      const response = await api.get('/site-content/admin')
      const data: SiteContentProps = response.data[0];
      console.log(data.secondaryColor);

      if (data.secondaryColor) {
        document.documentElement.style.setProperty('--color-primaryColor', data.secondaryColor)
      }
      // if (data.secondaryColor) {
      //   document.documentElement.style.setProperty('--color-secondary', data.secondaryColor)
      // }
    }
    fetchColors()
  }, [])
}
