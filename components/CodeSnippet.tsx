import React, { useState, useRef, useEffect } from 'react';
import { CodeSnippetData } from '../types';

interface CodeSnippetProps {
  snippet: CodeSnippetData;
  accentColor?: string; // tailwind color class like 'sky' | 'purple' | 'emerald' | 'amber'
}

const LANG_BADGES: Record<string, { label: string; color: string }> = {
  javascript: { label: 'JS', color: 'bg-amber-500/20 text-amber-400 border-amber-500/30' },
  typescript: { label: 'TS', color: 'bg-blue-500/20 text-blue-400 border-blue-500/30' },
  python: { label: 'PY', color: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' },
  json: { label: 'JSON', color: 'bg-orange-500/20 text-orange-400 border-orange-500/30' },
  bash: { label: 'BASH', color: 'bg-zinc-500/20 text-zinc-400 border-zinc-500/30' },
  pseudocode: { label: 'PSEUDO', color: 'bg-sky-500/20 text-sky-400 border-sky-500/30' },
  html: { label: 'HTML', color: 'bg-red-500/20 text-red-400 border-red-500/30' },
  css: { label: 'CSS', color: 'bg-purple-500/20 text-purple-300 border-purple-500/30' },
  math: { label: 'MATH', color: 'bg-teal-500/20 text-teal-400 border-teal-500/30' },
};

// Simple syntax highlighter - no external deps
function highlightCode(code: string, language: string): React.ReactNode[] {
  const lines = code.split('\n');

  return lines.map((line, lineIdx) => {
    const tokens = tokenizeLine(line, language);
    return (
      <div key={lineIdx} className="flex">
        <span className="w-8 md:w-10 shrink-0 text-right pr-3 md:pr-4 select-none text-zinc-600 text-[10px] md:text-xs">
          {lineIdx + 1}
        </span>
        <span className="flex-1 whitespace-pre">
          {tokens.map((token, i) => (
            <span key={i} className={token.className}>
              {token.text}
            </span>
          ))}
        </span>
      </div>
    );
  });
}

interface Token {
  text: string;
  className: string;
}

function tokenizeLine(line: string, language: string): Token[] {
  const tokens: Token[] = [];
  let remaining = line;

  const patterns: [RegExp, string][] = [
    // Comments
    [/^(\/\/.*)/, 'text-zinc-500 italic'],
    [/^(#.*)/, 'text-zinc-500 italic'],
    // Strings
    [/^("(?:[^"\\]|\\.)*")/, 'text-amber-300'],
    [/^('(?:[^'\\]|\\.)*')/, 'text-amber-300'],
    [/^(`(?:[^`\\]|\\.)*`)/, 'text-amber-300'],
    // Numbers
    [/^(\b\d+\.?\d*\b)/, 'text-sky-300'],
    // Keywords
    [/^(\b(?:function|const|let|var|return|if|else|for|while|class|import|export|from|async|await|def|self|torch|np|tf|new|try|catch|throw)\b)/, 'text-sky-400 font-semibold'],
    // Built-in / types
    [/^(\b(?:Math|console|Array|Object|String|Number|Boolean|Promise|null|undefined|true|false|None|True|False|int|float|str|list|dict|tensor|Tensor)\b)/, 'text-emerald-400'],
    // Function calls
    [/^(\b[a-zA-Z_]\w*)\s*(?=\()/, 'text-teal-300'],
    // Operators and punctuation
    [/^([{}()\[\];,.:=+\-*/<>!&|?@%^~]+)/, 'text-zinc-400'],
    // Regular text
    [/^(\S+)/, 'text-zinc-200'],
    // Whitespace
    [/^(\s+)/, ''],
  ];

  let safety = 0;
  while (remaining.length > 0 && safety < 500) {
    safety++;
    let matched = false;

    for (const [pattern, className] of patterns) {
      const match = remaining.match(pattern);
      if (match) {
        tokens.push({ text: match[0], className });
        remaining = remaining.slice(match[0].length);
        matched = true;
        break;
      }
    }

    if (!matched) {
      tokens.push({ text: remaining[0], className: 'text-zinc-200' });
      remaining = remaining.slice(1);
    }
  }

  return tokens;
}

const CodeSnippet: React.FC<CodeSnippetProps> = ({ snippet, accentColor = 'sky' }) => {
  const [copied, setCopied] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [shouldCollapse, setShouldCollapse] = useState(false);
  const codeRef = useRef<HTMLDivElement>(null);

  const lineCount = snippet.code.split('\n').length;
  const MAX_VISIBLE_LINES = 12;

  useEffect(() => {
    setShouldCollapse(lineCount > MAX_VISIBLE_LINES);
  }, [lineCount]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(snippet.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
      const textarea = document.createElement('textarea');
      textarea.value = snippet.code;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const langInfo = LANG_BADGES[snippet.language] || { label: snippet.language.toUpperCase(), color: 'bg-zinc-500/20 text-zinc-400 border-zinc-500/30' };

  const accentBorder: Record<string, string> = {
    sky: 'hover:border-sky-500/20',
    purple: 'hover:border-purple-500/20',
    emerald: 'hover:border-emerald-500/20',
    amber: 'hover:border-amber-500/20',
  };

  const accentGlow: Record<string, string> = {
    sky: 'shadow-sky-500/5',
    purple: 'shadow-purple-500/5',
    emerald: 'shadow-emerald-500/5',
    amber: 'shadow-amber-500/5',
  };

  return (
    <div className={`rounded-2xl md:rounded-3xl border border-white/[0.06] bg-[#0a0a0b] overflow-hidden transition-all duration-500 ${accentBorder[accentColor] || accentBorder.sky} hover:shadow-2xl ${accentGlow[accentColor] || accentGlow.sky} group`}>
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2.5 md:px-5 md:py-3 bg-zinc-900/80 border-b border-white/[0.04]">
        <div className="flex items-center gap-2.5 md:gap-3 min-w-0">
          <span className={`text-[8px] md:text-[9px] font-black tracking-wider px-2 py-0.5 md:px-2.5 md:py-1 rounded-md border ${langInfo.color} shrink-0`}>
            {langInfo.label}
          </span>
          <span className="text-[10px] md:text-xs text-zinc-500 font-medium truncate" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
            {snippet.fileName}
          </span>
        </div>
        <div className="flex items-center gap-1.5 md:gap-2 shrink-0">
          {shouldCollapse && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="p-1.5 rounded-lg hover:bg-white/5 text-zinc-500 hover:text-zinc-300 transition-colors"
              title={isExpanded ? 'Recolher' : 'Expandir'}
            >
              <svg className={`w-3.5 h-3.5 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isExpanded ? 'M5 15l7-7 7 7' : 'M19 9l-7 7-7-7'} />
              </svg>
            </button>
          )}
          <button
            onClick={handleCopy}
            className="p-1.5 rounded-lg hover:bg-white/5 text-zinc-500 hover:text-zinc-300 transition-all"
            title="Copiar codigo"
          >
            {copied ? (
              <svg className="w-3.5 h-3.5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
              </svg>
            ) : (
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Code Body */}
      <div
        ref={codeRef}
        className={`px-3 py-3 md:px-4 md:py-4 overflow-x-auto transition-all duration-500 ${
          shouldCollapse && !isExpanded ? 'max-h-[280px] md:max-h-[320px]' : ''
        }`}
        style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '11px', lineHeight: '1.7' }}
      >
        {highlightCode(snippet.code, snippet.language)}
      </div>

      {/* Collapse fade overlay */}
      {shouldCollapse && !isExpanded && (
        <div className="relative -mt-12 h-12 bg-gradient-to-t from-[#0a0a0b] to-transparent pointer-events-none" />
      )}

      {/* Description footer */}
      {snippet.description && (
        <div className="px-4 py-2.5 md:px-5 md:py-3 border-t border-white/[0.04] bg-zinc-900/40">
          <p className="text-[10px] md:text-xs text-zinc-500 italic leading-relaxed" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
            {snippet.description}
          </p>
        </div>
      )}
    </div>
  );
};

export default CodeSnippet;
