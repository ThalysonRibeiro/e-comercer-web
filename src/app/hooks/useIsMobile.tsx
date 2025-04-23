"use client"
import { useState, useEffect } from 'react';

export function useIsMobile(breakpoint = 640) {
  const [isMobile, setIsMobile] = useState(false); // Inicializa com `false`, já que não podemos acessar o `window` no servidor

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < breakpoint); // Só será executado no cliente
    };

    handleResize(); // Chama a função imediatamente para definir o estado com base no tamanho inicial

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize); // Remove o evento no desmontar do componente
  }, [breakpoint]);

  return isMobile;
}
