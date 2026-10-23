// ============================================================
//  چکِ برخورد چیدمان (overflow / footer collision) برای دک‌های self-contained
//  سازنده: workshops/lib/deck.mjs (section.slide + .cfoot + show(n))
//  استفاده: node qa_overflow.cjs <deck.html> [viewport=1280x720]
//  نیاز: playwright (npm i playwright) — اگر chromium همراه playwright
//        نصب نیست، خودبه‌خود از /usr/bin/chromium-browser استفاده می‌شود.
//  خروجی: JSON { total, issues: [...] } — issues خالی یعنی بدون مشکل.
//  خروجی: کد خروجی ۱ اگر problemی پیدا شد، وگرنه ۰.
// ============================================================
const path = require('path');
const { chromium } = require('playwright');

(async () => {
  const file = process.argv[2];
  if (!file) { console.error('usage: node qa_overflow.cjs <deck.html> [viewport=1280x720]'); process.exit(2); }
  const [vw, vh] = (process.argv[3] || '1280x720').split('x').map(Number);

  let browser;
  try {
    browser = await chromium.launch({ args: ['--no-sandbox'] });
  } catch {
    browser = await chromium.launch({ executablePath: '/usr/bin/chromium-browser', args: ['--no-sandbox'] });
  }
  const page = await browser.newPage({ viewport: { width: vw, height: vh } });
  await page.goto('file://' + path.resolve(file));
  await page.waitForTimeout(600); // استقرار فونت و انیمیشن

  const res = await page.evaluate(async () => {
    const sleep = ms => new Promise(r => setTimeout(r, ms));
    const secs = [...document.querySelectorAll('section.slide')];
    const out = [];
    for (let i = 0; i < secs.length; i++) {
      show(i + 1);
      await sleep(250);
      const s = secs[i];
      const sr = s.getBoundingClientRect();
      const foot = s.querySelector('.cfoot');
      const footTop = foot ? foot.getBoundingClientRect().top - sr.top : Infinity;
      let deepest = 0;
      s.querySelectorAll('*').forEach(el => {
        if (foot && (el === foot || foot.contains(el))) return;
        const r = el.getBoundingClientRect();
        if (r.bottom > deepest) deepest = r.bottom;
      });
      out.push({
        slide: i + 1,
        deepestBelowViewport: Math.round(deepest - sr.bottom), // >0 => بریده‌شده
        gapToFooter: Math.round(footTop - deepest),           // <8 => برخورد با فوتر
      });
    }
    return { total: secs.length, issues: out.filter(d => d.deepestBelowViewport > 0 || d.gapToFooter < 8) };
  });

  console.log(JSON.stringify(res));
  await browser.close();
  process.exit(res.issues.length ? 1 : 0);
})().catch(e => { console.error(e); process.exit(2); });
