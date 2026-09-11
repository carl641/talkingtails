/* Talking Tails — small progressive-enhancement layer.
   Nothing here is required for the content to work. */
(function () {
  'use strict';

  /* Mobile navigation ---------------------------------------------------- */
  var burger = document.querySelector('.burger');
  var nav = document.getElementById('primary-nav');

  if (burger && nav) {
    burger.addEventListener('click', function () {
      var open = burger.getAttribute('aria-expanded') === 'true';
      burger.setAttribute('aria-expanded', String(!open));
      nav.classList.toggle('is-open', !open);
    });

    nav.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') {
        burger.setAttribute('aria-expanded', 'false');
        nav.classList.remove('is-open');
      }
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && nav.classList.contains('is-open')) {
        burger.setAttribute('aria-expanded', 'false');
        nav.classList.remove('is-open');
        burger.focus();
      }
    });
  }

  /* Nav dropdowns --------------------------------------------------------- */
  /* Hover and focus open the panel in CSS; this adds click and keyboard, and
     is the only thing driving the accordion on the mobile panel. */
  var desktop = window.matchMedia('(min-width: 861px)');

  Array.prototype.forEach.call(
    document.querySelectorAll('.nav__group'),
    function (group) {
      var toggle = group.querySelector('.nav__toggle');
      if (!toggle) return;

      var setOpen = function (open) {
        group.classList.toggle('is-open', open);
        toggle.setAttribute('aria-expanded', String(open));
      };

      toggle.addEventListener('click', function () {
        setOpen(toggle.getAttribute('aria-expanded') !== 'true');
      });

      group.addEventListener('keydown', function (e) {
        if (e.key !== 'Escape' || !group.classList.contains('is-open')) return;
        e.stopPropagation();          /* leave the mobile panel itself open */
        setOpen(false);
        toggle.focus();
      });

      /* Only the floating desktop panel needs to close itself again. */
      group.addEventListener('mouseleave', function () {
        if (desktop.matches) setOpen(false);
      });

      group.addEventListener('focusout', function (e) {
        if (desktop.matches && !group.contains(e.relatedTarget)) setOpen(false);
      });

      document.addEventListener('click', function (e) {
        if (desktop.matches && !group.contains(e.target)) setOpen(false);
      });
    }
  );

  /* Hairline under the masthead once the page scrolls ---------------------- */
  var masthead = document.querySelector('.masthead');
  if (masthead) {
    var onScroll = function () {
      masthead.classList.toggle('is-stuck', window.scrollY > 8);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* Newsletter dialog ----------------------------------------------------- */
  var newsletter = document.getElementById('newsletter');

  if (newsletter) {
    var openNewsletter = function () {
      if (typeof newsletter.showModal === 'function') {
        newsletter.showModal();
      } else {
        newsletter.setAttribute('open', '');  /* no <dialog> support */
      }
    };

    var closeNewsletter = function () {
      if (typeof newsletter.close === 'function') {
        newsletter.close();
      } else {
        newsletter.removeAttribute('open');
      }
    };

    Array.prototype.forEach.call(
      document.querySelectorAll('[data-newsletter-open]'),
      function (btn) { btn.addEventListener('click', openNewsletter); }
    );

    Array.prototype.forEach.call(
      document.querySelectorAll('[data-newsletter-close]'),
      function (btn) { btn.addEventListener('click', closeNewsletter); }
    );

    /* Clicking the backdrop closes. The click lands on the dialog itself, so
       compare against its box to avoid catching clicks on its own padding. */
    newsletter.addEventListener('click', function (e) {
      if (e.target !== newsletter) return;
      var box = newsletter.getBoundingClientRect();
      var inside = e.clientX >= box.left && e.clientX <= box.right &&
                   e.clientY >= box.top && e.clientY <= box.bottom;
      if (!inside) closeNewsletter();
    });
  }

  /* Scroll reveals -------------------------------------------------------- */
  var reveals = document.querySelectorAll('.reveal');
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (!reveals.length) return;

  if (reduced || !('IntersectionObserver' in window)) {
    Array.prototype.forEach.call(reveals, function (el) { el.classList.add('is-in'); });
    return;
  }

  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-in');
        io.unobserve(entry.target);
      }
    });
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.12 });

  Array.prototype.forEach.call(reveals, function (el) { io.observe(el); });
})();
