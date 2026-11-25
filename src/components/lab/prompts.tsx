'use client';

import { useState } from 'react';
import { builderExamples, comparisons, promptFields, type PromptField } from '@/content/lab';
import { buildPrompt } from '@/lib/lab';
import { CopyButton } from '../copy-button';
import { Select } from '../select';

export function PromptBuilder() {
  const [fields, setFields] = useState<Partial<Record<PromptField, string>>>({});
  const [example, setExample] = useState('');
  const [status, setStatus] = useState('');
  const prompt = buildPrompt(fields);
  return (
    <div className="panel">
      <p>O texto fica nesta página até você sair ou limpar os campos. Use dados fictícios ao praticar.</p>
      <div className="actions">
        <div className="field !mb-0">
          <label htmlFor="builder-example">Exemplo</label>
          <Select id="builder-example" value={example} onChange={(event) => setExample(event.target.value)}>
            <option value="">Selecione um exemplo</option>
            {Object.keys(builderExamples).map((name) => (
              <option key={name}>{name}</option>
            ))}
          </Select>
        </div>
        <button
          type="button"
          className="button secondary self-end"
          disabled={!example}
          onClick={() => {
            setFields(builderExamples[example]);
            setStatus(`Exemplo carregado. ${example}.`);
          }}
        >
          Carregar exemplo
        </button>
      </div>
      <p role="status" className="inline-status">
        {status}
      </p>
      <div className="field-grid mt-4">
        {promptFields.map(({ id, label, placeholder }) => (
          <div key={id} className="field">
            <label htmlFor={`builder-${id}`}>{label}</label>
            <textarea
              id={`builder-${id}`}
              rows={2}
              maxLength={650}
              placeholder={placeholder}
              value={fields[id] ?? ''}
              onChange={(event) => {
                setFields({ ...fields, [id]: event.target.value });
                setStatus('');
              }}
            />
          </div>
        ))}
      </div>
      <h3 className="mb-2">Prompt estruturado</h3>
      {prompt ? (
        <div className="lab-output" tabIndex={0}>
          {prompt}
        </div>
      ) : (
        <p>Preencha um campo para montar o prompt.</p>
      )}
      <div className="actions">
        <CopyButton key={prompt} value={prompt} label="Copiar prompt" />
        <button
          type="button"
          className="button secondary"
          disabled={!Object.values(fields).some(Boolean)}
          onClick={() => {
            setFields({});
            setExample('');
            setStatus('Campos limpos.');
          }}
        >
          Limpar
        </button>
      </div>
    </div>
  );
}

export function PromptComparison() {
  const [index, setIndex] = useState(0);
  const scenario = comparisons[index];
  return (
    <div className="panel">
      <div className="field">
        <label htmlFor="compare-scenario">Tarefa</label>
        <Select id="compare-scenario" value={index} onChange={(event) => setIndex(Number(event.target.value))}>
          {comparisons.map((comparison, i) => (
            <option value={i} key={comparison.title}>
              {comparison.title}
            </option>
          ))}
        </Select>
      </div>
      <p className="mb-3">{scenario.task}</p>
      <div className="experiment-grid">
        {(
          [
            [scenario.vague, 'Instrução vaga'],
            [scenario.structured, 'Instrução estruturada'],
          ] as const
        ).map(([version, label]) => (
          <div key={label} className="callout !m-0">
            <h3>{label}</h3>
            <p>{version.input}</p>
            <p>
              <strong>Resposta simulada</strong>
            </p>
            <p>{version.output}</p>
          </div>
        ))}
      </div>
      <p className="mt-3">{scenario.note}</p>
    </div>
  );
}
