import Link from 'next/link';
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
        <nav id="experiencias" className="jump-links lab-index" aria-label="Experiências do laboratório">
          {experiments.map((experiment) => (
            <a key={experiment.id} href={`#${experiment.id}`}>
              {experiment.title}
            </a>
          ))}
        </nav>
        {experiments.map((experiment, index) => {
          const Demo = demos[experiment.id];
          const next = experiments[index + 1];
          return (
            <section
              className="experiment"
              id={experiment.id}
              key={experiment.id}
              tabIndex={-1}
              aria-labelledby={`${experiment.id}-title`}
            >
              <header>
                <span className="eyebrow">
                  Experiência {index + 1} de {experiments.length}
                </span>
                <h2 id={`${experiment.id}-title`}>{experiment.title}</h2>
                <p>
                  <strong>Objetivo.</strong> {experiment.description}
                </p>
              </header>
              <div className="callout lab-challenge">
                <p>
                  <strong>Desafio.</strong> {experiment.challenge}
                </p>
              </div>
              <Demo />
              <nav
                className="lab-step-nav"
                aria-label={`Depois de ${experiment.title.toLocaleLowerCase('pt-BR')}`}
              >
                {next ? (
                  <a className="button primary" href={`#${next.id}`}>
                    Próxima · {next.title}
                  </a>
                ) : (
                  <Link className="button primary" href="/quiz/" prefetch={false}>
                    Fazer o quiz
                  </Link>
                )}
                <a className="text-link" href="#experiencias">
                  Ver lista de experiências
                </a>
              </nav>
            </section>
          );
        })}
      </div>
    </>
  );
}
