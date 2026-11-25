'use client';

import { useState, useSyncExternalStore } from 'react';
import { Check } from 'lucide-react';
import Link from 'next/link';
import { lessons, type LessonSlug } from '@/content/site';
import { checklist } from '@/content/examples';
import { readLocal, writeLocal } from '@/lib/local';

const progressKey = 'btp:progress';
const changeEvent = 'btp-progress-change';
let temporaryProgress: string | null | undefined;
function subscribe(listener: () => void) {
  window.addEventListener(changeEvent, listener);
  window.addEventListener('storage', listener);
  return () => {
    window.removeEventListener(changeEvent, listener);
    window.removeEventListener('storage', listener);
  };
}

function useProgress() {
  const stored = useSyncExternalStore(
    subscribe,
    () => (temporaryProgress === undefined ? readLocal(progressKey) : temporaryProgress),
    () => null,
  );
  try {
    const value: unknown = JSON.parse(stored ?? '[]');
    return lessons.filter(({ slug }) => Array.isArray(value) && value.includes(slug)).map(({ slug }) => slug);
  } catch {
    return [];
  }
}

function saveProgress(slugs: LessonSlug[]) {
  const value = slugs.length ? JSON.stringify(slugs) : null;
  temporaryProgress = writeLocal(progressKey, value) ? undefined : value;
  window.dispatchEvent(new Event(changeEvent));
}

export function TrailProgress() {
  const progress = useProgress();
  const next = lessons.find(({ slug }) => !progress.includes(slug));
  return (
    <div className="progress-card">
      <p className="progress-heading">Seu progresso</p>
      <p id="trail-progress-label" aria-live="polite">
        {progress.length} de {lessons.length} módulos concluídos
      </p>
      <progress value={progress.length} max={lessons.length} aria-labelledby="trail-progress-label" />
      {progress.length > 0 && (
        <Link className="text-link" href={next ? `/${next.slug}/` : '/quiz/'} prefetch={false}>
          {next ? `Continuar · ${next.short}` : 'Testar conhecimentos no quiz'}
        </Link>
      )}
      {progress.length > 0 && (
        <button
          type="button"
          className="progress-reset"
          onClick={() => {
            if (window.confirm('Redefinir o progresso da trilha neste navegador?')) saveProgress([]);
          }}
        >
          Redefinir progresso
        </button>
      )}
    </div>
  );
}

export function MarkComplete({ slug }: { slug: LessonSlug }) {
  const progress = useProgress();
  const complete = progress.includes(slug);
  return (
    <button
      type="button"
      className={`button ${complete ? 'secondary' : 'primary'}`}
      aria-pressed={complete}
      onClick={() => saveProgress(complete ? progress.filter((item) => item !== slug) : [...progress, slug])}
    >
      <Check size={18} aria-hidden="true" />
      {complete ? 'Módulo concluído' : 'Marcar como concluído'}
    </button>
  );
}

export function ResponsibleChecklist() {
  const [checked, setChecked] = useState<boolean[]>([]);
  const count = checked.filter(Boolean).length;
  return (
    <fieldset className="panel checklist">
      <legend>Checklist antes de usar ou compartilhar</legend>
      {checklist.map((item, index) => (
        <label key={item}>
          <input
            type="checkbox"
            checked={!!checked[index]}
            onChange={(event) => {
              const next = [...checked];
              next[index] = event.target.checked;
              setChecked(next);
            }}
          />
          {item}
        </label>
      ))}
      <p role="status">
        {count} de {checklist.length} práticas verificadas.
      </p>
      <button className="button secondary" type="button" disabled={count === 0} onClick={() => setChecked([])}>
        Desmarcar tudo
      </button>
    </fieldset>
  );
}
