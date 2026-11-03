/**
 * وارد کردن سؤالات به Google Sheet از طریق Apps Script
 * 
 * نحوه استفاده:
 *   node import-questions.mjs workshop-1-questions.json
 * 
 * پیش‌نیاز: URL Web App در localStorage یا env
 */

import { readFileSync } from 'node:fs';

const INPUT = process.argv[2];
if (!INPUT) {
  console.error('استفاده: node import-questions.mjs <questions.json>');
  process.exit(1);
}

const rawData = JSON.parse(readFileSync(INPUT, 'utf8'));
const scriptUrl = process.env.WS_SCRIPT_URL || readFileSync('.script-url', 'utf8').trim();

if (!scriptUrl) {
  console.error('لطفاً WS_SCRIPT_URL را تنظیم کنید یا فایل .script-url بسازید');
  process.exit(1);
}

const isSurveyFile = rawData.questions && !rawData.sections;
const data = isSurveyFile ? { ...rawData, questions: [] } : rawData;

const API = {
  async get(action, params = {}) {
    const url = new URL(scriptUrl);
    url.searchParams.set('action', action);
    for (const [key, value] of Object.entries(params)) {
      if (value !== undefined && value !== null) {
        url.searchParams.set(key, value);
      }
    }
    const resp = await fetch(url.toString());
    const result = await resp.json();
    if (!result.ok) throw new Error(result.error);
    return result.data;
  },
  
  async post(action, body) {
    const url = new URL(scriptUrl);
    url.searchParams.set('action', action);
    const resp = await fetch(url.toString(), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });
    const result = await resp.json();
    if (!result.ok) throw new Error(result.error);
    return result.data;
  }
};

async function main() {
  console.log(`📦 ${data.workshop || data.surveyTitle}`);
  console.log('');

  console.log('🔌 بررسی اتصال...');
  const config = await API.get('config');
  console.log(`   ✓ متصل به: ${config.spreadsheetName}`);
  console.log('');

  if (data.sections) {
    console.log(`📋 بروزرسانی بخش‌ها (${data.sections.length})...`);
    for (const section of data.sections) {
      await API.post('add-section', {
        id: section.id,
        session: section.session,
        order: section.order,
        title: section.title
      });
    }
    console.log(`   ✓ ${data.sections.length} بخش`);
    console.log('');

    console.log('❓ اضافه کردن سؤالات...');
    let added = 0;
    for (const section of data.sections) {
      const questions = (data.questions || []).filter(q => q.sectionId === section.id);
      if (questions.length === 0) continue;
      
      const result = await API.post('add-questions', {
        sectionId: section.id,
        questions: questions.map(q => ({
          id: q.id,
          text: q.text,
          type: q.type || 'text',
          options: q.options || []
        }))
      });
      added += result.added;
      console.log(`   ✓ ${section.id}: ${questions.length} سؤال`);
    }
    console.log(`   جمع: ${added} سؤال اضافه شد`);
    console.log('');
  }

  const surveyQuestions = data.survey || data.questions || [];
  if (surveyQuestions.length) {
    console.log(`📊 اضافه کردن سؤالات نظرسنجی (${surveyQuestions.length})...`);
    for (const q of surveyQuestions) {
      await API.post('add-survey-question', q);
    }
    console.log(`   ✓ ${surveyQuestions.length} سؤال نظرسنجی`);
    console.log('');
  }

  console.log('✅ تمام! حالا در پنل ادمین بخش‌ها و نظرسنجی را فعال کنید.');
}

main().catch(err => {
  console.error('❌ خطا:', err.message);
  process.exit(1);
});
