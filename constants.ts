
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
              visual: {
                metaphor: 'Um laboratório de física digital onde ajustamos a gravidade (pesos) para que a informação caia no lugar certo.',
                widgetType: 'neuron',
                widgetTitle: 'Laboratório de Neurônio Artificial'
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
              }
            }
          },
          {
            id: 'l1-1-2',
            title: 'Aula 02: A Linha do Tempo da Inteligência Artificial',
            content: {
              leigo: 'A jornada da IA é como a evolução do transporte: começamos com charretes de regras fixas (IA Simbólica), passamos pelos primeiros motores que aprendiam trajetos (Machine Learning), chegamos a aviões complexos com milhares de sensores (Deep Learning) e agora temos naves espaciais que criam suas próprias rotas (LLMs). É uma mudança de paradigma: paramos de dizer ao computador exatamente o que fazer e passamos a mostrar exemplos para que ele aprenda sozinho.',
              visual: {
                metaphor: 'Círculos concêntricos de complexidade onde cada nova era engloba e expande a anterior.',
                widgetType: 'timeline',
                widgetTitle: 'Explorador da Linha do Tempo IA'
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
              }
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
