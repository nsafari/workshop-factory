# ابزارهای تولید پاورپوینت
## PPTX Generation Tools

---

## ۱. PptxGenJS (ابزار اصلی پروژه)

### توضیح
کتابخانه جاوااسکریپت برای تولید فایل‌های PowerPoint با کیفیت بالا.

### نصب
```bash
npm install pptxgenjs
```

### ساختار کد پروژه
```
workshops/generate-slides.mjs
├── تنظیمات رنگ و فونت
├── توابع کمکی (cover, content, bullets, cards, table)
├── تولید هر جلسه (s1 تا s8)
└── خروجی: فایل‌های .pptx
```

### الگوی استفاده
```javascript
import pptxgen from 'pptxgenjs';

// ایجاد پرزنتیشن
const pres = new pptxgen();
pres.layout = 'LAYOUT_WIDE';

// افزودن اسلاید
const slide = pres.addSlide();

// افزودن متن
slide.addText('متن فارسی', {
  x: 1, y: 1, w: 8, h: 1,
  fontSize: 24,
  fontFace: 'Vazirmatn',
  rtlMode: true,
  align: 'right'
});

// ذخیره
pres.writeFile({ fileName: 'output.pptx' });
```

### توابع کمکی پروژه

#### cover() - اسلاید عنوان
```javascript
function cover(p, kicker, title, sub) {
  const s = p.addSlide();
  s.background = { color: NAVY };
  // افزودن عناصر
  return s;
}
```

#### content() - اسلاید محتوا
```javascript
function content(p, title, opts = {}) {
  const s = p.addSlide();
  s.background = { color: WHT };
  // افزودن عنوان و کادر
  return s;
}
```

#### bullets() - لیست گلوله‌ای
```javascript
function bullets(s, items, o = {}) {
  // items: آرایه‌ای از متن یا [متن, سطح]
  // سطح ۰ = اصلی، سطح ۱ = زیرمجموعه
}
```

#### cardsRTL() - کارت‌های راست‌چین
```javascript
function cardsRTL(s, defs, o = {}) {
  // defs: آرایه‌ای از {t: عنوان, b: متن}
}
```

#### tableRTL() - جدول راست‌چین
```javascript
function tableRTL(s, head, rows, o = {}) {
  // head: عنوان ستون‌ها
  // rows: داده‌های جدول
}
```

---

## ۲. python-pptx (جایگزین پایتون)

### نصب
```bash
pip install python-pptx
```

### استفاده پایه
```python
from pptx import Presentation
from pptx.util import Inches, Pt

prs = Presentation()
slide = prs.slides.add_slide(prs.slide_layouts[0])
title = slide.shapes.title
title.text = "عنوان"
prs.save('output.pptx')
```

---

## ۳. Slidev (برای ارائه‌های وب)

### نصب
```bash
npm init slidev@latest
```

### استفاده
```markdown
---
theme: default
---

# عنوان اسلاید

محتوای اسلاید

---

# اسلاید دوم

- نکته ۱
- نکته ۲
```

---

## تنظیمات فونت فارسی

### نصب فونت Vazirmatn
```bash
# لینوکس/مک
bash scripts/install_fonts.sh

# یا دستی
cp assets/fonts/Vazirmatn-*.ttf ~/.fonts/
fc-cache -fv
```

### تنظیم در کد
```javascript
const FONT = 'Vazirmatn';

// در هر متن
slide.addText('متن فارسی', {
  fontFace: FONT,
  rtlMode: true,
  align: 'right'
});
```

---

## الگوی رنگ پیشنهادی

### پالت اصلی پروژه
```javascript
const NAVY = '1F3A5F';   // آبی تیره - عنوان‌ها
const ACC = '0E7C7B';    // سبزآبی - تأکیدها
const INK = '333333';    // خاکستری تیره - متن اصلی
const MUT = '6B7280';    // خاکستری - متن فرعی
const LIGHT = 'F2F4F7';  // خاکستری روشن - پس‌زمینه کارت
const WHT = 'FFFFFF';    // سفید - پس‌زمینه اصلی
const GOLD = 'C9A227';   // طلایی - تأکید ویژه
```

---

## نکات مهم

### RTL (راست‌به‌چپ)
```javascript
// همیشه برای متن فارسی
{
  rtlMode: true,
  align: 'right'
}

// تشخیص خودکار زبان
const isFa = t => /[\u0600-\u06FF]/.test(t);
const dir = t => isFa(t) 
  ? { rtlMode: true, align: 'right' } 
  : { rtlMode: false, align: 'left' };
```

### شماره صفحه
```javascript
// افزودن شماره صفحه به همه اسلایدها
p.slides.forEach((s, i) => {
  if (i === 0) return; // skip cover
  s.addText(`${i+1} از ${p.slides.length}`, {
    x: 0.5, y: 7, w: 2, h: 0.3,
    fontSize: 10, color: MUT
  });
});
```

### Speaker Notes
```javascript
// افزودن یادداشت سخنران
slide.addNotes('متن یادداشت برای سخنران');
```

---

## منابع
- [PptxGenJS Documentation](https://gitbrent.github.io/PptxGenJS/)
- [python-pptx Documentation](https://python-pptx.readthedocs.io/)
- [Slidev Documentation](https://sli.dev/)