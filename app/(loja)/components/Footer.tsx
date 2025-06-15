'use client';

import { useModal } from '../context/ModalContext';
import { Facebook, Instagram, Youtube } from 'lucide-react';

export default function Footer() {
  const { setTermsModalOpen, setPolicyModalOpen } = useModal();

  return (
    <footer className="bg-gray-100 border-t">
      <div className="container mx-auto px-6 py-8">
        <div className="flex flex-col items-center sm:flex-row sm:justify-between">
          <div className="text-center sm:text-left mb-4 sm:mb-0">
            <h3 className="text-xl font-bold text-gray-800">Andressa Modas</h3>
            <p className="text-gray-500">Moda e estilo para todos os momentos.</p>
          </div>
          <div className="flex items-center space-x-6">
            <button
              onClick={() => setTermsModalOpen(true)}
              className="text-gray-600 hover:text-pink-500 transition-colors duration-300"
            >
              Termos de Serviço
            </button>
            <button
              onClick={() => setPolicyModalOpen(true)}
              className="text-gray-600 hover:text-pink-500 transition-colors duration-300"
            >
              Política de Privacidade
            </button>
          </div>
        </div>
        <div className="mt-8 border-t pt-8 flex flex-col items-center sm:flex-row sm:justify-between">
          <p className="text-gray-500 text-sm mb-4 sm:mb-0">
            © {new Date().getFullYear()} Andressa Modas. Todos os direitos reservados.
          </p>
          <div className="flex space-x-4">
            <a href="#" aria-label="Facebook" className="text-gray-500 hover:text-pink-500 transition-colors">
              <Facebook size={24} />
            </a>
            <a href="#" aria-label="Instagram" className="text-gray-500 hover:text-pink-500 transition-colors">
              <Instagram size={24} />
            </a>
            <a href="#" aria-label="Youtube" className="text-gray-500 hover:text-pink-500 transition-colors">
              <Youtube size={24} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}