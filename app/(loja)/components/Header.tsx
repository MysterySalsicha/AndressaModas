'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useCart } from '../context/CartContext';
import { useModal } from '../context/ModalContext';
import { ShoppingCart, User, Gift, LogOut } from 'lucide-react';
import { User as AuthUser } from 'lucia';
import { logoutUser } from '../context/actions';

interface Category { id: number; nome: string; }
interface HeaderProps {
  categories: Category[];
  hasPromotions: boolean;
  user: AuthUser | null;
}

export default function Header({ categories, hasPromotions, user }: HeaderProps) {
  const { cart } = useCart();
  const { setAccountModalOpen, setCartModalOpen, setPromotionsModalOpen } = useModal();
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [isUserMenuOpen, setUserMenuOpen] = useState(false);

  const cartItemCount = cart.reduce((count, item) => count + item.quantity, 0);

  return (
    <header className="bg-white shadow-md sticky top-0 z-40">
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-gray-800">Andressa Modas</Link>
        <div className="flex items-center space-x-4 md:space-x-6">
          <div className="relative">
            <button onClick={() => setDropdownOpen(!isDropdownOpen)} onBlur={() => setTimeout(() => setDropdownOpen(false), 200)} className="text-gray-600 hover:text-gray-800">Categorias</button>
            {isDropdownOpen && (
              <div className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                <Link href="/" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" onClick={() => setDropdownOpen(false)}>Todas</Link>
                {categories.map((cat) => (
                  <Link key={cat.id} href={`/?categoria=${encodeURIComponent(cat.nome)}`} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" onClick={() => setDropdownOpen(false)}>{cat.nome}</Link>
                ))}
              </div>
            )}
          </div>
          <button onClick={() => setPromotionsModalOpen(true)} className="text-gray-600 hover:text-gray-800 relative" aria-label="Ver promoções"><Gift />{hasPromotions && <span className="absolute -top-1 -right-1 flex h-3 w-3"><span className="animate-ping absolute h-full w-full rounded-full bg-pink-400 opacity-75"></span><span className="relative inline-flex rounded-full h-3 w-3 bg-pink-500"></span></span>}</button>
          <button onClick={() => setCartModalOpen(true)} className="text-gray-600 hover:text-gray-800 relative" aria-label="Abrir carrinho"><ShoppingCart />{cartItemCount > 0 && <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">{cartItemCount}</span>}</button>
          {user ? (
            <div className="relative">
              <button onClick={() => setUserMenuOpen(!isUserMenuOpen)} onBlur={() => setTimeout(() => setUserMenuOpen(false), 200)} className="flex items-center space-x-2 text-gray-600 hover:text-gray-800">
                <User />
                <span className="hidden md:inline">Olá, {user.nome.split(' ')[0]}</span>
              </button>
              {isUserMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                  <form action={logoutUser}>
                    <button type="submit" className="w-full text-left flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      <LogOut size={16} className="mr-2" />Sair
                    </button>
                  </form>
                </div>
              )}
            </div>
          ) : (
            <button onClick={() => setAccountModalOpen(true)} className="text-gray-600 hover:text-gray-800" aria-label="Abrir minha conta"><User /></button>
          )}
        </div>
      </nav>
    </header>
  );
}