// app/(loja)/components/CartModal.tsx
"use client";

import Image from 'next/image';
import { useCart } from '../context/CartContext';
import { createOrder } from '../context/actions'; // <-- Importar a nova ação
import { useState } from 'react';

export default function CartModal({ onClose }: { onClose: () => void }) {
  const { cartItems, clearCart } = useCart(); // Adicionar clearCart do contexto
  const [isLoading, setIsLoading] = useState(false);
  
  const total = cartItems.reduce((sum, item) => sum + item.preco * item.quantity, 0);

  const handleCheckout = async () => {
    setIsLoading(true);
    const result = await createOrder(cartItems);
    setIsLoading(false);

    if (result.error) {
      alert(`Erro: ${result.error}`);
    } else {
      alert(`Pedido #${result.orderId} finalizado com sucesso!`);
      clearCart(); // Limpa o carrinho após a compra
      onClose(); // Fecha o modal
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content cart-modal" onClick={(e) => e.stopPropagation()}>
        {/* ... (o resto do modal continua igual) ... */}
        
        <div className="cart-summary">
          <strong>Total: R$ {total.toFixed(2)}</strong>
          <button 
            className="checkout-btn" 
            disabled={cartItems.length === 0 || isLoading}
            onClick={handleCheckout} // <-- Chamar a função de checkout
          >
            {isLoading ? 'Processando...' : 'Finalizar Compra'}
          </button>
        </div>
      </div>
    </div>
  );
}