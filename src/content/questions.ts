import type { LessonSlug } from './site';

export const categories = {
  fundamentos: { title: 'Fundamentos', lesson: '/fundamentos/' },
  funcionamento: { title: 'Funcionamento da IA', lesson: '/como-funciona/' },
  prompts: { title: 'Engenharia de prompt', lesson: '/prompts/' },
  estudos: { title: 'IA nos estudos', lesson: '/estudos/' },
  programacao: { title: 'Programação', lesson: '/programacao/' },
  etica: { title: 'Ética e segurança', lesson: '/uso-responsavel/' },
  critico: { title: 'Pensamento crítico', lesson: '/uso-responsavel/#checagem' },
} as const satisfies Record<string, { title: string; lesson: `/${LessonSlug}/${string}` }>;

export type Category = keyof typeof categories;
export type Difficulty = 'Introdutório' | 'Intermediário';
type Option = { text: string; reason: string; correct: boolean };
export type Question = {
  id: string;
  category: Category;
  difficulty: Difficulty;
  prompt: string;
  options: Option[];
};

function question(
  id: string,
  category: Category,
  difficulty: Difficulty,
  prompt: string,
  answer: [string, string],
  ...distractors: [string, string][]
): Question {
  return {
    id,
    category,
    difficulty,
    prompt,
    options: [answer, ...distractors].map(([text, reason], index) => ({ text, reason, correct: index === 0 })),
  };
}

const I = 'Introdutório';
const M = 'Intermediário';

export const questions = [
  question(
    'f1',
    'fundamentos',
    I,
    'Uma escola configura um aviso que dispara sempre que o relógio marca 18h. O que descreve essa decisão?',
    ['Uma regra explícita.', 'A condição foi definida diretamente e determina o aviso.'],
    ['Um classificador treinado.', 'O horário foi configurado, sem ajuste em exemplos rotulados.'],
    ['Um gerador probabilístico.', 'A decisão segue a condição do relógio e não usa amostragem.'],
  ),
  question(
    'f2',
    'fundamentos',
    I,
    'Na caixa de e-mail, qual ação é um exemplo de geração?',
    ['Escrever um rascunho de resposta.', 'O sistema produz uma sequência nova de texto.'],
    ['Marcar a mensagem como spam.', 'Essa etapa atribui um rótulo.'],
    ['Arquivar tudo que foi recebido ontem.', 'Essa etapa segue um critério temporal explícito.'],
  ),
  question(
    'f3',
    'fundamentos',
    M,
    'Um filtro apresenta 80% para spam, mas marca como spam toda mensagem acima de 70%. Como descrever a escolha final?',
    ['Determinística dados o escore e o limiar.', 'O mesmo escore cruza o mesmo limiar em toda repetição.'],
    ['Aleatória porque há um percentual.', 'O percentual alimenta uma regra fixa, sem sorteio.'],
    ['Generativa porque a saída é um rótulo novo.', 'A regra atribui uma classe a uma entrada.'],
  ),
  question(
    'f4',
    'fundamentos',
    M,
    'Um detector foi treinado com fotos diurnas e falha à noite. Que hipótese checar primeiro?',
    [
      'As condições de uso diferem das condições de treino.',
      'Iluminação muda os sinais disponíveis e pode afetar a generalização.',
    ],
    [
      'Toda rede precisa escrever suas próprias regras simbólicas.',
      'Redes podem aprender padrões sem extrair regras explícitas.',
    ],
    [
      'Aumentar o tamanho do texto do prompt corrige a captura.',
      'A questão central é a qualidade e diversidade das entradas.',
    ],
  ),
  question(
    'f5',
    'fundamentos',
    I,
    'O que torna uma rede “profunda” em deep learning?',
    ['Usar várias camadas de transformação.', 'Representações vão sendo transformadas em etapas.'],
    ['Consultar uma base de dados maior na inferência.', 'A profundidade é uma característica da arquitetura.'],
    ['Sempre produzir texto como saída.', 'Redes profundas também podem classificar ou estimar valores.'],
  ),

  question(
    'm1',
    'funcionamento',
    I,
    'Um sistema é treinado com fotos acompanhadas do nome da espécie. Qual é o regime de aprendizado?',
    ['Supervisionado.', 'Cada foto vem acompanhada do alvo que o sistema tenta prever.'],
    ['Não supervisionado.', 'Há rótulos fornecidos para os exemplos.'],
    ['Por reforço.', 'O cenário descreve alvos por exemplo, sem um ciclo de ações e recompensas.'],
  ),
  question(
    'm2',
    'funcionamento',
    M,
    'Se exemplos de teste também aparecem no treino, por que o resultado pode enganar?',
    [
      'O resultado pode medir familiaridade no lugar de generalização.',
      'Uma avaliação independente requer casos ainda não usados no ajuste.',
    ],
    ['O treino sempre perde precisão.', 'Repetição de exemplos pode elevar artificialmente a avaliação.'],
    ['Os pesos são apagados durante o teste.', 'O teste usa os pesos aprendidos para avaliar saídas.'],
  ),
  question(
    'm3',
    'funcionamento',
    M,
    'Ao baixar a temperatura positiva de amostragem, qual efeito esperar sem outros filtros?',
    [
      'As opções de maior pontuação ganham mais probabilidade.',
      'Dividir pontuações por valor menor amplia diferenças antes da normalização.',
    ],
    ['As saídas ficam mais verdadeiras.', 'A temperatura redistribui chances e não valida fatos.'],
    ['A janela de contexto aumenta.', 'A temperatura não altera o limite de tokens usados como contexto.'],
  ),
  question(
    'm4',
    'funcionamento',
    I,
    'Um manual atualizado é recuperado e inserido no contexto antes da resposta. Qual técnica o cenário descreve?',
    ['RAG.', 'Recuperação de conteúdo fundamenta a entrada da geração.'],
    ['Fine-tuning.', 'Nenhum parâmetro foi reajustado nesse fluxo.'],
    ['Tokenização.', 'A divisão em identificadores é uma etapa diferente.'],
  ),
  question(
    'm5',
    'funcionamento',
    M,
    'Qual processo permite que uma posição incorpore informação de outras posições no Transformer?',
    [
      'Atenção, combinando valores com pesos calculados.',
      'A compatibilidade entre consultas e chaves orienta a combinação.',
    ],
    [
      'Tokenização, que atribui texto a números.',
      'O vocabulário delimita unidades e não combina representações do contexto.',
    ],
    ['Temperatura, que adiciona posições à janela.', 'A temperatura ajusta a distribuição na geração.'],
  ),

  question(
    'p1',
    'prompts',
    I,
    'Você está travado em uma questão e quer preservar a chance de resolvê-la. Qual prompt atende ao objetivo?',
    [
      'Dê uma pista sobre meu primeiro passo e espere minha tentativa.',
      'A instrução delimita a ajuda e reserva a resolução ao estudante.',
    ],
    ['Resolva a questão e mostre todos os passos.', 'Você verá a solução antes de praticar.'],
    ['Me ensine tudo sobre o tema.', 'A tarefa é ampla e não define como a ajuda deve avançar.'],
  ),
  question(
    'p2',
    'prompts',
    I,
    'Um formulário precisa extrair assunto e prazo de cada mensagem. O que torna a instrução verificável?',
    [
      'Pedir os dois campos em formato fixo e indicar o que fazer se o prazo faltar.',
      'Isso define a estrutura e um caso de fronteira.',
    ],
    ['Pedir uma resposta convincente.', 'O critério não diz que campos são obrigatórios.'],
    [
      'Adicionar mensagens parecidas sem mostrar saídas.',
      'As mensagens sozinhas não estabelecem o contrato de saída.',
    ],
  ),
  question(
    'p3',
    'prompts',
    M,
    'Você inclui três pares de entrada e saída para mostrar como rotular comentários. Como classificar a estratégia?',
    ['Few-shot no contexto.', 'Os exemplos demonstram o padrão durante a inferência.'],
    ['Fine-tuning supervisionado.', 'Incluir exemplos no prompt não reajusta pesos.'],
    ['Zero-shot.', 'O cenário inclui exemplos explícitos da tarefa.'],
  ),
  question(
    'p4',
    'prompts',
    M,
    'Duas versões do prompt serão comparadas. Qual procedimento produz evidência mais clara?',
    [
      'Usar o mesmo conjunto de casos e os mesmos critérios em ambas.',
      'Controlar casos e critérios ajuda a atribuir diferenças à instrução.',
    ],
    [
      'Testar a segunda versão apenas nos casos que ela acertou.',
      'A seleção favorece uma versão e distorce a comparação.',
    ],
    [
      'Usar o comprimento das respostas como medida geral de qualidade.',
      'Comprimento não mede, por exemplo, correção ou aderência.',
    ],
  ),
  question(
    'p5',
    'prompts',
    I,
    'Uma resposta atende ao formato e inclui números precisos. Qual etapa ainda é necessária?',
    [
      'Conferir fonte, unidade, data e contexto dos números.',
      'Seguir o formato não garante correspondência com os fatos.',
    ],
    ['Aceitar porque ela cumpriu as restrições.', 'A aderência formal não confirma a evidência.'],
    ['Pedir que use mais casas decimais.', 'Mais dígitos não fornecem comprovação.'],
  ),

  question(
    'e1',
    'estudos',
    I,
    'Qual atividade permite praticar recuperação ativa?',
    [
      'Responder sem consulta, comparar com o material e corrigir.',
      'A sequência exige recuperar o conhecimento e usar feedback.',
    ],
    [
      'Ler primeiro o gabarito e copiar a melhor resposta.',
      'O estudante não pratica lembrar ou resolver sozinho.',
    ],
    [
      'Assistir a uma explicação e ignorar os exercícios.',
      'A compreensão precisa ser verificada em uma tentativa própria.',
    ],
  ),
  question(
    'e2',
    'estudos',
    I,
    'A escola exige declarar assistência de IA. O que fazer ao usar sugestões na revisão?',
    [
      'Registrar a contribuição conforme a orientação do professor.',
      'A transparência preserva o acordo da atividade.',
    ],
    [
      'Declarar somente se houver um parágrafo copiado.',
      'O requisito vale segundo a regra, inclusive para outras contribuições.',
    ],
    ['Apagar a conversa para preservar a autoria.', 'Apagar histórico não muda a assistência recebida.'],
  ),
  question(
    'e3',
    'estudos',
    M,
    'Qual indicador aponta para autonomia após uma sessão com IA?',
    [
      'Explicar e aplicar o método em um caso novo sem assistência.',
      'Transferência e explicação evidenciam entendimento.',
    ],
    ['A resposta do assistente ficou mais longa.', 'Volume não mede o que o estudante aprendeu.'],
    [
      'O visitante conseguiu decorar as palavras exatas da solução.',
      'Repetir uma solução não demonstra transferência.',
    ],
  ),
  question(
    'e4',
    'estudos',
    M,
    'Você quer pesquisar poluição na cidade. Como aproveitar sugestões da IA?',
    [
      'Gerar termos de busca e abrir boletins de medição para conferir dados.',
      'Sugestões direcionam a busca e os boletins sustentam as afirmações.',
    ],
    [
      'Usar os títulos de relatórios sugeridos como referências finais.',
      'É preciso localizar cada relatório e conferir seu conteúdo.',
    ],
    [
      'Pedir um único valor médio sem delimitar ano ou região.',
      'A medida precisa de contexto para ser interpretável.',
    ],
  ),
  question(
    'e5',
    'estudos',
    I,
    'Qual uso favorece a prática de um idioma?',
    [
      'Fazer um diálogo curto e refazer uma frase após feedback.',
      'O estudante produz texto e pratica uma correção acionável.',
    ],
    ['Entregar um diálogo escrito todo pelo assistente.', 'Isso elimina a prática de produzir as frases.'],
    [
      'Pedir correção de todos os aspectos simultaneamente e não tentar de novo.',
      'Um recorte e nova tentativa ajudam a consolidar o aprendizado.',
    ],
  ),

  question(
    'c1',
    'programacao',
    I,
    'Uma sugestão usa array.average() em JavaScript sem dependências. Qual é o próximo passo?',
    [
      'Verificar se o método existe na API usada e testar um exemplo.',
      'A documentação e um teste simples detectam APIs inventadas.',
    ],
    ['Usar a função porque seu nome é claro.', 'Um nome plausível não garante uma implementação.'],
    ['Trocar o nome do array por “notas”.', 'O nome da variável não altera a API.'],
  ),
  question(
    'c2',
    'programacao',
    M,
    'Uma função de máximo inicializa o resultado em zero. Qual teste revela a falha?',
    [
      'Uma lista com −8 e −3 e resultado esperado −3.',
      'Inicializar em zero mascara o máximo se todos os dados forem negativos.',
    ],
    ['Uma lista com 0 e 8.', 'Nesse caso, o resultado pode ser correto apesar do defeito.'],
    [
      'Uma lista com dois números positivos iguais.',
      'O valor inicial zero não expõe o defeito com entradas positivas.',
    ],
  ),
  question(
    'c3',
    'programacao',
    M,
    'Na revisão, você vê uma consulta construída concatenando a entrada. Qual correção reduz o risco?',
    [
      'Usar parâmetros do driver e permissões mínimas.',
      'Parâmetros preservam a separação entre o comando e os valores.',
    ],
    ['Renomear a variável de entrada.', 'O valor ainda é interpretado dentro do comando.'],
    [
      'Pedir ao usuário que digite apenas nomes reais.',
      'Um pedido na interface não protege a fronteira entre dados e instrução.',
    ],
  ),
  question(
    'c4',
    'programacao',
    I,
    'O assistente sugere uma refatoração longa em um código conhecido. Qual passo ajuda antes de aplicá-la?',
    [
      'Fixar o comportamento atual relevante em testes.',
      'Os testes revelam mudanças acidentais durante a refatoração.',
    ],
    [
      'Reescrever todos os testes para refletir a proposta.',
      'Os novos testes podem passar mesmo com regressões.',
    ],
    ['Remover os casos extremos antigos.', 'Casos extremos costumam guardar decisões importantes do contrato.'],
  ),
  question(
    'c5',
    'programacao',
    M,
    'Para encontrar o maior número, a solução ordena a lista de entrada. O que merece revisão?',
    [
      'Custo da ordenação e possível mutação da entrada.',
      'Uma passagem pode bastar e a ordem original pode fazer parte do contrato.',
    ],
    [
      'A quantidade de comentários como medida central de desempenho.',
      'Comentários não determinam o custo do algoritmo.',
    ],
    ['A troca do nome “lista” por “vetor”.', 'O nome não altera custo nem comportamento.'],
  ),

  question(
    's1',
    'etica',
    I,
    'Seu colega quer colar uma lista com nomes e históricos de saúde. Como orientar?',
    [
      'Criar exemplos fictícios que preservem só a estrutura da tarefa.',
      'Dados de saúde e informações de terceiros exigem proteção.',
    ],
    [
      'Remover apenas o primeiro nome e manter os identificadores.',
      'Outras informações podem permitir reidentificação.',
    ],
    [
      'Enviar os dados e pedir ao assistente que não os guarde.',
      'Uma instrução não governa o tratamento dos dados pelo serviço.',
    ],
  ),
  question(
    's2',
    'etica',
    M,
    'A acurácia média é alta, mas o modelo erra muito em fotos noturnas. O que fazer?',
    [
      'Medir desempenho por condição e revisar os dados de avaliação.',
      'A média pode ocultar falhas sistemáticas em casos pouco representados.',
    ],
    ['Publicar apenas a média geral.', 'A média omite o cenário que necessita de maior atenção.'],
    [
      'Remover as fotos noturnas sem mudar o uso previsto.',
      'Excluir o grupo do teste deixa a falha real sem avaliação.',
    ],
  ),
  question(
    's3',
    'etica',
    I,
    'Chegou um áudio supostamente da direção pedindo documentos urgentes. Qual ação inicial é adequada?',
    [
      'Confirmar por canal oficial conhecido antes de abrir ou enviar dados.',
      'Um canal independente permite verificar origem e finalidade.',
    ],
    ['Encaminhar para que os colegas decidam.', 'O encaminhamento pode espalhar conteúdo enganoso.'],
    ['Confiar porque a voz se parece com a da pessoa.', 'Uma imitação pode soar familiar.'],
  ),
  question(
    's4',
    'etica',
    M,
    'Uma imagem gerada lembra muito uma obra conhecida e será publicada pela equipe. O que revisar?',
    ['Origem, licença aplicável, regras e atribuição.', 'O uso público exige examinar permissões e autoria.'],
    ['Somente se o resultado está em alta resolução.', 'Resolução não esclarece direitos nem licenças.'],
    [
      'O texto do prompt como prova suficiente de originalidade.',
      'O prompt não determina por si só a origem dos elementos da saída.',
    ],
  ),
  question(
    's5',
    'etica',
    M,
    'Para comparar impactos ambientais de duas ferramentas, que informação é mais relevante?',
    [
      'Recursos usados por tarefa, escala de uso e condições de infraestrutura.',
      'Consumo e impactos variam com equipamento, escala, local e energia.',
    ],
    ['O nome comercial e a cor da interface.', 'Marca e aparência não medem consumo.'],
    [
      'A quantidade de palavras no anúncio de lançamento.',
      'A informação promocional não mede operação ou treinamento.',
    ],
  ),

  question(
    't1',
    'critico',
    I,
    'Uma resposta cita uma pesquisa com título convincente. Como verificar se sustenta a afirmação?',
    [
      'Localizar o original e comparar método, resultado e escopo.',
      'Existência da fonte e sustentação da afirmação são verificações distintas.',
    ],
    ['Confiar porque o título parece acadêmico.', 'Fluência pode acompanhar uma citação inventada.'],
    ['Pedir que o mesmo assistente repita a citação.', 'Repetição não estabelece confirmação independente.'],
  ),
  question(
    't2',
    'critico',
    M,
    'Um texto afirma que “turmas daquela região sempre aprendem mais devagar”. Qual pergunta ajuda a avaliá-lo?',
    [
      'Que dados comparáveis sustentam a afirmação e que fatores foram ignorados?',
      'A generalização pode mascarar vieses e condições contextuais.',
    ],
    ['A frase pode ser reescrita com mais confiança?', 'Tom não substitui evidência.'],
    [
      'Já podemos aplicar a regra a todos os estudantes?',
      'O caso exige investigar antes de tomar decisões sobre pessoas.',
    ],
  ),
  question(
    't3',
    'critico',
    M,
    'Um estudo de cinco turmas é citado como prova sobre todos os estudantes do país. Qual é a falha?',
    [
      'A conclusão extrapola o alcance da amostra.',
      'É preciso checar o desenho e a representatividade antes de generalizar.',
    ],
    ['Um estudo com números não pode ser citado.', 'O dado pode ser citado dentro do escopo apropriado.'],
    [
      'O estudo deveria usar uma palavra estrangeira no título.',
      'O título é irrelevante para a validade da generalização.',
    ],
  ),
  question(
    't4',
    'critico',
    I,
    'Dois documentos apresentam datas diferentes para a mesma inscrição. O que fazer?',
    [
      'Conferir órgão responsável, edição, ano e possíveis retificações.',
      'A divergência pode vir de contextos diferentes ou de uma atualização.',
    ],
    ['Escolher a data repetida com mais confiança.', 'O tom não resolve qual documento está vigente.'],
    ['Calcular uma data média.', 'A média não corresponde a uma data oficial.'],
  ),
  question(
    't5',
    'critico',
    M,
    'Um assistente interpreta “a avaliação foi adiada por dois dias” como “ocorrerá em dois dias”. Qual informação precisa ser recuperada?',
    ['A data original, para aplicar o deslocamento.', 'Dois dias de adiamento são relativos à data original.'],
    [
      'A data da resposta do assistente como base suficiente.',
      'A resposta não estabelece a referência temporal do anúncio.',
    ],
    ['O horário do dispositivo em que se lê a resposta.', 'O relógio local não substitui a data do evento.'],
  ),
];
