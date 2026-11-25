import Link from 'next/link';
import { PageIntro } from '@/components/page';
import { institution, resources, site } from '@/content/site';
import { pageMetadata } from '@/lib/metadata';

const page = resources.sobre;
export const metadata = pageMetadata(page.title, page.description, '/sobre/');

export default function AboutPage() {
  return (
    <>
      <PageIntro
        title={page.title}
        description="Uma iniciativa de extensão universitária em Ciência da Computação para discutir como usamos inteligência artificial dentro e fora da escola."
        label="Extensão universitária"
      />
      <div className="wrap page-body prose about-copy !max-w-none">
        <section>
          <h2>Por que o projeto existe</h2>
          <p>
            {site.description} A alfabetização em IA ajuda a entender como sistemas geram resultados, avaliar
            suas limitações e tomar decisões com responsabilidade.
          </p>
          <p>
            A proposta combina fundamentos técnicos, prática e pensamento crítico. Foi pensada para duas turmas
            do ensino médio com conhecimentos básicos ou intermediários em tecnologia, programação e IA.
            Qualquer pessoa pode seguir a trilha no próprio ritmo.
          </p>
        </section>
        <section>
          <h2>Da apresentação à prática</h2>
          <p>
            As apresentações presenciais introduzem os conceitos e abrem espaço para perguntas. O panfleto
            oferece um resumo e um QR Code para esta plataforma. Aqui, estudantes podem revisitar os temas, usar
            o laboratório e seguir referências para aprofundar sua pesquisa.
          </p>
          <Link className="text-link" href="/#trilha">
            Acessar a trilha de aprendizado
          </Link>
        </section>
        <section>
          <h2>Instituição e equipe</h2>
          <div className="institution">
            <div className="panel">
              <h3>Instituição de ensino</h3>
              <p>{institution.name || 'A informar pela equipe.'}</p>
              <h3>Professor orientador</h3>
              <p>{institution.adviser || 'A informar pela equipe.'}</p>
            </div>
            <div className="panel">
              <h3>Seis integrantes</h3>
              <ol>
                {institution.members.map((name, index) => (
                  <li key={index}>{name || 'Nome a informar pela equipe'}</li>
                ))}
              </ol>
            </div>
          </div>
          <p>{institution.credits}</p>
        </section>
        <section id="privacidade">
          <h2>Privacidade</h2>
          <p>
            As preferências de tema, o progresso da trilha e a rodada em andamento do quiz ficam neste
            navegador. Você pode redefinir o progresso na página inicial ou substituir a rodada do quiz. Os
            textos da oficina e do laboratório ficam na memória da página durante a interação.
          </p>
          <p>
            O acesso dispensa identificação. Ao abrir um link externo, consulte as condições de privacidade
            daquele serviço.
          </p>
        </section>
      </div>
    </>
  );
}
