#!/usr/bin/env python3
"""Generate governor tenure gantt SVG and inject above '歴代' tables in 01_central_bank.html files."""
import os, re, sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

COUNTRIES = {
    "us": {
        "anchor": "<h2>歴代議長 (Fed Chairs)</h2>",
        "title": "Fed議長 在任期間ガントチャート (1979-2026)",
        "start": 1979, "end": 2026,
        "rows": [
            ("Volcker", 1979, 1987, "#ff6b6b"),
            ("Greenspan", 1987, 2006, "#00d4aa"),
            ("Bernanke", 2006, 2014, "#4ecdc4"),
            ("Yellen", 2014, 2018, "#ffd93d"),
            ("Powell", 2018, 2026, "#a78bfa"),
        ],
    },
    "japan": {
        "anchor": "<h2>歴代総裁（主要総裁）</h2>",
        "title": "BOJ総裁 在任期間ガントチャート (1984-2026)",
        "start": 1984, "end": 2026,
        "rows": [
            ("澄田 Sumita", 1984, 1989, "#ff6b6b"),
            ("三重野 Mieno", 1989, 1994, "#ff6b6b"),
            ("松下 Matsushita", 1994, 1998, "#4ecdc4"),
            ("速水 Hayami", 1998, 2003, "#4ecdc4"),
            ("福井 Fukui", 2003, 2008, "#00d4aa"),
            ("白川 Shirakawa", 2008, 2013, "#ffd93d"),
            ("黒田 Kuroda", 2013, 2023, "#a78bfa"),
            ("植田 Ueda", 2023, 2026, "#00d4aa"),
        ],
    },
    "eurozone": {
        "anchor": "<h2>歴代ECB総裁</h2>",
        "title": "ECB総裁 在任期間ガントチャート (1998-2026)",
        "start": 1998, "end": 2026,
        "rows": [
            ("Duisenberg", 1998, 2003, "#4ecdc4"),
            ("Trichet", 2003, 2011, "#ff6b6b"),
            ("Draghi", 2011, 2019, "#00d4aa"),
            ("Lagarde", 2019, 2026, "#a78bfa"),
        ],
    },
    "uk": {
        "anchor": "<h2>歴代総裁（近代以降の主要総裁）</h2>",
        "title": "BOE総裁 在任期間ガントチャート (1983-2026)",
        "start": 1983, "end": 2026,
        "rows": [
            ("Leigh-Pemberton", 1983, 1993, "#4ecdc4"),
            ("E. George", 1993, 2003, "#ff6b6b"),
            ("M. King", 2003, 2013, "#ff6b6b"),
            ("M. Carney", 2013, 2020, "#00d4aa"),
            ("A. Bailey", 2020, 2026, "#a78bfa"),
        ],
    },
    "switzerland": {
        "anchor": "<h2>歴代議長（Chairman of the Governing Board）</h2>",
        "title": "SNB議長 在任期間ガントチャート (2001-2026)",
        "start": 2001, "end": 2026,
        "rows": [
            ("J-P Roth", 2001, 2009, "#4ecdc4"),
            ("Hildebrand", 2010, 2012, "#ff6b6b"),
            ("T. Jordan", 2012, 2024, "#00d4aa"),
            ("M. Schlegel", 2024, 2026, "#a78bfa"),
        ],
    },
    "australia": {
        "anchor": "<h2>歴代総裁（Governor）</h2>",
        "title": "RBA総裁 在任期間ガントチャート (1989-2026)",
        "start": 1989, "end": 2026,
        "rows": [
            ("B. Fraser", 1989, 1996, "#4ecdc4"),
            ("I. Macfarlane", 1996, 2006, "#ff6b6b"),
            ("G. Stevens", 2006, 2016, "#00d4aa"),
            ("P. Lowe", 2016, 2023, "#ffd93d"),
            ("M. Bullock", 2023, 2026, "#a78bfa"),
        ],
    },
    "newzealand": {
        "anchor": "<h2>歴代総裁（Governor）</h2>",
        "title": "RBNZ総裁 在任期間ガントチャート (1988-2026)",
        "start": 1988, "end": 2026,
        "rows": [
            ("D. Brash", 1988, 2002, "#ff6b6b"),
            ("A. Bollard", 2002, 2012, "#4ecdc4"),
            ("G. Wheeler", 2012, 2017, "#00d4aa"),
            ("A. Orr", 2018, 2026, "#a78bfa"),
        ],
    },
    "canada": {
        "anchor": "<h2>歴代総裁 (Governors)</h2>",
        "title": "BoC総裁 在任期間ガントチャート (1987-2026)",
        "start": 1987, "end": 2026,
        "rows": [
            ("J. Crow", 1987, 1994, "#ff6b6b"),
            ("G. Thiessen", 1994, 2001, "#4ecdc4"),
            ("D. Dodge", 2001, 2008, "#00d4aa"),
            ("M. Carney", 2008, 2013, "#ffd93d"),
            ("S. Poloz", 2013, 2020, "#4ecdc4"),
            ("T. Macklem", 2020, 2026, "#a78bfa"),
        ],
    },
    "sweden": {
        "anchor": "<h2>歴代総裁 (Governors)</h2>",
        "title": "Riksbank総裁 在任期間ガントチャート (1994-2026)",
        "start": 1994, "end": 2026,
        "rows": [
            ("U. Bäckström", 1994, 2002, "#4ecdc4"),
            ("L. Heikensten", 2003, 2005, "#ff6b6b"),
            ("S. Ingves", 2006, 2022, "#00d4aa"),
            ("E. Thedéen", 2023, 2026, "#a78bfa"),
        ],
    },
    "norway": {
        "anchor": "<h2>歴代総裁 (Governors)</h2>",
        "title": "Norges Bank総裁 在任期間ガントチャート (1985-2026)",
        "start": 1985, "end": 2026,
        "rows": [
            ("H. Skånland", 1985, 1993, "#4ecdc4"),
            ("K. Storvik", 1994, 1998, "#ff6b6b"),
            ("S. Gjedrem", 1999, 2010, "#00d4aa"),
            ("Ø. Olsen", 2011, 2022, "#ffd93d"),
            ("I. Bache", 2022, 2026, "#a78bfa"),
        ],
    },
}

LABEL_W = 150
LEFT = 20
RIGHT = 780
PLOT_LEFT = LEFT + LABEL_W
PLOT_W = RIGHT - PLOT_LEFT
TOP = 50
ROW_H = 28
BAR_H = 18

def build_svg(cfg):
    start, end = cfg["start"], cfg["end"]
    rows = cfg["rows"]
    height = TOP + len(rows) * ROW_H + 50

    def x(year):
        return PLOT_LEFT + (year - start) / (end - start) * PLOT_W

    parts = []
    parts.append(f'<svg class="svg-chart" viewBox="0 0 800 {height}" preserveAspectRatio="xMidYMid meet">')
    parts.append(f'  <text x="400" y="24" text-anchor="middle" fill="#e6e6e6" font-size="14" font-weight="600">{cfg["title"]}</text>')
    # vertical gridlines every 5 years
    parts.append('  <g class="chart-grid" stroke="rgba(255,255,255,0.08)" stroke-width="1">')
    y0 = TOP - 6
    y1 = TOP + len(rows) * ROW_H + 4
    yr = start - (start % 5)
    if yr < start:
        yr += 5
    while yr <= end:
        gx = x(yr)
        parts.append(f'    <line x1="{gx:.1f}" y1="{y0}" x2="{gx:.1f}" y2="{y1}" />')
        yr += 5
    parts.append('  </g>')
    # bars + labels
    for i, (name, s, e, color) in enumerate(rows):
        ry = TOP + i * ROW_H
        bx = x(s)
        bw = max(2, x(e) - x(s))
        parts.append(f'  <text x="{PLOT_LEFT - 8}" y="{ry + BAR_H/2 + 4:.1f}" text-anchor="end" fill="#cfcfcf" font-size="11">{name}</text>')
        parts.append(f'  <rect x="{bx:.1f}" y="{ry}" width="{bw:.1f}" height="{BAR_H}" rx="3" fill="{color}" opacity="0.85"/>')
        parts.append(f'  <text x="{bx + 4:.1f}" y="{ry + BAR_H/2 + 4:.1f}" fill="#0a0e27" font-size="10" font-weight="600">{s}-{e}</text>')
    # x-axis ticks
    parts.append('  <g class="chart-axis" fill="#888" font-size="10">')
    yr = start - (start % 5)
    if yr < start:
        yr += 5
    while yr <= end:
        gx = x(yr)
        parts.append(f'    <text x="{gx:.1f}" y="{y1 + 14}" text-anchor="middle">{yr}</text>')
        yr += 5
    parts.append('  </g>')
    parts.append('</svg>')

    figure = (
        '<figure class="chart-figure">\n'
        f'  <figcaption class="chart-title">{cfg["title"]}</figcaption>\n  '
        + '\n  '.join(parts) +
        '\n  <p class="chart-caption">出典: 各国中央銀行公式サイト。各バーは在任期間（年）を表す。</p>\n'
        '</figure>\n'
    )
    return figure

def main():
    for country, cfg in COUNTRIES.items():
        path = os.path.join(ROOT, country, "01_central_bank.html")
        with open(path, "r", encoding="utf-8") as f:
            content = f.read()
        anchor = cfg["anchor"]
        if anchor not in content:
            print(f"SKIP {country}: anchor not found")
            continue
        if "在任期間ガントチャート" in content:
            print(f"SKIP {country}: already has gantt")
            continue
        fig = build_svg(cfg)
        new = content.replace(anchor, fig + "      " + anchor, 1)
        with open(path, "w", encoding="utf-8") as f:
            f.write(new)
        print(f"OK {country}")

if __name__ == "__main__":
    main()
