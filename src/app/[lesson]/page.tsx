import { notFound } from 'next/navigation';
import { Lesson } from '@/components/lesson';
import { lessons } from '@/content/site';
import { pageMetadata } from '@/lib/metadata';

type Props = { params: Promise<{ lesson: string }> };
export const dynamicParams = false;

export function generateStaticParams() {
  return lessons.map(({ slug }) => ({ lesson: slug }));
}

export async function generateMetadata({ params }: Props) {
  const { lesson } = await params;
  const item = lessons.find(({ slug }) => slug === lesson);
  if (!item) notFound();
  return pageMetadata(item.title, item.description, `/${item.slug}/`);
}

export default async function LessonPage({ params }: Props) {
  const { lesson } = await params;
  const item = lessons.find(({ slug }) => slug === lesson);
  if (!item) notFound();
  return <Lesson slug={item.slug} />;
}
