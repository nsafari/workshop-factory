# Slide Generator Skill

## توضیح
این Skill **دک اسلاید HTML خودکفا** (تک‌فایل، بدون وابستگی npm، بدون درخواست خارجی) برای کارگاه‌ها و مطالعه‌های بیشتر می‌سازد. دک با **سازندهٔ مشترک** `workshops/lib/deck.mjs` (تابع `buildDeck`) ساخته می‌شود؛ فونت Vazirmatn و همهٔ تصاویر به‌شکل base64 در همان فایل نهفته‌اند و حتی آفلاین دقیقا‌ یکسان رندر می‌شوند.

خروجی‌های فعلی:
- `workshops/slides/workshop-1-slides.html` — ۲۴ اسلاید، ۲ جلسه (داده: `workshops/generate-slides.mjs`)
- `study/slides/study-1-slides.html` — ۴۲ اسلاید، ۳ بخش + ۳۷ فریم ویدیو (داده: `study/generate-slides.mjs`)

## معماری: چه کجاست
- **سازندهٔ مشترک**: `workshops/lib/deck.mjs` — رندر، CSS پایه، ناوبری، پالت، فونت، `buildDeck` و توابع کمکی (`fa`, `esc`, `fA`, `imgData`, `imgCard`).
- **دادهٔ هر دک**: یک فایل `generate-slides.mjs` در کنار محتوا — آرایهٔ `SESSIONS` (اسلایدها) + نگاشت `VISUALS` (ویژوال‌های اختصاصی) + `EXTRA_CSS`.
- **قانون طلایی**: `deck.mjs` را برای یک دکِ واحد تغییر ندهید. نیازهای خاص با `EXTRA_CSS` و ویژوال‌های اختصاصی داخل فایل همان دک حل می‌شوند. هر تغییری در `deck.mjs` **همهٔ** دک‌ها را درگیر می‌کند → همهٔ خروجی‌ها را بازسازی و با `sha256sum` تطبیق دهید.

## ساختار فایل داده (هر `generate-slides.mjs`)
ترتیب استاندارد بخش‌ها (نمونه‌های کامل: `workshops/generate-slides.mjs` و `study/generate-slides.mjs`):

```js
// ۱) کامنت سربرگ: عنوان، تعداد جلسه/بخش، مسیر خروجی، منبع محتوا، دستور اجرا
// ۲) ایمپورت از سازندهٔ مشترک
import { buildDeck, NAVY, ACC, GOLD, WHT, fa, esc, fA, imgData, imgCard } from '../workshops/lib/deck.mjs';
// ۳) مسیرها: HERE / OUT_DIR (با env SLIDES_OUT) / OUT / DECK_TITLE
// ۴) تصاویر نهفته (base64) — هر تصویر با کامنتِ ادعا/منبع
const IMG = imgData(path.join(HERE, 'images', 'foo.jpg'));
// ۵) SESSIONS: آرایهٔ جلسات
const SESSIONS = [{ n: 1, footer: '…', slides: [ /* اسلایدها */ ] }];
// ۶) ویژوال‌های اختصاصی: توابعِ برگردانندهٔ HTML (SVG/CSS)
const vPipeline = () => `<div class="viz">…</div>`;
const VISUALS = { pipeline: vPipeline, /* … */ };
// ۷) EXTRA_CSS: استایل ویژوال‌های این دک (اختیاری)
const EXTRA_CSS = `.chipflow{…}`;
// ۸) فراخوانی سازنده
buildDeck({ outPath: OUT, title: DECK_TITLE, sessions: SESSIONS, visuals: VISUALS, extraCss: EXTRA_CSS });
```

## قرارداد داده — شکل دقیق
**جلسه**: `{ n, footer, slides }` — `n` شمارهٔ جلسه (برای چیپ‌ها و پرش ۱/۲/…)، `footer` متن پایین هر اسلاید.

**اسلاید جلد** (فقط اول):
```js
{ cover: { kicker: 'کارگاه ۱ • جلسهٔ ۱ از ۲', title: 'عنوان اصلی', sub: '۲۰ دقیقه' }, notes: '…' }
```
**اسلاید محتوا**:
```js
{ title: 'عنوان', sub: 'زیرعنوان اختیاری', blocks: [ /* بلوک‌ها */ ], notes: 'یادداشت سخنران' }
```

**بلوک‌ها** (هر بلوک یک شیء با **یکی** از این کلیدها؛ `frag: N` روی همه اختیاری است و شمارهٔ گام/فرگمنت را تعیین می‌کند):

| کلید | شکل | کاربرد |
|---|---|---|
| `bullets` | `{ bullets: [[متن, سطح?], …], size?, gap?, noBullet?, stagger?, fragItems? }` | لیست گلوله‌ای؛ `fragItems: [1,2,3]` = هر گلوله گام جداگانه |
| `cards` | `{ cards: { items: [{t, b}], h }, frag? }` | ردیف کارت‌های عنوان+متن |
| `table` | `{ table: { head: […], rows: [[…]], colW?, size? }, frag? }` | جدول |
| `lead` | `{ lead: متن, frag? }` | جملهٔนำ بزرگ (سبک، ۲۴px) |
| `accent` | `{ accent: متن, bold?, frag? }` | خط تأکیدی رنگ ACC |
| `muted` | `{ muted: متن, frag? }` | خط فرعی کم‌رنگ |
| `text` | `{ text: متن, frag? }` | متن ساده |
| `visual` | `{ visual: 'نام', frag? }` | ویژوال اختصاصی از `VISUALS` (در `div.viz-box` رندر می‌شود) |
| `split` | `{ split: { ratio: [٪ستون_راست], right: [بلوک‌ها], left: [بلوک‌ها] } }` | چیدمان دوتایی (راست=تصویر غالب، چپ=متن) |

**فرگمنت (گام‌به‌گام)**:
- `fA(N)` → ` data-frag="N"` — عنصر تا رسیدن گام به `N` پنهان است.
- تعداد گام‌های یک اسلاید = بزرگ‌ترین `data-frag` داخلش (اسلاید بدون `data-frag` = یک گام).
- `Space` اول گام‌ها را جلو می‌برد و بعد اسلاید بعدی را؛ `Backspace` برعکس.
- **نکتهٔ کلیدی**: اگر عنصر فرزند `data-frag` کوچک‌تری از والدش داشته باشد، بین دو گام «خالی» می‌ماند — شمارهٔ فرگمنت فرزند باید ≥ والد باشد مگر عمداً گام جدا می‌خواهید.

**ناوبری (در همهٔ دک‌ها یکسان)**: `Space/→/↓/PgDn` بعدی • `Backspace/←/↑/PgUp` قبلی • `Home/End` • `F` تمام‌صفحه • `N` یادداشت‌های سخنران • `1…8` یا ۱…۸/١…٨ پرش به جلسه • دیباگ: `?slide=9&step=3`.

## سبک خانه (Visuals)
- **فونت**: Vazirmatn (در دک base64 نهفته است؛ در SVG با `font-family:Vazirmatn`).
- **چیدمان RTL**: متن راست‌چین؛ در SVG `text-anchor="end"` + مختصات راست‌محور؛ اعداد/برچسب‌ها با `fa()` به ارقام فارسی.
- **پالت** (از `deck.mjs`، مستقیم از متغیرها استفاده کنید): `NAVY #1F3A5F` (تیتر/ساختار) • `ACC #0E7C7B` (تأکید/روند) • `GOLD #C9A227` (موضوع ویژه — «سه») • `MUT #6B7280` (فرعی) • `LIGHT #F2F4F7` / `SOFT #DDE3EA` (کارت/خط) • `WHT`.
- **SVG**: `viewBox` صریح + `class="viz"`؛ متن‌ها خوانا (حداقل ۱۱–۱۴px در مقیاس viewBox)؛ بدون هیچ ارجاع خارجی.
- **کلاس با پیشوند اختصاصی** برای CSS ویژوال هر دک تا با بقیه تداخل نکند؛ استایل‌ها در `EXTRA_CSS`. اگر ترتیب با stylesheet پایه مهم است، از جداکنندهٔ `/*@g1*/` در `EXTRA_CSS` استفاده کنید (پیش = قبل از بلوک انیمیشن‌ها، پس = بعد از آن).
- **کپشن تصویر**: `.viz-caption` زیر تصویر (در `imgCard` خودکار).
- `imgCard(src, alt, cap, variant)` — کارت تصویر با کپشن منبع؛ variant‌ها: `landscape` / `portrait` / `book`.
- `imgData(path)` — تبدیل فایل تصویر به data-URI base64.

## تصاویر
- هر تصویر (فریم ویدیو یا عکس مرجع) **base64** در دک می‌نشیند؛ در کامنتِ ثابت، ادعای تصویر + منبع/زمان را بنویسید.
- فریم‌های ویدیو: نام فایل = زمان دقیق (مثل `00_09_05.jpg`)؛ از ساختار `frame(folder, file)` استفاده کنید.
- **کد زمانی `[mm:ss]` فقط در `notes`** — نه در متن اسلاید، نه در کپشن.

## چک‌لیست راستی‌آزمایی (قبل از تحویل، همه را بزنید)
۱. `node --check <فایل>`
۲. `node <فایل>` — بدون خطا + گزارش تعداد اسلایدها درست.
۳. **تعداد اسلاید** == آنچه انتظار می‌رود: `grep -c '<section class="slide' <خروجی.html>`
۴. **هیچ اسلایدی بدون تصویر**: هر `<section>` باید `<img>` یا `<svg>`/کلاس `viz` داشته باشد.
۵. **فرگمنت‌ها**: بزرگ‌ترین `data-frag` هر اسلاید == تعداد گام‌های طراحی‌شده؛ گامِ خالی ندارید.
۶. **نیم‌فاصله**: بعد از هر ویرایش فارسی grep کنید که `می` آخرخط/`می‌` نیمه‌کاره نشده باشد.
۷. **دک‌های دیگر دست‌نخورده** (اگر `deck.mjs` یا فونت/پالت دست خورده): `sha256sum workshops/slides/*.html study/slides/*.html` قبل/بعد.
۸. **برخورد چیدمان/اسکرول**:
   ```bash
   node .agents/skills/self-study-generator/scripts/qa_overflow.cjs <خروجی.html>
   ```
   خروجی مورد انتظار: `"issues": []`
۹. **lint فارسی**: `fa_lint.py` از مهارت persian-writing (اگر در دسترس است) — هشدارهای داخل بلوک کد و timestampها نادیده گرفته می‌شوند.
۱۰. **مرورگر**: باز کردن خروجی با hard refresh (`Ctrl+Shift+R`) — مرورگر HTML قدیمی را کش می‌کند.

## نکات مهم
- **MD منبع واحد حقیقت است** (برای دک‌هایی که سند `.md` دارند): هر تغییر ساختاری **اول در MD** و سپس پورت به `generate-slides.mjs`. ویرایش تکراری دک بدون به‌روزرسانی MD، سند و دک را از هم دور می‌کند.
- **نیم‌فاصله (U+200C)** را هنگام ویرایش رشته‌های JS نشکنید.
- **روی‌جلدِ سازنده فقط متن است** (kicker/عنوان/زیرعنوان/پانوشت) — اگر روی‌جلد به تصویر نیاز دارد، با `EXTRA_CSS` پس‌زمینهٔ تمام‌عرض روی `.cover` تزریق می‌شود.
- اگر کاربر **PPTX** خواست: آن مسیر جداست (PptxGenJS/python-pptx — ببینید `knowledge/presentation/pptx-tools.md`)؛ خروجی استاندارد این Skill، دک HTML خودکفاست.

## منابع
- [workshops/lib/deck.mjs](../../../workshops/lib/deck.mjs): سازندهٔ مشترک (منبع قرارداد بالا)
- [workshops/generate-slides.mjs](../../../workshops/generate-slides.mjs): نمونهٔ دک کارگاه (۲۴ اسلاید)
- [study/generate-slides.mjs](../../../study/generate-slides.mjs): نمونهٔ کامل‌تر — فریم‌های ویدیو + ده‌ها SVG اختصاصی
- [self-study-generator](../self-study-generator/SKILL.md): خط لولهٔ بالادست (فریم‌های ویدیو → مستند + دک)
- [scripts/qa_overflow.cjs](../self-study-generator/scripts/qa_overflow.cjs): چکِ برخورد چیدمان
