export type ArticleCategory = 
  | 'torque' 
  | 'industria40' 
  | 'automacao' 
  | 'estudos_caso' 
  | 'tutoriais' 
  | 'historias_campo';

export type ArticleType = 
  | 'artigo' 
  | 'tutorial' 
  | 'estudo_caso' 
  | 'historia_campo';

export interface TechnicalMetadata {
  boltStandard?: string;
  torqueRange?: string;
  jointType?: 'Junta Rígida (Hard)' | 'Junta Flexível (Soft)' | 'Junta Média';
  criticality?: 'Classe A (Crítico/Segurança)' | 'Classe B (Funcional)' | 'Classe C (Geral)';
  toolsTested?: string[];
  vdiStandard?: string;
}

export interface CommentItem {
  id: string;
  articleId: string;
  authorName: string;
  authorRole: string;
  content: string;
  createdAt: string;
  likes: number;
  isVerifiedEngineer?: boolean;
  replies?: CommentItem[];
}

export interface Article {
  id: string;
  title: string;
  slug: string;
  category: ArticleCategory;
  type: ArticleType;
  summary: string;
  content: string;
  readTimeMinutes: number;
  publishedAt: string;
  isDraft: boolean;
  featured?: boolean;
  author: {
    name: string;
    role: string;
    avatar?: string;
  };
  tags: string[];
  likes: number;
  views: number;
  commentsCount: number;
  technicalMetadata?: TechnicalMetadata;
}

export interface ProjectItem {
  id: string;
  title: string;
  clientOrSector: string;
  category: string;
  summary: string;
  challenge: string;
  solution: string;
  results: string[];
  technologies: string[];
  metrics: { label: string; value: string }[];
  date: string;
}

export interface SkillCategory {
  id: string;
  title: string;
  iconName: string;
  description: string;
  skills: {
    name: string;
    level: number;
    highlight?: boolean;
    description: string;
    tags: string[];
  }[];
}

export interface FastenerSpec {
  size: string; // e.g., 'M8'
  nominalDiameter: number; // mm
  pitch: number; // mm standard coarse
  stressArea: number; // mm² (As)
}

export interface TorqueCalcInput {
  threadSize: string;
  propertyClass: '8.8' | '10.9' | '12.9' | '4.8' | '5.8';
  frictionTotal: number; // µ total (0.08 to 0.20)
  yieldUtilization: number; // e.g. 90%
  holeType: 'standard' | 'countersunk' | 'flanged';
}

export interface TorqueCalcResult {
  nominalDiameter: number;
  pitch: number;
  stressArea: number;
  proofStrength: number; // MPa / N/mm²
  preloadKn: number; // kN (FM90)
  tighteningTorqueNm: number; // N.m (MA)
  tighteningTorqueLbfFt: number; // lbf.ft
  tighteningTorqueKgfM: number; // kgf.m
  tighteningTorqueLbfIn: number; // lbf.in
  yieldTorqueNm: number;
  recommendedAngleDeg: number;
  safetyMargin: string;
}
