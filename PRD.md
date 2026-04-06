# Project: G10 Textbook — ビジュアル化大改修

## Overview
G10通貨国の金融市場教科書（200ページ超）に、テキスト中心の構成を見直して**インラインSVGチャート＋注釈マーカー**を全面導入する。
現状は文章だらけで可読性が低い。各ページのトピックに応じたチャートを描き、グラフ上に主要イベント（バブル、危機、利上げ等）の注釈を直接表示する。

## ビジュアル化の方針
- **オフライン動作必須**: 純粋なインラインSVG（外部CDN・API禁止）
- **データはハードコード**: yfinance等は使えないので、月次/年次の代表値を直接配列として埋め込む
- **注釈マーカー必須**: チャート上にイベント点（●）+ラベル線+テキストを配置し、何があったか一目で分かるようにする
- **既存デザイン尊重**: Bloomberg風ダークテーマ。アクセントカラー（#00d4aa, #ff6b6b, #4ecdc4等）を使う
- **レスポンシブ**: SVGはviewBoxで可変。preserveAspectRatio対応

## チャート種類
1. **annotated-line-chart**: 株価/金利の長期推移＋イベント注釈（最重要）
2. **bar-chart**: 政策金利推移の段階的バー
3. **dual-axis-chart**: 為替と金利、株価とPER等の2軸
4. **stacked-area**: GDP構成、債務/GDP比等
5. **event-timeline**: 横軸時間の縦タイムライン（年表ビジュアル化）
6. **heat-strip**: 年ごとリターンを色分けセル

## Tasks

### Phase 0: 共通基盤（必須・最初に実施）
- [x] Task 1: assets/style.css に「Chart Components」セクションを追加。.svg-chart, .chart-title, .chart-axis, .chart-line, .chart-area, .chart-marker, .chart-annotation, .chart-grid, .chart-legend のスタイルを定義（ダークテーマに合わせた配色）
- [x] Task 2: assets/charts.js を新規作成。再利用可能なJS関数群: renderAnnotatedLineChart(containerId, data, events), renderBarChart, renderEventTimeline 等。SVGをDOMに動的生成する純Vanilla JS。各ページから読み込む

### Phase 1: 米国（US）— 最も重要な国
- [ ] Task 3: us/02_policy_rate.html — Fed Funds Rate長期推移チャート（1955-2026）+ Volcker利上げ・GFC利下げ・QE開始・2022利上げ・2024利下げ等の注釈
- [ ] Task 4: us/06_equity_overview.html — S&P 500長期チャート（1950-2026, 対数軸）+ ブラックマンデー・ドットコム・GFC・COVID・AI相場の注釈マーカー
- [ ] Task 5: us/13_long_rates.html — 10年米国債利回り長期チャート（1962-2026）+ Volcker期高金利・低金利時代・2022急騰の注釈
- [ ] Task 6: us/15_crises.html — 主要危機のevent-timeline縦タイムライン（1907パニック〜SVB破綻まで）

### Phase 2: 日本（JP）
- [ ] Task 7: japan/02_policy_rate.html — 政策金利推移チャート（1985-2026）+ バブル期高金利、ゼロ金利導入(1999)、量的緩和、マイナス金利(2016)、解除(2024)、2025利上げの注釈
- [ ] Task 8: japan/06_equity_overview.html — 日経225長期チャート（1970-2026, 対数軸）+ バブル天井38915円(1989)、失われた30年、2024年34年ぶり最高値更新の注釈
- [ ] Task 9: japan/13_long_rates.html — 10年JGB利回り推移（1985-2026）+ YCC開始・解除の注釈
- [ ] Task 10: japan/14_currency.html — USDJPY長期チャート（1971-2026）+ プラザ合意、79円台超円高、161円台円安(2024)の注釈

### Phase 3: ユーロ圏（EU）
- [ ] Task 11: eurozone/02_policy_rate.html — ECB主要リファイナンス金利推移（1999-2026）+ 危機対応・マイナス金利・2022利上げ・2024利下げの注釈
- [ ] Task 12: eurozone/06_equity_overview.html — Euro Stoxx 50 + DAX チャート（1990-2026）+ ドットコム、GFC、欧州債務危機、COVID、エネルギー危機の注釈
- [ ] Task 13: eurozone/15_crises.html — 欧州債務危機タイムライン（PIIGS各国スプレッド推移ビジュアル含む）

### Phase 4: 英国（UK）
- [ ] Task 14: uk/02_policy_rate.html — Bank Rate推移（1975-2026）+ ERM危機、Brexit、トラスショック、2024利下げの注釈
- [ ] Task 15: uk/06_equity_overview.html — FTSE 100長期チャート（1984-2026）+ Big Bang、ブラックウェンズデー、Brexit、COVIDの注釈
- [ ] Task 16: uk/14_currency.html — GBPUSD長期チャート + ERM離脱、Brexit、トラスショックの注釈

### Phase 5: スイス（CH）
- [ ] Task 17: switzerland/02_policy_rate.html — SNB政策金利推移 + マイナス金利導入・解除、2024年3月利下げ（先進国初）の注釈
- [ ] Task 18: switzerland/14_currency.html — EURCHFチャート + 1.20上限導入(2011)・撤廃ショック(2015)の劇的注釈
- [ ] Task 19: switzerland/15_crises.html — UBS/CS危機タイムライン（2008 UBS救済、2023 CS破綻→UBS統合）

### Phase 6: 豪州（AU）
- [ ] Task 20: australia/02_policy_rate.html — RBA Cash Rate推移 + 2010年代低金利、コロナ、2022利上げサイクルの注釈
- [ ] Task 21: australia/06_equity_overview.html — ASX 200長期チャート + 資源ブーム、GFC、COVID、最近のレンジ相場の注釈
- [ ] Task 22: australia/14_currency.html — AUDUSD長期チャート + 資源スーパーサイクル(2011 1.10超)、コモディティ相関の注釈

### Phase 7: NZ・カナダ
- [ ] Task 23: newzealand/02_policy_rate.html — RBNZ OCR推移 + 1990年世界初IT導入、最近の利上げ・利下げの注釈
- [ ] Task 24: canada/02_policy_rate.html — BOC Overnight Rate推移 + 2022利上げ、2024年6月先進国一番乗り利下げの注釈
- [ ] Task 25: canada/14_currency.html — USDCAD長期 + 原油相関の注釈

### Phase 8: 北欧
- [ ] Task 26: sweden/02_policy_rate.html — Riksbank Repo Rate推移 + マイナス金利の先駆者(2015)、2024利下げの注釈
- [ ] Task 27: norway/02_policy_rate.html — Norges Bank政策金利 + 石油価格相関、2024利上げ継続の注釈
- [ ] Task 28: norway/14_currency.html — USDNOK + 油価相関チャート

### Phase 9: 横断・最終
- [ ] Task 29: index.html の Policy Rate Comparison を「年次推移ライン」に拡張。10カ国の政策金利推移を1つのチャートで重ねる（凡例＋ホバー）
- [ ] Task 30: 全カントリー 01_central_bank.html の歴代総裁テーブルの上に、議長別在任期間ガントチャート（横棒）を追加（例: Fedなら Greenspan→Bernanke→Yellen→Powell の在任期間をビジュアル化）
- [ ] Task 31: 全ページに「assets/charts.js」スクリプトタグを自動追加するBashスクリプトを実行

## Constraints
- **外部CDN/JS libraryは使わない**（オフラインHTML）
- **データはハードコード**（月次/年次の代表値を配列で。少数精鋭で良い）
- **正確な数値が分からない場合はWebSearchで確認**
- **既存のテキスト・テーブルは削除しない**。チャートは追加する形で挿入
- **チャートは記事の上部または該当セクションの先頭に配置**（読者がすぐ見られる位置）
- **イベント注釈は最重要部分のみ**（10個以下推奨。多すぎると読めない）
- 1タスク = 1ファイル更新を原則とする

## Notes
### SVGチャート設計指針
- viewBox="0 0 800 400" 程度のサイズ
- 上部余白50px（タイトル）、左60px（Y軸ラベル）、下部40px（X軸ラベル）、右20px
- グリッド線は薄い半透明（rgba(255,255,255,0.05)）
- ラインは2-3px、アクセントカラー
- 面塗りはグラデーション（上濃→下薄）
- 注釈マーカーは●（半径4-6px）+細い縦線+テキストラベル
- フォントサイズ: タイトル14px、軸ラベル10px、注釈11px

### データソース（参考）
- US: FRED (FEDFUNDS, SP500, DGS10) — 値はWebSearchで確認
- JP: BOJ統計、日経新聞 — 主要転換点の値
- 各国中銀公式サイト

### 注釈例（米国S&P500）
- 1987-10: ブラックマンデー（-22%/日）
- 2000-03: ドットコムピーク
- 2007-10: GFC前ピーク
- 2009-03: 底値666
- 2020-03: COVID底
- 2024-2025: AI相場で最高値更新
