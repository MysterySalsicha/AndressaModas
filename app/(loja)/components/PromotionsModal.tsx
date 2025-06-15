'use client';

import { useState, useEffect, useContext } from 'react';
import { useModal } from '../context/ModalContext';
import { X, Gift, Copy } from 'lucide-react';

interface Promotion {
  id: number;
  codigo_cupom: string;
  descricao: string;
}

export function PromotionsModal() {
  const { isPromotionsModalOpen, setPromotionsModalOpen } = useModal();
  const [promotions, setPromotions] = useState<Promotion[]>([]);
  const [copiedCoupon, setCopiedCoupon] = useState<string | null>(null);

  useEffect(() => {
    if (isPromotionsModalOpen) {
      async function fetchPromotions() {
        try {
          const res = await fetch('/api/promocoes');
          const data = await res.json();
          setPromotions(data);
        } catch (error) {
          console.error("Failed to fetch promotions:", error);
        }
      }
      fetchPromotions();
    }
  }, [isPromotionsModalOpen]);

  const handleCopy = (couponCode: string) => {
    navigator.clipboard.writeText(couponCode);
    setCopiedCoupon(couponCode);
    setTimeout(() => {
      setCopiedCoupon(null);
      setPromotionsModalOpen(false); // Fecha o modal após copiar
    }, 1500); // Mantém a mensagem de "Copiado!" por 1.5s
  };

  if (!isPromotionsModalOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6 relative">
        <button
          onClick={() => setPromotionsModalOpen(false)}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
          aria-label="Fechar modal"
        >
          <X size={24} />
        </button>
        <div className="flex items-center mb-4">
          <Gift className="text-pink-500 mr-3" size={28} />
          <h2 className="text-2xl font-bold text-gray-800">Ofertas e Cupons</h2>
        </div>
        <div className="space-y-4 max-h-80 overflow-y-auto pr-2">
          {promotions.length > 0 ? (
            promotions.map((promo) => (
              <div key={promo.id} className="border border-dashed border-gray-300 rounded-lg p-4 flex justify-between items-center">
                <div>
                  <p className="font-semibold text-gray-700">{promo.codigo_cupom}</p>
                  <p className="text-sm text-gray-500">{promo.descricao}</p>
                </div>
                <button
                  onClick={() => handleCopy(promo.codigo_cupom)}
                  className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold py-2 px-3 rounded-md flex items-center transition-colors"
                >
                  <Copy size={16} className="mr-2" />
                  {copiedCoupon === promo.codigo_cupom ? 'Copiado!' : 'Copiar'}
                </button>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-center py-8">Nenhuma promoção disponível no momento.</p>
          )}
        </div>
      </div>
    </div>
  );
}