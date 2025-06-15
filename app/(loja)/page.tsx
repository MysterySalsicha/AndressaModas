'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import ProductCard from './components/ProductCard';
import { useCart } from './context/CartContext';
import Link from 'next/link';
import Hero from './components/Hero'; // 1. Importe o novo componente Hero

// Tipos para os dados (sem alterações)
interface Product {
  id: number;
  nome: string;
  preco: number;
  imagem_url: string;
  descricao: string;
  categoria_id: number;
  estoque: number;
  preco_promocional: number | null;
}

interface Category {
  id: number;
  nome: string;
}

function HomePageContent() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  
  const { addToCart } = useCart();
  const searchParams = useSearchParams();
  const selectedCategory = searchParams.get('categoria') || 'all';

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const categoriesRes = await fetch('/api/categorias');
        const categoriesData = await categoriesRes.json();
        setCategories(categoriesData);

        const productsUrl = selectedCategory === 'all'
          ? '/api/produtos'
          : `/api/produtos?categoria=${encodeURIComponent(selectedCategory)}`;
        
        const productsRes = await fetch(productsUrl);
        const productsData = await productsRes.json();
        setProducts(productsData);

      } catch (error) {
        console.error("Failed to fetch data:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [selectedCategory]);

  return (
    <> {/* Usamos um Fragment para agrupar o Hero e o conteúdo principal */}
      <Hero /> {/* 2. Adicione o componente Hero aqui no topo */}
      
      <div className="container mx-auto px-6 py-8" id="produtos"> {/* 3. Adicione o id="produtos" aqui */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-800">Nossos Produtos</h1>
          <p className="text-gray-600 mt-2">Confira as últimas novidades da Andressa Modas</p>
        </div>

        {/* Filtros de Categoria (sem alterações) */}
        <div className="flex justify-center space-x-4 mb-8">
          <Link 
            href="/#produtos" 
            className={`px-4 py-2 rounded-full transition-colors duration-300 ${selectedCategory === 'all' ? 'bg-pink-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
          >
            Todos
          </Link>
          {categories.map((category) => (
            <Link 
              key={category.id} 
              href={`/?categoria=${encodeURIComponent(category.nome)}#produtos`} 
              className={`px-4 py-2 rounded-full transition-colors duration-300 ${selectedCategory === category.nome ? 'bg-pink-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
            >
              {category.nome}
            </Link>
          ))}
        </div>
        
        {/* Grade de Produtos (sem alterações) */}
        {loading ? (
          <div className="text-center">Carregando produtos...</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} onAddToCart={() => addToCart(product)} />
            ))}
          </div>
        )}
      </div>
    </>
  );
}

// Componente principal (sem alterações)
export default function HomePage() {
  return (
    <Suspense fallback={<div>Carregando...</div>}>
      <HomePageContent />
    </Suspense>
  );
}