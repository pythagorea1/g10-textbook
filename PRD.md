# Project: G10 Equity & Interest Rate Markets — Historical Textbook

## Overview
G10通貨国（米国、ユーロ圏、日本、英国、スイス、豪州、NZ、カナダ、スウェーデン、ノルウェー）の株式市場と金利市場の歴史を網羅するHTML教科書。各国最低20ページ、合計200ページ超。全ページにソース（出典）を明記。ダークテーマのプロフェッショナルなデザイン。

## Directory Structure
```
g10_textbook/
├── CLAUDE.md
├── PRD.md
├── progress.txt
├── ralph.sh
├── .ralph/
│   ├── config.sh
│   └── logs/
├── assets/
│   └── style.css           # 共通CSS（ダークテーマ）
├── templates/
│   └── base.html            # HTMLテンプレート
├── index.html               # トップページ（国一覧）
├── summary/
│   └── g10_timeline.html    # G10全体年表（N年×10カ国行列）
├── us/                      # 米国（20ページ）
│   ├── 01_central_bank.html
│   ├── 02_policy_rate.html
│   ├── 03_fiscal_policy.html
│   ├── 04_employment.html
│   ├── 05_inflation.html
│   ├── 06_equity_overview.html
│   ├── 07_equity_early.html
│   ├── 08_equity_modern.html
│   ├── 09_equity_recent.html
│   ├── 10_equity_current.html
│   ├── 11_bond_market.html
│   ├── 12_short_rates.html
│   ├── 13_long_rates.html
│   ├── 14_currency.html
│   ├── 15_crises.html
│   ├── 16_banking.html
│   ├── 17_corporate.html
│   ├── 18_regulation.html
│   ├── 19_trade.html
│   └── 20_lessons.html
├── eurozone/                # ユーロ圏（同構造）
├── japan/                   # 日本（同構造）
├── uk/                      # 英国（同構造）
├── switzerland/             # スイス（同構造）
├── australia/               # 豪州（同構造）
├── newzealand/              # NZ（同構造）
├── canada/                  # カナダ（同構造）
├── sweden/                  # スウェーデン（同構造）
└── norway/                  # ノルウェー（同構造）
```

## Page Structure (per country, 20 pages)
1. **Central Bank Timeline** — 中銀設立、歴代総裁/理事（タカ・ハト属性）、金融政策の変遷年表
2. **Policy Rate History** — 政策金利の推移、主要な利上げ/利下げサイクル
3. **Fiscal Policy** — 財政政策の歴史、主要な財政パッケージ、債務/GDP推移
4. **Employment** — 雇用統計の推移、失業率、労働市場構造の変化
5. **Inflation** — CPI/PCE推移、ハイパーインフレ/デフレ期、インフレターゲット導入
6. **Equity Market Overview** — 主要株価指数、時価総額推移、市場構造
7. **Equity: Early History** — 証券取引所設立〜1970年代
8. **Equity: Modern Era** — 1980年代〜1990年代（バブル、自由化）
9. **Equity: 2000s-2010s** — ITバブル崩壊、GFC、回復期
10. **Equity: 2020s** — COVID、AI相場、現在まで
11. **Bond Market** — 国債市場の発展、イールドカーブ構造
12. **Short-term Rates** — 短期金利市場（TB, CP, LIBOR/SOFR等）
13. **Long-term Rates** — 長期金利の推移、10年債利回りの歴史的動き
14. **Currency** — 為替レートの歴史、通貨制度の変遷
15. **Financial Crises** — 主要な金融危機とその影響
16. **Banking Sector** — 銀行制度の発展、主要銀行
17. **Corporate & Indices** — 主要企業、セクター構成の変遷
18. **Regulatory Framework** — 金融規制の変遷
19. **International Trade** — 貿易・資本フローの歴史
20. **Key Lessons** — 歴史から学ぶ教訓、注目イベント

## Countries
| Code | Country | Central Bank | Currency | Key Index |
|------|---------|-------------|----------|-----------|
| us | United States | Federal Reserve (Fed) | USD | S&P 500, DJIA |
| eurozone | Eurozone | ECB / Bundesbank (pre-EUR) | EUR/DEM | Euro Stoxx 50, DAX |
| japan | Japan | Bank of Japan (BOJ) | JPY | Nikkei 225, TOPIX |
| uk | United Kingdom | Bank of England (BOE) | GBP | FTSE 100 |
| switzerland | Switzerland | Swiss National Bank (SNB) | CHF | SMI |
| australia | Australia | Reserve Bank of Australia (RBA) | AUD | ASX 200 |
| newzealand | New Zealand | Reserve Bank of NZ (RBNZ) | NZD | NZX 50 |
| canada | Canada | Bank of Canada (BOC) | CAD | TSX Composite |
| sweden | Sweden | Riksbank | SEK | OMX Stockholm 30 |
| norway | Norway | Norges Bank | NOK | OBX |

## Tasks

### Phase 1: Infrastructure
- [x] Task 1: Create shared CSS (assets/style.css) — Bloomberg-style dark theme, responsive tables, timeline components, navigation. Create HTML template (templates/base.html) with header, sidebar nav, footer.
- [x] Task 2: Create index.html — G10全体のトップページ。各国へのリンク、概要テーブル。

### Phase 2: United States (us/)
- [x] Task 3: US pages 1-5 — Central Bank (Fed設立1913〜歴代議長全員のタカ/ハト属性、FOMC構成)、Policy Rate、Fiscal Policy、Employment、Inflation
- [x] Task 4: US pages 6-10 — Equity Market Overview (S&P500, DJIA, NASDAQ)、Early History (NYSE 1792〜)、Modern Era (1980s-90s)、2000s-2010s、2020s
- [x] Task 5: US pages 11-15 — Bond Market (Treasury market)、Short-term Rates (Fed Funds, T-Bills, SOFR)、Long-term Rates (10Y/30Y)、Currency (USD index)、Financial Crises (1907, 1929, S&L, LTCM, GFC, COVID)
- [x] Task 6: US pages 16-20 — Banking Sector、Corporate & Indices (セクター変遷)、Regulation (Glass-Steagall, Dodd-Frank)、Trade (貿易赤字)、Key Lessons

### Phase 3: Eurozone (eurozone/)
- [x] Task 7: Eurozone pages 1-5 — Central Bank (Bundesbank→ECB、歴代総裁、タカ/ハト)、Policy Rate (ERM, ECB rates)、Fiscal Policy (SGP, 債務危機)、Employment、Inflation
- [x] Task 8: Eurozone pages 6-10 — Equity (DAX, Euro Stoxx 50, CAC 40)、Early History、Modern Era (統合)、2000s-2010s (欧州債務危機)、2020s
- [x] Task 9: Eurozone pages 11-15 — Bond Market (Bund, BTP spread)、Short-term Rates (Euribor)、Long-term Rates、Currency (DEM→EUR)、Crises (ERM crisis, 債務危機)
- [x] Task 10: Eurozone pages 16-20 — Banking、Corporate、Regulation (MiFID, Banking Union)、Trade、Lessons

### Phase 4: Japan (japan/)
- [x] Task 11: Japan pages 1-5 — Central Bank (BOJ歴代総裁、YCC、QQE)、Policy Rate (ゼロ金利、マイナス金利)、Fiscal Policy (財政出動、債務/GDP 200%超)、Employment (終身雇用→変化)、Inflation (デフレ30年)
- [x] Task 12: Japan pages 6-10 — Equity (日経225, TOPIX)、Early History (東証1878)、Modern Era (バブル経済)、2000s-2010s (失われた20年)、2020s (バフェット効果)
- [x] Task 13: Japan pages 11-15 — Bond Market (JGB, 日銀保有比率)、Short-term Rates (無担保コール)、Long-term Rates (10Y JGB)、Currency (円, プラザ合意)、Crises (バブル崩壊、銀行危機)
- [x] Task 14: Japan pages 16-20 — Banking (メガバンク形成)、Corporate (keiretsu→改革)、Regulation (金融ビッグバン)、Trade (貿易黒字→変化)、Lessons

### Phase 5: United Kingdom (uk/)
- [x] Task 15: UK pages 1-5 — Central Bank (BOE 1694〜、歴代総裁、MPC)、Policy Rate、Fiscal Policy (austerity)、Employment、Inflation
- [x] Task 16: UK pages 6-10 — Equity (FTSE 100, LSE)、Early History (South Sea Bubble)、Modern Era (Big Bang 1986)、2000s-2010s、2020s (Brexit)
- [x] Task 17: UK pages 11-15 — Bond Market (Gilts)、Short-term Rates (SONIA)、Long-term Rates、Currency (GBP, Black Wednesday)、Crises
- [x] Task 18: UK pages 16-20 — Banking、Corporate、Regulation (FCA)、Trade (Brexit impact)、Lessons

### Phase 6: Switzerland (switzerland/)
- [x] Task 19: Switzerland pages 1-5 — Central Bank (SNB、フラン上限政策)、Policy Rate (マイナス金利)、Fiscal Policy、Employment、Inflation
- [x] Task 20: Switzerland pages 6-10 — Equity (SMI, SIX)、Early〜2020s
- [x] Task 21: Switzerland pages 11-15 — Bond、Rates、Currency (CHFショック2015)、Crises
- [x] Task 22: Switzerland pages 16-20 — Banking (UBS/CS)、Corporate、Regulation、Trade、Lessons

### Phase 7: Australia (australia/)
- [x] Task 23: Australia pages 1-5 — Central Bank (RBA)、Policy Rate、Fiscal Policy、Employment、Inflation
- [x] Task 24: Australia pages 6-10 — Equity (ASX 200)、Early〜2020s
- [x] Task 25: Australia pages 11-15 — Bond、Rates、Currency (AUD)、Crises
- [x] Task 26: Australia pages 16-20 — Banking (Big 4)、Corporate (Mining)、Regulation、Trade (China依存)、Lessons

### Phase 8: New Zealand (newzealand/)
- [x] Task 27: NZ pages 1-5 — Central Bank (RBNZ、インフレターゲット先駆者)、Policy Rate、Fiscal Policy、Employment、Inflation
- [x] Task 28: NZ pages 6-10 — Equity (NZX 50)、Early〜2020s
- [x] Task 29: NZ pages 11-15 — Bond、Rates、Currency (NZD)、Crises
- [x] Task 30: NZ pages 16-20 — Banking、Corporate (Dairy)、Regulation、Trade、Lessons

### Phase 9: Canada (canada/)
- [ ] Task 31: Canada pages 1-5 — Central Bank (BOC)、Policy Rate、Fiscal Policy、Employment、Inflation
- [ ] Task 32: Canada pages 6-10 — Equity (TSX)、Early〜2020s
- [ ] Task 33: Canada pages 11-15 — Bond、Rates、Currency (CAD, Loonie)、Crises
- [ ] Task 34: Canada pages 16-20 — Banking (Big 5)、Corporate (Energy, Mining)、Regulation (OSFI)、Trade (NAFTA/USMCA)、Lessons

### Phase 10: Sweden (sweden/)
- [ ] Task 35: Sweden pages 1-5 — Central Bank (Riksbank 1668、世界最古)、Policy Rate (マイナス金利)、Fiscal Policy、Employment、Inflation
- [ ] Task 36: Sweden pages 6-10 — Equity (OMX Stockholm 30)、Early〜2020s
- [ ] Task 37: Sweden pages 11-15 — Bond、Rates、Currency (SEK)、Crises (1990s banking crisis)
- [ ] Task 38: Sweden pages 16-20 — Banking (Nordea等)、Corporate (Ericsson, Volvo)、Regulation、Trade、Lessons

### Phase 11: Norway (norway/)
- [ ] Task 39: Norway pages 1-5 — Central Bank (Norges Bank、SWF)、Policy Rate、Fiscal Policy (石油基金)、Employment、Inflation
- [ ] Task 40: Norway pages 6-10 — Equity (OBX, Oslo Børs)、Early〜2020s
- [ ] Task 41: Norway pages 11-15 — Bond、Rates、Currency (NOK)、Crises
- [ ] Task 42: Norway pages 16-20 — Banking、Corporate (Equinor, Statoil)、Regulation、Trade (石油・ガス)、Lessons

### Phase 12: Summary & Integration
- [ ] Task 43: G10 Summary Timeline (summary/g10_timeline.html) — N年×10カ国の大型テーブル（1900年代〜現在）。政策金利、株価指数、主要イベントを年ごとに横断比較。ソース付き。
- [ ] Task 44: Navigation & Polish — 全ページのナビゲーション統一、リンク検証、index.html更新、目次生成。最終チェック。

## Constraints
- 全ページHTML（スタンドアロン、外部CSS参照のみ）
- ダークテーマ（Bloomberg Terminal風）
- 全データにソース（出典）を明記（例: IMF, BIS, 各国中銀公式、FRED, World Bank）
- 年表テーブルは sortable にする（CSS only or vanilla JS）
- レスポンシブデザイン
- 画像はSVGまたはCSS描画（外部画像依存なし）
- 各国ページは同一テンプレート構造を使用
- 日本語メインだが固有名詞は英語併記

## Sources (Reference)
- Federal Reserve: federalreserve.gov
- ECB: ecb.europa.eu
- BOJ: boj.or.jp
- BOE: bankofengland.co.uk
- SNB: snb.ch
- RBA: rba.gov.au
- RBNZ: rbnz.govt.nz
- BOC: bankofcanada.ca
- Riksbank: riksbank.se
- Norges Bank: norges-bank.no
- BIS: bis.org
- IMF: imf.org
- FRED: fred.stlouisfed.org
- World Bank: worldbank.org

## Notes
- G10通貨国の定義: USD, EUR, JPY, GBP, CHF, AUD, NZD, CAD, SEK, NOK
- ユーロ圏はECB設立前のBundesbank/各国中銀時代もカバー
- 年表の開始時期は国による（米国1790s〜、日本1868〜、など）
- 中銀メンバーのタカ・ハト分類は市場コンセンサスベース
