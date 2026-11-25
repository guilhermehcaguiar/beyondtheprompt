'use client';

import { useState } from 'react';
import { predictionBranches } from '@/content/lab';
import { applyTemperature, tokenize } from '@/lib/lab';

const locale = 'pt-BR';

export function TokenDemo() {
  const [text, setText] = useState('Inteligência artificial ajuda a estudar.');
  const units = tokenize(text);
  return (
    <div className="panel">
      <div className="field">
        <label htmlFor="token-input">Seu texto</label>
        <textarea
          id="token-input"
          rows={3}
          maxLength={180}
          value={text}
          onChange={(event) => setText(event.target.value)}
          aria-describedby="token-explanation"
        />
      </div>
      <p role="status">
        <strong>{units.length}</strong> {units.length === 1 ? 'unidade' : 'unidades'} · {text.length}/180
        caracteres
      </p>
      <ul className="token-list" aria-label="Unidades na ordem do texto">
        {units.map((unit, i) => (
          <li className="token" key={i}>
            {unit}
          </li>
        ))}
      </ul>
      <p id="token-explanation">
        Simulação didática. Cada palavra com mais de sete pontos de código é cortada em blocos de quatro.
        Pontuação e símbolos são separados, e espaços são ignorados. Tokenizadores reais usam vocabulários e
        outras regras, inclusive para espaços.
      </p>
    </div>
  );
}

export function NextTokenDemo() {
  const [temperature, setTemperature] = useState(1);
  const [first, setFirst] = useState<number>();
  const [last, setLast] = useState('');
  const probabilities = applyTemperature(
    first === undefined ? predictionBranches.map((branch) => branch.probability) : [0.66, 0.22, 0.12],
    temperature,
  );
  const options =
    first === undefined ? predictionBranches.map((branch) => branch.word) : predictionBranches[first].next;
  return (
    <div className="panel">
      <p id="prediction-help">
        Probabilidades ilustrativas. No segundo passo, cada opção representa uma continuação curta. A
        temperatura redistribui as chances. Você escolhe manualmente, sem sorteio.
      </p>
      <div className="field mt-3">
        <label htmlFor="temperature">
          Temperatura · <span className="range-number">{temperature.toLocaleString(locale)}</span>
        </label>
        <input
          id="temperature"
          type="range"
          min=".2"
          max="2"
          step=".1"
          value={temperature}
          onChange={(event) => setTemperature(Number(event.target.value))}
          aria-describedby="prediction-help"
        />
      </div>
      <div className="lab-output" role="status">
        A IA pode{first === undefined ? ' …' : ` ${predictionBranches[first].word}${last ? ` ${last}` : ' …'}`}
      </div>
      {!last && (
        <div className="choices" aria-label="Possíveis continuações">
          {options.map((word, index) => (
            <button
              type="button"
              key={word}
              className="choice"
              onClick={() => (first === undefined ? setFirst(index) : setLast(word))}
            >
              <span>{word}</span>
              <span className="prob-track" aria-hidden="true">
                <i style={{ width: `${probabilities[index] * 100}%` }} />
              </span>
              <strong>
                {probabilities[index].toLocaleString(locale, { style: 'percent', minimumFractionDigits: 1 })}
              </strong>
            </button>
          ))}
        </div>
      )}
      <button
        type="button"
        className="button secondary mt-3"
        disabled={first === undefined}
        onClick={() => {
          setFirst(undefined);
          setLast('');
        }}
      >
        Recomeçar frase
      </button>
    </div>
  );
}
