
import { Module } from './types';

export const COURSE_DATA: Module[] = [
  {
    id: 'm1',
    title: 'Módulo I: Fundamentos de IA e a Arquitetura dos LLMs',
    units: [
      {
        id: 'u1-1',
        title: 'História e Arquitetura Base',
        lessons: [
          {
            id: 'l1-1-1',
            title: 'Aula 01: Fundamentos de IA, LLMs e A Matemática dos Tensores',
            content: {
              leigo: 'A Inteligência Artificial não surgiu com o ChatGPT; é um sonho antigo de criar máquinas que pensam. Evoluímos de sistemas de regras fixas (If/Else) para sistemas que aprendem padrões (Machine Learning) e, finalmente, para Redes Neurais Profundas (Deep Learning) que processam linguagem como nós. Imagine que as palavras são pontos em um mapa gigante e a IA aprende a navegar entre eles, entendendo que "Rei" está perto de "Rainha" da mesma forma que "Homem" está perto de "Mulher".',
              leigoSnippet: {
                language: 'pseudocode',
                fileName: 'como-a-ia-pensa.pseudo',
                code: `// Como a IA entende palavras (simplificado)\n\nSE palavra("Rei") esta_perto_de palavra("Rainha")\n   ENTAO relacao = "realeza"\n\nSE palavra("Homem") esta_perto_de palavra("Mulher")\n   ENTAO relacao = "genero"\n\n// A magica: as distancias sao IGUAIS!\n// Rei -> Rainha  ==  Homem -> Mulher\n// Isso e um "embedding" - um mapa de significados`,
                description: 'Pseudocodigo ilustrativo de como embeddings capturam relacoes semanticas entre palavras.'
              },
              visual: {
                metaphor: 'Um laboratório de física digital onde ajustamos a gravidade (pesos) para que a informação caia no lugar certo.',
                widgetType: 'neuron',
                widgetTitle: 'Laboratório de Neurônio Artificial'
              },
              visualSnippet: {
                language: 'javascript',
                fileName: 'neuronio-lab.js',
                code: `// O neuronio artificial por tras do widget\nfunction neuronio(entrada, peso, bias) {\n  // 1. Soma ponderada\n  const soma = (entrada * peso) + bias;\n\n  // 2. Funcao de ativacao (ReLU)\n  // Se positivo, passa. Se negativo, bloqueia.\n  const ativacao = Math.max(0, soma);\n\n  return ativacao;\n}\n\n// Exemplo: entrada=0.8, peso=1.2, bias=-0.3\nneuronio(0.8, 1.2, -0.3); // => 0.66`,
                description: 'Funcao de neuronio artificial com ativacao ReLU - a base de toda rede neural.'
              },
              tecnico: {
                definition: 'Aprofundamento na arquitetura Transformer e o impacto da paralelização de dados via mecanismos de Self-Attention. Estudo da álgebra linear aplicada: de escalares a Tensores de N-dimensões.',
                architecture: [
                  'Evolução Histórica: Da IA simbólica e autômatos mecânicos ao Deep Learning conexionista.',
                  'Transformers: O fim da recorrência e o início do processamento paralelo massivo.',
                  'Embeddings & Manifolds: Representação geométrica da semântica em espaços vetoriais.',
                  'Mecanismo de Atenção: Matrizes de Query (Q), Key (K) e Value (V) para extração de contexto.'
                ],
                terms: ['Tensor', 'Self-Attention', 'Backpropagation', 'Stochastic Gradient Descent'],
                dictionary: {
                  'Tensor': 'A "molécula" fundamental de dados na IA. Pode ser um simples número (escalar), uma lista (vetor) ou uma tabela complexa (matriz).',
                  'Self-Attention': 'O "olhar" da IA. Permite que o modelo foque em palavras específicas de uma frase para entender o sentido real de um termo ambíguo.',
                  'Backpropagation': 'O processo matemático de culpar e ajustar. Quando a IA erra, ela volta na rede ajustando cada peso para diminuir o prejuízo (loss).',
                  'Stochastic Gradient Descent': 'A bússola da IA. Um algoritmo de otimização que encontra o caminho mais curto para o menor erro possível.'
                }
              },
              tecnicoSnippet: {
                language: 'python',
                fileName: 'self_attention.py',
                code: `import torch\nimport torch.nn.functional as F\n\ndef self_attention(Q, K, V):\n    """\n    Mecanismo de Self-Attention (Scaled Dot-Product)\n    Q: Query  [batch, seq_len, d_k]\n    K: Key    [batch, seq_len, d_k]\n    V: Value  [batch, seq_len, d_v]\n    """\n    d_k = Q.size(-1)\n\n    # 1. Dot product entre Query e Key (transposta)\n    scores = torch.matmul(Q, K.transpose(-2, -1))\n\n    # 2. Escalar para estabilidade numerica\n    scores = scores / torch.sqrt(torch.tensor(d_k, dtype=torch.float32))\n\n    # 3. Softmax => pesos de atencao\n    attention_weights = F.softmax(scores, dim=-1)\n\n    # 4. Multiplicar pelos Values\n    output = torch.matmul(attention_weights, V)\n\n    return output, attention_weights`,
                description: 'Implementacao real do Scaled Dot-Product Attention em PyTorch - o coracao dos Transformers.'
              },
              tutorial: {
                steps: [
                  'Implemente uma função de neurônio simples em JS: f(x) = (x * w) + b.',
                  'Utilize a biblioteca TensorFlow.js para inicializar tensores no navegador.',
                  'Configure um loop de treinamento (epochs) para ajustar pesos via erro quadrático médio.',
                  'Visualize a convergência do modelo em tempo real usando gráficos de dispersão no browser.'
                ],
                commonErrors: [
                  'Exploding Gradients: Quando os pesos crescem tanto que os números "quebram" o computador.',
                  'Bias Unit Missing: Esquecer o viés impede que o neurônio aprende padrões que não passam pela origem (zero).'
                ],
                validation: 'O modelo deve ser capaz de prever uma relação linear simples (ex: Celsius para Fahrenheit) com erro inferior a 0.01.'
              },
              tutorialSnippets: [
                {
                  language: 'javascript',
                  fileName: 'step1-neuronio.js',
                  code: `// Step 1: Neuronio simples em JavaScript\nfunction neuronio(x, w, b) {\n  return (x * w) + b;\n}\n\n// Teste: prever Fahrenheit a partir de Celsius\n// F = C * 1.8 + 32\nconst peso = 1.8;\nconst bias = 32;\n\nconsole.log(neuronio(0, peso, bias));   // 32\nconsole.log(neuronio(100, peso, bias)); // 212`,
                  description: 'Step 1: Funcao de neuronio basico - a menor unidade computacional de uma rede neural.'
                },
                {
                  language: 'javascript',
                  fileName: 'step2-tensorflowjs.js',
                  code: `// Step 2: Tensores com TensorFlow.js\nimport * as tf from '@tensorflow/tfjs';\n\n// Criar tensores (vetores de dados)\nconst celsius    = tf.tensor1d([0, 10, 20, 30, 40]);\nconst fahrenheit = tf.tensor1d([32, 50, 68, 86, 104]);\n\n// Modelo sequencial com 1 neuronio\nconst model = tf.sequential();\nmodel.add(tf.layers.dense({\n  units: 1,\n  inputShape: [1]\n}));\n\n// Compilar com otimizador e funcao de perda\nmodel.compile({\n  optimizer: 'sgd',\n  loss: 'meanSquaredError'\n});`,
                  description: 'Step 2: Inicializando tensores e modelo no navegador com TensorFlow.js.'
                },
                {
                  language: 'javascript',
                  fileName: 'step3-training-loop.js',
                  code: `// Step 3: Loop de treinamento\nasync function treinar(model, celsius, fahrenheit) {\n  const history = await model.fit(celsius, fahrenheit, {\n    epochs: 500,\n    callbacks: {\n      onEpochEnd: (epoch, logs) => {\n        if (epoch % 50 === 0) {\n          console.log(\n            \`Epoch \${epoch}: loss = \${logs.loss.toFixed(4)}\`\n          );\n        }\n      }\n    }\n  });\n\n  // Testar predicao\n  const resultado = model.predict(tf.tensor1d([25]));\n  resultado.print(); // Deve ser ~77 (25°C = 77°F)\n\n  return history;\n}`,
                  description: 'Step 3: Treinando o modelo com 500 epochs e callback de monitoramento.'
                },
                {
                  language: 'javascript',
                  fileName: 'step4-visualizacao.js',
                  code: `// Step 4: Visualizar convergencia em tempo real\nfunction plotConvergencia(history) {\n  const canvas = document.getElementById('chart');\n  const ctx = canvas.getContext('2d');\n  const losses = history.history.loss;\n\n  // Escalar para o canvas\n  const maxLoss = Math.max(...losses);\n  const width = canvas.width;\n  const height = canvas.height;\n\n  ctx.strokeStyle = '#38bdf8'; // sky-400\n  ctx.lineWidth = 2;\n  ctx.beginPath();\n\n  losses.forEach((loss, i) => {\n    const x = (i / losses.length) * width;\n    const y = height - (loss / maxLoss) * height;\n    i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);\n  });\n\n  ctx.stroke();\n}`,
                  description: 'Step 4: Renderizando grafico de perda (loss) no canvas para visualizar a convergencia.'
                }
              ]
            }
          },
          {
            id: 'l1-1-2',
            title: 'Aula 02: A Linha do Tempo da Inteligência Artificial',
            content: {
              leigo: 'A jornada da IA é como a evolução do transporte: começamos com charretes de regras fixas (IA Simbólica), passamos pelos primeiros motores que aprendiam trajetos (Machine Learning), chegamos a aviões complexos com milhares de sensores (Deep Learning) e agora temos naves espaciais que criam suas próprias rotas (LLMs). É uma mudança de paradigma: paramos de dizer ao computador exatamente o que fazer e passamos a mostrar exemplos para que ele aprenda sozinho.',
              leigoSnippet: {
                language: 'json',
                fileName: 'eras-da-ia.json',
                code: `{\n  "evolucao_da_ia": [\n    {\n      "era": "IA Simbolica",\n      "periodo": "1950-1990",\n      "analogia": "Charrete com mapa fixo",\n      "como_funciona": "SE chovendo ENTAO leve guarda-chuva"\n    },\n    {\n      "era": "Machine Learning",\n      "periodo": "1990-2010",\n      "analogia": "Carro que aprende o caminho",\n      "como_funciona": "Mostre 1000 fotos de gatos e ele aprende"\n    },\n    {\n      "era": "Deep Learning",\n      "periodo": "2010-2017",\n      "analogia": "Aviao com mil sensores",\n      "como_funciona": "Redes com milhoes de neuronios em camadas"\n    },\n    {\n      "era": "Generative AI / LLMs",\n      "periodo": "2017-Hoje",\n      "analogia": "Nave que cria suas rotas",\n      "como_funciona": "Le bilhoes de textos e gera linguagem nova"\n    }\n  ]\n}`,
                description: 'Cronologia simplificada das eras da IA em formato de dados estruturados.'
              },
              visual: {
                metaphor: 'Círculos concêntricos de complexidade onde cada nova era engloba e expande a anterior.',
                widgetType: 'timeline',
                widgetTitle: 'Explorador da Linha do Tempo IA'
              },
              visualSnippet: {
                language: 'javascript',
                fileName: 'venn-diagram.js',
                code: `// Circulos concentricos: AI > ML > DL > GenAI\nconst circulos = [\n  { label: "Inteligencia Artificial", raio: 200, cor: "#64748b" },\n  { label: "Machine Learning",       raio: 150, cor: "#3b82f6" },\n  { label: "Deep Learning",          raio: 100, cor: "#8b5cf6" },\n  { label: "Generative AI",          raio:  50, cor: "#f59e0b" },\n];\n\nfunction desenharVenn(ctx, circulos) {\n  const cx = canvas.width / 2;\n  const cy = canvas.height / 2;\n\n  circulos.forEach(({ label, raio, cor }) => {\n    ctx.beginPath();\n    ctx.arc(cx, cy, raio, 0, Math.PI * 2);\n    ctx.fillStyle = cor + "20"; // 20 = transparencia\n    ctx.strokeStyle = cor;\n    ctx.lineWidth = 2;\n    ctx.fill();\n    ctx.stroke();\n  });\n}`,
                description: 'Visualizacao de Venn mostrando como cada era da IA contem a anterior.'
              },
              tecnico: {
                definition: 'Análise da transição paradigmática da programação determinística (GOFAI) para a modelagem probabilística de alta dimensão, culminando na arquitetura Transformer e emergência de capacidades generativas.',
                architecture: [
                  'Symbolic AI (1950-1990): Motores de inferência baseados em lógica formal e sistemas especialistas.',
                  'Machine Learning (1990-2010): Otimização estatística e algoritmos de generalização (SVM, RF).',
                  'Deep Learning (2010-2017): Redes neurais multicamadas e processamento massivo via GPUs.',
                  'Generative AI (2017-Hoje): Arquiteturas autoregressivas e mecanismos de atenção paralela.'
                ],
                terms: ['GOFAI', 'Probabilistic Programming', 'Transformer Revolution', 'Emergent Properties'],
                dictionary: {
                  'GOFAI': 'Good Old Fashioned AI. A IA "das antigas" que funcionava só com if/else e regras fixas.',
                  'Probabilistic Programming': 'Programar com incertezas. Em vez de 0 ou 1, o computador trabalha com "99% de chance de ser um gato".',
                  'Transformer Revolution': 'O momento em 2017 onde descobrimos como fazer IAs lerem textos gigantes de uma só vez.',
                  'Emergent Properties': 'Habilidades "mágicas" que surgem em modelos grandes que não foram planejadas, como traduzir línguas raras sozinho.'
                }
              },
              tecnicoSnippet: {
                language: 'python',
                fileName: 'complexidade_por_era.py',
                code: `# Comparativo de complexidade computacional por era\n\neras = {\n    "Symbolic AI": {\n        "parametros": "~1,000 regras",\n        "flops_treino": "0 (sem treino)",\n        "exemplo": "ELIZA (1966)",\n        "complexidade": "O(n) - linear com regras"\n    },\n    "Machine Learning": {\n        "parametros": "~10K - 1M",\n        "flops_treino": "~10^9 (Giga)",\n        "exemplo": "SVM para spam (2002)",\n        "complexidade": "O(n^2) a O(n^3)"\n    },\n    "Deep Learning": {\n        "parametros": "~1M - 100M",\n        "flops_treino": "~10^18 (Exa)",\n        "exemplo": "AlexNet (2012)",\n        "complexidade": "O(n * d * layers)"\n    },\n    "Generative AI": {\n        "parametros": "175B+ (GPT-3)",\n        "flops_treino": "~10^23 (Zetta)",\n        "exemplo": "GPT-4 (2023)",\n        "complexidade": "O(n^2 * d) - attention"\n    }\n}\n\n# Crescimento exponencial de 10^0 a 10^23 FLOPs\n# em apenas 70 anos de evolucao`,
                description: 'Evolucao quantitativa da complexidade computacional: de regras manuais a trilhoes de parametros.'
              },
              tutorial: {
                steps: [
                  'Mapeie os marcos históricos da IA em um objeto JSON cronológico.',
                  'Implemente uma visualização de Venn interativa para mostrar a hierarquia AI > ML > DL.',
                  'Crie um comparativo de performance entre um algoritmo de regra simples vs um modelo de ML para detecção de spam.',
                  'Documente a evolução da janela de contexto desde o RNN até os modelos atuais de 1M+ tokens.'
                ],
                commonErrors: [
                  'Confundir ML com DL: Nem todo aprendizado de máquina usa redes neurais profundas.',
                  'Anacronismo: Atribuir capacidades generativas a modelos de classificação antigos.'
                ],
                validation: 'O aluno deve ser capaz de identificar em qual era um algoritmo específico (ex: Regressão Linear vs GPT-4) se encaixa.'
              },
              tutorialSnippets: [
                {
                  language: 'javascript',
                  fileName: 'step1-timeline-data.js',
                  code: `// Step 1: Marcos historicos em JSON cronologico\nconst marcos = [\n  { ano: 1950, evento: "Teste de Turing",\n    impacto: "Definiu o que significa 'pensar'" },\n  { ano: 1966, evento: "ELIZA",\n    impacto: "Primeiro chatbot com regras fixas" },\n  { ano: 1997, evento: "Deep Blue vence Kasparov",\n    impacto: "IA supera humano em dominio fechado" },\n  { ano: 2012, evento: "AlexNet",\n    impacto: "Deep Learning domina visao computacional" },\n  { ano: 2017, evento: "Paper 'Attention Is All You Need'",\n    impacto: "Nasce a arquitetura Transformer" },\n  { ano: 2022, evento: "ChatGPT",\n    impacto: "IA generativa chega ao publico" },\n];\n\nmarcos.forEach(m => {\n  console.log(\`[\${m.ano}] \${m.evento}\`);\n});`,
                  description: 'Step 1: Estruturando marcos historicos da IA como dados navegaveis.'
                },
                {
                  language: 'javascript',
                  fileName: 'step2-venn-interativo.js',
                  code: `// Step 2: Venn interativo - AI > ML > DL\nfunction criarVenn(containerId) {\n  const svg = document.createElementNS(\n    "http://www.w3.org/2000/svg", "svg"\n  );\n  svg.setAttribute("viewBox", "0 0 400 400");\n\n  const camadas = [\n    { r: 180, label: "AI",  fill: "#64748b22" },\n    { r: 130, label: "ML",  fill: "#3b82f622" },\n    { r: 80,  label: "DL",  fill: "#8b5cf622" },\n  ];\n\n  camadas.forEach(({ r, label, fill }) => {\n    const circle = document.createElementNS(\n      "http://www.w3.org/2000/svg", "circle"\n    );\n    circle.setAttribute("cx", "200");\n    circle.setAttribute("cy", "200");\n    circle.setAttribute("r", String(r));\n    circle.setAttribute("fill", fill);\n    circle.setAttribute("stroke", "#fff3");\n    svg.appendChild(circle);\n  });\n\n  document.getElementById(containerId)\n    .appendChild(svg);\n}`,
                  description: 'Step 2: Criando diagrama de Venn com SVG puro para hierarquia AI > ML > DL.'
                },
                {
                  language: 'javascript',
                  fileName: 'step3-spam-detector.js',
                  code: `// Step 3: Comparativo - Regras vs ML para spam\n\n// Abordagem 1: Regras fixas (Symbolic AI)\nfunction detectarSpamRegras(email) {\n  const palavrasProibidas = [\n    "gratis", "ganhe", "clique aqui", "oferta"\n  ];\n  return palavrasProibidas.some(\n    p => email.toLowerCase().includes(p)\n  );\n}\n\n// Abordagem 2: ML probabilistico\nfunction detectarSpamML(email, modelo) {\n  const features = extrairFeatures(email);\n  // O modelo aprendeu com 10.000 exemplos\n  const probabilidade = modelo.predict(features);\n  return probabilidade > 0.5;\n}\n\n// Regras: rapido mas fragil (muda a palavra, burla)\n// ML: adaptavel mas precisa de dados para treinar`,
                  description: 'Step 3: Comparando abordagem simbolica vs ML para deteccao de spam.'
                },
                {
                  language: 'javascript',
                  fileName: 'step4-context-window.js',
                  code: `// Step 4: Evolucao da janela de contexto\nconst modelos = [\n  { nome: "RNN (1990s)",     tokens: 100,\n    nota: "Esquece o inicio da frase" },\n  { nome: "LSTM (1997)",     tokens: 500,\n    nota: "Memoria de curto e longo prazo" },\n  { nome: "Transformer (2017)", tokens: 512,\n    nota: "Atencao paralela, sem recorrencia" },\n  { nome: "GPT-3 (2020)",   tokens: 4096,\n    nota: "Escala massiva de parametros" },\n  { nome: "GPT-4 (2023)",   tokens: 128000,\n    nota: "128K tokens = ~100 paginas" },\n  { nome: "Gemini (2024)",   tokens: 1000000,\n    nota: "1M tokens = livros inteiros" },\n];\n\n// Crescimento: 100 -> 1.000.000 tokens\n// Fator de crescimento: 10.000x em ~30 anos\nconst crescimento = 1000000 / 100;\nconsole.log(\`Crescimento: \${crescimento}x\`);`,
                  description: 'Step 4: Documentando a evolucao exponencial da janela de contexto.'
                }
              ]
            }
          }
        ]
      }
    ]
  },
  {
    id: 'm2',
    title: 'Módulo II: APIs de IA Generativa e Prompt Engineering',
    units: [{ id: 'u2-1', title: 'Integração Profissional', lessons: [] }]
  },
  {
    id: 'm3',
    title: 'Módulo III: MCP – Model Context Protocol',
    units: [{ id: 'u3-1', title: 'Conectividade de Dados', lessons: [] }]
  },
  {
    id: 'm4',
    title: 'Módulo IV: Criação de Agentes Autônomos',
    units: [{ id: 'u4-1', title: 'Arquiteturas ReAct e Memória', lessons: [] }]
  },
  {
    id: 'm5',
    title: 'Módulo V: Ferramentas de IA para UX & UI',
    units: [{ id: 'u5-1', title: 'Design Generativo', lessons: [] }]
  },
  {
    id: 'm6',
    title: 'Módulo VI: Ferramentas de IA para DevOps',
    units: [{ id: 'u6-1', title: 'Infraestrutura Inteligente', lessons: [] }]
  },
  {
    id: 'm7',
    title: 'Módulo VII: Ferramentas de IA para Gestão de Projetos',
    units: [{ id: 'u7-1', title: 'Gestão Preditiva', lessons: [] }]
  },
  {
    id: 'm8',
    title: 'Módulo VIII: Arquitetura de Sistemas com IA',
    units: [{ id: 'u8-1', title: 'RAG Avançado e Enterprise', lessons: [] }]
  },
  {
    id: 'm9',
    title: 'Módulo IX: Processamento de Dados e Fine-Tuning',
    units: [{ id: 'u9-1', title: 'Datasets e LoRA', lessons: [] }]
  },
  {
    id: 'm10',
    title: 'Módulo X: Segurança e Governança em IA',
    units: [{ id: 'u10-1', title: 'Ética e Compliance', lessons: [] }]
  },
  {
    id: 'm11',
    title: 'Módulo XI: Projeto Integrador – Capstone Project',
    units: [{ id: 'u11-1', title: 'Desenvolvimento e Defesa', lessons: [] }]
  },
  {
    id: 'm12',
    title: 'Módulo XII: Carreira e Entrevistas',
    units: [{ id: 'u12-1', title: 'Posicionamento de Mercado', lessons: [] }]
  }
];
