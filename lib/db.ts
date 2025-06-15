// lib/db.ts
import { Pool } from 'pg';

let pool: Pool;

if (process.env.POSTGRES_URL) {
  pool = new Pool({
    connectionString: process.env.POSTGRES_URL,
    ssl: {
      rejectUnauthorized: false
    }
  });
} else {
  // Fallback para ambiente local se necessário (não usado na Vercel)
  // Lembre-se de criar um arquivo .env.local para desenvolvimento
  pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'meubanco',
    password: 'minhasenha',
    port: 5432,
  });
}

export default pool;