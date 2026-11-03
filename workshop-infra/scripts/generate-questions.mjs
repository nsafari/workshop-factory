/**
 * تولید سؤالات بخش‌های کارگاه از روی فایل markdown
 * 
 * نحوه اجرا:
 *   node scripts/generate-questions.mjs ../workshops/workshop-1-ai-concepts.md
 * 
 * خروجی: فایل JSON با سؤالات هر بخش + سؤالات نظرسنجی پایانی
 * ارائه‌کننده bbe‌تواند این فایل را در پنل ادمین import کند
 * یا مستقیماً در گوگل شیت کپی کند.
 */

import { readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';

const INPUT = process.argv[2];
if (!INPUT) {
  console.error('استفاده: node generate-questions.mjs <workshop-file.md>');
  process.exit(1);
}

const md = readFileSync(INPUT, 'utf8');
const workshopName = path.basename(INPUT, '.md');

// ============================================================
//  استخراج بخش‌ها از markdown
// ============================================================
// تبدیل ارقام فارسی و عربی به انگلیسی
function normalizeDigits(str) {
  const fa = '۰۱۲۳۴۵۶۷۸۹';
  const ar = '٠١٢٣٤٥٦٧٨٩';
  let result = str;
  for (let d = 0; d <= 9; d++) {
    result = result.split(fa[d]).join(d).split(ar[d]).join(d);
  }
  return result;
}

function extractSections(markdown) {
  const lines = markdown.split('\n');
  const sections = [];
  let currentSection = null;
  let sectionContent = [];
  let currentSession = 0;
  let sectionCounter = 0;
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const normalized = normalizeDigits(line);
    
    // شناسایی جلسه (### جلسهٔ ۱ یا ### جلسه ۱)
    const sessionMatch = normalized.match(/^### جلسه[‌\sٔ]*(\d+)/);
    if (sessionMatch) {
      if (currentSection) {
        currentSection.content = sectionContent.join('\n');
        sections.push(currentSection);
      }
      currentSession = parseInt(sessionMatch[1]);
      currentSection = null;
      sectionContent = [];
      continue;
    }
    
    // شناسایی بخش (فرمت ۱: #### بخش ۱: ...)
    const sectionMatchH4 = normalized.match(/^#### بخش[‌\s]*(\d+)[:\s]*(.+?)$/);
    if (sectionMatchH4) {
      if (currentSection) {
        currentSection.content = sectionContent.join('\n');
        sections.push(currentSection);
      }
      sectionCounter++;
      currentSection = {
        id: `s${currentSession}_sec${sectionMatchH4[1]}`,
        session: currentSession,
        order: parseInt(sectionMatchH4[1]),
        title: sectionMatchH4[2].replace(/\*\*/g, '').trim(),
        slides: '',
        content: ''
      };
      sectionContent = [];
      continue;
    }
    
    // شناسایی بخش (فرمت ۲: ### بخش ۱: ...)
    const sectionMatchH3 = normalized.match(/^### بخش[‌\s]*(\d+)[:\s]*(.+?)$/);
    if (sectionMatchH3) {
      if (currentSection) {
        currentSection.content = sectionContent.join('\n');
        sections.push(currentSection);
      }
      sectionCounter++;
      currentSection = {
        id: `sec${sectionMatchH3[1]}`,
        session: 1,
        order: parseInt(sectionMatchH3[1]),
        title: sectionMatchH3[2].replace(/\*\*/g, '').trim(),
        slides: '',
        content: ''
      };
      sectionContent = [];
      continue;
    }
    
    // استخراج اسلایدهای مرتبط
    const slideMatch = line.match(/اسلاید[‌\s]*(\d+)/);
    if (slideMatch && currentSection) {
      currentSection.slides += (currentSection.slides ? ', ' : '') + slideMatch[1];
    }
    
    if (currentSection) {
      sectionContent.push(line);
    }
  }
  
  if (currentSection) {
    currentSection.content = sectionContent.join('\n');
    sections.push(currentSection);
  }
  
  return sections;
}

// ============================================================
//  تولید سؤالات بر اساس محتوای بخش
// ============================================================
function generateQuestions(section) {
  const title = section.title.toLowerCase();
  const content = section.content.toLowerCase();
  const fullText = title + '\n' + content;
  const questions = [];
  let order = 1;
  
  // --- بررسی کلمات کلیدی ---
  const has = (word) => fullText.includes(word);
  const q = (text, type = 'text') => {
    questions.push({
      id: `${section.id}_q${order++}`,
      sectionId: section.id,
      order: order - 1,
      text,
      type
    });
  };
  
  // ============================================================
  //  نقشه‌ی تطبیق عنوان بخش → سؤال‌ها
  // ============================================================
  // الگوها به ترتیب اولویت (اولین تطبیق برنده است)
  const titlePatterns = [
    // --- بازی‌ها (خاص‌ترین) ---
    { match: ['ردیفی از داور'], qs: [
      'چرا نورون‌های مصنوعی «حرف نمی‌زنند»؟ شباهت و تفاوت با مغز واقعی چیست؟'
    ]},
    { match: ['قیمت خانه'], qs: [
      'الگویی که کشف کردید چطور به مدل کمک می‌کند تا جواب درست بدهد؟',
      'اگر داده‌های بیشتری دادیم، جواب چطور تغییر می‌کرد؟ چرا؟'
    ]},
    { match: ['آسمان'], qs: [
      'چرا تغییر جمله، احتمال کلمه بعدی را تغییر می‌دهد؟ چه ربطی به کار مدل دارد؟',
      'کدوم کلمه را خودتان تکمیل می‌کردید؟ چرا همان را انتخاب کردید؟'
    ]},
    { match: ['بازی', 'او'], qs: [
      'در جمله «علی به بانک رفت چون او پول لازم داشت»، چرا «او» به «علی» برمی‌گردد؟ معنای این مکانیزم چیست؟'
    ]},
    { match: ['هماهنگی با اهداف', 'فعالیت درون‌کلاسی'], qs: [
      'کار روزمره‌ای که انتخاب کردید، با سه رکن چطور توصیف می‌شود؟ رکن کدام‌یک برایتان سخت‌تر بود؟',
      'از همسایه‌تان چه یاد گرفتید؟ کار او چه شباهت یا تفاوتی با شما داشت؟'
    ]},
    { match: ['یک صبح', 'سناریو'], qs: [
      'کدام بخش از این سناریو را یک جستجوی ساده می‌توانست انجام دهد؟ چرا؟',
      'خودتان یک سناریوی مشابه برای کار روزمره‌تان بنویسید.'
    ]},
    { match: ['مرور', 'جلد و مرور'], qs: [
      'از جلسه قبل چه یاد گرفتید؟ چه چیزی در ذهن شما جا انداخت؟'
    ]},
    { match: ['چک‌لیست اعتماد'], qs: [
      'از چک‌لیست اعتماد، کدام مورد برای کار شما مهم‌تر است؟ چرا؟',
      'شما مدیر مدل هستید یا مشتری؟ یک مثال واقعی بزنید.'
    ]},
    { match: ['مشتری به مدیر', 'موضع فعال'], qs: [
      'چطور از موضع فعال در کار با هوش مصنوعی استفاده می‌کنید؟ تجربه‌ای دارید؟'
    ]},
    // --- مفاهیم ---
    { match: ['چرا با چت', 'چت کردن'], qs: [
      'آیا ChatGPT می‌تواند بگوید «کار مهم امروز شما چیست»؟ چرا؟'
    ]},
    { match: ['پارامتر'], qs: [
      'پارامترها چه شباهتی به ولوم‌های یک دستگاه دارند؟ چرا تنظیم دستی آنها ممکن نیست؟'
    ]},
    { match: ['خودنظارتی', 'بدون معلم'], qs: [
      'چرا مدل بدون معلم یاد می‌گیرد؟ پاسخ در کجاست؟'
    ]},
    { match: ['داخل مدل'], qs: [
      'چرا نورون‌های مصنوعی «حرف نمی‌زنند»؟ شباهت و تفاوت با مغز واقعی چیست؟'
    ]},
    { match: ['transformer', 'مغز مدل'], qs: [
      'قیاس میزگرد: شما در یک جلسة، به حرف چه کسانی بیشتر گوش می‌دهید؟ چرا؟',
      'در جمله «علی به بانک رفت چون او پول لازم داشت»، چرا «او» به «علی» برمی‌گردد؟'
    ]},
    { match: ['llm در یک جمله'], qs: [
      'خودتان LLM را در یک جمله تعریف کنید.'
    ]},
    { match: ['تکلیف', 'جمع‌بندی', 'خلاصه'], qs: [
      'بزرگ‌ترین چیزی که امروز یاد گرفتید چه بود؟',
      'چه چیزی برایتان هنوز جادویی یا نامفهوم است؟'
    ]},
    { match: ['نقشه', 'کارگاه برای کیست'], qs: [
      'کدام نقش شبیه شماست؟ مشکل روزمره‌تان چیست؟'
    ]},
    { match: ['سه رکن دستیار', 'دستیار هوشمند چیست'], qs: [
      'چرا یک چت ساده نمی‌تواند دستیار هوشمند باشد؟ کدام رکن مهم‌تر است؟',
      'برای کار خودتان، ابزار چیست؟ مهارت چیست؟ دانش چیست؟'
    ]},
  ];
  
  // تطبیق با الگوهای عنوان
  let matched = false;
  for (const pattern of titlePatterns) {
    if (pattern.match.some(keyword => title.includes(keyword))) {
      for (const questionText of pattern.qs) {
        q(questionText);
      }
      matched = true;
      break; // فقط اولین تطبیق
    }
  }
  
  // --- آسمان و LLM (تطبیق خاص برای بخش‌های بازی) ---
  if (!matched && (title.includes('بازی'))) {
    if (has('آسمان')) {
      q('چرا تغییر جمله، احتمال کلمه بعدی را تغییر می‌دهد؟ چه ربطی به کار مدل دارد؟');
      q('کدوم کلمه را خودتان تکمیل می‌کردید؟ چرا همان را انتخاب کردید؟');
      matched = true;
    } else if (has('قیمت خانه')) {
      q('الگویی که کشف کردید چطور به مدل کمک می‌کند تا جواب درست بدهد؟');
      q('اگر داده‌های بیشتری دادیم، جواب چطور تغییر می‌کرد؟ چرا؟');
      matched = true;
    } else if (has('او')) {
      q('در جمله «علی به بانک رفت چون او پول لازم داشت»، چرا «او» به «علی» برمی‌گردد؟');
      matched = true;
    }
  }
  
  
  // --- سؤال پیش‌فرض برای هر بخش (اگر سؤال خاصی نداشت) ---
  if (questions.length === 0 && !title.includes('زمان‌بندی') && !title.includes('نکات')) {
    questions.push({
      id: `${section.id}_q1`,
      sectionId: section.id,
      order: 1,
      text: `در بخش «${section.title}»، چه چیزی برایتان جدید بود؟`,
      type: 'text'
    });
    questions.push({
      id: `${section.id}_q2`,
      sectionId: section.id,
      order: 2,
      text: `این محتوا چطور به کار روزمره‌تان مربوط می‌شود؟`,
      type: 'text'
    });
  }
  
  return questions;
}

// ============================================================
//  سؤالات نظرسنجی پایانی کارگاه
// ============================================================
function generateSurveyQuestions() {
  return [
    {
      id: 'survey_q1',
      order: 1,
      text: 'به کل این کارگاه چه امتیازی می‌دهید؟',
      type: 'rating',
      options: ['۱', '۲', '۳', '۴', '۵']
    },
    {
      id: 'survey_q2',
      order: 2,
      text: 'کدام بخش برایتان جذاب‌تر بود؟',
      type: 'text'
    },
    {
      id: 'survey_q3',
      order: 3,
      text: 'کدام بخش برایتان کاربردی‌تر بود؟',
      type: 'text'
    },
    {
      id: 'survey_q4',
      order: 4,
      text: 'آیا احساس می‌کنید هوش مصنوعی دیگر جادویی و نامفهوم نیست؟',
      type: 'choice',
      options: ['بله، خیلی', 'تا حدی', 'نه، هنوز نامفهوم است']
    },
    {
      id: 'survey_q5',
      order: 5,
      text: 'چه چیزی بیشتر از این کارگاه می‌خواستید یاد بگیرید؟',
      type: 'text'
    },
    {
      id: 'survey_q6',
      order: 6,
      text: 'پیشنهاد شما برای بهبود این کارگاه چیست؟',
      type: 'text'
    }
  ];
}

// ============================================================
//  اجرا
// ============================================================
const sections = extractSections(md);
const allQuestions = [];
const sectionsOutput = [];

for (const section of sections) {
  const questions = generateQuestions(section);
  allQuestions.push(...questions);
  
  sectionsOutput.push({
    id: section.id,
    session: section.session,
    order: section.order,
    title: section.title,
    slides: section.slides,
    questionCount: questions.length
  });
}

const surveyQuestions = generateSurveyQuestions();

const output = {
  workshop: workshopName,
  generatedAt: new Date().toISOString(),
  sections: sectionsOutput,
  questions: allQuestions,
  survey: surveyQuestions,
  summary: {
    totalSections: sectionsOutput.length,
    totalQuestions: allQuestions.length,
    totalSurveyQuestions: surveyQuestions.length
  }
};

const outPath = path.join(
  path.dirname(INPUT),
  `${workshopName}-questions.json`
);

writeFileSync(outPath, JSON.stringify(output, null, 2), 'utf8');

console.log(`✓ ${sectionsOutput.length} بخش استخراج شد`);
console.log(`✓ ${allQuestions.length} سؤال تولید شد`);
console.log(`✓ ${surveyQuestions.length} سؤال نظرسنجی`);
console.log(`✓ خروجی: ${outPath}`);
