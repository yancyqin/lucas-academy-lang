// The reading page: the lesson rail, and the section's verses — each verse
// whole in the first language, then the same verse in the second.
import {el, button, fill} from './tokens.js';
import {t, pick} from './strings.js';
import * as english from './english.js';
import {illustrationFigure} from './illustrations.js';
import {sentenceGames} from './sentence-games.js';

const $ = id => document.getElementById(id);

export function createReader(app) {
  const {state} = app;

  function renderNav() {
    const lesson = app.lesson();
    $('lesson-select').value = lesson.id;
    $('lesson-reference').textContent = pick(lesson.reference);
    const nav = $('section-nav');
    nav.replaceChildren();
    lesson.sections.forEach((section, i) => {
      const done = app.isDone(section);
      const item = button('', () => app.changeSection(i), 'section-button');
      if (i === state.section) item.setAttribute('aria-current', 'step');
      const copy = el('span');
      const meta = t('sectionMeta', {first: section.range[0], last: section.range[1], count: section.verseIds.length});
      copy.append(el('strong', '', pick(section.title)), el('small', '', meta));
      // 课堂共读: a part the teacher reads with the class (the lesson's own marks, or a link's).
      if (app.isInClass(section)) {
        item.classList.add('in-class');
        copy.append(el('span', 'reading-mark', t('inClass')));
      }
      item.append(el('span', 'section-number', done ? '✓' : String(i + 1)), copy);
      if (done) item.setAttribute('aria-label', t('sectionDone', {title: pick(section.title)}));
      nav.append(item);
    });
    // Three cards need a scrolling row on phones so their sentence ranges fit.
    // Longer lists also scroll in the sidebar and keep the current part in view.
    nav.classList.toggle('many', lesson.sections.length > 2);
    const current = nav.querySelector('[aria-current="step"]');
    if (current && nav.classList.contains('many')) {
      nav.scrollTop = current.offsetTop - (nav.clientHeight - current.offsetHeight) / 2;
      nav.scrollLeft = current.offsetLeft - (nav.clientWidth - current.offsetWidth) / 2;
    }
    const finished = lesson.sections.filter(app.isDone).length;
    $('progress-text').textContent = t('progress', {done: finished, total: lesson.sections.length});
    $('lesson-progress').max = lesson.sections.length;
    $('lesson-progress').value = finished;
  }

  function line(verse, lang) {
    const row = el('div', 'language-line');
    row.dataset.language = lang;
    const tools = el('div', 'line-controls');
    tools.append(el('span', 'lang-code', lang === 'zh' ? '中' : 'EN'));
    const play = button('▶', () => app.readVerse(verse, lang), 'line-play');
    play.setAttribute('aria-label', t('readVerse', {n: verse.n, language: t(lang)}));
    tools.append(play);
    if (state.dictation) {
      const slow = button(t('slow'), () => app.readVerse(verse, lang, true), 'slow-verse');
      slow.setAttribute('aria-label', t('slowVerse', {n: verse.n, language: t(lang)}));
      tools.append(slow);
    }
    row.append(tools);

    const hidden = state.dictation && lang === state.first && !state.revealed.has(verse.id + lang);
    if (hidden) {
      const reveal = button(t('reveal'), () => {
        state.revealed.add(verse.id + lang);
        renderVerses();
      }, 'blank-line');
      reveal.setAttribute('aria-label', t('revealLabel', {n: verse.n, language: t(lang)}));
      row.append(reveal);
      return row;
    }
    // 遮住: the second language waits under a card. Think first, then tap.
    const covered = state.hideSecond && lang !== state.first && !state.revealed.has(verse.id + lang);
    if (covered) {
      const reveal = button(t('revealSecond'), () => {
        state.revealed.add(verse.id + lang);
        renderVerses();
      }, 'blank-line second-cover');
      reveal.setAttribute('aria-label', t('revealSecondLabel', {n: verse.n}));
      row.append(reveal);
      return row;
    }
    const text = el('p', 'verse-text ' + lang);
    text.lang = lang === 'zh' ? 'zh-CN' : 'en';
    const words = lang === 'zh' ? verse.tokens.join('') : english.text(verse.id);
    if (!words) {
      const reason = english.problem(app.lesson(), app.section());
      text.append(el('span', 'en-pending', t(reason ? 'englishSeeBelow' : 'loadingEnglish')));
    } else {
      fill(text, {lang, text: words, tokens: verse.tokens}, app.tokenContext(),
        (word, language, source) => app.openWord(word, language, verse, source));
    }
    row.append(text);
    return row;
  }

  // A plain lesson reads as one passage per language: the whole
  // part in the first language, then in the second, both shown, no study tools.
  function renderPassage(container) {
    for (const lang of [state.first, app.other(state.first)]) {
      const row = el('article', 'language-line passage');
      row.dataset.language = lang;
      const tools = el('div', 'line-controls');
      tools.append(el('span', 'lang-code', lang === 'zh' ? '中' : 'EN'));
      const text = el('p', 'verse-text ' + lang);
      text.lang = lang === 'zh' ? 'zh-CN' : 'en';
      app.verses().forEach((verse, i) => {
        const words = lang === 'zh' ? verse.tokens.join('') : english.text(verse.id);
        if (!words) return;
        if (lang === 'en' && i) text.append(' ');
        const sentence = el('span', 'passage-sentence');
        sentence.dataset.verse = verse.id;
        fill(sentence, {lang, text: words, tokens: verse.tokens}, app.tokenContext(),
          (word, language, source) => app.openWord(word, language, verse, source));
        text.append(sentence);
      });
      row.append(tools, text);
      container.append(row);
    }
  }

  function renderQuestions(container, questions, title) {
    const discussion = el('section', 'discussion passage-discussion');
    discussion.append(el('h3', '', title));
    for (const question of questions) {
      const item = el('div', 'question');
      for (const lang of [state.first, app.other(state.first)]) {
        const text = el('p', '', question[lang]);
        text.lang = lang === 'zh' ? 'zh-CN' : 'en';
        item.append(text);
      }
      discussion.append(item);
    }
    container.append(discussion);
  }

  // Read the idiom and its story together, then discuss the whole story.
  // Scripture keeps its own reading, recording and discussion below it.
  function renderIdiomPassage(container) {
    const [title, ...story] = app.verses().filter(verse => !verse.ref);
    for (const lang of [state.first, app.other(state.first)]) {
      const row = el('article', 'language-line passage idiom-passage');
      row.dataset.language = lang;
      const label = el('div', 'line-controls');
      label.append(el('span', 'lang-code', lang === 'zh' ? '中' : 'EN'));
      const content = el('div');
      const heading = el('h3', 'passage-sentence');
      heading.lang = lang === 'zh' ? 'zh-CN' : 'en';
      heading.dataset.verse = title.id;
      fill(heading, {lang, text: lang === 'zh' ? title.tokens.join('') : english.text(title.id), tokens: title.tokens}, app.tokenContext(),
        (word, language, source) => app.openWord(word, language, title, source));
      const text = el('p', 'verse-text ' + lang);
      text.lang = heading.lang;
      story.forEach((verse, i) => {
        if (lang === 'en' && i) text.append(' ');
        const sentence = el('span', 'passage-sentence');
        sentence.dataset.verse = verse.id;
        fill(sentence, {lang, text: lang === 'zh' ? verse.tokens.join('') : english.text(verse.id), tokens: verse.tokens}, app.tokenContext(),
          (word, language, source) => app.openWord(word, language, verse, source));
        text.append(sentence);
      });
      const meaning = el('p', 'idiom-meaning', title.explain[lang]);
      meaning.lang = heading.lang;
      content.append(heading, text, meaning);
      row.append(label, content);
      container.append(row);
    }
    const illustration = illustrationFigure(app.lesson().id, title.id);
    if (illustration) container.append(illustration);
    renderQuestions(container, app.section().questions, t('passageDiscussion'));
    container.append(el('h3', 'scripture-heading', t('scriptureReading')));
  }

  function renderVerses() {
    const container = $('verses');
    container.replaceChildren();
    const plain = app.lesson().layout === 'plain';
    const passage = app.section().layout === 'passage';
    if (plain) renderPassage(container);
    if (plain && app.section().questions) renderQuestions(container, app.section().questions, t('readingDiscussion'));
    if (passage) renderIdiomPassage(container);
    for (const verse of plain ? [] : passage ? app.studyVerses() : app.verses()) {
      const row = el('article', 'verse-group');
      row.dataset.verse = verse.id;
      row.append(el('span', 'verse-number', String(verse.n).padStart(2, '0')));
      const content = el('div', 'verse-content');
      // 视角: a unit may say how it looks at the part's theme (an idiom's scripture).
      if (verse.angle) content.append(el('p', 'verse-angle', t('angle_' + verse.angle)));
      for (const lang of [state.first, app.other(state.first)]) content.append(line(verse, lang));
      const illustration = illustrationFigure(app.lesson().id, verse.id);
      if (illustration) content.append(illustration);
      if (!state.dictation) {
        const actions = el('div', 'verse-actions');
        const games = sentenceGames({zh: verse.tokens.join(''), en: english.text(verse.id),
          title: `${pick(app.lesson().title)} · ${verse.n}`, first: state.first,
          onOpen: () => app.audio.stop()});
        const learn = button(t('studyThis'), () => app.study.open(verse.id, learn), 'verse-study');
        learn.setAttribute('aria-label', t('studyThisLabel', {n: verse.n}));
        actions.append(games, learn);
        content.append(actions);
      }
      row.append(content);
      container.append(row);
      if (passage) renderQuestions(container, [app.lesson().study[verse.id].question], t('scriptureDiscussion'));
    }
    if (app.playingVerse) markPlaying(app.playingVerse);

    const status = $('english-state');
    status.replaceChildren();
    const reason = english.problem(app.lesson(), app.section());
    if (reason) {
      status.append(document.createTextNode(english.describe(reason)), button(t('retryEnglish'), app.retryEnglish));
    }
  }

  function markPlaying(verseId) {
    document.querySelectorAll('.verse-group, .passage-sentence').forEach(node => node.classList.toggle('playing', node.dataset.verse === verseId));
  }

  return {renderNav, renderVerses, markPlaying};
}
