/* ============================================================
 * G10 Timeline Events Dataset
 * Source: summary/g10_timeline.html (#mega-timeline table)
 * Machine-readable extraction. file://-safe (no fetch).
 *
 * Structure:
 *   window.G10_TIMELINE_EVENTS = { eras: [...], events: [...] }
 *   era:   {from, to, label, color}
 *   event: {year, month?, country, cat, label, detail, link}
 *     country: 'us'|'eurozone'|'japan'|'uk'|'switzerland'|'australia'
 *              |'newzealand'|'canada'|'sweden'|'norway'|'global'
 *     cat: 'crisis'|'hike'|'cut'|'reform'|'milestone'|'war'
 *     link: relative path FROM summary/
 *
 * Data fixes applied during extraction (vs. source table rows):
 *   - 2022 Japan "円安162（2024）" -> year 2024 (month 7)
 *   - 1993 Sweden "インフレターゲット導入 1995年" -> modeled as the
 *     historically correct Jan 1993 announcement (effective 1995)
 *   - 1989 Australia "RBA 18%（1990）" -> year 1990
 *   - 1913 Australia "Commonwealth Bank (1911)" -> year 1911
 *   - 1969 UK "ポンド切下げ(1967)" -> year 1967
 *   - 1969 NZ "NZD十進法化(1967)" -> year 1967
 *   - 1973 Norway "Statoil 1972設立" -> split, Statoil -> 1972
 *   - 1985 Australia "AUD変動相場制(1983)" -> year 1983
 *   - 1985 Canada "CAD変動相場制" -> year 1970 (float was Jun 1970;
 *     matches this page's own currency-system table)
 *   - 1995 Norway "EU否決(1994)" -> year 1994
 *   - 1948 Japan "1ドル=360円固定" -> year 1949 (rate set Apr 1949)
 *   - 1993 UK "インフレターゲット導入" -> year 1992 (Oct 1992;
 *     matches this page's own central-bank table)
 *   - 1989 Norway "銀行危機開始(1988)" -> year 1988
 *   - 1999 Australia "GST導入" -> year 2000 (effective 1 Jul 2000)
 *   - 1999 Norway "GPFG運用開始" -> year 1996 (first transfer 1996;
 *     matches norway/ textbook chapters)
 * Repeated same-year contagion cells (世界恐慌波及, 石油危機,
 * ブラックマンデー波及, 変動相場制移行, COVID-19 etc.) are
 * normalized to single country:'global' events.
 * ============================================================ */
window.G10_TIMELINE_EVENTS = {
  eras: [
    { from: 1900, to: 1914, label: '金本位制', color: '#c9a227' },
    { from: 1918, to: 1939, label: '戦間期・恐慌', color: '#8a8a9a' },
    { from: 1944, to: 1971, label: 'ブレトンウッズ', color: '#4f86f7' },
    { from: 1971, to: 1982, label: '大インフレ', color: '#ff6b6b' },
    { from: 1982, to: 1999, label: 'ディスインフレと自由化', color: '#ffa94d' },
    { from: 1999, to: 2007, label: '大平穏期', color: '#2ec4b6' },
    { from: 2008, to: 2021, label: '危機とゼロ金利', color: '#b07cff' },
    { from: 2022, to: 2026, label: 'インフレと正常化', color: '#ff5d6c' }
  ],
  events: [
    // ---- 1900s-1910s ----
    { year: 1907, month: 10, country: 'us', cat: 'crisis', label: '1907年恐慌', detail: 'ニッカーボッカー信託の破綻を機にNYで取付け騒ぎが連鎖。JPモルガンが私的に救済を主導し、後のFRB設立（1913年）の直接の契機となった。', link: '../us/15_crises.html' },
    { year: 1907, country: 'japan', cat: 'crisis', label: '日露戦後恐慌', detail: '日露戦争後の反動で株式暴落と景気後退が発生。戦時ブームの清算局面となった。', link: '../japan/15_crises.html' },
    { year: 1907, country: 'uk', cat: 'hike', label: 'BOE割引率引上げ', detail: '米国発の1907年恐慌に対しイングランド銀行は割引率を引き上げて金流出を防衛。国際的な最後の貸し手として機能した。', link: '../uk/02_policy_rate.html' },
    { year: 1907, country: 'switzerland', cat: 'milestone', label: 'SNB設立', detail: 'スイス国立銀行が業務開始。州立発券銀行が乱立していた体制を一元化した。', link: '../switzerland/01_central_bank.html' },
    { year: 1911, country: 'australia', cat: 'milestone', label: '連邦銀行設立', detail: 'Commonwealth Bank of Australiaが設立（原表は1913年行に記載）。1960年に中央銀行機能をRBAへ分離継承する。', link: '../australia/01_central_bank.html' },
    { year: 1913, month: 12, country: 'us', cat: 'milestone', label: 'FRB設立', detail: '12月23日に連邦準備法（Federal Reserve Act）が成立し、FRBが誕生。1907年恐慌の反省から「最後の貸し手」を制度化した。', link: '../us/01_central_bank.html' },
    { year: 1913, country: 'global', cat: 'milestone', label: '金本位制全盛', detail: '英ポンドを中心に主要国が金本位制を運営（独ライヒスバンク、日銀、リクスバンク、ノルゲスバンクなど）。第一次大戦まで続いた国際通貨秩序の最盛期。', link: '../uk/14_currency.html' },
    { year: 1914, month: 7, country: 'global', cat: 'war', label: '第一次世界大戦', detail: '第一次世界大戦の勃発で各国は金本位制を事実上停止し、戦時金融体制へ移行した。', link: '../summary/geopolitical_map.html' },
    { year: 1918, month: 11, country: 'global', cat: 'war', label: 'WWI終戦', detail: '大戦が終結し、戦後復興と金本位制復帰の模索が始まる。ドイツ帝国は崩壊し、巨額の賠償問題が残った。', link: '../summary/geopolitical_map.html' },
    // ---- 1920s ----
    { year: 1920, country: 'us', cat: 'crisis', label: '戦後デフレ不況', detail: '大戦後の反動で1920-21年に急激なデフレ不況。物価と株価が急落した。', link: '../us/15_crises.html' },
    { year: 1920, country: 'eurozone', cat: 'crisis', label: '独賠償金問題', detail: 'ヴェルサイユ条約の巨額賠償がドイツ財政を圧迫。通貨増発に追い込まれ、後のハイパーインフレの土壌となった。', link: '../eurozone/05_inflation.html' },
    { year: 1920, country: 'japan', cat: 'crisis', label: '戦後恐慌', detail: '大戦ブームの反動で株式・商品市場が暴落し、銀行取付けが頻発した。', link: '../japan/15_crises.html' },
    { year: 1920, country: 'uk', cat: 'reform', label: '金本位復帰模索', detail: '大戦で停止した金本位制への旧平価復帰を模索。デフレ的な引き締めが続いた。', link: '../uk/14_currency.html' },
    { year: 1920, country: 'norway', cat: 'crisis', label: '銀行恐慌140行破綻', detail: '戦後バブルの崩壊で1920年代に約140行の銀行が破綻。旧平価復帰（パリテ）政策のデフレが追い打ちをかけた。', link: '../norway/15_crises.html' },
    { year: 1923, month: 11, country: 'eurozone', cat: 'crisis', label: '独ハイパーインフレ', detail: '物価が1兆倍に達する史上最悪級のハイパーインフレ。11月のレンテンマルク導入で収束し、1925年までにライヒスマルクが安定した。', link: '../eurozone/05_inflation.html' },
    { year: 1923, month: 9, country: 'japan', cat: 'crisis', label: '関東大震災', detail: '9月1日の大地震で京浜地区が壊滅。震災手形の処理が長引き、1927年の昭和金融恐慌の遠因となった。', link: '../japan/15_crises.html' },
    { year: 1923, country: 'norway', cat: 'reform', label: 'パリテ政策デフレ', detail: 'クローネを旧平価で金に復帰させるパリテ政策を採用。深刻なデフレを招き、銀行危機を悪化させた。', link: '../norway/14_currency.html' },
    { year: 1925, country: 'us', cat: 'milestone', label: '狂騒の20年代', detail: 'Roaring Twentiesの株式ブームが本格化（1923年から景気拡大）。1929年の大暴落へ向かう信用膨張が進んだ。', link: '../us/07_equity_early.html' },
    { year: 1925, country: 'japan', cat: 'reform', label: '金解禁論争', detail: '金輸出解禁（金本位制復帰）の是非をめぐる論争が激化。1930年の旧平価解禁は昭和恐慌を招くことになる。', link: '../japan/14_currency.html' },
    { year: 1925, month: 4, country: 'uk', cat: 'reform', label: '金本位制復帰', detail: 'チャーチル蔵相が旧平価での金本位制復帰を決定。ポンド過大評価で輸出不振とデフレを招き、ケインズが痛烈に批判した。', link: '../uk/14_currency.html' },
    { year: 1925, country: 'norway', cat: 'reform', label: '金本位制復帰', detail: 'パリテ政策の総仕上げとして旧平価での金本位制復帰を推進（完全復帰は1928年）。', link: '../norway/14_currency.html' },
    { year: 1929, month: 10, country: 'us', cat: 'crisis', label: 'ウォール街大暴落', detail: '10月24日（暗黒の木曜日）から株価が崩落。DJIAは381から1932年の41へ最大-89%。大恐慌の引き金となった。', link: '../us/15_crises.html' },
    { year: 1929, country: 'japan', cat: 'crisis', label: '昭和恐慌へ', detail: '世界恐慌と1930年の旧平価金解禁が重なり昭和恐慌に突入。物価と輸出が急落し、農村が困窮した。', link: '../japan/15_crises.html' },
    { year: 1929, month: 10, country: 'global', cat: 'crisis', label: '世界恐慌波及', detail: 'ウォール街大暴落を起点に恐慌が全世界へ波及。各国で銀行破綻・デフレ・失業が連鎖し、ブロック経済化が進んだ。', link: '../us/15_crises.html' },
    // ---- 1930s ----
    { year: 1931, country: 'us', cat: 'crisis', label: '銀行破綻の連鎖', detail: '大恐慌下で銀行破綻が連鎖し、1933年までに約9,000行が消滅。FRBの不作為が後世まで批判された。', link: '../us/16_banking.html' },
    { year: 1931, month: 5, country: 'eurozone', cat: 'crisis', label: 'Creditanstalt破綻', detail: '5月にオーストリア最大手銀行クレディトアンシュタルトが破綻し、独墺銀行危機へ波及。欧州金融システムが麻痺した。', link: '../eurozone/15_crises.html' },
    { year: 1931, month: 12, country: 'japan', cat: 'reform', label: '金輸出再禁止', detail: '犬養内閣の高橋是清蔵相が12月に金輸出を再禁止し金本位制を離脱。円安と財政出動で世界に先駆けて恐慌から脱出した。', link: '../japan/14_currency.html' },
    { year: 1931, month: 9, country: 'uk', cat: 'reform', label: '金本位制離脱', detail: '9月21日にポンドの金兌換を停止。基軸通貨国の離脱は国際金本位制の終わりの始まりとなった。', link: '../uk/14_currency.html' },
    { year: 1931, month: 9, country: 'global', cat: 'reform', label: '金本位離脱ドミノ', detail: '英国に続きスウェーデン、ノルウェー、カナダなどが相次いで金本位制を離脱。離脱の早かった国ほど恐慌からの回復も早かった。', link: '../uk/14_currency.html' },
    { year: 1933, month: 6, country: 'us', cat: 'reform', label: 'Glass-Steagall法', detail: '銀行・証券の分離とFDIC（連邦預金保険公社）創設を定めた銀行法が成立。1999年の廃止まで米金融規制の柱となった。', link: '../us/18_regulation.html' },
    { year: 1933, month: 4, country: 'us', cat: 'reform', label: '米金本位制離脱', detail: 'ルーズベルト大統領が金兌換停止と金保有禁止令を発動。ドル切下げへの布石となった。', link: '../us/14_currency.html' },
    { year: 1933, month: 1, country: 'eurozone', cat: 'war', label: 'ナチス政権掌握', detail: '1月にヒトラーが首相に就任。シャハト総裁の下で軍備拡張の戦時金融が進み、欧州は戦争へ向かった。', link: '../summary/geopolitical_map.html' },
    { year: 1933, country: 'japan', cat: 'reform', label: '高橋財政', detail: '高橋是清蔵相による日銀引受国債での積極財政。世界最速級の恐慌脱出を実現したが、後の軍事費膨張の口実ともなった。', link: '../japan/03_fiscal_policy.html' },
    { year: 1934, month: 1, country: 'us', cat: 'reform', label: '金準備法', detail: 'Gold Reserve Actで金価格を$20.67から$35/ozへ切上げ（ドル切下げ）。金はFRBから財務省へ移管された。', link: '../us/14_currency.html' },
    { year: 1934, month: 6, country: 'us', cat: 'reform', label: 'SEC設立', detail: '1929年大暴落の反省から証券取引委員会（SEC）を設立。情報開示と相場操縦規制で証券市場の信頼回復を図った。', link: '../us/18_regulation.html' },
    { year: 1934, month: 8, country: 'newzealand', cat: 'milestone', label: 'RBNZ設立', detail: 'ニュージーランド準備銀行が8月に業務開始。それまで民間銀行が担っていた発券を一元化した。', link: '../newzealand/01_central_bank.html' },
    { year: 1934, country: 'canada', cat: 'milestone', label: 'BOC設立', detail: '1934年のカナダ銀行法により設立（業務開始は1935年3月）。大恐慌下で中央銀行不在への批判に応えた。', link: '../canada/01_central_bank.html' },
    { year: 1939, month: 9, country: 'global', cat: 'war', label: '第二次世界大戦', detail: '9月1日の独ポーランド侵攻で第二次世界大戦が勃発。各国は為替管理・資本規制を強化し戦時経済体制へ移行した。', link: '../summary/geopolitical_map.html' },
    // ---- 1940s-1960s ----
    { year: 1944, month: 7, country: 'global', cat: 'milestone', label: 'ブレトンウッズ協定', detail: '7月の連合国通貨金融会議でIMF・世界銀行の設立と金ドル本位の固定相場制（金1オンス=35ドル）に合意。戦後国際通貨秩序の礎となった。', link: '../us/14_currency.html' },
    { year: 1945, month: 8, country: 'global', cat: 'war', label: 'WWII終戦', detail: '第二次世界大戦が終結。欧州は壊滅状態から、豪・NZ・カナダ・スウェーデンなど各国で戦後復興が始まった。', link: '../summary/geopolitical_map.html' },
    { year: 1945, country: 'us', cat: 'milestone', label: '米経済覇権確立', detail: '戦禍を免れた米国が世界のGDPと金準備の過半を握り、ドル基軸の経済覇権を確立した。', link: '../us/14_currency.html' },
    { year: 1945, country: 'japan', cat: 'reform', label: '敗戦・財閥解体', detail: '敗戦によりGHQ主導で財閥解体・農地改革などの経済民主化が進行。ハイパーインフレと新円切替も経験した。', link: '../japan/18_regulation.html' },
    { year: 1945, country: 'switzerland', cat: 'milestone', label: '金融センター発展', detail: '大戦中の中立維持により金融インフラが無傷で残り、戦後スイスは国際金融センターとして急成長した。', link: '../switzerland/16_banking.html' },
    { year: 1945, country: 'norway', cat: 'milestone', label: 'ノルトラシップ', detail: '戦時中、世界最大級の商船隊を運営した国営組織ノルトラシップが外貨を稼ぎ、戦後復興の原資となった。', link: '../norway/19_trade.html' },
    { year: 1948, month: 4, country: 'us', cat: 'milestone', label: 'マーシャルプラン', detail: '欧州復興援助計画（総額約130億ドル）が4月に始動。西欧経済の再建と冷戦下の西側結束を支えた。', link: '../us/03_fiscal_policy.html' },
    { year: 1948, month: 6, country: 'eurozone', cat: 'reform', label: '西独通貨改革', detail: '6月にライヒスマルクをドイツマルク（DM）へ切替え。中央銀行の前身BdL（レンダー銀行）が発足し、西独の奇跡的復興が始まった。', link: '../eurozone/14_currency.html' },
    { year: 1948, month: 7, country: 'uk', cat: 'reform', label: 'NHS設立', detail: '国民保健サービス（NHS）が7月に発足し福祉国家路線が確立。高負担構造は後の英国病の一因とも論じられる。', link: '../uk/03_fiscal_policy.html' },
    { year: 1949, month: 4, country: 'japan', cat: 'reform', label: '1ドル360円設定', detail: 'ドッジ・ライン下で1ドル=360円の単一固定相場を設定（原表は1948年行に記載）。1971年のニクソン・ショックまで22年間維持された。', link: '../japan/14_currency.html' },
    { year: 1951, month: 3, country: 'us', cat: 'reform', label: 'FRB独立性確立', detail: 'Treasury-Fed Accordにより戦時の国債金利釘付け義務から解放され、FRBの金融政策の独立性が確立した。', link: '../us/01_central_bank.html' },
    { year: 1951, month: 4, country: 'eurozone', cat: 'milestone', label: 'ECSC設立', detail: 'パリ条約で欧州石炭鉄鋼共同体（ECSC）を設立。独仏和解と欧州統合の出発点となり、EECそしてEUへ発展する。', link: '../eurozone/19_trade.html' },
    { year: 1951, month: 9, country: 'japan', cat: 'milestone', label: '講和条約調印', detail: 'サンフランシスコ講和条約に調印し独立を回復。朝鮮特需を追い風に高度成長への助走が始まった。', link: '../summary/geopolitical_map.html' },
    { year: 1957, month: 3, country: 'eurozone', cat: 'milestone', label: 'ローマ条約EEC', detail: '3月調印のローマ条約でEEC（欧州経済共同体）が設立。関税同盟と共同市場が欧州統合を加速した。', link: '../eurozone/19_trade.html' },
    { year: 1957, country: 'eurozone', cat: 'milestone', label: 'Bundesbank設立', detail: '西独連邦銀行（ブンデスバンク）が発足。物価安定を最優先する独立中銀のモデルとなり、後のECB設計の原型となった。', link: '../eurozone/01_central_bank.html' },
    { year: 1957, country: 'japan', cat: 'milestone', label: '神武景気', detail: '1955-57年の大型景気「神武景気」がピークに。投資が投資を呼ぶ高度成長時代の幕開けとなった。', link: '../japan/20_lessons.html' },
    { year: 1960, country: 'eurozone', cat: 'milestone', label: '経済の奇跡', detail: '西独のWirtschaftswunder（経済の奇跡）が続き、完全雇用とDM切上げ圧力が定着した。', link: '../eurozone/20_lessons.html' },
    { year: 1960, month: 12, country: 'japan', cat: 'reform', label: '所得倍増計画', detail: '池田内閣が12月に国民所得倍増計画を閣議決定。実質10%成長が続き、計画は7年で達成された。', link: '../japan/03_fiscal_policy.html' },
    { year: 1960, month: 1, country: 'australia', cat: 'milestone', label: 'RBA設立', detail: '連邦銀行から中央銀行機能を分離し、オーストラリア準備銀行（RBA）が1月に業務開始。', link: '../australia/01_central_bank.html' },
    { year: 1967, month: 11, country: 'uk', cat: 'reform', label: 'ポンド切下げ', detail: '11月にポンドを$2.80から$2.40へ14.3%切下げ（原表は1969年行に記載）。ウィルソン首相の「ポケットの中のポンド」演説で知られる。', link: '../uk/14_currency.html' },
    { year: 1967, month: 7, country: 'newzealand', cat: 'reform', label: 'NZD十進法化', detail: '7月にNZポンドから十進法のNZドルへ移行（原表は1969年行に記載）。同年11月には英ポンドに追随して切下げも実施した。', link: '../newzealand/14_currency.html' },
    { year: 1969, month: 10, country: 'eurozone', cat: 'reform', label: 'DM切上げ', detail: '10月にドイツマルクを9.3%切上げ。西独の経常黒字を背景に、固定相場制の歪みが表面化し始めた。', link: '../eurozone/14_currency.html' },
    { year: 1969, country: 'japan', cat: 'milestone', label: '高度成長ピーク', detail: 'いざなぎ景気で実質成長率が10%を超え高度経済成長が頂点に。1968年にはGNP世界2位となっていた。', link: '../japan/20_lessons.html' },
    { year: 1969, month: 12, country: 'norway', cat: 'milestone', label: 'エコフィスク発見', detail: '12月に北海エコフィスク油田を発見。ノルウェーを産油国へ変貌させ、石油経済とNOKの運命を決定づけた。', link: '../norway/19_trade.html' },
    // ---- 1970s ----
    { year: 1970, month: 6, country: 'canada', cat: 'reform', label: 'CAD変動相場制', detail: '6月にカナダドルを変動相場制へ移行（原表は1985年行に記載）。主要国の中でいち早くブレトンウッズの固定相場を離れた。', link: '../canada/14_currency.html' },
    { year: 1971, month: 8, country: 'us', cat: 'crisis', label: 'ニクソン・ショック', detail: '8月15日、ニクソン大統領が金ドル兌換停止を電撃発表。ブレトンウッズ体制が崩壊し、ドルは切下げへ向かった。', link: '../us/14_currency.html' },
    { year: 1971, country: 'eurozone', cat: 'reform', label: '通貨スネーク構想', detail: '固定相場崩壊を受け、欧州通貨を相互に狭い変動幅で結ぶ「スネーク」構想が浮上（1972年発足）。EMS・ユーロへ続く欧州通貨統合の原点。', link: '../eurozone/14_currency.html' },
    { year: 1971, country: 'global', cat: 'reform', label: '変動相場制移行', detail: 'ニクソン・ショック後、スミソニアン合意（円は1ドル308円）を経て1973年までに主要通貨は変動相場制へ移行した。', link: '../us/14_currency.html' }
    ,{ year: 1972, country: 'norway', cat: 'milestone', label: 'Statoil設立', detail: '国営石油会社Statoil（現Equinor）を設立（原表は1973年行に記載）。石油収入を国家管理する体制を整えた。', link: '../norway/17_corporate.html' }
    ,{ year: 1973, month: 10, country: 'global', cat: 'crisis', label: '第一次石油危機', detail: '第四次中東戦争を機にOPECが原油価格を4倍に引上げ。世界はスタグフレーションに陥り、英国はインフレ25%、後のIMF融資（1976年）へ追い込まれた。', link: '../summary/geopolitical_map.html' }
    ,{ year: 1973, country: 'japan', cat: 'crisis', label: '狂乱物価', detail: '石油危機と過剰流動性でCPI上昇率が23%まで急騰し「狂乱物価」と呼ばれた。高度成長は終焉し安定成長へ移行した。', link: '../japan/05_inflation.html' }
    ,{ year: 1973, country: 'norway', cat: 'milestone', label: '石油ブーム開始', detail: '油価高騰が産油国ノルウェーには追い風となり、北海油田開発と石油ブームが本格化した。', link: '../norway/19_trade.html' }
    ,{ year: 1979, month: 10, country: 'us', cat: 'hike', label: 'ボルカー・ショック', detail: '10月にボルカーFRB議長がマネーサプライ重視へ転換。FF金利は最大20%に達し、強烈な引き締めでインフレを退治した。', link: '../us/02_policy_rate.html' }
    ,{ year: 1979, month: 3, country: 'eurozone', cat: 'milestone', label: 'EMS/ERM発足', detail: '3月に欧州通貨制度（EMS）と為替相場メカニズム（ERM)が発足。ユーロへ至る固定的為替協調の枠組みとなった。', link: '../eurozone/14_currency.html' }
    ,{ year: 1979, month: 5, country: 'uk', cat: 'hike', label: 'サッチャー政権', detail: '5月にサッチャー政権が発足し、マネタリズムに基づく引き締めで金利は17%へ。インフレ退治と構造改革が始まった。', link: '../uk/02_policy_rate.html' }
    ,{ year: 1979, country: 'global', cat: 'crisis', label: '第二次石油危機', detail: 'イラン革命で原油供給が混乱し油価が再び急騰。各国は再度のインフレと金融引き締めを強いられた。', link: '../summary/geopolitical_map.html' }
    ,{ year: 1979, country: 'norway', cat: 'milestone', label: '石油セクター拡大', detail: '第二次石油危機の油価高はノルウェーに有利に働き、石油セクターが経済の中核へ拡大した。', link: '../norway/19_trade.html' }
    ,{ year: 1983, month: 12, country: 'australia', cat: 'reform', label: 'AUD変動相場制', detail: '12月にホーク労働党政権が豪ドルを変動相場制へ移行（原表は1985年行に記載）。豪金融自由化の起点となった。', link: '../australia/14_currency.html' }
    ,{ year: 1985, month: 9, country: 'global', cat: 'milestone', label: 'プラザ合意', detail: '9月22日、G5がドル高是正の協調介入で合意。USD/JPYは240円から2年で120円台へ急落し、DM・CHFも急騰、GBPは下落基調を脱した。', link: '../us/14_currency.html' }
    ,{ year: 1985, country: 'japan', cat: 'milestone', label: '円高不況→バブル', detail: 'プラザ合意後の急激な円高で輸出不況に。日銀の低金利長期化が地価・株価バブルを生む土壌となった。', link: '../japan/14_currency.html' }
    ,{ year: 1985, month: 3, country: 'newzealand', cat: 'reform', label: 'NZD変動相場制', detail: '3月にNZドルを変動相場制へ移行。ロジャーノミクス改革の一環として資本規制も撤廃された。', link: '../newzealand/14_currency.html' }
    ,{ year: 1985, month: 11, country: 'sweden', cat: 'crisis', label: '11月革命', detail: '11月にRiksbankが銀行貸出規制を撤廃（「11月革命」）。信用が爆発的に膨張し、1990年代初頭の銀行危機の種を蒔いた。', link: '../sweden/15_crises.html' }
    ,{ year: 1985, country: 'norway', cat: 'reform', label: '金融自由化', detail: '1984-86年に貸出規制を段階的に撤廃。信用ブームが過熱し、石油価格暴落と重なって銀行危機へ向かった。', link: '../norway/18_regulation.html' }
    ,{ year: 1986, country: 'us', cat: 'crisis', label: 'S&L危機深刻化', detail: '貯蓄貸付組合（S&L）の経営悪化が深刻化。1990年代初頭まで続き1,000機関超が破綻、処理費用は約1,600億ドルに達した。', link: '../us/16_banking.html' }
    ,{ year: 1986, month: 2, country: 'eurozone', cat: 'reform', label: '単一欧州議定書', detail: '2月調印の単一欧州議定書で1992年末までの域内市場統合を規定。資本移動の自由化が進んだ。', link: '../eurozone/19_trade.html' }
    ,{ year: 1986, country: 'japan', cat: 'milestone', label: 'バブル経済開始', detail: '円高不況対策の金融緩和を背景に株価・地価が急騰開始。日経平均は1989年末の38,915円まで3倍超に上昇する。', link: '../japan/08_equity_modern.html' }
    ,{ year: 1986, month: 10, country: 'uk', cat: 'reform', label: 'ビッグバン', detail: '10月27日にロンドン証券取引所の手数料自由化・外資開放（ビッグバン）を実施。シティが国際金融センターとして復活した。', link: '../uk/18_regulation.html' }
    ,{ year: 1986, country: 'australia', cat: 'reform', label: '金融自由化', detail: '変動相場制移行に続き銀行参入・金利規制の自由化が進展。外銀ライセンスも開放された。', link: '../australia/18_regulation.html' }
    ,{ year: 1986, country: 'newzealand', cat: 'reform', label: 'Rogernomics', detail: 'ダグラス蔵相による急進的市場改革「ロジャーノミクス」が進行。補助金廃止・民営化・金融自由化を断行した。', link: '../newzealand/18_regulation.html' }
    ,{ year: 1986, month: 5, country: 'norway', cat: 'crisis', label: '石油暴落NOK切下げ', detail: '油価暴落で交易条件が悪化し、5月にクローネを約12%切下げ。過熱した信用ブームの逆回転が始まった。', link: '../norway/14_currency.html' }
    ,{ year: 1987, month: 10, country: 'us', cat: 'crisis', label: 'ブラックマンデー', detail: '10月19日にDJIAが1日で-22.6%と史上最大の下落。プログラム取引が暴落を増幅し、グリーンスパンFRBが流動性供給で応じた。', link: '../us/15_crises.html' }
    ,{ year: 1987, month: 10, country: 'global', cat: 'crisis', label: 'ブラックマンデー波及', detail: '暴落は全世界の株式市場へ波及（英-26%、豪-25%など）。ただし実体経済への影響は限定的で、日本はバブル相場を継続した。', link: '../us/15_crises.html' }
    ,{ year: 1988, country: 'norway', cat: 'crisis', label: '銀行危機開始', detail: '信用バブル崩壊で地方銀行から破綻が始まる（原表は1989年行に記載）。危機は1993年まで続き主要3行の国有化に至った。', link: '../norway/15_crises.html' }
    ,{ year: 1989, country: 'us', cat: 'reform', label: 'FIRREA法', detail: 'S&L危機処理のためFIRREA法を制定し、整理信託公社（RTC）が破綻S&Lの資産処理を担った。危機は1990年も継続した。', link: '../us/18_regulation.html' }
    ,{ year: 1989, month: 11, country: 'eurozone', cat: 'milestone', label: 'ベルリンの壁崩壊', detail: '11月9日にベルリンの壁が崩壊し冷戦終結へ。翌1990年のドイツ再統一と欧州通貨統合構想を一気に加速させた。', link: '../summary/geopolitical_map.html' }
    ,{ year: 1989, month: 5, country: 'japan', cat: 'hike', label: '日銀利上げ開始', detail: '5月から公定歩合を2.5%から引上げ開始し、1990年8月には6%へ。バブル退治の急ブレーキとなった。', link: '../japan/02_policy_rate.html' }
    ,{ year: 1989, month: 12, country: 'japan', cat: 'milestone', label: '日経38,915', detail: '12月29日に日経平均が終値38,915円（ザラ場38,957円）の史上最高値。この記録は2024年2月まで34年間破られなかった。', link: '../japan/08_equity_modern.html' }
    ,{ year: 1990, country: 'australia', cat: 'hike', label: 'RBA 18%', detail: '政策金利が約18%へ達した（原表は1989年行に記載）。過熱景気とインフレの抑制が狙いだったが、深刻な景気後退を招いた。', link: '../australia/02_policy_rate.html' }
    ,{ year: 1990, month: 10, country: 'eurozone', cat: 'milestone', label: 'ドイツ再統一', detail: '10月3日に東西ドイツが統一。東独への移転支出がインフレ圧力となり、ブンデスバンクの強烈な引き締めがERM危機の遠因となった。', link: '../summary/geopolitical_map.html' }
    ,{ year: 1990, country: 'eurozone', cat: 'hike', label: 'ブンデスバンク利上げ', detail: '再統一インフレに対しブンデスバンクが断続的に利上げ（1992年に公定歩合8.75%）。欧州他国に過剰な金利負担を強いた。', link: '../eurozone/02_policy_rate.html' }
    ,{ year: 1990, month: 1, country: 'japan', cat: 'crisis', label: 'バブル崩壊', detail: '年初から株価が暴落に転じ、日経平均は1990年中に38,915円から2万円割れへ（1992年には14,309円）。「失われた30年」が始まった。', link: '../japan/15_crises.html' }
    ,{ year: 1990, month: 10, country: 'uk', cat: 'reform', label: 'ERM加盟', detail: '10月にポンドがERMへ加盟（中心レート2.95DM）。過大評価レートでの加盟が2年後のブラック・ウェンズデーを招く。', link: '../uk/14_currency.html' }
    ,{ year: 1990, country: 'newzealand', cat: 'milestone', label: '世界初インフレ目標', detail: 'RBNZ法（1989年成立、1990年2月施行）に基づき世界初のインフレターゲティングを開始。物価目標はその後、金融政策の世界標準となった。', link: '../newzealand/02_policy_rate.html' }
    ,{ year: 1990, country: 'norway', cat: 'crisis', label: '北欧銀行危機', detail: '銀行危機が本格化し、1991年までにDnB・クリスチャニア・フォーカスの主要3行が実質国有化された。危機は1991年以降も継続した。', link: '../norway/15_crises.html' }
    ,{ year: 1991, country: 'us', cat: 'reform', label: 'FDICIA法', detail: '銀行監督を強化するFDICIA法を制定。早期是正措置を導入し、「大きすぎて潰せない」救済に制限をかけた。', link: '../us/18_regulation.html' }
    ,{ year: 1991, month: 12, country: 'eurozone', cat: 'reform', label: 'マーストリヒト合意', detail: '12月の欧州理事会で経済通貨同盟（EMU）創設に合意（条約署名は1992年2月）。ユーロ導入への工程表が確定した。', link: '../eurozone/14_currency.html' }
    ,{ year: 1991, country: 'australia', cat: 'crisis', label: '豪景気後退', detail: '「持つべくして持った景気後退」で失業率10.9%へ（1990年から後退開始）。以後2020年まで29年間、豪州は景気後退を経験しなかった。', link: '../australia/15_crises.html' }
    ,{ year: 1991, month: 2, country: 'canada', cat: 'milestone', label: 'インフレ目標導入', detail: '2月にカナダ銀行と政府がインフレターゲット（1-3%）に合意。G7では初の導入だった。', link: '../canada/02_policy_rate.html' }
    ,{ year: 1991, country: 'sweden', cat: 'crisis', label: 'Nordbanken国有化', detail: '信用バブル崩壊で銀行危機が表面化し、最大手ノルドバンケンを国有化。バッドバンク方式の処理が後の危機対応のモデルとなった。', link: '../sweden/15_crises.html' }
    ,{ year: 1992, month: 9, country: 'eurozone', cat: 'crisis', label: 'ERM危機', detail: '9月に投機筋の売り浴びせでERMが動揺。リラとポンドが離脱し、「ソロスがイングランド銀行を破った」と語り継がれる。', link: '../eurozone/15_crises.html' }
    ,{ year: 1992, month: 9, country: 'uk', cat: 'crisis', label: 'ブラック・ウェンズデー', detail: '9月16日、ポンド防衛失敗でERM離脱。GBPは約15%急落したが、以後のインフレターゲットと長期成長の出発点ともなった。', link: '../uk/15_crises.html' }
    ,{ year: 1992, month: 10, country: 'uk', cat: 'milestone', label: 'インフレ目標導入', detail: 'ERM離脱直後の10月、新たな名目アンカーとしてインフレターゲットを導入（原表は1993年行に記載）。', link: '../uk/02_policy_rate.html' }
    ,{ year: 1992, month: 11, country: 'sweden', cat: 'crisis', label: 'SEK変動相場制', detail: '翌日物金利を一時500%まで引上げてクローナのペッグを防衛したが失敗。11月19日に変動相場制へ移行した。', link: '../sweden/14_currency.html' }
    ,{ year: 1992, month: 12, country: 'norway', cat: 'crisis', label: 'ECUペッグ崩壊', detail: '欧州通貨危機の波及でECUペッグの防衛を断念し、12月10日にクローネを変動相場制へ移行した。', link: '../norway/14_currency.html' }
    ,{ year: 1993, country: 'us', cat: 'milestone', label: '90年代拡大開始', detail: '冷戦終結後のIT投資を追い風に、2001年まで続く当時戦後最長の景気拡大が始まった。', link: '../us/04_employment.html' }
    ,{ year: 1993, month: 11, country: 'eurozone', cat: 'milestone', label: 'EU発足', detail: '11月1日にマーストリヒト条約が発効しEUが発足。単一市場と通貨統合への法的基盤が整った。', link: '../eurozone/19_trade.html' }
    ,{ year: 1993, country: 'australia', cat: 'milestone', label: 'インフレ目標導入', detail: 'RBAが2-3%のバンド型インフレターゲットを導入。「景気循環を通じて平均2-3%」という柔軟な方式が特徴となった。', link: '../australia/02_policy_rate.html' }
    ,{ year: 1993, month: 1, country: 'sweden', cat: 'milestone', label: 'インフレ目標発表', detail: '1月15日にRiksbankがCPI2%目標を発表（適用は1995年から。原表の「1995年」は適用開始年）。変動相場制移行直後の新アンカーだった。', link: '../sweden/02_policy_rate.html' }
    ,{ year: 1993, country: 'norway', cat: 'milestone', label: '銀行危機収束', detail: '1988年から続いた銀行危機が収束。石油収入の拡大が回復を後押しした。', link: '../norway/15_crises.html' }
    ,{ year: 1994, month: 11, country: 'norway', cat: 'milestone', label: 'EU加盟否決', detail: '11月の国民投票でEU加盟を再び否決（原表は1995年行に記載）。EEA経由で単一市場に参加しつつ、石油収入の拡大が続いた。', link: '../norway/19_trade.html' }
    ,{ year: 1995, country: 'us', cat: 'crisis', label: 'メキシコ危機救済', detail: 'メキシコ通貨危機（テキーラ危機）に対し米財務省・IMFが約500億ドルの救済パッケージを主導した。', link: '../summary/geopolitical_map.html' }
    ,{ year: 1995, month: 9, country: 'japan', cat: 'cut', label: '超低金利0.5%', detail: '9月に公定歩合を0.5%へ引下げ、事実上の超低金利時代に突入（ゼロ金利政策の正式導入は1999年）。', link: '../japan/02_policy_rate.html' }
    ,{ year: 1995, month: 2, country: 'uk', cat: 'crisis', label: 'ベアリングス破綻', detail: 'トレーダーのニック・リーソンによる先物取引の損失隠しで、233年の歴史を持つ名門マーチャントバンクが2月に破綻した。', link: '../uk/15_crises.html' }
    ,{ year: 1995, country: 'eurozone', cat: 'reform', label: '収斂基準努力', detail: 'ユーロ参加に向け各国が財政赤字3%・債務60%などのマーストリヒト収斂基準の達成を急いだ。', link: '../eurozone/14_currency.html' }
    ,{ year: 1996, country: 'norway', cat: 'milestone', label: 'GPFG運用開始', detail: '1990年制定の石油基金法に基づき、1996年に政府石油基金（現GPFG）へ初の資金移転（原表は1999年行に記載）。後に世界最大のSWFとなる。', link: '../norway/03_fiscal_policy.html' }
    ,{ year: 1997, month: 7, country: 'global', cat: 'crisis', label: 'アジア通貨危機', detail: '7月のタイ・バーツ崩落からアジア各国へ通貨危機が連鎖。G10への直接の打撃は限定的だったが、新興国リスクが強く意識された。', link: '../summary/geopolitical_map.html' }
    ,{ year: 1997, month: 11, country: 'japan', cat: 'crisis', label: '山一・拓銀破綻', detail: '11月に北海道拓殖銀行と山一證券が相次いで破綻。戦後初の大手金融機関の連鎖破綻で金融システム不安が頂点に達した。', link: '../japan/15_crises.html' }
    ,{ year: 1997, month: 5, country: 'uk', cat: 'milestone', label: 'BOE独立', detail: 'ブレア政権発足直後、ブラウン蔵相が5月にイングランド銀行へ金利決定権を付与。MPC（金融政策委員会）が発足した。', link: '../uk/01_central_bank.html' }
    ,{ year: 1997, country: 'australia', cat: 'crisis', label: 'AUD下落', detail: 'アジア通貨危機でアジア向け輸出が打撃を受けAUDが下落。RBAは通貨防衛より景気を優先し緩和で対応した。', link: '../australia/14_currency.html' }
    ,{ year: 1998, month: 9, country: 'us', cat: 'crisis', label: 'LTCM危機', detail: 'ロシア危機を機にヘッジファンドLTCMが破綻寸前に（想定元本1.25兆ドル）。NY連銀の仲介で民間救済され、FRBは3回利下げした。', link: '../us/15_crises.html' }
    ,{ year: 1998, month: 6, country: 'eurozone', cat: 'milestone', label: 'ECB設立', detail: '6月1日に欧州中央銀行（ECB）がフランクフルトで発足。参加国の金利はユーロ導入へ向けて収斂していった。', link: '../eurozone/01_central_bank.html' }
    ,{ year: 1998, month: 10, country: 'japan', cat: 'crisis', label: '長銀国有化', detail: '10月に日本長期信用銀行が特別公的管理（国有化）に。12月には日本債券信用銀行も続き、金融再生法の枠組みが整備された。', link: '../japan/15_crises.html' }
    ,{ year: 1998, country: 'switzerland', cat: 'milestone', label: 'UBS誕生', detail: 'スイス銀行コーポレイション（SBC）とスイスユニオン銀行が合併し新生UBSが誕生。世界最大級の資産運用銀行となった。', link: '../switzerland/16_banking.html' }
    ,{ year: 1998, country: 'norway', cat: 'hike', label: 'NOK防衛8%利上げ', detail: 'ロシア危機と油価急落によるクローネ売りに対し政策金利を8%へ引上げ。イールドカーブは-250bpの逆イールドとなった。', link: '../norway/02_policy_rate.html' }
    ,{ year: 1999, country: 'us', cat: 'milestone', label: 'ドットコム熱狂', detail: 'ドットコムバブルが最終局面へ膨張し、Y2K（2000年問題）対応の流動性供給が相場をさらに押し上げた。', link: '../us/08_equity_modern.html' }
    ,{ year: 1999, month: 1, country: 'eurozone', cat: 'milestone', label: 'ユーロ導入', detail: '1月1日に11カ国で単一通貨ユーロが誕生（現金流通は2002年）。ECBの初期政策金利は3.00%だった。', link: '../eurozone/14_currency.html' }
    ,{ year: 1999, month: 2, country: 'japan', cat: 'cut', label: 'ゼロ金利政策', detail: '2月に無担保コール翌日物を事実上0%へ誘導するゼロ金利政策を正式導入。世界の中央銀行で前例のない領域に入った。', link: '../japan/02_policy_rate.html' }
    ,{ year: 2000, month: 3, country: 'us', cat: 'crisis', label: 'ITバブル崩壊', detail: '3月のNASDAQ 5,048をピークにITバブルが崩壊。NASDAQは2002年までに-78%、S&P500は-49%下落した。', link: '../us/15_crises.html' }
    ,{ year: 2000, country: 'global', cat: 'crisis', label: 'ITバブル世界波及', detail: 'ハイテク株の暴落は日・英・スイスなど世界へ波及。一方、資源国の豪・ノルウェーやNZへの影響は比較的限定的だった。', link: '../us/08_equity_modern.html' }
    ,{ year: 2000, country: 'eurozone', cat: 'crisis', label: 'Neuer Markt崩壊', detail: '独新興市場Neuer Marktは-97%と壊滅し2003年に閉鎖。Euro Stoxx 50も-66%下落した。', link: '../eurozone/15_crises.html' }
    ,{ year: 2000, country: 'canada', cat: 'crisis', label: 'Nortel暴落', detail: 'TSXの3割超を占めたノーテルが-99%暴落し、指数全体を-50%押し下げた。一銘柄集中リスクの教訓となった。', link: '../canada/15_crises.html' }
    ,{ year: 2000, country: 'sweden', cat: 'crisis', label: 'Ericsson暴落', detail: '時価総額の3分の1を占めたエリクソンが-95%暴落し、OMXS30は-68%下落。通信立国の脆弱性が露呈した。', link: '../sweden/15_crises.html' }
    ,{ year: 2000, month: 7, country: 'australia', cat: 'reform', label: 'GST導入', detail: '7月1日に10%の財貨サービス税（GST）を導入（原表は1999年行=法成立年に記載）。税制の近代化が進んだ。', link: '../australia/03_fiscal_policy.html' }
    ,{ year: 2001, month: 9, country: 'us', cat: 'war', label: '9.11テロ', detail: '9月11日の同時多発テロでNYSEは4日間閉鎖。再開後の株価急落に対しFRBは緊急利下げで応じ、衝撃は欧州にも波及した。', link: '../summary/geopolitical_map.html' }
    ,{ year: 2001, country: 'us', cat: 'cut', label: 'FRB大幅利下げ', detail: 'ITバブル崩壊と9.11を受け、FF金利を6.50%から1.75%まで年間11回引下げた。', link: '../us/02_policy_rate.html' }
    ,{ year: 2001, month: 3, country: 'japan', cat: 'cut', label: '量的緩和開始', detail: '3月19日、日銀当座預金残高を目標とする量的緩和（QE）を世界で初めて導入。非伝統的金融政策の先駆けとなった。', link: '../japan/02_policy_rate.html' }
    ,{ year: 2001, country: 'eurozone', cat: 'cut', label: 'ECB利下げ', detail: '9.11後の世界減速に対しECBも利下げで協調し、政策金利は年末3.25%となった。', link: '../eurozone/02_policy_rate.html' }
    ,{ year: 2001, month: 10, country: 'switzerland', cat: 'crisis', label: 'Swissair破綻', detail: '10月2日、ナショナルフラッグのスイス航空が資金繰り破綻で全便停止。スイス経済界の威信を揺るがせた。', link: '../switzerland/17_corporate.html' }
    ,{ year: 2001, month: 4, country: 'australia', cat: 'milestone', label: 'AUD最安値0.48', detail: '4月にAUD/USDが約0.4775の史上最安値を記録。RBAは利下げで景気を支えた。', link: '../australia/14_currency.html' }
    ,{ year: 2001, country: 'canada', cat: 'cut', label: 'BOC利下げ', detail: '米減速と9.11を受けBOCも積極利下げを実施（年末2.00%）。', link: '../canada/02_policy_rate.html' }
    ,{ year: 2001, country: 'sweden', cat: 'cut', label: 'Riksbank利下げ', detail: 'IT不況の打撃が大きいスウェーデンでもRiksbankが利下げで対応した。', link: '../sweden/02_policy_rate.html' }
    ,{ year: 2001, month: 6, country: 'norway', cat: 'milestone', label: 'Statoil上場', detail: '6月に国営石油会社StatoilがオスロとNYSEに上場。政府は過半数の株式を保持した。', link: '../norway/17_corporate.html' }
    ,{ year: 2003, month: 6, country: 'us', cat: 'cut', label: 'FF金利1.00%', detail: 'デフレ懸念から6月にFF金利を1.00%へ。歴史的低金利の長期化が住宅バブルの土壌となった。', link: '../us/02_policy_rate.html' }
    ,{ year: 2003, month: 6, country: 'eurozone', cat: 'cut', label: 'ECB 2.00%', detail: '6月に政策金利を2.00%へ引下げ。独経済の停滞（「欧州の病人」）に対応した。', link: '../eurozone/02_policy_rate.html' }
    ,{ year: 2003, month: 11, country: 'eurozone', cat: 'reform', label: 'SGP違反不問', detail: '財政赤字3%超の独仏への制裁手続きを11月のEcofinが停止。安定成長協定（SGP）の信認が大きく傷ついた。', link: '../eurozone/03_fiscal_policy.html' }
    ,{ year: 2003, month: 5, country: 'japan', cat: 'reform', label: 'りそな公的注入', detail: '5月にりそな銀行へ約2兆円の公的資金を注入し実質国有化。「銀行は潰さない」というシグナルで株式市場は底入れした。', link: '../japan/16_banking.html' }
    ,{ year: 2003, month: 3, country: 'uk', cat: 'war', label: 'イラク戦争', detail: '3月に米英主導でイラク開戦。地政学不安と油価上昇が市場の重石となった。', link: '../summary/geopolitical_map.html' }
    ,{ year: 2003, country: 'australia', cat: 'milestone', label: '資源サイクル開始', detail: '中国の高成長を背景に鉄鉱石・石炭価格が急騰する資源スーパーサイクルが始まり、豪経済を押し上げた。', link: '../australia/19_trade.html' }
    ,{ year: 2003, country: 'newzealand', cat: 'milestone', label: '住宅ブーム開始', detail: '低金利と移民流入で住宅価格の長期上昇が始まり、家計債務の膨張がRBNZの構造的課題となった。', link: '../newzealand/16_banking.html' }
    ,{ year: 2003, country: 'sweden', cat: 'cut', label: 'Riksbank利下げ', detail: 'IT不況後の低インフレに対応して利下げを継続した。', link: '../sweden/02_policy_rate.html' }
    ,{ year: 2003, country: 'norway', cat: 'milestone', label: '資源株+360%', detail: '資源スーパーサイクルでオスロ株式市場は2003年からの5年間で約+360%と急騰した。', link: '../norway/19_trade.html' }
    ,{ year: 2007, month: 8, country: 'us', cat: 'crisis', label: 'サブプライム危機', detail: '住宅ローン延滞の急増でサブプライム関連証券が崩落。8月9日のBNPパリバ・ショックで短期金融市場が凍結し、日本など世界へ波及した。', link: '../us/15_crises.html' }
    ,{ year: 2007, month: 8, country: 'eurozone', cat: 'crisis', label: 'BNPショック', detail: '8月9日、BNPパリバ傘下ファンドの解約凍結で欧州短期市場が麻痺。ECBは即日950億ユーロの緊急供給を実施した。', link: '../eurozone/15_crises.html' }
    ,{ year: 2007, month: 9, country: 'uk', cat: 'crisis', label: 'ノーザンロック取付', detail: '9月に住宅金融ノーザンロックで約140年ぶりの本格的な銀行取付けが発生。2008年2月に国有化された。', link: '../uk/15_crises.html' }
    ,{ year: 2007, country: 'switzerland', cat: 'crisis', label: 'UBS損失', detail: 'UBSがサブプライム関連で巨額評価損を計上（最終的に約500億ドル）。スイス金融の信認が揺らぎ始めた。', link: '../switzerland/16_banking.html' }
    ,{ year: 2007, month: 8, country: 'canada', cat: 'crisis', label: 'ABCP凍結', detail: '8月に非銀行系ABCP市場（約330億カナダドル）が凍結。モントリオール合意による再編で処理された。', link: '../canada/15_crises.html' }
    ,{ year: 2008, month: 9, country: 'us', cat: 'crisis', label: 'リーマン破綻', detail: '9月15日にリーマン・ブラザーズが破綻し世界金融危機（GFC）が本格化。S&P500は高値から-57%下落し、10月にTARP（7,000億ドル）が成立した。', link: '../us/15_crises.html' }
    ,{ year: 2008, month: 12, country: 'us', cat: 'cut', label: 'FF金利ゼロへ', detail: '12月16日にFF金利を0-0.25%へ引下げ、事実上のゼロ金利に到達。QE1（MBS購入）も始動した。', link: '../us/02_policy_rate.html' }
    ,{ year: 2008, month: 10, country: 'global', cat: 'crisis', label: 'GFC世界同時株安', detail: '世界の株価が同時崩落（Euro Stoxx -60%、日経-61%、FTSE -48%、ASX -55%、TSX -50%、OMX -55%、NZX -44%）。各国中銀は協調利下げと流動性供給で応戦し（ECBは2009年に1.00%、BOJは0.10%、RBAは3.00%へ）、2009年後半から世界経済はV字回復に入った。', link: '../us/15_crises.html' }
    ,{ year: 2008, month: 10, country: 'uk', cat: 'crisis', label: 'RBS/Lloyds国有化', detail: '10月に政府が5,000億ポンドの銀行救済策を発表し、RBSとLloyds-HBOSを部分国有化。FTSEは-48%下落した。', link: '../uk/15_crises.html' }
    ,{ year: 2008, month: 10, country: 'switzerland', cat: 'crisis', label: 'UBS政府救済', detail: '10月に政府とSNBがUBSをCHF600億規模で救済。不良資産はSNBのスタビリティファンドへ分離された。', link: '../switzerland/15_crises.html' }
    ,{ year: 2008, country: 'norway', cat: 'crisis', label: 'OSEBX -64%', detail: '油価暴落が直撃しオスロ株はG10最深の-64%。NOKも急落した。', link: '../norway/15_crises.html' }
    ,{ year: 2009, month: 3, country: 'us', cat: 'milestone', label: 'QE1本格化', detail: '3月に国債購入を含む1.75兆ドルへQE1を拡大。非伝統的緩和が危機対応の中心となった。', link: '../us/02_policy_rate.html' }
    ,{ year: 2009, month: 3, country: 'us', cat: 'milestone', label: 'S&P底値666', detail: '3月6日にS&P500がザラ場666の大底。以後2020年まで11年続く史上最長の強気相場が始まった。', link: '../us/09_equity_recent.html' }
    ,{ year: 2009, month: 10, country: 'eurozone', cat: 'crisis', label: 'ギリシャ粉飾発覚', detail: '10月にギリシャ新政権が財政赤字の大幅な過少申告を公表。欧州債務危機の発火点となった。', link: '../eurozone/15_crises.html' }
    ,{ year: 2009, month: 9, country: 'japan', cat: 'milestone', label: '民主党政権', detail: '9月に民主党へ政権交代。「事業仕分け」など財政運営が転換期を迎えた。', link: '../japan/03_fiscal_policy.html' }
    ,{ year: 2009, month: 3, country: 'uk', cat: 'cut', label: 'BOE QE開始', detail: '3月に政策金利を0.50%へ引下げ、2,000億ポンドの資産購入（QE）を開始した。', link: '../uk/02_policy_rate.html' }
    ,{ year: 2009, month: 3, country: 'switzerland', cat: 'cut', label: 'SNB 0.25%', detail: '3月に政策金利を0.25%へ引下げ、CHF高抑制のための為替介入も開始した。', link: '../switzerland/02_policy_rate.html' }
    ,{ year: 2009, month: 10, country: 'australia', cat: 'hike', label: 'G20初の利上げ', detail: '中国の資源需要に支えられ景気後退を回避した豪州は、10月にG20で最初に利上げへ転じた。', link: '../australia/02_policy_rate.html' }
    ,{ year: 2010, month: 11, country: 'us', cat: 'milestone', label: 'QE2開始', detail: '11月に6,000億ドルの国債購入（QE2）を決定。新興国からは通貨安競争との批判を浴びた。', link: '../us/02_policy_rate.html' }
    ,{ year: 2010, month: 7, country: 'us', cat: 'reform', label: 'Dodd-Frank法', detail: '7月にGFC再発防止のための金融規制改革法（ドッド・フランク法）が成立。ボルカー・ルールやSIFI規制を導入した。', link: '../us/18_regulation.html' }
    ,{ year: 2010, month: 5, country: 'eurozone', cat: 'crisis', label: 'ギリシャ危機', detail: '5月にEU・IMFが1,100億ユーロの第1次ギリシャ支援を決定。ECBは国債買入れ（SMP）を開始し、欧州債務危機が本格化した。', link: '../eurozone/15_crises.html' }
    ,{ year: 2010, country: 'japan', cat: 'milestone', label: '中国にGDP抜かれる', detail: '名目GDPで中国に抜かれ世界3位に後退。デフレと円高が成長率を押し下げ続けた。', link: '../japan/20_lessons.html' }
    ,{ year: 2010, month: 5, country: 'uk', cat: 'reform', label: '緊縮財政開始', detail: '5月発足の保守・自民連立政権が財政赤字削減の緊縮路線へ転換。オズボーン財政の評価は今も分かれる。', link: '../uk/03_fiscal_policy.html' }
    ,{ year: 2010, month: 10, country: 'australia', cat: 'milestone', label: 'AUD=USD平価', detail: '鉱業ブームの絶頂で10月にAUDが対USDで平価（パリティ）を回復。1983年の変動相場制移行後初だった。', link: '../australia/14_currency.html' }
    ,{ year: 2011, month: 8, country: 'us', cat: 'crisis', label: '米国債格下げ', detail: '債務上限交渉の混迷を受け、8月5日にS&Pが米国債をAAAからAA+へ史上初の格下げ。逆説的に米国債は買われた。', link: '../us/15_crises.html' }
    ,{ year: 2011, month: 4, country: 'eurozone', cat: 'hike', label: 'トリシェ利上げ', detail: '4月と7月に利上げを実施したが、債務危機の悪化で年内に撤回。時期尚早の引き締めとして教訓化された。', link: '../eurozone/02_policy_rate.html' }
    ,{ year: 2011, month: 5, country: 'eurozone', cat: 'crisis', label: '愛・ポルトガル救済', detail: 'ポルトガルが5月に780億ユーロの支援を受諾（アイルランドは2010年11月に850億ユーロ）。債務危機が周縁国へ拡大した。', link: '../eurozone/15_crises.html' }
    ,{ year: 2011, month: 3, country: 'japan', cat: 'crisis', label: '東日本大震災', detail: '3月11日の巨大地震・津波と原発事故で供給網が寸断。日銀は大規模資金供給、G7は協調円売り介入を実施した。', link: '../japan/15_crises.html' }
    ,{ year: 2011, month: 10, country: 'japan', cat: 'milestone', label: '円最高値75.32', detail: '10月31日にUSD/JPYが75.32円の史上最高値（円高）を記録。政府・日銀は単独介入で応戦した。', link: '../japan/14_currency.html' }
    ,{ year: 2011, month: 9, country: 'switzerland', cat: 'reform', label: 'EUR/CHF1.20下限', detail: '9月6日、SNBがEUR/CHF 1.20の下限（フロア）を設定し無制限介入を宣言。安全通貨買いの殺到を強制的に止めた。', link: '../switzerland/14_currency.html' }
    ,{ year: 2011, month: 2, country: 'newzealand', cat: 'crisis', label: 'カンタベリー地震', detail: '2月22日のクライストチャーチ地震で185人が死亡。RBNZは緊急利下げで対応し、復興需要が後の景気を押し上げた。', link: '../newzealand/15_crises.html' }
    ,{ year: 2012, month: 9, country: 'us', cat: 'milestone', label: 'QE3開始', detail: '9月に月額400億ドル（後に850億ドル）の無期限資産購入（QE3）を開始。「QE無限大」と呼ばれた。', link: '../us/02_policy_rate.html' }
    ,{ year: 2012, month: 7, country: 'eurozone', cat: 'milestone', label: 'ドラギ宣言OMT', detail: '7月26日、ドラギ総裁が「ユーロを守るためなら何でもする（Whatever It Takes）」と宣言。OMT発表とESM始動で債務危機は転機を迎えた。', link: '../eurozone/02_policy_rate.html' }
    ,{ year: 2012, month: 2, country: 'japan', cat: 'reform', label: '物価目標1%導入', detail: '2月に日銀が「中長期的な物価安定の目途」として1%を提示。2013年1月に2%の正式目標へ引き上げられる。', link: '../japan/02_policy_rate.html' }
    ,{ year: 2013, month: 5, country: 'us', cat: 'crisis', label: 'テーパータントラム', detail: '5月22日のバーナンキ議長によるQE縮小示唆で長期金利が急騰し、新興国から資金が流出。出口戦略の難しさを示した。', link: '../us/13_long_rates.html' }
    ,{ year: 2013, month: 3, country: 'eurozone', cat: 'crisis', label: 'キプロス危機', detail: '3月の支援策で大口預金者に損失負担（ベイルイン）を初適用。銀行同盟への移行を加速させた。', link: '../eurozone/15_crises.html' }
    ,{ year: 2013, month: 4, country: 'japan', cat: 'milestone', label: '黒田バズーカ', detail: '4月4日に黒田総裁が量的・質的緩和（QQE）を導入。マネタリーベース2倍・国債大量購入の「異次元緩和」で円安・株高が加速した。', link: '../japan/02_policy_rate.html' }
    ,{ year: 2013, month: 8, country: 'uk', cat: 'reform', label: 'フォワードガイダンス', detail: '8月にカーニー新総裁が失業率に連動するフォワードガイダンスを導入。市場との対話手法が刷新された。', link: '../uk/02_policy_rate.html' }
    ,{ year: 2013, country: 'australia', cat: 'milestone', label: '鉱業ブーム終了', detail: '資源投資のピークアウトで鉱業ブームが終焉。経済はサービス主導への再均衡を迫られ、AUDも下落基調に入った。', link: '../australia/19_trade.html' }
    ,{ year: 2013, country: 'norway', cat: 'milestone', label: 'NOK減価開始', detail: '油価の頭打ちとともにクローネの構造的な減価トレンドが始まった。', link: '../norway/14_currency.html' }
    ,{ year: 2014, month: 10, country: 'us', cat: 'milestone', label: 'QE3終了', detail: '10月でQE3の資産購入を完了。FRBのバランスシートは4.5兆ドルに達していた。', link: '../us/02_policy_rate.html' }
    ,{ year: 2014, month: 6, country: 'eurozone', cat: 'cut', label: 'ECBマイナス金利', detail: '6月に中銀預金金利を-0.10%へ。主要中央銀行として世界で初めてマイナス金利を導入した。', link: '../eurozone/02_policy_rate.html' }
    ,{ year: 2014, month: 10, country: 'japan', cat: 'reform', label: 'GPIF改革', detail: '10月31日にGPIFが内外株式の比率を計50%へ倍増（日銀追加緩和と同日発表）。「クジラ」が株式市場の巨大な買い手となった。', link: '../japan/06_equity_overview.html' }
    ,{ year: 2014, country: 'newzealand', cat: 'crisis', label: '乳製品価格急落', detail: '最大輸出品の乳製品価格が急落し、フォンテラの支払乳価が大幅減。NZD高との板挟みでRBNZは利上げ路線の転換を迫られた。', link: '../newzealand/19_trade.html' }
    ,{ year: 2014, country: 'canada', cat: 'crisis', label: '原油急落・CAD安', detail: '年後半の原油急落で産油国カナダの交易条件が悪化しCADが下落。BOCは2015年に予防的利下げへ動いた。', link: '../canada/14_currency.html' }
    ,{ year: 2014, country: 'norway', cat: 'crisis', label: '石油暴落5万人失業', detail: '油価が115ドルから50ドル割れへ暴落し、石油関連で約5万人が職を失った。NOKも大幅安となった。', link: '../norway/15_crises.html' }
    ,{ year: 2015, month: 12, country: 'us', cat: 'hike', label: 'FRB利上げ開始', detail: '12月にゼロ金利を解除し9年ぶりの利上げ（0.25-0.50%）。正常化サイクルの第一歩となった。', link: '../us/02_policy_rate.html' }
    ,{ year: 2015, month: 3, country: 'eurozone', cat: 'cut', label: 'ECB QE開始', detail: '3月から月額600億ユーロの資産購入プログラム（APP）を開始。ユーロ圏もついに本格QEへ踏み込んだ。', link: '../eurozone/02_policy_rate.html' }
    ,{ year: 2015, month: 1, country: 'switzerland', cat: 'crisis', label: 'CHFショック', detail: '1月15日、SNBがEUR/CHF 1.20下限を突如撤廃しCHFは瞬間約30%急騰。同時に政策金利を-0.75%へ引下げた。FX業者の破綻も相次いだ。', link: '../switzerland/15_crises.html' }
    ,{ year: 2015, month: 2, country: 'sweden', cat: 'cut', label: 'Riksbankマイナス金利', detail: '2月にレポ金利を-0.10%へ。最終的に-0.50%まで引下げ、QEも併用した。', link: '../sweden/02_policy_rate.html' }
    ,{ year: 2015, country: 'norway', cat: 'cut', label: 'Norges Bank利下げ', detail: '石油不況に対応し利下げを継続（2016年に0.50%まで）。住宅価格の高騰が副作用となった。', link: '../norway/02_policy_rate.html' }
    ,{ year: 2016, month: 11, country: 'us', cat: 'milestone', label: 'トランプ当選', detail: '11月の大統領選でトランプ氏が勝利。減税・規制緩和期待で株高・金利上昇の「トランプ・トレード」が走った。', link: '../us/09_equity_recent.html' }
    ,{ year: 2016, month: 1, country: 'japan', cat: 'cut', label: 'マイナス金利導入', detail: '1月29日に-0.10%のマイナス金利を導入。銀行収益への打撃と円高進行で評判は芳しくなかった。', link: '../japan/02_policy_rate.html' }
    ,{ year: 2016, month: 9, country: 'japan', cat: 'reform', label: 'YCC導入', detail: '9月に長短金利操作（イールドカーブ・コントロール）を導入し10年金利を0%程度に誘導。量から金利へ枠組みを転換した。', link: '../japan/02_policy_rate.html' }
    ,{ year: 2016, month: 6, country: 'uk', cat: 'crisis', label: 'Brexit国民投票', detail: '6月23日の国民投票でEU離脱派が52%で勝利。GBPは1日で-11%と変動相場制移行後最大の下落を記録した。', link: '../uk/15_crises.html' }
    ,{ year: 2016, month: 2, country: 'sweden', cat: 'cut', label: 'Riksbank-0.50%', detail: '2月に-0.50%へ引下げ、マイナス金利を深掘りした。', link: '../sweden/02_policy_rate.html' }
    ,{ year: 2017, month: 10, country: 'us', cat: 'hike', label: 'QT開始', detail: '利上げを継続しつつ、10月からバランスシート縮小（QT）を開始。二段構えの正常化に入った。', link: '../us/02_policy_rate.html' }
    ,{ year: 2017, month: 11, country: 'uk', cat: 'hike', label: 'BOE利上げ', detail: '11月に10年ぶりの利上げ（0.25%から0.50%へ）。Brexit後のポンド安インフレに対応した。', link: '../uk/02_policy_rate.html' }
    ,{ year: 2018, month: 12, country: 'us', cat: 'hike', label: 'FF金利2.50%', detail: '12月の利上げでFF金利は2.25-2.50%に到達。株安と政権からの圧力で利上げサイクルは打ち止めとなった。', link: '../us/02_policy_rate.html' }
    ,{ year: 2018, month: 7, country: 'us', cat: 'war', label: '米中貿易戦争', detail: '7月に対中制裁関税の第1弾を発動。報復の応酬がサプライチェーンと市場を揺らした。', link: '../us/19_trade.html' }
    ,{ year: 2018, month: 12, country: 'eurozone', cat: 'milestone', label: 'ECB QE終了', detail: '12月で資産購入の新規買入れを終了。ただし利上げには至らず、2019年には緩和へ逆戻りする。', link: '../eurozone/02_policy_rate.html' }
    ,{ year: 2018, country: 'canada', cat: 'reform', label: 'USMCA合意', detail: 'NAFTA再交渉が決着し新協定USMCAに合意。対米依存度の高いカナダは貿易の不確実性をひとまず脱した。', link: '../canada/19_trade.html' }
    ,{ year: 2018, month: 5, country: 'norway', cat: 'milestone', label: 'Equinor改名', detail: 'Statoilが5月にEquinorへ社名変更。石油依存からの転換と再生可能エネルギー拡大を打ち出した。', link: '../norway/17_corporate.html' }
    ,{ year: 2019, month: 7, country: 'us', cat: 'cut', label: 'FRB予防的利下げ', detail: '貿易戦争の逆風に対し7月から3回の「保険的」利下げを実施した。', link: '../us/02_policy_rate.html' }
    ,{ year: 2019, month: 9, country: 'us', cat: 'crisis', label: 'レポ危機', detail: '9月に翌日物レポ金利が10%へ急騰。銀行の準備預金不足が露呈し、FRBは資金供給とTビル購入を再開した。', link: '../us/12_short_rates.html' }
    ,{ year: 2019, month: 9, country: 'eurozone', cat: 'cut', label: 'ECB -0.50%', detail: '9月に預金金利を-0.50%へ引下げQEを再開。11月にラガルド総裁が就任した。', link: '../eurozone/02_policy_rate.html' }
    ,{ year: 2019, country: 'uk', cat: 'milestone', label: 'Brexit混迷', detail: '離脱協定が議会で否決を重ねメイ首相が辞任。ジョンソン政権下で2020年1月の離脱が確定する。', link: '../uk/19_trade.html' }
    ,{ year: 2019, month: 6, country: 'australia', cat: 'cut', label: 'RBA利下げ', detail: '6月から利下げを再開し0.75%へ。住宅市場の減速と低インフレに対応した。', link: '../australia/02_policy_rate.html' }
    ,{ year: 2019, month: 8, country: 'newzealand', cat: 'cut', label: 'RBNZ大幅利下げ', detail: '8月に50bpの大幅利下げで1.00%へ。市場を驚かせる「先回り」緩和だった。', link: '../newzealand/02_policy_rate.html' }
    ,{ year: 2019, country: 'canada', cat: 'cut', label: 'BOC据置', detail: '世界的な緩和競争の中でBOCは1.75%の据置きを貫き、「G7で最もタカ派」と呼ばれた。', link: '../canada/02_policy_rate.html' }
    ,{ year: 2019, month: 12, country: 'sweden', cat: 'milestone', label: 'マイナス金利脱出', detail: '12月に-0.25%から0%へ利上げし、世界で初めてマイナス金利から脱出した。景気減速下の決断は論争を呼んだ。', link: '../sweden/02_policy_rate.html' }
    ,{ year: 2020, month: 3, country: 'global', cat: 'crisis', label: 'COVID-19', detail: 'パンデミックで世界市場が暴落（S&P -34%、日経-31%、SMI -26%、ASX -37%、TSX -37%など）。各国は未曾有の財政・金融出動で応じた。', link: '../summary/geopolitical_map.html' }
    ,{ year: 2020, month: 3, country: 'us', cat: 'cut', label: 'ゼロ金利・無制限QE', detail: '3月に2回の緊急利下げで0-0.25%へ。無制限QEとCP・社債購入など「何でもあり」の流動性供給を行った。', link: '../us/02_policy_rate.html' }
    ,{ year: 2020, month: 3, country: 'eurozone', cat: 'cut', label: 'PEPP導入', detail: '3月にパンデミック緊急購入プログラム（PEPP、最終1.85兆ユーロ）を創設。7月にはEU共同債によるNGEU（7,500億ユーロ）にも合意した。', link: '../eurozone/02_policy_rate.html' }
    ,{ year: 2020, month: 3, country: 'uk', cat: 'cut', label: 'BOE 0.10%', detail: '3月に政策金利を史上最低の0.10%へ引下げ、QEを8,950億ポンドまで拡大した。', link: '../uk/02_policy_rate.html' }
    ,{ year: 2020, country: 'australia', cat: 'cut', label: 'RBA 0.10%・YCT', detail: '3月にYCT（3年金利目標）を導入し、11月に政策金利を0.10%へ。YCTは2021年の防衛失敗で信認を損なった。', link: '../australia/02_policy_rate.html' }
    ,{ year: 2020, month: 3, country: 'newzealand', cat: 'cut', label: 'RBNZ 0.25%', detail: '3月に0.25%へ利下げし大規模資産購入（LSAP）を開始。マイナス金利の準備まで進めた。', link: '../newzealand/02_policy_rate.html' }
    ,{ year: 2020, month: 3, country: 'canada', cat: 'cut', label: 'BOC 0.25%', detail: '3月に3回の利下げで0.25%へ。カナダ初の本格QEにも踏み切った。', link: '../canada/02_policy_rate.html' }
    ,{ year: 2020, country: 'sweden', cat: 'cut', label: 'Riksbank 0%維持', detail: '政策金利は0%を維持し、QE拡大と流動性供給で対応。マイナス金利には戻らなかった。', link: '../sweden/02_policy_rate.html' }
    ,{ year: 2020, month: 3, country: 'norway', cat: 'crisis', label: 'NOK史上最安', detail: 'パンデミックと露サウジ石油価格戦争が重なり、3月19日にEUR/NOKが12.45の史上最安値。Norges Bankは初のNOK買い介入を示唆した。', link: '../norway/14_currency.html' }
    ,{ year: 2021, country: 'global', cat: 'milestone', label: 'インフレ時代開幕', detail: '供給制約・財政出動・エネルギー高で世界インフレが加速（米CPIは12月に7.0%、英・豪・加でも上昇開始）。「一時的」との中銀の見立ては誤りで、株価は最高値圏のまま2022年の急落を迎える。', link: '../us/05_inflation.html' }
    ,{ year: 2021, month: 6, country: 'eurozone', cat: 'milestone', label: 'NGEU発行開始', detail: '6月にEU共同債の発行が始動し、欧州に新たな安全資産が誕生。DAXは史上最高値を更新した。', link: '../eurozone/11_bond_market.html' }
    ,{ year: 2021, month: 10, country: 'japan', cat: 'milestone', label: '岸田政権発足', detail: '菅政権から岸田政権へ交代し「新しい資本主義」を提唱。日経平均は29,000円前後で推移した。', link: '../japan/03_fiscal_policy.html' }
    ,{ year: 2021, month: 12, country: 'uk', cat: 'hike', label: 'BOE利上げ開始', detail: '12月にG7主要中銀の先頭を切って利上げを開始（0.10%から0.25%へ）。インフレはこの後2桁へ向かう。', link: '../uk/02_policy_rate.html' }
    ,{ year: 2021, month: 10, country: 'newzealand', cat: 'hike', label: 'RBNZ利上げ開始', detail: '10月に利上げを開始しG10の先頭集団に。住宅価格の急騰も背景にあった。', link: '../newzealand/02_policy_rate.html' }
    ,{ year: 2021, month: 9, country: 'norway', cat: 'hike', label: 'NB利上げG10最速', detail: '9月にG10で最初の利上げを実施（0%から0.25%へ）。以後も淡々と正常化を進めた。', link: '../norway/02_policy_rate.html' }
    ,{ year: 2022, month: 2, country: 'global', cat: 'war', label: 'ウクライナ侵攻', detail: '2月24日のロシアによる侵攻でエネルギー・穀物価格が急騰。対露制裁と資源の武器化が世界インフレを加速させた。', link: '../summary/geopolitical_map.html' }
    ,{ year: 2022, month: 3, country: 'us', cat: 'hike', label: 'FRB急速利上げ', detail: '3月から1年で425bpの史上最速級の利上げ（75bp×4回連続を含む）。S&P500は-19%で年を終えた。', link: '../us/02_policy_rate.html' }
    ,{ year: 2022, month: 7, country: 'eurozone', cat: 'hike', label: 'ECB利上げ開始', detail: '7月に11年ぶりの利上げ（50bp）でマイナス金利を一気に終了。年内に250bp引上げ、分断防止のTPIも導入した。', link: '../eurozone/02_policy_rate.html' }
    ,{ year: 2022, month: 7, country: 'japan', cat: 'war', label: '安倍元首相暗殺', detail: '7月8日に安倍元首相が銃撃され死去。アベノミクスの時代が象徴的な終わりを迎えた。', link: '../japan/03_fiscal_policy.html' }
    ,{ year: 2022, country: 'uk', cat: 'hike', label: 'BOE 325bp利上げ', detail: '年間325bpの利上げで3.50%へ。2桁インフレとの戦いが続いた。', link: '../uk/02_policy_rate.html' }
    ,{ year: 2022, month: 9, country: 'uk', cat: 'crisis', label: 'ギルト危機', detail: '9月のトラス政権による財源なき減税案で英国債が暴落、年金基金のLDI戦略が連鎖崩壊寸前に。BOEの緊急買入れで鎮静化し、トラス首相は49日で退陣した。', link: '../uk/15_crises.html' }
    ,{ year: 2022, month: 6, country: 'switzerland', cat: 'hike', label: 'SNB利上げ', detail: '6月に15年ぶりの利上げ（-0.75%から-0.25%へ）。9月にはマイナス金利を完全に終了した。', link: '../switzerland/02_policy_rate.html' }
    ,{ year: 2022, month: 10, country: 'switzerland', cat: 'crisis', label: 'CS危機深刻化', detail: '相次ぐ不祥事と損失で10月に預金流出が加速（四半期でCHF1,110億）。クレディ・スイスは翌春の破綻へ向かった。', link: '../switzerland/16_banking.html' }
    ,{ year: 2022, month: 5, country: 'australia', cat: 'hike', label: 'RBA利上げ開始', detail: '5月から年間300bpの利上げ。「2024年まで利上げなし」のガイダンスは撤回に追い込まれた。', link: '../australia/02_policy_rate.html' }
    ,{ year: 2022, country: 'newzealand', cat: 'hike', label: 'RBNZ 350bp利上げ', detail: '年間350bpの利上げで4.25%へ。7%超のインフレへの対応を急いだ。', link: '../newzealand/02_policy_rate.html' }
    ,{ year: 2022, month: 3, country: 'canada', cat: 'hike', label: 'BOC 400bp利上げ', detail: '3月から年間400bpの利上げ。7月には100bpのジャンボ利上げも実施した。', link: '../canada/02_policy_rate.html' }
    ,{ year: 2022, country: 'sweden', cat: 'hike', label: 'Riksbank 250bp', detail: '年間250bpの利上げで2.50%へ。住宅価格は急落に転じた。', link: '../sweden/02_policy_rate.html' }
    ,{ year: 2022, country: 'norway', cat: 'milestone', label: 'Equinor最高益', detail: 'エネルギー危機で欧州最大のガス供給国となり、EquinorはNOK5,000億規模の利益。国家財政も大きく潤った。', link: '../norway/19_trade.html' }
    ,{ year: 2023, month: 3, country: 'us', cat: 'crisis', label: 'SVB破綻', detail: '3月にシリコンバレー銀行・シグネチャー銀行が急速な預金流出で破綻（5月にファースト・リパブリックも）。SNS時代の取付けの速さを見せつけた。', link: '../us/15_crises.html' }
    ,{ year: 2023, month: 7, country: 'us', cat: 'hike', label: 'FF 5.25-5.50%', detail: '7月の利上げでFF金利は5.25-5.50%とサイクル最高点に到達。以後1年余り据え置かれた。', link: '../us/02_policy_rate.html' }
    ,{ year: 2023, country: 'us', cat: 'milestone', label: 'AI相場開始', detail: 'ChatGPTショックを機にNVIDIAなどAI関連株が急騰。マグニフィセント・セブンが指数を牽引する相場が始まった。', link: '../us/10_equity_current.html' }
    ,{ year: 2023, month: 9, country: 'eurozone', cat: 'hike', label: 'ECB 4.00%', detail: '9月の利上げで預金金利は4.00%とユーロ史上最高に到達。10会合連続の利上げだった。', link: '../eurozone/02_policy_rate.html' }
    ,{ year: 2023, month: 7, country: 'japan', cat: 'reform', label: 'YCC柔軟化', detail: '植田新体制が7月と10月にYCCの運用を柔軟化し、長期金利の上限を実質1%超へ。出口への地ならしを進めた。', link: '../japan/02_policy_rate.html' }
    ,{ year: 2023, country: 'japan', cat: 'milestone', label: '日経33年ぶり高値', detail: '日経平均が33,000円台と1990年以来33年ぶりの高値圏へ。東証の資本コスト改革や海外マネー流入が追い風となった。', link: '../japan/09_equity_recent.html' }
    ,{ year: 2023, month: 8, country: 'uk', cat: 'hike', label: 'BOE 5.25%', detail: '8月の利上げで5.25%のピークに到達。2桁インフレはようやく鈍化へ向かい始めた。', link: '../uk/02_policy_rate.html' }
    ,{ year: 2023, month: 3, country: 'switzerland', cat: 'crisis', label: 'CS破綻UBS合併', detail: '3月19日、政府・SNB・FINMA主導でUBSがクレディ・スイスを救済買収。AT1債約CHF160億の全額毀損が世界の債券市場を揺らした。', link: '../switzerland/15_crises.html' }
    ,{ year: 2023, month: 11, country: 'australia', cat: 'hike', label: 'RBA 4.35%', detail: '11月の利上げで4.35%のピークへ。変動金利中心の住宅ローン負担が家計を直撃した。', link: '../australia/02_policy_rate.html' }
    ,{ year: 2023, month: 5, country: 'newzealand', cat: 'hike', label: 'RBNZ 5.50%', detail: '5月に5.50%へ到達し、G10最高水準の引き締めを完了した。', link: '../newzealand/02_policy_rate.html' }
    ,{ year: 2023, month: 7, country: 'canada', cat: 'hike', label: 'BOC 5.00%', detail: '一旦停止後に再利上げし7月に5.00%へ。家計債務の重さが利上げの限界として議論された。', link: '../canada/02_policy_rate.html' }
    ,{ year: 2023, month: 9, country: 'sweden', cat: 'hike', label: 'Riksbank 4.00%', detail: '9月に4.00%へ到達。SEK安と商業用不動産（SBBなど）の苦境が懸念材料となった。', link: '../sweden/02_policy_rate.html' }
    ,{ year: 2023, month: 12, country: 'norway', cat: 'hike', label: 'NB 4.50%到達', detail: '12月の利上げで4.50%のピークに到達。NOK安がインフレを押し上げる構図が続いた。', link: '../norway/02_policy_rate.html' }
    ,{ year: 2024, month: 9, country: 'us', cat: 'cut', label: 'FRB利下げ開始', detail: '9月に50bpで利下げを開始し年末4.25-4.50%へ。S&P500はAI相場で最高値を更新し続けた。', link: '../us/02_policy_rate.html' }
    ,{ year: 2024, month: 11, country: 'us', cat: 'milestone', label: 'トランプ再選', detail: '11月の大統領選でトランプ氏が返り咲き。関税・減税・規制緩和への期待と不安が交錯した。', link: '../summary/geopolitical_map.html' }
    ,{ year: 2024, month: 6, country: 'eurozone', cat: 'cut', label: 'ECB利下げ開始', detail: '6月にFRBに先んじて利下げを開始し、年末に預金金利3.00%へ。', link: '../eurozone/02_policy_rate.html' }
    ,{ year: 2024, month: 3, country: 'japan', cat: 'milestone', label: 'マイナス金利解除', detail: '3月19日にマイナス金利とYCCを終了し17年ぶりの利上げ。世界の「マイナス金利時代」が完全に幕を閉じた。', link: '../japan/02_policy_rate.html' }
    ,{ year: 2024, month: 3, country: 'japan', cat: 'milestone', label: '日経4万円突破', detail: '2月に1989年の最高値38,915円を34年ぶりに更新し、3月4日に4万円を突破。7月には42,224円まで上昇した。', link: '../japan/10_equity_current.html' }
    ,{ year: 2024, month: 7, country: 'japan', cat: 'milestone', label: '円安162円', detail: '7月3日にUSD/JPYが161.9円と1986年以来の円安水準（原表は2022年行に記載）。政府・日銀は累計十数兆円規模の円買い介入を実施した。', link: '../japan/14_currency.html' }
    ,{ year: 2024, month: 8, country: 'uk', cat: 'cut', label: 'BOE利下げ開始', detail: '8月に利下げを開始し年末4.75%へ。サービスインフレの粘着性が緩和ペースを縛った。', link: '../uk/02_policy_rate.html' }
    ,{ year: 2024, month: 3, country: 'switzerland', cat: 'cut', label: 'SNB利下げ開始', detail: '3月にG10主要中銀の先頭を切って利下げし、年末0.50%へ。CHF高と低インフレが背景にあった。', link: '../switzerland/02_policy_rate.html' }
    ,{ year: 2024, country: 'australia', cat: 'milestone', label: 'RBA据置4.35%', detail: '2024年を通じて4.35%で据置き。利上げが遅かった分、利下げも遅れる「後発組」となった。', link: '../australia/02_policy_rate.html' }
    ,{ year: 2024, month: 8, country: 'newzealand', cat: 'cut', label: 'RBNZ利下げ開始', detail: '8月に利下げへ転換。景気後退入りを受けてペースを速めた。', link: '../newzealand/02_policy_rate.html' }
    ,{ year: 2024, month: 6, country: 'canada', cat: 'cut', label: 'BOC利下げ開始', detail: '6月にG7の先頭で利下げを開始し、年末3.25%へ。住宅ローン更新の崖が意識された。', link: '../canada/02_policy_rate.html' }
    ,{ year: 2024, month: 5, country: 'sweden', cat: 'cut', label: 'Riksbank利下げ', detail: '5月に利下げを開始し年末2.50%へ。景気低迷とSEK安の板挟みが続いた。', link: '../sweden/02_policy_rate.html' }
    ,{ year: 2024, country: 'norway', cat: 'milestone', label: 'NB据置4.50%', detail: 'NOK安によるインフレ警戒から2024年は4.50%で据置き。G10で最もタカ派的な中銀の一つとなった。', link: '../norway/02_policy_rate.html' }
    ,{ year: 2025, month: 4, country: 'us', cat: 'war', label: '相互関税ショック', detail: '4月2日発表の「相互関税」で世界市場が動揺。FF金利は4.25-4.50%で据置きが続き、AI相場は変動をはらみつつ継続した。', link: '../us/19_trade.html' }
    ,{ year: 2025, country: 'eurozone', cat: 'cut', label: 'ECB 2.65%', detail: '利下げを継続し預金金利は2.65%へ。インフレは目標近辺まで鈍化した。', link: '../eurozone/02_policy_rate.html' }
    ,{ year: 2025, month: 3, country: 'eurozone', cat: 'reform', label: '独債務ブレーキ改革', detail: '3月にドイツが債務ブレーキ（Schuldenbremse）を改革し、国防・インフラへ5,000億ユーロの特別基金を創設。欧州財政の歴史的転換となった。', link: '../eurozone/03_fiscal_policy.html' }
    ,{ year: 2025, month: 1, country: 'japan', cat: 'hike', label: 'BOJ 0.50%', detail: '1月に0.50%へ利上げ。春闘賃上げ5%超と円安是正が「金利ある世界」への回帰を後押しした。', link: '../japan/02_policy_rate.html' }
    ,{ year: 2025, month: 2, country: 'uk', cat: 'cut', label: 'BOE 4.50%', detail: '2月に4.50%へ利下げ。成長停滞とインフレ残存のスタグフレーション懸念が重石となった。', link: '../uk/02_policy_rate.html' }
    ,{ year: 2025, month: 3, country: 'switzerland', cat: 'cut', label: 'SNB 0.25%', detail: '3月に0.25%へ利下げ。CHF高でインフレはゼロ近傍となり、マイナス金利復帰も取り沙汰された。UBSのCS統合は進行中。', link: '../switzerland/02_policy_rate.html' }
    ,{ year: 2025, month: 2, country: 'australia', cat: 'cut', label: 'RBA利下げ開始', detail: '2月にようやく利下げを開始し4.10%へ。G10で最後発の緩和転換だった。', link: '../australia/02_policy_rate.html' }
    ,{ year: 2025, country: 'newzealand', cat: 'cut', label: 'RBNZ 3.50%', detail: '利下げを継続し3.50%へ。景気のもたつきが続いた。', link: '../newzealand/02_policy_rate.html' }
    ,{ year: 2025, month: 3, country: 'canada', cat: 'cut', label: 'BOC 2.75%', detail: '3月に2.75%へ利下げ。対米関税リスクが見通しを曇らせた。', link: '../canada/02_policy_rate.html' }
    ,{ year: 2025, country: 'sweden', cat: 'cut', label: 'Riksbank 2.25%', detail: '利下げを継続し2.25%へ。中立金利の近辺に到達した。', link: '../sweden/02_policy_rate.html' }
    ,{ year: 2025, country: 'norway', cat: 'milestone', label: 'NB 4.50%据置', detail: '4.50%の据置きを続けG10最高水準を維持。GPFGはNOK18兆超と世界最大のSWFであり続けた。', link: '../norway/02_policy_rate.html' }
  ]
};
