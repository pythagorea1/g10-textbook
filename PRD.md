# Project: G10 Textbook — Chart & Content Mega-Upgrade

## Overview
全ページのチャートを月次データに高精度化し、利回りスプレッドチャート（2s10s, 5s30s）を追加。
中央銀行総裁の顔写真・具体的な金融政策エピソードで記憶定着を強化。
トップページにG10 10Y金利比較チャートとEquity比較チャートを追加。

## Key Deliverables
1. 全既存チャート → 月次データ化（年次/四半期 → Monthly）
2. 各国13_long_rates → 2s10s, 5s30sスプレッドチャート追加
3. index.html → G10 10Y比較 + Equity比較チャート
4. 01_central_bank → 歴代総裁の顔写真 + 印象的な政策エピソード
5. chart-builder.js → spread計算、monthly軸、tooltip対応

## Tasks

### Phase 0: Infrastructure
- [x] Task 0.1: chart-builder.js をアップグレード — monthly軸（年.月の小数表記対応）、spreadチャート自動計算（2系列の差分をplot）、凡例の改善、x軸の年月ラベル。新API: `ChartBuilder.spread(id, {title, seriesA, seriesB, ...})` を追加。ゼロラインを描画し、マイナス領域を赤く塗る

### Phase 1: US Charts — Monthly Upgrade
- [x] Task 1.1: us/02_policy_rate.html — FF金利を月次データ化（1954-2026, ~860点）。WebSearchで主要転換点の正確な日付と値を確認。既存年次チャートを置き換え
- [x] Task 1.2: us/05_inflation.html — CPI前年比を月次データ化（1960-2026）。既存年次チャートを置き換え
- [x] Task 1.3: us/04_employment.html — 失業率を月次データ化（1948-2026）。NFP/失業率の主要転換点を注釈
- [x] Task 1.4: us/13_long_rates.html — 2Y/5Y/10Y/30Y利回りを月次化。新規: 2s10sスプレッド + 5s30sスプレッドチャートを追加。逆イールド期間をハイライト
- [x] Task 1.5: us/06_equity_overview.html — S&P 500を月次データ化（2000-2026, 300+点）。既存四半期チャートを置き換え
- [x] Task 1.6: us/01_central_bank.html — 歴代Fed議長（Martin, Burns, Volcker, Greenspan, Bernanke, Yellen, Powell）の写真URL（Wikipedia Commons）と印象的な政策エピソード・名言を追加

### Phase 2: Japan Charts — Monthly Upgrade
- [x] Task 2.1: japan/02_policy_rate.html + japan/05_inflation.html — BOJ政策金利 + CPI月次化
- [x] Task 2.2: japan/13_long_rates.html — JGB利回り月次化 + 2s10s/5s30sスプレッド追加。YCC期間をハイライト
- [x] Task 2.3: japan/06_equity_overview.html — 日経225月次化 + japan/01_central_bank.html — 歴代総裁写真・政策エピソード

### Phase 3: Eurozone Charts — Monthly Upgrade
- [x] Task 3.1: eurozone/02_policy_rate.html + eurozone/05_inflation.html — ECB主要金利 + HICP月次化
- [x] Task 3.2: eurozone/13_long_rates.html — Bund利回り月次化 + 2s10sスプレッド
- [x] Task 3.3: eurozone/06_equity_overview.html — DAX月次化 + eurozone/01_central_bank.html — 歴代ECB総裁写真

### Phase 4: UK Charts — Monthly Upgrade
- [x] Task 4.1: uk/02_policy_rate.html + uk/05_inflation.html — BOE Bank Rate + CPI月次化
- [x] Task 4.2: uk/13_long_rates.html — Gilt利回り月次化 + 2s10s/5s30sスプレッド
- [x] Task 4.3: uk/06_equity_overview.html — FTSE 100月次化 + uk/01_central_bank.html — 歴代BOE総裁写真

### Phase 5: Switzerland + Australia — Monthly Upgrade
- [x] Task 5.1: switzerland/02 + 13_long_rates — SNB金利 + Swiss yields月次化 + スプレッド
- [x] Task 5.2: australia/02 + 13_long_rates — RBA cash rate + AU yields月次化 + スプレッド
- [x] Task 5.3: switzerland/06 + australia/06 — SMI + ASX月次化。各国01_central_bank に総裁情報追加

### Phase 6: Canada + New Zealand — Monthly Upgrade
- [x] Task 6.1: canada/02 + 13_long_rates — BOC rate + Canada yields月次化 + スプレッド
- [x] Task 6.2: newzealand/02 + 13_long_rates — RBNZ OCR + NZ yields月次化 + スプレッド
- [x] Task 6.3: canada/06 + newzealand/06 — TSX + NZX月次化。各国01に総裁情報追加

### Phase 7: Sweden + Norway — Monthly Upgrade
- [x] Task 7.1: sweden/02 + 13_long_rates — Riksbank repo rate + SGB yields月次化 + スプレッド
- [x] Task 7.2: norway/02 + 13_long_rates — Norges Bank rate + NGB yields月次化 + スプレッド
- [x] Task 7.3: sweden/06 + norway/06 — OMXS30 + OBX月次化。各国01に総裁情報追加

### Phase 8: Top Page & Cross-Country Comparison
- [x] Task 8.1: index.html — G10 10Y国債利回り比較チャート（10本線、月次、2000-2026）
- [x] Task 8.2: index.html — G10主要株式指数パフォーマンス比較（2000年=100にリベース、月次）
- [x] Task 8.3: index.html — G10政策金利比較チャート（月次、全10中銀）

### Phase 9: Final Polish
- [x] Task 9.1: 全チャートの注釈・キャプション統一レビュー。データ不整合修正
- [x] Task 9.2: summary/g10_timeline.html 更新 — 新チャートへのリンク追加

## Constraints
- **外部CDN/library禁止** — 純粋なインラインSVG + Vanilla JS + chart-builder.js
- **データはハードコード** — 月次代表値を配列で埋め込む
- **WebSearchで数値確認** — 月次データの正確性を担保（特に転換点）
- **既存テキストコンテンツを削除しない** — チャートは追加・置換のみ
- **写真はWikipedia Commonsの直リンク** — 著作権フリーのもののみ
- **file:// で動作すること** — ローカルHTMLとして機能

## Notes
- chart-builder.js は `<head>` でロード済み（全ページ）
- 月次データ: `{ start: 2000.0, step: 1/12, values: [...] }` or `[[year.frac, value], ...]`
- Spread = seriesA.value - seriesB.value を自動計算
- 2s10s = 10Y yield - 2Y yield（マイナス = 逆イールド → 赤で塗る）
- 5s30s = 30Y yield - 5Y yield
- 写真は `<img src="https://upload.wikimedia.org/..." alt="..." style="...">` で直接参照
