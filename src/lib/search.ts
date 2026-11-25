export function normalize(value: string) {
  return value.normalize('NFD').replace(/\p{M}/gu, '').toLocaleLowerCase('pt-BR').trim();
}

export function includesQuery(query: string, text: string) {
  const normalizedText = normalize(text);
  return normalize(query)
    .split(/\s+/)
    .every((word) => normalizedText.includes(word));
}
