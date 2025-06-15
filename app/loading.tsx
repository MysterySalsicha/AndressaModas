// app/loading.tsx

export default function Loading() {
  // Cria um array com 6 itens para mostrar 6 "esqueletos" de cards
  const skeletonCards = Array(6).fill(0);

  return (
    <div>
      <section id="produtos">
        <h2>Nossos Produtos</h2>
        <div className="product-grid">
          {skeletonCards.map((_, index) => (
            <div key={index} className="product-card-skeleton">
              <div className="skeleton skeleton-image"></div>
              <div className="skeleton skeleton-title"></div>
              <div className="skeleton skeleton-price"></div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}