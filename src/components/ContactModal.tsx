import React, { useState, useId } from 'react';
import { X, Send, CheckCircle2, Mail, Phone, MapPin, Building, ShieldCheck } from 'lucide-react';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [serviceType, setServiceType] = useState('consultoria');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  // Generate unique IDs for accessibility
  const contactNameId = useId();
  const contactEmailId = useId();
  const contactCompanyId = useId();
  const contactServiceTypeId = useId();
  const contactMessageId = useId();

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setName('');
      setEmail('');
      setCompany('');
      setMessage('');
      onClose();
    }, 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="bg-[#0b1426] border border-slate-700/80 rounded-2xl w-full max-w-xl shadow-2xl relative overflow-hidden">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-[#070c17]">
          <div>
            <h3 className="text-lg font-bold font-display text-white flex items-center gap-2">
              <Send className="w-4 h-4 text-amber-400" />
              Contato Profissional & Consultoria Especializada
            </h3>
            <p className="text-xs text-slate-400">
              Discuta projetos de aperto crítico, automação de linhas ou solicite treinamentos técnicos.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {submitted ? (
            <div className="text-center py-10 space-y-3">
              <div className="w-12 h-12 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto border border-emerald-500/40">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-bold text-white">Mensagem Enviada com Sucesso!</h4>
              <p className="text-xs text-slate-300 max-w-sm mx-auto">
                Obrigado pelo contato! Retornarei em breve com as informações técnicas solicitadas.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label htmlFor={contactNameId} className="block text-xs font-medium text-slate-400 mb-1">Nome Completo *</label>
                  <input
                    id={contactNameId}
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Eng. João Silva"
                    className="w-full bg-[#070c17] border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white outline-none focus:border-amber-400"
                  />
                </div>
                <div>
                  <label htmlFor={contactEmailId} className="block text-xs font-medium text-slate-400 mb-1">E-mail Profissional *</label>
                  <input
                    id={contactEmailId}
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="joao.silva@empresa.com"
                    className="w-full bg-[#070c17] border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label htmlFor={contactCompanyId} className="block text-xs font-medium text-slate-400 mb-1">Empresa / Unidade Fabril</label>
                  <input
                    id={contactCompanyId}
                    type="text"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder="Indústria Automotiva / Mecânica"
                    className="w-full bg-[#070c17] border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white outline-none focus:border-amber-400"
                  />
                </div>
                <div>
                  <label htmlFor={contactServiceTypeId} className="block text-xs font-medium text-slate-400 mb-1">Assunto / Interesse</label>
                  <select
                    id={contactServiceTypeId}
                    value={serviceType}
                    onChange={(e) => setServiceType(e.target.value)}
                    className="w-full bg-[#070c17] border border-slate-700 rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-amber-400"
                  >
                    <option value="consultoria">Consultoria em Juntas & Torque (VDI 2230)</option>
                    <option value="auditoria">Auditoria de Capabilidade (Cm / Cmk)</option>
                    <option value="treinamento">Treinamento Técnico para Equipes</option>
                    <option value="automacao">Integração de Linha & Open Protocol</option>
                    <option value="geral">Troca de Experiências / Outro</option>
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor={contactMessageId} className="block text-xs font-medium text-slate-400 mb-1">Descreva seu Desafio Técnico ou Pergunta *</label>
                <textarea
                  id={contactMessageId}
                  rows={4}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Ex: Estamos com problemas de variação de torque em fixadores M12 na linha de montagem e precisamos avaliar a transição para torque-ângulo..."
                  className="w-full bg-[#070c17] border border-slate-700 rounded-xl p-3 text-xs text-white outline-none focus:border-amber-400 resize-none"
                />
              </div>

              <div className="pt-2 flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  Privacidade técnica e NDA garantidos
                </div>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 text-xs font-bold transition-all shadow-md shadow-amber-500/20 active:scale-95"
                >
                  Enviar Mensagem
                </button>
              </div>
            </form>
          )}
        </div>

      </div>
    </div>
  );
};
