import { Catalog } from '@/components/catalog';
import { PageIntro } from '@/components/page';
import { resources } from '@/content/site';
import { verifiedOn } from '@/content/references';
import { pageMetadata } from '@/lib/metadata';

const page = resources.ferramentas;
export const metadata = pageMetadata(page.title, page.description, '/ferramentas/');

export default function ToolsPage() {
  return (
    <>
      <PageIntro title={page.title} description={page.description} label="Catálogo" />
      <div className="wrap page-body">
        <div className="callout !mt-0 mb-6">
          <p>
            O catálogo é opcional. Se for usar um serviço externo, confira os requisitos de idade, autorização
            de responsáveis, privacidade e regras da escola.
          </p>
          <p className="text-sm mt-1">Páginas oficiais consultadas em {verifiedOn}.</p>
        </div>
        <Catalog />
      </div>
    </>
  );
}
