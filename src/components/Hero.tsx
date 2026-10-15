import React from 'react';
import { Wrench, ShieldCheck, ChevronRight, Calculator, Cpu, Sparkles, BookOpen, Layers } from 'lucide-react';

interface HeroProps {
  onOpenCalculator: () => void;
  onExploreArticles: () => void;
  onExploreStories: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onOpenCalculator,
  onExploreArticles,
  onExploreStories,
}) => {
  return (
    <section className="relative overflow-hidden pt-8 pb-16 lg:py-20 bg-gradient-to-b from-[#080d1a] via-[#091325] to-[#070c17]">
      {/* Background Glows & Grid */}
      <div className="absolute inset-0 bg-tech-grid opacity-30 pointer-events-none" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-amber-500/10 via-blue-600/10 to-transparent rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Eyebrow Tag */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#0d1a33] border border-amber-500/30 text-amber-300 text-xs font-mono font-semibold tracking-wide shadow-md">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            Engenharia de Fixação Mecânica & Automação 4.0
          </div>
        </div>

        {/* Main Headline */}
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold font-display text-white tracking-tight leading-[1.15] sm:leading-[1.15]">
            Aperto Crítico, Metrologia de Torque &{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-400 to-yellow-500">
              Qualidade na Indústria 4.0
            </span>
          </h1>

          <p className="mt-6 text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Portal técnico dedicado a engenheiros mecânicos, projetistas e técnicos de manufatura. Artigos fundamentados na <strong className="text-white">VDI 2230</strong>, tutoriais práticos de chão de fábrica, estudos de caso de zero-defeito e ferramentas interativas de cálculo.
          </p>

          {/* Action CTAs */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            <button
              onClick={onExploreArticles}
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 hover:from-amber-400 hover:to-amber-300 text-slate-950 font-bold text-sm transition-all shadow-lg shadow-amber-500/25 active:scale-95"
            >
              <BookOpen className="w-4 h-4" />
              Explorar Artigos & Estudos
            </button>

            <button
              onClick={onOpenCalculator}
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-[#0d1c38] hover:bg-[#12254b] text-white border border-slate-700/80 hover:border-amber-400/50 font-semibold text-sm transition-all shadow-md active:scale-95"
            >
              <Calculator className="w-4 h-4 text-amber-400" />
              Calculadora VDI 2230
            </button>

            <button
              onClick={onExploreStories}
              className="flex items-center gap-2 px-5 py-3 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 font-medium text-sm transition-all"
            >
              <Sparkles className="w-4 h-4 text-orange-400" />
              Histórias de Chão de Fábrica
            </button>
          </div>
        </div>

        {/* Feature KPI Badges */}
        <div className="mt-14 max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
          <div className="p-4 rounded-xl bg-[#0b1426]/90 border border-slate-800 shadow-md flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="text-base sm:text-lg font-bold font-mono text-white">Classe A</div>
              <div className="text-[11px] text-slate-400">Aperto Crítico de Segurança</div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-[#0b1426]/90 border border-slate-800 shadow-md flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 shrink-0">
              <Cpu className="w-5 h-5" />
            </div>
            <div>
              <div className="text-base sm:text-lg font-bold font-mono text-white">Open Protocol</div>
              <div className="text-[11px] text-slate-400">Rastreabilidade MES 100%</div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-[#0b1426]/90 border border-slate-800 shadow-md flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
              <Wrench className="w-5 h-5" />
            </div>
            <div>
              <div className="text-base sm:text-lg font-bold font-mono text-white">VDI 2230</div>
              <div className="text-[11px] text-slate-400">Cálculo Rigoroso de Pré-Carga</div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-[#0b1426]/90 border border-slate-800 shadow-md flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 shrink-0">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <div className="text-base sm:text-lg font-bold font-mono text-white">Cmk &gt; 1.67</div>
              <div className="text-[11px] text-slate-400">Capabilidade Estatística ISO</div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
