import React from 'react';
import { X, Info, Calculator, BookOpen, ShieldCheck } from 'lucide-react';

interface CalculatorInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CalculatorInfoModal: React.FC<CalculatorInfoModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div className="bg-[#0b1426] border border-slate-800 rounded-2xl w-full max-w-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
        
        <div className="flex items-center justify-between p-6 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-amber-500/10 border border-amber-500/30">
              <Calculator className="w-5 h-5 text-amber-400" />
            </div>
            <h3 className="text-xl font-bold font-display text-white">Sobre a Calculadora de Torque</h3>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-800 rounded-full transition-colors">
            <X className="w-5 h-5 text-slate-400" />
          </button>
        </div>

        <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto text-slate-300 text-sm leading-relaxed">
          
          <section>
            <h4 className="flex items-center gap-2 text-white font-bold mb-3">
              <Info className="w-4 h-4 text-blue-400" /> Como funciona?
            </h4>
            <p>
              Esta ferramenta utiliza a metodologia simplificada da norma alemã <strong>VDI 2230</strong> para calcular o torque de aperto necessário para alcançar uma pré-carga alvo (força axial). 
            </p>
            <p className="mt-2">
              O cálculo considera a geometria da rosca, o coeficiente de atrito total (μ) – que engloba o atrito nas roscas e sob a cabeça do parafuso – e o limite de escoamento do material conforme a norma <strong>ISO 898-1</strong>.
            </p>
          </section>

          <section>
            <h4 className="flex items-center gap-2 text-white font-bold mb-3">
              <ShieldCheck className="w-4 h-4 text-emerald-400" /> Fórmulas Aplicadas
            </h4>
            <div className="bg-[#070c17] p-4 rounded-xl border border-slate-800 font-mono text-xs text-amber-300">
              MA = FM * [ (p / (2 * π)) + (d2 * μ / 2) + (Dkm * μ / 2) ] / 1000
            </div>
            <ul className="list-disc pl-5 mt-3 space-y-1.5 text-xs text-slate-400">
              <li><strong>MA</strong>: Torque de aperto (N.m)</li>
              <li><strong>FM</strong>: Força de pré-carga (N)</li>
              <li><strong>p</strong>: Passo da rosca (mm)</li>
              <li><strong>d2</strong>: Diâmetro médio da rosca</li>
              <li><strong>Dkm</strong>: Diâmetro médio da superfície de apoio</li>
              <li><strong>μ</strong>: Coeficiente de atrito total</li>
            </ul>
          </section>

          <section>
            <h4 className="flex items-center gap-2 text-white font-bold mb-3">
              <BookOpen className="w-4 h-4 text-amber-400" /> Boas Práticas
            </h4>
            <p>
              Lembre-se: o atrito é o maior responsável pela dispersão da pré-carga final. <strong>Lubrificação</strong> não controlada é a causa número 1 de falhas por falta ou excesso de tensão no parafuso. 
            </p>
            <p className="mt-2">
              Esta calculadora serve como guia técnico. Para aplicações críticas de engenharia, valide sempre com ensaios práticos utilizando torquímetros calibrados e transdutores de força axial.
            </p>
          </section>

        </div>

        <div className="p-6 border-t border-slate-800 flex justify-end">
          <button 
            onClick={onClose}
            className="px-6 py-2 rounded-xl bg-amber-500 text-slate-950 font-bold text-sm hover:bg-amber-400 transition-colors"
          >
            Entendido
          </button>
        </div>
      </div>
    </div>
  );
};
