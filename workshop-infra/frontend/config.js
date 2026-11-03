/**
 * تنظیمات مشترک زیرساخت کارگاه
 * - کلینت API برای ارتباط با Google Apps Script Web App
 * - ابزارهای مشترک UI
 * - مدیریت پیکربندی
 */

// ============================================================
//  پیکربندی
// ============================================================
const WorkshopConfig = {
  scriptUrl: '',
  sid: '',
  
  init() {
    if (window.WS_RUNTIME_CONFIG?.scriptUrl) {
      this.scriptUrl = window.WS_RUNTIME_CONFIG.scriptUrl;
    } else {
      this.scriptUrl = localStorage.getItem('ws_script_url') || '';
    }
    
    const params = new URLSearchParams(window.location.search);
    this.sid = params.get('sid') || '';
    
    const urlScript = params.get('scriptUrl');
    if (urlScript) {
      this.scriptUrl = urlScript;
    }
  },
  
  saveScriptUrl(url) {
    this.scriptUrl = url.trim();
    localStorage.setItem('ws_script_url', this.scriptUrl);
  },
  
  isConfigured() {
    return this.scriptUrl.length > 0;
  }
};

// ============================================================
//  API Client — ارتباط با Google Apps Script Web App
// ============================================================
const API = {
  async get(action, params = {}) {
    const url = new URL(WorkshopConfig.scriptUrl);
    url.searchParams.set('action', action);
    for (const [key, value] of Object.entries(params)) {
      if (value !== undefined && value !== null) {
        url.searchParams.set(key, value);
      }
    }
    
    const resp = await fetch(url.toString());
    if (!resp.ok) throw new Error('خطای شبکه: ' + resp.status);
    
    const data = await resp.json();
    if (!data.ok) throw new Error(data.error || 'خطای نامشخص');
    return data.data;
  },
  
  async post(action, body) {
    const url = new URL(WorkshopConfig.scriptUrl);
    url.searchParams.set('action', action);
    
    const resp = await fetch(url.toString(), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });
    
    if (!resp.ok) throw new Error('خطای شبکه: ' + resp.status);
    
    const data = await resp.json();
    if (!data.ok) throw new Error(data.error || 'خطای نامشخص');
    return data.data;
  }
};

// ============================================================
//  UI Utilities
// ============================================================
const UI = {
  showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;
    document.body.appendChild(toast);
    
    setTimeout(() => toast.classList.add('show'), 10);
    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => toast.remove(), 300);
    }, 3000);
  },
  
  showLoading(el) {
    el.innerHTML = '<div class="loading-spinner"><div class="spinner"></div><p>در حال بارگذاری...</p></div>';
  },
  
  escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  },
  
  formatDate(isoString) {
    if (!isoString) return '';
    try {
      const d = new Date(isoString);
      return d.toLocaleDateString('fa-IR') + ' ' + d.toLocaleTimeString('fa-IR', { hour: '2-digit', minute: '2-digit' });
    } catch {
      return isoString;
    }
  },
  
  // شمارنده بصری پاسخ‌ها
  badge(count) {
    return `<span class="badge">${count}</span>`;
  }
};

// ============================================================
//  localStorage helpers — دنبال‌کردن پاسخ‌های شرکت‌کننده
// ============================================================
const ProgressStore = {
  KEY_PREFIX: 'ws_progress_',
  
  key(sid) {
    return this.KEY_PREFIX + (sid || 'default');
  },
  
  getAnsweredQuestions(sid) {
    const data = localStorage.getItem(this.key(sid));
    return data ? JSON.parse(data) : {};
  },
  
  markAnswered(sid, questionId) {
    const answered = this.getAnsweredQuestions(sid);
    answered[questionId] = new Date().toISOString();
    localStorage.setItem(this.key(sid), JSON.stringify(answered));
  },
  
  getAnsweredCount(sid) {
    return Object.keys(this.getAnsweredQuestions(sid)).length;
  },
  
  clear(sid) {
    localStorage.removeItem(this.key(sid));
  }
};

// راه‌اندازی خودکار
WorkshopConfig.init();
