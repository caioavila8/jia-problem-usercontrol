import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  ChevronLeft, 
  ChevronDown, 
  Save, 
  Sparkles, 
  Mic, 
  ArrowUp, 
  Plus,
  MessageSquare,
  Trash2,
  Check,
  Info,
  Upload,
  FileText
} from 'lucide-react';
import { Gem } from '../types';
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

interface GemsEditorProps {
  gem?: Gem;
  onSave: (gemData: Partial<Gem>) => void;
  onClose: () => void;
}

export function GemsEditor({ gem, onSave, onClose }: GemsEditorProps) {
  const [activeTab, setActiveTab] = useState<'criar' | 'configurar'>('criar');
  const [name, setName] = useState(gem?.name || '');
  const [description, setDescription] = useState(gem?.description || '');
  const [instructions, setInstructions] = useState(gem?.instructions || '');
  const [initialPhrases, setInitialPhrases] = useState<string[]>(gem?.initialPhrases || []);
  const [iconId, setIconId] = useState(gem?.iconId || LEGAL_ICONS[0].id);
  const [themeId, setThemeId] = useState(gem?.themeId || COLOR_THEMES[0].id);
  const [objetividade, setObjetividade] = useState(gem?.objetividade || 'Equilibrado');
  const [formalidade, setFormalidade] = useState(gem?.formalidade || 'Normal');
  const [skillFunction, setSkillFunction] = useState(gem?.skillFunction || 'redacao');
  const [files, setFiles] = useState<{ name: string, size: string, purpose?: string }[]>(gem?.files || []);
  const [selectedTribunais, setSelectedTribunais] = useState<string[]>(gem?.selectedTribunais || []);
  const [tribunalQuery, setTribunalQuery] = useState('');
  const [isTribunalMenuOpen, setIsTribunalMenuOpen] = useState(false);
  const [selectedAreas, setSelectedAreas] = useState<string[]>(gem?.selectedAreas || []);
  const [areaQuery, setAreaQuery] = useState('');
  const [isAreaMenuOpen, setIsAreaMenuOpen] = useState(false);
  const [openDropdownIndex, setOpenDropdownIndex] = useState<number | null>(null);

  const tribunalRef = useRef<HTMLDivElement>(null);
  const areaRef = useRef<HTMLDivElement>(null);

  const [isFunctionDropdownOpen, setIsFunctionDropdownOpen] = useState(false);
  const functionDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (functionDropdownRef.current && !functionDropdownRef.current.contains(event.target as Node)) {
        setIsFunctionDropdownOpen(false);
      }
      if (tribunalRef.current && !tribunalRef.current.contains(event.target as Node)) {
        setIsTribunalMenuOpen(false);
      }
      if (areaRef.current && !areaRef.current.contains(event.target as Node)) {
        setIsAreaMenuOpen(false);
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
  const [newPhrase, setNewPhrase] = useState('');
  const [chatInput, setChatInput] = useState('');
  const [previewInput, setPreviewInput] = useState('');
  const [messages, setMessages] = useState<{ role: 'user' | 'assistant', content: string }[]>([
    { role: 'assistant', content: 'Olá! Eu sou o assistente de criação Jus IA. Como posso ajudar você a configurar seu novo agente hoje? O que ele deve fazer e quais regras deve sempre seguir?' }
  ]);
  const [previewMessages, setPreviewMessages] = useState<{ role: 'user' | 'assistant', content: string }[]>([]);

  const handleAddPhrase = () => {
    if (newPhrase.trim()) {
      setInitialPhrases([...initialPhrases, newPhrase.trim()]);
      setNewPhrase('');
    }
  };

  const handleRemovePhrase = (index: number) => {
    setInitialPhrases(initialPhrases.filter((_, i) => i !== index));
  };

  const handleChatSubmit = () => {
    if (chatInput.trim()) {
      setMessages([...messages, { role: 'user', content: chatInput }]);
      setChatInput('');
      // Simulate AI response
      setTimeout(() => {
        setMessages(prev => [...prev, { role: 'assistant', content: 'Entendido! Estou atualizando as configurações do seu agente com base no que você me disse.' }]);
      }, 1000);
    }
  };

  const handlePreviewSubmit = () => {
    if (previewInput.trim()) {
      setPreviewMessages([...previewMessages, { role: 'user', content: previewInput }]);
      setPreviewInput('');
      // Simulate AI response
      setTimeout(() => {
        setPreviewMessages(prev => [...prev, { role: 'assistant', content: `Olá! Eu sou o ${name || 'seu novo agente'}. Como posso ajudar você hoje?` }]);
      }, 1000);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] bg-white flex flex-col overflow-hidden">
      {/* Header */}
      <div className="h-[56px] border-b border-slate-200 flex items-center justify-between px-4 shrink-0">
        <div className="flex items-center gap-4">
          <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
            <ChevronLeft size={20} className="text-slate-600" />
          </button>
          <div className="flex items-center gap-3">
            <div className={`w-8 h-8 rounded-lg ${COLOR_THEMES.find(t => t.id === themeId)?.bg || 'bg-blue-500'} flex items-center justify-center ${COLOR_THEMES.find(t => t.id === themeId)?.text || 'text-white'}`}>
              {React.createElement(LEGAL_ICONS.find(i => i.id === iconId)?.icon || Sparkles, { size: 18 })}
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-bold text-slate-900">{name || 'Novo Agente'}</span>
              <span className="text-[11px] text-slate-500">Editando Agente</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button 
            onClick={() => onSave({ 
              name, 
              description, 
              instructions, 
              initialPhrases, 
              iconId, 
              themeId, 
              objetividade, 
              formalidade,
              skillFunction,
              files,
              selectedTribunais,
              selectedAreas
            })}
            className="flex items-center gap-2 bg-[#007A5F] hover:bg-[#006650] text-white px-6 py-2 rounded-lg text-sm font-bold transition-colors"
          >
            <span>Salvar</span>
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Side: Editor */}
        <div className="w-1/2 border-r border-slate-200 flex flex-col overflow-hidden">
          {/* Segmented Control */}
          <div className="flex justify-center py-4 px-6">
            <div className="flex p-1 bg-slate-100 rounded-xl w-full max-w-[400px]">
              <button 
                onClick={() => setActiveTab('criar')}
                className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
                  activeTab === 'criar' 
                    ? 'bg-white text-slate-900 shadow-sm' 
                    : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                Criar
              </button>
              <button 
                onClick={() => setActiveTab('configurar')}
                className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
                  activeTab === 'configurar' 
                    ? 'bg-white text-slate-900 shadow-sm' 
                    : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                Configurar
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto custom-scrollbar">
            <AnimatePresence mode="wait">
              {activeTab === 'criar' ? (
                <motion.div 
                  key="criar"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="h-full flex flex-col p-6"
                >
                  <div className="flex-1 flex flex-col gap-4">
                    {messages.map((msg, i) => (
                      <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-[85%] px-4 py-3 text-sm ${msg.role === 'user' ? 'bg-[#F3F4F6] text-slate-900 rounded-2xl' : 'text-slate-700'}`}>
                          {msg.role === 'assistant' && (
                            <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">Resposta</div>
                          )}
                          {msg.content}
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-6">
                    <div className="border border-slate-200 rounded-2xl bg-white px-4 py-2.5 relative flex items-center gap-3 w-full">
                      <textarea
                        value={chatInput}
                        onChange={(e) => setChatInput(e.target.value)}
                        placeholder="Diga como você quer que seu agente seja..."
                        className="flex-1 outline-none text-slate-800 text-[14px] min-h-[24px] max-h-[168px] overflow-y-auto bg-transparent leading-relaxed py-1.5 resize-none custom-scrollbar"
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' && !e.shiftKey) {
                            e.preventDefault();
                            handleChatSubmit();
                          }
                        }}
                      />
                      <div className="flex items-center gap-2 shrink-0">
                        <button className="w-9 h-9 flex items-center justify-center border border-slate-300 rounded-lg text-slate-600 hover:bg-slate-50 transition-colors">
                          <Mic size={20} />
                        </button>
                        <button 
                          onClick={handleChatSubmit}
                          className={`w-9 h-9 flex items-center justify-center rounded-lg transition-all ${chatInput.trim() ? 'bg-[#007A5A] text-white' : 'bg-slate-100 text-slate-400'}`}
                        >
                          <ArrowUp size={20} />
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div 
                  key="configurar"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="p-6 flex flex-col gap-8"
                >
                  <div className="space-y-6">
                    {/* Name */}
                    <div className="space-y-1.5">
                      <label className="text-[14px] font-bold text-[#111827]">Nome do agente</label>
                      <input 
                        type="text" 
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Ex: Especialista em Contratos"
                        className="w-full px-3 py-2 text-sm bg-white border border-[#D1D5DB] rounded-lg outline-none focus:border-[#007A5F] transition-all"
                      />
                    </div>

                    {/* Description */}
                    <div className="space-y-1.5">
                      <label className="text-[14px] font-bold text-[#111827]">Descrição</label>
                      <input 
                        type="text" 
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Uma breve descrição do que o agente faz"
                        className="w-full px-3 py-2 text-sm bg-white border border-[#D1D5DB] rounded-lg outline-none focus:border-[#007A5F] transition-all"
                      />
                    </div>

                    {/* Principal Função */}
                    <div className="space-y-1.5">
                      <label className="text-[14px] font-bold text-[#111827]">Principal função do agente</label>
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

                    {/* Instructions */}
                    <div className="space-y-1.5">
                      <label className="text-[14px] font-bold text-[#111827]">Instruções</label>
                      <textarea 
                        value={instructions}
                        onChange={(e) => setInstructions(e.target.value)}
                        placeholder="O que este agente deve fazer? Como ele deve se comportar? Quais regras ele deve seguir?"
                        className="w-full px-3 py-2 text-sm bg-white border border-[#D1D5DB] rounded-lg outline-none focus:border-[#007A5F] transition-all min-h-[120px] resize-none custom-scrollbar"
                      />
                      <p className="text-[11px] text-[#6B7280]">
                        As instruções definem o comportamento e o conhecimento do seu agente.
                      </p>
                    </div>

                    {/* Knowledge Base */}
                    <section className="space-y-4">
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
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <label className="text-[14px] font-bold text-[#111827]">Prompts iniciais</label>
                      </div>
                      <div className="space-y-2">
                        {initialPhrases.map((phrase, i) => (
                          <div key={i} className="flex items-center gap-2">
                            <div className="flex-1 px-3 py-2 text-sm bg-slate-50 border border-[#D1D5DB] rounded-lg text-slate-600">
                              {phrase}
                            </div>
                            <button 
                              onClick={() => handleRemovePhrase(i)}
                              className="p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-all"
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
                            placeholder="Adicionar novo prompt..."
                            className="flex-1 px-3 py-2 text-sm bg-white border border-[#D1D5DB] rounded-lg outline-none focus:border-[#007A5F] transition-all"
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') {
                                e.preventDefault();
                                handleAddPhrase();
                              }
                            }}
                          />
                          <button 
                            onClick={handleAddPhrase}
                            className="p-2 bg-[#007A5F] text-white rounded-lg hover:bg-[#006650] transition-colors"
                          >
                            <Plus size={16} />
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Objetividade */}
                    <section className="space-y-3 pt-4 border-t border-[#F3F4F6]">
                      <div>
                        <h3 className="text-[14px] font-bold text-[#111827]">Objetividade da resposta</h3>
                        <p className="text-[11px] text-[#6B7280] mt-0.5">Define se as respostas devem ser concisas ou expandir um pouco mais.</p>
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
                        <p className="text-[11px] text-[#6B7280] mt-0.5">Define o nível de linguagem jurídica das respostas</p>
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
                            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 p-2 bg-[#111827] text-white text-[10px] rounded-lg opacity-0 group-hover/tooltip:opacity-100 transition-opacity pointer-events-none z-[110] text-center shadow-xl">
                              {FORMALIDADE_TOOLTIPS[option]}
                              <div className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-[#111827]" />
                            </div>
                          </div>
                        ))}
                      </div>
                    </section>

                    {/* Tribunais */}
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

                    {/* Áreas do Direito */}
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

                    {/* Icon & Theme */}
                    <div className="space-y-1.5 pt-4 border-t border-[#F3F4F6]">
                      <div className="mb-2">
                        <label className="text-[14px] font-bold text-[#111827]">
                          Capa do agente
                        </label>
                        <p className="text-[11px] text-[#6B7280] mt-0.5">Personalize o ícone e a cor para facilitar a identificação.</p>
                      </div>
                      <div className="flex flex-wrap items-center gap-6 pt-1">
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
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Right Side: Preview */}
        <div className="w-1/2 bg-white flex flex-col overflow-hidden relative">
          <div className="h-[56px] flex items-center justify-center border-b border-slate-100 bg-slate-50/50">
            <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Modo de Visualização (Preview)
            </div>
          </div>

          <div className="flex-1 flex flex-col items-center justify-center p-12 overflow-y-auto custom-scrollbar">
            {previewMessages.length === 0 ? (
              <div className="flex flex-col items-center text-center max-w-md">
                <div className={`w-20 h-20 rounded-2xl ${COLOR_THEMES.find(t => t.id === themeId)?.bg || 'bg-blue-500'} flex items-center justify-center ${COLOR_THEMES.find(t => t.id === themeId)?.text || 'text-white'} shadow-xl mb-6`}>
                  {React.createElement(LEGAL_ICONS.find(i => i.id === iconId)?.icon || Sparkles, { size: 40 })}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">{name || 'Especialista em Contratos'}</h3>
                <p className="text-sm text-slate-500 mb-8">{description || 'Analisa e redige contratos complexos.'}</p>
                
                <div className="grid grid-cols-1 gap-2 w-full">
                  {initialPhrases.map((phrase, i) => (
                    <button 
                      key={i}
                      onClick={() => {
                        setPreviewMessages([{ role: 'user', content: phrase }, { role: 'assistant', content: `Olá! Eu sou o ${name || 'seu novo agente'}. Como posso ajudar você hoje?` }]);
                      }}
                      className="px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm text-slate-600 hover:border-slate-400 transition-all text-left"
                    >
                      {phrase}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="w-full max-w-2xl flex flex-col gap-6">
                {previewMessages.map((msg, i) => (
                  <div key={i} className={`flex gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${msg.role === 'user' ? 'bg-slate-200 text-slate-600' : `${COLOR_THEMES.find(t => t.id === themeId)?.bg || 'bg-blue-500'} ${COLOR_THEMES.find(t => t.id === themeId)?.text || 'text-white'}`}`}>
                      {msg.role === 'user' ? <MessageSquare size={16} /> : React.createElement(LEGAL_ICONS.find(i => i.id === iconId)?.icon || Sparkles, { size: 16 })}
                    </div>
                    <div className={`max-w-[80%] px-4 py-3 text-sm ${msg.role === 'user' ? 'bg-[#F3F4F6] text-slate-900 rounded-2xl' : 'text-slate-700'}`}>
                      {msg.role === 'assistant' && (
                        <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">Resposta</div>
                      )}
                      {msg.content}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Preview Input */}
          <div className="p-6 bg-white">
            <div className="max-w-2xl mx-auto">
              <div className="border border-slate-200 rounded-2xl bg-white px-4 py-2.5 relative flex items-center gap-3 w-full">
                <textarea
                  value={previewInput}
                  onChange={(e) => setPreviewInput(e.target.value)}
                  placeholder={`Mensagem para ${name || 'Especialista em Contratos'}...`}
                  className="flex-1 outline-none text-slate-800 text-[14px] min-h-[24px] max-h-[168px] overflow-y-auto bg-transparent leading-relaxed py-1.5 resize-none custom-scrollbar"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handlePreviewSubmit();
                    }
                  }}
                />
                <div className="flex items-center gap-2 shrink-0">
                  <button className="w-9 h-9 flex items-center justify-center border border-slate-300 rounded-lg text-slate-600 hover:bg-slate-50 transition-colors">
                    <Mic size={20} />
                  </button>
                  <button 
                    onClick={handlePreviewSubmit}
                    className={`w-9 h-9 flex items-center justify-center rounded-lg transition-all ${previewInput.trim() ? 'bg-[#007A5A] text-white' : 'bg-slate-100 text-slate-400'}`}
                  >
                    <ArrowUp size={20} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
