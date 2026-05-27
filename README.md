# ICU Kazakhstan — Лендинг

Одностраничный лендинг представительства International Coaches Union в Казахстане. Все 10 блоков из [PRD](./PRD.md), мультиязычность (RU/KZ/EN), интеграция CTA с WhatsApp, аналитика, юр. страницы.

**Live preview:** https://galbagdat.github.io/icu-kz-landing/

> ⚠️ **GitHub Pages — это только превью лендинга для согласования с заказчиком.** Полная инфраструктура (WhatsApp-бот, n8n, Postgres, приём вебхуков Kaspi/Halyk, хранение лидов) разворачивается на отдельном сервере на территории Республики Казахстан — этого требует ст. 12 Закона РК «О персональных данных и их защите» от 21.05.2013 № 94-V. См. раздел [«Следующие шаги»](#следующие-шаги).

## Что внутри

| Файл/папка | Назначение |
|---|---|
| [`index.html`](./index.html) | Главная страница, все 10 блоков, SEO-разметка, schema.org |
| [`privacy.html`](./privacy.html) | Политика конфиденциальности (Закон РК «О персональных данных и их защите» № 94-V) |
| [`offer.html`](./offer.html) | Договор-оферта (каркас) |
| [`refund.html`](./refund.html) | Политика возврата (каркас) |
| [`404.html`](./404.html) | Страница «не найдено» |
| [`assets/css/main.css`](./assets/css/main.css) | Дизайн-система, mobile-first, без фреймворков |
| [`assets/js/main.js`](./assets/js/main.js) | Форма, валидация, WA-ссылки, cookie-баннер, lazy map |
| [`assets/js/i18n.js`](./assets/js/i18n.js) | Переключатель RU/KZ/EN, словари всех строк |
| [`assets/js/analytics.js`](./assets/js/analytics.js) | Yandex.Metrika + GA4 + Meta Pixel + TikTok Pixel (с ID-заглушками) |
| [`assets/img/`](./assets/img/) | SVG-иконки, favicon, OG-обложка |
| [`.github/workflows/pages.yml`](./.github/workflows/pages.yml) | Авто-деплой на GitHub Pages при пуше в `main` |

## Стек

- **Чистый HTML/CSS/JS** — без сборщиков, без Node-зависимостей. Это даёт лучший LCP и идеально ложится на GitHub Pages.
- **Шрифты:** Inter (тело), Manrope (заголовки) — Google Fonts с `display=swap`
- **i18n:** все строки лежат в [`assets/js/i18n.js`](./assets/js/i18n.js), переключение без перезагрузки, сохранение выбора в `localStorage`
- **Аналитика:** унифицированный API `window.icuTrack(name, params)` пробрасывает события во все 4 счётчика сразу

На прод-этапе стек мигрирует на **Next.js 14** / **Astro** с хостингом в РК-юрисдикции — см. PRD раздел 7.

## Запуск локально

Никакой установки не требуется — это статика:

```bash
# простой http-сервер (любой из доступных)
python3 -m http.server 8000
# открыть http://localhost:8000
```

Или просто открыть `index.html` напрямую в браузере.

## Деплой на GitHub Pages

При пуше в ветку `main` автоматически срабатывает [Pages workflow](./.github/workflows/pages.yml) — раскатывает корень репозитория на `https://<user>.github.io/<repo>/`.

Включение Pages в репозитории: `Settings → Pages → Build and deployment → Source: GitHub Actions`.

## Конфигурация перед публикацией

Нужно заменить заглушки на реальные значения:

| Где | Что | Файл |
|---|---|---|
| `whatsappNumber: '77077337217'` | ✅ Установлен — WhatsApp Business номер ICU KZ. Заменить, если изменится | [`assets/js/main.js`](./assets/js/main.js) |
| `IDS.yandexMetrika`, `ga4`, `metaPixel`, `tiktokPixel` | ID счётчиков аналитики | [`assets/js/analytics.js`](./assets/js/analytics.js) |
| Email `hello@icu.kz` | Заменить на реальный корпоративный e-mail | [`index.html`](./index.html), [`assets/js/i18n.js`](./assets/js/i18n.js) |
| `БИН: уточняется`, реквизиты | Реквизиты ТОО | юр. страницы, [`index.html`](./index.html) |
| `assets/img/og-cover.svg` | Реальная OG-обложка с фото выпуска | заменить файл |
| Карта 2GIS | Виджет 2GIS с координатами офиса | [`assets/js/main.js`](./assets/js/main.js) → `initLazyMap()` |

## Соответствие PRD

Полное соответствие чек-листу из PRD §9.1 (лендинг) с двумя исключениями, требующими бэкенда (он на этом превью отсутствует):

- ❌ Бот отвечает за 5 сек — нет бота на GitHub Pages
- ❌ Webhook от Kaspi → бот — нет бэкенда

Эти пункты закрываются на этапе 4 (см. ниже).

## Следующие шаги

1. **Сбор контента** (этап 1 PRD) — 8 модулей с тренером, отзывы, фото, реквизиты
2. **Перенос на прод-хостинг в РК** (этап 3 PRD) — миграция на Next.js 14 + Yandex Cloud / Selectel
3. **WhatsApp-бот** (этап 4 PRD) — n8n + WhatsApp Business Cloud API + Postgres + amoCRM, два трека (горячий 60 мин + холодный 14 дней), отмена COLD при оплате
4. **Платежи** — Kaspi Pay + Halyk Acquiring + Stripe (для зарубежа)
5. **Юр. документы** — финализация Policy/Оферты/Возврата с юристом

## Лицензия

© 2026 ICU Kazakhstan. Все права защищены.
