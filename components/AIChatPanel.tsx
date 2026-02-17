
import React, { useState, useRef, useEffect } from 'react';
import { gemini } from '../services/geminiService';
import { Lesson } from '../types';

interface Message {
  role: 'user' | 'model';
  text: string;
}

interface AIChatPanelProps {
  isOpen: boolean;
  onClose: () => void;
  context: Lesson;
}

const AIChatPanel: React.FC<AIChatPanelProps> = ({ isOpen, onClose, context }) => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: `Olá! Sou seu assistente Nexus. Estou focado na aula de **${context.title}**. Como posso te ajudar hoje?` }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsLoading(true);

    try {
      const history = messages.map(m => ({
        role: m.role,
        parts: [{ text: m.text }]
      }));
      
      const prompt = `Contexto da Aula: ${context.title}\nDefinição Técnica: ${context.content.tecnico.definition}\n\nPergunta do Aluno: ${userMsg}`;
      const response = await gemini.ask(prompt, history);
      
      setMessages(prev => [...prev, { role: 'model', text: response }]);
    } catch (err) {
      setMessages(prev => [...prev, { role: 'model', text: 'Desculpe, tive um problema técnico ao processar sua pergunta.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div 
      className={`fixed inset-y-0 right-0 z-[100] lg:static ${isOpen ? 'w-full md:w-[400px] translate-x-0' : 'w-0 translate-x-full lg:translate-x-0'} bg-[#0c0c0e] border-l border-zinc-800 transition-all duration-300 flex flex-col overflow-hidden`}
    >
      <div className="h-16 flex items-center justify-between px-6 border-b border-zinc-800 shrink-0">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
          <span className="font-bold text-[10px] uppercase tracking-widest text-zinc-400">Nexus Tutor</span>
        </div>
        <button onClick={onClose} className="p-2 text-zinc-500 hover:text-white transition-colors">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4 md:space-y-6 custom-scrollbar">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[90%] md:max-w-[85%] p-3 md:p-4 rounded-2xl text-xs md:text-sm leading-relaxed ${msg.role === 'user' ? 'bg-blue-600 text-white rounded-tr-none shadow-lg' : 'bg-zinc-800 text-zinc-200 rounded-tl-none border border-zinc-700/50'}`}>
              {msg.text}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-zinc-800/50 p-4 rounded-2xl rounded-tl-none border border-zinc-700/30">
              <div className="flex gap-1.5">
                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0s' }} />
                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="p-4 border-t border-zinc-800 bg-[#09090b]">
        <div className="relative">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
            placeholder="Pergunte ao Nexus Tutor..."
            className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-3 pr-12 text-xs md:text-sm text-zinc-100 placeholder-zinc-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none resize-none min-h-[44px] max-h-[120px]"
          />
          <button 
            onClick={handleSend}
            disabled={isLoading || !input.trim()}
            className="absolute right-3 bottom-2 p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 disabled:opacity-50 disabled:hover:bg-blue-600 transition-colors shadow-lg"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
          </button>
        </div>
        <div className="mt-2 text-[8px] md:text-[9px] text-zinc-500 text-center font-bold uppercase tracking-widest">Powered by Gemini 3 Pro Preview</div>
      </div>
    </div>
  );
};

export default AIChatPanel;
