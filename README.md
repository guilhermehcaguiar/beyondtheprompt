# Beyond the Prompt

**Inteligência artificial além das respostas.**

Plataforma em português brasileiro criada para um projeto de extensão em Ciência da Computação. A oficina, a trilha, o laboratório e o quiz ajudam estudantes do ensino médio a entender como a IA funciona, praticar com autonomia e avaliar resultados antes de usá-los.

## Executar localmente

Use Node.js 24 com o npm que acompanha a instalação.

```sh
npm ci
npm run dev
```

Acesse `http://localhost:3000`. A instalação inicial precisa baixar as dependências. Fontes, dados do quiz, referências, diagramas e textos ficam no projeto. O site publicado funciona com arquivos estáticos. Interações e busca rodam no navegador. Tema, progresso da trilha e uma rodada em andamento do quiz ficam em `localStorage`. Os textos da oficina e do laboratório ficam na memória da página.

## Build e verificações

```sh
npm run lint
npm run typecheck
npm test
npm run build
npm run test:export
python3 -m http.server 4173 --directory out
```

Os pushes na branch `main` executam lint, tipos, testes e build no GitHub Actions.

Abra `http://localhost:4173` para conferir a exportação. O teste de exportação verifica o HTML, os metadados, os arquivos publicados, as rotas e as âncoras. Para reproduzir a verificação visual, navegue pela página inicial, por uma lição, pelo laboratório e pelo quiz em larguras de 360, 768 e 1440 px. Confira foco, menu, busca, temas, cópia e progresso pelo teclado. Rode o Lighthouse na exportação servida por HTTP para medir desempenho, acessibilidade, boas práticas e SEO.

## Código e conteúdo

| Caminho | O que editar |
| --- | --- |
| `src/app/` | Rotas estáticas, metadados, estilos e tokens dos dois temas |
| `src/components/` | Navegação, lições e controles interativos |
| `src/content/site.ts` | Marca, navegação, URL oficial opcional, instituição, orientador, seis integrantes e créditos |
| `src/content/articles.ts` | Lições, ancoragem de seções, exercícios e referências próximas ao texto |
| `src/content/examples.ts` | Prompts, trechos de código e checklist |
| `src/content/lab.ts` | Experiências, exemplos e desafios do laboratório |
| `src/content/questions.ts` | 35 questões, categorias, níveis e explicações das alternativas |
| `src/content/glossary.ts` e `src/content/tools.ts` | 48 termos e catálogo de ferramentas |
| `src/content/references.ts` | Fontes e data de consulta das informações sujeitas a mudanças |
| `src/lib/` | Busca, cálculos didáticos, metadados e armazenamento local |
| `public/` | Favicon, imagem de compartilhamento e fontes locais com licenças |
| `tests/` e `scripts/qr.mjs` | Testes e utilitário de impressão |

O Next.js App Router pré-renderiza as páginas e exporta o site para `out/`. React e TypeScript estrito organizam os componentes. Tailwind CSS e CSS com variáveis de tema definem a aparência, Lucide fornece ícones e os diagramas usam SVG. A busca global carrega o índice local quando aberta e usa o mesmo conteúdo publicado nas páginas. Testes e QR Code rodam apenas no ambiente de desenvolvimento.

Ao alterar um arquivo de conteúdo, preserve os identificadores de seções que já aparecem em links e revise a data de consulta quando reconferir fornecedores. Para preencher os dados institucionais, edite o objeto `institution` em `src/content/site.ts`. Para atualizar a stack, confira os requisitos do Next.js e os pares do React e do ESLint, atualize o lockfile e refaça as verificações.

## Equipe do projeto

**Instituição** · Uninassau

**Professor orientador** · David Wilber

**Integrantes**

- Arthur Niceas
- Felipe Paskevicius
- Gabriel Fernando
- Guilherme Aguiar
- Lucas Barreto
- Lucas Cardoso
