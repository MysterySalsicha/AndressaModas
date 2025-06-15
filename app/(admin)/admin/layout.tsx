// app/(admin)/admin/layout.tsx
import Link from 'next/link';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div style={{ display: 'flex' }}>
      <aside style={{ width: '220px', borderRight: '1px solid #eee', minHeight: '100vh', padding: '1.5rem' }}>
        <h2>Admin</h2>
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '2rem' }}>
          <Link href="/admin">Dashboard</Link>
          <Link href="/admin/produtos">Produtos</Link>
          <Link href="/admin/pedidos">Pedidos</Link>
        </nav>
      </aside>
      <div style={{ flex: 1, padding: '1.5rem' }}>
        {children}
      </div>
    </div>
  );
}