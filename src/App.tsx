import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { SnippetList } from './SnippetList';
import {
  SquarePen,
  Search,
  FolderPlus,
  Folder,
  ChevronDown,
  ChevronUp,
  MoreVertical,
  MoreHorizontal,
  PanelLeftClose,
  PanelLeftOpen,
  PanelRightClose,
  Plus,
  Zap,
  Mic,
  ArrowUp,
  Paperclip,
  Image as ImageIcon,
  Headphones,
  MessageSquareText,
  MessageSquare,
  X,
  Trash2,
  Lightbulb,
  Bookmark,
  TrendingUp,
  Clock,
  Briefcase,
  Scale,
  ChevronRight,
  Check,
  Sparkles,
  Copy,
  Settings2,
  Wand2,
  User,
  LogOut,
  Layers,
  Briefcase as BriefcaseIcon,
  Bot
} from 'lucide-react';
import { ChatInput } from './components/ChatInput';
import { ConversationView } from './components/ConversationView';
import { SkillsDashboard } from './components/SkillsDashboard';
import { SkillEditor } from './components/SkillEditor';
import { GlobalPreferences } from './components/GlobalPreferences';
import { GemsEditor } from './components/GemsEditor';
import { Gem } from './types';
import { LEGAL_ICONS, COLOR_THEMES } from './constants';

const CustomPesquisaIcon = ({ className }: { className?: string }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path fillRule="evenodd" clipRule="evenodd" d="M10.4615 4C8.45006 4 6.6526 4.9016 5.4523 6.32214C5.09585 6.74399 4.46491 6.79701 4.04306 6.44056C3.6212 6.08411 3.56818 5.45317 3.92463 5.03132C5.49003 3.17868 7.83856 2 10.4615 2C15.1723 2 19 5.80076 19 10.5C19 12.4859 18.3164 14.3113 17.1715 15.7572L21.7071 20.2929C22.0976 20.6834 22.0976 21.3166 21.7071 21.7071C21.3166 22.0976 20.6834 22.0976 20.2929 21.7071L15.7553 17.1695C14.2995 18.316 12.46 19 10.4615 19C9.79955 19 9.15399 18.9248 8.53342 18.7822C7.99517 18.6584 7.65915 18.1218 7.78289 17.5835C7.90662 17.0453 8.44326 16.7093 8.98151 16.833C9.4561 16.9421 9.95137 17 10.4615 17C14.0774 17 17 14.085 17 10.5C17 6.91497 14.0774 4 10.4615 4ZM12.2613 11.2037L12.6111 10.1377C12.6929 9.8884 12.8884 9.69286 13.1377 9.61105L14.2037 9.26129C14.456 9.17849 14.456 8.82151 14.2037 8.7387L13.1377 8.38894C12.8884 8.30713 12.6929 8.11159 12.6111 7.86227L12.2613 6.79632C12.1785 6.54397 11.8215 6.54397 11.7387 6.79632L11.3889 7.86227C11.3071 8.11159 11.1116 8.30713 10.8623 8.38894L9.79632 8.7387C9.54397 8.82151 9.54397 9.17849 9.79632 9.26129L10.8623 9.61105C11.1116 9.69286 11.3071 9.8884 11.3889 10.1377L11.7387 11.2037C11.8215 11.456 12.1785 11.456 12.2613 11.2037ZM3.35181 11.924C3.57143 11.7918 3.77332 11.6336 3.95335 11.4536L4.75573 10.0848L5.12202 8.78612C5.22962 8.40463 5.77038 8.40463 5.87798 8.78612L6.24427 10.0848C6.28998 10.2468 6.34816 10.4035 6.41774 10.5535C6.46529 10.6561 6.51817 10.7557 6.57603 10.8518C6.70821 11.0714 6.86665 11.2736 7.04665 11.4536C7.22668 11.6336 7.42857 11.7918 7.64819 11.924C7.74433 11.9818 7.84387 12.0347 7.94646 12.0823C8.09654 12.1518 8.25315 12.21 8.41523 12.2557L9.71388 12.622C10.0954 12.7296 10.0954 13.2704 9.71388 13.378L8.41523 13.7443C8.25315 13.79 8.09654 13.8482 7.94646 13.9177C7.84387 13.9653 7.74433 14.0182 7.64819 14.076C7.42857 14.2082 7.22639 14.3666 7.04636 14.5467C6.86636 14.7267 6.70821 14.9286 6.57603 15.1482C6.51817 15.2443 6.46529 15.3439 6.41774 15.4465C6.34816 15.5965 6.28998 15.7532 6.24427 15.9152L5.87798 17.2139C5.77038 17.5954 5.22962 17.5954 5.12202 17.2139L4.75573 15.9152C4.71002 15.7532 4.65184 15.5965 4.58226 15.4465C4.53471 15.3439 4.48183 15.2443 4.42397 15.1482C4.29179 14.9286 4.13336 14.7264 3.95335 14.5464C3.77332 14.3664 3.57143 14.2082 3.35181 14.076C3.25567 14.0182 3.15613 13.9653 3.05354 13.9177C2.90346 13.8482 2.74685 13.79 2.58477 13.7443L1.28612 13.378C0.904628 13.2704 0.904627 12.7296 1.28612 12.622L2.58477 12.2557C2.74685 12.21 2.90346 12.1518 3.05354 12.0823C3.15613 12.0347 3.25567 11.9818 3.35181 11.924Z" fill="currentColor"/>
  </svg>
);

const CustomHabilidadesIcon = ({ className, size = 24 }: { className?: string, size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path fillRule="evenodd" clipRule="evenodd" d="M10 5C10 4.44772 10.4477 4 11 4H13C13.5523 4 14 4.44772 14 5V6H10V5ZM8 6V5C8 3.34315 9.34315 2 11 2H13C14.6569 2 16 3.34315 16 5V6H19C20.6569 6 22 7.34315 22 9V10V11V19C22 20.6569 20.6569 22 19 22H5C3.34315 22 2 20.6569 2 19V11V10V9C2 7.34315 3.34315 6 5 6H8ZM4 9C4 8.44772 4.44772 8 5 8H19C19.5523 8 20 8.44772 20 9V10V11C20 11.5523 19.5523 12 19 12H15H9H5C4.44772 12 4 11.5523 4 11V10V9ZM14 15V14H10V15C10 15.5523 9.55228 16 9 16C8.44772 16 8 15.5523 8 15V14H5C4.64936 14 4.31278 13.9398 4 13.8293V19C4 19.5523 4.44772 20 5 20H19C19.5523 20 20 19.5523 20 19V13.8293C19.6872 13.9398 19.3506 14 19 14H16V15C16 15.5523 15.5523 16 15 16C14.4477 16 14 15.5523 14 15Z" fill="currentColor"/>
  </svg>
);

const Logo = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 115 32" preserveAspectRatio="xMidYMid meet" fill="none" role="img" className="mr-2 flex-shrink-0 text-slate-800" height="22">
    <title>Marca Jus IA</title>
    <path fillRule="evenodd" clipRule="evenodd" fill="currentColor" d="M31.945 26.046V23.54c1.31.888 2.72 1.337 4.226 1.337 1.507 0 2.674-.373 3.366-1.115.687-.741 1.03-1.962 1.03-3.654V4.8h2.482v15.505q-.001 2.032-.586 3.472c-.394.959-.925 1.674-1.603 2.14q-1.016.7-2.079.994a8.6 8.6 0 0 1-2.29.293q-2.466-.001-4.546-1.154zM48.013 19.945v-9.63h2.482v9.74c0 1.688.38 2.927 1.14 3.708.76.786 1.946 1.177 3.567 1.177 1.62 0 2.78-.39 3.553-1.177q1.154-1.178 1.154-3.707v-9.741h2.482v9.63q-.001 3.465-1.877 5.359-1.877 1.897-5.312 1.896-3.436.002-5.312-1.896-1.876-1.896-1.877-5.36M65.299 14.826q0-1.992 1.502-3.397 1.504-1.407 4.588-1.408 2.198 0 4.396 1.013v2.393q-1.963-1.14-4.126-1.141-3.873 0-3.874 2.544-.001.867.94 1.394.939.532 2.298.88 1.36.352 2.72.838 1.36.493 2.308 1.657c.632.777.948 1.771.948 2.974q-.001 2.166-1.672 3.397-1.67 1.232-4.625 1.23c-1.969 0-3.63-.417-5.183-1.252v-2.544c1.644.977 3.338 1.47 5.083 1.47q3.909-.002 3.91-2.3.001-1.24-.939-1.94t-2.298-1.053a62 62 0 0 1-2.72-.768 5.3 5.3 0 0 1-2.308-1.403q-.948-.986-.948-2.584M85.466 26.685V4.8h3.122v21.885zM92.353 26.685 101.36 4.8h3.072l8.971 21.885h-3.389l-2.427-6.167h-9.419l-2.427 6.167zm6.942-8.987h7.171l-3.586-9.084z"></path>
    <path fillRule="evenodd" clipRule="evenodd" fill="#FC0" d="M26.098 0H12.663c-.508 0-.944.374-1.032.883l-.36 2.09s-.004.016-.004.023L8.768 17.52h5.734c.39 0 .746.216.93.565l6.428 12.342s.077.152.102.272c.016.079.023.134.028.178v.162a1 1 0 0 1-.014.1q.006-.02.01-.04l4.788-27.732.366-2.112A1.067 1.067 0 0 0 26.098 0"></path>
    <path fillRule="evenodd" clipRule="evenodd" fill="#3D82DA" d="M6.478 31.181v-.004q-.007-.044-.011-.093v-.016c0-.027-.005-.057-.005-.085v-.03q0-.036.003-.074.001-.026.006-.053.002-.027.007-.055.01-.055.02-.113L8.767 17.52H1.049c-.792.002-1.298.862-.924 1.573l6.428 12.342.01.016a1 1 0 0 1-.085-.27"></path>
    <path fillRule="evenodd" clipRule="evenodd" fill="#77B340" d="M21.99 31.038c-.041.584-.58.969-1.026.962H7.536c-.175 0-.356-.046-.356-.046-.557-.152-.82-.676-.681-1.296L8.766 17.52H14.5c.39 0 .747.216.931.565l6.428 12.342s.077.152.102.272.03.19.03.24z"></path>
  </svg>
);

const categories = [
  { id: 'Para você', icon: Lightbulb },
  { id: 'Salvos', icon: Bookmark },
  { id: 'Mais populares', icon: TrendingUp },
  { id: 'Horas extras', icon: Clock },
  { id: 'Direito trabalhista', icon: Briefcase },
  { id: 'Direito do consumidor', icon: Scale }
] as const;
type Category = typeof categories[number]['id'];

const startersData: Record<Category, string[]> = {
  'Para você': [
    'Me ajude a construir uma peça',
    'Mapeie teses relevantes para o meu caso concreto',
    'Analisar as provas apresentadas pela parte contrária',
    'Verificar se há prescrição ou decadência',
    'Comparar os depoimentos das testemunhas'
  ],
  'Salvos': [
    'Elaborar petição inicial de danos morais',
    'Criar um contrato de prestação de serviços',
    'Escrever um recurso de apelação',
    'Redigir notificação extrajudicial para cobrança',
    'Elaborar parecer jurídico sobre rescisão indireta',
    'Resumir os principais argumentos da petição inicial'
  ],
  'Mais populares': [
    'Pesquisar jurisprudência sobre dano moral por atraso de voo',
    'Encontrar súmulas do STJ sobre impenhorabilidade',
    'Levantar decisões recentes sobre pejotização',
    'Pesquisar doutrina sobre responsabilidade civil objetiva',
    'Buscar acórdãos do TST sobre justa causa',
    'Identificar os prazos processuais pendentes'
  ],
  'Horas extras': [
    'Identificar teses defensivas em crimes tributários',
    'Levantar argumentos a favor da guarda compartilhada',
    'Mapear teses de inconstitucionalidade da reforma tributária',
    'Encontrar fundamentos para revisão de juros abusivos',
    'Identificar correntes jurisprudenciais sobre vínculo de emprego',
    'Extrair os pedidos e o valor da causa'
  ],
  'Direito trabalhista': [
    'Avaliar as chances de êxito em ação de usucapião',
    'Analisar risco de condenação em honorários sucumbenciais',
    'Verificar viabilidade de recurso especial',
    'Estimar o valor provável de indenização',
    'Analisar a força das provas documentais apresentadas',
    'Identificar possíveis preliminares de mérito'
  ],
  'Direito do consumidor': [
    'Analisar cláusulas abusivas em contratos de adesão',
    'Mapear jurisprudência sobre responsabilidade civil',
    'Redigir petição inicial para inversão do ônus da prova',
    'Buscar precedentes sobre danos morais em serviços',
    'Avaliar viabilidade de ação indenizatória',
    'Pesquisar doutrina sobre vício oculto'
  ]
};

const initialRecentConversations = [
  { id: 1, label: "Resumo da conversa" },
  { id: 2, label: "Análise Detalhada de Processo..." },
  { id: 3, label: "Avaliação do documento sobre..." },
  { id: 4, label: "Ação Trabalhista Justa Causa ..." },
  { id: 5, label: "Transcrição de áudio sobre ex..." },
  { id: 6, label: "Petição Inicial de Dano Moral p..." },
  { id: 7, label: "O que é o Jus IA?" },
  { id: 8, label: "Nova conversa" },
  { id: 9, label: "TJBA e fornecimento de Mounj..." },
  { id: 10, label: "Meu nome" },
  { id: 11, label: "Rastreamento de endereços pa..." },
  { id: 12, label: "Identificação de bens de Gabri..." },
  { id: 13, label: "Atuação da advogada Luciana ..." },
  { id: 14, label: "Validade de decisão judicial so..." },
  { id: 15, label: "Ação contra a Jeep por vício o..." },
  { id: 16, label: "Ação contra Jeep por vício ocu..." },
  { id: 17, label: "Ação contra Jeep por vício ocu..." }
];

const initialSkills = [
  {
    id: '1',
    name: 'Escritor de Peça Jurídica',
    description: 'Redação de Peças e Documentos',
    iconId: 'pen',
    themeId: 'blue',
    isInstalled: true,
    isActive: true,
    specialization: 'Direito Processual Civil',
    depthLevel: 'Avançado',
    techniqueLevel: 'Avançado',
    objetividade: 'Equilibrado',
    formalidade: 'Normal'
  },
  {
    id: '2',
    name: 'Escritor de Contrato',
    description: 'Elaboração de Contratos',
    iconId: 'handshake',
    themeId: 'emerald',
    isInstalled: true,
    isActive: true,
    specialization: 'Direito Civil',
    depthLevel: 'Intermediário',
    techniqueLevel: 'Intermediário',
    objetividade: 'Equilibrado',
    formalidade: 'Normal'
  },
  {
    id: '3',
    name: 'Revisor de Contrato',
    description: 'Análise e Revisão Contratual',
    iconId: 'search',
    themeId: 'purple',
    isInstalled: true,
    isActive: true,
    specialization: 'Direito Civil',
    depthLevel: 'Avançado',
    techniqueLevel: 'Avançado',
    objetividade: 'Equilibrado',
    formalidade: 'Normal'
  },
  {
    id: '4',
    name: 'Advogado Civil',
    description: 'Especialista em Área do Direito',
    iconId: 'scale',
    themeId: 'amber',
    isInstalled: false,
    isActive: false,
    specialization: 'Direito Civil',
    depthLevel: 'Intermediário',
    techniqueLevel: 'Intermediário',
    objetividade: 'Equilibrado',
    formalidade: 'Normal'
  },
  {
    id: '5',
    name: 'Advogado Trabalhista',
    description: 'Especialista em Área do Direito',
    iconId: 'scale',
    themeId: 'rose',
    isInstalled: false,
    isActive: false,
    specialization: 'Direito do Trabalho',
    depthLevel: 'Intermediário',
    techniqueLevel: 'Intermediário',
    objetividade: 'Equilibrado',
    formalidade: 'Normal'
  },
  {
    id: '6',
    name: 'Advogado Empresarial',
    description: 'Consultoria e Pareceres Jurídicos',
    iconId: 'message',
    themeId: 'blue',
    isInstalled: false,
    isActive: false,
    specialization: 'Direito Empresarial',
    depthLevel: 'Avançado',
    techniqueLevel: 'Avançado',
    objetividade: 'Equilibrado',
    formalidade: 'Normal'
  },
  {
    id: '7',
    name: 'Calculadora Jurídica',
    description: 'Cálculos Trabalhistas e Judiciais',
    iconId: 'calculator',
    themeId: 'emerald',
    isInstalled: false,
    isActive: false,
    specialization: 'Direito Processual',
    depthLevel: 'Básico',
    techniqueLevel: 'Básico',
    objetividade: 'Equilibrado',
    formalidade: 'Normal'
  },
  {
    id: '8',
    name: 'Criador de Teses',
    description: 'Desenvolvimento de Teses e Estratégias',
    iconId: 'briefcase',
    themeId: 'purple',
    isInstalled: false,
    isActive: false,
    specialization: 'Direito Processual',
    depthLevel: 'Avançado',
    techniqueLevel: 'Avançado',
    objetividade: 'Equilibrado',
    formalidade: 'Normal'
  },
  {
    id: '9',
    name: 'Buscador de Julgados e Referências',
    description: 'Pesquisa Jurisprudencial e Doutrinária',
    iconId: 'book',
    themeId: 'amber',
    isInstalled: false,
    isActive: false,
    specialization: 'Direito Processual',
    depthLevel: 'Intermediário',
    techniqueLevel: 'Intermediário',
    objetividade: 'Equilibrado',
    formalidade: 'Normal'
  },
  {
    id: '10',
    name: 'Especialista em Direito Cível',
    description: 'Especialista em Área do Direito',
    iconId: 'scale',
    themeId: 'rose',
    isInstalled: false,
    isActive: false,
    specialization: 'Direito Civil',
    depthLevel: 'Avançado',
    techniqueLevel: 'Avançado',
    objetividade: 'Equilibrado',
    formalidade: 'Normal'
  },
  {
    id: '11',
    name: 'Especialista em Direito Tributário',
    description: 'Desenvolvimento de Teses e Estratégias',
    iconId: 'briefcase',
    themeId: 'blue',
    isInstalled: false,
    isActive: false,
    specialization: 'Direito Tributário',
    depthLevel: 'Avançado',
    techniqueLevel: 'Avançado',
    objetividade: 'Equilibrado',
    formalidade: 'Normal'
  },
  {
    id: '12',
    name: 'Especialista em Direito Administrativo',
    description: 'Especialista em Área do Direito',
    iconId: 'scale',
    themeId: 'emerald',
    isInstalled: false,
    isActive: false,
    specialization: 'Direito Administrativo',
    depthLevel: 'Avançado',
    techniqueLevel: 'Avançado',
    objetividade: 'Equilibrado',
    formalidade: 'Normal'
  }
];

export default function App() {
  const [inputText, setInputText] = useState("");
  const [isPesquisaActive, setIsPesquisaActive] = useState(false);
  const [isPlusMenuOpen, setIsPlusMenuOpen] = useState(false);
  const [showMoreSuggestions, setShowMoreSuggestions] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMaisCasosOpen, setIsMaisCasosOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setIsUserMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  useEffect(() => {
    if (!isUserMenuOpen) {
      setIsVersionsMenuOpen(false);
    }
  }, [isUserMenuOpen]);

  const [isRecording, setIsRecording] = useState(false);
  const [isBuildOpen, setIsBuildOpen] = useState(false);
  const [conversations, setConversations] = useState(initialRecentConversations);
  const [deleteModal, setDeleteModal] = useState<{ isOpen: boolean; id: number | null }>({ isOpen: false, id: null });
  const [activeCategory, setActiveCategory] = useState<Category>('Para você');
  const [currentView, setCurrentView] = useState<'home' | 'conversation' | 'skills' | 'global_preferences' | 'gems_editor'>('home');
  const [activeConversationId, setActiveConversationId] = useState<number | null>(null);
  const [isVersionsMenuOpen, setIsVersionsMenuOpen] = useState(false);
  const [appVersion, setAppVersion] = useState<'habilidades' | 'personalizacao_habilidade' | 'gpt_gems'>('habilidades');

  // Handle version from URL query parameter
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const version = params.get('v');
    if (version === 'habilidades' || version === 'personalizacao_habilidade' || version === 'gpt_gems') {
      setAppVersion(version as any);
    }
  }, []);

  // Update URL when version changes
  const handleVersionChange = (version: 'habilidades' | 'personalizacao_habilidade' | 'gpt_gems') => {
    setAppVersion(version);
    setCurrentView('home');
    setActiveConversationId(null);
    setActiveGemId(null);
    setActiveSkill(null);
    setInputText('');
    
    const url = new URL(window.location.href);
    url.searchParams.set('v', version);
    window.history.pushState({}, '', url.toString());
  };
  const [isPersonalizationMenuOpen, setIsPersonalizationMenuOpen] = useState(false);
  const [isSkillEditorOpen, setIsSkillEditorOpen] = useState(false);
  const [activeSkill, setActiveSkill] = useState<string | null>(null);
  const [skills, setSkills] = useState(initialSkills);
  const [gems, setGems] = useState<Gem[]>([
    {
      id: '1',
      name: 'Especialista em contratos',
      description: 'Analisa e redige contratos complexos.',
      instructions: 'Você é um especialista em contratos...',
      initialPhrases: ['Analisar contrato de aluguel', 'Criar contrato de prestação de serviço'],
      iconId: 'handshake',
      themeId: 'blue'
    },
    {
      id: '2',
      name: 'Analista de petições',
      description: 'Analisa e redige petições iniciais.',
      instructions: 'Você é um analista de petições...',
      initialPhrases: ['Analisar petição inicial', 'Criar petição de dano moral'],
      iconId: 'shield',
      themeId: 'emerald'
    }
  ]);
  const [activeGemId, setActiveGemId] = useState<string | null>(null);
  const [editingGemId, setEditingGemId] = useState<string | null>(null);

  const [editingSkillId, setEditingSkillId] = useState<string | null>(null);

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const plusMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isBuildOpen) {
      setIsSidebarCollapsed(true);
    }
  }, [isBuildOpen]);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [inputText]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (plusMenuRef.current && !plusMenuRef.current.contains(event.target as Node)) {
        setIsPlusMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleDeleteConversation = () => {
    if (deleteModal.id !== null) {
      setConversations(prev => prev.filter(c => c.id !== deleteModal.id));
      setDeleteModal({ isOpen: false, id: null });
    }
  };

  const handleConversationClick = (id: number) => {
    setActiveConversationId(id);
    setActiveGemId(null);
    setCurrentView('conversation');
  };

  const handleNewConversation = () => {
    setActiveConversationId(null);
    setActiveGemId(null);
    setCurrentView('home');
    setInputText('');
  };

  const handleSubmit = () => {
    if (inputText.trim()) {
      setCurrentView('conversation');
      // In a real app, we would add the message to the conversation state here
    }
  };

  return (
    <div className="flex h-screen w-full bg-white text-slate-800 font-sans overflow-hidden">
      
      {/* Sidebar */}
      <motion.div 
        animate={{ width: isSidebarCollapsed ? 60 : 280 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="flex-shrink-0 border-r border-slate-200 flex flex-col h-full bg-white"
      >
        {/* Header */}
        <div className={`px-3 py-4 flex items-center ${isSidebarCollapsed ? 'justify-center' : 'justify-between'} overflow-hidden`}>
          {!isSidebarCollapsed && (
            <div className="flex items-center flex-shrink-0">
              <Logo />
            </div>
          )}
          <button 
            onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
            className="w-9 h-9 flex items-center justify-center rounded-lg text-slate-600 hover:bg-slate-50 transition-colors flex-shrink-0"
          >
            {isSidebarCollapsed ? <PanelLeftOpen size={20} /> : <PanelLeftClose size={20} />}
          </button>
        </div>

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto py-2 flex flex-col gap-6 custom-scrollbar">
          {/* Top Actions */}
          <div className="px-3 flex flex-col gap-0.5">
            <SidebarItem 
              icon={<SquarePen size={20} />} 
              label="Nova conversa" 
              isCollapsed={isSidebarCollapsed} 
              onClick={handleNewConversation}
              isActive={currentView === 'home'}
            />
            <SidebarItem icon={<Search size={20} />} label="Buscar em conversas" isCollapsed={isSidebarCollapsed} />
            
            {appVersion === 'gpt_gems' ? (
              <div className="mt-4 flex flex-col gap-0.5">
                <SidebarItem 
                  icon={<Briefcase size={20} />} 
                  label="Novo Agente" 
                  isCollapsed={isSidebarCollapsed} 
                  onClick={() => {
                    setEditingGemId(null);
                    setCurrentView('gems_editor');
                  }}
                />
                {gems.map(gem => {
                  const theme = COLOR_THEMES.find(t => t.id === gem.themeId) || COLOR_THEMES[0];
                  const iconData = LEGAL_ICONS.find(i => i.id === gem.iconId) || LEGAL_ICONS[0];
                  
                  return (
                    <SidebarTextItem 
                      key={gem.id}
                      icon={gem.coverImage ? (
                        <img src={gem.coverImage} alt={gem.name} className="w-6 h-6 rounded-md object-cover" />
                      ) : (
                        <div className={`w-6 h-6 rounded-md flex items-center justify-center ${theme.bg}`}>
                          {React.createElement(iconData.icon, { size: 14, className: theme.text })}
                        </div>
                      )} 
                      label={gem.name} 
                      isCollapsed={isSidebarCollapsed}
                      onClick={() => {
                        setActiveGemId(gem.id);
                        setActiveConversationId(null);
                        setCurrentView('conversation');
                      }}
                    />
                  );
                })}
              </div>
            ) : appVersion === 'habilidades' ? (
              <SidebarItem 
                icon={<CustomHabilidadesIcon size={20} />} 
                label="Habilidades" 
                isCollapsed={isSidebarCollapsed} 
                onClick={() => setCurrentView('skills')}
                isActive={currentView === 'skills'}
              />
            ) : (
              <div 
                className="relative"
                onMouseEnter={() => setIsPersonalizationMenuOpen(true)}
                onMouseLeave={() => setIsPersonalizationMenuOpen(false)}
              >
                <SidebarItem 
                  icon={<Settings2 size={20} />} 
                  label="Personalizar Jus IA" 
                  isCollapsed={isSidebarCollapsed} 
                  onClick={() => setIsPersonalizationMenuOpen(!isPersonalizationMenuOpen)}
                  isActive={currentView === 'skills' || currentView === 'global_preferences'}
                />
                
                <AnimatePresence>
                  {isPersonalizationMenuOpen && !isSidebarCollapsed && (
                    <motion.div
                      initial={{ opacity: 0, x: 5 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 5 }}
                      className="fixed left-[280px] bg-white border border-slate-200 rounded-xl shadow-2xl py-2 z-[999] min-w-[220px]"
                      style={{ 
                        top: 'auto',
                        marginTop: '-36px'
                      }}
                    >
                      <button 
                        onClick={() => {
                          setCurrentView('skills');
                          setIsPersonalizationMenuOpen(false);
                        }}
                        className="w-full flex items-center px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 transition-colors text-left whitespace-nowrap font-medium"
                      >
                        Habilidades
                      </button>
                      <button 
                        onClick={() => {
                          setCurrentView('global_preferences');
                          setIsPersonalizationMenuOpen(false);
                        }}
                        className="w-full flex items-center px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 transition-colors text-left whitespace-nowrap font-medium"
                      >
                        Preferências Globais
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}
          </div>

          {!isSidebarCollapsed && (
            <div className="px-3 flex flex-col gap-0.5">
              <SidebarItem icon={<FolderPlus size={20} />} label="Novo caso" isCollapsed={isSidebarCollapsed} />
              
              <AnimatePresence>
                {isMaisCasosOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="px-3 py-2">
                      <input 
                        type="text" 
                        placeholder="Filtrar por nome" 
                        className="w-full text-xs border border-slate-200 rounded-md px-2 py-1.5 outline-none focus:border-emerald-400 transition-colors"
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <SidebarTextItem 
                icon={<Folder size={20} className="text-slate-400" />} 
                label="SulAmérica Saúde" 
                isCollapsed={isSidebarCollapsed} 
              />
              <SidebarTextItem 
                icon={<Folder size={20} className="text-slate-400" />} 
                label="teste" 
                isCollapsed={isSidebarCollapsed} 
              />
              <SidebarTextItem 
                icon={<Folder size={20} className="text-slate-400" />} 
                label="Fornecimento de medica..." 
                isCollapsed={isSidebarCollapsed} 
              />
              
              <AnimatePresence>
                {isMaisCasosOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden flex flex-col gap-0.5"
                  >
                    <SidebarTextItem 
                      icon={<Folder size={20} className="text-slate-400" />} 
                      label="Caso Extra 1" 
                      isCollapsed={false} 
                    />
                    <SidebarTextItem 
                      icon={<Folder size={20} className="text-slate-400" />} 
                      label="Caso Extra 2" 
                      isCollapsed={false} 
                    />
                  </motion.div>
                )}
              </AnimatePresence>

              <SidebarTextItem 
                icon={<ChevronDown size={20} className={`text-slate-400 transition-transform duration-200 ${isMaisCasosOpen ? 'rotate-180' : ''}`} />} 
                label={isMaisCasosOpen ? "Menos casos" : "Mais casos"} 
                isCollapsed={isSidebarCollapsed} 
                onClick={() => setIsMaisCasosOpen(!isMaisCasosOpen)}
              />
            </div>
          )}

          {/* Recent Conversations */}
          {!isSidebarCollapsed && (
            <div className="px-3 flex flex-col gap-0.5">
              <div className="px-3 pt-2 pb-0.5 text-[12px] font-semibold text-slate-400">
                Últimas conversas
              </div>
              
              <AnimatePresence mode="popLayout">
                {conversations.map((conv) => (
                  <motion.div
                    key={conv.id}
                    layout
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.2 }}
                  >
                    <SidebarTextItem 
                      label={conv.label} 
                      isCollapsed={isSidebarCollapsed}
                      onOptionsClick={() => setDeleteModal({ isOpen: true, id: conv.id })}
                      onClick={() => handleConversationClick(conv.id)}
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>

        {/* User Profile */}
        <div className="p-4 flex items-center justify-between relative" ref={userMenuRef}>
          <div className="flex items-center gap-3 flex-shrink-0">
            <div className="relative flex-shrink-0">
              <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="Jose Souza" className="w-9 h-9 rounded-full object-cover" />
            </div>
            {!isSidebarCollapsed && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col overflow-hidden"
              >
                <span className="text-sm font-semibold text-slate-700 truncate w-32">Jose Souza</span>
                <span className="text-xs text-slate-500">Assinante</span>
              </motion.div>
            )}
          </div>
          {!isSidebarCollapsed && (
            <button 
              onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
              className="w-9 h-9 flex items-center justify-center rounded-lg text-slate-600 hover:bg-slate-50 transition-colors flex-shrink-0"
            >
              <MoreVertical size={20} />
            </button>
          )}

          <AnimatePresence>
            {isUserMenuOpen && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                className="absolute bottom-full left-0 right-0 mb-4 bg-white border border-slate-200 rounded-xl shadow-2xl py-2 z-[100] min-w-[240px]"
                style={{ marginLeft: '1rem', marginRight: '1rem' }}
              >
                <div 
                  className="relative"
                  onMouseEnter={() => setIsVersionsMenuOpen(true)}
                  onMouseLeave={() => setIsVersionsMenuOpen(false)}
                >
                  <button 
                    className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 transition-colors"
                  >
                    <Layers size={18} className="text-slate-500" />
                    <span className="font-medium">Versões</span>
                    <ChevronRight size={16} className={`ml-auto text-slate-400 transition-transform ${isVersionsMenuOpen ? 'rotate-90' : ''}`} />
                  </button>
                  
                  <AnimatePresence>
                    {isVersionsMenuOpen && (
                      <motion.div
                        initial={{ opacity: 0, x: 5 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 5 }}
                        className="absolute left-full bottom-0 ml-1 bg-white border border-slate-200 rounded-xl shadow-2xl py-2 z-[110] min-w-[240px]"
                      >
                        <button 
                          onClick={() => handleVersionChange('habilidades')}
                          className={`w-full flex items-center gap-3 px-4 py-2 text-sm transition-colors whitespace-nowrap ${appVersion === 'habilidades' ? 'bg-[#E6F4F0] text-[#007A5F]' : 'text-slate-700 hover:bg-slate-50'}`}
                        >
                          <span className="font-medium">Habilidades</span>
                          {appVersion === 'habilidades' && <Check size={14} className="ml-auto text-[#007A5F]" />}
                        </button>
                        <button 
                          onClick={() => handleVersionChange('personalizacao_habilidade')}
                          className={`w-full flex items-center gap-3 px-4 py-2 text-sm transition-colors whitespace-nowrap ${appVersion === 'personalizacao_habilidade' ? 'bg-[#E6F4F0] text-[#007A5F]' : 'text-slate-700 hover:bg-slate-50'}`}
                        >
                          <span className="font-medium">Personalização e Habilidade</span>
                          {appVersion === 'personalizacao_habilidade' && <Check size={14} className="ml-auto text-[#007A5F]" />}
                        </button>
                        <button 
                          onClick={() => handleVersionChange('gpt_gems')}
                          className={`w-full flex items-center gap-3 px-4 py-2 text-sm transition-colors whitespace-nowrap ${appVersion === 'gpt_gems' ? 'bg-[#E6F4F0] text-[#007A5F]' : 'text-slate-700 hover:bg-slate-50'}`}
                        >
                          <span className="font-medium">Agentes</span>
                          {appVersion === 'gpt_gems' && <Check size={14} className="ml-auto text-[#007A5F]" />}
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                <div className="h-px bg-slate-100 my-1 mx-2" />
                <button className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 transition-colors">
                  <User size={18} className="text-slate-500" />
                  <span className="font-medium">Meu perfil</span>
                </button>
                <button className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-rose-600 hover:bg-rose-50 transition-colors">
                  <LogOut size={18} />
                  <span className="font-medium">Sair</span>
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Main Content */}
      {currentView === 'home' ? (
        <div className="flex-1 flex flex-col h-full bg-white relative">
          <div className="flex-1 overflow-y-auto flex flex-col items-center pb-12 px-4 custom-scrollbar">
            
            <h1 
              className="text-[32px] font-semibold text-slate-900 mb-8 mt-[15vh]"
            >
              Boa tarde, Jose
            </h1>

            <div className="w-full max-w-[720px] flex flex-col gap-6">
              
              {/* Input Container */}
              <ChatInput 
                inputText={inputText}
                setInputText={setInputText}
                isPesquisaActive={isPesquisaActive}
                setIsPesquisaActive={setIsPesquisaActive}
                isPlusMenuOpen={isPlusMenuOpen}
                setIsPlusMenuOpen={setIsPlusMenuOpen}
                isRecording={isRecording}
                setIsRecording={setIsRecording}
                plusMenuRef={plusMenuRef}
                onSubmit={handleSubmit}
                activeSkill={activeSkill}
                setActiveSkill={setActiveSkill}
                skills={skills}
                appVersion={appVersion}
              />

              {/* Suggestions */}
              <div className="flex flex-col w-full px-2">
                
                {/* Starters List */}
                <div className="flex flex-col">
                  <AnimatePresence mode="popLayout">
                    {startersData[activeCategory].slice(0, showMoreSuggestions ? 6 : 3).map((starter, idx) => (
                      <motion.button
                        key={starter}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ delay: idx * 0.05 }}
                        className="flex items-center gap-4 py-4 border-b border-slate-100 hover:bg-slate-50 text-left transition-colors group px-2"
                      >
                        <MessageSquareText size={20} className="text-slate-500 flex-shrink-0" />
                        <span className="text-[14px] text-slate-600 group-hover:text-slate-900 transition-colors">{starter}</span>
                      </motion.button>
                    ))}
                  </AnimatePresence>

                  <button 
                    onClick={() => setShowMoreSuggestions(!showMoreSuggestions)}
                    className="flex items-center gap-4 py-4 text-slate-500 cursor-pointer hover:bg-slate-50 transition-colors px-2 rounded-b-lg w-full text-left border-b border-slate-100"
                  >
                    <motion.span 
                      animate={{ rotate: showMoreSuggestions ? 180 : 0 }}
                      className="flex-shrink-0"
                    >
                      <ChevronDown size={18} />
                    </motion.span>
                    <span className="text-[14px]">{showMoreSuggestions ? "Mostrar menos sugestões" : "Mostrar mais sugestões"}</span>
                  </button>
                </div>
              </div>

            </div>
          </div>
        </div>
      ) : currentView === 'skills' ? (
        <SkillsDashboard 
          skills={skills}
          onToggleSkill={(id) => setSkills(prev => prev.map(s => s.id === id ? { ...s, isActive: !s.isActive } : s))}
          onInstallSkill={(id) => setSkills(prev => prev.map(s => s.id === id ? { ...s, isInstalled: true, isActive: true } : s))}
          onConfigureSkill={(id) => { setEditingSkillId(id); setIsSkillEditorOpen(true); }}
          onCreateSkill={() => { setEditingSkillId(null); setIsSkillEditorOpen(true); }} 
        />
      ) : currentView === 'global_preferences' ? (
        <GlobalPreferences />
      ) : currentView === 'gems_editor' ? (
        <GemsEditor 
          gem={editingGemId ? gems.find(g => g.id === editingGemId) : undefined}
          onSave={(gemData) => {
            if (editingGemId) {
              setGems(prev => prev.map(g => g.id === editingGemId ? { ...g, ...gemData } : g));
            } else {
              setGems(prev => [...prev, { 
                id: Date.now().toString(), 
                ...gemData as Gem
              }]);
            }
            setCurrentView('home');
          }}
          onClose={() => setCurrentView('home')}
        />
      ) : (
        <div className="flex-1 flex h-full overflow-hidden">
          <motion.div 
            animate={{ width: isBuildOpen ? '40%' : '100%' }}
            className="flex-1 flex flex-col h-full bg-white relative"
          >
            <ConversationView 
              inputText={inputText}
              setInputText={setInputText}
              isPesquisaActive={isPesquisaActive}
              setIsPesquisaActive={setIsPesquisaActive}
              isPlusMenuOpen={isPlusMenuOpen}
              setIsPlusMenuOpen={setIsPlusMenuOpen}
              isRecording={isRecording}
              setIsRecording={setIsRecording}
              plusMenuRef={plusMenuRef}
              onSubmit={handleSubmit}
              setIsBuildOpen={setIsBuildOpen}
              setEditingGemId={setEditingGemId}
              setCurrentView={setCurrentView}
              activeSkill={activeSkill}
              setActiveSkill={setActiveSkill}
              skills={skills}
              appVersion={appVersion}
              activeGemId={activeGemId}
              activeConversationId={activeConversationId}
              gems={gems}
            />
          </motion.div>
          <AnimatePresence>
            {isBuildOpen && (
              <motion.div 
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: '60%', opacity: 1 }}
                exit={{ width: 0, opacity: 0 }}
                className="border-l border-slate-200 bg-white h-full flex flex-col overflow-hidden"
              >
                <div className="flex items-center px-4 h-[56px] shrink-0">
                  <button 
                    onClick={() => setIsBuildOpen(false)} 
                    className="w-9 h-9 flex items-center justify-center rounded-lg text-slate-600 hover:bg-slate-50 transition-colors flex-shrink-0"
                  >
                    <X size={20} />
                  </button>
                  <h2 className="text-[16px] font-bold ml-3">Fontes</h2>
                </div>
                <div className="flex-1 p-6 overflow-y-auto custom-scrollbar">
                  <SnippetList />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {isSkillEditorOpen && (
          <SkillEditor 
            skill={editingSkillId ? skills.find(s => s.id === editingSkillId) : undefined}
            onSave={async (skillData) => {
              if (editingSkillId) {
                setSkills(prev => prev.map(s => s.id === editingSkillId ? { ...s, ...skillData } : s));
              } else {
                setSkills(prev => [...prev, { 
                  id: Date.now().toString(), 
                  isInstalled: true, 
                  isActive: true, 
                  ...skillData
                }]);
              }
              setIsSkillEditorOpen(false);
            }}
            onClose={() => setIsSkillEditorOpen(false)} 
            onUninstall={() => {
              if (editingSkillId) {
                setSkills(prev => prev.map(s => s.id === editingSkillId ? { ...s, isInstalled: false, isActive: false } : s));
                setIsSkillEditorOpen(false);
              }
            }}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {deleteModal.isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setDeleteModal({ isOpen: false, id: null })}
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative bg-white rounded-2xl shadow-2xl p-6 w-full max-w-sm"
            >
              <h3 className="text-lg font-semibold text-slate-900 mb-2">Excluir conversa?</h3>
              <p className="text-slate-600 mb-6">Esta ação não pode ser desfeita e a conversa será removida permanentemente.</p>
              <div className="flex gap-3 justify-end">
                <button 
                  onClick={() => setDeleteModal({ isOpen: false, id: null })}
                  className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-xl transition-colors font-semibold"
                >
                  Cancelar
                </button>
                <button 
                  onClick={handleDeleteConversation}
                  className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-xl transition-colors font-semibold"
                >
                  Excluir
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

function SidebarItem({ icon, label, isCollapsed, onClick, isActive, badge }: { icon: React.ReactNode, label: string, isCollapsed: boolean, onClick?: () => void, isActive?: boolean, badge?: string, key?: React.Key }) {
  return (
    <button 
      onClick={onClick}
      className={`flex items-center ${isCollapsed ? 'justify-center' : 'gap-3'} px-3 h-9 rounded-lg ${isActive ? 'bg-[#E6F4F0] text-[#007A5F]' : 'hover:bg-slate-100 text-slate-700'} w-full text-left transition-all group relative`}
    >
      <span className={`${isActive ? 'text-[#007A5F]' : 'text-slate-600'} flex-shrink-0 transition-colors`}>{icon}</span>
      <AnimatePresence>
        {!isCollapsed && (
          <motion.div 
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            className="flex-1 flex items-center justify-between overflow-hidden"
          >
            <span className={`text-[14px] font-semibold whitespace-nowrap overflow-hidden ${isActive ? 'text-[#007A5F]' : ''}`}>
              {label}
            </span>
            {badge && (
              <span className={`${isActive ? 'bg-white text-[#007A5F]' : 'bg-[#E6F4F0] text-[#007A5F]'} text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[18px] text-center transition-colors`}>
                {badge}
              </span>
            )}
          </motion.div>
        )}
      </AnimatePresence>
      {isCollapsed && (
        <div className="absolute left-full ml-2 px-2 py-1 bg-[#1D1D1D] text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50">
          {label}
        </div>
      )}
    </button>
  );
}

function SidebarTextItem({ label, isCollapsed, onOptionsClick, onClick, icon }: { label: string; isCollapsed: boolean; onOptionsClick?: () => void, onClick?: () => void, key?: React.Key, icon?: React.ReactNode }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    }
    if (isMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMenuOpen]);

  return (
    <div className="group relative flex items-center">
      <button 
        onClick={onClick}
        className="flex items-center gap-2 px-3 h-8 rounded-lg hover:bg-slate-100 text-slate-600 w-full text-left transition-colors truncate pr-8"
      >
        {icon && <span className="flex-shrink-0">{icon}</span>}
        <span className="text-[14px] truncate">{isCollapsed ? "" : label}</span>
      </button>
      {!isCollapsed && onOptionsClick && (
        <div className="absolute right-2" ref={menuRef}>
          <button 
            onClick={(e) => {
              e.stopPropagation();
              setIsMenuOpen(!isMenuOpen);
            }}
            className={`p-1 rounded-md text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition-all ${isMenuOpen ? 'opacity-100 bg-slate-200' : 'opacity-0 group-hover:opacity-100'}`}
          >
            <MoreVertical size={16} />
          </button>
          
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: -10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -10 }}
                className="absolute right-0 mt-1 w-32 bg-white border border-slate-200 rounded-xl shadow-xl py-1 z-50"
              >
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsMenuOpen(false);
                    // Placeholder for edit action
                    console.log("Edit conversation:", label);
                  }}
                  className="w-full flex items-center gap-2 px-3 py-2 text-sm text-slate-600 hover:bg-slate-50 transition-colors"
                >
                  <SquarePen size={14} />
                  <span>Editar</span>
                </button>
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsMenuOpen(false);
                    onOptionsClick();
                  }}
                  className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                >
                  <Trash2 size={14} />
                  <span>Excluir</span>
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}

function SuggestionItem({ label }: { label: string; key?: React.Key }) {
  return (
    <div className="flex items-center gap-4 py-3.5 border-b border-slate-100 text-slate-600 cursor-pointer hover:bg-slate-50 transition-colors px-2 rounded-lg group">
      <MessageSquareText size={20} className="text-slate-400 flex-shrink-0 group-hover:text-emerald-500 transition-colors" />
      <span className="text-[15px]">{label}</span>
    </div>
  );
}
