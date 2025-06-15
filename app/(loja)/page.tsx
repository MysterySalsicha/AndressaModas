// app/(loja)/page.tsx
import ProductCard from "./components/ProductCard";

async function getProducts(categoryId?: string) {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
    let url = `${apiUrl}/api/produtos`;
    if (categoryId) {
      url += `?categoria=${categoryId}`;
    }
    const res = await fetch(url, { cache: 'no-store' });
    if (!res.ok) return [];
    return res.json();
  } catch (error) {
    console.error("Falha ao buscar produtos:", error);
    return [];
  }
}

export default async function HomePage({ searchParams }: { searchParams: { categoria?: string } }) {
  const products = await getProducts(searchParams.categoria);

  return (
    // O <main> agora é controlado pelo layout da loja
    <>
      <section className="hero-section">
        <h1>Nova Coleção</h1>
        <p>Descubra as últimas tendências e peças exclusivas.</p>
      </section>

      <section className="product-section">
        <h2 style={{ textAlign: 'center', fontSize: '2.5rem', fontFamily: 'var(--font-display)', margin: '3rem 0' }}>Nossos Produtos</h2>
        
        <div className="product-grid">
          {Array.isArray(products) && products.length > 0 ? (
            products.map((product: any) => (
              <ProductCard key={product.id} product={product} />
            ))
          ) : (
            <p style={{ textAlign: 'center', gridColumn: '1 / -1' }}>
              Nenhum produto encontrado. Verificando conexão...
            </p>
          )}
        </div>
      </section>
    </>
  );
}