import React, { useState } from 'react';
import { Article, CommentItem } from '../types';
import { CommentSection } from './CommentSection';
import { X, Clock, Eye, ThumbsUp, Tag, ShieldAlert, Wrench, Share2, BookOpen, CheckCircle, Sparkles } from 'lucide-react';

interface ArticleDetailModalProps {
  article: Article | null;
  onClose: () => void;
  comments: CommentItem[];
  onLikeArticle: (articleId: string) => void;
  onAddComment: (comment: Omit<CommentItem, 'id' | 'createdAt' | 'likes'>) => void;
  onAddReply: (parentCommentId: string, reply: Omit<CommentItem, 'id' | 'createdAt' | 'likes'>) => void;
  onLikeComment: (commentId: string) => void;
}

export const ArticleDetailModal: React.FC<ArticleDetailModalProps> = ({
  article,
  onClose,
  comments,
  onLikeArticle,
  onAddComment,
  onAddReply,
  onLikeComment,
}) => {
  const [copied, setCopied] = useState(false);

  if (!article) return null;

  const articleComments = comments.filter(c => c.articleId === article.id);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getCategoryBadge = (cat: string) => {
    switch (cat) {
      case 'torque': return { label: 'Aperto Crítico & Torque', color: 'bg-amber-500/15 text-amber-300 border-amber-500/30' };
      case 'industria40': return { label: 'Indústria 4.0 & Rastreabilidade', color: 'bg-blue-500/15 text-blue-300 border-blue-500/30' };
      case 'automacao': return { label: 'Automação & Redes', color: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30' };
      case 'estudos_caso': return { label: 'Estudo de Caso Industrial', color: 'bg-purple-500/15 text-purple-300 border-purple-500/30' };
      case 'tutoriais': return { label: 'Tutorial Prático', color: 'bg-amber-400/20 text-amber-200 border-amber-400/40' };
      case 'historias_campo': return { label: 'Histórias do Cotidiano (Blog)', color: 'bg-orange-500/15 text-orange-300 border-orange-500/30' };
      default: return { label: 'Artigo Técnico', color: 'bg-slate-700/40 text-slate-300 border-slate-600' };
    }
  };

  const categoryInfo = getCategoryBadge(article.category);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="bg-[#091222] border border-slate-700/80 rounded-2xl w-full max-w-4xl max-h-[92vh] flex flex-col shadow-2xl relative overflow-hidden">
        
        {/* Header Bar */}
        <div className="sticky top-0 z-10 flex items-center justify-between px-6 py-4 bg-[#070c17]/95 backdrop-blur-md border-b border-slate-800">
          <div className="flex items-center gap-2">
            <span className={`px-2.5 py-0.5 rounded-full text-xs font-mono font-semibold border ${categoryInfo.color}`}>
              {categoryInfo.label}
            </span>
            <span className="text-slate-500 text-xs hidden sm:inline">•</span>
            <span className="text-xs text-slate-400 hidden sm:inline flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-amber-400 inline" /> {article.readTimeMinutes} min de leitura
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-slate-300 transition-colors border border-slate-700"
              title="Copiar link"
            >
              {copied ? <CheckCircle className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5 text-slate-400" />}
              <span>{copied ? 'Copiado!' : 'Compartilhar'}</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-10 space-y-8">
          
          {/* Title & Metadata */}
          <div>
            <h1 className="text-2xl sm:text-4xl font-bold font-display text-white leading-tight mb-4">
              {article.title}
            </h1>

            <div className="flex flex-wrap items-center justify-between gap-4 py-3 border-y border-slate-800/80 text-xs text-slate-400">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-amber-600 to-amber-400 flex items-center justify-center font-bold text-slate-950 text-xs shadow">
                  EM
                </div>
                <div>
                  <div className="font-semibold text-slate-200">{article.author.name}</div>
                  <div className="text-[11px] text-slate-400">{article.author.role}</div>
                </div>
              </div>

              <div className="flex items-center gap-4 font-mono text-[11px]">
                <span>Publicado em: {article.publishedAt}</span>
                <span className="flex items-center gap-1 text-slate-400">
                  <Eye className="w-3.5 h-3.5 text-blue-400" /> {article.views} visualizações
                </span>
              </div>
            </div>
          </div>

          {/* Technical Specs Banner if available */}
          {article.technicalMetadata && (
            <div className="p-4 rounded-xl bg-gradient-to-r from-slate-900 via-[#0d182e] to-slate-900 border border-slate-800 text-xs font-mono">
              <div className="flex items-center gap-2 text-amber-300 font-bold uppercase tracking-wider mb-2.5">
                <Wrench className="w-4 h-4 text-amber-400" />
                Especificações Técnicas de Montagem & Ensaio
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-slate-300">
                {article.technicalMetadata.boltStandard && (
                  <div>
                    <span className="text-slate-500 block text-[10px]">Fixador/Bitola:</span>
                    <strong className="text-white">{article.technicalMetadata.boltStandard}</strong>
                  </div>
                )}
                {article.technicalMetadata.torqueRange && (
                  <div>
                    <span className="text-slate-500 block text-[10px]">Alvo de Torque:</span>
                    <strong className="text-amber-300">{article.technicalMetadata.torqueRange}</strong>
                  </div>
                )}
                {article.technicalMetadata.jointType && (
                  <div>
                    <span className="text-slate-500 block text-[10px]">Comportamento da Junta:</span>
                    <strong className="text-blue-300">{article.technicalMetadata.jointType}</strong>
                  </div>
                )}
                {article.technicalMetadata.criticality && (
                  <div>
                    <span className="text-slate-500 block text-[10px]">Grau de Criticidade:</span>
                    <strong className="text-emerald-300">{article.technicalMetadata.criticality}</strong>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Summary Quote Box */}
          <div className="p-4 rounded-xl bg-slate-900/60 border-l-4 border-amber-400 text-slate-300 text-sm italic leading-relaxed">
            "{article.summary}"
          </div>

          {/* Article Main Text Content */}
          <div className="prose prose-invert max-w-none text-slate-200 text-base leading-relaxed space-y-5">
            {article.content.split('\n\n').map((block, idx) => {
              // Markdown Heading 2
              if (block.startsWith('## ')) {
                return (
                  <h2 key={idx} className="text-xl sm:text-2xl font-bold font-display text-white mt-8 mb-3 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-amber-400" />
                    {block.replace('## ', '')}
                  </h2>
                );
              }
              // Markdown Heading 3
              if (block.startsWith('### ')) {
                return (
                  <h3 key={idx} className="text-lg font-bold font-display text-amber-200 mt-6 mb-2">
                    {block.replace('### ', '')}
                  </h3>
                );
              }
              // Divider
              if (block.trim() === '---') {
                return <hr key={idx} className="border-slate-800 my-6" />;
              }
              // Bullet lists
              if (block.startsWith('- ')) {
                return (
                  <ul key={idx} className="list-disc list-inside space-y-1.5 pl-2 text-slate-300 text-sm">
                    {block.split('\n').map((item, itemIdx) => (
                      <li key={itemIdx} className="leading-relaxed">
                        {item.replace(/^- /, '')}
                      </li>
                    ))}
                  </ul>
                );
              }
              // Numbered lists
              if (/^\d+\./.test(block)) {
                return (
                  <ol key={idx} className="list-decimal list-inside space-y-1.5 pl-2 text-slate-300 text-sm">
                    {block.split('\n').map((item, itemIdx) => (
                      <li key={itemIdx} className="leading-relaxed">
                        {item.replace(/^\d+\.\s*/, '')}
                      </li>
                    ))}
                  </ol>
                );
              }
              // Standard paragraph
              return (
                <p key={idx} className="text-slate-300 text-sm sm:text-base leading-relaxed">
                  {block}
                </p>
              );
            })}
          </div>

          {/* Tags */}
          <div className="flex flex-wrap items-center gap-2 pt-4 border-t border-slate-800">
            <span className="text-xs text-slate-400 flex items-center gap-1 font-mono">
              <Tag className="w-3 h-3 text-amber-400" /> Tópicos:
            </span>
            {article.tags.map((tag) => (
              <span key={tag} className="text-xs px-2.5 py-1 rounded-md bg-slate-800/80 border border-slate-700/60 text-slate-300">
                #{tag}
              </span>
            ))}
          </div>

          {/* Like / Clap Interaction */}
          <div className="flex items-center justify-between p-4 rounded-xl bg-[#070c17] border border-slate-800">
            <div className="text-xs text-slate-400">
              Achou este estudo ou tutorial útil para o seu trabalho?
            </div>
            <button
              onClick={() => onLikeArticle(article.id)}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-amber-300 text-xs font-bold transition-all active:scale-95 group"
            >
              <ThumbsUp className="w-4 h-4 group-hover:scale-110 transition-transform text-amber-400" />
              <span>Apoiar Estudo ({article.likes})</span>
            </button>
          </div>

          {/* Interactive Comments Section */}
          <CommentSection
            articleId={article.id}
            articleTitle={article.title}
            comments={articleComments}
            onAddComment={onAddComment}
            onAddReply={onAddReply}
            onLikeComment={onLikeComment}
          />

        </div>
      </div>
    </div>
  );
};
