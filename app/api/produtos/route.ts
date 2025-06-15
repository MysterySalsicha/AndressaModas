import { NextResponse } from 'next/server';
import pool from '../../../lib/db';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const categoryId = searchParams.get('categoria');

  try {
    let query = 'SELECT * FROM produtos';
    const queryParams = [];

    if (categoryId) {
      query += ' WHERE categoria_id = $1';
      queryParams.push(categoryId);
    }
    
    query += ' ORDER BY id DESC';
    
    const { rows } = await pool.query(query, queryParams);
    return NextResponse.json(rows);

  } catch (error) {
    console.error('Erro ao buscar produtos:', error);
    return NextResponse.json({ message: 'Erro interno do servidor.' }, { status: 500 });
  }
}