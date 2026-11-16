'use strict';
document.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('.site-header');
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('#main-nav');
  const mobile = window.matchMedia('(max-width: 760px)');
  const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
  function setMenu(open, restoreFocus = false) {
    if (!toggle || !nav) return;
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
    nav.classList.toggle('is-open', open);
    document.body.classList.toggle('menu-open', open);
    if (open) nav.querySelector('a')?.focus();
    if (restoreFocus) toggle.focus();
  }
  toggle?.addEventListener('click', () => setMenu(toggle.getAttribute('aria-expanded') !== 'true'));
  nav?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => setMenu(false)));
  mobile.addEventListener('change', () => setMenu(false));
  document.addEventListener('keydown', event => {
    if (toggle?.getAttribute('aria-expanded') !== 'true') return;
    if (event.key === 'Escape') setMenu(false, true);
    if (event.key === 'Tab') {
      const items = [toggle, ...nav.querySelectorAll('a')];
      const first = items[0], last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault(); last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault(); first.focus();
      }
    }
  });
  const syncHeader = () => header?.classList.toggle('is-scrolled', window.scrollY > 10);
  syncHeader();
  window.addEventListener('scroll', syncHeader, { passive: true });
  document.querySelectorAll('[data-year]').forEach(el => { el.textContent = new Date().getFullYear(); });
  if ('IntersectionObserver' in window && !motion.matches) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.08 });
    document.querySelectorAll('.reveal').forEach(el => {
      if (el.getBoundingClientRect().top > window.innerHeight) el.classList.add('will-reveal');
      observer.observe(el);
    });
  }
  const rows = document.querySelectorAll('.service-row');
  rows.forEach(row => row.addEventListener('toggle', () => {
    if (row.open) rows.forEach(other => { if (other !== row) other.open = false; });
  }));
  const gallery = [...document.querySelectorAll('[data-gallery-index]')];
  const dialog = document.querySelector('.lightbox');
  if (dialog && gallery.length) {
    let current = 0, opener;
    const image = dialog.querySelector('.lightbox-stage img');
    const counter = dialog.querySelector('[data-lightbox-count]');
    const show = index => {
      current = (index + gallery.length) % gallery.length;
      const source = gallery[current].querySelector('img');
      image.src = source.getAttribute('src');
      image.alt = source.alt;
      counter.textContent = `${String(current + 1).padStart(2, '0')} / ${String(gallery.length).padStart(2, '0')}`;
    };
    gallery.forEach((button, index) => button.addEventListener('click', () => {
      opener = button; show(index); dialog.showModal();
      document.body.style.overflow = 'hidden';
    }));
    dialog.querySelector('[data-lightbox-close]').addEventListener('click', () => dialog.close());
    dialog.querySelector('[data-lightbox-prev]').addEventListener('click', () => show(current - 1));
    dialog.querySelector('[data-lightbox-next]').addEventListener('click', () => show(current + 1));
    dialog.addEventListener('keydown', event => {
      if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
        event.preventDefault(); show(current + (event.key === 'ArrowRight' ? 1 : -1));
      }
    });
    dialog.addEventListener('close', () => {
      document.body.style.overflow = '';
      image.removeAttribute('src');
      opener?.focus();
    });
    dialog.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });
  }
  const form = document.querySelector('.contact-form');
  if (form) {
    const next = form.querySelector('[name="_next"]');
    if (next) next.value = new URL('obrigado.html', window.location.href).href;
    form.addEventListener('submit', () => {
      const button = form.querySelector('[type="submit"]');
      button.disabled = true;
      button.setAttribute('aria-busy', 'true');
      form.querySelector('.form-status').textContent = 'Enviando seu projeto…';
    });
    window.addEventListener('pageshow', () => {
      const button = form.querySelector('[type="submit"]');
      button.disabled = false;
      button.removeAttribute('aria-busy');
      form.querySelector('.form-status').textContent = '';
    });
  }
});
