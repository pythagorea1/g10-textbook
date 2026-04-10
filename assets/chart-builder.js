/**
 * G10 Textbook — Chart Builder
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
 */
var ChartBuilder = (function () {
  'use strict';

  var COLORS = ['#00d4aa','#ff6b6b','#5b8def','#ffd93d','#ff9f43','#4ecdc4','#e066ff','#74c0fc','#a0d468','#d770ad'];
  var W = 800, H = 420;
  var PAD = { t: 48, r: 28, b: 44, l: 58 };

  /* ---- helpers ---- */
  function esc(s) { return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;'); }
  function fmt(n, decimals) {
    if (Math.abs(n) >= 1e6) return (n / 1e6).toFixed(1) + 'M';
    if (Math.abs(n) >= 1e4) return (n / 1e3).toFixed(0) + 'k';
    if (Math.abs(n) >= 1e3) return (n / 1e3).toFixed(1) + 'k';
    return decimals !== undefined ? n.toFixed(decimals) : (n % 1 === 0 ? String(n) : n.toFixed(1));
  }

  function niceStep(range, targetTicks) {
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
    if (Array.isArray(s.data)) return s.data;
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

  /* Render legend items, wrapping to multiple rows if needed */
  function renderLegend(series, plotW) {
    var svg = '';
    var legX = PAD.l + 8;
    var legY = PAD.t + 14;
    var maxItemW = 120;
    var itemsPerRow = Math.max(1, Math.floor(plotW / maxItemW));

    svg += '<g font-size="11">';
    series.forEach(function (s, idx) {
      var color = s.color || COLORS[idx % COLORS.length];
      var row = Math.floor(idx / itemsPerRow);
      var col = idx % itemsPerRow;
      var itemW = Math.min(plotW / Math.min(series.length, itemsPerRow), maxItemW);
      var x = legX + col * itemW;
      var y = legY + row * 16;
      svg += '<rect x="'+x+'" y="'+(y-7)+'" width="14" height="3" rx="1" fill="'+color+'"/>';
      svg += '<text x="'+(x+18)+'" y="'+y+'" fill="'+color+'" font-size="10" font-weight="600">'+esc(s.name)+'</text>';
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

    if (cfg.xRange) { xMin = cfg.xRange[0]; xMax = cfg.xRange[1]; }
    if (cfg.yRange) { yMin = cfg.yRange[0]; yMax = cfg.yRange[1]; }
    else {
      var pad = (yMax - yMin) * 0.08;
      yMin = Math.floor((yMin - pad) * 2) / 2;
      yMax = Math.ceil((yMax + pad) * 2) / 2;
      if (yMin < 0 && cfg.yUnit === '%') yMin = Math.min(yMin, -1);
    }

    function sx(x) { return PAD.l + ((x - xMin) / (xMax - xMin)) * plotW; }
    function sy(y) {
      if (logY) {
        var lo = Math.log10(Math.max(yMin, 1));
        var hi = Math.log10(yMax);
        return PAD.t + plotH - ((Math.log10(Math.max(y, 1)) - lo) / (hi - lo)) * plotH;
      }
      return PAD.t + plotH - ((y - yMin) / (yMax - yMin)) * plotH;
    }

    var svg = '';

    /* Grid */
    var yStep = cfg.yStep || niceStep(yMax - yMin, 5);
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
    expanded.forEach(function (pts, idx) {
      var s = cfg.series[idx];
      var color = s.color || COLORS[idx % COLORS.length];
      var sorted = pts.slice().sort(function (a, b) { return a[0] - b[0]; });
      var d = '';
      sorted.forEach(function (p, i) {
        d += (i === 0 ? 'M' : 'L') + sx(p[0]).toFixed(1) + ',' + sy(p[1]).toFixed(1) + ' ';
      });
      var width = s.width || 1.8;
      svg += '<path d="'+d.trim()+'" fill="none" stroke="'+color+'" stroke-width="'+width+'" stroke-linejoin="round" stroke-linecap="round" opacity="'+(s.opacity||1)+'"/>';
    });

    /* Legend */
    svg += renderLegend(cfg.series, plotW);

    /* Annotations */
    if (cfg.annotations) {
      svg += '<g class="chart-annotation" font-size="10">';
      cfg.annotations.forEach(function (a, ai) {
        var ax = sx(a.year || a.x);
        var above = ai % 2 === 0;
        var ay1 = PAD.t;
        var ay2 = PAD.t + plotH;
        var col = a.color || '#ff6b6b';
        svg += '<line x1="'+ax.toFixed(1)+'" y1="'+ay1+'" x2="'+ax.toFixed(1)+'" y2="'+ay2+'" stroke="'+col+'" stroke-width="1" stroke-dasharray="3,3" opacity="0.5"/>';
        var ty = above ? ay1 - 4 : ay2 + 13;
        svg += '<text x="'+ax.toFixed(1)+'" y="'+ty+'" text-anchor="middle" fill="'+col+'" font-size="9" font-weight="600">'+esc(a.label)+'</text>';
      });
      svg += '</g>';
    }

    /* Title */
    svg = '<svg class="svg-chart" viewBox="0 0 '+W+' '+H+'" preserveAspectRatio="xMidYMid meet">' + svg + '</svg>';

    var html = '<figure class="chart-figure">';
    if (cfg.title) html += '<figcaption class="chart-title">' + esc(cfg.title) + '</figcaption>';
    html += svg;
    if (cfg.caption) html += '<p class="chart-caption">' + esc(cfg.caption) + '</p>';
    html += '</figure>';

    el.innerHTML = html;
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
      var val = base;
      cumData.push([filtered[0][0], val]);
      for (var i = 0; i < filtered.length; i++) {
        val = val * (1 + filtered[i][1] / 100);
        cumData.push([filtered[i][0] + 1, Math.round(val * 100) / 100]);
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
      annotations: cfg.annotations
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

    /* Build lookup for short series keyed by month index (robust float alignment) */
    var shortMap = {};
    shortPts.forEach(function (p) {
      var monthKey = Math.round(p[0] * 12);
      shortMap[monthKey] = p[1];
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

    /* Grid */
    var yStep = cfg.yStep || niceStep(yMax - yMin, 5);
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
    svg += '<path d="' + linePath.trim() + '" fill="none" stroke="#ffd93d" stroke-width="1.8" stroke-linejoin="round" stroke-linecap="round"/>';

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
      svg += '<g class="chart-annotation" font-size="10">';
      cfg.annotations.forEach(function (a, ai) {
        var ax = sx(a.year || a.x);
        var above = ai % 2 === 0;
        var ay1 = PAD.t;
        var ay2 = PAD.t + plotH;
        var col = a.color || '#ff6b6b';
        svg += '<line x1="' + ax.toFixed(1) + '" y1="' + ay1 + '" x2="' + ax.toFixed(1) + '" y2="' + ay2 + '" stroke="' + col + '" stroke-width="1" stroke-dasharray="3,3" opacity="0.5"/>';
        var ty = above ? ay1 - 4 : ay2 + 13;
        svg += '<text x="' + ax.toFixed(1) + '" y="' + ty + '" text-anchor="middle" fill="' + col + '" font-size="9" font-weight="600">' + esc(a.label) + '</text>';
      });
      svg += '</g>';
    }

    /* Wrap in SVG */
    svg = '<svg class="svg-chart" viewBox="0 0 ' + W + ' ' + H + '" preserveAspectRatio="xMidYMid meet">' + svg + '</svg>';

    var html = '<figure class="chart-figure">';
    if (cfg.title) html += '<figcaption class="chart-title">' + esc(cfg.title) + '</figcaption>';
    html += svg;
    if (cfg.caption) html += '<p class="chart-caption">' + esc(cfg.caption) + '</p>';
    html += '</figure>';

    el.innerHTML = html;
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
    }
  };
})();
