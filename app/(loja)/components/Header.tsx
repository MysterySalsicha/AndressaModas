// app/(loja)/components/Header.tsx
"use client";

import Link from 'next/link';
import { useState } from 'react';
import { FaShoppingCart, FaUser, FaTag } from 'react-icons/fa';
import CartModal from './CartModal';
import AccountModal from './AccountModal';
import { useCart } from '../context/CartContext';

export default function Header() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [isPromoOpen, setIsPromoOpen] = useState(false);
  
  const { cartItemCount } = useCart(); // Pega o número REAL de itens do contexto

  return (
    <>
      <header className="main-header">
        <Link href="/" className="logo">
          <h1>Andressa Modas</h1>
        </Link>
        <div className="actions-menu">
          <button onClick={() => setIsPromoOpen(true)} className="action-button">
            <FaTag /> <span>Promoções</span>
          </button>
          <button onClick={() => setIsCartOpen(true)} className="action-button" style={{position: 'relative'}}>
            <FaShoppingCart size={22} />
            {cartItemCount > 0 && (
              <span className="cart-counter">{cartItemCount}</span>
            )}
          </button>
          <button onClick={() => setIsAccountOpen(true)} className="action-button">
            <FaUser size={22} />
          </button>
        </div>
      </header>
      
      {/* Estes componentes só serão exibidos quando seus respectivos estados forem 'true'.
          O CSS que adicionamos fará com que eles "flutuem" sobre a página. */}
      {isCartOpen && <CartModal onClose={() => setIsCartOpen(false)} />}
      {isAccountOpen && <AccountModal onClose={() => setIsAccountOpen(false)} />}
      
      {isPromoOpen && (
        <div className="modal-overlay" onClick={() => setIsPromoOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setIsPromoOpen(false)} className="close-modal-btn">×</button>
            <h2>Promoções Atuais</h2>
            <p>Use o cupom: <strong>BEMVINDA10</strong> para 10% de desconto!</p>
          </div>
        </div>
      )}
    </>
  );
}