import { ReactNode } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import { AccountModal } from './components/AccountModal';
import { CartModal } from './components/CartModal';
import { PromotionsModal } from './components/PromotionsModal'; // Importe o novo modal

interface Category {
  id: number;
  nome: string;
}

async function getCategories(): Promise<Category[]> {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/categorias`, {
      next: { revalidate: 3600 },
    });
    if (!response.ok) {
      console.error('Failed to fetch categories:', response.statusText);
      return [];
    }
    return response.json();
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
}

// Adicionamos uma função para verificar se há promoções ativas
async function getActivePromotions(): Promise<{ hasPromotions: boolean }> {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/promocoes`, {
      next: { revalidate: 3600 },
    });
    if (!response.ok) return { hasPromotions: false };
    const promotions = await response.json();
    return { hasPromotions: promotions.length > 0 };
  } catch (error) {
    return { hasPromotions: false };
  }
}


export default async function LojaLayout({ children }: { children: ReactNode }) {
  const categories = await getCategories();
  const { hasPromotions } = await getActivePromotions(); // Verificamos se há promoções

  return (
    <div className="flex flex-col min-h-screen">
      {/* Passamos as categorias e a informação de promoções para o Header */}
      <Header categories={categories} hasPromotions={hasPromotions} />
      <AccountModal />
      <CartModal />
      <PromotionsModal /> {/* Adicione o modal aqui */}
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  );
}