// ============================================================
//  اسلایدهای مطالعهٔ بیشتر ۱ - «داخل جعبه‌ی سیاه: شبکه‌ی عصبی چیست؟»
//  مطالعهٔ خودآموز ۴۵ تا ۶۰ دقیقه‌ای: ۳ بخش (۴۲ اسلاید)
//  بخش ۱: اسلایدهای ۱ تا ۱۸ — بخش ۲: اسلایدهای ۱۹ تا ۳۰ — بخش ۳: اسلایدهای ۳۱ تا ۴۲
//  خروجی: یک فایل HTML خودکفا (slides/study-1-slides.html)
//  منبع محتوا: study-1-neural-networks.md (پورت کامل و وفاداره؛ ترتیب هم‌راستا با ویدیو)
//  رندرر و CSS پایه مشترک: ../workshops/lib/deck.mjs (buildDeck)
//  این فایل: دادهٔ اسلایدها، فریم‌های ویدیو (base64) و CSS اختصاصی ویژوال‌ها
//  بدون هیچ وابستگی npm؛ فقط ماژول‌های داخلی Node
//  اجرا:  node study/generate-slides.mjs   (از ریشهٔ مخزن)
// ============================================================
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildDeck, ACC, GOLD, WHT, fa, esc, imgData, imgCard } from '../workshops/lib/deck.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const OUT_DIR = process.env.SLIDES_OUT || path.join(HERE, 'slides');
const OUT = path.join(OUT_DIR, 'study-1-slides.html');
const DECK_TITLE = 'داخل جعبه‌ی سیاه: شبکه‌ی عصبی چیست؟';

// ---------- فریم‌های ویدیو نهفته (base64 — خودکفا، بدون درخواست خارجی) ----------
//  منبع: study/frames/but_what_is_a_neural_network_chapter_1/ (ویدیوی 3Blue1Brown، فصل ۱)
//  ۳۷ فریمِ انتخاب‌شده توسط کاربر؛ هر فریم هنگام واکشی برای موضوع ادعاشده راستی‌آزمایی شده
const FR_DIR = path.join(HERE, 'frames', 'but_what_is_a_neural_network_chapter_1');
const frame = (folder, file) => imgData(path.join(FR_DIR, folder, file));

const S1 = '01_مسئله_تشخیص_اعداد_دست_نویس';
const S2 = '02_ساختار_لایه_ای_و_نورون';
const S3 = '03_منطق_لایه_های_پنهان';
const S4 = '04_وزن_ها_و_اتصالات';
const S5 = '05_سیگموئید_و_بایاس';
const S6 = '06_ضرب_ماتریسی';
const S7 = '07_شبکه_عصبی_به_عنوان_تابع';
const S8 = '08_تابع_ReLU';

//  نوار ۲ تا ۳ فریمِ کنار هم (تمام‌عرض) — برای نشان‌دادن یک توالی یا تغییر (imgCard از سازندهٔ مشترک)
const frameStrip = (items, cls) => `<div class="fstrip${cls ? ' ' + cls : ''}">
${items.map(([src, alt, label]) => `<figure class="imgcard landscape">
  <img class="anim" style="--i:0" src="${src}" alt="${esc(alt)}">
  <figcaption class="viz-caption">${esc(label)}</figcaption>
</figure>`).join('\n')}
</div>`;
const fv = (src, alt, cap) => () => imgCard(src, alt, cap, 'landscape');
const fvs = (items, cls) => () => frameStrip(items, cls);

// ---- فصل ۰۱: مسئلهٔ «سه»ی دست‌نویس ----
const FR_0015 = frame(S1, '00_00_15.jpg');
const FR_0020 = frame(S1, '00_00_20.jpg');
const FR_0025 = frame(S1, '00_00_25.jpg');
const FR_0045 = frame(S1, '00_00_45.jpg');
// ---- فصل ۰۲: ساختار لایه‌ای و نورون ----
const FR_0300 = frame(S2, '00_03_00.jpg');
const FR_0400 = frame(S2, '00_04_00.jpg');
const FR_0405 = frame(S2, '00_04_05.jpg');
// ---- فصل ۰۳: منطق لایه‌های پنهان ----
const FR_0630 = frame(S3, '00_06_30.jpg');
const FR_0655 = frame(S3, '00_06_55.jpg');
const FR_0710 = frame(S3, '00_07_10.jpg');
const FR_0720 = frame(S3, '00_07_20.jpg');
// ---- فصل ۰۴: وزن‌ها و اتصالات ----
const FR_0900 = frame(S4, '00_09_00.jpg');
const FR_0910 = frame(S4, '00_09_10.jpg');
const FR_0920 = frame(S4, '00_09_20.jpg');
const FR_0940 = frame(S4, '00_09_40.jpg');
// ---- فصل ۰۵: سیگموئید و بایاس ----
const FR_1000 = frame(S4, '00_10_00.jpg'); // این فریم در پوشهٔ فصل ۰۴ است
const FR_1045 = frame(S5, '00_10_45.jpg');
const FR_1110 = frame(S5, '00_11_10.jpg');
const FR_1120 = frame(S5, '00_11_20.jpg');
const FR_1125 = frame(S5, '00_11_25.jpg');
const FR_1145 = frame(S5, '00_11_45.jpg');
const FR_1200 = frame(S5, '00_12_00.jpg');
// ---- فصل ۰۶: ضرب ماتریسی ----
const FR_1315 = frame(S6, '00_13_15.jpg');
const FR_1400 = frame(S6, '00_14_00.jpg');
const FR_1415 = frame(S6, '00_14_15.jpg');
const FR_1430 = frame(S6, '00_14_30.jpg');
const FR_1445 = frame(S6, '00_14_45.jpg');
// ---- فصل ۰۷: شبکه به‌عنوان تابع ----
const FR_1510 = frame(S7, '00_15_10.jpg');
const FR_1515 = frame(S7, '00_15_15.jpg');
const FR_1520 = frame(S7, '00_15_20.jpg');
const FR_1525 = frame(S7, '00_15_25.jpg');
const FR_1535 = frame(S7, '00_15_35.jpg');
const FR_1550 = frame(S7, '00_15_50.jpg');
const FR_1555 = frame(S7, '00_15_55.jpg');
const FR_1620 = frame(S7, '00_16_20.jpg');
// ---- فصل ۰۸: تابع ReLU ----
const FR_1745 = frame(S8, '00_17_45.jpg');
const FR_1755 = frame(S8, '00_17_55.jpg');

//  فریم‌های تک‌تایی (ستون غالب در split)
const vDigit15   = fv(FR_0015, '«سه»ی دست‌نویس روی شبکهٔ ۲۸×۲۸', 'فریم از ویدیو — «سه»ی رسم‌شده روی شبکهٔ ۲۸×۲۸ (3Blue1Brown)');
const vDigitEnd  = fv(FR_0015, '«سه»ی دست‌نویس ۲۸×۲۸', '«سه»ی دست‌نویسِ ۲۸×۲۸ — نقطهٔ شروع، نقطهٔ پایان');
const vDigit45   = fv(FR_0045, '«سه» و چالش ماشین', 'فریم از ویدیو — چالش: برنامه‌ای بنویس که همین «سه» را بشناسد (3Blue1Brown)');
const vNeuron    = fv(FR_0300, 'نورون: عددی بین ۰ و ۱', 'فریم از ویدیو — نورون عددی بین صفر و یک نگه می‌دارد (3Blue1Brown)');
const vParts     = fv(FR_0630, 'رقم «نه» = حلقهٔ بالا + خط راست', 'فریم از ویدیو — شناخت رقم از اجزایش (3Blue1Brown)');
const vHope      = fv(FR_0655, 'امید: نورون برای مفهوم کلی حلقهٔ بالا', 'فریم از ویدیو — «شاید»: نورون برای مفهوم کلیِ حلقهٔ بالا (3Blue1Brown)');
const vWeight    = fv(FR_0900, 'وزن روی هر اتصال', 'فریم از ویدیو — وزن صرفا‌ یک عدد است (3Blue1Brown)');
const vWeightmap = fv(FR_0910, 'نقشهٔ وزن‌ها: سبز مثبت، قرمز منفی', 'فریم از ویدیو — شبکهٔ ۲۸×۲۸ِ وزن‌ها (3Blue1Brown)');
const vZero      = fv(FR_0920, 'صفرکردنِ بیشترِ وزن‌ها', 'فریم از ویدیو — فقط چند وزن مثبت در یک ناحیه (3Blue1Brown)');
const vEdge      = fv(FR_0940, 'وزن‌های منفی اطراف ناحیه', 'فریم از ویدیو — «لبه»یاب (3Blue1Brown)');
const vVector    = fv(FR_1315, 'فعال‌سازی‌ها به‌شکل بردار ستونی', 'فریم از ویدیو — فعال‌سازی‌های یک لایه به‌شکل بردار (3Blue1Brown)');
const vLearn     = fv(FR_1620, 'پرسش باز: چگونه یاد می‌گیرد؟', 'فریم از ویدیو — «چگونه وزن‌ها و بایاس‌ها را یاد می‌گیرد؟» (3Blue1Brown)');

//  نوارهای ۲ تا ۳ فریم (تمام‌عرض)
const vThree3s     = fvs([[FR_0015, '«سه»ی دست‌نویس', '«سه»ی ۱'], [FR_0020, '«سه»ی دست‌نویس', '«سه»ی ۲'], [FR_0025, '«سه»ی دست‌نویس', '«سه»ی ۳']]);
//  لایهٔ ورودی: شبکهٔ ۲۸×۲۸ با الگوی روشنِ «سه» (اسلاید ۷) — تصویر ساختاری به‌جای فریم، برای خوانایی
const vInput784 = () => {
  const P = 11.5, CELL = 9, X0 = 40, Y0 = 26;
  let g = '';
  for (let r = 0; r < 28; r++) for (let c = 0; c < 28; c++) {
    g += `<rect x="${(X0 + c * P).toFixed(1)}" y="${(Y0 + r * P).toFixed(1)}" width="${CELL}" height="${CELL}" rx="2" fill="${threeAt(r, c) ? '#C9A227' : '#DDE3EA'}"/>`;
  }
  return `<div class="in78">
  <svg viewBox="0 0 400 355" role="img" aria-label="شبکهٔ ۲۸ در ۲۸ نورون ورودی با الگوی روشنِ سه">
    ${g}
  </svg>
  <div class="viz-caption">هر خانه، یک نورون: ۲۸×۲۸ = ۷۸۴ — خانه‌های طلایی، پیکسل‌های روشنِ «سه»</div>
</div>`;
};
const vArch        = fvs([[FR_0400, 'معماری ۷۸۴ ← ۱۶ ← ۱۶ ← ۱۰', 'دو لایهٔ پنهان'], [FR_0405, 'معماری ۷۸۴ ← ۱۶ ← ۱۶ ← ۱۰', 'هرکدام ۱۶ نورون']]);
const vEdges       = fvs([[FR_0710, 'لبه‌های کوچک', 'سازندهٔ حلقه'], [FR_0720, 'حدود ۸ تا ۱۰ لبه', 'روشن می‌شوند']]);
const vSigmoidStrip= fvs([[FR_1000, 'منحنی سیگموئید', 'فشرده‌سازی به ۰ تا ۱'], [FR_1045, 'منحنی سیگموئید', 'منحنی لوجستیک']]);
const vBias        = fvs([[FR_1110, 'بایاس', 'اضافه‌کردن −۱۰'], [FR_1120, 'بایاس', 'آستانهٔ فعال‌شدن'], [FR_1125, 'بایاس', 'برای هر نورون']]);
const vKnobs       = fvs([[FR_1145, '۷۸۴×۱۶ وزن', 'فقط لایهٔ اول'], [FR_1200, '≈ ۱۳٬۰۰۰ وزن و بایاس', 'کل شبکه']]);
const vMatrixStrip = fvs([[FR_1400, 'ماتریس وزن‌ها', 'هر سطر = یک نورون'], [FR_1415, 'ماتریس وزن‌ها', 'سطرِ اتصالات']]);
const vFormula     = fvs([[FR_1430, 'بردار بایاس‌ها', 'به حاصل جمع می‌شود'], [FR_1445, 'σ(W·a + b)', 'کل لایه در یک عبارت']]);
const vFuncNeuron  = fvs([[FR_1510, 'نورون به‌مثابهٔ تابع', 'خروجی‌های لایهٔ قبل را می‌گیرد'], [FR_1515, 'نورون به‌مثابهٔ تابع', 'عددی بین ۰ و ۱ می‌دهد']]);
const vFuncNet     = fvs([[FR_1520, 'شبکه به‌مثابهٔ تابع', '۷۸۴ عدد می‌آید'], [FR_1525, 'شبکه به‌مثابهٔ تابع', '۱۰ عدد برمی‌گردد']]);
const vFuncComplex = fvs([[FR_1535, '۱۳٬۰۰۰ پارامتر', 'وزن‌ها و بایاس‌ها'], [FR_1550, 'تابعی پیچیده', 'چندین ضرب ماتریسی'], [FR_1555, 'تابعی پیچیده', 'و سیگموئید']]);
const vReluStrip   = fvs([[FR_1745, 'ReLU', 'max(0, A)'], [FR_1755, 'ReLU', 'به‌مراتب آموزش‌پذیرتر']]);

// ============================================================
//  ویژوال‌های مفهومی (همهٔ CSS/SVG دست‌ساز؛ خانه‌سبک دک‌های HTML)
// ============================================================

//  یک ستون نقطهٔ مشترک چند ویژوال (کلاس‌های nf-* از EXTRA_CSS)
const colDots = (n, cls) => {
  let s = '';
  for (let i = 0; i < n; i++) s += `<i class="nf-dot ${cls}" style="--i:${i}"></i>`;
  return s;
};
const nfCol = (n, dotCls, lab, sub, stackCls) => `<div class="nf-col">
    <div class="nf-stack${stackCls ? ' ' + stackCls : ''}">${colDots(n, dotCls)}</div>
    <span class="nf-lab">${lab}</span><span class="nf-sub">${sub}</span>
  </div>`;

//  الگوی «سه» در شبکهٔ ۲۸×۲۸ (r: ردیف از بالا، c: ستون از چپ) — مشترک برای اسلایدهای ۷ و ۱۰
const threeAt = (r, c) =>
  (r >= 2 && r <= 5 && c >= 8 && c <= 19) ||    // خط بالا
  (r >= 5 && r <= 12 && c >= 16 && c <= 19) ||  // شاخهٔ راستِ بالا
  (r >= 12 && r <= 15 && c >= 11 && c <= 19) || // خط میانی
  (r >= 15 && r <= 23 && c >= 16 && c <= 19) || // شاخهٔ راستِ پایین
  (r >= 23 && r <= 26 && c >= 8 && c <= 19);    // خط پایین

//  الف) سفر لایه‌به‌لایه: شبکهٔ ۲۸×۲۸ ورودی با الگوی «سه» + اتصالات بین لایه‌ها (اسلاید ۱۰)
function vNetFlow() {
  const P = 4.4, GX = 522, GY = 20, CELL = 3.2;
  let cells = '';
  const litPts = [];
  let k = 0;
  for (let r = 0; r < 28; r++) for (let c = 0; c < 28; c++) {
    const x = GX + c * P, y = GY + r * P;
    const lit = threeAt(r, c);
    cells += `<rect x="${x.toFixed(1)}" y="${y.toFixed(1)}" width="${CELL}" height="${CELL}" rx="0.8" fill="${lit ? '#C9A227' : '#E3E8EF'}"/>`;
    if (lit && k % 6 === 0) litPts.push(x + CELL / 2, y + CELL / 2);
    k++;
  }
  const hx1 = 436, hx2 = 316, ox = 186;
  const dotY = i => 30 + i * 13.5;
  const outY = i => 42 + i * 21;
  const H1LIT = [2, 3, 5, 8, 9, 11], H2LIT = [1, 4, 5, 7, 10, 12];
  const dots16 = (x, litSet) => {
    let s = '';
    for (let i = 0; i < 16; i++) {
      const lit = litSet.includes(i);
      s += `<circle cx="${x}" cy="${dotY(i).toFixed(1)}" r="5" fill="${lit ? '#FBF3D5' : '#F2F4F7'}" stroke="${lit ? '#C9A227' : '#B9C4D2'}" stroke-width="1.5"/>`;
    }
    return s;
  };
  let eIn = '';
  for (let i = 0; i < litPts.length; i += 2) {
    const sx = litPts[i], sy = litPts[i + 1];
    for (let j = 0; j < 16; j++) eIn += `<line x1="${sx.toFixed(1)}" y1="${sy.toFixed(1)}" x2="${hx1}" y2="${dotY(j).toFixed(1)}"/>`;
  }
  let e12 = '';
  for (let i = 0; i < 16; i++) for (let j = 0; j < 16; j++) e12 += `<line x1="${hx1}" y1="${dotY(i).toFixed(1)}" x2="${hx2}" y2="${dotY(j).toFixed(1)}"/>`;
  let e2o = '';
  for (let i = 0; i < 16; i++) for (let j = 0; j < 10; j++) e2o += `<line x1="${hx2}" y1="${dotY(i).toFixed(1)}" x2="${ox}" y2="${outY(j)}"/>`;
  const faDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
  let outDots = '';
  for (let i = 0; i < 10; i++) {
    const hot = i === 3;
    if (hot) outDots += `<circle cx="${ox}" cy="${outY(3)}" r="11.5" fill="none" stroke="#C9A227" stroke-width="2" opacity="0.35"/>`;
    outDots += `<circle cx="${ox}" cy="${outY(i)}" r="6.5" fill="${hot ? '#C9A227' : '#F2F4F7'}" stroke="${hot ? '#C9A227' : '#B9C4D2'}" stroke-width="1.5"/>`;
    outDots += `<text x="${ox + 16}" y="${outY(i) + 4.5}" class="nf3-digit">${faDigits[i]}</text>`;
  }
  return `<div class="nf3z">
  <svg class="nf3-svg" viewBox="0 0 660 300" role="img" aria-label="جریان لایه‌به‌لایهٔ «سه» از شبکهٔ ۷۸۴ پیکسلی تا ده نورونِ خروجی">
    <g data-frag="2" style="stroke:#0E7C7B;stroke-width:0.5;opacity:0.1">${eIn}</g>
    <g data-frag="3" style="stroke:#0E7C7B;stroke-width:0.5;opacity:0.07">${e12}</g>
    <g data-frag="3" style="stroke:#0E7C7B;stroke-width:0.5;opacity:0.08">${e2o}</g>
    <g data-frag="1">
      ${cells}
      <text x="584" y="168" class="nf3-num">۷۸۴</text>
      <text x="584" y="186" class="nf3-sub">هر پیکسل، یک نورون</text>
    </g>
    <text x="474" y="146" class="nf3-arr" data-frag="2">←</text>
    <g data-frag="2">
      ${dots16(hx1, H1LIT)}
      <text x="${hx1}" y="262" class="nf3-num">۱۶</text>
      <text x="${hx1}" y="280" class="nf3-sub">لایهٔ پنهان اول</text>
    </g>
    <text x="376" y="146" class="nf3-arr" data-frag="2">←</text>
    <g data-frag="2">
      ${dots16(hx2, H2LIT)}
      <text x="${hx2}" y="262" class="nf3-num">۱۶</text>
      <text x="${hx2}" y="280" class="nf3-sub">لایهٔ پنهان دوم</text>
    </g>
    <text x="254" y="146" class="nf3-arr" data-frag="3">←</text>
    <g data-frag="3">
      ${outDots}
      <text x="${ox}" y="262" class="nf3-num">۱۰</text>
      <text x="${ox}" y="280" class="nf3-sub">هر رقم، یک نورون</text>
    </g>
  </svg>
  <div class="viz-caption" data-frag="3">فعال‌سازی‌های هر لایه، فعال‌سازی‌های لایهٔ بعد را تعیین می‌کنند — فقط نمونه‌ای از اتصالاتِ تمام‌به‌تمام ترسیم شده</div>
</div>`;
}

//  لایهٔ خروجی: ۱۰ نورون با نوار اطمینان (اسلاید ۸)
function vOutput10() {
  const faDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
  const conf = [0.08, 0.05, 0.12, 0.87, 0.09, 0.06, 0.11, 0.07, 0.04, 0.10];
  let rows = '';
  for (let i = 0; i < 10; i++) {
    const y = 26 + i * 33;
    const hot = i === 3;
    const w = Math.max(conf[i] * 150, 8);
    rows += `<g data-frag="2">
      <rect x="${(200 - w).toFixed(1)}" y="${y - 5}" width="${w.toFixed(1)}" height="10" rx="5" fill="${hot ? '#C9A227' : '#DDE3EA'}"/>
      <circle cx="220" cy="${y}" r="9" fill="${hot ? '#C9A227' : '#F2F4F7'}" stroke="${hot ? '#C9A227' : '#B9C4D2'}" stroke-width="2"/>
      <text x="245" y="${y + 5}" class="oz-d">${faDigits[i]}</text>
    </g>`;
    if (hot) rows += `<text x="10" y="${y + 5}" class="oz-hot" data-frag="2">پرنورترین</text>`;
  }
  return `<div class="oz10">
  <svg viewBox="0 0 300 360" role="img" aria-label="ده نورون خروجی، یکی برای هر رقم؛ نورونِ سه پرنور">
    ${rows}
  </svg>
  <div class="viz-caption" data-frag="2">۱۰ نورون، یکی برای هر رقم؛ طول هر نوار، میزان اطمینان سیستم از آن رقم</div>
</div>`;
}

//  ب) شماتیک معماری با برچسب «لایهٔ پنهان» (اسلاید ۹)
function vArchSchema() {
  return `<div class="axz">
  <div class="netf">
    ${nfCol(9, 'nf-big', '۷۸۴', 'ورودی — هر پیکسل', 'nf-in')}
    <span class="nf-arrow">←</span>
    <div class="ax-mid">
      <div class="netf ax-pair">
        ${nfCol(16, '', '۱۶', 'لایهٔ پنهان اول')}
        <span class="nf-arrow">←</span>
        ${nfCol(16, '', '۱۶', 'لایهٔ پنهان دوم')}
      </div>
      <span class="ax-brk"></span>
      <span class="ax-lab">لایهٔ پنهان</span>
    </div>
    <span class="nf-arrow">←</span>
    ${nfCol(10, 'nf-out', '۱۰', 'خروجی — یکی برای هر رقم', 'nf-out')}
  </div>
</div>`;
}

//  ج) مثال کارشده: جریان اعداد یک نورون (اسلاید ۲۳)
//  حالت الف: لبهٔ واقعی → ۱٫۹ → σ ≈ ۰٫۸۷ → بله؛ حالت ب: وارونه → −۴٫۴ → ≈ صفر → خیر
function vNeuronFlow() {
  const row = (title, px, math, sum, bias, sig, verdict, win) => `
  <div class="nf-row">
    <span class="nf-title">${title}</span>
    <span class="nf-pxs">${px.map(p => `<span class="nf-px${p.neg ? ' neg' : ''}"><b>${p.v}</b><i>× ${p.w}</i></span>`).join('<span class="nf-op">+</span>')}</span>
    <span class="nf-math">${math}</span>
    <span class="nf-chip sum">${sum}</span>
    <span class="nf-arrow-sm">→</span>
    <span class="nf-chip bias">${bias}</span>
    <span class="nf-arrow-sm">→</span>
    <span class="nf-chip sig">${sig}</span>
    <span class="nf-verdict${win ? ' win' : ' no'}">${verdict}</span>
  </div>`;
  return `<div class="nflow">
  ${row('لبهٔ واقعی: مرکز پرنور، اطراف تیره',
    [{ v: '۰٫۹', w: '+۵' }, { v: '۰٫۲', w: '−۲', neg: true }, { v: '۰٫۱', w: '−۲', neg: true }],
    '۴٫۵ − ۰٫۴ − ۰٫۲ =', 'مجموع وزنی ۳٫۹', 'بایاس (−۲) ← ۱٫۹', 'σ(۱٫۹) ≈ ۰٫۸۷', 'لبه: بله', true)}
  ${row('وارونه: مرکز تیره، اطراف پرنور',
    [{ v: '۰٫۲', w: '+۵' }, { v: '۰٫۹', w: '−۲', neg: true }, { v: '۰٫۸', w: '−۲', neg: true }],
    '۱ − ۱٫۸ − ۱٫۶ =', 'مجموع وزنی −۲٫۴', 'بایاس (−۲) ← −۴٫۴', 'σ(−۴٫۴) ≈ صفر', 'خیر', false)}
  <div class="viz-caption">منطق نورون واقعی یکی است: وزن‌ها + مجموع وزنی + بایاس + سیگموئید — فقط با ۳ پیکسل به‌جای ۷۸۴</div>
</div>`;
}

//  د) منحنی سیگموئید با دو نقطهٔ مثال کارشده (اسلاید ۲۴)
//  محور x از −۵ تا ۵، محور y از ۰ تا ۱؛ راهنماهای طلایی برای ۱٫۹ و −۴٫۴
const sigPath = (() => {
  let d = '';
  for (let x = -5; x <= 5.001; x += 0.1) {
    const y = 1 / (1 + Math.exp(-x));
    const px = 260 + x * 44, py = 186 - y * 150;
    d += (d ? 'L' : 'M') + px.toFixed(1) + ',' + py.toFixed(1);
  }
  return d;
})();
const sigPt = x => {
  const y = 1 / (1 + Math.exp(-x));
  return [260 + x * 44, 186 - y * 150];
};
const [sigX19, sigY19] = sigPt(1.9);
const [sigX44, sigY44] = sigPt(-4.4);
function vSigmoid() {
  return `<div class="sigz">
  <svg viewBox="0 0 520 210" class="sig-svg" aria-label="منحنی سیگموئید با دو نقطهٔ مثال">
    <line class="sig-axis" x1="30" y1="186" x2="500" y2="186"/>
    <line class="sig-axis" x1="260" y1="200" x2="260" y2="16"/>
    <text class="sig-lab" x="248" y="200">۰</text>
    <text class="sig-lab" x="436" y="202">۴</text>
    <text class="sig-lab" x="80" y="202">−۴</text>
    <text class="sig-lab" x="268" y="34">۱</text>
    <text class="sig-lab" x="268" y="182">۰</text>
    <text class="sig-unit" x="500" y="176">x</text>
    <text class="sig-unit" x="240" y="16">فعال‌سازی</text>
    <path class="sig-curve" d="${sigPath}"/>
    <g class="sig-pt-a">
      <line class="sig-guide" x1="${sigX19}" y1="186" x2="${sigX19}" y2="${sigY19}"/>
      <circle class="sig-dot" cx="${sigX19}" cy="${sigY19}" r="6"/>
      <text class="sig-mark" x="${sigX19 + 10}" y="${sigY19 - 8}">۱٫۹ ↦ ۰٫۸۷ ≈ بله</text>
    </g>
    <g class="sig-pt-b">
      <line class="sig-guide" x1="${sigX44}" y1="186" x2="${sigX44}" y2="${sigY44}"/>
      <circle class="sig-dot bad" cx="${sigX44}" cy="${sigY44}" r="6"/>
      <text class="sig-mark bad" x="${sigX44 + 10}" y="${sigY44 - 10}">−۴٫۴ ↦ ≈ صفر ≈ خیر</text>
    </g>
  </svg>
  <div class="viz-caption">ورودی‌های بسیار منفی ≈ صفر، بسیار مثبت ≈ یک، در اطراف صفر یکنواخت افزایش</div>
</div>`;
}

//  هـ) دموی تشخیص لبه با وزن‌های منفی (اسلاید ۲۲)
//  دو ناحیهٔ سه‌پیکسلی: ناحیهٔ یکنواخت (لبه: خیر) در برابر پرنور-اطراف تیره (لبه: بله)
function vEdgeDemo() {
  const cells = (vals, weights, cls) => vals.map((v, i) =>
    `<span class="ed-cell ${cls}" style="--v:${v}"><i class="ed-w${weights[i] < 0 ? ' neg' : ''}">${weights[i] > 0 ? '+' : '−'}${Math.abs(weights[i])}</i><b style="opacity:${0.25 + v * 0.75}"></b></span>`).join('');
  return `<div class="edz">
  <div class="ed-case" data-frag="1">
    <span class="ed-name">ناحیهٔ یکنواختِ پرنور</span>
    <span class="ed-cells">${cells([0.9, 0.8, 0.9], [5, 5, 5], '')}</span>
    <span class="ed-note ed-bad">بدون تضاد ⇐ لبه: خیر</span>
  </div>
  <div class="ed-case" data-frag="2">
    <span class="ed-name">پرنور در مرکز، تیره در اطراف</span>
    <span class="ed-cells">${cells([0.9, 0.15, 0.1], [5, -2, -2], 'edge')}</span>
    <span class="ed-note ed-good">بیشترین جمع ⇐ لبه: بله</span>
  </div>
</div>`;
}

//  و) زنجیرهٔ شناسایی: پیکسل ← لبه ← حلقه+خط ← «نه» — همیشه با برچسب امید/فرضیه (اسلاید ۱۵)
function vChain() {
  const steps = [
    { t: 'پیکسل', sub: '۷۸۴ عدد خام' },
    { t: 'لبهٔ کوچک', sub: 'حدود ۸ تا ۱۰ نورون' },
    { t: 'حلقه + خط', sub: 'زیرالگوی «نه»' },
    { t: '«نه»', sub: 'نورون خروجی', hl: true },
  ];
  return `<div class="chz">
  <span class="ch-hope">امید و فرضیه — نه واقعیتِ اثبات‌شده</span>
  <div class="ch-row">` + steps.map((s, i) =>
    (i ? `<span class="ch-arrow">←</span>` : '') +
    `<span class="ch-step${s.hl ? ' hl' : ''}" style="--d:${i}">${esc(s.t)}<span class="ch-sub">${esc(s.sub)}</span></span>`
  ).join('') + `</div>
  <div class="viz-caption">دنیای ایده‌آل: آیا شبکهٔ آموزش‌دیده واقعاً همین‌طور کار می‌کند؟ «پرسشی دیگر است»</div>
</div>`;
}

//  ز) شبکهٔ ۱۳٬۰۰۰ پیچ‌وهوکه (اسلاید ۲۶)
function vKnobs13k() {
  let cells = '';
  for (let k = 0; k < 40; k++) {
    const a = (k * 47 + 13) % 360;
    cells += `<span class="kb-knob" style="--a:${a}deg;--i:${k}"><i></i></span>`;
  }
  return `<div class="kbz">
  <div class="kb-grid">${cells}</div>
  <div class="kb-parts">
    <span class="kb-part">۷۸۴ × ۱۶ + ۱۶</span>
    <span class="kb-op">+</span>
    <span class="kb-part">۱۶ × ۱۶ + ۱۶</span>
    <span class="kb-op">+</span>
    <span class="kb-part">۱۶ × ۱۰ + ۱۰</span>
  </div>
  <div class="kb-badge">≈ ۱۳٬۰۰۰ پیچ‌وهوکه — کل «حافظه» و «مهارت» شبکه</div>
</div>`;
}

//  ح) پلکان انتزاع در گفتار — شش سطح (اسلاید ۱۸)
function vSpeech() {
  const steps = [
    { t: 'صدای خام', sub: 'آنسامبلی از امواج' },
    { t: 'صداهای متمایز', sub: 'جداکردن' },
    { t: 'هجا', sub: 'ترکیب در هجای معین' },
    { t: 'کلمه', sub: '' },
    { t: 'عبارت', sub: '' },
    { t: 'اندیشه‌های انتزاعی‌تر', sub: '', hl: true },
  ];
  return `<div class="spch">` + steps.map((s, i) =>
    (i ? `<span class="sp-arrow">←</span>` : '') +
    `<span class="sp-step${s.hl ? ' hl' : ''}" style="--d:${i}">${esc(s.t)}${s.sub ? `<span class="sp-sub">${esc(s.sub)}</span>` : ''}</span>`
  ).join('') + `</div>`;
}

//  ط) دانش توزیع‌شده: مفهوم «حلقه» در الگویی از نورون‌ها (اسلاید ۱۴)
function vDistributed() {
  const neurons = [
    { x: 90, y: 40, w: 0.9 }, { x: 210, y: 24, w: 0.55 }, { x: 330, y: 44, w: 0.75 },
    { x: 56, y: 120, w: 0.4 }, { x: 250, y: 120, w: 0.3 }, { x: 366, y: 116, w: 0.65 },
    { x: 120, y: 176, w: 0.5 }, { x: 300, y: 172, w: 0.85 },
  ];
  const beams = neurons.map(n =>
    `<line class="ds-beam" x1="210" y1="100" x2="${n.x}" y2="${n.y}" style="opacity:${0.25 + n.w * 0.6}"/>`).join('');
  const nodes = neurons.map((n, i) =>
    `<g class="ds-n" style="--i:${i}"><circle cx="${n.x}" cy="${n.y}" r="17"/><text x="${n.x}" y="${n.y + 5}" text-anchor="middle">${(n.w * 10).toFixed(0)}</text></g>`).join('');
  return `<div class="dsz">
  <svg viewBox="0 0 420 210" class="ds-svg" aria-label="مفهوم حلقه پخش‌شده میان نورون‌ها">
    ${beams}
    ${nodes}
    <circle class="ds-core" cx="210" cy="100" r="30"/>
    <text class="ds-core-t" x="210" y="106" text-anchor="middle">حلقه؟</text>
  </svg>
  <div class="viz-caption">عدد هر نورون = سهم کوچکش از الگو؛ هیچ «نورونِ تکیٔ حلقه» در کار نیست — دانش توزیع‌شده</div>
</div>`;
}

//  ی) ضرب ماتریس‌وبردار: شکل فشردهٔ همان مثال (اسلاید ۳۳)
function vMatrix() {
  return `<div class="mxz">
  <svg viewBox="0 0 640 150" class="mx-svg" aria-label="ضرب ماتریس در بردار به‌علاوهٔ بایاس">
    <g class="mx-grp" data-frag="2">
      <path class="mx-brk" d="M250,25 L230,25 L230,125 L250,125"/>
      <text class="mx-t" x="305" y="55" text-anchor="middle">ماتریس وزن‌ها W</text>
      <text class="mx-t small" x="305" y="85" text-anchor="middle">هر سطر = اتصالاتِ یک نورون</text>
      <text class="mx-op" x="385" y="82">×</text>
      <path class="mx-brk" d="M435,25 L415,25 L415,125 L435,125"/>
      <text class="mx-t" x="475" y="55" text-anchor="middle">بردار a</text>
      <text class="mx-t small" x="475" y="85" text-anchor="middle">فعال‌سازی‌های لایهٔ قبل</text>
      <text class="mx-op" x="540" y="82">+</text>
      <path class="mx-brk" d="M595,45 L575,45 L575,105 L595,105"/>
      <text class="mx-t" x="612" y="82">b</text>
    </g>
    <text class="mx-op big" x="195" y="82">→</text>
    <g class="mx-grp" data-frag="3">
      <text class="mx-sig" x="160" y="82" text-anchor="middle">σ</text>
      <text class="mx-op big" x="110" y="82">→</text>
      <path class="mx-brk" d="M85,40 L65,40 L65,110 L85,110"/>
      <text class="mx-t" x="40" y="70" text-anchor="middle">بردار a′</text>
      <text class="mx-t small" x="40" y="96" text-anchor="middle">لایهٔ بعد</text>
    </g>
  </svg>
  <div class="viz-caption" data-frag="3">کل گذارِ لایه به لایه در یک عبارت: a′ = σ(W·a + b) — سیگموئید روی هر جزء، یک‌به‌یک</div>
</div>`;
}

//  ک) مقایسهٔ سیگموئید و ReLU (اسلاید ۳۸)
function vReluCompare() {
  // منحنی سیگموئید کوچک
  let sig = '';
  for (let x = -4; x <= 4.001; x += 0.15) {
    const y = 1 / (1 + Math.exp(-x));
    sig += (sig ? 'L' : 'M') + (30 + (x + 4) * 26).toFixed(1) + ',' + (110 - y * 80).toFixed(1);
  }
  return `<div class="rlz">
  <div class="rl-card" data-frag="1">
    <span class="rl-name">سیگموئید — ۲۰۱۷</span>
    <svg viewBox="0 0 270 130" class="rl-svg" aria-label="منحنی سیگموئید">
      <line class="rl-axis" x1="15" y1="110" x2="255" y2="110"/>
      <line class="rl-axis" x1="134" y1="120" x2="134" y2="12"/>
      <path class="rl-curve sig" d="${sig}"/>
    </svg>
    <span class="rl-note">فشرده به بازهٔ ۰ تا ۱؛ اما آموزش در شبکهٔ عمیق دشوار</span>
  </div>
  <div class="rl-card hl" data-frag="2">
    <span class="rl-name">ReLU — امروز</span>
    <svg viewBox="0 0 270 130" class="rl-svg" aria-label="منحنی ReLU">
      <line class="rl-axis" x1="15" y1="110" x2="255" y2="110"/>
      <line class="rl-axis" x1="134" y1="120" x2="134" y2="12"/>
      <path class="rl-curve relu" d="M20,110 L134,110 L245,20"/>
    </svg>
    <span class="rl-note">max(0, A)؛ به‌مراتب آموزش‌پذیرتر — برندهٔ شبکه‌های عمیق</span>
  </div>
</div>`;
}

// ============================================================
//  ویژوال‌های جدید این دک (اسلایدهای بدون فریمِ مناسب در ویدیو)
// ============================================================

//  ۱) نقشهٔ راه سه‌بخشی — سه گام افقی راست‌به‌چپ (اسلاید ۲)
function vRoadmap() {
  const steps = [
    { n: '۱', t: 'مسئله و معماری' },
    { n: '۲', t: 'سازوکار و ۱۳٬۰۰۰ عدد' },
    { n: '۳', t: 'فرمول، تابع و پرسش باز' },
  ];
  return `<div class="rmz">
  <div class="rm-row">` + steps.map((s, i) =>
    (i ? `<span class="rm-arrow" style="--d:${i}">←</span>` : '') +
    `<span class="rm-step" style="--d:${i}"><b class="rm-n">${s.n}</b>${esc(s.t)}</span>`
  ).join('') + `</div>
  <div class="viz-caption">مسیر در سه بخش — از مسئله تا پرسش باز</div>
</div>`;
}

//  ۲) پرسش محوری — سه لایهٔ نقطه‌ای با لایهٔ میانی در دایرهٔ نقطه‌چین و علامت سؤال (اسلاید ۱۱)
function vCentralQuestion() {
  return `<div class="cqz">
  <div class="netf">
    <div class="nf-col">
      <div class="nf-stack nf-in">${colDots(9, 'nf-big')}</div>
      <span class="nf-lab">۷۸۴</span><span class="nf-sub">ورودی — هر پیکسل</span>
    </div>
    <span class="nf-arrow">←</span>
    <div class="nf-col">
      <span class="cq-ring">${colDots(16, '')}<i class="cq-q">؟</i></span>
      <span class="nf-lab">۱۶</span><span class="nf-sub">لایهٔ میانی</span>
    </div>
    <span class="nf-arrow">←</span>
    <div class="nf-col">
      <div class="nf-stack nf-out">${colDots(10, 'nf-out')}</div>
      <span class="nf-lab">۱۰</span><span class="nf-sub">خروجی — یکی برای هر رقم</span>
    </div>
  </div>
  <span class="cq-title">لایه‌های میانی: چه می‌کنند؟</span>
</div>`;
}

//  ۳) تعویق مسئله — رقم «سه» تجزیه‌شده به پنج بلوکِ کوچکِ سازنده‌اش (اسلاید ۱۶)
function vDelayDecomp() {
  //  پنج بلوکِ سازندهٔ «سه» در فضایی ۱۰۰×۱۴۰
  const bars = [
    { x: 18, y: 8,   w: 64, h: 10 },  // خط بالا
    { x: 70, y: 8,   w: 10, h: 62 },  // شاخهٔ راستِ بالا
    { x: 30, y: 62,  w: 50, h: 10 },  // خط میانی
    { x: 70, y: 66,  w: 10, h: 62 },  // شاخهٔ راستِ پایین
    { x: 18, y: 122, w: 64, h: 10 },  // خط پایین
  ];
  const digit = bars.map(b =>
    `<rect x="${b.x + 402}" y="${b.y + 14}" width="${b.w}" height="${b.h}" rx="4" fill="#C9A227"/>`).join('');
  const rows = bars.map((b, i) => {
    const y = 36 + i * 46;
    const vert = b.h > b.w;
    const gx = vert ? 38 : 30, gy = vert ? y - 15 : y - 5, gw = vert ? 10 : 36, gh = vert ? 30 : 10;
    return `
    <g class="dd3-e" style="--i:${i}">
      <rect class="dd3-box" x="24" y="${y - 20}" width="120" height="40" rx="8"/>
      <rect x="${gx}" y="${gy}" width="${gw}" height="${gh}" rx="3" fill="#C9A227"/>
      <text class="dd3-t" x="103" y="${y + 4.5}" text-anchor="middle">لبهٔ کوچک</text>
    </g>`;
  }).join('');
  return `<div class="ddz">
  <svg viewBox="0 0 540 268" class="dd-svg" aria-label="تجزیهٔ رقم سه به پنج لبهٔ کوچکِ سازنده‌اش">
    <g>${digit}</g>
    <text class="dd3-cap" x="452" y="176" text-anchor="middle">رقم «سه»</text>
    <text class="dd3-arr" x="282" y="116" text-anchor="middle">←</text>
    <text class="dd3-cap" x="282" y="142" text-anchor="middle">تجزیه — یک سطح پایین‌تر</text>
    ${rows}
    <text class="dd3-cap" x="84" y="258" text-anchor="middle">پنج بلوک، مستقیماً با پیکسل‌ها قابل‌تشخیص</text>
  </svg>
  <div class="viz-caption">تأخیر فقط یک سطح پایین می‌رود — و آنجا زنجیره تمام می‌شود</div>
</div>`;
}

//  ۴) مرز صادقانه — پلکان سه‌مرحله‌ای با خط‌چین در سطح بالا (اسلاید ۱۷)
function vHonestLadder() {
  return `<div class="ldz">
  <div class="ld-row">
    <span class="ld-step" style="--d:0;--h:72px">پیکسل</span>
    <span class="ld-arrow" style="--d:1">←</span>
    <span class="ld-step" style="--d:1;--h:108px">لبه</span>
    <span class="ld-arrow" style="--d:2">←</span>
    <span class="ld-step hope" style="--d:2;--h:146px">حلقه<span class="ld-chip">امید / فرضیه</span></span>
  </div>
  <div class="viz-caption">مرز بین آنچه طراحی‌شده و آنچه اثبات‌شده</div>
</div>`;
}

//  ۵) دانش شبکه کجاست؟ — یک وزنِ بی‌معنا در برابر الگویِ همهٔ وزن‌ها (اسلاید ۲۷)
function vWhereKnowledge() {
  const COLS = 12, ROWS = 12, X0 = 30, Y0 = 20, CW = 20, CH = 16.6;
  //  الگوی «سه» در شبکهٔ ۱۲×۱۲ (ساده‌شده از الگوی ۲۸×۲۸)
  const inThree = (r, c) =>
    (r >= 1 && r <= 2 && c >= 3 && c <= 8) ||
    (r >= 2 && r <= 5 && c >= 7 && c <= 8) ||
    (r >= 5 && r <= 6 && c >= 4 && c <= 8) ||
    (r >= 6 && r <= 9 && c >= 7 && c <= 8) ||
    (r >= 9 && r <= 10 && c >= 3 && c <= 8);
  const toFa = s => s.replace(/\d/g, d => '۰۱۲۳۴۵۶۷۸۹'[d]).replace('.', '٫');
  const valueAt = (r, c) => (Math.abs(Math.sin((r + 1) * 37.7 + (c + 1) * 11.3)) % 1).toFixed(2);
  const SEL = { r: 5, c: 6 }; // داخل خط میانیِ «سه»
  let nums = '';
  for (let r = 0; r < ROWS; r++) for (let c = 0; c < COLS; c++) {
    const x = X0 + c * CW + CW / 2, y = Y0 + r * CH + CH / 2 + 2.5;
    nums += `<text class="wk-num${inThree(r, c) ? ' hot' : ''}" x="${x}" y="${y.toFixed(1)}" text-anchor="middle">${toFa(valueAt(r, c))}</text>`;
  }
  const selX = X0 + SEL.c * CW, selY = Y0 + SEL.r * CH, selCy = selY + CH / 2;
  const selVal = toFa(valueAt(SEL.r, SEL.c));
  return `<div class="wkz">
  <svg viewBox="0 0 640 250" class="wk-svg" aria-label="یک وزن به‌تنهایی بی‌معناست؛ الگویِ همهٔ وزن‌ها با هم، رقم سه را می‌سازد">
    <g class="wk-tag">
      <rect x="250" y="2" width="184" height="34" rx="17"/>
      <text x="342" y="25" text-anchor="middle">دانش = الگویِ همهٔ اعداد</text>
    </g>
    ${nums}
    <rect class="wk-sel" x="${selX}" y="${selY}" width="${CW}" height="${CH.toFixed(1)}"/>
    <line class="wk-link" x1="${selX + CW}" y1="${selCy.toFixed(1)}" x2="440" y2="111"/>
    <text class="wk-mid" x="305" y="102" text-anchor="middle">معنا در ترکیبِ همهٔ آن‌هاست</text>
    <rect class="wk-bigbox" x="440" y="61" width="100" height="100" rx="10"/>
    <text class="wk-bigtext" x="490" y="125" text-anchor="middle">${selVal}</text>
    <text class="wk-q" x="524" y="84" text-anchor="middle">؟</text>
    <text class="wk-lab" x="490" y="186" text-anchor="middle">یک وزن، به‌تنهایی</text>
    <text class="wk-lab2" x="490" y="206" text-anchor="middle">هیچ معنایی ندارد</text>
    <text class="wk-lab" x="150" y="238" text-anchor="middle">همهٔ وزن‌ها با هم: الگوی «سه»</text>
  </svg>
  <div class="viz-caption">هیچ وزنی به‌تنهایی معنایی ندارد؛ «سه» در ترکیبِ همهٔ ۱۳٬۰۰۰ عدد است</div>
</div>`;
}

//  ۶) یادگیری — دستی که پیچ‌های شبکه را می‌چرخاند + سه برچسب لایه (اسلاید ۲۸)
function vLearningSetting() {
  const N = [8, 12, 12, 9], X = [570, 410, 250, 90];
  const posOf = n => { const s = 130 / (n - 1); return Array.from({ length: n }, (_, i) => 95 + i * s); };
  const P = N.map(posOf);
  const dots = N.map((n, p) =>
    Array.from({ length: n }, (_, i) => `<circle class="ls-dot" cx="${X[p]}" cy="${P[p][i].toFixed(1)}" r="7"/>`).join('')).join('');
  let edges = '';
  for (let p = 0; p < 3; p++)
    for (let a = 0; a < N[p]; a += 2)
      for (let b = 0; b < N[p + 1]; b += 3)
        edges += `<line class="ls-edge" x1="${X[p]}" y1="${P[p][a].toFixed(1)}" x2="${X[p + 1]}" y2="${P[p + 1][b].toFixed(1)}"/>`;
  return `<div class="lsz">
  <svg viewBox="0 0 640 272" class="ls-svg" aria-label="دستی که پیچ‌های شبکه را می‌چرخاند">
    <g class="ls-edges">${edges}</g>
    <g class="ls-dots">${dots}</g>
    <g class="ls-hand">
      <rect class="ls-palm" x="398" y="12" width="78" height="58" rx="18"/>
      <rect class="ls-fin" x="352" y="22" width="54" height="15" rx="7.5" transform="rotate(16 379 29)"/>
      <rect class="ls-fin" x="352" y="52" width="54" height="15" rx="7.5" transform="rotate(-14 379 59)"/>
    </g>
    <circle class="ls-knob" cx="330" cy="46" r="26"/>
    <line class="ls-knob-i" x1="330" y1="46" x2="312" y2="31"/>
    <text class="ls-lab" x="${X[1]}" y="252" text-anchor="middle">لایهٔ ۲: لبه‌ها</text>
    <text class="ls-lab" x="${X[2]}" y="252" text-anchor="middle">لایهٔ ۳: الگوها</text>
    <text class="ls-lab" x="${X[3]}" y="252" text-anchor="middle">خروجی: رقم</text>
  </svg>
</div>`;
}

//  ۷) دو کادر: جعبهٔ کاملاً سیاه در برابر جعبهٔ نیمه‌شفاف (اسلاید ۲۹)
function vPeekBox() {
  return `<div class="pbz">
  <div class="pb-card" data-frag="1">
    <div class="pb-box dark"></div>
    <span class="pb-lab dark">کاملاً سیاه</span>
  </div>
  <span class="pb-arrow">←</span>
  <div class="pb-card" data-frag="2">
    <div class="pb-box open">
      <span class="pb-in">وزن‌ها و بایاس‌ها</span>
      <span class="pb-knobs"><i></i><i></i><i></i><i></i><i></i></span>
    </div>
    <span class="pb-lab open">تا حدی خوانا</span>
  </div>
</div>`;
}

//  ۸) جمع‌بندی بخش‌های ۱ و ۲ — معماری با سه برچسب کنار آن (اسلاید ۳۰)
function vSummary12() {
  return `<div class="s12z">
  <div class="netf s12-net">
    ${nfCol(7, 'nf-big', '۷۸۴', 'ورودی', 'nf-in')}
    <span class="nf-arrow">←</span>
    ${nfCol(12, '', '۱۶', 'لایهٔ پنهان')}
    <span class="nf-arrow">←</span>
    ${nfCol(12, '', '۱۶', 'لایهٔ پنهان')}
    <span class="nf-arrow">←</span>
    ${nfCol(9, 'nf-out', '۱۰', 'خروجی', 'nf-out')}
  </div>
  <div class="s12-labels">
    <span class="s12-chip a">لایه‌ها = اجرا</span>
    <span class="s12-chip b">وزن‌ها = دانش (۱۳٬۰۰۰)</span>
    <span class="s12-chip c">پلکان = امید/فرضیه</span>
  </div>
</div>`;
}

//  ۹) جمع‌بندی نهایی — «سه»ی ۲۸×۲۸ ← شبکه ← چهار برچسب (اسلاید ۳۹)
function vSummaryAll() {
  return `<div class="saz">
  <figure class="sa-digit">
    <img src="${FR_0015}" alt="«سه»ی دست‌نویس ۲۸×۲۸">
    <figcaption>«سه»ی ۲۸×۲۸</figcaption>
  </figure>
  <span class="sa-arrow">←</span>
  <div class="netf sa-net">
    ${nfCol(7, 'nf-big', '۷۸۴', 'ورودی', 'nf-in')}
    <span class="nf-arrow">←</span>
    ${nfCol(12, '', '۱۶', 'لایهٔ پنهان')}
    <span class="nf-arrow">←</span>
    ${nfCol(12, '', '۱۶', 'لایهٔ پنهان')}
    <span class="nf-arrow">←</span>
    ${nfCol(9, 'nf-out', '۱۰', 'خروجی', 'nf-out')}
  </div>
  <span class="sa-arrow">←</span>
  <ul class="sa-list">
    <li>تابعی با ۷۸۴ ورودی و ۱۰ خروجی</li>
    <li>لایه‌ها با ≈ ۱۳٬۰۰۰ وزن و بایاس</li>
    <li>دانش = همان اعداد؛ لایه‌ها اجرا می‌کنند</li>
    <li>یادگیری = پیدا کردن آن اعداد</li>
  </ul>
</div>`;
}

//  ۱۰) خودسنجی — پنج کارت سؤال در شبکهٔ ۲×۳ (اسلاید ۴۰)
function vQuiz() {
  const qs = [
    ['۱', 'چرا فعال‌سازی‌ها بین ۰ و ۱ بمانند؟'],
    ['۲', 'وزنِ منفی در نقشهٔ وزن‌ها چه می‌کند؟'],
    ['۳', 'بایاس چه چیزی را تعیین می‌کند؟'],
    ['۴', 'دانش شبکه دقیقاً کجاست؟'],
    ['۵', 'چرا «لبه ← حلقه ← رقم» واقعیت نیست؟'],
  ];
  return `<div class="qz">` + qs.map(([n, t], i) =>
    `<div class="q-card" style="--i:${i}"><span class="q-num">${n}</span><span class="q-t">${esc(t)}</span></div>`
  ).join('') + `</div>`;
}

//  ۱۱) نقشهٔ مطالعهٔ عمیق‌تر — گرهٔ مرکزی با پنج شاخه (اسلاید ۴۱)
function vStudyMap() {
  const branches = [
    { x: 476, y: 6, t: 'فریم‌ها (8 بخش)' },
    { x: 16, y: 6, t: 'ترنسکریپت فارسی' },
    { x: 16, y: 122, t: 'README بخش‌ها' },
    { x: 476, y: 122, t: 'ویدیوهای بعدی' },
    { x: 246, y: 182, t: 'بازی با کد' },
  ];
  const lines = branches.map(b =>
    `<line class="mp-line" x1="330" y1="110" x2="${b.x + 84}" y2="${b.y + 18}"/>`).join('');
  const boxes = branches.map((b, i) => `
    <g class="mp-b" style="--i:${i}">
      <rect class="mp-box" x="${b.x}" y="${b.y}" width="168" height="36" rx="10"/>
      <text class="mp-t" x="${b.x + 84}" y="${b.y + 23}" text-anchor="middle">${esc(b.t)}</text>
    </g>`).join('');
  return `<div class="mpz">
  <svg viewBox="0 0 660 228" class="mp-svg" aria-label="نقشهٔ شاخه‌ای منابع مطالعه">
    ${lines}
    <ellipse class="mp-core" cx="330" cy="110" rx="82" ry="40"/>
    <text class="mp-core-t" x="330" y="117" text-anchor="middle">این مطالعه</text>
    ${boxes}
  </svg>
</div>`;
}

const VISUALS = {
  'netFlow': vNetFlow,
  'archSchema': vArchSchema,
  'neuronFlow': vNeuronFlow,
  'sigmoid': vSigmoid,
  'edgeDemo': vEdgeDemo,
  'chain': vChain,
  'knobs13k': vKnobs13k,
  'speech': vSpeech,
  'distributed': vDistributed,
  'matrix': vMatrix,
  'reluCompare': vReluCompare,
  //  — ویژوال‌های جدید این دک —
  'roadmap': vRoadmap,
  'centralQuestion': vCentralQuestion,
  'delayDecomp': vDelayDecomp,
  'honestLadder': vHonestLadder,
  'whereKnowledge': vWhereKnowledge,
  'learningSetting': vLearningSetting,
  'peekBox': vPeekBox,
  'summary12': vSummary12,
  'summaryAll': vSummaryAll,
  'quiz': vQuiz,
  'studyMap': vStudyMap,
  //  —  ویژوال‌های ۴۱ فریمِ انتخاب‌شده توسط کاربر —
  'f_digit15': vDigit15,
  'f_digitEnd': vDigitEnd,
  's_three3s': vThree3s,
  'f_digit45': vDigit45,
  'f_neuron': vNeuron,
  's_input784': vInput784,
  's_output10': vOutput10,
  's_arch': vArch,
  'f_parts': vParts,
  'f_hope': vHope,
  's_edges': vEdges,
  'f_weight': vWeight,
  'f_weightmap': vWeightmap,
  'f_zero': vZero,
  'f_edge': vEdge,
  's_sigmoid': vSigmoidStrip,
  's_bias': vBias,
  's_knobs': vKnobs,
  'f_vector': vVector,
  's_matrix': vMatrixStrip,
  's_formula': vFormula,
  's_funcneuron': vFuncNeuron,
  's_funcnet': vFuncNet,
  's_funccomplex': vFuncComplex,
  'f_learn': vLearn,
  's_relu': vReluStrip,
};

// ============================================================
//  دادهٔ اسلایدها (پورت کامل و وفادار از study-1-neural-networks.md)
//  ترتیب دقیقاً هم‌راستا با ویدیو: بخش ۱ = اسلاید ۱ تا ۱۸،
//  بخش ۲ = ۱۹ تا ۳۰، بخش ۳ = ۳۱ تا ۴۲
//  کلید بلوک‌ها: bullets / cards / table / accent / muted /
//  lead / text / visual / split
// ============================================================
const SESSIONS = [
// ============================================================
//  بخش ۱ - داخل جعبه: مسئله و معماری (ویدئو 00:00 تا 07:40)
// ============================================================
{ n: 1, footer: 'مطالعهٔ بیشتر ۱ • بخش ۱: داخل جعبه — مسئله و معماری', slides: [
  // اسلاید ۱ - تیتر
  { cover: { kicker: 'مطالعه‌ی خودآموز • بر اساس فصل ۱ از مجموعه‌ی شبکه‌های عصبی 3Blue1Brown', title: 'داخل جعبه‌ی سیاه: شبکه‌ی عصبی چیست؟', sub: 'امروز ردیفِ لایه‌ها را باز می‌کنیم؛ از پیکسل تا رقم' },
    notes: 'شروع مطالعه. نخ تاری: لایه‌ها دانش را ذخیره نمی‌کنند؛ دانش در حدود ۱۳٬۰۰۰ عدد (وزن‌ها و بایاس‌ها) زندگی می‌کند و لایه‌ها فقط آن را اجرا می‌کنند. تصویر رویه همان «سه»ی دست‌نویسِ ۲۸×۲۸ است که مثالِ همراهِ کل مطالعه می‌شود.' },
  // اسلاید ۲ - چرا این مطالعه؟ نقشه‌ی راه
  { title: 'چرا این مطالعه؟ نقشه‌ی راه', blocks: [
    { lead: 'تا پایان این مطالعه می‌توانید:', frag: 1 },
    { bullets: [
      'ساختار داخلی یک شبکه‌ی عصبی ساده را با عدد و نام توصیف کنید',
      'بگویید یک نورون چگونه «می‌بیند» و چرا وزن‌های منفی و بایاس لازم است',
      'به پرسش «دانش شبکه کجاست؟» پاسخ قانع‌کننده بدهید',
      'مرز میان تصویری امیدوارکننده و واقعیتِ اثبات‌شده را تشخیص دهید',
    ], size: 17, gap: 10, frag: 1 },
    { text: 'مسیر در سه بخش: (۱) مسئله و معماری، (۲) سازوکار — وزن، سیگموئید، بایاس و ۱۳٬۰۰۰ عدد، (۳) فرمول، تابع و پرسش باز «چطور یاد می‌گیرد؟»', frag: 2 },
    { visual: 'roadmap', frag: 2 },
  ], notes: 'اهداف یادگیری سند را مرور کنید؛ پایان مطالعه باید بتوانید به پرسش «دانش شبکه کجاست؟» بی‌تردید پاسخ دهید. مسیر سه‌بخشی همین اسلاید است.' },
  // اسلاید ۳ - مسئله، یک «سه»ی ۲۸×۲۸
  { title: 'مسئله، یک «سه»ی ۲۸×۲۸', blocks: [
    { split: { ratio: [35, 65], left: [
      { visual: 'f_digit15', frag: 1 },
    ], right: [
      { text: 'این یک «سه» است: دست‌خطش نامرتب است و در رزولوشن ۲۸×۲۸ پیکسل رسم شده، اما مغز شما بدون هیچ زحمتی آن را تشخیص می‌دهد. همین «سه» را به‌شکل عددی هم می‌شود دید: یک ماتریس ۲۸×۲۸ از اعداد خاکستری — ۷۸۴ عدد، از صفر (سیاه) تا یک (سفید).', frag: 1 },
    ] } },
  ], notes: 'این «سه»، مثالِ همراهِ کل ویدیو و کل این مطالعه است: ماتریسی ۲۸×۲۸ از اعداد خاکستری — ۷۸۴ عدد از صفر (سیاه) تا یک (سفید).' },
  // اسلاید ۴ - سه «سه»، یک ایده
  { title: 'سه «سه»، یک ایده', blocks: [
    { text: 'حتی «سه»هایی که پیکسل‌هایشان با هم فرق دارد هم به‌سادگی قابل‌تشخیص‌اند؛ الگوی سلول‌های نوریِ فعال‌شده در هر تصویر متفاوت است، اما قشر بینایی همه را بیان‌کنندهٔ یک ایدهٔ مشترک می‌خواند. عبور از «۷۸۴ عددِ متفاوت» به «یک مفهومِ مشترک» خود یکی از بزرگ‌ترین کارهایی است که یک مدل باید انجام دهد: تغییر نمایش، نه از دست‌دادن داده.', frag: 1 },
    { visual: 's_three3s', frag: 2 },
  ], notes: 'کلید این اسلاید: عبور از «۷۸۴ عددِ متفاوت» به «یک مفهومِ مشترک» تغییر نمایش است، نه از دست‌دادن داده.' },
  // اسلاید ۵ - حالا، در برنامه
  { title: 'حالا، در برنامه', blocks: [
    { split: { ratio: [35, 65], left: [
      { visual: 'f_digit45', frag: 1 },
    ], right: [
      { text: 'همین کار را به ماشین بسپارید: برنامه‌ای بنویسید که این شبکه‌ی ۲۸×۲۸ را بگیرد و رقمی بین ۰ تا ۹ خروجی دهد. این کار «از خنده‌دارِ ساده به سختیِ ترسناک بدل می‌شود». این تقابل، انگیزهٔ کل مطالعه است.', frag: 1 },
    ] } },
  ], notes: 'انگیزهٔ کل مطالعه در دو جمله: کاری که مغز بی‌دردسر انجام می‌دهد در برابر برنامه‌ای که نوشتنش ترسناک است.' },
  // اسلاید ۶ - نورون یعنی عددی بین ۰ و ۱
  { title: 'نورون یعنی عددی بین ۰ و ۱', blocks: [
    { split: { ratio: [35, 65], left: [
      { visual: 'f_neuron', frag: 2 },
    ], right: [
      { bullets: [
        'شبکه از «نورون» شروع می‌شود؛ نورون چیزی نیست جز چیزی که یک عدد بین صفر و یک نگه می‌دارد',
        'آن عدد «فعال‌سازی» (Activation) نام دارد؛ نورون وقتی فعال‌سازی‌اش بزرگ است «روشن» می‌شود',
      ], size: 18, gap: 12, frag: 1 },
    ] } },
  ], notes: 'ساده‌ترین تعریف ممکن: نورون = یک عدد بین صفر و یک. نام آن عدد، «فعال‌سازی» است.' },
  // اسلاید ۷ - لایهٔ ورودی: ۷۸۴ نورون
  { title: 'لایه‌ی ورودی: ۷۸۴ نورون', blocks: [
    { bullets: [
      'لایه‌ی ورودی: ۷۸۴ نورون، یکی برای هر پیکسل',
      'مقدار هرکدام طیف خاکستری پیکسل است، از صفر (سیاه) تا یک (سفید)',
      'وقتی «سه» را وارد می‌کنیم، دقیقاً همان پیکسل‌های روشن، نورون‌های روشن می‌سازند',
    ], size: 18, gap: 12, frag: 1 },
    { visual: 's_input784', frag: 2 },
  ], notes: '۷۸۴ = ۲۸×۲۸. لایهٔ ورودی دقیقاً همان پیکسل‌های «سه» است — تصویر، عدد به عدد، وارد شبکه می‌شود.' },
  // اسلاید ۸ - لایهٔ خروجی: ۱۰ نورون
  { title: 'لایه‌ی خروجی: ۱۰ نورون', blocks: [
    { split: { ratio: [40, 60], left: [
      { visual: 's_output10', frag: 2 },
    ], right: [
      { bullets: [
        'لایه‌ی خروجی: ۱۰ نورون، یکی برای هر رقم',
        'فعال‌سازی هرکدام نشان می‌دهد سیستم تا چه حد فکر می‌کند تصویر همان رقم است',
      ], size: 17, gap: 12, frag: 1 },
    ] } },
  ], notes: '۱۰ نورون خروجی = ۱۰ رقم. پرنورترین نورون، پاسخ شبکه برای آن تصویر است.' },
  // اسلاید ۹ - معماری: ۷۸۴ ← ۱۶ ← ۱۶ ← ۱۰ (نوار فریم + شماتیک)
  { title: 'معماری: ۷۸۴ ← ۱۶ ← ۱۶ ← ۱۰', blocks: [
    { split: { ratio: [46, 54], left: [
      { visual: 's_arch', frag: 1 },
      { visual: 'archSchema', frag: 3 },
    ], right: [
      { bullets: [
        'بین ورودی و خروجی، دو لایه‌ی پنهان (Hidden layers) با ۱۶ نورون در هرکدام قرار دارد',
        '«پنهان» یعنی نه به تصویر ورودی متصل‌اند و نه مستقیماً جواب می‌دهند',
        'این اعداد انتخاب دلخواه‌اند: «۱۶ فقط عدد قشنگی بود که روی صفحه جا می‌شد»',
        'قاعده‌ی حرکت: فعال‌سازی‌های یک لایه، فعال‌سازی‌های لایه‌ی بعد را تعیین می‌کنند',
      ], size: 15, gap: 8, frag: 2 },
      { muted: 'نکتهٔ مطالعه: لازم نیست این اعداد را حفظ کنید؛ نقش هر لایه کافی است: ۷۸۴ (هر پیکسل، یک نورون)، ۱۰ (هر رقم، یک نورون)، ۱۶ (انتخاب دلخواه). عددی که باید با آن همراه شوید در پایان بخش می‌آید: ≈ ۱۳٬۰۰۰ وزن و بایاس.', frag: 3 },
    ] } },
  ], notes: 'هدف حفظ اعداد نیست؛ نقش لایه‌هاست: ۷۸۴ = هر پیکسل یک نورون، ۱۰ = هر رقم یک نورون، ۱۶ = انتخاب دلخواه. نخِ بعدی: ≈ ۱۳٬۰۰۰ وزن و بایاس.' },
  // اسلاید ۱۰ - سفر آن «سه»، از لایه تا لایه
  { title: 'سفر آن «سه»، از لایه تا لایه', blocks: [
    { split: { ratio: [45, 55], left: [
      { visual: 'netFlow', frag: 2 },
    ], right: [
      { text: 'شبکه از پیش آموزش دیده است. مسیر یک تصویر:', frag: 1 },
      { bullets: [
        '۷۸۴ نورون ورودی را بر اساس روشنایی پیکسل‌های تصویر روشن می‌کنید',
        'همان الگوی فعال‌سازی، الگوی مشخصی در لایه‌ی بعد پدید می‌آورد؛ و آن الگو، الگوی لایه‌ی پس از آن را',
        'سرانجام به لایه‌ی خروجی می‌رسیم؛ پرنورترین نورونِ خروجی، انتخاب شبکه برای رقم آن تصویر است',
      ], size: 15, gap: 10, frag: 1 },
      { text: 'قلب شبکه، به‌عنوان سازوکار پردازش اطلاعات، دقیقاً به همین تقلیل می‌شود: چگونه فعال‌سازی‌های یک لایه، فعال‌سازی‌های لایه‌ی بعد را پدید می‌آورند. بقیه‌ی بخش ۱ همین سؤال را باز می‌کند.', frag: 3 },
    ] } },
  ], notes: 'قدم‌به‌قدم بسازید: ورودی روشن می‌شود، سپس لایهٔ اول، سپس دوم، سپس خروجی. بقیهٔ بخش ۱ همین سؤال را باز می‌کند.' },
  // اسلاید ۱۱ - پرسش محوری
  { title: 'پرسش محوری: چرا اصلاً انتظار هوشمندی؟', blocks: [
    { split: { ratio: [45, 55], left: [
      { visual: 'centralQuestion', frag: 2 },
    ], right: [
      { lead: 'قبل از هر ریاضی‌ای، یک پرسش را مطرح می‌کنیم و جوابش را نگه می‌داریم: چرا منطقی است انتظار داشته باشیم ساختار لایه‌ای مثل شبکه‌ی ما با هوشمندی رفتار کند؟ «بهترین امید برای آنچه آن لایه‌های میانی ممکن است انجام دهند چیست؟»', frag: 1 },
      { text: 'این پرسش مهم است چون اگر پاسخ قانع‌کننده‌ای نداشته باشیم، «ردیفی از داورها» صرفاً یک تشبیه قشنگ است، نه توضیح. پاسخ در ادامه می‌آید، و پایه‌اش این است: ما انسان‌ها خودمان رقم را از اجزا می‌شناسیم.', frag: 1 },
    ] } },
  ], notes: 'پرسش را نگه دارید بی‌پاسخ: اگر توضیح نباشد، «ردیفی از داورها» فقط تشبیه قشنگ است.' },
  // اسلاید ۱۲ - ما خودمان رقم را از اجزا می‌شناسیم
  { title: 'ما خودمان رقم را از اجزا می‌شناسیم', blocks: [
    { split: { ratio: [46, 54], left: [
      { visual: 'f_parts', frag: 3 },
    ], right: [
      { text: 'وقتی شما یک رقم را تشخیص می‌دهید، اجزای مختلف را کنار هم می‌چینید:', frag: 1 },
      { bullets: [
        'عدد «نه»: حلقه‌ای بالای سر دارد و خطی سمت راست',
        'عدد «هشت»: همان حلقه‌ی بالا، اما با حلقه‌ی دیگری پایین جفت شده',
        'عدد «چهار»: اساساً به سه خط مشخص تجزیه می‌شود',
      ], size: 17, gap: 10, frag: 2 },
      { text: 'یعنی شما هنگام تشخیص، ناخودآگاه از «کل» به «زیراجزا» می‌روید. این مشاهده، مجوز ماست که به ساختار لایه‌ای امیدوار شویم: اگر انسان با همین منطق رقم را می‌شناسد، شاید شبکه هم بتواند.', frag: 3 },
    ] } },
  ], notes: 'شهود قبل از مکانیزم: اول بپرسید خودتان «نه» را چطور می‌شناسید؛ همین استدلال پایهٔ امید به لایه‌های پنهان است.' },
  // اسلاید ۱۳ - امیدِ ایده‌آل
  { title: 'امیدِ ایده‌آل: یک نورون به‌ازای هر زیراجزا', blocks: [
    { split: { ratio: [48, 52], left: [
      { visual: 'f_hope', frag: 3 },
    ], right: [
      { text: 'امیدوار باشیم هر نورون در لایه‌ی دوم، با یکی از این زیراجزا متناظر باشد: هرگاه تصویری بدهید که مثلاً حلقه‌ای بالای سر دارد (مثل «نه» یا «هشت»)، نورونِ مشخصی هست که فعال‌سازی‌اش نزدیک یک می‌شود.', frag: 1 },
      { text: 'جمله‌ی کلیدی که باید دقیق خوانده شود:', frag: 2 },
      { accent: '«و منظورم این حلقهٔ خاص از پیکسل‌ها نیست؛ امید این است که هر الگوی حلقه‌مانندِ کلی در سمت بالا، این نورون را برانگیزد».', bold: true, frag: 2 },
      { text: 'این جمله، نقطه‌ی تولد تعمیم است. نورون قرار نیست به یک حلقه‌ی به‌خصوص (یک مختصات پیکسلی) وابسته باشد؛ قرار است به «کلیتِ حلقه‌مانندی» حساس باشد. اگر کسی عدد «نه» را کج بنویسد، امیدواریم هنوز همان نورون روشن شود. و باز هم: این «امید» است، نه تأیید.', frag: 3 },
    ] } },
  ], notes: 'جملهٔ کلیدی باید دقیق خوانده شود: «شاید». نقطهٔ تولد تعمیم — و مرز صادقانه هم همین‌جاست: این امید است، نه تأیید.' },
  // اسلاید ۱۴ - دانش توزیع‌شده
  { title: 'دانش توزیع‌شده', blocks: [
    { split: { ratio: [56, 44], left: [
      { visual: 'distributed', frag: 2 },
    ], right: [
      { bullets: [
        'حتی در همان تصویر ایده‌آل، یک نورون به‌جای یک الگوی واحد، به یک کلیِ الگو حساس است: «هر الگوی حلقه‌مانندِ کلی در سمت بالا»، نه یک حلقهٔ مشخص',
        'در شبکه‌های واقعی این قاعده عمومی‌تر می‌شود: هیچ نورونِ تکی را نمی‌توان «نورون حلقه» خواند؛ مفهومی مثل حلقه معمولاً در الگویی از وزن‌های بسیاری از نورون‌ها پخش است',
        '«دانش توزیع‌شده» یعنی همین: مفهوم در یک مکان نشسته نیست؛ در سراسر شبکه پراکنده است',
        'پیام عملی: وقتی شبکه‌ای اشتباه می‌کند، نمی‌توانید با پیداکردن «مقصرِ» یک نورون، ماجرا را ببندید',
      ], size: 15, gap: 7, frag: 1 },
    ] } },
  ], notes: 'حتی در همان تصویر ایده‌آل، نورون به «کلیِ الگو» حساس است؛ و در شبکه‌های واقعی مفاهیم پخش‌اند — دانش توزیع‌شده.' },
  // اسلاید ۱۵ - زنجیرهٔ شناسایی (نوار فریم + زنجیره)
  { title: 'زنجیره‌ی شناسایی: لبه ← حلقه ← رقم', blocks: [
    { split: { ratio: [50, 50], left: [
      { visual: 's_edges', frag: 2 },
      { visual: 'chain', frag: 3 },
    ], right: [
      { text: 'حالا پلکان کامل می‌شود. فرض کنید تصویری مثل عدد «نه» بدهیم؛ در دنیای ایده‌آل:', frag: 1 },
      { bullets: [
        'حدود ۸ تا ۱۰ نورون مرتبط با لبه‌های کوچکِ مشخص روشن می‌شوند',
        'آن لبه‌ها، نورون‌های مرتبط با حلقه‌ی بالایی و یک خط عمودی بلند را روشن می‌کنند',
        'و آن‌ها نورونِ مرتبط با «نه» را',
      ], size: 17, gap: 10, frag: 1 },
      { text: 'یک خط درونی برای این جریان: لبه ← زیرالگو ← رقم. سه پله، سه سطح انتزاع، همان «ردیفی از داورها» — حالا با محتوا.', frag: 3 },
    ] } },
  ], notes: 'مثال «نه»: حدود ۸ تا ۱۰ نورونِ لبه ← «حلقهٔ بالا + خط عمودی بلند» ← نورونِ «نه». سه پله، سه سطح انتزاع — حالا با محتوا. همیشه با برچسب «امید/فرضیه».' },
  // اسلاید ۱۶ - تعویق مسئله
  { title: '«البته این فقط مسئله را به تعویق می‌اندازد»', blocks: [
    { split: { ratio: [44, 56], left: [
      { visual: 'delayDecomp', frag: 3 },
    ], right: [
      { text: 'عجله نکنید. اگر شبکه باید «حلقه» را بشناسد، هنوز نمی‌دانیم حلقه را چطور بشناسد.', frag: 1 },
      { text: 'پاسخ: شناسایی یک حلقه نیز به زیرمسئله‌ها تجزیه می‌شود:', frag: 1 },
      { bullets: [
        'یک راه منطقی، اول شناختن لبه‌های کوچکِ سازندهٔ حلقه است',
        'و خط بلندِ ارقامی مثل یک یا چهار یا هفت، «واقعاً فقط یک لبهٔ بلند است»؛ یا الگویی از چند لبهٔ کوچک‌تر',
      ], size: 16, gap: 9, frag: 2 },
      { text: 'پس تأخیر فقط یک سطح پایین می‌رود: از زیرجزا به زیرزیرجزا. و آنجا دیگر چیزی برای تأخیر باقی نمی‌ماند، چون لبه‌های کوچک مستقیماً با پیکسل‌ها قابل‌تشخیص‌اند.', frag: 3 },
    ] } },
  ], notes: 'عجله نکنید: تأخیر فقط یک سطح پایین می‌رود. آنجا لبه‌های کوچک مستقیماً با پیکسل‌ها قابل‌تشخیص‌اند و زنجیره تمام می‌شود.' },
  // اسلاید ۱۷ - مرز صادقانه
  { title: 'مرز صادقانه: «پرسشی دیگر است»', blocks: [
    { split: { ratio: [55, 45], left: [
      { visual: 'honestLadder', frag: 3 },
    ], right: [
      { lead: 'حالا مرز این تصویر قشنگ کجاست؟ پاسخی صادقانه و مهم: «آیا شبکه‌ی نهایی‌مان واقعاً همین کار را انجام می‌دهد یا نه، پرسشی دیگر است».', frag: 1 },
      { bullets: [
        'در شبکه‌های آموزش‌دیدهٔ واقعی، لایه‌های میانی اغلب چنین ساختار تمیز «یک نورون = یک بخش» ندارند',
        'اینکه شبکه‌ی آموزش‌دیده دقیقاً چه چیزی یاد گرفته و لایه‌هایش چه می‌کنند، پرسشی پژوهشی و تا حد زیاد باز است',
        'پس «لبه ← حلقه ← رقم» را به‌عنوان امیدی برای طراحی نگه دارید، نه توصیفی از واقعیتِ تأییدشده',
      ], size: 16, gap: 10, frag: 2 },
    ] } },
  ], notes: 'بزرگ‌ترین خطر این مطالعه: فرضیه را واقعیت جا زدن. «لبه ← حلقه ← رقم» را امیدی برای طراحی نگه دارید، نه توصیفی از واقعیتِ تأییدشده.' },
  // اسلاید ۱۸ - فراتر از رقم: لایه‌های انتزاع در گفتار
  { title: 'فراتر از رقم: لایه‌های انتزاع در گفتار', blocks: [
    { split: { ratio: [50, 50], left: [
      { visual: 'speech', frag: 2 },
    ], right: [
      { text: 'همین الگوی پلکانی، فقط برای تصویر نیست:', frag: 1 },
      { bullets: [
        'صدای خام (آنسامبلی از امواج)',
        '← جداکردن صداهای متمایز',
        '← ترکیب آن‌ها در هجای معین',
        '← کلمه',
        '← عبارت',
        '← اندیشه‌های انتزاعی‌تر',
      ], size: 16, gap: 7, frag: 1 },
      { text: '«کارهای هوشمندانه‌ی بسیاری» که ممکن است بخواهید انجام دهید، به لایه‌هایی از انتزاع تجزیه می‌شوند. و توانایی تشخیص لبه و الگو، فراتر از ارقام، برای بسیاری از وظایف تشخیص تصویر هم مفید است. همین، یکی از بزرگ‌ترین دلایل گسترش ساختار لایه‌ای در یادگیری ماشین است: بسیاری از مسائل، در ذات خود پلکانی‌اند.', frag: 3 },
    ] } },
  ], notes: 'همین پلکان برای گفتار هم صادق است؛ بسیاری از مسائل در ذات خود پلکانی‌اند — یکی از بزرگ‌ترین دلایل گسترش ساختار لایه‌ای.' },
] },
// ============================================================
//  بخش ۲ - سازوکار: وزن، سیگموئید، بایاس و ۱۳٬۰۰۰ عدد (ویدئو 09:00 تا 12:30)
// ============================================================
{ n: 2, footer: 'مطالعهٔ بیشتر ۱ • بخش ۲: سازوکار — وزن، سیگموئید، بایاس', slides: [
  // اسلاید ۱۹ - وزن: صرفاً یک عدد
  { title: 'وزن: صرفاً یک عدد', blocks: [
    { split: { ratio: [40, 60], left: [
      { visual: 'f_weight', frag: 2 },
    ], right: [
      { bullets: [
        'هر اتصالِ میان دو نورون، یک عدد دارد: «وزن» (Weight)',
        'وزن = میزان حساسیت نورونِ مقصد به نورونِ مبدأ؛ عددی مثبت یا منفی',
        'همین «اعداد روی اتصالات»، تمامِ «دانش»ی هستند که تا این‌جا از شبکه دیده‌ایم',
      ], size: 17, gap: 12, frag: 1 },
    ] } },
  ], notes: 'وزن صرفاً یک عدد است: میزان حساسیت نورونِ مقصد به نورونِ مبدأ، مثبت یا منفی. همین اعداد روی اتصالات، تمام «دانش»ی‌اند که دیده‌ایم.' },
  // اسلاید ۲۰ - نقشهٔ وزن‌ها
  { title: 'نقشهٔ وزن‌ها: حساسیت‌نگاشت', blocks: [
    { split: { ratio: [42, 58], left: [
      { visual: 'f_weightmap', frag: 2 },
    ], right: [
      { bullets: [
        'وزن‌ها در نمایش ویدیو به‌شکل شبکه‌ای هم‌اندازه‌ی تصویر سازمان می‌یابند',
        'سبز برای وزن مثبت، قرمز برای منفی؛ روشنایی هر خانه نماینده‌ی مقدار وزن است',
        'این نقشهٔ رنگی، همان «حساسیت‌نگاشت» نورون است: نشانی از اینکه نورون به چه الگویی گوش می‌دهد',
      ], size: 16, gap: 11, frag: 1 },
    ] } },
  ], notes: 'نورون با وزن‌هایش تعریف می‌شود؛ نقشهٔ رنگی وزن‌ها همان «حساسیت‌نگاشت» اوست: نشانی از اینکه به چه الگویی گوش می‌دهد.' },
  // اسلاید ۲۱ - صفرکردنِ بیشترِ وزن‌ها
  { title: 'صفرکردنِ بیشترِ وزن‌ها', blocks: [
    { split: { ratio: [42, 58], left: [
      { visual: 'f_zero', frag: 2 },
    ], right: [
      { bullets: [
        'اگر وزن تقریباً همهٔ پیکسل‌ها صفر باشد و فقط چند وزن مثبت در ناحیه‌ی دلخواه داشته باشیم، مجموع وزنی عملاً «جمع‌کردن مقادیر پیکسل‌های همان ناحیه» است',
        'نورون در این حالت به روشنایی کل آن ناحیه حساس می‌شود — نه به بقیهٔ تصویر',
      ], size: 16, gap: 11, frag: 1 },
    ] } },
  ], notes: 'بیشتر وزن‌ها صفر + چند وزن مثبت در یک ناحیه = نورون به روشناییِ کل همان ناحیه حساس می‌شود.' },
  // اسلاید ۲۲ - وزن‌های منفی اطراف (فریم + دموی لبه)
  { title: 'وزن‌های منفی اطراف: یابِ «لبه»', blocks: [
    { split: { ratio: [52, 48], left: [
      { visual: 'f_edge', frag: 1 },
      { visual: 'edgeDemo', frag: 2 },
    ], right: [
      { bullets: [
        'برای تشخیص لبه، وزن‌های منفی در اطراف ناحیه می‌گذاریم',
        'آن‌گاه جمع بیشترین مقدار را دارد وقتی پیکسل‌های میانی پرنور و پیکسل‌های اطراف تیره‌تر باشند',
        'یعنی دقیقاً وقتی لبه‌ای در کار باشد',
      ], size: 17, gap: 12, frag: 1 },
    ] } },
  ], notes: 'چرا وزن منفی؟ فقط مثبت = حساس به روشناییِ کل ناحیه؛ مثبت وسط + منفی اطراف = تضاد، یعنی تشخیص لبه.' },
  // اسلاید ۲۳ - آناتومیِ یک نورون: مثالِ کارشده
  { title: 'آناتومیِ یک نورون: مثالِ کارشده', sub: 'با سه پیکسل، کل کار را دستی حساب می‌کنیم', blocks: [
    { split: { ratio: [50, 50], left: [
      { visual: 'neuronFlow', frag: 3 },
      { muted: 'نکتهٔ مطالعه: اعداد این مثال را خودتان با ماشین‌حساب چک کنید؛ همه عمداً کوچک‌اند تا دستی قابل‌پیگیری باشند. اگر به‌جای بایاس −۲، عدد بزرگ‌تری مثل −۱۰ می‌گذاشتید، مجموع ۳٫۹ کافی نبود و نورون خاموش می‌ماند.', frag: 4 },
    ], right: [
      { text: 'فرض کنید یک نورون در لایهٔ دوم قرار است تشخیص دهد آیا در ناحیه‌ای کوچک «لبه» هست یا نه: مرکز ناحیه پرنور باشد و اطرافش تیره.', frag: 1 },
      { text: 'ابزار کار سه چیز است: وزن‌ها برای هر پیکسل، جمع‌کردنِ مجموع وزنی، و بایاس.', frag: 2 },
      { table: { size: 13, colW: [26, 30, 18, 26], head: ['پیکسل', 'مقدار (فعال‌سازی)', 'وزن', 'سهم در مجموع'], rows: [
        ['مرکز', '۰٫۹', '+۵', '۰٫۹ × ۵ = ۴٫۵'],
        ['چپ (حلقه)', '۰٫۲', '−۲', '۰٫۲ × (−۲) = −۰٫۴'],
        ['راست (حلقه)', '۰٫۱', '−۲', '۰٫۱ × (−۲) = −۰٫۲'],
      ] }, frag: 3 },
      { bullets: [
        'مجموع وزنی: ۴٫۵ − ۰٫۴ − ۰٫۲ = ۳٫۹',
        'بایاس −۲ را اضافه می‌کنیم: ۳٫۹ + (−۲) = ۱٫۹',
        'سیگموئید(۱٫۹) ≈ ۰٫۸۷',
      ], size: 15, gap: 7, frag: 3 },
    ] } },
  ], notes: 'مرحله‌ها: مسئله (اینجا لبه هست؟)، تحلیل (وزن + مجموع وزنی + بایاس)، حل با ۳ پیکسل، بررسی با حالت وارونه (−۴٫۴ ← صفر ← خیر)، و تعمیم: نورون واقعی به ۷۸۴ پیکسل وصل است، نه ۳ تا — منطق یکی است.' },
  // اسلاید ۲۴ - سیگموئید (نوار فریم + نمودار)
  { title: 'سیگموئید: چرا بین ۰ و ۱؟', blocks: [
    { split: { ratio: [50, 50], left: [
      { visual: 's_sigmoid', frag: 2 },
      { visual: 'sigmoid', frag: 3 },
    ], right: [
      { text: 'مجموع وزنی ممکن است هر عددی باشد؛ ولی فعال‌سازی‌ها باید بین صفر و یک بمانند. راه‌حل رایج: مجموع وزنی را از «تابع سیگموئید» (Sigmoid function) که «منحنی لوجستیک» (Logistic curve) هم نام دارد عبور می‌دهیم:', frag: 1 },
      { bullets: [
        'ورودی‌های بسیار منفی ≈ صفر تمام می‌شوند',
        'ورودی‌های بسیار مثبت ≈ یک',
        'در اطراف صفر، یکنواخت افزایش می‌یابد',
      ], size: 17, gap: 9, frag: 1 },
      { text: 'پس فعال‌سازی نورون «اندازه‌ای از چقدر مثبت بودنِ مجموع وزنی» است. این تابع همان چیزی است که نورون را از «یک عدد دلخواه» به «درجه‌ی اطمینان» تبدیل می‌کند.', frag: 3 },
    ] } },
  ], notes: 'دو نقطهٔ روی منحنی همان مثالِ کارشدهٔ اسلاید قبل است: ۱٫۹ نزدیک یک (بله)، −۴٫۴ نزدیک صفر (خیر).' },
  // اسلاید ۲۵ - بایاس: آستانهٔ بیدارشدن
  { title: 'بایاس: آستانهٔ بیدارشدن', blocks: [
    { split: { ratio: [56, 44], left: [
      { bullets: [
        'وزن‌ها می‌گویند نورون روی چه الگویی حساس است',
        'بایاس می‌گوید مجموع وزنی باید چقدر بالا باشد تا نورون شروع به فعال‌شدنِ معنادار کند',
      ], size: 17, gap: 11, frag: 2 },
      { text: 'یادتان باشد این فقط یک نورون بود؛ هر نورون دیگر این لایه هم به ۷۸۴ نورون ورودی وصل است و هر اتصال وزن خودش را دارد.', frag: 3 },
    ], right: [
      { text: 'شاید نخواهید نورون به‌محض مثبت‌شدن مجموع وزنی روشن شود؛ شاید فقط وقتی جمع از عددی معین (مثلاً ۱۰) بزرگ‌تر است فعال باشد. راه‌حل ساده است: عددی دیگر، مثل منفی ۱۰، پیش از سیگموئید به مجموع وزنی اضافه می‌کنیم؛ آن عدد «بایاس» (Bias) است.', frag: 1 },
      { lead: 'دو نیمه‌ی یک نورون:', frag: 1 },
    ] } },
    { visual: 's_bias', frag: 4 },
  ], notes: 'وزن‌ها حساسیت‌اند؛ بایاس آستانه است. بایاس را دستکاری کنید تا آستانهٔ بیدارشدن نورون جابه‌جا شود — همان عدد −۲ در مثالِ کارشده.' },
  // اسلاید ۲۶ - شمارش دانش: ۱۳٬۰۰۰ عدد (نوار فریم + پیچ‌وهوکه)
  { title: 'شمارش دانش: ۱۳٬۰۰۰ عدد', blocks: [
    { split: { ratio: [46, 54], left: [
      { visual: 's_knobs', frag: 2 },
      { visual: 'knobs13k', frag: 3 },
    ], right: [
      { text: 'حالا بشمارید:', frag: 1 },
      { bullets: [
        'فقط اتصالات لایه‌ی اول به دوم: ۷۸۴ × ۱۶ وزن، به‌علاوه‌ی ۱۶ بایاس',
        'اتصالات لایه‌های دیگر هم هرکدام مجموعه‌ی وزن و بایاس خودشان را دارند',
        'جمع همه‌ها: این شبکه تقریباً دقیقاً ۱۳٬۰۰۰ وزن و بایاس در کل دارد',
      ], size: 15, gap: 8, frag: 1 },
      { text: '۱۳٬۰۰۰ «پیچ‌وهوکه» که می‌توان دستکاری و چرخاند تا شبکه رفتارهای مختلفی کند. و اینجا است که «یادگیری» (Learning) معنا پیدا می‌کند: وقتی می‌گوییم شبکه «یاد گرفته»، منظورمان این است که کامپیوتر را ترغیب کرده‌ایم برای همه‌ی این اعدادِ بسیار زیاد، تنظیمی معتبر بیابد تا واقعاً مسئله را حل کند.', frag: 3 },
    ] } },
  ], notes: 'بشمارید: ۷۸۴×۱۶+۱۶ = ۱۲٬۵۶۰ فقط برای لایهٔ اول؛ جمع بقیه تقریباً ۱۳٬۰۰۰. کل «حافظه» و «مهارت» شبکه همین عددهاست.' },
  // اسلاید ۲۷ - دانش شبکه کجاست؟
  { title: 'دانش شبکه کجاست؟', blocks: [
    { split: { ratio: [50, 50], left: [
      { visual: 'whereKnowledge', frag: 2 },
    ], right: [
      { text: 'حالا به پرسش محوری مطالعه برسیم. پاسخ کوتاه است و باید کوتاه بماند:', frag: 1 },
      { bullets: [
        'جای دانش، هیچ‌کجای بیرون از همان ۱۳٬۰۰۰ عدد نیست. لایه‌ها چیزی را ذخیره نمی‌کنند؛ آن‌ها اجرا می‌کنند',
        'وزن‌ها همان «پیچ‌وهوکه‌هایی»‌اند که رفتار شبکه را تعیین می‌کنند',
        'نقشهٔ وزن‌های یک نورون، همان «حساسیت‌نگاشت» آن نورون است: نورون با وزن‌هایش تعریف می‌شود که به چه الگویی گوش می‌دهد',
        'پس اگر «هوش» یا «دانش» در کار باشد، توزیعشده در همین وزن‌هاست، نه در جای دیگر',
      ], size: 15, gap: 8, frag: 1 },
    ] } },
  ], notes: 'پاسخ محوری مطالعه — کوتاه نگه دارید: دانش فقط در ۱۳٬۰۰۰ وزن و بایاس است؛ لایه‌ها اجرا می‌کنند، ذخیره نمی‌کنند.' },
  // اسلاید ۲۸ - یادگیری یعنی پیدا کردن تنظیم درست
  { title: 'یادگیری یعنی پیدا کردن تنظیم درست', blocks: [
    { split: { ratio: [48, 52], left: [
      { text: 'اگر چنین کنید، دقیقاً کاری را کرده‌اید که «یادگیری» نام دارد. فصل بعدی این مجموعه همین است: ماشینی که همین کار را به‌شکل سیستماتیک انجام می‌دهد، بی‌آنکه شما دستی چرخانده باشید. اما فعلاً بدانید که «یادگیری» در این سطح، چیزی جز پیداکردن تنظیم درست همان ۱۳٬۰۰۰ عدد نیست.', frag: 3 },
      { visual: 'learningSetting', frag: 2 },
    ], right: [
      { text: 'یک آزمایش فکری انجام دهید — یک‌وقت سرگرم‌کننده، یک‌وقت کمی ترسناک: تصور کنید می‌نشینید و همهٔ این وزن‌ها و بایاس‌ها را دست‌به‌دست تنظیم می‌کنید و عمداً اعداد را دست می‌کارید تا:', frag: 1 },
      { bullets: [
        'لایه‌ی دوم لبه‌ها را به دست بیاورد',
        'لایه‌ی سوم الگوها را',
        'و به همین ترتیب، لایه‌ی خروجی رقم را',
      ], size: 18, gap: 11, frag: 1 },
    ] } },
  ], notes: 'این آزمایش فکری تعریف عملیاتی «یادگیری» است: دست‌کاری عمدی همان اعداد. فصل بعد همین کار را سیستماتیک می‌کند.' },
  // اسلاید ۲۹ - چرا این نگاه ارزشمند است؟
  { title: 'با این حال، چرا این نگاه ارزشمند است؟', blocks: [
    { text: 'این نگاه، شبکه را از «جعبه‌ی سیاهِ کامل» به چیزی «تا حدی خوانا» ارتقا می‌دهد — با دو دلیل عملی:', frag: 1 },
    { cards: { h: 170, items: [
      { t: 'وقتی شبکه آن‌طور که انتظار دارید عمل نمی‌کند', b: 'اگر تا حدی رابطه‌ای با معنای وزن‌ها و بایاس‌ها برقرار کرده باشید، نقطهٔ شروعی برای آزمایشِ تغییر ساختار خواهید داشت' },
      { t: 'وقتی شبکه کار می‌کند اما به دلایلی غیرمنتظره', b: 'کاوش در وزن‌ها و بایاس‌ها، راه خوبی است برای به‌چالش‌کشیدنِ فرض‌های خودتان و آشکارکردنِ فضای کاملِ راه‌حل‌های ممکن' },
    ] }, frag: 2 },
    { accent: 'نگاه به درون، جعبه را کاملاً شفاف نمی‌کند؛ اما آن را از «کاملاً سیاه» به «تا حدی خوانا» ارتقا می‌دهد.', bold: true, frag: 2 },
    { visual: 'peekBox', frag: 3 },
  ], notes: 'دو دلیل ارزشمندی نگاه به درون: نقطهٔ شروع برای آزمایش تغییر ساختار، و به‌چالش‌کشیدن فرض‌ها وقتی شبکه غیرمنتظره عمل می‌کند.' },
  // اسلاید ۳۰ - جمع‌بندی بخش‌های ۱ و ۲
  { title: 'جمع‌بندی بخش‌های ۱ و ۲', blocks: [
    { bullets: [
      'لایه‌ها اجرایی‌اند، نه حافظه: هر لایه نمایش لایهٔ قبل را می‌گیرد و در سطح بالاتر بازنویسی می‌کند',
      'دانش در وزن‌هاست: ۱۳٬۰۰۰ وزن و بایاس، کل «حافظه» و «مهارت» شبکهٔ ماست',
      'هر لایه یک پلهٔ انتزاع بالاتر است: اما این پلکان «پیکسل ← لبه ← حلقه ← رقم» فعلاً امید و فرضیه است، نه واقعیتِ اثبات‌شده',
    ], size: 19, gap: 16, frag: 1 },
    { visual: 'summary12', frag: 2 },
  ], notes: 'سه خط پایانی بخش‌های ۱ و ۲. نکتهٔ پایانی: پلکان انتزاع فعلاً فرضیه است؛ سرنوشت آن در فصل «یادگیری» روشن می‌شود.' },
] },
// ============================================================
//  بخش ۳ - فرمول، تابع و پرسش باز (ویدئو 13:15 تا 18:15)
// ============================================================
{ n: 3, footer: 'مطالعهٔ بیشتر ۱ • بخش ۳: فرمول، تابع و پرسش باز', slides: [
  // اسلاید ۳۱ - فعال‌سازی‌ها به‌شکل بردار
  { title: 'فعال‌سازی‌ها به‌شکل بردار', blocks: [
    { split: { ratio: [40, 60], left: [
      { visual: 'f_vector', frag: 2 },
    ], right: [
      { bullets: [
        'نوشتن تک‌تک اتصالات، «دست‌وپنجه‌پُر» است',
        'راه فشرده: فعال‌سازی‌های هر لایه را به‌شکل یک ستون سازمان دهید: یک بردار (Vector)',
        'بردار، فقط یک ستون عدد است — ۱۶ عدد برای لایهٔ اول پنهان',
      ], size: 17, gap: 12, frag: 1 },
    ] } },
  ], notes: 'اینجاست که ریاضیِ کتاب‌ها شروع می‌شود: فعال‌سازی‌ها = بردار، وزن‌ها = ماتریس.' },
  // اسلاید ۳۲ - وزن‌ها به‌شکل ماتریس
  { title: 'وزن‌ها به‌شکل ماتریس', blocks: [
    { split: { ratio: [42, 58], left: [
      { visual: 's_matrix', frag: 2 },
    ], right: [
      { bullets: [
        'همهٔ وزن‌ها را یک ماتریس (Matrix) کنید که هر سطر آن، اتصالات بین یک نورونِ لایهٔ بعد و لایهٔ قبل است',
        'گرفتن مجموع وزنیِ فعال‌سازی‌های لایهٔ اول، برابر است با یکی از جملاتِ ضربِ ماتریس‌وبردار',
      ], size: 17, gap: 12, frag: 1 },
    ] } },
  ], notes: 'هر سطرِ ماتریسِ وزن‌ها = اتصالاتِ یک نورونِ لایهٔ بعد؛ یک جملهٔ ضرب ماتریس‌وبردار = مجموع وزنیِ یک نورون.' },
  // اسلاید ۳۳ - کل لایه در یک فرمول (نوار فریم + فرمول)
  { title: 'کل لایه در یک فرمول: a′ = σ(W·a + b)', blocks: [
    { split: { ratio: [48, 52], left: [
      { visual: 's_formula', frag: 2 },
      { visual: 'matrix', frag: 3 },
    ], right: [
      { bullets: [
        'بردار فعال‌سازی‌های لایهٔ قبل: a',
        'ماتریس وزن‌ها: W',
        'بردار بایاس‌ها: b — به حاصل جمع می‌شود',
        'گام پایانی: سیگموئید، روی هر جزءِ بردارِ حاصل‌شده، یک‌به‌یک',
      ], size: 16, gap: 8, frag: 1 },
      { text: 'و این‌جا جملهٔ کلیدی برای علاقه‌مندان به ادامهٔ مسیر: «بخش بسیار زیادی از یادگیری ماشین به داشتن درک خوب از جبر خطی (Linear algebra) تقلیل می‌یابد».', frag: 3 },
    ] } },
  ], notes: 'کل گذارِ لایه‌به‌لایه در یک عبارت: a′ = σ(W·a + b). جملهٔ کلیدی برای علاقه‌مندان: درک خوب جبر خطی، کلید ادامهٔ مسیر است.' },
  // اسلاید ۳۴ - نورون به‌مثابهٔ تابع
  { title: 'نورون به‌مثابهٔ تابع', blocks: [
    { text: 'به یاد دارید که پیش‌تر گفتم نورون‌ها صرفاً چیزهایی هستند که عدد نگه می‌دارند؟ دقیق‌تر است هر نورون را تابعی بدانیم که خروجی‌های نورون‌های لایه‌ی قبل را می‌گیرد و عددی بین صفر و یک بیرون می‌دهد.', frag: 1 },
    { visual: 's_funcneuron', frag: 2 },
  ], notes: 'نورون = تابع. خروجی‌اش به تصویرِ ورودی (همان «سه») بستگی دارد.' },
  // اسلاید ۳۵ - کل شبکه، فقط یک تابع
  { title: 'کل شبکه، فقط یک تابع: ۷۸۴ ← ۱۰', blocks: [
    { text: 'واقعاً، کلِ شبکه فقط یک تابع است: تابعی که ۷۸۴ عدد را ورودی و ۱۰ عدد را خروجی می‌گیرد.', frag: 1 },
    { visual: 's_funcnet', frag: 2 },
  ], notes: 'نگاه کلان: کل شبکه = یک تابع ۷۸۴ ← ۱۰. پیچیده‌به‌نظررسیدن نگران‌کننده نیست.' },
  // اسلاید ۳۶ - تابعی خنده‌دارِ پیچیده
  { title: 'تابعی خنده‌دارِ پیچیده', blocks: [
    { text: 'تابعی «خنده‌دارِ پیچیده» است با ۱۳٬۰۰۰ پارامتر، شامل چندین ضرب ماتریس‌وبردار و سیگموئید؛ اما با این همه، فقط یک تابع است.', frag: 1 },
    { text: 'و این تا حدی آرامش‌بخش است: اگر ساده‌تر هم بود، چه امیدی داشتیم که چالشِ شناسایی رقم را بر عهده بگیرد؟', frag: 1 },
    { visual: 's_funccomplex', frag: 2 },
  ], notes: '۱۳٬۰۰۰ پارامتر، چندین ضرب ماتریسی، سیگموئید — و با این همه، فقط یک تابع.' },
  // اسلاید ۳۷ - پرسش باز: چگونه یاد می‌گیرد؟
  { title: 'پرسش باز: چگونه یاد می‌گیرد؟', blocks: [
    { split: { ratio: [42, 58], left: [
      { visual: 'f_learn', frag: 3 },
    ], right: [
      { text: 'و حالا به بزرگ‌ترین پرسش می‌رسیم — پرسشی که عمدتاً بی‌پاسخ می‌ماند:', frag: 1 },
      { lead: '«چگونه این شبکه صرفاً با نگاه‌کردن به داده‌ها، وزن‌ها و بایاس‌های مناسب را یاد می‌گیرد؟»', frag: 2 },
      { text: 'این پرسش، جایی است که «ساختار» تمام می‌شود و «یادگیری» شروع می‌شود. پاسخ کوتاهِ آن فصل یک نام دارد: بک‌پراپاگیشن (پس‌انتشار خطا) — فعلاً این پرسش را به‌عنوان مرز دانسته‌هایتان نگه دارید.', frag: 2 },
    ] } },
  ], notes: 'قلاب فصل بعد: «یادگیری» موضوع فصل بعد است؛ پاسخ کوتاه یک نام دارد — بک‌پراپاگیشن (پس‌انتشار خطا).' },
  // اسلاید ۳۸ - سیگموئیدِ ۲۰۱۷، ReLUِ امروز (نوار فریم + مقایسه)
  { title: 'سیگموئیدِ ۲۰۱۷، ReLUِ امروز', blocks: [
    { split: { ratio: [55, 45], left: [
      { visual: 's_relu', frag: 2 },
      { visual: 'reluCompare', frag: 3 },
    ], right: [
      { text: 'و یک به‌روزرانی مهم برای پایان این بخش:', frag: 1 },
      { bullets: [
        'انگیزهٔ سیگموئید تشبیه بیولوژیکِ «نورون فعال یا غیرفعال» بود و شبکه‌های اولیه از آن استفاده می‌کردند',
        'اما شبکه‌های مدرن تقریباً دیگر از سیگموئید استفاده نمی‌کنند — «رکتیفاید لینی‌ر یونیت» (ReLU) «به‌مراتب آموزش‌پذیرتر به نظر می‌رسد»',
        'ReLU خیلی ساده است: max(0, A)؛ اگر ورودی از آستانه‌ای عبور کند تابع هویت می‌شود، وگرنه صفر',
        'دلیل تاریخی: سیگموئید به آموزش کمک نمی‌کرد یا آن را بسیار دشوار می‌کرد؛ وقتی ReLU را امتحان کردند، اتفاقاً برای شبکه‌های عمیقِ باورنکردنی بسیار خوب عمل کرد',
      ], size: 15, gap: 8, frag: 1 },
      { text: 'درس این اسلاید دوطرفه است: مکانیزم‌های معرفی‌شده در این مطالعه (وزن، بایاس، فشرده‌سازِ خروجی) پایدارند، اما جزئیاتشان با پیشرفت پژوهش عوض می‌شود.', frag: 3 },
    ] } },
  ], notes: 'به‌روزرسانی مهم: سیگموئیدِ قدیمی ← ReLUِ امروز. مکانیزم‌ها پایدارند، جزئیاتشان با پیشرفت پژوهش عوض می‌شود.' },
  // اسلاید ۳۹ - جمع‌بندی کل مطالعه
  { title: 'جمع‌بندی کل مطالعه', blocks: [
    { text: 'کل مطالعه را می‌توان به چهار خط فشرده کرد:', frag: 1 },
    { bullets: [
      'شبکهٔ ما تابعی است با ۷۸۴ ورودی و ۱۰ خروجی',
      'داخلش لایه‌هایی هستند که با حدود ۱۳٬۰۰۰ وزن و بایاس، تصویر را پله‌پله از پیکسل به مفهوم تبدیل می‌کنند',
      '«دانش» جای دیگری ندارد: همان اعداد است؛ لایه‌ها اجرا می‌کنند',
      'و اینکه «یادگیری» یعنی پیدا کردن آن ۱۳٬۰۰۰ عدد؛ و همین سؤال، موضوع فصل بعد است',
    ], size: 17, gap: 11, frag: 1 },
    { visual: 'summaryAll', frag: 2 },
  ], notes: 'چهار خط، کل مطالعه. خط چهارم قلاب فصل بعد است.' },
  // اسلاید ۴۰ - خودسنجی: پنج سؤال
  { title: 'خودسنجی: پنج سؤال', sub: 'پیش از دیدن پاسخ‌ها، خودتان پاسخ دهید', blocks: [
    { split: { ratio: [55, 45], left: [
      { visual: 'quiz', frag: 2 },
      { muted: 'پاسخ‌ها: (۱) چون فعال‌سازی درصدی از اطمینان است و باید بین صفر و یک بماند؛ سیگموئید هر عددی را به این بازه فشرده می‌کند. (۲) تضاد ایجاد می‌کند: نورون وقتی بالا می‌رود که ناحیهٔ مثبت پرنور و اطراف تیره باشد، یعنی لبه. (۳) آستانهٔ بیدارشدن: مجموع وزنی باید چقدر بالا باشد تا نورون فعال‌شدنِ معنادار آغاز کند. (۴) دانش فقط در ۱۳٬۰۰۰ وزن و بایاس است؛ لایه‌ها چیزی ذخیره نمی‌کنند، آن اعداد را روی ورودی اجرا می‌کنند. (۵) چون تأیید یا ردِ این تصویر، «پرسشی دیگر» است که با آموزش شبکه روشن می‌شود.', frag: 3 },
    ], right: [
      { text: 'پاسخ‌ها در نکته‌ی مطالعه‌ی همین اسلاید است. اگر جایی گیر کردید، همان بخش از سند را دوباره بخوانید؛ این خودسنجی، ارزیابی تکوینیِ پایان مطالعه است.', frag: 1 },
      { bullets: [
        '۱. چرا فعال‌سازی‌ها باید بین ۰ و ۱ بمانند و شبکه چگونه این را تضمین می‌کند؟',
        '۲. وزنِ منفی در نقشهٔ وزن‌های یک نورون چه کار می‌کند؟',
        '۳. بایاس چه چیزی را تعیین می‌کند؟',
        '۴. دانش شبکه دقیقاً کجاست و لایه‌های پنهان چه نقشی دارند؟',
        '۵. چرا تصویر «لبه ← حلقه ← رقم» را نمی‌توان به‌عنوان واقعیتِ تأییدشده پذیرفت؟',
      ], size: 15, gap: 7, frag: 1 },
    ] } },
  ], notes: 'پنج سؤال و پاسخ‌ها. اگر جایی گیر کردید، همان بخش از سند را دوباره بخوانید؛ این خودسنجی ارزیابی تکوینیِ پایان مطالعه است.' },
  // اسلاید ۴۱ - نقشهٔ مطالعهٔ عمیق‌تر
  { title: 'نقشه‌ی مطالعه‌ی عمیق‌تر', sub: 'اگر خواستید این موضوع را بیشتر بکنید', blocks: [
    { split: { ratio: [56, 44], left: [
      { table: { size: 13, colW: [18, 82], head: ['بخش', 'موضوع'], rows: [
        ['۰۱', 'مسئلهٔ تشخیص اعداد دست‌نویس'],
        ['۰۲', 'ساختار لایه‌ای و نورون'],
        ['۰۳', 'منطق و هدف لایه‌های پنهان'],
        ['۰۴', 'وزن‌ها و اتصالات شبکه'],
        ['۰۵', 'تابع سیگموئید، بایاس و پارامترها'],
        ['۰۶', 'فرمول‌بندی ریاضی و ضرب ماتریسی'],
        ['۰۷', 'شبکهٔ عصبی به‌عنوان تابع'],
        ['۰۸', 'نکتهٔ تکمیلی: تابع ReLU'],
      ] }, frag: 2 },
      { visual: 'studyMap', frag: 3 },
    ], right: [
      { text: 'اگر خواستید این موضوع را بیشتر بکنید:', frag: 1 },
      { bullets: [
        'فریم‌های واکشی‌شدهٔ همین ویدیو در study/frames/but_what_is_a_neural_network_chapter_1/، هشت پوشه با بازه‌های واقعی — نام هر فریم، زمان دقیق همان لحظه در ویدیوست',
        'ترنسکریپت فارسی کامل برای مطالعهٔ عمیق، با نشانگرهای زمانی: همان پوشه، پوشهٔ transcripts (نسخهٔ انگلیسی هم در کنارش هست)',
        'خود پوشهٔ فریم‌ها: README.md جدول کامل بخش‌ها و تحلیل روش آموزشی ویدیو را دارد',
        'ویدیوهای بعدی همان سری: فصل بک‌پراپاگیشن (پاسخ اسلاید ۳۷)؛ و برای فهم بصری فرمول اسلاید ۳۳، سری جبر خطی 3Blue1Brown به‌ویژه فصل سوم، که خود ویدیو پیشنهادش می‌کند',
        'بازی با کد: ویدیو قول می‌دهد منابعی برای دانلود و آزمایش روی کامپیوتر خودتان هست؛ TensorFlow Playground نقطهٔ خوبی برای شروع است',
      ], size: 13, gap: 5, frag: 1 },
    ] } },
  ], notes: 'منابع عمیق‌تر: فریم‌ها، ترنسکریپت فارسی، READMEها، ویدیوهای بعد (بک‌پراپاگیشن و جبر خطی)، و TensorFlow Playground برای بازی با کد.' },
  // اسلاید ۴۲ - پایان
  { title: 'پایان', blocks: [
    { split: { ratio: [45, 55], left: [
      { visual: 'f_digitEnd', frag: 3 },
    ], right: [
      { lead: 'یک جمله: شبکهٔ عصبی دیگر جعبهٔ سیاهِ کامل نیست؛ تابعی است با ۱۳٬۰۰۰ پیچ‌وهوکه که شما حالا می‌دانید هرکدام چه می‌گویند. مطالعهٔ بادوامی بود؛ فصل بعد همین پیچ‌ها را می‌چرخاند.', frag: 1 },
      { accent: 'منبع مفهومی کل مطالعه: 3Blue1Brown، «But what is a neural network?» (Neural Networks, Ch.1) — ساختار شبکه، وزن‌ها، سیگموئید، بایاس، ضرب ماتریسی، و پرسش بازِ «یادگیری».', frag: 2 },
    ] } },
  ], notes: 'یک جملهٔ پایانی، یک پل به فصل بعد، و منبع. پایان مطالعهٔ بیشتر ۱.' },
] },
];

// ============================================================
//  CSS اختصاصی ویژوال‌ها (پایهٔ کروم/اسلاید از lib/deck.mjs می‌آید؛
//  فقط CSS ویژوال‌های همین دک این‌جاست — الگو: workshops/generate-slides.mjs)
// ============================================================
const EXTRA_CSS = `/* رویهٔ تیتر: قاب «سه»ی ۲۸×۲۸ (فریم 00_00_15) — مکانیزم مخصوص همین دک؛ رندرر lib تغییر نکرده */
.cover{overflow:hidden}
.cover::after{content:'';position:absolute;left:96px;top:158px;width:326px;height:326px;border-radius:16px;border:3px solid var(--gold);box-shadow:0 22px 50px rgba(0,0,0,.5);background:#fff url(${FR_0015}) center/cover no-repeat;transform:rotate(-2.5deg)}
.cover::before{content:'«سه»ی دست‌نویسِ ۲۸×۲۸ — نقطهٔ شروع، نقطهٔ پایان';position:absolute;left:96px;top:510px;width:326px;text-align:center;font-size:15px;color:#8FA3BF;transform:rotate(-2.5deg)}
.cover .cover-body{padding-left:500px}
.cover .cover-sub{max-width:620px}
/* فریم‌های ویدیو: پرکردنِ کل ستون به‌جای ۲۷۰px ثابتِ lib (خوانایی فریم‌ها) */
.imgcard.landscape img{width:100%;height:auto}
.imgcard .viz-caption{margin-top:8px;font-size:13px}
/* نوار فریم‌ها: ۲ تا ۳ فریمِ کنار هم (تمام‌عرض) */
.fstrip{display:flex;gap:14px;justify-content:center;align-items:flex-start;width:100%;margin-top:2px}
.fstrip .imgcard{flex:1 1 0;min-width:0;margin:0}
.fstrip .imgcard img{width:100%;height:auto}
.fstrip .viz-caption{font-size:12px;margin-top:6px;text-align:center;line-height:1.6}
.fstrip.sm{max-width:780px;margin-left:auto;margin-right:auto}
/* معماری شبکه ۷۸۴←۱۶←۱۶←۱۰ */
.netf{display:flex;align-items:center;justify-content:center;gap:14px;width:100%;margin-top:4px}
.nf-col{display:flex;flex-direction:column;align-items:center;gap:6px}
.nf-stack{display:flex;flex-wrap:wrap;justify-content:center;gap:5px;width:74px;max-height:150px}
.nf-dot{width:11px;height:11px;border-radius:50%;background:var(--soft);border:1.5px solid #B9C4D2}
.nf-dot.nf-big{width:13px;height:13px;background:#E3F2F2;border-color:var(--acc)}
.nf-dot.nf-out{background:#FBF3D5;border-color:var(--gold)}
.nf-more{color:var(--mut);font-style:normal;font-size:15px;line-height:1;align-self:center}
.nf-lab{font-size:21px;font-weight:800;color:var(--navy)}
.nf-sub{font-size:12.5px;color:var(--mut);text-align:center;max-width:110px;line-height:1.6}
.nf-arrow{color:var(--acc);font-size:24px;font-weight:800}
/* مثال کارشدهٔ نورون */
.nflow{display:flex;flex-direction:column;gap:10px;width:100%;margin-top:4px}
.nf-row{display:flex;align-items:center;gap:10px;flex-wrap:wrap;background:var(--light);border:1px solid var(--soft);border-radius:12px;padding:10px 14px}
.nf-title{font-size:14.5px;font-weight:800;color:var(--navy);flex:0 0 100%;padding-bottom:2px}
.nf-pxs{display:flex;align-items:center;gap:6px}
.nf-px{display:inline-flex;flex-direction:column;align-items:center;background:${WHT};border:1.5px solid var(--acc);border-radius:8px;padding:3px 9px;line-height:1.35}
.nf-px.neg{border-color:#C25B5B}
.nf-px b{font-size:15px;color:var(--navy)}
.nf-px i{font-size:11.5px;font-style:normal;color:var(--mut)}
.nf-op{color:var(--mut);font-weight:700}
.nf-math{font-size:15px;color:var(--ink);font-weight:700}
.nf-chip{padding:4px 12px;border-radius:999px;font-size:14px;font-weight:700;background:${WHT};border:1.5px solid var(--soft);color:var(--ink);white-space:nowrap}
.nf-chip.bias{border-color:var(--gold);color:#8a6d0f;background:#FBF3D5}
.nf-chip.sig{border-color:var(--acc);color:var(--acc);background:#E3F2F2}
.nf-arrow-sm{color:var(--mut);font-weight:800}
.nf-verdict{padding:4px 16px;border-radius:999px;font-size:15px;font-weight:800;white-space:nowrap}
.nf-verdict.win{background:#E3F2F2;border:2px solid var(--acc);color:var(--acc)}
.nf-verdict.no{background:var(--light);border:2px solid var(--soft);color:var(--mut)}
/* منحنی سیگموئید */
.sigz{display:flex;flex-direction:column;align-items:center;margin-top:2px}
.sig-svg{width:100%;max-width:480px;height:auto}
.sig-svg text{font-family:inherit}
.sig-axis{stroke:var(--mut);stroke-width:2}
.sig-lab{font-size:14px;fill:var(--mut);text-anchor:middle}
.sig-unit{font-size:13px;fill:var(--mut)}
.sig-curve{fill:none;stroke:var(--acc);stroke-width:3.5;stroke-linecap:round;stroke-dasharray:600;stroke-dashoffset:0}
.sig-guide{stroke:var(--gold);stroke-width:2;stroke-dasharray:5 5}
.sig-dot{fill:${WHT};stroke:var(--acc);stroke-width:3}
.sig-dot.bad{stroke:#C25B5B}
.sig-mark{font-size:14.5px;font-weight:700;fill:var(--acc)}
.sig-mark.bad{fill:#C25B5B}
.revealed .sig-curve{animation:sigDraw 1.2s ease both}
.revealed .sig-pt-a{animation:fadeIn .5s ease both;animation-delay:.9s}
.revealed .sig-pt-b{animation:fadeIn .5s ease both;animation-delay:1.3s}
@keyframes sigDraw{from{stroke-dashoffset:600}to{stroke-dashoffset:0}}
/* دموی تشخیص لبه (دو ناحیه) */
.edz{display:flex;gap:18px;justify-content:center;margin-top:6px;flex-wrap:wrap}
.ed-case{display:flex;flex-direction:column;align-items:center;gap:7px;background:var(--light);border:1px solid var(--soft);border-radius:12px;padding:16px 16px 10px}
.ed-name{font-size:14px;font-weight:800;color:var(--navy)}
.ed-cells{display:flex;gap:6px}
.ed-cell{position:relative;width:44px;height:44px;border-radius:8px;background:#0d1b2a;border:1.5px solid var(--soft);overflow:hidden;display:flex;align-items:center;justify-content:center}
.ed-cell b{position:absolute;inset:0;background:radial-gradient(circle, #f5f0e0, #333)}
.ed-w{position:absolute;top:-9px;left:50%;transform:translateX(-50%);z-index:2;font-size:11px;font-style:normal;font-weight:800;color:var(--acc);background:${WHT};border:1px solid var(--soft);border-radius:999px;padding:0 6px}
.ed-w.neg{color:#C25B5B}
.ed-note{font-size:12.5px;color:var(--mut)}
.ed-note.ed-good{color:var(--acc);font-weight:700}
.ed-note.ed-bad{color:#C25B5B;font-weight:700}
/* زنجیرهٔ شناسایی با برچسب امید */
.chz{display:flex;flex-direction:column;align-items:center;gap:10px;margin-top:4px}
.ch-hope{padding:6px 22px;border-radius:999px;background:#FBF3D5;border:2px solid var(--gold);color:#8a6d0f;font-size:15px;font-weight:800}
.ch-row{display:flex;align-items:center;justify-content:center;gap:12px;flex-wrap:wrap}
.ch-arrow{color:var(--acc);font-size:22px;font-weight:800}
.ch-step{display:inline-flex;flex-direction:column;align-items:center;gap:4px;background:var(--light);border:1.5px solid var(--soft);border-radius:12px;padding:12px 20px;font-size:18px;font-weight:700;color:var(--navy)}
.ch-step.hl{border:2px solid var(--gold);background:${WHT}}
.ch-sub{font-size:12.5px;font-weight:400;color:var(--mut)}
/* شبکهٔ ۱۳٬۰۰۰ پیچ‌وهوکه */
.kbz{display:flex;flex-direction:column;align-items:center;gap:12px;margin-top:4px}
.kb-grid{display:grid;grid-template-columns:repeat(10,22px);gap:7px;justify-content:center}
.kb-knob{width:22px;height:22px;border-radius:50%;background:var(--light);border:2px solid var(--soft);position:relative;transform:rotate(var(--a,0deg))}
.kb-knob i{position:absolute;top:2.5px;right:50%;width:2px;height:8px;background:var(--acc);border-radius:2px;transform:translateX(50%);transform-origin:50% 8px}
.kb-parts{display:flex;align-items:center;gap:10px}
.kb-part{padding:5px 14px;border-radius:8px;background:var(--light);border:1px solid var(--soft);font-size:15px;font-weight:700;color:var(--navy)}
.kb-op{color:var(--mut);font-weight:800}
.kb-badge{padding:8px 24px;border-radius:999px;background:#E3F2F2;border:2px solid var(--acc);color:var(--acc);font-size:17px;font-weight:800}
.revealed .kb-knob{animation:kbSet 1.8s cubic-bezier(.35,.75,.4,1) both;animation-delay:calc(var(--i)*.03s)}
@keyframes kbSet{
  0%{transform:rotate(calc(var(--a) - 30deg))}
  40%{transform:rotate(calc(var(--a) + 22deg))}
  70%{transform:rotate(calc(var(--a) - 10deg))}
  100%{transform:rotate(var(--a))}}
/* پلکان انتزاع در گفتار */
.spch{display:flex;align-items:center;justify-content:center;gap:12px;flex-wrap:wrap;margin:16px 0}
.sp-arrow{color:var(--acc);font-size:22px;font-weight:800}
.sp-step{display:inline-flex;flex-direction:column;align-items:center;gap:3px;background:var(--light);border:1.5px solid var(--soft);border-radius:12px;padding:10px 16px;font-size:16.5px;font-weight:700;color:var(--navy)}
.sp-step.hl{border:2px solid var(--gold);background:${WHT}}
.sp-sub{font-size:12px;font-weight:400;color:var(--mut)}
/* دانش توزیع‌شده */
.dsz{display:flex;flex-direction:column;align-items:center;margin-top:2px}
.ds-svg{width:100%;max-width:400px;height:auto}
.ds-beam{stroke:var(--acc);stroke-width:3;stroke-linecap:round}
.ds-n circle{fill:${WHT};stroke:var(--navy);stroke-width:2.5}
.ds-n text{font-family:inherit;font-size:13px;font-weight:700;fill:var(--navy)}
.ds-core{fill:#E3F2F2;stroke:var(--acc);stroke-width:3}
.ds-core-t{font-family:inherit;font-size:16px;font-weight:800;fill:var(--acc)}
.revealed .ds-n{animation:riseIn .45s ease both;animation-delay:calc(var(--i)*.09s)}
/* ضرب ماتریس‌وبردار */
.mxz{display:flex;flex-direction:column;align-items:center;margin-top:2px}
.mx-svg{width:100%;max-width:600px;height:auto}
.mx-svg text{font-family:inherit}
.mx-brk{fill:none;stroke:var(--navy);stroke-width:3}
.mx-t{font-size:15px;font-weight:700;fill:var(--navy)}
.mx-t.small{font-size:12px;font-weight:400;fill:var(--mut)}
.mx-op{font-size:22px;font-weight:800;fill:var(--mut)}
.mx-op.big{font-size:26px}
.mx-sig{font-size:30px;font-weight:800;fill:var(--acc)}
/* مقایسهٔ سیگموئید و ReLU (انعطاف‌پذیر در ستون‌های باریک) */
.rlz{display:flex;gap:16px;justify-content:center;margin-top:4px;width:100%}
.rl-card{flex:1 1 0;min-width:0;display:flex;flex-direction:column;align-items:center;gap:6px;background:var(--light);border:1.5px solid var(--soft);border-radius:12px;padding:10px 12px}
.rl-card.hl{border:2px solid var(--gold);background:${WHT}}
.rl-name{font-size:16px;font-weight:800;color:var(--navy)}
.rl-svg{width:100%;max-width:230px;height:auto}
.rl-axis{stroke:var(--mut);stroke-width:2}
.rl-curve{fill:none;stroke-width:3.5;stroke-linecap:round}
.rl-curve.sig{stroke:var(--acc)}
.rl-curve.relu{stroke:var(--gold)}
.rl-note{font-size:12.5px;color:var(--mut);text-align:center;line-height:1.7}
/* شماتیک معماری با برچسب «لایهٔ پنهان» (اسلاید ۹) */
.axz{display:flex;flex-direction:column;align-items:center;margin-top:4px}
.ax-mid{display:flex;flex-direction:column;align-items:center;gap:4px}
.ax-pair{align-items:center}
.ax-brk{display:block;width:100%;min-width:210px;height:12px;border:2.5px solid var(--gold);border-top:none;border-radius:0 0 12px 12px}
.ax-lab{font-size:15px;font-weight:800;color:#8a6d0f;background:#FBF3D5;border:1.5px solid var(--gold);border-radius:999px;padding:3px 16px}
/* شبکهٔ ۲۸×۲۸ ورودی (اسلاید ۷) */
.in78{display:flex;flex-direction:column;align-items:center;margin-top:2px}
.in78 svg{width:100%;max-width:318px;height:auto}
/* سفر لایه‌به‌لایه با شبکهٔ ۲۸×۲۸ و اتصالات (اسلاید ۱۰) */
.nf3z{display:flex;flex-direction:column;align-items:center;margin-top:2px}
.nf3-svg{width:100%;max-width:640px;height:auto}
.nf3-svg text{font-family:inherit}
.nf3-num{font-size:20px;font-weight:800;fill:var(--navy);text-anchor:middle}
.nf3-sub{font-size:11.5px;fill:var(--mut);text-anchor:middle}
.nf3-digit{font-size:14px;font-weight:800;fill:var(--navy)}
.nf3-arr{font-size:22px;font-weight:800;fill:var(--acc);text-anchor:middle}
/* لایهٔ خروجی: ۱۰ نورون با نوار اطمینان (اسلاید ۸) */
.oz10{display:flex;flex-direction:column;align-items:center;margin-top:2px}
.oz10 svg{width:100%;max-width:360px;height:auto}
.oz10 text{font-family:inherit}
.oz-d{font-size:16px;font-weight:800;fill:var(--navy)}
.oz-hot{font-size:12px;font-weight:800;fill:#8a6d0f}
/* نقشهٔ راه سه‌بخشی (اسلاید ۲) */
.rmz{display:flex;flex-direction:column;align-items:center;margin-top:8px;width:100%}
.rm-row{display:flex;align-items:center;justify-content:center;gap:14px;flex-wrap:wrap;width:100%}
.rm-arrow{color:var(--acc);font-size:24px;font-weight:800}
.rm-step{display:inline-flex;align-items:center;gap:10px;background:var(--light);border:1.5px solid var(--soft);border-radius:14px;padding:16px 24px;font-size:19px;font-weight:700;color:var(--navy)}
.rm-n{display:inline-flex;align-items:center;justify-content:center;width:30px;height:30px;border-radius:50%;background:var(--acc);color:${WHT};font-size:16px;font-weight:800}
.revealed .rm-step{animation:chIn .45s ease both;animation-delay:calc(var(--d)*.2s)}
.revealed .rm-arrow{animation:fadeIn .3s ease both;animation-delay:calc(var(--d)*.2s - .1s)}
/* پرسش محوری — لایهٔ میانی در دایرهٔ نقطه‌چین (اسلاید ۱۱) */
.cqz{display:flex;flex-direction:column;align-items:center;margin-top:4px}
.cq-ring{display:flex;flex-wrap:wrap;justify-content:center;gap:5px;width:74px;padding:18px 24px;border:3px dashed var(--gold);border-radius:50%;position:relative;background:var(--light)}
.cq-q{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;font-size:42px;font-weight:800;font-style:normal;color:var(--gold);background:rgba(255,255,255,.74);border-radius:50%}
.cq-title{margin-top:12px;padding:6px 22px;border-radius:999px;background:#E3F2F2;border:2px solid var(--acc);color:var(--acc);font-size:17px;font-weight:800}
/* تجزیهٔ حلقه به لبه‌های کوچک (اسلاید ۱۶) */
.ddz{display:flex;flex-direction:column;align-items:center;margin-top:4px}
.dd-svg{width:100%;max-width:540px;height:auto}
.dd-svg text{font-family:inherit}
.dd3-box{fill:var(--light);stroke:var(--soft);stroke-width:1.5}
.dd3-t{font-size:13px;font-weight:700;fill:var(--navy)}
.dd3-cap{font-size:12.5px;fill:var(--mut)}
.dd3-arr{font-size:24px;font-weight:800;fill:var(--acc)}
.revealed .dd3-e{animation:fadeIn .4s ease both;animation-delay:calc(var(--i)*.12s)}
/* پلکان صادق — سطح بالا خط‌چین (اسلاید ۱۷) */
.ldz{display:flex;flex-direction:column;align-items:center;margin-top:4px;width:100%}
.ld-row{display:flex;align-items:flex-end;justify-content:center;gap:12px;width:100%;margin-top:6px}
.ld-arrow{color:var(--acc);font-size:22px;font-weight:800;padding-bottom:26px}
.ld-step{display:flex;flex-direction:column;align-items:center;justify-content:flex-end;height:var(--h);min-width:128px;padding:12px 22px;background:var(--light);border:1.5px solid var(--soft);border-radius:12px;font-size:18px;font-weight:700;color:var(--navy)}
.ld-step.hope{border:2.5px dashed var(--gold);background:${WHT}}
.ld-chip{margin-top:8px;padding:3px 12px;border-radius:999px;background:#FBF3D5;color:#8a6d0f;font-size:13px;font-weight:800;border:1.5px solid var(--gold)}
.revealed .ld-step{animation:riseIn .45s ease both;animation-delay:calc(var(--d)*.2s)}
/* دانش کجاست — اتصالات تند، لایه‌های شفاف (اسلاید ۲۷) */
.wkz{display:flex;flex-direction:column;align-items:center;margin-top:4px}
.wk-svg{width:100%;max-width:620px;height:auto}
.wk-svg text{font-family:inherit}
.wk-num{font-size:7.5px;fill:#98A4B3}
.wk-num.hot{fill:#C9A227;font-weight:700}
.wk-sel{fill:none;stroke:var(--navy);stroke-width:1.5;stroke-dasharray:4 3}
.wk-link{stroke:var(--navy);stroke-width:1.5;stroke-dasharray:4 3;opacity:.5}
.wk-bigbox{fill:var(--light);stroke:var(--soft);stroke-width:2}
.wk-bigtext{font-size:30px;font-weight:800;fill:var(--navy)}
.wk-q{font-size:20px;font-weight:800;fill:var(--gold)}
.wk-lab{font-size:13px;fill:var(--mut)}
.wk-lab2{font-size:14px;font-weight:800;fill:var(--navy)}
.wk-mid{font-size:10.5px;fill:var(--mut)}
.wk-tag rect{fill:#E3F2F2;stroke:var(--acc);stroke-width:2}
.wk-tag text{font-size:17px;font-weight:800;fill:var(--acc)}
/* یادگیری — دست روی پیچ‌ها (اسلاید ۲۸) */
.lsz{display:flex;flex-direction:column;align-items:center;margin-top:4px}
.ls-svg{width:100%;max-width:600px;height:auto}
.ls-svg text{font-family:inherit}
.ls-dot{fill:var(--soft);stroke:#B9C4D2;stroke-width:1.5}
.ls-edge{stroke:var(--soft);stroke-width:1}
.ls-palm{fill:#F6D9C0;stroke:#B98A6A;stroke-width:2.5}
.ls-fin{fill:#F6D9C0;stroke:#B98A6A;stroke-width:2.5}
.ls-knob{fill:var(--light);stroke:var(--navy);stroke-width:3}
.ls-knob-i{stroke:var(--acc);stroke-width:4;stroke-linecap:round}
.ls-lab{font-size:14.5px;font-weight:800;fill:var(--navy)}
.revealed .ls-hand{animation:fadeIn .5s ease both}
/* دو کادر: کاملاً سیاه / تا حدی خوانا (اسلاید ۲۹) */
.pbz{display:flex;align-items:center;justify-content:center;gap:22px;margin-top:6px}
.pb-card{display:flex;flex-direction:column;align-items:center}
.pb-box{width:236px;height:136px;border-radius:12px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:10px}
.pb-box.dark{background:#0d1b2a;border:2.5px solid #0d1b2a;box-shadow:0 6px 18px rgba(13,27,42,.35)}
.pb-box.open{background:rgba(13,27,42,.42);border:2.5px dashed var(--gold)}
.pb-in{color:${WHT};font-size:17px;font-weight:800;background:rgba(255,255,255,.16);padding:6px 16px;border-radius:999px}
.pb-knobs{display:flex;gap:8px}
.pb-knobs i{width:14px;height:14px;border-radius:50%;background:var(--gold);border:2px solid ${WHT}}
.pb-arrow{color:var(--mut);font-size:26px;font-weight:800}
.pb-lab{margin-top:10px;padding:5px 20px;border-radius:999px;font-size:15px;font-weight:800}
.pb-lab.dark{background:var(--light);border:1.5px solid var(--soft);color:var(--mut)}
.pb-lab.open{background:#E3F2F2;border:2px solid var(--acc);color:var(--acc)}
/* جمع‌بندی ۱+۲ — معماری با سه برچسب (اسلاید ۳۰) */
.s12z{display:flex;align-items:center;justify-content:center;gap:26px;width:100%;margin-top:6px;flex-wrap:wrap}
.s12-labels{display:flex;flex-direction:column;gap:10px}
.s12-chip{padding:8px 18px;border-radius:12px;font-size:16px;font-weight:800}
.s12-chip.a{background:#E3F2F2;border:2px solid var(--acc);color:var(--acc)}
.s12-chip.b{background:#FBF3D5;border:2px solid var(--gold);color:#8a6d0f}
.s12-chip.c{background:${WHT};border:2px dashed var(--gold);color:#8a6d0f}
/* جمع‌بندی نهایی — «سه» ← شبکه ← چهار برچسب (اسلاید ۳۹) */
.saz{display:flex;align-items:center;justify-content:center;gap:16px;width:100%;margin-top:6px;flex-wrap:wrap}
.sa-digit{display:flex;flex-direction:column;align-items:center}
.sa-digit img{width:104px;height:104px;object-fit:cover;border-radius:8px;border:2px solid var(--soft)}
.sa-digit figcaption{font-size:12.5px;color:var(--mut);margin-top:6px}
.sa-arrow{color:var(--acc);font-size:24px;font-weight:800}
.sa-list{list-style:none;display:flex;flex-direction:column;gap:9px}
.sa-list li{position:relative;padding:8px 34px 8px 14px;background:var(--light);border:1.5px solid var(--soft);border-radius:10px;font-size:15px;font-weight:700;color:var(--navy)}
.sa-list li::before{content:'';position:absolute;right:12px;top:50%;width:9px;height:9px;border-radius:50%;background:var(--acc);transform:translateY(-50%)}
/* netf داخل ردیف‌های فلکسی جمع‌بندی: عرض خودکار تا ردیفِ واحد بماند */
.s12-net,.sa-net{width:auto}
/* جدول‌های فشرده (مثال کارشده و منابع) */
.tbl th{padding:8px 12px}
.tbl td{padding:5px 10px;line-height:1.6}
.tbl{margin:6px 0 12px}
/* خودسنجی — پنج کارت سؤال (اسلاید ۴۰) */
.qz{display:grid;grid-template-columns:repeat(3,1fr);gap:12px;width:100%;margin-top:6px}
.q-card{display:flex;align-items:center;gap:10px;background:var(--light);border:1.5px solid var(--soft);border-radius:12px;padding:11px 14px}
.q-num{flex:0 0 auto;width:32px;height:32px;border-radius:50%;background:var(--navy);color:${WHT};display:flex;align-items:center;justify-content:center;font-size:15px;font-weight:800}
.q-t{font-size:14.5px;font-weight:700;color:var(--navy);line-height:1.6}
.revealed .q-card{animation:riseIn .4s ease both;animation-delay:calc(var(--i)*.08s)}
/* نقشهٔ شاخه‌ای منابع (اسلاید ۴۱) */
.mpz{display:flex;flex-direction:column;align-items:center;margin-top:4px}
.mp-svg{width:100%;max-width:640px;height:auto}
.mp-svg text{font-family:inherit}
.mp-line{stroke:var(--acc);stroke-width:2.5}
.mp-core{fill:#E3F2F2;stroke:var(--acc);stroke-width:3}
.mp-core-t{font-size:18px;font-weight:800;fill:var(--acc)}
.mp-box{fill:var(--light);stroke:var(--soft);stroke-width:1.5}
.mp-t{font-size:15px;font-weight:700;fill:var(--navy)}
.revealed .mp-b{animation:riseIn .4s ease both;animation-delay:calc(var(--i)*.1s)}
/*@g1*/
@keyframes fadeIn{from{opacity:0}to{opacity:1}}
.revealed .anim{animation:riseIn .5s cubic-bezier(.22,.8,.3,1) both;animation-delay:calc(var(--i,0)*var(--st,.12s))}
/* ظاهرشدن پلکانی ردیف‌های مثال کارشده */
.revealed .nf-row{animation:riseIn .5s cubic-bezier(.22,.8,.3,1) both}
.revealed .nf-row:nth-child(3){animation-delay:.15s}
/* کشیده‌شدن فلش‌های زنجیره و پلکان */
@keyframes chIn{from{opacity:0;transform:translateX(18px)}to{opacity:1;transform:none}}
.revealed .ch-step{animation:chIn .45s ease both;animation-delay:calc(var(--d)*.22s)}
.revealed .ch-arrow{animation:fadeIn .3s ease both;animation-delay:calc(var(--d,1)*.22s - .1s)}
.revealed .sp-step{animation:chIn .4s ease both;animation-delay:calc(var(--d)*.18s)}
`;

// ============================================================
//  ساخت دک (رندر و CSS پایه از lib/deck.mjs؛ داده و CSS ویژوال‌ها از همین فایل)
// ============================================================
buildDeck({ outPath: OUT, title: DECK_TITLE, sessions: SESSIONS, visuals: VISUALS, extraCss: EXTRA_CSS });
console.log(`✓ ${fa(42)} اسلاید، ${fa(37)} فریم ویدیوِ نهفته از ویدیوی 3Blue1Brown — هر اسلاید با تصویر`);
