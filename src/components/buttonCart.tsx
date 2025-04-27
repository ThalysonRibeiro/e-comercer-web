"use client"
import { useState, useEffect } from 'react';
import { ShoppingCart, Plus } from 'lucide-react';
import { useAppContext } from '@/context/AppContext';


export function ButtonCart() {
  const { openCloseModalCart, cartAmount } = useAppContext();
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const addItem = () => {
      setIsAnimating(true);
      setTimeout(() => {
        setIsAnimating(false);
      }, 1000);
    };
    addItem()
  }, [cartAmount])

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    function toggleVisibility() {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    }

    window.addEventListener("scroll", toggleVisibility);

    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  if (!isVisible) return null;

  return (
    <div>

      <div className="relative z-10  flex justify-center cartFixed" onClick={openCloseModalCart}>
        <div
          className={`absolute -top-30 w-5 h-5 rounded-full bg-hover shadow-md flex items-center justify-center
                      ${isAnimating ? 'animate-bounce-to-cart' : 'opacity-0'}`}
          style={{
            animation: isAnimating ? 'moveToCart 0.8s forwards' : 'none',
          }}
        >
          <Plus size={16} className="text-textButton" />
        </div>

        <div className="absolute bottom-0 flex flex-col items-center">
          <div className={`relative ${isAnimating ? 'animate-cart-shake' : ''}`}>
            <ShoppingCart size={35} className="hover:text-hover" />
            <div className={`absolute -top-1 right-0 w-4 h-4 rounded-full bg-primaryColor
              flex items-center justify-center text-textButton text-xs font-bold
              ${isAnimating ? 'animate-counter-pop' : ''}`}>
              {cartAmount}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes moveToCart {
          0% { transform: translate(0, 0); opacity: 1; }
          80% { transform: translate(0, 80px); opacity: 1; }
          100% { transform: translate(0, 80px); opacity: 0; }
        }
        
        @keyframes cartShake {
          0% { transform: rotate(0deg); }
          25% { transform: rotate(-5deg); }
          50% { transform: rotate(0deg); }
          75% { transform: rotate(5deg); }
          100% { transform: rotate(0deg); }
        }
        
        @keyframes counterPop {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.4); }
        }
        
        .animate-cart-shake {
          animation: cartShake 0.5s 0.6s;
        }
        
        .animate-counter-pop {
          animation: counterPop 0.4s 0.8s;
        }
      `}</style>
    </div>
  );
};