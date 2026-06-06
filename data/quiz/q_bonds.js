// Quiz questions: 債券・金利 (Bonds & Rates)
// 30 questions — 2026年4月時点
window.QUIZ_QUESTIONS_BONDS = [
  {
    id: "bonds-volcker-1",
    category: "債券",
    difficulty: "medium",
    question: "1981年に米10年債利回りが記録した史上最高水準は、おおよそ何%か？",
    choices: ["約8%", "約11%", "約15.8%", "約20%", "約25%"],
    answer: 2,
    explanation: "1981年9月、ボルカーFRBの超金融引き締めにより米10年債利回りは約15.8%のピークを付けた。以降、2020年まで約40年に及ぶ長期金利低下トレンド(Great Bond Bull Market)の起点となった。",
    related: "us/13_long_rates.html",
    country: "us"
  },
  {
    id: "bonds-ycc-1",
    category: "債券",
    difficulty: "easy",
    question: "日銀がYCC(イールドカーブ・コントロール)を導入したのは何年？",
    choices: ["2013年", "2014年", "2016年", "2018年", "2020年"],
    answer: 2,
    explanation: "YCCは2016年9月21日、黒田日銀が導入。短期金利-0.1%、10年JGB利回り0%程度を目標とする枠組み。2022年末・2023年・2024年に段階的修正を経て、2024年3月に正式撤廃された。",
    related: "japan/13_long_rates.html",
    country: "japan"
  },
  {
    id: "bonds-ycc-end-1",
    category: "債券",
    difficulty: "easy",
    question: "日銀がYCCを撤廃したのは？",
    choices: ["2023年7月", "2023年10月", "2024年3月", "2024年7月", "2025年1月"],
    answer: 2,
    explanation: "2024年3月19日の金融政策決定会合で、植田日銀はマイナス金利解除とともにYCCを撤廃。長期金利コントロールを終了し、国債買入れは継続しつつ金利は市場形成に委ねる方針へ移行した。",
    related: "japan/13_long_rates.html",
    country: "japan"
  },
  {
    id: "bonds-qe-1",
    category: "債券",
    difficulty: "medium",
    question: "FRBが量的緩和(QE1)を開始したのは？",
    choices: ["2007年8月", "2008年11月", "2010年11月", "2012年9月", "2020年3月"],
    answer: 1,
    explanation: "QE1は2008年11月25日にFRBが発表。リーマンショック後の金融システム危機対応として、MBS等の買入れを開始した。以後QE2(2010)、QE3(2012)、コロナQE(2020)と続いた。",
    related: "us/11_bond_market.html",
    country: "us"
  },
  {
    id: "bonds-taper-tantrum-1",
    category: "債券",
    difficulty: "medium",
    question: "2013年、バーナンキFRB議長の発言でUST10年利回りが急騰した現象の名称は？",
    choices: ["Bond Massacre", "Taper Tantrum", "Bond Vigilante", "Flash Rally", "Repo Madness"],
    answer: 1,
    explanation: "2013年5月、バーナンキが量的緩和縮小(テーパリング)を示唆したことで新興国通貨・債券が急落。UST10Yは1.6%→3.0%へ急騰した。この市場の過剰反応がTaper Tantrum(テーパータントラム)と呼ばれる。",
    related: "us/13_long_rates.html",
    country: "us"
  },
  {
    id: "bonds-2022-1",
    category: "債券",
    difficulty: "medium",
    question: "2022年の米国債市場について正しいものは？",
    choices: [
      "過去50年で最大の年間リターンを記録",
      "約150年ぶりの歴史的な年間下落を記録",
      "利回りは変化なし",
      "FRBが買支えたため下落せず",
      "YCCで固定された"
    ],
    answer: 1,
    explanation: "2022年は米国債が歴史的暴落。Bloomberg US Aggregate指数は約-13%と過去数十年で最悪。インフレ急騰→FRBが75bp利上げを4連続実施し、10年債は1.5%→4.3%超へ急騰した。",
    related: "us/11_bond_market.html",
    country: "us"
  },
  {
    id: "bonds-bund-1",
    category: "債券",
    difficulty: "medium",
    question: "ドイツ10年債(Bund)利回りがマイナス圏に初めて入ったのはいつ頃？",
    choices: ["2012年", "2014年", "2016年", "2019年", "2020年"],
    answer: 2,
    explanation: "Bund10Yは2016年6月に初めてマイナス圏へ突入。ECBのQEとマイナス金利政策(-0.4%)、Brexit不安が背景。以降2022年初頭までマイナス圏が続いた。",
    related: "eurozone/13_long_rates.html",
    country: "eurozone"
  },
  {
    id: "bonds-inversion-1",
    category: "債券",
    difficulty: "medium",
    question: "米国債のイールドカーブ(2s10s)逆転が景気後退を予兆するとされる理由で最も適切なのは？",
    choices: [
      "短期金利が低いほど景気が悪いから",
      "市場が将来の利下げ=景気減速を織り込むから",
      "財務省が発行を減らすから",
      "FRBがQEを始めるから",
      "流動性が枯渇するから"
    ],
    answer: 1,
    explanation: "2s10s逆転は、市場が将来の利下げ（＝景気悪化）を織り込むことで長期金利が短期金利を下回る現象。過去50年、米国の景気後退にほぼ先行しており、最も信頼される景気指標の一つとされる。",
    related: "us/13_long_rates.html",
    country: "us"
  },
  {
    id: "bonds-jgb-10y-cap-1",
    category: "債券",
    difficulty: "hard",
    question: "日銀がYCC撤廃直前、10年JGB利回りの事実上の上限を何%に引き上げていたか？",
    choices: ["0.25%", "0.5%", "0.75%", "1.0%", "1.5%"],
    answer: 3,
    explanation: "2023年10月、日銀はYCCの上限1.0%を『めど』に変更し事実上柔軟化。それ以前は0.25%→0.5%→0.5%の『目途』→1.0%と段階的に引き上げていた。2024年3月に枠組み自体を撤廃した。",
    related: "japan/13_long_rates.html",
    country: "japan"
  },
  {
    id: "bonds-10y-2024-1",
    category: "債券",
    difficulty: "medium",
    question: "2023年10月に米10年債利回りが約16年ぶりに到達した水準は？",
    choices: ["3.5%", "4.0%", "5.0%", "6.0%", "7.0%"],
    answer: 2,
    explanation: "2023年10月、米10年債利回りは一時5.0%超へ上昇。2007年以来の水準。米財政赤字拡大、Fitchによる米国債格下げ、堅調な経済指標、タームプレミアム上昇が要因とされた。",
    related: "us/13_long_rates.html",
    country: "us"
  },
  {
    id: "bonds-bill-1",
    category: "債券",
    difficulty: "easy",
    question: "米国債のうち、満期1年以下の短期証券を指す名称は？",
    choices: ["T-Note", "T-Bond", "T-Bill", "TIPS", "FRN"],
    answer: 2,
    explanation: "T-Bill(Treasury Bill)は満期1年以下の割引債。T-Noteは2〜10年、T-Bondは20・30年、TIPSはインフレ連動債、FRNは変動利付債。T-Billはマネーマーケットの基準資産。",
    related: "us/12_short_rates.html",
    country: "us"
  },
  {
    id: "bonds-tips-1",
    category: "債券",
    difficulty: "medium",
    question: "TIPS(米物価連動債)の特徴として正しいものは？",
    choices: [
      "元本がCPIに連動して調整される",
      "クーポンが毎月変動する",
      "デフレ時は必ず元本割れする",
      "1990年代から日本で発行",
      "満期は常に5年"
    ],
    answer: 0,
    explanation: "TIPS(Treasury Inflation-Protected Securities)は元本がCPI(全米都市消費者物価指数)に連動。実質利回りを提供する。1997年から発行。BEI(ブレークイーブンインフレ率)=名目-TIPS利回りで市場のインフレ期待を測る。",
    related: "us/11_bond_market.html",
    country: "us"
  },
  {
    id: "bonds-bei-1",
    category: "債券",
    difficulty: "medium",
    question: "ブレークイーブン・インフレ率(BEI)の算出式は？",
    choices: [
      "名目利回り + 実質利回り",
      "名目利回り - 実質利回り",
      "実質利回り - 名目利回り",
      "名目利回り × 実質利回り",
      "CPI - 政策金利"
    ],
    answer: 1,
    explanation: "BEI = 名目国債利回り - 物価連動債(TIPS)利回り。市場参加者が織り込んでいる期待インフレ率を示す。FRBはBEIとインフレスワップを金融政策判断の材料にしている。",
    related: "us/11_bond_market.html",
    country: "us"
  },
  {
    id: "bonds-bund-german-1",
    category: "債券",
    difficulty: "easy",
    question: "ユーロ圏における『リスクフリー』の基準国債は？",
    choices: ["フランスOAT", "イタリアBTP", "ドイツBund", "スペインBonos", "オランダDSL"],
    answer: 2,
    explanation: "ドイツ連邦債(Bund)はユーロ圏で最高格付けAAAを維持し、市場で事実上のリスクフリー基準債として扱われる。ユーロ圏各国スプレッドはBund比で計測されるのが通例。",
    related: "eurozone/11_bond_market.html",
    country: "eurozone"
  },
  {
    id: "bonds-gilt-crisis-1",
    category: "債券",
    difficulty: "medium",
    question: "2022年9月、英国債(Gilt)が急落し年金LDI問題が顕在化した原因は？",
    choices: [
      "Brexit再交渉",
      "Truss政権のミニ予算(減税パッケージ)",
      "BOEの利上げ停止",
      "スコットランド独立投票",
      "コロナ再拡大"
    ],
    answer: 1,
    explanation: "2022年9月23日、トラス政権のクワーテン財相が発表した450億ポンド減税の『ミニ予算』で財政不安が爆発。Gilt30Yは3.5%→5.0%超へ急騰し、LDI戦略の年金基金が担保追加できず崩壊寸前に。BOEが緊急購入で鎮火した。",
    related: "uk/11_bond_market.html",
    country: "uk"
  },
  {
    id: "bonds-jgb-holder-1",
    category: "債券",
    difficulty: "medium",
    question: "2024年時点、日本国債(JGB)最大保有者は？",
    choices: ["民間銀行", "生命保険", "日本銀行", "海外投資家", "GPIF"],
    answer: 2,
    explanation: "日銀は異次元緩和以降JGBを大量購入し、2024年時点で発行残高の約50%強を保有する圧倒的な最大保有者。2024年以降、買入れは徐々に減額(QT)方針へ転換している。",
    related: "japan/11_bond_market.html",
    country: "japan"
  },
  {
    id: "bonds-repo-2019-1",
    category: "債券",
    difficulty: "hard",
    question: "2019年9月、米レポ市場で何が起きたか？",
    choices: [
      "レポ金利が0%まで低下",
      "レポ金利が一時10%近くまで急騰",
      "JPモルガンが破綻",
      "T-Bill発行停止",
      "FRBが利上げを決定"
    ],
    answer: 1,
    explanation: "2019年9月17日、レポ金利(GC)が一時10%近くまで急騰。準備預金不足と法人税支払い・国債決済重複が重なり流動性が枯渇。FRBは緊急にレポオペを再開し、以後『Not-QE』と呼ばれるT-Bill買入れを実施した。",
    related: "us/12_short_rates.html",
    country: "us"
  },
  {
    id: "bonds-ecb-pepp-1",
    category: "債券",
    difficulty: "medium",
    question: "2020年3月、ECBがコロナ対応で導入した1.85兆ユーロ規模の資産購入プログラムは？",
    choices: ["APP", "SMP", "PEPP", "OMT", "TLTRO"],
    answer: 2,
    explanation: "PEPP(Pandemic Emergency Purchase Programme)は2020年3月導入、最終的に1.85兆ユーロ規模に拡大。ユーロ圏南欧債スプレッド拡大を抑え込む役割を果たし、2022年3月に純購入終了。",
    related: "eurozone/11_bond_market.html",
    country: "eurozone"
  },
  {
    id: "bonds-qt-1",
    category: "債券",
    difficulty: "medium",
    question: "FRBが2022年6月に開始したQT(量的引き締め)の方式は？",
    choices: [
      "保有債券を市場で売却",
      "満期到来分の再投資を減額(ランオフ)",
      "レポで吸収",
      "銀行から強制徴収",
      "国債を海外へ移管"
    ],
    answer: 1,
    explanation: "FRBのQTは保有国債・MBSが満期到来した際、再投資額に月次上限(キャップ)を設けて自然減を進めるランオフ方式。2022年6月開始、当初475億ドル/月→950億ドル/月へ拡大。2024年に減速開始。",
    related: "us/11_bond_market.html",
    country: "us"
  },
  {
    id: "bonds-duration-1",
    category: "債券",
    difficulty: "easy",
    question: "債券のデュレーションが意味するのは？",
    choices: [
      "満期までの残存期間",
      "金利変動に対する価格感応度",
      "クーポン回数",
      "発行からの経過年数",
      "信用スプレッド"
    ],
    answer: 1,
    explanation: "デュレーション(Modified Duration)は金利1%変動に対する債券価格の変化率。デュレーション10なら金利1%上昇で価格約-10%。長期・低クーポン債ほど長くなり、金利リスクの代表指標。",
    related: "us/11_bond_market.html",
    country: "us"
  },
  {
    id: "bonds-cds-1",
    category: "債券",
    difficulty: "medium",
    question: "CDS(クレジット・デフォルト・スワップ)の基本的な役割は？",
    choices: [
      "為替リスクのヘッジ",
      "発行体デフォルトに対する保険",
      "金利固定化",
      "流動性供給",
      "税務上の優遇"
    ],
    answer: 1,
    explanation: "CDSはプロテクション買い手がプレミアムを支払い、発行体がデフォルトした場合に損失補填を受ける契約。ソブリンCDSは国の信用不安を計測する指標として使われ、2011年欧州債務危機時のギリシャCDSは数千bpに急騰した。",
    related: "us/11_bond_market.html",
    country: "us"
  },
  {
    id: "bonds-btp-spread-1",
    category: "債券",
    difficulty: "medium",
    question: "イタリア10年債(BTP)とドイツBundのスプレッドが市場不安の指標となる理由は？",
    choices: [
      "両国の為替差を示すから",
      "南欧財政不安=ユーロ圏分裂リスクの代理指標だから",
      "ECB政策金利と連動するから",
      "原油価格と連動するから",
      "CPI差を示すから"
    ],
    answer: 1,
    explanation: "BTP-Bundスプレッドはイタリアの財政・政治リスクを示す代表指標。2011年欧州債務危機時に550bp超、2018年ポピュリスト政権時に330bp、2022年メローニ政権発足時にも拡大した。",
    related: "eurozone/11_bond_market.html",
    country: "eurozone"
  },
  {
    id: "bonds-greek-haircut-1",
    category: "債券",
    difficulty: "hard",
    question: "2012年のギリシャ国債再編(PSI)で民間債権者が受け入れたヘアカット率は約何%？",
    choices: ["20%", "40%", "53.5%", "70%", "90%"],
    answer: 2,
    explanation: "2012年3月のPSI(Private Sector Involvement)でギリシャ国債の民間保有分は名目53.5%のカットを受け、実質損失は約75%に上った。ユーロ圏史上最大のソブリン再編となった。",
    related: "eurozone/15_crises.html",
    country: "eurozone"
  },
  {
    id: "bonds-china-ust-1",
    category: "債券",
    difficulty: "medium",
    question: "2024年時点、米国債の最大の海外保有国は？",
    choices: ["中国", "日本", "英国", "ケイマン諸島", "サウジアラビア"],
    answer: 1,
    explanation: "2024年時点で日本が米国債最大の海外保有国(約1.1兆ドル)。中国は2010年代前半まで首位だったが徐々に削減し2位に。英国・ベルギー(ユーロクリア経由)・ケイマン(ヘッジファンド)が続く。",
    related: "us/11_bond_market.html",
    country: "us"
  },
  {
    id: "bonds-ig-hy-1",
    category: "債券",
    difficulty: "easy",
    question: "S&P格付けで投資適格(Investment Grade)と高利回り(High Yield)の境界は？",
    choices: ["A-/A3", "BBB-/Baa3", "BB+/Ba1", "B+/B1", "CCC+/Caa1"],
    answer: 1,
    explanation: "S&P BBB- / Moody's Baa3 以上が投資適格(IG)。それ未満(BB+/Ba1以下)はHigh Yield/ジャンク債。IGとHYの境界をまたぐ格下げは『Fallen Angel』と呼ばれ、機関投資家の強制売却を招く。",
    related: "us/11_bond_market.html",
    country: "us"
  },
  {
    id: "bonds-neg-yield-1",
    category: "債券",
    difficulty: "medium",
    question: "世界のマイナス金利債券残高がピークをつけたのはいつ頃、規模は？",
    choices: [
      "2015年頃、約5兆ドル",
      "2019年頃、約17兆ドル",
      "2020年末、約18兆ドル",
      "2022年、約25兆ドル",
      "2024年、約10兆ドル"
    ],
    answer: 2,
    explanation: "Bloomberg集計でマイナス利回り債券残高は2020年12月に約18兆ドルのピーク。欧州・日本国債が中心。2022年の世界的利上げで急速に消滅し、2023年にはほぼゼロとなった。",
    related: "eurozone/13_long_rates.html",
    country: "eurozone"
  },
  {
    id: "bonds-fed-pivot-1",
    category: "債券",
    difficulty: "medium",
    question: "FRBが2024年9月に実施した利下げ幅は？",
    choices: ["25bp", "50bp", "75bp", "100bp", "利下げしなかった"],
    answer: 1,
    explanation: "FRBは2024年9月18日のFOMCで50bpの利下げを決定(FF金利 5.25-5.50% → 4.75-5.00%)。利下げサイクル開始。通常の25bpではなく大幅50bpで開始したのは労働市場減速を受けた予防的対応。",
    related: "us/02_policy_rate.html",
    country: "us"
  },
  {
    id: "bonds-jgb-2024-1",
    category: "債券",
    difficulty: "medium",
    question: "2025年にかけて10年JGB利回りが到達した水準として正しいのは？",
    choices: [
      "一時1.5%超、2008年以来の高水準",
      "0%固定",
      "-0.1%",
      "3.0%超",
      "5.0%超"
    ],
    answer: 0,
    explanation: "日銀の利上げ(2024年3月・7月・2025年1月)とYCC撤廃を受け、10年JGB利回りは段階的に上昇し2025年には一時1.5%超へ。2008年以来約17年ぶりの水準となった。",
    related: "japan/13_long_rates.html",
    country: "japan"
  },
  {
    id: "bonds-coco-1",
    category: "債券",
    difficulty: "hard",
    question: "2023年3月、Credit Suisse救済時に全額毀損(write-down)されたのは？",
    choices: [
      "普通株",
      "優先株",
      "AT1債(CoCo債)",
      "シニア債",
      "カバードボンド"
    ],
    answer: 2,
    explanation: "2023年3月、UBSによるCredit Suisse救済時、スイスFINMAの決定でAT1(Additional Tier 1)債 約160億CHFが全額ライトダウン。株主より先にAT1が毀損した異例の措置で、欧州AT1市場に激震が走った。",
    related: "switzerland/15_crises.html",
    country: "switzerland"
  },
  {
    id: "bonds-fed-balance-1",
    category: "債券",
    difficulty: "medium",
    question: "FRBのバランスシートがコロナQEでピーク時に到達した規模は？",
    choices: ["約3兆ドル", "約5兆ドル", "約7兆ドル", "約9兆ドル", "約12兆ドル"],
    answer: 3,
    explanation: "FRBのバランスシートは2022年4月に約8.97兆ドル(≒9兆ドル)のピーク。コロナ前は約4兆ドル。2022年6月開始のQTにより2026年初には約6.8兆ドル程度まで縮小した。",
    related: "us/01_central_bank.html",
    country: "us"
  }
];
