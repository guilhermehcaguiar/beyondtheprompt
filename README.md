# Beyond the Prompt

**Inteligência artificial além das respostas.**

Plataforma em português brasileiro criada para um projeto de extensão em Ciência da Computação. A trilha, o laboratório e o quiz ajudam estudantes do ensino médio a entender como a IA funciona, praticar com autonomia e avaliar resultados antes de usá-los.

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

Os pull requests para `main` executam lint, tipos, testes e build no GitHub Actions. Use o preview da Vercel para conferir a interface antes de mesclar.

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

## Publicar na Vercel

1. Envie o código e o `package-lock.json` a um repositório no GitHub.
2. Importe o repositório na Vercel e mantenha o preset **Next.js** e a raiz padrão da aplicação. A Vercel usa o lockfile para detectar o npm. O comando de build é `npm run build`. A versão do Node está em `package.json`.
3. Faça o deploy de produção e confirme que o domínio público abre em outro dispositivo e sem sessão na Vercel.
4. Use a URL de produção para o panfleto. O sitemap e os metadados absolutos usam o domínio de produção fornecido pela Vercel quando disponível. Se usar um domínio próprio ou desativar as variáveis automáticas, preencha `site.url` em `src/content/site.ts` com a origem HTTPS oficial e faça um novo deploy.

As configurações padrão do preset são suficientes. Na ausência de um domínio conhecido, o sitemap local sai sem URLs absolutas. Consulte a documentação sobre [exportação estática](https://nextjs.org/docs/app/guides/static-exports), [gerenciadores de pacotes](https://vercel.com/docs/package-managers) e [condições do plano Hobby](https://vercel.com/docs/plans/hobby).

## Gerar o QR Code do panfleto

Instale o utilitário `qrencode` no computador usado para preparar a impressão. Ele é necessário apenas para gerar os arquivos. Depois de confirmar a URL pública, passe-a ao script.

```sh
npm run qr -- "https://DOMINIO-DE-PRODUCAO" ./qr-code
```

O script gera `beyond-the-prompt.svg` e `beyond-the-prompt.png` com margem de quatro módulos e destino HTTPS direto. Prefira o SVG para impressão. Leia o PNG com `zbarimg -q qr-code/beyond-the-prompt.png` ou com a câmera e compare a URL decodificada com a página de produção. Faça uma prova impressa no tamanho real, preserve a margem branca e teste a leitura em pelo menos dois celulares. Use a URL canônica de produção, evitando links de preview e redirecionadores.
