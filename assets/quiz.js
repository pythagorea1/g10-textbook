// G10 Textbook — Quiz Engine (Vanilla JS, no external libs)
(function () {
  'use strict';

  const CATEGORIES = [
    { key: 'central_bank', icon: '🏦', name: '中央銀行・金融政策', global: 'QUIZ_QUESTIONS_CENTRAL_BANK' },
    { key: 'equity',       icon: '📈', name: '株式市場',           global: 'QUIZ_QUESTIONS_EQUITY' },
    { key: 'fx',           icon: '💵', name: '為替・通貨',         global: 'QUIZ_QUESTIONS_FX' },
    { key: 'bonds',        icon: '📊', name: '債券・金利',         global: 'QUIZ_QUESTIONS_BONDS' },
    { key: 'crises',       icon: '⚡', name: '金融危機',           global: 'QUIZ_QUESTIONS_CRISES' },
    { key: 'macro',        icon: '📉', name: 'マクロ経済',         global: 'QUIZ_QUESTIONS_MACRO' },
    { key: 'regulation',   icon: '🏛️', name: '規制・銀行制度',     global: 'QUIZ_QUESTIONS_REGULATION' },
    { key: 'geopolitics',  icon: '🌍', name: '地政学',             global: 'QUIZ_QUESTIONS_GEOPOLITICS' },
  ];

  const LS_BEST = (k) => `g10quiz_best_${k}`;
  const LS_HISTORY = 'g10quiz_history';
  const LS_TOTAL = 'g10quiz_total_correct';

  function shuffle(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  function getQuestions(categoryKey) {
    if (categoryKey === 'all') {
      return CATEGORIES.flatMap((c) => (window[c.global] || []).map((q) => ({ ...q, _cat: c.key })));
    }
    const cat = CATEGORIES.find((c) => c.key === categoryKey);
    if (!cat) return [];
    return (window[cat.global] || []).map((q) => ({ ...q, _cat: cat.key }));
  }

  function getBest(key) {
    const v = localStorage.getItem(LS_BEST(key));
    return v ? Number(v) : null;
  }
  function setBest(key, pct) {
    const prev = getBest(key);
    if (prev == null || pct > prev) localStorage.setItem(LS_BEST(key), String(pct));
  }
  function pushHistory(entry) {
    let h = [];
    try { h = JSON.parse(localStorage.getItem(LS_HISTORY) || '[]'); } catch (e) {}
    h.unshift(entry);
    h = h.slice(0, 10);
    localStorage.setItem(LS_HISTORY, JSON.stringify(h));
  }
  function addTotalCorrect(n) {
    const cur = Number(localStorage.getItem(LS_TOTAL) || '0') + n;
    localStorage.setItem(LS_TOTAL, String(cur));
  }

  class QuizEngine {
    constructor(root) {
      this.root = root;
      this.questions = [];
      this.idx = 0;
      this.correct = 0;
      this.wrong = 0;
      this.streak = 0;
      this.bestStreak = 0;
      this.selected = null;
      this.submitted = false;
      this.sessionSize = 10;
      this.category = 'all';
    }

    start(category, size) {
      this.category = category;
      this.sessionSize = size;
      let qs = getQuestions(category);
      qs = shuffle(qs);
      if (size !== 'all') qs = qs.slice(0, Number(size));
      this.questions = qs;
      this.idx = 0;
      this.correct = 0;
      this.wrong = 0;
      this.streak = 0;
      this.bestStreak = 0;
      this.selected = null;
      this.submitted = false;
      this.renderQuestion();
    }

    renderStart() {
      const cards = CATEGORIES.map((c) => {
        const count = (window[c.global] || []).length;
        const best = getBest(c.key);
        const bestTxt = best != null ? `Best ${best}%` : '— Best未記録';
        return `<button class="category-card" data-cat="${c.key}">
          <div class="cat-icon">${c.icon}</div>
          <div class="cat-name">${c.name}</div>
          <div class="cat-meta">${count}問 · ${bestTxt}</div>
        </button>`;
      }).join('');
      const allBest = getBest('all');
      this.root.innerHTML = `
        <div class="quiz-container">
          <header class="quiz-header">
            <h1>📝 G10 Quiz Mode</h1>
            <p class="quiz-sub">カテゴリーを選んで学習開始。5択・解説付き・スコア記録。</p>
            ${allBest != null ? `<p class="quiz-best-banner">🏆 ALLベスト: ${allBest}%</p>` : ''}
          </header>
          <section class="quiz-settings">
            <label>出題数:
              <select id="quiz-size">
                <option value="10" selected>10問</option>
                <option value="20">20問</option>
                <option value="all">全問</option>
              </select>
            </label>
          </section>
          <section class="category-grid">${cards}</section>
          <div class="quiz-all-row">
            <button class="btn-all" data-cat="all">🎲 全カテゴリーランダム</button>
          </div>
        </div>`;
      this.root.querySelectorAll('[data-cat]').forEach((el) => {
        el.addEventListener('click', () => {
          const size = this.root.querySelector('#quiz-size').value;
          this.start(el.dataset.cat, size);
        });
      });
    }

    renderQuestion() {
      if (this.idx >= this.questions.length) return this.renderResult();
      const q = this.questions[this.idx];
      const total = this.questions.length;
      const prog = Math.round(((this.idx) / total) * 100);
      const choices = q.choices.map((c, i) =>
        `<button class="quiz-choice" data-i="${i}">
          <span class="choice-key">${String.fromCharCode(65 + i)}</span>
          <span class="choice-text">${c}</span>
        </button>`
      ).join('');
      this.root.innerHTML = `
        <div class="quiz-container">
          <div class="quiz-progress">
            <div class="quiz-progress-bar" style="width:${prog}%"></div>
            <div class="quiz-progress-text">${this.idx + 1} / ${total} · ✓${this.correct} ✗${this.wrong} · 連続${this.streak}</div>
          </div>
          <div class="quiz-question">
            <div class="quiz-q-meta">
              <span class="quiz-badge diff-${q.difficulty || 'medium'}">${q.difficulty || 'medium'}</span>
              <span class="quiz-badge cat">${q.category || ''}</span>
            </div>
            <h2 class="quiz-q-text">${q.question}</h2>
          </div>
          <div class="quiz-choices">${choices}</div>
          <div class="quiz-actions">
            <button class="btn-submit" disabled>回答する</button>
            <button class="btn-quit">中断してカテゴリー選択へ</button>
          </div>
          <div class="quiz-explanation" hidden></div>
        </div>`;

      const btnSubmit = this.root.querySelector('.btn-submit');
      const btnQuit = this.root.querySelector('.btn-quit');
      this.root.querySelectorAll('.quiz-choice').forEach((el) => {
        el.addEventListener('click', () => {
          if (this.submitted) return;
          this.selected = Number(el.dataset.i);
          this.root.querySelectorAll('.quiz-choice').forEach((e) => e.classList.remove('selected'));
          el.classList.add('selected');
          btnSubmit.disabled = false;
        });
      });
      btnSubmit.addEventListener('click', () => this.submitAnswer());
      btnQuit.addEventListener('click', () => this.renderStart());
    }

    submitAnswer() {
      if (this.selected == null || this.submitted) return;
      this.submitted = true;
      const q = this.questions[this.idx];
      const isCorrect = this.selected === q.answer;
      if (isCorrect) { this.correct++; this.streak++; this.bestStreak = Math.max(this.bestStreak, this.streak); }
      else { this.wrong++; this.streak = 0; }

      this.root.querySelectorAll('.quiz-choice').forEach((el) => {
        const i = Number(el.dataset.i);
        el.disabled = true;
        if (i === q.answer) el.classList.add('correct');
        else if (i === this.selected) el.classList.add('wrong');
      });

      const panel = this.root.querySelector('.quiz-explanation');
      const relLink = q.related ? `<a class="quiz-related" href="../${q.related}">📘 関連教科書ページを開く →</a>` : '';
      panel.innerHTML = `
        <div class="quiz-verdict ${isCorrect ? 'ok' : 'ng'}">
          ${isCorrect ? '✓ 正解!' : `✗ 不正解 — 正解は ${String.fromCharCode(65 + q.answer)}`}
        </div>
        <p class="quiz-exp-text">${q.explanation || ''}</p>
        ${relLink}
        <button class="btn-next">${this.idx + 1 >= this.questions.length ? '結果を見る →' : '次の問題 →'}</button>
      `;
      panel.hidden = false;
      panel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      const actions = this.root.querySelector('.quiz-actions');
      if (actions) actions.style.display = 'none';
      panel.querySelector('.btn-next').addEventListener('click', () => {
        this.idx++;
        this.selected = null;
        this.submitted = false;
        this.renderQuestion();
      });
    }

    renderResult() {
      const total = this.questions.length;
      const pct = total > 0 ? Math.round((this.correct / total) * 100) : 0;
      setBest(this.category, pct);
      addTotalCorrect(this.correct);
      pushHistory({ ts: Date.now(), category: this.category, correct: this.correct, total, pct });

      let grade = 'C';
      if (pct >= 90) grade = 'S';
      else if (pct >= 80) grade = 'A';
      else if (pct >= 70) grade = 'B';
      else if (pct < 50) grade = 'D';

      this.root.innerHTML = `
        <div class="quiz-container">
          <div class="quiz-result">
            <h1>📊 結果</h1>
            <div class="result-grade grade-${grade}">${grade}</div>
            <div class="result-score">${this.correct} / ${total} 正解</div>
            <div class="result-pct">${pct}%</div>
            <div class="result-meta">最高連続正解: ${this.bestStreak}</div>
            <div class="result-actions">
              <button class="btn-restart">🔄 同じカテゴリーで再挑戦</button>
              <button class="btn-home">← カテゴリー選択へ</button>
            </div>
          </div>
        </div>`;
      this.root.querySelector('.btn-restart').addEventListener('click', () => this.start(this.category, this.sessionSize));
      this.root.querySelector('.btn-home').addEventListener('click', () => this.renderStart());
    }

    getStats() {
      let h = [];
      try { h = JSON.parse(localStorage.getItem(LS_HISTORY) || '[]'); } catch (e) {}
      return { history: h, totalCorrect: Number(localStorage.getItem(LS_TOTAL) || '0') };
    }
  }

  window.QuizEngine = QuizEngine;
  window.QUIZ_CATEGORIES = CATEGORIES;
})();
