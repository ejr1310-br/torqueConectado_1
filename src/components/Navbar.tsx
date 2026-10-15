import React, { useState } from 'react';
import { Wrench, Menu, X, FileEdit, Calculator, MessageSquare, Briefcase, Award, Send } from 'lucide-react';

interface NavbarProps {
  draftsCount: number;
  onOpenDraftManager: () => void;
  onOpenContact: () => void;
  activeFilter: string;
  onSelectCategory: (cat: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  draftsCount,
  onOpenDraftManager,
  onOpenContact,
  activeFilter,
  onSelectCategory,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-[#070d1a]/90 backdrop-blur-md border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Brand Logo */}
          <a href="#" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-slate-900 to-[#0e1f3d] border border-amber-500/40 flex items-center justify-center shadow-md group-hover:border-amber-400 transition-colors">
              <Wrench className="w-5 h-5 text-amber-400 group-hover:rotate-12 transition-transform duration-300" />
            </div>
            <div>
              <span className="text-base sm:text-lg font-bold font-display text-white tracking-tight flex items-center gap-1.5">
                TORQUE<span className="text-amber-400">&</span>AUTOMAÇÃO
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-amber-500/15 text-amber-300 border border-amber-500/30">
                  4.0
                </span>
              </span>
              <span className="text-[11px] text-slate-400 block font-mono">
                Engenharia Mecânica & Aperto Crítico
              </span>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-6 text-xs font-medium">
            <button
              onClick={() => {
                onSelectCategory('all');
                scrollToSection('artigos');
              }}
              className="text-slate-300 hover:text-amber-300 transition-colors"
            >
              Artigos Técnicos
            </button>
            <button
              onClick={() => {
                onSelectCategory('historias_campo');
                scrollToSection('artigos');
              }}
              className="text-slate-300 hover:text-amber-300 transition-colors"
            >
              Histórias & Cotidiano
            </button>
            <button
              onClick={() => scrollToSection('torque-calculator-section')}
              className="text-slate-300 hover:text-amber-300 transition-colors flex items-center gap-1 text-amber-300/90 font-semibold"
            >
              <Calculator className="w-3.5 h-3.5 text-amber-400" />
              Calculadora VDI 2230
            </button>
            <button
              onClick={() => scrollToSection('projetos')}
              className="text-slate-300 hover:text-amber-300 transition-colors"
            >
              Projetos
            </button>
            <button
              onClick={() => scrollToSection('habilidades')}
              className="text-slate-300 hover:text-amber-300 transition-colors"
            >
              Habilidades
            </button>
          </nav>

          {/* Action CTAs */}
          <div className="hidden sm:flex items-center gap-3">
            {/* Draft Manager Button */}
            <button
              onClick={onOpenDraftManager}
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700/80 text-xs font-semibold transition-all relative group"
              title="Gerenciar postagens e rascunhos"
            >
              <FileEdit className="w-3.5 h-3.5 text-amber-400" />
              <span>Meus Rascunhos</span>
              {draftsCount > 0 && (
                <span className="px-1.5 py-0.2 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/40 text-[10px] font-mono font-bold">
                  {draftsCount}
                </span>
              )}
            </button>

            {/* Contact CTA */}
            <button
              onClick={onOpenContact}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 text-xs font-bold transition-all shadow-md shadow-amber-500/20 active:scale-95"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Consultoria / Contato</span>
            </button>
          </div>

          {/* Mobile hamburger */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={onOpenDraftManager}
              className="p-2 rounded-lg bg-slate-800 text-amber-300 sm:hidden relative"
              title="Rascunhos"
            >
              <FileEdit className="w-4 h-4" />
              {draftsCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-rose-500 text-white rounded-full text-[9px] flex items-center justify-center font-bold">
                  {draftsCount}
                </span>
              )}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-800 bg-[#070c17] px-4 pt-3 pb-6 space-y-3">
          <button
            onClick={() => {
              onSelectCategory('all');
              scrollToSection('artigos');
            }}
            className="w-full text-left py-2 text-sm text-slate-300 font-medium"
          >
            Artigos Técnicos & Indústria 4.0
          </button>
          <button
            onClick={() => {
              onSelectCategory('historias_campo');
              scrollToSection('artigos');
            }}
            className="w-full text-left py-2 text-sm text-slate-300 font-medium"
          >
            Histórias do Cotidiano & Blog
          </button>
          <button
            onClick={() => scrollToSection('torque-calculator-section')}
            className="w-full text-left py-2 text-sm text-amber-300 font-medium flex items-center gap-2"
          >
            <Calculator className="w-4 h-4" />
            Calculadora de Torque VDI 2230
          </button>
          <button
            onClick={() => scrollToSection('projetos')}
            className="w-full text-left py-2 text-sm text-slate-300 font-medium"
          >
            Projetos Industriais
          </button>
          <button
            onClick={() => scrollToSection('habilidades')}
            className="w-full text-left py-2 text-sm text-slate-300 font-medium"
          >
            Habilidades & Normas
          </button>

          <div className="pt-4 border-t border-slate-800 flex flex-col gap-2.5">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenDraftManager();
              }}
              className="w-full py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-slate-200 text-xs font-semibold flex items-center justify-center gap-2"
            >
              <FileEdit className="w-4 h-4 text-amber-400" />
              Gerenciador de Rascunhos ({draftsCount} pendentes)
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenContact();
              }}
              className="w-full py-2.5 rounded-xl bg-amber-500 text-slate-950 text-xs font-bold flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" />
              Solicitar Consultoria / Contato
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
