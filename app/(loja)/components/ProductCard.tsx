// app/components/ProductCard.tsx
"use client";

import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '../context/CartContext'; // <-- IMPORTAR O HOOK DO CARRINHO

export default function ProductCard({ product }: { product: any }) {
  const { addToCart } = useCart(); // <-- PEGAR A FUNÇÃO DE ADICIONAR

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault(); // Impede a navegação ao clicar no botão
    addToCart(product); // <-- CHAMA A FUNÇÃO REAL
  };

  return (
    <div className="product-card">
        <Link href={`/produto/${product.id}`}>
            <Image
                src={product.url_imagem_principal || '/placeholder.png'}
                alt={product.nome}
                width={400}
                height={533}
                className="product-image"
            />
        </Link>
        <div className="card-content">
            <h3>{product.nome}</h3>
            <p>R$ {Number(product.preco).toFixed(2)}</p>
            <button onClick={handleAddToCart} className="add-to-cart-btn">
                Adicionar ao Carrinho
            </button>
        </div>
    </div>
  );
}