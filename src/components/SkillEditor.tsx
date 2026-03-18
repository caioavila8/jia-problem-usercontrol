import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  Upload, 
  FileText, 
  Check, 
  Info, 
  Sparkles,
  Trash2,
  ChevronDown,
  Settings2,
  Search,
  Plus
} from 'lucide-react';
import { 
  LEGAL_ICONS, 
  COLOR_THEMES, 
  OBJETIVIDADE_TOOLTIPS, 
  FORMALIDADE_TOOLTIPS,
  TRIBUNAIS,
  AREAS_DIREITO,
  FILE_PURPOSES,
  SKILL_FUNCTIONS
} from '../constants';

import { Skill } from '../types';

interface SkillEditorProps {
  skill?: Skill;
  onSave: (skillData: any) => void;
  onClose: () => void;
  onUninstall?: () => void;
}

export const SkillEditor: React.FC<SkillEditorProps> = ({ skill, onSave, onClose, onUninstall }) => {
  const isCustomDescription = skill?.description && !SKILL_FUNCTIONS.some(f => f.label === skill.description);
  
  const [name, setName] = useState(skill?.name || '');
  const [skillFunction, setSkillFunction] = useState(skill?.skillFunction || 'redacao');
  const [instructions, setInstructions] = useState(skill?.instructions || '');
  const [initialPhrases, setInitialPhrases] = useState<string[]>(skill?.initialPhrases || []);
  const [newPhrase, setNewPhrase] = useState('');
  const [iconId, setIconId] = useState(skill?.iconId || LEGAL_ICONS[0].id);
  const [themeId, setThemeId] = useState(skill?.themeId || COLOR_THEMES[0].id);
  const [objetividade, setObjetividade] = useState(skill?.objetividade || 'Equilibrado');
  const [formalidade, setFormalidade] = useState(skill?.formalidade || 'Normal');
  const [files, setFiles] = useState<{ name: string, size: string, purpose?: string }[]>(skill?.files || []);
  const [openDropdownIndex, setOpenDropdownIndex] = useState<number | null>(null);
  const [isFunctionDropdownOpen, setIsFunctionDropdownOpen] = useState(false);
  
  const [selectedTribunais, setSelectedTribunais] = useState<string[]>([]);
  const [tribunalQuery, setTribunalQuery] = useState('');
  const [isTribunalMenuOpen, setIsTribunalMenuOpen] = useState(false);
  
  const [selectedAreas, setSelectedAreas] = useState<string[]>([]);
  const [areaQuery, setAreaQuery] = useState('');
  const [isAreaMenuOpen, setIsAreaMenuOpen] = useState(false);

  const tribunalRef = useRef<HTMLDivElement>(null);
  const areaRef = useRef<HTMLDivElement>(null);
  const functionDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (tribunalRef.current && !tribunalRef.current.contains(event.target as Node)) {
        setIsTribunalMenuOpen(false);
      }
      if (areaRef.current && !areaRef.current.contains(event.target as Node)) {
        setIsAreaMenuOpen(false);
      }
      if (functionDropdownRef.current && !functionDropdownRef.current.contains(event.target as Node)) {
        setIsFunctionDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    function handleDocumentClick(event: MouseEvent) {
      const target = event.target as HTMLElement;
      if (!target.closest('.purpose-dropdown')) {
        setOpenDropdownIndex(null);
      }
    }
    if (openDropdownIndex !== null) {
      document.addEventListener('mousedown', handleDocumentClick);
    }
    return () => document.removeEventListener('mousedown', handleDocumentClick);
  }, [openDropdownIndex]);

  useEffect(() => {
    const lowerName = name.toLowerCase();
    
    const keywordMap: { [key: string]: string } = {
      'civil': 'Direito Civil',
      'penal': 'Direito Penal',
      'trabalho': 'Direito do Trabalho',
      'tributário': 'Direito Tributário',
      'empresarial': 'Direito Empresarial',
      'administrativo': 'Direito Administrativo',
      'constitucional': 'Direito Constitucional',
      'previdenciário': 'Direito Previdenciário',
      'família': 'Direito de Família',
      'consumidor': 'Direito do Consumidor',
      'imobiliário': 'Direito Imobiliário',
      'ambiental': 'Direito Ambiental',
      'digital': 'Direito Digital',
      'eleitoral': 'Direito Eleitoral',
      'internacional': 'Direito Internacional',
      'processual civil': 'Direito Processual Civil',
      'processual penal': 'Direito Processual Penal'
    };

    let newSelectedAreas = [...selectedAreas];
    let changed = false;

    for (const [keyword, area] of Object.entries(keywordMap)) {
      if (lowerName.includes(keyword) && !newSelectedAreas.includes(area)) {
        newSelectedAreas.push(area);
        changed = true;
      }
    }

    if (changed) {
      setSelectedAreas(newSelectedAreas);
    }
  }, [name, selectedAreas]);

  const handleSave = () => {
    if (!name.trim() || !skillFunction) return;
    onSave({
      name,
      description: skillFunction,
      skillFunction,
      instructions,
      initialPhrases,
      iconId,
      themeId,
      objetividade,
      formalidade,
      files,
      selectedTribunais,
      selectedAreas
    });
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files as FileList).map((f: File) => ({
        name: f.name,
        size: (f.size / 1024).toFixed(1) + ' KB',
        purpose: 'estilo'
      }));
      setFiles([...files, ...newFiles]);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
      />

      {/* Modal Container */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative w-full max-w-2xl bg-white rounded-[16px] flex flex-col overflow-hidden max-h-[90vh]"
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-[#F3F4F6] flex items-center justify-between shrink-0">
          <div>
            <h1 className="text-lg font-bold text-[#111827]">{skill ? 'Configurar Habilidade' : 'Nova Habilidade'}</h1>
            <p className="text-xs text-[#6B7280]">Defina o comportamento do Jus IA para este perfil.</p>
          </div>
          <button 
            onClick={onClose}
            className="w-9 h-9 flex items-center justify-center rounded-lg text-slate-600 hover:bg-slate-50 transition-colors flex-shrink-0"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content - Vertical Scrollable */}
        <div className="flex-1 overflow-y-auto custom-scrollbar p-6">
          <div className="space-y-8">
            
            {/* Skill Settings (Vertical Layout) */}
            <section className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-[14px] font-bold text-[#111827]">Nome da habilidade</label>
                <input 
                  type="text" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ex: Especialista em Petição Inicial"
                  className="w-full px-3 py-2 text-sm bg-white border border-[#D1D5DB] rounded-lg outline-none focus:border-[#007A5F] transition-all"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[14px] font-bold text-[#111827]">Principal função da habilidade</label>
                <div className="relative" ref={functionDropdownRef}>
                  <button
                    type="button"
                    onClick={() => setIsFunctionDropdownOpen(!isFunctionDropdownOpen)}
                    className="w-full flex items-center justify-between px-3 py-2 text-sm bg-white border border-[#D1D5DB] rounded-lg outline-none focus:border-[#007A5F] focus:ring-1 focus:ring-[#007A5F] transition-all text-left"
                  >
                    <span className={`truncate ${skillFunction ? 'text-[#111827]' : 'text-[#6B7280]'}`}>
                      {skillFunction ? (SKILL_FUNCTIONS.find(f => f.id === skillFunction)?.label || skillFunction) : 'Selecione uma função...'}
                    </span>
                    <ChevronDown size={16} className="text-[#6B7280] shrink-0 ml-2" />
                  </button>

                  <AnimatePresence>
                    {isFunctionDropdownOpen && (
                      <motion.div 
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 5 }}
                        className="absolute left-0 right-0 top-full mt-1 bg-white border border-[#E5E7EB] rounded-lg shadow-xl z-50 overflow-hidden max-h-[300px] overflow-y-auto"
                      >
                        {SKILL_FUNCTIONS.map(func => (
                          <button
                            key={func.id}
                            type="button"
                            onClick={() => {
                              setSkillFunction(func.id);
                              setIsFunctionDropdownOpen(false);
                            }}
                            className={`w-full text-left px-3 py-2 hover:bg-[#F9FAFB] transition-colors border-b border-[#F3F4F6] last:border-0 ${skillFunction === func.id ? 'bg-[#007A5F]/5' : ''}`}
                          >
                            <div className="flex items-center justify-between mb-0.5">
                              <span className={`text-[12px] font-bold ${skillFunction === func.id ? 'text-[#007A5F]' : 'text-[#111827]'}`}>
                                {func.label}
                              </span>
                              {skillFunction === func.id && <Check size={14} className="text-[#007A5F]" />}
                            </div>
                            <p className="text-[11px] text-[#6B7280] leading-relaxed">
                              {func.description}
                            </p>
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[14px] font-bold text-[#111827]">Instruções</label>
                <textarea 
                  value={instructions}
                  onChange={(e) => setInstructions(e.target.value)}
                  placeholder="O que esta habilidade faz? Como ela se comporta? O que ela deve evitar?"
                  rows={6}
                  className="w-full px-3 py-2 text-sm bg-white border border-[#D1D5DB] rounded-lg outline-none focus:border-[#007A5F] transition-all resize-none"
                />
              </div>

              {/* Knowledge Base */}
              <section className="space-y-4 mt-8">
                <div className="flex flex-col">
                  {/* Info Box */}
                  <div className="p-4 bg-[#007A5F]/5 rounded-t-xl border border-[#007A5F]/10 border-b-0">
                    <div className="flex gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#007A5F] flex items-center justify-center text-white shrink-0 shadow-sm">
                        <Sparkles size={16} />
                      </div>
                      <div>
                        <h3 className="text-xs font-bold text-[#111827]">Base de Conhecimento e Estilo</h3>
                        <p className="text-[11px] text-[#6B7280] mt-1 leading-relaxed">
                          Faça upload de peças antigas ou modelos. A IA pode aprender seu <span className="text-[#007A5F] font-bold">estilo de escrita</span>, usar o documento como um <span className="text-[#007A5F] font-bold">modelo base</span> ou extrair argumentos de um <span className="text-[#007A5F] font-bold">caso similar</span>.
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="border border-dashed border-[#D1D5DB] rounded-b-xl p-6 flex flex-col items-center justify-center bg-white hover:bg-gray-50 hover:border-[#007A5F]/20 transition-all cursor-pointer relative group">
                    <input 
                      type="file" 
                      multiple 
                      className="absolute inset-0 opacity-0 cursor-pointer" 
                      onChange={handleFileUpload}
                    />
                    <div className="w-12 h-12 rounded-full bg-white border border-[#D1D5DB] flex items-center justify-center mb-3 group-hover:scale-110 transition-transform shadow-sm">
                      <Upload size={20} className="text-[#9CA3AF] group-hover:text-[#007A5F]" />
                    </div>
                    <p className="text-xs font-bold text-[#111827]">Clique ou arraste seus modelos e peças</p>
                    <p className="text-[10px] text-[#6B7280] mt-2 text-center max-w-[360px] leading-relaxed">
                      Após o upload, você poderá definir se o arquivo servirá para ensinar seu estilo, como modelo estrutural ou como referência de um caso similar.
                    </p>
                  </div>
                </div>

                {files.length > 0 && (
                  <div className="space-y-2">
                    {files.map((file, idx) => (
                      <div key={idx} className="flex flex-col sm:flex-row sm:items-center justify-between p-3 bg-white border border-[#D1D5DB] rounded-lg group gap-3">
                        <div className="flex items-center gap-3 min-w-0">
                          <div className="w-8 h-8 rounded bg-gray-50 flex items-center justify-center text-[#6B7280] shrink-0">
                            <FileText size={16} />
                          </div>
                          <div className="min-w-0">
                            <p className="text-xs font-bold text-[#111827] truncate max-w-[200px] sm:max-w-[240px]">{file.name}</p>
                            <p className="text-[10px] text-[#9CA3AF] font-bold">{file.size}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2 sm:ml-auto">
                          <div className="relative purpose-dropdown">
                            <button
                              onClick={() => setOpenDropdownIndex(openDropdownIndex === idx ? null : idx)}
                              className="flex items-center gap-1.5 text-[11px] font-medium text-[#4B5563] bg-[#F3F4F6] border border-transparent hover:border-[#D1D5DB] rounded-md px-2.5 py-1.5 outline-none focus:ring-1 focus:ring-[#007A5F] transition-all"
                            >
                              {FILE_PURPOSES.find(p => p.id === (file.purpose || 'estilo'))?.label}
                              <ChevronDown size={14} className="text-[#9CA3AF]" />
                            </button>
                            
                            <AnimatePresence>
                              {openDropdownIndex === idx && (
                                <motion.div 
                                  initial={{ opacity: 0, y: 5 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  exit={{ opacity: 0, y: 5 }}
                                  className="absolute right-0 top-full mt-1 w-72 bg-white border border-[#E5E7EB] rounded-lg shadow-xl z-50 overflow-hidden"
                                >
                                  {FILE_PURPOSES.map(purpose => (
                                    <button
                                      key={purpose.id}
                                      onClick={() => {
                                        const newFiles = [...files];
                                        newFiles[idx].purpose = purpose.id;
                                        setFiles(newFiles);
                                        setOpenDropdownIndex(null);
                                      }}
                                      className={`w-full text-left px-3 py-2 hover:bg-[#F9FAFB] transition-colors border-b border-[#F3F4F6] last:border-0 ${file.purpose === purpose.id ? 'bg-[#007A5F]/5' : ''}`}
                                    >
                                      <div className="flex items-center justify-between mb-0.5">
                                        <span className={`text-[11px] font-bold ${file.purpose === purpose.id ? 'text-[#007A5F]' : 'text-[#111827]'}`}>
                                          {purpose.label}
                                        </span>
                                        {file.purpose === purpose.id && <Check size={14} className="text-[#007A5F]" />}
                                      </div>
                                      <p className="text-[10px] text-[#6B7280] leading-relaxed">
                                        {purpose.description}
                                      </p>
                                    </button>
                                  ))}
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                          
                          <button 
                            onClick={() => setFiles(prev => prev.filter((_, i) => i !== idx))}
                            className="p-1.5 text-[#9CA3AF] hover:text-rose-500 hover:bg-rose-50 rounded-md transition-all shrink-0"
                            title="Remover arquivo"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </section>

              {/* Initial Phrases */}
              <div className="space-y-3 mt-8">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-[14px] font-bold text-[#111827]">Frases iniciais</h3>
                    <p className="text-[11px] text-[#6B7280] mt-0.5">Sugestões para o usuário iniciar a conversa</p>
                  </div>
                </div>
                
                <div className="space-y-2">
                  {initialPhrases.map((phrase, idx) => (
                    <div key={idx} className="flex items-center gap-2 group">
                      <div className="flex-1 px-3 py-2 bg-[#F3F4F6] border border-transparent rounded-lg text-sm text-[#4B5563]">
                        {phrase}
                      </div>
                      <button 
                        onClick={() => setInitialPhrases(prev => prev.filter((_, i) => i !== idx))}
                        className="p-2 text-[#9CA3AF] hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-all opacity-0 group-hover:opacity-100"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ))}
                  
                  <div className="flex items-center gap-2">
                    <input 
                      type="text"
                      value={newPhrase}
                      onChange={(e) => setNewPhrase(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && newPhrase.trim()) {
                          setInitialPhrases([...initialPhrases, newPhrase.trim()]);
                          setNewPhrase('');
                        }
                      }}
                      placeholder="Adicione uma sugestão de pergunta..."
                      className="flex-1 px-3 py-2 text-sm bg-white border border-[#D1D5DB] rounded-lg outline-none focus:border-[#007A5F] transition-all"
                    />
                    <button 
                      onClick={() => {
                        if (newPhrase.trim()) {
                          setInitialPhrases([...initialPhrases, newPhrase.trim()]);
                          setNewPhrase('');
                        }
                      }}
                      className="p-2 bg-[#007A5F] text-white rounded-lg hover:bg-[#006650] transition-colors"
                    >
                      <Plus size={20} />
                    </button>
                  </div>
                </div>
              </div>

              {/* Objetividade */}
              <section className="space-y-3 pt-4 border-t border-[#F3F4F6]">
                <div>
                  <h3 className="text-[14px] font-bold text-[#111827]">Objetividade da resposta</h3>
                  <p className="text-[11px] text-[#6B7280] mt-0.5">Define se as respostas/peças devem ser concisas ou expandir um pouco mais.</p>
                </div>
                <div className="flex p-1 bg-[#F3F4F6] rounded-xl w-full">
                  {['Enxuto', 'Equilibrado', 'Detalhado'].map((option) => (
                    <div key={option} className="flex-1 relative group/tooltip">
                      <button
                        type="button"
                        onClick={() => setObjetividade(option)}
                        className={`w-full py-2 text-xs font-bold rounded-lg transition-all ${
                          objetividade === option 
                            ? 'bg-white text-[#111827] shadow-sm' 
                            : 'text-[#6B7280] hover:text-[#111827]'
                        }`}
                      >
                        {option}
                      </button>
                      {/* Tooltip */}
                      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 p-2 bg-[#111827] text-white text-[10px] rounded-lg opacity-0 group-hover/tooltip:opacity-100 transition-opacity pointer-events-none z-[110] text-center shadow-xl">
                        {OBJETIVIDADE_TOOLTIPS[option]}
                        <div className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-[#111827]" />
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Formalidade */}
              <section className="space-y-3 pt-4 border-t border-[#F3F4F6]">
                <div>
                  <h3 className="text-[14px] font-bold text-[#111827]">Formalidade jurídica</h3>
                  <p className="text-[11px] text-[#6B7280] mt-0.5">Define o nível de linguagem jurídica das respostas/peças</p>
                </div>
                <div className="flex p-1 bg-[#F3F4F6] rounded-xl w-full">
                  {['Simples', 'Normal', 'Técnica'].map((option) => (
                    <div key={option} className="flex-1 relative group/tooltip">
                      <button
                        type="button"
                        onClick={() => setFormalidade(option)}
                        className={`w-full py-2 text-xs font-bold rounded-lg transition-all ${
                          formalidade === option 
                            ? 'bg-white text-[#111827] shadow-sm' 
                            : 'text-[#6B7280] hover:text-[#111827]'
                        }`}
                      >
                        {option}
                      </button>
                      {/* Tooltip */}
                      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 p-2 bg-[#111827] text-white text-[10px] rounded-lg opacity-0 group-hover/tooltip:opacity-100 transition-opacity pointer-events-none z-[110] text-center shadow-xl">
                        {FORMALIDADE_TOOLTIPS[option]}
                        <div className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-[#111827]" />
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              <div className="space-y-1.5 relative" ref={tribunalRef}>
                <div className="mb-2">
                  <label className="text-[14px] font-bold text-[#111827]">
                    Tribunais de preferência <span className="text-[#6B7280] font-normal text-xs ml-1">(opcional)</span>
                  </label>
                  <p className="text-[11px] text-[#6B7280] mt-0.5">Ajuda a IA a adaptar a formatação e jurisprudência para tribunais específicos.</p>
                </div>
                <div className="flex flex-wrap gap-1.5 p-2 border border-[#D1D5DB] rounded-lg bg-white min-h-[40px] focus-within:border-[#007A5F] transition-all">
                  {selectedTribunais.map(t => (
                    <span key={t} className="flex items-center gap-1 px-2 py-0.5 bg-[#F3F4F6] text-[#4B5563] text-[11px] font-bold rounded-md">
                      {t}
                      <button onClick={() => setSelectedTribunais(prev => prev.filter(item => item !== t))}>
                        <X size={12} />
                      </button>
                    </span>
                  ))}
                  <input 
                    type="text"
                    value={tribunalQuery}
                    onChange={(e) => {
                      setTribunalQuery(e.target.value);
                      setIsTribunalMenuOpen(true);
                    }}
                    onFocus={() => setIsTribunalMenuOpen(true)}
                    placeholder={selectedTribunais.length === 0 ? "Ex: STF, TJSP..." : ""}
                    className="flex-1 min-w-[60px] outline-none text-sm bg-transparent"
                  />
                </div>
                <AnimatePresence>
                  {isTribunalMenuOpen && (
                    <motion.div 
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 5 }}
                      className="absolute z-50 top-full left-0 right-0 mt-1 bg-white border border-[#E5E7EB] rounded-lg shadow-lg max-h-48 overflow-y-auto custom-scrollbar"
                    >
                      {TRIBUNAIS.filter(t => t.toLowerCase().includes(tribunalQuery.toLowerCase()) && !selectedTribunais.includes(t)).map(t => (
                        <button
                          key={t}
                          onClick={() => {
                            setSelectedTribunais([...selectedTribunais, t]);
                            setTribunalQuery('');
                            setIsTribunalMenuOpen(false);
                          }}
                          className="w-full text-left px-4 py-2 text-sm hover:bg-[#F9FAFB] text-[#4B5563] transition-colors"
                        >
                          {t}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className="space-y-1.5 relative" ref={areaRef}>
                <div className="mb-2">
                  <label className="text-[14px] font-bold text-[#111827]">
                    Área do direito <span className="text-[#6B7280] font-normal text-xs ml-1">(opcional)</span>
                  </label>
                  <p className="text-[11px] text-[#6B7280] mt-0.5">Define o contexto jurídico principal para melhorar a precisão das respostas.</p>
                </div>
                <div className="flex flex-wrap gap-1.5 p-2 border border-[#D1D5DB] rounded-lg bg-white min-h-[40px] focus-within:border-[#007A5F] transition-all">
                  {selectedAreas.map(a => (
                    <span key={a} className="flex items-center gap-1 px-2 py-0.5 bg-[#F3F4F6] text-[#4B5563] text-[11px] font-bold rounded-md">
                      {a}
                      <button onClick={() => setSelectedAreas(prev => prev.filter(item => item !== a))}>
                        <X size={12} />
                      </button>
                    </span>
                  ))}
                  <input 
                    type="text"
                    value={areaQuery}
                    onChange={(e) => {
                      setAreaQuery(e.target.value);
                      setIsAreaMenuOpen(true);
                    }}
                    onFocus={() => setIsAreaMenuOpen(true)}
                    placeholder={selectedAreas.length === 0 ? "Ex: Civil, Penal..." : ""}
                    className="flex-1 min-w-[60px] outline-none text-sm bg-transparent"
                  />
                </div>
                <AnimatePresence>
                  {isAreaMenuOpen && (
                    <motion.div 
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 5 }}
                      className="absolute z-50 top-full left-0 right-0 mt-1 bg-white border border-[#E5E7EB] rounded-lg shadow-lg max-h-48 overflow-y-auto custom-scrollbar"
                    >
                      {AREAS_DIREITO.filter(a => a.toLowerCase().includes(areaQuery.toLowerCase()) && !selectedAreas.includes(a)).map(a => (
                        <button
                          key={a}
                          onClick={() => {
                            setSelectedAreas([...selectedAreas, a]);
                            setAreaQuery('');
                            setIsAreaMenuOpen(false);
                          }}
                          className="w-full text-left px-4 py-2 text-sm hover:bg-[#F9FAFB] text-[#4B5563] transition-colors"
                        >
                          {a}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className="space-y-1.5 pt-4 border-t border-[#F3F4F6]">
                <div className="mb-2">
                  <label className="text-[14px] font-bold text-[#111827]">
                    Capa da habilidade
                  </label>
                  <p className="text-[11px] text-[#6B7280] mt-0.5">Personalize o ícone e a cor para facilitar a identificação.</p>
                </div>
                <div className="flex flex-wrap items-center gap-6 pt-1">
                  {/* Icon Selection */}
                  <div className="flex items-center gap-1.5">
                    <div className="flex gap-1">
                      {LEGAL_ICONS.map((iconData) => {
                        const theme = COLOR_THEMES.find(t => t.id === themeId);
                        const isSelected = iconId === iconData.id;
                        return (
                          <button
                            key={iconData.id}
                            onClick={() => setIconId(iconData.id)}
                            className={`w-8 h-8 rounded-md flex items-center justify-center transition-all ${
                              isSelected 
                                ? `${theme?.bg || 'bg-slate-100'}` 
                                : 'hover:bg-gray-100'
                            }`}
                          >
                            <iconData.icon size={16} className={isSelected ? (theme?.text || 'text-slate-800') : 'text-slate-600'} />
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Theme Selection */}
                  <div className="flex items-center gap-3">
                    <div className="flex gap-1.5">
                      {COLOR_THEMES.map((themeData) => (
                        <button
                          key={themeData.id}
                          onClick={() => setThemeId(themeData.id)}
                          className={`w-6 h-6 rounded-md ${themeData.bg} ${themeData.text} flex items-center justify-center transition-all ${
                            themeId === themeData.id ? 'ring-2 ring-offset-1 ring-[#007A5F]' : 'opacity-70 hover:opacity-100'
                          }`}
                        >
                          <Check size={12} className={themeId === themeData.id ? 'opacity-100' : 'opacity-0'} />
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Uninstall Button */}
            {skill && onUninstall && (
              <div className="pt-6 border-t border-[#F3F4F6]">
                <button
                  onClick={onUninstall}
                  className="flex items-center gap-2 text-[13px] font-bold text-rose-600 hover:text-rose-700 hover:bg-rose-50 px-3 py-2 rounded-lg transition-colors -ml-3"
                >
                  <Trash2 size={16} />
                  Desinstalar habilidade
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-[#F3F4F6] flex items-center justify-end gap-3 shrink-0 bg-white">
          <button
            onClick={onClose}
            className="px-3 h-9 flex items-center justify-center border border-slate-300 rounded-lg text-slate-600 hover:bg-slate-50 transition-all text-[13px] font-semibold"
          >
            Cancelar
          </button>
          <button
            onClick={handleSave}
            disabled={!name.trim() || !skillFunction}
            className="px-3 h-9 flex items-center justify-center bg-[#007A5F] text-white rounded-lg hover:bg-[#00664F] transition-colors text-[13px] font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {skill ? 'Salvar alterações' : 'Criar habilidade'}
          </button>
        </div>
      </motion.div>
    </div>
  );
};
