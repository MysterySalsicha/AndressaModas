// app/components/AccountModal.tsx
"use client";

import { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

export default function AccountModal({ onClose }: { onClose: () => void }) {
  const [activeTab, setActiveTab] = useState('login'); // 'login' ou 'register'
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content account-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-tabs">
          <button onClick={() => setActiveTab('login')} className={activeTab === 'login' ? 'active' : ''}>Entrar</button>
          <button onClick={() => setActiveTab('register')} className={activeTab === 'register' ? 'active' : ''}>Registar</button>
        </div>

        {activeTab === 'login' && (
          <form className="modal-form">
            <h3>Acesse sua Conta</h3>
            <input type="email" placeholder="Seu e-mail" required />
            <div className="password-wrapper">
              <input type={showPassword ? "text" : "password"} placeholder="Sua senha" required />
              <span onClick={() => setShowPassword(!showPassword)} style={{cursor: 'pointer'}}>
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
            <button type="submit" className="form-submit-btn">Entrar</button>
            <button type="button" className="google-btn">Entrar com Google</button>
          </form>
        )}

        {activeTab === 'register' && (
          <form className="modal-form">
            <h3>Crie sua Conta</h3>
            <input type="text" placeholder="Seu nome completo" required />
            <input type="email" placeholder="Seu e-mail" required />
            <div className="password-wrapper">
              <input type={showPassword ? "text" : "password"} placeholder="Crie uma senha" required />
               <span onClick={() => setShowPassword(!showPassword)} style={{cursor: 'pointer'}}>
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
             <div className="password-wrapper">
              <input type={showConfirmPassword ? "text" : "password"} placeholder="Confirme a senha" required />
               <span onClick={() => setShowConfirmPassword(!showConfirmPassword)} style={{cursor: 'pointer'}}>
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
            <button type="submit" className="form-submit-btn">Registar</button>
          </form>
        )}

        <button onClick={onClose} className="close-modal-btn">X</button>
      </div>
    </div>
  );
}