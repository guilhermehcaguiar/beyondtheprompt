'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { categories, questions, type Category, type Difficulty, type Question } from '@/content/questions';
import { shuffled } from '@/lib/quiz';
import { Select } from './select';

export function Quiz() {
  const [category, setCategory] = useState<Category | ''>('');
  const [difficulty, setDifficulty] = useState<Difficulty | ''>('');
  const [round, setRound] = useState<Question[]>([]);
  const [position, setPosition] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [selected, setSelected] = useState<number>();
  const [finished, setFinished] = useState(false);
  const focus = useRef<HTMLHeadingElement>(null);
  const feedback = useRef<HTMLDivElement>(null);
  const playing = round.length > 0;
  const available = questions.filter(
    (q) => (!category || q.category === category) && (!difficulty || q.difficulty === difficulty),
  );
  const current = round[position];
  const answer = answers[position];
  const reviewed = answer !== undefined;

  useEffect(() => {
    if (playing) focus.current?.focus();
  }, [playing, position, finished]);
  useEffect(() => {
    if (reviewed && !finished) feedback.current?.focus();
  }, [reviewed, finished]);

  function start() {
    setRound(shuffled(available).map((question) => ({ ...question, options: shuffled(question.options) })));
    setPosition(0);
    setAnswers([]);
    setSelected(undefined);
    setFinished(false);
  }

  function next() {
    if (position + 1 === round.length) setFinished(true);
    else {
      setPosition(position + 1);
      setSelected(undefined);
    }
  }

  if (!playing)
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
        <div className="filters mt-4">
          <div className="field">
            <label htmlFor="quiz-category">Categoria</label>
            <Select
              id="quiz-category"
              value={category}
              onChange={(event) => setCategory(event.target.value as Category | '')}
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
              value={difficulty}
              onChange={(event) => setDifficulty(event.target.value as Difficulty | '')}
            >
              <option value="">Todos os níveis</option>
              <option>Introdutório</option>
              <option>Intermediário</option>
            </Select>
          </div>
        </div>
        <p className="results-count" role="status">
          {available.length} {available.length === 1 ? 'questão' : 'questões'} na rodada.
        </p>
        <button className="button primary" type="submit" disabled={!available.length}>
          Iniciar quiz
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
              setRound([]);
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
          if (!reviewed && selected !== undefined) setAnswers([...answers, selected]);
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
                  onChange={() => setSelected(index)}
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
          <button type="submit" className="button primary" disabled={selected === undefined}>
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
