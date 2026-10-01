// Study units: a whole verse, and — where an editor has aligned it — the short
// clauses it splits into. Pure functions, shared by the page, the validation
// script and the narration-script generator, so all three cut the text the
// same way.

// FNV-1a over whitespace-normalised text. Used to notice when upstream English
// differs from the text an alignment (or a narration clip) was checked against.
export function fingerprint(text) {
  let h = 2166136261;
  for (const c of String(text).replace(/\s+/g, ' ').trim()) {
    h ^= c.codePointAt(0);
    h = Math.imul(h, 16777619);
  }
  return (h >>> 0).toString(16);
}

export const chineseClauses = text => text.match(/[^，；。！？]+[，；。！？]?/g) || [];
export const englishWords = text => text.match(/\S+\s*/g) || [];

function sliceTokens(tokens, start, end) {
  let offset = 0;
  const result = [];
  for (const token of tokens) {
    const next = offset + token.length;
    if (next > start && offset < end) {
      result.push(token.slice(Math.max(0, start - offset), Math.min(token.length, end - offset)));
    }
    offset = next;
  }
  return result;
}

// reason: null when clauses are available; otherwise why study stays whole:
//   'loading'     — no English yet (still loading, or unavailable);
//   'changed'     — the English differs from what the alignment was checked on;
//   'unavailable' — this verse has no editorial alignment.
export function studyUnits(lesson, verse, englishText) {
  const data = lesson.study?.[verse.id];
  const zh = verse.tokens.join('');
  const whole = {id: 'whole', zh, en: englishText || '', tokens: verse.tokens, question: data?.question || null};
  if (!data?.units?.length) return {whole, parts: [], reason: englishText ? 'unavailable' : 'loading'};
  if (!englishText) return {whole, parts: [], reason: 'loading'};
  if (fingerprint(englishText) !== data.hash) return {whole, parts: [], reason: 'changed'};

  const clauses = chineseClauses(zh);
  const words = englishWords(englishText);
  const zhTotal = data.units.reduce((sum, unit) => sum + unit.zh, 0);
  const enTotal = data.units.reduce((sum, unit) => sum + unit.en, 0);
  if (clauses.length !== zhTotal || words.length !== enTotal) return {whole, parts: [], reason: 'changed'};

  let zhIndex = 0;
  let enIndex = 0;
  let offset = 0;
  const parts = data.units.map(unit => {
    const zhText = clauses.slice(zhIndex, zhIndex + unit.zh).join('');
    const enText = words.slice(enIndex, enIndex + unit.en).join('');
    zhIndex += unit.zh;
    enIndex += unit.en;
    const part = {
      id: unit.id,
      zh: zhText,
      en: enText,
      tokens: sliceTokens(verse.tokens, offset, offset + zhText.length),
      question: unit.question,
    };
    offset += zhText.length;
    return part;
  });
  return {whole, parts, reason: null};
}

// The Chinese side of each aligned unit — needs no English, so narration and
// validation can use it offline.
export function chineseUnits(lesson, verse) {
  const data = lesson.study?.[verse.id];
  const zh = verse.tokens.join('');
  if (!data?.units?.length) return [];
  const clauses = chineseClauses(zh);
  let index = 0;
  return data.units.map(unit => {
    const text = clauses.slice(index, index + unit.zh).join('');
    index += unit.zh;
    return {id: unit.id, zh: text};
  });
}
