import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { CartProvider } from './(loja)/context/CartContext' // Ajuste o caminho se necessário
import { ModalProvider } from './(loja)/context/ModalContext' // Ajuste o caminho se necessário

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Andressa Modas',
  description: 'Sua loja de moda online',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-br">
      <body className={inter.className}>
        {/* Envolvemos tudo com os providers */}
        <ModalProvider>
          <CartProvider>
            {children}
          </CartProvider>
        </ModalProvider>
      </body>
    </html>
  )
}