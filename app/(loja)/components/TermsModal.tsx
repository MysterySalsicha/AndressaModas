'use client';

import { useModal } from '../context/ModalContext';
import { X, FileText } from 'lucide-react';

export function TermsModal() {
  const { isTermsModalOpen, setTermsModalOpen } = useModal();

  if (!isTermsModalOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl h-full max-h-[80vh] p-6 flex flex-col">
        <div className="flex justify-between items-center mb-4 pb-4 border-b">
            <div className="flex items-center">
                <FileText className="text-pink-500 mr-3" size={28} />
                <h2 className="text-2xl font-bold text-gray-800">Termos de Serviço</h2>
            </div>
            <button onClick={() => setTermsModalOpen(false)} className="text-gray-400 hover:text-gray-600" aria-label="Fechar modal">
                <X size={24} />
            </button>
        </div>
        <div className="flex-grow overflow-y-auto pr-4 text-gray-600 space-y-4">
            <p><strong>Última atualização:</strong> 15 de Junho de 2025</p>
            <h3 className="font-bold text-lg text-gray-700 pt-2">1. Aceitação dos Termos</h3>
            <p>Ao acessar e usar o site Andressa Modas, você concorda em cumprir estes Termos de Serviço e todas as leis e regulamentos aplicáveis. Se você não concorda com algum destes termos, está proibido de usar ou acessar este site.</p>
            <h3 className="font-bold text-lg text-gray-700 pt-2">2. Uso da Licença</h3>
            <p>A permissão é concedida para baixar temporariamente uma cópia dos materiais no site Andressa Modas, apenas para visualização transitória pessoal e não comercial. Esta é a concessão de uma licença, não uma transferência de título.</p>
        </div>
      </div>
    </div>
  );
}