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
});

// A section never holds more than seven verses, and neither does a request.
export const MAX_VERSES = 7;
