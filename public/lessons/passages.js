// The passages the English endpoint will fetch: one per scripture lesson, and
// the scripture in the lessons of poems. Shared by the Worker (which refuses
// anything else) and by the validation script (which checks every lesson is
// listed here with the verses it actually has).
export const TRANSLATIONS = Object.freeze({NIV: {key: 'NIV', bibleId: 111}});

// "BOOK.CHAPTER": [first, last], or several ranges when verses are skipped.
export const PASSAGES = Object.freeze({
  '1CO.13': [1, 13],
  'MRK.4': [1, 9],
  'PSA.121': [1, 2],
  'ISA.40': [31, 31],
  // 成语 · 第一辑: one verse or run per idiom.
  'ISA.55': [9, 9],
  'PRO.6': [6, 8],
  'MAT.17': [20, 20],
  'MAT.4': [17, 17],
  'JAS.5': [7, 7],
  '1JN.1': [[6, 6], [8, 9]],
  'ROM.8': [28, 28],
  'DEU.31': [8, 8],
  'MAT.5': [[34, 34], [37, 37], [44, 45]],
  // 成语 · 第二辑: scripture remains text-only pending the owner’s decision.
  'MAT.15': [8, 8],
  'MAT.13': [9, 9],
  '2CO.3': [18, 18],
  '1JN.4': [19, 19],
  'LUK.18': [1, 1],
  'HEB.12': [2, 2],
  '2TI.1': [7, 7],
  '1CO.9': [22, 23],
  'ISA.43': [18, 19],
});

export function isAllowedPassage(chapter, first, last = first) {
  const allowed = PASSAGES[chapter];
  if (!allowed || last < first) return false;
  const ranges = Array.isArray(allowed[0]) ? allowed : [allowed];
  return ranges.some(([start, end]) => first >= start && last <= end);
}

// A section never holds more than seven verses, and neither does a request.
export const MAX_VERSES = 7;
