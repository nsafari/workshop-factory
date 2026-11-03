# زیرساخت مدیریت کارگاه

سیستم مدیریت تعامل برای کارگاه‌های آموزشی با ذخیره‌سازی در Google Sheets.

## معماری

```
┌─────────────────────────────────────────────────────┐
│                   Frontend (GitHub Pages)            │
│                                                     │
│  ┌──────────┐  ┌──────────────┐  ┌──────────────┐  │
│  │  Admin   │  │ Participant  │  │   Survey     │  │
│  │(ارائه‌دهنده)│  │(شرکت‌کننده) │  │(نظرسنجی پایانی)│ │
│  └──────────┘  └──────────────┘  └──────────────┘  │
│         │              │                │           │
│         └──────────────┴────────────────┘           │
│                          │ fetch/POST               │
└──────────────────────────┼──────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────┐
│            Google Apps Script Web App               │
│                                                     │
│  • دریافت درخواست‌ها از فرانت‌اند                    │
│  • خواندن/نوشتن در Google Sheets                    │
│  • مدیریت وضعیت بخش‌ها و سؤالات                      │
│                                                     │
│  Execute as: User deploying (ارائه‌دهنده)            │
│  Who has access: Anyone (بدون لاگین برای شرکت‌کننده) │
└──────────────────────────┬──────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────┐
│                 Google Sheets                        │
│                                                     │
│  ┌──────────┬──────────┬───────────┬──────────────┐ │
│  │ config   │ sections │ questions │ responses    │ │
│  ├──────────┼──────────┼───────────┼──────────────┤ │
│  │ survey   │ survey_  │           │              │ │
│  │          │ responses│           │              │ │
│  └──────────┴──────────┴───────────┴──────────────┘ │
└─────────────────────────────────────────────────────┘
```

## پیش‌نیازها

- حساب Google (برای ارائه‌دهنده)
- GitHub account (برای استقرار فرانت‌اند - اختیاری)
- Node.js 16+ (برای اجرای اسکریپت تولید سؤالات)

## راه‌اندازی (۳ مرحله)

### مرحله ۱: ایجاد Google Sheets و Apps Script

1. یک Google Sheets جدید ایجاد کنید (نام: `کارگاه-X-تعاملات`)
2. از منو: **Extensions → Apps Script**
3. کد `apps-script/Code.gs` را در ویرایشگر paste کنید
4. فایل `apps-script/appsscript.json` را به پروژه اضافه کنید (از طریق ⚙️ Project Settings → نمایش فایل پیکربندی)
5. **Deploy → New deployment → Web app**:
   - Execute as: **User deploying** (خودتان)
   - Who has access: **Anyone** (همه)
6. Authorize و URL Web App را کپی کنید

### مرحله ۲: تولید سؤالات از محتوای کارگاه

```bash
cd workshop-infra
node scripts/generate-questions.mjs ../workshops/workshop-1-ai-concepts.md
```

خروجی: فایل JSON با سؤالات هر بخش.

### مرحله ۳: استقرار فرانت‌اند

```bash
# گزینه ۱: GitHub Pages
# محتوای پوشه frontend/ را در شاخه gh-pages یا main پوشه docs/ کپی کنید

# گزینه ۲: Netlify Drop
# پوشه frontend/ را به https://app.netlify.com/drop بکشید

# گزینه ۳: هر static hosting دیگری
```

## نحوه استفاده

### برای ارائه‌دهنده:

1. در اولین ورود، URL Web App را در پنل ادمین وارد کنید
2. لینک شرکت‌کننده را کپی و در اختیار حضور قرار دهید
3. حین کارگاه، هر بخش را بعد از اتمامش **فعال** کنید
4. پاسخ‌های ناشناس را در پنل مشاهده کنید
5. در پایان کارگاه، لینک نظرسنجی را بفرستید

### برای شرکت‌کننده:

1. لینک دریافتی را باز کنید
2. بعد از باز شدن هر بخش، سؤالات را پاسخ دهید
4. بعد از پاسخ به همه سؤالات، منتظر باز شدن بخش بعد بمانید
5. در پایان، نظرسنجی پایانی را تکمیل کنید

## ساختار فایل‌ها

```
workshop-infra/
├── README.md                           # این فایل
├── apps-script/
│   ├── Code.gs                         # بک‌اند Google Apps Script
│   └── appsscript.json                 # پیکربندی پروژه
├── scripts/
│   └── generate-questions.mjs          # تولید سؤال از markdown
└── frontend/
    ├── config.js                       # تنظیمات و API client (مشترک)
    ├── index.html                      # پنل ادمین (ارائه‌دهنده)
    ├── participant.html               # صفحه شرکت‌کننده
    └── survey.html                     # نظرسنجی پایانی
```

## API Endpoints

Web App این عملیات را اجرا می‌کند:

| Action | Method | پارامترها | شرح |
|--------|--------|-----------|------|
| `config` | GET | — | دریافت پیکربندی |
| `sections` | GET | — | لیست همه بخش‌ها |
| `questions` | GET | `sectionId?` | سؤالات (فیلتر اختیاری) |
| `responses` | GET | `sectionId?` | پاسخ‌ها |
| `survey-questions` | GET | — | سؤالات نظرسنجی |
| `init` | POST | `title`, `sections`, `questions` | راه‌اندازی اولیه |
| `toggle-section` | POST | `sectionId`, `active` | فعال/غیرفعال کردن |
| `submit-answer` | POST | `sectionId`, `questionId`, `answer` | ارسال پاسخ |
| `submit-survey` | POST | `answers` | ارسال نظرسنجی |
| `add-questions` | POST | `sectionId`, `questions[]` | اضافه کردن سؤال |
| `reset-section` | POST | `sectionId` | پاک کردن پاسخ‌های یک بخش |

## توسعه

### اضافه کردن کارگاه جدید:

```bash
node scripts/generate-questions.mjs ../workshops/workshop-2-agents.md
```

سپس خروجی JSON را در پنل ادمین import کنید یا مستقیماً در Google Sheets وارد کنید.

### سؤال‌های دستی:

در فایل `generate-questions.mjs` الگوهای عنوان را با سؤالات جدید اضافه کنید.

## امنیت

- شرکت‌کنندگان بدون لاگین — دسترسی فقط به سؤالات بخش‌های فعال
- پاسخ‌ها ناشناس (بدون نام، بدون IP)
- ارائه‌دهنده باید Google OAuth برای ادیت داشته باشد (از طریق Apps Script deploy)
- پاسخ‌های قبلی با کلیک روی "toggle off/on" پاک نمی‌شوند (ذخیره در شیت)

## محدودیت

- Google Sheets API: 300 درخواست در دقیقه به ازای هر کاربر
- Apps Script: 6 دقیقه اجرا در هر درخواست
- حداکثر 5 میلیون سلول در هر شیت Google
