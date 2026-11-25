export const site = {
  name: 'Beyond the Prompt',
  subtitle: 'Inteligência artificial além das respostas.',
  description:
    'Aprenda a utilizar a inteligência artificial para ampliar suas capacidades, sem abrir mão do seu próprio raciocínio.',
  locale: 'pt-BR',
  url: '',
  socialImage: { url: '/social.png', width: 1200, height: 630 },
};

export const institution = {
  name: 'Uninassau',
  adviser: 'David Wilber',
  members: [
    'Gabriel Fernando',
    'Guilherm Aguiar',
    'Arthur Niceas',
    'Lucas Cardoso',
    'Felipe Paskevicius',
    'Lucas Barreto',
  ],
  credits: 'Conteúdo, design e desenvolvimento pela equipe do projeto de extensão.',
};

export const lessons = [
  {
    slug: 'fundamentos',
    title: 'Fundamentos da IA',
    short: 'Fundamentos',
    description: 'Distinga regras, aprendizado de máquina e IA generativa com exemplos do cotidiano.',
  },
  {
    slug: 'como-funciona',
    title: 'Como a IA funciona',
    short: 'Como funciona',
    description: 'Dos dados de treino ao próximo token. Veja o que acontece por trás da resposta.',
  },
  {
    slug: 'prompts',
    title: 'Engenharia de prompt',
    short: 'Prompts',
    description: 'Formule instruções claras, teste versões e aprenda a verificar os resultados.',
  },
  {
    slug: 'estudos',
    title: 'IA nos estudos',
    short: 'Estudos',
    description: 'Use a IA para praticar, receber pistas e construir suas próprias explicações.',
  },
  {
    slug: 'programacao',
    title: 'IA na programação',
    short: 'Programação',
    description: 'Revise exemplos em JavaScript e Python, identifique falhas e escreva testes.',
  },
  {
    slug: 'uso-responsavel',
    title: 'Uso responsável',
    short: 'Uso responsável',
    description: 'Reconheça alucinações, vieses e riscos de privacidade antes de agir.',
  },
] as const;

export type LessonSlug = (typeof lessons)[number]['slug'];

export const resources = {
  laboratorio: {
    slug: 'laboratorio',
    title: 'Laboratório',
    description: 'Sete experiências sobre tokens, prompts, redes neurais, viés e pensamento crítico.',
  },
  quiz: {
    slug: 'quiz',
    title: 'Quiz',
    description: 'Teste seu conhecimento em sete categorias com feedback comentado.',
  },
  ferramentas: {
    slug: 'ferramentas',
    title: 'Ferramentas',
    description: 'Compare ferramentas de pesquisa, estudos, programação e criação.',
  },
  glossario: {
    slug: 'glossario',
    title: 'Glossário',
    description: 'Consulte termos de inteligência artificial com definições e exemplos.',
  },
  referencias: {
    slug: 'referencias',
    title: 'Referências',
    description: 'Encontre artigos, cursos e guias para aprofundar seus estudos.',
  },
  sobre: {
    slug: 'sobre',
    title: 'Sobre o projeto',
    description: 'Conheça o projeto de extensão e sua equipe.',
  },
} as const;

export const resourceList = Object.values(resources);

export const mainNavigation = [
  { href: '/#trilha', label: 'Trilha' },
  ...[resources.laboratorio, resources.quiz, resources.ferramentas, resources.glossario].map(
    ({ slug, title }) => ({ href: `/${slug}/`, label: title }),
  ),
];
