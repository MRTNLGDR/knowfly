import React, { useState, useEffect, useCallback } from 'react';

interface InteractiveWidgetProps {
  type: string;
  title: string;
}

interface DataPoint {
  x: number;
  y: number;
}

// Added chainSteps definition for the 'chaining' widget type
const chainSteps = [
  {
    id: 1,
    label: 'Resumo Inicial',
    prompt: 'Resuma o conceito de LLM',
    output: 'LLMs são modelos de linguagem de larga escala treinados em trilhões de palavras. Eles funcionam prevendo o próximo token em uma sequência baseado em probabilidades estatísticas aprendidas durante o treinamento massivo.'
  },
  {
    id: 2,
    label: 'Extração de Entidades',
    prompt: 'Extraia os termos técnicos do resumo',
    output: '["Transformer", "Token", "Probabilidade Estatística", "Treinamento Massivo"]'
  },
  {
    id: 3,
    label: 'Geração de Código',
    prompt: 'Crie um exemplo de código para o termo Transformer',
    output: 'import torch.nn as nn\n\nclass SimpleTransformer(nn.Module):\n  def __init__(self, embed_dim, num_heads):\n    super().__init__()\n    self.attention = nn.MultiheadAttention(embed_dim, num_heads)\n    # ...'
  }
];

const InteractiveWidget: React.FC<InteractiveWidgetProps> = ({ type, title }) => {
  const [frame, setFrame] = useState(0);
  const [weight, setWeight] = useState(1.0);
  const [bias, setBias] = useState(0.0);
  const [inputVal, setInputVal] = useState(1.0);

  // States for Chaining Widget
  const [activeStep, setActiveStep] = useState(0);
  const [tokens, setTokens] = useState(0);
  const maxTokens = 8000;

  // States for Training Widget
  const [trainingData, setTrainingData] = useState<DataPoint[]>([]);
  const [m, setM] = useState(0);
  const [b, setB] = useState(0);
  const [epoch, setEpoch] = useState(0);
  const [isTraining, setIsTraining] = useState(false);
  const [loss, setLoss] = useState<string>("ALTO");

  // States for Timeline Widget
  const [activeEra, setActiveEra] = useState<string>('llm');

  // Added runChainStep logic to handle sequential execution of prompt steps
  const runChainStep = (idx: number) => {
    setActiveStep(idx + 1);
    setTokens(prev => Math.min(prev + 1200 + Math.floor(Math.random() * 800), maxTokens));
  };

  const generateData = useCallback(() => {
    const points: DataPoint[] = [];
    for (let i = 0; i < 20; i++) {
      const x = (i / 20) * 400;
      const targetY = 0.5 * x + 50;
      const noise = (Math.random() - 0.5) * 80;
      const y = Math.max(20, Math.min(targetY + noise, 280));
      points.push({ x, y });
    }
    setTrainingData(points);
    setM(0);
    setB(0);
    setEpoch(0);
    setLoss("ALTO");
    setIsTraining(false);
  }, []);

  useEffect(() => {
    if (type === 'training' && trainingData.length === 0) {
      generateData();
    }
  }, [type, generateData, trainingData.length]);

  useEffect(() => {
    const request = requestAnimationFrame(function animate(t) {
      setFrame(t);
      requestAnimationFrame(animate);
    });
    return () => cancelAnimationFrame(request);
  }, []);

  useEffect(() => {
    if (!isTraining) return;

    const interval = setInterval(() => {
      setEpoch(prev => {
        const nextEpoch = prev + 1;
        
        const learningRate = 0.00001;
        let dM = 0;
        let dB = 0;
        let errorSum = 0;

        trainingData.forEach(point => {
          const guess = (m * point.x) + b;
          const error = point.y - guess;
          dM += error * point.x;
          dB += error;
          errorSum += error * error;
        });

        setM(prevM => prevM + (dM * learningRate) / trainingData.length);
        setB(prevB => prevB + (dB * learningRate * 100) / trainingData.length);
        setLoss((errorSum / trainingData.length).toFixed(0));

        if (nextEpoch >= 200) {
          setIsTraining(false);
          clearInterval(interval);
        }
        return nextEpoch;
      });
    }, 30);

    return () => clearInterval(interval);
  }, [isTraining, m, b, trainingData]);

  const timelineEras = [
    {
      id: 'ai',
      year: '1950 - 1980s',
      title: 'IA Simbólica',
      desc: 'Sistemas baseados em regras (GOFAI). A inteligência era codificada manualmente via if/else.',
      color: 'blue'
    },
    {
      id: 'ml',
      year: '1990 - 2010',
      title: 'Machine Learning',
      desc: 'O foco muda de escrever regras para encontrar padrões estatísticos em dados.',
      color: 'emerald'
    },
    {
      id: 'dl',
      year: '2010 - 2017',
      title: 'Deep Learning',
      desc: 'Redes neurais profundas e GPUs permitem processar imagens e sons com precisão humana.',
      color: 'cyan'
    },
    {
      id: 'llm',
      year: '2017 - Presente',
      title: 'GenAI & Transformers',
      desc: 'Modelos autoregressivos que criam conteúdo e entendem contexto massivo.',
      color: 'rose'
    }
  ];

  const renderWidget = () => {
    // Calculated values for neuron activation logic
    const result = (inputVal * weight) + bias;
    const intensity = Math.min(Math.abs(result) / 10, 1);

    switch(type) {
      case 'timeline':
        return (
          <div className="w-full h-full flex flex-col items-center justify-center bg-[#020202] p-8 lg:p-12 overflow-hidden">
            <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              
              {/* Hierarchical Circles */}
              <div className="flex items-center justify-center relative aspect-square max-w-[400px] mx-auto">
                 <div className={`absolute inset-0 rounded-full border-2 transition-all duration-700 ${activeEra === 'ai' || activeEra === 'ml' || activeEra === 'dl' || activeEra === 'llm' ? 'border-blue-500/40 bg-blue-500/5' : 'border-white/5'}`} />
                 <div className={`absolute inset-[15%] rounded-full border-2 transition-all duration-700 ${activeEra === 'ml' || activeEra === 'dl' || activeEra === 'llm' ? 'border-emerald-500/40 bg-emerald-500/5' : 'border-white/5'}`} />
                 <div className={`absolute inset-[30%] rounded-full border-2 transition-all duration-700 ${activeEra === 'dl' || activeEra === 'llm' ? 'border-cyan-500/40 bg-cyan-500/5' : 'border-white/5'}`} />
                 <div className={`absolute inset-[45%] rounded-full transition-all duration-700 ${activeEra === 'llm' ? 'bg-rose-500 shadow-[0_0_50px_rgba(244,63,94,0.4)]' : 'bg-zinc-800'}`} />
                 
                 <div className="absolute top-4 left-1/2 -translate-x-1/2 text-[9px] font-black tracking-widest text-zinc-600 uppercase">Artifical Intelligence</div>
                 <div className="absolute top-[20%] left-1/2 -translate-x-1/2 text-[8px] font-black tracking-widest text-zinc-600 uppercase">Machine Learning</div>
                 <div className="absolute top-[35%] left-1/2 -translate-x-1/2 text-[8px] font-black tracking-widest text-zinc-600 uppercase">Deep Learning</div>
                 <div className="absolute top-[52%] left-1/2 -translate-x-1/2 text-[8px] font-black tracking-widest text-white uppercase">LLMs</div>
              </div>

              {/* Timeline List */}
              <div className="space-y-4">
                <div className="mb-8">
                  <span className="text-[10px] font-black text-zinc-500 tracking-[0.3em] uppercase block mb-2">História da Engenharia</span>
                  <h3 className="text-2xl font-black text-white tracking-tighter italic">Evolução dos Paradigmas</h3>
                </div>

                {timelineEras.map((era) => (
                  <div 
                    key={era.id}
                    onMouseEnter={() => setActiveEra(era.id)}
                    className={`p-6 rounded-[24px] border transition-all cursor-pointer relative overflow-hidden group ${
                      activeEra === era.id 
                      ? `bg-${era.color}-500/10 border-${era.color}-500 shadow-xl` 
                      : 'bg-zinc-900/50 border-white/5 grayscale opacity-40 hover:grayscale-0 hover:opacity-100'
                    }`}
                  >
                    <div className="flex items-center gap-6 relative z-10">
                      <div className={`text-xs font-mono font-black ${activeEra === era.id ? `text-${era.color}-400` : 'text-zinc-600'}`}>
                        {era.year}
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm font-black text-white uppercase tracking-tight">{era.title}</span>
                        <span className="text-[10px] text-zinc-400 font-medium leading-relaxed mt-1">{era.desc}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          </div>
        );
      case 'training':
        return (
          <div className="w-full h-full flex flex-col items-center justify-center bg-[#020202] p-8 lg:p-12 overflow-hidden">
            <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
              
              {/* Plot Area */}
              <div className="lg:col-span-7 flex flex-col gap-6">
                 <div className="flex flex-col gap-2">
                    <span className="text-[10px] font-black text-rose-500 tracking-[0.3em] uppercase">Pipeline de Treinamento</span>
                    <h3 className="text-xl font-bold text-white tracking-tight">Otimização de Gradiente</h3>
                 </div>
                 
                 <div className="aspect-[4/3] w-full glass rounded-[40px] border border-white/5 relative overflow-hidden bg-black/40">
                    <svg viewBox="0 0 400 300" className="w-full h-full p-8 overflow-visible">
                      <line x1="0" y1="280" x2="400" y2="280" stroke="rgba(255,255,255,0.05)" strokeWidth="2" />
                      <line x1="20" y1="0" x2="20" y2="300" stroke="rgba(255,255,255,0.05)" strokeWidth="2" />
                      
                      {trainingData.map((p, i) => (
                        <circle 
                          key={i} 
                          cx={p.x} 
                          cy={300 - p.y} 
                          r="4" 
                          fill="#3b82f6" 
                          className="opacity-60" 
                        />
                      ))}
                      
                      <line 
                        x1="0" 
                        y1={300 - (m * 0 + b)} 
                        x2="400" 
                        y2={300 - (m * 400 + b)} 
                        stroke="#f43f5e" 
                        strokeWidth="3" 
                        strokeLinecap="round"
                        className="transition-all duration-100"
                        style={{ filter: 'drop-shadow(0 0 8px #f43f5e)' }}
                      />
                    </svg>
                    
                    <div className="absolute top-8 left-8 flex flex-col gap-1">
                       <span className="text-[8px] font-black text-zinc-500 uppercase tracking-widest">Equação Atual</span>
                       <span className="text-xs font-mono text-rose-400">y = {m.toFixed(2)}x + {b.toFixed(2)}</span>
                    </div>
                 </div>
              </div>

              {/* Stats & Controls */}
              <div className="lg:col-span-5 space-y-8">
                 <div className="grid grid-cols-2 gap-4">
                    <div className="p-6 rounded-3xl bg-zinc-900 border border-white/5 flex flex-col gap-2 shadow-xl">
                       <span className="text-[9px] font-black text-zinc-500 uppercase tracking-widest">Época Atual</span>
                       <span className="text-3xl font-black text-white mono">{epoch}</span>
                    </div>
                    <div className="p-6 rounded-3xl bg-zinc-900 border border-white/5 flex flex-col gap-2 shadow-xl">
                       <span className="text-[9px] font-black text-zinc-500 uppercase tracking-widest">Loss (MSE)</span>
                       <span className={`text-3xl font-black mono ${parseInt(loss) < 500 ? 'text-emerald-500' : 'text-rose-500'}`}>
                         {loss}
                       </span>
                    </div>
                 </div>

                 <div className="glass p-8 rounded-[40px] border border-white/5 space-y-6">
                    <h4 className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">Controles do Otimizador</h4>
                    
                    <div className="space-y-4">
                       <button 
                        onClick={() => setIsTraining(true)}
                        disabled={isTraining || epoch >= 200}
                        className={`w-full py-5 rounded-2xl font-black text-[11px] tracking-[0.2em] transition-all shadow-2xl ${
                          isTraining 
                          ? 'bg-zinc-800 text-zinc-600' 
                          : 'bg-rose-500 text-white hover:scale-[1.02] active:scale-95'
                        }`}
                       >
                         {isTraining ? 'TREINANDO MODELO...' : epoch >= 200 ? 'TREINO CONCLUÍDO' : 'INICIAR TREINAMENTO'}
                       </button>

                       <button 
                        onClick={generateData}
                        className="w-full py-4 rounded-2xl border border-white/5 bg-transparent text-[10px] font-black tracking-widest text-zinc-500 hover:text-white hover:bg-white/5 transition-all"
                       >
                         RESETAR DATASET
                       </button>
                    </div>

                    <div className="p-5 rounded-2xl bg-black/50 border border-white/5">
                       <p className="text-[11px] text-zinc-400 leading-relaxed font-medium italic">
                        O algoritmo está minimizando a função de custo usando Gradiente Descendente para encontrar o Peso (m) e o Viés (b) ideais.
                       </p>
                    </div>
                 </div>
              </div>

            </div>
          </div>
        );
      case 'chaining':
        const tokenPercentage = (tokens / maxTokens) * 100;
        const isDangerous = tokens > 6000;
        return (
          <div className="w-full h-full flex flex-col items-center justify-center bg-[#020202] p-8 lg:p-12 overflow-hidden">
            <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              
              {/* Steps Panel */}
              <div className="space-y-6">
                <div className="flex flex-col gap-2 mb-6">
                  <span className="text-[10px] font-black text-blue-500 tracking-[0.3em] uppercase">Prompt Chaining Flow</span>
                  <h3 className="text-xl font-bold text-white tracking-tight">Execução Sequencial</h3>
                </div>

                {chainSteps.map((step, idx) => (
                  <div 
                    key={step.id}
                    onClick={() => runChainStep(idx)}
                    className={`p-6 rounded-[24px] border transition-all cursor-pointer group relative overflow-hidden ${
                      activeStep === idx + 1 
                      ? 'bg-blue-600/10 border-blue-500 shadow-[0_0_30px_rgba(59,130,246,0.2)]' 
                      : 'bg-zinc-900/50 border-white/5 hover:border-white/10'
                    }`}
                  >
                    <div className="flex items-center gap-4 relative z-10">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-black text-sm transition-colors ${
                        activeStep === idx + 1 ? 'bg-blue-600 text-white' : 'bg-zinc-800 text-zinc-500'
                      }`}>
                        {step.id}
                      </div>
                      <div className="flex flex-col">
                        <span className="text-xs font-bold text-white mb-0.5">{step.label}</span>
                        <span className="text-[10px] text-zinc-500 font-mono italic">"{step.prompt}"</span>
                      </div>
                    </div>
                  </div>
                ))}

                <button 
                  onClick={() => { setActiveStep(0); setTokens(0); }}
                  className="w-full py-4 rounded-2xl bg-zinc-900 border border-white/5 text-[10px] font-black tracking-widest text-zinc-400 hover:text-white hover:bg-zinc-800 transition-all"
                >
                  REINICIAR PIPELINE
                </button>
              </div>

              {/* Memory / Token Panel */}
              <div className="glass p-10 rounded-[40px] border border-white/5 space-y-10">
                <div className="space-y-6">
                  <div className="flex justify-between items-end">
                    <div className="flex flex-col">
                      <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Memória do Modelo</span>
                      <span className="text-lg font-bold text-white tracking-tighter">Context Window</span>
                    </div>
                    <div className="text-right">
                      <span className={`text-xl font-mono font-black ${isDangerous ? 'text-red-500' : 'text-blue-400'}`}>
                        {tokens}
                      </span>
                      <span className="text-[10px] font-bold text-zinc-600 ml-2">/ {maxTokens} TOKENS</span>
                    </div>
                  </div>

                  <div className="h-4 bg-zinc-900 rounded-full overflow-hidden p-1 border border-white/5 relative">
                     <div 
                      className={`h-full rounded-full transition-all duration-700 ease-out shadow-[0_0_20px_rgba(59,130,246,0.3)] ${
                        isDangerous ? 'bg-red-500' : 'bg-blue-500'
                      }`}
                      style={{ width: `${tokenPercentage}%` }}
                     />
                     <div className="absolute top-0 right-[20%] h-full w-px bg-red-500/30 dashed" />
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[8px] font-black text-zinc-600 tracking-widest">START_OF_SESSION</span>
                    <span className="text-[8px] font-black text-red-500/50 tracking-widest">ALUCINATION_THRESHOLD</span>
                  </div>
                </div>

                <div className="space-y-4">
                  <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Saída Estruturada</span>
                  <div className="p-6 rounded-3xl bg-black border border-white/5 font-mono text-xs leading-relaxed text-blue-300 min-h-[160px] whitespace-pre-wrap shadow-inner">
                    {activeStep > 0 ? chainSteps[activeStep-1].output : "Aguardando execução do pipeline..."}
                  </div>
                </div>

                <div className="p-6 rounded-3xl bg-blue-500/5 border border-blue-500/10">
                   <p className="text-[11px] font-medium text-zinc-400 leading-relaxed italic">
                    Note como cada passo adiciona complexidade ao contexto. Sem o "Chaining", tentar fazer tudo em um prompt único poderia estourar a janela de contexto ou gerar alucinações.
                   </p>
                </div>
              </div>

            </div>
          </div>
        );
      case 'neuron':
        return (
          <div className="w-full h-full flex flex-col items-center justify-center bg-[#020202] p-8 lg:p-12 overflow-hidden">
            <div className="w-full max-w-4xl grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
              
              <div className="lg:col-span-2 flex items-center justify-between gap-4 relative">
                <div className="flex flex-col items-center gap-3">
                  <div className="w-20 h-20 rounded-full bg-blue-600/20 border-2 border-blue-500 flex items-center justify-center text-blue-400 font-black text-xs shadow-[0_0_30px_rgba(59,130,246,0.3)]">
                    INPUT<br/>{inputVal.toFixed(1)}
                  </div>
                </div>

                <div className="flex-1 h-1 bg-zinc-800 relative mx-4">
                  <div 
                    className="absolute inset-0 bg-gradient-to-r from-blue-500 to-emerald-500 transition-all duration-500" 
                    style={{ opacity: Math.abs(weight) / 5 }}
                  />
                  <div className="absolute top-[-30px] left-1/2 -translate-x-1/2 px-3 py-1 bg-zinc-900 border border-white/10 rounded-md text-[9px] font-black text-zinc-400 uppercase tracking-widest">
                    Peso: {weight.toFixed(1)}
                  </div>
                </div>

                <div className="flex flex-col items-center gap-3 relative">
                  <div 
                    className="w-24 h-24 rounded-full flex items-center justify-center text-white font-black text-xs transition-all duration-500 border-4"
                    style={{ 
                      backgroundColor: result > 0 ? `rgba(16, 185, 129, ${0.1 + intensity * 0.4})` : `rgba(239, 68, 68, ${0.1 + (1-intensity) * 0.4})`,
                      borderColor: result > 0 ? '#10b981' : '#ef4444',
                      boxShadow: result > 0 ? `0 0 ${Math.abs(result)*10}px #10b981` : `0 0 ${Math.abs(result)*10}px #ef4444`,
                      transform: `scale(${1 + Math.abs(result)/20})`
                    }}
                  >
                    SAÍDA<br/>{result.toFixed(2)}
                  </div>
                  <div className="absolute -top-8 right-0 text-[9px] font-black text-red-400 uppercase tracking-widest">
                    Viés: {bias.toFixed(1)}
                  </div>
                </div>
              </div>

              <div className="glass p-8 rounded-[32px] border border-white/5 space-y-8">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Entrada (x)</label>
                    <span className="text-xs font-mono text-white">{inputVal.toFixed(1)}</span>
                  </div>
                  <input 
                    type="range" min="0" max="5" step="0.1" value={inputVal} 
                    onChange={(e) => setInputVal(parseFloat(e.target.value))}
                    className="w-full h-1 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
                  />
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Peso (w)</label>
                    <span className="text-xs font-mono text-white">{weight.toFixed(1)}</span>
                  </div>
                  <input 
                    type="range" min="-5" max="5" step="0.1" value={weight} 
                    onChange={(e) => setWeight(parseFloat(e.target.value))}
                    className="w-full h-1 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                  />
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Viés (b)</label>
                    <span className="text-xs font-mono text-white">{bias.toFixed(1)}</span>
                  </div>
                  <input 
                    type="range" min="-5" max="5" step="0.1" value={bias} 
                    onChange={(e) => setBias(parseFloat(e.target.value))}
                    className="w-full h-1 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-red-500"
                  />
                </div>

                <div className="pt-4 border-t border-white/5">
                   <div className="p-4 rounded-2xl bg-black/50 border border-white/5 mono text-[11px] text-emerald-400">
                     y = ({inputVal.toFixed(1)} * {weight.toFixed(1)}) + {bias.toFixed(1)} = <span className="font-bold">{result.toFixed(2)}</span>
                   </div>
                </div>
              </div>
            </div>
            
            <div className="mt-12 text-center max-w-lg">
               <p className="text-[10px] font-medium text-zinc-500 leading-relaxed uppercase tracking-[0.2em]">
                 Ajuste os parâmetros para ver como o neurônio artificial decide sua ativação. Este é o fundamento matemático de como os LLMs processam informações.
               </p>
            </div>
          </div>
        );
      case 'bezier':
        const wave = Math.sin(frame * 0.002) * 50;
        return (
          <div className="w-full h-full flex flex-col items-center justify-center bg-[#020202] p-12">
            <div className="w-full max-w-2xl aspect-[21/9] relative glass rounded-[32px] overflow-hidden border border-blue-500/20 shadow-[0_0_50px_rgba(59,130,246,0.1)]">
               <svg className="w-full h-full">
                 <defs>
                   <linearGradient id="neonGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                     <stop offset="0%" stopColor="#3b82f6" />
                     <stop offset="100%" stopColor="#a855f7" />
                   </linearGradient>
                   <filter id="neonGlow">
                     <feGaussianBlur stdDeviation="4" result="blur" />
                     <feComposite in="SourceGraphic" in2="blur" operator="over" />
                   </filter>
                 </defs>
                 <path 
                   d={`M 100 200 C 300 ${100 + wave}, 500 ${300 - wave}, 700 200`} 
                   stroke="url(#neonGrad)" 
                   strokeWidth="6" 
                   fill="none" 
                   filter="url(#neonGlow)"
                   strokeLinecap="round"
                 />
                 <circle cx="100" cy="200" r="8" fill="white" />
                 <circle cx="700" cy="200" r="8" fill="white" />
                 <line x1="100" y1="200" x2="300" y2={100 + wave} stroke="white" strokeWidth="1" strokeDasharray="4 4" opacity="0.2" />
                 <line x1="700" y1="200" x2="500" y2={300 - wave} stroke="white" strokeWidth="1" strokeDasharray="4 4" opacity="0.2" />
               </svg>
               <div className="absolute top-6 left-8">
                  <span className="text-[10px] font-black tracking-[0.3em] text-blue-500 uppercase">Optimization Path</span>
                  <div className="text-2xl font-bold text-white tracking-tighter">Gradient Analysis</div>
               </div>
            </div>
          </div>
        );
      case 'flow':
        return (
          <div className="w-full h-full flex items-center justify-center bg-[#020202] p-8">
             <div className="grid grid-cols-3 gap-12 w-full max-w-4xl relative">
                <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent -translate-y-1/2 pointer-events-none" />
                {['INGESTION', 'TRANSFORM', 'SINK'].map((label, i) => (
                  <div key={label} className="relative z-10 flex flex-col items-center gap-6 group">
                    <div className="w-24 h-24 rounded-[30%] bg-zinc-900 border border-white/5 flex items-center justify-center transition-all duration-500 group-hover:border-blue-500/50 group-hover:bg-zinc-800 shadow-2xl relative">
                       <div className="absolute inset-0 bg-blue-500/10 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
                       <div className="text-2xl font-black text-zinc-600 group-hover:text-blue-400">{i+1}</div>
                    </div>
                    <div className="text-center">
                       <span className="block text-[10px] font-black tracking-widest text-zinc-500 mb-1">{label}</span>
                       <span className="text-xs font-bold text-zinc-300">Active Pipeline</span>
                    </div>
                    <div 
                      className="absolute top-1/2 w-2 h-2 bg-blue-500 rounded-full blur-[2px] shadow-[0_0_100px_#3b82f6]"
                      style={{ 
                        left: `${((frame * 0.2 + i * 100) % 300) - 50}%`,
                        opacity: i === 2 ? 0 : 1
                      }}
                    />
                  </div>
                ))}
             </div>
          </div>
        );
      default:
        return (
          <div className="w-full h-full flex items-center justify-center">
            <div className="text-white font-black italic text-8xl opacity-5 tracking-tighter">NEXUS CORE</div>
          </div>
        );
    }
  };

  return (
    <div className="w-full h-full relative group">
      {renderWidget()}
      <div className="absolute inset-0 pointer-events-none border border-white/5 rounded-[40px] shadow-inner" />
    </div>
  );
};

export default InteractiveWidget;