import React, { useState, useEffect } from 'react';
import { Article, CommentItem } from './types';
import { INITIAL_ARTICLES, INITIAL_COMMENTS, INITIAL_PROJECTS } from './data/initialData';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ArticleCard } from './components/ArticleCard';
import { ArticleDetailModal } from './components/ArticleDetailModal';
import { TorqueCalculator } from './components/TorqueCalculator';
import { ProjectsSection } from './components/ProjectsSection';
import { SkillsSection } from './components/SkillsSection';
import { DraftManagerModal } from './components/DraftManagerModal';
import { ContactModal } from './components/ContactModal';
import { CalculatorInfoModal } from './components/CalculatorInfoModal';
import { 
  Search, 
  Filter, 
  BookOpen, 
  Sparkles, 
  FileEdit, 
  CheckCircle2, 
  Wrench, 
  ArrowRight, 
  MessageSquare,
  ChevronDown
} from 'lucide-react';

const STORAGE_ARTICLES_KEY = 'torque_portal_articles_v2';
const STORAGE_COMMENTS_KEY = 'torque_portal_comments_v2';

export default function App() {
  // Load initial articles with fallback to localStorage
  const [articles, setArticles] = useState<Article[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_ARTICLES_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Failed to load articles from storage', e);
    }
    return INITIAL_ARTICLES;
  });

  // Load initial comments with fallback to localStorage
  const [comments, setComments] = useState<CommentItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_COMMENTS_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Failed to load comments from storage', e);
    }
    return INITIAL_COMMENTS;
  });

  // Persist articles when changed
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_ARTICLES_KEY, JSON.stringify(articles));
    } catch (e) {
      console.error('Failed to persist articles', e);
    }
  }, [articles]);

  // Persist comments when changed
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_COMMENTS_KEY, JSON.stringify(comments));
    } catch (e) {
      console.error('Failed to persist comments', e);
    }
  }, [comments]);

  // Modals & Active items
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [isDraftManagerOpen, setIsDraftManagerOpen] = useState(false);
  const [isCalculatorInfoOpen, setIsCalculatorInfoOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);

  // Search & Filter state
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const publishedArticles = articles.filter(a => !a.isDraft);
  const draftArticles = articles.filter(a => a.isDraft);

  // Filtered published articles
  const filteredArticles = publishedArticles.filter(art => {
    const matchesCategory = 
      activeCategory === 'all' 
        ? true 
        : art.category === activeCategory;

    const query = searchQuery.toLowerCase().trim();
    const matchesQuery = 
      !query ||
      art.title.toLowerCase().includes(query) ||
      art.summary.toLowerCase().includes(query) ||
      art.tags.some(t => t.toLowerCase().includes(query)) ||
      (art.technicalMetadata?.boltStandard && art.technicalMetadata.boltStandard.toLowerCase().includes(query));

    return matchesCategory && matchesQuery;
  });

  // Featured articles for top row
  const featuredArticles = publishedArticles.filter(a => a.featured);

  // Handlers
  const handleSaveArticle = (updatedArticle: Article) => {
    setArticles(prev => {
      const exists = prev.some(a => a.id === updatedArticle.id);
      if (exists) {
        return prev.map(a => a.id === updatedArticle.id ? updatedArticle : a);
      }
      return [updatedArticle, ...prev];
    });

    if (selectedArticle?.id === updatedArticle.id) {
      setSelectedArticle(updatedArticle);
    }
  };

  const handlePublishArticle = (articleId: string) => {
    setArticles(prev => 
      prev.map(a => a.id === articleId ? { ...a, isDraft: false } : a)
    );
  };

  const handleDeleteArticle = (articleId: string) => {
    setArticles(prev => prev.filter(a => a.id !== articleId));
  };

  const handleLikeArticle = (articleId: string) => {
    setArticles(prev => 
      prev.map(a => a.id === articleId ? { ...a, likes: a.likes + 1 } : a)
    );
    if (selectedArticle?.id === articleId) {
      setSelectedArticle(prev => prev ? { ...prev, likes: prev.likes + 1 } : null);
    }
  };

  const handleAddComment = (commentData: Omit<CommentItem, 'id' | 'createdAt' | 'likes'>) => {
    const newComment: CommentItem = {
      ...commentData,
      id: `comm-${Date.now()}`,
      createdAt: new Date().toISOString(),
      likes: 0,
      replies: []
    };

    setComments(prev => [newComment, ...prev]);

    // increment comment count in article
    setArticles(prev => 
      prev.map(a => a.id === commentData.articleId ? { ...a, commentsCount: a.commentsCount + 1 } : a)
    );

    if (selectedArticle?.id === commentData.articleId) {
      setSelectedArticle(prev => prev ? { ...prev, commentsCount: prev.commentsCount + 1 } : null);
    }
  };

  const handleAddReply = (parentCommentId: string, replyData: Omit<CommentItem, 'id' | 'createdAt' | 'likes'>) => {
    const newReply: CommentItem = {
      ...replyData,
      id: `rep-${Date.now()}`,
      createdAt: new Date().toISOString(),
      likes: 0
    };

    setComments(prev => 
      prev.map(c => {
        if (c.id === parentCommentId) {
          return {
            ...c,
            replies: [...(c.replies || []), newReply]
          };
        }
        return c;
      })
    );
  };

  const handleLikeComment = (commentId: string) => {
    setComments(prev => 
      prev.map(c => {
        if (c.id === commentId) {
          return { ...c, likes: c.likes + 1 };
        }
        if (c.replies) {
          return {
            ...c,
            replies: c.replies.map(r => r.id === commentId ? { ...r, likes: r.likes + 1 } : r)
          };
        }
        return c;
      })
    );
  };

  const scrollToCalculator = () => {
    const el = document.getElementById('torque-calculator-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToArticles = () => {
    const el = document.getElementById('artigos');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#070c17] text-slate-100 flex flex-col selection:bg-amber-500/30 selection:text-amber-200">
      
      {/* Navigation */}
      <Navbar
        draftsCount={draftArticles.length}
        onOpenDraftManager={() => setIsDraftManagerOpen(true)}
        onOpenContact={() => setIsContactOpen(true)}
        activeFilter={activeCategory}
        onSelectCategory={(cat) => setActiveCategory(cat)}
      />

      {/* Hero Section */}
      <Hero
        onOpenCalculator={scrollToCalculator}
        onExploreArticles={scrollToArticles}
        onExploreStories={() => {
          setActiveCategory('historias_campo');
          scrollToArticles();
        }}
      />

      {/* Notification Banner for Author: Unpublished Drafts quick access */}
      {draftArticles.length > 0 && (
        <div className="bg-gradient-to-r from-amber-500/10 via-amber-500/15 to-amber-500/10 border-y border-amber-500/30 py-3">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2.5 text-amber-200">
              <FileEdit className="w-4 h-4 text-amber-400 shrink-0" />
              <span>
                Você possui <strong>{draftArticles.length} postagens/rascunhos não publicados</strong> salvos na estrutura.
              </span>
            </div>
            <button
              onClick={() => setIsDraftManagerOpen(true)}
              className="px-3.5 py-1.5 rounded-lg bg-amber-500 text-slate-950 font-bold text-xs hover:bg-amber-400 transition-colors shadow-sm"
            >
              Organizar & Publicar Rascunhos
            </button>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <main className="flex-1">
        
        {/* Articles & Technical Publications Section */}
        <section id="artigos" className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-mono font-semibold tracking-wider uppercase mb-2">
                <BookOpen className="w-3.5 h-3.5 text-amber-400" />
                Artigos Técnicos, Tutoriais & Histórias
              </div>
              <h2 className="text-2xl sm:text-4xl font-bold font-display text-white">
                Qualidade do Aperto, VDI 2230 & Indústria 4.0
              </h2>
              <p className="text-slate-400 text-sm mt-1 max-w-2xl">
                Navegue pelas categorias técnicas, tutoriais de campo ou leia as histórias cotidianas do chão de fábrica.
              </p>
            </div>

            {/* Search Input */}
            <div className="relative w-full md:w-72">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar por parafuso, norma, tema..."
                className="w-full bg-[#0b1426] border border-slate-700/80 focus:border-amber-400 focus:ring-1 focus:ring-amber-400 rounded-xl pl-10 pr-4 py-2 text-xs text-white placeholder-slate-500 outline-none"
              />
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
            {[
              { id: 'all', label: 'Todos os Artigos' },
              { id: 'industria40', label: 'Indústria 4.0 & Rastreabilidade' },
              { id: 'torque', label: 'Aperto Crítico & Torque' },
              { id: 'tutoriais', label: 'Tutoriais Práticos' },
              { id: 'historias_campo', label: 'Histórias do Cotidiano (Blog)' },
              { id: 'automacao', label: 'Automação & PLC' },
              { id: 'estudos_caso', label: 'Estudos de Caso' },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all border ${
                  activeCategory === cat.id
                    ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 border-amber-400 shadow-md shadow-amber-500/10'
                    : 'bg-[#0b1426] text-slate-300 border-slate-800 hover:border-slate-700 hover:text-white'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Articles Grid */}
          {filteredArticles.length === 0 ? (
            <div className="text-center py-16 bg-[#0b1426]/50 rounded-2xl border border-dashed border-slate-800">
              <Wrench className="w-8 h-8 text-slate-600 mx-auto mb-3" />
              <h3 className="text-base font-bold text-white mb-1">Nenhum artigo encontrado</h3>
              <p className="text-xs text-slate-400 max-w-sm mx-auto mb-4">
                Tente ajustar os termos de busca ou selecionar outra categoria temática.
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setActiveCategory('all');
                }}
                className="px-4 py-2 rounded-xl bg-slate-800 text-xs text-amber-300 font-semibold hover:bg-slate-700 transition-colors"
              >
                Limpar Filtros
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredArticles.map((article) => (
                <ArticleCard
                  key={article.id}
                  article={article}
                  onSelect={(art) => setSelectedArticle(art)}
                  onLike={handleLikeArticle}
                />
              ))}
            </div>
          )}

        </section>

        {/* Interactive Fastening Calculator Suite */}
        <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <TorqueCalculator onOpenInfo={() => setIsCalculatorInfoOpen(true)} />
        </section>

        {/* Real-world Projects Section */}
        <ProjectsSection projects={INITIAL_PROJECTS} />

        {/* Technical Skills & Metrology Matrix */}
        <SkillsSection />

      </main>

      {/* Footer */}
      <footer className="bg-[#050912] border-t border-slate-800/80 pt-16 pb-12 text-slate-400 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-12 border-b border-slate-800/80">
            
            {/* Col 1: Brand Info */}
            <div className="md:col-span-2 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-slate-900 to-[#0e1f3d] border border-amber-500/40 flex items-center justify-center">
                  <Wrench className="w-4 h-4 text-amber-400" />
                </div>
                <span className="text-base font-bold font-display text-white tracking-tight">
                  TORQUE & AUTOMAÇÃO 4.0
                </span>
              </div>
              <p className="text-slate-400 text-xs leading-relaxed max-w-md">
                Plataforma técnica independente focada na difusão da engenharia de aperto crítico, cálculo segundo a diretriz VDI 2230, integração de ferramentas elétricas inteligentes e qualidade zero-defeito na manufatura 4.0.
              </p>
              <div className="flex items-center gap-3 pt-2 text-[11px] font-mono text-amber-300">
                <span>• VDI 2230</span>
                <span>• ISO 5393</span>
                <span>• ISO 16047</span>
                <span>• Open Protocol TCP/IP</span>
              </div>
            </div>

            {/* Col 2: Navigation */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3">
                Navegação Rápida
              </h4>
              <ul className="space-y-2">
                <li>
                  <button onClick={scrollToArticles} className="hover:text-amber-300 transition-colors">
                    Artigos & Tutoriais
                  </button>
                </li>
                <li>
                  <button onClick={() => { setActiveCategory('historias_campo'); scrollToArticles(); }} className="hover:text-amber-300 transition-colors">
                    Histórias do Cotidiano (Blog)
                  </button>
                </li>
                <li>
                  <button onClick={scrollToCalculator} className="hover:text-amber-300 transition-colors">
                    Calculadora de Torque VDI 2230
                  </button>
                </li>
                <li>
                  <a href="#projetos" className="hover:text-amber-300 transition-colors">
                    Projetos & Células Robotizadas
                  </a>
                </li>
                <li>
                  <a href="#habilidades" className="hover:text-amber-300 transition-colors">
                    Matriz de Competências
                  </a>
                </li>
              </ul>
            </div>

            {/* Col 3: Community & Consultoria */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3">
                Comunidade & Contato
              </h4>
              <p className="text-[11px] text-slate-400 mb-3">
                Precisa auditar um processo de aperto crítico ou treinar sua equipe de engenharia e manutenção?
              </p>
              <button
                onClick={() => setIsContactOpen(true)}
                className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs transition-all shadow-md shadow-amber-500/10"
              >
                Solicitar Consultoria Técnica
              </button>
              <button
                onClick={() => setIsDraftManagerOpen(true)}
                className="w-full mt-2 py-2 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 text-[11px] font-semibold transition-colors flex items-center justify-center gap-1.5"
              >
                <FileEdit className="w-3.5 h-3.5 text-amber-400" />
                Gerenciar Rascunhos ({draftArticles.length})
              </button>
            </div>

          </div>

          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
            <div>
              © {new Date().getFullYear()} Engenharia de Torque & Automação 4.0. Desenvolvido para engenheiros e técnicos industriais.
            </div>
            <div className="font-mono text-[10px] text-slate-600">
              Paleta Oficial: Azul Marinho (#070c17 / #0b1426) • Grafite • Dourado Metálico
            </div>
          </div>
        </div>
      </footer>

      {/* Article Detail & Interactive Comments Modal */}
      <ArticleDetailModal
        article={selectedArticle}
        onClose={() => setSelectedArticle(null)}
        comments={comments}
        onLikeArticle={handleLikeArticle}
        onAddComment={handleAddComment}
        onAddReply={handleAddReply}
        onLikeComment={handleLikeComment}
      />

      {/* Drafts / Unpublished Posts Manager Modal */}
      <DraftManagerModal
        isOpen={isDraftManagerOpen}
        onClose={() => setIsDraftManagerOpen(false)}
        articles={articles}
        onSaveArticle={handleSaveArticle}
        onPublishArticle={handlePublishArticle}
        onDeleteArticle={handleDeleteArticle}
      />

      {/* Contact & Consultation Modal */}
      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
      />

      {/* About Calculator Modal */}
      <CalculatorInfoModal
        isOpen={isCalculatorInfoOpen}
        onClose={() => setIsCalculatorInfoOpen(false)}
      />

    </div>
  );
}
