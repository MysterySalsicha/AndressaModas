// app/(loja)/layout.tsx
import type { Metadata } from "next";
import { Inter, Playfair_Display } from 'next/font/google';

// CORREÇÃO: O caminho agora é '../globals.css' para "subir" um nível de pasta.
import '../globals.css'; 

import Header from "./components/Header";
import Footer from "./components/Footer";
import { CartProvider } from "./context/CartContext";

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
          <Header />
          <main>
            {children}
          </main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}