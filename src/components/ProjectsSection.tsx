import React from 'react';
import { ProjectItem } from '../types';
import { Layers, CheckCircle2, ChevronRight, Cpu, Activity, ShieldCheck } from 'lucide-react';

interface ProjectsSectionProps {
  projects: ProjectItem[];
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ projects }) => {
  return (
    <section id="projetos" className="py-16 border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-300 text-xs font-mono font-semibold tracking-wider uppercase mb-3">
              <Layers className="w-3.5 h-3.5 text-blue-400" />
              Casos Reais & Implantações Industriais
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold font-display text-white">
              Projetos de Desenvolvimento & Automação de Aperto
            </h2>
            <p className="text-slate-400 text-sm sm:text-base mt-2 max-w-3xl">
              Células automatizadas, integrações de controladores via protocolos de rede e soluções de zero-defeito para montagens mecânicas críticas.
            </p>
          </div>
        </div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {projects.map((proj) => (
            <div
              key={proj.id}
              className="bg-[#0b1426] border border-slate-800/80 hover:border-amber-500/40 rounded-2xl p-6 flex flex-col justify-between transition-all duration-300 hover:shadow-xl hover:shadow-amber-500/5 group relative overflow-hidden"
            >
              {/* Subtle top ambient line */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500/20 via-amber-400/40 to-blue-500/20 group-hover:from-amber-400 group-hover:to-blue-400 transition-colors" />

              <div>
                {/* Sector & Date */}
                <div className="flex items-center justify-between text-xs mb-3 font-mono">
                  <span className="px-2.5 py-0.5 rounded-full bg-slate-800 text-amber-300 font-semibold border border-slate-700">
                    {proj.category}
                  </span>
                  <span className="text-slate-500">{proj.date}</span>
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold font-display text-white group-hover:text-amber-300 transition-colors leading-snug mb-3">
                  {proj.title}
                </h3>

                {/* Summary */}
                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-4">
                  {proj.summary}
                </p>

                {/* Challenge & Solution Box */}
                <div className="space-y-3 mb-5 text-xs">
                  <div className="p-3 rounded-xl bg-[#070c17] border border-slate-800/80">
                    <span className="text-rose-400 font-bold uppercase tracking-wider text-[10px] block mb-1">
                      Desafio Crítico:
                    </span>
                    <p className="text-slate-400 leading-relaxed">{proj.challenge}</p>
                  </div>

                  <div className="p-3 rounded-xl bg-[#070c17] border border-slate-800/80">
                    <span className="text-emerald-400 font-bold uppercase tracking-wider text-[10px] block mb-1">
                      Solução Implementada:
                    </span>
                    <p className="text-slate-300 leading-relaxed">{proj.solution}</p>
                  </div>
                </div>

                {/* Highlights Results */}
                <div className="mb-5 space-y-1.5">
                  <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block mb-2">
                    Resultados Comprovados:
                  </span>
                  {proj.results.map((res, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                      <span>{res}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                {/* Metrics Badges */}
                <div className="grid grid-cols-3 gap-2 pt-4 border-t border-slate-800/80 mb-4 font-mono text-center">
                  {proj.metrics.map((m, idx) => (
                    <div key={idx} className="bg-slate-900/90 p-2 rounded-lg border border-slate-800">
                      <span className="text-[10px] text-slate-400 block line-clamp-1">{m.label}</span>
                      <strong className="text-xs text-amber-300 font-bold">{m.value}</strong>
                    </div>
                  ))}
                </div>

                {/* Tech Stack Chips */}
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {proj.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-800/70 border border-slate-700/60 text-slate-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
