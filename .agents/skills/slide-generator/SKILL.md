# Slide Generator Skill

## توضیح
این Skill به شما کمک می‌کند اسلایدهای پاورپوینت تولید کنید. از PptxGenJS استفاده می‌کند.

## نحوه استفاده
وقتی کاربر می‌خواهد اسلاید بسازد، این مراحل را دنبال کنید:

### مرحله ۱: جمع‌آوری اطلاعات
از کاربر بپرسید:
1. **موضوع ارائه** چیست؟
2. **تعداد اسلاید** مورد نظر؟
3. **مخاطب** کیست؟
4. **زبان** فارسی یا انگلیسی؟
5. **سبک** رسمی یا غیررسمی؟

### مرحله ۲: طراحی ساختار
ساختار اسلایدها را طراحی کنید:

```
اسلاید ۱: عنوان (Cover)
├── عنوان اصلی
├── زیرعنوان
└── نام ارائه‌دهنده

اسلاید ۲: دستور جلسه (Agenda)
├── لیست موضوعات
└── زمان‌بندی

اسلاید ۳-N: محتوا
├── عنوان
├── نکات کلیدی
├── تصویر/نمودار
└── مثال

اسلاید آخر: خلاصه (Summary)
├── نکات کلیدی
├── اقدامات بعدی
└── اطلاعات تماس
```

### مرحله ۳: تولید کد
کد PptxGenJS را تولید کنید:

```javascript
import pptxgen from 'pptxgenjs';

// تنظیمات پایه
const NAVY = '1F3A5F', ACC = '0E7C7B', INK = '333333';
const FONT = 'Vazirmatn';

// ایجاد پرزنتیشن
const pres = new pptxgen();
pres.layout = 'LAYOUT_WIDE';

// اسلاید عنوان
const cover = pres.addSlide();
cover.background = { color: NAVY };
cover.addText('عنوان', {
  x: 1, y: 2, w: 8, h: 1,
  fontSize: 36, fontFace: FONT,
  color: 'FFFFFF', rtlMode: true, align: 'right'
});

// اسلاید محتوا
const slide = pres.addSlide();
slide.addText('عنوان بخش', {
  x: 0.5, y: 0.3, w: 9, h: 0.7,
  fontSize: 24, fontFace: FONT,
  color: NAVY, rtlMode: true, align: 'right'
});

// لیست گلوله‌ای
slide.addText([
  { text: 'نکته ۱', options: { bullet: true, fontSize: 16 } },
  { text: 'نکته ۲', options: { bullet: true, fontSize: 16 } },
  { text: 'نکته ۳', options: { bullet: true, fontSize: 16 } }
], {
  x: 0.5, y: 1.2, w: 9, h: 5,
  rtlMode: true, align: 'right'
});

// ذخیره
pres.writeFile({ fileName: 'output.pptx' });
```

### مرحله ۴: خروجی
خروجی را در قالب زیر ارائه دهید:

1. **فایل کد**: `generate-slides.mjs`
2. **دستور اجرا**: `node generate-slides.mjs`
3. **فایل خروجی**: `output.pptx`

## الگوهای آماده

### الگوی کارگاه آموزشی
```javascript
function workshopDeck(title, sessions) {
  const pres = baseDeck();
  
  // اسلاید عنوان
  cover(pres, title);
  
  // اسلایدهای هر جلسه
  sessions.forEach(session => {
    content(pres, session.title);
    bullets(pres, session.points);
  });
  
  return pres;
}
```

### الگوی ارائه محتوا
```javascript
function contentDeck(title, sections) {
  const pres = baseDeck();
  
  // اسلاید عنوان
  cover(pres, title);
  
  // اسلاید دستور جلسه
  content(pres, 'دستور جلسه');
  bullets(pres, sections.map(s => s.title));
  
  // اسلایدهای محتوا
  sections.forEach(section => {
    content(pres, section.title);
    bullets(pres, section.points);
    
    if (section.cards) {
      cardsRTL(pres.slides[pres.slides.length-1], section.cards);
    }
    
    if (section.table) {
      tableRTL(pres.slides[pres.slides.length-1], 
               section.table.head, section.table.rows);
    }
  });
  
  return pres;
}
```

## توابع کمکی

### baseDeck() - ایجاد پرزنتیشن پایه
```javascript
function baseDeck() {
  const p = new pptxgen();
  p.defineLayout({ name: 'W', width: 13.33, height: 7.5 });
  p.layout = 'W';
  return p;
}
```

### cover() - اسلاید عنوان
```javascript
function cover(p, kicker, title, sub) {
  const s = p.addSlide();
  s.background = { color: NAVY };
  // افزودن عناصر
  return s;
}
```

### content() - اسلاید محتوا
```javascript
function content(p, title, opts = {}) {
  const s = p.addSlide();
  s.background = { color: WHT };
  // افزودن عنوان
  return s;
}
```

### bullets() - لیست گلوله‌ای
```javascript
function bullets(s, items, o = {}) {
  // items: آرایه‌ای از متن یا [متن, سطح]
}
```

### cardsRTL() - کارت‌ها
```javascript
function cardsRTL(s, defs, o = {}) {
  // defs: آرایه‌ای از {t: عنوان, b: متن}
}
```

### tableRTL() - جدول
```javascript
function tableRTL(s, head, rows, o = {}) {
  // head: عنوان ستون‌ها
  // rows: داده‌ها
}
```

## نکات مهم

### فونت فارسی
```javascript
const FONT = 'Vazirmatn';

// در هر متن
{
  fontFace: FONT,
  rtlMode: true,
  align: 'right'
}
```

### تشخیص خودکار زبان
```javascript
const isFa = t => /[\u0600-\u06FF]/.test(t);
const dir = t => isFa(t) 
  ? { rtlMode: true, align: 'right' } 
  : { rtlMode: false, align: 'left' };
```

### رنگ‌بندی
```javascript
const NAVY = '1F3A5F';   // عنوان‌ها
const ACC = '0E7C7B';    // تأکیدها
const INK = '333333';    // متن اصلی
const MUT = '6B7280';    // متن فرعی
const LIGHT = 'F2F4F7';  // پس‌زمینه کارت
const WHT = 'FFFFFF';    // پس‌زمینه اصلی
const GOLD = 'C9A227';   // تأکید ویژه
```

## منابع
- [PptxGenJS Documentation](https://gitbrent.github.io/PptxGenJS/)
- [Vazirmatn Font](https://github.com/rastikerdar/vazirmatn)