import { 
  Scale, 
  FileText, 
  Briefcase, 
  PenTool, 
  BookOpen, 
  Handshake, 
  ShieldCheck, 
  Search,
  Calculator,
  MessageSquare,
  Sparkles
} from 'lucide-react';

export const LEGAL_ICONS = [
  { id: 'pen', name: 'Redação', icon: PenTool },
  { id: 'handshake', name: 'Contratos', icon: Handshake },
  { id: 'search', name: 'Análise/Pesquisa', icon: Search },
  { id: 'scale', name: 'Especialista', icon: Scale },
  { id: 'book', name: 'Doutrina', icon: BookOpen },
  { id: 'briefcase', name: 'Estratégia', icon: Briefcase },
  { id: 'calculator', name: 'Cálculos', icon: Calculator },
  { id: 'message', name: 'Consultoria', icon: MessageSquare },
  { id: 'shield', name: 'Compliance', icon: ShieldCheck },
  { id: 'sparkles', name: 'Outros', icon: Sparkles },
];

export const COLOR_THEMES = [
  { id: 'blue', bg: 'bg-blue-50', text: 'text-blue-800' },
  { id: 'emerald', bg: 'bg-emerald-50', text: 'text-emerald-800' },
  { id: 'purple', bg: 'bg-purple-50', text: 'text-purple-800' },
  { id: 'amber', bg: 'bg-amber-50', text: 'text-amber-800' },
  { id: 'rose', bg: 'bg-rose-50', text: 'text-rose-800' },
];

export const OBJETIVIDADE_TOOLTIPS: Record<string, string> = {
  'Enxuto': 'Respostas diretas e objetivas. Ideal para comunicações rápidas e orientações pontuais.',
  'Equilibrado': 'Equilíbrio entre concisão e fundamentação. Recomendado para a maioria das peças processuais.',
  'Detalhado': 'Análise aprofundada com riqueza de detalhes doutrinários e jurisprudenciais. Ideal para pareceres e teses complexas.'
};

export const FORMALIDADE_TOOLTIPS: Record<string, string> = {
  'Informal': 'Linguagem acessível e direta, ideal para comunicações rápidas com clientes ou equipe.',
  'Normal': 'Linguagem técnica padrão, equilibrada e profissional. Recomendada para a maioria das situações.',
  'Formal': 'Linguagem jurídica clássica e solene, com uso rigoroso da norma culta e termos técnicos.'
};

export const TRIBUNAIS = [
  'STF', 'STJ', 'TST', 'TSE', 'STM', 
  'TRF1', 'TRF2', 'TRF3', 'TRF4', 'TRF5', 'TRF6',
  'TJSP', 'TJRJ', 'TJMG', 'TJRS', 'TJPR', 'TJSC', 'TJBA', 'TJPE', 'TJCE', 'TJGO', 'TJMT', 'TJMS', 'TJES', 'TJMA', 'TJPB', 'TJRN', 'TJAL', 'TJSE', 'TJPI', 'TJTO', 'TJRO', 'TJAC', 'TJAP', 'TJRR', 'TJDFT'
];

export const AREAS_DIREITO = [
  'Direito Civil', 'Direito Penal', 'Direito do Trabalho', 'Direito Tributário', 'Direito Empresarial', 
  'Direito Administrativo', 'Direito Constitucional', 'Direito Previdenciário', 'Direito de Família', 
  'Direito do Consumidor', 'Direito Imobiliário', 'Direito Ambiental', 'Direito Digital', 'Direito Eleitoral', 
  'Direito Internacional', 'Direito Processual Civil', 'Direito Processual Penal'
];

export const FILE_PURPOSES = [
  {
    id: 'estilo',
    label: 'Estilo de Escrita',
    description: 'Analisa vocabulário, tom e formatação para replicar sua escrita.'
  },
  {
    id: 'modelo',
    label: 'Peça Modelo',
    description: 'Mantém a estrutura base, substituindo apenas fatos e partes.'
  },
  {
    id: 'referencia',
    label: 'Caso Similar (Referência)',
    description: 'Casos antigos para extrair teses, argumentos e contexto jurídico para situações semelhantes.'
  }
];

export const SKILL_FUNCTIONS = [
  {
    id: 'redacao',
    label: 'Redação de Peças e Documentos',
    description: 'Criação de petições, recursos e manifestações com base em fatos e fundamentos.'
  },
  {
    id: 'contratos',
    label: 'Elaboração de Contratos',
    description: 'Criação de contratos personalizados, aditivos e distratos com cláusulas atualizadas.'
  },
  {
    id: 'revisao',
    label: 'Análise e Revisão Contratual',
    description: 'Análise crítica de instrumentos contratuais para identificação de riscos e abusividades.'
  },
  {
    id: 'especialista',
    label: 'Especialista em Área do Direito',
    description: 'Consultoria e atuação focada em uma área específica do direito.'
  },
  {
    id: 'pesquisa',
    label: 'Pesquisa Jurisprudencial e Doutrinária',
    description: 'Busca avançada de jurisprudência, súmulas e doutrina em todos os tribunais.'
  },
  {
    id: 'teses',
    label: 'Desenvolvimento de Teses e Estratégias',
    description: 'Criação de argumentos jurídicos inovadores e mapeamento de estratégias processuais.'
  },
  {
    id: 'calculos',
    label: 'Cálculos Trabalhistas e Judiciais',
    description: 'Cálculos precisos de liquidação, horas extras, reflexos e atualizações monetárias.'
  },
  {
    id: 'consultoria',
    label: 'Consultoria e Pareceres Jurídicos',
    description: 'Elaboração de pareceres técnicos e respostas a consultas jurídicas complexas.'
  },
  {
    id: 'compliance',
    label: 'Análise de Riscos e Compliance',
    description: 'Avaliação de conformidade legal, identificação de passivos e mitigação de riscos.'
  },
  {
    id: 'outros',
    label: 'Outros',
    description: 'Defina uma função personalizada para sua habilidade.'
  }
];
