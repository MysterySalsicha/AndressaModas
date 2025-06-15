// app/(admin)/admin/pedidos/page.tsx
import Link from 'next/link';
import { getOrders } from '../actions';

export default async function OrdersPage() {
  const orders = await getOrders();

  const formatCurrency = (value: number) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
  const formatDate = (date: string) => new Date(date).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' });

  // Estilos (similares aos da página de produtos)
  const tableStyle: React.CSSProperties = { width: '100%', borderCollapse: 'collapse' };
  const thStyle: React.CSSProperties = { border: '1px solid #ddd', padding: '8px', background: '#f2f2f2', textAlign: 'left' };
  const tdStyle: React.CSSProperties = { border: '1px solid #ddd', padding: '8px', verticalAlign: 'middle' };

  return (
    <div>
      <h1>Gestão de Pedidos ({orders.length})</h1>

      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thStyle}>ID do Pedido</th>
            <th style={thStyle}>Cliente</th>
            <th style={thStyle}>Data</th>
            <th style={thStyle}>Status</th>
            <th style={thStyle}>Total</th>
            <th style={thStyle}>Ações</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td style={tdStyle}>#{order.id}</td>
              <td style={tdStyle}>{order.nome_cliente}</td>
              <td style={tdStyle}>{formatDate(order.data_pedido)}</td>
              <td style={tdStyle}>{order.status}</td>
              <td style={tdStyle}>{formatCurrency(order.valor_total)}</td>
              <td style={tdStyle}>
                <Link href={`/admin/pedidos/${order.id}`}>Ver Detalhes</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}