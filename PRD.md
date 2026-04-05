# Project: G10 Textbook — 全ページ内容レビュー・情報更新

## Overview
G10通貨国の金融市場教科書（200ページ超）の内容レビューと情報更新。
2026年4月時点の最新情報に基づき、古い情報・誤りを修正する。
index.htmlは既に更新済み。各国ページの情報を最新化する。

## 既に更新済みの内容（このループで再作業不要）
- index.html: 全面リデザイン完了
- japan/01_central_bank.html: 審議委員を2026年4月時点に更新済み（浅田統一郎、小枝淳子、増一行を追加）

## 重要な変更事項（各国ページに反映が必要）
- **RBNZ総裁**: Adrian Orr → Anna Breman（2025年12月就任、元Riksbank副総裁）
- **SNB議長**: Thomas Jordan → Martin Schlegel（2024年10月就任）
- **BOJ**: 2024年3月マイナス金利解除、2024年7月YCC終了・追加利上げ、2025年1月さらに利上げ（0.5%）
- **Fed**: Jerome Powellの議長任期は2026年5月まで（更新状況をWebSearchで確認すること）

## Tasks

### Phase 1: 中央銀行ページ（01_central_bank.html）— 最優先
- [x] Task 1: us/01_central_bank.html — Fed議長・FOMC委員の情報を確認し、古い情報があれば修正。Powell任期（2026年5月）に関する注記追加。政策金利の最新推移を反映
- [x] Task 2: eurozone/01_central_bank.html — ECB総裁・理事会メンバーの確認。Lagarde任期、最新政策（利下げサイクル等）を反映
- [x] Task 3: uk/01_central_bank.html — BOE総裁Bailey・MPC委員の確認。政策金利推移の最新化
- [x] Task 4: switzerland/01_central_bank.html — SNB議長をMartin Schlegelに更新。Thomas Jordan退任（2024年9月）を反映。理事会メンバー更新
- [x] Task 5: australia/01_central_bank.html — RBA総裁Michele Bullock、理事会メンバーの確認。2023年RBA改革（デュアルボード制）の反映
- [x] Task 6: newzealand/01_central_bank.html — RBNZ総裁をAnna Bremanに更新。Adrian Orr辞任（2025年3月）→Christian Hawkesby暫定→Breman就任（2025年12月）の経緯を追加
- [x] Task 7: canada/01_central_bank.html — BOC総裁Tiff Macklem、政策金利推移の確認・更新
- [x] Task 8: sweden/01_central_bank.html — Riksbank総裁Erik Thedéen、理事会メンバーの確認。Breman RBNZ移籍に伴う変更
- [ ] Task 9: norway/01_central_bank.html — Norges Bank総裁Ida Wolden Bache、理事会の確認・更新

### Phase 2: 政策金利ページ（02_policy_rate.html）
- [ ] Task 10: japan/02_policy_rate.html — 2024年マイナス金利解除、YCC終了、2025年1月利上げ（0.5%）を反映
- [ ] Task 11: us/02_policy_rate.html — 2024-2025年の利下げサイクルを反映
- [ ] Task 12: eurozone/02_policy_rate.html — ECB利下げサイクル（2024年6月開始）を反映
- [ ] Task 13: uk/02_policy_rate.html — BOE利下げ動向を反映
- [ ] Task 14: switzerland/02_policy_rate.html — SNB利下げ（2024年3月開始、先進国初）を反映
- [ ] Task 15: australia/02_policy_rate.html — RBA金利動向を反映
- [ ] Task 16: newzealand/02_policy_rate.html — RBNZ利下げサイクルを反映
- [ ] Task 17: canada/02_policy_rate.html — BOC利下げ（2024年6月開始）を反映
- [ ] Task 18: sweden/02_policy_rate.html — Riksbank利下げを反映
- [ ] Task 19: norway/02_policy_rate.html — Norges Bank金利動向を反映

### Phase 3: マクロ経済ページ（03-05）確認
- [ ] Task 20: 全10カ国の03_fiscal_policy.htmlをスキャンし、明らかに古い情報や誤りがあれば修正（例: 米国のIRA/CHIPS Act未反映、日本の財政出動等）
- [ ] Task 21: 全10カ国の04_employment.htmlをスキャンし、コロナ後の労働市場回復・最新トレンドが反映されているか確認
- [ ] Task 22: 全10カ国の05_inflation.htmlをスキャンし、2022-2024年のインフレ急騰・鎮静化が適切に記述されているか確認

### Phase 4: 株式市場ページ（06-10）確認
- [ ] Task 23: 全10カ国の10_equity_current.html（2020s）をスキャンし、AI相場・2024-2025年の動向が反映されているか確認・修正
- [ ] Task 24: 全10カ国の06_equity_overview.htmlをスキャンし、主要指数の歴史的記録（日経平均34年ぶり最高値更新等）が反映されているか確認

### Phase 5: 債券・金利・為替ページ（11-14）確認
- [ ] Task 25: 全10カ国の11_bond_market.htmlをスキャンし、2022-2024年の債券市場急落・イールドカーブ変動が反映されているか確認
- [ ] Task 26: 全10カ国の14_currency.htmlをスキャンし、2024年の円安（160円台）・ドル高等が反映されているか確認

### Phase 6: 危機・銀行・規制ページ（15-18）確認
- [ ] Task 27: 全10カ国の15_crises.htmlをスキャンし、2023年SVB/CS破綻が反映されているか確認
- [ ] Task 28: switzerland/16_banking.htmlを確認し、Credit Suisse破綻→UBS統合（2023年）が適切に記述されているか確認

### Phase 7: 最終チェック
- [ ] Task 29: 全200ページのHTMLリンク切れをチェック（内部リンクのみ）。壊れたリンクがあれば修正
- [ ] Task 30: progress.txtに最終サマリーを記載。全体の修正件数・主要変更点をまとめる

## Constraints
- WebSearchツールを積極的に使い、最新情報を確認してから修正すること
- 修正は事実に基づくこと。推測で情報を追加しない
- 既存のデザイン・スタイルを維持すること（Bloomberg風ダークテーマ）
- 日本語メインで固有名詞は英語併記
- 出典がある箇所は出典も更新する
- 1タスクあたり1-3ファイルの修正に留める（大きすぎるタスクは次イテレーションに分割）

## Notes
- CSSやJSの変更は不要（デザインはindex.htmlで更新済み）
- 各国のナビゲーションバー（sidebar）の修正は不要
- 歴代総裁テーブルのタカ/ハト属性は市場での一般的評価に基づく旨を注記
