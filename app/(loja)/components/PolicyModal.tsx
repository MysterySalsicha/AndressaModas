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
            <p>Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Morbi lacinia molestie dui. Praesent blandit dolor. Sed non quam. In vel mi sit amet augue congue elementum. Morbi in ipsum sit amet pede facilisis laoreet. Donec lacus nunc, viverra nec, blandit vel, egestas et, augue.</p>
            <h3 className="font-bold text-lg text-gray-700 pt-2">2. Uso das Informações</h3>
            <p>Vestibulum tincidunt malesuada tellus. Ut ultrices ultrices enim. Curabitur sit amet mauris. Morbi in dui quis est pulvinar ullamcorper. Nulla facilisi. Integer lacinia sollicitudin massa. Cras metus. Sed aliquet risus a tortor. Integer id quam. Morbi mi. Quisque nisl felis, venenatis tristique, dignissim in, ultrices sit amet, augue.</p>
            <h3 className="font-bold text-lg text-gray-700 pt-2">3. Compartilhamento de Dados</h3>
            <p>Proin sodales libero eget ante. Nulla quam. Aenean laoreet. Vestibulum nisi lectus, commodo ac, facilisis ac, ultricies eu, pede. Ut orci risus, accumsan porttitor, cursus quis, aliquet eget, justo. Sed pretium blandit orci. Ut eu diam at pede suscipit sodales. Aenean lectus elit, fermentum non, convallis id, sagittis at, neque.</p>
            <h3 className="font-bold text-lg text-gray-700 pt-2">4. Segurança dos Dados</h3>
            <p>Nullam mauris orci, aliquet et, iaculis et, viverra vitae, ligula. Nulla ut felis in purus aliquam imperdiet. Maecenas aliquet mollis lectus. Vivamus consectetuer risus et tortor. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam.</p>
        </div>
      </div>
    </div>
  );
}