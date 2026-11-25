'use client';

import { useState } from 'react';
import { evaluateClassBalance, evaluateNetwork } from '@/lib/lab';

const format = (value: number) => value.toLocaleString('pt-BR', { maximumFractionDigits: 3 });
const controls = [
  { key: 'x1', label: 'Entrada x₁' },
  { key: 'x2', label: 'Entrada x₂' },
  { key: 'w1', label: 'Peso w₁' },
  { key: 'w2', label: 'Peso w₂' },
  { key: 'bias', label: 'Viés b' },
] as const;

export function NetworkDemo() {
  const [values, setValues] = useState({ x1: 1, x2: 0.5, w1: 1.5, w2: -1, bias: 0 });
  const { x1, x2, w1, w2, bias } = values;
  const { weightedSum, hidden, output } = evaluateNetwork(x1, x2, w1, w2, bias);
  return (
    <div className="panel">
      <div className="experiment-grid">
        <div>
          {controls.map(({ key, label }) => (
            <div className="field" key={key}>
              <label htmlFor={`network-${key}`}>
                {label} · <span className="range-number">{format(values[key])}</span>
              </label>
              <input
                id={`network-${key}`}
                type="range"
                min="-2"
                max="2"
                step=".25"
                value={values[key]}
                onChange={(event) => setValues({ ...values, [key]: Number(event.target.value) })}
              />
            </div>
          ))}
        </div>
        <div>
          <svg
            className="network-svg"
            role="img"
            aria-labelledby="network-title network-description"
            viewBox="0 0 325 146"
          >
            <title id="network-title">Rede com duas entradas, um neurônio oculto e uma saída</title>
            <desc id="network-description">
              As duas entradas são multiplicadas pelos pesos e somadas ao viés no neurônio oculto. A saída usa
              uma função sigmoide.
            </desc>
            <line x1="42" y1="44" x2="154" y2="75" />
            <line x1="42" y1="104" x2="154" y2="75" />
            <line x1="154" y1="75" x2="274" y2="75" />
            <circle cx="42" cy="44" r="20" />
            <circle cx="42" cy="104" r="20" />
            <circle cx="154" cy="75" r="23" />
            <circle cx="274" cy="75" r="26" />
            <text x="42" y="49">
              x₁
            </text>
            <text x="42" y="109">
              x₂
            </text>
            <text x="154" y="80">
              h
            </text>
            <text x="274" y="80">
              saída
            </text>
            <text x="98" y="47">
              w₁
            </text>
            <text x="98" y="113">
              w₂
            </text>
            <text x="154" y="31">
              + b
            </text>
            <text x="217" y="61">
              × 1
            </text>
          </svg>
          <div className="lab-output mt-3" aria-label="Cálculo da rede">
            <div>
              z = {format(x1)} × {format(w1)} + {format(x2)} × {format(w2)} + ({format(bias)}) ={' '}
              <strong>{format(weightedSum)}</strong>
            </div>
            <div>
              h = ReLU(z) = máx(0, z) = <strong>{format(hidden)}</strong>
            </div>
            <div>
              Saída = σ(h − 1) = <strong>{format(output)}</strong>
            </div>
          </div>
        </div>
      </div>
      <p className="mt-3">
        As conexões multiplicam as entradas por pesos. A camada oculta soma os produtos e o viés, depois aplica
        ReLU. A camada de saída usa peso 1, viés −1 e sigmoide σ(t) = 1/(1 + e⁻ᵗ). Os ajustes são manuais e a
        saída calculada fica entre 0 e 1.
      </p>
    </div>
  );
}

export function BiasDemo() {
  const [classA, setClassA] = useState(50);
  const result = evaluateClassBalance(classA);
  return (
    <div className="panel">
      <p>
        Um classificador fictício distingue folhas A e B por um sinal visual. Na classe A, 80% têm o sinal A e
        20% o B. Na classe B, as proporções se invertem. O modelo prevê a classe com mais exemplos de treino
        para o sinal observado, com empate a favor de A.
      </p>
      <div className="field mt-3">
        <label htmlFor="class-balance">
          Amostras de treino da classe A · <span className="range-number">{classA} de 100</span>
        </label>
        <input
          id="class-balance"
          type="range"
          min="5"
          max="95"
          step="5"
          value={classA}
          onChange={(event) => setClassA(Number(event.target.value))}
        />
      </div>
      <div className="experiment-grid" aria-live="polite">
        <div className="lab-output">
          <strong>Treino</strong>
          <div>
            A: {classA} exemplos · B: {100 - classA} exemplos
          </div>
          <div>Sinal A → classe {result.predictsASignalA ? 'A' : 'B'}</div>
          <div>Sinal B → classe {result.predictsASignalB ? 'A' : 'B'}</div>
        </div>
        <div className="lab-output">
          <strong>Teste equilibrado</strong>
          <div>Acerto dentro de A: {result.recallA}%</div>
          <div>Acerto dentro de B: {result.recallB}%</div>
          <div>Média entre classes: {result.balancedAccuracy}%</div>
        </div>
      </div>
      <p className="mt-3">
        Compare 50/50 com 90/10. O teste conserva 50 exemplos por classe e as proporções dos sinais. O modelo é
        uma contagem simplificada. Em sistemas reais, qualidade dos dados, objetivo, limiares e ambiente também
        afetam o desempenho.
      </p>
    </div>
  );
}
