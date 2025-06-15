'use client';

import { useState, useEffect } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { useModal } from '../context/ModalContext';
import { X, Eye, EyeOff } from 'lucide-react';
import { registerUser, loginUser } from '../context/actions';
import { useRouter } from 'next/navigation';

function SubmitButton({ text }: { text: string }) {
  const { pending } = useFormStatus();
  return (
    <button type="submit" disabled={pending} className="w-full bg-pink-500 text-white py-2 rounded-md hover:bg-pink-600 transition-colors disabled:bg-pink-300">
      {pending ? 'Aguarde...' : text}
    </button>
  );
}

export function AccountModal() {
  const { isAccountModalOpen, setAccountModalOpen } = useModal();
  const [activeTab, setActiveTab] = useState('login');
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const [loginState, loginAction] = useFormState(loginUser, undefined);
  const [registerState, registerAction] = useFormState(registerUser, undefined);

  useEffect(() => {
    if (loginState?.success || registerState?.success) {
      setAccountModalOpen(false);
      router.refresh();
    }
  }, [loginState, registerState, setAccountModalOpen, router]);

  if (!isAccountModalOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-sm p-8 relative">
        <button onClick={() => setAccountModalOpen(false)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
          <X size={24} />
        </button>
        <div className="flex border-b mb-6">
          <button onClick={() => setActiveTab('login')} className={`flex-1 py-2 text-center font-semibold ${activeTab === 'login' ? 'text-pink-500 border-b-2 border-pink-500' : 'text-gray-500'}`}>Entrar</button>
          <button onClick={() => setActiveTab('register')} className={`flex-1 py-2 text-center font-semibold ${activeTab === 'register' ? 'text-pink-500 border-b-2 border-pink-500' : 'text-gray-500'}`}>Registar</button>
        </div>
        {activeTab === 'login' ? (
          <form action={loginAction} className="space-y-4">
            <h2 className="text-xl font-bold text-center text-gray-700">Bem-vinda de volta!</h2>
            <div>
              <label className="block text-sm font-medium text-gray-600">Email</label>
              <input type="email" name="email" required className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-400" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600">Senha</label>
              <div className="relative">
                <input type={showPassword ? 'text' : 'password'} name="senha" required className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-400" />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-0 px-3 flex items-center text-gray-500">{showPassword ? <EyeOff size={20} /> : <Eye size={20} />}</button>
              </div>
            </div>
            {loginState?.message && <p className="text-sm text-red-500 text-center">{loginState.message}</p>}
            <SubmitButton text="Entrar" />
          </form>
        ) : (
          <form action={registerAction} className="space-y-4">
            <h2 className="text-xl font-bold text-center text-gray-700">Crie sua conta</h2>
            <div>
              <label className="block text-sm font-medium text-gray-600">Nome</label>
              <input type="text" name="nome" required className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-400" />
              {registerState?.error?.nome && <p className="text-sm text-red-500">{registerState.error.nome[0]}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600">Email</label>
              <input type="email" name="email" required className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-400" />
              {registerState?.error?.email && <p className="text-sm text-red-500">{registerState.error.email[0]}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600">Senha</label>
              <div className="relative">
                <input type={showPassword ? 'text' : 'password'} name="senha" required className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-400" />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-0 px-3 flex items-center text-gray-500">{showPassword ? <EyeOff size={20} /> : <Eye size={20} />}</button>
              </div>
              {registerState?.error?.senha && <p className="text-sm text-red-500">{registerState.error.senha[0]}</p>}
            </div>
            {registerState?.message && <p className="text-sm text-red-500 text-center">{registerState.message}</p>}
            <SubmitButton text="Criar Conta" />
          </form>
        )}
      </div>
    </div>
  );
}