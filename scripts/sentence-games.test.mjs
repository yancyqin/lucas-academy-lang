import assert from 'node:assert/strict';
import {test} from 'node:test';
import {sentenceGameUrl, SENTENCE_GAME_PAGE} from '../public/js/sentence-games.js';

test('Chinese, English, and mixed sentences reach the standalone page without text loss', () => {
  for (const text of ['我们一起学习，一起成长。', 'Love is patient; love is kind.', '“Hello & 你好!”\nA + B = #1? 100%']) {
    for (const mode of ['sequence', 'characters', 'words']) {
      const url = new URL(sentenceGameUrl({text, lang: 'zh', ui: 'en', title: '课文 & Story', mode}));
      assert.equal(url.origin + url.pathname, SENTENCE_GAME_PAGE);
      assert.equal(url.search, '');
      const params = new URLSearchParams(url.hash.slice(1));
      assert.equal(params.get('text'), text);
      assert.equal(params.get('mode'), mode);
      assert.equal(params.get('ui'), 'en');
      assert.equal(params.get('lang'), 'zh');
      assert.equal(params.get('title'), '课文 & Story');
    }
  }
});

test('local previews use the same link contract', () => {
  const url = new URL(sentenceGameUrl({text: 'A short sentence.', lang: 'en'}, 'http://localhost:5173/sentence.html?old=yes'));
  assert.equal(url.origin, 'http://localhost:5173');
  assert.equal(url.pathname, '/sentence.html');
  assert.equal(url.search, '');
});
