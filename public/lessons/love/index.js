import {verses, sections} from './text.js';
import {study} from './study.js';
import {words, connectors, suggested} from './words.js';

const dict = {};
const aliases = {};
for (const [list, small] of [[words, false], [connectors, true]]) {
  for (const [word, pinyin, meaning, meaningZh, concept, english] of list) {
    dict[word] = {pinyin, meaning, meaningZh, concept, small};
    for (const alias of english) aliases[alias] = word;
  }
}

export default {
  id: 'love',
  title: '爱的篇章',
  reference: '哥林多前书 13 章',
  passage: {book: '1CO', chapter: 13},
  chineseSource: 'https://b.ibible.hk/bible/9/1co/13',
  sections,
  verses,
  study,
  dict,
  aliases,
  suggested,
  audio: 'audio/love/manifest.json',
};
