'use client';

import { useState } from 'react';
import Link from 'next/link';
import { BrainCircuit, RotateCcw } from 'lucide-react';
import { predictionBranches } from '@/content/lab';

const input = [31, 72, 113];
const hidden = [21, 55, 89, 123];
const continuations = [32, 72, 112];

export function HeroDiagram() {
  const [selection, setSelection] = useState<number>();
  const selected = selection === undefined ? null : predictionBranches[selection];

  return (
    <section className="hero-diagram" aria-labelledby="prediction-title">
      <header className="prediction-head">
        <span className="prediction-icon">
          <BrainCircuit size={22} aria-hidden="true" />
        </span>
        <div>
          <h2 id="prediction-title">Previsão do próximo token</h2>
          <p>Probabilidades ilustrativas</p>
        </div>
        <button
          type="button"
          className="prediction-reset"
          aria-label="Limpar a continuação"
          aria-disabled={!selected}
          onClick={() => setSelection(undefined)}
        >
          <RotateCcw size={17} aria-hidden="true" />
        </button>
      </header>

      <div className="prediction-body">
        <div className="prediction-sentence">
          <span className="prediction-label">Frase</span>
          <p aria-live="polite">
            A IA pode{' '}
            <span className="prediction-slot" data-selected={Boolean(selected)}>
              {selected?.word ?? '…'}
            </span>
          </p>
        </div>
        <div className="prediction-grid">
          <svg className="prediction-network" viewBox="0 0 206 144" aria-hidden="true">
            {input.flatMap((y, i) =>
              hidden.map((target, j) => (
                <path key={`a${i}${j}`} d={`M18 ${y} C56 ${y} 60 ${target} 100 ${target}`} />
              )),
            )}
            {hidden.flatMap((y, i) =>
              continuations.map((target, j) => (
                <path
                  key={`b${i}${j}`}
                  className={j === selection && (i === 1 || i === 2) ? 'path-selected' : undefined}
                  d={`M100 ${y} C142 ${y} 151 ${target} 188 ${target}`}
                />
              )),
            )}
            {input.map((y) => (
              <circle key={y} cx="18" cy={y} r="5" />
            ))}
            {hidden.map((y) => (
              <circle key={y} cx="100" cy={y} r="7" />
            ))}
            {continuations.map((y, i) => (
              <circle key={y} cx="188" cy={y} r="5" className={i === selection ? 'node-selected' : undefined} />
            ))}
          </svg>

          <div className="prediction-options" role="group" aria-label="Escolha uma continuação">
            {predictionBranches.map(({ word, probability }, i) => (
              <button
                key={word}
                type="button"
                className="prediction-choice"
                aria-pressed={selection === i}
                onClick={() => setSelection(i)}
              >
                <span>{word}</span>
                <strong>{Math.round(probability * 100)}%</strong>
                <span className="prediction-track" aria-hidden="true">
                  <i style={{ transform: `scaleX(${probability})` }} />
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className="prediction-foot">
        <p>Escolha uma continuação.</p>
        <Link href="/laboratorio/#previsao" prefetch={false}>
          Testar a temperatura
        </Link>
      </div>
    </section>
  );
}
