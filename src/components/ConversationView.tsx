import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Copy, ThumbsUp, ThumbsDown, Layers, Bot, Sparkles, Check, X, Mic, Send, Loader2 } from 'lucide-react';
import { ChatInput } from './ChatInput';

import { Skill, Gem } from '../types';
import { LEGAL_ICONS, COLOR_THEMES } from '../constants';

interface ConversationViewProps {
  inputText: string;
  setInputText: (text: string) => void;
  isPesquisaActive: boolean;
  setIsPesquisaActive: (active: boolean) => void;
  isPlusMenuOpen: boolean;
  setIsPlusMenuOpen: (open: boolean) => void;
  isRecording: boolean;
  setIsRecording: (recording: boolean) => void;
  plusMenuRef: React.RefObject<HTMLDivElement>;
  onSubmit: () => void;
  setIsBuildOpen: (open: boolean) => void;
  setEditingGemId: (id: string | null) => void;
  setCurrentView: (view: 'home' | 'conversation' | 'skills' | 'global_preferences' | 'gems_editor') => void;
  activeSkill: string | null;
  setActiveSkill: (skill: string | null) => void;
  skills: Skill[];
  appVersion?: 'habilidades' | 'personalizacao_habilidade' | 'gpt_gems' | 'modo_plano';
  activeGemId: string | null;
  activeConversationId: number | null;
  gems: Gem[];
  isPlanning?: boolean;
  executionMode?: 'padrao' | 'plano';
  setExecutionMode?: (mode: 'padrao' | 'plano') => void;
  userMessage?: string;
  planContent?: string;
}

export function ConversationView({
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
  setIsBuildOpen,
  setEditingGemId,
  setCurrentView,
  activeSkill,
  setActiveSkill,
  skills,
  appVersion,
  activeGemId,
  activeConversationId,
  gems,
  isPlanning,
  executionMode,
  setExecutionMode,
  userMessage,
  planContent
}: ConversationViewProps) {
  const activeGem = gems.find(g => g.id === activeGemId);
  const theme = activeGem ? (COLOR_THEMES.find(t => t.id === activeGem.themeId) || COLOR_THEMES[0]) : COLOR_THEMES[0];
  const iconData = activeGem ? (LEGAL_ICONS.find(i => i.id === activeGem.iconId) || LEGAL_ICONS[0]) : LEGAL_ICONS[0];
  const hasMessages = activeConversationId !== null;

  const [planExecutionStatus, setPlanExecutionStatus] = React.useState<'idle' | 'executing' | 'completed'>('idle');
  const [currentExecutingStep, setCurrentExecutingStep] = React.useState(0);
  const checkboxIndexRef = React.useRef(0);
  const respostaRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (planExecutionStatus === 'completed') {
      setTimeout(() => {
        respostaRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 300);
    }
  }, [planExecutionStatus]);

  const handleExecutePlan = () => {
    setPlanExecutionStatus('executing');
    setCurrentExecutingStep(0);
  };

  React.useEffect(() => {
    if (planExecutionStatus === 'executing') {
      const timer = setInterval(() => {
        setCurrentExecutingStep(prev => {
          if (prev >= 4) {
            clearInterval(timer);
            setPlanExecutionStatus('completed');
            return 5;
          }
          return prev + 1;
        });
      }, 2000);
      return () => clearInterval(timer);
    }
  }, [planExecutionStatus]);

  return (
    <div className="flex-1 flex flex-col h-full bg-white relative">
      {/* Header */}
      <div className="flex justify-between items-center px-4 h-[56px]">
        {activeGem ? (
          <>
            <div className="flex items-center gap-2 text-sm font-semibold text-slate-700">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center overflow-hidden ${activeGem.coverImage ? 'bg-slate-200' : theme.bg}`}>
                {activeGem.coverImage ? (
                  <img src={activeGem.coverImage} alt={activeGem.name} className="w-full h-full object-cover" />
                ) : (
                  React.createElement(iconData.icon, { size: 16, className: theme.text })
                )}
              </div>
              {activeGem.name}
            </div>
            <button 
              onClick={() => {
                if (activeGemId) {
                  setEditingGemId(activeGemId);
                  setCurrentView('gems_editor');
                }
              }}
              className="flex items-center gap-2 px-3 h-9 border border-slate-300 rounded-lg text-[14px] font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
            >
              <span className="font-semibold">Editar agente</span>
            </button>
          </>
        ) : (
          <>
            <div />
            <button className="w-8 h-8 flex items-center justify-center border border-slate-300 rounded-lg text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors">
              1
            </button>
          </>
        )}
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto px-4 py-6 custom-scrollbar flex flex-col items-center">
        {!hasMessages && activeGem ? (
          <div className="w-full max-w-[800px] flex flex-col items-center justify-center h-full gap-6">
            <div className={`w-16 h-16 rounded-lg flex items-center justify-center overflow-hidden ${activeGem.coverImage ? 'bg-slate-100' : theme.bg}`}>
              {activeGem.coverImage ? (
                <img src={activeGem.coverImage} alt={activeGem.name} className="w-full h-full object-cover" />
              ) : (
                React.createElement(iconData.icon, { size: 32, className: theme.text })
              )}
            </div>
            <h2 className="text-2xl font-bold text-slate-900">{activeGem.name}</h2>
            <p className="text-slate-600 text-center max-w-md">{activeGem.description}</p>
            <div className="grid grid-cols-2 gap-3 w-full max-w-2xl mt-4">
              {activeGem.initialPhrases.map((phrase, index) => (
                <button 
                  key={index}
                  onClick={() => setInputText(phrase)}
                  className="p-4 border border-slate-200 rounded-lg text-left text-sm text-slate-700 hover:bg-slate-50 transition-colors"
                >
                  {phrase}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="w-full max-w-[800px] flex flex-col gap-8">
            {/* User Message */}
            <div className="flex justify-end w-full">
              <div className="bg-[#F1F5F9] text-slate-800 px-6 py-4 rounded-lg rounded-tr-sm max-w-[85%] text-[14px] leading-relaxed">
                {userMessage || (appVersion === 'modo_plano' ? "Preciso de um termo de quitação para um acidente de trânsito que me envolvi. O valor do acordo foi de R$ 1.500,00." : "Há impacto do tamanho da propriedade rural para o reconhecimento do trabalho rural em propriedade familiar?")}
              </div>
            </div>

            {/* System Message */}
            {isPlanning ? (
              <div className="flex flex-col gap-4 w-full text-slate-800">
                <div className="text-[12px] font-semibold text-slate-400">Jus IA</div>
                <div className="bg-white border border-slate-200 rounded-lg p-8 w-full max-w-[800px] flex flex-col items-center justify-center text-center gap-4">
                  <svg width="40" height="32" viewBox="0 0 40 32" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="5" cy="27" r="5" fill="#77B340">
                      <animateTransform
                        attributeName="transform"
                        type="translate"
                        values="0,0; 0,-20; 0,0; 0,0"
                        keyTimes="0; 0.3; 0.6; 1"
                        dur="1s"
                        calcMode="spline"
                        keySplines="0.4 0.12 0.4 1; 0.4 0.12 0.4 1; 0.4 0.12 0.4 1"
                        begin="0s"
                        repeatCount="indefinite" />
                    </circle>
                    <circle cx="20" cy="27" r="5" fill="#FFCC00">
                      <animateTransform
                        attributeName="transform"
                        type="translate"
                        values="0,0; 0,-20; 0,0; 0,0"
                        keyTimes="0; 0.3; 0.6; 1"
                        dur="1s"
                        calcMode="spline"
                        keySplines="0.4 0.12 0.4 1; 0.4 0.12 0.4 1; 0.4 0.12 0.4 1"
                        begin="0.15s"
                        repeatCount="indefinite" />
                    </circle>
                    <circle cx="35" cy="27" r="5" fill="#3D82DA">
                      <animateTransform
                        attributeName="transform"
                        type="translate"
                        values="0,0; 0,-20; 0,0; 0,0"
                        keyTimes="0; 0.3; 0.6; 1"
                        dur="1s"
                        calcMode="spline"
                        keySplines="0.4 0.12 0.4 1; 0.4 0.12 0.4 1; 0.4 0.12 0.4 1"
                        begin="0.3s"
                        repeatCount="indefinite" />
                    </circle>
                  </svg>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 mb-1">Criando seu Plano de Execução</h3>
                    <p className="text-sm text-slate-500 italic">Isso pode levar alguns segundos enquanto estruturamos as melhores etapas para o seu caso...</p>
                  </div>
                </div>
              </div>
            ) : appVersion === 'modo_plano' && executionMode === 'plano' && planContent ? (
              <div className="flex flex-col gap-4 w-full text-slate-800">
                <AnimatePresence mode="wait">
                  {planExecutionStatus !== 'completed' && (
                    <motion.div 
                      key="plan-section"
                      initial={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0, overflow: 'hidden' }}
                      transition={{ duration: 0.4, ease: "easeInOut" }}
                      className="flex flex-col gap-4 w-full"
                    >
                      <div className="text-[12px] font-semibold text-slate-400">Jus IA</div>
                      <div className="bg-white border border-slate-200 rounded-lg p-6 w-full max-w-[800px]">
                        <div className="flex items-center gap-3 mb-6">
                      <div className="w-10 h-10 rounded-full bg-[#E6F4F0] flex items-center justify-center text-[#007A5F]">
                        <Bot size={20} />
                      </div>
                      <div>
                        <h3 className="text-sm font-bold text-slate-900">Plano de Execução Gerado</h3>
                        <p className="text-xs text-slate-500">Revise as etapas abaixo antes de iniciar a execução.</p>
                      </div>
                    </div>
                    
                    <div className="prose prose-sm max-w-none text-slate-600 mb-6">
                      {(() => { checkboxIndexRef.current = 0; return null; })()}
                      <ReactMarkdown 
                        remarkPlugins={[remarkGfm]}
                        components={{
                          p: ({node, ...props}) => <p className="text-[14px] leading-relaxed text-slate-800 mb-4" {...props} />,
                          h1: ({node, ...props}) => <h1 className="text-2xl font-bold text-slate-900 mb-4" {...props} />,
                          h2: ({node, ...props}) => <h2 className="text-xl font-bold text-slate-900 mb-3 mt-6" {...props} />,
                          h3: ({node, ...props}) => <h3 className="text-lg font-bold text-slate-900 mb-2 mt-4" {...props} />,
                          li: ({node, className, children, ...props}) => {
                            const isTaskListItem = className?.includes('task-list-item');
                            if (isTaskListItem) {
                              const currentIndex = checkboxIndexRef.current++;
                              const isExecuting = planExecutionStatus === 'executing' && currentExecutingStep === currentIndex;
                              const isCompleted = currentExecutingStep > currentIndex || planExecutionStatus === 'completed';
                              
                              return (
                                <li className={`text-[14px] leading-relaxed text-slate-800 mb-4 flex items-start`} {...props}>
                                  <span className="inline-flex items-center mr-3 align-middle mt-0.5 flex-shrink-0">
                                    {isExecuting ? (
                                      <Loader2 size={20} className="animate-spin text-[#007A5F]" />
                                    ) : (
                                      <span className={`w-5 h-5 rounded-[6px] border-2 flex items-center justify-center transition-all ${isCompleted ? 'bg-[#1D7A5F] border-[#1D7A5F]' : 'border-[#5A6B87] bg-transparent'}`}>
                                        {isCompleted && <Check size={14} className="text-white stroke-[3]" />}
                                      </span>
                                    )}
                                  </span>
                                  <div className="flex-1">{children}</div>
                                </li>
                              );
                            }
                            return <li className="text-[14px] leading-relaxed text-slate-800 mb-1" {...props}>{children}</li>;
                          },
                          ul: ({node, ...props}) => <ul className="list-disc pl-5 mb-4" {...props} />,
                          ol: ({node, ...props}) => <ol className="list-decimal pl-5 mb-4" {...props} />,
                          hr: ({node, ...props}) => <hr className="my-6 border-slate-100" {...props} />,
                          input: () => null
                        }}
                      >
                        {planContent}
                      </ReactMarkdown>
                    </div>

                    {planExecutionStatus === 'idle' && (
                      <div className="flex justify-end mt-6">
                        <button 
                          onClick={handleExecutePlan}
                          className="h-10 flex items-center justify-center rounded-lg bg-[#007A5F] text-white text-sm font-bold hover:bg-[#006650] transition-colors shadow-none px-[12px]"
                        >
                          Executar plano
                        </button>
                      </div>
                    )}
                  </div>
                </motion.div>
                )}

                {planExecutionStatus === 'completed' && (
                  <motion.div 
                    key="response-section"
                    ref={respostaRef}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="flex flex-col gap-4 w-full text-slate-800"
                  >
                    <div className="text-[12px] font-semibold text-slate-400">Resposta</div>
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.8, delay: 0.4 }}
                      className="prose prose-slate max-w-none"
                    >
                      <p className="mb-4 text-[14px] leading-relaxed text-slate-800">
                        Aqui está o rascunho do termo de quitação, elaborado conforme o plano aprovado.
                      </p>
                      <h3 className="text-xl font-semibold mb-4 text-slate-800">Termo de Quitação Plena e Irrevogável</h3>
                      <p className="mb-4 text-[14px] leading-relaxed text-slate-800">
                        <strong>PAGADOR:</strong> [Nome do Pagador], [Nacionalidade], [Estado Civil], [Profissão], portador(a) do RG nº [Número] e inscrito(a) no CPF sob o nº [Número], residente e domiciliado(a) à [Endereço Completo].
                      </p>
                      <p className="mb-4 text-[14px] leading-relaxed text-slate-800">
                        <strong>RECEBEDOR:</strong> [Nome do Recebedor], [Nacionalidade], [Estado Civil], [Profissão], portador(a) do RG nº [Número] e inscrito(a) no CPF sob o nº [Número], residente e domiciliado(a) à [Endereço Completo].
                      </p>
                      <p className="mb-4 text-[14px] leading-relaxed text-slate-800">
                        <strong>CLÁUSULA PRIMEIRA - DO OBJETO:</strong> O presente termo tem por objeto a quitação de todos os danos materiais e morais decorrentes do acidente de trânsito ocorrido no dia [Data], por volta das [Hora], na [Local do Acidente], envolvendo os veículos [Descrição do Veículo 1 - Placa] e [Descrição do Veículo 2 - Placa].
                      </p>
                      <p className="mb-4 text-[14px] leading-relaxed text-slate-800">
                        <strong>CLÁUSULA SEGUNDA - DO PAGAMENTO:</strong> O PAGADOR entrega neste ato ao RECEBEDOR a quantia de <strong>R$ 1.500,00 (um mil e quinhentos reais)</strong>, paga através de [Forma de Pagamento - ex: transferência PIX para a chave X], servindo este documento como recibo.
                      </p>
                      <p className="mb-4 text-[14px] leading-relaxed text-slate-800">
                        <strong>CLÁUSULA TERCEIRA - DA QUITAÇÃO:</strong> O RECEBEDOR, ao assinar este termo e confirmar o recebimento do valor acordado, dá ao PAGADOR plena, geral, irrevogável e irretratável quitação por todos os danos (materiais, morais, estéticos ou lucros cessantes) decorrentes do evento descrito na Cláusula Primeira.
                      </p>
                      <p className="mb-4 text-[14px] leading-relaxed text-slate-800">
                        <strong>CLÁUSULA QUARTA - DA RENÚNCIA:</strong> O RECEBEDOR renuncia expressamente a qualquer direito de ação, presente ou futura, na esfera cível ou criminal, contra o PAGADOR, seus herdeiros ou sucessores, relacionada ao referido acidente.
                      </p>
                      <p className="mb-8 text-[14px] leading-relaxed text-slate-800">
                        E por estarem justos e acordados, assinam o presente termo em 2 (duas) vias de igual teor e forma.
                      </p>
                      <p className="mb-12 text-[14px] leading-relaxed text-slate-800">[Cidade - UF], [Data].</p>
                      <div className="flex justify-between mt-12 px-8 mb-8">
                        <div className="text-center w-[40%]">
                          <div className="border-t border-slate-800 pt-2 text-[14px] text-slate-800">
                            <strong>PAGADOR</strong><br/>
                            <span className="text-slate-500 text-sm">[Nome do Pagador]</span>
                          </div>
                        </div>
                        <div className="text-center w-[40%]">
                          <div className="border-t border-slate-800 pt-2 text-[14px] text-slate-800">
                            <strong>RECEBEDOR</strong><br/>
                            <span className="text-slate-500 text-sm">[Nome do Recebedor]</span>
                          </div>
                        </div>
                      </div>
                      <p className="mb-4 text-[14px] leading-relaxed text-slate-800">
                        Por favor, revise os dados entre colchetes e preencha com as informações reais das partes. Se precisar de alguma alteração em alguma cláusula, basta me informar!
                      </p>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
              </div>
            ) : appVersion === 'modo_plano' && !userMessage ? (
              <div className="flex flex-col gap-4 w-full text-slate-800">
                <div className="text-[12px] font-semibold text-slate-400">Jus IA</div>
                <div className="bg-white border border-slate-200 rounded-lg p-6 w-full max-w-[800px]">
                  <p className="text-[14px] leading-relaxed text-slate-800">
                    Olá! Estou operando no **Modo Plano**. Como posso ajudar você hoje? 
                    Neste modo, criarei um roteiro detalhado de execução antes de realizar qualquer tarefa complexa.
                  </p>
                </div>
              </div>
            ) : (
              <div className="flex flex-col gap-4 w-full text-slate-800">
                <div className="text-[12px] font-semibold text-slate-400">Resposta</div>
                
                <div className="prose prose-slate max-w-none">
                  <h3 className="text-xl font-semibold mb-4 text-slate-800">Doutrina</h3>
                  <p className="mb-4 text-[14px] leading-relaxed text-slate-800">
                    Por limitação tecnica atual não temos a informação de página, que é o ideal para o cenário de citações de doutrina. Por conta disso, e pensando e já deixar em formato para citação, podemos tentar chegar o mais próximo possível da especificação de localidade que acredito ser o número/nome do capitulo.
                  </p>
                  <p className="mb-4 text-[14px] leading-relaxed text-slate-800">
                    Além disso é importante transcrever todo o trecho relevante, por mais que ele seja grande. Aqui vamos ter aumento de chance de alucinação na transcrição?
                  </p>
                  
                  <blockquote className="border-l-2 border-slate-300 pl-4 py-1 my-6 text-slate-800 text-[14px] leading-relaxed">
                    "De uma maneira geral, em todos os sistemas processuais há recursos. Do ponto de vista axiológico, é uma forma de fazer prevalecer o valor “justiça” sobre a “segurança jurídica”. Mecanismos de correção do erro possibilitam o aprimoramento da decisão, para que seja correta em seus aspectos fáticos e jurídicos e, portanto, seja justa. Por outro lado, a segurança jurídica somente irá se impor em momento posterior, esgotadas as possibilidades recursais, cristalizando-se no instituto da “coisa julgada”." (BADARÓ, Gustavo, 2023, Manual dos Recursos Penais, cap. 1.1) 
                    <button 
                      onClick={() => setIsBuildOpen(true)}
                      className="inline-flex items-center px-2 h-[24px] max-w-[126px] ml-1 border border-slate-300 rounded-full text-[12px] font-normal text-slate-600 bg-white hover:bg-slate-50 not-italic align-middle"
                    >
                      <span className="font-bold text-slate-900 mr-1 shrink-0">1.</span>
                      <span className="truncate">Cap. 1.1 Conceit...</span>
                    </button>
                  </blockquote>

                  <h3 className="text-xl font-semibold mb-4 mt-8 text-slate-800">Multipos autores</h3>
                  <p className="mb-4 text-[14px] leading-relaxed text-slate-800">
                    Em casos como esse devemos citar todos os autores vamos concatenando uma após o outro:
                  </p>

                  <blockquote className="border-l-2 border-slate-300 pl-4 py-1 my-6 text-slate-800 text-[14px] leading-relaxed">
                    "A prática de atos processuais por meio eletrônico não é matéria desconhecida do direito processual em geral e da processualística juslaboral em particular. Sob um prisma histórico, é possível observar que, já na década de noventa, sobrevieram previsões legislativas que, embora ainda de forma embrionária, foram responsáveis por introduzir, no ordenamento jurídico pátrio, a possibilidade da comunicação e mesmo da prática de determinados atos processuais por meio eletrônico." (NAHAS, Thereza, FINCATO, Denise, CAMPOS, Amália, 2021, Prática do Processo do Trabalho: Do Presencial ao Virtual, cap. 5.1)
                    <button 
                      onClick={() => setIsBuildOpen(true)}
                      className="inline-flex items-center px-2 h-[24px] max-w-[126px] ml-1 border border-slate-300 rounded-full text-[12px] font-normal text-slate-600 bg-white hover:bg-slate-50 not-italic align-middle"
                    >
                      <span className="font-bold text-slate-900 mr-1 shrink-0">3.</span>
                      <span className="truncate">Cap. 5.1. Apres...</span>
                    </button>
                  </blockquote>

                  <p className="mb-0 text-[14px] leading-relaxed text-slate-800">
                    Mantendo nossa facilitação de auditoria da informação, vamos manter o artifício de linkar e validar a informação.
                  </p>
                </div>

                {/* Message Actions */}
                <div className="flex flex-col gap-4 mt-0">
                  <button 
                    onClick={() => setIsBuildOpen(true)}
                    className="flex items-center gap-2 px-4 h-9 border border-slate-300 rounded-lg text-slate-700 hover:bg-slate-50 transition-colors w-fit font-semibold text-[14px]"
                  >
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" clipRule="evenodd" d="M1.827 18.3708V18.3705C0.421503 17.5622 -0.0601342 15.7711 0.751271 14.3706L7.60892 2.53615C8.42058 1.13546 10.218 0.655589 11.6237 1.46421C13.0295 2.27284 13.5111 4.06394 12.6995 5.46438L5.84182 17.2989C5.03041 18.6993 3.23274 19.1792 1.827 18.3708Z" fill="#FFCE00"/>
                      <path fillRule="evenodd" clipRule="evenodd" d="M18.4814 18.3706C17.0756 19.1789 15.2782 18.6993 14.4666 17.2989L7.60891 5.46438C6.7975 4.06395 7.27914 2.27284 8.68463 1.46421C10.0904 0.655589 11.8878 1.13546 12.6995 2.53615L19.5571 14.3706C20.3688 15.7711 19.8871 17.5622 18.4814 18.3706Z" fill="#378CC8"/>
                      <path fillRule="evenodd" clipRule="evenodd" d="M12.5792 2.34714C12.5597 2.31884 12.5415 2.29003 12.5213 2.26249C12.4859 2.21473 12.448 2.16975 12.4106 2.12477C12.3851 2.09444 12.3611 2.06336 12.3346 2.03405C12.3012 1.99741 12.2656 1.9633 12.2307 1.92868C12.1961 1.89406 12.1622 1.85893 12.1256 1.82583C12.0958 1.79904 12.0644 1.77504 12.0338 1.74951C11.9889 1.71237 11.9441 1.67472 11.8964 1.63985C11.8686 1.61938 11.8393 1.60118 11.8107 1.58173C11.7584 1.5461 11.7056 1.51097 11.6505 1.47837C11.6184 1.45967 11.5853 1.44274 11.5525 1.42505C11.5009 1.397 11.4491 1.36997 11.3965 1.34546C11.3549 1.326 11.3124 1.30881 11.2699 1.29138C11.226 1.27318 11.1818 1.2555 11.137 1.23958C11.087 1.22189 11.0365 1.20647 10.9857 1.19131C10.9467 1.17994 10.9078 1.16882 10.8687 1.15897C10.8146 1.14532 10.7598 1.13395 10.7049 1.12334C10.6665 1.11626 10.6281 1.10918 10.5894 1.10337C10.5361 1.09529 10.4825 1.08947 10.4287 1.08442C10.386 1.08038 10.3433 1.07684 10.3009 1.07482C10.2523 1.07229 10.2036 1.07153 10.1548 1.07153C10.106 1.07153 10.0573 1.07229 10.0087 1.07482C9.96604 1.07684 9.92359 1.08038 9.88088 1.08442C9.82706 1.08947 9.77348 1.09529 9.72017 1.10337C9.6815 1.10918 9.64309 1.11626 9.60468 1.12334C9.54985 1.13395 9.49501 1.14532 9.44069 1.15897C9.40177 1.16882 9.36285 1.17994 9.32394 1.19131C9.27315 1.20647 9.22236 1.22189 9.17258 1.23958C9.12785 1.2555 9.08363 1.27318 9.0394 1.29138C8.99695 1.30881 8.95475 1.326 8.91306 1.34546C8.8605 1.36997 8.80869 1.397 8.75689 1.42505C8.72429 1.44274 8.69119 1.45967 8.6591 1.47837C8.60376 1.51097 8.55094 1.54635 8.49864 1.58173C8.47008 1.60118 8.44102 1.61938 8.41323 1.63985C8.36547 1.67472 8.32049 1.71237 8.27551 1.74977C8.24493 1.77504 8.2136 1.7993 8.18403 1.82583C8.14739 1.85893 8.11353 1.89406 8.07866 1.92868C8.04378 1.96355 8.00815 1.99741 7.97505 2.03405C7.94852 2.06336 7.92426 2.09444 7.89899 2.12477C7.86134 2.16975 7.82343 2.21473 7.78831 2.26249C7.76809 2.29003 7.74965 2.31884 7.73044 2.34714C7.69456 2.39945 7.65918 2.45226 7.62633 2.50735C7.10502 3.38749 7.06004 4.5135 7.60965 5.46161L10.1548 9.85396L12.7 5.46161C13.2493 4.5135 13.2043 3.38749 12.6833 2.5076C12.6504 2.45226 12.6148 2.39945 12.5792 2.34714Z" fill="#7AB441"/>
                    </svg>
                    10 fontes
                  </button>
                  
                  <div className="flex items-center gap-1 text-slate-500">
                    <button className="w-6 h-6 flex items-center justify-center hover:bg-slate-100 hover:text-slate-700 rounded-lg transition-colors">
                      <Copy size={16} />
                    </button>
                    <button className="w-6 h-6 flex items-center justify-center hover:bg-slate-100 hover:text-slate-700 rounded-lg transition-colors">
                      <ThumbsUp size={16} />
                    </button>
                    <button className="w-6 h-6 flex items-center justify-center hover:bg-slate-100 hover:text-slate-700 rounded-lg transition-colors">
                      <ThumbsDown size={16} />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Input Area */}




      {/* Input Area */}
      <div className="px-4 pb-4 pt-0 bg-white flex justify-center">
        <div className="w-full max-w-[800px]">
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
            onSubmit={onSubmit}
            activeSkill={activeSkill}
            setActiveSkill={setActiveSkill}
            skills={skills}
            appVersion={appVersion}
            executionMode={executionMode}
            setExecutionMode={setExecutionMode}
          />
        </div>
      </div>
    </div>
  );
}
