import {studyUnits} from './study-content.js';

export function createStudy(api){
 const $=id=>document.getElementById(id);
 const dialog=$('study-dialog');
 const el=(tag,cls,text)=>{const n=document.createElement(tag);n.className=cls||'';if(text!==undefined)n.textContent=text;return n;};
 const button=(text,fn)=>{const b=el('button','',text);b.type='button';b.onclick=fn;return b;};
 let verses=[],index=0,part=0,mode='whole',teacher='zh',opener=null,activeWord=null;
 const verse=()=>verses[index];
 const units=()=>studyUnits(api.lesson().id,verse(),api.text(verse(),'en'));
 const unit=()=>{const u=units();return mode==='parts'&&u.parts.length?u.parts[part]:u.whole;};
 const noteKey=()=>`study-note.v1.${api.lesson().id}.${verse().n}.${mode==='parts'?'part-'+part:'whole'}`;
 function renderTeacher(){
  $('study-teach-text').textContent=teacher==='zh'?'这次你来教中文。选这句里的一个词，说说它的意思。':'Your turn to teach English. Pick a word in this sentence and explain it.';
  $('study-teach-text').lang=teacher==='zh'?'zh-CN':'en';
 }
 function showWord(word,lang,source){
  activeWord={word,lang,source};renderWord();
 }
 function renderWord(){
  if(!activeWord)return;
  const {word,lang,source}=activeWord,info=api.wordInfo(word,lang,verse()),box=$('study-word');
  dialog.querySelectorAll('.word.selected').forEach(n=>n.classList.remove('selected'));source?.classList.add('selected');
  box.hidden=false;box.replaceChildren();
  const heading=el('div','study-word-heading');
  const label=el('div');label.append(el('h3','',word),el('p','',info.pinyin|| (lang==='en'?'English':'中文')));
  const close=button('收起词语',()=>{box.hidden=true;activeWord=null;source?.classList.remove('selected');if(source?.isConnected)source.focus({preventScroll:true});});
  heading.append(label,close);box.append(heading);
  box.append(el('p','study-word-meaning',info.meaning),el('p','',info.meaningZh||info.usage||'先听一听，再看看它在这一句里的意思。'));
  const actions=el('div','study-word-actions');
  actions.append(button('听这个词',()=>api.read([{text:word,lang}])));
  actions.append(button('慢一点',()=>api.read([{text:word,lang,slow:true}])));
  actions.append(button(api.hasMark(word,lang)?'移出生词本':'加入生词本',()=>{
   api.toggleMark(word,lang);source?.classList.toggle('marked',api.hasMark(word,lang));renderWord();
  }));box.append(actions);
  // Stay in the modal's accessible top layer, with an explicit way back to the word.
  close.focus({preventScroll:true});box.scrollIntoView({block:'nearest',behavior:'instant'});
 }
 function render(){
  if(!dialog.open)return;
  let data=units();if(!data.parts.length){mode='whole';part=0;}
  const current=unit(),first=api.first();
  $('study-title').textContent=api.lesson().title;
  $('study-context').textContent=`${api.section().title} · 第 ${verses[0].n}–${verses.at(-1).n} 节`;
  $('study-unit').textContent=`第 ${index+1} / ${verses.length} 句${mode==='parts'?' · 短句 '+(part+1)+' / '+data.parts.length:' · 慢慢读，再一起说说'}`;
  const nav=$('study-verse-nav');nav.replaceChildren();
  verses.forEach((v,i)=>{const b=button(String(v.n).padStart(2,'0'),()=>{index=i;part=0;move();});b.setAttribute('aria-label',`学习第${v.n}节`);if(index===i)b.setAttribute('aria-current','step');nav.append(b);});
  $('study-whole').setAttribute('aria-pressed',String(mode==='whole'));
  $('study-parts').setAttribute('aria-pressed',String(mode==='parts'));
  $('study-parts').disabled=!data.parts.length;
  $('study-parts').title=data.reason==='loading'?'英文加载后，可以对照拆成短句':data.reason==='changed'?'这一句的文字有更新，先读完整的一句':data.reason==='unavailable'?'这篇先按整句学习':'按意思，一小句一小句地读';
  $('study-flip').textContent=(first==='zh'?'中文在前':'English first')+' ⇅';
  $('study-pinyin').checked=api.pinyin();
  const reading=$('study-reading');reading.replaceChildren();
  for(const lang of [first,first==='zh'?'en':'zh']){
   const line=el('div','study-language');line.dataset.language=lang;
   const header=el('div','study-language-label');header.append(el('span','',lang==='zh'?'中文':'English'));
   const play=button(lang==='zh'?'听中文':'Listen',()=>api.read([{text:current[lang],lang,n:verse().n}]));play.disabled=!current[lang];header.append(play);
   const p=el('p','study-text '+lang);p.lang=lang==='zh'?'zh-CN':'en';
   api.fillTokens(p,verse(),lang,{text:current[lang],tokens:current.tokens,onWord:(word,language,v,source)=>showWord(word,language,source)});
   line.append(header,p);reading.append(line);
  }
  $('study-listen').disabled=!current.en;
  $('study-listen').textContent=mode==='parts'?'听这个短句 · 双语':'听这一句 · 双语';
  $('study-retry').hidden=Boolean(current.en)||!api.englishError();
  $('study-explain-zh').textContent=verse().explainZh;
  $('study-explain-en').textContent=verse().explainEn;
  const questions=$('study-question');questions.replaceChildren();
  for(const lang of [first,first==='zh'?'en':'zh']){const p=el('p',lang,current.question[lang==='zh'?0:1]);p.lang=lang==='zh'?'zh-CN':'en';questions.append(p);}
  $('study-thought').value=api.getSaved(noteKey(),'');
  $('study-thought').oninput=()=>api.save(noteKey(),$('study-thought').value);
  renderTeacher();
  $('study-previous').disabled=index===0&&part===0;
  $('study-previous').textContent=mode==='parts'?'上一小句':'上一句';
  const last=index===verses.length-1&&(mode==='whole'||part===data.parts.length-1);
  $('study-next').textContent=last?'这段学完了':mode==='parts'&&part<data.parts.length-1?'下一小句':'下一句';
  $('study-step').textContent=`${index+1} / ${verses.length}${mode==='parts'?' · '+(part+1)+'/'+data.parts.length:''}`;
 }
 function move(){
  api.stop();activeWord=null;$('study-word').hidden=true;
  $('study-explain').open=false;$('study-notes').open=false;dialog.querySelector('.study-hint').open=false;
  render();$('study-scroll').scrollTop=0;$('study-title').focus({preventScroll:true});
 }
 function close(){dialog.close();}
 dialog.addEventListener('close',()=>{
  api.stop();activeWord=null;document.body.classList.remove('study-open');
  (opener?.isConnected?opener:$('open-study')).focus({preventScroll:true});
 });
 $('study-close').onclick=close;
 dialog.addEventListener('keydown',e=>{
  if(e.key!=='Tab')return;
  const focusable=[...dialog.querySelectorAll('button,a[href],input,select,textarea,summary,[tabindex="0"]')]
   .filter(n=>!n.matches(':disabled')&&n.getClientRects().length);
  const first=focusable[0],last=focusable.at(-1);
  if(e.shiftKey&&(document.activeElement===first||document.activeElement===$('study-title'))){e.preventDefault();last?.focus();}
  else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first?.focus();}
 });
 $('study-whole').onclick=()=>{mode='whole';part=0;move();};
 $('study-parts').onclick=()=>{if(!units().parts.length)return;mode='parts';part=0;move();};
 $('study-flip').onclick=()=>{api.flip();activeWord=null;$('study-word').hidden=true;render();};
 $('study-pinyin').onchange=e=>api.setPinyin(e.target.checked);
 $('study-listen').onclick=()=>{const u=unit();api.read([api.first(),api.first()==='zh'?'en':'zh'].map(lang=>({text:u[lang],lang,n:verse().n})));};
 $('study-pause').onclick=()=>api.pause();$('study-stop').onclick=()=>api.stop();
 $('study-retry').onclick=()=>{api.retry();render();};
 $('study-switch-teacher').onclick=()=>{teacher=teacher==='zh'?'en':'zh';renderTeacher();};
 $('study-previous').onclick=()=>{
  if(mode==='parts'&&part>0)part--;
  else if(index>0){index--;part=mode==='parts'?Math.max(0,units().parts.length-1):0;}
  move();
 };
 $('study-next').onclick=()=>{
  if(mode==='parts'&&part<units().parts.length-1){part++;move();return;}
  if(index<verses.length-1){index++;part=0;move();return;}
  api.complete();close();
 };
 return{
  open(n,source){api.prepare();opener=source;verses=api.verses();index=Math.max(0,verses.findIndex(v=>v.n===n));part=0;mode='whole';teacher='zh';activeWord=null;$('study-word').hidden=true;dialog.showModal();document.body.classList.add('study-open');move();},
  refresh(){render();},
  notify(text){$('study-audio-status').textContent=text;},
  controls(active,paused){$('study-pause').hidden=!active;$('study-stop').hidden=!active;$('study-pause').textContent=paused?'继续':'暂停';},
  get isOpen(){return dialog.open;},
 };
}
