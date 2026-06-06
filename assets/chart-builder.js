/**
 * G10 Textbook — Chart Builder (interactive)
 * Reusable multi-line SVG chart generator for yields, spreads & compound returns.
 * Bloomberg dark theme. No dependencies. file:// safe.
 *
 * Usage:
 *   ChartBuilder.lines('container-id', { title, series, ... })
 *   ChartBuilder.compound('container-id', { title, series, ... })
 *   ChartBuilder.spread('container-id', { title, long, short, spreadName, ... })
 *
 * Series format (monthly):
 *   { name: '10Y', color: '#00d4aa', start: 2000.0, step: 1/12, values: [6.66, 6.52, ...] }
 * Series format (sparse):
 *   { name: '10Y', color: '#00d4aa', data: [[2000.0, 6.66], [2000.083, 6.52], ...] }
 *
 * Optional cfg extensions (all backward compatible):
 *   annotations: [{ year|x, label, color?, href? }]   href deep-links to a textbook page
 *   bands:       [{ from, to, label?, color? }]       translucent era/regime background rects
 *   endLabels:   true|false                            end-value pills (default: series <= 3)
 *
 * Interactivity (added automatically after render):
 *   - hover/touch crosshair snapping to nearest data month + tooltip with per-series values
 *   - legend click toggles a series on/off
 *
 * RESOLUTION LIMIT (tooltip): the crosshair/tooltip indexes points by MONTH key
 * (Math.round(x * 12)), so hover resolution is MONTHLY. Sub-monthly data (daily/
 * weekly x values) collapses onto the same month key — only the last point per
 * series per month survives in the tooltip. The drawn lines are unaffected
 * (every supplied point is rendered); this limit applies to hover lookup only.
 */
var ChartBuilder = (function () {
  'use strict';

  var COLORS = ['#00d4aa','#ff6b6b','#5b8def','#ffd93d','#ff9f43','#4ecdc4','#e066ff','#74c0fc','#a0d468','#d770ad'];
  var W = 800, H = 420;
  var PAD = { t: 48, r: 28, b: 44, l: 58 };

  /* Module-level registry: containerId -> live chart state (el, svg, cfg, scales, indexes) */
  var registry = {};

  /* ---- helpers ---- */
  function esc(s) { return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;'); }
  function escAttr(s) { return esc(s).replace(/"/g,'&quot;'); }

  /* Only #hex or rgb()/rgba() colors may be interpolated into SVG attributes
   * (attribute-injection hardening); anything else falls back to the default. */
  var COLOR_RE = /^(#[0-9a-fA-F]{3,8}|rgba?\([\d.,\s%]+\))$/;
  function safeColor(c, fallback) {
    return (typeof c === 'string' && COLOR_RE.test(c)) ? c : fallback;
  }
  function fmt(n, decimals) {
    if (Math.abs(n) >= 1e6) return (n / 1e6).toFixed(1) + 'M';
    if (Math.abs(n) >= 1e4) return (n / 1e3).toFixed(0) + 'k';
    if (Math.abs(n) >= 1e3) return (n / 1e3).toFixed(1) + 'k';
    return decimals !== undefined ? n.toFixed(decimals) : (n % 1 === 0 ? String(n) : n.toFixed(1));
  }

  /* Compact value for tooltips / end pills: 0-2 decimals depending on magnitude */
  function fmtVal(v) {
    var a = Math.abs(v);
    if (a >= 1e4) return fmt(v);
    if (a >= 100) return v.toFixed(0);
    if (a >= 10) return v.toFixed(1);
    return v.toFixed(2);
  }
  function valLabel(v, yUnit) {
    if (yUnit === '$') return '$' + fmtVal(v);
    return fmtVal(v) + (yUnit || '');
  }

  /* Estimate rendered text width: CJK chars ~ fontSize px, ASCII ~ 0.56 * fontSize px */
  function estTextWidth(str, fontSize) {
    var w = 0;
    str = String(str);
    for (var i = 0; i < str.length; i++) {
      w += str.charCodeAt(i) > 0x2E7F ? fontSize : fontSize * 0.56;
    }
    return w;
  }

  function niceStep(range, targetTicks) {
    /* degenerate/invalid range guard: a 0/negative/non-finite range would return
     * a step of 0 and make the grid-line for-loops never terminate (page freeze) */
    if (!(range > 0) || !isFinite(range)) return 1;
    var rough = range / targetTicks;
    var mag = Math.pow(10, Math.floor(Math.log10(rough)));
    var res = rough / mag;
    if (res <= 1.5) return mag;
    if (res <= 3) return 2 * mag;
    if (res <= 7) return 5 * mag;
    return 10 * mag;
  }

  /* Expand {start, step, values} or {data} to [[year,val],...] */
  function expandSeries(s) {
    if (Array.isArray(s.data)) {
      /* drop null/undefined pairs (sparse gaps) — they would corrupt the
       * y-range (null coerces to 0) and crash the tooltip formatter */
      return s.data.filter(function (p) { return p && p[1] !== null && p[1] !== undefined; });
    }
    var out = [];
    var step = s.step || 1;
    for (var i = 0; i < s.values.length; i++) {
      if (s.values[i] !== null && s.values[i] !== undefined) {
        out.push([s.start + i * step, s.values[i]]);
      }
    }
    return out;
  }

  /* Compute nice x-axis step based on span */
  function xAxisStep(span) {
    if (span <= 5) return 1;
    if (span <= 12) return 2;
    if (span <= 20) return 5;
    if (span <= 40) return 10;
    if (span <= 80) return 15;
    return 20;
  }

  /* ---- one-time injected styles (kept out of assets/style.css on purpose) ---- */
  function ensureStyles() {
    if (document.getElementById('cb-styles')) return;
    var st = document.createElement('style');
    st.id = 'cb-styles';
    st.textContent =
      '.svg-chart{touch-action:pan-y;-webkit-tap-highlight-color:rgba(0,0,0,0);user-select:none;-webkit-user-select:none}' +
      '.cb-legend-item{cursor:pointer}' +
      '.cb-legend-item.cb-off{opacity:.35}' +
      '.cb-series.cb-off{opacity:.12}' +
      '.cb-endpill.cb-off{opacity:0}' +
      '.cb-hover{pointer-events:none}' +
      '.cb-ann-link{cursor:pointer}';
    (document.head || document.documentElement).appendChild(st);
  }

  /* ---- era/regime background bands (drawn BEHIND grid and lines) ---- */
  function renderBands(bands, sx, xMin, xMax, plotH) {
    var out = '<g class="cb-bands">';
    bands.forEach(function (b) {
      var x1 = Math.max(b.from, xMin);
      var x2 = Math.min(b.to, xMax);
      if (!(x2 > x1)) return; /* fully outside xRange */
      var X1 = sx(x1), X2 = sx(x2);
      var fill = safeColor(b.color, '#5b8def');
      var op = b.color ? 0.10 : 0.07;
      out += '<rect x="' + X1.toFixed(1) + '" y="' + PAD.t + '" width="' + (X2 - X1).toFixed(1) +
             '" height="' + plotH + '" fill="' + fill + '" fill-opacity="' + op + '"/>';
      if (b.label) {
        out += '<text x="' + (X1 + 4).toFixed(1) + '" y="' + (PAD.t + 11) +
               '" fill="rgba(255,255,255,0.40)" font-size="9">' + esc(b.label) + '</text>';
      }
    });
    out += '</g>';
    return out;
  }

  /* ---- annotation engine ----
   * - annotations whose x falls outside the plot are skipped entirely (line AND
   *   label) with a 2px tolerance, so the tiny float overshoot of monthly
   *   end-points (e.g. annotation 2026.167 vs data ending 2026.1666) still draws
   * - alternating above/below placement (even index above the plot top, odd below)
   * - 10px labels on a dark bg rect sized for CJK text (estTextWidth)
   * - same-side labels within 80px horizontally are stacked vertically in 12px steps
   * - COLLISION FIX: in addition to the 80px x-proximity rule, the POST-CLAMP label
   *   rects [rx, rx+w] are interval-tested against already-placed same-side rects
   *   on the same level — edge-clamped labels can never share a slot
   * - top-side labels stack upward (40, 28, 16); a level that would leave the
   *   viewBox top (ty < 11) continues DOWNWARD into the plot instead of
   *   collapsing onto y=11
   * - BOTTOM-LABEL FIX: bottom labels are placed INSIDE the plot just above the x-axis
   *   (y = PAD.t + plotH - 8, stacking upward), so they can never collide with the
   *   x-axis tick labels rendered below the axis at y = PAD.t + plotH + 16.
   * - label rects are x-clamped so they never spill outside the 800px viewBox
   * - optional href wraps marker + label in <a> for deep-linking to textbook pages
   */
  function renderAnnotations(annotations, sx, plotH) {
    var plotW = W - PAD.l - PAD.r;
    var placedTop = [], placedBot = [];
    /* top-side y for a stack level: upward while it fits, then down into the plot */
    function topY(level) {
      var ty = PAD.t - 8 - level * 12;
      if (ty >= 11) return ty;
      var over = Math.ceil((11 - ty) / 12);
      return PAD.t - 8 + over * 12;
    }
    var out = '<g class="chart-annotation" font-size="10">';
    annotations.forEach(function (a, ai) {
      var ax = sx(a.year !== undefined ? a.year : a.x);
      /* skip out-of-range annotations entirely (<=2px float overshoot allowed) */
      if (!isFinite(ax) || ax < PAD.l - 2 || ax > PAD.l + plotW + 2) return;
      var above = ai % 2 === 0;
      var col = safeColor(a.color, '#ff6b6b');
      var label = a.label || '';
      var w = estTextWidth(label, 10) + 6; /* ~3px padding each side */
      var rx = ax - w / 2;
      if (rx < 2) rx = 2;
      if (rx + w > W - 2) rx = W - 2 - w;
      var placed = above ? placedTop : placedBot;
      var level = 0;
      placed.forEach(function (pp) {
        if (Math.abs(ax - pp.x) < 80 && pp.level >= level) level = pp.level + 1;
      });
      /* bump further while the post-clamp rect intersects an already-placed
       * same-side rect on the same level (catches edge-clamped collisions) */
      var clash = true;
      while (clash) {
        clash = false;
        for (var pi = 0; pi < placed.length; pi++) {
          var pp = placed[pi];
          if (pp.level === level && rx < pp.rx + pp.w && pp.rx < rx + w) {
            level++; clash = true; break;
          }
        }
      }
      placed.push({ x: ax, level: level, rx: rx, w: w });
      var ty = above ? topY(level) : (PAD.t + plotH - 8 - level * 12);
      var tx = rx + w / 2;
      var grp = '<line x1="' + ax.toFixed(1) + '" y1="' + PAD.t + '" x2="' + ax.toFixed(1) +
                '" y2="' + (PAD.t + plotH) + '" stroke="' + col +
                '" stroke-width="1" stroke-dasharray="3,3" opacity="0.5"/>';
      grp += '<rect x="' + rx.toFixed(1) + '" y="' + (ty - 9) + '" width="' + w.toFixed(1) +
             '" height="12" rx="2" fill="rgba(15,15,30,0.85)"/>';
      grp += '<text x="' + tx.toFixed(1) + '" y="' + ty + '" text-anchor="middle" fill="' + col +
             '" font-size="10" font-weight="600">' + esc(label) + '</text>';
      if (a.href) grp = '<a href="' + escAttr(a.href) + '" class="cb-ann-link">' + grp + '</a>';
      out += grp;
    });
    out += '</g>';
    return out;
  }

  /* ---- end-value pills (series final value at the right edge) ---- */
  function renderEndPills(pills, plotH) {
    if (!pills.length) return '';
    pills.sort(function (a, b) { return a.y - b.y; });
    var minY = PAD.t + 9, maxY = PAD.t + plotH - 1;
    pills.forEach(function (p) {
      if (p.y < minY) p.y = minY;
      if (p.y > maxY) p.y = maxY;
    });
    /* nudge apart vertically (17px slots), forward then reverse pass */
    for (var i = 1; i < pills.length; i++) {
      if (pills[i].y < pills[i - 1].y + 17) pills[i].y = pills[i - 1].y + 17;
    }
    var limit = maxY;
    for (var j = pills.length - 1; j >= 0; j--) {
      if (pills[j].y > limit) pills[j].y = limit;
      limit = pills[j].y - 17;
    }
    var out = '<g class="cb-endpills" font-size="10">';
    pills.forEach(function (p) {
      var w = estTextWidth(p.txt, 10) + 10;
      var px = p.x + 5;
      if (px + w > W - 1) px = W - 1 - w; /* clamp inside viewBox */
      out += '<g class="cb-endpill" data-si="' + p.si + '">';
      out += '<rect x="' + px.toFixed(1) + '" y="' + (p.y - 8).toFixed(1) + '" width="' + w.toFixed(1) +
             '" height="16" rx="8" fill="' + p.color + '"/>';
      out += '<text x="' + (px + w / 2).toFixed(1) + '" y="' + (p.y + 3.5).toFixed(1) +
             '" text-anchor="middle" fill="#10102a" font-weight="700">' + esc(p.txt) + '</text>';
      out += '</g>';
    });
    out += '</g>';
    return out;
  }

  /* ---- interactivity index: month-key (round(x*12)) lookup per series ---- */
  function buildIndex(seriesPtsList, xMin, xMax) {
    var keyX = {}, keys = [], maps = [];
    seriesPtsList.forEach(function (pts) {
      var m = {};
      pts.forEach(function (pt) {
        if (pt[0] < xMin - 1e-9 || pt[0] > xMax + 1e-9) return;
        var k = Math.round(pt[0] * 12);
        m[k] = pt[1];
        if (keyX[k] === undefined) { keyX[k] = pt[0]; keys.push(k); }
      });
      maps.push(m);
    });
    keys.sort(function (a, b) { return a - b; });
    var minGap = Infinity;
    for (var i = 1; i < keys.length; i++) {
      var g = keys[i] - keys[i - 1];
      if (g < minGap) minGap = g;
    }
    /* annual = sparse data spaced >= 12 months (or a single point) */
    return { keys: keys, keyX: keyX, maps: maps, annual: minGap >= 12 };
  }

  function nearestKey(keys, target) {
    var hi = keys.length - 1;
    if (target <= keys[0]) return keys[0];
    if (target >= keys[hi]) return keys[hi];
    var lo = 0;
    while (lo + 1 < hi) {
      var mid = (lo + hi) >> 1;
      if (keys[mid] <= target) lo = mid; else hi = mid;
    }
    return (target - keys[lo] <= keys[hi] - target) ? keys[lo] : keys[hi];
  }

  function formatXKey(key, annual) {
    var year = Math.floor(key / 12);
    var month = key - year * 12 + 1;
    if (annual) return year + '\u5E74';                      /* YYYY\u5E74 */
    return year + '\u5E74' + month + '\u6708';               /* YYYY\u5E74M\u6708 */
  }

  /* Build crosshair + highlight circles + tooltip for the hovered month key */
  function buildHoverContent(state, key, p) {
    var snapX = state.sx(state.keyX[key]);
    var out = '<line x1="' + snapX.toFixed(1) + '" y1="' + PAD.t + '" x2="' + snapX.toFixed(1) +
              '" y2="' + (PAD.t + state.plotH) + '" stroke="rgba(255,255,255,0.35)" stroke-width="1" stroke-dasharray="2,3"/>';

    var rows = [];
    state.seriesInfo.forEach(function (s, si) {
      if (state.hidden[si]) return; /* toggled-off series excluded */
      var v = s.map[key];
      if (v === undefined) return;
      var cy = state.sy(v);
      if (cy >= PAD.t - 3 && cy <= PAD.t + state.plotH + 3) {
        out += '<circle cx="' + snapX.toFixed(1) + '" cy="' + cy.toFixed(1) +
               '" r="4.5" fill="rgba(15,15,30,0.85)" stroke="' + s.color + '" stroke-width="2"/>';
      }
      rows.push({ color: s.color, text: s.name + '  ' + valLabel(v, state.yUnit) });
    });
    /* extra tooltip-only rows (spread chart: long/short legs) */
    (state.extraRows || []).forEach(function (s) {
      var v = s.map[key];
      if (v === undefined) return;
      rows.push({ color: s.color, text: s.name + '  ' + valLabel(v, state.yUnit) });
    });
    if (!rows.length) return out;

    var header = formatXKey(key, state.annual);
    var tw = estTextWidth(header, 11) + 6;
    rows.forEach(function (r) {
      var rw = 14 + estTextWidth(r.text, 11);
      if (rw > tw) tw = rw;
    });
    var boxW = tw + 16;
    var boxH = 24 + rows.length * 15;
    var bx = snapX + 12;
    if (bx + boxW > W - 4) bx = snapX - 12 - boxW; /* flip to left near right edge */
    if (bx < 2) bx = 2;
    var by = p.y - boxH - 14;
    if (by < 2) by = p.y + 18;
    if (by + boxH > H - 2) by = H - 2 - boxH;
    if (by < 2) by = 2;

    out += '<rect x="' + bx.toFixed(1) + '" y="' + by.toFixed(1) + '" width="' + boxW.toFixed(1) +
           '" height="' + boxH + '" rx="5" fill="rgba(15,15,30,0.92)" stroke="rgba(255,255,255,0.15)" stroke-width="1"/>';
    out += '<text x="' + (bx + 8).toFixed(1) + '" y="' + (by + 15).toFixed(1) +
           '" fill="#e0e0e0" font-size="11" font-weight="700">' + esc(header) + '</text>';
    rows.forEach(function (r, i) {
      var ry = by + 31 + i * 15;
      out += '<rect x="' + (bx + 8).toFixed(1) + '" y="' + (ry - 8).toFixed(1) +
             '" width="8" height="8" rx="2" fill="' + r.color + '"/>';
      out += '<text x="' + (bx + 20).toFixed(1) + '" y="' + ry.toFixed(1) +
             '" fill="#e0e0e0" font-size="11">' + esc(r.text) + '</text>';
    });
    return out;
  }

  /* ---- interactivity: crosshair tooltip + legend toggle ---- */
  function attachInteractivity(containerId, state) {
    ensureStyles();
    var svgEl = state.el.querySelector('svg.svg-chart');
    if (!svgEl || !state.keys.length) return;
    state.svg = svgEl;
    registry[containerId] = state;

    var hover = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    hover.setAttribute('class', 'cb-hover');
    hover.setAttribute('pointer-events', 'none');
    hover.style.display = 'none';
    svgEl.appendChild(hover);
    state.hover = hover;

    /* client coords -> viewBox coords.
     * viewBox is '0 0 800 420' with preserveAspectRatio='xMidYMid meet' and CSS
     * width:100%, so content is uniformly scaled and letterboxed (centered):
     *   scale   = min(rect.w/800, rect.h/420)
     *   offsetX = (rect.w - 800*scale)/2, offsetY = (rect.h - 420*scale)/2
     */
    function toViewBox(evt) {
      var rect = svgEl.getBoundingClientRect();
      var scale = Math.min(rect.width / W, rect.height / H);
      if (!scale || !isFinite(scale)) return null; /* hidden / zero-size guard */
      var offX = (rect.width - W * scale) / 2;
      var offY = (rect.height - H * scale) / 2;
      return {
        x: (evt.clientX - rect.left - offX) / scale,
        y: (evt.clientY - rect.top - offY) / scale
      };
    }

    function onMove(evt) {
      var p = toViewBox(evt);
      if (!p || p.x < PAD.l - 8 || p.x > PAD.l + state.plotW + 8 || p.y < 0 || p.y > H) {
        hover.style.display = 'none';
        return;
      }
      var dataX = state.xMin + ((p.x - PAD.l) / state.plotW) * (state.xMax - state.xMin);
      var key = nearestKey(state.keys, dataX * 12);
      hover.innerHTML = buildHoverContent(state, key, p);
      hover.style.display = '';
    }

    /* pointer events cover mouse + touch (tap/drag shows, leave hides) */
    svgEl.addEventListener('pointermove', onMove);
    svgEl.addEventListener('pointerdown', onMove);
    svgEl.addEventListener('pointerleave', function () { hover.style.display = 'none'; });

    /* legend click-to-toggle (delegated) */
    svgEl.addEventListener('click', function (evt) {
      var t = evt.target;
      var item = (t && t.closest) ? t.closest('.cb-legend-item') : null;
      if (!item) return;
      var si = item.getAttribute('data-si');
      if (si === null) return;
      state.hidden[si] = !state.hidden[si];
      var off = state.hidden[si];
      var nodes = svgEl.querySelectorAll('[data-si="' + si + '"]');
      for (var i = 0; i < nodes.length; i++) {
        if (off) nodes[i].classList.add('cb-off');
        else nodes[i].classList.remove('cb-off');
      }
      hover.style.display = 'none';
    });
  }

  /* Render legend items, wrapping to multiple rows if needed. Click toggles series. */
  function renderLegend(series, plotW) {
    var svg = '';
    var legX = PAD.l + 8;
    var legY = PAD.t + 14;
    var maxItemW = 120;
    var itemsPerRow = Math.max(1, Math.floor(plotW / maxItemW));

    svg += '<g font-size="11" class="cb-legend">';
    series.forEach(function (s, idx) {
      var color = safeColor(s.color, COLORS[idx % COLORS.length]);
      var row = Math.floor(idx / itemsPerRow);
      var col = idx % itemsPerRow;
      var itemW = Math.min(plotW / Math.min(series.length, itemsPerRow), maxItemW);
      var x = legX + col * itemW;
      var y = legY + row * 16;
      svg += '<g class="cb-legend-item" data-si="' + idx + '">';
      /* invisible hit area for easier clicks/taps */
      svg += '<rect x="' + (x - 2) + '" y="' + (y - 11) + '" width="' + (itemW - 4).toFixed(0) +
             '" height="15" fill="rgba(0,0,0,0)" pointer-events="all"/>';
      svg += '<rect x="' + x + '" y="' + (y - 7) + '" width="14" height="3" rx="1" fill="' + color + '"/>';
      svg += '<text x="' + (x + 18) + '" y="' + y + '" fill="' + color + '" font-size="10" font-weight="600">' + esc(s.name) + '</text>';
      svg += '</g>';
    });
    svg += '</g>';
    return svg;
  }

  /* ---- core line renderer ---- */
  function renderLines(containerId, cfg) {
    var el = document.getElementById(containerId);
    if (!el) return;

    var plotW = W - PAD.l - PAD.r;
    var plotH = H - PAD.t - PAD.b;
    var logY = cfg.logScale || false;

    /* Expand & collect ranges */
    var expanded = [];
    var xMin = Infinity, xMax = -Infinity, yMin = Infinity, yMax = -Infinity;
    cfg.series.forEach(function (s) {
      var pts = expandSeries(s);
      expanded.push(pts);
      pts.forEach(function (d) {
        if (d[0] < xMin) xMin = d[0];
        if (d[0] > xMax) xMax = d[0];
        if (d[1] < yMin) yMin = d[1];
        if (d[1] > yMax) yMax = d[1];
      });
    });

    /* Degenerate-range guards: empty/all-null series leave Infinity bounds */
    if (!isFinite(xMin) || !isFinite(xMax)) { xMin = 0; xMax = 1; }
    if (!isFinite(yMin) || !isFinite(yMax)) { yMin = 0; yMax = 1; }

    if (cfg.xRange) { xMin = cfg.xRange[0]; xMax = cfg.xRange[1]; }
    /* single-point / constant-x guard: avoid 0-division in sx */
    if (!(xMax > xMin)) xMax = xMin + 1;
    if (cfg.yRange) { yMin = cfg.yRange[0]; yMax = cfg.yRange[1]; }
    else {
      var pad = (yMax - yMin) * 0.08;
      yMin = Math.floor((yMin - pad) * 2) / 2;
      yMax = Math.ceil((yMax + pad) * 2) / 2;
      if (yMin < 0 && cfg.yUnit === '%') yMin = Math.min(yMin, -1);
    }
    /* constant-series guard: yMin===yMax after rounding would freeze the
     * grid loops (step 0) and NaN the y-scale */
    if (!(yMax > yMin)) yMax = yMin + 1;

    function sx(x) { return PAD.l + ((x - xMin) / (xMax - xMin)) * plotW; }
    function sy(y) {
      if (logY) {
        var lo = Math.log10(Math.max(yMin, 1));
        var hi = Math.log10(Math.max(yMax, 1));
        if (hi - lo < 1e-9) hi = lo + 1; /* all values < 1 -> degenerate log range */
        return PAD.t + plotH - ((Math.log10(Math.max(y, 1)) - lo) / (hi - lo)) * plotH;
      }
      return PAD.t + plotH - ((y - yMin) / (yMax - yMin)) * plotH;
    }

    var colors = cfg.series.map(function (s, idx) { return safeColor(s.color, COLORS[idx % COLORS.length]); });
    var sortedSeries = expanded.map(function (pts) {
      return pts.slice().sort(function (a, b) { return a[0] - b[0]; });
    });

    var svg = '';

    /* Era/regime bands (behind everything) */
    if (cfg.bands && cfg.bands.length) {
      svg += renderBands(cfg.bands, sx, xMin, xMax, plotH);
    }

    /* Grid (ignore cfg.yStep unless > 0 — 0/negative steps never terminate) */
    var yStep = cfg.yStep > 0 ? cfg.yStep : niceStep(yMax - yMin, 5);
    svg += '<g class="chart-grid">';
    svg += '<line x1="'+PAD.l+'" y1="'+PAD.t+'" x2="'+PAD.l+'" y2="'+(PAD.t+plotH)+'" stroke="rgba(255,255,255,0.15)"/>';
    svg += '<line x1="'+PAD.l+'" y1="'+(PAD.t+plotH)+'" x2="'+(PAD.l+plotW)+'" y2="'+(PAD.t+plotH)+'" stroke="rgba(255,255,255,0.15)"/>';
    if (!logY) {
      for (var yv = yMin; yv <= yMax + 0.001; yv += yStep) {
        var yy = sy(yv);
        if (yy >= PAD.t - 1 && yy <= PAD.t + plotH + 1) {
          svg += '<line x1="'+PAD.l+'" y1="'+yy.toFixed(1)+'" x2="'+(PAD.l+plotW)+'" y2="'+yy.toFixed(1)+'" stroke="rgba(255,255,255,0.06)"/>';
        }
      }
    } else {
      var logSteps = [1, 10, 100, 1000, 10000, 100000, 1000000];
      logSteps.forEach(function (lv) {
        if (lv >= yMin && lv <= yMax) {
          var yy = sy(lv);
          svg += '<line x1="'+PAD.l+'" y1="'+yy.toFixed(1)+'" x2="'+(PAD.l+plotW)+'" y2="'+yy.toFixed(1)+'" stroke="rgba(255,255,255,0.06)"/>';
        }
      });
    }
    svg += '</g>';

    /* Y-axis labels */
    svg += '<g fill="rgba(255,255,255,0.6)" font-size="10" font-family="' + '-apple-system,sans-serif">';
    if (!logY) {
      for (var yv2 = yMin; yv2 <= yMax + 0.001; yv2 += yStep) {
        var yy2 = sy(yv2);
        if (yy2 >= PAD.t - 1 && yy2 <= PAD.t + plotH + 1) {
          var label = fmt(yv2, yv2 % 1 !== 0 ? 1 : 0);
          if (cfg.yUnit) label += cfg.yUnit;
          svg += '<text x="'+(PAD.l-6)+'" y="'+(yy2+3.5).toFixed(1)+'" text-anchor="end" font-size="10">'+esc(label)+'</text>';
        }
      }
    } else {
      [1,10,100,1000,10000,100000].forEach(function (lv) {
        if (lv >= yMin && lv <= yMax) {
          var yy = sy(lv);
          var lbl = cfg.yUnit === '$' ? '$'+fmt(lv) : fmt(lv);
          svg += '<text x="'+(PAD.l-6)+'" y="'+(yy+3.5).toFixed(1)+'" text-anchor="end" font-size="10">'+esc(lbl)+'</text>';
        }
      });
    }
    svg += '</g>';

    /* X-axis labels */
    var xSpan = xMax - xMin;
    var xStep = cfg.xStep || xAxisStep(xSpan);
    var xStart = Math.ceil(xMin / xStep) * xStep;
    svg += '<g fill="rgba(255,255,255,0.6)" font-size="10">';
    for (var xv = xStart; xv <= xMax; xv += xStep) {
      svg += '<text x="'+sx(xv).toFixed(1)+'" y="'+(PAD.t+plotH+16)+'" text-anchor="middle">'+xv+'</text>';
    }
    if (xMax - Math.floor(xMax / xStep) * xStep > xStep * 0.3) {
      svg += '<text x="'+sx(xMax).toFixed(1)+'" y="'+(PAD.t+plotH+16)+'" text-anchor="end">'+Math.round(xMax)+'</text>';
    }
    svg += '</g>';

    /* Lines */
    sortedSeries.forEach(function (sorted, idx) {
      var s = cfg.series[idx];
      var color = colors[idx];
      var d = '';
      sorted.forEach(function (p, i) {
        d += (i === 0 ? 'M' : 'L') + sx(p[0]).toFixed(1) + ',' + sy(p[1]).toFixed(1) + ' ';
      });
      var width = s.width || 1.8;
      svg += '<path class="cb-series" data-si="'+idx+'" d="'+d.trim()+'" fill="none" stroke="'+color+'" stroke-width="'+width+'" stroke-linejoin="round" stroke-linecap="round" opacity="'+(s.opacity||1)+'"/>';
    });

    /* Legend */
    svg += renderLegend(cfg.series, plotW);

    /* Annotations */
    if (cfg.annotations) {
      svg += renderAnnotations(cfg.annotations, sx, plotH);
    }

    /* End-value pills (default on for <= 3 series) */
    var showEnd = cfg.endLabels === undefined ? cfg.series.length <= 3 : !!cfg.endLabels;
    if (showEnd) {
      var pills = [];
      sortedSeries.forEach(function (pts, idx) {
        var last = null;
        for (var i = pts.length - 1; i >= 0; i--) {
          if (pts[i][0] <= xMax + 1e-9 && pts[i][0] >= xMin - 1e-9) { last = pts[i]; break; }
        }
        if (!last) return;
        pills.push({ si: idx, color: colors[idx], x: sx(last[0]), y: sy(last[1]), txt: valLabel(last[1], cfg.yUnit || '') });
      });
      svg += renderEndPills(pills, plotH);
    }

    /* Wrap (accessible: role=img + aria-label) */
    svg = '<svg class="svg-chart" viewBox="0 0 '+W+' '+H+'" preserveAspectRatio="xMidYMid meet" role="img" aria-label="'+escAttr(cfg.title || 'chart')+'">' + svg + '</svg>';

    var html = '<figure class="chart-figure">';
    if (cfg.title) html += '<figcaption class="chart-title">' + esc(cfg.title) + '</figcaption>';
    html += svg;
    if (cfg.caption) html += '<p class="chart-caption">' + esc(cfg.caption) + '</p>';
    html += '</figure>';

    el.innerHTML = html;

    /* Interactivity state + handlers */
    var index = buildIndex(sortedSeries, xMin, xMax);
    attachInteractivity(containerId, {
      el: el, cfg: cfg, kind: 'lines',
      seriesPts: sortedSeries,
      seriesInfo: cfg.series.map(function (s, idx) {
        return { name: s.name, color: colors[idx], map: index.maps[idx] };
      }),
      keys: index.keys, keyX: index.keyX, annual: index.annual,
      xMin: xMin, xMax: xMax, yMin: yMin, yMax: yMax, logScale: logY,
      sx: sx, sy: sy, plotW: plotW, plotH: plotH,
      yUnit: cfg.yUnit || '', hidden: {}
    });
  }

  /* ---- compound return chart ---- */
  function renderCompound(containerId, cfg) {
    /* Convert yield series -> cumulative $100 growth, then render as log-scale lines */
    var base = cfg.baseAmount || 100;
    var newSeries = [];

    /* Find common start year for alignment */
    var commonStart = 0;
    cfg.series.forEach(function (s) { if (s.start > commonStart) commonStart = s.start; });
    if (cfg.startYear) commonStart = cfg.startYear;

    cfg.series.forEach(function (s, idx) {
      var pts = expandSeries(s);
      pts.sort(function (a, b) { return a[0] - b[0]; });
      /* Filter from commonStart */
      var filtered = [];
      pts.forEach(function (p) { if (p[0] >= commonStart) filtered.push(p); });
      /* Compute cumulative */
      var cumData = [];
      if (filtered.length) {
        var val = base;
        cumData.push([filtered[0][0], val]);
        var lastDt = s.step || 1;
        for (var i = 0; i < filtered.length; i++) {
          /* Per-period compounding: series values are % PER ANNUM. Grow the capital
           * for dt years — the gap to the next observation (e.g. 1/12 for monthly
           * data): val *= (1 + y/100)^dt. With annual data (dt = 1) this matches
           * the previous behavior exactly; with monthly annualized yields it now
           * correctly compounds (1 + y/100)^(1/12) per month instead of applying
           * a full year's growth at every monthly data point. */
          var dt = (i + 1 < filtered.length) ? (filtered[i + 1][0] - filtered[i][0]) : lastDt;
          if (!(dt > 0)) dt = lastDt;
          val = val * Math.pow(1 + filtered[i][1] / 100, dt);
          cumData.push([filtered[i][0] + dt, Math.round(val * 100) / 100]);
          lastDt = dt;
        }
      }
      newSeries.push({
        name: s.name,
        color: s.color || COLORS[idx % COLORS.length],
        data: cumData,
        width: s.width
      });
    });

    /* Determine y range */
    var maxVal = 0;
    newSeries.forEach(function (s) {
      s.data.forEach(function (d) { if (d[1] > maxVal) maxVal = d[1]; });
    });

    renderLines(containerId, {
      title: cfg.title || 'Compound Return: $' + base + ' Growth',
      caption: cfg.caption,
      series: newSeries,
      logScale: maxVal > base * 20,
      yRange: cfg.yRange || (maxVal > base * 20 ? [base * 0.8, maxVal * 1.2] : undefined),
      yUnit: cfg.yUnit || '',
      yStep: cfg.yStep,
      xRange: cfg.xRange,
      xStep: cfg.xStep,
      annotations: cfg.annotations,
      bands: cfg.bands,
      endLabels: cfg.endLabels
    });
  }

  /* ---- spread chart (2s10s, 5s30s etc.) ---- */
  function renderSpread(containerId, cfg) {
    var el = document.getElementById(containerId);
    if (!el) return;

    var plotW = W - PAD.l - PAD.r;
    var plotH = H - PAD.t - PAD.b;

    /* Expand both series */
    var longPts = expandSeries(cfg.long).slice().sort(function (a, b) { return a[0] - b[0]; });
    var shortPts = expandSeries(cfg.short).slice().sort(function (a, b) { return a[0] - b[0]; });

    /* Build lookups keyed by month index (robust float alignment) */
    var shortMap = {};
    shortPts.forEach(function (p) {
      var monthKey = Math.round(p[0] * 12);
      shortMap[monthKey] = p[1];
    });
    var longMap = {};
    longPts.forEach(function (p) {
      var monthKey = Math.round(p[0] * 12);
      longMap[monthKey] = p[1];
    });

    /* Compute spread: long - short at each aligned point */
    var spreadPts = [];
    longPts.forEach(function (p) {
      var monthKey = Math.round(p[0] * 12);
      if (shortMap[monthKey] !== undefined) {
        spreadPts.push([p[0], p[1] - shortMap[monthKey]]);
      }
    });

    if (spreadPts.length === 0) return;

    /* Calculate ranges */
    var xMin = spreadPts[0][0];
    var xMax = spreadPts[spreadPts.length - 1][0];
    var yMin = Infinity, yMax = -Infinity;
    spreadPts.forEach(function (p) {
      if (p[1] < yMin) yMin = p[1];
      if (p[1] > yMax) yMax = p[1];
    });

    /* Pad y range and ensure zero is visible */
    var yPad = (yMax - yMin) * 0.1 || 0.5;
    yMin = Math.floor((yMin - yPad) * 4) / 4;
    yMax = Math.ceil((yMax + yPad) * 4) / 4;
    if (yMin > 0) yMin = -0.5;
    if (yMax < 0) yMax = 0.5;

    if (cfg.xRange) { xMin = cfg.xRange[0]; xMax = cfg.xRange[1]; }
    if (cfg.yRange) { yMin = cfg.yRange[0]; yMax = cfg.yRange[1]; }
    /* degenerate-range guards (single point / equal yRange): avoid 0-division
     * scales and non-terminating grid loops */
    if (!(xMax > xMin)) xMax = xMin + 1;
    if (!(yMax > yMin)) yMax = yMin + 1;

    function sx(x) { return PAD.l + ((x - xMin) / (xMax - xMin)) * plotW; }
    function sy(y) { return PAD.t + plotH - ((y - yMin) / (yMax - yMin)) * plotH; }

    var zeroY = sy(0);
    /* Clamp zeroY within plot area */
    zeroY = Math.max(PAD.t, Math.min(PAD.t + plotH, zeroY));

    /* Unique clip-path IDs based on container */
    var clipId = containerId.replace(/[^a-zA-Z0-9]/g, '_');

    var svg = '';

    /* Defs: clip paths for positive and negative areas */
    svg += '<defs>';
    svg += '<clipPath id="clip-pos-' + clipId + '"><rect x="' + PAD.l + '" y="' + PAD.t + '" width="' + plotW + '" height="' + (zeroY - PAD.t) + '"/></clipPath>';
    svg += '<clipPath id="clip-neg-' + clipId + '"><rect x="' + PAD.l + '" y="' + zeroY.toFixed(1) + '" width="' + plotW + '" height="' + (PAD.t + plotH - zeroY) + '"/></clipPath>';
    svg += '</defs>';

    /* Era/regime bands (behind everything) */
    if (cfg.bands && cfg.bands.length) {
      svg += renderBands(cfg.bands, sx, xMin, xMax, plotH);
    }

    /* Grid (ignore cfg.yStep unless > 0 — 0/negative steps never terminate) */
    var yStep = cfg.yStep > 0 ? cfg.yStep : niceStep(yMax - yMin, 5);
    svg += '<g class="chart-grid">';
    svg += '<line x1="' + PAD.l + '" y1="' + PAD.t + '" x2="' + PAD.l + '" y2="' + (PAD.t + plotH) + '" stroke="rgba(255,255,255,0.15)"/>';
    svg += '<line x1="' + PAD.l + '" y1="' + (PAD.t + plotH) + '" x2="' + (PAD.l + plotW) + '" y2="' + (PAD.t + plotH) + '" stroke="rgba(255,255,255,0.15)"/>';
    for (var yv = yMin; yv <= yMax + 0.001; yv += yStep) {
      var yy = sy(yv);
      if (yy >= PAD.t - 1 && yy <= PAD.t + plotH + 1) {
        svg += '<line x1="' + PAD.l + '" y1="' + yy.toFixed(1) + '" x2="' + (PAD.l + plotW) + '" y2="' + yy.toFixed(1) + '" stroke="rgba(255,255,255,0.06)"/>';
      }
    }
    svg += '</g>';

    /* Zero line (prominent dashed) */
    if (zeroY > PAD.t && zeroY < PAD.t + plotH) {
      svg += '<line x1="' + PAD.l + '" y1="' + zeroY.toFixed(1) + '" x2="' + (PAD.l + plotW) + '" y2="' + zeroY.toFixed(1) + '" stroke="rgba(255,255,255,0.45)" stroke-width="1.2" stroke-dasharray="5,3"/>';
    }

    /* Y-axis labels */
    svg += '<g fill="rgba(255,255,255,0.6)" font-size="10">';
    for (var yv2 = yMin; yv2 <= yMax + 0.001; yv2 += yStep) {
      var yy2 = sy(yv2);
      if (yy2 >= PAD.t - 1 && yy2 <= PAD.t + plotH + 1) {
        var yLabel = yv2.toFixed(1);
        if (cfg.yUnit) yLabel += cfg.yUnit;
        svg += '<text x="' + (PAD.l - 6) + '" y="' + (yy2 + 3.5).toFixed(1) + '" text-anchor="end" font-size="10">' + esc(yLabel) + '</text>';
      }
    }
    svg += '</g>';

    /* X-axis labels */
    var xSpan = xMax - xMin;
    var xStep = cfg.xStep || xAxisStep(xSpan);
    var xStart = Math.ceil(xMin / xStep) * xStep;
    svg += '<g fill="rgba(255,255,255,0.6)" font-size="10">';
    for (var xv = xStart; xv <= xMax; xv += xStep) {
      svg += '<text x="' + sx(xv).toFixed(1) + '" y="' + (PAD.t + plotH + 16) + '" text-anchor="middle">' + xv + '</text>';
    }
    svg += '</g>';

    /* Area fill: build path from spread points down to zero line */
    var areaPath = 'M' + sx(spreadPts[0][0]).toFixed(1) + ',' + zeroY.toFixed(1);
    spreadPts.forEach(function (p) {
      areaPath += ' L' + sx(p[0]).toFixed(1) + ',' + sy(p[1]).toFixed(1);
    });
    areaPath += ' L' + sx(spreadPts[spreadPts.length - 1][0]).toFixed(1) + ',' + zeroY.toFixed(1) + ' Z';

    /* Positive area (green/teal) */
    svg += '<path d="' + areaPath + '" fill="rgba(0,212,170,0.25)" clip-path="url(#clip-pos-' + clipId + ')"/>';
    /* Negative area (red — inverted yield curve) */
    svg += '<path d="' + areaPath + '" fill="rgba(255,107,107,0.35)" clip-path="url(#clip-neg-' + clipId + ')"/>';

    /* Spread line */
    var linePath = '';
    spreadPts.forEach(function (p, i) {
      linePath += (i === 0 ? 'M' : 'L') + sx(p[0]).toFixed(1) + ',' + sy(p[1]).toFixed(1) + ' ';
    });
    svg += '<path class="cb-series" data-si="0" d="' + linePath.trim() + '" fill="none" stroke="#ffd93d" stroke-width="1.8" stroke-linejoin="round" stroke-linecap="round"/>';

    /* Legend */
    var spreadName = cfg.spreadName || 'Spread';
    var legendLabel = spreadName + ' (' + cfg.long.name + ' \u2212 ' + cfg.short.name + ')';
    svg += '<g font-size="11">';
    var lx = PAD.l + 8;
    var ly = PAD.t + 14;
    svg += '<rect x="' + lx + '" y="' + (ly - 7) + '" width="14" height="3" rx="1" fill="#ffd93d"/>';
    svg += '<text x="' + (lx + 18) + '" y="' + ly + '" fill="#ffd93d" font-size="10" font-weight="600">' + esc(legendLabel) + '</text>';
    /* Positive/negative indicators */
    var lx2 = lx + 200;
    svg += '<rect x="' + lx2 + '" y="' + (ly - 5) + '" width="10" height="10" rx="2" fill="rgba(0,212,170,0.4)"/>';
    svg += '<text x="' + (lx2 + 14) + '" y="' + ly + '" fill="rgba(0,212,170,0.8)" font-size="9">Positive</text>';
    var lx3 = lx2 + 70;
    svg += '<rect x="' + lx3 + '" y="' + (ly - 5) + '" width="10" height="10" rx="2" fill="rgba(255,107,107,0.5)"/>';
    svg += '<text x="' + (lx3 + 14) + '" y="' + ly + '" fill="rgba(255,107,107,0.9)" font-size="9">Inverted</text>';
    svg += '</g>';

    /* Annotations */
    if (cfg.annotations) {
      svg += renderAnnotations(cfg.annotations, sx, plotH);
    }

    /* End-value pill for the spread (single series → default on) */
    var showEnd = cfg.endLabels === undefined ? true : !!cfg.endLabels;
    if (showEnd) {
      var lastSp = null;
      for (var li = spreadPts.length - 1; li >= 0; li--) {
        if (spreadPts[li][0] <= xMax + 1e-9 && spreadPts[li][0] >= xMin - 1e-9) { lastSp = spreadPts[li]; break; }
      }
      if (lastSp) {
        svg += renderEndPills([{ si: 0, color: '#ffd93d', x: sx(lastSp[0]), y: sy(lastSp[1]), txt: valLabel(lastSp[1], cfg.yUnit || '') }], plotH);
      }
    }

    /* Wrap in SVG (accessible: role=img + aria-label) */
    svg = '<svg class="svg-chart" viewBox="0 0 ' + W + ' ' + H + '" preserveAspectRatio="xMidYMid meet" role="img" aria-label="' + escAttr(cfg.title || 'chart') + '">' + svg + '</svg>';

    var html = '<figure class="chart-figure">';
    if (cfg.title) html += '<figcaption class="chart-title">' + esc(cfg.title) + '</figcaption>';
    html += svg;
    if (cfg.caption) html += '<p class="chart-caption">' + esc(cfg.caption) + '</p>';
    html += '</figure>';

    el.innerHTML = html;

    /* Interactivity: tooltip shows spread + long/short legs */
    var index = buildIndex([spreadPts], xMin, xMax);
    attachInteractivity(containerId, {
      el: el, cfg: cfg, kind: 'spread',
      seriesPts: [spreadPts],
      seriesInfo: [{ name: spreadName, color: '#ffd93d', map: index.maps[0] }],
      extraRows: [
        { name: cfg.long.name, color: safeColor(cfg.long.color, '#00d4aa'), map: longMap },
        { name: cfg.short.name, color: safeColor(cfg.short.color, '#5b8def'), map: shortMap }
      ],
      keys: index.keys, keyX: index.keyX, annual: index.annual,
      xMin: xMin, xMax: xMax, yMin: yMin, yMax: yMax, logScale: false,
      sx: sx, sy: sy, plotW: plotW, plotH: plotH,
      yUnit: cfg.yUnit || '', hidden: {}
    });
  }

  /* ---- public API ---- */
  return {
    lines: function (id, cfg) {
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function () { renderLines(id, cfg); });
      } else {
        renderLines(id, cfg);
      }
    },
    compound: function (id, cfg) {
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function () { renderCompound(id, cfg); });
      } else {
        renderCompound(id, cfg);
      }
    },
    spread: function (id, cfg) {
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function () { renderSpread(id, cfg); });
      } else {
        renderSpread(id, cfg);
      }
    },
    /* Exposed for debugging/inspection (read-only by convention) */
    _registry: registry
  };
})();
