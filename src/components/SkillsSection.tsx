import React from 'react';
import { TECHNICAL_SKILLS_DATA } from '../data/initialData';
import { Wrench, Gauge, Cpu, Check, Award, Sliders, Shield } from 'lucide-react';

export const SkillsSection: React.FC = () => {
  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'Gauge': return <Gauge className="w-5 h-5 text-amber-400" />;
      case 'Cpu': return <Cpu className="w-5 h-5 text-blue-400" />;
      case 'Wrench': return <Wrench className="w-5 h-5 text-amber-400" />;
      default: return <Sliders className="w-5 h-5 text-slate-400" />;
    }
  };

  return (
    <section id="habilidades" className="py-16 border-t border-slate-800/80 bg-[#070c17]/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-mono font-semibold tracking-wider uppercase mb-3">
            <Award className="w-3.5 h-3.5 text-amber-400" />
            Competências Técnicas & Engenharia Especializada
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold font-display text-white">
            Matriz de Domínio Técnico em Aperto & Automação
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-3 leading-relaxed">
            Unindo a teoria matemática da mecânica dos sólidos (VDI 2230) com a prática de comissionamento de controladores em tempo real no chão de fábrica.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TECHNICAL_SKILLS_DATA.map((category) => (
            <div
              key={category.id}
              className="bg-[#0b1426] border border-slate-800/80 rounded-2xl p-6 sm:p-7 flex flex-col justify-between shadow-lg relative overflow-hidden"
            >
              {/* Category Header */}
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                    {getCategoryIcon(category.iconName)}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold font-display text-white">
                      {category.title}
                    </h3>
                  </div>
                </div>

                <p className="text-xs text-slate-400 leading-relaxed mb-6">
                  {category.description}
                </p>

                {/* Individual Skills */}
                <div className="space-y-4">
                  {category.skills.map((skill, idx) => (
                    <div key={idx} className="p-3 rounded-xl bg-[#070d18] border border-slate-800/80">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-bold text-slate-200">
                          {skill.name}
                        </span>
                        <span className="text-[11px] font-mono font-semibold text-amber-400">
                          {skill.level}%
                        </span>
                      </div>

                      {/* Progress Bar */}
                      <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden mb-2">
                        <div
                          className="h-full bg-gradient-to-r from-amber-500 to-amber-300 rounded-full transition-all duration-500"
                          style={{ width: `${skill.level}%` }}
                        />
                      </div>

                      <p className="text-[11px] text-slate-400 leading-relaxed mb-2">
                        {skill.description}
                      </p>

                      <div className="flex flex-wrap gap-1">
                        {skill.tags.map((tag) => (
                          <span
                            key={tag}
                            className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700/60"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Assurance */}
              <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center gap-2 text-[11px] text-slate-400">
                <Shield className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Metodologias certificadas VDI & normas automotivas</span>
              </div>
            </div>
          ))}
        </div>

        {/* Standards Banner */}
        <div className="mt-12 p-5 rounded-2xl bg-gradient-to-r from-[#091325] via-[#0c1a33] to-[#091325] border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 font-bold font-mono">
              ISO
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">Normas & Padrões Técnicos de Referência Aplicados:</h4>
              <p className="text-xs text-slate-400 font-mono">
                VDI 2230 Blatt 1/2 • ISO 5393 • VDI/VDE 2645-2 • ISO 16047 • VDI/VDE 2862 • IATF 16949
              </p>
            </div>
          </div>
          <div className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-amber-300 font-mono font-semibold shrink-0">
            Conformidade Técnica Rastreável
          </div>
        </div>

      </div>
    </section>
  );
};
