'use client';

import { useState, useContext } from 'react';
import Link from 'next/link';
import { useCart } from '../context/CartContext';
import { useModal } from '../context/ModalContext';
import { ShoppingCart, User } from 'lucide-react';

// Definimos a interface para as props do Header
interface Category {
  id: number;
  nome: string;
}

interface HeaderProps {
  categories: Category[];
}

export default function Header({ categories }: HeaderProps) {
  const { cart } = useCart();
  const { setAccountModalOpen, setCartModalOpen } = useModal();
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const cartItemCount = cart.reduce((count, item) => count + item.quantity, 0);

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-gray-800">
          Andressa Modas
        </Link>
        <div className="flex items-center space-x-6">
          {/* Menu de Categorias */}
          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!isDropdownOpen)}
              onBlur={() => setTimeout(() => setDropdownOpen(false), 150)} // Para o menu fechar ao clicar fora
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