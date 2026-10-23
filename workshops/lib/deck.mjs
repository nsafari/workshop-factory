// ============================================================
//  سازندهٔ مشترک دک اسلایدهای HTML (راست‌به‌چپ/فارسی، خودکفا)
//  هستهٔ رندر برای همهٔ دک‌ها (کارگاه ۱، دک مطالعه، ...)
//  بدون هیچ وابستگی npm؛ فقط ماژول‌های داخلی Node
//  API: buildDeck({ outPath, title, sessions, visuals, extraCss = '', fontsDir = null })
//  - sessions: آرایهٔ { n, footer, slides } — همان شکل دادهٔ SESSIONS
//  - visuals: نگاشت نام ویژوال → تابع برگردانندهٔ HTML آن
//  - extraCss: CSS اختصاصی ویژوال‌های دک. اگر خط جداکنندهٔ «/*@g1*/»
//    را داشته باشد، پیش از آن بخش میان HEAD و بلوک G1 و پس از آن میان
//    G1 و TAIL می‌نشیند (حفظ ترتیب اصلی stylesheet؛ خروجی بایت‌به‌بایت یکسان)
//  - fontsDir: پوشهٔ فونت‌های vazirmatn-variable-*.woff2 (پیش‌فرض: workshops/fonts)
//  CSS پایه (کروم اسلاید، جلد، بدنه، گلوله‌ها، کارت‌ها، جدول، چیدمان،
//  جعبهٔ ویژوال، نوار پایین، یادداشت‌ها، پیشرفت، چیپ‌ها، G1 و G2) همین‌جاست؛
//  CSS اختصاصی ویژوال‌ها از اسکریپت دک می‌آید.
// ============================================================
import { writeFileSync, mkdirSync, readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const LIB_DIR = path.dirname(fileURLToPath(import.meta.url));
//  پیش‌فرض فونت‌ها: یک سطح بالاتر از lib/ (یعنی workshops/fonts/)
const DEFAULT_FONTS_DIR = path.join(LIB_DIR, '..', 'fonts');

// ---------- فونت Vazirmatn نهفته در فایل (خودکفا، بدون نیاز به اینترنت) ----------
//  فایل‌های woff2 متغیر (وزن ۱۰۰ تا ۹۰۰) از Google Fonts
const fontFace = (fontsDir, file, range) => `@font-face{font-family:'Vazirmatn';font-style:normal;font-weight:100 900;font-display:swap;src:url(data:font/woff2;base64,${readFileSync(path.join(fontsDir, file)).toString('base64')}) format('woff2');unicode-range:${range}}`;
const fontCss = fontsDir => [
  fontFace(fontsDir, 'vazirmatn-variable-arabic.woff2', 'U+0600-06FF, U+0750-077F, U+0870-0891, U+0897-08E1, U+08E3-08FF, U+200C-200E, U+2010-2011, U+204F, U+2E41, U+FB50-FDFF, U+FE70-FE74, U+FE76-FEFC, U+102E0-102FB, U+10E60-10E7E, U+10EC2-10EC7, U+10EC9-10EEE, U+10EF0-10EFF, U+1EE00-1EE03, U+1EE05-1EE1F, U+1EE21-1EE22, U+1EE24, U+1EE27, U+1EE29-1EE32, U+1EE34-1EE37, U+1EE39, U+1EE3B, U+1EE42, U+1EE47, U+1EE49, U+1EE4B, U+1EE4D-1EE4F, U+1EE51-1EE52, U+1EE54, U+1EE57, U+1EE59, U+1EE5B, U+1EE5D, U+1EE5F, U+1EE61-1EE62, U+1EE64, U+1EE67-1EE6A, U+1EE6C-1EE72, U+1EE74-1EE77, U+1EE79-1EE7C, U+1EE7E-1EE89, U+1EE8B-1EE9B, U+1EEA1-1EEA3, U+1EEA5-1EEA9, U+1EEAB-1EEBB, U+1EEF0-1EEF1'),
  fontFace(fontsDir, 'vazirmatn-variable-latin-ext.woff2', 'U+0100-02BA, U+02BD-02C5, U+02C7-02CC, U+02CE-02D7, U+02DD-02FF, U+0304, U+0308, U+0329, U+1D00-1DBF, U+1E00-1E9F, U+1EF2-1EFF, U+2020, U+20A0-20AB, U+20AD-20C4, U+2113, U+2C60-2C7F, U+A720-A7FF'),
  fontFace(fontsDir, 'vazirmatn-variable-latin.woff2', 'U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD'),
].join('\n');

// ---------- خوش‌رنگ یکدست (پالت مشترک همهٔ دک‌ها) ----------
export const NAVY = '#1F3A5F', NAVY2 = '#16324F', INK = '#333333', MUT = '#6B7280',
      ACC = '#0E7C7B', LIGHT = '#F2F4F7', SOFT = '#DDE3EA', WHT = '#FFFFFF', GOLD = '#C9A227';

//  ارقام فارسی
const FA = '۰۱۲۳۴۵۶۷۸۹';
export const fa = n => String(n).replace(/\d/g, d => FA[d]);

//  امن‌سازی HTML
export const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');


// ============================================================
//  رندر بلوک‌ها و اسلایدها
// ============================================================
const isFa = t => /[\u0600-\u06FF]/.test(t);

//  شمارندهٔ تأخیر پلکانی (G1): هر عنصر متحرک شاخص --i می‌گیرد و با ۱۲۰ میلی‌ثانیه جا می‌افتد
//  برای هر اسلاید از نو صفر می‌شود تا انیمیشن با هر بار فعال شدن اسلاید تازه شود
let animI = 0;
//  پشتیبانی از فرگمنت (گام‌به‌گام): بلوک‌ها با frag شمارهٔ گام می‌گیرند؛
//  عنصر با data-frag تا رسیدن گام به آن شماره پنهان است (.shown از سمت JS)
export const fA = k => (k == null ? '' : ` data-frag="${k}"`);

function renderBlock(b, visuals) {
  if (b.bullets) {
    const { size = 22, gap = 14, noBullet = false, stagger } = b;
    const items = b.bullets.map((it, idx) => {
      const [t, lvl] = Array.isArray(it) ? it : [it, 0];
      //  با fragItems هر گلوله گام خودش را می‌گیرد؛ وگرنه گلوله‌ها با شاخص --i داخل گام بلوک جا می‌افتند
      const own = b.fragItems ? fA(b.fragItems[idx]) : '';
      return `<li class="anim${lvl ? ' sub' : ''}"${own} style="margin-bottom:${gap}px;--i:${b.fragItems ? 0 : animI++}">${esc(t)}</li>`;
    }).join('');
    const st = stagger ? `;--st:${stagger}ms` : '';
    const root = b.fragItems ? '' : fA(b.frag);
    return `<ul class="bl${noBullet ? ' nb' : ''}"${root} style="font-size:${size}px${st}">${items}</ul>`;
  }
  if (b.cards) {
    const cards = b.cards.items.map(d =>
      `<div class="card anim" style="--i:${animI++}"><h3>${esc(d.t)}</h3><p>${esc(d.b)}</p></div>`).join('');
    return `<div class="cards"${fA(b.frag)} style="min-height:${b.cards.h}px">${cards}</div>`;
  }
  if (b.table) {
    const { head, rows, colW, size = 18 } = b.table;
    const th = head.map((h, i) =>
      `<th${colW ? ` style="width:${colW[i]}%"` : ''}>${esc(h)}</th>`).join('');
    const trs = rows.map(r => `<tr class="anim" style="--i:${animI++}">` + r.map(c =>
      `<td style="text-align:${isFa(c) ? 'right' : 'center'}">${esc(c)}</td>`).join('') + `</tr>`).join('');
    return `<table class="tbl"${fA(b.frag)} style="font-size:${size}px"><thead><tr class="anim" style="--i:${animI++}">${th}</tr></thead><tbody>${trs}</tbody></table>`;
  }
  if (b.accent) return `<p class="accent"${fA(b.frag)} style="--i:${animI++}${b.bold ? ';font-weight:700' : ''}">${esc(b.accent)}</p>`;
  if (b.muted) return `<p class="muted"${fA(b.frag)} style="--i:${animI++}">${esc(b.muted)}</p>`;
  if (b.lead) return `<p class="lead"${fA(b.frag)} style="--i:${animI++}">${esc(b.lead)}</p>`;
  if (b.text) return `<p class="plain"${fA(b.frag)} style="--i:${animI++}">${esc(b.text)}</p>`;
  if (b.visual) {
    const render = visuals[b.visual];
    if (!render) throw new Error('ویژوال ناشناخته: ' + b.visual);
    return `<div class="viz-box"${fA(b.frag)}>${render()}</div>`;
  }
  if (b.split) {
    const [r, l] = b.split.ratio;
    return `<div class="split">
    <div class="col" style="flex:0 0 ${r}%">${b.split.right.map(x => renderBlock(x, visuals)).join('')}</div>
    <div class="col" style="flex:1">${b.split.left.map(x => renderBlock(x, visuals)).join('')}</div>
  </div>`;
  }
  throw new Error('بلوک ناشناخته: ' + JSON.stringify(Object.keys(b)));
}

function renderSlide(s, session, idx, total, title, visuals) {
  if (s.cover) {
    return `<section class="slide cover" data-i="${idx}">
  <div class="goldbar"></div>
  <div class="cover-body">
    <p class="kicker">${esc(s.cover.kicker)}</p>
    <h1>${esc(s.cover.title)}</h1>
    <p class="cover-sub">${esc(s.cover.sub)}</p>
    <p class="cover-foot">${esc(title)}</p>
  </div>
</section>`;
  }
  animI = 0; // شاخص انیمیشن برای هر اسلاید از نو شروع می‌شود
  return `<section class="slide content" data-i="${idx}">
  <header class="chead">
    <div class="trow"><span class="tbar"></span><h2>${esc(s.title)}</h2></div>
    ${s.sub ? `<p class="csub">${esc(s.sub)}</p>` : ''}
  </header>
  <div class="cbody">${(s.blocks || []).map(x => renderBlock(x, visuals)).join('\n  ')}</div>
  <footer class="cfoot"><span>${esc(session.footer)}</span><span class="cpos"><span class="sdots"></span><span>${fa(idx + 1)} از ${fa(total)}</span></span></footer>
</section>`;
}

//  جداکنندهٔ اختیاری در extraCss: بخش دومِ ویژوال‌ها بعد از بلوک G1 می‌نشیند
const G1_BREAK = '/*@g1*/\n';
const CSS_HEAD = `:root{--navy:${NAVY};--navy2:${NAVY2};--ink:${INK};--mut:${MUT};--acc:${ACC};--light:${LIGHT};--soft:${SOFT};--gold:${GOLD}}
*{box-sizing:border-box;margin:0;padding:0}
html,body{height:100%;overflow:hidden;background:#0d1b2a}
body{font-family:'Vazirmatn',Tahoma,'Segoe UI',sans-serif;color:var(--ink)}
#viewport{position:fixed;inset:0;overflow:hidden}
#stage{position:absolute;top:50%;left:50%;width:1280px;height:720px;transform-origin:center center;background:${WHT}}
.slide{position:absolute;inset:0;opacity:0;transform:translateX(-16px);transition:opacity .3s ease,transform .3s ease;pointer-events:none;visibility:hidden}
.slide.active{opacity:1;transform:none;pointer-events:auto;visibility:visible}
/* فرگمنت‌ها (گام‌به‌گام): عنصر با data-frag تا رسیدن گام پنهان است؛
   با .revealed (از سمت JS) با گذار opacity/translate ~۰٫۴۵ ثانیه ظاهر می‌شود؛
   برداشتن .revealed آن را دوباره پنهان می‌کند و انیمیشن‌های کلیدی داخلی
   با هر بار دوباره ظاهر شدن از نو اجرا می‌شوند (کلید: تغییر کلاس/منتسب) */
[data-frag]{opacity:0;visibility:hidden;translate:0 14px}
[data-frag].revealed{opacity:1;visibility:visible;translate:0 0;transition:opacity .45s ease,translate .45s ease}
/* اسلاید تیتر */
.cover{background:var(--navy);color:${WHT}}
.goldbar{position:absolute;top:0;right:0;left:0;height:10px;background:var(--gold)}
.cover-body{padding:150px 90px 0}
.kicker{font-size:20px;color:${SOFT};margin-bottom:26px}
.cover h1{font-size:52px;font-weight:800;line-height:1.35;margin-bottom:22px}
.cover-sub{font-size:22px;color:${SOFT}}
.cover-foot{position:absolute;bottom:52px;right:90px;font-size:16px;color:#8FA3BF}
/* اسلاید محتوا */
.content{background:${WHT};padding:34px 56px 60px}
.chead{margin-bottom:14px}
.trow{display:flex;align-items:center;gap:14px}
.tbar{flex:0 0 7px;height:52px;background:var(--acc);border-radius:3px}
.chead h2{font-size:34px;font-weight:800;color:var(--navy)}
.csub{margin-top:6px;margin-right:21px;font-size:17px;color:var(--mut)}
.cfoot{position:absolute;bottom:34px;right:56px;left:56px;display:flex;justify-content:space-between;font-size:14px;color:var(--mut)}
/* نشانگرهای گام (فرگمنت) کنار شمارندهٔ اسلاید — فقط وقتی اسلاید بیش از یک گام دارد */
.cpos{display:flex;align-items:center;gap:12px}
.sdots{display:flex;align-items:center;gap:5px}
.sdot{width:7px;height:7px;border-radius:50%;border:1.5px solid var(--mut);background:transparent;transition:background .2s ease,border-color .2s ease}
.sdot.on{background:var(--acc);border-color:var(--acc)}
/* گلوله‌ها */
.bl{list-style:none}
.bl li{position:relative;padding-right:26px;line-height:1.85}
.bl li::before{content:'';position:absolute;right:0;top:.72em;width:9px;height:9px;border-radius:50%;background:var(--acc)}
.bl.nb li{padding-right:0}
.bl.nb li::before{display:none}
.bl li.sub{font-size:.82em;color:var(--mut);padding-right:52px}
.bl li.sub::before{right:26px;width:7px;height:7px;background:var(--soft)}
/* کارت‌ها */
.cards{display:flex;gap:22px;margin:10px 0 22px}
.card{flex:1;background:var(--light);border:1px solid var(--soft);border-radius:12px;padding:20px 22px;position:relative}
.card::before{content:'';position:absolute;top:22px;right:0;width:6px;height:44px;background:var(--acc);border-radius:3px 0 0 3px}
.card h3{font-size:22px;font-weight:700;color:var(--navy);margin-bottom:12px;padding-right:12px}
.card p{font-size:16.5px;line-height:1.9;white-space:pre-line;padding-right:12px}
/* جدول */
.tbl{width:100%;border-collapse:collapse;margin:8px 0 18px}
.tbl th{background:var(--navy);color:${WHT};font-weight:700;text-align:right;padding:12px 14px;border:1px solid var(--navy2)}
.tbl td{padding:11px 14px;border:1px solid var(--soft);line-height:1.7}
.tbl tbody tr:nth-child(even) td{background:var(--light)}
/* خطوط متنی */
.accent{color:var(--acc);font-size:18px;margin:8px 0}
.muted{color:var(--mut);font-size:17px;margin:10px 0}
.lead{color:var(--navy);font-size:24px;font-weight:700;margin:8px 0 20px}
.plain{color:var(--ink);font-size:18px;line-height:1.9;margin-top:16px}
/* چیدمان دوتایی */
.split{display:flex;gap:40px;align-items:flex-start}
/* ویژوال‌ها */
.viz-box{display:flex;flex-direction:column;align-items:center;justify-content:center;padding:8px 0}
.viz{width:100%;height:auto;display:block}
.viz-caption{margin-top:16px;font-size:15px;color:var(--mut)}
/* عکس‌های مفهومی (اسلایدهای ۱۰ تا ۱۲) */
.imgcard{margin:2px 0;display:flex;flex-direction:column;align-items:center}
.imgcard img{border-radius:10px;border:1.5px solid var(--soft);box-shadow:0 2px 12px rgba(13,27,42,.14);max-width:100%;height:auto}
.imgcard.landscape img{width:270px}
.imgcard.portrait img{width:150px}
.imgcard.book img{width:200px}
`;
const CSS_G1 = `.bar-pct{flex:0 0 70px;font-size:19px;color:var(--mut)}
/* ============================================================
   انیمیشن‌ها — روی .revealed (فرگمنت ظاهرشده) کلید خورده‌اند تا با هر
   بار رسیدن گام از نو اجرا شوند؛ حالت پیش‌فرض CSS = حالت پایانی
   ============================================================ */
/* G1: ظاهرشدن پلکانی محتوای داخل یک فرگمنت (شاخص --i، ۱۲۰ میلی‌ثانیه) */
@keyframes riseIn{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:none}}
`;
const CSS_TAIL = `.chipflow.flow-travel .flow-chip.revealed{animation:chipGlow 1.1s ease both}
/* کروم پایین */
#chrome{position:fixed;right:0;left:0;bottom:0;z-index:40;background:rgba(13,27,42,.9);backdrop-filter:blur(4px);display:flex;align-items:center;gap:12px;padding:4px 14px;font-size:12px}
#chips{display:flex;gap:6px}
.chip{background:transparent;border:1px solid rgba(221,227,234,.25);color:${SOFT};border-radius:999px;padding:2px 10px;font-family:inherit;font-size:12px;cursor:pointer}
.chip:hover{border-color:var(--gold)}
.chip.on{background:var(--gold);border-color:var(--gold);color:var(--navy2);font-weight:700}
#hint{margin-inline-start:auto;color:rgba(221,227,234,.45)}
#pos{color:rgba(221,227,234,.7);min-width:64px;text-align:center}
#prog{position:fixed;right:0;left:0;bottom:0;height:3px;z-index:41;background:var(--gold);transition:width .3s ease}
/* یادداشت‌های سخنران */
#notes{position:fixed;right:0;left:0;bottom:30px;z-index:50;max-height:46%;overflow-y:auto;background:rgba(16,32,50,.94);color:${LIGHT};border-top:3px solid var(--gold);padding:16px 34px 20px;font-size:20px;line-height:1.9;white-space:pre-line;display:none}
#notes.show{display:block}
#notes .nhead{font-size:14px;color:var(--gold);margin-bottom:8px;font-weight:700}
/* G2: احترام به ترجیح «کاهش حرکت» — ظاهرشدن فرگمنت فوری، انیمیشن‌های
   کلیدی به حالت پایانی می‌پرند؛ دروازه‌گذاری گام‌ها همچنان برقرار است */
@media (prefers-reduced-motion:reduce){
  [data-frag]{transition:none}
  .revealed,.revealed *{animation:none!important}
  .slide[data-step="3"] .bw.a{animation:none!important;opacity:0}
  .slide[data-step="3"] .bw.b{animation:none!important;opacity:1}
  .slide[data-step="3"] .bar-fill{animation:none!important;width:var(--wb)}
  .slide{transition:none}
}
`;


const JS = `
const slides=[...document.querySelectorAll('.slide')];
const TOTAL=slides.length;
const NOTES=__NOTES__;
const SESS=__SESS__;
const STARTS=__STARTS__;
//  تعداد گام (فرگمنت) هر اسلاید از روی data-fragها
const FRAGS=slides.map(s=>{
  let m=0;
  s.querySelectorAll('[data-frag]').forEach(e=>{const v=+e.dataset.frag;if(v>m)m=v;});
  return m;
});
let i=0,step=0;
const prog=document.getElementById('prog');
const pos=document.getElementById('pos');
const notesEl=document.getElementById('notes');
const chipsEl=document.getElementById('chips');
const FA='۰۱۲۳۴۵۶۷۸۹';
const fa=n=>String(n).replace(/\\d/g,d=>FA[d]);
const chips=STARTS.map((s,k)=>{
  const b=document.createElement('button');
  b.className='chip';b.textContent='جلسه '+fa(k+1);
  b.addEventListener('click',()=>show(s,0));
  chipsEl.appendChild(b);return b;
});
//  نشانگرهای گام: برای هر اسلاید با بیش از یک گام، یک نقطه به ازای هر گام
slides.forEach((s,k)=>{
  if(FRAGS[k]>1){
    const holder=s.querySelector('.sdots');
    for(let d=1;d<=FRAGS[k];d++){
      const dot=document.createElement('i');
      dot.className='sdot';
      holder.appendChild(dot);
    }
  }
});
//  اعمال گام: فرگمنت‌هایی با شمارهٔ ≤ step ظاهر می‌شوند؛ بقیه پنهان می‌مانند/دوباره پنهان می‌شوند
function applyStep(){
  const s=slides[i];
  s.dataset.step=step;
  s.querySelectorAll('[data-frag]').forEach(e=>{
    e.classList.toggle('revealed',+e.dataset.frag<=step);
  });
  s.querySelectorAll('.sdot').forEach((d,k)=>d.classList.toggle('on',k===step-1));
}
function show(n,st){
  n=Math.max(0,Math.min(TOTAL-1,n));
  st=Math.max(0,st||0);
  if(n!==i){
    slides[i].classList.remove('active');
    i=n;
  }
  step=Math.min(st,FRAGS[i]);
  slides[i].classList.add('active');
  prog.style.width=((i+1)/TOTAL*100)+'%';
  pos.textContent=fa(i+1)+' / '+fa(TOTAL);
  chips.forEach((c,k)=>c.classList.toggle('on',SESS[i]===k+1));
  applyStep();
  if(notesEl.classList.contains('show'))renderNotes();
}
//  گام بعدی / اسلاید بعدی؛ گام قبلی / اسلاید قبلی (مثل Slidev)
function next(){
  if(step<FRAGS[i]){step++;applyStep();}
  else if(i<TOTAL-1)show(i+1,0);
}
function prev(){
  if(step>0){step--;applyStep();}
  else if(i>0)show(i-1,0);
}
function renderNotes(){
  notesEl.innerHTML='<div class="nhead">یادداشت‌های سخنران — اسلاید '+fa(i+1)+' از '+fa(TOTAL)+'</div>'+escH(NOTES[i]||'—');
}
const escH=s=>s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
const AR='١٢٣٤٥٦٧٨',PE='۱۲۳۴۵۶۷۸';
document.addEventListener('keydown',e=>{
  const k=e.key;
  if(k===' '||k==='ArrowRight'||k==='ArrowDown'||k==='PageDown'){e.preventDefault();next();}
  else if(k==='Backspace'||k==='ArrowLeft'||k==='ArrowUp'||k==='PageUp'){e.preventDefault();prev();}
  else if(k==='Home'){e.preventDefault();show(0,0);}
  else if(k==='End'){e.preventDefault();show(TOTAL-1,0);}
  else if(k==='f'||k==='F'){e.preventDefault();document.fullscreenElement?document.exitFullscreen():document.documentElement.requestFullscreen();}
  else if(k==='n'||k==='N'){e.preventDefault();notesEl.classList.toggle('show');if(notesEl.classList.contains('show'))renderNotes();}
  else{
    let d=-1;
    if(k>='1'&&k<='8')d=+k;
    else if(AR.includes(k))d=AR.indexOf(k)+1;
    else if(PE.includes(k))d=PE.indexOf(k)+1;
    if(d>0&&d<=STARTS.length){e.preventDefault();show(STARTS[d-1],0);}
  }
});
function fit(){
  const s=Math.min(innerWidth/1280,innerHeight/720);
  document.getElementById('stage').style.transform='translate(-50%,-50%) scale('+s+')';
}
addEventListener('resize',fit);
fit();
//  هوک توسعه برای تست بدون کلید: ?slide=9&step=3 (slide از ۱؛ step = تعداد بخش‌های نمایش‌شده، ۰ = فقط تیتر)
const qs=new URLSearchParams(location.search);
const qS=parseInt(qs.get('slide'),10),qT=parseInt(qs.get('step'),10);
if(qS>=1&&qS<=TOTAL)show(qS-1,qT>0?qT:0);
else show(0,0);
`;


// ============================================================
//  ساخت دک: رندر اسلایدها + montage نهایی + نوشتن فایل HTML + گزارش
// ============================================================
export function buildDeck({ outPath, title, sessions, visuals, extraCss = '', fontsDir = null }) {
  const FONT_CSS = fontCss(fontsDir || DEFAULT_FONTS_DIR);
  const [exA = '', exB = ''] = extraCss.split(G1_BREAK);
  const CSS = `
${FONT_CSS}
${CSS_HEAD}${exA}${CSS_G1}${exB}${CSS_TAIL}`;

  const flat = [];
  for (const ses of sessions)
    for (const sl of ses.slides)
      flat.push({ slide: sl, session: ses.n, footer: ses.footer });

  const TOTAL = flat.length;
  const STARTS = [];
  sessions.forEach((ses, k) => {
    const before = sessions.slice(0, k).reduce((a, s) => a + s.slides.length, 0);
    STARTS.push(before);
  });

  const body = flat.map((f, i) => renderSlide(f.slide, f, i, TOTAL, title, visuals)).join('\n');
  const script = JS
    .replace('__NOTES__', JSON.stringify(flat.map(f => f.slide.notes || '')))
    .replace('__SESS__', JSON.stringify(flat.map(f => f.session)))
    .replace('__STARTS__', JSON.stringify(STARTS));

  const html = `<!DOCTYPE html>
<html dir="rtl" lang="fa">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${esc(title)}</title>
<style>${CSS}</style>
</head>
<body>
<div id="viewport">
  <div id="stage">
${body}
  </div>
</div>
<div id="chrome">
  <div id="chips"></div>
  <span id="pos"></span>
  <span id="hint">Space بخش/اسلاید بعدی • Backspace قبلی • N یادداشت‌ها • F تمام‌صفحه • ۱ و ۲ پرش به جلسه</span>
</div>
<div id="prog"></div>
<aside id="notes" dir="rtl"></aside>
<script>${script}</script>
</body>
</html>
`;

  mkdirSync(path.dirname(outPath), { recursive: true });
  writeFileSync(outPath, html, 'utf8');

  // ---------- گزارش ----------
  sessions.forEach((ses, k) => {
    console.log(`✓ جلسهٔ ${fa(ses.n)}: ${fa(ses.slides.length)} اسلاید`);
  });
  console.log(`✓ جمع: ${fa(TOTAL)} اسلاید در ${fa(sessions.length)} جلسه`);
  console.log(`✓ خروجی: ${outPath}`);
}
