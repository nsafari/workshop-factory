/**
 * بک‌اند زیرساخت کارگاه
 * Google Apps Script — به‌عنوان Web App استقرار یابد
 * 
 * نقش‌ها:
 * - ارائه‌کننده: اسکریپت با حساب او اجرا می‌شود (Execute as: User)
 * - شرکت‌کننده: دسترسی ناشناس (Who has access: Anyone)
 * 
 * شیت باید قبل از اجرا ایجاد و با همین پروژه Apps Script پیوند داده شود.
 * ستون‌ها با اولین فراخوانی getConfig خودکار ساخته می‌شوند.
 */

// ============================================================
//  نقشه‌ی صفحات (Sheets)
// ============================================================
const SHEET_CONFIG = 'config';
const SHEET_SECTIONS = 'sections';
const SHEET_QUESTIONS = 'questions';
const SHEET_RESPONSES = 'responses';
const SHEET_SURVEY = 'survey';

// ============================================================
//  سرور اصلی — درخواست‌های GET و POST
// ============================================================
function doGet(e) {
  return handleRequest('GET', e);
}

function doPost(e) {
  return handleRequest('POST', e);
}

function handleRequest(method, e) {
  const res = ContentService.createTextOutput();
  res.setMimeType(ContentService.MimeType.JSON);
  
  try {
    const action = (e.parameter.action || '').toLowerCase();
    let result;
    
    if (method === 'GET') {
      result = handleGet(action, e.parameter);
    } else {
      const body = JSON.parse(e.postData.contents || '{}');
      result = handlePost(action, body, e.parameter);
    }
    
    res.setContent(JSON.stringify({ ok: true, data: result }));
  } catch (err) {
    res.setContent(JSON.stringify({ ok: false, error: err.message }));
  }
  
  return res;
}

// ============================================================
//  درخواست‌های GET
// ============================================================
function handleGet(action, params) {
  switch (action) {
    case 'config':
      return getConfig();
    case 'sections':
      return getSections();
    case 'active-sections':
      return getActiveSections();
    case 'questions':
      return getQuestions(params.sectionId);
    case 'responses':
      return getResponses(params.sectionId);
    case 'survey-questions':
      return getSurveyQuestions();
    case 'survey-responses':
      return getSurveyResponses();
    case 'survey-status':
      return getSurveyStatus();
    case 'status':
      return getStatus();
    default:
      throw new Error('عملیة نامعتبر: ' + action);
  }
}

function getConfig() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = getOrCreateSheet(ss, SHEET_CONFIG, ['key', 'value']);
  
  const config = {};
  const data = sheet.getDataRange().getValues();
  for (let i = 1; i < data.length; i++) {
    if (data[i][0]) config[data[i][0]] = data[i][1];
  }
  
  return {
    spreadsheetId: ss.getId(),
    spreadsheetName: ss.getName(),
    config: config,
    initialized: sheet.getLastRow() > 1
  };
}

function getSections() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = getOrCreateSheet(ss, SHEET_SECTIONS, ['id', 'session', 'order', 'title', 'active', 'createdAt']);
  
  const sections = [];
  const data = sheet.getDataRange().getValues();
  for (let i = 1; i < data.length; i) {
    if (data[i][0]) {
      sections.push({
        id: data[i][0],
        session: data[i][1],
        order: data[i][2],
        title: data[i][3],
        active: data[i][4] === true || data[i][4] === 'true',
        createdAt: data[i][5]
      });
    }
  }
  
  sections.sort((a, b) => a.session - b.session || a.order - b.order);
  return sections;
}

function getActiveSections() {
  return getSections().filter(s => s.active);
}

function getQuestions(sectionId) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = getOrCreateSheet(ss, SHEET_QUESTIONS, ['id', 'sectionId', 'order', 'text', 'type', 'options']);
  
  const questions = [];
  const data = sheet.getDataRange().getValues();
  for (let i = 1; i < data.length; i++) {
    if (!data[i][0]) continue;
    if (sectionId && data[i][1] !== sectionId) continue;
    
    questions.push({
      id: data[i][0],
      sectionId: data[i][1],
      order: data[i][2],
      text: data[i][3],
      type: data[i][4] || 'text',
      options: data[i][5] ? String(data[i][5]).split('|') : []
    });
  }
  
  questions.sort((a, b) => {
    if (a.sectionId !== b.sectionId) return a.sectionId.localeCompare(b.sectionId);
    return a.order - b.order;
  });
  
  return questions;
}

function getResponses(sectionId) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName(SHEET_RESPONSES);
  if (!sheet) return [];
  
  const responses = [];
  const data = sheet.getDataRange().getValues();
  for (let i = 1; i < data.length; i++) {
    if (!data[i][0]) continue;
    if (sectionId && data[i][1] !== sectionId) continue;
    
    responses.push({
      responseId: data[i][0],
      sectionId: data[i][1],
      questionId: data[i][2],
      questionText: data[i][3],
      answer: data[i][4],
      timestamp: data[i][5]
    });
  }
  
  return responses;
}

function getSurveyQuestions() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName(SHEET_SURVEY);
  if (!sheet) return [];
  
  const header = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
  const qCol = header.indexOf('questionId');
  if (qCol === -1) return [];
  
  const questions = [];
  const data = sheet.getDataRange().getValues();
  for (let i = 1; i < data.length; i++) {
    if (!data[i][qCol]) continue;
    const optCol = header.indexOf('options');
    questions.push({
      id: data[i][qCol],
      order: data[i][header.indexOf('order')] || i,
      text: data[i][header.indexOf('text')] || '',
      type: data[i][header.indexOf('type')] || 'text',
      options: optCol >= 0 && data[i][optCol] ? String(data[i][optCol]).split('|') : []
    });
  }
  
  return questions;
}

function getSurveyResponses() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName(SHEET_SURVEY + '_responses');
  if (!sheet) return [];
  
  const data = sheet.getDataRange().getValues();
  const responses = [];
  for (let i = 1; i < data.length; i++) {
    if (!data[i][0]) continue;
    responses.push({
      responseId: data[i][0],
      answers: data[i][1] ? JSON.parse(data[i][1]) : {},
      timestamp: data[i][2]
    });
  }
  
  return responses;
}

function getStatus() {
  const sections = getSections();
  const active = sections.filter(s => s.length);
  
  return {
    totalSections: sections.length,
    activeSections: sections.filter(s => s.active).length,
    totalResponses: getAllResponsesCount(),
    totalSurveyResponses: getSurveyResponsesCount()
  };
}

function getAllResponsesCount() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName(SHEET_RESPONSES);
  if (!sheet) return 0;
  return sheet.getLastRow() - 1;
}

function getSurveyResponsesCount() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName(SHEET_SURVEY + '_responses');
  if (!sheet) return 0;
  return sheet.getLastRow() - 1;
}

// ============================================================
//  درخواست‌های POST
// ============================================================
function handlePost(action, body, params) {
  switch (action) {
    case 'init':
      return initWorkshop(body);
    case 'toggle-section':
      return toggleSection(body.sectionId, body.active);
    case 'submit-answer':
      return submitAnswer(body);
    case 'submit-survey':
      return submitSurvey(body);
    case 'add-questions':
      return addQuestions(body.sectionId, body.questions);
    case 'add-section':
      return addSection(body);
    case 'add-survey-question':
      return addSurveyQuestion(body);
    case 'toggle-survey':
      return toggleSurvey(body.active);
    case 'reset-section':
      return resetSection(body.sectionId);
    default:
      throw new Error('عملیة نامعتبر: ' + action);
  }
}

function initWorkshop(body) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = getOrCreateSheet(ss, SHEET_CONFIG, ['key', 'value']);
  
  const configEntries = [
    ['workshopTitle', body.title || 'کارگاه'],
    ['workshopId', body.workshopId || ''],
    ['initialized', 'true'],
    ['initializedAt', new Date().toISOString()]
  ];
  
  // اگر config قبلاً دیتا داشت، فقط initialized را آپدیت کن
  if (sheet.getLastRow() > 1) {
    for (const [key, value] of configEntries) {
      updateConfig(sheet, key, value);
    }
  } else {
    const range = sheet.getRange(1, 1, configEntries.length, 2);
    range.setValues(configEntries);
  }
  
  return { initialized: true };
}

function toggleSection(sectionId, active) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName(SHEET_SECTIONS);
  if (!sheet) throw new Error('شیت sections یافت نشد');
  
  const data = sheet.getDataRange().getValues();
  for (let i = 1; i < data.length; i++) {
    if (data[i][0] === sectionId) {
      sheet.getRange(i + 1, 5).setValue(active ? 'true' : 'false');
      sheet.getRange(i + 1, 6).setValue(new Date().toISOString());
      return { sectionId, active };
    }
  }
  
  throw new Error('بخش یافت نشد: ' + sectionId);
}

function submitAnswer(body) {
  if (!body.sectionId || !body.questionId || !body.answer) {
    throw new Error('پارامترها ناقص');
  }
  
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = getOrCreateSheet(ss, SHEET_RESPONSES, [
    'responseId', 'sectionId', 'questionId', 'questionText', 'answer', 'timestamp'
  ]);
  
  const responseId = 'r_' + Utilities.getUuid().slice(0, 8);
  const timestamp = new Date().toISOString();
  
  sheet.appendRow([
    responseId,
    body.sectionId,
    body.questionId,
    body.questionText || '',
    String(body.answer).slice(0, 2000),
    timestamp
  ]);
  
  return { responseId, timestamp };
}

function submitSurvey(body) {
  if (!body.answers) {
    throw new Error('پاسخ‌ها ناقص');
  }
  
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = getOrCreateSheet(ss, SHEET_SURVEY + '_responses', [
    'responseId', 'answers', 'timestamp'
  ]);
  
  const responseId = 's_' + Utilities.getUuid().slice(0, 8);
  const timestamp = new Date().toISOString();
  
  sheet.appendRow([
    responseId,
    JSON.stringify(body.answers),
    timestamp
  ]);
  
  return { responseId, timestamp };
}

function addQuestions(sectionId, questions) {
  if (!sectionId || !questions || !questions.length) {
    throw new Error('پارامترها ناقص');
  }
  
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = getOrCreateSheet(ss, SHEET_QUESTIONS, ['id', 'sectionId', 'order', 'text', 'type', 'options']);
  
  const existingIds = new Set();
  const existingData = sheet.getDataRange().getValues();
  for (let i = 1; i < existingData.length; i++) {
    if (existingData[i][1] === sectionId) {
      existingIds.add(existingData[i][0]);
    }
  }
  
  let added = 0;
  for (const q of questions) {
    const qId = q.id || ('q_' + Utilities.getUuid().slice(0, 8));
    if (existingIds.has(qId)) continue;
    
    sheet.appendRow([
      qId,
      sectionId,
      q.order || 0,
      q.text,
      q.type || 'text',
      (q.options || []).join('|')
    ]);
    added++;
  }
  
  return { added, total: questions.length };
}

function resetSection(sectionId) {
  if (!sectionId) throw new Error('شناسه بخش لازم است');
  
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName(SHEET_RESPONSES);
  if (!sheet) return { removed: 0 };
  
  const data = sheet.getDataRange().getValues();
  let removed = 0;
  
  // از آخر به اول حذف کردن (برای حفظ ایندکس)
  for (let i = data.length - 1; i >= 1; i--) {
    if (data[i][1] === sectionId) {
      sheet.deleteRow(i + 1);
      removed++;
    }
  }
  
  return { removed };
}

function addSection(body) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = getOrCreateSheet(ss, SHEET_SECTIONS, ['id', 'session', 'order', 'title', 'active', 'createdAt']);
  
  const existingIds = new Set();
  const data = sheet.getDataRange().getValues();
  for (let i = 1; i < data.length; i++) {
    if (data[i][0]) existingIds.add(data[i][0]);
  }
  
  if (existingIds.has(body.id)) return { skipped: true };
  
  sheet.appendRow([
    body.id,
    body.session || 1,
    body.order || 0,
    body.title || '',
    'false',
    new Date().toISOString()
  ]);
  
  return { added: true, id: body.id };
}

function addSurveyQuestion(body) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = getOrCreateSheet(ss, SHEET_SURVEY, ['questionId', 'order', 'text', 'type', 'options']);
  
  const data = sheet.getDataRange().getValues();
  for (let i = 1; i < data.length; i++) {
    if (data[i][0] === body.id) return { skipped: true };
  }
  
  sheet.appendRow([
    body.id,
    body.order || 0,
    body.text || '',
    body.type || 'text',
    (body.options || []).join('|')
  ]);
  
  return { added: true, id: body.id };
}

function toggleSurvey(active) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = getOrCreateSheet(ss, SHEET_CONFIG, ['key', 'value']);
  updateConfig(sheet, 'surveyActive', active ? 'true' : 'false');
  updateConfig(sheet, 'surveyActiveAt', new Date().toISOString());
  return { active };
}

function getSurveyStatus() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName(SHEET_CONFIG);
  if (!sheet) return { active: false };
  
  const data = sheet.getDataRange().getValues();
  for (let i = 1; i < data.length; i++) {
    if (data[i][0] === 'surveyActive') {
      return { active: data[i][1] === 'true' || data[i][1] === true };
    }
  }
  return { active: false };
}

// ============================================================
//  توابع کمکی
// ============================================================
function getOrCreateSheet(ss, name, headers) {
  let sheet = ss.getSheetByName(name);
  if (!sheet) {
    sheet = ss.insertSheet(name);
    sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
    sheet.getRange(1, 1, 1, headers.length).setFontWeight('bold');
  }
  return sheet;
}

function updateConfig(sheet, key, value) {
  const data = sheet.getDataRange().getValues();
  for (let i = 1; i < data.length; i++) {
    if (data[i][0] === key) {
      sheet.getRange(i + 1, 2).setValue(value);
      return;
    }
  }
  sheet.appendRow([key, value]);
}
