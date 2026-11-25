import Link from 'next/link';
import { NextTokenDemo } from '@/components/lab/tokens';
import { PageIntro } from '@/components/page';
import { resources } from '@/content/site';
import { pageMetadata } from '@/lib/metadata';

const page = resources.oficina;
export const metadata = pageMetadata(page.title, page.description, '/oficina/');

export default function WorkshopPage() {
  return (
    <>
      <PageIntro
        title="Oficina de IA em 15 minutos"
        description="Compare duas previsões do mesmo modelo didático e discuta como verificar uma resposta de IA."
        label="Atividade guiada"
      />
      <div className="wrap page-body reading-layout">
        <nav className="toc" aria-label="Etapas da oficina">
          <h2>Roteiro</h2>
          <ol>
            <li>
              <a href="#ler">Leia o conceito · 4 min</a>
            </li>
            <li>
              <a href="#testar">Teste a simulação · 7 min</a>
            </li>
            <li>
              <a href="#refletir">Reflita e discuta · 4 min</a>
            </li>
          </ol>
        </nav>
        <article className="prose">
          <section id="ler">
            <span className="eyebrow">4 minutos</span>
            <h2>Leia o conceito</h2>
            <p>
              Um modelo de linguagem divide o texto em unidades chamadas tokens. Um token pode representar uma
              palavra, parte dela ou um sinal. A partir do contexto, o modelo calcula chances para diferentes
              tokens e continua a sequência, uma unidade de cada vez.
            </p>
            <p>
              A temperatura ajusta como essas chances se distribuem. Temperaturas menores concentram a
              probabilidade nas opções mais prováveis. Temperaturas maiores dão mais espaço às alternativas.
            </p>
          </section>

          <section id="testar">
            <span className="eyebrow">7 minutos</span>
            <h2>Teste a simulação</h2>
            <ol className="workshop-instructions">
              <li>
                Comece com a frase “A IA pode …” e coloque a temperatura em <strong>0,5</strong>.
              </li>
              <li>
                Observe a chance da primeira opção. Mude a temperatura para <strong>1,5</strong> e compare os
                valores.
              </li>
              <li>
                Escolha uma continuação. Recomece a frase e escolha outra para ver como as opções seguintes
                mudam.
              </li>
            </ol>
            <NextTokenDemo />
          </section>

          <section id="refletir">
            <span className="eyebrow">4 minutos</span>
            <h2>Reflita e discuta</h2>
            <div className="field">
              <label htmlFor="workshop-answer">
                Uma continuação saiu com 90% de chance. O que esse número mede? Como você verificaria um fato da
                resposta?
              </label>
              <textarea id="workshop-answer" rows={4} maxLength={600} aria-describedby="workshop-answer-help" />
              <p id="workshop-answer-help">
                Escreva duas frases e compare com a ideia abaixo. O texto fica nesta página.
              </p>
            </div>
            <details className="panel workshop-feedback">
              <summary>Ver pontos para comparar</summary>
              <p>
                O percentual descreve a chance de uma continuação naquele contexto. Para verificar uma afirmação
                factual, localize uma fonte confiável, abra o material original e confirme se ele sustenta a
                afirmação.
              </p>
              <p>
                Em dupla, comparem quais fontes escolheriam para verificar uma data, uma estatística ou uma
                citação.
              </p>
            </details>
            <div className="related">
              <Link href="/quiz/" className="text-link" prefetch={false}>
                Fazer o quiz rápido
              </Link>
              <Link href="/laboratorio/" className="text-link" prefetch={false}>
                Explorar outras experiências
              </Link>
            </div>
          </section>
        </article>
      </div>
    </>
  );
}
