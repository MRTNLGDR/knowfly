
import React, { useState } from 'react';
import { Module, CourseState } from '../types';

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
  modules: Module[];
  activeState: CourseState;
  onNavigate: (mId: string, uId: string, lId: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onToggle, modules, activeState, onNavigate }) => {
  const [expandedModules, setExpandedModules] = useState<string[]>([modules[0].id]);

  const toggleModule = (id: string) => {
    setExpandedModules(prev => 
      prev.includes(id) ? prev.filter(mId => mId !== id) : [...prev, id]
    );
  };

  return (
    <aside 
      className={`fixed inset-y-0 left-0 lg:static z-[50] ${isOpen ? 'w-72 md:w-80 translate-x-0' : 'w-0 -translate-x-full lg:translate-x-0'} bg-[#050505] border-r border-white/5 transition-all duration-300 flex flex-col overflow-hidden shadow-2xl`}
    >
      <div className="h-16 md:h-20 flex items-center px-6 md:px-8 border-b border-white/5 shrink-0">
        <div className="flex items-center gap-3 md:gap-4">
          <div className="w-8 h-8 md:w-10 md:h-10 bg-blue-600 rounded-xl md:rounded-2xl flex items-center justify-center font-black italic text-xl md:text-2xl shadow-[0_0_20px_rgba(59,130,246,0.3)] text-white">N</div>
          <div className="flex flex-col">
            <span className="font-black tracking-tighter text-base md:text-lg leading-none">NEXUS</span>
            <span className="text-[8px] md:text-[10px] font-bold text-zinc-500 tracking-[0.3em] uppercase">Academy</span>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-8 custom-scrollbar">
        {modules.map(module => (
          <div key={module.id} className="space-y-3 md:space-y-4">
            <button 
              onClick={() => toggleModule(module.id)}
              className={`w-full flex items-center justify-between group transition-colors ${activeState.currentModuleId === module.id ? 'text-white' : 'text-zinc-500 hover:text-zinc-300'}`}
            >
              <span className="text-[10px] md:text-[11px] font-black uppercase tracking-widest text-left leading-tight pr-4">{module.title}</span>
              <svg className={`w-3 h-3 transform transition-transform shrink-0 ${expandedModules.includes(module.id) ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {expandedModules.includes(module.id) && (
              <div className="space-y-4 md:space-y-6 ml-1 pl-3 md:pl-4 border-l border-white/5">
                {module.units.map(unit => (
                  <div key={unit.id} className="space-y-2 md:space-y-3">
                    <div className="text-[9px] md:text-[10px] font-black text-zinc-600 uppercase tracking-widest">{unit.title}</div>
                    <div className="space-y-1">
                      {unit.lessons.map(lesson => (
                        <button
                          key={lesson.id}
                          onClick={() => onNavigate(module.id, unit.id, lesson.id)}
                          className={`w-full flex items-center gap-3 py-1.5 md:py-2 px-2 md:px-3 rounded-lg md:rounded-xl text-[10px] md:text-[11px] font-medium text-left transition-all ${
                            activeState.currentLessonId === lesson.id 
                              ? 'bg-white/5 text-white ring-1 ring-white/10' 
                              : 'text-zinc-500 hover:text-zinc-300 hover:bg-white/2'
                          }`}
                        >
                          <div className={`w-1.5 h-1.5 rounded-full shrink-0 ${
                            activeState.completedLessons.includes(lesson.id) 
                              ? 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]' 
                              : activeState.currentLessonId === lesson.id ? 'bg-blue-500' : 'bg-zinc-800'
                          }`} />
                          <span className="truncate">{lesson.title}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* User Footer */}
      <div className="p-4 md:p-6 border-t border-white/5">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 md:w-10 md:h-10 rounded-xl md:rounded-2xl bg-zinc-800 border border-white/10 flex items-center justify-center">
             <div className="w-5 h-5 md:w-6 md:h-6 rounded-full bg-gradient-to-br from-blue-500 to-purple-600" />
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] md:text-[11px] font-black text-white">NEXUS_USER_01</span>
            <span className="text-[8px] md:text-[9px] font-bold text-zinc-500 uppercase tracking-widest">Plano Senior</span>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
