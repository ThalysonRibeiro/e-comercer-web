'use client'

import { useEffect, useState } from 'react'
import api from '@/lib/axios'
import { ThemeColorsProps } from '@/types/themeColors'

export default function useThemeColors({ isDarkTheme }: { isDarkTheme: boolean }) {
  const [themes, setThemes] = useState<ThemeColorsProps[]>([]);
  const [currentTheme, setCurrentTheme] = useState<ThemeColorsProps | null>(null);

  // Busca os temas apenas uma vez quando o componente montar
  useEffect(() => {
    async function fetchThemes() {
      try {
        const response = await api.get(`/theme-color`);
        setThemes(response.data);
      } catch (error) {
        console.error("Erro ao buscar temas:", error);
      }
    }

    fetchThemes();
  }, []);

  // Alterna entre os temas quando isDarkTheme ou themes mudar
  useEffect(() => {
    if (themes.length > 0) {
      const index = isDarkTheme ? 0 : 1;
      setCurrentTheme(themes[index]);
    }
  }, [isDarkTheme, themes]);

  // Aplica as propriedades CSS quando o tema atual mudar
  useEffect(() => {
    if (!currentTheme) return;

    const cssProperties = [
      { name: '--color-primaryColor', value: currentTheme.primaryColor },
      { name: '--color-secondaryColor', value: currentTheme.secondaryColor },
      { name: '--color-hover', value: currentTheme.hover },
      { name: '--color-star', value: currentTheme.star },
      { name: '--color-danger', value: currentTheme.danger },
      { name: '--color-success', value: currentTheme.success },
      { name: '--color-warning', value: currentTheme.warning },
      { name: '--color-shadowColor', value: currentTheme.shadowColor },
      { name: '--color-price', value: currentTheme.price },
      { name: '--color-title', value: currentTheme.title },
      { name: '--color-textColor', value: currentTheme.textColor },
      { name: '--color-textHover', value: currentTheme.textHover },
      { name: '--color-oldPrice', value: currentTheme.oldPrice },
      { name: '--color-borderColor', value: currentTheme.borderColor },
      { name: '--color-textButton', value: currentTheme.textButton },
      { name: '--color-bgCard', value: currentTheme.bgCard },
      { name: '--color-themeColor', value: currentTheme.themeColor }
    ];

    cssProperties.forEach(property => {
      if (property.value) {
        document.documentElement.style.setProperty(property.name, property.value);
      }
    });
  }, [currentTheme]);

  return currentTheme;
}