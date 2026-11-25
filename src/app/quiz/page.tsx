import { PageIntro } from '@/components/page';
import { Quiz } from '@/components/quiz';
import { pageMetadata } from '@/lib/metadata';
import { resources } from '@/content/site';

const page = resources.quiz;
export const metadata = pageMetadata(page.title, page.description, '/quiz/');

export default function QuizPage() {
  return (
    <>
      <PageIntro
        title="Quiz de inteligência artificial"
        description="Resolva situações práticas e veja por que cada alternativa funciona ou falha."
        label="Avaliação"
      />
      <div className="wrap page-body">
        <Quiz />
      </div>
    </>
  );
}
