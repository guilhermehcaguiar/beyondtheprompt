import assert from 'node:assert/strict';
import { test } from 'node:test';
import { glossary } from '../src/content/glossary.ts';
import { categories, questions } from '../src/content/questions.ts';
import { lessons } from '../src/content/site.ts';
import {
  applyTemperature,
  buildPrompt,
  evaluateClassBalance,
  evaluateNetwork,
  tokenize,
} from '../src/lib/lab.ts';
import {
  createQuizSession,
  defaultQuizSettings,
  quizRound,
  readQuizSession,
  shuffled,
} from '../src/lib/quiz.ts';
import { includesQuery } from '../src/lib/search.ts';

test('tokenização didática trata pontuação, acentos e entradas vazias', () => {
  assert.deepEqual(tokenize('IA, educação! 😊'), ['IA', ',', 'educ', 'ação', '!', '😊']);
  assert.deepEqual(tokenize('  \n '), []);
});

test('a temperatura conserva a soma e altera a concentração', () => {
  const base = [0.58, 0.29, 0.13];
  const reference = applyTemperature(base, 1);
  const cold = applyTemperature(base, 0.2);
  const warm = applyTemperature(base, 2);
  for (const distribution of [reference, cold, warm]) {
    assert.ok(Math.abs(distribution.reduce((sum, value) => sum + value, 0) - 1) < 1e-10);
  }
  assert.ok(cold[0] > reference[0] && reference[0] > warm[0]);
  assert.ok(Math.abs(reference[1] - base[1]) < 1e-10);
});

test('o construtor ignora campos em branco e mantém a ordem', () => {
  assert.equal(
    buildPrompt({ formato: ' Tabela ', objetivo: 'Praticar', exemplos: '   ' }),
    'Objetivo: Praticar\n\nFormato esperado: Tabela',
  );
  assert.equal(buildPrompt({}), '');
});

test('a rede aplica a ativação oculta e o viés de saída', () => {
  assert.deepEqual(evaluateNetwork(1, 0.5, 1.5, -1, 0), { weightedSum: 1, hidden: 1, output: 0.5 });
  const result = evaluateNetwork(1, 1, -1, -1, 0);
  assert.equal(result.hidden, 0);
  assert.ok(result.output > 0 && result.output < 0.5);
});

test('o desequilíbrio pode zerar o acerto da classe minoritária', () => {
  assert.deepEqual(evaluateClassBalance(50), {
    predictsASignalA: true,
    predictsASignalB: false,
    recallA: 80,
    recallB: 80,
    balancedAccuracy: 80,
  });
  assert.equal(evaluateClassBalance(90).recallB, 0);
  assert.equal(evaluateClassBalance(10).recallA, 0);
});

test('busca combina palavras sem depender de caixa, acentos ou ordem', () => {
  assert.ok(includesQuery('REDES  atenção', 'Atenção em redes neurais'));
  assert.ok(!includesQuery('redes áudio', 'Atenção em redes neurais'));
});

test('banco do quiz tem uma resposta correta por questão e cobre os dois níveis', () => {
  assert.ok(questions.length >= 30);
  assert.equal(new Set(questions.map((q) => q.id)).size, questions.length);
  for (const category of Object.keys(categories)) {
    const group = questions.filter((q) => q.category === category);
    assert.deepEqual(new Set(group.map((q) => q.difficulty)), new Set(['Introdutório', 'Intermediário']));
  }
  for (const q of questions) {
    assert.equal(q.options.filter((option) => option.correct).length, 1);
    assert.equal(new Set(q.options.map((option) => option.text)).size, q.options.length);
    assert.ok(q.options.every((option) => option.reason.length > 10));
  }
  const options = questions[0].options;
  assert.notDeepEqual(
    shuffled(options, () => 0),
    options,
  );
  assert.equal(shuffled(options, () => 0).filter((option) => option.correct).length, 1);
});

test('glossário contém termos distintos e aponta para lições válidas', () => {
  assert.ok(glossary.length >= 35);
  assert.equal(new Set(glossary.map((t) => t.id)).size, glossary.length);
  assert.ok(glossary.every((term) => lessons.some((lesson) => lesson.slug === term.lesson)));
});

test('quiz oferece rodadas de cinco, dez ou todas as questões e respeita os filtros', () => {
  for (const [length, expected] of [
    ['5', 5],
    ['10', 10],
    ['all', questions.length],
  ] as const) {
    const session = createQuizSession({ ...defaultQuizSettings, length });
    assert.equal(session?.round.length, expected);
    assert.equal(new Set(session?.round.map(({ id }) => id)).size, expected);
  }
  const settings = {
    ...defaultQuizSettings,
    category: 'fundamentos',
    difficulty: 'Introdutório',
    length: '10',
  } as const;
  const session = createQuizSession(settings);
  assert.ok(session);
  const round = quizRound(session.round);
  assert.equal(
    round.length,
    questions.filter(
      (question) => question.category === settings.category && question.difficulty === settings.difficulty,
    ).length,
  );
  assert.ok(
    round.every(
      (question) => question.category === settings.category && question.difficulty === settings.difficulty,
    ),
  );
});

test('a rodada salva preserva perguntas, alternativas, respostas e a questão atual', () => {
  const started = createQuizSession(defaultQuizSettings, () => 0);
  assert.ok(started);
  const progress = { ...started, position: 1, answers: [1], selected: 0 };
  const restored = readQuizSession(JSON.stringify(progress));
  assert.deepEqual(restored, progress);
  assert.deepEqual(quizRound(restored?.round ?? []), quizRound(progress.round));
  assert.deepEqual(readQuizSession(JSON.stringify({ ...progress, answers: [1, 0] }))?.answers, [1, 0]);
});

test('uma sessão inválida não impede iniciar uma nova rodada', () => {
  const session = createQuizSession(defaultQuizSettings);
  assert.ok(session);
  for (const invalid of [
    '{',
    JSON.stringify({ ...session, version: 0 }),
    JSON.stringify({ ...session, position: 2 }),
    JSON.stringify({ ...session, answers: [99], selected: 99 }),
    JSON.stringify({ ...session, round: [{ ...session.round[0], options: [0, 0, 1] }] }),
    JSON.stringify({ ...session, round: [{ ...session.round[0], id: 'questao-removida' }] }),
  ]) {
    assert.equal(readQuizSession(invalid), null);
  }
});
