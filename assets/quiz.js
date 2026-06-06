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
  const LS_MISSED = 'g10quiz_missed';
  const MISSED_CAP = 200;

  // ---- Safe localStorage --------------------------------------------------
  // Safari private mode throws QuotaExceededError on setItem; fully-blocked
  // storage can throw on the localStorage accessor itself. Reads fall back to
  // null and writes become no-ops so the quiz keeps working without storage.
  function safeGet(key) {
    try { return window.localStorage.getItem(key); } catch (e) { return null; }
  }
  function safeSet(key, value) {
    try { window.localStorage.setItem(key, value); } catch (e) { /* ignore */ }
  }

  // ---- Country mode -------------------------------------------------------
  const COUNTRY_META = {
    us:          { flag: '🇺🇸', name: 'アメリカ' },
    eurozone:    { flag: '🇪🇺', name: 'ユーロ圏' },
    japan:       { flag: '🇯🇵', name: '日本' },
    uk:          { flag: '🇬🇧', name: 'イギリス' },
    switzerland: { flag: '🇨🇭', name: 'スイス' },
    australia:   { flag: '🇦🇺', name: 'オーストラリア' },
    newzealand:  { flag: '🇳🇿', name: 'ニュージーランド' },
    canada:      { flag: '🇨🇦', name: 'カナダ' },
    sweden:      { flag: '🇸🇪', name: 'スウェーデン' },
    norway:      { flag: '🇳🇴', name: 'ノルウェー' },
  };
  const COUNTRY_ALIASES = {
    us: 'us', usa: 'us', 'united states': 'us', america: 'us',
    eu: 'eurozone', ez: 'eurozone', euro: 'eurozone', eurozone: 'eurozone',
    jp: 'japan', jpn: 'japan', japan: 'japan',
    uk: 'uk', gb: 'uk', gbr: 'uk', 'united kingdom': 'uk', britain: 'uk',
    ch: 'switzerland', che: 'switzerland', switzerland: 'switzerland',
    au: 'australia', aus: 'australia', australia: 'australia',
    nz: 'newzealand', nzl: 'newzealand', newzealand: 'newzealand', 'new zealand': 'newzealand',
    ca: 'canada', can: 'canada', canada: 'canada',
    se: 'sweden', swe: 'sweden', sweden: 'sweden',
    no: 'norway', nor: 'norway', norway: 'norway',
  };
  function resolveCountry(raw) {
    if (!raw) return null;
    const key = String(raw).trim().toLowerCase();
    return COUNTRY_ALIASES[key] || null;
  }

  // ---- Missed-question pool (wrong-answer review) -------------------------
  function getMissed() {
    try {
      const a = JSON.parse(safeGet(LS_MISSED) || '[]');
      return Array.isArray(a) ? a : [];
    } catch (e) { return []; }
  }
  function saveMissed(arr) {
    safeSet(LS_MISSED, JSON.stringify(arr.slice(0, MISSED_CAP)));
  }
  function addMissed(id) {
    const a = getMissed();
    if (a.indexOf(id) === -1) { a.unshift(id); saveMissed(a); }
  }
  function removeMissed(id) {
    const a = getMissed();
    const i = a.indexOf(id);
    if (i >= 0) { a.splice(i, 1); saveMissed(a); }
  }

  function shuffle(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  function getQuestions(categoryKey, country) {
    let qs;
    if (categoryKey === 'all') {
      qs = CATEGORIES.flatMap((c) => (window[c.global] || []).map((q) => ({ ...q, _cat: c.key })));
    } else {
      const cat = CATEGORIES.find((c) => c.key === categoryKey);
      qs = cat ? (window[cat.global] || []).map((q) => ({ ...q, _cat: cat.key })) : [];
    }
    if (country) qs = qs.filter((q) => q.country === country);
    return qs;
  }

  function getBest(key) {
    const v = safeGet(LS_BEST(key));
    return v ? Number(v) : null;
  }
  function setBest(key, pct) {
    const prev = getBest(key);
    if (prev == null || pct > prev) safeSet(LS_BEST(key), String(pct));
  }
  function pushHistory(entry) {
    let h = [];
    try { h = JSON.parse(safeGet(LS_HISTORY) || '[]'); } catch (e) {}
    h.unshift(entry);
    h = h.slice(0, 10);
    safeSet(LS_HISTORY, JSON.stringify(h));
  }
  function addTotalCorrect(n) {
    const cur = Number(safeGet(LS_TOTAL) || '0') + n;
    safeSet(LS_TOTAL, String(cur));
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
      this.country = null;        // country filter key (e.g. 'japan') or null
      this.reviewMode = false;    // true when replaying missed questions
      this.sessionWrong = [];     // questions answered wrong this session
      this.catStats = {};         // per-category {correct, total} this session
    }

    setCountry(key) {
      this.country = key || null;
    }

    _resetSession() {
      this.idx = 0;
      this.correct = 0;
      this.wrong = 0;
      this.streak = 0;
      this.bestStreak = 0;
      this.selected = null;
      this.submitted = false;
      this.sessionWrong = [];
      this.catStats = {};
    }

    start(category, size) {
      this.category = category;
      this.sessionSize = size;
      this.reviewMode = false;
      let qs = getQuestions(category, this.country);
      qs = shuffle(qs);
      if (size !== 'all') qs = qs.slice(0, Number(size));
      this.questions = qs;
      this._resetSession();
      this.renderQuestion();
    }

    // Session built from previously-missed questions (g10quiz_missed)
    startReview(size) {
      const pool = getMissed();
      let qs = getQuestions('all', this.country).filter((q) => pool.indexOf(q.id) !== -1);
      if (qs.length === 0) return this.renderStart('この組み合わせの問題はありません');
      this.category = 'review';
      this.sessionSize = size || 'all';
      this.reviewMode = true;
      qs = shuffle(qs);
      if (this.sessionSize !== 'all') qs = qs.slice(0, Number(this.sessionSize));
      this.questions = qs;
      this._resetSession();
      this.renderQuestion();
    }

    renderStart(notice) {
      const country = this.country;
      const cards = CATEGORIES.map((c) => {
        const count = getQuestions(c.key, country).length;
        const best = getBest(c.key);
        const bestTxt = best != null ? `Best ${best}%` : '— Best未記録';
        return `<button class="category-card" data-cat="${c.key}" ${count === 0 ? 'disabled' : ''}>
          <div class="cat-icon">${c.icon}</div>
          <div class="cat-name">${c.name}</div>
          <div class="cat-meta">${count}問 · ${bestTxt}</div>
        </button>`;
      }).join('');
      const allBest = getBest('all');

      // Country-mode banner
      let countryBanner = '';
      if (country && COUNTRY_META[country]) {
        const m = COUNTRY_META[country];
        countryBanner = `<div class="quiz-country-banner">
          国別モード: <strong>${m.flag} ${m.name}</strong>
          <a class="quiz-country-clear" href="quiz.html">✕ フィルター解除</a>
        </div>`;
      }

      // Wrong-answer review button (only when missed pool has matching questions)
      const missedPool = getMissed();
      const missedCount = missedPool.length
        ? getQuestions('all', country).filter((q) => missedPool.indexOf(q.id) !== -1).length
        : 0;
      const reviewBtn = missedCount > 0
        ? `<button class="btn-review">🔁 間違えた問題を復習 (${missedCount}問)</button>`
        : '';

      // Optional notice (e.g. empty deck for the chosen category × country)
      const noticeHtml = notice
        ? `<div class="quiz-empty-notice">⚠️ ${notice}</div>`
        : '';

      this.root.innerHTML = `
        <div class="quiz-container">
          <header class="quiz-header">
            <h1>📝 G10 Quiz Mode</h1>
            <p class="quiz-sub">カテゴリーを選んで学習開始。5択・解説付き・スコア記録。</p>
            ${allBest != null ? `<p class="quiz-best-banner">🏆 ALLベスト: ${allBest}%</p>` : ''}
          </header>
          ${countryBanner}
          ${noticeHtml}
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
            ${reviewBtn}
          </div>
        </div>`;
      this.root.querySelectorAll('[data-cat]').forEach((el) => {
        el.addEventListener('click', () => {
          const size = this.root.querySelector('#quiz-size').value;
          this.start(el.dataset.cat, size);
        });
      });
      const rv = this.root.querySelector('.btn-review');
      if (rv) rv.addEventListener('click', () => {
        const size = this.root.querySelector('#quiz-size').value;
        this.startReview(size);
      });
    }

    renderQuestion() {
      // Empty deck (e.g. ?category=bonds&country=NO): back to start screen
      // with a notice — never record a 0/0 result in history/best scores.
      if (this.questions.length === 0) return this.renderStart('この組み合わせの問題はありません');
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

      // Per-category session stats (for result-screen breakdown)
      const ck = q._cat || 'other';
      if (!this.catStats[ck]) this.catStats[ck] = { correct: 0, total: 0 };
      this.catStats[ck].total++;
      if (isCorrect) this.catStats[ck].correct++;

      // Wrong-answer pool: add on miss; in review mode, remove on correct
      if (isCorrect) {
        if (this.reviewMode) removeMissed(q.id);
      } else {
        addMissed(q.id);
        this.sessionWrong.push(q);
      }

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
      // Don't pollute category best scores with review sessions or
      // country-filtered (smaller-pool) sessions.
      if (!this.reviewMode && !this.country) setBest(this.category, pct);
      addTotalCorrect(this.correct);
      pushHistory({ ts: Date.now(), category: this.category, correct: this.correct, total, pct });

      let grade = 'C';
      if (pct >= 90) grade = 'S';
      else if (pct >= 80) grade = 'A';
      else if (pct >= 70) grade = 'B';
      else if (pct < 50) grade = 'D';

      // Per-category accuracy breakdown
      const catRows = Object.keys(this.catStats).map((k) => {
        const c = CATEGORIES.find((x) => x.key === k);
        const s = this.catStats[k];
        const p = s.total > 0 ? Math.round((s.correct / s.total) * 100) : 0;
        const cls = p >= 80 ? 'ok' : (p >= 50 ? 'mid' : 'ng');
        return `<div class="result-cat-row">
          <span class="result-cat-name">${c ? c.icon + ' ' + c.name : k}</span>
          <span class="result-cat-score ${cls}">${s.correct}/${s.total} (${p}%)</span>
        </div>`;
      }).join('');
      const catPanel = catRows
        ? `<div class="result-cats"><h2>カテゴリー別正答率</h2>${catRows}</div>`
        : '';

      // Weakest pages: top-3 related links among this session's missed questions
      const relCount = {};
      this.sessionWrong.forEach((q) => {
        if (q.related) relCount[q.related] = (relCount[q.related] || 0) + 1;
      });
      const topRel = Object.keys(relCount)
        .sort((a, b) => relCount[b] - relCount[a])
        .slice(0, 3);
      const weakPanel = topRel.length
        ? `<div class="result-weak">
            <h2>弱点ページを復習しよう</h2>
            ${topRel.map((rel) => {
              const seg = rel.split('/')[0];
              const m = COUNTRY_META[seg];
              const label = (m ? m.flag + ' ' : '🌍 ') + rel.replace(/\.html$/, '');
              return `<a class="quiz-related result-weak-link" href="../${rel}">📘 ${label} (${relCount[rel]}問ミス) →</a>`;
            }).join('')}
          </div>`
        : '';

      // Remaining review questions, scoped to the current country filter
      // (same expression renderStart uses for the review-button count).
      let reviewRemainHtml = '';
      if (this.reviewMode) {
        const remainPool = getMissed();
        const remain = remainPool.length
          ? getQuestions('all', this.country).filter((q) => remainPool.indexOf(q.id) !== -1).length
          : 0;
        reviewRemainHtml = `<div class="result-meta">正解した問題は復習プールから削除されました (残り${remain}問)</div>`;
      }

      const restartLabel = this.reviewMode ? '🔁 復習をもう一度' : '🔄 同じカテゴリーで再挑戦';
      this.root.innerHTML = `
        <div class="quiz-container">
          <div class="quiz-result">
            <h1>${this.reviewMode ? '📊 復習結果' : '📊 結果'}</h1>
            <div class="result-grade grade-${grade}">${grade}</div>
            <div class="result-score">${this.correct} / ${total} 正解</div>
            <div class="result-pct">${pct}%</div>
            <div class="result-meta">最高連続正解: ${this.bestStreak}</div>
            ${reviewRemainHtml}
            ${catPanel}
            ${weakPanel}
            <div class="result-actions">
              <button class="btn-restart">${restartLabel}</button>
              <button class="btn-home">← カテゴリー選択へ</button>
            </div>
          </div>
        </div>`;
      this.root.querySelector('.btn-restart').addEventListener('click', () => {
        if (this.reviewMode) this.startReview(this.sessionSize);
        else this.start(this.category, this.sessionSize);
      });
      this.root.querySelector('.btn-home').addEventListener('click', () => this.renderStart());
    }

    getStats() {
      let h = [];
      try { h = JSON.parse(safeGet(LS_HISTORY) || '[]'); } catch (e) {}
      return { history: h, totalCorrect: Number(safeGet(LS_TOTAL) || '0') };
    }
  }

  window.QuizEngine = QuizEngine;
  window.QUIZ_CATEGORIES = CATEGORIES;
  window.QUIZ_COUNTRY_META = COUNTRY_META;
  window.QUIZ_RESOLVE_COUNTRY = resolveCountry;
})();
