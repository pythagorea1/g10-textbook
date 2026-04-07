# Project: G10 Textbook — Interactive Geopolitical World Map

## Overview
新規ページ `summary/geopolitical_map.html` を作成。世界地図上で年・イベントを選択すると、そのイベントが各国に与えたインパクトと国際関係の流れ（資金/政策/外交フロー）を可視化する。
G10通貨国を中心に、地政学リスクと金融市場の連動を直感的に追えるダッシュボード。

## 機能要件
1. **インタラクティブ世界地図** — SVG。G10通貨国（US/EU/JP/UK/CH/AU/NZ/CA/SE/NO）と主要関連国（CN/RU/SA/UA等）を表示
2. **タイムラインスライダー** — 1970-2026の年スライダー
3. **イベント選択リスト** — 年に紐づくイベントをサイドパネルに表示。クリックで地図に反映
4. **地図上の表現**:
   - 影響国を色強度で表示（赤=深刻、橙=中、黄=軽微）
   - 国間の関係を**矢印**（資金フロー/政策連動/制裁/外交）で結ぶ
   - 影響国にツールチップ（具体的な数値・出来事）
5. **イベント詳細パネル** — 選択イベントの背景・影響・教訓を表示

## Tasks

### Phase 0: データ設計（最優先・JSON生成）
- [x] Task 1: data/geopolitical_events.json を新規作成。50+の地政学/金融イベントを以下のスキーマで定義
```json
{
  "events": [
    {
      "id": "nixon_shock_1971",
      "year": 1971,
      "month": 8,
      "title": "ニクソン・ショック（金兌換停止）",
      "category": "通貨制度",
      "severity": "critical",
      "epicenter": "US",
      "affected": [
        {"country": "US", "impact": "critical", "note": "ドル防衛のため金兌換停止"},
        {"country": "JP", "impact": "high", "note": "円が変動相場制へ移行"},
        {"country": "EU", "impact": "high", "note": "欧州通貨もフロート化"}
      ],
      "flows": [
        {"from": "US", "to": "JP", "type": "currency_pressure", "label": "ドル離れ"},
        {"from": "US", "to": "EU", "type": "currency_pressure"}
      ],
      "narrative": "1971年8月15日、ニクソン大統領は金とドルの兌換停止を発表..."
    }
  ]
}
```
カテゴリー: 通貨制度/金融危機/中央銀行/地政学/エネルギー/貿易戦争/パンデミック
重要イベント例:
- 1971 ニクソン・ショック
- 1973 第1次オイルショック
- 1979 第2次オイルショック・Volcker利上げ
- 1985 プラザ合意
- 1987 ブラックマンデー
- 1989 ベルリンの壁崩壊
- 1990 日本バブル崩壊
- 1992 ERM危機・ブラックウェンズデー
- 1994 メキシコ危機
- 1997 アジア通貨危機
- 1998 LTCM・ロシア危機
- 2000 ドットコム崩壊
- 2001 9/11
- 2008 リーマンショック
- 2010 欧州ソブリン危機
- 2011 福島原発事故
- 2014 ロシアのクリミア併合
- 2015 SNB CHFショック・チャイナショック
- 2016 Brexit投票・トランプ当選
- 2018 米中貿易戦争
- 2020 COVID-19
- 2022 ロシアのウクライナ侵攻・エネルギー危機
- 2023 SVB/CS破綻・銀行危機
- 2024 日銀マイナス金利解除・中東緊張
- 2025 トランプ関税

### Phase 1: 世界地図SVG基盤
- [x] Task 2: assets/world_map.svg を作成。簡略化された世界地図SVG（数十カ国の polygons、各国に id="country-XX" を持たせる）。G10は精度高く、その他は簡略化。Mercator風のviewBox。各国にdefault fillと.affected, .epicenter等のクラス用意。data-name属性に英語国名
- [x] Task 3: assets/geomap.css を作成（または既存style.cssに追記）。.world-map基本スタイル、.country base/hover/affected-low/mid/high/critical/epicenterの色定義、.flow-arrow stroke styles、.event-list、.event-card、.event-detail-panel、.timeline-slider のスタイル

### Phase 2: インタラクティブ地図エンジン
- [x] Task 4: assets/geomap.js を作成。クラスGeoMap with: loadEvents(jsonUrl), renderTimelineSlider(containerId, yearRange), renderEventList(containerId, year), highlightEvent(eventId), drawFlows(flows), updateDetailPanel(event), tooltips. SVG操作、矢印は path/marker-end で描画。年スライダーはinput[type=range]で実装
- [x] Task 5: assets/geomap.js に矢印描画ロジック追加。drawArrow(fromCountryId, toCountryId, type) — 国の中心座標から bezier curve で矢印を描く。flowタイプによって色分け（contagion=赤、policy=青、trade=緑、capital=橙）

### Phase 3: メインページ作成
- [x] Task 6: summary/geopolitical_map.html を新規作成。レイアウト: 上部にタイトル+年スライダー、左サイドにイベントリスト、中央に世界地図SVG、右サイドにイベント詳細パネル。レスポンシブ対応（モバイルは縦積み）。assets/geomap.js, assets/world_map.svg をロード
- [x] Task 7: summary/geopolitical_map.html に「カテゴリーフィルター」追加（通貨制度/金融危機/地政学/エネルギー等のチェックボックス）。フィルターでイベントリストを絞り込む
- [x] Task 8: summary/geopolitical_map.html に「比較モード」追加（2つのイベントを並べてマップを2分割表示できるようにする）。任意機能だが入れると深い分析可能

### Phase 4: 統合・リンク追加
- [x] Task 9: index.html の Quick Links と Country Cards 上部に「🌍 Geopolitical Map」リンクを追加。stats-bar の下、country-grid の上に大きめのバナーカードで配置
- [x] Task 10: 各国の 01_central_bank.html の Historical Highlights タイムラインに「→ Geopolitical Map で見る」リンクを追加（イベントごとに対応するイベントIDへリンクして該当年・イベントを自動選択）
- [x] Task 11: summary/g10_timeline.html（既存横断年表）にも「Geopolitical Map」へのリンクを追加

### Phase 5: 検証と最終調整
- [x] Task 12: ローカルHTTPサーバーで summary/geopolitical_map.html を起動して動作確認（python -m http.server）。年スライダーが動く、イベントリストが年で絞られる、地図クリックで国情報が出る、矢印が描画される、レスポンシブが効く、を確認。スクリーンショットを output/geomap_screenshot_*.png に保存（playwright MCP使用可）
- [x] Task 13: イベント数が30未満の場合は data/geopolitical_events.json に追加で20イベント以上記述。「現代史で重要だが見落としがちな出来事」（例: 1991ソ連崩壊、1993NAFTA、2003イラク戦争、2007BNP Paribasサブプライム、2009ギリシャ財政危機発覚、2012Whatever it takes、2014石油価格暴落、2017テーパリング、2019Repo危機、2025トランプ関税等）
- [x] Task 14: progress.txt に最終サマリー記載

## Constraints
- **外部CDN/library禁止** — 純粋なインラインSVG + Vanilla JS
- **オフライン動作** — file://でも動くこと（fetch JSONはローカル相対パスでOK、ただしCORS問題があるためJSONではなくinline scriptで埋め込む選択肢も考慮）
- **既存ページに干渉しない** — 新規ページとして作成。既存のCSS/JSを破壊しない
- **データはハードコード or ローカルJSON** — fetch失敗対策にinlineフォールバックも検討
- **G10中心** — その他の国は影響国として登場するときのみ表示

## Notes

### 矢印タイプと色
| type | 色 | 用途 |
|------|---|------|
| contagion | #ff6b6b (赤) | 危機伝播 |
| policy | #5b8def (青) | 政策連動・協調介入 |
| trade | #00d4aa (緑) | 貿易・関税 |
| capital | #ff9f43 (橙) | 資金フロー |
| sanction | #ffd93d (黄) | 制裁 |

### 国Severity色
| severity | 色 |
|----------|---|
| epicenter | #ff4444 (濃赤、震源地) |
| critical | #ff6b6b (赤) |
| high | #ff9f43 (橙) |
| medium | #ffd93d (黄) |
| low | #4ecdc4 (薄緑) |
| neutral | #2a2a4a (グレー) |

### 動作確認手順
```bash
cd C:/Users/PC_user/OneDrive/G10_research/g10_textbook
python -m http.server 8080
# ブラウザで http://localhost:8080/summary/geopolitical_map.html
```

### CORS対策
file://でJSON fetchが効かない場合、events JSONを別の.jsファイルとして書き出してwindow.GEOPOLITICAL_EVENTS = {...}でグローバルに設定する方法も可。
