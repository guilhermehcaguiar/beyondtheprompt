import { PageIntro } from '@/components/page';
import { resources } from '@/content/site';
import { references, verifiedOn } from '@/content/references';
import { pageMetadata } from '@/lib/metadata';

const page = resources.referencias;
export const metadata = pageMetadata(page.title, page.description, '/referencias/');
const entries = Object.entries(references);
const groups = Array.from(new Set(entries.map(([, item]) => item.group)));

export default function ReferencesPage() {
  return (
    <>
      <PageIntro
        title={page.title}
        description={page.description}
        label="Aprofundamento"
        extra={<p className="page-meta">Endereços consultados em {verifiedOn}.</p>}
      />
      <div className="wrap page-body">
        {groups.map((group) => (
          <section className="reference-group" key={group}>
            <h2>{group}</h2>
            <div className="reference-list">
              {entries
                .filter(([, item]) => item.group === group)
                .map(([id, item]) => (
                  <article className="panel source-card" id={id} key={item.url}>
                    <span className="reference-author">{item.author}</span>
                    <h3>
                      <a href={item.url}>{item.title}</a>
                    </h3>
                    <p>{item.note}</p>
                  </article>
                ))}
            </div>
          </section>
        ))}
      </div>
    </>
  );
}
