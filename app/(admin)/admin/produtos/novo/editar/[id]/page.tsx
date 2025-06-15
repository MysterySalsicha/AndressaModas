// app/(admin)/admin/produtos/editar/[id]/page.tsx
import pool from '@/lib/db';
import ProductForm from '../../ProductForm';
import { updateProduct } from '../../actions';
import { notFound } from 'next/navigation';

// (O resto do código da página continua o mesmo)
export default async function EditProductPage({ params }: { params: { id: string } }) {
  // ...
}