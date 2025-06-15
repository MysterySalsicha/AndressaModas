'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import ProductCard from './components/ProductCard';
import { useCart } from './context/CartContext';
import Link from 'next/link';

// Tipos para os dados que vamos buscar
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
        // Busca as categorias para os botões de filtro
        const categoriesRes = await fetch('/api/categorias');
        const categoriesData = await categoriesRes.json();
        setCategories(categoriesData);

        // Monta a URL para buscar produtos, aplicando o filtro de categoria
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
  }, [selectedCategory]); // O efeito roda sempre que a categoria na URL muda

  return (
    <div className="container mx-auto px-6 py-8">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-800">Nossos Produtos</h1>
        <p className="text-gray-600 mt-2">Confira as últimas novidades da Andressa Modas</p>
      </div>

      {/* Filtros de Categoria como Links */}
      <div className="flex justify-center space-x-4 mb-8">
        <Link 
          href="/" 
          className={`px-4 py-2 rounded-full transition-colors duration-300 ${selectedCategory === 'all' ? 'bg-pink-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
        >
          Todos
        </Link>
        {categories.map((category) => (
          <Link 
            key={category.id} 
            href={`/?categoria=${encodeURIComponent(category.nome)}`} 
            className={`px-4 py-2 rounded-full transition-colors duration-300 ${selectedCategory === category.nome ? 'bg-pink-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
          >
            {category.nome}
          </Link>
        ))}
      </div>
      
      {/* Grade de Produtos */}
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
  );
}

// O componente Suspense é necessário para usar useSearchParams em uma página renderizada no servidor
export default function HomePage() {
  return (
    <Suspense fallback={<div>Carregando...</div>}>
      <HomePageContent />
    </Suspense>
  );
}