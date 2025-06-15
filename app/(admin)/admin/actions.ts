// app/(admin)/admin/actions.ts
'use server';

import pool from '@/lib/db';

// Interface para definir o formato dos dados do dashboard
export interface DashboardMetrics {
  totalSales: number;
  totalOrders: number;
  averageTicket: number;
  latestOrders: any[]; // 'any' por enquanto, podemos tipar depois
}

export async function getDashboardMetrics(): Promise<DashboardMetrics> {
  try {
    // Para estas métricas, precisaremos de uma tabela de 'pedidos' no futuro.
    // Como ainda não a temos, vamos simular os dados por enquanto.
    // Quando tivermos a tabela 'pedidos', substituiremos esta lógica.

    // --- LÓGICA SIMULADA (DADOS FALSOS) ---
    const totalSales = 12540.50;
    const totalOrders = 83;
    const averageTicket = totalSales / totalOrders;

    // Busca os últimos 5 produtos cadastrados para simular "atividade recente"
    const { rows: latestOrders } = await pool.query(
      'SELECT id, nome, preco FROM produtos ORDER BY data_criacao DESC LIMIT 5'
    );
    // --- FIM DA LÓGICA SIMULADA ---
    
    return {
      totalSales,
      totalOrders,
      averageTicket,
      latestOrders,
    };
  } catch (error) {
    console.error('Erro ao buscar métricas do dashboard:', error);
    // Retorna valores zerados em caso de erro
    return {
      totalSales: 0,
      totalOrders: 0,
      averageTicket: 0,
      latestOrders: [],
    };
  }
}