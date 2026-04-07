# Project: G10 Textbook — Visualization Phase 3 (全セクション図解 + 国別サマリー)

## Overview
Phase 2では主要データページ（02, 06, 13, 14等）にチャートを追加したが、まだ未図解のセクションが多い:
- 07_equity_early, 08_equity_modern — 古い株価/取引所史
- 16_banking, 17_corporate, 18_regulation, 19_trade, 20_lessons — 銀行・規制・貿易・総括

本ループは以下を実現する:
1. **全セクションに最低1つの図解を追加**（単純なチャートでなくとも、タイムライン・円グラフ・ピクトグラム・バーチャート等）
2. **各国01_central_bank.htmlの先頭に「国別サマリーダッシュボード」を追加**（20ページの見取り図、主要指標、ハイライト）

## Phase 0: インフォグラフィック基盤

- [x] Task 1: assets/charts.js に以下の関数を追加: renderPieChart(containerId, slices), renderDonutChart, renderHorizontalBarChart, renderStackedBar, renderSummaryDashboard（country summary用の複合コンポーネント）, renderHistoricalTimeline（縦タイムライン、イベントカード形式）。既存のrenderAnnotatedLineChart等は残す。assets/style.css に .summary-dashboard, .dashboard-stat, .dashboard-highlight, .pie-chart, .donut-chart, .horizontal-bar などのスタイルを追加

## Phase 1: 各国の01_central_bank.html に「国別サマリーダッシュボード」を追加
各ページの `<article>` 冒頭、見出しの直後に挿入する。含めるもの:
- **Key Stats カード**: 中銀設立年 / 通貨 / 主要指数 / 政策金利 / 10年債利回り / GDP順位
- **20ページナビゲーションビジュアル**: 6カテゴリ（金融政策/マクロ/株式/債券・金利・為替/金融制度/総括）×該当ページへのリンクカード
- **Historical Highlights タイムライン**: その国の歴史上の重要10イベント（短い縦タイムライン）

- [x] Task 2: us/01_central_bank.html にサマリーダッシュボード追加（Fed 1913、USD、S&P500、Dual mandate、主要危機: 1907、1929、1987、2000、2008、2020、2023 SVB）
- [x] Task 3: japan/01_central_bank.html にサマリーダッシュボード追加（BOJ 1882、JPY、日経225、ゼロ金利/YCC/QQE、バブル崩壊1990、金融危機1997、アベノミクス2013、2024マイナス金利解除）
- [x] Task 4: eurozone/01_central_bank.html にサマリーダッシュボード追加（ECB 1998、EUR、Stoxx50、物価単一目標、ERM危機1992、ユーロ導入1999、欧州債務危機2010）
- [x] Task 5: uk/01_central_bank.html にサマリーダッシュボード追加（BOE 1694、GBP、FTSE100、Big Bang 1986、Black Wednesday 1992、Brexit 2016、LDI危機2022）
- [ ] Task 6: switzerland/01_central_bank.html にサマリーダッシュボード追加（SNB 1907、CHF、SMI、CHFショック2015、UBS救済2008、CS破綻2023）
- [ ] Task 7: australia/01_central_bank.html にサマリーダッシュボード追加（RBA 1960、AUD、ASX200、30年無景気後退、資源ブーム2011、2024-2026金利動向）
- [ ] Task 8: newzealand/01_central_bank.html にサマリーダッシュボード追加（RBNZ 1934、NZD、NZX50、世界初IT 1990、Orr辞任2025、Breman就任）
- [ ] Task 9: canada/01_central_bank.html にサマリーダッシュボード追加（BOC 1934、CAD、TSX、GFC耐性、2024先進国一番乗り利下げ）
- [ ] Task 10: sweden/01_central_bank.html にサマリーダッシュボード追加（Riksbank 1668 世界最古、SEK、OMX30、1990s銀行危機、マイナス金利先駆者2015）
- [ ] Task 11: norway/01_central_bank.html にサマリーダッシュボード追加（Norges Bank 1816、NOK、OBX、石油発見1969、GPFG世界最大SWF、1990s銀行危機）

## Phase 2: 未図解セクションの一括ビジュアル化

### Task 粒度: 1タスク = 1国の「残り未図解ページ全て」。
対象ページ（各国）: 07_equity_early, 08_equity_modern, 16_banking, 17_corporate, 18_regulation, 19_trade, 20_lessons
既にチャートがある場合はスキップ。無い場合は最低1図解を追加。

推奨図解タイプ:
- **07_equity_early**: 取引所設立タイムライン（縦）+ 戦前株価チャート（ある場合）
- **08_equity_modern**: 1980-1990s株価チャート（年次）+ 主要イベント注釈
- **16_banking**: 主要銀行の時価総額/資産バーチャート + 銀行数推移
- **17_corporate**: セクター構成円グラフ（時価総額ベース）+ トップ10企業バー
- **18_regulation**: 規制変遷タイムライン（縦、カード形式）
- **19_trade**: 貿易相手国バーチャート + 経常収支/GDP推移ライン
- **20_lessons**: キーラーニングのインフォグラフィック（数値カード + アイコン）

- [ ] Task 12: 米国（US） — us/07, us/08, us/16, us/17, us/18, us/19, us/20 を順にチェックし、未図解のものに最低1図解追加
- [ ] Task 13: 日本（JP） — japan/07, japan/08, japan/16, japan/17, japan/18, japan/19, japan/20
- [ ] Task 14: ユーロ圏（EU） — eurozone/07, eurozone/08, eurozone/16, eurozone/17, eurozone/18, eurozone/19, eurozone/20
- [ ] Task 15: 英国（UK） — uk/07, uk/08, uk/16, uk/17, uk/18, uk/19, uk/20
- [ ] Task 16: スイス（CH） — switzerland/07, switzerland/08, switzerland/16, switzerland/17, switzerland/18, switzerland/19, switzerland/20
- [ ] Task 17: 豪州（AU） — australia/07, australia/08, australia/16, australia/17, australia/18, australia/19, australia/20
- [ ] Task 18: NZ — newzealand/07, newzealand/08, newzealand/16, newzealand/17, newzealand/18, newzealand/19, newzealand/20
- [ ] Task 19: カナダ — canada/07, canada/08, canada/16, canada/17, canada/18, canada/19, canada/20
- [ ] Task 20: スウェーデン — sweden/07, sweden/08, sweden/16, sweden/17, sweden/18, sweden/19, sweden/20
- [ ] Task 21: ノルウェー — norway/07, norway/08, norway/16, norway/17, norway/18, norway/19, norway/20

## Phase 3: 監査
- [ ] Task 22: 全200ページを再スキャン。`grep -L 'svg-chart\|summary-dashboard\|pie-chart\|donut-chart\|historical-timeline' page.html` で「いかなるビジュアル要素も持たないページ」を抽出。見つかったページに最低1つ追加
- [ ] Task 23: us/08_equity_modern.html（ユーザー指摘ページ）を明示的に確認。1980s〜1990sのS&P500チャート（対数軸）が入っており、Black Monday 1987, Plaza 1985, LTCM 1998 等の注釈が上下交互配置で読みやすく表示されていることを確認。無ければ修正
- [ ] Task 24: progress.txt に Phase 3 の最終サマリー記載

## Constraints
- 既存チャート・テキストは削除しない。追加のみ
- データはハードコード。外部CDN/library禁止
- サマリーダッシュボードは高さ圧縮（scroll多発を避ける）
- 注釈ラベルは6個以下、上下交互配置のルールをPhase 2のchart挿入でも守る
- 1タスクで7ファイルも修正するTask 12-21は重いので、既に図解があるページはスキップして時間短縮

## Notes
### サマリーダッシュボードHTML構造例
```html
<section class="summary-dashboard">
  <div class="dashboard-stats">
    <div class="dashboard-stat">
      <div class="stat-label">中央銀行</div>
      <div class="stat-value">Federal Reserve</div>
      <div class="stat-sub">Established 1913</div>
    </div>
    <!-- ... more stats ... -->
  </div>
  <div class="dashboard-nav-grid">
    <!-- 6カテゴリ × ページリンクカード -->
  </div>
  <div class="dashboard-highlights">
    <h3>Historical Highlights</h3>
    <!-- 縦タイムライン -->
  </div>
</section>
```

### 検証
```bash
# 全ページのビジュアル要素カウント
for f in us japan eurozone uk switzerland australia newzealand canada sweden norway; do
  grep -c '<svg' $f/*.html | grep ':0' && echo "$f has charts missing"
done
```
