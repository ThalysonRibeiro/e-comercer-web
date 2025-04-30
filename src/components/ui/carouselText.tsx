"use client"
import { useEffect, useState, useRef } from 'react';

interface InfiniteTextCarouselProps {
  speed?: number;
  items?: string[];
}

export default function InfiniteTextCarousel({
  speed = 1,
  items = [
    "🎉 ⚡",
  ]
}: InfiniteTextCarouselProps) {
  const [position, setPosition] = useState<number>(0);
  const carouselRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let animationFrameId: number | null = null;

    if (carouselRef.current) {
      animationFrameId = requestAnimationFrame(function animate() {
        setPosition((prevPosition: number) => {
          if (!carouselRef.current) return prevPosition;

          const contentWidth = carouselRef.current.scrollWidth;

          // Quando o primeiro item sai completamente da tela, reposiciona-o no final
          if (prevPosition <= -contentWidth / items.length) {
            return 0;
          }

          return prevPosition - speed;
        });

        animationFrameId = requestAnimationFrame(animate);
      });
    }

    return () => {
      if (animationFrameId !== null) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [items.length, speed]);

  return (
    <div className="w-full overflow-hidden">
      <div className="relative w-full overflow-hidden h-14">
        <div
          ref={carouselRef}
          className="absolute whitespace-nowrap flex items-center h-full"
          style={{
            transform: `translateX(${position}px)`,
            width: 'auto'
          }}
        >
          {/* Renderiza os itens duas vezes para criar o efeito infinito */}
          {[...items, ...items].map((item: string, index: number) => (
            <div
              key={index}
              className="px-2 py-2 mx-2 text-lg font-medium rounded-md"
            >
              {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}