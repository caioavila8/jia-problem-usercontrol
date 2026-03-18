import React from 'react';
import { motion } from 'motion/react';
import { Zap, Search, PenTool, FileText, BookOpen } from 'lucide-react';

export function WorkModes() {
  const modes = [
    { id: '1', name: 'Exploração de Tese', icon: <Search size={24} />, description: 'Mapeie teses relevantes para o seu caso concreto.' },
    { id: '2', name: 'Redação Técnica', icon: <PenTool size={24} />, description: 'Elabore petições e contratos com precisão técnica.' },
    { id: '3', name: 'Revisão Crítica', icon: <FileText size={24} />, description: 'Analise documentos em busca de falhas e melhorias.' },
    { id: '4', name: 'Entendimento de Caso', icon: <BookOpen size={24} />, description: 'Resuma e organize os fatos de um processo complexo.' }
  ];

  return (
    <div className="flex-1 h-full bg-[#F8FAFC] overflow-y-auto p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-12">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Modos de Trabalho</h1>
          <p className="text-slate-600">Selecione um modo especializado para otimizar sua produtividade.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {modes.map(mode => (
            <motion.div
              key={mode.id}
              whileHover={{ scale: 1.02 }}
              className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all cursor-pointer group"
            >
              <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center text-slate-600 mb-4 group-hover:bg-[#E6F4F0] group-hover:text-[#007A5F] transition-colors">
                {mode.icon}
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">{mode.name}</h3>
              <p className="text-sm text-slate-600 leading-relaxed">{mode.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
