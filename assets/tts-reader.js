/* ============================================================
   G10 Textbook — Text-to-Speech Reader
   Web Speech API による自然な読み上げ機能
   ============================================================ */

(function() {
  'use strict';

  // Speech Synthesis が使えない環境では何もしない
  if (!('speechSynthesis' in window)) return;

  var synth = window.speechSynthesis;
  var state = {
    playing: false,
    paused: false,
    currentIndex: 0,
    blocks: [],
    rate: 1.0,
    voice: null,
    voicesLoaded: false
  };

  // --- 日本語音声の選択 ---
  function pickVoice() {
    var voices = synth.getVoices();
    if (!voices.length) return null;

    // 優先順位: Microsoft Nanami > Google 日本語 > 任意の ja 音声
    var priority = [
      function(v) { return /nanami/i.test(v.name) && v.lang.startsWith('ja'); },
      function(v) { return /haruka/i.test(v.name) && v.lang.startsWith('ja'); },
      function(v) { return /google.*日本/i.test(v.name); },
      function(v) { return /google.*japan/i.test(v.name); },
      function(v) { return v.lang.startsWith('ja'); }
    ];

    for (var i = 0; i < priority.length; i++) {
      for (var j = 0; j < voices.length; j++) {
        if (priority[i](voices[j])) return voices[j];
      }
    }
    return voices[0];
  }

  function ensureVoice() {
    if (!state.voice) state.voice = pickVoice();
  }

  // voiceschanged イベントで音声リスト取得
  synth.onvoiceschanged = function() {
    state.voice = pickVoice();
    state.voicesLoaded = true;
    updateVoiceLabel();
  };

  // --- 読み上げ対象ブロックの収集 ---
  function collectBlocks() {
    var article = document.querySelector('article');
    if (!article) return [];
    // h2, h3, p, li, td を読み上げ対象にする（テーブルは行単位で）
    var selectors = 'h2, h3, p, li';
    var nodes = article.querySelectorAll(selectors);
    return Array.from(nodes).filter(function(el) {
      // 空テキストや非表示は除外
      var text = el.textContent.trim();
      return text.length > 0;
    });
  }

  // --- テキスト整形（読み上げ用） ---
  function cleanText(el) {
    var text = el.textContent.trim();
    // 脚注参照番号を除去
    text = text.replace(/\[\d+\]/g, '');
    // 連続空白をスペース1つに
    text = text.replace(/\s+/g, ' ');
    return text;
  }

  // --- ハイライト ---
  function highlightBlock(index) {
    // 前のハイライトを除去
    document.querySelectorAll('.tts-highlight').forEach(function(el) {
      el.classList.remove('tts-highlight');
    });
    if (index >= 0 && index < state.blocks.length) {
      var block = state.blocks[index];
      block.classList.add('tts-highlight');
      // スムーズスクロール（ビューポート中央付近に）
      block.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }

  // --- 1ブロック読み上げ ---
  function speakBlock(index) {
    if (index >= state.blocks.length) {
      stopReading();
      return;
    }

    state.currentIndex = index;
    highlightBlock(index);
    updateProgress();

    var text = cleanText(state.blocks[index]);
    if (!text) {
      // 空ブロックはスキップ
      speakBlock(index + 1);
      return;
    }

    var utter = new SpeechSynthesisUtterance(text);
    ensureVoice();
    if (state.voice) utter.voice = state.voice;
    utter.lang = 'ja-JP';
    utter.rate = state.rate;
    utter.pitch = 1.0;

    utter.onend = function() {
      if (state.playing && !state.paused) {
        speakBlock(index + 1);
      }
    };

    utter.onerror = function(e) {
      // cancelled は正常停止なので無視
      if (e.error !== 'canceled') {
        console.warn('TTS error:', e.error);
      }
    };

    synth.speak(utter);
  }

  // --- 再生制御 ---
  function startReading() {
    state.blocks = collectBlocks();
    if (!state.blocks.length) return;
    state.playing = true;
    state.paused = false;
    updateUI();
    speakBlock(state.currentIndex);
  }

  function pauseReading() {
    synth.pause();
    state.paused = true;
    updateUI();
  }

  function resumeReading() {
    synth.resume();
    state.paused = false;
    updateUI();
  }

  function stopReading() {
    synth.cancel();
    state.playing = false;
    state.paused = false;
    state.currentIndex = 0;
    highlightBlock(-1);
    updateUI();
    updateProgress();
  }

  function skipForward() {
    if (!state.playing) return;
    synth.cancel();
    var next = Math.min(state.currentIndex + 1, state.blocks.length - 1);
    state.currentIndex = next;
    speakBlock(next);
  }

  function skipBackward() {
    if (!state.playing) return;
    synth.cancel();
    var prev = Math.max(state.currentIndex - 1, 0);
    state.currentIndex = prev;
    speakBlock(prev);
  }

  function setRate(newRate) {
    state.rate = newRate;
    // 現在再生中なら再開
    if (state.playing && !state.paused) {
      synth.cancel();
      speakBlock(state.currentIndex);
    }
  }

  // --- Chrome の Speech Synthesis バグ対策 ---
  // Chrome は長いテキストで途中停止するバグがある。15秒ごとに resume() を呼ぶ
  var keepAliveTimer = null;
  function startKeepAlive() {
    stopKeepAlive();
    keepAliveTimer = setInterval(function() {
      if (synth.speaking && !synth.paused) {
        synth.pause();
        synth.resume();
      }
    }, 14000);
  }
  function stopKeepAlive() {
    if (keepAliveTimer) {
      clearInterval(keepAliveTimer);
      keepAliveTimer = null;
    }
  }

  // --- UI 構築 ---
  var panel = null;

  function createUI() {
    panel = document.createElement('div');
    panel.className = 'tts-panel';
    panel.innerHTML =
      '<div class="tts-panel-inner">' +
        '<div class="tts-controls">' +
          '<button class="tts-btn tts-btn-back" title="前のセクション" aria-label="前のセクション">' +
            '<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M6 6h2v12H6zm3.5 6l8.5 6V6z"/></svg>' +
          '</button>' +
          '<button class="tts-btn tts-btn-play" title="再生/一時停止" aria-label="再生">' +
            '<svg class="tts-icon-play" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>' +
            '<svg class="tts-icon-pause" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" style="display:none"><path d="M6 19h4V5H6zm8-14v14h4V5z"/></svg>' +
          '</button>' +
          '<button class="tts-btn tts-btn-stop" title="停止" aria-label="停止">' +
            '<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="6" width="12" height="12"/></svg>' +
          '</button>' +
          '<button class="tts-btn tts-btn-fwd" title="次のセクション" aria-label="次のセクション">' +
            '<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z"/></svg>' +
          '</button>' +
        '</div>' +
        '<div class="tts-speed">' +
          '<label class="tts-speed-label">速度</label>' +
          '<input type="range" class="tts-speed-slider" min="0.5" max="2.0" step="0.1" value="1.0">' +
          '<span class="tts-speed-value">1.0x</span>' +
        '</div>' +
        '<div class="tts-progress">' +
          '<span class="tts-progress-text"></span>' +
        '</div>' +
        '<div class="tts-voice-info"></div>' +
        '<button class="tts-btn tts-btn-close" title="閉じる" aria-label="パネルを閉じる">' +
          '<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>' +
        '</button>' +
      '</div>';

    document.body.appendChild(panel);

    // イベントバインド
    panel.querySelector('.tts-btn-play').addEventListener('click', function() {
      if (!state.playing) {
        state.blocks = collectBlocks();
        startReading();
        startKeepAlive();
      } else if (state.paused) {
        resumeReading();
        startKeepAlive();
      } else {
        pauseReading();
        stopKeepAlive();
      }
    });

    panel.querySelector('.tts-btn-stop').addEventListener('click', function() {
      stopReading();
      stopKeepAlive();
    });

    panel.querySelector('.tts-btn-back').addEventListener('click', skipBackward);
    panel.querySelector('.tts-btn-fwd').addEventListener('click', skipForward);

    panel.querySelector('.tts-speed-slider').addEventListener('input', function() {
      var val = parseFloat(this.value);
      panel.querySelector('.tts-speed-value').textContent = val.toFixed(1) + 'x';
      setRate(val);
    });

    panel.querySelector('.tts-btn-close').addEventListener('click', function() {
      stopReading();
      stopKeepAlive();
      panel.classList.remove('tts-panel-visible');
      floatingBtn.classList.add('tts-fab-visible');
    });

    updateVoiceLabel();
  }

  // --- フローティング起動ボタン ---
  var floatingBtn = null;

  function createFAB() {
    floatingBtn = document.createElement('button');
    floatingBtn.className = 'tts-fab tts-fab-visible';
    floatingBtn.title = '読み上げ';
    floatingBtn.setAttribute('aria-label', '読み上げパネルを開く');
    floatingBtn.innerHTML =
      '<svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">' +
        '<path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>' +
      '</svg>';

    document.body.appendChild(floatingBtn);

    floatingBtn.addEventListener('click', function() {
      floatingBtn.classList.remove('tts-fab-visible');
      panel.classList.add('tts-panel-visible');
    });
  }

  // --- UI更新 ---
  function updateUI() {
    if (!panel) return;
    var iconPlay = panel.querySelector('.tts-icon-play');
    var iconPause = panel.querySelector('.tts-icon-pause');
    var btnPlay = panel.querySelector('.tts-btn-play');

    if (state.playing && !state.paused) {
      iconPlay.style.display = 'none';
      iconPause.style.display = '';
      btnPlay.setAttribute('aria-label', '一時停止');
      btnPlay.classList.add('tts-btn-active');
    } else {
      iconPlay.style.display = '';
      iconPause.style.display = 'none';
      btnPlay.setAttribute('aria-label', '再生');
      btnPlay.classList.remove('tts-btn-active');
    }
  }

  function updateProgress() {
    if (!panel) return;
    var el = panel.querySelector('.tts-progress-text');
    if (state.blocks.length === 0) {
      el.textContent = '';
      return;
    }
    el.textContent = (state.currentIndex + 1) + ' / ' + state.blocks.length;
  }

  function updateVoiceLabel() {
    if (!panel) return;
    var el = panel.querySelector('.tts-voice-info');
    if (state.voice) {
      el.textContent = state.voice.name;
    } else {
      el.textContent = '音声読み込み中...';
    }
  }

  // --- セクションクリックで読み上げ開始位置変更 ---
  function enableClickToStart() {
    var article = document.querySelector('article');
    if (!article) return;
    article.addEventListener('click', function(e) {
      // h2, h3, p, li をクリックした場合
      var target = e.target.closest('h2, h3, p, li');
      if (!target) return;
      // パネルが表示中のみ
      if (!panel || !panel.classList.contains('tts-panel-visible')) return;

      // クリックされた要素のインデックスを探す
      state.blocks = collectBlocks();
      var idx = state.blocks.indexOf(target);
      if (idx === -1) return;

      synth.cancel();
      stopKeepAlive();
      state.currentIndex = idx;
      state.playing = true;
      state.paused = false;
      updateUI();
      speakBlock(idx);
      startKeepAlive();
    });
  }

  // --- キーボードショートカット ---
  document.addEventListener('keydown', function(e) {
    // パネルが表示されていない場合は無視
    if (!panel || !panel.classList.contains('tts-panel-visible')) return;
    // input/textarea にフォーカスがある場合は無視
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

    switch(e.key) {
      case ' ':
        e.preventDefault();
        if (!state.playing) {
          state.blocks = collectBlocks();
          startReading();
          startKeepAlive();
        } else if (state.paused) {
          resumeReading();
          startKeepAlive();
        } else {
          pauseReading();
          stopKeepAlive();
        }
        break;
      case 'ArrowLeft':
        e.preventDefault();
        skipBackward();
        break;
      case 'ArrowRight':
        e.preventDefault();
        skipForward();
        break;
      case 'Escape':
        stopReading();
        stopKeepAlive();
        panel.classList.remove('tts-panel-visible');
        floatingBtn.classList.add('tts-fab-visible');
        break;
    }
  });

  // --- 初期化 ---
  document.addEventListener('DOMContentLoaded', function() {
    // article がないページ（index等）ではUIを出さない
    if (!document.querySelector('article')) return;
    createUI();
    createFAB();
    enableClickToStart();
    // 初回の音声取得
    ensureVoice();
  });

  // ページ離脱時にクリーンアップ
  window.addEventListener('beforeunload', function() {
    synth.cancel();
    stopKeepAlive();
  });

})();
