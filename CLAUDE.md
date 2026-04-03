# G10 Markets Historical Textbook — Ralph-Loop Instructions

## Project
G10通貨国の株式市場・金利市場の歴史をカバーするHTML教科書を作成する。各国20ページ、合計200ページ超。

## Workflow (EVERY iteration)
1. **Read PRD.md** — 最初の未完了タスク (- [ ]) を見つける
2. **Read progress.txt** — 前イテレーションの作業を把握する
3. **実装する** — そのタスクを完全に実装する
4. **検証する** — 作成したHTMLファイルが正しく生成されたことを確認（ファイル存在、基本構造）
5. **PRD.md を更新** — 完了タスクを - [x] に変更
6. **progress.txt を更新** — ログエントリを追記
7. **Git commit** — 変更をコミット
8. **全タスク完了時** — EXIT_SIGNAL: COMPLETE を出力

## Rules
- 1イテレーション = 1タスクのみ
- 質問せず自律的に判断する
- 完了前に必ず検証する
- EXIT_SIGNAL: COMPLETE は全タスク完了時のみ

## Content Guidelines

### ページ構造
各HTMLページは以下の構造に従う:
```html
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>[Country] - [Topic] | G10 Markets Textbook</title>
  <link rel="stylesheet" href="../assets/style.css">
</head>
<body>
  <nav class="sidebar"><!-- 各国ページ一覧 --></nav>
  <main class="content">
    <header><!-- ページタイトル、パンくずリスト --></header>
    <article><!-- 本文 --></article>
    <footer class="sources"><!-- 出典一覧 --></footer>
  </main>
  <script>/* テーブルソート等 */</script>
</body>
</html>
```

### Central Bank Timeline Page (各国 page 1)
必ず以下を含む:
- **中央銀行の設立経緯と使命**
- **歴代総裁/議長の一覧テーブル**: 名前、在任期間、タカ/ハト属性（🦅/🕊️アイコン）、主要な政策決定
- **現在の政策委員会メンバー**: 名前、就任日、タカ/ハト属性
- **金融政策の変遷年表**: 年、政策金利、主要イベント
- **政策フレームワークの変化**: インフレターゲット導入、QE開始など

### データ表現
- 年表は `<table>` タグで構造化
- ソート可能にする（vanilla JS）
- 重要イベントは色分け（利上げ=赤系、利下げ=青系、危機=オレンジ系）
- 全データに出典を `<cite>` または脚注で明記

### ソース/出典ルール
- 各セクションの末尾に出典リスト
- フォーマット: `[番号] 著者/機関, "タイトル", 年, URL（可能な場合）`
- 推測や不確実な情報は「市場コンセンサスベース」等と注記
- 歴代総裁のタカ/ハト分類は市場での一般的評価に基づく旨を明記

### デザイン
- Bloomberg Terminal風ダークテーマ
- フォント: monospace系（数字）+ sans-serif（テキスト）
- カラーパレット: 背景 #1a1a2e, テキスト #e0e0e0, アクセント #00d4aa (green), #ff6b6b (red), #4ecdc4 (teal)
- テーブルはストライプ行、ホバーハイライト
- レスポンシブ（モバイル対応）

### 言語
- メインは日本語
- 固有名詞（人名、機関名）は英語併記
- 例: 「アラン・グリーンスパン (Alan Greenspan)」

### Content Depth
各ページは十分な深さを持つこと:
- 最低2000文字/ページ（日本語テキスト部分）
- 年表テーブルは主要イベントを網羅（重要年は漏れなく）
- 単なる箇条書きではなく、文脈と分析を含む narrative
- 出来事の因果関係を説明する

### Template Usage
- templates/base.html の構造を参考にする（コピーではなく参照）
- assets/style.css を全ページで共有
- ナビゲーションは各国20ページ + 他国へのリンク

### File Naming
- 各国ディレクトリ: us/, eurozone/, japan/, uk/, switzerland/, australia/, newzealand/, canada/, sweden/, norway/
- ページファイル: 01_central_bank.html 〜 20_lessons.html
- 番号は2桁ゼロ埋め

## Quality Checklist (per page)
- [ ] HTMLが正しい構造（DOCTYPE, charset, viewport）
- [ ] style.cssへのリンクが正しいパス
- [ ] ナビゲーションが機能する
- [ ] 全データに出典が記載
- [ ] テーブルが適切にフォーマット
- [ ] 2000文字以上の実質的コンテンツ
- [ ] 固有名詞に英語併記
