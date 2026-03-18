import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  Check, 
  ChevronDown,
  Sparkles,
  Save,
  Info
} from 'lucide-react';
import { OBJETIVIDADE_TOOLTIPS, FORMALIDADE_TOOLTIPS } from '../constants';

const TRIBUNAIS = [
  'STF', 'STJ', 'TST', 'TSE', 'STM', 
  'TRF1', 'TRF2', 'TRF3', 'TRF4', 'TRF5', 'TRF6',
  'TJSP', 'TJRJ', 'TJMG', 'TJRS', 'TJPR', 'TJSC', 'TJBA', 'TJPE', 'TJCE', 'TJGO', 'TJMT', 'TJMS', 'TJES', 'TJMA', 'TJPB', 'TJRN', 'TJAL', 'TJSE', 'TJPI', 'TJTO', 'TJRO', 'TJAC', 'TJAP', 'TJRR', 'TJDFT'
];

const AREAS_DIREITO = [
  'Direito Civil', 'Direito Penal', 'Direito do Trabalho', 'Direito Tributário', 'Direito Empresarial', 
  'Direito Administrativo', 'Direito Constitucional', 'Direito Previdenciário', 'Direito de Família', 
  'Direito do Consumidor', 'Direito Imobiliário', 'Direito Ambiental', 'Direito Digital', 'Direito Eleitoral', 
  'Direito Internacional', 'Direito Processual Civil', 'Direito Processual Penal'
];

export const GlobalPreferences: React.FC = () => {
  const [objetividade, setObjetividade] = useState('Equilibrado');
  const [formalidade, setFormalidade] = useState('Normal');
  const [selectedTribunais, setSelectedTribunais] = useState<string[]>(['TJRJ', 'STF', 'TJSP', 'TJBA']);
  const [tribunalQuery, setTribunalQuery] = useState('');
  const [isTribunalMenuOpen, setIsTribunalMenuOpen] = useState(false);
  
  const [selectedAreas, setSelectedAreas] = useState<string[]>([]);
  const [areaQuery, setAreaQuery] = useState('');
  const [isAreaMenuOpen, setIsAreaMenuOpen] = useState(false);
  
  const [orientacoes, setOrientacoes] = useState('');

  const tribunalRef = useRef<HTMLDivElement>(null);
  const areaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
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

  const handleSave = () => {
    // Save logic would go here
    alert('Preferências salvas com sucesso!');
  };

  return (
    <div className="flex-1 overflow-y-auto custom-scrollbar bg-white">
      <div className="max-w-[720px] mx-auto py-12 px-6">
        <header className="mb-10">
          <h1 className="text-[28px] font-bold text-[#111827] mb-2">Preferências Globais</h1>
          <p className="text-sm text-[#6B7280]">Defina como o Jus IA deve se comportar em todas as suas conversas.</p>
        </header>

        <div className="space-y-10">
          {/* Objetividade */}
          <section className="space-y-4">
            <div>
              <h3 className="text-[16px] font-bold text-[#111827]">Objetividade da resposta</h3>
              <p className="text-[13px] text-[#6B7280] mt-1">Define se as respostas/peças devem ser concisas ou expandir um pouco mais.</p>
            </div>
            <div className="flex p-1 bg-[#F3F4F6] rounded-xl w-full">
              {['Enxuto', 'Equilibrado', 'Detalhado'].map((option) => (
                <div key={option} className="flex-1 relative group/tooltip">
                  <button
                    onClick={() => setObjetividade(option)}
                    className={`w-full py-2.5 text-sm font-semibold rounded-lg transition-all ${
                      objetividade === option 
                        ? 'bg-[#111827] text-white shadow-sm' 
                        : 'text-[#4B5563] hover:text-[#111827]'
                    }`}
                  >
                    {option}
                  </button>
                  {/* Tooltip */}
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 p-2 bg-[#111827] text-white text-[11px] rounded-lg opacity-0 group-hover/tooltip:opacity-100 transition-opacity pointer-events-none z-[60] text-center shadow-xl">
                    {OBJETIVIDADE_TOOLTIPS[option]}
                    <div className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-[#111827]" />
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Formalidade */}
          <section className="space-y-4">
            <div>
              <h3 className="text-[16px] font-bold text-[#111827]">Formalidade jurídica</h3>
              <p className="text-[13px] text-[#6B7280] mt-1">Define o nível de linguagem jurídica das respostas/peças</p>
            </div>
            <div className="flex p-1 bg-[#F3F4F6] rounded-xl w-full">
              {['Simples', 'Normal', 'Técnica'].map((option) => (
                <div key={option} className="flex-1 relative group/tooltip">
                  <button
                    onClick={() => setFormalidade(option)}
                    className={`w-full py-2.5 text-sm font-semibold rounded-lg transition-all ${
                      formalidade === option 
                        ? 'bg-[#111827] text-white shadow-sm' 
                        : 'text-[#4B5563] hover:text-[#111827]'
                    }`}
                  >
                    {option}
                  </button>
                  {/* Tooltip */}
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 p-2 bg-[#111827] text-white text-[11px] rounded-lg opacity-0 group-hover/tooltip:opacity-100 transition-opacity pointer-events-none z-[60] text-center shadow-xl">
                    {FORMALIDADE_TOOLTIPS[option]}
                    <div className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-[#111827]" />
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Tribunais */}
          <section className="space-y-4">
            <div className="relative" ref={tribunalRef}>
              <div className="mb-3">
                <h3 className="text-[16px] font-bold text-[#111827]">Tribunais de preferência</h3>
                <p className="text-[13px] text-[#6B7280] mt-1">Define tribunais que tem prioridade das respostas/peças</p>
              </div>
              <div className="flex flex-wrap gap-2 p-3 border border-[#D1D5DB] rounded-xl bg-white min-h-[48px] focus-within:border-[#007A5F] transition-all">
                {selectedTribunais.map(t => (
                  <span key={t} className="flex items-center gap-1.5 px-3 py-1.5 bg-[#F3F4F6] text-[#111827] text-xs font-bold rounded-full border border-[#E5E7EB]">
                    {t}
                    <button onClick={() => setSelectedTribunais(prev => prev.filter(item => item !== t))} className="hover:text-rose-500 transition-colors">
                      <X size={14} />
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
                  className="flex-1 min-w-[120px] outline-none text-sm bg-transparent"
                />
              </div>
              <AnimatePresence>
                {isTribunalMenuOpen && (
                  <motion.div 
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 5 }}
                    className="absolute z-50 top-full left-0 right-0 mt-2 bg-white border border-[#E5E7EB] rounded-xl shadow-xl max-h-60 overflow-y-auto custom-scrollbar py-2"
                  >
                    {TRIBUNAIS.filter(t => t.toLowerCase().includes(tribunalQuery.toLowerCase()) && !selectedTribunais.includes(t)).map(t => (
                      <button
                        key={t}
                        onClick={() => {
                          setSelectedTribunais([...selectedTribunais, t]);
                          setTribunalQuery('');
                          setIsTribunalMenuOpen(false);
                        }}
                        className="w-full text-left px-4 py-2.5 text-sm hover:bg-[#F9FAFB] text-[#4B5563] transition-colors"
                      >
                        {t}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </section>

          {/* Áreas do direito */}
          <section className="space-y-4">
            <div className="relative" ref={areaRef}>
              <div className="mb-3">
                <h3 className="text-[16px] font-bold text-[#111827]">Áreas do direito</h3>
                <p className="text-[13px] text-[#6B7280] mt-1">Reforça quais áreas o Jus IA deve ser especialista</p>
              </div>
              <div className="flex flex-wrap gap-2 p-3 border border-[#D1D5DB] rounded-xl bg-white min-h-[48px] focus-within:border-[#007A5F] transition-all">
                {selectedAreas.map(a => (
                  <span key={a} className="flex items-center gap-1.5 px-3 py-1.5 bg-[#F3F4F6] text-[#111827] text-xs font-bold rounded-full border border-[#E5E7EB]">
                    {a}
                    <button onClick={() => setSelectedAreas(prev => prev.filter(item => item !== a))} className="hover:text-rose-500 transition-colors">
                      <X size={14} />
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
                  className="flex-1 min-w-[120px] outline-none text-sm bg-transparent"
                />
              </div>
              <AnimatePresence>
                {isAreaMenuOpen && (
                  <motion.div 
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 5 }}
                    className="absolute z-50 top-full left-0 right-0 mt-2 bg-white border border-[#E5E7EB] rounded-xl shadow-xl max-h-60 overflow-y-auto custom-scrollbar py-2"
                  >
                    {AREAS_DIREITO.filter(a => a.toLowerCase().includes(areaQuery.toLowerCase()) && !selectedAreas.includes(a)).map(a => (
                      <button
                        key={a}
                        onClick={() => {
                          setSelectedAreas([...selectedAreas, a]);
                          setAreaQuery('');
                          setIsAreaMenuOpen(false);
                        }}
                        className="w-full text-left px-4 py-2.5 text-sm hover:bg-[#F9FAFB] text-[#4B5563] transition-colors"
                      >
                        {a}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </section>

          {/* Orientações extras */}
          <section className="space-y-4">
            <div>
              <h3 className="text-[16px] font-bold text-[#111827]">Orientações extras</h3>
              <p className="text-[13px] text-[#6B7280] mt-1">Caso tenha outras preferências para o comportamento do seu Jus IA. Lembre-se que isso pode impactar na qualidade das respostas</p>
            </div>
            <textarea
              value={orientacoes}
              onChange={(e) => setOrientacoes(e.target.value)}
              placeholder="Ex: Sempre cite a jurisprudência do STJ primeiro..."
              rows={6}
              className="w-full px-4 py-3 text-sm bg-white border border-[#D1D5DB] rounded-xl outline-none focus:border-[#007A5F] transition-all resize-none"
            />
          </section>

          {/* Action Button */}
          <div className="pt-6 flex justify-end">
            <button
              onClick={handleSave}
              className="flex items-center gap-2 px-6 h-12 bg-[#007A5F] text-white rounded-xl hover:bg-[#00664F] transition-all font-bold shadow-lg shadow-[#007A5F]/20 active:scale-95"
            >
              <Save size={18} />
              Salvar Preferências
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
