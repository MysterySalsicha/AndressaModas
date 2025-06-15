// app/(admin)/admin/produtos/DeleteProductButton.tsx
"use client";

import { deleteProduct } from "./actions";

export default function DeleteProductButton({ productId }: { productId: number }) {
  
  const handleDelete = async () => {
    // Pede confirmação ao usuário antes de excluir
    if (window.confirm('Tem certeza que deseja excluir este produto? Esta ação não pode ser desfeita.')) {
      const result = await deleteProduct(productId);
      if (result?.error) {
        alert(`Erro ao excluir: ${result.error}`);
      } else {
        alert('Produto excluído com sucesso.');
      }
    }
  };

  return (
    <button onClick={handleDelete} style={{ background: 'red', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '4px', cursor: 'pointer', marginLeft: '10px' }}>
      Excluir
    </button>
  );
}