(() => {
  'use strict';
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.getElementById('primary-nav');
  if (toggle && nav) {
    const close = () => {
      nav.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
    };
    toggle.addEventListener('click', () => {
      const open = toggle.getAttribute('aria-expanded') !== 'true';
      toggle.setAttribute('aria-expanded', String(open));
      nav.classList.toggle('is-open', open);
    });
    nav.addEventListener('click', event => {
      if (event.target.closest('a')) close();
    });
    document.addEventListener('keydown', event => {
      if (event.key === 'Escape' && nav.classList.contains('is-open')) {
        close();
        toggle.focus();
      }
    });
    document.addEventListener('click', event => {
      if (!event.target.closest('.header-inner')) close();
    });
    window.matchMedia('(min-width: 1100px)').addEventListener('change', close);
  }
  const search = document.getElementById('publication-search');
  const year = document.getElementById('publication-year');
  const type = document.getElementById('publication-type');
  if (search && year && type) {
    const papers = [...document.querySelectorAll('.publication-item')];
    const empty = document.getElementById('publication-empty');
    const filter = () => {
      const query = search.value.trim().toLocaleLowerCase();
      let matches = 0;
      papers.forEach(paper => {
        const haystack = `${paper.textContent} ${paper.dataset.search || ''}`.toLocaleLowerCase();
        const show = haystack.includes(query)
          && (!year.value || paper.dataset.year === year.value)
          && (!type.value || paper.dataset.type === type.value);
        paper.hidden = !show;
        if (show) matches += 1;
      });
      if (empty) empty.hidden = matches > 0;
    };
    search.addEventListener('input', filter);
    year.addEventListener('change', filter);
    type.addEventListener('change', filter);
  }
})();
