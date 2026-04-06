# G10 Textbook — Visualization Overhaul (Ralph-Loop Instructions)

## Project
G10通貨国の金融市場教科書（200ページ超）に、インラインSVGチャート＋注釈マーカーを全面導入する。
テキスト中心の構成を見直し、読者が一目で歴史的文脈を掴めるようにする。

## Workflow (EVERY iteration)
1. **Read PRD.md** — 最初の未完了タスク (- [ ]) を見つける
2. **Read progress.txt** — 前イテレーションの作業を把握する
3. **(必要なら) WebSearchで数値確認** — チャートに使うデータポイントの正確性を担保
4. **対象HTMLファイルを読む** — 既存構造を把握
5. **インラインSVGチャートを実装** — 既存テキストは削除せず、適切な位置に追加挿入
6. **検証** — HTMLをBashで `grep` してSVG要素が含まれていることを確認
7. **PRD.md を更新** — 完了タスクを - [x] に変更
8. **progress.txt を更新** — 何を追加したか記録
9. **Git commit** — 変更をコミット（git initされていなければスキップ）
10. **全タスク完了時** — EXIT_SIGNAL: COMPLETE を出力

## Rules
- 1イテレーション = 1タスクのみ
- 質問せず自律的に判断する
- **外部CDN/library禁止** — 純粋なインラインSVG + Vanilla JS
- **データはハードコード** — 月次/年次代表値を配列で埋め込む
- **既存コンテンツを削除しない** — 追加のみ
- **注釈マーカーは10個以下** — 多すぎると読めない
- 数値は推測ではなくWebSearchで確認すること

## SVG Chart Implementation Pattern

### 基本構造
```html
<figure class="chart-figure">
  <figcaption class="chart-title">S&amp;P 500 Long-term Chart (1950-2026)</figcaption>
  <svg class="svg-chart" viewBox="0 0 800 400" preserveAspectRatio="xMidYMid meet">
    <!-- グリッド線 -->
    <g class="chart-grid">
      <line x1="60" y1="50" x2="60" y2="360" />
      <line x1="60" y1="360" x2="780" y2="360" />
      <!-- 横グリッド -->
    </g>
    <!-- 価格ライン -->
    <path class="chart-line" d="M 60,300 L 100,280 L ..." fill="none" stroke="#00d4aa" stroke-width="2"/>
    <!-- 注釈マーカー -->
    <g class="chart-annotation">
      <circle cx="350" cy="120" r="5" fill="#ff6b6b"/>
      <line x1="350" y1="120" x2="350" y2="80" stroke="#ff6b6b" stroke-width="1"/>
      <text x="350" y="75" text-anchor="middle" fill="#ff6b6b" font-size="11">2000 ドットコムピーク</text>
    </g>
    <!-- X/Y軸ラベル -->
    <g class="chart-axis">
      <text x="60" y="380">1950</text>
      <text x="780" y="380" text-anchor="end">2026</text>
    </g>
  </svg>
  <p class="chart-caption">出典: S&amp;P, FRED. 主要イベントを注釈表示。</p>
</figure>
```

### 注釈の質
注釈は「いつ何が起きたか」を直接伝える。例:
- "1987-10 ブラックマンデー -22%"
- "2008-09 リーマン破綻"
- "2020-03 COVID底"
- "2024-02 日経 34年ぶり最高値更新"

### データ精度
- 月次データで十分（年次でも可）
- 主要転換点・ピーク・ボトムは正確に
- 中間データはスムージングOK

## File Locations
- 共通CSS: assets/style.css （Phase 0で .svg-chart 等のスタイルを追加）
- 共通JS: assets/charts.js （Phase 0で作成）
- 各ページ: us/, japan/, eurozone/, uk/, switzerland/, australia/, newzealand/, canada/, sweden/, norway/

## Verification
タスク完了前に必ず:
```bash
grep -c '<svg' [updated_file.html]   # SVGが追加されたか確認
grep -c 'chart-annotation' [file]    # 注釈が含まれるか
```
