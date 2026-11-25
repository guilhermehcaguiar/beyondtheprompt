export const promptExamples = [
  {
    title: 'Matemática',
    vague: 'Resolva esta equação.',
    prompt:
      'Estou praticando equações do segundo grau. Para x² − 5x + 6 = 0, dê uma pista sobre fatoração. Espere minha tentativa, depois peça que eu verifique as duas raízes por substituição.',
  },
  {
    title: 'Redação',
    vague: 'Escreva uma redação sobre mobilidade.',
    prompt:
      'Leia meu parágrafo fictício sobre mobilidade urbana. Identifique a tese e uma lacuna na argumentação. Faça duas perguntas que me ajudem a revisar. Preserve minha voz e deixe a reescrita comigo.',
  },
  {
    title: 'Programação',
    vague: 'Arrume minha função.',
    prompt:
      'Revise esta função JavaScript que calcula uma média. Descreva o comportamento atual com lista vazia, com uma nota zero e com números negativos. Proponha casos de teste e aguarde minha hipótese antes de sugerir uma alteração.',
  },
  {
    title: 'Pesquisa',
    vague: 'Me dê cinco fontes sobre poluição.',
    prompt:
      'Ajude-me a buscar dados sobre qualidade do ar em minha cidade. Sugira termos de busca, órgãos que publicam medições e critérios para comparar datas e métodos. Sinalize fontes que precisam ser localizadas, sem criar referências.',
  },
  {
    title: 'Idiomas',
    vague: 'Me ensine inglês.',
    prompt:
      'Simule uma conversa em inglês nível A2 em uma biblioteca. Faça uma pergunta por vez. Após minha resposta, corrija um erro relevante, explique em português e proponha outra frase para eu praticar.',
  },
  {
    title: 'Organização dos estudos',
    vague: 'Faça um plano de estudos.',
    prompt:
      'Tenho três sessões de 25 minutos para revisar funções. Monte um plano em tabela com recuperação sem consulta, correção e revisão. Inclua uma atividade que eu consiga avaliar por conta própria em cada sessão.',
  },
  {
    title: 'Desenvolvimento de projetos',
    vague: 'Faça um app para minha turma.',
    prompt:
      'Estamos planejando um app local para organizar as tarefas de uma turma fictícia. Faça três perguntas sobre o problema, proponha um recorte para uma semana e liste os critérios de pronto em tópicos. Evite contas e dados pessoais.',
  },
];

export const codeExamples = [
  {
    title: 'JavaScript · média com contrato definido',
    language: 'javascript',
    code: `function media(notas) {
  if (!Array.isArray(notas)) {
    throw new TypeError("Esperava uma lista de notas");
  }
  if (!notas.every(Number.isFinite)) {
    throw new TypeError("As notas devem ser números finitos");
  }
  if (notas.length === 0) return null;
  const soma = notas.reduce((total, nota) => total + nota, 0);
  return soma / notas.length;
}

console.assert(media([0, 8]) === 4);
console.assert(media([]) === null);`,
    note: 'Uma sugestão que divide a soma pelo tamanho devolve NaN para uma lista vazia. Usar filter(Boolean) descartaria a nota zero. Os testes acima cobrem os dois casos, e o contrato define null para a ausência de notas.',
  },
  {
    title: 'Python · preservar a separação entre consulta e dados',
    language: 'python',
    code: `def buscar_livro(cursor, titulo):
    consulta = "SELECT titulo FROM livros WHERE titulo = %s"
    cursor.execute(consulta, (titulo,))
    return cursor.fetchall()`,
    note: 'Este trecho é um exemplo de leitura usando um driver compatível com %s, como Psycopg. Interpolar o título na consulta mistura texto fornecido por alguém com a estrutura da instrução. O parâmetro mantém as responsabilidades separadas. Revise o estilo de placeholders na documentação do driver e use uma conta com permissões mínimas.',
  },
];

export const checklist = [
  'Verifiquei afirmações importantes em fontes confiáveis?',
  'Conferi as referências e o que elas realmente sustentam?',
  'Consigo explicar a resposta com minhas palavras?',
  'Questionei generalizações e possíveis vieses?',
  'Removi dados pessoais, segredos e informações de terceiros?',
  'Respeitei a autoria e as regras da atividade?',
  'Usei a ferramenta para apoiar meu próprio raciocínio?',
];
