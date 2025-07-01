"use client"
import { useAppContext } from '@/context/AppContext';
import { toast } from 'react-toastify';

interface CopyCouponProps {
  couponCode: string;
  discountText: string;
}

export default function CopyCoupon({ couponCode, discountText }: CopyCouponProps) {

  const copyToClipboard = () => {
    navigator.clipboard.writeText(couponCode)
      .then(() => {
        toast('Cupom copiado com sucesso!')
        setTimeout(() => 2000);
      })
      .catch(err => {
        console.error('Erro ao copiar cupom: ', err);
        toast.error('Não foi possível copiar o cupom. Por favor, tente novamente.');
      });
  };

  return (
    <div className="flex flex-col items-center justify-center bg-white rounded-lg w-full mx-auto">
      <h2 className="font-bold mb-4">Cupom de Desconto</h2>

      <div className="flex items-center justify-between w-full border border-border rounded-lg px-2">
        <span className="font-bold text-primary uppercase">{couponCode}</span>
        <button
          className="bg-primary active:bg-accent font-medium py-1 my-1 px-3 rounded transition-colors"
          onClick={copyToClipboard}
        >
          Copiar
        </button>
      </div>

      <p className="text-sm text-gray-600 mt-3">
        Use este cupom para obter {discountText} de desconto em sua próxima compra.
      </p>
    </div>
  );
}