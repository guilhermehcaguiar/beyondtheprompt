import Link from 'next/link';
import {
  Binary,
  BookOpen,
  BrainCircuit,
  ChevronRight,
  Clock,
  FlaskConical,
  ShieldCheck,
  Terminal,
  Zap,
} from 'lucide-react';
import { HeroDiagram } from '@/components/hero-diagram';
import { TrailProgress } from '@/components/personal';
import { lessons, site } from '@/content/site';
import { tokenize } from '@/lib/lab';
import './home.css';

const tokenExample = tokenize('Inteligência artificial.');

export default function Home() {
  return (
    <>
      <section className="hero" data-enter>
        <div className="wrap hero-grid">
          <div className="hero-copy">
            <span className="hero-kicker">
              <BookOpen size={16} aria-hidden="true" /> {site.subtitle}
            </span>
            <h1>
              Entenda a IA <em>além do prompt.</em>
            </h1>
            <p>Descubra como a inteligência artificial gera respostas e aprenda a avaliar o que ela produz.</p>
            <div className="actions">
              <Link className="button primary" href="/fundamentos/">
                Começar a trilha
              </Link>
              <Link className="button secondary" href="/laboratorio/">
                <FlaskConical size={18} aria-hidden="true" />
                Explorar o laboratório
              </Link>
            </div>
            <Link href="/oficina/" className="text-link hero-workshop" prefetch={false}>
              <Clock size={17} aria-hidden="true" />
              Fazer a oficina de 15 minutos
            </Link>
          </div>
          <HeroDiagram />
        </div>
      </section>

      <section className="section wrap home-trail" id="trilha" aria-labelledby="trilha-titulo">
        <div className="trail-intro">
          <h2 id="trilha-titulo">Trilha de aprendizado</h2>
          <p>Comece pelos conceitos ou abra o módulo que responde à sua pergunta.</p>
          <TrailProgress />
        </div>
        <ol className="lesson-list">
          {lessons.map((lesson, index) => (
            <li key={lesson.slug}>
              <Link href={`/${lesson.slug}/`} prefetch={false} className="lesson-card">
                <span className="lesson-index" aria-hidden="true">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <div>
                  <h3>{lesson.title}</h3>
                  <p>{lesson.description}</p>
                </div>
                <ChevronRight className="lesson-chevron" size={18} aria-hidden="true" />
              </Link>
            </li>
          ))}
        </ol>
      </section>

      <section className="lab-band" aria-labelledby="lab-titulo">
        <div className="wrap section">
          <div className="section-title">
            <div>
              <span className="eyebrow">Laboratório</span>
              <h2 id="lab-titulo">Teste como a IA funciona</h2>
              <p>Altere entradas, pesos e instruções. Observe o que muda em cada simulação.</p>
            </div>
            <Link className="button secondary" href="/laboratorio/">
              Ver as sete experiências
            </Link>
          </div>
          <div className="experiment-preview">
            <Link href="/laboratorio/#tokenizacao" className="experiment-card token-preview" prefetch={false}>
              <Binary size={24} aria-hidden="true" />
              <h3>Simulador de tokenização</h3>
              <p>Digite uma frase e veja como ela pode ser dividida em unidades.</p>
              <div className="preview-units" aria-hidden="true">
                {tokenExample.map((token, index) => (
                  <span key={index}>{token}</span>
                ))}
              </div>
            </Link>
            <Link href="/laboratorio/#construtor" className="experiment-card" prefetch={false}>
              <Terminal size={24} aria-hidden="true" />
              <h3>Construtor de prompts</h3>
              <p>Combine objetivo, contexto e restrições em uma instrução que você pode copiar.</p>
            </Link>
            <Link href="/laboratorio/#rede-neural" className="experiment-card" prefetch={false}>
              <BrainCircuit size={24} aria-hidden="true" />
              <h3>Rede neural interativa</h3>
              <p>Ajuste entradas e pesos e acompanhe o cálculo da saída.</p>
            </Link>
          </div>
        </div>
      </section>

      <section className="wrap section home-next" aria-label="Próximos passos">
        <div className="responsible-panel">
          <ShieldCheck size={28} aria-hidden="true" />
          <h2>Uso responsável da IA</h2>
          <p>
            Uma resposta convincente pode conter erros ou vieses. Aprenda a conferir fontes, proteger seus dados
            e avaliar o que a IA produz.
          </p>
          <Link className="button secondary" href="/uso-responsavel/">
            Aprender sobre uso responsável
          </Link>
        </div>
        <div className="quiz-panel">
          <Zap size={28} aria-hidden="true" />
          <h2>Quiz de inteligência artificial</h2>
          <p>Resolva situações de estudo, programação e verificação. Veja a explicação de cada resposta.</p>
          <Link className="button primary" href="/quiz/">
            Começar o quiz
          </Link>
        </div>
      </section>

      <section className="wrap project-blurb">
        <div>
          <h2>O projeto de extensão</h2>
          <p>
            Estudantes de Ciência da Computação criaram esta plataforma para compartilhar o que sabem sobre IA
            com turmas do ensino médio.
          </p>
        </div>
        <Link className="text-link" href="/sobre/">
          Conhecer o projeto
        </Link>
      </section>
    </>
  );
}
