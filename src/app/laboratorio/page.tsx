import { PageIntro } from '@/components/page';
import { NextTokenDemo, TokenDemo } from '@/components/lab/tokens';
import { PromptBuilder, PromptComparison } from '@/components/lab/prompts';
import { BiasDemo, NetworkDemo } from '@/components/lab/models';
import { CriticalDemo } from '@/components/lab/critical';
import { experiments } from '@/content/lab';
import { resources } from '@/content/site';
import { pageMetadata } from '@/lib/metadata';

const page = resources.laboratorio;
export const metadata = pageMetadata(page.title, page.description, '/laboratorio/');

const demos = {
  tokenizacao: TokenDemo,
  previsao: NextTokenDemo,
  construtor: PromptBuilder,
  comparador: PromptComparison,
  'rede-neural': NetworkDemo,
  critico: CriticalDemo,
  vies: BiasDemo,
};

export default function LabPage() {
  return (
    <>
      <PageIntro
        title="Laboratório"
        description="Sete experiências locais para testar ideias, acompanhar cálculos e avaliar respostas de IA."
        label="Prática interativa"
      />
      <div className="wrap page-body">
        <nav className="jump-links" aria-label="Experiências do laboratório">
          {experiments.map((experiment) => (
            <a key={experiment.id} href={`#${experiment.id}`}>
              {experiment.title}
            </a>
          ))}
        </nav>
        {experiments.map((experiment) => {
          const Demo = demos[experiment.id];
          return (
            <section
              className="experiment"
              id={experiment.id}
              key={experiment.id}
              aria-labelledby={`${experiment.id}-title`}
            >
              <header>
                <h2 id={`${experiment.id}-title`}>{experiment.title}</h2>
                <p>{experiment.description}</p>
              </header>
              <Demo />
            </section>
          );
        })}
        <a className="text-link" href="#conteudo">
          Voltar ao topo
        </a>
      </div>
    </>
  );
}
