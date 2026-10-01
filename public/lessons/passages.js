// The passages the English endpoint will fetch, one per lesson. Shared by the
// Worker (which refuses anything else) and by the validation script (which
// checks every lesson is listed here with the verses it actually has).
export const TRANSLATIONS = Object.freeze({NIV: {key: 'NIV', bibleId: 111}});

// "BOOK.CHAPTER": [first verse, last verse]
export const PASSAGES = Object.freeze({
  '1CO.13': [1, 13],
  'MRK.4': [1, 9],
});

// A section never holds more than seven verses, and neither does a request.
export const MAX_VERSES = 7;
