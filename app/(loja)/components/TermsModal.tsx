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
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris massa. Vestibulum lacinia arcu eget nulla.</p>
            <h3 className="font-bold text-lg text-gray-700 pt-2">2. Uso do Serviço</h3>
            <p>Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur sodales ligula in libero. Sed dignissim lacinia nunc. Curabitur tortor. Pellentesque nibh. Aenean quam. In scelerisque sem at dolor. Maecenas mattis. Sed convallis tristique sem. Proin ut ligula vel nunc egestas porttitor. Morbi lectus risus, iaculis vel, suscipit quis, luctus non, massa.</p>
            <h3 className="font-bold text-lg text-gray-700 pt-2">3. Contas de Usuário</h3>
            <p>Fusce ac turpis quis ligula lacinia aliquet. Mauris ipsum. Nulla metus metus, ullamcorper vel, tincidunt sed, euismod in, nibh. Quisque volutpat condimentum velit. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nam nec ante. Sed lacinia, urna non tincidunt mattis, tortor neque adipiscing diam, a cursus ipsum ante quis turpis. Nulla facilisi. Ut fringilla. Suspendisse potenti.</p>
            <h3 className="font-bold text-lg text-gray-700 pt-2">4. Propriedade Intelectual</h3>
            <p>Nunc feugiat mi a tellus consequat imperdiet. Vestibulum sapien. Proin quam. Etiam ultrices. Suspendisse in justo eu magna luctus suscipit. Sed lectus. Integer euismod lacus luctus magna. Quisque cursus, metus vitae pharetra auctor, sem massa mattis sem, at interdum magna augue eget diam.</p>
        </div>
      </div>
    </div>
  );
}