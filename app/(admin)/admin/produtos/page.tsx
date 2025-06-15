// app/(admin)/admin/produtos/page.tsx
import Link from 'next/link';
import pool from '@/lib/db';
import DeleteProductButton from './DeleteProductButton'; // <-- Importar o novo componente

async function getProducts() {
  const { rows } = await pool.query('SELECT id, nome, preco, estoque_quantidade FROM produtos ORDER BY id DESC');
  return rows;
}

export default async function ProductsPage() {
  const products = await getProducts();

  // Estilos simples para a tabela
  const tableStyle: React.CSSProperties = { width: '100%', borderCollapse: 'collapse' };
  const thStyle: React.CSSProperties = { border: '1px solid #ddd', padding: '8px', background: '#f2f2f2', textAlign: 'left' };
  const tdStyle: React.CSSProperties = { border: '1px solid #ddd', padding: '8px', verticalAlign: 'middle' };
  const actionsCellStyle: React.CSSProperties = { ...tdStyle, display: 'flex', gap: '10px' };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <h1>Gestão de Produtos ({products.length})</h1>
        <Link href="/admin/produtos/novo" style={{padding: '0.5rem 1rem', background: '#0070f3', color: 'white', textDecoration: 'none', borderRadius: '5px'}}>
          Adicionar Novo
        </Link>
      </div>
      
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thStyle}>ID</th>
            <th style={thStyle}>Nome</th>
            <th style={thStyle}>Preço</th>
            <th style={thStyle}>Estoque</th>
            <th style={thStyle}>Ações</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td style={tdStyle}>{product.id}</td>
              <td style={tdStyle}>{product.nome}</td>
              <td style={tdStyle}>R$ {Number(product.preco).toFixed(2)}</td>
              <td style={tdStyle}>{product.estoque_quantidade}</td>
              <td style={actionsCellStyle}>
                <Link href={`/admin/produtos/editar/${product.id}`}>Editar</Link>
                {/* Adicionando o botão de excluir */}
                <DeleteProductButton productId={product.id} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}