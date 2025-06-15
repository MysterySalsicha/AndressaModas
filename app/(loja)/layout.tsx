import { ReactNode } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import { AccountModal } from './components/AccountModal';
import { CartModal } from './components/CartModal';
import { PromotionsModal } from './components/PromotionsModal';
import { validateRequest } from '@/lib/auth';

interface Category { id: number; nome: string; }

async function getCategories(): Promise<Category[]> { /* ...código existente... */ }
async function getActivePromotions(): Promise<{ hasPromotions: boolean }> { /* ...código existente... */ }

export default async function LojaLayout({ children }: { children: ReactNode }) {
  const categories = await getCategories();
  const { hasPromotions } = await getActivePromotions();
  const { user } = await validateRequest(); // Busca o usuário logado

  return (
    <div className="flex flex-col min-h-screen">
      <Header categories={categories} hasPromotions={hasPromotions} user={user} />
      <AccountModal />
      <CartModal />
      <PromotionsModal />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
}