'use client';

import Link from 'next/link';
import { useEffect, useRef, useState, useSyncExternalStore } from 'react';
import { categories } from '@/content/questions';
import { readLocal, writeLocal } from '@/lib/local';
import {
  createQuizSession,
  defaultQuizSettings,
  matchQuizQuestions,
  quizLength,
  quizRound,
  readQuizSession,
  type QuizSession,
  type QuizSettings,
} from '@/lib/quiz';
import { Select } from './select';

const sessionKey = 'btp:quiz-session';
const sessionChange = 'btp-quiz-session-change';

function subscribeSession(callback: () => void) {
  window.addEventListener('storage', callback);
  window.addEventListener(sessionChange, callback);
  return () => {
    window.removeEventListener('storage', callback);
    window.removeEventListener(sessionChange, callback);
  };
}

function storeSession(session: QuizSession | null) {
  writeLocal(sessionKey, session ? JSON.stringify(session) : null);
  window.dispatchEvent(new Event(sessionChange));
}

export function Quiz() {
  const [settings, setSettings] = useState(defaultQuizSettings);
  const [session, setSession] = useState<QuizSession | null>(null);
  const [finished, setFinished] = useState(false);
  const rawSession = useSyncExternalStore(
    subscribeSession,
    () => readLocal(sessionKey),
    () => null,
  );
  const saved = session ? null : readQuizSession(rawSession);
  const focus = useRef<HTMLHeadingElement>(null);
  const feedback = useRef<HTMLDivElement>(null);
  const playing = session !== null;
  const count = quizLength(matchQuizQuestions(settings).length, settings.length);
  const round = session ? quizRound(session.round) : [];
  const { position, answers, selected } = session ?? { position: 0, answers: [], selected: null };
  const current = round[position];
  const answer = answers[position];
  const reviewed = answer !== undefined;

  useEffect(() => {
    if (playing) focus.current?.focus();
  }, [playing, position, finished]);
  useEffect(() => {
    if (reviewed && !finished) feedback.current?.focus();
  }, [reviewed, finished]);

  function updateSession(next: QuizSession) {
    setSession(next);
    storeSession(next);
  }

  function start() {
    const next = createQuizSession(settings);
    if (!next) return;
    updateSession(next);
    setFinished(false);
  }

  function next() {
    if (!session || !reviewed) return;
    if (position + 1 < round.length) {
      updateSession({ ...session, position: position + 1, selected: null });
      return;
    }
    if (readLocal(sessionKey) === JSON.stringify(session)) storeSession(null);
    setFinished(true);
  }

  if (!session)
    return (
      <form
        className="panel quiz-shell"
        onSubmit={(event) => {
          event.preventDefault();
          start();
        }}
      >
        <h2 ref={focus} tabIndex={-1}>
          Monte sua rodada
        </h2>
        <p>Escolha um assunto ou misture todas as categorias no modo geral.</p>
        {saved && (
          <div className="callout">
            <p>
              <strong>Rodada salva</strong> · {saved.answers.length} de {saved.round.length} questões
              respondidas.
            </p>
            <button
              type="button"
              className="button secondary mt-3"
              onClick={() => {
                setSettings(saved.settings);
                setSession(saved);
                setFinished(false);
              }}
            >
              Continuar rodada
            </button>
          </div>
        )}
        <div className="quiz-setup-fields mt-4">
          <div className="field">
            <label htmlFor="quiz-category">Categoria</label>
            <Select
              id="quiz-category"
              value={settings.category}
              onChange={(event) =>
                setSettings({ ...settings, category: event.target.value as QuizSettings['category'] })
              }
            >
              <option value="">Modo geral</option>
              {Object.entries(categories).map(([value, item]) => (
                <option value={value} key={value}>
                  {item.title}
                </option>
              ))}
            </Select>
          </div>
          <div className="field">
            <label htmlFor="quiz-level">Dificuldade</label>
            <Select
              id="quiz-level"
              value={settings.difficulty}
              onChange={(event) =>
                setSettings({ ...settings, difficulty: event.target.value as QuizSettings['difficulty'] })
              }
            >
              <option value="">Todos os níveis</option>
              <option>Introdutório</option>
              <option>Intermediário</option>
            </Select>
          </div>
          <div className="field">
            <label htmlFor="quiz-length">Tamanho da rodada</label>
            <Select
              id="quiz-length"
              value={settings.length}
              onChange={(event) =>
                setSettings({ ...settings, length: event.target.value as QuizSettings['length'] })
              }
            >
              <option value="5">Até 5 questões</option>
              <option value="10">Até 10 questões</option>
              <option value="all">Rodada completa</option>
            </Select>
          </div>
        </div>
        <p className="results-count" role="status">
          {count} {count === 1 ? 'questão' : 'questões'} na rodada.
        </p>
        {saved && <p className="mb-3">Uma nova rodada substitui o andamento salvo.</p>}
        <button className="button primary" type="submit" disabled={!count}>
          {saved ? 'Iniciar nova rodada' : 'Iniciar quiz'}
        </button>
      </form>
    );

  if (finished) {
    const score = round.reduce((total, q, index) => total + Number(q.options[answers[index]].correct), 0);
    const performance = Object.entries(categories)
      .map(([key, item]) => {
        const items = round.map((q, i) => ({ q, i })).filter(({ q }) => q.category === key);
        return {
          ...item,
          total: items.length,
          correct: items.filter(({ q, i }) => q.options[answers[i]].correct).length,
        };
      })
      .filter((item) => item.total);
    const suggested = performance.filter((item) => item.correct < item.total);
    return (
      <section className="panel quiz-shell">
        <span className="eyebrow">Resultado</span>
        <h2 ref={focus} tabIndex={-1}>
          {score} de {round.length} respostas corretas
        </h2>
        <h3>Desempenho por categoria</h3>
        <ul className="quiz-results">
          {performance.map((item) => (
            <li key={item.title}>
              <span>{item.title}</span>
              <strong>
                {item.correct}/{item.total}
              </strong>
            </li>
          ))}
        </ul>
        <h3>Continue estudando</h3>
        <ul>
          {(suggested.length ? suggested : performance).map((item) => (
            <li key={item.title}>
              <Link href={item.lesson} className="text-link">
                Revisar {item.title.toLocaleLowerCase('pt-BR')}
              </Link>
            </li>
          ))}
        </ul>
        <div className="actions">
          <button
            type="button"
            className="button primary"
            onClick={() => {
              start();
              focus.current?.focus();
            }}
          >
            Refazer quiz
          </button>
          <button
            type="button"
            className="button secondary"
            onClick={() => {
              setSession(null);
              setFinished(false);
              requestAnimationFrame(() => focus.current?.focus());
            }}
          >
            Alterar rodada
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="panel quiz-shell">
      <p id="quiz-position">
        Questão {position + 1} de {round.length}
      </p>
      <progress
        className="quiz-progress"
        max={round.length}
        value={answers.length}
        aria-labelledby="quiz-position"
      />
      <span className="eyebrow">
        {categories[current.category].title} · {current.difficulty}
      </span>
      <h2 ref={focus} tabIndex={-1}>
        {current.prompt}
      </h2>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          if (!reviewed && selected !== null) updateSession({ ...session, answers: [...answers, selected] });
        }}
      >
        <fieldset disabled={reviewed}>
          <legend>Selecione uma alternativa</legend>
          <div className="choices">
            {current.options.map((option, index) => (
              <label
                key={option.text}
                className={`choice ${reviewed ? (option.correct ? 'is-correct' : answer === index ? 'is-incorrect' : '') : ''}`}
              >
                <input
                  type="radio"
                  name="quiz-answer"
                  value={index}
                  checked={selected === index}
                  onChange={() => updateSession({ ...session, selected: index })}
                />
                <span>
                  {option.text}
                  {reviewed && option.correct && <strong> · Correta</strong>}
                </span>
              </label>
            ))}
          </div>
        </fieldset>
        {!reviewed && (
          <button type="submit" className="button primary" disabled={selected === null}>
            Confirmar resposta
          </button>
        )}
      </form>
      {reviewed && (
        <>
          <div
            className={`feedback ${current.options[answer].correct ? 'correct' : 'incorrect'}`}
            tabIndex={-1}
            ref={feedback}
          >
            <strong>{current.options[answer].correct ? 'Resposta correta' : 'Vale revisar'}</strong>
            <ul>
              {current.options.map((option) => (
                <li key={option.text}>
                  <strong>{option.text}</strong> {option.reason}
                </li>
              ))}
            </ul>
          </div>
          <button type="button" className="button primary" onClick={next}>
            {position + 1 === round.length ? 'Ver resultado' : 'Próxima questão'}
          </button>
        </>
      )}
    </section>
  );
}
