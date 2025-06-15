'use client';

import { createContext, useState, useContext, ReactNode } from 'react';

interface ModalContextType {
  isCartModalOpen: boolean;
  setCartModalOpen: (isOpen: boolean) => void;
  isAccountModalOpen: boolean;
  setAccountModalOpen: (isOpen: boolean) => void;
  isPromotionsModalOpen: boolean;
  setPromotionsModalOpen: (isOpen: boolean) => void;
  // Adicione as duas linhas seguintes
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
  // Adicione os dois states seguintes
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
      // Adicione os valores seguintes
      isTermsModalOpen,
      setTermsModalOpen,
      isPolicyModalOpen,
      setPolicyModalOpen,
    }}>
      {children}
    </ModalContext.Provider>
  );
}

export function useModal() {
  const context = useContext(ModalContext);
  if (context === undefined) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
}