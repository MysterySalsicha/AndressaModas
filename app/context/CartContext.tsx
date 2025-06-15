"use client";

import React, { createContext, useState, useContext, ReactNode } from 'react';

// Define o formato de um item no carrinho e do contexto
interface CartItem {
  id: number;
  nome: string;
  preco: number;
  url_imagem_principal: string;
  quantity: number;
}

interface ICartContext {
  cartItems: CartItem[];
  addToCart: (product: Omit<CartItem, 'quantity'>) => void;
  removeFromCart: (productId: number) => void;
  cartItemCount: number;
}

// Cria o Contexto com um valor padrão
const CartContext = createContext<ICartContext | undefined>(undefined);

// Cria o "Provider", que irá envolver a aplicação e fornecer os dados do carrinho
export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const addToCart = (product: Omit<CartItem, 'quantity'>) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      if (existingItem) {
        // Se o item já existe, aumenta a quantidade
        return prevItems.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        // Se é um item novo, adiciona ao carrinho com quantidade 1
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
    alert(`${product.nome} adicionado ao carrinho!`);
  };

  const removeFromCart = (productId: number) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
  };

  const cartItemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, cartItemCount }}>
      {children}
    </CartContext.Provider>
  );
};

// Hook customizado para facilitar o uso do contexto nos componentes
export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};