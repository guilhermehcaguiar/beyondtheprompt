export const verifiedOn = '25/11/2026';

export const references = {
  google: {
    group: 'Fundamentos e modelos',
    title: 'Machine Learning Crash Course',
    author: 'Google for Developers',
    url: 'https://developers.google.com/machine-learning/crash-course',
    note: 'Curso gratuito sobre regressão, classificação, redes e dados.',
  },
  mit: {
    group: 'Fundamentos e modelos',
    title: 'Introduction to Deep Learning',
    author: 'MIT 6.S191',
    url: 'https://introtodeeplearning.com/',
    note: 'Aulas e laboratórios para aprofundar redes neurais.',
  },
  hf: {
    group: 'Fundamentos e modelos',
    title: 'LLM Course',
    author: 'Hugging Face Learn',
    url: 'https://huggingface.co/learn/llm-course/chapter1/1',
    note: 'Curso prático sobre Transformers, tokenizadores e treinamento.',
  },
  transformer: {
    group: 'Fundamentos e modelos',
    title: 'Attention Is All You Need',
    author: 'Vaswani et al.',
    url: 'https://arxiv.org/abs/1706.03762',
    note: 'Artigo de 2017 que introduz a arquitetura Transformer.',
  },
  rag: {
    group: 'Fundamentos e modelos',
    title: 'Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks',
    author: 'Lewis et al.',
    url: 'https://arxiv.org/abs/2005.11401',
    note: 'Artigo sobre recuperação de informação combinada à geração.',
  },
  stanford: {
    group: 'Fundamentos e modelos',
    title: 'Holistic Evaluation of Language Models',
    author: 'Stanford CRFM',
    url: 'https://arxiv.org/abs/2211.09110',
    note: 'Estudo sobre avaliação de modelos por múltiplos cenários e critérios.',
  },
  unesco: {
    group: 'Educação, ética e privacidade',
    title: 'Guidance for Generative AI in Education and Research',
    author: 'UNESCO',
    url: 'https://www.unesco.org/en/articles/guidance-generative-ai-education-and-research',
    note: 'Orientações para adoção de IA generativa na educação com foco em autonomia e inclusão.',
  },
  nist: {
    group: 'Educação, ética e privacidade',
    title: 'AI Risk Management Framework',
    author: 'NIST',
    url: 'https://www.nist.gov/itl/ai-risk-management-framework',
    note: 'Estrutura para mapear, medir e administrar riscos de sistemas de IA.',
  },
  anpd: {
    group: 'Educação, ética e privacidade',
    title: 'Portal da Agência Nacional de Proteção de Dados',
    author: 'ANPD',
    url: 'https://www.gov.br/anpd/pt-br',
    note: 'Orientações e materiais brasileiros sobre proteção de dados pessoais.',
  },
  mdn: {
    group: 'Programação e prompts',
    title: 'Guia de JavaScript',
    author: 'MDN Web Docs',
    url: 'https://developer.mozilla.org/pt-BR/docs/Web/JavaScript',
    note: 'Referência para verificar sintaxe, APIs e exemplos.',
  },
  python: {
    group: 'Programação e prompts',
    title: 'Documentação do Python',
    author: 'Python Software Foundation',
    url: 'https://docs.python.org/pt-br/3/',
    note: 'Tutoriais, referência da linguagem e biblioteca padrão.',
  },
  prompt: {
    group: 'Programação e prompts',
    title: 'Prompt engineering',
    author: 'Google Cloud',
    url: 'https://cloud.google.com/discover/what-is-prompt-engineering',
    note: 'Introdução a instruções, exemplos e refinamento de prompts.',
  },
};

export type ReferenceId = keyof typeof references;
