// app/layout.tsx
import type { Metadata } from "next";
import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';
import { CartProvider } from "./context/CartContext"; // Corrigindo caminho

const inter = Inter({ subsets: ['latin'], display: 'swap', variable: '--font-inter' });
const playfair = Playfair_Display({ subsets: ['latin'], display: 'swap', variable: '--font-playfair' });

export const metadata: Metadata = {
  title: "Andressa Modas",
  description: "Sua loja de moda online.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className={`${inter.variable} ${playfair.variable}`}>
      <body>
        <CartProvider>
          {/* O conteúdo da rota ativa (seja da loja ou do admin) será renderizado aqui */}
          {children}
        </CartProvider>
      </body>
    </html>
  );
}