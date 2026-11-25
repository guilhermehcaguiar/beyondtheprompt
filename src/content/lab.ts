export const experiments = [
  {
    id: 'tokenizacao',
    title: 'Simulador de tokenização',
    description: 'Observe como o mesmo texto pode ser dividido em unidades menores.',
    challenge:
      'Digite “Inteligência artificial!” e depois apague o ponto de exclamação. Compare as unidades coloridas e os totais.',
  },
  {
    id: 'previsao',
    title: 'Previsão do próximo token',
    description: 'Altere a temperatura e veja como o contexto muda as opções de continuação.',
    challenge:
      'Compare as chances do primeiro token a 0,5 e 1,5. Em seguida, escolha duas continuações diferentes e compare as opções que aparecem.',
  },
  {
    id: 'construtor',
    title: 'Construtor de prompts',
    description: 'Transforme uma ideia em uma instrução estruturada.',
    challenge: 'Carregue “Revisar funções”, mude uma restrição e localize a alteração no prompt gerado.',
  },
  {
    id: 'comparador',
    title: 'Comparador de prompts',
    description: 'Compare respostas simuladas para instruções sobre a mesma tarefa.',
    challenge:
      'Selecione “Revisar um conteúdo”. Identifique qual instrução preserva a tentativa do estudante e a frase do prompt que produz esse efeito.',
  },
  {
    id: 'rede-neural',
    title: 'Rede neural interativa',
    description: 'Manipule entradas e pesos, e acompanhe o cálculo até a saída.',
    challenge:
      'Deixe as duas entradas positivas e reduza um dos pesos. Observe quando a saída do neurônio oculto chega a zero.',
  },
  {
    id: 'critico',
    title: 'Desafio de pensamento crítico',
    description: 'Identifique o problema principal em cada resposta fictícia.',
    challenge:
      'Leia dois casos e classifique o problema principal. Compare sua resposta com o feedback e diga qual verificação faria primeiro.',
  },
  {
    id: 'vies',
    title: 'Demonstração de viés',
    description: 'Altere a proporção de exemplos de treino e compare os erros em um teste equilibrado.',
    challenge:
      'Compare 50 e 90 exemplos da classe A. Observe o que acontece com os acertos na classe B quando ela fica sub-representada no treino.',
  },
] as const;

export const promptFields = [
  { id: 'objetivo', label: 'Objetivo', placeholder: 'O que você quer alcançar?' },
  { id: 'contexto', label: 'Contexto', placeholder: 'Quais informações mudam a tarefa?' },
  { id: 'tarefa', label: 'Tarefa', placeholder: 'Qual ação você espera?' },
  { id: 'restricoes', label: 'Restrições', placeholder: 'Que limites precisam ser respeitados?' },
  { id: 'formato', label: 'Formato esperado', placeholder: 'Como a resposta deve ser organizada?' },
  { id: 'exemplos', label: 'Exemplos opcionais', placeholder: 'Mostre uma entrada ou saída de exemplo.' },
] as const;

export type PromptField = (typeof promptFields)[number]['id'];
export const builderExamples: Record<string, Partial<Record<PromptField, string>>> = {
  'Revisar funções': {
    objetivo: 'Reconhecer como o coeficiente afeta a reta.',
    contexto: 'Estou revisando funções do primeiro grau.',
    tarefa: 'Apresente duas funções e peça que eu compare suas inclinações.',
    restricoes: 'Espere minha tentativa e dê uma pista se eu errar.',
    formato: 'Uma pergunta por vez.',
    exemplos: 'y = 2x + 1',
  },
  'Testar uma função': {
    objetivo: 'Encontrar casos que meu código deixa passar.',
    contexto: 'Escrevi uma função de média em JavaScript.',
    tarefa: 'Sugira casos de teste com saída esperada.',
    restricoes: 'Use dados fictícios. Inclua lista vazia e nota zero.',
    formato: 'Tabela com entrada, saída e motivo.',
  },
  'Praticar inglês': {
    objetivo: 'Pedir informações em inglês com autonomia.',
    contexto: 'Meu nível é A2 e o cenário é uma biblioteca.',
    tarefa: 'Simule uma conversa e corrija um erro por vez.',
    restricoes: 'Espere minha resposta antes de continuar.',
    formato: 'Pergunta em inglês e, depois da tentativa, feedback em português.',
  },
};

export const comparisons = [
  {
    title: 'Revisar um conteúdo',
    task: 'Praticar equações do primeiro grau antes de uma avaliação.',
    vague: {
      input: 'Me ensine equações.',
      output:
        'Uma equação tem uma igualdade. Para resolver 2x + 3 = 7, subtraia 3 de ambos os lados, divida por 2 e encontre x = 2.',
    },
    structured: {
      input:
        'Estou praticando equações do primeiro grau. Apresente um exercício e espere minha tentativa. Se eu errar, dê uma pista. Evite revelar o resultado.',
      output: 'Resolva 2x + 3 = 7. Que operação você pode aplicar aos dois lados para isolar o termo 2x?',
    },
    note: 'A primeira instrução produz uma explicação pronta. O contexto da prova e a restrição de esperar preservam a tentativa do estudante.',
  },
  {
    title: 'Preparar uma pesquisa',
    task: 'Encontrar dados de qualidade do ar para uma apresentação.',
    vague: {
      input: 'Faça um resumo sobre poluição do ar.',
      output: 'Poluição do ar afeta o ambiente e a saúde. Trânsito e atividades industriais podem contribuir.',
    },
    structured: {
      input:
        'Vou comparar qualidade do ar entre bairros. Sugira três termos de busca, indique quais unidades e períodos checar e deixe as conclusões para depois da coleta.',
      output:
        'Busque “monitoramento PM2,5”, “estações de qualidade do ar” e o nome da cidade. Anote unidade, período e localização de cada estação.',
    },
    note: 'A instrução detalhada transforma uma tarefa ampla em um roteiro de pesquisa. Os dados ainda precisam ser encontrados e conferidos.',
  },
];

export const challengeOptions = [
  'Informação falsa',
  'Ausência de referência',
  'Confiança excessiva',
  'Viés',
  'Risco de privacidade',
  'Erro de interpretação',
] as const;
export const challenges = [
  {
    scenario: 'Em uma atividade de astronomia, você pergunta qual é o maior planeta do Sistema Solar.',
    response: 'É Saturno, cuja massa supera a de todos os outros planetas.',
    answer: 0,
    feedback:
      'O maior e mais massivo é Júpiter. Compare com a descrição dos planetas no material da disciplina e corrija antes de citar.',
  },
  {
    scenario: 'Você solicita dados sobre abandono escolar para uma apresentação.',
    response: 'O abandono caiu 18% na região no ano passado, segundo estudos recentes.',
    answer: 1,
    feedback:
      'A resposta dá um número sem indicar relatório, ano de referência, local e população. Localize a publicação original e verifique como o indicador foi calculado.',
  },
  {
    scenario: 'Você pergunta se uma técnica de estudo pode ajudar em uma prova.',
    response: 'Esse método garante nota máxima para qualquer estudante.',
    answer: 2,
    feedback:
      'A promessa é absoluta. Resultados dependem de conteúdo, condições de estudo e conhecimentos prévios. Procure evidências e avalie sua prática.',
  },
  {
    scenario: 'Você pede ajuda para montar equipes em uma feira de ciências.',
    response: 'Reserve a programação aos meninos, pois meninas costumam preferir a apresentação.',
    answer: 3,
    feedback:
      'A resposta usa um estereótipo para distribuir oportunidades. Considere interesses, habilidades e rodízio de funções.',
  },
  {
    scenario: 'Você quer criar um gráfico de frequência sem expor colegas.',
    response: 'Envie nomes, e-mails e faltas individuais para que eu possa montar o gráfico.',
    answer: 4,
    feedback:
      'Totais por período podem bastar. Use dados agregados, fictícios ou autorizados, sem expor informações identificáveis.',
  },
  {
    scenario: 'O aviso diz que a entrega de dia 10 foi adiada por dois dias.',
    response: 'A entrega agora é dois dias a partir de hoje, dia 6.',
    answer: 5,
    feedback:
      'O adiamento parte da data original. A nova data é dia 12. Confira também eventuais retificações oficiais.',
  },
];

export const predictionBranches = [
  { word: 'ajudar', probability: 0.58, next: ['no estudo.', 'na revisão.', 'na pesquisa.'] },
  { word: 'gerar', probability: 0.29, next: ['exemplos.', 'imagens.', 'perguntas.'] },
  { word: 'aprender', probability: 0.13, next: ['padrões.', 'representações.', 'associações.'] },
];
