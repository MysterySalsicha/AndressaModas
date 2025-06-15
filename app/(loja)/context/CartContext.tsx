// app/(loja)/context/CartContext.tsx
"use client";

import React, { createContext, useState, useContext, ReactNode } from 'react';

// Define o formato de um item no carrinho
interface CartItem {
  id: number;
  nome: string;
  preco: number;
  url_imagem_principal: string;
  quantity: number;
}

// Define o formato do contexto que será compartilhado
interface ICartContext {
  cartItems: CartItem[];
  addToCart: (product: Omit<CartItem, 'quantity'>) => void;
  removeFromCart: (productId: number) => void;
  clearCart: () => void;
  cartItemCount: number;
}

// Cria o Contexto
const CartContext = createContext<ICartContext | undefined>(undefined);

// Cria o componente "Provider" que irá fornecer os dados do carrinho
export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // Lógica para adicionar um item ao carrinho
  const addToCart = (product: Omit<CartItem, 'quantity'>) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      if (existingItem) {
        // Se o item já existe, aumenta a quantidade
        return prevItems.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      // Se é um item novo, adiciona ao carrinho com quantidade 1
      return [...prevItems, { ...product, quantity: 1 }];
    });
    alert(`${product.nome} adicionado ao carrinho!`);
  };

  // Lógica para remover um item do carrinho
  const removeFromCart = (productId: number) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
  };

  // Lógica para limpar o carrinho
  const clearCart = () => {
    setCartItems([]);
  };

  // Calcula a quantidade total de itens para o contador
  const cartItemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  // Agora, com todas as funções definidas, podemos criar o valor do contexto
  const contextValue = {
    cartItems,
    addToCart,
    removeFromCart,
    clearCart,
    cartItemCount
  };

  return (
    <CartContext.Provider value={contextValue}>
      {children}
    </CartContext.Provider>
  );
};

// Hook customizado para usar o contexto
export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};