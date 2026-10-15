import { Article, ProjectItem, SkillCategory, CommentItem } from '../types';

export const INITIAL_ARTICLES: Article[] = [
  {
    id: 'art-01',
    title: 'Controle Torque-Ângulo na Indústria 4.0: Eliminando o Efeito de Relaxamento e Juntas Críticas',
    slug: 'controle-torque-angulo-industria-4-0',
    category: 'industria40',
    type: 'estudo_caso',
    featured: true,
    summary: 'Como a migração de aperto por simples torque para estratégias combinadas de Torque-Ângulo e monitoramento de gradiente eliminou retrabalhos em uniões flangeadas de alta vibração.',
    content: `## O Desafio da Variação do Coeficiente de Atrito

No chão de fábrica tradicional, o aperto controlado apenas por torque estático carrega uma incerteza de pré-carga que pode variar entre **±25% e até ±35%**. Essa dispersão ocorre primariamente porque:
- Cerca de **85% a 90%** do torque aplicado é dissipado exclusivamente em vencer o atrito sob a cabeça do fixador e nos flancos da rosca.
- Apenas **10% a 15%** da energia mecânica converte-se efetivamente na força de união (pré-carga clamp load $F_M$).

Quando introduzimos parafusos fosfatizados ou zincados sem controle rigoroso de oleosidade superficial, a pré-carga real gerada em dois parafusos idênticos apertados com os mesmos 45 N.m pode ter uma discrepância fatal para juntas sob fadiga.

---

### A Mudança de Paradigma: Estratégia Torque-Ângulo (TA)

Na estratégia de Torque-Ângulo:
1. **Snug Torque (Torque de Assentamento)**: Aplica-se um torque inicial controlado (geralmente entre 20% a 40% do torque nominal) para garantir o contato íntimo entre as faces da junta e eliminar folgas e rugosidades.
2. **Ângulo de Rotação ($\alpha$)**: A partir do ponto de assentamento calibrado, o fuso gira um ângulo angular preciso pré-determinado pelo passo da rosca e elasticidade da junta.

$$F_M = \\frac{p \\cdot \\alpha}{360^\\circ \\cdot (\\delta_S + \\delta_P)}$$

Onde:
- $p$ = Passo da rosca métrica
- $\\alpha$ = Ângulo em graus
- $\\delta_S$ = Resiliência elástica do parafuso
- $\\delta_P$ = Resiliência das peças fixadas

---

### Resultados Práticos em Linha de Montagem 4.0

Em um projeto recente de linha de transmissão automotiva com aperto de coroa e diferencial:
- **Redução de dispersão de pré-carga**: de $\\pm 28\\%$ para $\\pm 8.5\\%$.
- **Rastreabilidade total**: Integração via protocolo Open Protocol (TCP/IP) com o sistema MES corporativo gravando curvas completas de aperto (curvas de torque x tempo e torque x ângulo com amostragem a 1 kHz).
- **Detecção precoce de anomalias**: Detecção automática de rosca cruzada (*cross-threading*) antes do atingimento de 5 N.m, evitando a perda de blocos fundidos usinados de alto custo.`,
    readTimeMinutes: 7,
    publishedAt: '2025-02-18',
    isDraft: false,
    author: {
      name: 'Eng. Mecânico & Especialista em Aperto',
      role: 'Especialista em Metrologia de Torque & Indústria 4.0'
    },
    tags: ['Torque-Ângulo', 'VDI 2230', 'Indústria 4.0', 'MES', 'Powertrain'],
    likes: 42,
    views: 890,
    commentsCount: 3,
    technicalMetadata: {
      boltStandard: 'M10 x 1.25 Classe 10.9',
      torqueRange: '35 N.m + 65°',
      jointType: 'Junta Rígida (Hard)',
      criticality: 'Classe A (Crítico/Segurança)',
      toolsTested: ['Apertadeira Eletrônica Transduzida', 'Célula de Carga Ultrassônica'],
      vdiStandard: 'VDI 2230 Folha 1 / ISO 16047'
    }
  },
  {
    id: 'art-02',
    title: 'Guia Prático da VDI 2230: Cálculo de Pré-Carga e Coeficientes de Atrito para Parafusos 8.8, 10.9 e 12.9',
    slug: 'guia-pratico-vdi-2230-calculo-pre-carga',
    category: 'tutoriais',
    type: 'tutorial',
    featured: true,
    summary: 'Passo a passo fundamentado para engenheiros e técnicos dimensionarem juntas parafusadas com segurança sem depender de tabelas genéricas que causam fratura ou afrouxamento.',
    content: `## Por que tabelas genéricas de torque são perigosas?

A maioria dos manuais de oficina traz uma tabela estática de "Torque Recomendado". No entanto, essas tabelas raramente especificam:
1. Qual coeficiente de atrito total ($\\mu_{tot}$) foi considerado (ex: 0.10 lubrificado ou 0.18 oxidado seco).
2. O limite de utilização do escoamento (se 70%, 90% ou 100% de $R_{p0.2}$).
3. A resiliência da junta (se as peças são de alumínio fundido, ferro fundido nodular ou chapa fina estampada).

---

### Os 4 Coeficientes de Atrito Críticos

Segundo a norma **ISO 16047**:
- $\\mu_{th}$ (Atrito nos flancos da rosca): Determinado pelo passo, acabamento superficial e presença de revestimentos protetivos (zinco-níquel, geomet, etc.).
- $\\mu_b$ (Atrito sob a cabeça ou porca): Área de contato onde ocorrem altas pressões de contato específicas.
- $\\mu_{tot}$ (Coeficiente equivalente global):
$$\\mu_{tot} \\approx 0.55 \\cdot \\mu_{th} + 0.45 \\cdot \\mu_b$$

---

### Passo a Passo de Dimensionamento Prático

1. **Definição da Força de Fixação Residual ($F_{KR}$)**:
   A junta nunca pode abrir ou deslizar transversalmente sob a carga máxima de operação.
2. **Cálculo da Perda por Acomodação ($F_Z$)**:
   Imediatamente após o aperto, as microrugosidades das superfícies colapsam plasticamente. Para juntas curtas, isso pode representar até 20% da pré-carga perdida!
3. **Determinação da Pré-Carga Máxima de Montagem ($F_{M,max}$)**:
   $$F_{M,max} = \\alpha_A \\cdot F_{M,min}$$
   Onde $\\alpha_A$ é o fator de aperto (Tightening Factor), variando de 1.1 (aperto por escoamento com sensor) a 1.6 (torquímetro de estalo convencional manual).

Confira a nossa **Calculadora Interativa de Torque** na aba de Ferramentas Técnicas do site para realizar essa simulação instantaneamente!`,
    readTimeMinutes: 9,
    publishedAt: '2025-02-25',
    isDraft: false,
    author: {
      name: 'Eng. Mecânico & Especialista em Aperto',
      role: 'Especialista em Metrologia de Torque & Indústria 4.0'
    },
    tags: ['VDI 2230', 'Cálculo de Torque', 'Parafusos 10.9', 'Pré-Carga', 'ISO 16047'],
    likes: 38,
    views: 745,
    commentsCount: 2,
    technicalMetadata: {
      boltStandard: 'M6 a M24 (ISO 4014 / 4017)',
      torqueRange: '9 N.m a 950 N.m',
      jointType: 'Junta Média',
      criticality: 'Classe B (Funcional)',
      toolsTested: ['Torquímetro Digital com Ângulo', 'Bancada de Teste de Atrito Schatz'],
      vdiStandard: 'VDI 2230 / VDI/VDE 2645'
    }
  },
  {
    id: 'art-03',
    title: 'Integração de Apertadeiras Eletrônicas via Open Protocol com PLCs Siemens e Rastreabilidade MES',
    slug: 'integracao-apertadeiras-open-protocol-plc-siemens',
    category: 'automacao',
    type: 'artigo',
    featured: false,
    summary: 'Arquitetura detalhada de comunicação industrial usando Ethernet/IP e TCP/IP Open Protocol para envio de PSETs, controle de intertravamento e recebimento de curvas de aperto.',
    content: `## A Convergência entre Automação e Qualidade de Fixação

Nos tempos das apertadeiras pneumáticas de impacto, a única evidência de que um parafuso havia sido apertado era a marca de giz ou tinta do operador. Na **Indústria 4.0**, cada aperto é uma transação de dados com identificação unívoca por número de chassi/peça (VIN / Serial Code).

---

### Como Funciona a Pilha Open Protocol

O padrão Open Protocol (desenvolvido originalmente pela Atlas Copco e adotado amplamente na indústria por marcas como Desoutter, Apex, Bosch Rexroth e Cleco) opera via sockets TCP/IP padrão nas portas 4545 ou 5000:

- **MID 0001 / MID 0002**: Handshake inicial de comunicação e ativação de sessão.
- **MID 0018 / MID 0019**: Seleção remota de PSET (Programa de Aperto) a partir do leitor de código de barras ou PLC Siemens S7-1500.
- **MID 0060 / MID 0061**: Transmissão em tempo real do resultado final de aperto (Status OK/NOK, Torque final em N.m, Ângulo em graus, Timestamp).
- **MID 0900**: Transmissão da curva gráfica completa (Trace de Torque x Ângulo x Tempo).

---

### Boas Práticas de Intertravamento no CLP:
1. **Poka-Yoke de Sequência de Parafusos**: Bloquear o avanço da esteira transportadora caso a quantidade de parafusos OK recebida do controlador seja menor que o total da receita.
2. **Tratamento de NOK com Re-aperto**: Nunca permitir re-apertar sobre um aperto já executado sem afrouxamento prévio (evita sobretensão e falso OK de torque por atrito estático).
3. **Buffering Local**: Caso o servidor MES caia por milissegundos, o CLP deve armazenar os telegramas em um Data Block de fila FIFO para evitar parada de linha.`,
    readTimeMinutes: 6,
    publishedAt: '2025-03-01',
    isDraft: false,
    author: {
      name: 'Eng. Mecânico & Especialista em Aperto',
      role: 'Especialista em Metrologia de Torque & Indústria 4.0'
    },
    tags: ['Open Protocol', 'Siemens S7-1500', 'CLP', 'Automação', 'MES'],
    likes: 29,
    views: 610,
    commentsCount: 4,
    technicalMetadata: {
      boltStandard: 'M8 Flangeado Classe 8.8',
      torqueRange: '22 N.m',
      jointType: 'Junta Rígida (Hard)',
      criticality: 'Classe A (Crítico/Segurança)',
      toolsTested: ['Controlador Power Focus', 'Siemens S7-1500', 'Desoutter CVI3'],
      vdiStandard: 'VDI/VDE 2862'
    }
  },
  {
    id: 'art-04',
    title: 'Histórias de Chão de Fábrica #01: O Mistério dos 35 N.m que Parou a Linha Noturna',
    slug: 'historias-fabrica-misterio-35-nm-parou-linha',
    category: 'historias_campo',
    type: 'historia_campo',
    featured: true,
    summary: 'Uma sexta-feira às 23h, 40 motores rejeitados por falso NOK e uma aula prática sobre como temperatura, óleo de usinagem residual e velocidade de rotação alteram tudo.',
    content: `## Sexta-feira, 23h15. O Alarme Vermelho da Linha 3.

Quem trabalha em manufatura seriada conhece o calafrio que dá quando o supervisor do 3º turno liga dizendo: *"Chefe, a estação de aparafusamento automático do cárter está dando rejeição em 100% dos blocos há 20 minutos. Estamos a ponto de parar a usinagem"*.

Cheguei na linha e os operadores estavam estressados. A parafusadeira de múltiplos fusos (6 fusos elétricos simultâneos) estava atingindo o limite superior de torque (42 N.m) muito antes de atingir a cota mínima de ângulo. Pela curva, parecia uma junta ultra dura ou parafuso espanando.

---

### A Investigação Técnica

A primeira suspeita comum de quem não conhece aperto a fundo: *"A máquina descalibrou! Chame a manutenção!"*.
Peguei nosso torquímetro rotativo de auditoria dinâmico calibrado RBC e o transdutor em linha. Fizemos 3 testes em bloco de ensaio: **o torque do fuso estava perfeito, erro menor que 0.8%**.

Então, onde estava a raiz do problema?

Fui até a lavadora de peças que antecedia a montagem. Descobrimos duas coisas cruciais:
1. Um técnico novato havia trocado o detergente desengraxante por um lote com tensoativo concentrado diferente duas horas antes.
2. A temperatura do banho de secagem estava operando 15°C abaixo do nominal, deixando uma fina película aquosa e pegajosa no fundo dos furos roscados cegos.

O resultado? **Efeito pistão hidráulico e aumento súbito do coeficiente de atrito de rosca $\\mu_{th}$ de 0.12 para 0.26!** O torque chegava aos 35 N.m nominais gastando quase toda a energia apenas para vencer o atrito da rosca contaminada, sem gerar nem metade da força de compressão na junta do cárter!

---

### A Lição que Fica para Engenheiros e Técnicos

O parafuso é o sensor mais sincero de um processo mecânico. Se o torque ou ângulo mudou repentinamente numa linha estabilizada:
- **90% das vezes a culpa NÃO é da apertadeira.**
- O processo químico de lavagem, o fornecedor do fixador (variação de galvanização) ou a tolerância de macho de corte na usinagem foram alterados.

Essa história reforçou a cultura de engenharia analítica na fábrica: antes de mexer nos parâmetros da máquina, audite as variáveis de contorno da junta!`,
    readTimeMinutes: 5,
    publishedAt: '2025-03-02',
    isDraft: false,
    author: {
      name: 'Eng. Mecânico & Especialista em Aperto',
      role: 'Especialista em Metrologia de Torque & Indústria 4.0'
    },
    tags: ['Chão de Fábrica', 'Solução de Problemas', 'Estudo de Caso', 'Cárter', 'Lavadora Industrial'],
    likes: 56,
    views: 1140,
    commentsCount: 5,
    technicalMetadata: {
      boltStandard: 'M6 x 1.0 Alumínio/Aço',
      torqueRange: '9.5 N.m',
      jointType: 'Junta Flexível (Soft)',
      criticality: 'Classe B (Funcional)',
      toolsTested: ['Transdutor Rotativo Dinâmico', 'Analisador de Qualidade'],
      vdiStandard: 'VDI/VDE 2645-2'
    }
  },
  {
    id: 'art-05',
    title: 'Histórias de Chão de Fábrica #02: Da Pneumática de Impacto ao Smart Tooling: A Batalha Cultural',
    slug: 'historias-fabrica-transicao-pneumatica-para-smart-tooling',
    category: 'historias_campo',
    type: 'historia_campo',
    featured: false,
    summary: 'A resistência dos operadores com 25 anos de casa e como transformamos desconfiança em orgulho técnico através de dados visuais na tela.',
    content: `## "Garoto, eu aperto parafuso no 'tato' há 25 anos e nunca soltou nada!"

Essa foi a primeira frase que ouvi do Seu Valdir, mestre da linha de chassis pesados, quando apresentei o projeto de implantação de apertadeiras elétricas transduzidas conectadas ao sistema de qualidade.

Ele tinha razão no ponto de vista dele: a velha chave pneumática de marteleira fazia barulho, vibrava forte na mão e passava uma falsa sensação de "aperto brutal". Quando a apertadeira eletrônica silenciosa entrou, sem tranco ergonômico e com parada milimétrica por ângulo, os operadores juravam que o parafuso estava "frouxo".

---

### O Experimento que Mudou o Jogo

Em vez de impor pelo crachá de engenheiro, montei um banco de testes didático na própria bancada do Seu Valdir:
- Pegamos uma célula de carga extensométrica analógica com mostrador gigante em quilonewtons (kN).
- Pedi para o Seu Valdir apertar 5 parafusos com a marteleira pneumática "no tato dele".
- Em seguida, apertamos 5 parafusos com a ferramenta controlada por ângulo.

O resultado do teste do Seu Valdir no "tato":
- Parafuso 1: 18 kN (abaixo do projeto)
- Parafuso 2: 44 kN (quase rompeu)
- Parafuso 3: 26 kN
- Parafuso 4: 31 kN
- Parafuso 5: 19 kN

Na ferramenta eletrônica:
- Todos os 5 parafusos ficaram rigorosamente entre **32.4 kN e 33.1 kN**, com dispersão minúscula!

Quando o Seu Valdir viu aquele ponteiro oscilar loucamente na pneumática e cravar na digital, os olhos dele brilharam. Ele virou o maior embaixador da tecnologia na fábrica inteira, ensinando os técnicos mais jovens a ler as curvas de torque na tela do controlador.`,
    readTimeMinutes: 4,
    publishedAt: '2025-03-02',
    isDraft: false,
    author: {
      name: 'Eng. Mecânico & Especialista em Aperto',
      role: 'Especialista em Metrologia de Torque & Indústria 4.0'
    },
    tags: ['Cultura Industrial', 'Ergonomia', 'Smart Tooling', 'Operadores', 'Treinamento'],
    likes: 47,
    views: 920,
    commentsCount: 3
  },
  {
    id: 'art-06',
    title: 'Aperto Além do Escoamento (Yield Point Tightening): Quando e Como Aplicar sem Fraturar o Fixador',
    slug: 'aperto-alem-do-escoamento-yield-point',
    category: 'torque',
    type: 'artigo',
    featured: false,
    summary: 'A física por trás do aperto plástico controlado: cálculo do gradiente dM/dα, máxima capacidade de carga e por que parafusos de biela usam esse método.',
    content: `## A Fronteira Elástica vs Plástica

Na esmagadora maioria das aplicações gerais de engenharia mecânica, projetamos o aperto para operar na região estritamente elástica do material do parafuso, normalmente entre **70% e 90% da tensão de escoamento** ($R_{p0.2}$).

Contudo, em aplicações de altíssima solicitação dinâmica — como parafusos de cabeçote de motor a combustão, bielas, rolamentos de pás de turbinas eólicas e flanges de vasos de pressão — o aperto até ou além do escoamento torna-se a melhor estratégia técnica.

---

### Como o Controlador Detecta o Ponto de Escoamento?

Controladores inteligentes monitoram a derivada matemática do torque em relação ao ângulo:

$$\\text{Gradiente} = \\frac{dM}{d\\alpha}$$

1. **Fase Elástica Linear**: A inclinação da curva $\\frac{dM}{d\\alpha}$ é constante e positiva (rigidez da junta).
2. **Ponto de Inflexão**: Quando o parafuso começa a escoar plasticamente, a taxa de aumento do torque cai abruptamente, aproximando-se de zero enquanto o ângulo continua avançando.
3. **Trigger de Desligamento**: O algoritmo reconhece quando o gradiente cai abaixo de um limiar configurado (ex: 50% da rigidez elástica máxima) e corta a alimentação do motor no exato milissegundo.

---

### Vantagens e Cuidados Cruciais

- **Vantagem Absoluta**: Elimina quase totalmente a dispersão de pré-carga causada pelo atrito superficial. Toda a capacidade mecânica do fixador é aproveitada.
- **Cuidados**:
  - Requer parafusos de alta ductilidade e tenacidade controlada (ex: Classe 10.9 ou 12.9 especiais).
  - Em geral, os parafusos não devem ser reutilizados após desmontagem em manutenções críticas, pois já sofreram deformação plástica permanente.`,
    readTimeMinutes: 8,
    publishedAt: '2025-02-10',
    isDraft: false,
    author: {
      name: 'Eng. Mecânico & Especialista em Aperto',
      role: 'Especialista em Metrologia de Torque & Indústria 4.0'
    },
    tags: ['Yield Point', 'Escoamento', 'Bielas & Cabeçotes', 'Fadiga Mecânica', 'Algoritmos'],
    likes: 34,
    views: 680,
    commentsCount: 2,
    technicalMetadata: {
      boltStandard: 'M9 x 1.0 Especial Grau 12.9',
      torqueRange: 'Gradiente dM/da',
      jointType: 'Junta Rígida (Hard)',
      criticality: 'Classe A (Crítico/Segurança)',
      toolsTested: ['Apertadeira Eletrônica com Controle por Algoritmo de Derivada'],
      vdiStandard: 'VDI 2230 Parte 1'
    }
  },
  // UNPUBLISHED DRAFTS - Ready for the user to organize, edit, and publish!
  {
    id: 'draft-01',
    title: '[Rascunho] Metrologia Dinâmica segundo ISO 5393 e VDI/VDE 2645-2: Como Auditar Ferramentas no Chão de Fábrica',
    slug: 'rascunho-metrologia-dinamica-iso-5393-vdi-2645-2',
    category: 'torque',
    type: 'tutorial',
    featured: false,
    summary: 'Rascunho estruturado sobre calibração estática vs ensaio dinâmico em bancada com simulador de junta dura e flexível. Cálculo de Cm e Cmk.',
    content: `## Objetivo do Procedimento Técnico

Estruturar o procedimento padrão de auditoria de capabilidade de máquinas de aperto (Cm e Cmk) para atender auditorias IATF 16949 e VDA 6.3.

### Pontos em Desenvolvimento:
- Diferença entre torque estático de quebra (Breakaway torque) e torque dinâmico de aperto.
- Como configurar a bancada de simulação de junta segundo VDI/VDE 2645-2.
- Critério de aceitação estatística: $C_{mk} \\ge 1.67$ para aplicações de Classe A (segurança de vida).
- Cálculo prático de Desvio Padrão ($\\sigma$) com 25 amostras consecutivas.

*Nota do Autor: Inserir aqui fotos da bancada e fórmula do Cmk antes de publicar.*`,
    readTimeMinutes: 6,
    publishedAt: '2025-03-03',
    isDraft: true,
    author: {
      name: 'Eng. Mecânico & Especialista em Aperto',
      role: 'Especialista em Metrologia de Torque & Indústria 4.0'
    },
    tags: ['ISO 5393', 'VDI/VDE 2645-2', 'Cmk', 'IATF 16949', 'Metrologia'],
    likes: 0,
    views: 0,
    commentsCount: 0,
    technicalMetadata: {
      boltStandard: 'Juntas de Teste Normalizadas VDI',
      torqueRange: '5 a 200 N.m',
      jointType: 'Junta Rígida (Hard)',
      criticality: 'Classe A (Crítico/Segurança)',
      toolsTested: ['Bancada Móvel de Calibração com Transdutor Rotativo']
    }
  },
  {
    id: 'draft-02',
    title: '[Rascunho] Algoritmos de Detecção de Rosca Espanada e Cross-Threading em Milissegundos',
    slug: 'rascunho-algoritmos-deteccao-cross-threading',
    category: 'industria40',
    type: 'artigo',
    featured: false,
    summary: 'Estruturação preliminar sobre como janelas de monitoramento de torque angular (Envelopes) salvam carcaças usinadas caras.',
    content: `## A Física da Rosca Cruzada

Quando o fixador entra fora de centro em furos roscados de carcaças fundidas de alumínio ou magnésio, o pico de torque ocorre muito antes da aproximação das superfícies de contato.

### Seções a Concluir:
1. Configuração de Janela Angular de Entrada (Run-in Angle).
2. Curvas de Envelope Superior e Inferior com amostragem contínua.
3. Tratamento de paradas de emergência por software antes de danificar a peça matriz.`,
    readTimeMinutes: 4,
    publishedAt: '2025-03-03',
    isDraft: true,
    author: {
      name: 'Eng. Mecânico & Especialista em Aperto',
      role: 'Especialista em Metrologia de Torque & Indústria 4.0'
    },
    tags: ['Cross-Threading', 'Envelopes de Monitoramento', 'Poka-Yoke', 'Qualidade 4.0'],
    likes: 0,
    views: 0,
    commentsCount: 0
  }
];

export const INITIAL_COMMENTS: CommentItem[] = [
  {
    id: 'comm-01',
    articleId: 'art-01',
    authorName: 'Carlos Eduardo Ramos',
    authorRole: 'Engenheiro de Processos Powertrain (Montadora)',
    content: 'Excelente artigo! Aqui na linha de motores passamos exatamente por essa transição. O maior ganho que tivemos com a estratégia Torque-Ângulo foi parar de discutir com o fornecedor de parafusos sobre lote de revestimento Geomet. A curva de torque x ângulo deixa claro na hora se o atrito saiu da janela.',
    createdAt: '2025-02-20T14:30:00Z',
    likes: 12,
    isVerifiedEngineer: true,
    replies: [
      {
        id: 'comm-01-rep-1',
        articleId: 'art-01',
        authorName: 'Autor do Site',
        authorRole: 'Especialista em Metrologia & Aperto 4.0',
        content: 'Perfeito, Carlos! O Geomet e o Zinco-Níquel têm uma sensibilidade altíssima ao aquecimento por atrito se a rotação inicial for muito alta. Qual velocidade (RPM) de aproximação vocês costumam parametrizar na primeira fase?',
        createdAt: '2025-02-20T16:15:00Z',
        likes: 6,
        isVerifiedEngineer: true
      }
    ]
  },
  {
    id: 'comm-02',
    articleId: 'art-01',
    authorName: 'Marcos Vinícius Silva',
    authorRole: 'Técnico em Automação Industrial',
    content: 'Vocês recomendam usar o Open Protocol direto pro CLP via socket ou preferem usar o módulo de campo tipo PROFINET nativo do controlador da ferramenta?',
    createdAt: '2025-02-22T09:40:00Z',
    likes: 8,
    isVerifiedEngineer: false,
    replies: [
      {
        id: 'comm-02-rep-1',
        articleId: 'art-01',
        authorName: 'Autor do Site',
        authorRole: 'Especialista em Metrologia & Aperto 4.0',
        content: 'Ótima pergunta, Marcos! Para intertravamento crítico de segurança e ciclo em tempo real (Start/Stop, PSET, OK/NOK), o PROFINET ou Ethernet/IP é imbatível por ser determinístico. Já o Open Protocol deixamos rodando em paralelo em outra porta Ethernet direto para o servidor MES para subir as curvas de trace (curvas gráficas pesadas). Assim não onera a banda do barramento da máquina!',
        createdAt: '2025-02-22T11:05:00Z',
        likes: 11,
        isVerifiedEngineer: true
      }
    ]
  },
  {
    id: 'comm-03',
    articleId: 'art-04',
    authorName: 'Renato Faria',
    authorRole: 'Supervisor de Manutenção Mecânica',
    content: 'Essa história do desengraxante da lavadora é clássica demais! Já peguei caso similar onde o operador aumentou o desmoldante da prensa de estamparia e o torque escorregava dando falso OK com parafuso solto. Obrigado por compartilhar essa vivência prática de fábrica!',
    createdAt: '2025-03-02T18:20:00Z',
    likes: 15,
    isVerifiedEngineer: true
  }
];

export const INITIAL_PROJECTS: ProjectItem[] = [
  {
    id: 'proj-01',
    title: 'Célula Robotizada de Aperto Crítico para Pacotes de Baterias EV',
    clientOrSector: 'Setor Automotivo / Mobilidade Elétrica',
    category: 'Automotivo & Baterias',
    summary: 'Desenvolvimento, comissionamento e validação de sistema robotizado com fuso elétrico telescópico para 64 parafusos M6 em carcaça de alumínio com tolerância milimétrica.',
    challenge: 'Apertar 64 fixadores em tampa selada com junta de silicone líquido (RTV) sem deformar a carcaça de alumínio estrutural de espessura delgada, garantindo vedação IP67 e rastreabilidade individual de cada ponto.',
    solution: 'Algoritmo de aperto multi-estágio em padrão espiral cruzado cruzando dados com sensor de força axial no cabeçote robotizado KUKA, com comunicação PROFINET e Open Protocol integrando sistema MES.',
    results: [
      'Tempo de ciclo por bateria reduzido de 6m20s para 2m45s',
      'Zero vazamento em ensaios de estanqueidade a hélio em mais de 12.000 packs montados',
      'Rastreabilidade 100% gravada em banco corporativo com identificação do QR Code de cada célula'
    ],
    technologies: ['Robô KUKA KRC4', 'Fuso Atlas Copco Tensor STR', 'Siemens S7-1500F', 'Open Protocol', 'Algoritmo Multi-Passo'],
    metrics: [
      { label: 'Cmk do Fuso', value: '2.14' },
      { label: 'Redução de Ciclo', value: '-56%' },
      { label: 'Fixadores/Pack', value: '64 pontos' }
    ],
    date: '2024 - 2025'
  },
  {
    id: 'proj-02',
    title: 'Retrofit e Padronização 4.0 de Linha de Transmissão Automotiva',
    clientOrSector: 'Fabricante Global de Transmissões & Eixos',
    category: 'Powertrain',
    summary: 'Substituição de 38 estações manuais com torquímetros mecânicos por ferramentas conectadas com guiamento visual por realidade assistida e intertravamento Poka-Yoke.',
    challenge: 'Histórico de retrabalhos por parafusos esquecidos ou torque incorreto em turnos rotativos, além da falta de comprovação legal de torque em recall de segurança.',
    solution: 'Implementação de rede de controladores com posicionamento espacial por braços de reação com encoders absolutos, impedindo que a ferramenta ligue se estiver fora da coordenada correta do parafuso da receita.',
    results: [
      'Redução de 100% em ocorrências de parafuso não apertado na expedição',
      'Auditoria de qualidade VDA 6.3 aprovada com nota máxima em aperto Classe A',
      'Eliminação de marcação manual com caneta de tinta'
    ],
    technologies: ['Braço de Reação Articulado com Encoders', 'Desoutter CVI3', 'TIA Portal V18', 'Scada Ignition', 'VDI 2862'],
    metrics: [
      { label: 'Defeitos por Milhão (PPM)', value: '< 2 PPM' },
      { label: 'Estações Modernizadas', value: '38' },
      { label: 'Retorno do Investimento (ROI)', value: '7.8 meses' }
    ],
    date: '2023 - 2024'
  },
  {
    id: 'proj-03',
    title: 'Bancada Automatizada de Ensaio de Coeficiente de Atrito segundo ISO 16047',
    clientOrSector: 'Laboratório de Metrologia e Fixadores',
    category: 'Metrologia & P&D',
    summary: 'Projeto eletromecânico e software de bancada para determinação precisa de atrito de rosca e de cabeça em fixadores de M4 a M16.',
    challenge: 'Dependência de ensaios laboratoriais externos demorados e caros para validar novos lotes de lubrificantes secos e acabamentos de superfície.',
    solution: 'Bancada customizada com servoacionamento de alta rigidez, célula de carga bi-axial (torque e força axial) e sensor angular óptico com software de aquisição a 5 kHz em LabVIEW e exportação para banco de dados relacional.',
    results: [
      'Tempo de validação de lotes reduzido de 15 dias úteis para 35 minutos internos',
      'Capacidade de ensaiar até 150 kN de pré-carga e 600 N.m de torque dinâmico',
      'Geração automática de relatórios gráficos de conformidade ISO 16047'
    ],
    technologies: ['Servoacionamento Schneider', 'Célula Bi-axial Lorenz', 'LabVIEW', 'Aquisição NI-DAQ', 'Norma ISO 16047'],
    metrics: [
      { label: 'Taxa de Amostragem', value: '5.000 Hz' },
      { label: 'Precisão de Força', value: '0.2% FS' },
      { label: 'Economia Anual em Testes', value: 'R$ 140.000+' }
    ],
    date: '2023'
  }
];

export const TECHNICAL_SKILLS_DATA: SkillCategory[] = [
  {
    id: 'torque-metrology',
    title: 'Engenharia de Aperto & Metrologia de Torque',
    iconName: 'Gauge',
    description: 'Domínio profundo da física de uniões parafusadas, cálculo segundo VDI 2230, métodos de controle e instrumentação metrológica de alta precisão.',
    skills: [
      {
        name: 'VDI 2230 (Folha 1 e 2)',
        level: 96,
        highlight: true,
        description: 'Cálculo analítico sistemático de juntas flangeadas, diagramas de aperto, resiliências e cargas de fadiga.',
        tags: ['Cálculo de Pré-Carga', 'Diagrama de Junta', 'Fadiga']
      },
      {
        name: 'Estratégias Avançadas de Aperto',
        level: 95,
        highlight: true,
        description: 'Parametrização de Torque-Ângulo, Ponto de Escoamento (Yield Control), e monitoramento por derivada (dM/dα).',
        tags: ['Torque-Ângulo', 'Yield Tightening', 'Envelopes']
      },
      {
        name: 'Auditoria Estatística (ISO 5393 & VDI/VDE 2645-2)',
        level: 92,
        description: 'Ensaios dinâmicos em simuladores de junta dura/flexível, cálculo de Cm, Cmk, Cp e Cpk para auditorias IATF 16949.',
        tags: ['Cmk > 1.67', 'ISO 5393', 'VDI/VDE 2645']
      },
      {
        name: 'Tribologia & Coeficientes de Atrito (ISO 16047)',
        level: 90,
        description: 'Análise de atrito de rosca e cabeça com revestimentos especiais (Geomet, ZN, Fosfato, Cera MoS2).',
        tags: ['Atrito µ_th / µ_b', 'ISO 16047', 'Schatz']
      }
    ]
  },
  {
    id: 'industrial-automation',
    title: 'Automação Industrial & Indústria 4.0',
    iconName: 'Cpu',
    description: 'Integração de hardware de campo, sistemas de controle em tempo real, robótica colaborativa e protocolos digitais com sistemas de gestão corporativos.',
    skills: [
      {
        name: 'Open Protocol & Redes Ethernet Industriais',
        level: 94,
        highlight: true,
        description: 'Integração de controladores de aperto via TCP/IP sockets nativos Open Protocol, PROFINET e Ethernet/IP.',
        tags: ['TCP/IP MID', 'PROFINET', 'Ethernet/IP']
      },
      {
        name: 'CLPs Siemens & Rockwell (TIA Portal / Studio 5000)',
        level: 88,
        description: 'Programação de lógica ladder e texto estruturado (SCL), controle de intertravamento de segurança e receitas de montagem.',
        tags: ['TIA Portal', 'S7-1500', 'Safety PLC']
      },
      {
        name: 'Poka-Yoke & Rastreabilidade MES / Scada',
        level: 91,
        description: 'Gravação de rastreabilidade unitária por VIN/QR-Code, braços de reação com encoders de coordenadas (X, Y, Z).',
        tags: ['MES', 'Poka-Yoke de Posição', 'QR-Code']
      },
      {
        name: 'Robótica de Manipulação e Aperto',
        level: 85,
        description: 'Integração de fusos automáticos em braços robóticos industriais de 6 eixos (KUKA, ABB, Fanuc).',
        tags: ['KUKA', 'Fanuc', 'Fusos Automáticos']
      }
    ]
  },
  {
    id: 'smart-tooling',
    title: 'Hardware & Equipamentos Especializados',
    iconName: 'Wrench',
    description: 'Configuração, manutenção, parametrização e calibração dos principais ecossistemas mundiais de ferramentas inteligentes.',
    skills: [
      {
        name: 'Atlas Copco (Power Focus 4000/6000, Tensor, STB)',
        level: 95,
        highlight: true,
        description: 'Parametrização avançada de PSETs, Multistep, TurboTight, QuickStick e integração ToolsNet.',
        tags: ['Power Focus 6000', 'ToolsNet', 'Tensor STR']
      },
      {
        name: 'Desoutter (CVI3, EPBC, Delta Torquímetro Digital)',
        level: 90,
        description: 'Configuração de sequenciadores virtuais, comunicação com CVI Fusion e controle de calibração.',
        tags: ['CVI3', 'Delta Torquímetro', 'CVI Net']
      },
      {
        name: 'Bosch Rexroth & Cleco Apex Tooling',
        level: 86,
        description: 'Fusos de aperto modulares para máquinas especiais, sistemas multi-fuso sincronizados.',
        tags: ['Rexroth CS351', 'Cleco mPro400']
      },
      {
        name: 'Instrumentação de Medição e Bancadas Dinâmicas',
        level: 92,
        description: 'Transdutores rotativos com ângulo, células de carga piezoelétricas e torquímetros eletrônicos com giroscópio.',
        tags: ['Transdutores Rotativos', 'Giroscópio', 'Kistler']
      }
    ]
  }
];

export const STANDARD_FASTENERS = [
  { size: 'M4', nominalDiameter: 4, pitch: 0.7, stressArea: 8.78 },
  { size: 'M5', nominalDiameter: 5, pitch: 0.8, stressArea: 14.2 },
  { size: 'M6', nominalDiameter: 6, pitch: 1.0, stressArea: 20.1 },
  { size: 'M8', nominalDiameter: 8, pitch: 1.25, stressArea: 36.6 },
  { size: 'M10', nominalDiameter: 10, pitch: 1.5, stressArea: 58.0 },
  { size: 'M12', nominalDiameter: 12, pitch: 1.75, stressArea: 84.3 },
  { size: 'M14', nominalDiameter: 14, pitch: 2.0, stressArea: 115.0 },
  { size: 'M16', nominalDiameter: 16, pitch: 2.0, stressArea: 157.0 },
  { size: 'M18', nominalDiameter: 18, pitch: 2.5, stressArea: 192.0 },
  { size: 'M20', nominalDiameter: 20, pitch: 2.5, stressArea: 245.0 },
  { size: 'M24', nominalDiameter: 24, pitch: 3.0, stressArea: 353.0 },
  { size: 'M30', nominalDiameter: 30, pitch: 3.5, stressArea: 561.0 },
];
