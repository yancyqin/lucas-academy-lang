// The passages the English endpoint will fetch: one per scripture lesson, and
// the scripture in the lessons of poems. Shared by the Worker (which refuses
// anything else) and by the validation script (which checks every lesson is
// listed here with the verses it actually has).
export const TRANSLATIONS = Object.freeze({NIV: {key: 'NIV', bibleId: 111}});

// "BOOK.CHAPTER": [first verse, last verse]
export const PASSAGES = Object.freeze({
  '1CO.13': [1, 13],
  'MRK.4': [1, 9],
  'PSA.121': [1, 2],
  'ISA.40': [31, 31],
  // 成语 · 第一辑: one verse or run per idiom.
  'ISA.55': [9, 9],
  'PRO.6': [6, 8],
  'MAT.17': [20, 20],
  'LUK.15': [4, 6],
  'JAS.5': [7, 7],
  'JAS.3': [10, 11],
  'ROM.8': [28, 28],
  'PRO.15': [3, 3],
  'MAT.5': [37, 37],
});

// A section never holds more than seven verses, and neither does a request.
export const MAX_VERSES = 7;
