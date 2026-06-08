/* G10 Textbook — 章末アクティブリコール・ウィジェット (recall.js)
 * 各国チャプターページ (/<country>/<NN>_*.html) の <article> 末尾に
 * 「✅ 理解度チェック」(最大3問・5択・即時フィードバック) を自動挿入する。
 * 依存なし / 外部CDNなし / file:// 動作。問題データは ../data/quiz/q_*.js を動的ロード。
 * グローバルは window.G10Recall = {version, rerun()} のみ。失敗時はサイレントに終了する。
 */
(function () {
  'use strict';

  var VERSION = '1.0.0';
  var MAX_QUESTIONS = 3;
  var LS_MISSED = 'g10quiz_missed';
  var LS_STATE = 'g10recall';
  var MISSED_CAP = 200;

  var COUNTRY_KEYS = ['us', 'eurozone', 'japan', 'uk', 'switzerland',
    'australia', 'newzealand', 'canada', 'sweden', 'norway',
    'taiwan', 'hongkong', 'china', 'northkorea', 'vietnam',
    'singapore', 'iran', 'israel'];
  var COUNTRY_NAMES = {
    us: 'アメリカ', eurozone: 'ユーロ圏', japan: '日本', uk: 'イギリス',
    switzerland: 'スイス', australia: 'オーストラリア', newzealand: 'ニュージーランド',
    canada: 'カナダ', sweden: 'スウェーデン', norway: 'ノルウェー',
    taiwan: '台湾', hongkong: '香港', china: '中国', northkorea: '北朝鮮',
    vietnam: 'ベトナム', singapore: 'シンガポール', iran: 'イラン', israel: 'イスラエル'
  };
  // [ファイル名, グローバル変数名] — summary/quiz.html と同じデータソース
  var DATA_FILES = [
    ['q_bonds', 'QUIZ_QUESTIONS_BONDS'],
    ['q_central_bank', 'QUIZ_QUESTIONS_CENTRAL_BANK'],
    ['q_crises', 'QUIZ_QUESTIONS_CRISES'],
    ['q_equity', 'QUIZ_QUESTIONS_EQUITY'],
    ['q_fx', 'QUIZ_QUESTIONS_FX'],
    ['q_geopolitics', 'QUIZ_QUESTIONS_GEOPOLITICS'],
    ['q_macro', 'QUIZ_QUESTIONS_MACRO'],
    ['q_regulation', 'QUIZ_QUESTIONS_REGULATION']
  ];

  var widgetEl = null; // 現在挿入中のウィジェット (rerun 用)

  /* ---- ページ検出 -------------------------------------------------- */

  function detectPage() {
    try {
      var path = (window.location && window.location.pathname) || '';
      var re = new RegExp('(?:^|/)(' + COUNTRY_KEYS.join('|') + ')/((\\d{2})_[^/?#]+\\.html?)$');
      var m = path.match(re);
      if (!m) return null;
      return {
        country: m[1],
        file: m[2],
        key: m[1] + '/' + m[2],
        chapter: parseInt(m[3], 10)
      };
    } catch (e) { return null; }
  }

  /* ---- データロード -------------------------------------------------- */

  function loadData(done) {
    var pending = DATA_FILES.length;
    var finish = function () { pending--; if (pending === 0) done(); };
    for (var i = 0; i < DATA_FILES.length; i++) {
      (function (file, globalName) {
        if (window[globalName]) { finish(); return; } // 既にロード済み (quiz.html 等)
        try {
          var s = document.createElement('script');
          s.src = '../data/quiz/' + file + '.js';
          s.onload = finish;
          s.onerror = finish; // 個別失敗は許容
          document.head.appendChild(s);
        } catch (e) { finish(); }
      })(DATA_FILES[i][0], DATA_FILES[i][1]);
    }
  }

  function collectQuestions() {
    var all = [];
    for (var i = 0; i < DATA_FILES.length; i++) {
      var arr = window[DATA_FILES[i][1]];
      if (arr && typeof arr.length === 'number') {
        for (var j = 0; j < arr.length; j++) all.push(arr[j]);
      }
    }
    return all;
  }

  /* ---- 問題選択 (決定的 — 乱数不使用) -------------------------------- */

  function normRelated(rel) {
    if (!rel) return '';
    return String(rel)
      .replace(/^(\.\/)+/, '')
      .replace(/^(\.\.\/)+/, '')
      .replace(/^\/+/, '');
  }

  function byId(a, b) { return a.id < b.id ? -1 : (a.id > b.id ? 1 : 0); }

  function selectQuestions(all, page) {
    var i, q;
    // (a) related がこのページを指す問題 — 最大3問 (id 順)
    var picked = [];
    for (i = 0; i < all.length; i++) {
      q = all[i];
      if (q && q.id && normRelated(q.related) === page.key) picked.push(q);
    }
    picked.sort(byId);
    picked = picked.slice(0, MAX_QUESTIONS);

    // (b) 3問未満なら同じ国の問題で補充 (隣接チャプター優先)
    if (picked.length < MAX_QUESTIONS) {
      var have = {};
      for (i = 0; i < picked.length; i++) have[picked[i].id] = true;
      var pool = [];
      for (i = 0; i < all.length; i++) {
        q = all[i];
        if (q && q.id && !have[q.id] && q.country === page.country &&
            normRelated(q.related) !== page.key) pool.push(q);
      }
      var chapterRe = new RegExp('^' + page.country + '/(\\d{2})_');
      var dist = function (qq) {
        var m = normRelated(qq.related).match(chapterRe);
        return m ? Math.abs(parseInt(m[1], 10) - page.chapter) : 999;
      };
      pool.sort(function (a, b) {
        var da = dist(a), db = dist(b);
        if (da !== db) return da - db;
        return byId(a, b);
      });
      picked = picked.concat(pool.slice(0, MAX_QUESTIONS - picked.length));
    }
    return picked;
  }

  /* ---- localStorage -------------------------------------------------- */

  function addMissed(id) { // quiz.js と同フォーマット: id配列・新しい順・重複なし・上限200
    try {
      var a;
      try { a = JSON.parse(localStorage.getItem(LS_MISSED) || '[]'); } catch (e) { a = []; }
      // quiz.js getMissed と同じ Array.isArray 判定 — 破損値 (JSON文字列等) は
      // 新しい配列で上書きして自己修復する
      if (!Array.isArray(a)) a = [];
      if (a.indexOf(id) === -1) {
        a.unshift(id);
        localStorage.setItem(LS_MISSED, JSON.stringify(a.slice(0, MISSED_CAP)));
      }
    } catch (e) { /* storage 無効環境は無視 */ }
  }

  function readState() {
    try {
      var o = JSON.parse(localStorage.getItem(LS_STATE) || '{}');
      return (o && typeof o === 'object' && typeof o.length !== 'number') ? o : {};
    } catch (e) { return {}; }
  }

  function writeState(pageKey, rec) {
    try {
      var o = readState();
      o[pageKey] = rec;
      localStorage.setItem(LS_STATE, JSON.stringify(o));
    } catch (e) { /* ignore */ }
  }

  /* ---- スタイル注入 (1回のみ) ----------------------------------------- */

  function ensureStyles() {
    if (document.getElementById('recall-styles')) return;
    var css = [
      '.recall-box{background:var(--bg-card,#1e1e3a);border:1px solid var(--border-color,#2a2a4a);border-left:4px solid var(--country-accent,var(--accent-green,#00d4aa));border-radius:8px;padding:20px;margin:36px 0 12px}',
      '.recall-box.recall-compact{padding:12px 20px}',
      '.recall-header{font-weight:700;font-size:1.05em;color:var(--country-accent,var(--accent-green,#00d4aa));margin:0 0 6px}',
      '.recall-q{margin:16px 0 4px}',
      '.recall-q-text{color:var(--text-primary,#e0e0e0);font-weight:600;line-height:1.6;margin:0 0 10px}',
      '.recall-choices{display:flex;flex-direction:column;gap:8px}',
      '.recall-choice{display:flex;align-items:center;gap:10px;width:100%;min-height:44px;padding:10px 14px;text-align:left;background:rgba(255,255,255,.04);color:var(--text-primary,#e0e0e0);border:1px solid var(--border-color,#2a2a4a);border-radius:6px;font:inherit;font-size:.95em;line-height:1.5;cursor:pointer;transition:background .15s ease,border-color .15s ease}',
      '.recall-choice:hover:not(:disabled){background:rgba(255,255,255,.09);border-color:var(--country-accent,var(--accent-green,#00d4aa))}',
      '.recall-choice:disabled{cursor:default;opacity:.55}',
      '.recall-choice.correct,.recall-choice.correct:disabled{background:rgba(0,212,170,.16);border-color:#00d4aa;color:#00d4aa;opacity:1}',
      '.recall-choice.wrong,.recall-choice.wrong:disabled{background:rgba(255,107,107,.14);border-color:#ff6b6b;color:#ff6b6b;opacity:1}',
      '.recall-key{flex:0 0 auto;display:inline-flex;align-items:center;justify-content:center;width:24px;height:24px;border-radius:50%;background:rgba(255,255,255,.08);font-size:.8em;font-weight:700}',
      '.recall-choice-text{flex:1 1 auto;white-space:normal;word-break:break-word}',
      '.recall-exp{max-height:0;overflow:hidden;transition:max-height .35s ease}',
      '.recall-exp.open{max-height:600px}',
      '.recall-verdict{font-weight:700;margin:12px 0 6px}',
      '.recall-verdict.ok{color:#00d4aa}',
      '.recall-verdict.ng{color:#ff6b6b}',
      '.recall-exp-text{color:var(--text-secondary,#a0a0b0);font-size:.92em;line-height:1.7;margin:0 0 4px}',
      '.recall-related,.recall-more{display:inline-flex;align-items:center;min-height:44px;color:var(--country-accent,var(--accent-green,#00d4aa));text-decoration:none;font-size:.95em}',
      '.recall-related:hover,.recall-more:hover{text-decoration:underline}',
      '.recall-footer{display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:6px 16px;margin-top:18px;padding-top:12px;border-top:1px dashed var(--border-color,#2a2a4a)}',
      '.recall-score{font-weight:700;color:var(--text-primary,#e0e0e0)}',
      '.recall-done{display:flex;flex-wrap:wrap;align-items:center;gap:10px}',
      '.recall-done-text{font-weight:600;color:#00d4aa}',
      '.recall-retry{min-height:44px;padding:8px 18px;background:transparent;color:var(--country-accent,var(--accent-green,#00d4aa));border:1px solid var(--country-accent,var(--accent-green,#00d4aa));border-radius:6px;font:inherit;cursor:pointer;transition:background .15s ease}',
      '.recall-retry:hover{background:rgba(0,212,170,.12)}',
      '@media (prefers-reduced-motion:reduce){.recall-box,.recall-box *{transition:none!important}}'
    ].join('\n');
    var style = document.createElement('style');
    style.id = 'recall-styles';
    if (style.setAttribute) style.setAttribute('id', 'recall-styles');
    style.textContent = css;
    document.head.appendChild(style);
  }

  /* ---- DOM ヘルパー ---------------------------------------------------- */

  function el(tag, cls, text) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (text != null) e.textContent = text;
    return e;
  }

  function clearEl(e) {
    while (e.firstChild) e.removeChild(e.firstChild);
  }

  /* ---- ウィジェット描画 -------------------------------------------------- */

  function renderWidget(article, page, questions) {
    ensureStyles();
    // 二重インクルード対策: 自分の closure-local な widgetEl だけでなく、
    // ドキュメント内の既存 .recall-box を全て除去してから挿入する
    try {
      var existing = document.querySelectorAll('.recall-box');
      for (var k = 0; k < existing.length; k++) {
        if (existing[k].parentNode) existing[k].parentNode.removeChild(existing[k]);
      }
    } catch (e) { /* ignore */ }
    if (widgetEl && widgetEl.parentNode) widgetEl.parentNode.removeChild(widgetEl);
    var box = el('section', 'recall-box');
    widgetEl = box;

    // (c) 該当問題ゼロ → コンパクトなリンクボックスのみ
    if (questions.length === 0) {
      box.className = 'recall-box recall-compact';
      var a = el('a', 'recall-more', 'この国のクイズに挑戦 →');
      a.href = '../summary/quiz.html?country=' + page.country;
      box.appendChild(a);
      article.appendChild(box);
      return;
    }

    box.appendChild(el('div', 'recall-header', '✅ 理解度チェック — この章の内容から'));
    var body = el('div', 'recall-body');
    box.appendChild(body);
    article.appendChild(box);

    var saved = readState()[page.key];
    if (saved && typeof saved.answered === 'number') {
      renderDone(body, page, questions, saved);
    } else {
      startSession(body, page, questions);
    }
  }

  function renderDone(body, page, questions, saved) {
    clearEl(body);
    var row = el('div', 'recall-done');
    // saved.correct が欠損/破損していても 'undefined/3' とは表示しない
    row.appendChild(el('span', 'recall-done-text',
      '✓ 完了済み (' + (saved.correct | 0) + '/' + saved.answered + ') —'));
    var btn = el('button', 'recall-retry', 'もう一度');
    btn.setAttribute('type', 'button');
    btn.addEventListener('click', function () {
      startSession(body, page, questions); // このページのウィジェットだけリセット
    });
    row.appendChild(btn);
    body.appendChild(row);
  }

  function startSession(body, page, questions) {
    clearEl(body);
    var session = { idx: 0, correct: 0, answered: 0 };
    renderQuestion(body, page, questions, session);
  }

  function renderQuestion(body, page, questions, session) {
    var q = questions[session.idx];
    var wrap = el('div', 'recall-q');
    wrap.appendChild(el('div', 'recall-q-text', 'Q' + (session.idx + 1) + '. ' + q.question));

    var choicesEl = el('div', 'recall-choices');
    var buttons = [];
    var expEl = el('div', 'recall-exp');
    expEl.setAttribute('aria-live', 'polite');
    var answeredThis = false;

    var answer = function (idx) {
      var ok = idx === q.answer;
      session.answered++;
      if (ok) session.correct++;
      else addMissed(q.id); // 間違えた問題は復習プールへ

      for (var i = 0; i < buttons.length; i++) {
        buttons[i].disabled = true;
        if (i === q.answer) buttons[i].className = 'recall-choice correct';
        else if (i === idx) buttons[i].className = 'recall-choice wrong';
      }

      expEl.appendChild(el('div', 'recall-verdict ' + (ok ? 'ok' : 'ng'),
        ok ? '✓ 正解！' : '✗ 不正解 — 正解は ' + String.fromCharCode(65 + q.answer)));
      if (q.explanation) expEl.appendChild(el('p', 'recall-exp-text', q.explanation));
      var rel = normRelated(q.related);
      if (rel && rel !== page.key) {
        var a = el('a', 'recall-related', '📖 関連ページ →');
        a.href = '../' + rel;
        expEl.appendChild(a);
      }
      var open = function () { expEl.className = 'recall-exp open'; };
      if (typeof window.requestAnimationFrame === 'function') window.requestAnimationFrame(open);
      else open();

      session.idx++;
      if (session.idx < questions.length) renderQuestion(body, page, questions, session);
      else finishSession(body, page, questions, session);
    };

    for (var i = 0; i < q.choices.length; i++) {
      (function (idx) {
        var btn = el('button', 'recall-choice');
        btn.setAttribute('type', 'button');
        btn.appendChild(el('span', 'recall-key', String.fromCharCode(65 + idx)));
        btn.appendChild(el('span', 'recall-choice-text', q.choices[idx]));
        btn.addEventListener('click', function () {
          if (answeredThis) return;
          answeredThis = true;
          answer(idx);
        });
        buttons.push(btn);
        choicesEl.appendChild(btn);
      })(i);
    }

    wrap.appendChild(choicesEl);
    wrap.appendChild(expEl);
    body.appendChild(wrap);
  }

  function finishSession(body, page, questions, session) {
    var foot = el('div', 'recall-footer');
    foot.appendChild(el('span', 'recall-score', session.correct + '/' + questions.length + ' 正解'));
    var a = el('a', 'recall-more',
      '→ もっと解く（' + (COUNTRY_NAMES[page.country] || page.country) + 'のクイズ）');
    a.href = '../summary/quiz.html?country=' + page.country;
    foot.appendChild(a);
    body.appendChild(foot);
    writeState(page.key, { answered: session.answered, correct: session.correct, ts: Date.now() });
  }

  /* ---- 起動 ------------------------------------------------------------ */

  function init() {
    var page = detectPage();
    if (!page) return; // 国別チャプターページ以外では何もしない
    var article = (typeof document.querySelector === 'function')
      ? document.querySelector('article') : null;
    if (!article) return;
    loadData(function () {
      try {
        var all = collectQuestions();
        var picked = selectQuestions(all, page);
        renderWidget(article, page, picked);
      } catch (e) { /* silent */ }
    });
  }

  function boot() { try { init(); } catch (e) { /* silent */ } }

  try {
    window.G10Recall = {
      version: VERSION,
      rerun: function () {
        try {
          if (widgetEl && widgetEl.parentNode) widgetEl.parentNode.removeChild(widgetEl);
          widgetEl = null;
          init();
        } catch (e) { /* silent */ }
      }
    };
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', boot);
    } else {
      boot();
    }
  } catch (e) { /* silent */ }
})();
