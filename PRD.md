# Project: G10 Textbook — Visualization Phase 2 (Fix + Coverage)

## Overview
前回ループでチャート追加したが、(1) 注釈テキストが重なって読めない、(2) 多くのページにチャートが無い漏れが多発している。
本ループは「注釈レイアウト修正 + チャート漏れ全埋め」を目的とする。

## ユーザー指摘の問題
1. **チャート上の文字が重なっている** — us/02_policy_rate.html, us/09_equity_recent.html などで注釈ラベルが密集して読めない
2. **チャートが無いページが多い** — 03_fiscal_policy, 04_employment, 05_inflation, 09_equity_recent, 10_equity_current, 11_bond_market, 12_short_rates 等

## Phase 0: 注釈レイアウトエンジン修正（最優先）

- [x] Task 1: assets/charts.js を修正。注釈ラベルの衝突回避ロジックを追加：(a) ラベルを上下交互に配置（above/below）、(b) X座標が近接する場合は縦に積み上げる、(c) リーダー線を追加してマーカー→ラベルを結ぶ、(d) 必要なら短縮表記（例: "Black Monday" だけ）
- [x] Task 2: assets/style.css の .chart-annotation スタイルを更新。背景にダークな半透明矩形（rect）を入れて文字を読みやすくする。font-sizeは10px固定。.chart-annotation-bg, .chart-annotation-line を追加
- [x] Task 3: us/02_policy_rate.html — 既存チャートを再生成。注釈密度を下げる（重要イベント6個に絞る）+ 上下交互配置を適用。視覚確認のためHTMLを再読込してSVG構造を検証
- [x] Task 4: us/06_equity_overview.html, us/13_long_rates.html, us/15_crises.html を再生成（注釈整理）
- [x] Task 5: japan/02_policy_rate.html, japan/06_equity_overview.html, japan/13_long_rates.html, japan/14_currency.html を再生成（注釈整理）
- [x] Task 6: 残りの既存チャートページ（eurozone, uk, switzerland, australia, newzealand, canada, sweden, norway の 02/06/13/14/15）を一括スキャンし、注釈密度が高いものだけリトライ。Glob+Grepで `chart-annotation` 数が10以上のファイルを抽出

## Phase 1: 米国（US）— 漏れ埋め
- [x] Task 7: us/03_fiscal_policy.html — 債務/GDP比 推移チャート（1940-2026, %）+ 注釈（WWII、Reagan減税、IRA/CHIPS等）
- [x] Task 8: us/04_employment.html — 失業率推移チャート（1948-2026, %）+ 注釈（70sスタグフレーション、GFC10%、COVID14.7%、3.4%最低）
- [x] Task 9: us/05_inflation.html — CPI YoY推移チャート（1960-2026, %）+ 注釈（70sインフレ、Volcker、2022 9.1%ピーク）
- [x] Task 10: us/09_equity_recent.html — S&P500 2000-2019チャート + 注釈（ドットコム崩壊、住宅バブル、リーマン、QE回復、2018下落）
- [x] Task 11: us/10_equity_current.html — S&P500 2020-2026チャート + 注釈（COVID、AI相場、2024最高値、2025調整等）
- [x] Task 12: us/11_bond_market.html — 米国債発行残高チャート（1980-2026, $trillion）+ 注釈（GFC膨張、QE、2024 35T突破）
- [x] Task 13: us/12_short_rates.html — Fed Funds vs SOFR vs T-Bill 3M 短期金利チャート

## Phase 2: 日本（JP）— 漏れ埋め
- [x] Task 14: japan/03_fiscal_policy.html — 債務/GDP推移（1980-2026, %）+ 注釈（バブル崩壊財政出動、コロナ、260%超）
- [x] Task 15: japan/04_employment.html — 失業率推移（1980-2026）+ 注釈（バブル期2%、失業率5.5%ピーク2002、2.4%最低）
- [x] Task 16: japan/05_inflation.html — CPI推移（1970-2026）+ 注釈（オイルショック、デフレ期、2024 2%超え）
- [x] Task 17: japan/09_equity_recent.html, japan/10_equity_current.html — Nikkei 2000-2019, 2020-2026チャート両方
- [x] Task 18: japan/11_bond_market.html — JGB発行残高 + 日銀保有比率チャート

## Phase 3: ユーロ圏（EU）— 漏れ埋め
- [x] Task 19: eurozone/03_fiscal_policy.html — ユーロ圏債務/GDP推移 + PIIGSとコアの対比
- [x] Task 20: eurozone/04_employment.html, eurozone/05_inflation.html — 失業率・HICP推移
- [x] Task 21: eurozone/09_equity_recent.html, eurozone/10_equity_current.html — Stoxx 50 2000-2019, 2020-2026

## Phase 4: 英国（UK）— 漏れ埋め
- [x] Task 22: uk/03_fiscal_policy.html, uk/04_employment.html, uk/05_inflation.html
- [x] Task 23: uk/09_equity_recent.html, uk/10_equity_current.html — FTSE100 期間別

## Phase 5: スイス（CH）— 漏れ埋め
- [x] Task 24: switzerland/03_fiscal_policy.html, switzerland/04_employment.html, switzerland/05_inflation.html
- [x] Task 25: switzerland/06_equity_overview.html, switzerland/09_equity_recent.html, switzerland/10_equity_current.html — SMI チャート

## Phase 6: 豪州（AU）— 漏れ埋め
- [x] Task 26: australia/03_fiscal_policy.html, australia/04_employment.html, australia/05_inflation.html
- [x] Task 27: australia/09_equity_recent.html, australia/10_equity_current.html, australia/13_long_rates.html

## Phase 7: NZ — 漏れ埋め
- [x] Task 28: newzealand/03_fiscal_policy.html, newzealand/04_employment.html, newzealand/05_inflation.html
- [x] Task 29: newzealand/06_equity_overview.html, newzealand/14_currency.html

## Phase 8: カナダ — 漏れ埋め
- [x] Task 30: canada/03_fiscal_policy.html, canada/04_employment.html, canada/05_inflation.html
- [x] Task 31: canada/06_equity_overview.html, canada/09_equity_recent.html, canada/10_equity_current.html

## Phase 9: 北欧 — 漏れ埋め
- [x] Task 32: sweden/03_fiscal_policy.html, sweden/04_employment.html, sweden/05_inflation.html
- [x] Task 33: sweden/06_equity_overview.html, sweden/14_currency.html
- [x] Task 34: norway/03_fiscal_policy.html, norway/04_employment.html, norway/05_inflation.html
- [ ] Task 35: norway/06_equity_overview.html (OBX), norway/15_crises.html

## Phase 10: 監査と最終
- [ ] Task 36: 全200ページをスキャンし、`grep -L 'svg-chart' *.html` で「chart要素を一切持たないページ」リストを作成（progress.txtに記録）。明らかにビジュアル化が必要なページ（07/08/16/17/18/19/20）に最低1つはチャートまたはタイムラインを追加可能か検討
- [ ] Task 37: 全 02_policy_rate / 06_equity_overview ページを再度スキャン。注釈ラベル数が10超のファイルがあれば再修正
- [ ] Task 38: progress.txt にPhase 2の最終サマリーを記載（追加チャート総数、修正ファイル数、残課題）

## Constraints
- **外部CDN/library禁止** — 純粋なインラインSVG + Vanilla JS
- **データはハードコード** — 月次/年次代表値の配列
- **既存テキスト・テーブル削除禁止** — チャートは追加挿入のみ
- **注釈は6個以下を推奨** — 多すぎたら主要なものだけに絞る
- **ラベル位置は上下交互** — 連続するラベルが重ならないように
- **チャート1つあたり viewBox="0 0 800 420"** 推奨。下部40pxは注釈用余白を確保
- **数値はWebSearchで確認可能** — 推測しない

## Notes
### 注釈衝突回避アルゴリズム（charts.jsに実装）
```javascript
// イベントをX座標でソート → ラベルを上下交互配置 → 縦衝突したらY方向にオフセット
function placeAnnotations(events, chartWidth) {
  const sorted = [...events].sort((a, b) => a.x - b.x);
  return sorted.map((ev, i) => ({
    ...ev,
    labelY: i % 2 === 0 ? ev.y - 30 : ev.y + 30,  // 上下交互
    labelAnchor: ev.x < 60 ? 'start' : ev.x > chartWidth - 60 ? 'end' : 'middle'
  }));
}
```

### 検証コマンド
```bash
# チャート数カウント
grep -c '<svg class="svg-chart"' [file.html]
# 注釈数カウント
grep -c 'chart-annotation' [file.html]
```
