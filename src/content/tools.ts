export const toolCategories = [
  'Assistentes',
  'Pesquisa',
  'Programação',
  'Estudos',
  'Produtividade',
  'Imagens',
  'Aprendizado de máquina',
] as const;
type Tool = {
  name: string;
  category: (typeof toolCategories)[number];
  description: string;
  applications: string;
  limitation: string;
  guidance: string;
  url: string;
};
export const tools: Tool[] = [
  {
    name: 'ChatGPT',
    category: 'Assistentes',
    description: 'Assistente conversacional da OpenAI para tarefas em linguagem natural.',
    applications: 'Gerar perguntas de prática, esboçar ideias e comentar um rascunho.',
    limitation: 'Pode apresentar erros ou referências sem sustentação.',
    guidance: 'Peça uma pista de cada vez e valide afirmações no seu material.',
    url: 'https://chatgpt.com/overview/',
  },
  {
    name: 'Claude',
    category: 'Assistentes',
    description: 'Assistente da Anthropic para trabalhar com texto e outras tarefas.',
    applications: 'Analisar a estrutura de um texto e comparar hipóteses.',
    limitation: 'Uma análise fluente pode omitir detalhes importantes.',
    guidance: 'Use textos próprios ou autorizados e compare conclusões com os trechos originais.',
    url: 'https://claude.com/product/overview',
  },
  {
    name: 'Gemini',
    category: 'Assistentes',
    description: 'Assistente do Google para perguntas, escrita e outras tarefas.',
    applications: 'Explorar exemplos, estruturar uma pauta e discutir conceitos.',
    limitation: 'Recursos dependem da conta e do contexto. As respostas podem conter erros.',
    guidance: 'Use exemplos fictícios e confirme fatos em material de referência.',
    url: 'https://support.google.com/gemini/',
  },
  {
    name: 'Microsoft Copilot',
    category: 'Produtividade',
    description: 'Assistente da Microsoft com experiências que variam conforme o produto e o tipo de conta.',
    applications: 'Organizar ideias e elaborar rascunhos para revisão.',
    limitation: 'Integrações e condições variam entre produtos e contas.',
    guidance: 'Confirme a edição usada e mantenha documentos escolares fora de integrações não autorizadas.',
    url: 'https://www.microsoft.com/pt-br/copilot/solutions/individuals',
  },
  {
    name: 'Perplexity',
    category: 'Pesquisa',
    description: 'Ferramenta de pesquisa que apresenta respostas acompanhadas de referências.',
    applications: 'Descobrir fontes e termos para uma pesquisa inicial.',
    limitation: 'Ter um link na resposta não garante que ele sustente a afirmação.',
    guidance: 'Abra as fontes originais e verifique data, escopo e autoria.',
    url: 'https://www.perplexity.ai/help-center/en/articles/10352155-what-is-perplexity',
  },
  {
    name: 'NotebookLM / Gemini Notebook',
    category: 'Estudos',
    description: 'Ferramenta do Google para explorar materiais adicionados a um caderno.',
    applications: 'Localizar partes de uma leitura e formular perguntas de revisão.',
    limitation: 'Uma síntese pode simplificar argumentos ou omitir exceções.',
    guidance: 'Consulte os trechos citados e use apenas materiais que você tem autorização para adicionar.',
    url: 'https://support.google.com/gemininotebook/',
  },
  {
    name: 'GitHub Copilot',
    category: 'Programação',
    description: 'Assistente de programação com sugestões e conversa em ferramentas compatíveis.',
    applications: 'Explorar casos de teste, explicar código e avaliar alternativas.',
    limitation: 'Pode sugerir APIs inexistentes, código incorreto ou padrões inseguros.',
    guidance: 'Leia cada alteração, confira a documentação e execute seus testes locais.',
    url: 'https://docs.github.com/en/copilot',
  },
  {
    name: 'Hugging Face Hub',
    category: 'Aprendizado de máquina',
    description: 'Plataforma para publicar e consultar modelos, datasets e demonstrações.',
    applications: 'Ler cartões de modelos e comparar dados, licenças e avaliações.',
    limitation: 'A documentação e as licenças variam a cada publicação.',
    guidance: 'Confira procedência, licença e limitações antes de baixar ou reutilizar conteúdo.',
    url: 'https://huggingface.co/docs/hub/index',
  },
  {
    name: 'Google Teachable Machine',
    category: 'Aprendizado de máquina',
    description:
      'Ferramenta educacional para experimentar classificadores com exemplos de imagem, som ou pose.',
    applications: 'Comparar acertos com diferentes condições de coleta e diferentes classes.',
    limitation: 'O resultado muda conforme a quantidade e a variedade dos exemplos.',
    guidance: 'Use objetos e exemplos autorizados e teste com entradas novas.',
    url: 'https://teachablemachine.withgoogle.com/',
  },
  {
    name: 'Adobe Firefly',
    category: 'Imagens',
    description: 'Ferramentas de IA generativa da Adobe voltadas à criação visual.',
    applications: 'Explorar direções visuais e rascunhar ilustrações conceituais.',
    limitation: 'Proporções, textos e detalhes podem exigir correções.',
    guidance: 'Revise permissões e termos de uso antes de publicar qualquer imagem gerada.',
    url: 'https://www.adobe.com/br/products/firefly.html',
  },
];

export function toolSlug(name: string) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
}
