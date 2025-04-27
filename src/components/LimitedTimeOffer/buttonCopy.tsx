"use client"
import { useAppContext } from '@/context/AppContext';

interface CopyCouponProps {
  couponCode: string;
  discountText: string;
}

export default function CopyCoupon({ couponCode, discountText }: CopyCouponProps) {
  const { addToast } = useAppContext();


  const copyToClipboard = () => {
    navigator.clipboard.writeText(couponCode)
      .then(() => {
        addToast('success', 'Cupom copiado com sucesso!')
        setTimeout(() => 2000);
      })
      .catch(err => {
        console.error('Erro ao copiar cupom: ', err);
        addToast('error', 'Não foi possível copiar o cupom. Por favor, tente novamente.');
      });
  };

  return (
    <div className="flex flex-col items-center justify-center bg-white rounded-lg w-full mx-auto">
      <h2 className="font-bold mb-4">Cupom de Desconto</h2>

      <div className="flex items-center justify-between w-full border border-borderColor rounded-lg px-2">
        <span className="font-bold text-primaryColor uppercase">{couponCode}</span>
        <button
          className="bg-primaryColor active:bg-hover font-medium py-1 my-1 px-3 rounded transition-colors"
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