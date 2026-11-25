import type { LessonSlug } from './site';
import type { ReferenceId } from './references';

type Section = {
  id: string;
  title: string;
  paragraphs: string[];
  example?: string;
  sources?: ReferenceId[];
  diagram?: 'types' | 'generation' | 'prompt';
};
type Article = { lead: string; sections: Section[]; practice: string; lab: string; labLabel: string };

export const articles: Record<LessonSlug, Article> = {
  fundamentos: {
    lead: 'A expressão “inteligência artificial” abriga técnicas diferentes. Um filtro de spam, um recomendador e um gerador de imagens resolvem problemas distintos, com dados, métodos e limites próprios.',
    sections: [
      {
        id: 'conceito',
        title: 'O que chamamos de IA?',
        paragraphs: [
          'Inteligência artificial é a área que estuda e constrói sistemas capazes de realizar tarefas como classificar imagens, planejar rotas, recomendar conteúdo ou gerar texto. A capacidade observada depende da tarefa, do ambiente e dos critérios usados para avaliar o sistema.',
          'Um aplicativo de rotas pode combinar busca em um grafo com uma previsão de trânsito aprendida a partir de dados. A separação entre componentes ajuda a descobrir de onde vieram os erros: uma rua bloqueada que não aparece no mapa é diferente de uma previsão ruim de velocidade.',
        ],
        diagram: 'types',
      },
      {
        id: 'historia',
        title: 'De regras escritas a padrões aprendidos',
        paragraphs: [
          'Na década de 1950, a IA se consolidou como área de pesquisa. Entre as abordagens clássicas estavam a busca por estados, jogos e o raciocínio simbólico. Sistemas especialistas, populares especialmente nos anos 1980, representavam decisões por regras elaboradas com especialistas.',
          'Com maior disponibilidade de dados e computação, técnicas estatísticas ganharam espaço. Nos anos 2010, redes profundas avançaram em tarefas como visão computacional. Em 2017, o Transformer apresentou uma arquitetura baseada em atenção que se tornou importante em muitos modelos de linguagem. Essas abordagens coexistem e podem ser combinadas.',
        ],
        sources: ['transformer', 'mit'],
      },
      {
        id: 'aprendizado',
        title: 'Regras, machine learning e deep learning',
        paragraphs: [
          'Um programa baseado em regras executa condições explícitas, como marcar uma biblioteca como fechada após o horário cadastrado. Em machine learning, o ajuste do sistema usa exemplos para aprender padrões que serão aplicados em casos novos.',
          'Uma rede neural combina operações parametrizadas e funções de ativação. Deep learning usa redes com várias camadas para construir representações em etapas. Em imagens, uma rede pode combinar sinais locais, como bordas e texturas, em padrões mais complexos. Essas representações emergem do treinamento e não precisam corresponder a categorias humanas bem definidas.',
        ],
        example:
          'Para identificar spam, compare uma regra de palavra proibida com um classificador treinado em mensagens rotuladas. Um classificador aprende combinações de sinais, mas pode errar com novos golpes ou e-mails legítimos pouco representados.',
        sources: ['google', 'mit'],
      },
      {
        id: 'gerar-classificar',
        title: 'Distinguir, gerar e repetir uma decisão',
        paragraphs: [
          'Um classificador discriminativo estima uma categoria a partir de uma entrada, como “spam” ou “legítimo”. Um modelo generativo aprende regularidades que permitem produzir novas amostras, como um texto ou uma imagem. Um gerador também pode ser usado como classificador se solicitarmos que produza um rótulo.',
          'Determinismo e probabilidade são outra dimensão. Um classificador pode produzir probabilidades e ainda escolher sempre o rótulo mais provável. Um gerador que sorteia entre possibilidades pode variar com a mesma entrada. Uma regra fixa também é tipicamente determinística quando recebe a mesma entrada e o mesmo estado.',
        ],
        example:
          'O filtro da caixa de entrada classifica a mensagem. Um assistente redige uma resposta. Uma regra do aplicativo arquiva mensagens antigas. Cada etapa cumpre uma finalidade diferente.',
        sources: ['google', 'hf'],
      },
    ],
    practice:
      'Escolha um aplicativo que você usa. Identifique uma decisão automatizada, uma entrada provável e um caso em que a decisão falharia.',
    lab: 'vies',
    labLabel: 'Experimentar a demonstração de viés',
  },
  'como-funciona': {
    lead: 'Entre digitar uma pergunta e ler uma resposta, um modelo executa operações numéricas. Entender como ele é treinado e como gera tokens ajuda a interpretar o que entrega.',
    sections: [
      {
        id: 'dados',
        title: 'Dados e formas de aprender',
        paragraphs: [
          'Um dataset é uma coleção organizada de exemplos. Separar treino, validação e teste ajuda a distinguir aprendizado, escolha de configuração e avaliação em exemplos novos. Se os mesmos exemplos aparecem no treino e no teste, a nota pode superestimar a capacidade de generalização.',
          'No aprendizado supervisionado os exemplos têm alvos definidos, como a temperatura medida. No não supervisionado, procuramos estrutura sem rótulos fornecidos, por exemplo agrupando documentos parecidos. Na aprendizagem por reforço, um agente escolhe ações e recebe recompensas, procurando melhorar o retorno ao longo de interações. Prever tokens ocultos ou seguintes usa alvos obtidos do próprio texto e é um exemplo de aprendizado autossupervisionado.',
        ],
        sources: ['google', 'hf'],
      },
      {
        id: 'parametros',
        title: 'Pesos, treinamento e inferência',
        paragraphs: [
          'Cada camada transforma entradas numéricas. Pense em z = x₁w₁ + x₂w₂ + b. Uma ativação aplicada a z pode introduzir não linearidade. Redes maiores repetem operações desse tipo em muitas unidades e camadas.',
          'No treinamento, uma função de perda mede o erro em relação ao objetivo. Algoritmos de otimização ajustam parâmetros com base na perda, tipicamente usando gradientes. Na inferência, os parâmetros treinados são usados para calcular saídas em novas entradas. Acrescentar texto à janela de contexto muda a entrada da inferência, sem reescrever pesos.',
        ],
        sources: ['google', 'mit'],
      },
      {
        id: 'tokens',
        title: 'Tokens, embeddings e janela de contexto',
        paragraphs: [
          'Um LLM é um modelo de linguagem de grande escala. Um tokenizador converte o texto em identificadores de um vocabulário. Tokens podem representar palavras, trechos, pontuação ou espaços. Idioma, caracteres e vocabulário influenciam o tamanho da sequência.',
          'A camada de embeddings associa cada identificador a um vetor numérico aprendido, que é transformado pelas camadas seguintes. Informações de posição ajudam a distinguir ordens diferentes. A janela de contexto limita quantos tokens podem ser usados na operação. Em conversas longas, o aplicativo pode resumir ou omitir trechos antigos.',
        ],
        diagram: 'generation',
        sources: ['hf', 'transformer'],
      },
      {
        id: 'atencao',
        title: 'Transformer e atenção',
        paragraphs: [
          'Em uma camada de atenção, representações dos tokens são projetadas em consultas, chaves e valores. A compatibilidade entre consultas e chaves gera pesos para combinar os valores. Isso permite que a representação de um token incorpore informação de outros tokens.',
          'Em um gerador autorregressivo, uma máscara impede o uso de posições futuras. Em “Ana guardou o livro porque ele estava molhado”, a atenção oferece um mecanismo para associar posições úteis ao interpretar a sequência. Os pesos de atenção, sozinhos, não comprovam o motivo de uma resposta.',
        ],
        sources: ['transformer'],
      },
      {
        id: 'geracao',
        title: 'Predição, probabilidades e temperatura',
        paragraphs: [
          'A cada passo, o modelo produz pontuações para o vocabulário. Uma função softmax pode convertê-las em distribuição. Um decodificador escolhe ou amostra um token, acrescenta o resultado ao contexto e repete até atingir uma condição de parada.',
          'Dividir as pontuações por uma temperatura positiva menor concentra a distribuição nas opções mais prováveis. Temperaturas maiores achatam a distribuição e dão mais chance a outras opções. Escolha gulosa, amostragem e filtros também mudam o resultado. A probabilidade refere-se ao próximo token dado o contexto, sem medir a verdade de uma afirmação.',
        ],
        sources: ['hf', 'stanford'],
      },
      {
        id: 'alem-do-texto',
        title: 'Multimodalidade, fine-tuning, RAG e busca',
        paragraphs: [
          'Sistemas multimodais processam mais de um tipo de entrada ou saída. Um sistema de imagem e texto, por exemplo, pode projetar regiões da imagem em vetores que o modelo usa junto a uma pergunta.',
          'Fine-tuning atualiza parâmetros do modelo, ou de módulos treináveis adicionados, usando novos exemplos. RAG recupera documentos e os inclui no contexto para orientar uma geração. A recuperação pode buscar um manual atualizado, mas o sistema ainda pode ignorar uma nota importante ou citar trechos irrelevantes.',
          'Um buscador indexa, recupera e ordena materiais existentes. Um LLM gera uma sequência modelada por probabilidades. Produtos podem combinar busca e geração. Abra a fonte primária e confira data e escopo antes de usar a resposta como evidência.',
        ],
        example:
          'Para descobrir a data de uma prova, consulte o aviso oficial. Se usar uma resposta com RAG, confira o aviso citado, o ano e a turma.',
        sources: ['rag', 'stanford'],
      },
    ],
    practice:
      'Compare uma consulta de calendário com uma tarefa de redação criativa. Em qual delas faz sentido pedir uma fonte primária, e em qual a variedade de respostas ajuda?',
    lab: 'previsao',
    labLabel: 'Explorar a previsão do próximo token',
  },
  prompts: {
    lead: 'Um prompt é a entrada que orienta uma tarefa. Descreva o que você quer aprender ou produzir, indique as informações relevantes e antecipe como avaliar a resposta.',
    sections: [
      {
        id: 'estrutura',
        title: 'Defina o objetivo e as condições',
        paragraphs: [
          'Escreva o objetivo em uma frase. Informe o contexto que muda o resultado, como o nível da turma e o que já foi aprendido. Especifique uma tarefa observável, como listar três hipóteses ou comentar dois trechos de um parágrafo.',
          'Transforme preferências em restrições concretas. “Não avance para a solução até minha tentativa” orienta melhor uma tutoria do que “seja didático”. Defina o formato quando ele ajudar a verificar o resultado, como passos numerados, tabela com critérios ou exemplos comentados.',
        ],
        diagram: 'prompt',
        sources: ['prompt'],
      },
      {
        id: 'exemplos',
        title: 'Zero-shot, few-shot e exemplos',
        paragraphs: [
          'Em zero-shot, peça a tarefa diretamente, sem apresentar exemplos resolvidos no prompt. Em few-shot, inclua alguns pares de entrada e saída em um formato consistente. Exemplos ensinam o padrão desejado durante a inferência e não mudam os pesos do modelo.',
          'Use exemplos variados e inclua um caso de fronteira, quando relevante. Um classificador de comentários pode confundir ironia com elogio se todos os exemplos positivos forem óbvios. Separe os exemplos usados na instrução dos casos escolhidos para avaliar.',
        ],
        example:
          'Para classificar anotações: “Revisar capítulo 2 → tarefa. Fotossíntese gera compostos orgânicos → conceito. Até que ponto luz muda o processo? → dúvida.” Depois, apresente uma anotação inédita.',
        sources: ['prompt', 'hf'],
      },
      {
        id: 'iteracao',
        title: 'Divida a tarefa e revise a resposta',
        paragraphs: [
          'Para problemas grandes, comece pedindo critérios e perguntas de esclarecimento. Desenvolva uma parte por vez e confira cada resultado antes de avançar. Em um projeto, você pode revisar primeiro os requisitos, depois os casos de teste e só então uma proposta de código.',
          'Compare versões do prompt em exemplos iguais. Anote o que melhorou e o que continuou errado. Uma instrução precisa pode favorecer respostas mais úteis, mas fatos, referências e código ainda exigem verificação independente.',
        ],
        example:
          '“Cite artigos reais” pode produzir referências inventadas. Peça termos de busca, encontre os artigos por conta própria e verifique se cada fonte sustenta o argumento.',
        sources: ['prompt', 'unesco'],
      },
    ],
    practice:
      'Escolha um exemplo, adapte o contexto à sua atividade e escreva dois critérios objetivos para aceitar a resposta.',
    lab: 'construtor',
    labLabel: 'Montar um prompt no laboratório',
  },
  estudos: {
    lead: 'A prática mais valiosa acontece quando você explica, resolve e corrige com autonomia. Use a IA para criar oportunidades de praticar e receber comentários.',
    sections: [
      {
        id: 'ativo',
        title: 'Aprenda tentando antes de consultar',
        paragraphs: [
          'Recupere o que lembra sem consulta. Depois, solicite uma pergunta diagnóstica ou uma pista, responda e compare sua explicação com o material da disciplina. Explique em voz alta por que o procedimento funciona e tente um exemplo diferente.',
          'Para revisar um tema, peça uma explicação no seu nível, um contraexemplo e exercícios com dificuldade crescente. Em uma avaliação simulada, responda primeiro e só depois peça correção comentada. Confirme gabaritos duvidosos com exemplos verificáveis.',
        ],
        example:
          'Uso inadequado: “Resolva toda a atividade e entregue as respostas.” Uso produtivo: “Li o enunciado e tentei este passo. Faça uma pergunta que me ajude a encontrar o erro, deixando a solução para depois.”',
        sources: ['unesco'],
      },
      {
        id: 'aplicacoes',
        title: 'Organize, pratique idiomas e prepare apresentações',
        paragraphs: [
          'Use um plano de estudo ajustado ao tempo real disponível. Em uma conversa simulada de idioma, concentre o feedback em um aspecto por vez, como concordância. Compare pronúncia, vocabulário ou registro com materiais didáticos confiáveis.',
          'Para organizar ideias, escreva suas anotações antes de pedir propostas de ordem ou lacunas. Ensaie uma apresentação pedindo perguntas plausíveis do público. Na pesquisa escolar, use termos de busca sugeridos e confira a fonte original, sua data e a relação com a afirmação.',
        ],
        example:
          'Antes de apresentar, explique um slide sem ler. Peça três perguntas de compreensão, responda sozinho e verifique quais pontos precisam de revisão.',
      },
      {
        id: 'autoria',
        title: 'Autoria, regras e autonomia',
        paragraphs: [
          'Confirme com o professor quais usos são permitidos e quando é preciso declarar assistência. Registre a contribuição da ferramenta e as fontes consultadas, segundo a orientação da instituição. Preserve sua autoria nas decisões, no texto e na análise.',
          'Avalie sinais de dependência: você consegue resolver caso semelhante sem assistência, detectar erros e explicar a solução? Alterne sessões com e sem IA. Dados sobre colegas, avaliações privadas e documentos escolares devem ficar fora de ferramentas externas quando não houver autorização e condições adequadas.',
        ],
        sources: ['unesco', 'anpd'],
      },
    ],
    practice:
      'Transforme uma atividade da sua disciplina em uma sessão de estudo com tentativa inicial, uma pista, uma resposta própria e uma verificação.',
    lab: 'comparador',
    labLabel: 'Comparar instruções para estudar',
  },
  programacao: {
    lead: 'Assistentes de programação ajudam a levantar hipóteses e revisar alternativas. O código só se torna confiável quando você entende o contrato, confere as APIs e testa os comportamentos relevantes.',
    sections: [
      {
        id: 'fluxo',
        title: 'Use assistência ao longo do desenvolvimento',
        paragraphs: [
          'Na geração de código, descreva entradas, saídas e casos de erro. Ao pedir uma explicação de algoritmo, solicite um passo a passo com uma entrada concreta e uma justificativa de complexidade. Ao aprender uma linguagem, valide nomes de métodos e exemplos na documentação.',
          'Para depuração, reduza o problema a um exemplo reproduzível com dados fictícios. Peça hipóteses e teste uma por vez. Em refatorações, fixe primeiro o comportamento esperado em testes. Na documentação, descreva o contrato real, inclusive valores ausentes e exceções.',
        ],
        sources: ['mdn', 'python'],
      },
      {
        id: 'falhas',
        title: 'Detecte APIs inventadas, complexidade e casos extremos',
        paragraphs: [
          'Uma sugestão como array.average() parece natural, mas arrays nativos de JavaScript não têm esse método. Confira a API na documentação da linguagem ou da biblioteca e distinga um método nativo de uma extensão do projeto.',
          'Uma explicação pode afirmar que buscar o máximo por ordenação é sempre linear. Em implementações usuais, ordenar costuma custar mais que percorrer a lista uma vez. Verifique também se o código altera a ordem de entrada, se trata duplicatas e se funciona com lista vazia ou somente com valores negativos.',
        ],
        example:
          'Se uma função inicializa “maior” com zero, ela pode devolver zero para [−9, −4], embora esse valor nem esteja na lista. Uma leitura do contrato e um teste com negativos revelam a falha.',
        sources: ['mdn'],
      },
      {
        id: 'seguranca',
        title: 'Faça revisão de segurança e escreva testes',
        paragraphs: [
          'Procure fronteiras entre dados e comandos. Renderize texto fornecido por pessoas como texto, valide entradas segundo a operação e use consultas parametrizadas quando houver acesso a dados. Nunca compartilhe chaves, senhas, tokens de acesso ou repositórios privados sem autorização.',
          'Desconfie de testes que apenas repetem a implementação. Parta de exemplos independentes e cubra entradas normais, falhas, fronteiras e regressões. Revise cada alteração e use ferramentas locais de análise antes de aprovar.',
        ],
        sources: ['mdn', 'python', 'nist'],
      },
    ],
    practice:
      'Explique por que uma média vazia é diferente de uma média igual a zero. Escreva mais um teste e descreva qual erro ele detectaria.',
    lab: 'critico',
    labLabel: 'Praticar revisão de respostas',
  },
  'uso-responsavel': {
    lead: 'Antes de usar uma resposta, pense em quem pode ser afetado, o que precisa de confirmação e quais dados são realmente necessários.',
    sections: [
      {
        id: 'checagem',
        title: 'Alucinações, confiança e verificação',
        paragraphs: [
          'Alucinações são saídas sem sustentação factual, como autores inventados ou instruções que parecem plausíveis e não funcionam. Fluência e confiança textual podem coexistir com erro. Para afirmações importantes, procure a fonte original, confirme título e data e leia o trecho citado em contexto.',
          'Se um assistente afirmar que uma escola mudou a data de matrícula, verifique o edital ou o canal oficial. Para uma cifra, confira unidade, população e período. Quando fontes divergem, compare métodos, escopo e data antes de decidir o que citar.',
        ],
        sources: ['nist', 'stanford'],
      },
      {
        id: 'vies',
        title: 'Vieses, impactos sociais e ambientais',
        paragraphs: [
          'Vieses podem surgir na seleção de exemplos, nos rótulos, no objetivo do treinamento e na forma como o produto é usado. A média de acertos pode esconder erros frequentes em grupos pouco representados. Avalie resultados por subgrupo e pergunte quem sofre o custo de um erro.',
          'Sistemas de IA afetam trabalho, acesso a serviços e produção de informação. Treino e operação consomem energia, e parte da infraestrutura usa água para resfriamento. O impacto varia com hardware, escala, localização e matriz energética. Avalie o benefício da tarefa e considere opções mais simples quando atenderem ao objetivo.',
        ],
        example:
          'Um sistema treinado sobretudo com fotos diurnas pode errar mais à noite. Meça os dois cenários e colete exemplos adequados antes de usar o resultado em decisões.',
        sources: ['nist', 'unesco'],
      },
      {
        id: 'midia',
        title: 'Desinformação, deepfakes e autoria',
        paragraphs: [
          'Deepfakes podem imitar rosto, voz ou gestos. Antes de compartilhar uma mídia surpreendente, procure a publicação original, consulte fontes independentes e compare o contexto. Artefatos visuais podem ajudar a levantar suspeitas, mas a aparência sozinha não confirma origem.',
          'Direitos autorais e plágio envolvem permissões, licenças e atribuição. Verifique a licença do material usado, declare assistência quando exigido e siga as regras escolares. Uma resposta gerada pode se parecer com uma fonte existente, inclusive quando não apresenta citação.',
        ],
        sources: ['unesco', 'nist'],
      },
      {
        id: 'privacidade',
        title: 'Privacidade e segurança digital',
        paragraphs: [
          'Evite inserir senhas, credenciais, documentos pessoais, informações financeiras, segredos de trabalho, dados de saúde e dados privados de terceiros. Use nomes e valores fictícios. Remover um nome pode ser insuficiente se a combinação de detalhes ainda identificar uma pessoa.',
          'Antes de enviar material a um serviço, leia as condições de idade, retenção e tratamento dos dados. Se uma resposta solicitar que você instale algo ou envie informações, confira origem e pertinência antes de agir. A responsabilidade pela decisão e pela revisão continua com quem utiliza o resultado.',
        ],
        sources: ['anpd', 'unesco', 'nist'],
      },
    ],
    practice:
      'Você recebeu um vídeo atribuído à direção da escola e um link para enviar documentos. Descreva como confirmar origem e finalidade antes de abrir ou compartilhar.',
    lab: 'critico',
    labLabel: 'Resolver o desafio de pensamento crítico',
  },
};
