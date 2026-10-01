import {love,entries,makeSeed} from './lesson.js';
import * as recording from './record.js';
import {createStudy} from './study.js';

const $=id=>document.getElementById(id);
const el=(tag,cls,text)=>{const node=document.createElement(tag);if(cls)node.className=cls;if(text!==undefined)node.textContent=text;return node;};
const button=(text,fn,cls='')=>{const b=el('button',cls,text);b.type='button';b.addEventListener('click',fn);return b;};
const getSaved=(key,fallback)=>{try{return JSON.parse(localStorage.getItem('lucas-lang.preview.'+key))??fallback;}catch{return fallback;}};
const save=(key,value)=>{try{localStorage.setItem('lucas-lang.preview.'+key,JSON.stringify(value));}catch{}};
const reference=await fetch('./seed-reference.json').then(r=>r.json());
const lessons={love,seed:makeSeed(reference)};
const dictionary={...reference.dict};
const englishDictionary={};
for(const [word,pinyin,meaning,meaningZh,art,aliases] of entries){
  const entry={word,pinyin,meaning,meaningZh,art};dictionary[word]=entry;
  for(const alias of aliases)englishDictionary[alias]=entry;
}
const englishBasic={i:['我','说话的人自己'],you:['你','正在听对方说话的人'],we:['我们','包括自己和其他人'],it:['它','指刚刚说到的事物'],a:['一个','放在一个东西前面'],the:['这／那','指某个已经提到的东西'],and:['和；并且','把两个意思连在一起'],but:['但是','后面的意思有转折'],not:['不','表示否定'],is:['是','说明是什么或怎么样'],are:['是','说明是什么或怎么样'],have:['有','拥有'],do:['做','进行一个动作'],with:['和；带着','与某人或某物一起'],of:['的','连接两个词'],to:['向；到','连接一个动作或方向'],in:['在……里','说明位置或范围'],my:['我的','属于我'],me:['我','动作涉及的我'],when:['当……时候','说明时间'],child:['孩子','年纪还小的人'],children:['孩子们','不止一个孩子'],know:['知道','明白一件事'],known:['被知道','别人认识或知道'],fully:['完全地','全部，不只一部分'],seed:['种子','种在土里能长成植物'],soil:['土','植物生长的地方'],listen:['听','留心听见声音'],hear:['听见','耳朵听到'],man:['人','这里指成年人']};

const state={lesson:lessons[getSaved('lesson','love')]?getSaved('lesson','love'):'love',section:0,first:getSaved('first','zh')==='en'?'en':'zh',pinyin:getSaved('pinyin',false)===true,dictation:false,revealed:new Set(),marks:getSaved('marks',[]),done:getSaved('done',{}),panel:null};
if(!Array.isArray(state.marks))state.marks=[];
if(!state.done||typeof state.done!=='object')state.done={};
const english=new Map(),inFlight=new Map(),errors=new Set();
let attribution=null,selected=null,restoreFocus=null,recordTimer=null,deleteArmed=false;
const lesson=()=>lessons[state.lesson];
const section=()=>lesson().sections[state.section];
const currentVerses=()=>lesson().verses.filter(v=>v.n>=section().range[0]&&v.n<=section().range[1]);
const other=lang=>lang==='zh'?'en':'zh';
const languageName=lang=>lang==='zh'?'中文':'English';
const verseKey=(n,id=state.lesson)=>id+':'+n;
const chapterKey=()=>state.lesson+':'+state.section;
const hasMark=(word,lang)=>state.marks.some(m=>m.word===word&&m.lang===lang);
const textFor=(verse,lang)=>lang==='zh'?verse.tokens.join(''):english.get(verseKey(verse.n));
let study;
const notify=text=>{$('audio-status').textContent=text;study?.notify(text);};

// One playback owner for verse speech, word speech, paced reading and saved audio.
let generation=0,queue=[],queueIndex=0,speaking=false,paused=false,pendingNext=null,recordPlayback=false,utterance=null;
function controls(){
 $('pause').hidden=!(speaking||recordPlayback);$('stop').hidden=!(speaking||recordPlayback);
 $('pause').textContent=paused?'继续':'暂停';study?.controls(speaking||recordPlayback,paused);
}
function stopSound(clear=true){
 generation++;speaking=false;paused=false;pendingNext=null;queue=[];
 if('speechSynthesis'in window){speechSynthesis.resume();speechSynthesis.cancel();}
 recording.stopPlaying();recordPlayback=false;utterance=null;
 document.querySelectorAll('.verse-group.playing').forEach(v=>v.classList.remove('playing'));
 controls();if(clear)notify('');
}
function read(items){
 stopSound();
 if(!('speechSynthesis'in window)){notify('这台设备暂时没有可用的朗读声音。');return;}
 queue=items.filter(i=>i.text);if(!queue.length){notify('这句英文还在加载，加载完成后就可以试听。');return;}
 const mine=generation;speaking=true;queueIndex=0;controls();
 const next=()=>{
  if(mine!==generation)return;
  if(paused){pendingNext=next;return;}
  if(queueIndex>=queue.length){stopSound(false);notify('这一遍读完了。现在可以换你来读。');return;}
  const item=queue[queueIndex];
  document.querySelectorAll('.verse-group').forEach(v=>v.classList.toggle('playing',v.dataset.verse===String(item.n)));
  notify(`系统试听 · ${languageName(item.lang)}${item.n?' · 第 '+item.n+' 节':''}`);
  utterance=new SpeechSynthesisUtterance(item.text);utterance.lang=item.lang==='zh'?'zh-CN':'en-US';
  const voices=speechSynthesis.getVoices();const prefix=item.lang==='zh'?'zh':'en';
  const chosen=voices.find(v=>v.lang===utterance.lang)||voices.find(v=>v.lang.startsWith(prefix));if(chosen)utterance.voice=chosen;
  utterance.rate=item.slow?.62:Number($('speed').value);
  utterance.onend=()=>{if(mine!==generation)return;queueIndex++;setTimeout(next,item.slow?360:420);};
  utterance.onerror=e=>{if(mine!==generation)return;stopSound(false);notify('系统声音暂时不可用。请在 Safari 或 Chrome 中点击试听。');};
  speechSynthesis.speak(utterance);
 };next();
}
function readVerse(verse,lang,slow=false){
 const text=textFor(verse,lang);
 if(!text){notify('这句英文还未加载好，请稍后再点。');return;}
 let parts=slow?(lang==='zh'?verse.tokens:text.match(/[\p{L}\p{N}’'-]+/gu)||[]):[text];
 parts=parts.filter(p=>/[\p{L}\p{N}]/u.test(p));
 read(parts.map(text=>({text,lang,n:verse.n,slow})));
}
$('play-section').onclick=()=>{
 const verses=currentVerses();
 if(verses.some(v=>!english.has(verseKey(v.n)))){notify('英文还没加载完整；你可以先点击中文旁的播放按钮。');return;}
 read(verses.flatMap(v=>[state.first,other(state.first)].map(lang=>({text:textFor(v,lang),lang,n:v.n}))));
};
$('pause').onclick=()=>{
 if(recordPlayback){if(paused)recording.resumePlaying();else recording.pausePlaying();}
 else if(paused){speechSynthesis.resume();if(pendingNext){const fn=pendingNext;pendingNext=null;paused=false;fn();controls();return;}}
 else speechSynthesis.pause();
 paused=!paused;controls();notify(paused?'已暂停。准备好后可以继续。':'继续朗读。');
};
$('stop').onclick=()=>stopSound();

function renderNav(){
 $('lesson-select').value=state.lesson;$('lesson-reference').textContent=lesson().reference;
 const nav=$('section-nav');nav.replaceChildren();
 lesson().sections.forEach((s,i)=>{
  const completed=Boolean(state.done[state.lesson+':'+i]);
  const b=button('',()=>changeSection(i),'section-button');
  if(i===state.section)b.setAttribute('aria-current','step');
  const num=el('span','section-number',completed?'✓':String(i+1));
  const copy=el('span');copy.append(el('strong','',s.title),el('small','',`${s.range[0]}–${s.range[1]} 节 · ${s.range[1]-s.range[0]+1} 句`));b.append(num,copy);nav.append(b);
 });
 const count=lesson().sections.filter((_,i)=>state.done[state.lesson+':'+i]).length;
 $('progress-text').textContent=`已学 ${count} / ${lesson().sections.length} 小段`;$('lesson-progress').max=lesson().sections.length;$('lesson-progress').value=count;
}
function tokenButton(word,lang,verse,onWord=openWord){
 const b=button('',()=>onWord(word,lang,verse,b),'word');
 if(lang==='zh'){
  const ruby=el('ruby','',word);const pinyin=dictionary[word]?.pinyin;if(pinyin)ruby.append(el('rt','',pinyin));b.append(ruby);
  b.setAttribute('aria-label',`${word}${pinyin?'，'+pinyin:''}`);
 }else b.textContent=word;
 if((lang==='zh'&&dictionary[word]?.art)||(lang==='en'&&englishDictionary[word.toLowerCase()]))b.classList.add('key-word');
 b.classList.toggle('marked',hasMark(word,lang));
 if(selected?.word===word&&selected.lang===lang)b.classList.add('selected');
 return b;
}
function fillTokens(container,verse,lang,options={}){
 const text=options.text??textFor(verse,lang);
 if(!text){container.append(el('span','en-pending',errors.has(chapterKey())?'英文暂时未能加载，请点下方重试。':'正在加载这一节英文…'));return;}
 const tokens=lang==='zh'?(options.tokens??verse.tokens):text.split(/([\p{L}\p{N}]+(?:[’'-][\p{L}\p{N}]+)*)/u);
 if(lang==='zh'){
  let prefix='';
  for(let i=0;i<tokens.length;i++){
   const token=tokens[i];
   if(/^[（「『《“]$/.test(token)){prefix+=token;continue;}
   if(!/[\p{L}\p{N}]/u.test(token)){container.append(document.createTextNode(prefix+token));prefix='';continue;}
   const group=el('span','lexeme');
   if(prefix){group.append(document.createTextNode(prefix));prefix='';}
   group.append(tokenButton(token,lang,verse,options.onWord));
   while(i+1<tokens.length&&!/[\p{L}\p{N}]/u.test(tokens[i+1])&&!/^[（「『《“]$/.test(tokens[i+1]))group.append(document.createTextNode(tokens[++i]));
   container.append(group);
  }
 }else for(const token of tokens){if(/[\p{L}\p{N}]/u.test(token))container.append(tokenButton(token,lang,verse,options.onWord));else container.append(document.createTextNode(token));}
}
function renderVerses(){
 const container=$('verses');container.replaceChildren();
 for(const verse of currentVerses()){
  const row=el('article','verse-group');row.dataset.verse=verse.n;
  row.append(el('span','verse-number',String(verse.n).padStart(2,'0')));
  const content=el('div','verse-content');
  for(const lang of [state.first,other(state.first)]){
   const line=el('div','language-line');line.dataset.language=lang;
   const tools=el('div','line-controls');tools.append(el('span','lang-code',lang==='zh'?'中':'EN'));
   const play=button('▶',()=>readVerse(verse,lang),'line-play');play.setAttribute('aria-label',`读第${verse.n}节${languageName(lang)}`);tools.append(play);
   if(state.dictation){const slow=button('慢读',()=>readVerse(verse,lang,true),'slow-verse');slow.setAttribute('aria-label',`逐词慢读第${verse.n}节${languageName(lang)}`);tools.append(slow);}
   line.append(tools);
   const hidden=state.dictation&&lang===state.first&&!state.revealed.has(verseKey(verse.n)+lang);
   if(hidden){const reveal=button('先听一听，写好后点这里看原文',()=>{state.revealed.add(verseKey(verse.n)+lang);renderVerses();},'blank-line');reveal.setAttribute('aria-label',`显示第${verse.n}节${languageName(lang)}原文`);line.append(reveal);}
   else{const p=el('p','verse-text '+lang);p.lang=lang==='zh'?'zh-CN':'en';fillTokens(p,verse,lang);line.append(p);}
   content.append(line);
  }
  if(!state.dictation){
   const actions=el('div','verse-actions'),detail=el('details','sentence-explain');
   detail.append(el('summary','','用简单的话理解'),el('p','',verse.explainZh),el('p','',verse.explainEn));
   const learn=button('学这一句',()=>study.open(verse.n,learn),'verse-study');learn.setAttribute('aria-label',`学第${verse.n}节这一句`);
   actions.append(detail,learn);content.append(actions);
  }
  row.append(content);container.append(row);
 }
 const error=errors.has(chapterKey());$('english-state').replaceChildren();
 if(error){$('english-state').append(document.createTextNode('英文暂时没有连接上，中文仍然可以学习。'),button('重试英文',()=>{errors.delete(chapterKey());renderVerses();loadEnglish();}));}
}
function render(){
 renderNav();$('lesson-title').textContent=lesson().title;
 $('section-kicker').textContent=`${lesson().reference} · 第 ${state.section+1} 小段`;
 $('section-intro').textContent=section().intro;
 $('chinese-source').href=state.lesson==='love'?'https://b.ibible.hk/bible/9/1co/13':'https://b.ibible.hk/bible/9/mrk/4';
 $('first-language').value=state.first;$('second-language').value=other(state.first);
 $('order-hint').textContent=state.first==='zh'?'一句中文，一句英文。':'一句英文，一句中文。';
 $('complete-next').dataset.review='false';
 $('pinyin').checked=state.pinyin;$('dictation').checked=state.dictation;document.body.classList.toggle('show-pinyin',state.pinyin);
 $('section-counter').textContent=`${state.section+1} / ${lesson().sections.length}`;$('previous').disabled=state.section===0;
 $('complete-next').textContent=state.section===lesson().sections.length-1?'这一篇学完了':'这段学完了，下一段';
 renderVerses();$('word-count').textContent=state.marks.length;loadEnglish();
}
async function loadEnglish(){
 const id=state.lesson,index=state.section,current=lessons[id],s=current.sections[index];const key=id+':'+index;
 const wanted=current.verses.filter(v=>v.n>=s.range[0]&&v.n<=s.range[1]);
 if(wanted.every(v=>english.has(verseKey(v.n,id))))return;
 if(inFlight.has(key)||errors.has(key))return;
 const promise=(async()=>{
  try{
   const ref=`${current.book}.${current.chapter}.${s.range[0]}-${s.range[1]}`;
   const response=await fetch('/api/passage?'+new URLSearchParams({translation:'NIV',ref}));
   if(!response.ok)throw new Error('unavailable');const data=await response.json();
   if(!Array.isArray(data.verses)||wanted.some(v=>!data.verses.find(x=>x.n===v.n&&x.text)))throw new Error('incomplete');
   for(const v of data.verses)english.set(verseKey(v.n,id),v.text);
   attribution=data.translation;$('copyright').textContent=attribution?.copyright||'';
   if(attribution?.youVersionDeepLink?.startsWith('https://'))$('youversion-link').href=attribution.youVersionDeepLink;
   errors.delete(key);
  }catch{errors.add(key);}
  finally{inFlight.delete(key);if(state.lesson===id&&state.section===index){renderVerses();study?.refresh();}}
 })();inFlight.set(key,promise);
}
function changeSection(index){stopSound();closePanel();state.section=index;state.revealed.clear();render();$('reading').scrollIntoView({block:'start'});}
function changeOrder(lang){stopSound();state.first=lang;save('first',lang);state.revealed.clear();if(state.dictation)closePanel();render();}
$('flip').onclick=()=>changeOrder(other(state.first));
$('first-language').onchange=e=>changeOrder(e.target.value);
$('second-language').onchange=e=>changeOrder(other(e.target.value));
$('lesson-select').onchange=e=>{stopSound();closePanel();state.lesson=e.target.value;state.section=0;state.revealed.clear();save('lesson',state.lesson);render();};
$('pinyin').onchange=e=>{state.pinyin=e.target.checked;save('pinyin',state.pinyin);document.body.classList.toggle('show-pinyin',state.pinyin);};
$('dictation').onchange=e=>{stopSound();state.dictation=e.target.checked;state.revealed.clear();closePanel();renderVerses();};
$('previous').onclick=()=>changeSection(Math.max(0,state.section-1));
$('restart-lesson').onclick=()=>{lesson().sections.forEach((_,i)=>delete state.done[state.lesson+':'+i]);save('done',state.done);changeSection(0);document.querySelector('.tools').open=false;};
$('complete-next').onclick=()=>{
 if($('complete-next').dataset.review==='true'){$('complete-next').dataset.review='false';changeSection(0);return;}
 state.done[chapterKey()]=true;save('done',state.done);
 if(state.section<lesson().sections.length-1)changeSection(state.section+1);
 else{renderNav();notify('这一篇学完了！可以再读一次，也可以换一篇。');$('complete-next').textContent='已学完 · 再读一次';$('complete-next').dataset.review='true';}
};

function wordInfo(word,lang,verse){
 if(lang==='zh'){const d=dictionary[word];return{word,lang,pinyin:d?.pinyin||'',meaning:d?.meaning||'',meaningZh:d?.meaningZh||'',usage:d?.usage||'',art:d?.art||null,verse};}
 const d=englishDictionary[word.toLowerCase()],basic=englishBasic[word.toLowerCase()];
 return{word,lang,pinyin:d?`${d.word} · ${d.pinyin}`:'',meaning:d?.word||basic?.[0]||'',meaningZh:d?.meaningZh||basic?.[1]||'',usage:'',art:d?.art||null,verse};
}
function showPanel(){state.panel='word';$('word-panel').hidden=false;$('workspace').classList.add('word-open');}
function closePanel(){state.panel=null;selected=null;$('word-panel').hidden=true;$('workspace').classList.remove('word-open');document.querySelectorAll('.word.selected').forEach(n=>n.classList.remove('selected'));if(restoreFocus?.isConnected)restoreFocus.focus({preventScroll:true});}
$('close-panel').onclick=closePanel;document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!study?.isOpen)closePanel();});
function openWord(word,lang,verse,source){
 if(state.dictation&&lang===state.first)return;
 restoreFocus=source;selected=wordInfo(word,lang,verse);renderWord();
 document.querySelectorAll('.word.selected').forEach(n=>n.classList.remove('selected'));source?.classList.add('selected');
}
function renderWord(){
 showPanel();$('panel-label').textContent='一起认识这个词';const info=selected;const body=$('panel-body');body.replaceChildren();
 body.append(el('h2','word-title',info.word),el('p','pronunciation',info.pinyin||languageName(info.lang)));
 if(info.meaning)body.append(el('p','word-meaning',info.meaning));
 if(info.meaningZh)body.append(el('p','word-usage',info.meaningZh));
 else if(info.usage)body.append(el('p','word-usage',info.usage));
 else body.append(el('p','word-usage','先听发音，再和对方一起看看这句话的意思。'));
 const actions=el('div','panel-actions');
 actions.append(button('听这个词',()=>read([{text:info.word,lang:info.lang}])));
 actions.append(button('慢一点',()=>read([{text:info.word,lang:info.lang,slow:true}])));
 actions.append(button(hasMark(info.word,info.lang)?'移出生词本':'加入生词本',()=>{
  if(hasMark(info.word,info.lang))state.marks=state.marks.filter(m=>!(m.word===info.word&&m.lang===info.lang));
  else state.marks.push({word:info.word,lang:info.lang});
  save('marks',state.marks);$('word-count').textContent=state.marks.length;renderVerses();renderWord();
 }));body.append(actions);
 if(info.art){const art=el('div','art-idea');art.append(el('strong','','以后这张图会帮我们理解'),el('p','',info.art),el('p','small','本次先确认功能，配图在产品执行后制作。'));body.append(art);}
 if(info.verse){
  const context=el('div','panel-sentence');context.append(el('span','overline',`第 ${info.verse.n} 节 · 意思提示`),el('p','',info.verse.explainZh),el('p','',info.verse.explainEn));
  context.append(button('听这一整句',()=>readVerse(info.verse,info.lang)));body.append(context);
 }
}
$('open-wordbook').onclick=()=>{
 showPanel();state.panel='wordbook';selected=null;$('panel-label').textContent=`我的生词本 · ${state.marks.length}`;const body=$('panel-body');body.replaceChildren();
 if(!state.marks.length)body.append(el('p','wordbook-empty','点开一个词，把它加入生词本。下次来，还能在这里找到它。'));
 for(const item of state.marks){const d=wordInfo(item.word,item.lang);const b=button('',()=>{selected=d;renderWord();},'wordbook-row');b.append(document.createTextNode(item.word),el('span','',`${languageName(item.lang)} · ${d.meaning||'听发音，复习这个词'}`));body.append(b);}
 body.append(el('p','overline','这篇可以一起学的词'));
 const suggested=state.lesson==='love'?['爱','忍耐','恩慈','盼望','有限','面对面']:['种子','土','听'];
 for(const word of suggested){body.append(button(word,()=>{selected=wordInfo(word,'zh');renderWord();},'wordbook-row'));}
};

function renderRecording(){
 $('record').disabled=!recording.isSupported();$('record').textContent=recording.recordingNow()?'停止录音':'录下我的朗读';
 $('play-recording').hidden=!recording.hasClip();$('delete-recording').hidden=!recording.hasClip();
 if(recording.hasClip()&&!recording.recordingNow())$('record-note').textContent=`已有 ${recording.clipSeconds()} 秒录音。${recording.clipStored()?'保存在这台设备。':'这次访问可以播放；录音太长，未保存。'}`;
}
$('record').disabled=!recording.isSupported();
if(!recording.isSupported())$('record-note').textContent='请在这台电脑的 localhost，或正式 HTTPS 页面使用麦克风。';
$('record').onclick=()=>{
 if(recording.recordingNow()){recording.stopRecording();return;}
 stopSound();$('record').disabled=true;$('record-note').textContent='请允许浏览器使用麦克风。';
 recording.startRecording({onDone:()=>{clearInterval(recordTimer);renderRecording();notify('朗读已保存，可以听听自己的声音。');},onError:()=>{clearInterval(recordTimer);renderRecording();$('record-note').textContent='暂时无法使用麦克风。请在 Safari 或 Chrome 的 localhost 页面尝试。';}}).then(()=>{
  renderRecording();if(!recording.recordingNow())return;
  recordTimer=setInterval(()=>{$('record-note').textContent=`正在录音 ${recording.recordingSeconds()} 秒 / 最长 180 秒`;$('record').textContent='停止录音';},500);
 });
};
$('play-recording').onclick=()=>{stopSound();recordPlayback=true;controls();notify('正在播放你的录音。');recording.playClip({onEnded:()=>{recordPlayback=false;controls();notify('你的录音播放完了。');},onError:()=>{stopSound();notify('这段录音暂时不能播放。');}});};
$('delete-recording').onclick=()=>{
 if(!deleteArmed){deleteArmed=true;$('delete-recording').textContent='再点一次，确认删除';return;}
 stopSound();recording.discard();deleteArmed=false;$('delete-recording').textContent='删除录音';$('record-note').textContent='录音已删除。';renderRecording();
};
study=createStudy({
 lesson,section,verses:currentVerses,text:textFor,first:()=>state.first,pinyin:()=>state.pinyin,
 fillTokens,wordInfo,hasMark,getSaved,save,read,stop:stopSound,pause:()=>$('pause').click(),
 flip:()=>changeOrder(other(state.first)),
 setPinyin(value){state.pinyin=value;save('pinyin',value);$('pinyin').checked=value;document.body.classList.toggle('show-pinyin',value);},
 englishError:()=>errors.has(chapterKey()),
 retry(){errors.delete(chapterKey());renderVerses();loadEnglish();},
 prepare(){stopSound();closePanel();if(recording.recordingNow())recording.stopRecording();},
 toggleMark(word,lang){
  if(hasMark(word,lang))state.marks=state.marks.filter(m=>!(m.word===word&&m.lang===lang));
  else state.marks.push({word,lang});
  save('marks',state.marks);$('word-count').textContent=state.marks.length;renderVerses();
 },
 complete(){state.done[chapterKey()]=true;save('done',state.done);renderNav();},
});
$('open-study').onclick=e=>study.open(currentVerses()[0].n,e.currentTarget);
if(recording.hasClip())renderRecording();render();
