import { categories, questions, type Category, type Difficulty, type Question } from '../content/questions.ts';

export function shuffled<T>(source: readonly T[], random = Math.random) {
  const items = [...source];
  for (let index = items.length - 1; index > 0; index--) {
    const other = Math.floor(random() * (index + 1));
    [items[index], items[other]] = [items[other], items[index]];
  }
  return items;
}

export const defaultQuizSettings: QuizSettings = { category: '', difficulty: '', length: '5' };

export type QuizSettings = {
  category: Category | '';
  difficulty: Difficulty | '';
  length: '5' | '10' | 'all';
};

type QuestionOrder = { id: string; options: number[] };

export type QuizSession = {
  version: 1;
  settings: QuizSettings;
  round: QuestionOrder[];
  position: number;
  answers: number[];
  selected: number | null;
};

const questionBank = new Map(questions.map((question) => [question.id, question]));

export function matchQuizQuestions({ category, difficulty }: QuizSettings) {
  return questions.filter(
    (q) => (!category || q.category === category) && (!difficulty || q.difficulty === difficulty),
  );
}

export function quizLength(available: number, length: QuizSettings['length']) {
  return length === 'all' ? available : Math.min(available, Number(length));
}

export function createQuizSession(settings: QuizSettings, random = Math.random): QuizSession | null {
  const available = matchQuizQuestions(settings);
  if (!available.length) return null;
  const round = shuffled(available, random)
    .slice(0, quizLength(available.length, settings.length))
    .map(({ id, options }) => ({
      id,
      options: shuffled(
        options.map((_, index) => index),
        random,
      ),
    }));
  return { version: 1, settings, round, position: 0, answers: [], selected: null };
}

function isIndex(value: number, length: number) {
  return Number.isInteger(value) && value >= 0 && value < length;
}

export function readQuizSession(raw: string | null): QuizSession | null {
  if (!raw) return null;
  try {
    const session = JSON.parse(raw) as QuizSession | null;
    if (session?.version !== 1) return null;
    const { settings, round, position, answers, selected } = session;
    if (
      !settings ||
      (settings.category !== '' && !Object.hasOwn(categories, settings.category)) ||
      !['', 'Introdutório', 'Intermediário'].includes(settings.difficulty) ||
      !['5', '10', 'all'].includes(settings.length)
    )
      return null;
    if (
      !Array.isArray(round) ||
      !isIndex(position, round.length) ||
      round.length > questions.length ||
      !Array.isArray(answers) ||
      answers.length < position ||
      answers.length > position + 1
    )
      return null;
    const available = new Set(matchQuizQuestions(settings).map(({ id }) => id));
    if (round.length > quizLength(available.size, settings.length)) return null;
    const used = new Set<string>();
    for (const entry of round) {
      if (!entry || !available.has(entry.id) || used.has(entry.id)) return null;
      const question = questionBank.get(entry.id);
      if (
        !question ||
        !Array.isArray(entry.options) ||
        entry.options.length !== question.options.length ||
        new Set(entry.options).size !== entry.options.length ||
        !entry.options.every((index) => isIndex(index, question.options.length))
      )
        return null;
      used.add(entry.id);
    }
    if (!answers.every((answer, index) => isIndex(answer, round[index].options.length))) return null;
    if (selected !== null && !isIndex(selected, round[position].options.length)) return null;
    if (answers.length > position && selected !== answers[position]) return null;
    return session;
  } catch {
    return null;
  }
}

export function quizRound(round: QuestionOrder[]): Question[] {
  return round.flatMap(({ id, options }) => {
    const question = questionBank.get(id);
    return question ? [{ ...question, options: options.map((index) => question.options[index]) }] : [];
  });
}
