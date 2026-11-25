import { promptFields, type PromptField } from '../content/lab.ts';

export function tokenize(text: string): string[] {
  const pieces = text.match(/[\p{L}\p{M}\p{N}]+|[^\s]/gu) ?? [];
  return pieces.flatMap((piece) => {
    const points = Array.from(piece);
    if (points.length <= 7) return [piece];
    return Array.from({ length: Math.ceil(points.length / 4) }, (_, index) =>
      points.slice(index * 4, index * 4 + 4).join(''),
    );
  });
}

export function applyTemperature(probabilities: number[], temperature: number) {
  const logits = probabilities.map((probability) => Math.log(probability) / temperature);
  const max = Math.max(...logits);
  const weights = logits.map((logit) => Math.exp(logit - max));
  const sum = weights.reduce((total, value) => total + value, 0);
  return weights.map((value) => value / sum);
}

export function buildPrompt(fields: Partial<Record<PromptField, string>>) {
  return promptFields
    .flatMap(({ id, label }) => {
      const value = fields[id]?.trim();
      return value ? [`${label}: ${value}`] : [];
    })
    .join('\n\n');
}

export function evaluateNetwork(x1: number, x2: number, w1: number, w2: number, bias: number) {
  const weightedSum = x1 * w1 + x2 * w2 + bias;
  const hidden = Math.max(0, weightedSum);
  const output = 1 / (1 + Math.exp(-(hidden - 1)));
  return { weightedSum, hidden, output };
}

export function evaluateClassBalance(classA: number) {
  const classB = 100 - classA;
  const predictsASignalA = 0.8 * classA >= 0.2 * classB;
  const predictsASignalB = 0.2 * classA >= 0.8 * classB;
  const recallA = Number(predictsASignalA) * 80 + Number(predictsASignalB) * 20;
  const recallB = Number(!predictsASignalA) * 20 + Number(!predictsASignalB) * 80;
  return { predictsASignalA, predictsASignalB, recallA, recallB, balancedAccuracy: (recallA + recallB) / 2 };
}
