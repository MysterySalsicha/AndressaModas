"use client";

import { useState } from 'react';

export default function Footer() {
  const [isTermsOpen, setIsTermsOpen] = useState(false);
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);

  return (
    <>
      <footer className="main-footer">
        <div className="footer-links">
          <button onClick={() => setIsTermsOpen(true)}>Termos de Serviço</button>
          <button onClick={() => setIsPrivacyOpen(true)}>Política de Privacidade</button>
        </div>
        <p>&copy; 2025 Andressa Modas. Todos os direitos reservados.</p>
      </footer>

      {isTermsOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Termos de Serviço</h2>
            <p>Conteúdo dos termos...</p>
            <button onClick={() => setIsTermsOpen(false)}>Fechar</button>
          </div>
        </div>
      )}
      {/* Repetir a estrutura para o modal de Política de Privacidade */}
    </>
  );
}