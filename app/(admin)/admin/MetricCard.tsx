// app/(admin)/admin/MetricCard.tsx
import React from 'react';

interface MetricCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode; // Permite passar um ícone como um componente
}

export default function MetricCard({ title, value, icon }: MetricCardProps) {
  const cardStyle: React.CSSProperties = {
    background: '#fff',
    padding: '1.5rem',
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
  };

  const iconStyle: React.CSSProperties = {
    fontSize: '2rem',
    color: '#0070f3',
  };

  return (
    <div style={cardStyle}>
      <div style={iconStyle}>{icon}</div>
      <div>
        <h3 style={{ margin: 0, color: '#666' }}>{title}</h3>
        <p style={{ margin: 0, fontSize: '1.8rem', fontWeight: 'bold' }}>{value}</p>
      </div>
    </div>
  );
}