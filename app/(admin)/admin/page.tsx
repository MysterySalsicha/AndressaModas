// app/(admin)/admin/page.tsx
import { getDashboardMetrics, DashboardMetrics } from './actions';
import MetricCard from './MetricCard';

// Ícones para os cards
const SalesIcon = () => <span>💰</span>;
const OrdersIcon = () => <span>📦</span>;
const TicketIcon = () => <span>🎟️</span>;

export default async function AdminDashboardPage() {
  const metrics: DashboardMetrics = await getDashboardMetrics();

  // Função para formatar valores como moeda (R$)
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };
  
  const gridStyle: React.CSSProperties = {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
      gap: '1.5rem',
      marginBottom: '2rem',
  };

  return (
    <div>
      <h1>Dashboard</h1>
      
      <div style={gridStyle}>
        <MetricCard 
          title="Vendas Totais" 
          value={formatCurrency(metrics.totalSales)}
          icon={<SalesIcon />} 
        />
        <MetricCard 
          title="Total de Pedidos" 
          value={metrics.totalOrders}
          icon={<OrdersIcon />} 
        />
        <MetricCard 
          title="Ticket Médio" 
          value={formatCurrency(metrics.averageTicket)}
          icon={<TicketIcon />} 
        />
      </div>

      <div>
        <h2>Atividade Recente</h2>
        <p>Últimos produtos cadastrados (simulação):</p>
        <ul>
          {metrics.latestOrders.map(product => (
            <li key={product.id}>
              {product.nome} - {formatCurrency(product.preco)}
            </li>
          ))}
        </ul>
      </div>

      {/* Gráficos seriam adicionados aqui no futuro */}
    </div>
  );
}