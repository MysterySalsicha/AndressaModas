'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useCart } from '../context/CartContext';
import { useModal } from '../context/ModalContext'; // Usamos o novo contexto
import { ShoppingCart, User, Gift } from 'lucide-react'; // Importamos o ícone de presente

interface Category {
  id: number;
  nome: string;
}

// Atualizamos a interface de props
interface HeaderProps {
  categories: Category[];
  hasPromotions: boolean;
}

export default function Header({ categories, hasPromotions }: HeaderProps) {
  const { cart } = useCart();
  // Pegamos os setters dos 3 modais do nosso novo contexto
  const { setAccountModalOpen, setCartModalOpen, setPromotionsModalOpen } = useModal();
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const cartItemCount = cart.reduce((count, item) => count + item.quantity, 0);

  return (
    <header className="bg-white shadow-md sticky top-0 z-40"> {/* Ajustado z-index */}
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-gray-800">
          Andressa Modas
        </Link>
        <div className="flex items-center space-x-6">
          {/* Menu de Categorias (sem alterações) */}
          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!isDropdownOpen)}
              onBlur={() => setTimeout(() => setDropdownOpen(false), 150)}
              className="text-gray-600 hover:text-gray-800 transition-colors duration-300"
            >
              Categorias
            </button>
            {isDropdownOpen && (
              <div className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                <Link
                    href="/"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => setDropdownOpen(false)}
                  >
                    Todas
                  </Link>
                {categories.map((category) => (
                  <Link
                    key={category.id}
                    href={`/?categoria=${encodeURIComponent(category.nome)}`}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => setDropdownOpen(false)}
                  >
                    {category.nome}
                  </Link>
                ))}
              </div>
            )}
          </div>
          
          {/* Botão de Promoções */}
          <button
            onClick={() => setPromotionsModalOpen(true)}
            className="text-gray-600 hover:text-gray-800 relative transition-colors duration-300"
            aria-label="Ver promoções"
          >
            <Gift />
            {/* Ponto vermelho indicativo */}
            {hasPromotions && (
               <span className="absolute -top-1 -right-1 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-pink-500"></span>
              </span>
            )}
          </button>

          {/* Carrinho (sem alterações) */}
          <button
            onClick={() => setCartModalOpen(true)}
            className="text-gray-600 hover:text-gray-800 relative transition-colors duration-300"
            aria-label="Abrir carrinho de compras"
          >
            <ShoppingCart />
            {cartItemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {cartItemCount}
              </span>
            )}
          </button>

          {/* Conta (sem alterações) */}
          <button
            onClick={() => setAccountModalOpen(true)}
            className="text-gray-600 hover:text-gray-800 transition-colors duration-300"
            aria-label="Abrir minha conta"
          >
            <User />
          </button>
        </div>
      </nav>
    </header>
  );
}