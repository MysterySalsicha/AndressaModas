// app/api/categorias/route.ts
import { NextResponse } from 'next/server';
import pool from '../../../lib/db';

export async function GET() {
  try {
    const { rows } = await pool.query('SELECT * FROM categorias ORDER BY nome ASC');
    return NextResponse.json(rows);
  } catch (error) {
    console.error('Erro ao buscar categorias:', error);
    return NextResponse.json({ message: 'Erro interno do servidor.', error }, { status: 500 });
  }
}