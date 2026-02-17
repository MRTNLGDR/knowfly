
import React, { useState } from 'react';
import { Lesson, ExplanationLayer } from '../types';
import InteractiveWidget from './InteractiveWidget';
import CodeSnippet from './CodeSnippet';

interface LessonContentAreaProps {
  lesson: Lesson;
  activeLayer: ExplanationLayer;
  onLayerChange: (layer: ExplanationLayer) => void;
  onComplete: () => void;
  isCompleted: boolean;
}

const LessonContentArea: React.FC<LessonContentAreaProps> = ({ 
  lesson, 
  activeLayer, 
  onLayerChange, 
  onComplete,
  isCompleted 
}) => {
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [selectedTerm, setSelectedTerm] = useState<string | null>(null);

  const layerInfo = {
    leigo: { 
      label: 'LEIGO', 
      desc: 'Analogia Humana', 
      color: 'from-sky-400 to-blue-600', 
      icon: 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z' 
    },
    visual: { 
      label: 'VISUAL', 
      desc: 'Esquemas Mentais', 
      color: 'from-purple-400 to-fuchsia-600', 
      icon: 'M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z' 
    },
    tecnico: { 
      label: 'TÉCNICO', 
      desc: 'Deep Architecture', 
      color: 'from-emerald-400 to-teal-600', 
      icon: 'M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4' 
    },
    tutorial: { 
      label: 'TUTORIAL', 
      desc: 'Hands-on Nexus', 
      color: 'from-amber-400 to-orange-600', 
      icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01' 
    }
  };

  return (
    <div className="relative min-h-full">
      {/* Background Cinematic Aura */}
      <div className={`fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl aspect-video bg-gradient-to-b ${layerInfo[activeLayer].color} opacity-[0.08] blur-[100px] md:blur-[160px] pointer-events-none transition-all duration-1000`} />

      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-12 py-8 md:py-16 relative z-10">
        
        {/* Layer Selector (HUD Style) */}
        <div className="flex justify-start md:justify-center mb-8 md:mb-16 overflow-x-auto pb-4 no-scrollbar">
          <div className="glass p-1.5 md:p-2 rounded-[20px] md:rounded-[24px] flex gap-1.5 md:gap-2 border border-white/5 shadow-2xl shrink-0 mx-auto">
            {(Object.entries(layerInfo) as [ExplanationLayer, any][]).map(([key, info]) => (
              <button
                key={key}
                onClick={() => onLayerChange(key)}
                className={`relative px-4 py-3 md:px-6 md:py-4 rounded-[14px] md:rounded-[18px] transition-all duration-500 flex flex-col items-center gap-1 overflow-hidden group shrink-0 ${
                  activeLayer === key 
                    ? 'bg-white/10 text-white shadow-xl ring-1 ring-white/20' 
                    : 'text-zinc-500 hover:text-zinc-300 hover:bg-white/5'
                }`}
              >
                <svg className={`w-4 h-4 md:w-5 md:h-5 mb-1 transition-transform duration-500 ${activeLayer === key ? 'scale-110' : 'group-hover:scale-110'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={info.icon} />
                </svg>
                <span className="text-[8px] md:text-[10px] font-black tracking-[0.2em]">{info.label}</span>
                {activeLayer === key && (
                  <div className={`absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r ${info.color}`} />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Content Shell */}
        <div className="shen-card rounded-[32px] md:rounded-[48px] border border-white/5 overflow-hidden flex flex-col min-h-[500px] md:min-h-[700px]">
          
          <div className="px-6 py-6 md:px-12 md:py-10 flex flex-col md:flex-row md:items-center justify-between gap-6 bg-gradient-to-b from-white/5 to-transparent">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className={`w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-gradient-to-r ${layerInfo[activeLayer].color} animate-pulse shadow-[0_0_15px_currentColor]`} />
                <span className="text-[9px] md:text-[11px] font-black tracking-[0.4em] text-zinc-500 uppercase">{layerInfo[activeLayer].desc}</span>
              </div>
              <h1 className="text-2xl md:text-4xl font-black tracking-tighter text-white leading-tight">{lesson.title}</h1>
            </div>

            <div className="flex items-center gap-3 md:gap-4">
               <button 
                onClick={() => setIsVideoOpen(true)}
                className="flex-1 md:flex-none px-6 py-2.5 md:px-8 md:py-3 rounded-full bg-white text-black text-[10px] md:text-xs font-black tracking-widest hover:scale-105 active:scale-95 transition-all shadow-[0_0_30px_rgba(255,255,255,0.2)]"
               >
                 ASSISTIR AULA
               </button>
               <button className="p-2.5 md:p-3 rounded-full glass border border-white/10 text-zinc-400 hover:text-white transition-colors">
                  <svg className="w-4 h-4 md:w-5 md:h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/></svg>
               </button>
            </div>
          </div>

          <div className="flex-1 p-6 md:p-12 lg:p-16">
            {activeLayer === 'leigo' && (
              <div className="max-w-4xl animate-in fade-in slide-in-from-bottom-6 duration-700">
                <p className="text-xl md:text-4xl font-medium leading-[1.4] md:leading-[1.3] text-zinc-200 tracking-tight">
                  {lesson.content.leigo}
                </p>
                <div className="mt-12 md:mt-16 flex gap-6 md:gap-12 items-center opacity-40">
                  <div className="h-px flex-1 bg-gradient-to-r from-zinc-800 to-transparent" />
                  <span className="text-[8px] md:text-[10px] font-black tracking-[0.5em] uppercase">Human Perspective</span>
                  <div className="h-px flex-1 bg-gradient-to-l from-zinc-800 to-transparent" />
                </div>
              </div>
            )}

            {activeLayer === 'visual' && (
              <div className="h-full flex flex-col animate-in fade-in zoom-in-95 duration-700">
                <div className="mb-8 md:mb-12 text-center">
                  <span className="text-lg md:text-2xl font-medium text-zinc-400 italic">"{lesson.content.visual.metaphor}"</span>
                </div>
                <div className="flex-1 min-h-[350px] md:min-h-[500px] rounded-[24px] md:rounded-[40px] border border-white/5 bg-black/40 overflow-hidden relative group">
                   <InteractiveWidget 
                     type={lesson.content.visual.widgetType} 
                     title={lesson.content.visual.widgetTitle}
                   />
                </div>
              </div>
            )}

            {activeLayer === 'tecnico' && (
              <div className="max-w-6xl mx-auto animate-in fade-in slide-in-from-right-6 duration-700 relative">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-16">
                  <div className="lg:col-span-7 space-y-8 md:space-y-12">
                    <section>
                      <h4 className="text-[9px] md:text-[11px] font-black text-emerald-500 tracking-[0.3em] uppercase mb-4 md:mb-6">Especificação Formal</h4>
                      <div className="p-6 md:p-10 rounded-[24px] md:rounded-[32px] bg-zinc-900 border border-white/5 mono text-base md:text-xl leading-relaxed text-emerald-100 shadow-2xl">
                        {lesson.content.tecnico.definition}
                      </div>
                    </section>
                    
                    <section>
                      <h4 className="text-[9px] md:text-[11px] font-black text-zinc-500 tracking-[0.3em] uppercase mb-4 md:mb-6 flex items-center gap-2">
                        Vocabulário
                        <span className="hidden xs:inline text-[7px] md:text-[8px] px-2 py-0.5 rounded-full border border-zinc-700 text-zinc-600">CLIQUE PARA TRADUÇÃO</span>
                      </h4>
                      <div className="flex flex-wrap gap-2 md:gap-3">
                        {lesson.content.tecnico.terms.map(term => (
                          <button 
                            key={term} 
                            onClick={() => setSelectedTerm(term)}
                            className={`px-3 py-2 md:px-5 md:py-3 rounded-xl md:rounded-2xl border transition-all text-[9px] md:text-[11px] font-black mono uppercase flex items-center gap-2 ${
                              selectedTerm === term 
                              ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300 shadow-[0_0_20px_rgba(16,185,129,0.2)]' 
                              : 'bg-white/5 border-white/5 text-emerald-400 hover:bg-white/10 hover:border-emerald-500/30'
                            }`}
                          >
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            {term}
                          </button>
                        ))}
                      </div>
                    </section>
                  </div>

                  <div className="lg:col-span-5">
                    <div className="p-6 md:p-10 rounded-[24px] md:rounded-[40px] glass border border-white/5 sticky top-12">
                      <h4 className="text-[9px] md:text-[11px] font-black text-white tracking-[0.3em] uppercase mb-6 md:mb-10 flex items-center gap-3">
                        <div className="w-1 h-6 bg-emerald-500 rounded-full" />
                        Componentes
                      </h4>
                      <div className="space-y-6 md:space-y-8">
                        {lesson.content.tecnico.architecture.map((item, i) => (
                          <div key={i} className="flex gap-4 md:gap-6 group">
                            <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg md:rounded-2xl bg-zinc-800 border border-white/5 flex items-center justify-center text-[10px] md:text-xs font-black text-zinc-500 group-hover:bg-emerald-500 group-hover:text-white transition-all shadow-lg shrink-0">
                              {i+1}
                            </div>
                            <p className="text-zinc-400 font-medium text-xs md:text-base leading-relaxed group-hover:text-zinc-200 transition-colors pt-1 md:pt-2">{item}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Technical Dictionary Overlay (ShenUI) */}
                {selectedTerm && (
                  <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 md:p-6 animate-in fade-in duration-300">
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setSelectedTerm(null)} />
                    <div className="w-full max-w-lg glass rounded-[24px] md:rounded-[40px] p-6 md:p-10 border border-emerald-500/30 shadow-[0_0_100px_rgba(16,185,129,0.2)] relative z-10 animate-in zoom-in-95 duration-300">
                      <div className="flex justify-between items-start mb-6 md:mb-8">
                        <div>
                          <span className="text-[8px] md:text-[10px] font-black text-emerald-500 tracking-[0.4em] uppercase mb-1 md:mb-2 block">Dicionário Nexus IA</span>
                          <h3 className="text-xl md:text-2xl font-black text-white tracking-tight mono italic">{selectedTerm}</h3>
                        </div>
                        <button 
                          onClick={() => setSelectedTerm(null)}
                          className="p-2 hover:bg-white/5 rounded-full transition-colors text-zinc-500 hover:text-white"
                        >
                          <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                      
                      <div className="relative">
                        <div className="absolute -left-4 md:-left-6 top-0 bottom-0 w-0.5 md:w-1 bg-gradient-to-b from-emerald-500 to-transparent rounded-full" />
                        <div className="flex items-center gap-3 mb-3 md:mb-4">
                           <span className="text-[9px] md:text-[11px] font-black text-zinc-500 uppercase tracking-widest">Tradução para Leigo</span>
                           <div className="h-px flex-1 bg-white/5" />
                        </div>
                        <p className="text-base md:text-xl font-medium leading-relaxed text-zinc-200">
                          {lesson.content.tecnico.dictionary[selectedTerm] || "Tradução não disponível para este termo."}
                        </p>
                      </div>

                      <div className="mt-8 md:mt-10 pt-6 md:pt-8 border-t border-white/5 flex justify-end">
                         <button 
                          onClick={() => setSelectedTerm(null)}
                          className="w-full md:w-auto px-6 py-3 rounded-xl md:rounded-2xl bg-emerald-500 text-black text-[10px] font-black tracking-widest uppercase hover:scale-105 transition-all"
                         >
                           Entendido
                         </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {activeLayer === 'tutorial' && (
              <div className="max-w-5xl mx-auto animate-in fade-in slide-in-from-left-6 duration-700">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-16">
                  <div className="lg:col-span-8 space-y-6 md:space-y-8">
                    <h4 className="text-[9px] md:text-[11px] font-black text-amber-500 tracking-[0.3em] uppercase">Pipeline de Execução</h4>
                    {lesson.content.tutorial.steps.map((step, i) => (
                      <div key={i} className="p-6 md:p-8 rounded-[24px] md:rounded-[32px] bg-white/5 border border-white/5 hover:border-amber-500/20 transition-all flex gap-4 md:gap-8 items-start group">
                        <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg md:rounded-2xl bg-zinc-900 border border-white/5 flex items-center justify-center font-black text-base md:text-lg text-amber-500 group-hover:scale-110 transition-transform shadow-xl shrink-0">
                          {i+1}
                        </div>
                        <div className="pt-1">
                           <p className="text-base md:text-xl font-bold text-zinc-100 mb-1 md:mb-2 leading-snug">{step}</p>
                           <div className="flex items-center gap-2 text-[8px] md:text-[10px] font-black text-zinc-500 uppercase tracking-widest">
                             <div className="w-1 h-1 rounded-full bg-amber-500" />
                             Aguardando Ação
                           </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="lg:col-span-4 space-y-8 md:space-y-10">
                    <div className="p-6 md:p-8 rounded-[24px] md:rounded-[32px] bg-red-500/5 border border-red-500/10">
                       <h5 className="text-[9px] md:text-[10px] font-black text-red-500 tracking-widest uppercase mb-4 md:mb-6">Critical Warnings</h5>
                       <ul className="space-y-3 md:space-y-4">
                         {lesson.content.tutorial.commonErrors.map((err, i) => (
                           <li key={i} className="text-[10px] md:text-xs text-zinc-500 flex gap-3 leading-relaxed">
                             <span className="text-red-500 font-black">!</span>
                             {err}
                           </li>
                         ))}
                       </ul>
                    </div>
                    <div className="p-6 md:p-8 rounded-[24px] md:rounded-[32px] bg-blue-500/5 border border-blue-500/10">
                       <h5 className="text-[9px] md:text-[10px] font-black text-blue-500 tracking-widest uppercase mb-4 md:mb-6">Nexus Validation</h5>
                       <p className="text-xs md:text-sm text-zinc-400 font-medium italic leading-relaxed">
                         {lesson.content.tutorial.validation}
                       </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Masterize Action */}
        <div className="mt-12 md:mt-20 flex flex-col items-center gap-4 md:gap-6">
           <button 
             onClick={onComplete}
             disabled={isCompleted}
             className={`w-full md:w-auto px-8 md:px-16 py-4 md:py-6 rounded-full text-[10px] md:text-[11px] font-black tracking-[0.3em] uppercase transition-all duration-700 shadow-2xl ${
               isCompleted 
                 ? 'bg-green-500/10 text-green-400 border border-green-500/30' 
                 : 'bg-white text-black hover:scale-105 active:scale-95'
             }`}
           >
             {isCompleted ? 'MÓDULO MASTERIZADO' : 'MARCAR COMO MASTERIZADO'}
           </button>
           <span className="text-[8px] md:text-[10px] font-black text-zinc-600 tracking-[0.2em] uppercase">Exp: +500 Nexus Points</span>
        </div>
      </div>

      {/* Video Modal Overlay */}
      {isVideoOpen && (
        <div className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-2xl p-4 md:p-12 flex flex-col animate-in fade-in duration-500">
           <div className="max-w-7xl mx-auto w-full flex flex-col h-full">
              <div className="flex justify-between items-center mb-6 md:mb-10">
                 <h3 className="text-lg md:text-3xl font-black text-white tracking-tighter truncate pr-4">Video Masterclass: {lesson.title}</h3>
                 <button onClick={() => setIsVideoOpen(false)} className="p-2.5 md:p-4 glass rounded-full hover:bg-white/10 transition-colors shrink-0">
                    <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/></svg>
                 </button>
              </div>
              <div className="flex-1 rounded-[32px] md:rounded-[56px] border border-white/10 bg-zinc-900 overflow-hidden relative group cursor-pointer shadow-[0_0_100px_rgba(59,130,246,0.15)]">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 md:w-24 md:h-24 rounded-full bg-blue-600 flex items-center justify-center shadow-[0_0_50px_#3b82f6] group-hover:scale-110 transition-all duration-500">
                       <svg className="w-6 h-6 md:w-10 md:h-10 text-white ml-1.5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                    </div>
                  </div>
                  <div className="absolute bottom-6 left-6 md:bottom-12 md:left-12">
                     <span className="text-[8px] md:text-[10px] font-black tracking-[0.5em] text-zinc-500 uppercase">Nexus Streaming // 4K Fidelity</span>
                  </div>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};

export default LessonContentArea;
