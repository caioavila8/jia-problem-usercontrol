import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Plus, 
  Search, 
  ChevronDown,
  Settings2,
  Sparkles,
  Zap,
  CheckCircle2,
  Settings
} from 'lucide-react';
import { LEGAL_ICONS, COLOR_THEMES } from '../constants';

const VerifiedIcon = ({ className, size = 14 }: { className?: string, size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path fillRule="evenodd" clipRule="evenodd" d="M23 12C22.9789 11.2437 22.7483 10.5073 22.3327 9.87399C21.9183 9.24181 21.3352 8.73606 20.6492 8.41528C20.9103 7.70466 20.9653 6.9355 20.8131 6.19444C20.6597 5.45221 20.3015 4.76852 19.7805 4.21946C19.2303 3.69849 18.5478 3.34142 17.8056 3.18689C17.0645 3.0347 16.2953 3.08972 15.5847 3.35079C15.2651 2.66358 14.7605 2.0794 14.1272 1.66496C13.4938 1.25053 12.7575 1.01873 12 1C11.2437 1.0199 10.5097 1.24936 9.8775 1.66496C9.24532 2.08057 8.74308 2.66475 8.42582 3.35079C7.71403 3.08972 6.94253 3.03235 6.19913 3.18689C5.45573 3.33908 4.77086 3.69732 4.22063 4.21946C3.69966 4.76969 3.34376 5.45455 3.19274 6.19561C3.04055 6.93668 3.09908 7.70583 3.36132 8.41528C2.67412 8.73606 2.08876 9.24063 1.67199 9.87282C1.25521 10.505 1.02224 11.2425 1 12C1.02341 12.7575 1.25521 13.4938 1.67199 14.1272C2.08876 14.7594 2.67412 15.2651 3.36132 15.5847C3.09908 16.2942 3.04055 17.0633 3.19274 17.8044C3.34493 18.5466 3.69966 19.2303 4.21946 19.7805C4.76969 20.2992 5.45338 20.6551 6.19444 20.8084C6.9355 20.963 7.70466 20.9068 8.41528 20.6492C8.73606 21.3352 9.24063 21.9183 9.87399 22.3339C10.5062 22.7483 11.2437 22.9789 12 23C12.7575 22.9813 13.4938 22.7506 14.1272 22.3362C14.7605 21.9218 15.2651 21.3364 15.5847 20.6504C16.2918 20.9302 17.0668 20.9969 17.8126 20.8424C18.5572 20.6878 19.2408 20.3191 19.7794 19.7805C20.3179 19.242 20.6878 18.5583 20.8424 17.8126C20.9969 17.0668 20.9302 16.2918 20.6492 15.5847C21.3352 15.2639 21.9183 14.7594 22.3339 14.126C22.7483 13.4938 22.9789 12.7563 23 12ZM16.7067 9.29295C16.3162 8.90243 15.6832 8.90243 15.2927 9.29295L10.9997 13.5859L9.20675 11.793C8.81623 11.4024 8.18321 11.4024 7.79269 11.793C7.40216 12.1835 7.40216 12.8165 7.79269 13.207L10.2927 15.707C10.6832 16.0975 11.3162 16.0975 11.7067 15.707L16.7067 10.707C17.0973 10.3165 17.0973 9.68348 16.7067 9.29295Z" fill="#0474E2"/>
  </svg>
);

const JusbrasilIcon = ({ className, size = 12 }: { className?: string, size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path fillRule="evenodd" clipRule="evenodd" d="M1.09626 11.0225V11.0223C0.252969 10.5373 -0.0360134 9.46262 0.45083 8.62236L4.56542 1.52166C5.05241 0.68125 6.13087 0.393329 6.97431 0.878504C7.81776 1.36368 8.10674 2.43834 7.61975 3.27861L3.50516 10.3793C3.01832 11.2196 1.93971 11.5075 1.09626 11.0225Z" fill="#FFCE00"/>
    <path fillRule="evenodd" clipRule="evenodd" d="M11.0891 11.0223C10.2456 11.5073 9.16716 11.2196 8.68016 10.3793L4.56558 3.27861C4.07873 2.43834 4.36772 1.36368 5.21101 0.878504C6.05446 0.393329 7.13291 0.68125 7.61991 1.52166L11.7345 8.62236C12.2215 9.46262 11.9325 10.5373 11.0891 11.0223Z" fill="#378CC8"/>
    <path fillRule="evenodd" clipRule="evenodd" d="M7.54745 1.40831C7.53577 1.39133 7.52486 1.37404 7.51273 1.35752C7.4915 1.32886 7.46876 1.30187 7.44632 1.27489C7.43101 1.25669 7.4166 1.23804 7.40068 1.22045C7.38067 1.19847 7.35929 1.178 7.33837 1.15723C7.3176 1.13646 7.29728 1.11538 7.2753 1.09552C7.2574 1.07945 7.2386 1.06505 7.22026 1.04973C7.19327 1.02745 7.16643 1.00485 7.13778 0.983932C7.1211 0.971651 7.10351 0.960734 7.08638 0.94906C7.055 0.927682 7.02331 0.906607 6.99025 0.887048C6.971 0.875828 6.95114 0.86567 6.93143 0.855057C6.9005 0.838227 6.86942 0.822004 6.83788 0.807297C6.81286 0.795623 6.78739 0.785313 6.76192 0.774851C6.73554 0.763935 6.709 0.753322 6.68217 0.74377C6.65215 0.733157 6.62182 0.723908 6.59135 0.714811C6.568 0.707988 6.54465 0.701317 6.52115 0.695404C6.4887 0.687217 6.4558 0.680394 6.4229 0.674026C6.39986 0.669781 6.37681 0.665535 6.35361 0.662048C6.32162 0.657196 6.28948 0.653709 6.25719 0.650677C6.23156 0.648251 6.20594 0.646128 6.18047 0.644915C6.15136 0.643399 6.12209 0.642944 6.09283 0.642944C6.06357 0.642944 6.03431 0.643399 6.0052 0.644915C5.97957 0.646128 5.9541 0.648251 5.92848 0.650677C5.89618 0.653709 5.86404 0.657196 5.83205 0.662048C5.80885 0.665535 5.78581 0.669781 5.76276 0.674026C5.72986 0.680394 5.69696 0.687217 5.66436 0.695404C5.64101 0.701317 5.61766 0.707988 5.59431 0.714811C5.56384 0.723908 5.53336 0.733157 5.5035 0.74377C5.47666 0.753322 5.45013 0.763935 5.42359 0.774851C5.39812 0.785313 5.3728 0.795623 5.34779 0.807297C5.31625 0.822004 5.28517 0.838227 5.25409 0.855057C5.23453 0.86567 5.21467 0.875828 5.19541 0.887048C5.16221 0.906607 5.13052 0.927833 5.09913 0.94906C5.082 0.960734 5.06456 0.971651 5.04789 0.983932C5.01923 1.00485 4.99224 1.02745 4.96526 1.04989C4.94691 1.06505 4.92811 1.0796 4.91037 1.09552C4.88839 1.11538 4.86807 1.13646 4.84715 1.15723C4.82622 1.17815 4.80484 1.19847 4.78498 1.22045C4.76906 1.23804 4.75451 1.25669 4.73935 1.27489C4.71675 1.30187 4.69401 1.32886 4.67294 1.35752C4.66081 1.37404 4.64974 1.39133 4.63822 1.40831C4.61669 1.43969 4.59546 1.47138 4.57575 1.50443C4.26296 2.03252 4.23598 2.70812 4.56574 3.27699L6.09283 5.9124L7.61992 3.27699C7.94954 2.70812 7.92255 2.03252 7.60991 1.50459C7.5902 1.47138 7.56883 1.43969 7.54745 1.40831Z" fill="#7AB441"/>
  </svg>
);

const CustomHabilidadesIcon = ({ className, size = 24 }: { className?: string, size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path fillRule="evenodd" clipRule="evenodd" d="M10 5C10 4.44772 10.4477 4 11 4H13C13.5523 4 14 4.44772 14 5V6H10V5ZM8 6V5C8 3.34315 9.34315 2 11 2H13C14.6569 2 16 3.34315 16 5V6H19C20.6569 6 22 7.34315 22 9V10V11V19C22 20.6569 20.6569 22 19 22H5C3.34315 22 2 20.6569 2 19V11V10V9C2 7.34315 3.34315 6 5 6H8ZM4 9C4 8.44772 4.44772 8 5 8H19C19.5523 8 20 8.44772 20 9V10V11C20 11.5523 19.5523 12 19 12H15H9H5C4.44772 12 4 11.5523 4 11V10V9ZM14 15V14H10V15C10 15.5523 9.55228 16 9 16C8.44772 16 8 15.5523 8 15V14H5C4.64936 14 4.31278 13.9398 4 13.8293V19C4 19.5523 4.44772 20 5 20H19C19.5523 20 20 19.5523 20 19V13.8293C19.6872 13.9398 19.3506 14 19 14H16V15C16 15.5523 15.5523 16 15 16C14.4477 16 14 15.5523 14 15Z" fill="currentColor"/>
  </svg>
);

import { Skill } from '../types';

interface SkillsDashboardProps {
  skills: Skill[];
  onToggleSkill: (id: string) => void;
  onInstallSkill: (id: string) => void;
  onConfigureSkill: (id: string) => void;
  onCreateSkill: () => void;
}

export const SkillsDashboard: React.FC<SkillsDashboardProps> = ({ 
  skills, 
  onToggleSkill, 
  onInstallSkill, 
  onConfigureSkill, 
  onCreateSkill 
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [newlyInstalledSkillId, setNewlyInstalledSkillId] = useState<string | null>(null);

  const handleInstall = (id: string) => {
    onInstallSkill(id);
    setNewlyInstalledSkillId(id);
    setTimeout(() => setNewlyInstalledSkillId(null), 2000);
  };

  const categories = [
    'Sucesso do cliente',
    'Suporte ao cliente',
    'E-mails',
    'RH',
    'Investimentos',
    'Suporte de TI',
    'Jurídico',
    'Marketing',
    'Reuniões'
  ];

  const skillsWithCategories = skills.map((s, idx) => ({
    ...s,
    category: s.category || categories[idx % categories.length],
    usedCount: s.usedCount || Math.floor(Math.random() * 10)
  }));

  const filteredSkills = skillsWithCategories.filter(s => 
    s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const installedSkills = skillsWithCategories.filter(s => s.isInstalled);
  const exploratSkills = filteredSkills.filter(s => !s.isInstalled);

  return (
    <div className="flex-1 h-full overflow-y-auto bg-white custom-scrollbar">
      <div className="max-w-[1000px] mx-auto px-6 py-10">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <div>
            <h1 className="text-[24px] font-bold text-slate-900 tracking-tight">Habilidades</h1>
            <p className="text-slate-500 text-sm mt-1">Potencialize suas análises com perfis especializados.</p>
          </div>
          <button 
            onClick={onCreateSkill}
            className="flex items-center gap-2 bg-[#007A5F] text-white px-5 py-2.5 rounded-lg font-semibold text-sm hover:bg-[#00664F] transition-all active:scale-95"
          >
            <Plus size={18} />
            Criar habilidade
          </button>
        </div>

        {/* Minhas Habilidades Section (Featured Style) */}
        <section className="mb-14">
          <h2 className="text-[20px] font-bold text-slate-900 mb-3 tracking-tight">Minhas habilidades</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <AnimatePresence mode="popLayout">
              {installedSkills.length > 0 ? (
                installedSkills.map((skill) => (
                  <motion.div
                    key={skill.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                  >
                    <FeaturedCard 
                      skill={skill} 
                      onToggle={() => onToggleSkill(skill.id)}
                      onConfigure={() => onConfigureSkill(skill.id)}
                      isNew={newlyInstalledSkillId === skill.id}
                    />
                  </motion.div>
                ))
              ) : (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="col-span-full py-12 text-center bg-slate-50 rounded-lg border border-dashed border-slate-200"
                >
                  <p className="text-slate-500 text-sm">Você ainda não possui habilidades instaladas.</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </section>

        {/* Explorar Section */}
        <section>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-[20px] font-bold text-slate-900 tracking-tight">Explorar</h2>
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Pesquisar habilidades..." 
                className="w-full pl-9 pr-4 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs outline-none focus:border-[#007A5F] focus:bg-white transition-all"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <AnimatePresence mode="popLayout">
              {exploratSkills.map(skill => (
                <motion.div
                  key={skill.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                >
                  <FeaturedCard 
                    skill={skill} 
                    onInstall={() => handleInstall(skill.id)}
                    isExplorar
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </section>
      </div>
    </div>
  );
};

const Switch = ({ checked, onChange }: { checked: boolean; onChange: () => void }) => (
  <button 
    onClick={(e) => { e.stopPropagation(); onChange(); }}
    className={`w-10 h-5 rounded-full relative transition-colors duration-200 ease-in-out shrink-0 ${checked ? 'bg-[#007A5F]' : 'bg-slate-200'}`}
  >
    <div className={`absolute top-1 left-1 w-3 h-3 bg-white rounded-full transition-transform duration-200 ease-in-out ${checked ? 'translate-x-5' : 'translate-x-0'}`} />
  </button>
);

const FeaturedCard: React.FC<{ 
  skill: Skill; 
  onToggle?: () => void; 
  onConfigure?: () => void;
  onInstall?: () => void;
  isExplorar?: boolean;
  isNew?: boolean;
}> = ({ skill, onToggle, onConfigure, onInstall, isExplorar, isNew }) => {
  const iconData = LEGAL_ICONS.find(i => i.id === skill.iconId) || LEGAL_ICONS[0];
  const themeData = COLOR_THEMES.find(t => t.id === skill.themeId) || COLOR_THEMES[0];
  const Icon = iconData.icon;

  return (
    <motion.div 
      animate={isNew ? {
        boxShadow: [
          "0 0 0 0 rgba(0, 122, 95, 0.6)",
          "0 0 0 10px rgba(0, 122, 95, 0)",
          "0 0 0 0 rgba(0, 122, 95, 0)"
        ]
      } : {}}
      transition={isNew ? { duration: 1.2, times: [0, 0.4, 1] } : {}}
      onClick={isExplorar ? undefined : onConfigure}
      className={`bg-white border border-slate-200 rounded-lg p-4 flex items-center gap-4 transition-all ${isExplorar ? '' : 'cursor-pointer'}`}
    >
      <div className={`w-14 h-14 rounded-lg flex items-center justify-center shrink-0 ${themeData.bg}`}>
        <Icon size={28} className={themeData.text} />
      </div>
      
      <div className="flex-1 min-w-0">
        <h3 className="text-[15px] font-bold text-slate-900 mb-0.5">{skill.name}</h3>
        <p className="text-[13px] text-slate-500 mb-2">{skill.description}</p>
        
        <div className="flex items-center gap-1.5 text-slate-400 text-[10px] font-bold">
          <JusbrasilIcon />
          <span>Jusbrasil</span>
          <VerifiedIcon size={10} />
        </div>
      </div>

      <div className="flex items-center gap-3 shrink-0">
        {isExplorar ? (
          <button 
            onClick={(e) => { e.stopPropagation(); onInstall?.(); }}
            className="w-9 h-9 flex items-center justify-center border border-slate-300 rounded-lg text-slate-600 hover:bg-slate-50 transition-all group/tooltip relative"
            title="Instalar habilidade"
          >
            <Plus size={16} />
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-slate-800 text-white text-[10px] rounded opacity-0 group-hover/tooltip:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-50">
              Instalar habilidade
            </div>
          </button>
        ) : (
          <Switch checked={skill.isActive} onChange={onToggle || (() => {})} />
        )}
      </div>
    </motion.div>
  );
};
