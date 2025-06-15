import Link from 'next/link';

export default function Hero() {
  return (
    <section className="relative bg-cover bg-center bg-no-repeat h-[60vh] min-h-[400px] flex items-center justify-center text-white text-center">
      {/* Imagem de Fundo */}
      {/* TODO: Substitua esta URL pela imagem do seu banner */}
      <div 
        className="absolute inset-0 bg-black opacity-40" 
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1552874869-5c397928408f?q=80&w=2070&auto=format&fit=crop')", backgroundSize: 'cover', backgroundPosition: 'center' }}
      ></div>
      
      {/* Overlay para escurecer a imagem e garantir a legibilidade do texto */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-50"></div>

      {/* Conteúdo do Hero */}
      <div className="relative z-10 p-6 max-w-2xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-bold leading-tight drop-shadow-md">
          Coleção Inverno 2025
        </h1>
        <p className="mt-4 text-lg md:text-xl drop-shadow-md">
          Descubra as peças que vão aquecer a sua estação com muito estilo e conforto.
        </p>
        <Link 
          href="/#produtos" 
          className="mt-8 inline-block bg-pink-500 hover:bg-pink-600 text-white font-bold py-3 px-8 rounded-full transition-transform duration-300 ease-in-out transform hover:scale-105"
        >
          Ver Coleção
        </Link>
      </div>
    </section>
  );
}