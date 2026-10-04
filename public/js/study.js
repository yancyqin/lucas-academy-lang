// 逐句学: one verse at a time in large type, whole or in aligned short clauses,
// with that verse's (or clause's) own question, word help, turn-taking and a
// note. A native <dialog>: focus stays inside, Esc closes, and closing returns
// focus to the button that opened it.
import {el, button, fill} from './tokens.js';
import {studyUnits} from './units.js';
import * as dictionary from './dictionary.js';
import * as english from './english.js';
import {picture} from './wordpanel.js';
import {t, pick} from './strings.js';

const $ = id => document.getElementById(id);
const other = lang => (lang === 'zh' ? 'en' : 'zh');

export function createStudy(app) {
  const dialog = $('study-dialog');
  let verses = [];
  let index = 0;
  let part = 0;
  let mode = 'whole';
  let teacher = 'zh';
  let opener = null;
  let activeWord = null;
  let isOpen = false;
  const revealed = new Set(); // 遮住: second-language lines opened in this visit

  const verse = () => verses[index];
  const units = () => studyUnits(app.lesson(), verse(), english.text(verse().id));
  const unit = () => {
    const data = units();
    return mode === 'parts' && data.parts.length ? data.parts[part] : data.whole;
  };
  const noteKey = () => `note.${app.lesson().id}.${verse().id}.${unit().id}`;
  const where = () => (mode === 'parts' ? t('wherePart', {n: verse().n, p: part + 1}) : t('whereVerse', {n: verse().n}));

  function item(current, lang) {
    const text = current[lang];
    return {text, lang, n: verse().n, verseId: verse().id, where: where(),
      clip: app.clipFor(verse().id, current.id, lang, text)};
  }

  function renderTeacher() {
    const text = $('study-teach-text');
    text.textContent = teacher === 'zh'
      ? '这次你来教中文。选这句里的一个词，说说它的意思。'
      : 'Your turn to teach English. Pick a word in this sentence and explain it.';
    text.lang = teacher === 'zh' ? 'zh-CN' : 'en';
  }

  function hideWord() {
    activeWord = null;
    $('study-word').hidden = true;
  }

  function renderWord() {
    if (!activeWord) return;
    const {word, lang, source} = activeWord;
    const info = dictionary.info(word, lang, app.lesson());
    const box = $('study-word');
    dialog.querySelectorAll('.word.selected').forEach(n => n.classList.remove('selected'));
    source?.classList.add('selected');
    box.hidden = false;
    box.replaceChildren();
    const heading = el('div', 'study-word-heading');
    const label = el('div');
    const title = el('h3', '', word);
    title.lang = lang === 'zh' ? 'zh-CN' : 'en';
    label.append(title, el('p', '', info.pronunciation || t(lang)));
    const close = button(t('hideWord'), () => {
      hideWord();
      source?.classList.remove('selected');
      if (source?.isConnected) source.focus({preventScroll: true});
    });
    heading.append(label, close);
    box.append(heading);
    box.append(el('p', 'study-word-meaning', info.meaning), el('p', '', info.explain || t('studyWordFallback')));
    const figure = picture(info);
    if (figure) box.append(figure);
    const actions = el('div', 'study-word-actions');
    actions.append(button(t('hearWord'), () => app.readWord(word, lang)));
    actions.append(button(t('slower'), () => app.readWord(word, lang, true)));
    actions.append(button(t(app.isMarked(word, lang) ? 'removeWord' : 'addWord'), () => {
      app.toggleMark(word, lang);
      source?.classList.toggle('marked', app.isMarked(word, lang));
      renderWord();
    }));
    box.append(actions);
    // The word stays inside the dialog's top layer, with a clear way back.
    close.focus({preventScroll: true});
    box.scrollIntoView({block: 'nearest', behavior: 'instant'});
  }

  function render() {
    if (!dialog.open) return;
    const data = units();
    if (!data.parts.length) {
      mode = 'whole';
      part = 0;
    }
    const current = unit();
    const first = app.state.first;
    const lesson = app.lesson();
    const section = app.section();
    $('study-title').textContent = pick(lesson.title);
    $('study-context').textContent = t('studyContext', {title: pick(section.title), first: verses[0].n, last: verses.at(-1).n});
    $('study-unit').textContent = mode === 'parts'
      ? t('unitPart', {i: index + 1, n: verses.length, p: part + 1, m: data.parts.length})
      : t('unitWhole', {i: index + 1, n: verses.length});

    const nav = $('study-verse-nav');
    nav.replaceChildren();
    verses.forEach((v, i) => {
      const jump = button(String(v.n).padStart(2, '0'), () => {
        index = i;
        part = 0;
        move();
      });
      jump.setAttribute('aria-label', t('jumpVerse', {n: v.n}));
      if (index === i) jump.setAttribute('aria-current', 'step');
      nav.append(jump);
    });

    $('study-whole').setAttribute('aria-pressed', String(mode === 'whole'));
    $('study-parts').setAttribute('aria-pressed', String(mode === 'parts'));
    $('study-parts').disabled = !data.parts.length;
    $('study-parts').title = t({loading: 'partsLoading', changed: 'partsChanged', unavailable: 'partsUnavailable'}[data.reason] || 'partsReady');
    $('study-flip').textContent = (first === 'zh' ? '中文在前' : 'English first') + ' ⇅';
    $('study-pinyin').checked = app.state.pinyin;

    const reading = $('study-reading');
    reading.replaceChildren();
    for (const lang of [first, other(first)]) {
      const line = el('div', 'study-language');
      line.dataset.language = lang;
      const header = el('div', 'study-language-label');
      header.append(el('span', '', t(lang)));
      const play = button(t('listen_' + lang), () => app.audio.play([item(current, lang)]));
      play.setAttribute('aria-label', t('listenLabel_' + lang));
      play.disabled = !current[lang];
      header.append(play);
      // 遮住: the second language waits under a card until it is tapped.
      const key = `${verse().id}#${current.id}#${lang}`;
      if (lang !== first && app.state.hideSecond && !revealed.has(key)) {
        const cover = button(t('revealSecond'), () => {
          revealed.add(key);
          render();
          dialog.querySelector(`.study-language[data-language="${lang}"] .study-language-label button`)?.focus({preventScroll: true});
        }, 'study-cover');
        line.append(header, cover);
        reading.append(line);
        continue;
      }
      const text = el('p', 'study-text ' + lang);
      text.lang = lang === 'zh' ? 'zh-CN' : 'en';
      if (current[lang]) {
        fill(text, {lang, text: current[lang], tokens: current.tokens}, app.tokenContext(),
          (word, language, source) => {
            activeWord = {word, lang: language, source};
            renderWord();
          });
      } else {
        const reason = english.problem(lesson, section);
        text.append(el('span', 'en-pending', reason ? english.describe(reason) : t('loadingEnglish')));
      }
      line.append(header, text);
      reading.append(line);
    }

    $('study-listen').disabled = !current.en;
    $('study-listen').textContent = t(mode === 'parts' ? 'listenBothPart' : 'listenBothVerse');
    $('study-retry').hidden = Boolean(current.en) || !english.problem(lesson, section);
    $('study-explain-zh').textContent = verse().explain.zh;
    $('study-explain-en').textContent = verse().explain.en;
    // Bilingual helper text follows the reading order too.
    for (const id of ['study-explain-text', 'study-hint-text']) {
      const box = $(id);
      box.append(box.querySelector(`[data-language="${first}"]`), box.querySelector(`[data-language="${other(first)}"]`));
    }

    const questions = $('study-question');
    questions.replaceChildren();
    for (const lang of [first, other(first)]) {
      const q = el('p', lang, current.question?.[lang] || '');
      q.lang = lang === 'zh' ? 'zh-CN' : 'en';
      questions.append(q);
    }
    $('study-thought').value = app.load(noteKey(), '');
    renderTeacher();

    $('study-previous').disabled = index === 0 && part === 0;
    $('study-previous').textContent = t(mode === 'parts' ? 'prevPart' : 'prevVerse');
    const last = index === verses.length - 1 && (mode === 'whole' || part === data.parts.length - 1);
    $('study-next').textContent = t(last ? 'finishPart' : mode === 'parts' && part < data.parts.length - 1 ? 'nextUnitPart' : 'nextVerse');
    $('study-step').textContent = t('step', mode === 'parts' ? {i: index + 1, n: verses.length, p: part + 1, m: data.parts.length} : {i: index + 1, n: verses.length});
  }

  // Any change of verse or clause ends the old sound and starts at the top.
  function move() {
    app.audio.stop();
    hideWord();
    $('study-explain').open = false;
    $('study-notes').open = false;
    dialog.querySelector('.study-hint').open = false;
    render();
    $('study-scroll').scrollTop = 0;
    $('study-title').focus({preventScroll: true});
  }

  // Closing ends the sound at once, on every path (the button, Esc, the end of
  // a section). The close event fires later — some browsers hold it while the
  // tab is hidden — so it is only a backstop and does nothing a second time.
  function cleanup() {
    if (!isOpen) return false;
    isOpen = false;
    app.audio.stop();
    hideWord();
    document.body.classList.remove('study-open');
    return true;
  }
  // The opener may have been re-rendered away; 逐句学 always exists.
  const restoreFocus = () => (opener?.isConnected ? opener : $('open-study')).focus({preventScroll: true});
  function close() {
    cleanup();
    if (dialog.open) dialog.close();
    restoreFocus();
  }
  dialog.addEventListener('cancel', event => {
    event.preventDefault();
    close();
  });
  dialog.addEventListener('close', () => {
    if (dialog.open) return; // a late event from a dialog already opened again
    if (cleanup()) restoreFocus();
  });
  $('study-close').onclick = close;
  dialog.addEventListener('keydown', event => {
    if (event.key !== 'Tab') return;
    const focusable = [...dialog.querySelectorAll('button,a[href],input,select,textarea,summary,[tabindex="0"]')]
      .filter(n => !n.matches(':disabled') && n.getClientRects().length);
    const first = focusable[0];
    const last = focusable.at(-1);
    if (event.shiftKey && (document.activeElement === first || document.activeElement === $('study-title'))) {
      event.preventDefault();
      last?.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first?.focus();
    }
  });
  $('study-thought').addEventListener('input', () => app.save(noteKey(), $('study-thought').value));
  $('study-whole').onclick = () => {
    mode = 'whole';
    part = 0;
    move();
  };
  $('study-parts').onclick = () => {
    if (!units().parts.length) return;
    mode = 'parts';
    part = 0;
    move();
  };
  // Flipping changes the order only: the same verse and clause stay in view.
  $('study-flip').onclick = () => {
    app.changeOrder(other(app.state.first));
    hideWord();
    render();
  };
  $('study-pinyin').onchange = event => app.setPinyin(event.target.checked);
  $('study-hide').onclick = () => {
    revealed.clear();
    app.setHideSecond(!app.state.hideSecond);
  };
  $('study-listen').onclick = () => {
    const current = unit();
    app.audio.play([app.state.first, other(app.state.first)].map(lang => item(current, lang)));
  };
  $('study-pause').onclick = () => app.audio.togglePause();
  $('study-stop').onclick = () => app.audio.stop();
  $('study-retry').onclick = () => app.retryEnglish();
  $('study-switch-teacher').onclick = () => {
    teacher = other(teacher);
    renderTeacher();
  };
  $('study-previous').onclick = () => {
    if (mode === 'parts' && part > 0) part -= 1;
    else if (index > 0) {
      index -= 1;
      part = mode === 'parts' ? Math.max(0, units().parts.length - 1) : 0;
    }
    move();
  };
  $('study-next').onclick = () => {
    if (mode === 'parts' && part < units().parts.length - 1) {
      part += 1;
      move();
      return;
    }
    if (index < verses.length - 1) {
      index += 1;
      part = 0;
      move();
      return;
    }
    // The end of the section: mark it learned and go back to its overview.
    // Moving on to the next section is the reader's own choice.
    close();
    app.completeSection();
  };

  return {
    open(verseId, source) {
      app.prepareStudy();
      opener = source;
      verses = app.verses();
      index = Math.max(0, verses.findIndex(v => v.id === verseId));
      part = 0;
      mode = 'whole';
      teacher = 'zh';
      revealed.clear();
      hideWord();
      dialog.showModal();
      isOpen = true;
      document.body.classList.add('study-open');
      move();
    },
    refresh: render,
    notify(text) {
      $('study-audio-status').textContent = text;
    },
    controls(active, paused) {
      $('study-pause').hidden = !active;
      $('study-stop').hidden = !active;
      $('study-pause').textContent = t(paused ? 'resume' : 'pause');
    },
    get isOpen() {
      return dialog.open;
    },
    close,
  };
}
