// app/(admin)/admin/produtos/novo/page.tsx
import ProductForm from '../ProductForm';
import { addProduct } from '../actions';

export default function NewProductPage() {
  return (
    <div>
      <h1>Adicionar Novo Produto</h1>
      <ProductForm onSave={addProduct} />
    </div>
  );
}