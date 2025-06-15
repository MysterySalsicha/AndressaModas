'use client';

import { useModal } from '../context/ModalContext';
import { X, Shield } from 'lucide-react';

export function PolicyModal() {
  const { isPolicyModalOpen, setPolicyModalOpen } = useModal();

  if (!isPolicyModalOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl h-full max-h-[80vh] p-6 flex flex-col">
        <div className="flex justify-between items-center mb-4 pb-4 border-b">
            <div className="flex items-center">
                <Shield className="text-pink-500 mr-3" size={28} />
                <h2 className="text-2xl font-bold text-gray-800">Política de Privacidade</h2>
            </div>
            <button onClick={() => setPolicyModalOpen(false)} className="text-gray-400 hover:text-gray-600" aria-label="Fechar modal">
                <X size={24} />
            </button>
        </div>
        <div className="flex-grow overflow-y-auto pr-4 text-gray-600 space-y-4">
            <p><strong>Última atualização:</strong> 15 de Junho de 2025</p>
            <h3 className="font-bold text-lg text-gray-700 pt-2">1. Coleta de Informações</h3>
            <p>Coletamos informações que você nos fornece diretamente, como quando você cria uma conta, faz um pedido ou se comunica com o nosso serviço de atendimento ao cliente. As informações podem incluir seu nome, e-mail, endereço de entrega e número de telefone.</p>
            <h3 className="font-bold text-lg text-gray-700 pt-2">2. Segurança dos Dados</h3>
            <p>A segurança de seus dados é importante para nós. Usamos medidas de segurança para proteger suas informações pessoais contra acesso não autorizado, alteração, divulgação ou destruição.</p>
        </div>
      </div>
    </div>
  );
}