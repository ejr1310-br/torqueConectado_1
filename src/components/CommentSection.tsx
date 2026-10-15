import React, { useState, useId } from 'react';
import { CommentItem } from '../types';
import { MessageSquare, ThumbsUp, Reply, Send, ShieldCheck, UserCheck, Sparkles } from 'lucide-react';

interface CommentSectionProps {
  articleId: string;
  articleTitle: string;
  comments: CommentItem[];
  onAddComment: (comment: Omit<CommentItem, 'id' | 'createdAt' | 'likes'>) => void;
  onAddReply: (parentCommentId: string, reply: Omit<CommentItem, 'id' | 'createdAt' | 'likes'>) => void;
  onLikeComment: (commentId: string) => void;
}

export const CommentSection: React.FC<CommentSectionProps> = ({
  articleId,
  articleTitle,
  comments,
  onAddComment,
  onAddReply,
  onLikeComment,
}) => {
  const [authorName, setAuthorName] = useState('');
  const [authorRole, setAuthorRole] = useState('');
  const [content, setContent] = useState('');
  const [replyingToId, setReplyingToId] = useState<string | null>(null);
  const [replyContent, setReplyContent] = useState('');
  const [replyAuthorName, setReplyAuthorName] = useState('');
  const [replyAuthorRole, setReplyAuthorRole] = useState('');

  // Generate unique IDs for accessibility
  const authorNameId = useId();
  const authorRoleId = useId();
  const contentId = useId();
  const replyAuthorNameId = useId();
  const replyAuthorRoleId = useId();
  const replyContentId = useId();

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!authorName.trim() || !content.trim()) return;

    onAddComment({
      articleId,
      authorName: authorName.trim(),
      authorRole: authorRole.trim() || 'Engenheiro / Técnico da Indústria',
      content: content.trim(),
      isVerifiedEngineer: true
    });

    setContent('');
  };

  const handleReplySubmit = (e: React.FormEvent, parentId: string) => {
    e.preventDefault();
    if (!replyAuthorName.trim() || !replyContent.trim()) return;

    onAddReply(parentId, {
      articleId,
      authorName: replyAuthorName.trim(),
      authorRole: replyAuthorRole.trim() || 'Profissional do Setor',
      content: replyContent.trim(),
      isVerifiedEngineer: true
    });

    setReplyingToId(null);
    setReplyContent('');
  };

  const formatDate = (isoString: string) => {
    try {
      const date = new Date(isoString);
      return date.toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
      });
    } catch {
      return 'Recentemente';
    }
  };

  return (
    <div className="mt-12 pt-8 border-t border-slate-800" id="comments-section">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h3 className="text-xl sm:text-2xl font-bold font-display text-white flex items-center gap-2.5">
            <MessageSquare className="w-5 h-5 text-amber-400" />
            Mesa de Debate Técnico & Comentários
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Espaço interativo para engenheiros mecânicos, técnicos e especialistas discutirem aplicações práticas, desafios e normas.
          </p>
        </div>
        <span className="px-3 py-1 bg-slate-800 text-amber-400 rounded-full text-xs font-mono font-bold border border-slate-700">
          {comments.length} {comments.length === 1 ? 'comentário' : 'comentários'}
        </span>
      </div>

      {/* New Comment Form */}
      <form onSubmit={handleSubmitComment} className="bg-[#091222] border border-slate-800/90 rounded-2xl p-5 sm:p-6 mb-8 shadow-inner">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-300 mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          Participar da Discussão Técnica
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
          <div>
            <label htmlFor={authorNameId} className="block text-xs font-medium text-slate-400 mb-1">Seu Nome / Apelido *</label>
            <input
              id={authorNameId}
              type="text"
              required
              value={authorName}
              onChange={(e) => setAuthorName(e.target.value)}
              placeholder="Ex: Carlos Mendes"
              className="w-full bg-[#060b14] border border-slate-800 focus:border-amber-400 focus:ring-1 focus:ring-amber-400 rounded-xl px-3.5 py-2 text-sm text-white placeholder-slate-600 outline-none"
            />
          </div>
          <div>
            <label htmlFor={authorRoleId} className="block text-xs font-medium text-slate-400 mb-1">Seu Cargo / Empresa / Formação</label>
            <input
              id={authorRoleId}
              type="text"
              value={authorRole}
              onChange={(e) => setAuthorRole(e.target.value)}
              placeholder="Ex: Engenheiro de Processos / Montadora"
              className="w-full bg-[#060b14] border border-slate-800 focus:border-amber-400 focus:ring-1 focus:ring-amber-400 rounded-xl px-3.5 py-2 text-sm text-white placeholder-slate-600 outline-none"
            />
          </div>
        </div>

        <div className="mb-4">
          <label htmlFor={contentId} className="block text-xs font-medium text-slate-400 mb-1">Sua Pergunta ou Contribuição Prática *</label>
          <textarea
            id={contentId}
            required
            rows={3}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Compartilhe uma dúvida técnica, discordância construtiva ou experiência de campo relacionada a este artigo..."
            className="w-full bg-[#060b14] border border-slate-800 focus:border-amber-400 focus:ring-1 focus:ring-amber-400 rounded-xl p-3.5 text-sm text-white placeholder-slate-600 outline-none resize-y"
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="text-[11px] text-slate-500 flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            Comunidade moderada focada em engenharia e tecnologia
          </div>
          <button
            type="submit"
            className="inline-flex items-center gap-2 px-5 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 text-xs font-bold transition-all shadow-md shadow-amber-500/10 active:scale-95"
          >
            <Send className="w-3.5 h-3.5" />
            Publicar Comentário
          </button>
        </div>
      </form>

      {/* Comments List */}
      <div className="space-y-4">
        {comments.length === 0 ? (
          <div className="text-center py-8 text-slate-500 text-sm bg-slate-900/30 rounded-xl border border-dashed border-slate-800">
            Nenhum comentário técnico ainda. Seja o primeiro a iniciar o debate sobre este artigo!
          </div>
        ) : (
          comments.map((comment) => (
            <div key={comment.id} className="bg-[#0b1426] border border-slate-800/80 rounded-xl p-4 sm:p-5 transition-colors hover:border-slate-700/80">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-white text-sm">{comment.authorName}</span>
                    {comment.isVerifiedEngineer && (
                      <span className="inline-flex items-center gap-1 text-[10px] font-mono text-amber-300 bg-amber-500/10 border border-amber-500/30 px-1.5 py-0.5 rounded">
                        <UserCheck className="w-2.5 h-2.5" /> Técnico/Engenheiro
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-400 font-medium">{comment.authorRole}</p>
                </div>
                <span className="text-[11px] font-mono text-slate-500">{formatDate(comment.createdAt)}</span>
              </div>

              <div className="mt-3 text-slate-200 text-sm leading-relaxed whitespace-pre-line">
                {comment.content}
              </div>

              {/* Actions: Like, Reply */}
              <div className="mt-3 pt-3 border-t border-slate-800/60 flex items-center gap-4 text-xs">
                <button
                  type="button"
                  onClick={() => onLikeComment(comment.id)}
                  className="flex items-center gap-1.5 text-slate-400 hover:text-amber-400 transition-colors group"
                >
                  <ThumbsUp className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" />
                  <span>{comment.likes} {comment.likes === 1 ? 'Curtida' : 'Curtidas'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setReplyingToId(replyingToId === comment.id ? null : comment.id);
                    setReplyAuthorName(authorName);
                    setReplyAuthorRole(authorRole);
                  }}
                  className="flex items-center gap-1.5 text-slate-400 hover:text-blue-400 transition-colors"
                >
                  <Reply className="w-3.5 h-3.5" />
                  <span>Responder</span>
                </button>
              </div>

              {/* Reply form */}
              {replyingToId === comment.id && (
                <form onSubmit={(e) => handleReplySubmit(e, comment.id)} className="mt-4 p-3.5 bg-[#070d18] border border-slate-700/70 rounded-xl space-y-2.5">
                  <div className="text-xs font-semibold text-blue-300 flex items-center gap-1.5">
                    <Reply className="w-3 h-3" /> Respondendo a {comment.authorName}
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <input
                      id={replyAuthorNameId}
                      type="text"
                      placeholder="Seu Nome *"
                      required
                      value={replyAuthorName}
                      onChange={(e) => setReplyAuthorName(e.target.value)}
                      className="bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-white outline-none focus:border-blue-400"
                    />
                    <input
                      id={replyAuthorRoleId}
                      type="text"
                      placeholder="Seu Cargo / Empresa"
                      value={replyAuthorRole}
                      onChange={(e) => setReplyAuthorRole(e.target.value)}
                      className="bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-white outline-none focus:border-blue-400"
                    />
                  </div>
                  <textarea
                    id={replyContentId}
                    rows={2}
                    required
                    placeholder="Escreva sua réplica técnica..."
                    value={replyContent}
                    onChange={(e) => setReplyContent(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-xs text-white outline-none focus:border-blue-400 resize-none"
                  />
                  <div className="flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => setReplyingToId(null)}
                      className="px-3 py-1 text-xs text-slate-400 hover:text-white"
                    >
                      Cancelar
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-1 text-xs font-semibold bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition-colors"
                    >
                      Enviar Resposta
                    </button>
                  </div>
                </form>
              )}

              {/* Nested Replies */}
              {comment.replies && comment.replies.length > 0 && (
                <div className="mt-3 pl-4 sm:pl-6 border-l-2 border-slate-800 space-y-3 pt-2">
                  {comment.replies.map((reply) => (
                    <div key={reply.id} className="bg-slate-900/50 p-3 rounded-lg border border-slate-800/60">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-slate-200 text-xs">{reply.authorName}</span>
                          <span className="text-[10px] text-amber-300 font-mono">({reply.authorRole})</span>
                        </div>
                        <span className="text-[10px] font-mono text-slate-500">{formatDate(reply.createdAt)}</span>
                      </div>
                      <p className="text-xs text-slate-300 mt-1.5 leading-relaxed">{reply.content}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};
