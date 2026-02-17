
import React from 'react';

interface HeaderProps {
  lessonTitle: string;
  unitTitle: string;
  onToggleChat: () => void;
  onToggleSidebar: () => void;
  progress: number;
}

const Header: React.FC<HeaderProps> = ({ lessonTitle, unitTitle, onToggleChat, onToggleSidebar, progress }) => {
  return (
    <header className="h-16 glass border-b border-zinc-800 flex items-center justify-between px-4 md:px-6 z-40 sticky top-0 shrink-0">
      <div className="flex items-center gap-3">
        <button 
          onClick={onToggleSidebar}
          className="lg:hidden p-2 text-zinc-400 hover:text-white transition-colors"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <div className="flex flex-col max-w-[150px] md:max-w-none">
          <span className="text-[9px] md:text-[10px] font-bold text-zinc-500 uppercase tracking-widest truncate">{unitTitle}</span>
          <h1 className="text-xs md:text-sm font-semibold text-zinc-100 truncate">{lessonTitle}</h1>
        </div>
      </div>

      <div className="flex items-center gap-3 md:gap-6">
        <div className="hidden sm:flex items-center gap-3">
          <span className="hidden md:inline text-[10px] font-medium text-zinc-400">PROGRESSO</span>
          <div className="w-20 md:w-32 h-1.5 bg-zinc-800 rounded-full overflow-hidden">
            <div 
              className="h-full bg-blue-500 transition-all duration-500" 
              style={{ width: `${progress}%` }}
            />
          </div>
          <span className="text-[10px] font-bold text-blue-400">{progress}%</span>
        </div>

        <button 
          onClick={onToggleChat}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white text-[10px] md:text-[11px] font-bold px-3 py-1.5 md:px-4 md:py-2 rounded-lg transition-colors shadow-lg shadow-blue-900/20"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
          <span className="hidden xs:inline">ASSISTENTE IA</span>
        </button>
      </div>
    </header>
  );
};

export default Header;
