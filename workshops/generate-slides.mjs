// ============================================================
//  سازندهٔ اسلایدهای کارگاه ۱ - «آشنایی با مفاهیم هوش مصنوعی»
//  کارگاه ۵۵ دقیقه‌ای: ۲ جلسهٔ ۲۰ دقیقه‌ای + ۱۵ دقیقه استراحت
//  خروجی: یک فایل HTML خودکفا (slides/workshop-1-slides.html) با ۲۴ اسلاید
//  (جلسهٔ ۱: ۱۳ اسلاید، جلسهٔ ۲: ۱۱ اسلاید)
//  منبع محتوا: workshop-1-ai-concepts.md
//  بدون هیچ وابستگی npm؛ فقط ماژول‌های داخلی Node
//  اجرا:  node workshops/generate-slides.mjs   (از ریشهٔ مخزن)
// ============================================================
import { writeFileSync, mkdirSync, readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const OUT_DIR = process.env.SLIDES_OUT || path.join(HERE, 'slides');
mkdirSync(OUT_DIR, { recursive: true });
const OUT = path.join(OUT_DIR, 'workshop-1-slides.html');

// ---------- فونت Vazirmatn نهفته در فایل (خودکفا، بدون نیاز به اینترنت) ----------
//  فایل‌های woff2 متغیر (وزن ۱۰۰ تا ۹۰۰) از Google Fonts، در workshops/fonts/
const FONTS = path.join(HERE, 'fonts');
const fontFace = (file, range) => `@font-face{font-family:'Vazirmatn';font-style:normal;font-weight:100 900;font-display:swap;src:url(data:font/woff2;base64,${readFileSync(path.join(FONTS, file)).toString('base64')}) format('woff2');unicode-range:${range}}`;
const FONT_CSS = [
  fontFace('vazirmatn-variable-arabic.woff2', 'U+0600-06FF, U+0750-077F, U+0870-0891, U+0897-08E1, U+08E3-08FF, U+200C-200E, U+2010-2011, U+204F, U+2E41, U+FB50-FDFF, U+FE70-FE74, U+FE76-FEFC, U+102E0-102FB, U+10E60-10E7E, U+10EC2-10EC7, U+10EC9-10EEE, U+10EF0-10EFF, U+1EE00-1EE03, U+1EE05-1EE1F, U+1EE21-1EE22, U+1EE24, U+1EE27, U+1EE29-1EE32, U+1EE34-1EE37, U+1EE39, U+1EE3B, U+1EE42, U+1EE47, U+1EE49, U+1EE4B, U+1EE4D-1EE4F, U+1EE51-1EE52, U+1EE54, U+1EE57, U+1EE59, U+1EE5B, U+1EE5D, U+1EE5F, U+1EE61-1EE62, U+1EE64, U+1EE67-1EE6A, U+1EE6C-1EE72, U+1EE74-1EE77, U+1EE79-1EE7C, U+1EE7E-1EE89, U+1EE8B-1EE9B, U+1EEA1-1EEA3, U+1EEA5-1EEA9, U+1EEAB-1EEBB, U+1EEF0-1EEF1'),
  fontFace('vazirmatn-variable-latin-ext.woff2', 'U+0100-02BA, U+02BD-02C5, U+02C7-02CC, U+02CE-02D7, U+02DD-02FF, U+0304, U+0308, U+0329, U+1D00-1DBF, U+1E00-1E9F, U+1EF2-1EFF, U+2020, U+20A0-20AB, U+20AD-20C4, U+2113, U+2C60-2C7F, U+A720-A7FF'),
  fontFace('vazirmatn-variable-latin.woff2', 'U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD'),
].join('\n');

// ---------- خوش‌رنگ یکدست ----------
const NAVY = '#1F3A5F', NAVY2 = '#16324F', INK = '#333333', MUT = '#6B7280',
      ACC = '#0E7C7B', LIGHT = '#F2F4F7', SOFT = '#DDE3EA', WHT = '#FFFFFF', GOLD = '#C9A227';
const DECK_TITLE = 'آشنایی با مفاهیم هوش مصنوعی • کارگاه ۱';

//  ارقام فارسی
const FA = '۰۱۲۳۴۵۶۷۸۹';
const fa = n => String(n).replace(/\d/g, d => FA[d]);

//  امن‌سازی HTML
const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

// ============================================================
//  دادهٔ اسلایدها (پورت کامل از workshop-1-ai-concepts.md)
//  کلید بلوک‌ها: bullets / cards / table / accent / muted /
//  lead / text / visual / split
// ============================================================
const SESSIONS = [
// ============================================================
//  جلسه ۱ - هوش مصنوعی چیست؟ این کارگاه برای کیست؟ (۱۳ اسلاید)
// ============================================================
{ n: 1, footer: 'کارگاه ۱ • جلسهٔ ۱: هوش مصنوعی چیست؟ این کارگاه برای کیست؟', slides: [
  // اسلاید ۱ - تیتر
  { cover: { kicker: 'کارگاه ۱ • جلسهٔ ۱ از ۲', title: 'هوش مصنوعی چیست؟ این کارگاه برای کیست؟', sub: '۲۰ دقیقه' },
    notes: 'خوش‌آمدگویی.\nهدف جلسهٔ ۱: انگیزه + نقشهٔ کل کارگاه.\nاین کارگاه برای همهٔ اعضای موسسه است؛ پیش‌نیاز فنی لازم نیست.' },
  // اسلاید ۲ - یک صبح با دستیار هوشمند
  { title: 'یک صبح با دستیار هوشمند', sub: 'ساعت ۸ صبح', blocks: [
    { bullets: [
      'دستیار هوشمند شما ایمیل‌های دیشب را خوانده (ابزار)',
      'دو طرح جدید را با اهداف سازمان تطبیق داده (دانش)',
      'چون مهلت ثبت‌نام یکی از طرح‌ها فردا تمام می‌شود، هشدار داده (مهارت)',
    ], size: 22, gap: 20 },
    { accent: 'کدام بخش این صبح را یک جست‌وجوی ساده می‌توانست انجام دهد؟ هیچ‌کدام؛ چون هر سه رکن با هم کار می‌کنند.', bold: true },
  ], notes: 'نکتهٔ مدرس: این سناریو را زنده اجرا کنید؛ هر بار که کلمهٔ «ابزار»، «دانش» یا «مهارت» را می‌گویید، از شرکت‌کننده‌ها بخواهید تکرار کنند. هدف این است که سه رکن از همین دقیقهٔ سوم در ذهن بماند.\nسؤال از شرکت‌کنندگان: «کدام بخش این صبح را یک جست‌وجوی ساده می‌توانست انجام دهد؟» پاسخ: هیچ‌کدام؛ چون هر سه رکن با هم کار می‌کنند.' },
  // اسلاید ۳ - چرا با چت کردن ساده کافی نیست؟
  { title: 'چرا با چت کردن ساده کافی نیست؟', blocks: [
    { lead: 'آزمایش سریع: از ChatGPT بپرسید «کارهای مهم امروزم چیست؟ کدام را اول انجام دهم؟» — نمی‌تواند جواب بدهد. چرا؟' },
    { bullets: [
      'دانش ندارد: نمی‌داند اولویت‌های کاری شما چیست',
      'مهارت ندارد: نمی‌داند کدام کار مهم‌تر است',
      'ابزار ندارد: به تقویم و برنامهٔ شما دسترسی ندارد',
    ], size: 22, gap: 18 },
  ], notes: 'نکتهٔ مدرس: اگر یک مدل زبانی به اطلاعات شخصی و ابزارهای شما دسترسی نداشته باشد، نمی‌تواند وظایف اجرایی را انجام دهد.\nبپرسید: «اگر هر سه رکن فراهم شود، چه اتفاقی می‌افتد؟» پاسخ: دستیار هوشمند.' },
  // اسلاید ۴ - سه رکن دستیار هوشمند
  { title: 'سه رکن دستیار هوشمند', blocks: [
    { cards: { h: 300, items: [
      { t: 'دانش (Knowledge)', b: 'زمینهٔ کار؛ اهداف سازمان، فرمت طرح‌ها، طرفین پرونده، مهلت‌ها' },
      { t: 'مهارت (Workflow)', b: 'چه کند با اطلاعات؛ نزدیک شدن مهلت ← هشدار، کمبود مدرک ← یادآوری' },
      { t: 'ابزار (Tools)', b: 'عمل کند؛ خواندن فایل، جست‌وجو در وب، ارتباط از پیام‌رسان' },
    ] } },
    { accent: 'در این دوره هر سه رکن را روی نمونه‌های واقعی خودمان می‌سازیم.', bold: true },
  ], notes: 'جملهٔ کلیدی: در این دوره هر سه رکن را روی نمونه‌های واقعی خودمان می‌سازیم.\nهر کارت را با یک مثال از محیط کار شرکت‌کننده‌ها باز کنید.' },
  // اسلاید ۵ - این کارگاه برای کیست؟ (چهار نقش)
  { title: 'این کارگاه برای کیست؟', sub: 'خودتان را در این جدول پیدا کنید', blocks: [
    { table: { size: 19, colW: [26, 74], head: ['نقش', 'مشکل روزمره'], rows: [
      ['مدیر', 'هر هفته ۲۰ طرح پیشنهادی می‌خواند و خلاصه می‌نویسد'],
      ['پژوهشگر', 'ساعت‌ها مقاله جست‌وجو می‌کند ولی نتیجهٔ مناسب پیدا نمی‌کند'],
      ['برنامه‌نویس', 'هر روز باگ‌های تکراری را دستی رفع می‌کند'],
      ['دستیار قضایی', 'مهلت‌های دادگاه را فراموش می‌کند و جریمه می‌شود'],
    ] } },
    { accent: 'اگر یکی از این‌ها شبیه مشکل شماست، این کارگاه دقیقاً برای شماست.', bold: true },
  ], notes: 'از شرکت‌کننده‌ها بخواهید خودشان را پیدا کنند.\nاگر یکی از این‌ها شبیه مشکل شماست، این کارگاه دقیقاً برای شماست.' },
  // اسلاید ۶ - نقشهٔ سه کارگاه
  { title: 'نقشهٔ سه کارگاه', blocks: [
    { bullets: [
      'کارگاه ۱ (امروز): مفاهیم و انگیزه؛ هوش مصنوعی چطور کار می‌کند',
      'کارگاه ۲: Agent و ابزار؛ مهارت و دست به دستیار اضافه می‌کنیم',
      'کارگاه ۳: عملی؛ با OpenCode دستیار را می‌سازیم',
    ], size: 22, gap: 22 },
    { accent: 'هدف نهایی سه کارگاه: ساختن دستیار هوشمند خودتان.', bold: true },
  ], notes: 'جملهٔ کلیدی: هدف نهایی سه کارگاه: ساختن دستیار هوشمند خودتان.' },
  // اسلاید ۷ - اهداف
  { title: 'در پایان این کارگاه می‌دانید', sub: 'اهداف', blocks: [
    { bullets: [
      'سه رکن دستیار هوشمند و کاربردشان برای شغل خودتان',
      'LLM چطور کار می‌کند: پیش‌بینی کلمهٔ بعدی',
      'پارامتر چیست و چرا مدل‌ها صدها میلیارد تا دارند',
      'توجه (Attention) چطور به مدل اجازه می‌دهد معنی را از زمینه بفهمد',
    ], size: 22, gap: 20 },
  ], notes: 'نکتهٔ مدرس: اهداف را فقط مرور کنید؛ «در پایان کارگاه می‌توانید...» هدف ایجاد نقشهٔ ذهنی است.' },
  // اسلاید ۸ - تایم‌لاین تحول (اسلاید محوری جلسهٔ ۱)
  { title: 'تایم‌لاین تحول هوش مصنوعی', sub: 'چهار مرحله؛ هر مرحله زیرمجموعهٔ مرحلهٔ قبلی است', blocks: [
    { visual: 'timeline' },
  ], notes: 'نکتهٔ مدرس: رابطهٔ تودرتو (AI ⊃ ML ⊃ DL ⊃ GenAI) را همین‌جا با اشاره به تایم‌لاین بگویید: «هر مرحله زیرمجموعهٔ مرحلهٔ قبلی است.» تاریخ‌ها برای حفظ کردن نیست؛ روند را نشان می‌دهد.\nچه چیزی ظاهر شد: قوانین دست‌نویس ← کشف الگو از داده ← شبکه‌های عصبی ← Transformer + آموزش روی کل اینترنت.' },
  // اسلاید ۹ - از قانون‌نویسی تا یادگیری از داده + بازی قیمت خانه
  { title: 'از قانون‌نویسی تا یادگیری از داده', blocks: [
    { bullets: [
      'سیستم‌های خبره: انسان همهٔ قوانین را دست‌نویس می‌کرد؛ هر جا شرایط عوض می‌شد، قانون جدید می‌خواست',
      'یادگیری ماشین: به‌جای قانون، داده می‌دهیم؛ الگو خودش کشف می‌شود',
    ], size: 21, gap: 14 },
    { lead: 'بازی قیمت خانه' },
    { bullets: [
      '۸۰ متری = ۸ میلیارد تومان',
      '۱۰۰ متری = ۱۰ میلیارد تومان',
      '۱۲۰ متری = ۱۲ میلیارد تومان',
    ], size: 20, gap: 8 },
    { accent: 'خانهٔ ۱۱۰ متری چقدر؟', bold: true },
  ], notes: 'بازی قیمت خانه (۲ دقیقه): سؤال: «خانهٔ ۱۱۰ متری چقدر؟» همه فوری می‌گویند ۱۱ میلیارد.\nنکتهٔ کلیدی: «شما همین‌الان یک مدل یادگیری ماشین شدید؛ الگو را از داده کشف کردید، کسی فرمول را به شما نگفته بود.»\nنکتهٔ مدرس: این مثال در جلسهٔ ۲ (مقیاس پارامتر) و در تکلیف پایانی دوباره باز می‌گردد.' },
  // اسلاید ۱۰ - شبکه‌های عصبی
  { title: 'شبکه‌های عصبی', blocks: [
    { bullets: [
      'داده‌های زیادی برای الگوهای پیچیده کافی نبود؛ شبکه‌های عصبی آمدند',
      'نورون: مجموع وزن‌دار ورودی‌ها با یک آستانه؛ مثل داور که هر عامل را با وزن می‌سنجد',
      'لایه‌ها: لایه‌های اول چیزهای ساده (لبه و رنگ) می‌بینند، لایه‌های آخر مفاهیم کامل (چهره)',
      'کاربرد: تشخیص چهره در عکس‌ها',
    ], size: 22, gap: 20 },
  ], notes: 'نکتهٔ مدرس: فقط یک خط بگویید: «شبکهٔ عصبی یعنی ردیف‌هایی از این داورها که هر لایه کار لایهٔ قبلی را کامل‌تر می‌کند.» جزئیات عددی وارد نشوید.' },
  // اسلاید ۱۱ - LLMها + بازی «آسمان امروز ...»
  { title: 'LLMها', blocks: [
    { bullets: [
      'LLM: مدلی که با خواندن متن‌های بسیار زیاد (کتاب، وب، مقاله) الگوی زبان را یاد گرفته',
      'نمونه‌ها: GPT (OpenAI)، Claude (Anthropic)، Gemini (Google)، Llama (Meta)',
      'نحوهٔ کار: به کلمهٔ بعدی احتمال می‌دهد',
    ], size: 20, gap: 10 },
    { lead: 'بازی: «آسمان امروز ...»' },
    { visual: 'prob-bars' },
    { text: 'حالا جمله را عوض کنید: «آسمان امروز ابری است و هوا ...» — ناگهان «سرد» و «بارانی» بالا می‌آیند؛ یعنی زمینه، احتمال‌ها را عوض می‌کند.' },
  ], notes: 'بازی «آسمان امروز ...» (۲ دقیقه): از کلاس بخواهید جمله را تکمیل کنند، سپس احتمالات را نشان دهید (اعداد فرضی): آبی ۶۰٪، ابری ۲۵٪، صاف ۱۵٪.\nحالا جمله را عوض کنید: «آسمان امروز ابری است و هوا ...» ناگهان «سرد» و «بارانی» بالا می‌آیند؛ یعنی زمینه، احتمال‌ها را عوض می‌کند (پلی به توجه در جلسهٔ ۲).' },
  // اسلاید ۱۲ - خودنظارتی
  { title: 'پس چطور یاد گرفته؟ خودنظارتی', blocks: [
    { bullets: [
      'پاسخ‌نامه در دل سؤال است: «گربه روی ___ نشست»؛ پاسخ همان کلمه‌ای است که پاک کرده‌اید',
      'برچسب انسانی لازم نیست؛ هر جملهٔ اینترنت یک تمرین رایگان است',
      'به همین دلیل مدل‌ها کل اینترنت را می‌توانند بخوانند؛ میلیاردها تمرین',
    ], size: 22, gap: 20 },
    { accent: 'خودنظارتی یعنی معلم، خودِ داده است.', bold: true },
  ], notes: 'جملهٔ کلیدی: خودنظارتی یعنی معلم، خودِ داده است.' },
  // اسلاید ۱۳ - خلاصه + سؤال استراحت
  { title: 'خلاصهٔ جلسهٔ ۱', blocks: [
    { bullets: [
      'هوش مصنوعی فقط چت‌بات نیست؛ با سه رکن به دستیار هوشمند تبدیل می‌شود',
      'مسیر: داده ← الگو ← شبکه ← پیش‌بینی کلمهٔ بعد',
      'LLM بدون پاسخ‌نامهٔ انسانی، با کل اینترنت یاد گرفته',
    ], size: 22, gap: 20 },
    { accent: 'سؤال استراحت: یک کار روزمره انتخاب کنید و برای خود بنویسید: چه دانش، چه مهارت و چه ابزاری لازم دارد؟ در جلسهٔ بعد با هم یکی را می‌سازیم.', bold: true },
  ], notes: 'سؤال استراحت (در ۱۵ دقیقه استراحت): یک کار روزمره انتخاب کنید و برای خود بنویسید: چه دانش، چه مهارت و چه ابزاری لازم دارد؟ در جلسهٔ بعد با هم یکی را می‌سازیم.' },
] },
// ============================================================
//  جلسه ۲ - پشت صحنه: هوش مصنوعی چطور کار می‌کند؟ (۱۱ اسلاید)
// ============================================================
{ n: 2, footer: 'کارگاه ۱ • جلسهٔ ۲: پشت صحنه: هوش مصنوعی چطور کار می‌کند؟', slides: [
  // اسلاید ۱۴ - تیتر
  { cover: { kicker: 'کارگاه ۱ • جلسهٔ ۲ از ۲', title: 'پشت صحنه: هوش مصنوعی چطور کار می‌کند؟', sub: '۲۰ دقیقه' },
    notes: 'هدف جلسهٔ ۲: اعتماد به نفس مدیریت هوش مصنوعی، از موضع فعال.\nمحتوای فنی این جلسه محدود به دو چیز است: پارامتر و توجه؛ هرکدام در حداکثر ۲ تا ۳ دقیقه.' },
  // اسلاید ۱۵ - مرور در ۴ کلمه
  { title: 'مرور در ۴ کلمه', sub: 'از جلسهٔ ۱ تا امروز', blocks: [
    { visual: 'review-chips' },
    { muted: 'هر کلمه را با یک خط مرور کنید: داده و الگو، شبکه‌ای که یاد می‌گیرد، پارامترها، توجه.' },
  ], notes: 'مرور در ۴ کلمه: داده و الگو ← شبکه‌ای که یاد می‌گیرد ← پارامترها ← توجه.\nیک خط برای هرکدام.' },
  // اسلاید ۱۶ - پارامتر چیست؟
  { title: 'پارامتر چیست؟', blocks: [
    { bullets: [
      'پارامترها عددهای داخل مدل‌اند که در طول آموزش بارها ریزتنظیم می‌شوند تا جواب‌ها بهتر شود',
      'قیاس: دستگاهی با هزاران ولوم کوچک؛ همگی آن‌قدر چرخانده شده‌اند تا خروجی درست بدهد',
      'مجموعهٔ این عددها، دانش آموخته‌شدهٔ مدل است؛ نه پایگاه داده، نه جست‌وجو',
    ], size: 22, gap: 20 },
    { accent: 'اگر چرخاندن هر ولوم فقط ۱ ثانیه طول بکشد، تنظیم ۱۷۵ میلیارد ولوم حدود ۵٬۵۰۰ سال طول می‌کشد؛ به همین دلیل آموزش با دست ممکن نیست.', bold: true },
  ], notes: 'آزمایش ذهنی (یک جمله): اگر چرخاندن هر ولوم فقط ۱ ثانیه طول بکشد، تنظیم ۱۷۵ میلیارد ولوم حدود ۵٬۵۰۰ سال طول می‌کشد؛ به همین دلیل آموزش با دست ممکن نیست.\nنکتهٔ مدرس: قیاس قورمه‌سبزی را بزنید: ۲ مادهٔ اصلی تنظیمش ساده است؛ ۱۷۵ میلیارد ادویه تنظیم دستی‌اش غیرممکن است.' },
  // اسلاید ۱۷ - جدول مقیاس
  { title: 'مقیاس واقعی', sub: 'از ۲ پارامتر تا ۱۷۵ میلیارد', blocks: [
    { table: { size: 19, colW: [37, 27, 36], head: ['مدل', 'تعداد پارامتر', 'نکته'], rows: [
      ['مدل قیمت خانه (مثال جلسهٔ ۱)', '۲ پارامتر', 'شیب و عدد ثابت؛ همین‌قدر ساده'],
      ['Llama 3 (نسخهٔ کوچک)', 'حدود ۸ میلیارد', 'روی کامپیوتر خانگی هم اجرا می‌شود'],
      ['GPT-3', 'حدود ۱۷۵ میلیارد', 'نیازمند صدها کارت گرافیک'],
    ] } },
    { muted: 'بزرگ‌تر همیشه بهتر نیست؛ کیفیت داده و آموزش درست، به اندازهٔ اندازهٔ مدل مهم است.' },
  ], notes: 'نکته: بزرگ‌تر همیشه بهتر نیست؛ کیفیت داده و آموزش درست، به اندازهٔ اندازهٔ مدل مهم است.\nپل به جلسهٔ ۱: مدل قیمت خانهٔ ما فقط ۲ عدد داشت (شیب ۰٫۱ و عدد ثابت ۰)؛ حالا آن میلیاردها عدد جلسهٔ قبل ملموس می‌شود.' },
  // اسلاید ۱۸ - Transformer در دو کارت
  { title: 'مغز مدل‌های امروزی: Transformer', blocks: [
    { cards: { h: 300, items: [
      { t: 'دیدن هم‌زمان', b: 'به‌جای خواندن کلمه‌به‌کلمه، همهٔ کلمات جمله را با هم می‌بیند (مدل‌های قدیمی کلمه‌به‌کلمه می‌خواندند و ابتدا را گم می‌کردند)' },
      { t: 'قیاس میزگرد', b: 'هر نفر (کلمه) می‌پرسد «برای فهم نقشم در این بحث، به حرف چه کسانی گوش بدهم؟» و به همان‌ها بیشتر گوش می‌دهد' },
    ] } },
  ], notes: 'دو کارت را بخوانید و قیاس میزگرد را زنده اجرا کنید.' },
  // اسلاید ۱۹ - بازی «او»
  { title: 'بازی «او»', blocks: [
    { lead: '«علی به بانک رفت چون او پول لازم داشت.»' },
    { visual: 'attention' },
    { text: '«او» به چه کسی برمی‌گردد؟ علی. چرا؟ چون مدل برای کلمهٔ «او» بیشتر از همه به «علی» توجه می‌کند (امتیاز فرضی: علی ۷۰٪، بقیهٔ کلمات ۳۰٪).' },
  ], notes: 'سؤال: «او» به چه کسی برمی‌گردد؟ علی. چرا؟ چون مدل برای کلمهٔ «او» بیشتر از همه به «علی» توجه می‌کند (امتیاز فرضی: علی ۷۰٪، بقیهٔ کلمات ۳۰٪).\nبازی گروهی (۳ دقیقه): هر گروه ۴ نفره، هر نفر یک کلمه از جمله باشد و بگوید «من به چه کسی بیشتر گوش می‌دهم؟»\n• «چون» به «رفت» و «پول» گوش می‌دهد\n• «او» به «علی» گوش می‌دهد\n• هر کلمه به کلمات مرتبط‌تر توجه می‌کند؛ این همان کاری است که Transformer انجام می‌دهد\nنکتهٔ مدرس: در این کارگاه جزئیات معماری (لایه‌ها، ماتریس، feed-forward) را عمداً نمی‌گوییم؛ فقط باید بدانید معنای هر کلمه بر اساس زمینه اصلاح می‌شود. مثال «شیر»: در «شیر جنگل» حیوان، در «شیر آب» وسیله، در «شیر خوردن» نوشیدنی.' },
  // اسلاید ۲۰ - هوش مصنوعی در یک تصویر
  { title: 'هوش مصنوعی در یک تصویر', sub: 'کل مسیر در یک خط', blocks: [
    { visual: 'pipeline' },
  ], notes: 'کل مسیر در یک خط: داده ← پیش‌بینی کلمهٔ بعد ← تکرار میلیاردها بار (آموزش) ← پارامترها (دانش در عددها) ← توجه (معنی از زمینه).' },
  // اسلاید ۲۱ - چک‌لیست اعتماد
  { title: 'چک‌لیست اعتماد', sub: 'هر چه می‌دانید، چه معنی دارد', blocks: [
    { table: { size: 19, colW: [34, 66], head: ['آنچه می‌دانید', 'معنیش برای شما'], rows: [
      ['مدل پیش‌بینی می‌کند', 'گاهی اشتباه می‌کند؛ خروجی را چک کنید'],
      ['با تکرار یاد گرفته', 'تجربه و دادهٔ خودتان برای ساخت دستیار ارزش دارد'],
      ['دانشش در عددهاست', 'موتور جست‌وجو نیست؛ منبع نشان نمی‌دهد، الگو را ادامه می‌دهد'],
      ['به زمینه نگاه می‌کند', 'هرچه بیشتر توضیح دهید، نتیجهٔ بهتری می‌گیرید'],
    ] } },
  ], notes: 'نکتهٔ مدرس: این اسلاید قلب جلسهٔ ۲ است؛ روی هر ردیف یک مثال واقعی از محیط کار شرکت‌کننده‌ها بزنید.' },
  // اسلاید ۲۲ - موضع فعال
  { title: 'از مشتری به مدیر', sub: 'حالا شما می‌توانید', blocks: [
    { bullets: [
      'سؤال کنید و بدانید چه انتظاری داشته باشید',
      'اصلاح کنید؛ اشتباه مدل را با زمینهٔ بیشتر برطرف کنید',
      'زمینه بدهید؛ هرچه بیشتر توضیح، نتیجه بهتر',
      'تصمیم بگیرید؛ مدل پیشنهاد می‌دهد، تصمیم با شماست',
    ], size: 22, gap: 22 },
  ], notes: 'موضع فعال: شما مدیر مدل هستید، نه مشتری منفعل.\nروی هر گلوله یک مثال از محیط کار خودشان بزنید.' },
  // اسلاید ۲۳ - تکلیف امروز
  { title: 'تکلیف امروز', blocks: [
    { bullets: [
      'یک کار روزمره انتخاب کنید (همان سؤال استراحت)',
      'با سه رکن توصیفش کنید: چه دانش، چه مهارت و چه ابزار',
      'همین تکلیف ادامه دارد: در کارگاه ۲ به Agent تبدیلش می‌کنید و در کارگاه ۳ می‌سازید',
    ], size: 22, gap: 22 },
  ], notes: 'تکلیف امروز همان سؤال استراحت است؛ تأکید کنید این تکلیف در کارگاههای ۲ و ۳ ادامه پیدا می‌کند.' },
  // اسلاید ۲۴ - خلاصه + کارگاه بعدی
  { title: 'خلاصه + کارگاه بعدی', blocks: [
    { bullets: [
      'از AI تا LLM؛ از داده و الگو تا پارامتر و توجه',
      'آموزش LLM = پیش‌بینی کلمهٔ بعد روی مقیاس اینترنت (خودنظارتی)',
      'شما حالا می‌دانید هوش مصنوعی چطور کار می‌کند؛ می‌توانید آن را مدیریت کنید',
      'کارگاه بعدی: Agent و ابزار، یعنی مهارت و دست برای دستیار',
    ], size: 22, gap: 20 },
  ], notes: 'جمع‌بندی کل کارگاه و پل به کارگاه ۲: Agent و ابزار، یعنی مهارت و دست برای دستیار.' },
] },
];

// ============================================================
//  ویژوال‌های مفهومی (همهٔ CSS/SVG دست‌ساز؛ بدون تصویر و درخواست خارجی)
// ============================================================

//  الف) تایم‌لاین چهارمرحله‌ای تحول (اسلاید ۸؛ اسلاید محوری جلسهٔ ۱)
//  ترتیب راست‌به‌چپ: سیستم‌های خبره ← یادگیری ماشین ← یادگیری عمیق ← GenAI و LLM
function vTimeline() {
  const stages = [
    { period: '۱۹۵۰ تا ۱۹۸۰', name: 'سیستم‌های خبره', app: 'برنامه‌های شطرنج اولیه',
      beh: 'ماشین فقط آنچه را انسان نوشته اجرا می‌کند' },
    { period: '۱۹۹۰ تا ۲۰۱۰', name: 'یادگیری ماشین', app: 'فیلتر اسپم، قیمت خانه',
      beh: 'کسی قانون را به ماشین نمی‌گوید؛ خودش از داده کشف می‌کند' },
    { period: '۲۰۱۰ها', name: 'یادگیری عمیق', app: 'تشخیص چهره در عکس',
      beh: 'مفاهیم ساده لایه‌به‌لایه به مفاهیم پیچیده ترکیب می‌شوند' },
    { period: '۲۰۲۲ به بعد', name: 'GenAI و LLM', app: 'ChatGPT، Claude',
      beh: 'کلمهٔ بعد را پیش‌بینی می‌کند؛ بدون پاسخ‌نامهٔ انسانی یاد گرفته', hl: true },
  ];
  return `<div class="timeline"><span class="tl-line"></span>` + stages.map(s => `
  <div class="tl-stage${s.hl ? ' tl-hl' : ''}">
    <span class="tl-dot"></span>
    <div class="tl-card">
      <span class="tl-period">${s.period}</span>
      <span class="tl-name">${s.name}</span>
      <span class="tl-app">${s.app}</span>
      <span class="tl-beh">${s.beh}</span>
    </div>
  </div>`).join('') + `</div>`;
}

//  ب) ردیف چیپ‌های مرور (اسلاید ۱۵) و مسیر کامل (اسلاید ۲۰)
//  جریان راست‌به‌چپ؛ آیتم اول در راست‌ترین موقعیت
function vChipFlow(chips) {
  return `<div class="chipflow">` + chips.map((c, i) =>
    (i ? `<span class="flow-arrow">←</span>` : '') +
    `<span class="flow-chip${c.hl ? ' hl' : ''}">${esc(c.t)}${c.sub ? `<span class="flow-sub">${esc(c.sub)}</span>` : ''}</span>`
  ).join('') + `</div>`;
}
const vReviewChips = () => vChipFlow([
  { t: 'داده و الگو' }, { t: 'شبکه‌ای که یاد می‌گیرد' }, { t: 'پارامترها' }, { t: 'توجه', hl: true },
]);
const vPipeline = () => vChipFlow([
  { t: 'داده' },
  { t: 'پیش‌بینی کلمهٔ بعد' },
  { t: 'تکرار میلیاردها بار', sub: 'آموزش' },
  { t: 'پارامترها', sub: 'دانش در عددها' },
  { t: 'توجه', sub: 'معنی از زمینه' },
]);

//  ج) ماتریس توجه: ردیف «او» به «علی» ۷۰٪ توجه می‌کند (اسلاید ۱۹)
function vAttention() {
  const words = ['علی', 'بانک', 'او', 'پول'];
  const M = [
    [null, .10, .05, .05],
    [.08, null, .04, .30],
    [.70, .05, null, .05],
    [.05, .30, .05, null],
  ];
  const head = `<div class="att-cell att-head att-corner"></div>` +
    words.map(w => `<div class="att-cell att-head">${w}</div>`).join('');
  const rows = words.map((w, r) =>
    `<div class="att-cell att-head">${w}</div>` +
    M[r].map((v, c) => {
      if (v === null) return `<div class="att-cell att-self">—</div>`;
      const hot = r === 2 && c === 0;
      return `<div class="att-cell" style="background:rgba(14,124,123,${v})">${hot ? '<b class="att-hot">۷۰٪</b>' : ''}</div>`;
    }).join('')).join('');
  return `<div class="att-wrap">
  <div class="att-grid">${head}${rows}</div>
  <div class="viz-caption">شدت رنگ = میزان توجه؛ «او» بیشتر از همه به «علی» توجه می‌کند</div>
</div>`;
}

//  د) میله‌های احتمال کلمهٔ بعد (اسلاید ۱۱): آبی ۶۰٪، ابری ۲۵٪، صاف ۱۵٪
function vProbBars() {
  const opts = [['آبی', 60, ACC], ['ابری', 25, '#8FA3BF'], ['صاف', 15, '#C9CFD8']];
  return `<div class="bars">` + opts.map(([w, pr, c]) =>
    `<div class="bar-row">
    <span class="bar-word">${w}</span>
    <span class="bar-track"><span class="bar-fill" style="width:${pr}%;background:${c}"></span></span>
    <span class="bar-pct">${fa(pr)}٪</span>
  </div>`).join('') + `</div>`;
}

const VISUALS = {
  'timeline': vTimeline,
  'review-chips': vReviewChips,
  'pipeline': vPipeline,
  'attention': vAttention,
  'prob-bars': vProbBars,
};

// ============================================================
//  رندر بلوک‌ها و اسلایدها
// ============================================================
const isFa = t => /[\u0600-\u06FF]/.test(t);

function renderBlock(b) {
  if (b.bullets) {
    const { size = 22, gap = 14, noBullet = false } = b;
    const items = b.bullets.map(it => {
      const [t, lvl] = Array.isArray(it) ? it : [it, 0];
      return `<li${lvl ? ' class="sub"' : ''} style="margin-bottom:${gap}px">${esc(t)}</li>`;
    }).join('');
    return `<ul class="bl${noBullet ? ' nb' : ''}" style="font-size:${size}px">${items}</ul>`;
  }
  if (b.cards) {
    const cards = b.cards.items.map(d =>
      `<div class="card"><h3>${esc(d.t)}</h3><p>${esc(d.b)}</p></div>`).join('');
    return `<div class="cards" style="min-height:${b.cards.h}px">${cards}</div>`;
  }
  if (b.table) {
    const { head, rows, colW, size = 18 } = b.table;
    const th = head.map((h, i) =>
      `<th${colW ? ` style="width:${colW[i]}%"` : ''}>${esc(h)}</th>`).join('');
    const trs = rows.map(r => `<tr>` + r.map(c =>
      `<td style="text-align:${isFa(c) ? 'right' : 'center'}">${esc(c)}</td>`).join('') + `</tr>`).join('');
    return `<table class="tbl" style="font-size:${size}px"><thead><tr>${th}</tr></thead><tbody>${trs}</tbody></table>`;
  }
  if (b.accent) return `<p class="accent"${b.bold ? ' style="font-weight:700"' : ''}>${esc(b.accent)}</p>`;
  if (b.muted) return `<p class="muted">${esc(b.muted)}</p>`;
  if (b.lead) return `<p class="lead">${esc(b.lead)}</p>`;
  if (b.text) return `<p class="plain">${esc(b.text)}</p>`;
  if (b.visual) return `<div class="viz-box">${VISUALS[b.visual]()}</div>`;
  if (b.split) {
    const [r, l] = b.split.ratio;
    return `<div class="split">
    <div class="col" style="flex:0 0 ${r}%">${b.split.right.map(renderBlock).join('')}</div>
    <div class="col" style="flex:1">${b.split.left.map(renderBlock).join('')}</div>
  </div>`;
  }
  throw new Error('بلوک ناشناخته: ' + JSON.stringify(Object.keys(b)));
}

function renderSlide(s, session, idx, total) {
  if (s.cover) {
    return `<section class="slide cover" data-i="${idx}">
  <div class="goldbar"></div>
  <div class="cover-body">
    <p class="kicker">${esc(s.cover.kicker)}</p>
    <h1>${esc(s.cover.title)}</h1>
    <p class="cover-sub">${esc(s.cover.sub)}</p>
    <p class="cover-foot">${esc(DECK_TITLE)}</p>
  </div>
</section>`;
  }
  return `<section class="slide content" data-i="${idx}">
  <header class="chead">
    <div class="trow"><span class="tbar"></span><h2>${esc(s.title)}</h2></div>
    ${s.sub ? `<p class="csub">${esc(s.sub)}</p>` : ''}
  </header>
  <div class="cbody">${(s.blocks || []).map(renderBlock).join('\n  ')}</div>
  <footer class="cfoot"><span>${esc(session.footer)}</span><span>${fa(idx + 1)} از ${fa(total)}</span></footer>
</section>`;
}

// ============================================================
//  قالب HTML + CSS + JS
// ============================================================
const CSS = `
${FONT_CSS}
:root{--navy:${NAVY};--navy2:${NAVY2};--ink:${INK};--mut:${MUT};--acc:${ACC};--light:${LIGHT};--soft:${SOFT};--gold:${GOLD}}
*{box-sizing:border-box;margin:0;padding:0}
html,body{height:100%;overflow:hidden;background:#0d1b2a}
body{font-family:'Vazirmatn',Tahoma,'Segoe UI',sans-serif;color:var(--ink)}
#viewport{position:fixed;inset:0;overflow:hidden}
#stage{position:absolute;top:50%;left:50%;width:1280px;height:720px;transform-origin:center center;background:${WHT}}
.slide{position:absolute;inset:0;opacity:0;transform:translateX(-16px);transition:opacity .3s ease,transform .3s ease;pointer-events:none;visibility:hidden}
.slide.active{opacity:1;transform:none;pointer-events:auto;visibility:visible}
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
.chead{margin-bottom:18px}
.trow{display:flex;align-items:center;gap:14px}
.tbar{flex:0 0 7px;height:52px;background:var(--acc);border-radius:3px}
.chead h2{font-size:34px;font-weight:800;color:var(--navy)}
.csub{margin-top:8px;margin-right:21px;font-size:17px;color:var(--mut)}
.cfoot{position:absolute;bottom:34px;right:56px;left:56px;display:flex;justify-content:space-between;font-size:14px;color:var(--mut)}
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
.accent{color:var(--acc);font-size:18px;margin:14px 0}
.muted{color:var(--mut);font-size:17px;margin:12px 0}
.lead{color:var(--navy);font-size:24px;font-weight:700;margin:8px 0 20px}
.plain{color:var(--ink);font-size:18px;line-height:1.9;margin-top:16px}
/* چیدمان دوتایی */
.split{display:flex;gap:40px;align-items:flex-start}
/* ویژوال‌ها */
.viz-box{display:flex;flex-direction:column;align-items:center;justify-content:center;padding:8px 0}
.viz{width:100%;height:auto;display:block}
.viz-caption{margin-top:16px;font-size:15px;color:var(--mut)}
/* تایم‌لاین چهارمرحله‌ای (اسلاید ۸) */
.timeline{position:relative;display:flex;gap:20px;width:100%;padding-top:34px;margin-top:26px}
.tl-line{position:absolute;top:7px;right:6%;left:6%;height:3px;background:var(--soft);border-radius:2px}
.tl-stage{flex:1;position:relative}
.tl-dot{position:absolute;top:0;right:50%;transform:translateX(50%);width:15px;height:15px;border-radius:50%;background:var(--acc);border:3px solid ${WHT};box-shadow:0 0 0 2px var(--acc)}
.tl-hl .tl-dot{background:var(--gold);box-shadow:0 0 0 2px var(--gold)}
.tl-card{margin-top:12px;background:var(--light);border:1px solid var(--soft);border-radius:12px;padding:16px 18px;min-height:252px;display:flex;flex-direction:column}
.tl-hl .tl-card{background:${WHT};border:2px solid var(--gold)}
.tl-period{font-size:14px;font-weight:700;color:var(--mut)}
.tl-hl .tl-period{color:var(--gold)}
.tl-name{font-size:20px;font-weight:800;color:var(--navy);margin:8px 0 10px}
.tl-app{font-size:15px;font-weight:700;color:var(--acc);padding-bottom:10px;border-bottom:1px dashed var(--soft)}
.tl-beh{font-size:14px;line-height:1.85;color:var(--ink);margin-top:10px}
/* ردیف چیپ‌های متصل با پیکان (اسلایدهای ۱۵ و ۲۰) */
.chipflow{display:flex;align-items:center;justify-content:center;gap:16px;flex-wrap:wrap;margin:70px 0}
.flow-arrow{color:var(--acc);font-size:26px;font-weight:800}
.flow-chip{display:inline-flex;flex-direction:column;align-items:center;gap:6px;background:var(--light);border:1.5px solid var(--soft);border-radius:12px;padding:18px 24px;font-size:20px;font-weight:700;color:var(--navy)}
.flow-chip.hl{border:2px solid var(--gold);background:${WHT}}
.flow-sub{font-size:14px;font-weight:400;color:var(--mut)}
/* ماتریس توجه (اسلاید ۱۹) */
.att-wrap{display:flex;flex-direction:column;align-items:center;margin-top:10px}
.att-grid{display:grid;grid-template-columns:repeat(5,86px);grid-auto-rows:56px;gap:6px}
.att-cell{display:flex;align-items:center;justify-content:center;border-radius:8px;border:1px solid var(--soft);font-size:17px}
.att-head{background:var(--navy);color:${WHT};font-weight:700;border-color:var(--navy2)}
.att-corner{background:var(--light);border-color:var(--soft)}
.att-self{color:var(--mut);background:${WHT}}
.att-hot{color:${WHT};font-size:19px}
/* میله‌های احتمال (اسلاید ۱۱) */
.bars{margin:6px 0 4px}
.bar-row{display:flex;align-items:center;gap:18px;margin-bottom:26px}
.bar-word{flex:0 0 110px;font-size:22px;font-weight:700;text-align:left}
.bar-track{flex:1;height:26px;background:var(--light);border-radius:6px;position:relative;overflow:hidden}
.bar-fill{position:absolute;top:0;bottom:0;right:0;border-radius:6px}
.bar-pct{flex:0 0 70px;font-size:19px;color:var(--mut)}
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
`;

const JS = `
const slides=[...document.querySelectorAll('.slide')];
const TOTAL=slides.length;
const NOTES=__NOTES__;
const SESS=__SESS__;
const STARTS=__STARTS__;
let i=0;
const prog=document.getElementById('prog');
const pos=document.getElementById('pos');
const notesEl=document.getElementById('notes');
const chipsEl=document.getElementById('chips');
const FA='۰۱۲۳۴۵۶۷۸۹';
const fa=n=>String(n).replace(/\\d/g,d=>FA[d]);
const chips=STARTS.map((s,k)=>{
  const b=document.createElement('button');
  b.className='chip';b.textContent='جلسه '+fa(k+1);
  b.addEventListener('click',()=>show(s));
  chipsEl.appendChild(b);return b;
});
function show(n){
  n=Math.max(0,Math.min(TOTAL-1,n));
  slides[i].classList.remove('active');
  i=n;
  slides[i].classList.add('active');
  prog.style.width=((i+1)/TOTAL*100)+'%';
  pos.textContent=fa(i+1)+' / '+fa(TOTAL);
  chips.forEach((c,k)=>c.classList.toggle('on',SESS[i]===k+1));
  if(notesEl.classList.contains('show'))renderNotes();
}
function renderNotes(){
  notesEl.innerHTML='<div class="nhead">یادداشت‌های سخنران — اسلاید '+fa(i+1)+' از '+fa(TOTAL)+'</div>'+escH(NOTES[i]||'—');
}
const escH=s=>s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
const AR='١٢٣٤٥٦٧٨',PE='۱۲۳۴۵۶۷۸';
document.addEventListener('keydown',e=>{
  const k=e.key;
  if(k===' '||k==='ArrowRight'||k==='ArrowDown'||k==='PageDown'){e.preventDefault();show(i+1);}
  else if(k==='Backspace'||k==='ArrowLeft'||k==='ArrowUp'||k==='PageUp'){e.preventDefault();show(i-1);}
  else if(k==='Home'){e.preventDefault();show(0);}
  else if(k==='End'){e.preventDefault();show(TOTAL-1);}
  else if(k==='f'||k==='F'){e.preventDefault();document.fullscreenElement?document.exitFullscreen():document.documentElement.requestFullscreen();}
  else if(k==='n'||k==='N'){e.preventDefault();notesEl.classList.toggle('show');if(notesEl.classList.contains('show'))renderNotes();}
  else{
    let d=-1;
    if(k>='1'&&k<='8')d=+k;
    else if(AR.includes(k))d=AR.indexOf(k)+1;
    else if(PE.includes(k))d=PE.indexOf(k)+1;
    if(d>0&&d<=STARTS.length){e.preventDefault();show(STARTS[d-1]);}
  }
});
function fit(){
  const s=Math.min(innerWidth/1280,innerHeight/720);
  document.getElementById('stage').style.transform='translate(-50%,-50%) scale('+s+')';
}
addEventListener('resize',fit);
fit();
show(0);
`;

// ============================================================
//  مontage نهایی
// ============================================================
const flat = [];
for (const ses of SESSIONS)
  for (const sl of ses.slides)
    flat.push({ slide: sl, session: ses.n, footer: ses.footer });

const TOTAL = flat.length;
const STARTS = [];
SESSIONS.forEach((ses, k) => {
  const before = SESSIONS.slice(0, k).reduce((a, s) => a + s.slides.length, 0);
  STARTS.push(before);
});

const body = flat.map((f, i) => renderSlide(f.slide, f, i, TOTAL)).join('\n');
const script = JS
  .replace('__NOTES__', JSON.stringify(flat.map(f => f.slide.notes || '')))
  .replace('__SESS__', JSON.stringify(flat.map(f => f.session)))
  .replace('__STARTS__', JSON.stringify(STARTS));

const html = `<!DOCTYPE html>
<html dir="rtl" lang="fa">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${esc(DECK_TITLE)}</title>
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
  <span id="hint">Space بعدی • N یادداشت‌ها • F تمام‌صفحه • ۱ و ۲ پرش به جلسه</span>
</div>
<div id="prog"></div>
<aside id="notes" dir="rtl"></aside>
<script>${script}</script>
</body>
</html>
`;

writeFileSync(OUT, html, 'utf8');

// ---------- گزارش ----------
SESSIONS.forEach((ses, k) => {
  console.log(`✓ جلسهٔ ${fa(ses.n)}: ${fa(ses.slides.length)} اسلاید`);
});
console.log(`✓ جمع: ${fa(TOTAL)} اسلاید در ${fa(SESSIONS.length)} جلسه`);
console.log(`✓ خروجی: ${OUT}`);
