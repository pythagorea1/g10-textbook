/**
 * G10 Textbook — Reading Enhancer
 * Auto-generates: page TOC, reading progress bar, section highlighting
 * No dependencies. Works with file:// protocol.
 */
(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', init);

  function init() {
    setupMobileSidebar();

    var article = document.querySelector('article');
    if (!article) return;

    var headings = article.querySelectorAll('h2, h3');
    if (headings.length < 2) return;

    assignIds(headings);
    createProgressBar();
    createInlineToc(headings, article);

    if (window.innerWidth >= 1400) {
      createSidebarToc(headings);
    }
  }

  /* ---- Mobile sidebar overlay & improved toggle ---- */
  function setupMobileSidebar() {
    var sidebar = document.querySelector('.sidebar');
    var toggle = document.querySelector('.menu-toggle');
    if (!sidebar || !toggle) return;

    // Create overlay
    var overlay = document.createElement('div');
    overlay.className = 'sidebar-overlay';
    document.body.appendChild(overlay);

    function openSidebar() {
      sidebar.classList.add('open');
      overlay.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
    function closeSidebar() {
      sidebar.classList.remove('open');
      overlay.classList.remove('active');
      document.body.style.overflow = '';
    }

    // Replace inline onclick with proper handler
    toggle.removeAttribute('onclick');
    toggle.addEventListener('click', function (e) {
      e.stopPropagation();
      if (sidebar.classList.contains('open')) {
        closeSidebar();
      } else {
        openSidebar();
      }
    });

    // Close on overlay tap
    overlay.addEventListener('click', closeSidebar);

    // Close on sidebar link click (navigation)
    sidebar.addEventListener('click', function (e) {
      if (e.target.closest('.sidebar-link') || e.target.closest('.country-chip')) {
        closeSidebar();
      }
    });

    // Close on Escape key
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && sidebar.classList.contains('open')) {
        closeSidebar();
      }
    });

    // Swipe-to-close gesture
    var touchStartX = 0;
    sidebar.addEventListener('touchstart', function (e) {
      touchStartX = e.touches[0].clientX;
    }, { passive: true });
    sidebar.addEventListener('touchend', function (e) {
      var dx = e.changedTouches[0].clientX - touchStartX;
      if (dx < -60) { closeSidebar(); }
    }, { passive: true });
  }

  /* ---- Assign IDs to headings ---- */
  function assignIds(headings) {
    var usedIds = {};
    for (var i = 0; i < headings.length; i++) {
      var h = headings[i];
      if (h.id) continue;
      var base = 'sec-' + slugify(h.textContent);
      var id = base;
      var n = 2;
      while (usedIds[id]) { id = base + '-' + n; n++; }
      h.id = id;
      usedIds[id] = true;
    }
  }

  function slugify(text) {
    return text.replace(/[^\w\u3000-\u9FFF]+/g, '-')
               .replace(/^-|-$/g, '')
               .substring(0, 40)
               .toLowerCase();
  }

  /* ---- Reading Progress Bar ---- */
  function createProgressBar() {
    var wrap = document.createElement('div');
    wrap.className = 'reading-progress';
    wrap.innerHTML = '<div class="reading-progress-bar"></div>';
    document.body.appendChild(wrap);

    var bar = wrap.firstChild;
    var ticking = false;

    window.addEventListener('scroll', function () {
      if (!ticking) {
        requestAnimationFrame(function () {
          var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
          var docHeight = document.documentElement.scrollHeight - window.innerHeight;
          bar.style.width = (docHeight > 0 ? (scrollTop / docHeight) * 100 : 0) + '%';
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });
  }

  /* ---- Inline TOC (inside content, after stat-grid or before first h2) ---- */
  function createInlineToc(headings, article) {
    var h2List = [];
    for (var i = 0; i < headings.length; i++) {
      if (headings[i].tagName === 'H2') {
        h2List.push(headings[i]);
      }
    }
    if (h2List.length < 2) return;

    var nav = document.createElement('nav');
    nav.className = 'inline-toc';
    nav.setAttribute('aria-label', 'Page contents');

    var label = document.createElement('div');
    label.className = 'inline-toc-label';
    label.textContent = 'Contents';
    nav.appendChild(label);

    var ol = document.createElement('ol');
    for (var j = 0; j < h2List.length; j++) {
      var li = document.createElement('li');
      var a = document.createElement('a');
      a.href = '#' + h2List[j].id;
      a.textContent = h2List[j].textContent.replace(/#$/, '').trim();
      a.addEventListener('click', smoothScroll(h2List[j]));
      li.appendChild(a);
      ol.appendChild(li);
    }
    nav.appendChild(ol);

    // Insert after chart-figure following stat-grid, or after stat-grid, or before first h2
    var statGrid = article.querySelector('.stat-grid');
    var firstChart = null;
    if (statGrid) {
      var next = statGrid.nextElementSibling;
      if (next && next.classList.contains('chart-figure')) {
        firstChart = next;
      }
    }
    var insertAfter = firstChart || statGrid || null;
    if (insertAfter && insertAfter.nextSibling) {
      insertAfter.parentNode.insertBefore(nav, insertAfter.nextSibling);
    } else if (h2List[0]) {
      h2List[0].parentNode.insertBefore(nav, h2List[0]);
    }
  }

  /* ---- Sticky Sidebar TOC (wide screens) ---- */
  function createSidebarToc(headings) {
    var sidebar = document.createElement('nav');
    sidebar.className = 'auto-toc-sidebar';
    sidebar.setAttribute('aria-label', 'On this page');

    var title = document.createElement('div');
    title.className = 'toc-title';
    title.textContent = 'On This Page';
    sidebar.appendChild(title);

    for (var i = 0; i < headings.length; i++) {
      var h = headings[i];
      var a = document.createElement('a');
      a.href = '#' + h.id;
      a.textContent = h.textContent.replace(/#$/, '').trim();
      if (h.tagName === 'H3') a.className = 'toc-h3';
      a.addEventListener('click', smoothScroll(h));
      sidebar.appendChild(a);
    }

    document.body.appendChild(sidebar);

    // Intersection observer for active section
    if ('IntersectionObserver' in window) {
      var links = sidebar.querySelectorAll('a');
      var observer = new IntersectionObserver(function (entries) {
        for (var e = 0; e < entries.length; e++) {
          if (entries[e].isIntersecting) {
            for (var l = 0; l < links.length; l++) {
              links[l].classList.remove('toc-active');
            }
            var active = sidebar.querySelector('a[href="#' + entries[e].target.id + '"]');
            if (active) active.classList.add('toc-active');
          }
        }
      }, { rootMargin: '-15% 0px -65% 0px' });

      for (var k = 0; k < headings.length; k++) {
        observer.observe(headings[k]);
      }
    }
  }

  /* ---- Smooth scroll helper ---- */
  function smoothScroll(target) {
    return function (e) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      // Update URL hash without jumping
      if (history.replaceState) {
        history.replaceState(null, '', '#' + target.id);
      }
    };
  }
})();
