'use client';

import { createContext, useState, useContext, ReactNode } from 'react';

interface ModalContextType {
  isCartModalOpen: boolean;
  setCartModalOpen: (isOpen: boolean) => void;
  isAccountModalOpen: boolean;
  setAccountModalOpen: (isOpen: boolean) => void;
  isPromotionsModalOpen: boolean;
  setPromotionsModalOpen: (isOpen: boolean) => void;
  // Adicionamos os novos estados para os modais legais
  isTermsModalOpen: boolean;
  setTermsModalOpen: (isOpen: boolean) => void;
  isPolicyModalOpen: boolean;
  setPolicyModalOpen: (isOpen: boolean) => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export function ModalProvider({ children }: { children: ReactNode }) {
  const [isCartModalOpen, setCartModalOpen] = useState(false);
  const [isAccountModalOpen, setAccountModalOpen] = useState(false);
  const [isPromotionsModalOpen, setPromotionsModalOpen] = useState(false);
  // Adicionamos os novos states
  const [isTermsModalOpen, setTermsModalOpen] = useState(false);
  const [isPolicyModalOpen, setPolicyModalOpen] = useState(false);

  return (
    <ModalContext.Provider value={{
      isCartModalOpen,
      setCartModalOpen,
      isAccountModalOpen,
      setAccountModalOpen,
      isPromotionsModalOpen,
      setPromotionsModalOpen,
      // Adicionamos os novos valores ao provider
      isTermsModalOpen,
      setTermsModalOpen,
      isPolicyModalOpen,
      setPolicyModalOpen,
    }}>
      {children}