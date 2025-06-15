// app/(loja)/context/actions.ts
'use server';

import pool from '@/lib/db';
import { revalidatePath } from 'next/cache';

interface CartItem {
  id: number;
  quantity: number;
  preco: number;
}

export async function createOrder(cartItems: CartItem[]) {
  if (!cartItems || cartItems.length === 0) {
    return { error: 'O carrinho está vazio.' };
  }

  const client = await pool.connect();

  try {
    // Inicia uma transação para garantir que tudo seja salvo junto
    await client.query('BEGIN');

    // Calcula o total do pedido
    const total = cartItems.reduce((sum, item) => sum + item.preco * item.quantity, 0);

    // Cria o registro na tabela 'pedidos'
    // Por enquanto, o usuario_id e endereco_entrega são fixos (simulação)
    const orderQuery = `
      INSERT INTO pedidos (usuario_id, valor_total, status, endereco_entrega)
      VALUES ($1, $2, $3, $4)
      RETURNING id;
    `;
    const orderResult = await client.query(orderQuery, [
      1, // TODO: Substituir pelo ID do usuário logado
      total,
      'Pendente',
      JSON.stringify({ rua: "Rua Exemplo", numero: "123", cidade: "São Paulo" })
    ]);
    const newOrderId = orderResult.rows[0].id;

    // Cria os registros na tabela 'itens_pedido' para cada item do carrinho
    for (const item of cartItems) {
      const itemQuery = `
        INSERT INTO itens_pedido (pedido_id, produto_id, quantidade, preco_unitario)
        VALUES ($1, $2, $3, $4);
      `;
      await client.query(itemQuery, [newOrderId, item.id, item.quantity, item.preco]);
    }

    // Confirma a transação
    await client.query('COMMIT');

    // Limpa o cache da página de pedidos do admin para que o novo pedido apareça
    revalidatePath('/admin/pedidos');

    return { success: true, orderId: newOrderId };

  } catch (error) {
    // Se algo der errado, desfaz todas as operações
    await client.query('ROLLBACK');
    console.error('Erro ao criar pedido:', error);
    return { error: 'Não foi possível finalizar a compra.' };
  } finally {
    // Libera a conexão com o banco de dados
    client.release();
  }
}