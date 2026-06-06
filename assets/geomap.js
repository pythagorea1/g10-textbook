/**
 * GeoMap — Interactive Geopolitical World Map Engine
 * Pure Vanilla JS, no external dependencies.
 *
 * Usage:
 *   const map = new GeoMap({
 *     mapContainer: '#world-map',
 *     timelineContainer: '#timeline',
 *     eventListContainer: '#event-list',
 *     detailContainer: '#event-detail'
 *   });
 *   map.loadEvents('../data/geopolitical_events.json').then(() => map.init());
 */
(function (global) {
  'use strict';

  const SEVERITY_CLASS = {
    epicenter: 'epicenter',
    critical: 'affected-critical',
    high: 'affected-high',
    medium: 'affected-medium',
    low: 'affected-low'
  };

  const FLOW_COLORS = {
    contagion: '#ff6b6b',
    policy: '#5b8def',
    trade: '#00d4aa',
    capital: '#ff9f43',
    sanction: '#ffd93d',
    currency_pressure: '#ff9f43'
  };

  // JP labels used to render "related" textbook links in the detail panel.
  const COUNTRY_JP = {
    us: '米国', eurozone: 'ユーロ圏', japan: '日本', uk: '英国',
    switzerland: 'スイス', australia: '豪州', newzealand: 'ニュージーランド',
    canada: 'カナダ', sweden: 'スウェーデン', norway: 'ノルウェー'
  };
  const CHAPTER_JP = {
    '01_central_bank': '中央銀行', '02_policy_rate': '政策金利',
    '03_fiscal_policy': '財政政策', '04_employment': '雇用',
    '05_inflation': 'インフレ', '06_equity_overview': '株式概観',
    '07_equity_early': '株式(初期)', '08_equity_modern': '株式(現代)',
    '09_equity_recent': '株式(近年)', '10_equity_current': '株式(現在)',
    '11_bond_market': '債券市場', '12_short_rates': '短期金利',
    '13_long_rates': '長期金利', '14_currency': '通貨',
    '15_crises': '危機', '16_banking': '銀行',
    '17_corporate': '企業', '18_regulation': '規制',
    '19_trade': '貿易', '20_lessons': '教訓'
  };

  class GeoMap {
    constructor(opts) {
      this.opts = Object.assign({
        mapContainer: '#world-map',
        timelineContainer: '#timeline',
        eventListContainer: '#event-list',
        detailContainer: '#event-detail',
        yearRange: [1970, 2026]
      }, opts || {});
      this.events = [];
      this.currentYear = this.opts.yearRange[1];
      this.currentEventId = null;
      this.categoryFilter = new Set();
    }

    async loadEvents(url) {
      try {
        const res = await fetch(url);
        const data = await res.json();
        this.events = Array.isArray(data) ? data : (data.events || []);
      } catch (err) {
        console.error('GeoMap: failed to load events', err);
        this.events = (global.GEOPOLITICAL_EVENTS && global.GEOPOLITICAL_EVENTS.events) || [];
      }
      return this.events;
    }

    init() {
      this.renderTimelineSlider();
      this.renderEventList(this.currentYear);
      this._attachMapHandlers();
    }

    renderTimelineSlider() {
      const el = document.querySelector(this.opts.timelineContainer);
      if (!el) return;
      const [minY, maxY] = this.opts.yearRange;
      el.innerHTML = `
        <label class="timeline-label">Year: <span class="timeline-year">${this.currentYear}</span></label>
        <input type="range" class="timeline-slider" min="${minY}" max="${maxY}" value="${this.currentYear}" step="1" />
        <div class="timeline-ticks"><span>${minY}</span><span>${Math.round((minY + maxY) / 2)}</span><span>${maxY}</span></div>
      `;
      const slider = el.querySelector('input[type=range]');
      const yearLabel = el.querySelector('.timeline-year');
      slider.addEventListener('input', (e) => {
        this.currentYear = parseInt(e.target.value, 10);
        yearLabel.textContent = this.currentYear;
        this.renderEventList(this.currentYear);
      });
    }

    renderEventList(year) {
      const el = document.querySelector(this.opts.eventListContainer);
      if (!el) return;
      // Pool = all events passing the active category filter
      const pool = this.categoryFilter.size > 0
        ? this.events.filter(ev => this.categoryFilter.has(ev.category))
        : this.events;
      let events = pool.filter(ev => ev.year === year);
      let fallbackNote = '';
      if (events.length === 0) {
        // Fallback 1: widen to a ±2 year window (still respecting the filter)
        let nearest = pool
          .map(ev => ({ ev, diff: Math.abs(ev.year - year) }))
          .filter(x => x.diff <= 2)
          .sort((a, b) => a.diff - b.diff);
        // Fallback 2: nearest 5 overall (still respecting the filter)
        if (nearest.length === 0) {
          nearest = pool
            .map(ev => ({ ev, diff: Math.abs(ev.year - year) }))
            .sort((a, b) => a.diff - b.diff)
            .slice(0, 5);
        }
        events = nearest.slice(0, 5).map(x => x.ev);
        if (events.length > 0) {
          const yrs = Array.from(new Set(events.map(e => e.year))).sort((a, b) => a - b);
          fallbackNote = `<p class="event-list-fallback">— 近接イベントを表示中 (${yrs.join(', ')})</p>`;
        }
      }
      el.innerHTML = fallbackNote + events.map(ev => `
        <div class="event-card" data-event-id="${ev.id}">
          <div class="event-card-year">${ev.year}${ev.month ? '-' + String(ev.month).padStart(2, '0') : ''}</div>
          <div class="event-card-title">${this._esc(ev.title)}</div>
          <div class="event-card-category">${this._esc(ev.category || '')}</div>
        </div>
      `).join('') || '<p class="event-list-empty">該当イベントなし</p>';
      el.querySelectorAll('.event-card').forEach(card => {
        card.addEventListener('click', () => this.highlightEvent(card.dataset.eventId));
      });
    }

    setCategoryFilter(categories) {
      this.categoryFilter = new Set(categories || []);
      this.renderEventList(this.currentYear);
    }

    highlightEvent(eventId) {
      const ev = this.events.find(e => e.id === eventId);
      if (!ev) return;
      this.currentEventId = eventId;
      this._clearMap();
      this._paintCountries(ev);
      this.drawFlows(ev.flows || []);
      this.updateDetailPanel(ev);
      const listEl = document.querySelector(this.opts.eventListContainer);
      if (listEl) {
        listEl.querySelectorAll('.event-card').forEach(c => {
          c.classList.toggle('active', c.dataset.eventId === eventId);
        });
      }
    }

    _clearMap() {
      const svg = this._getSvg();
      if (!svg) return;
      svg.querySelectorAll('[id^="country-"]').forEach(el => {
        el.classList.remove('epicenter', 'affected-critical', 'affected-high', 'affected-medium', 'affected-mid', 'affected-low');
      });
      const fg = svg.querySelector('#flow-layer');
      if (fg) fg.innerHTML = '';
    }

    _paintCountries(ev) {
      const svg = this._getSvg();
      if (!svg) return;
      if (ev.epicenter) {
        const ep = svg.querySelector('#country-' + ev.epicenter);
        if (ep) ep.classList.add('epicenter');
      }
      (ev.affected || []).forEach(a => {
        const el = svg.querySelector('#country-' + a.country);
        if (el) {
          const cls = SEVERITY_CLASS[a.impact] || 'affected-low';
          el.classList.add(cls);
          el.setAttribute('data-tooltip', a.note || '');
        }
      });
    }

    drawFlows(flows) {
      const svg = this._getSvg();
      if (!svg) return;
      let layer = svg.querySelector('#flow-layer');
      if (!layer) {
        layer = document.createElementNS('http://www.w3.org/2000/svg', 'g');
        layer.setAttribute('id', 'flow-layer');
        svg.appendChild(layer);
      }
      this._ensureArrowMarkers(svg);
      flows.forEach(f => this.drawArrow(f.from, f.to, f.type, f.label));
    }

    drawArrow(fromId, toId, type, label) {
      const svg = this._getSvg();
      if (!svg) return;
      const from = svg.querySelector('#country-' + fromId);
      const to = svg.querySelector('#country-' + toId);
      if (!from || !to) return;
      const p1 = this._centerOf(from);
      const p2 = this._centerOf(to);
      if (!p1 || !p2) return;
      const layer = svg.querySelector('#flow-layer');
      const color = FLOW_COLORS[type] || '#ffffff';
      // Bezier control point: perpendicular offset from midpoint for smooth arc
      const dx = p2.x - p1.x;
      const dy = p2.y - p1.y;
      const dist = Math.sqrt(dx * dx + dy * dy) || 1;
      const curvature = Math.min(0.35, 40 / dist + 0.15);
      const mx = (p1.x + p2.x) / 2 + (-dy / dist) * dist * curvature;
      const my = (p1.y + p2.y) / 2 + (dx / dist) * dist * curvature - 10;
      const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      path.setAttribute('d', `M ${p1.x},${p1.y} Q ${mx},${my} ${p2.x},${p2.y}`);
      path.setAttribute('fill', 'none');
      path.setAttribute('stroke', color);
      path.setAttribute('stroke-width', '2');
      path.setAttribute('stroke-dasharray', type === 'sanction' ? '4,3' : '0');
      path.setAttribute('marker-end', `url(#arrow-${type || 'default'})`);
      path.setAttribute('class', 'flow-arrow flow-' + (type || 'default'));
      layer.appendChild(path);
      if (label) {
        const txt = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        txt.setAttribute('x', mx);
        txt.setAttribute('y', my - 4);
        txt.setAttribute('fill', color);
        txt.setAttribute('font-size', '10');
        txt.setAttribute('text-anchor', 'middle');
        txt.textContent = label;
        layer.appendChild(txt);
      }
    }

    _ensureArrowMarkers(svg) {
      let defs = svg.querySelector('defs');
      if (!defs) {
        defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
        svg.insertBefore(defs, svg.firstChild);
      }
      if (defs.querySelector('#arrow-default')) return;
      const types = Object.keys(FLOW_COLORS).concat(['default']);
      types.forEach(t => {
        const m = document.createElementNS('http://www.w3.org/2000/svg', 'marker');
        m.setAttribute('id', 'arrow-' + t);
        m.setAttribute('viewBox', '0 0 10 10');
        m.setAttribute('refX', '9');
        m.setAttribute('refY', '5');
        m.setAttribute('markerWidth', '6');
        m.setAttribute('markerHeight', '6');
        m.setAttribute('orient', 'auto-start-reverse');
        const p = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        p.setAttribute('d', 'M 0 0 L 10 5 L 0 10 z');
        p.setAttribute('fill', FLOW_COLORS[t] || '#ffffff');
        m.appendChild(p);
        defs.appendChild(m);
      });
    }

    _centerOf(el) {
      try {
        const bb = el.getBBox();
        return { x: bb.x + bb.width / 2, y: bb.y + bb.height / 2 };
      } catch (e) {
        return null;
      }
    }

    updateDetailPanel(ev) {
      const el = document.querySelector(this.opts.detailContainer);
      if (!el) return;
      el.innerHTML = `
        <h3 class="detail-title">${this._esc(ev.title)}</h3>
        <div class="detail-meta">
          <span class="detail-year">${ev.year}${ev.month ? '-' + String(ev.month).padStart(2, '0') : ''}</span>
          <span class="detail-category">${this._esc(ev.category || '')}</span>
          <span class="detail-severity severity-${ev.severity || 'medium'}">${this._esc(ev.severity || '')}</span>
        </div>
        <p class="detail-narrative">${this._esc(ev.narrative || '')}</p>
        <h4>影響国</h4>
        <ul class="detail-affected">
          ${(ev.affected || []).map(a => `<li><strong>${a.country}</strong> (${a.impact}): ${this._esc(a.note || '')}</li>`).join('')}
        </ul>
        ${this._renderRelated(ev)}
      `;
    }

    _renderRelated(ev) {
      const rel = Array.isArray(ev.related) ? ev.related : [];
      if (rel.length === 0) return '';
      const links = rel.map(href =>
        `<a class="detail-related-link" href="${this._esc(href)}">📖 ${this._esc(this._relatedLabel(href))}</a>`
      ).join('');
      return `<div class="detail-related"><h4>📖 教科書で読む</h4>${links}</div>`;
    }

    _relatedLabel(href) {
      const m = String(href).match(/(?:^|\/)([a-z]+)\/(\d{2}_[a-z_]+)\.html(?:[#?].*)?$/);
      if (m && COUNTRY_JP[m[1]]) {
        return COUNTRY_JP[m[1]] + '・' + (CHAPTER_JP[m[2]] || m[2]);
      }
      if (/g10_timeline\.html/.test(href)) return 'G10タイムライン';
      return String(href).replace(/^(\.\.\/)+/, '').replace(/\.html.*$/, '');
    }

    _attachMapHandlers() {
      const svg = this._getSvg();
      if (!svg) return;
      const tooltip = this._ensureTooltip();
      svg.querySelectorAll('[id^="country-"]').forEach(el => {
        el.addEventListener('mousemove', (e) => {
          const name = el.getAttribute('data-name') || el.id.replace('country-', '');
          const note = el.getAttribute('data-tooltip') || '';
          tooltip.innerHTML = `<strong>${name}</strong>${note ? '<br>' + note : ''}`;
          tooltip.style.display = 'block';
          tooltip.style.left = (e.pageX + 12) + 'px';
          tooltip.style.top = (e.pageY + 12) + 'px';
        });
        el.addEventListener('mouseleave', () => {
          tooltip.style.display = 'none';
        });
      });
    }

    _ensureTooltip() {
      let tt = document.querySelector('.geomap-tooltip');
      if (!tt) {
        tt = document.createElement('div');
        tt.className = 'geomap-tooltip';
        document.body.appendChild(tt);
      }
      return tt;
    }

    _getSvg() {
      const container = document.querySelector(this.opts.mapContainer);
      if (!container) return null;
      return container.tagName.toLowerCase() === 'svg' ? container : container.querySelector('svg');
    }

    _esc(s) {
      return String(s == null ? '' : s)
        .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
    }
  }

  global.GeoMap = GeoMap;
})(typeof window !== 'undefined' ? window : this);
