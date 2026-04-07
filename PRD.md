# Project: G10 Textbook — Quiz Mode

## Overview
教科書の知識を能動的に学べるクイズモード（5択選択式・解説付き・カテゴリー別）を実装する。
新規ページ `summary/quiz.html` を作成し、カテゴリー選択 → 出題 → 回答 → 解説 → スコアの流れで学習可能にする。

## 機能要件
1. **5択選択式** (multiple choice)
2. **カテゴリー別** — 8カテゴリーから選択 or 全カテゴリーランダム
3. **解説必須** — 正解/不正解の理由 + 関連ページへのリンク
4. **スコア表示** — 正答率、連続正解、ベスト記録（localStorage）
5. **問題シャッフル** — 毎回ランダム順
6. **難易度** — easy/medium/hard 表示
7. **オフライン動作** — 純HTML+JS、外部CDN禁止

## カテゴリー
1. 🏦 中央銀行・金融政策（Fed/ECB/BOJ等の歴史・現職・政策）
2. 📈 株式市場（指数・歴史・主要イベント）
3. 💵 為替・通貨（主要通貨・通貨制度・歴史的な為替イベント）
4. 📊 債券・金利（国債市場・利回り・サイクル）
5. ⚡ 金融危機（歴史的な危機・原因・影響）
6. 📉 マクロ経済（インフレ・雇用・財政）
7. 🏛️ 規制・銀行制度（規制変遷・主要銀行）
8. 🌍 地政学（国際関係・貿易戦争・制裁）

## Tasks

### Phase 0: クイズ問題データ（カテゴリー別JS）

各カテゴリ20-30問、合計200+問を目指す。スキーマ:
```javascript
{
  id: "fed-volcker-1",
  category: "中央銀行",
  difficulty: "medium",
  question: "1979年にFRB議長に就任し、徹底したインフレ退治のため政策金利を20%まで引き上げた人物は？",
  choices: [
    "アラン・グリーンスパン",
    "ポール・ボルカー",
    "ベン・バーナンキ",
    "ジャネット・イエレン",
    "ジェローム・パウエル"
  ],
  answer: 1,  // index
  explanation: "ポール・ボルカー(Paul Volcker)は1979-1987年のFRB議長。第2次オイルショック後の二桁インフレに対し、FFレートを最高20%まで引き上げる超金融引き締めを断行。1982年までに二桁インフレを鎮静化させた。",
  related: "us/01_central_bank.html"
}
```

- [x] Task 1: data/quiz/q_central_bank.js を作成。中央銀行・金融政策カテゴリの問題30問（Fed歴代議長、ECB、BOJ、SNB、各国政策決定の重要事項、現職人事を含む2026年4月時点の正確な情報）
- [x] Task 2: data/quiz/q_equity.js — 株式市場30問（NYSE/NASDAQ歴史、日経バブル、FTSE、DAX、Black Monday、ドットコム、リーマン後、AI相場等）
- [x] Task 3: data/quiz/q_fx.js — 為替・通貨30問（ブレトンウッズ、プラザ合意、CHF上限撤廃、Brexit、円安、各通貨の特徴）
- [x] Task 4: data/quiz/q_bonds.js — 債券・金利30問（10Y UST、JGB、Bund、Volcker期、QE、YCC、2022債券暴落）
- [x] Task 5: data/quiz/q_crises.js — 金融危機30問（1907、1929、1987、1997アジア、1998LTCM、2008リーマン、2010欧州債務、2023SVB/CS）
- [x] Task 6: data/quiz/q_macro.js — マクロ経済30問（インフレ、失業率、財政、IRA、CHIPS、日本の財政、ユーロ圏SGP）
- [x] Task 7: data/quiz/q_regulation.js — 規制・銀行30問（Glass-Steagall、Dodd-Frank、Basel、MiFID、UBS/CS、Big4/Big5）
- [x] Task 8: data/quiz/q_geopolitics.js — 地政学30問（ニクソンショック、米中貿易戦争、ロシアウクライナ、エネルギー危機、トランプ関税）

### Phase 1: クイズエンジン
- [x] Task 9: assets/quiz.css を作成。Bloomberg風ダークテーマ。.quiz-container, .quiz-question, .quiz-choice, .quiz-choice.correct, .quiz-choice.wrong, .quiz-explanation, .quiz-progress, .quiz-score, .category-card, 結果画面 .quiz-result 等
- [x] Task 10: assets/quiz.js を作成。クラスQuizEngine: loadQuestions(category|all), shuffle, nextQuestion, submitAnswer, showExplanation, calculateScore, saveBestScore (localStorage), restart, getStats. 5択ボタン、解説パネル、進捗バーをレンダリング

### Phase 2: メインページ
- [x] Task 11: summary/quiz.html を新規作成。レイアウト:
  - **トップ**: タイトル、ベストスコア表示
  - **カテゴリー選択画面**: 8カテゴリーカード（アイコン+名前+問題数+ベストスコア）+「全カテゴリーランダム」ボタン
  - **クイズ画面**: 進捗バー、現在の問題、5択ボタン、Submit
  - **解説画面**: 正誤表示、解説テキスト、関連ページリンク、Next ボタン
  - **結果画面**: スコア、正答率、カテゴリー別内訳、Restart/カテゴリー選択へ戻る
  - 設定: 1セッションあたり10問 or 20問 or 全問選択可能

### Phase 3: 統合
- [x] Task 12: index.html のクイックリンクとカード上部に「📝 Quiz Mode」リンクバナー追加。Geopolitical Map と並べて目立つ位置に
- [x] Task 13: 各国 01_central_bank.html の Summary Dashboard に「→ Quiz でこの国を学ぶ」リンクを追加（クイズページにcountry=USなどクエリパラメータ付き）

### Phase 4: 検証・拡張
- [x] Task 14: ローカルHTTPサーバーで quiz.html を起動して動作確認。各カテゴリ選択 → 問題表示 → 5択クリック → 解説 → Next → 結果表示の一連の流れが動作することをplaywright経由で検証。スクリーンショットを保存
- [x] Task 15: progress.txt にQuiz Mode実装サマリーを記載（問題数、カテゴリー数、機能一覧）

## Constraints
- 純HTML + Vanilla JS + CSS。外部CDN/library禁止
- データは別ファイル（data/quiz/q_*.js）にwindow.QUIZ_QUESTIONS_*配列として埋め込み
- localStorage でベストスコア保存
- file://でも動作すること
- 解説は教科書の該当ページに合わせた事実ベース
- 2026年4月時点の最新情報（特に現職中銀総裁、最近の利上げ・利下げ等）

## Notes

### クイズ画面UIフロー
```
[Start Screen]
  カテゴリーカード × 8
  ↓ select
[Quiz Screen]
  Q1: ...
  ○ A
  ○ B
  ○ C  ← clicked
  ○ D
  ○ E
  [Submit]
  ↓
[Explanation Screen]
  ✗ 不正解 — 正解はB
  解説: ...
  [Next →]
  ↓ (10 questions)
[Result Screen]
  Score: 7/10 (70%)
  正解: 7問 / 不正解: 3問
  [Restart] [カテゴリー選択へ]
```

### localStorage キー
- `g10quiz_best_<category>` — カテゴリー別ベスト正答率
- `g10quiz_history` — 直近10回の成績
- `g10quiz_total_correct` — 累計正解数

### サンプル問題
カテゴリー「中央銀行」:
> Q. 2024年3月に日銀がマイナス金利政策を解除した時の総裁は？
> A) 黒田東彦
> B) 白川方明
> C) 福井俊彦
> D) **植田和男**
> E) 山口廣秀
> 
> 解説: 植田和男総裁は2023年4月就任。2024年3月19日の金融政策決定会合でマイナス金利解除（無担保コール翌日物を0〜0.1%に）、YCC撤廃、ETF・J-REIT新規買入終了を決定。これは17年ぶりの利上げで、量的・質的金融緩和の終了を意味した。

カテゴリー「為替」:
> Q. 1985年9月、ニューヨークのプラザホテルで合意され、急激なドル安を誘導したのは？
> A) ルーブル合意
> B) **プラザ合意**
> C) ブレトンウッズ協定
> D) ジャマイカ合意
> E) スミソニアン合意
> 
> 解説: 1985年9月22日、G5（日米英仏独）財務相・中央銀行総裁会議で合意。当時の高金利・ドル高による米国貿易赤字是正を目的とし、各国が協調介入でドル安を誘導。USD/JPYは1年で240円→150円台へ。日本のバブル経済の引き金にもなった。
