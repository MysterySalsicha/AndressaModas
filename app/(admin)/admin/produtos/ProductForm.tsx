// app/(admin)/admin/produtos/ProductForm.tsx
"use client";

type ProductFormProps = {
  onSave: (formData: FormData) => Promise<void | { error: string }>;
  product?: { /* ... */ } | null;
};

export default function ProductForm({ onSave, product }: ProductFormProps) {
  
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const result = await onSave(formData);

    // CORREÇÃO: Verifica se 'result' existe antes de acessar 'result.error'
    if (result && result.error) {
      alert(`Erro: ${result.error}`);
    } else {
      alert('Produto salvo com sucesso!');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
        {/* O resto do seu formulário JSX continua o mesmo */}
    </form>
  );
}