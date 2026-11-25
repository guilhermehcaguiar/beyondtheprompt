'use client';

import { useState } from 'react';
import { challengeOptions, challenges } from '@/content/lab';
import { Select } from '../select';

export function CriticalDemo() {
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<number>();
  const [reviewed, setReviewed] = useState(false);
  const challenge = challenges[index];
  function change(value: number) {
    setIndex(value);
    setSelected(undefined);
    setReviewed(false);
  }

  return (
    <div className="panel">
      <div className="field">
        <label htmlFor="critical-case">Caso do desafio</label>
        <Select id="critical-case" value={index} onChange={(event) => change(Number(event.target.value))}>
          {challenges.map((_, i) => (
            <option key={i} value={i}>
              Caso {i + 1} de {challenges.length}
            </option>
          ))}
        </Select>
      </div>
      <p>{challenge.scenario}</p>
      <blockquote className="callout">
        <strong>Resposta fictícia</strong>
        <p>{challenge.response}</p>
      </blockquote>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          if (selected !== undefined) setReviewed(true);
        }}
      >
        <fieldset disabled={reviewed}>
          <legend>Qual é o problema principal?</legend>
          <div className="choices experiment-grid">
            {challengeOptions.map((label, i) => (
              <label className={`choice ${reviewed && challenge.answer === i ? 'is-correct' : ''}`} key={label}>
                <input
                  type="radio"
                  value={i}
                  name="critical-answer"
                  checked={selected === i}
                  onChange={() => setSelected(i)}
                />
                <span>{label}</span>
              </label>
            ))}
          </div>
        </fieldset>
        {!reviewed && (
          <button type="submit" className="button primary" disabled={selected === undefined}>
            Conferir análise
          </button>
        )}
      </form>
      <div role="status">
        {reviewed && (
          <div className={`feedback ${selected === challenge.answer ? 'correct' : 'incorrect'}`}>
            <strong>
              {selected === challenge.answer
                ? 'Você identificou o problema'
                : `Problema principal: ${challengeOptions[challenge.answer]}`}
            </strong>
            <p>{challenge.feedback}</p>
          </div>
        )}
      </div>
      {reviewed && (
        <button
          type="button"
          className="button secondary"
          onClick={() => {
            change((index + 1) % challenges.length);
            document.getElementById('critical-case')?.focus();
          }}
        >
          {index === challenges.length - 1 ? 'Voltar ao primeiro caso' : 'Próximo caso'}
        </button>
      )}
    </div>
  );
}
