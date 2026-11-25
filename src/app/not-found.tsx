import Link from 'next/link';
import { PageIntro } from '@/components/page';

export default function NotFoundPage() {
  return (
    <>
      <PageIntro
        title="Página não encontrada"
        description="Confira o endereço ou explore os materiais disponíveis na trilha."
        label="Erro 404"
      />
      <div className="wrap page-body actions">
        <Link href="/" className="button primary">
          Voltar ao início
        </Link>
        <Link href="/#trilha" className="button secondary">
          Abrir trilha
        </Link>
      </div>
    </>
  );
}
