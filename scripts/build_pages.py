#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
build_pages.py — canonical page generator for the G10 + 地政学・新興地域 textbook.

Every generated page shares identical, correct chrome (head includes, sidebar,
breadcrumb, footer, page-nav, end-of-body script includes) so the 178 new pages
match the existing G10 pages byte-for-byte in structure.

Usage:
    python3 build_pages.py <region_key>
        Build all chapters present in <repo>/<region_key>/_src/ into
        <repo>/<region_key>/<num>_<slug>.html

    python3 build_pages.py --emit-sidebar [region_key] [chap_num]
        Print the canonical sidebar HTML (default region=us, chapter=01),
        e.g. for retrofitting existing pages.

Library:
    build_page(region_key, chap_num, *, title_ja, title_en='', subtitle='',
               article_inner_html, extra_head='', sources_html='',
               prev=None, next=None) -> str  (full HTML document)
    build_region(region_key, *, repo_root=REPO_ROOT, src_dir=None, out_dir=None)

NOTE: article_inner_html / sources_html / extra_head are inserted VERBATIM
(not HTML-escaped) — they are already HTML.
"""

import json
import os
import sys

# --------------------------------------------------------------------------- #
# Paths
# --------------------------------------------------------------------------- #
REPO_ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

# --------------------------------------------------------------------------- #
# REGIONS registry — 10 G10 first (us..norway), then the 8 new (taiwan..israel)
# Country chips render the plain `code`; enhancer.js injects the flag for the
# 10 G10 keys. The 8 new keys must be added to assets/enhancer.js (COUNTRY_INFO
# + the dir regex) for their chips/banners to gain flags — that is an assets
# task, NOT this generator's job.
# --------------------------------------------------------------------------- #
REGIONS = [
    # --- G10 (existing — do NOT recreate their HTML) ---
    {"key": "us",          "flag": "🇺🇸", "name_ja": "アメリカ",          "code": "US"},
    {"key": "eurozone",    "flag": "🇪🇺", "name_ja": "ユーロ圏",          "code": "EU"},
    {"key": "japan",       "flag": "🇯🇵", "name_ja": "日本",              "code": "JP"},
    {"key": "uk",          "flag": "🇬🇧", "name_ja": "イギリス",          "code": "UK"},
    {"key": "switzerland", "flag": "🇨🇭", "name_ja": "スイス",            "code": "CH"},
    {"key": "australia",   "flag": "🇦🇺", "name_ja": "オーストラリア",    "code": "AU"},
    {"key": "newzealand",  "flag": "🇳🇿", "name_ja": "ニュージーランド",  "code": "NZ"},
    {"key": "canada",      "flag": "🇨🇦", "name_ja": "カナダ",            "code": "CA"},
    {"key": "sweden",      "flag": "🇸🇪", "name_ja": "スウェーデン",      "code": "SE"},
    {"key": "norway",      "flag": "🇳🇴", "name_ja": "ノルウェー",        "code": "NO"},
    # --- 地政学・新興地域 (new) ---
    {"key": "taiwan",      "flag": "🇹🇼", "name_ja": "台湾",              "code": "TW"},
    {"key": "hongkong",    "flag": "🇭🇰", "name_ja": "香港",              "code": "HK"},
    {"key": "china",       "flag": "🇨🇳", "name_ja": "中国",              "code": "CN"},
    {"key": "northkorea",  "flag": "🇰🇵", "name_ja": "北朝鮮",            "code": "KP"},
    {"key": "vietnam",     "flag": "🇻🇳", "name_ja": "ベトナム",          "code": "VN"},
    {"key": "singapore",   "flag": "🇸🇬", "name_ja": "シンガポール",      "code": "SG"},
    {"key": "iran",        "flag": "🇮🇷", "name_ja": "イラン",            "code": "IR"},
    {"key": "israel",      "flag": "🇮🇱", "name_ja": "イスラエル",        "code": "IL"},
]

# Number of leading G10 regions (the rest form the 地政学・新興地域 group).
G10_COUNT = 10

REGIONS_BY_KEY = {r["key"]: r for r in REGIONS}

# --------------------------------------------------------------------------- #
# CHAPTERS registry — 21 chapters. 01-20 mirror the existing G10 set;
# 21 地政学リスク is NEW for ALL 18 regions. filename = <num>_<slug>.html
# --------------------------------------------------------------------------- #
CHAPTERS = [
    {"num": "01", "slug": "central_bank",     "title_ja": "中央銀行",         "category": "金融政策"},
    {"num": "02", "slug": "policy_rate",      "title_ja": "政策金利",         "category": "金融政策"},
    {"num": "03", "slug": "fiscal_policy",    "title_ja": "財政政策",         "category": "マクロ"},
    {"num": "04", "slug": "employment",       "title_ja": "雇用",             "category": "マクロ"},
    {"num": "05", "slug": "inflation",        "title_ja": "インフレ",         "category": "マクロ"},
    {"num": "06", "slug": "equity_overview",  "title_ja": "株式市場概観",     "category": "株式"},
    {"num": "07", "slug": "equity_early",     "title_ja": "株式(初期)",       "category": "株式"},
    {"num": "08", "slug": "equity_modern",    "title_ja": "株式(近代)",       "category": "株式"},
    {"num": "09", "slug": "equity_recent",    "title_ja": "株式(現代)",       "category": "株式"},
    {"num": "10", "slug": "equity_current",   "title_ja": "株式(現在)",       "category": "株式"},
    {"num": "11", "slug": "bond_market",      "title_ja": "債券市場",         "category": "債券・金利・為替"},
    {"num": "12", "slug": "short_rates",      "title_ja": "短期金利",         "category": "債券・金利・為替"},
    {"num": "13", "slug": "long_rates",       "title_ja": "長期金利",         "category": "債券・金利・為替"},
    {"num": "14", "slug": "currency",         "title_ja": "通貨",             "category": "債券・金利・為替"},
    {"num": "15", "slug": "crises",           "title_ja": "金融危機",         "category": "金融制度"},
    {"num": "16", "slug": "banking",          "title_ja": "銀行制度",         "category": "金融制度"},
    {"num": "17", "slug": "corporate",        "title_ja": "企業・コーポレート", "category": "金融制度"},
    {"num": "18", "slug": "regulation",       "title_ja": "規制",             "category": "金融制度"},
    {"num": "19", "slug": "trade",            "title_ja": "貿易",             "category": "総括"},
    {"num": "20", "slug": "lessons",          "title_ja": "教訓",             "category": "総括"},
    {"num": "21", "slug": "geopolitical_risk", "title_ja": "地政学リスク",    "category": "地政学"},
]

CHAPTERS_BY_NUM = {c["num"]: c for c in CHAPTERS}


# --------------------------------------------------------------------------- #
# Helpers
# --------------------------------------------------------------------------- #
def get_region(region_key):
    if region_key not in REGIONS_BY_KEY:
        raise ValueError(
            "Unknown region_key %r. Valid keys: %s"
            % (region_key, ", ".join(r["key"] for r in REGIONS))
        )
    return REGIONS_BY_KEY[region_key]


def get_chapter(chap_num):
    chap_num = str(chap_num).zfill(2)
    if chap_num not in CHAPTERS_BY_NUM:
        raise ValueError(
            "Unknown chapter %r. Valid: %s"
            % (chap_num, ", ".join(c["num"] for c in CHAPTERS))
        )
    return CHAPTERS_BY_NUM[chap_num]


def chapter_filename(chap_num):
    c = get_chapter(chap_num)
    return "%s_%s.html" % (c["num"], c["slug"])


def _normalize_navlink(value):
    """Accept (href, label) tuple/list or {'href':..,'label':..} dict."""
    if value is None:
        return None
    if isinstance(value, dict):
        return value["href"], value["label"]
    if isinstance(value, (tuple, list)) and len(value) == 2:
        return value[0], value[1]
    raise ValueError("nav link must be (href, label) or {'href','label'}: %r" % (value,))


# --------------------------------------------------------------------------- #
# Sidebar
# --------------------------------------------------------------------------- #
def build_sidebar(region_key, chap_num):
    region = get_region(region_key)
    chap_num = str(chap_num).zfill(2)

    out = []
    out.append('  <nav class="sidebar">')
    out.append('    <div class="sidebar-header">')
    out.append('      <h2>G10 Markets</h2>')
    out.append('      <div class="subtitle">Historical Textbook</div>')
    out.append('    </div>')

    # Chapter list for the active region.
    out.append('    <div class="sidebar-section">')
    out.append('      <div class="sidebar-section-title">%s %s</div>'
               % (region["flag"], region["name_ja"]))
    for c in CHAPTERS:
        active = " active" if c["num"] == chap_num else ""
        out.append('      <a href="%s_%s.html" class="sidebar-link%s">%s. %s</a>'
                   % (c["num"], c["slug"], active, c["num"], c["title_ja"]))
    out.append('    </div>')

    # Country navigation — two groups: G10 + 地政学・新興地域.
    out.append('    <div class="sidebar-country-nav">')
    groups = [
        ("G10", REGIONS[:G10_COUNT]),
        ("地政学・新興地域", REGIONS[G10_COUNT:]),
    ]
    for title, members in groups:
        out.append('      <div class="sidebar-section-title">%s</div>' % title)
        out.append('      <div class="country-flags">')
        for r in members:
            active = " active" if r["key"] == region_key else ""
            out.append('        <a href="../%s/01_central_bank.html" class="country-chip%s">%s</a>'
                       % (r["key"], active, r["code"]))
        out.append('      </div>')
    out.append('    </div>')

    # Bottom utility links: home + cross-region timeline.
    out.append('    <div class="sidebar-section" style="margin-top:0.5rem; padding-top:0.5rem; border-top:1px solid var(--border-color);">')
    out.append('      <a href="../index.html" class="sidebar-link">🏠 ホーム</a>')
    out.append('      <a href="../summary/g10_timeline.html" class="sidebar-link">📊 G10横断年表</a>')
    out.append('    </div>')
    out.append('  </nav>')
    return "\n".join(out)


# --------------------------------------------------------------------------- #
# Page builder
# --------------------------------------------------------------------------- #
def build_page(region_key, chap_num, *, title_ja, title_en="", subtitle="",
               article_inner_html, extra_head="", sources_html="",
               prev=None, next=None):
    region = get_region(region_key)
    chap = get_chapter(chap_num)
    chap_num = chap["num"]
    region_name = region["name_ja"]

    # ---- <title> ----
    en = (title_en or "").strip()
    title_mid = en if en else title_ja
    doc_title = "%s - %s | G10 Markets Textbook" % (region_name, title_mid)

    # ---- prev / next defaults ----
    prev = _normalize_navlink(prev)
    next = _normalize_navlink(next)
    n = int(chap_num)
    if prev is None:
        if n <= 1:
            prev = ("../index.html", "ホーム")
        else:
            pc = CHAPTERS_BY_NUM["%02d" % (n - 1)]
            prev = ("%s_%s.html" % (pc["num"], pc["slug"]), pc["title_ja"])
    if next is None:
        if n >= len(CHAPTERS):
            next = ("../summary/g10_timeline.html", "G10横断年表")
        else:
            nc = CHAPTERS_BY_NUM["%02d" % (n + 1)]
            next = ("%s_%s.html" % (nc["num"], nc["slug"]), nc["title_ja"])

    # ---- subtitle line ----
    subtitle_html = ""
    if subtitle:
        subtitle_html = '\n      <p class="page-subtitle">%s</p>' % subtitle

    # ---- extra head ----
    extra_head_html = ("\n  " + extra_head.strip()) if extra_head.strip() else ""

    sidebar = build_sidebar(region_key, chap_num)

    html = """<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{doc_title}</title>
  <link rel="stylesheet" href="../assets/style.css">
  <script src="../assets/chart-builder.js"></script>
  <script defer src="../assets/charts.js"></script>{extra_head}
</head>
<body>

  <button class="menu-toggle" onclick="document.querySelector('.sidebar').classList.toggle('open')" aria-label="メニュー">☰</button>

{sidebar}

  <main class="content">
    <header>
      <div class="breadcrumb">
        <a href="../index.html">ホーム</a>
        <span class="sep">/</span>
        <a href="01_central_bank.html">{region_name}</a>
        <span class="sep">/</span>
        {chap_title}
      </div>
      <h1 class="page-title">{flag} {chap_title}</h1>{subtitle_html}
    </header>

    <article>
{article}
    </article>

    <footer class="sources">
      <h3>出典・参考文献</h3>
{sources}
    </footer>

    <nav class="page-nav">
      <a href="{prev_href}" class="prev">{prev_label}</a>
      <a href="{next_href}" class="next">{next_label}</a>
    </nav>
  </main>

  <script src="../assets/enhancer.js"></script>
  <script defer src="../assets/recall.js"></script>
  <script src="../assets/tts-reader.js"></script>
</body>
</html>
""".format(
        doc_title=doc_title,
        extra_head=extra_head_html,
        sidebar=sidebar,
        region_name=region_name,
        chap_title=title_ja,
        flag=region["flag"],
        subtitle_html=subtitle_html,
        article=article_inner_html,
        sources=sources_html,
        prev_href=prev[0], prev_label=prev[1],
        next_href=next[0], next_label=next[1],
    )
    return html


# --------------------------------------------------------------------------- #
# CLI: build a whole region from its _src/ folder
# --------------------------------------------------------------------------- #
def build_region(region_key, *, repo_root=REPO_ROOT, src_dir=None, out_dir=None):
    region = get_region(region_key)
    if src_dir is None:
        src_dir = os.path.join(repo_root, region_key, "_src")
    if out_dir is None:
        out_dir = os.path.join(repo_root, region_key)

    meta_path = os.path.join(src_dir, "_chapters.json")
    if not os.path.isfile(meta_path):
        raise SystemExit("ERROR: missing %s" % meta_path)

    with open(meta_path, "r", encoding="utf-8") as fh:
        meta = json.load(fh)
    # normalize keys to zero-padded 2-digit strings
    meta = {str(k).zfill(2): v for k, v in meta.items()}

    os.makedirs(out_dir, exist_ok=True)

    built = []
    skipped = []
    for chap in CHAPTERS:
        num = chap["num"]
        entry = meta.get(num)
        art_path = os.path.join(src_dir, "%s.html" % num)
        has_meta = entry is not None
        has_art = os.path.isfile(art_path)
        if not has_meta and not has_art:
            skipped.append((num, "no _chapters.json entry and no %s.html" % num))
            continue
        if not has_meta:
            skipped.append((num, "has %s.html but no _chapters.json entry" % num))
            continue
        if not has_art:
            skipped.append((num, "has _chapters.json entry but no %s.html" % num))
            continue

        with open(art_path, "r", encoding="utf-8") as fh:
            article_inner_html = fh.read()

        out_name = "%s_%s.html" % (num, chap["slug"])
        out_path = os.path.join(out_dir, out_name)
        html = build_page(
            region_key, num,
            title_ja=entry.get("title_ja", chap["title_ja"]),
            title_en=entry.get("title_en", ""),
            subtitle=entry.get("subtitle", ""),
            article_inner_html=article_inner_html,
            extra_head=entry.get("extra_head", ""),
            sources_html=entry.get("sources_html", ""),
            prev=entry.get("prev"),
            next=entry.get("next"),
        )
        with open(out_path, "w", encoding="utf-8") as fh:
            fh.write(html)
        built.append(out_name)

    print("[%s] built %d page(s) -> %s" % (region_key, len(built), out_dir))
    for name in built:
        print("  + %s" % name)
    for num, why in skipped:
        print("  - skip %s: %s" % (num, why))
    return built, skipped


# --------------------------------------------------------------------------- #
# Entry point
# --------------------------------------------------------------------------- #
def _main(argv):
    if len(argv) < 2:
        print(__doc__)
        return 1

    arg = argv[1]
    if arg == "--emit-sidebar":
        region_key = argv[2] if len(argv) > 2 else "us"
        chap_num = argv[3] if len(argv) > 3 else "01"
        print(build_sidebar(region_key, chap_num))
        return 0

    region_key = arg
    build_region(region_key)
    return 0


if __name__ == "__main__":
    sys.exit(_main(sys.argv))
