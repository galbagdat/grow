/* ==========================================================================
   ICU Kazakhstan landing — main interactivity
   ========================================================================== */

(function () {
  'use strict';

  /* ------------------------------------------------------------------------
     CONFIG — заменить перед запуском в прод
     ------------------------------------------------------------------------ */
  const CONFIG = {
    // WhatsApp Business номер ICU KZ (без + и пробелов).
    whatsappNumber: '77077337217',

    // База pre-filled сообщений по источникам кликов (data-wa-source).
    // Источник передаётся в текст сообщения — бот по нему разводит сценарий.
    waMessages: {
      hero_program:  'Здравствуйте! Хочу получить программу 8 модулей ICU. Источник: hero_program',
      hero_price:    'Здравствуйте! Хочу узнать стоимость программы ICU. Источник: hero_price',
      modules_pdf:   'Здравствуйте! Пришлите, пожалуйста, полную программу ICU в PDF. Источник: modules_pdf',
      contact_wa:    'Здравствуйте! У меня есть вопрос по программе ICU. Источник: contact_wa',
      floating:      'Здравствуйте! Хочу узнать о сертификации ICU. Источник: floating',
      form_submit:   'Здравствуйте! Я оставил(а) заявку на сайте. Имя: {name}. Источник: form_submit',
      default:       'Здравствуйте! Хочу узнать о программе ICU.'
    }
  };

  /* ------------------------------------------------------------------------
     WhatsApp link builder
     ------------------------------------------------------------------------ */
  function buildWaUrl(source, vars) {
    vars = vars || {};
    let text = CONFIG.waMessages[source] || CONFIG.waMessages.default;
    Object.keys(vars).forEach(k => {
      text = text.replace(new RegExp('\\{' + k + '\\}', 'g'), vars[k]);
    });
    return 'https://wa.me/' + CONFIG.whatsappNumber + '?text=' + encodeURIComponent(text);
  }

  function attachWaLinks() {
    const links = document.querySelectorAll('[data-wa-source]');
    links.forEach(el => {
      const source = el.getAttribute('data-wa-source');
      el.setAttribute('href', buildWaUrl(source));
      el.setAttribute('target', '_blank');
      el.setAttribute('rel', 'noopener');
      el.addEventListener('click', () => trackEvent('cta_click', { source: source }));
    });
  }

  /* ------------------------------------------------------------------------
     Form validation + submission → WhatsApp redirect + analytics
     ------------------------------------------------------------------------ */
  function initForm() {
    const form = document.getElementById('lead-form');
    if (!form) return;

    const nameField = form.querySelector('input[name="name"]').parentElement;
    const phoneField = form.querySelector('input[name="phone"]').parentElement;
    const consentField = form.querySelector('input[name="consent"]').parentElement;

    function setError(field, hasError) {
      field.classList.toggle('has-error', hasError);
    }

    function validatePhone(value) {
      // KZ formats: +7XXXXXXXXXX, +7 700 123 45 67, 8 700 ...
      const digits = value.replace(/[^0-9]/g, '');
      if (digits.length === 11 && (digits.startsWith('7') || digits.startsWith('8'))) {
        return '+7' + digits.slice(1);
      }
      if (digits.length === 10) {
        return '+7' + digits;
      }
      return null;
    }

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      const name = form.elements['name'].value.trim();
      const phoneRaw = form.elements['phone'].value.trim();
      const consent = form.elements['consent'].checked;
      const phone = validatePhone(phoneRaw);

      const nameOk = name.length >= 2;
      const phoneOk = phone !== null;

      setError(nameField, !nameOk);
      setError(phoneField, !phoneOk);
      setError(consentField, !consent);

      if (!nameOk || !phoneOk || !consent) {
        // focus first invalid
        if (!nameOk) form.elements['name'].focus();
        else if (!phoneOk) form.elements['phone'].focus();
        else form.elements['consent'].focus();
        return;
      }

      trackEvent('form_submit', { source: 'final_form' });

      // На GitHub Pages бэкенда нет — открываем WhatsApp с pre-filled сообщением.
      // На проде здесь будет fetch('/api/lead', { method:'POST', ... }) на webhook бота
      // (Yandex Cloud + n8n), а WhatsApp откроется через 200 мс после успешного POST.
      const url = buildWaUrl('form_submit', { name: name });
      window.open(url, '_blank', 'noopener');
    });

    // Сброс ошибки при вводе
    form.querySelectorAll('input').forEach(inp => {
      inp.addEventListener('input', () => setError(inp.parentElement, false));
      inp.addEventListener('change', () => setError(inp.parentElement, false));
    });
  }

  /* ------------------------------------------------------------------------
     Cookie banner (LocalStorage memo)
     ------------------------------------------------------------------------ */
  function initCookieBanner() {
    const banner = document.getElementById('cookie-banner');
    const acceptBtn = document.getElementById('cookie-accept');
    if (!banner || !acceptBtn) return;

    let accepted = false;
    try { accepted = localStorage.getItem('icu_cookie_ok') === '1'; } catch (e) {}

    if (!accepted) {
      banner.hidden = false;
    }

    acceptBtn.addEventListener('click', () => {
      try { localStorage.setItem('icu_cookie_ok', '1'); } catch (e) {}
      banner.hidden = true;
      trackEvent('cookie_accept');
    });
  }

  /* ------------------------------------------------------------------------
     Hero seats countdown (visual only — реальный счётчик читает из CRM)
     ------------------------------------------------------------------------ */
  function initSeats() {
    const el = document.getElementById('seats-left');
    if (!el) return;
    // На проде: fetch('/api/seats').then(r => r.json()).then(d => el.textContent = d.left)
    // Сейчас — статичное значение из HTML.
  }

  /* ------------------------------------------------------------------------
     Lazy load: 2GIS map iframe on intersection
     ------------------------------------------------------------------------ */
  function initLazyMap() {
    const slot = document.getElementById('map-2gis');
    if (!slot || !('IntersectionObserver' in window)) return;

    const io = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // TODO: подставить координаты офиса и (опционально) API-ключ 2GIS.
          // Шаблон iframe-виджета 2GIS:
          // https://widgets.2gis.com/widget?type=firmsonmap&options=...
          // Сейчас — оставляем заглушку.
          obs.disconnect();
        }
      });
    }, { rootMargin: '200px' });

    io.observe(slot);
  }

  /* ------------------------------------------------------------------------
     Header shadow on scroll
     ------------------------------------------------------------------------ */
  function initHeaderShadow() {
    const header = document.getElementById('site-header');
    if (!header) return;
    const onScroll = () => {
      if (window.scrollY > 4) header.style.boxShadow = '0 1px 3px rgba(15,23,42,.06)';
      else header.style.boxShadow = '';
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ------------------------------------------------------------------------
     Analytics shim (читается analytics.js)
     ------------------------------------------------------------------------ */
  function trackEvent(name, params) {
    if (typeof window.icuTrack === 'function') {
      try { window.icuTrack(name, params || {}); } catch (e) {}
    }
  }

  /* ------------------------------------------------------------------------
     Boot
     ------------------------------------------------------------------------ */
  document.addEventListener('DOMContentLoaded', function () {
    attachWaLinks();
    initForm();
    initCookieBanner();
    initSeats();
    initLazyMap();
    initHeaderShadow();
  });

  // Expose for i18n.js (после смены языка ссылки WA пересобрать с новым языком, если потребуется)
  window.icuRebuildWaLinks = attachWaLinks;
})();
