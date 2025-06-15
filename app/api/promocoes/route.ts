import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET() {
  try {
    const promocoes = await db.query('SELECT * FROM promocoes WHERE ativo = true AND (data_validade IS NULL OR data_validade >= CURRENT_DATE)');
    
    return NextResponse.json(promocoes.rows);
  } catch (error) {
    console.error('Erro ao buscar promoções:', error);
    return NextResponse.json({ message: 'Erro interno do servidor' }, { status: 500 });
  }
}