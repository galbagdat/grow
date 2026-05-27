/* ==========================================================================
   ICU Kazakhstan landing — analytics
   --------------------------------------------------------------------------
   Yandex.Metrika + GA4 + Meta Pixel + TikTok Pixel.
   Все ID — заглушки. Подставить реальные перед публикацией.
   На GitHub Pages-превью аналитика отключена (NULL ID) — счётчики не грузятся.
   ========================================================================== */

(function () {
  'use strict';

  const IDS = {
    // TODO: получить у заказчика и подставить
    yandexMetrika: null,   // например 90123456
    ga4:           null,   // например 'G-XXXXXXXXXX'
    metaPixel:     null,   // например '123456789012345'
    tiktokPixel:   null    // например 'CXXXXXXXXXXXXXXXXXXX'
  };

  /* ----- Yandex.Metrika ------------------------------------------------- */
  if (IDS.yandexMetrika) {
    (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
    m[i].l=1*new Date(); k=e.createElement(t), a=e.getElementsByTagName(t)[0],
    k.async=1, k.src=r, a.parentNode.insertBefore(k,a)})
    (window, document, 'script', 'https://mc.yandex.ru/metrika/tag.js', 'ym');

    /* global ym */
    ym(IDS.yandexMetrika, 'init', {
      clickmap: true,
      trackLinks: true,
      accurateTrackBounce: true,
      webvisor: true,
      defer: false
    });
  }

  /* ----- Google Analytics 4 -------------------------------------------- */
  if (IDS.ga4) {
    const ga = document.createElement('script');
    ga.async = true;
    ga.src = 'https://www.googletagmanager.com/gtag/js?id=' + IDS.ga4;
    document.head.appendChild(ga);

    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { window.dataLayer.push(arguments); };
    window.gtag('js', new Date());
    window.gtag('config', IDS.ga4, { anonymize_ip: true });
  }

  /* ----- Meta Pixel ----------------------------------------------------- */
  if (IDS.metaPixel) {
    !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
    n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
    n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
    t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}
    (window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');
    /* global fbq */
    fbq('init', IDS.metaPixel);
    fbq('track', 'PageView');
  }

  /* ----- TikTok Pixel --------------------------------------------------- */
  if (IDS.tiktokPixel) {
    !function (w, d, t) {
      w.TiktokAnalyticsObject=t;var ttq=w[t]=w[t]||[];ttq.methods=["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie","holdConsent","revokeConsent","grantConsent"];
      ttq.setAndDefer=function(t,e){t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}};
      for(var i=0;i<ttq.methods.length;i++) ttq.setAndDefer(ttq, ttq.methods[i]);
      ttq.instance=function(t){for(var e=ttq._i[t]||[],n=0;n<ttq.methods.length;n++) ttq.setAndDefer(e, ttq.methods[n]);return e};
      ttq.load=function(e,n){var r="https://analytics.tiktok.com/i18n/pixel/events.js",o=n&&n.partner;ttq._i=ttq._i||{},ttq._i[e]=[],ttq._i[e]._u=r,ttq._t=ttq._t||{},ttq._t[e]=+new Date,ttq._o=ttq._o||{},ttq._o[e]=n||{};
      n=document.createElement("script");n.type="text/javascript",n.async=!0,n.src=r+"?sdkid="+e+"&lib="+t;e=document.getElementsByTagName("script")[0];e.parentNode.insertBefore(n,e)};
      ttq.load(IDS.tiktokPixel);
      ttq.page();
    }(window, document, 'ttq');
  }

  /* ----- Унифицированный API ------------------------------------------- */
  window.icuTrack = function (name, params) {
    params = params || {};

    // Yandex.Metrika
    if (IDS.yandexMetrika && typeof window.ym === 'function') {
      try { window.ym(IDS.yandexMetrika, 'reachGoal', name, params); } catch (e) {}
    }
    // GA4
    if (IDS.ga4 && typeof window.gtag === 'function') {
      try { window.gtag('event', name, params); } catch (e) {}
    }
    // Meta Pixel
    if (IDS.metaPixel && typeof window.fbq === 'function') {
      try { window.fbq('trackCustom', name, params); } catch (e) {}
    }
    // TikTok
    if (IDS.tiktokPixel && typeof window.ttq === 'object') {
      try { window.ttq.track(name, params); } catch (e) {}
    }

    // Удобный лог в dev-режиме
    if (location.hostname === 'localhost' || location.hostname.endsWith('.github.io')) {
      console.log('[icuTrack]', name, params);
    }
  };
})();
