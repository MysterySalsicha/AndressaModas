// app/(loja)/layout.tsx
import Header from "./components/Header";
import Footer from "./components/Footer";

export default function LojaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main>
        {children}
      </main>
      <Footer />
    </>
  );
}