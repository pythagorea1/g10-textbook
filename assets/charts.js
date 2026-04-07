/*
 * charts.js — G10 Textbook reusable inline-SVG chart helpers.
 * Pure Vanilla JS, no external dependencies. Bloomberg-style dark theme.
 *
 * Public API:
 *   renderAnnotatedLineChart(containerId, opts)
 *   renderBarChart(containerId, opts)
 *   renderEventTimeline(containerId, opts)
 *   renderDualAxisChart(containerId, opts)
 *   renderGanttChart(containerId, opts)
 *
 * All functions are pure: they build a new SVG element and append to the
 * container. They never mutate the input options object.
 */
(function (global) {
  'use strict';

  var SVG_NS = 'http://www.w3.org/2000/svg';
  var DEFAULT_COLORS = ['#00d4aa', '#ff6b6b', '#4ecdc4', '#ffd93d', '#a78bfa', '#f78c6b'];

  function el(name, attrs, parent) {
    var node = document.createElementNS(SVG_NS, name);
    if (attrs) {
      Object.keys(attrs).forEach(function (k) {
        if (attrs[k] !== undefined && attrs[k] !== null) {
          node.setAttribute(k, attrs[k]);
        }
      });
    }
    if (parent) parent.appendChild(node);
    return node;
  }

  function getContainer(containerId) {
    var c = typeof containerId === 'string'
      ? document.getElementById(containerId)
      : containerId;
    if (!c) {
      console.warn('charts.js: container not found:', containerId);
      return null;
    }
    return c;
  }

  function buildFigure(title, caption) {
    var fig = document.createElement('figure');
    fig.className = 'chart-figure';
    if (title) {
      var cap = document.createElement('figcaption');
      cap.className = 'chart-title';
      cap.textContent = title;
      fig.appendChild(cap);
    }
    var svg = document.createElementNS(SVG_NS, 'svg');
    svg.setAttribute('class', 'svg-chart');
    svg.setAttribute('viewBox', '0 0 800 400');
    svg.setAttribute('preserveAspectRatio', 'xMidYMid meet');
    fig.appendChild(svg);
    if (caption) {
      var p = document.createElement('p');
      p.className = 'chart-caption';
      p.textContent = caption;
      fig.appendChild(p);
    }
    return { figure: fig, svg: svg };
  }

  function scaleLinear(domain, range) {
    var d0 = domain[0], d1 = domain[1];
    var r0 = range[0], r1 = range[1];
    var span = (d1 - d0) || 1;
    return function (v) { return r0 + (v - d0) / span * (r1 - r0); };
  }

  function scaleLog(domain, range) {
    var d0 = Math.log(domain[0]), d1 = Math.log(domain[1]);
    var r0 = range[0], r1 = range[1];
    var span = (d1 - d0) || 1;
    return function (v) { return r0 + (Math.log(v) - d0) / span * (r1 - r0); };
  }

  function extent(values) {
    var lo = Infinity, hi = -Infinity;
    for (var i = 0; i < values.length; i++) {
      var v = values[i];
      if (v < lo) lo = v;
      if (v > hi) hi = v;
    }
    return [lo, hi];
  }

  /* ---------- Annotated Line Chart ---------- */
  function renderAnnotatedLineChart(containerId, opts) {
    var container = getContainer(containerId);
    if (!container) return;
    var data = opts.data || [];          // [{x:Number, y:Number}, ...]
    var events = opts.events || [];      // [{x, y?, label}]
    var built = buildFigure(opts.title, opts.caption);
    var svg = built.svg;

    var pad = { top: 50, right: 30, bottom: 40, left: 60 };
    var W = 800, H = 400;
    var xs = data.map(function (d) { return d.x; });
    var ys = data.map(function (d) { return d.y; });
    var xDomain = opts.xDomain || extent(xs);
    var yDomain = opts.yDomain || extent(ys);
    if (yDomain[0] === yDomain[1]) yDomain = [yDomain[0] - 1, yDomain[1] + 1];

    var x = scaleLinear(xDomain, [pad.left, W - pad.right]);
    var y = (opts.yScale === 'log')
      ? scaleLog([Math.max(yDomain[0], 0.0001), yDomain[1]], [H - pad.bottom, pad.top])
      : scaleLinear(yDomain, [H - pad.bottom, pad.top]);

    // grid
    var grid = el('g', { 'class': 'chart-grid' }, svg);
    var ticks = 5;
    for (var i = 0; i <= ticks; i++) {
      var gy = pad.top + (H - pad.top - pad.bottom) * i / ticks;
      el('line', { x1: pad.left, y1: gy, x2: W - pad.right, y2: gy }, grid);
      var yVal = yDomain[1] - (yDomain[1] - yDomain[0]) * i / ticks;
      var t = el('text', {
        x: pad.left - 6, y: gy + 4, 'text-anchor': 'end',
        'class': 'chart-axis', 'font-size': '10'
      }, svg);
      t.textContent = formatNumber(yVal);
    }

    // axis baseline
    el('line', {
      x1: pad.left, y1: H - pad.bottom, x2: W - pad.right, y2: H - pad.bottom,
      stroke: 'rgba(255,255,255,0.3)', 'stroke-width': '1'
    }, svg);

    // area + line
    if (data.length > 1) {
      var dPath = '';
      var aPath = 'M ' + x(data[0].x) + ',' + (H - pad.bottom);
      for (var k = 0; k < data.length; k++) {
        var px = x(data[k].x), py = y(data[k].y);
        dPath += (k === 0 ? 'M ' : ' L ') + px + ',' + py;
        aPath += ' L ' + px + ',' + py;
      }
      aPath += ' L ' + x(data[data.length - 1].x) + ',' + (H - pad.bottom) + ' Z';

      var gradId = 'chartGrad_' + Math.random().toString(36).slice(2, 8);
      var defs = el('defs', null, svg);
      var grad = el('linearGradient', { id: gradId, x1: '0', y1: '0', x2: '0', y2: '1' }, defs);
      el('stop', { offset: '0%', 'stop-color': opts.color || '#00d4aa', 'stop-opacity': '0.35' }, grad);
      el('stop', { offset: '100%', 'stop-color': opts.color || '#00d4aa', 'stop-opacity': '0' }, grad);

      el('path', { 'class': 'chart-area', d: aPath, fill: 'url(#' + gradId + ')' }, svg);
      el('path', {
        'class': 'chart-line', d: dPath, fill: 'none',
        stroke: opts.color || '#00d4aa', 'stroke-width': '2'
      }, svg);
    }

    // X axis labels (start/mid/end)
    var xAxis = el('g', { 'class': 'chart-axis' }, svg);
    [0, 0.5, 1].forEach(function (frac) {
      var xv = xDomain[0] + (xDomain[1] - xDomain[0]) * frac;
      var xx = x(xv);
      var lbl = el('text', {
        x: xx, y: H - pad.bottom + 18, 'text-anchor': 'middle', 'font-size': '10'
      }, xAxis);
      lbl.textContent = formatX(xv);
    });

    // events / annotations — collision-avoidance: alternate above/below, stack on overlap
    var trimmed = events.slice(0, 6);
    var placed = trimmed.map(function (ev, idx) {
      var ex = x(ev.x);
      var ey = (ev.y != null) ? y(ev.y) : interpolateY(data, ev.x, x, y);
      return { ev: ev, ex: ex, ey: ey, idx: idx, above: idx % 2 === 0 };
    });
    // sort by ex to detect horizontal neighbors
    var sortedAbove = placed.filter(function (p) { return p.above; }).sort(function (a, b) { return a.ex - b.ex; });
    var sortedBelow = placed.filter(function (p) { return !p.above; }).sort(function (a, b) { return a.ex - b.ex; });
    function stack(list, base, dir) {
      var lastX = -999, level = 0;
      list.forEach(function (p) {
        if (p.ex - lastX < 90) level += 1; else level = 0;
        p.labelY = base + dir * level * 14;
        lastX = p.ex;
      });
    }
    stack(sortedAbove, pad.top + 12, 1);   // above area: grow downward but stay near top
    stack(sortedBelow, H - pad.bottom + 14, 1); // below area: grow downward in bottom margin
    placed.forEach(function (p) {
      var ev = p.ev;
      var ex = p.ex, ey = p.ey, labelY = p.labelY;
      var color = ev.color || '#ff6b6b';
      var label = (ev.label || '').slice(0, 18);
      var g = el('g', { 'class': 'chart-annotation' }, svg);
      // leader line from marker to label
      el('line', {
        'class': 'chart-annotation-line',
        x1: ex, y1: ey, x2: ex, y2: labelY + (p.above ? 4 : -8),
        stroke: color, 'stroke-width': '1', 'stroke-dasharray': '2,2'
      }, g);
      el('circle', { cx: ex, cy: ey, r: '3.5', fill: color }, g);
      // background rect for readability
      var charW = 5.6;
      var w = Math.max(label.length * charW + 6, 20);
      var anchor = ex < pad.left + w / 2 ? 'start' : (ex > W - pad.right - w / 2 ? 'end' : 'middle');
      var rectX = anchor === 'start' ? ex - 3 : (anchor === 'end' ? ex - w + 3 : ex - w / 2);
      el('rect', {
        'class': 'chart-annotation-bg',
        x: rectX, y: labelY - 9, width: w, height: 12, rx: '2',
        fill: 'rgba(10,12,18,0.78)', stroke: color, 'stroke-width': '0.5'
      }, g);
      var txt = el('text', {
        x: ex, y: labelY, 'text-anchor': anchor,
        fill: color, 'font-size': '10'
      }, g);
      txt.textContent = label;
    });

    container.appendChild(built.figure);
    return built.figure;
  }

  function interpolateY(data, xv, xScale, yScale) {
    if (!data.length) return 0;
    for (var i = 1; i < data.length; i++) {
      if (data[i].x >= xv) {
        var a = data[i - 1], b = data[i];
        var t = (xv - a.x) / ((b.x - a.x) || 1);
        return yScale(a.y + (b.y - a.y) * t);
      }
    }
    return yScale(data[data.length - 1].y);
  }

  function formatNumber(v) {
    if (Math.abs(v) >= 1000) return v.toFixed(0);
    if (Math.abs(v) >= 10) return v.toFixed(1);
    return v.toFixed(2);
  }
  function formatX(v) {
    if (v > 1900 && v < 2100) return String(Math.round(v));
    return String(Math.round(v * 100) / 100);
  }

  /* ---------- Bar Chart ---------- */
  function renderBarChart(containerId, opts) {
    var container = getContainer(containerId);
    if (!container) return;
    var data = opts.data || []; // [{label, value}]
    var built = buildFigure(opts.title, opts.caption);
    var svg = built.svg;
    var pad = { top: 50, right: 30, bottom: 60, left: 60 };
    var W = 800, H = 400;
    var values = data.map(function (d) { return d.value; });
    var yDomain = opts.yDomain || [Math.min(0, Math.min.apply(null, values)), Math.max.apply(null, values)];
    var y = scaleLinear(yDomain, [H - pad.bottom, pad.top]);
    var bw = (W - pad.left - pad.right) / Math.max(data.length, 1);

    var grid = el('g', { 'class': 'chart-grid' }, svg);
    for (var i = 0; i <= 5; i++) {
      var gy = pad.top + (H - pad.top - pad.bottom) * i / 5;
      el('line', { x1: pad.left, y1: gy, x2: W - pad.right, y2: gy }, grid);
      var yVal = yDomain[1] - (yDomain[1] - yDomain[0]) * i / 5;
      var t = el('text', { x: pad.left - 6, y: gy + 4, 'text-anchor': 'end', 'font-size': '10', 'class': 'chart-axis' }, svg);
      t.textContent = formatNumber(yVal);
    }

    data.forEach(function (d, idx) {
      var bx = pad.left + bw * idx + bw * 0.15;
      var by = y(Math.max(d.value, 0));
      var bh = Math.abs(y(d.value) - y(0));
      el('rect', {
        x: bx, y: d.value >= 0 ? by : y(0),
        width: bw * 0.7, height: bh,
        fill: d.color || opts.color || '#00d4aa',
        'class': 'chart-bar'
      }, svg);
      var lbl = el('text', {
        x: bx + bw * 0.35, y: H - pad.bottom + 14,
        'text-anchor': 'middle', 'font-size': '10', 'class': 'chart-axis'
      }, svg);
      lbl.textContent = d.label;
    });

    container.appendChild(built.figure);
    return built.figure;
  }

  /* ---------- Event Timeline (vertical) ---------- */
  function renderEventTimeline(containerId, opts) {
    var container = getContainer(containerId);
    if (!container) return;
    var events = opts.events || []; // [{year, title, desc}]
    var built = buildFigure(opts.title, opts.caption);
    var svg = built.svg;
    var H = Math.max(400, 60 + events.length * 60);
    svg.setAttribute('viewBox', '0 0 800 ' + H);

    var axisX = 140;
    el('line', {
      x1: axisX, y1: 40, x2: axisX, y2: H - 20,
      stroke: 'rgba(255,255,255,0.3)', 'stroke-width': '2'
    }, svg);

    events.forEach(function (ev, idx) {
      var cy = 60 + idx * 60;
      var color = ev.color || DEFAULT_COLORS[idx % DEFAULT_COLORS.length];
      var g = el('g', { 'class': 'chart-annotation' }, svg);
      el('circle', { cx: axisX, cy: cy, r: '7', fill: color }, g);
      var yr = el('text', {
        x: axisX - 16, y: cy + 4, 'text-anchor': 'end',
        fill: color, 'font-size': '13', 'font-weight': 'bold'
      }, g);
      yr.textContent = ev.year;
      var ttl = el('text', {
        x: axisX + 16, y: cy - 2, fill: '#e8e8e8', 'font-size': '13', 'font-weight': 'bold'
      }, g);
      ttl.textContent = ev.title;
      if (ev.desc) {
        var d = el('text', {
          x: axisX + 16, y: cy + 16, fill: 'rgba(232,232,232,0.7)', 'font-size': '11'
        }, g);
        d.textContent = ev.desc;
      }
    });

    container.appendChild(built.figure);
    return built.figure;
  }

  /* ---------- Dual Axis Chart ---------- */
  function renderDualAxisChart(containerId, opts) {
    var container = getContainer(containerId);
    if (!container) return;
    var s1 = opts.series1 || { data: [], color: '#00d4aa', label: '' };
    var s2 = opts.series2 || { data: [], color: '#ff6b6b', label: '' };
    var built = buildFigure(opts.title, opts.caption);
    var svg = built.svg;
    var pad = { top: 50, right: 60, bottom: 40, left: 60 };
    var W = 800, H = 400;

    var xs = s1.data.concat(s2.data).map(function (d) { return d.x; });
    var xDomain = [Math.min.apply(null, xs), Math.max.apply(null, xs)];
    var x = scaleLinear(xDomain, [pad.left, W - pad.right]);
    var y1 = scaleLinear(extent(s1.data.map(function (d) { return d.y; })), [H - pad.bottom, pad.top]);
    var y2 = scaleLinear(extent(s2.data.map(function (d) { return d.y; })), [H - pad.bottom, pad.top]);

    var grid = el('g', { 'class': 'chart-grid' }, svg);
    for (var i = 0; i <= 5; i++) {
      var gy = pad.top + (H - pad.top - pad.bottom) * i / 5;
      el('line', { x1: pad.left, y1: gy, x2: W - pad.right, y2: gy }, grid);
    }

    drawSeries(svg, s1.data, x, y1, s1.color);
    drawSeries(svg, s2.data, x, y2, s2.color);

    // legend
    var lg = el('g', { 'class': 'chart-legend' }, svg);
    [[s1.label, s1.color, 0], [s2.label, s2.color, 1]].forEach(function (row) {
      var lx = pad.left + row[2] * 200;
      el('rect', { x: lx, y: 20, width: 14, height: 4, fill: row[1] }, lg);
      var t = el('text', { x: lx + 20, y: 26, fill: '#e8e8e8', 'font-size': '11' }, lg);
      t.textContent = row[0];
    });

    container.appendChild(built.figure);
    return built.figure;
  }

  function drawSeries(svg, data, x, y, color) {
    if (data.length < 2) return;
    var d = '';
    for (var i = 0; i < data.length; i++) {
      d += (i === 0 ? 'M ' : ' L ') + x(data[i].x) + ',' + y(data[i].y);
    }
    el('path', { d: d, fill: 'none', stroke: color, 'stroke-width': '2', 'class': 'chart-line' }, svg);
  }

  /* ---------- Gantt Chart (governor tenures etc.) ---------- */
  function renderGanttChart(containerId, opts) {
    var container = getContainer(containerId);
    if (!container) return;
    var rows = opts.rows || []; // [{label, start, end, color?}]
    var built = buildFigure(opts.title, opts.caption);
    var svg = built.svg;
    var pad = { top: 50, right: 30, bottom: 40, left: 160 };
    var W = 800, rowH = 28;
    var H = pad.top + pad.bottom + rows.length * rowH;
    svg.setAttribute('viewBox', '0 0 ' + W + ' ' + H);

    var starts = rows.map(function (r) { return r.start; });
    var ends = rows.map(function (r) { return r.end; });
    var xDomain = opts.xDomain || [Math.min.apply(null, starts), Math.max.apply(null, ends)];
    var x = scaleLinear(xDomain, [pad.left, W - pad.right]);

    // x-axis ticks (every ~10 years)
    var span = xDomain[1] - xDomain[0];
    var step = span > 60 ? 10 : span > 30 ? 5 : 2;
    var first = Math.ceil(xDomain[0] / step) * step;
    var grid = el('g', { 'class': 'chart-grid' }, svg);
    for (var t = first; t <= xDomain[1]; t += step) {
      var gx = x(t);
      el('line', { x1: gx, y1: pad.top, x2: gx, y2: H - pad.bottom }, grid);
      var lbl = el('text', { x: gx, y: H - pad.bottom + 16, 'text-anchor': 'middle', 'font-size': '10', 'class': 'chart-axis' }, svg);
      lbl.textContent = String(t);
    }

    rows.forEach(function (r, idx) {
      var ry = pad.top + idx * rowH + 4;
      var bx = x(r.start);
      var bw = x(r.end) - x(r.start);
      var color = r.color || DEFAULT_COLORS[idx % DEFAULT_COLORS.length];
      el('rect', { x: bx, y: ry, width: Math.max(bw, 2), height: rowH - 8, fill: color, rx: '2' }, svg);
      var lab = el('text', {
        x: pad.left - 8, y: ry + (rowH - 8) / 2 + 4,
        'text-anchor': 'end', 'font-size': '11', fill: '#e8e8e8'
      }, svg);
      lab.textContent = r.label;
    });

    container.appendChild(built.figure);
    return built.figure;
  }

  // ---------- Phase 3 additions ----------

  function renderPieChart(containerId, opts) {
    var container = document.getElementById(containerId);
    if (!container) return null;
    var slices = (opts && opts.slices) || [];
    var title = (opts && opts.title) || '';
    var caption = (opts && opts.caption) || '';
    var size = 320, cx = 160, cy = 160, r = 120;
    var total = slices.reduce(function (s, x) { return s + (+x.value || 0); }, 0);
    var fig = document.createElement('figure');
    fig.className = 'chart-figure pie-chart';
    if (title) {
      var cap = document.createElement('figcaption');
      cap.className = 'chart-title';
      cap.textContent = title;
      fig.appendChild(cap);
    }
    var svg = el('svg', {
      class: 'svg-chart', viewBox: '0 0 640 340', preserveAspectRatio: 'xMidYMid meet'
    });
    var angle = -Math.PI / 2;
    slices.forEach(function (s, i) {
      var frac = total > 0 ? (s.value / total) : 0;
      var next = angle + frac * Math.PI * 2;
      var x1 = cx + r * Math.cos(angle), y1 = cy + r * Math.sin(angle);
      var x2 = cx + r * Math.cos(next), y2 = cy + r * Math.sin(next);
      var large = frac > 0.5 ? 1 : 0;
      var color = s.color || DEFAULT_COLORS[i % DEFAULT_COLORS.length];
      el('path', {
        d: 'M ' + cx + ',' + cy + ' L ' + x1 + ',' + y1 + ' A ' + r + ',' + r + ' 0 ' + large + ' 1 ' + x2 + ',' + y2 + ' Z',
        fill: color, stroke: '#0a0e1a', 'stroke-width': 2
      }, svg);
      // legend
      var ly = 40 + i * 24;
      el('rect', { x: 340, y: ly, width: 14, height: 14, fill: color }, svg);
      var lt = el('text', {
        x: 360, y: ly + 12, 'font-size': 12, fill: '#e8e8e8'
      }, svg);
      lt.textContent = s.label + ' — ' + (frac * 100).toFixed(1) + '%';
      angle = next;
    });
    fig.appendChild(svg);
    if (caption) {
      var p = document.createElement('p');
      p.className = 'chart-caption';
      p.textContent = caption;
      fig.appendChild(p);
    }
    container.appendChild(fig);
    return fig;
  }

  function renderDonutChart(containerId, opts) {
    var o = Object.assign({}, opts || {});
    var fig = renderPieChart(containerId, o);
    if (!fig) return null;
    // overlay inner circle
    var svg = fig.querySelector('svg');
    if (svg) {
      el('circle', { cx: 160, cy: 160, r: 60, fill: '#0a0e1a' }, svg);
      if (o.centerLabel) {
        var t = el('text', {
          x: 160, y: 165, 'text-anchor': 'middle', 'font-size': 16, fill: '#00d4aa', 'font-weight': 'bold'
        }, svg);
        t.textContent = o.centerLabel;
      }
    }
    fig.classList.add('donut-chart');
    return fig;
  }

  function renderHorizontalBarChart(containerId, opts) {
    var container = document.getElementById(containerId);
    if (!container) return null;
    var bars = (opts && opts.bars) || [];
    var title = (opts && opts.title) || '';
    var caption = (opts && opts.caption) || '';
    var unit = (opts && opts.unit) || '';
    var max = Math.max.apply(null, bars.map(function (b) { return +b.value || 0; }));
    var fig = document.createElement('figure');
    fig.className = 'chart-figure horizontal-bar';
    if (title) {
      var fc = document.createElement('figcaption');
      fc.className = 'chart-title';
      fc.textContent = title;
      fig.appendChild(fc);
    }
    var h = Math.max(220, bars.length * 34 + 40);
    var svg = el('svg', {
      class: 'svg-chart', viewBox: '0 0 800 ' + h, preserveAspectRatio: 'xMidYMid meet'
    });
    var labelW = 160, barStart = labelW + 10, barMaxW = 800 - barStart - 80;
    bars.forEach(function (b, i) {
      var y = 20 + i * 34;
      var w = max > 0 ? (b.value / max) * barMaxW : 0;
      var color = b.color || DEFAULT_COLORS[i % DEFAULT_COLORS.length];
      var lt = el('text', {
        x: labelW, y: y + 18, 'text-anchor': 'end', 'font-size': 12, fill: '#e8e8e8'
      }, svg);
      lt.textContent = b.label;
      el('rect', {
        x: barStart, y: y + 4, width: w, height: 22, fill: color, rx: 2
      }, svg);
      var vt = el('text', {
        x: barStart + w + 6, y: y + 20, 'font-size': 11, fill: '#a0a0a0'
      }, svg);
      vt.textContent = (b.value.toLocaleString ? b.value.toLocaleString() : b.value) + unit;
    });
    fig.appendChild(svg);
    if (caption) {
      var p = document.createElement('p');
      p.className = 'chart-caption';
      p.textContent = caption;
      fig.appendChild(p);
    }
    container.appendChild(fig);
    return fig;
  }

  function renderStackedBar(containerId, opts) {
    var container = document.getElementById(containerId);
    if (!container) return null;
    var categories = (opts && opts.categories) || [];
    var series = (opts && opts.series) || []; // [{name,color,values:[]}]
    var title = (opts && opts.title) || '';
    var caption = (opts && opts.caption) || '';
    var fig = document.createElement('figure');
    fig.className = 'chart-figure stacked-bar';
    if (title) {
      var fc = document.createElement('figcaption');
      fc.className = 'chart-title';
      fc.textContent = title;
      fig.appendChild(fc);
    }
    var svg = el('svg', {
      class: 'svg-chart', viewBox: '0 0 800 420', preserveAspectRatio: 'xMidYMid meet'
    });
    var plotL = 60, plotR = 780, plotT = 40, plotB = 340;
    var n = categories.length;
    var bw = (plotR - plotL) / n * 0.7;
    var step = (plotR - plotL) / n;
    // compute totals
    var totals = categories.map(function (_, i) {
      return series.reduce(function (s, sr) { return s + (+sr.values[i] || 0); }, 0);
    });
    var max = Math.max.apply(null, totals) || 1;
    // axes
    el('line', { x1: plotL, y1: plotB, x2: plotR, y2: plotB, stroke: '#333' }, svg);
    el('line', { x1: plotL, y1: plotT, x2: plotL, y2: plotB, stroke: '#333' }, svg);
    categories.forEach(function (cat, i) {
      var cx = plotL + step * (i + 0.5);
      var yBase = plotB;
      series.forEach(function (sr, si) {
        var v = +sr.values[i] || 0;
        var hh = (v / max) * (plotB - plotT);
        el('rect', {
          x: cx - bw / 2, y: yBase - hh, width: bw, height: hh,
          fill: sr.color || DEFAULT_COLORS[si % DEFAULT_COLORS.length]
        }, svg);
        yBase -= hh;
      });
      var lt = el('text', {
        x: cx, y: plotB + 16, 'text-anchor': 'middle', 'font-size': 11, fill: '#a0a0a0'
      }, svg);
      lt.textContent = cat;
    });
    // legend
    series.forEach(function (sr, si) {
      var lx = plotL + si * 140;
      el('rect', { x: lx, y: 10, width: 12, height: 12, fill: sr.color || DEFAULT_COLORS[si % DEFAULT_COLORS.length] }, svg);
      var lt = el('text', { x: lx + 18, y: 20, 'font-size': 11, fill: '#e8e8e8' }, svg);
      lt.textContent = sr.name;
    });
    fig.appendChild(svg);
    if (caption) {
      var p = document.createElement('p');
      p.className = 'chart-caption';
      p.textContent = caption;
      fig.appendChild(p);
    }
    container.appendChild(fig);
    return fig;
  }

  function renderHistoricalTimeline(containerId, opts) {
    var container = document.getElementById(containerId);
    if (!container) return null;
    var events = (opts && opts.events) || [];
    var title = (opts && opts.title) || '';
    var wrap = document.createElement('figure');
    wrap.className = 'chart-figure historical-timeline';
    if (title) {
      var fc = document.createElement('figcaption');
      fc.className = 'chart-title';
      fc.textContent = title;
      wrap.appendChild(fc);
    }
    var ul = document.createElement('ul');
    ul.className = 'historical-timeline-list';
    events.forEach(function (ev) {
      var li = document.createElement('li');
      li.className = 'historical-timeline-item';
      var yr = document.createElement('div');
      yr.className = 'ht-year';
      yr.textContent = ev.year;
      var card = document.createElement('div');
      card.className = 'ht-card';
      var t = document.createElement('div');
      t.className = 'ht-title';
      t.textContent = ev.title || '';
      var d = document.createElement('div');
      d.className = 'ht-desc';
      d.textContent = ev.desc || '';
      card.appendChild(t);
      card.appendChild(d);
      li.appendChild(yr);
      li.appendChild(card);
      ul.appendChild(li);
    });
    wrap.appendChild(ul);
    container.appendChild(wrap);
    return wrap;
  }

  function renderSummaryDashboard(containerId, opts) {
    var container = document.getElementById(containerId);
    if (!container) return null;
    var o = opts || {};
    var section = document.createElement('section');
    section.className = 'summary-dashboard';
    if (o.heading) {
      var h = document.createElement('h2');
      h.className = 'dashboard-heading';
      h.textContent = o.heading;
      section.appendChild(h);
    }
    // stats
    if (o.stats && o.stats.length) {
      var statsWrap = document.createElement('div');
      statsWrap.className = 'dashboard-stats';
      o.stats.forEach(function (s) {
        var card = document.createElement('div');
        card.className = 'dashboard-stat';
        var lab = document.createElement('div');
        lab.className = 'stat-label';
        lab.textContent = s.label || '';
        var val = document.createElement('div');
        val.className = 'stat-value';
        val.textContent = s.value || '';
        var sub = document.createElement('div');
        sub.className = 'stat-sub';
        sub.textContent = s.sub || '';
        card.appendChild(lab);
        card.appendChild(val);
        card.appendChild(sub);
        statsWrap.appendChild(card);
      });
      section.appendChild(statsWrap);
    }
    // nav grid
    if (o.navGroups && o.navGroups.length) {
      var nav = document.createElement('div');
      nav.className = 'dashboard-nav-grid';
      o.navGroups.forEach(function (g) {
        var gd = document.createElement('div');
        gd.className = 'dashboard-nav-group';
        var gt = document.createElement('div');
        gt.className = 'nav-group-title';
        gt.textContent = g.title || '';
        gd.appendChild(gt);
        (g.links || []).forEach(function (lk) {
          var a = document.createElement('a');
          a.className = 'nav-link-card';
          a.href = lk.href || '#';
          a.textContent = lk.label || '';
          gd.appendChild(a);
        });
        nav.appendChild(gd);
      });
      section.appendChild(nav);
    }
    // highlights
    if (o.highlights && o.highlights.length) {
      var hi = document.createElement('div');
      hi.className = 'dashboard-highlights';
      var ht = document.createElement('h3');
      ht.textContent = o.highlightsTitle || 'Historical Highlights';
      hi.appendChild(ht);
      var ul = document.createElement('ul');
      ul.className = 'historical-timeline-list compact';
      o.highlights.forEach(function (ev) {
        var li = document.createElement('li');
        li.className = 'historical-timeline-item';
        var yr = document.createElement('div');
        yr.className = 'ht-year';
        yr.textContent = ev.year;
        var card = document.createElement('div');
        card.className = 'ht-card';
        var t = document.createElement('div');
        t.className = 'ht-title';
        t.textContent = ev.title || '';
        var d = document.createElement('div');
        d.className = 'ht-desc';
        d.textContent = ev.desc || '';
        card.appendChild(t);
        card.appendChild(d);
        li.appendChild(yr);
        li.appendChild(card);
        ul.appendChild(li);
      });
      hi.appendChild(ul);
      section.appendChild(hi);
    }
    container.appendChild(section);
    return section;
  }

  // Export
  var api = {
    renderAnnotatedLineChart: renderAnnotatedLineChart,
    renderBarChart: renderBarChart,
    renderEventTimeline: renderEventTimeline,
    renderDualAxisChart: renderDualAxisChart,
    renderGanttChart: renderGanttChart,
    renderPieChart: renderPieChart,
    renderDonutChart: renderDonutChart,
    renderHorizontalBarChart: renderHorizontalBarChart,
    renderStackedBar: renderStackedBar,
    renderHistoricalTimeline: renderHistoricalTimeline,
    renderSummaryDashboard: renderSummaryDashboard
  };

  global.G10Charts = api;
  // Convenience globals
  global.renderAnnotatedLineChart = renderAnnotatedLineChart;
  global.renderBarChart = renderBarChart;
  global.renderEventTimeline = renderEventTimeline;
  global.renderDualAxisChart = renderDualAxisChart;
  global.renderGanttChart = renderGanttChart;
  global.renderPieChart = renderPieChart;
  global.renderDonutChart = renderDonutChart;
  global.renderHorizontalBarChart = renderHorizontalBarChart;
  global.renderStackedBar = renderStackedBar;
  global.renderHistoricalTimeline = renderHistoricalTimeline;
  global.renderSummaryDashboard = renderSummaryDashboard;
})(typeof window !== 'undefined' ? window : this);
