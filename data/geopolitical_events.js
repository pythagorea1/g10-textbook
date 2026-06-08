window.GEOPOLITICAL_EVENTS = {
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
    {
     "country": "US",
     "impact": "critical",
     "note": "ドル防衛のため金兌換停止を一方的に発表"
    },
    {
     "country": "JP",
     "impact": "high",
     "note": "円が変動相場制へ移行、1$=360円体制崩壊"
    },
    {
     "country": "EU",
     "impact": "high",
     "note": "欧州通貨もフロート化、スネーク制度へ"
    },
    {
     "country": "UK",
     "impact": "high",
     "note": "ポンドも変動相場制へ"
    },
    {
     "country": "CH",
     "impact": "medium",
     "note": "スイスフランは安全通貨化の端緒"
    }
   ],
   "flows": [
    {
     "from": "US",
     "to": "JP",
     "type": "currency_pressure",
     "label": "ドル離れ"
    },
    {
     "from": "US",
     "to": "EU",
     "type": "currency_pressure",
     "label": "ドル離れ"
    },
    {
     "from": "US",
     "to": "UK",
     "type": "currency_pressure"
    }
   ],
   "narrative": "1971年8月15日、ニクソン大統領は金とドルの兌換停止を発表。ブレトンウッズ体制は崩壊し、主要通貨は変動相場制へ移行した。",
   "related": [
    "../us/14_currency.html",
    "../japan/14_currency.html"
   ]
  },
  {
   "id": "oil_shock_1_1973",
   "year": 1973,
   "month": 10,
   "title": "第1次オイルショック",
   "category": "エネルギー",
   "severity": "critical",
   "epicenter": "SA",
   "affected": [
    {
     "country": "SA",
     "impact": "critical",
     "note": "OPEC原油価格4倍、禁輸措置"
    },
    {
     "country": "US",
     "impact": "high",
     "note": "スタグフレーション突入"
    },
    {
     "country": "JP",
     "impact": "critical",
     "note": "狂乱物価、インフレ率23%"
    },
    {
     "country": "EU",
     "impact": "high",
     "note": "インフレ加速、日曜運転禁止"
    },
    {
     "country": "UK",
     "impact": "high",
     "note": "3日間労働制導入"
    }
   ],
   "flows": [
    {
     "from": "SA",
     "to": "US",
     "type": "sanction",
     "label": "原油禁輸"
    },
    {
     "from": "SA",
     "to": "JP",
     "type": "sanction",
     "label": "原油制限"
    },
    {
     "from": "SA",
     "to": "EU",
     "type": "sanction"
    }
   ],
   "narrative": "第4次中東戦争を契機にOPECが原油価格を引き上げ、イスラエル支援国への禁輸を発動。先進国は戦後初のマイナス成長に陥った。",
   "related": [
    "../us/05_inflation.html",
    "../japan/05_inflation.html"
   ]
  },
  {
   "id": "oil_shock_2_1979",
   "year": 1979,
   "month": 1,
   "title": "第2次オイルショック / Volcker利上げ",
   "category": "エネルギー",
   "severity": "critical",
   "epicenter": "US",
   "affected": [
    {
     "country": "US",
     "impact": "critical",
     "note": "FF金利20%、インフレ退治"
    },
    {
     "country": "JP",
     "impact": "medium",
     "note": "省エネで乗り切り"
    },
    {
     "country": "EU",
     "impact": "high",
     "note": "インフレ再燃"
    },
    {
     "country": "UK",
     "impact": "high",
     "note": "サッチャリズム開始"
    }
   ],
   "flows": [
    {
     "from": "US",
     "to": "EU",
     "type": "policy",
     "label": "金融引締連動"
    },
    {
     "from": "US",
     "to": "JP",
     "type": "capital",
     "label": "資金米国回帰"
    }
   ],
   "narrative": "イラン革命で原油再高騰、ボルカーFRB議長はインフレ退治のため政策金利を20%まで引き上げた。",
   "related": [
    "../us/02_policy_rate.html",
    "../us/05_inflation.html"
   ]
  },
  {
   "id": "plaza_accord_1985",
   "year": 1985,
   "month": 9,
   "title": "プラザ合意",
   "category": "通貨制度",
   "severity": "high",
   "epicenter": "US",
   "affected": [
    {
     "country": "US",
     "impact": "high",
     "note": "ドル高是正合意、貿易赤字削減狙い"
    },
    {
     "country": "JP",
     "impact": "critical",
     "note": "円急騰240→120、バブル経済の芽"
    },
    {
     "country": "EU",
     "impact": "high",
     "note": "独マルクも急騰"
    },
    {
     "country": "UK",
     "impact": "medium",
     "note": "ポンド上昇"
    }
   ],
   "flows": [
    {
     "from": "US",
     "to": "JP",
     "type": "policy",
     "label": "ドル高是正"
    },
    {
     "from": "US",
     "to": "EU",
     "type": "policy",
     "label": "協調介入"
    }
   ],
   "narrative": "G5がNYプラザホテルで会合、ドル高是正に合意。円は2年で半値に。日本はその後の金融緩和でバブルへ。",
   "related": [
    "../japan/14_currency.html",
    "../us/14_currency.html"
   ]
  },
  {
   "id": "black_monday_1987",
   "year": 1987,
   "month": 10,
   "title": "ブラックマンデー",
   "category": "金融危機",
   "severity": "high",
   "epicenter": "US",
   "affected": [
    {
     "country": "US",
     "impact": "critical",
     "note": "NYダウ1日で-22.6%"
    },
    {
     "country": "JP",
     "impact": "high",
     "note": "日経-14.9%"
    },
    {
     "country": "UK",
     "impact": "high",
     "note": "FTSE-10%超"
    },
    {
     "country": "EU",
     "impact": "high",
     "note": "独仏市場も暴落"
    }
   ],
   "flows": [
    {
     "from": "US",
     "to": "JP",
     "type": "contagion"
    },
    {
     "from": "US",
     "to": "UK",
     "type": "contagion"
    },
    {
     "from": "US",
     "to": "EU",
     "type": "contagion"
    }
   ],
   "narrative": "1987年10月19日、NY株式市場が1日で22%暴落。プログラム取引が暴落を増幅、世界同時株安に発展した。",
   "related": [
    "../us/15_crises.html",
    "../us/08_equity_modern.html"
   ]
  },
  {
   "id": "berlin_wall_1989",
   "year": 1989,
   "month": 11,
   "title": "ベルリンの壁崩壊",
   "category": "地政学",
   "severity": "high",
   "epicenter": "EU",
   "affected": [
    {
     "country": "EU",
     "impact": "critical",
     "note": "東西ドイツ統一、マルク統合"
    },
    {
     "country": "US",
     "impact": "medium",
     "note": "冷戦終結、平和の配当"
    },
    {
     "country": "RU",
     "impact": "critical",
     "note": "東欧圏崩壊の前兆"
    }
   ],
   "flows": [
    {
     "from": "EU",
     "to": "RU",
     "type": "policy",
     "label": "冷戦終結"
    }
   ],
   "narrative": "1989年11月9日、ベルリンの壁が崩壊。東西冷戦終結への流れが決定的となり、翌年ドイツは再統一を果たした。",
   "related": [
    "../eurozone/14_currency.html",
    "g10_timeline.html"
   ]
  },
  {
   "id": "japan_bubble_burst_1990",
   "year": 1990,
   "month": 1,
   "title": "日本バブル崩壊",
   "category": "金融危機",
   "severity": "critical",
   "epicenter": "JP",
   "affected": [
    {
     "country": "JP",
     "impact": "critical",
     "note": "日経38915→半値、失われた30年開始"
    },
    {
     "country": "US",
     "impact": "low",
     "note": "日本マネー撤退"
    },
    {
     "country": "EU",
     "impact": "low",
     "note": "不動産価格に波及"
    }
   ],
   "flows": [
    {
     "from": "JP",
     "to": "US",
     "type": "capital",
     "label": "資金回帰"
    }
   ],
   "narrative": "1989年末38915円でピークの日経平均は1990年から崩落。地価も90年代前半から下落し、日本は長期デフレに陥った。",
   "related": [
    "../japan/15_crises.html",
    "../japan/08_equity_modern.html"
   ]
  },
  {
   "id": "soviet_collapse_1991",
   "year": 1991,
   "month": 12,
   "title": "ソビエト連邦崩壊",
   "category": "地政学",
   "severity": "critical",
   "epicenter": "RU",
   "affected": [
    {
     "country": "RU",
     "impact": "critical",
     "note": "ソ連解体、ルーブル暴落"
    },
    {
     "country": "US",
     "impact": "medium",
     "note": "単極支配時代到来"
    },
    {
     "country": "EU",
     "impact": "high",
     "note": "東欧諸国の自由化"
    }
   ],
   "flows": [
    {
     "from": "RU",
     "to": "EU",
     "type": "capital",
     "label": "資本逃避"
    }
   ],
   "narrative": "1991年12月、ソビエト連邦解体。冷戦時代が完全に終焉し、ロシアと旧ソ連諸国は市場経済への痛みを伴う移行期に入った。",
   "related": [
    "g10_timeline.html",
    "../eurozone/20_lessons.html"
   ]
  },
  {
   "id": "erm_crisis_1992",
   "year": 1992,
   "month": 9,
   "title": "ERM危機・ブラックウェンズデー",
   "category": "通貨制度",
   "severity": "high",
   "epicenter": "UK",
   "affected": [
    {
     "country": "UK",
     "impact": "critical",
     "note": "ポンドERM離脱、ソロスが10億ドル獲得"
    },
    {
     "country": "EU",
     "impact": "high",
     "note": "ERM変動幅拡大を余儀なくされる"
    },
    {
     "country": "CH",
     "impact": "medium",
     "note": "安全通貨として流入"
    }
   ],
   "flows": [
    {
     "from": "UK",
     "to": "EU",
     "type": "contagion",
     "label": "通貨売り"
    }
   ],
   "narrative": "1992年9月16日、英国はポンド防衛に失敗しERMから離脱。ジョージ・ソロスがポンド売りで巨額利益を上げた。",
   "related": [
    "../uk/15_crises.html",
    "../uk/14_currency.html"
   ]
  },
  {
   "id": "nafta_1994",
   "year": 1994,
   "month": 1,
   "title": "NAFTA発効",
   "category": "貿易戦争",
   "severity": "medium",
   "epicenter": "US",
   "affected": [
    {
     "country": "US",
     "impact": "medium",
     "note": "北米自由貿易圏成立"
    },
    {
     "country": "CA",
     "impact": "medium",
     "note": "対米輸出拡大"
    }
   ],
   "flows": [
    {
     "from": "US",
     "to": "CA",
     "type": "trade",
     "label": "自由貿易"
    }
   ],
   "narrative": "1994年1月1日、米加墨のNAFTAが発効。北米経済統合の基盤となり、サプライチェーン再編を促した。",
   "related": [
    "../canada/19_trade.html",
    "../us/19_trade.html"
   ]
  },
  {
   "id": "mexico_crisis_1994",
   "year": 1994,
   "month": 12,
   "title": "メキシコ通貨危機（テキーラ危機）",
   "category": "金融危機",
   "severity": "high",
   "epicenter": "US",
   "affected": [
    {
     "country": "US",
     "impact": "medium",
     "note": "500億ドル救済パッケージ主導"
    },
    {
     "country": "CA",
     "impact": "low",
     "note": "NAFTAパートナーとして影響"
    }
   ],
   "flows": [
    {
     "from": "US",
     "to": "CA",
     "type": "contagion"
    }
   ],
   "narrative": "1994年12月、メキシコペソが急落。米国は500億ドルの救済を主導し、中南米全域へ危機が波及した。",
   "related": [
    "../us/15_crises.html",
    "../us/14_currency.html"
   ]
  },
  {
   "id": "asian_crisis_1997",
   "year": 1997,
   "month": 7,
   "title": "アジア通貨危機",
   "category": "金融危機",
   "severity": "critical",
   "epicenter": "JP",
   "affected": [
    {
     "country": "JP",
     "impact": "critical",
     "note": "山一證券破綻、金融システム動揺"
    },
    {
     "country": "US",
     "impact": "medium",
     "note": "IMF救済主導"
    },
    {
     "country": "AU",
     "impact": "high",
     "note": "豪ドル急落"
    },
    {
     "country": "NZ",
     "impact": "high",
     "note": "NZドル急落"
    }
   ],
   "flows": [
    {
     "from": "JP",
     "to": "AU",
     "type": "contagion"
    },
    {
     "from": "JP",
     "to": "NZ",
     "type": "contagion"
    }
   ],
   "narrative": "タイバーツ切下げを契機にアジア通貨が連鎖暴落。日本の金融機関も巨額不良債権で山一證券等が破綻した。",
   "related": [
    "../japan/15_crises.html",
    "../japan/16_banking.html"
   ]
  },
  {
   "id": "ltcm_russia_1998",
   "year": 1998,
   "month": 8,
   "title": "LTCM破綻・ロシア危機",
   "category": "金融危機",
   "severity": "critical",
   "epicenter": "RU",
   "affected": [
    {
     "country": "RU",
     "impact": "critical",
     "note": "デフォルト、ルーブル暴落"
    },
    {
     "country": "US",
     "impact": "high",
     "note": "LTCM救済、FRB緊急利下げ"
    },
    {
     "country": "EU",
     "impact": "high",
     "note": "独国債に逃避"
    }
   ],
   "flows": [
    {
     "from": "RU",
     "to": "US",
     "type": "contagion",
     "label": "LTCM危機"
    },
    {
     "from": "RU",
     "to": "EU",
     "type": "capital",
     "label": "質への逃避"
    }
   ],
   "narrative": "ロシアがデフォルト宣言、ヘッジファンドLTCMが破綻寸前に。FRBは緊急利下げと救済を組織した。",
   "related": [
    "../us/15_crises.html",
    "../us/11_bond_market.html"
   ]
  },
  {
   "id": "euro_launch_1999",
   "year": 1999,
   "month": 1,
   "title": "ユーロ導入",
   "category": "通貨制度",
   "severity": "high",
   "epicenter": "EU",
   "affected": [
    {
     "country": "EU",
     "impact": "critical",
     "note": "11カ国で共通通貨ユーロ発足"
    },
    {
     "country": "UK",
     "impact": "medium",
     "note": "不参加、独自路線"
    },
    {
     "country": "CH",
     "impact": "medium",
     "note": "周辺国として影響大"
    }
   ],
   "flows": [
    {
     "from": "EU",
     "to": "UK",
     "type": "policy"
    },
    {
     "from": "EU",
     "to": "CH",
     "type": "policy"
    }
   ],
   "narrative": "1999年1月1日、欧州11カ国で単一通貨ユーロが発足。2002年には現金流通も始まった。",
   "related": [
    "../eurozone/01_central_bank.html",
    "../eurozone/14_currency.html"
   ]
  },
  {
   "id": "dotcom_bust_2000",
   "year": 2000,
   "month": 3,
   "title": "ドットコム・バブル崩壊",
   "category": "金融危機",
   "severity": "high",
   "epicenter": "US",
   "affected": [
    {
     "country": "US",
     "impact": "critical",
     "note": "NASDAQ 5048→1114、-78%"
    },
    {
     "country": "JP",
     "impact": "high",
     "note": "IT関連株も暴落"
    },
    {
     "country": "EU",
     "impact": "high",
     "note": "ノイアマルクト崩壊"
    }
   ],
   "flows": [
    {
     "from": "US",
     "to": "JP",
     "type": "contagion"
    },
    {
     "from": "US",
     "to": "EU",
     "type": "contagion"
    }
   ],
   "narrative": "2000年3月NASDAQが5048でピーク、以後2年で78%下落。IT関連企業の多くが経営破綻した。",
   "related": [
    "../us/15_crises.html",
    "../us/08_equity_modern.html"
   ]
  },
  {
   "id": "nine_eleven_2001",
   "year": 2001,
   "month": 9,
   "title": "9/11 同時多発テロ",
   "category": "地政学",
   "severity": "critical",
   "epicenter": "US",
   "affected": [
    {
     "country": "US",
     "impact": "critical",
     "note": "WTC崩落、NYSE4日間停止"
    },
    {
     "country": "UK",
     "impact": "high",
     "note": "対テロ戦争参加"
    },
    {
     "country": "EU",
     "impact": "medium",
     "note": "緊急利下げ協調"
    },
    {
     "country": "JP",
     "impact": "medium",
     "note": "円高・株安"
    }
   ],
   "flows": [
    {
     "from": "US",
     "to": "UK",
     "type": "policy",
     "label": "対テロ連携"
    },
    {
     "from": "US",
     "to": "EU",
     "type": "policy",
     "label": "協調利下げ"
    }
   ],
   "narrative": "2001年9月11日、米同時多発テロ発生。世界市場は急落、FRBは緊急利下げを実施、対テロ戦争が始まった。",
   "related": [
    "../us/15_crises.html",
    "../us/02_policy_rate.html"
   ]
  },
  {
   "id": "iraq_war_2003",
   "year": 2003,
   "month": 3,
   "title": "イラク戦争開戦",
   "category": "地政学",
   "severity": "high",
   "epicenter": "US",
   "affected": [
    {
     "country": "US",
     "impact": "high",
     "note": "対イラク軍事行動"
    },
    {
     "country": "UK",
     "impact": "high",
     "note": "有志連合参加"
    },
    {
     "country": "SA",
     "impact": "medium",
     "note": "原油価格上昇圧力"
    }
   ],
   "flows": [
    {
     "from": "US",
     "to": "UK",
     "type": "policy",
     "label": "有志連合"
    }
   ],
   "narrative": "2003年3月、米英主導でイラク戦争開戦。原油価格は上昇、地政学リスクプレミアムが拡大した。",
   "related": [
    "g10_timeline.html",
    "../norway/19_trade.html"
   ]
  },
  {
   "id": "bnp_paribas_2007",
   "year": 2007,
   "month": 8,
   "title": "BNP Paribasサブプライム凍結",
   "category": "金融危機",
   "severity": "high",
   "epicenter": "EU",
   "affected": [
    {
     "country": "EU",
     "impact": "high",
     "note": "BNPが傘下ファンド3本を凍結、世界的信用収縮の始まり"
    },
    {
     "country": "US",
     "impact": "high",
     "note": "サブプライム危機表面化"
    },
    {
     "country": "UK",
     "impact": "high",
     "note": "ノーザンロック取付騒ぎ"
    }
   ],
   "flows": [
    {
     "from": "EU",
     "to": "US",
     "type": "contagion"
    },
    {
     "from": "EU",
     "to": "UK",
     "type": "contagion"
    }
   ],
   "narrative": "2007年8月9日、BNP Paribasがサブプライム関連3ファンドの換金停止を発表。世界的な信用収縮の発火点となった。",
   "related": [
    "../eurozone/15_crises.html",
    "../us/15_crises.html"
   ]
  },
  {
   "id": "lehman_shock_2008",
   "year": 2008,
   "month": 9,
   "title": "リーマンショック",
   "category": "金融危機",
   "severity": "critical",
   "epicenter": "US",
   "affected": [
    {
     "country": "US",
     "impact": "critical",
     "note": "Lehman破綻、GDP-4.3%"
    },
    {
     "country": "JP",
     "impact": "critical",
     "note": "日経-42%、円急騰"
    },
    {
     "country": "EU",
     "impact": "critical",
     "note": "銀行システム動揺"
    },
    {
     "country": "UK",
     "impact": "critical",
     "note": "RBS国有化"
    },
    {
     "country": "CH",
     "impact": "high",
     "note": "UBS政府救済"
    },
    {
     "country": "AU",
     "impact": "high",
     "note": "豪ドル急落"
    },
    {
     "country": "CA",
     "impact": "high",
     "note": "原油急落で打撃"
    }
   ],
   "flows": [
    {
     "from": "US",
     "to": "JP",
     "type": "contagion"
    },
    {
     "from": "US",
     "to": "EU",
     "type": "contagion"
    },
    {
     "from": "US",
     "to": "UK",
     "type": "contagion"
    },
    {
     "from": "US",
     "to": "CH",
     "type": "contagion"
    }
   ],
   "narrative": "2008年9月15日、リーマン・ブラザーズが破綻。世界的金融危機が深刻化し、各国は協調利下げと財政出動に走った。",
   "related": [
    "../us/15_crises.html",
    "../japan/15_crises.html"
   ]
  },
  {
   "id": "greece_crisis_2009",
   "year": 2009,
   "month": 10,
   "title": "ギリシャ財政危機発覚",
   "category": "金融危機",
   "severity": "high",
   "epicenter": "EU",
   "affected": [
    {
     "country": "EU",
     "impact": "critical",
     "note": "ギリシャ赤字隠蔽、ユーロ危機の火種"
    },
    {
     "country": "CH",
     "impact": "medium",
     "note": "CHF買い圧力"
    }
   ],
   "flows": [
    {
     "from": "EU",
     "to": "CH",
     "type": "capital",
     "label": "CHFへ逃避"
    }
   ],
   "narrative": "2009年10月、ギリシャ政権交代で財政赤字が実際はGDPの12.7%と判明。欧州ソブリン危機の発端となった。",
   "related": [
    "../eurozone/15_crises.html",
    "../eurozone/11_bond_market.html"
   ]
  },
  {
   "id": "euro_sovereign_2010",
   "year": 2010,
   "month": 5,
   "title": "欧州ソブリン危機",
   "category": "金融危機",
   "severity": "critical",
   "epicenter": "EU",
   "affected": [
    {
     "country": "EU",
     "impact": "critical",
     "note": "PIIGS国債急落、EFSF設立"
    },
    {
     "country": "CH",
     "impact": "high",
     "note": "CHF急騰で輸出打撃"
    },
    {
     "country": "UK",
     "impact": "medium",
     "note": "英銀エクスポージャー懸念"
    }
   ],
   "flows": [
    {
     "from": "EU",
     "to": "CH",
     "type": "capital",
     "label": "CHFへ逃避"
    }
   ],
   "narrative": "2010年5月、ギリシャ・アイルランド・ポルトガルへの救済が相次ぎ、欧州ソブリン危機が本格化した。",
   "related": [
    "../eurozone/15_crises.html",
    "../eurozone/11_bond_market.html"
   ]
  },
  {
   "id": "fukushima_2011",
   "year": 2011,
   "month": 3,
   "title": "東日本大震災・福島原発事故",
   "category": "地政学",
   "severity": "critical",
   "epicenter": "JP",
   "affected": [
    {
     "country": "JP",
     "impact": "critical",
     "note": "M9.0、津波、原発事故"
    },
    {
     "country": "US",
     "impact": "medium",
     "note": "サプライチェーン寸断"
    },
    {
     "country": "EU",
     "impact": "medium",
     "note": "独が脱原発決定"
    }
   ],
   "flows": [
    {
     "from": "JP",
     "to": "US",
     "type": "contagion",
     "label": "サプライ寸断"
    },
    {
     "from": "JP",
     "to": "EU",
     "type": "policy",
     "label": "脱原発波及"
    }
   ],
   "narrative": "2011年3月11日、M9.0の東日本大震災と福島第一原発事故。円は安全通貨として急騰、G7は協調介入を実施した。",
   "related": [
    "../japan/15_crises.html",
    "../japan/14_currency.html"
   ]
  },
  {
   "id": "whatever_it_takes_2012",
   "year": 2012,
   "month": 7,
   "title": "ドラギ 'Whatever it takes'",
   "category": "中央銀行",
   "severity": "high",
   "epicenter": "EU",
   "affected": [
    {
     "country": "EU",
     "impact": "critical",
     "note": "ECBがユーロ防衛を公約、危機鎮静"
    },
    {
     "country": "CH",
     "impact": "medium",
     "note": "CHF圧力緩和"
    }
   ],
   "flows": [
    {
     "from": "EU",
     "to": "CH",
     "type": "policy"
    }
   ],
   "narrative": "2012年7月26日、ドラギECB総裁が『ユーロを守るためなら何でもする』と宣言。欧州危機は劇的に沈静化した。",
   "related": [
    "../eurozone/01_central_bank.html",
    "../eurozone/15_crises.html"
   ]
  },
  {
   "id": "taper_tantrum_2013",
   "year": 2013,
   "month": 5,
   "title": "テーパー・タントラム",
   "category": "中央銀行",
   "severity": "medium",
   "epicenter": "US",
   "affected": [
    {
     "country": "US",
     "impact": "medium",
     "note": "バーナンキがQE縮小示唆、長期金利急騰"
    },
    {
     "country": "JP",
     "impact": "medium",
     "note": "新興国通貨急落"
    }
   ],
   "flows": [
    {
     "from": "US",
     "to": "JP",
     "type": "capital"
    }
   ],
   "narrative": "2013年5月、バーナンキFRB議長がQE縮小を示唆。米長期金利が急騰し、新興国から資金が流出した。",
   "related": [
    "../us/02_policy_rate.html",
    "../us/11_bond_market.html"
   ]
  },
  {
   "id": "crimea_annexation_2014",
   "year": 2014,
   "month": 3,
   "title": "ロシアのクリミア併合",
   "category": "地政学",
   "severity": "high",
   "epicenter": "RU",
   "affected": [
    {
     "country": "RU",
     "impact": "critical",
     "note": "欧米から経済制裁"
    },
    {
     "country": "EU",
     "impact": "high",
     "note": "対ロ制裁、エネルギー依存問題"
    },
    {
     "country": "US",
     "impact": "medium",
     "note": "制裁主導"
    }
   ],
   "flows": [
    {
     "from": "EU",
     "to": "RU",
     "type": "sanction",
     "label": "制裁"
    },
    {
     "from": "US",
     "to": "RU",
     "type": "sanction",
     "label": "制裁"
    }
   ],
   "narrative": "2014年3月、ロシアがクリミア半島を併合。欧米はロシアに対する段階的な経済制裁を発動した。",
   "related": [
    "g10_timeline.html",
    "../eurozone/19_trade.html"
   ]
  },
  {
   "id": "oil_crash_2014",
   "year": 2014,
   "month": 10,
   "title": "原油価格暴落",
   "category": "エネルギー",
   "severity": "high",
   "epicenter": "SA",
   "affected": [
    {
     "country": "SA",
     "impact": "high",
     "note": "OPECが減産見送り、シェア戦略"
    },
    {
     "country": "CA",
     "impact": "high",
     "note": "カナダドル急落"
    },
    {
     "country": "NO",
     "impact": "high",
     "note": "NOKも急落、財政圧迫"
    },
    {
     "country": "RU",
     "impact": "critical",
     "note": "ルーブル暴落"
    }
   ],
   "flows": [
    {
     "from": "SA",
     "to": "CA",
     "type": "contagion"
    },
    {
     "from": "SA",
     "to": "NO",
     "type": "contagion"
    },
    {
     "from": "SA",
     "to": "RU",
     "type": "contagion"
    }
   ],
   "narrative": "2014年後半、原油価格が100ドルから40ドル台まで急落。産油国通貨は軒並み売られ、資源国経済を直撃した。",
   "related": [
    "../norway/14_currency.html",
    "../canada/14_currency.html"
   ]
  },
  {
   "id": "snb_shock_2015",
   "year": 2015,
   "month": 1,
   "title": "SNB CHFショック",
   "category": "中央銀行",
   "severity": "high",
   "epicenter": "CH",
   "affected": [
    {
     "country": "CH",
     "impact": "critical",
     "note": "EURCHFフロア撤廃、CHF20%急騰"
    },
    {
     "country": "EU",
     "impact": "medium",
     "note": "EUR急落"
    }
   ],
   "flows": [
    {
     "from": "CH",
     "to": "EU",
     "type": "currency_pressure"
    }
   ],
   "narrative": "2015年1月15日、SNBが突如EURCHF1.20フロアを撤廃。CHFは瞬間20%急騰、多くのFX業者が破綻した。",
   "related": [
    "../switzerland/14_currency.html",
    "../switzerland/15_crises.html"
   ]
  },
  {
   "id": "china_shock_2015",
   "year": 2015,
   "month": 8,
   "title": "チャイナショック（人民元切下げ）",
   "category": "通貨制度",
   "severity": "high",
   "epicenter": "CN",
   "affected": [
    {
     "country": "CN",
     "impact": "critical",
     "note": "人民元3日連続切下げ"
    },
    {
     "country": "AU",
     "impact": "high",
     "note": "資源需要懸念でAUD急落"
    },
    {
     "country": "US",
     "impact": "medium",
     "note": "NY株急落"
    }
   ],
   "flows": [
    {
     "from": "CN",
     "to": "AU",
     "type": "contagion"
    },
    {
     "from": "CN",
     "to": "US",
     "type": "contagion"
    }
   ],
   "narrative": "2015年8月、中国人民銀行が人民元を3日連続切下げ。世界的リスクオフとなり、豪ドルや商品通貨が急落した。",
   "related": [
    "../australia/19_trade.html",
    "../us/09_equity_recent.html"
   ]
  },
  {
   "id": "brexit_vote_2016",
   "year": 2016,
   "month": 6,
   "title": "Brexit国民投票",
   "category": "地政学",
   "severity": "critical",
   "epicenter": "UK",
   "affected": [
    {
     "country": "UK",
     "impact": "critical",
     "note": "離脱51.9%、ポンド1日-10%"
    },
    {
     "country": "EU",
     "impact": "high",
     "note": "EU統合への逆風"
    },
    {
     "country": "JP",
     "impact": "medium",
     "note": "円急騰、日経急落"
    }
   ],
   "flows": [
    {
     "from": "UK",
     "to": "EU",
     "type": "policy",
     "label": "離脱"
    },
    {
     "from": "UK",
     "to": "JP",
     "type": "contagion"
    }
   ],
   "narrative": "2016年6月23日、英国民投票でEU離脱派が勝利。ポンドは30年ぶり安値、キャメロン首相辞任を発表した。",
   "related": [
    "../uk/15_crises.html",
    "../uk/14_currency.html"
   ]
  },
  {
   "id": "trump_election_2016",
   "year": 2016,
   "month": 11,
   "title": "トランプ大統領選勝利",
   "category": "地政学",
   "severity": "high",
   "epicenter": "US",
   "affected": [
    {
     "country": "US",
     "impact": "high",
     "note": "リフレ期待で株高ドル高"
    },
    {
     "country": "JP",
     "impact": "medium",
     "note": "円安株高"
    },
    {
     "country": "EU",
     "impact": "medium",
     "note": "対米関係不透明化"
    }
   ],
   "flows": [
    {
     "from": "US",
     "to": "JP",
     "type": "capital"
    },
    {
     "from": "US",
     "to": "EU",
     "type": "policy"
    }
   ],
   "narrative": "2016年11月8日、トランプが予想外に大統領選勝利。減税・規制緩和期待から米株は急騰、ドルも上昇した。",
   "related": [
    "../us/03_fiscal_policy.html",
    "../us/09_equity_recent.html"
   ]
  },
  {
   "id": "us_china_trade_2018",
   "year": 2018,
   "month": 3,
   "title": "米中貿易戦争開戦",
   "category": "貿易戦争",
   "severity": "high",
   "epicenter": "US",
   "affected": [
    {
     "country": "US",
     "impact": "high",
     "note": "対中関税発動"
    },
    {
     "country": "CN",
     "impact": "critical",
     "note": "報復関税、元安"
    },
    {
     "country": "AU",
     "impact": "high",
     "note": "対中輸出打撃"
    },
    {
     "country": "CA",
     "impact": "medium",
     "note": "鉄鋼関税"
    }
   ],
   "flows": [
    {
     "from": "US",
     "to": "CN",
     "type": "trade",
     "label": "関税"
    },
    {
     "from": "US",
     "to": "CA",
     "type": "trade"
    }
   ],
   "narrative": "2018年3月、トランプ政権が鉄鋼・アルミに25%関税。続いて対中301条関税を発動、米中貿易戦争が本格化した。",
   "related": [
    "../us/19_trade.html",
    "../australia/19_trade.html"
   ]
  },
  {
   "id": "repo_crisis_2019",
   "year": 2019,
   "month": 9,
   "title": "米レポ市場危機",
   "category": "中央銀行",
   "severity": "medium",
   "epicenter": "US",
   "affected": [
    {
     "country": "US",
     "impact": "high",
     "note": "レポ金利10%急騰、FRB緊急資金供給"
    }
   ],
   "flows": [],
   "narrative": "2019年9月17日、米レポ金利が一時10%まで急騰。FRBは緊急に資金供給を実施、バランスシート再拡大へ転換した。",
   "related": [
    "../us/12_short_rates.html",
    "../us/01_central_bank.html"
   ]
  },
  {
   "id": "covid_2020",
   "year": 2020,
   "month": 3,
   "title": "COVID-19 パンデミック",
   "category": "パンデミック",
   "severity": "critical",
   "epicenter": "CN",
   "affected": [
    {
     "country": "CN",
     "impact": "critical",
     "note": "武漢ロックダウン発端"
    },
    {
     "country": "US",
     "impact": "critical",
     "note": "NY株-34%、FRB緊急ゼロ金利"
    },
    {
     "country": "EU",
     "impact": "critical",
     "note": "ロックダウン、PEPP導入"
    },
    {
     "country": "JP",
     "impact": "high",
     "note": "緊急事態宣言"
    },
    {
     "country": "UK",
     "impact": "critical",
     "note": "BOE緊急利下げ、QE拡大"
    },
    {
     "country": "AU",
     "impact": "high",
     "note": "RBA初のQE実施"
    },
    {
     "country": "CA",
     "impact": "high",
     "note": "BOCもゼロ金利へ"
    },
    {
     "country": "CH",
     "impact": "medium",
     "note": "SNB介入強化"
    },
    {
     "country": "NZ",
     "impact": "high",
     "note": "RBNZ QE導入"
    },
    {
     "country": "SE",
     "impact": "medium",
     "note": "独自の緩やか対策"
    },
    {
     "country": "NO",
     "impact": "high",
     "note": "原油急落と二重打撃"
    }
   ],
   "flows": [
    {
     "from": "CN",
     "to": "US",
     "type": "contagion"
    },
    {
     "from": "CN",
     "to": "EU",
     "type": "contagion"
    },
    {
     "from": "CN",
     "to": "JP",
     "type": "contagion"
    },
    {
     "from": "US",
     "to": "EU",
     "type": "policy",
     "label": "協調緩和"
    }
   ],
   "narrative": "2020年3月、WHOがパンデミック宣言。世界的ロックダウンで市場暴落、各国中銀は前例ない大規模緩和を実施した。",
   "related": [
    "../us/15_crises.html",
    "../japan/15_crises.html"
   ]
  },
  {
   "id": "gamestop_2021",
   "year": 2021,
   "month": 1,
   "title": "GameStop スクイーズ",
   "category": "金融危機",
   "severity": "low",
   "epicenter": "US",
   "affected": [
    {
     "country": "US",
     "impact": "medium",
     "note": "個人投資家がヘッジファンド追い詰める"
    }
   ],
   "flows": [],
   "narrative": "2021年1月、Redditの個人投資家がGME株を買い上げ、空売りヘッジファンドが巨額損失。市場構造の変化を象徴した。",
   "related": [
    "../us/10_equity_current.html",
    "../us/18_regulation.html"
   ]
  },
  {
   "id": "ukraine_war_2022",
   "year": 2022,
   "month": 2,
   "title": "ロシアのウクライナ侵攻",
   "category": "地政学",
   "severity": "critical",
   "epicenter": "RU",
   "affected": [
    {
     "country": "RU",
     "impact": "critical",
     "note": "大規模侵攻、SWIFT排除"
    },
    {
     "country": "EU",
     "impact": "critical",
     "note": "エネルギー危機、インフレ加速"
    },
    {
     "country": "US",
     "impact": "high",
     "note": "制裁主導、LNG輸出拡大"
    },
    {
     "country": "UK",
     "impact": "high",
     "note": "制裁・軍事支援"
    },
    {
     "country": "NO",
     "impact": "high",
     "note": "ガス最大供給国に"
    },
    {
     "country": "CH",
     "impact": "medium",
     "note": "中立政策見直し"
    }
   ],
   "flows": [
    {
     "from": "RU",
     "to": "EU",
     "type": "sanction"
    },
    {
     "from": "US",
     "to": "RU",
     "type": "sanction"
    },
    {
     "from": "NO",
     "to": "EU",
     "type": "trade",
     "label": "ガス供給"
    }
   ],
   "narrative": "2022年2月24日、ロシアがウクライナに全面侵攻。欧米は前例なき制裁を発動、エネルギー価格が急騰した。",
   "related": [
    "../eurozone/05_inflation.html",
    "../norway/19_trade.html"
   ]
  },
  {
   "id": "fed_hike_2022",
   "year": 2022,
   "month": 3,
   "title": "FRB急激利上げ開始",
   "category": "中央銀行",
   "severity": "high",
   "epicenter": "US",
   "affected": [
    {
     "country": "US",
     "impact": "high",
     "note": "1年で0→5.25%"
    },
    {
     "country": "JP",
     "impact": "high",
     "note": "円150円台、日米金利差"
    },
    {
     "country": "EU",
     "impact": "high",
     "note": "ECBも利上げ転換"
    }
   ],
   "flows": [
    {
     "from": "US",
     "to": "JP",
     "type": "capital",
     "label": "金利差拡大"
    },
    {
     "from": "US",
     "to": "EU",
     "type": "policy"
    }
   ],
   "narrative": "2022年3月、FRBは利上げを開始。40年ぶりインフレ退治のため、1年で500bp以上の急速利上げを実施した。",
   "related": [
    "../us/02_policy_rate.html",
    "../us/05_inflation.html"
   ]
  },
  {
   "id": "boe_gilt_2022",
   "year": 2022,
   "month": 9,
   "title": "英国債危機（Truss ミニ予算）",
   "category": "金融危機",
   "severity": "high",
   "epicenter": "UK",
   "affected": [
    {
     "country": "UK",
     "impact": "critical",
     "note": "Truss減税で英国債暴落、ポンド最安値"
    },
    {
     "country": "EU",
     "impact": "medium",
     "note": "Gilt危機が波及懸念"
    }
   ],
   "flows": [
    {
     "from": "UK",
     "to": "EU",
     "type": "contagion"
    }
   ],
   "narrative": "2022年9月、トラス政権の大型減税発表で英国債が暴落、ポンドは史上最安値。BOE緊急介入、トラス首相は45日で辞任した。",
   "related": [
    "../uk/15_crises.html",
    "../uk/11_bond_market.html"
   ]
  },
  {
   "id": "svb_cs_2023",
   "year": 2023,
   "month": 3,
   "title": "SVB/Credit Suisse 銀行危機",
   "category": "金融危機",
   "severity": "high",
   "epicenter": "US",
   "affected": [
    {
     "country": "US",
     "impact": "critical",
     "note": "SVB破綻、地銀連鎖不安"
    },
    {
     "country": "CH",
     "impact": "critical",
     "note": "UBSがCS吸収合併"
    },
    {
     "country": "EU",
     "impact": "high",
     "note": "欧州銀行株動揺"
    }
   ],
   "flows": [
    {
     "from": "US",
     "to": "CH",
     "type": "contagion"
    },
    {
     "from": "US",
     "to": "EU",
     "type": "contagion"
    }
   ],
   "narrative": "2023年3月、SVB破綻に続きCredit Suisseが経営危機。UBSによる緊急救済合併でグローバルSIB一角が消滅した。",
   "related": [
    "../us/16_banking.html",
    "../switzerland/16_banking.html"
   ]
  },
  {
   "id": "boj_exit_2024",
   "year": 2024,
   "month": 3,
   "title": "日銀マイナス金利解除",
   "category": "中央銀行",
   "severity": "high",
   "epicenter": "JP",
   "affected": [
    {
     "country": "JP",
     "impact": "critical",
     "note": "17年ぶり利上げ、YCC終了"
    },
    {
     "country": "US",
     "impact": "medium",
     "note": "キャリートレード巻戻し懸念"
    }
   ],
   "flows": [
    {
     "from": "JP",
     "to": "US",
     "type": "capital"
    }
   ],
   "narrative": "2024年3月、日銀が17年ぶりに利上げ、マイナス金利・YCCを終了。異次元緩和からの正常化が始まった。",
   "related": [
    "../japan/01_central_bank.html",
    "../japan/02_policy_rate.html"
   ]
  },
  {
   "id": "nikkei_ath_2024",
   "year": 2024,
   "month": 2,
   "title": "日経平均 34年ぶり最高値更新",
   "category": "金融危機",
   "severity": "low",
   "epicenter": "JP",
   "affected": [
    {
     "country": "JP",
     "impact": "medium",
     "note": "1989年の38915円を突破"
    }
   ],
   "flows": [],
   "narrative": "2024年2月22日、日経平均は38915円を突破、34年ぶりに史上最高値を更新した。",
   "related": [
    "../japan/10_equity_current.html",
    "../japan/09_equity_recent.html"
   ]
  },
  {
   "id": "yen_carry_unwind_2024",
   "year": 2024,
   "month": 8,
   "title": "円キャリー巻戻し暴落",
   "category": "金融危機",
   "severity": "high",
   "epicenter": "JP",
   "affected": [
    {
     "country": "JP",
     "impact": "critical",
     "note": "日経1日-12.4%、史上最大下げ幅"
    },
    {
     "country": "US",
     "impact": "high",
     "note": "Nasdaq急落"
    }
   ],
   "flows": [
    {
     "from": "JP",
     "to": "US",
     "type": "contagion"
    }
   ],
   "narrative": "2024年8月5日、日銀追加利上げと米雇用統計悪化で円キャリー巻戻し。日経平均は史上最大の下げ幅を記録した。",
   "related": [
    "../japan/14_currency.html",
    "../japan/10_equity_current.html"
   ]
  },
  {
   "id": "middle_east_2024",
   "year": 2024,
   "month": 10,
   "title": "中東緊張・イラン直接攻撃",
   "category": "地政学",
   "severity": "high",
   "epicenter": "SA",
   "affected": [
    {
     "country": "SA",
     "impact": "high",
     "note": "原油価格変動"
    },
    {
     "country": "US",
     "impact": "medium",
     "note": "防空支援"
    },
    {
     "country": "EU",
     "impact": "medium",
     "note": "エネルギー不安"
    }
   ],
   "flows": [
    {
     "from": "SA",
     "to": "EU",
     "type": "trade"
    }
   ],
   "narrative": "2024年10月、イランがイスラエルへミサイル直接攻撃。中東全面戦争懸念で原油は一時急騰した。",
   "related": [
    "g10_timeline.html",
    "../us/05_inflation.html"
   ]
  },
  {
   "id": "trump_tariff_2025",
   "year": 2025,
   "month": 4,
   "title": "トランプ相互関税",
   "category": "貿易戦争",
   "severity": "critical",
   "epicenter": "US",
   "affected": [
    {
     "country": "US",
     "impact": "critical",
     "note": "全世界に相互関税発表、株式急落"
    },
    {
     "country": "CN",
     "impact": "critical",
     "note": "125%関税報復"
    },
    {
     "country": "EU",
     "impact": "high",
     "note": "20%関税"
    },
    {
     "country": "JP",
     "impact": "high",
     "note": "24%関税発表"
    },
    {
     "country": "CA",
     "impact": "high",
     "note": "USMCA枠外品目に関税"
    },
    {
     "country": "UK",
     "impact": "medium",
     "note": "10%関税"
    },
    {
     "country": "AU",
     "impact": "medium",
     "note": "10%関税"
    }
   ],
   "flows": [
    {
     "from": "US",
     "to": "CN",
     "type": "trade",
     "label": "相互関税"
    },
    {
     "from": "US",
     "to": "EU",
     "type": "trade"
    },
    {
     "from": "US",
     "to": "JP",
     "type": "trade"
    },
    {
     "from": "US",
     "to": "CA",
     "type": "trade"
    }
   ],
   "narrative": "2025年4月2日、トランプ大統領が『解放の日』として全世界に相互関税を発表。世界株式は歴史的急落となった。",
   "related": [
    "../us/19_trade.html",
    "../canada/19_trade.html"
   ]
  },
  {
   "id": "riksbank_neg_2015",
   "year": 2015,
   "month": 2,
   "title": "Riksbank マイナス金利導入",
   "category": "中央銀行",
   "severity": "medium",
   "epicenter": "SE",
   "affected": [
    {
     "country": "SE",
     "impact": "high",
     "note": "政策金利-0.10%、世界初の先進国マイナス"
    },
    {
     "country": "NO",
     "impact": "medium",
     "note": "NOKも緩和圧力"
    }
   ],
   "flows": [
    {
     "from": "SE",
     "to": "NO",
     "type": "policy"
    }
   ],
   "narrative": "2015年2月、スウェーデン中銀がマイナス金利を導入。先進国中銀の非伝統的政策の先駆けとなった。",
   "related": [
    "../sweden/02_policy_rate.html",
    "../sweden/01_central_bank.html"
   ]
  },
  {
   "id": "norway_wealth_2022",
   "year": 2022,
   "month": 6,
   "title": "ノルウェー政府年金基金 史上最大損失",
   "category": "金融危機",
   "severity": "medium",
   "epicenter": "NO",
   "affected": [
    {
     "country": "NO",
     "impact": "high",
     "note": "GPFG 1740億ドル損失、半年で-14.4%"
    }
   ],
   "flows": [],
   "narrative": "2022年上半期、世界最大級のソブリン・ウェルス・ファンドであるノルウェー政府年金基金が史上最大の評価損を計上した。",
   "related": [
    "../norway/03_fiscal_policy.html",
    "../norway/20_lessons.html"
   ]
  },
  {
   "id": "rbnz_first_hike_2021",
   "year": 2021,
   "month": 10,
   "title": "RBNZ 先進国で先陣利上げ",
   "category": "中央銀行",
   "severity": "medium",
   "epicenter": "NZ",
   "affected": [
    {
     "country": "NZ",
     "impact": "high",
     "note": "7年ぶり利上げ、先進国初のコロナ後出口"
    },
    {
     "country": "AU",
     "impact": "medium",
     "note": "RBAへの利上げ圧力"
    }
   ],
   "flows": [
    {
     "from": "NZ",
     "to": "AU",
     "type": "policy"
    }
   ],
   "narrative": "2021年10月、RBNZが先進国で先陣を切り利上げ。コロナ緩和からの出口戦略のモデルケースとなった。",
   "related": [
    "../newzealand/02_policy_rate.html",
    "../newzealand/01_central_bank.html"
   ]
  },
  {
   "id": "canada_oil_sands_2016",
   "year": 2016,
   "month": 5,
   "title": "Fort McMurray 山火事・原油供給ショック",
   "category": "エネルギー",
   "severity": "low",
   "epicenter": "CA",
   "affected": [
    {
     "country": "CA",
     "impact": "high",
     "note": "オイルサンド生産1日100万バレル停止"
    }
   ],
   "flows": [],
   "narrative": "2016年5月、カナダ・アルバータ州の大規模山火事でオイルサンド生産が大幅停止、原油市場に一時的供給ショック。",
   "related": [
    "../canada/19_trade.html",
    "../canada/15_crises.html"
   ]
  },
  {
   "id": "abenomics_2013",
   "year": 2013,
   "month": 4,
   "title": "異次元緩和（アベノミクス）開始",
   "category": "中央銀行",
   "severity": "high",
   "epicenter": "JP",
   "affected": [
    {
     "country": "JP",
     "impact": "critical",
     "note": "黒田日銀が量的・質的緩和導入、円安株高"
    },
    {
     "country": "US",
     "impact": "medium",
     "note": "円キャリー復活"
    }
   ],
   "flows": [
    {
     "from": "JP",
     "to": "US",
     "type": "capital",
     "label": "円キャリー"
    }
   ],
   "narrative": "2013年4月4日、黒田新総裁が異次元緩和を発表。2年で資金供給2倍、円は80円から一気に100円超へ。",
   "related": [
    "../japan/01_central_bank.html",
    "../japan/09_equity_recent.html"
   ]
  },
  {
   "id": "scotland_ref_2014",
   "year": 2014,
   "month": 9,
   "title": "スコットランド独立住民投票",
   "category": "地政学",
   "severity": "medium",
   "epicenter": "UK",
   "affected": [
    {
     "country": "UK",
     "impact": "high",
     "note": "否決55%、連合国家維持"
    }
   ],
   "flows": [],
   "narrative": "2014年9月18日、スコットランド独立住民投票は反対55%で否決。ポンドはボラティリティ上昇後に持ち直した。",
   "related": [
    "../uk/14_currency.html",
    "g10_timeline.html"
   ]
  },
  {
   "id": "ecb_qe_2015",
   "year": 2015,
   "month": 3,
   "title": "ECB QE開始",
   "category": "中央銀行",
   "severity": "high",
   "epicenter": "EU",
   "affected": [
    {
     "country": "EU",
     "impact": "critical",
     "note": "月600億ユーロ資産購入開始"
    },
    {
     "country": "CH",
     "impact": "high",
     "note": "CHF圧力、SNBフロア放棄の遠因"
    }
   ],
   "flows": [
    {
     "from": "EU",
     "to": "CH",
     "type": "policy"
    }
   ],
   "narrative": "2015年3月、ECBが月600億ユーロの量的緩和を開始。遅れてのQE導入で欧州危機からの脱却を図った。",
   "related": [
    "../eurozone/01_central_bank.html",
    "../eurozone/02_policy_rate.html"
   ]
  },
  {
   "id": "taiwan_strait_crisis_1996",
   "year": 1996,
   "month": 3,
   "title": "第三次台湾海峡危機",
   "category": "地政学",
   "severity": "high",
   "epicenter": "TW",
   "affected": [
    { "country": "TW", "impact": "critical", "note": "中国がミサイル演習、TAIEX急落・資本流出" },
    { "country": "CN", "impact": "high", "note": "李登輝訪米に反発、台湾近海へミサイル発射" },
    { "country": "US", "impact": "high", "note": "空母2隻を台湾海峡へ派遣し抑止" },
    { "country": "JP", "impact": "medium", "note": "シーレーン・地域安全保障への懸念" }
   ],
   "flows": [
    { "from": "CN", "to": "TW", "type": "contagion", "label": "ミサイル演習" },
    { "from": "US", "to": "TW", "type": "policy", "label": "空母派遣" }
   ],
   "narrative": "1995-96年、李登輝総統の訪米に中国が反発し台湾近海でミサイル演習を実施。米国は空母2隻を派遣し、両岸地政学リスクの原型となった。",
   "related": [
    "../taiwan/21_geopolitical_risk.html",
    "../taiwan/15_crises.html"
   ]
  },
  {
   "id": "pelosi_taiwan_2022",
   "year": 2022,
   "month": 8,
   "title": "ペロシ訪台・第四次台湾海峡危機",
   "category": "地政学",
   "severity": "high",
   "epicenter": "TW",
   "affected": [
    { "country": "TW", "impact": "high", "note": "中国が大規模軍事演習、ミサイルが上空を通過" },
    { "country": "CN", "impact": "high", "note": "ペロシ訪台に反発し台湾包囲演習を実施" },
    { "country": "US", "impact": "medium", "note": "下院議長訪台で米中関係が緊迫" },
    { "country": "JP", "impact": "medium", "note": "EEZ内にミサイル着弾、防衛議論が加速" }
   ],
   "flows": [
    { "from": "US", "to": "TW", "type": "policy", "label": "ペロシ訪台" },
    { "from": "CN", "to": "TW", "type": "contagion", "label": "封鎖演習" }
   ],
   "narrative": "2022年8月、ペロシ米下院議長が訪台。中国は台湾を包囲する大規模軍事演習で対抗し、ミサイルが日本のEEZにも着弾、地政学プレミアムが顕在化した。",
   "related": [
    "../taiwan/21_geopolitical_risk.html",
    "../taiwan/10_equity_current.html"
   ]
  },
  {
   "id": "taiwan_silicon_shield_2024",
   "year": 2024,
   "month": 2,
   "title": "半導体サプライチェーンとシリコン・シールド",
   "category": "貿易戦争",
   "severity": "medium",
   "epicenter": "TW",
   "affected": [
    { "country": "TW", "impact": "critical", "note": "TSMCが世界の先端半導体を寡占、有事=供給途絶リスク" },
    { "country": "US", "impact": "high", "note": "CHIPS法でアリゾナ工場を誘致し供給分散" },
    { "country": "JP", "impact": "high", "note": "TSMC熊本(JASM)第1工場が稼働" },
    { "country": "CN", "impact": "medium", "note": "先端半導体規制で締め出され自給化を加速" }
   ],
   "flows": [
    { "from": "TW", "to": "US", "type": "trade", "label": "分散生産" },
    { "from": "TW", "to": "JP", "type": "trade", "label": "JASM熊本" }
   ],
   "narrative": "TSMCが世界の先端ロジック半導体を寡占し、台湾有事が世界の電子産業を止める『シリコン・シールド』を形成。各国は熊本・アリゾナへ生産分散を進めた。",
   "related": [
    "../taiwan/21_geopolitical_risk.html",
    "../taiwan/19_trade.html"
   ]
  },
  {
   "id": "hk_handover_1997",
   "year": 1997,
   "month": 7,
   "title": "香港返還・一国二制度開始",
   "category": "地政学",
   "severity": "high",
   "epicenter": "HK",
   "affected": [
    { "country": "HK", "impact": "high", "note": "英から中国へ主権返還、直後にアジア危機が直撃" },
    { "country": "UK", "impact": "medium", "note": "155年の植民地統治が終了" },
    { "country": "CN", "impact": "medium", "note": "一国二制度で国際金融ハブを獲得" }
   ],
   "flows": [
    { "from": "UK", "to": "HK", "type": "policy", "label": "主権返還" },
    { "from": "CN", "to": "HK", "type": "policy", "label": "一国二制度" }
   ],
   "narrative": "1997年7月1日、香港が英国から中国へ返還され『一国二制度』が始まった。直後にアジア通貨危機が直撃し、98年には政府が株式市場へ介入して投機筋を撃退した。",
   "related": [
    "../hongkong/21_geopolitical_risk.html",
    "../hongkong/15_crises.html"
   ]
  },
  {
   "id": "hk_nsl_capital_flight_2020",
   "year": 2020,
   "month": 6,
   "title": "香港国家安全法と資本流出",
   "category": "地政学",
   "severity": "high",
   "epicenter": "HK",
   "affected": [
    { "country": "HK", "impact": "critical", "note": "国安法施行、米が特別貿易地位を剥奪、人材流出" },
    { "country": "US", "impact": "medium", "note": "大統領令13936で香港優遇を撤廃・制裁" },
    { "country": "CN", "impact": "medium", "note": "統制強化で国際金融ハブの質に懸念" },
    { "country": "SG", "impact": "high", "note": "富裕層資金・人材の受け皿に" }
   ],
   "flows": [
    { "from": "US", "to": "HK", "type": "sanction", "label": "特別地位剥奪" },
    { "from": "HK", "to": "SG", "type": "capital", "label": "資本・人材流出" }
   ],
   "narrative": "2020年6月、中国が香港国家安全法を施行。米国は香港の特別貿易地位を剥奪し、富裕層の資金と人材がシンガポールへ流出した。",
   "related": [
    "../hongkong/21_geopolitical_risk.html",
    "../hongkong/10_equity_current.html"
   ]
  },
  {
   "id": "china_evergrande_2021",
   "year": 2021,
   "month": 9,
   "title": "中国恒大集団 債務危機",
   "category": "金融危機",
   "severity": "high",
   "epicenter": "CN",
   "affected": [
    { "country": "CN", "impact": "critical", "note": "負債3,000億ドル超、不動産バブル崩壊の起点" },
    { "country": "HK", "impact": "high", "note": "ハンセン不動産株が急落、24年に香港高裁が清算命令" },
    { "country": "AU", "impact": "medium", "note": "鉄鉱石需要懸念で資源株安" },
    { "country": "JP", "impact": "low", "note": "中国減速リスクとして波及" }
   ],
   "flows": [
    { "from": "CN", "to": "HK", "type": "contagion", "label": "不動産株安" },
    { "from": "CN", "to": "AU", "type": "contagion", "label": "資源需要減" }
   ],
   "narrative": "2021年9月、負債3,000億ドルを超える中国恒大集団の債務危機が表面化。不動産バブル崩壊の起点となり、碧桂園破綻へと連鎖、資源国にも波及した。",
   "related": [
    "../china/21_geopolitical_risk.html",
    "../china/15_crises.html"
   ]
  },
  {
   "id": "us_china_chip_war_2022",
   "year": 2022,
   "month": 10,
   "title": "米中半導体戦争（先端輸出規制）",
   "category": "貿易戦争",
   "severity": "high",
   "epicenter": "US",
   "affected": [
    { "country": "US", "impact": "high", "note": "10月に対中の先端半導体・製造装置の輸出規制を発動" },
    { "country": "CN", "impact": "critical", "note": "先端GPU・EUVを締め出され自給化を加速、希土類で対抗" },
    { "country": "TW", "impact": "high", "note": "最大市場と最大同盟の板挟み" },
    { "country": "JP", "impact": "medium", "note": "蘭とともに装置規制に同調" },
    { "country": "VN", "impact": "medium", "note": "米中対立でChina+1の生産移転が加速、FDI流入" }
   ],
   "flows": [
    { "from": "US", "to": "CN", "type": "sanction", "label": "輸出規制" },
    { "from": "CN", "to": "US", "type": "trade", "label": "希土類カード" },
    { "from": "CN", "to": "VN", "type": "trade", "label": "生産移転" }
   ],
   "narrative": "2022年10月、米国が対中の先端半導体・製造装置の包括的輸出規制を発動。中国は自給化と希土類・ガリウム規制で対抗し、生産はベトナム等へ移転、技術デカップリングが本格化した。",
   "related": [
    "../china/21_geopolitical_risk.html",
    "../china/19_trade.html"
   ]
  },
  {
   "id": "nk_nuclear_test_2006",
   "year": 2006,
   "month": 10,
   "title": "北朝鮮 初の核実験",
   "category": "地政学",
   "severity": "high",
   "epicenter": "KP",
   "affected": [
    { "country": "KP", "impact": "critical", "note": "初の核実験、国連決議1718で制裁レジーム開始" },
    { "country": "JP", "impact": "high", "note": "有事の質への逃避で円買い・株安" },
    { "country": "US", "impact": "medium", "note": "対北制裁と6者協議を主導" },
    { "country": "CN", "impact": "medium", "note": "後ろ盾だが安保理制裁に同調" }
   ],
   "flows": [
    { "from": "US", "to": "KP", "type": "sanction", "label": "国連制裁" },
    { "from": "KP", "to": "JP", "type": "contagion", "label": "有事リスク" }
   ],
   "narrative": "2006年10月、北朝鮮が初の核実験を実施。国連安保理決議1718で制裁レジームが始まり、以後の実験ごとに制裁が積み上がった。",
   "related": [
    "../northkorea/21_geopolitical_risk.html",
    "../northkorea/15_crises.html"
   ]
  },
  {
   "id": "nk_nuclear_icbm_2017",
   "year": 2017,
   "month": 9,
   "title": "北朝鮮 水爆実験・ICBM",
   "category": "地政学",
   "severity": "high",
   "epicenter": "KP",
   "affected": [
    { "country": "KP", "impact": "critical", "note": "第6回核実験(水爆)とICBM試射、最大限の圧力" },
    { "country": "JP", "impact": "high", "note": "ミサイルが日本上空を通過、J-ALERT発令" },
    { "country": "US", "impact": "high", "note": "本土到達能力に警戒、制裁2371/2375/2397" },
    { "country": "CN", "impact": "medium", "note": "石炭・繊維・石油の禁輸に同調" }
   ],
   "flows": [
    { "from": "KP", "to": "JP", "type": "contagion", "label": "上空通過" },
    { "from": "US", "to": "KP", "type": "sanction", "label": "最大限の圧力" }
   ],
   "narrative": "2017年、北朝鮮が水爆実験とICBM試射を強行。ミサイルは日本上空を通過し、国連は石炭・石油・繊維を網羅する『最大限の圧力』制裁を科した。",
   "related": [
    "../northkorea/21_geopolitical_risk.html",
    "../northkorea/15_crises.html"
   ]
  },
  {
   "id": "nk_missile_barrage_2022",
   "year": 2022,
   "month": 11,
   "title": "北朝鮮 過去最多のミサイル乱射",
   "category": "地政学",
   "severity": "medium",
   "epicenter": "KP",
   "affected": [
    { "country": "KP", "impact": "high", "note": "年間で過去最多の弾道ミサイルを発射" },
    { "country": "JP", "impact": "high", "note": "IRBMが上空通過、J-ALERT・避難呼びかけ" },
    { "country": "US", "impact": "medium", "note": "米韓合同演習への対抗" }
   ],
   "flows": [
    { "from": "KP", "to": "JP", "type": "contagion", "label": "ミサイル発射" }
   ],
   "narrative": "2022年、北朝鮮は年間で過去最多の弾道ミサイルを発射。IRBMが日本列島上空を通過しJ-ALERTが発令されるなど、地域の緊張が高まった。",
   "related": [
    "../northkorea/21_geopolitical_risk.html",
    "../japan/15_crises.html"
   ]
  },
  {
   "id": "nk_russia_arms_2024",
   "year": 2024,
   "month": 6,
   "title": "北朝鮮の対露軍事協力",
   "category": "地政学",
   "severity": "medium",
   "epicenter": "KP",
   "affected": [
    { "country": "KP", "impact": "high", "note": "砲弾・兵士をロシアへ供与、見返りに食料・技術・外貨" },
    { "country": "RU", "impact": "high", "note": "ウクライナ戦争で北朝鮮の弾薬・兵力に依存" },
    { "country": "EU", "impact": "medium", "note": "戦況長期化への懸念" },
    { "country": "US", "impact": "medium", "note": "制裁監視パネルの露拒否権廃止に反発" }
   ],
   "flows": [
    { "from": "KP", "to": "RU", "type": "trade", "label": "砲弾・兵士" },
    { "from": "RU", "to": "KP", "type": "capital", "label": "食料・技術・外貨" }
   ],
   "narrative": "2024年、北朝鮮とロシアが包括的戦略パートナー条約を締結。北朝鮮は砲弾・兵士をウクライナ戦線へ供与し、見返りに食料・技術・外貨を得て対中依存の分散を図った。",
   "related": [
    "../northkorea/21_geopolitical_risk.html",
    "../northkorea/19_trade.html"
   ]
  },
  {
   "id": "iran_jcpoa_2015",
   "year": 2015,
   "month": 7,
   "title": "イラン核合意（JCPOA）締結",
   "category": "地政学",
   "severity": "medium",
   "epicenter": "IR",
   "affected": [
    { "country": "IR", "impact": "high", "note": "制裁の段階解除でリアル安定・インフレ一桁化" },
    { "country": "US", "impact": "medium", "note": "オバマ政権が主導、中東緊張が一時緩和" },
    { "country": "EU", "impact": "medium", "note": "E3が交渉、イラン市場再開に期待" },
    { "country": "SA", "impact": "low", "note": "イラン原油復帰で供給増・油価圧力" }
   ],
   "flows": [
    { "from": "US", "to": "IR", "type": "policy", "label": "制裁解除" },
    { "from": "EU", "to": "IR", "type": "trade", "label": "市場再開" }
   ],
   "narrative": "2015年7月、イランと米欧(P5+1)が核合意(JCPOA)を締結。制裁の段階解除でリアルが安定しインフレは一桁に低下、原油輸出が回復した。",
   "related": [
    "../iran/21_geopolitical_risk.html",
    "../iran/15_crises.html"
   ]
  },
  {
   "id": "iran_jcpoa_exit_2018",
   "year": 2018,
   "month": 5,
   "title": "米のJCPOA離脱・制裁再発動",
   "category": "地政学",
   "severity": "high",
   "epicenter": "IR",
   "affected": [
    { "country": "IR", "impact": "critical", "note": "リアル崩壊・インフレ再加速、石油輸出が激減" },
    { "country": "US", "impact": "medium", "note": "トランプ政権が離脱、最大限の圧力へ" },
    { "country": "EU", "impact": "medium", "note": "合意維持を模索もINSTEXは不発" },
    { "country": "CN", "impact": "low", "note": "イラン原油の最大の買い手として迂回輸入" }
   ],
   "flows": [
    { "from": "US", "to": "IR", "type": "sanction", "label": "制裁再発動" },
    { "from": "IR", "to": "CN", "type": "trade", "label": "影の船団" }
   ],
   "narrative": "2018年5月、トランプ政権がJCPOAを離脱し制裁を再発動。リアルは崩壊しインフレが再加速、イランは中国向け『影の船団』で輸出を延命した。",
   "related": [
    "../iran/21_geopolitical_risk.html",
    "../iran/14_currency.html"
   ]
  },
  {
   "id": "hormuz_tanker_2019",
   "year": 2019,
   "month": 6,
   "title": "ホルムズ海峡 タンカー攻撃",
   "category": "エネルギー",
   "severity": "medium",
   "epicenter": "IR",
   "affected": [
    { "country": "IR", "impact": "high", "note": "制裁下で緊張、米無人機撃墜・タンカー攻撃の応酬" },
    { "country": "SA", "impact": "high", "note": "アブカイク石油施設攻撃で一時生産が半減" },
    { "country": "JP", "impact": "medium", "note": "原油輸入の大半が通過、海上安全に懸念" },
    { "country": "CN", "impact": "medium", "note": "最大の原油輸入国としてシーレーンに依存" },
    { "country": "US", "impact": "medium", "note": "海上有志連合で航行を護衛" }
   ],
   "flows": [
    { "from": "IR", "to": "SA", "type": "contagion", "label": "施設攻撃" },
    { "from": "IR", "to": "JP", "type": "contagion", "label": "原油高リスク" }
   ],
   "narrative": "2019年、ホルムズ海峡周辺でタンカー攻撃や米無人機撃墜が相次ぎ、サウジのアブカイク施設攻撃で生産が一時半減。世界の海上原油の約2割が通る要衝のリスクが意識された。",
   "related": [
    "../iran/21_geopolitical_risk.html",
    "../china/21_geopolitical_risk.html"
   ]
  },
  {
   "id": "red_sea_houthi_2023",
   "year": 2023,
   "month": 11,
   "title": "紅海・フーシ派 商船攻撃",
   "category": "エネルギー",
   "severity": "high",
   "epicenter": "IR",
   "affected": [
    { "country": "IR", "impact": "high", "note": "支援するフーシ派が紅海の商船を攻撃" },
    { "country": "IL", "impact": "high", "note": "エイラート港の機能低下、ガザ戦争に連動" },
    { "country": "EU", "impact": "high", "note": "スエズ迂回(喜望峰)で海運コスト・納期が増大" },
    { "country": "US", "impact": "medium", "note": "有志連合『繁栄の守護者』で護衛・報復" },
    { "country": "SG", "impact": "medium", "note": "アジア-欧州航路の迂回でハブ物流に影響" }
   ],
   "flows": [
    { "from": "IR", "to": "IL", "type": "contagion", "label": "商船攻撃" },
    { "from": "IR", "to": "EU", "type": "trade", "label": "スエズ迂回" }
   ],
   "narrative": "2023年11月以降、イランが支援するフーシ派が紅海で商船を攻撃。スエズ運河を避けた喜望峰迂回で海運コストと納期が膨らみ、世界の物流網が混乱した。",
   "related": [
    "../iran/21_geopolitical_risk.html",
    "../israel/21_geopolitical_risk.html"
   ]
  },
  {
   "id": "gaza_war_2023",
   "year": 2023,
   "month": 10,
   "title": "ガザ戦争（10/7ハマス奇襲）",
   "category": "地政学",
   "severity": "high",
   "epicenter": "IL",
   "affected": [
    { "country": "IL", "impact": "critical", "note": "10/7奇襲後の長期戦時経済、予備役動員・防衛費増" },
    { "country": "US", "impact": "high", "note": "軍事支援と国連での外交的擁護" },
    { "country": "IR", "impact": "medium", "note": "『抵抗の枢軸』(ハマス・ヒズボラ・フーシ)の背後" },
    { "country": "EU", "impact": "low", "note": "エネルギー・人道・難民で影響" }
   ],
   "flows": [
    { "from": "IR", "to": "IL", "type": "contagion", "label": "代理勢力" },
    { "from": "US", "to": "IL", "type": "policy", "label": "軍事支援" }
   ],
   "narrative": "2023年10月7日のハマス奇襲を機にガザ戦争が勃発。予備役動員による労働供給ショックと防衛費増で戦時経済入りしたが、ハイテク輸出が下支えした。",
   "related": [
    "../israel/21_geopolitical_risk.html",
    "../israel/15_crises.html"
   ]
  },
  {
   "id": "iran_israel_war_2025",
   "year": 2025,
   "month": 6,
   "title": "イラン・イスラエル『12日間戦争』",
   "category": "地政学",
   "severity": "critical",
   "epicenter": "IR",
   "affected": [
    { "country": "IR", "impact": "critical", "note": "核・軍施設を奇襲され、米がフォルドゥを爆撃" },
    { "country": "IL", "impact": "critical", "note": "先制攻撃後にイランの弾道ミサイル550発超で報復" },
    { "country": "US", "impact": "high", "note": "6/22に核施設をGBU-57で爆撃、6/24停戦を仲介" },
    { "country": "SA", "impact": "medium", "note": "原油・地政学プレミアム急騰の波及" },
    { "country": "EU", "impact": "medium", "note": "エネルギー・安全保障リスク" }
   ],
   "flows": [
    { "from": "IL", "to": "IR", "type": "contagion", "label": "核施設攻撃" },
    { "from": "IR", "to": "IL", "type": "contagion", "label": "弾道ミサイル" },
    { "from": "US", "to": "IR", "type": "contagion", "label": "核施設爆撃" }
   ],
   "narrative": "2025年6月13〜24日、イスラエルがイランの核・軍施設を奇襲し、イランは弾道ミサイル550発超で報復。米国が6/22にフォルドゥ核施設を爆撃し、6/24に停戦に至った。",
   "related": [
    "../iran/21_geopolitical_risk.html",
    "../israel/21_geopolitical_risk.html"
   ]
  },
  {
   "id": "singapore_malacca_2023",
   "year": 2023,
   "month": 1,
   "title": "シンガポール・マラッカ海峡シーレーン",
   "category": "地政学",
   "severity": "medium",
   "epicenter": "SG",
   "affected": [
    { "country": "SG", "impact": "critical", "note": "マラッカ海峡の戦略的要衝・アジア金融ハブ" },
    { "country": "CN", "impact": "high", "note": "原油輸入の大半がマラッカ経由(マラッカのジレンマ)" },
    { "country": "JP", "impact": "high", "note": "中東原油のシーレーンが集約する要衝" },
    { "country": "HK", "impact": "medium", "note": "金融ハブを巡る競合・資金移動" }
   ],
   "flows": [
    { "from": "SG", "to": "CN", "type": "trade", "label": "マラッカ海峡" },
    { "from": "HK", "to": "SG", "type": "capital", "label": "資金移動" }
   ],
   "narrative": "シンガポールはマラッカ海峡という世界有数のチョークポイントを扼するアジア金融ハブ。中国は原油輸入の大半がここを通る『マラッカのジレンマ』を抱え、シーレーン安全保障が要となる。",
   "related": [
    "../singapore/21_geopolitical_risk.html",
    "../singapore/19_trade.html"
   ]
  }
 ]
};
