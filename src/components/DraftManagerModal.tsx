import React, { useState, useId } from 'react';
import { Article, ArticleCategory, ArticleType } from '../types';
import { X, FileText, CheckCircle2, Eye, Plus, Sparkles, Send, Tag, AlertCircle, Wrench, Clock } from 'lucide-react';

interface DraftManagerModalProps {
  isOpen: boolean;
  onClose: () => void;
  articles: Article[];
  onSaveArticle: (article: Article) => void;
  onPublishArticle: (articleId: string) => void;
  onDeleteArticle: (articleId: string) => void;
}

export const DraftManagerModal: React.FC<DraftManagerModalProps> = ({
  isOpen,
  onClose,
  articles,
  onSaveArticle,
  onPublishArticle,
  onDeleteArticle,
}) => {
  const drafts = articles.filter(a => a.isDraft);
  const published = articles.filter(a => !a.isDraft);

  const [selectedArticleId, setSelectedArticleId] = useState<string>(drafts[0]?.id || 'new');
  const [activeTab, setActiveTab] = useState<'drafts' | 'all'>('drafts');

  // Form State
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [category, setCategory] = useState<ArticleCategory>('torque');
  const [type, setType] = useState<ArticleType>('artigo');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState('');
  const [readTime, setReadTime] = useState(5);
  const [boltStandard, setBoltStandard] = useState('');
  const [torqueRange, setTorqueRange] = useState('');
  const [jointType, setJointType] = useState<'Junta Rígida (Hard)' | 'Junta Flexível (Soft)' | 'Junta Média'>('Junta Rígida (Hard)');
  const [criticality, setCriticality] = useState<'Classe A (Crítico/Segurança)' | 'Classe B (Funcional)' | 'Classe C (Geral)'>('Classe A (Crítico/Segurança)');
  
  const [previewMode, setPreviewMode] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Generate unique IDs for accessibility
  const editTitleId = useId();
  const editCategoryId = useId();
  const editTypeId = useId();
  const editReadTimeId = useId();
  const editSummaryId = useId();
  const editBoltStandardId = useId();
  const editTorqueRangeId = useId();
  const editJointTypeId = useId();
  const editCriticalityId = useId();
  const editTagsId = useId();
  const editContentId = useId();

  // Populate form when selecting an article
  const handleSelectArticle = (art: Article) => {
    setSelectedArticleId(art.id);
    setTitle(art.title);
    setSummary(art.summary);
    setCategory(art.category);
    setType(art.type);
    setContent(art.content);
    setTags(art.tags.join(', '));
    setReadTime(art.readTimeMinutes);
    setBoltStandard(art.technicalMetadata?.boltStandard || '');
    setTorqueRange(art.technicalMetadata?.torqueRange || '');
    setJointType(art.technicalMetadata?.jointType || 'Junta Rígida (Hard)');
    setCriticality(art.technicalMetadata?.criticality || 'Classe A (Crítico/Segurança)');
    setPreviewMode(false);
  };

  const handleCreateNew = () => {
    setSelectedArticleId('new');
    setTitle('');
    setSummary('');
    setCategory('tutoriais');
    setType('tutorial');
    setContent(`## Introdução Técnica

Descreva aqui o problema de engenharia ou o procedimento de montagem...

### 1. Parâmetros e Variáveis de Contorno
- Fixador: M10 Classe 10.9
- Coeficiente de atrito estimado: 0.12
- Ferramenta utilizada: Apertadeira Eletrônica com sensor angular

### 2. Procedimento de Teste / Resultados de Linha
Explique o passo a passo com números reais, medições e lições aprendidas.`);
    setTags('Aperto, Metrologia, Indústria 4.0');
    setReadTime(6);
    setBoltStandard('M10 Classe 10.9');
    setTorqueRange('45 N.m');
    setJointType('Junta Rígida (Hard)');
    setCriticality('Classe A (Crítico/Segurança)');
    setPreviewMode(false);
  };

  // Initial load if selectedArticleId matches
  React.useEffect(() => {
    if (selectedArticleId === 'new') {
      handleCreateNew();
    } else {
      const art = articles.find(a => a.id === selectedArticleId);
      if (art) {
        handleSelectArticle(art);
      }
    }
  }, [selectedArticleId, isOpen]);

  if (!isOpen) return null;

  const currentArticle = articles.find(a => a.id === selectedArticleId);
  const isCurrentlyDraft = currentArticle ? currentArticle.isDraft : true;

  const handleSave = (publishImmediately = false) => {
    if (!title.trim()) {
      alert('Por favor insira um título para o artigo.');
      return;
    }

    const tagList = tags.split(',').map(t => t.trim()).filter(Boolean);

    const updatedArticle: Article = {
      id: selectedArticleId === 'new' ? `art-${Date.now()}` : selectedArticleId,
      title: title.trim(),
      slug: title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
      category,
      type,
      summary: summary.trim() || 'Sem resumo cadastrado.',
      content,
      readTimeMinutes: Number(readTime) || 5,
      publishedAt: new Date().toISOString().split('T')[0],
      isDraft: !publishImmediately,
      author: {
        name: 'Eng. Mecânico & Especialista em Aperto',
        role: 'Especialista em Metrologia de Torque & Indústria 4.0'
      },
      tags: tagList.length > 0 ? tagList : ['Engenharia Mecânica', 'Torque'],
      likes: currentArticle?.likes || 0,
      views: currentArticle?.views || 1,
      commentsCount: currentArticle?.commentsCount || 0,
      technicalMetadata: {
        boltStandard: boltStandard || undefined,
        torqueRange: torqueRange || undefined,
        jointType: jointType || undefined,
        criticality: criticality || undefined,
      }
    };

    onSaveArticle(updatedArticle);
    setSelectedArticleId(updatedArticle.id);
    setSuccessMessage(publishImmediately ? 'Artigo publicado com sucesso no site!' : 'Rascunho salvo com sucesso!');
    setTimeout(() => setSuccessMessage(null), 3500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-sm overflow-y-auto">
      <div className="bg-[#0b1426] border border-slate-700/80 rounded-2xl w-full max-w-6xl max-h-[92vh] flex flex-col shadow-2xl relative overflow-hidden">
        
        {/* Modal Topbar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-[#070d1a]">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold font-display text-white flex items-center gap-2">
                Gerenciador de Artigos & Rascunhos Não Publicados
              </h2>
              <p className="text-xs text-slate-400">
                Organize seus posts pendentes, estruture os dados técnicos e publique diretamente no portal.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Feedback Alert */}
        {successMessage && (
          <div className="bg-emerald-950/80 border-b border-emerald-500/40 px-6 py-2.5 flex items-center gap-2 text-emerald-300 text-xs font-semibold">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            {successMessage}
          </div>
        )}

        {/* Main Body: 2 Columns */}
        <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
          
          {/* Left Sidebar: List of Drafts & Published */}
          <div className="w-full md:w-80 border-r border-slate-800 bg-[#080f1e] flex flex-col overflow-y-auto shrink-0">
            <div className="p-4 border-b border-slate-800/80 space-y-3">
              <button
                onClick={handleCreateNew}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/40 text-amber-300 font-semibold text-xs transition-all shadow-sm"
              >
                <Plus className="w-4 h-4" />
                Criar Novo Artigo / Estudo
              </button>

              {/* Tabs */}
              <div className="flex rounded-lg bg-slate-900 p-1 border border-slate-800 text-xs">
                <button
                  onClick={() => setActiveTab('drafts')}
                  className={`flex-1 py-1.5 rounded-md font-medium transition-all ${
                    activeTab === 'drafts' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Rascunhos ({drafts.length})
                </button>
                <button
                  onClick={() => setActiveTab('all')}
                  className={`flex-1 py-1.5 rounded-md font-medium transition-all ${
                    activeTab === 'all' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Todos ({articles.length})
                </button>
              </div>
            </div>

            {/* List */}
            <div className="p-3 space-y-2 overflow-y-auto flex-1">
              {(activeTab === 'drafts' ? drafts : articles).map((art) => {
                const isSelected = selectedArticleId === art.id;
                return (
                  <button
                    key={art.id}
                    onClick={() => handleSelectArticle(art)}
                    className={`w-full text-left p-3 rounded-xl border transition-all ${
                      isSelected
                        ? 'bg-amber-500/10 border-amber-500/50 shadow-md'
                        : 'bg-slate-900/50 border-slate-800/60 hover:bg-slate-800/50 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-1 mb-1">
                      <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded font-bold uppercase ${
                        art.isDraft ? 'bg-rose-500/20 text-rose-300' : 'bg-emerald-500/20 text-emerald-300'
                      }`}>
                        {art.isDraft ? 'Rascunho' : 'Publicado'}
                      </span>
                      <span className="text-[10px] text-slate-500 font-mono">{art.readTimeMinutes} min</span>
                    </div>
                    <div className="text-xs font-semibold text-slate-200 line-clamp-2 leading-snug">
                      {art.title}
                    </div>
                    <div className="text-[11px] text-slate-500 line-clamp-1 mt-1">
                      {art.summary}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Area: Editor / Preview Form */}
          <div className="flex-1 flex flex-col overflow-y-auto bg-[#0b1426] p-6 space-y-5">
            
            {/* Action Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-400 font-mono">Status Atual:</span>
                <span className={`text-xs px-2.5 py-1 rounded-full font-bold uppercase tracking-wider ${
                  isCurrentlyDraft ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30' : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                }`}>
                  {isCurrentlyDraft ? 'Em Elaboração (Rascunho)' : 'Artigo Publicado no Site'}
                </span>
              </div>

              <div className="flex items-center gap-2.5">
                {selectedArticleId !== 'new' && (
                  <button
                    type="button"
                    onClick={() => {
                      if (confirm('Tem certeza que deseja excluir este artigo? Esta ação não pode ser desfeita.')) {
                        onDeleteArticle(selectedArticleId);
                        handleCreateNew();
                      }
                    }}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-rose-950/30 hover:bg-rose-900/40 text-xs font-medium text-rose-400 border border-rose-900/50 transition-colors"
                  >
                    Excluir
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => setPreviewMode(!previewMode)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-300 border border-slate-700 transition-colors"
                >
                  <Eye className="w-3.5 h-3.5 text-amber-400" />
                  {previewMode ? 'Modo Edição' : 'Pré-visualizar Formatação'}
                </button>

                <button
                  type="button"
                  onClick={() => handleSave(false)}
                  className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-amber-300 border border-amber-500/30 transition-colors"
                >
                  Salvar Rascunho
                </button>

                <button
                  type="button"
                  onClick={() => handleSave(true)}
                  className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 text-xs font-bold transition-all shadow-md shadow-amber-500/20 active:scale-95"
                >
                  <Send className="w-3.5 h-3.5" />
                  Publicar Artigo
                </button>
              </div>
            </div>

            {previewMode ? (
              /* Live Preview */
              <div className="p-6 bg-[#070d18] border border-slate-800 rounded-xl">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-mono text-amber-400 uppercase tracking-wider">{category}</span>
                  <span className="text-slate-600">•</span>
                  <span className="text-xs text-slate-400">{readTime} min de leitura</span>
                </div>
                <h1 className="text-2xl font-bold font-display text-white mb-3">{title || 'Título do Artigo'}</h1>
                <p className="text-sm text-slate-300 italic border-l-2 border-amber-500 pl-3 mb-6">{summary || 'Resumo executivo do artigo...'}</p>
                
                {boltStandard && (
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 p-3 bg-slate-900 rounded-lg border border-slate-800 text-xs mb-6 font-mono">
                    <div><span className="text-slate-500 block">Fixador:</span> <strong className="text-amber-300">{boltStandard}</strong></div>
                    <div><span className="text-slate-500 block">Torque:</span> <strong className="text-blue-300">{torqueRange}</strong></div>
                    <div><span className="text-slate-500 block">Junta:</span> <strong className="text-slate-200">{jointType}</strong></div>
                    <div><span className="text-slate-500 block">Criticidade:</span> <strong className="text-emerald-300">{criticality}</strong></div>
                  </div>
                )}

                <div className="prose prose-invert max-w-none text-slate-300 text-sm leading-relaxed whitespace-pre-line font-sans">
                  {content}
                </div>
              </div>
            ) : (
              /* Editor Fields */
              <div className="space-y-4">
                {/* Title */}
                <div>
                  <label htmlFor={editTitleId} className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">
                    Título Técnico do Artigo / Tutorial *
                  </label>
                  <input
                    id={editTitleId}
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Ex: Auditoria de Aperto Dinâmico segundo ISO 5393 e Metodologia VDI"
                    className="w-full bg-[#070c17] border border-slate-700 focus:border-amber-400 rounded-xl px-4 py-2.5 text-white font-semibold text-sm outline-none"
                  />
                </div>

                {/* Category, Type, Read Time */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label htmlFor={editCategoryId} className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">
                      Categoria Temática
                    </label>
                    <select
                      id={editCategoryId}
                      value={category}
                      onChange={(e) => setCategory(e.target.value as any)}
                      className="w-full bg-[#070c17] border border-slate-700 rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-amber-400"
                    >
                      <option value="torque">Aperto Crítico & Torque</option>
                      <option value="industria40">Indústria 4.0 & Rastreabilidade</option>
                      <option value="automacao">Automação & Redes Industriais</option>
                      <option value="tutoriais">Tutoriais Práticos</option>
                      <option value="estudos_caso">Estudos de Caso</option>
                      <option value="historias_campo">Histórias do Cotidiano / Blog</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor={editTypeId} className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">
                      Formato de Conteúdo
                    </label>
                    <select
                      id={editTypeId}
                      value={type}
                      onChange={(e) => setType(e.target.value as any)}
                      className="w-full bg-[#070c17] border border-slate-700 rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-amber-400"
                    >
                      <option value="artigo">Artigo Técnico Aprofundado</option>
                      <option value="tutorial">Tutorial Prático Passo a Passo</option>
                      <option value="estudo_caso">Estudo de Caso Industrial</option>
                      <option value="historia_campo">História de Chão de Fábrica (Blog)</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor={editReadTimeId} className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">
                      Tempo Estimado (Minutos)
                    </label>
                    <input
                      id={editReadTimeId}
                      type="number"
                      min="1"
                      max="45"
                      value={readTime}
                      onChange={(e) => setReadTime(parseInt(e.target.value, 10) || 5)}
                      className="w-full bg-[#070c17] border border-slate-700 rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-amber-400"
                    />
                  </div>
                </div>

                {/* Summary */}
                <div>
                  <label htmlFor={editSummaryId} className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">
                    Resumo Executivo (Exibido nos Cards de Destaque)
                  </label>
                  <textarea
                    id={editSummaryId}
                    rows={2}
                    value={summary}
                    onChange={(e) => setSummary(e.target.value)}
                    placeholder="Breve resumo destacando o problema enfrentado e o resultado prático..."
                    className="w-full bg-[#070c17] border border-slate-700 rounded-xl p-3 text-xs text-white outline-none focus:border-amber-400"
                  />
                </div>

                {/* Technical Metadata Box (Fastener, Torque, Joint) */}
                <div className="p-3.5 bg-slate-900/60 border border-slate-800 rounded-xl space-y-3">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-amber-300 uppercase tracking-wider">
                    <Wrench className="w-3.5 h-3.5" />
                    Parâmetros de Engenharia Relacionados
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                    <div>
                      <label htmlFor={editBoltStandardId} className="block text-[11px] text-slate-400 mb-1">Fixador / Rosca</label>
                      <input
                        id={editBoltStandardId}
                        type="text"
                        value={boltStandard}
                        onChange={(e) => setBoltStandard(e.target.value)}
                        placeholder="Ex: M12x1.5 Classe 10.9"
                        className="w-full bg-[#070c17] border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-white outline-none"
                      />
                    </div>
                    <div>
                      <label htmlFor={editTorqueRangeId} className="block text-[11px] text-slate-400 mb-1">Torque / Ângulo</label>
                      <input
                        id={editTorqueRangeId}
                        type="text"
                        value={torqueRange}
                        onChange={(e) => setTorqueRange(e.target.value)}
                        placeholder="Ex: 55 N.m + 45°"
                        className="w-full bg-[#070c17] border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-white outline-none"
                      />
                    </div>
                    <div>
                      <label htmlFor={editJointTypeId} className="block text-[11px] text-slate-400 mb-1">Tipo de Junta</label>
                      <select
                        id={editJointTypeId}
                        value={jointType}
                        onChange={(e) => setJointType(e.target.value as any)}
                        className="w-full bg-[#070c17] border border-slate-800 rounded-lg px-2 py-1.5 text-xs text-white outline-none"
                      >
                        <option value="Junta Rígida (Hard)">Junta Rígida (Hard)</option>
                        <option value="Junta Média">Junta Média</option>
                        <option value="Junta Flexível (Soft)">Junta Flexível (Soft)</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor={editCriticalityId} className="block text-[11px] text-slate-400 mb-1">Criticidade</label>
                      <select
                        id={editCriticalityId}
                        value={criticality}
                        onChange={(e) => setCriticality(e.target.value as any)}
                        className="w-full bg-[#070c17] border border-slate-800 rounded-lg px-2 py-1.5 text-xs text-white outline-none"
                      >
                        <option value="Classe A (Crítico/Segurança)">Classe A (Segurança/Vida)</option>
                        <option value="Classe B (Funcional)">Classe B (Funcional)</option>
                        <option value="Classe C (Geral)">Classe C (Geral)</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Tags */}
                <div>
                  <label htmlFor={editTagsId} className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">
                    Tags Separadas por Vírgula
                  </label>
                  <input
                    id={editTagsId}
                    type="text"
                    value={tags}
                    onChange={(e) => setTags(e.target.value)}
                    placeholder="Ex: VDI 2230, Torque-Ângulo, IATF 16949, CLP Siemens"
                    className="w-full bg-[#070c17] border border-slate-700 rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-amber-400"
                  />
                </div>

                {/* Markdown Content */}
                <div>
                  <label htmlFor={editContentId} className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">
                    Conteúdo Completo (Suporta formatação técnica e títulos ##)
                  </label>
                  <textarea
                    id={editContentId}
                    rows={10}
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="w-full bg-[#070c17] border border-slate-700 rounded-xl p-4 font-mono text-xs text-slate-200 outline-none focus:border-amber-400 leading-relaxed resize-y"
                  />
                </div>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};
