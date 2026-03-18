import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  ChevronLeft, 
  MessageSquare, 
  Settings, 
  Plus, 
  Sparkles, 
  Image as ImageIcon, 
  Paperclip, 
  ArrowUp,
  Mic,
  Save,
  Trash2,
  Globe,
  Lock,
  ChevronDown,
  Info,
  MessageSquareText
} from 'lucide-react';

interface Gem {
  id?: string;
  name: string;
  description: string;
  instructions: string;
  starters: string[];
  knowledge: string[];
  icon: string;
  color: string;
}

interface JusStudioProps {
  gem?: Gem | null;
  onClose: () => void;
  onSave: (gem: Gem) => void;
}

export function JusStudio({ gem, onClose, onSave }: JusStudioProps) {
  const [activeTab, setActiveTab] = useState<'create' | 'configure'>('create');
  const [name, setName] = useState(gem?.name || '');
  const [description, setDescription] = useState(gem?.description || '');
  const [instructions, setInstructions] = useState(gem?.instructions || '');
  const [starters, setStarters] = useState<string[]>(gem?.starters || ['', '', '']);
  const [previewMessages, setPreviewMessages] = useState<{ role: 'user' | 'assistant', content: string }[]>([]);
  const [previewInput, setPreviewInput] = useState('');
  const [chatMessages, setChatMessages] = useState<{ role: 'user' | 'assistant', content: string }[]>([
    { role: 'assistant', content: 'Olá! Eu sou o agente de criação do Jus Studio. Como posso ajudar você a configurar seu novo agente hoje?' }
  ]);
  const [chatInput, setChatInput] = useState('');

  const handleSave = () => {
    onSave({
      id: gem?.id,
      name: name || 'Novo Agente',
      description,
      instructions,
      starters: starters.filter(s => s.trim() !== ''),
      knowledge: [],
      icon: gem?.icon || 'sparkles',
      color: gem?.color || 'bg-slate-500'
    });
  };

  const handlePreviewSubmit = () => {
    if (!previewInput.trim()) return;
    const userMsg = previewInput;
    setPreviewMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setPreviewInput('');
    
    // Mock response
    setTimeout(() => {
      setPreviewMessages(prev => [...prev, { 
        role: 'assistant', 
        content: `Como seu agente "${name || 'Novo Agente'}", estou pronto para ajudar com base nas instruções: ${instructions || 'Nenhuma instrução fornecida ainda.'}` 
      }]);
    }, 1000);
  };

  const handleChatSubmit = () => {
    if (!chatInput.trim()) return;
    const userMsg = chatInput;
    setChatMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    const input = userMsg.toLowerCase();
    setChatInput('');

    // Simple logic to simulate configuration via chat
    setTimeout(() => {
      let response = "Entendido! O que mais você gostaria de configurar?";
      if (input.includes('nome') || input.includes('chame')) {
        const match = userMsg.match(/chame de (.*)|nome é (.*)/i);
        const newName = match ? (match[1] || match[2]) : "Agente";
        setName(newName);
        response = `Ótimo! Alterei o nome para "${newName}".`;
      } else if (input.includes('instrução') || input.includes('ajude')) {
        setInstructions(userMsg);
        response = "Instruções atualizadas com sucesso.";
      }
      
      setChatMessages(prev => [...prev, { role: 'assistant', content: response }]);
    }, 1000);
  };

  return (
    <div className="flex flex-col h-full w-full bg-white overflow-hidden">
      {/* Top Bar */}
      <div className="h-14 border-b border-slate-200 flex items-center justify-between px-4 flex-shrink-0">
        <div className="flex items-center gap-4">
          <button 
            onClick={onClose}
            className="p-2 hover:bg-slate-100 rounded-lg text-slate-600 transition-colors"
          >
            <ChevronLeft size={20} />
          </button>
          <div className="flex items-center gap-2">
            <div className={`w-8 h-8 rounded-lg ${gem?.color || 'bg-slate-100'} flex items-center justify-center text-white`}>
              <Sparkles size={18} />
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-900 leading-tight">{name || 'Novo Agente'}</h2>
              <p className="text-[11px] text-slate-500 font-medium">Editando Agente</p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button className="px-3 py-1.5 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-lg transition-colors flex items-center gap-2">
            <Globe size={14} />
            Público
            <ChevronDown size={14} />
          </button>
          <button 
            onClick={handleSave}
            className="px-4 py-1.5 bg-[#007A5A] text-white text-xs font-bold rounded-lg hover:bg-[#006A4E] transition-colors flex items-center gap-2"
          >
            <Save size={14} />
            Salvar
          </button>
        </div>
      </div>

      {/* Main Split View */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Side: Configuration */}
        <div className="w-1/2 border-r border-slate-200 flex flex-col h-full bg-slate-50/30">
          {/* Tabs */}
          <div className="flex border-b border-slate-200 px-6">
            <button 
              onClick={() => setActiveTab('create')}
              className={`px-4 py-3 text-sm font-bold transition-all relative ${activeTab === 'create' ? 'text-slate-900' : 'text-slate-400 hover:text-slate-600'}`}
            >
              Criar
              {activeTab === 'create' && (
                <motion.div layoutId="studio-tab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-slate-900" />
              )}
            </button>
            <button 
              onClick={() => setActiveTab('configure')}
              className={`px-4 py-3 text-sm font-bold transition-all relative ${activeTab === 'configure' ? 'text-slate-900' : 'text-slate-400 hover:text-slate-600'}`}
            >
              Configurar
              {activeTab === 'configure' && (
                <motion.div layoutId="studio-tab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-slate-900" />
              )}
            </button>
          </div>

          {/* Tab Content */}
          <div className="flex-1 overflow-y-auto custom-scrollbar">
            {activeTab === 'create' ? (
              <div className="h-full flex flex-col p-6">
                <div className="flex-1 flex flex-col gap-8 overflow-y-auto mb-4 custom-scrollbar">
                  {chatMessages.map((msg, i) => (
                    <div key={i} className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                      <div className={`flex gap-4 max-w-[85%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                        <div className={`w-8 h-8 rounded-lg flex-shrink-0 flex items-center justify-center ${
                          msg.role === 'user' ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-600'
                        }`}>
                          {msg.role === 'user' ? 'J' : <Sparkles size={16} />}
                        </div>
                        <div className={`flex flex-col gap-1 ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                          <div className={`rounded-2xl px-4 py-3 text-[14px] leading-relaxed shadow-sm ${
                            msg.role === 'user' 
                              ? 'bg-slate-100 text-slate-800 rounded-tr-none' 
                              : 'bg-white border border-slate-100 text-slate-700 rounded-tl-none'
                          }`}>
                            {msg.content}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="relative">
                  <input 
                    type="text"
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleChatSubmit()}
                    placeholder="Diga como você quer que seu agente seja..."
                    className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 pr-12 text-sm outline-none focus:border-slate-400 transition-all shadow-sm"
                  />
                  <button 
                    onClick={handleChatSubmit}
                    className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-slate-900 text-white rounded-lg flex items-center justify-center hover:bg-slate-800 transition-colors"
                  >
                    <ArrowUp size={16} />
                  </button>
                </div>
              </div>
            ) : (
              <div className="p-8 flex flex-col gap-8 max-w-2xl mx-auto">
                {/* Icon Picker Placeholder */}
                <div className="flex flex-col items-center gap-4">
                  <div className={`w-20 h-20 rounded-2xl ${gem?.color || 'bg-slate-100'} border-2 border-dashed border-slate-300 flex items-center justify-center text-white cursor-pointer hover:border-slate-400 transition-all`}>
                    <Sparkles size={32} />
                  </div>
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Ícone do Agente</span>
                </div>

                {/* Form Fields */}
                <div className="flex flex-col gap-6">
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-bold text-slate-700">Nome</label>
                    <input 
                      type="text" 
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Dê um nome ao seu agente"
                      className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-slate-400 transition-all"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-bold text-slate-700">Descrição</label>
                    <input 
                      type="text" 
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Uma breve descrição do que ele faz"
                      className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-slate-400 transition-all"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-bold text-slate-700">Instruções</label>
                    <textarea 
                      rows={6}
                      value={instructions}
                      onChange={(e) => setInstructions(e.target.value)}
                      placeholder="O que este agente faz? Como ele se comporta? O que ele deve evitar?"
                      className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-slate-400 transition-all resize-none"
                    />
                  </div>

                  <div className="flex flex-col gap-4">
                    <div className="flex items-center justify-between">
                      <label className="text-sm font-bold text-slate-700">Frases Iniciais</label>
                      <button 
                        onClick={() => setStarters([...starters, ''])}
                        className="text-xs font-bold text-[#007A5A] hover:underline"
                      >
                        Adicionar
                      </button>
                    </div>
                    <div className="flex flex-col gap-2">
                      {starters.map((starter, i) => (
                        <div key={i} className="relative group">
                          <input 
                            type="text" 
                            value={starter}
                            onChange={(e) => {
                              const newStarters = [...starters];
                              newStarters[i] = e.target.value;
                              setStarters(newStarters);
                            }}
                            placeholder={`Exemplo de pergunta ${i + 1}`}
                            className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 pr-10 text-sm outline-none focus:border-slate-400 transition-all"
                          />
                          <button 
                            onClick={() => setStarters(starters.filter((_, idx) => idx !== i))}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-rose-500 opacity-0 group-hover:opacity-100 transition-all"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col gap-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <label className="text-sm font-bold text-slate-700">Conhecimento</label>
                        <Info size={14} className="text-slate-400" />
                      </div>
                    </div>
                    <button className="w-full py-8 border-2 border-dashed border-slate-200 rounded-2xl flex flex-col items-center justify-center gap-2 hover:bg-slate-50 hover:border-slate-300 transition-all group">
                      <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 group-hover:bg-white transition-colors">
                        <Paperclip size={20} />
                      </div>
                      <span className="text-xs font-bold text-slate-500">Upload de arquivos</span>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Side: Preview */}
        <div className="w-1/2 flex flex-col h-full bg-white relative">
          <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10">
            <span className="px-3 py-1 bg-slate-100 text-slate-500 text-[10px] font-bold uppercase tracking-widest rounded-full">Preview</span>
          </div>

          <div className="flex-1 overflow-y-auto p-8 flex flex-col gap-8 custom-scrollbar">
            {previewMessages.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center text-center max-w-sm mx-auto">
                <div className={`w-16 h-16 rounded-2xl ${gem?.color || 'bg-slate-100'} flex items-center justify-center text-white mb-4 shadow-sm`}>
                  <Sparkles size={32} />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">{name || 'Novo Agente'}</h3>
                <p className="text-sm text-slate-500 mb-8">{description || 'Configure as instruções ao lado para começar o preview.'}</p>
                
                <div className="grid grid-cols-1 gap-2 w-full">
                  {starters.filter(s => s.trim() !== '').map((starter, i) => (
                    <button 
                      key={i}
                      onClick={() => {
                        setPreviewInput(starter);
                        // Trigger submit manually
                        setTimeout(() => handlePreviewSubmit(), 100);
                      }}
                      className="p-3 text-xs text-slate-600 border border-slate-200 rounded-xl hover:bg-slate-50 transition-all text-left font-medium flex items-center gap-3"
                    >
                      <MessageSquareText size={14} className="text-slate-400" />
                      {starter}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="flex flex-col gap-10 max-w-2xl mx-auto w-full">
                {previewMessages.map((msg, i) => (
                  <div key={i} className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                    <div className={`flex gap-4 max-w-[85%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                      <div className={`w-8 h-8 rounded-lg flex-shrink-0 flex items-center justify-center ${
                        msg.role === 'user' ? 'bg-slate-900 text-white' : (gem?.color || 'bg-slate-100 text-white')
                      }`}>
                        {msg.role === 'user' ? 'J' : <Sparkles size={16} />}
                      </div>
                      <div className={`flex flex-col gap-1 ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                        <div className={`rounded-2xl px-4 py-3 text-[15px] leading-relaxed shadow-sm ${
                          msg.role === 'user' 
                            ? 'bg-slate-100 text-slate-800 rounded-tr-none' 
                            : 'bg-white border border-slate-100 text-slate-700 rounded-tl-none'
                        }`}>
                          {msg.content}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="p-6 border-t border-slate-100">
            <div className="max-w-2xl mx-auto w-full">
              <div className="relative border border-slate-200 rounded-2xl bg-white shadow-sm flex flex-col">
                <div className="p-4 flex items-center gap-3">
                  <button className="w-8 h-8 flex items-center justify-center border border-slate-200 rounded-lg text-slate-400 hover:bg-slate-50 transition-colors">
                    <Plus size={18} />
                  </button>
                  <input 
                    type="text"
                    value={previewInput}
                    onChange={(e) => setPreviewInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handlePreviewSubmit()}
                    placeholder={`Mensagem para ${name || 'Agente'}...`}
                    className="flex-1 bg-transparent text-[14px] outline-none text-slate-800"
                  />
                  <div className="flex items-center gap-2">
                    <button className="w-8 h-8 flex items-center justify-center text-slate-400 hover:bg-slate-50 rounded-lg transition-colors">
                      <Mic size={18} />
                    </button>
                    <button 
                      onClick={handlePreviewSubmit}
                      className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all ${
                        previewInput.trim() ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-400'
                      }`}
                    >
                      <ArrowUp size={18} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
