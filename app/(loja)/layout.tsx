import { ReactNode } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import { AccountModal } from './components/AccountModal';
import { CartModal } from './components/CartModal';

// Definindo o tipo para as categorias que vamos buscar
interface Category {
  id: number;
  nome: string;
}

// Função para buscar as categorias da nossa API
async function getCategories(): Promise<Category[]> {
  try {
    // Usamos a URL absoluta pois esta chamada é feita no lado do servidor
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/categorias`, {
      // Revalidamos o cache a cada 1 hora para buscar novas categorias
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

export default async function LojaLayout({ children }: { children: ReactNode }) {
  // Buscamos as categorias aqui
  const categories = await getCategories();

  return (
    <div className="flex flex-col min-h-screen">
      {/* Passamos as categorias para o Header */}
      <Header categories={categories} />
      <AccountModal />
      <CartModal />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  );
}