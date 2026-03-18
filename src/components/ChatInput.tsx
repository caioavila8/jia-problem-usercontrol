import React, { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Plus,
  Mic,
  ArrowUp,
  Paperclip,
  Image as ImageIcon,
  Headphones,
  X,
  Wand2,
  ChevronDown,
  Check,
  Zap,
  Briefcase
} from 'lucide-react';

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

import { Skill } from '../types';

interface ChatInputProps {
  inputText: string;
  setInputText: (text: string) => void;
  isPesquisaActive: boolean;
  setIsPesquisaActive: (active: boolean) => void;
  isPlusMenuOpen: boolean;
  setIsPlusMenuOpen: (open: boolean) => void;
  isRecording: boolean;
  setIsRecording: (recording: boolean) => void;
  plusMenuRef: React.RefObject<HTMLDivElement>;
  onSubmit?: () => void;
  activeSkill: string | null;
  setActiveSkill: (skill: string | null) => void;
  skills: Skill[];
  appVersion?: 'habilidades' | 'personalizacao_habilidade' | 'gpt_gems';
}

export function ChatInput({
  inputText,
  setInputText,
  isPesquisaActive,
  setIsPesquisaActive,
  isPlusMenuOpen,
  setIsPlusMenuOpen,
  isRecording,
  setIsRecording,
  plusMenuRef,
  onSubmit,
  activeSkill,
  setActiveSkill,
  skills,
  appVersion
}: ChatInputProps) {
  const editorRef = useRef<HTMLDivElement>(null);
  const skillMenuRef = useRef<HTMLDivElement>(null);
  const slashMenuRef = useRef<HTMLDivElement>(null);
  
  const [isSkillMenuOpen, setIsSkillMenuOpen] = useState(false);
  const [isSlashMenuOpen, setIsSlashMenuOpen] = useState(false);
  const [slashQuery, setSlashQuery] = useState('');
  const [lastRange, setLastRange] = useState<Range | null>(null);

  const availableSkills = skills.filter(s => s.isInstalled && s.isActive);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (skillMenuRef.current && !skillMenuRef.current.contains(event.target as Node)) {
        setIsSkillMenuOpen(false);
      }
      if (slashMenuRef.current && !slashMenuRef.current.contains(event.target as Node)) {
        setIsSlashMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleInput = (e: React.FormEvent<HTMLDivElement>) => {
    const target = e.currentTarget;
    const text = target.innerText;
    
    // Fix for placeholder not showing when empty
    if (text.trim() === '') {
      target.innerHTML = '';
    }
    
    setInputText(text);

    const selection = window.getSelection();
    if (selection && selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      setLastRange(range.cloneRange());

      const textBeforeCursor = range.startContainer.textContent?.substring(0, range.startOffset) || '';
      const lastSlashIndex = textBeforeCursor.lastIndexOf('/');

      if (lastSlashIndex !== -1) {
        const query = textBeforeCursor.substring(lastSlashIndex + 1);
        if (lastSlashIndex === 0 || textBeforeCursor[lastSlashIndex - 1] === ' ' || textBeforeCursor[lastSlashIndex - 1] === '\u00A0') {
          setSlashQuery(query);
          setIsSlashMenuOpen(true);
        } else {
          setIsSlashMenuOpen(false);
        }
      } else {
        setIsSlashMenuOpen(false);
      }
    }
  };

  const insertSkillChip = (skillName: string) => {
    const selection = window.getSelection();
    let range: Range | null = null;

    if (selection && selection.rangeCount > 0) {
      range = selection.getRangeAt(0);
    } else if (lastRange) {
      range = lastRange;
    }

    if (!range) {
      editorRef.current?.focus();
      const newSelection = window.getSelection();
      if (newSelection && newSelection.rangeCount > 0) {
        range = newSelection.getRangeAt(0);
      }
    }

    if (!range) return;

    // If there's a slash before the cursor, remove it
    const textNode = range.startContainer;
    const offset = range.startOffset;
    if (textNode.nodeType === Node.TEXT_NODE) {
      const text = textNode.textContent || '';
      const lastSlashIndex = text.substring(0, offset).lastIndexOf('/');
      // Check if the slash is immediately before the cursor or part of the current query
      if (lastSlashIndex !== -1 && offset - lastSlashIndex <= slashQuery.length + 1) {
        range.setStart(textNode, lastSlashIndex);
        range.setEnd(textNode, offset);
        range.deleteContents();
      }
    }

    // Create the chip
    const chip = document.createElement('span');
    chip.contentEditable = 'false';
    chip.className = 'bg-[#E6F4F0] text-[#007A5F] px-1 rounded text-[14px] inline-block mx-0.5 align-baseline select-none';
    chip.textContent = skillName;
    chip.setAttribute('data-skill', skillName);

    range.insertNode(chip);
    
    // Move cursor after the chip
    range.setStartAfter(chip);
    range.setEndAfter(chip);
    
    // Add a space after the chip
    const space = document.createTextNode('\u00A0');
    range.insertNode(space);
    range.setStartAfter(space);
    range.setEndAfter(space);

    if (selection) {
      selection.removeAllRanges();
      selection.addRange(range);
    }

    setIsSlashMenuOpen(false);
    setIsSkillMenuOpen(false);
    setSlashQuery('');
    if (editorRef.current) {
      setInputText(editorRef.current.innerText);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (isSlashMenuOpen) {
        const firstSkill = availableSkills.find(s => s.name.toLowerCase().includes(slashQuery.toLowerCase()));
        if (firstSkill) insertSkillChip(firstSkill.name);
      } else {
        if ((inputText.trim() || (editorRef.current?.querySelector('[data-skill]'))) && onSubmit) {
          onSubmit();
          if (editorRef.current) editorRef.current.innerHTML = '';
          setInputText('');
        }
      }
    }
  };

  return (
    <div className="border border-slate-200 rounded-2xl bg-white transition-all relative flex flex-col w-full">
      <div className="p-4 relative z-20">
        
        {/* Input area */}
        <div className="relative flex flex-wrap items-start">
          <div 
            ref={editorRef}
            contentEditable
            onInput={handleInput}
            onKeyDown={handleKeyDown}
            data-placeholder={isPesquisaActive ? "Explore respostas mais completas com a base de dados do Jusbrasil." : "Digite sua mensagem ou use / para habilidades"}
            className="chat-input-editable flex-1 min-w-0 outline-none text-slate-800 text-[14px] min-h-[24px] max-h-[168px] overflow-y-auto bg-transparent leading-relaxed py-0.5 relative z-10 custom-scrollbar"
          />

          {/* Slash Menu */}
          <AnimatePresence>
            {isSlashMenuOpen && appVersion !== 'gpt_gems' && (
              <motion.div 
                ref={slashMenuRef}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="absolute bottom-full left-0 mb-2 w-72 bg-white border border-[#E5E5E5] rounded-xl shadow-xl py-2 z-30"
              >
                <div className="px-4 py-2 text-[10px] font-bold text-[#8A8A8A] uppercase tracking-wider">Habilidades</div>
                {availableSkills.filter(s => s.name.toLowerCase().includes(slashQuery.toLowerCase())).map(skill => (
                  <button 
                    key={skill.id}
                    onClick={() => insertSkillChip(skill.name)}
                    className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-[#FAFAFA] text-[#4A4A4A] transition-colors text-left"
                  >
                    <div className="w-6 h-6 rounded bg-[#F3F4F6] flex items-center justify-center text-[#9CA3AF]">
                      <Zap size={14} fill="currentColor" />
                    </div>
                    <span className="text-sm font-semibold">{skill.name}</span>
                  </button>
                ))}
                {availableSkills.filter(s => s.name.toLowerCase().includes(slashQuery.toLowerCase())).length === 0 && (
                  <div className="px-4 py-3 text-sm text-slate-500 italic">Nenhuma habilidade encontrada</div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="flex justify-between items-center mt-4">
          <div className="flex items-center gap-2 relative">
            
            {/* Plus Button & Menu */}
            <div className="relative" ref={plusMenuRef}>
              <button 
                onClick={() => setIsPlusMenuOpen(!isPlusMenuOpen)}
                className="w-9 h-9 flex items-center justify-center border border-slate-300 rounded-lg text-slate-600 hover:bg-slate-50 transition-colors"
              >
                <Plus size={20} />
              </button>

              <AnimatePresence>
                {isPlusMenuOpen && (
                  <motion.div 
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    className="absolute bottom-full left-0 mb-2 w-64 bg-white border border-slate-200 rounded-2xl shadow-xl py-2 z-20"
                  >
                    <button className="w-full flex items-center gap-3 px-4 py-3 hover:bg-slate-50 text-slate-700 transition-colors">
                      <Paperclip size={20} className="text-slate-600" />
                      <span className="font-semibold text-[14px]">Adicionar documento</span>
                    </button>
                    <button className="w-full flex items-center gap-3 px-4 py-3 hover:bg-slate-50 text-slate-700 transition-colors">
                      <ImageIcon size={20} className="text-slate-600" />
                      <span className="font-semibold text-[14px]">Adicionar imagem</span>
                    </button>
                    <button className="w-full flex items-center gap-3 px-4 py-3 hover:bg-slate-50 text-slate-700 transition-colors">
                      <Headphones size={20} className="text-slate-600" />
                      <span className="font-semibold text-[14px]">Adicionar áudio</span>
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Grounded Search Icon Button */}
            <button 
              onClick={() => setIsPesquisaActive(!isPesquisaActive)}
              className={`w-9 h-9 flex items-center justify-center rounded-lg border transition-all ${isPesquisaActive ? 'bg-[#E6F4F0] border-[#C9E9DF] text-[#007A5F]' : 'border-slate-300 text-slate-600 hover:bg-slate-50'}`}
              title="Pesquisa fundamentada"
            >
              <CustomPesquisaIcon className="w-5 h-5" />
            </button>

            {/* Skill Selector Button */}
            {appVersion !== 'gpt_gems' && (
              <div className="relative" ref={skillMenuRef}>
                <button 
                  onClick={() => setIsSkillMenuOpen(!isSkillMenuOpen)}
                  className={`flex items-center gap-2 px-3 h-9 border border-slate-300 rounded-lg text-slate-600 hover:bg-slate-50 transition-all ${isSkillMenuOpen ? 'bg-slate-50' : ''}`}
                >
                  <CustomHabilidadesIcon size={18} className="w-4.5 h-4.5" />
                  <span className="text-[13px] font-semibold">Habilidade</span>
                </button>

                <AnimatePresence>
                  {isSkillMenuOpen && (
                    <motion.div 
                      initial={{ opacity: 0, y: -10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.95 }}
                      className="absolute bottom-full left-0 mb-2 w-72 bg-white border border-[#E5E5E5] rounded-xl shadow-xl py-2 z-20"
                    >
                      <div className="px-4 py-2 text-[10px] font-bold text-[#8A8A8A] uppercase tracking-wider">Habilidades</div>
                      {availableSkills.map(skill => (
                        <button 
                          key={skill.id}
                          onClick={() => insertSkillChip(skill.name)}
                          className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-[#FAFAFA] text-[#4A4A4A] transition-colors text-left"
                        >
                          <div className="w-6 h-6 rounded bg-[#F3F4F6] flex items-center justify-center text-[#9CA3AF]">
                            <Zap size={14} fill="currentColor" />
                          </div>
                          <span className="text-sm font-semibold">{skill.name}</span>
                        </button>
                      ))}
                      {availableSkills.length === 0 && (
                        <div className="px-4 py-3 text-sm text-slate-500 italic">Nenhuma habilidade instalada</div>
                      )}

                      <div className="h-px bg-[#E5E5E5] my-1" />
                      <button className="w-full flex items-center gap-2 px-4 py-2.5 hover:bg-[#FAFAFA] text-[#007A5F] transition-colors">
                        <Plus size={16} />
                        <span className="text-sm font-bold">Criar nova habilidade</span>
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}

          </div>

          <div className="flex items-center gap-2">
            <button 
              onClick={() => setIsRecording(!isRecording)}
              className={`w-9 h-9 flex items-center justify-center border rounded-lg transition-all duration-300 relative ${isRecording ? 'border-red-200 bg-red-50 text-red-500' : 'border-slate-300 text-slate-600 hover:bg-slate-50'}`}
            >
              {isRecording && (
                <motion.span 
                  animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                  className="absolute inset-0 bg-red-400 rounded-lg opacity-20"
                />
              )}
              <Mic size={20} className={isRecording ? "animate-pulse" : ""} />
            </button>
            <button 
              onClick={() => {
                if ((inputText.trim() || (editorRef.current?.querySelector('[data-skill]'))) && onSubmit) {
                  onSubmit();
                  if (editorRef.current) editorRef.current.innerHTML = '';
                  setInputText('');
                }
              }}
              className={`w-9 h-9 flex items-center justify-center rounded-lg transition-all duration-300 ${(inputText.trim() || (editorRef.current?.querySelector('[data-skill]'))) ? 'bg-[#007A5A] text-white hover:bg-[#006A4E] scale-105' : 'bg-slate-100 text-slate-400'}`}
            >
              <ArrowUp size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
