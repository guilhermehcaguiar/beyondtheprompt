import { Glossary } from '@/components/glossary';
import { PageIntro } from '@/components/page';
import { resources } from '@/content/site';
import { pageMetadata } from '@/lib/metadata';

const page = resources.glossario;
export const metadata = pageMetadata(page.title, page.description, '/glossario/');

export default function GlossaryPage() {
  return (
    <>
      <PageIntro title={page.title} description={page.description} label="Consulta rápida" />
      <div className="wrap page-body">
        <Glossary />
      </div>
    </>
  );
}
