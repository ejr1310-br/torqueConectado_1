import React from 'react';
import { Article } from '../types';
import { Clock, Eye, ThumbsUp, MessageSquare, Wrench, ChevronRight, Sparkles } from 'lucide-react';

interface ArticleCardProps {
  article: Article;
  onSelect: (article: Article) => void;
  onLike: (articleId: string) => void;
}

export const ArticleCard: React.FC<ArticleCardProps> = ({
  article,
  onSelect,
  onLike,
}) => {
  const getCategoryBadge = (cat: string) => {
    switch (cat) {
      case 'torque': return { label: 'Aperto & Torque', color: 'bg-amber-500/10 text-amber-300 border-amber-500/30' };
      case 'industria40': return { label: 'Indústria 4.0', color: 'bg-blue-500/10 text-blue-300 border-blue-500/30' };
      case 'automacao': return { label: 'Automação & PLC', color: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30' };
      case 'estudos_caso': return { label: 'Estudo de Caso', color: 'bg-purple-500/10 text-purple-300 border-purple-500/30' };
      case 'tutoriais': return { label: 'Tutorial Prático', color: 'bg-amber-400/20 text-amber-200 border-amber-400/30' };
      case 'historias_campo': return { label: 'História de Fábrica', color: 'bg-orange-500/15 text-orange-300 border-orange-500/30' };
      default: return { label: 'Artigo Técnico', color: 'bg-slate-800 text-slate-300 border-slate-700' };
    }
  };

  const categoryInfo = getCategoryBadge(article.category);

  return (
    <article
      onClick={() => onSelect(article)}
      className="bg-[#0b1426] border border-slate-800/80 hover:border-amber-500/40 rounded-2xl p-5 sm:p-6 flex flex-col justify-between transition-all duration-300 hover:shadow-xl hover:shadow-amber-500/5 cursor-pointer group relative overflow-hidden"
    >
      {/* Featured ribbon or glow */}
      {article.featured && (
        <div className="absolute top-0 right-0">
          <div className="text-[10px] font-mono font-bold tracking-wider uppercase bg-gradient-to-l from-amber-500 to-amber-600 text-slate-950 px-3 py-1 rounded-bl-xl shadow-sm flex items-center gap-1">
            <Sparkles className="w-2.5 h-2.5" /> Destaque Técnico
          </div>
        </div>
      )}

      <div>
        {/* Category & Read Time */}
        <div className="flex items-center gap-2 mb-3">
          <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-mono font-semibold border ${categoryInfo.color}`}>
            {categoryInfo.label}
          </span>
          <span className="text-slate-600 text-xs">•</span>
          <span className="text-[11px] text-slate-400 font-mono flex items-center gap-1">
            <Clock className="w-3 h-3 text-slate-500" /> {article.readTimeMinutes} min
          </span>
        </div>

        {/* Title */}
        <h3 className="text-lg sm:text-xl font-bold font-display text-white group-hover:text-amber-300 transition-colors leading-snug mb-2.5">
          {article.title}
        </h3>

        {/* Summary */}
        <p className="text-slate-400 text-xs sm:text-sm line-clamp-3 leading-relaxed mb-4">
          {article.summary}
        </p>

        {/* Technical Specs Tags if available */}
        {article.technicalMetadata && (
          <div className="p-2.5 rounded-xl bg-[#070d18] border border-slate-800/80 text-[11px] font-mono mb-4 space-y-1">
            {article.technicalMetadata.boltStandard && (
              <div className="flex items-center justify-between text-slate-300">
                <span className="text-slate-500">Fixador:</span>
                <span className="text-amber-300 font-semibold">{article.technicalMetadata.boltStandard}</span>
              </div>
            )}
            {article.technicalMetadata.torqueRange && (
              <div className="flex items-center justify-between text-slate-300">
                <span className="text-slate-500">Alvo:</span>
                <span className="text-blue-300">{article.technicalMetadata.torqueRange}</span>
              </div>
            )}
          </div>
        )}
      </div>

      <div>
        {/* Author & Stats Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-800/80 text-xs text-slate-400">
          <span className="font-mono text-[11px] text-slate-500">{article.publishedAt}</span>

          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1 text-[11px] font-mono hover:text-amber-300 transition-colors">
              <ThumbsUp className="w-3.5 h-3.5 text-amber-400/80" /> {article.likes}
            </span>
            <span className="flex items-center gap-1 text-[11px] font-mono">
              <MessageSquare className="w-3.5 h-3.5 text-blue-400/80" /> {article.commentsCount}
            </span>
            <span className="flex items-center gap-1 text-[11px] font-mono text-slate-500">
              <Eye className="w-3.5 h-3.5" /> {article.views}
            </span>
          </div>
        </div>

        {/* CTA link indicator */}
        <div className="mt-3 flex items-center justify-end text-xs font-semibold text-amber-400 group-hover:translate-x-1 transition-transform">
          <span>Ler Estudo Completo</span>
          <ChevronRight className="w-3.5 h-3.5 ml-1" />
        </div>
      </div>
    </article>
  );
};
