/* ==========================================================================
   ICU Kazakhstan landing — i18n (RU / KZ / EN)
   --------------------------------------------------------------------------
   Простой подход: все ключи лежат в этом файле, JS подменяет text/HTML
   у элементов с [data-i18n="key"] и meta-тегов.
   --------------------------------------------------------------------------
   На прод-стеке (Next.js / Astro) — заменяется на встроенный i18n
   фреймворка с отдельными JSON-файлами и URL-сегментами /ru /kz /en.
   ========================================================================== */

(function () {
  'use strict';

  const STORAGE_KEY = 'icu_lang';
  const SUPPORTED = ['ru', 'kz', 'en'];
  const DEFAULT_LANG = 'ru';

  // Перевод RU — основной язык, совпадает с PRD дословно.
  // KZ и EN — рабочие переводы. Перед публикацией обязательно показать носителю / редактору.
  const STRINGS = {
    ru: {
      'meta.title': 'ICU Kazakhstan — Сертификация коучей международного уровня',
      'meta.description': 'Стань сертифицированным коучем международного уровня. Диплом ICU с аккредитацией в Казахстане, признанный в 32+ странах, соответствие Enbek.kz. 8-модульная программа от Международного Союза Коучей.',
      'a11y.skip': 'Перейти к содержанию',

      'hero.eyebrow': 'International Coaches Union · Представительство в Казахстане',
      'hero.h1': 'Стань сертифицированным коучем международного уровня — диплом ICU с аккредитацией в Казахстане',
      'hero.sub': '8-модульная программа Международного Союза Коучей (ICU). 15+ лет на рынке СНГ, 5 000+ подготовленных специалистов. Сертификат соответствует карточке профессии «Коуч/Тренер» на портале Enbek.kz. Бесплатная WhatsApp-консультация и программа в PDF — за один клик.',
      'hero.cta_primary': 'Получить программу в WhatsApp',
      'hero.cta_secondary': 'Узнать стоимость',
      'hero.badge_years': '15+ лет на рынке СНГ',
      'hero.badge_supplement': 'Diploma Supplement европейского образца',
      'hero.badge_enbek': 'Аккредитация Enbek.kz',
      'hero.badge_grads': '5 000+ выпускников',
      'hero.badge_countries': '32+ страны',
      'hero.visual_modules': 'модулей программы',
      'hero.visual_months': 'месяцев обучения',
      'hero.visual_countries': 'признаний по миру',
      'hero.visual_cert': 'международный сертификат',

      'uniq.h2': 'Почему членство в Ассоциации ICU — это уникально',
      'uniq.sub': 'Шесть причин, почему наш сертификат стоит дороже типового курса коучинга и окупается контрактами на международном уровне.',
      'uniq.c1.h': 'Международный Союз Коучей',
      'uniq.c1.p': '15+ лет на рынке СНГ, 5 000+ подготовленных специалистов, признание в 32+ странах. Единая международная база коучей ICU.',
      'uniq.c2.h': '4 уровня квалификации',
      'uniq.c2.p': 'Professional Coach → Master Coach → ICU Trainer of Coaching. Структура для непрерывного роста — от первой сертификации до подготовки коучей.',
      'uniq.c3.h': 'Соответствие Enbek.kz',
      'uniq.c3.p': 'Сертификат закрывает требования карточки профессии «Коуч/Тренер» на государственном портале труда РК.',
      'uniq.c4.h': 'Diploma Supplement',
      'uniq.c4.p': 'Выпускники получают Diploma Supplement европейского образца — приложение к диплому для подтверждения квалификации в странах ЕС и за рубежом.',
      'uniq.c5.h': 'Закрытое комьюнити',
      'uniq.c5.p': 'Нетворкинг, рефералы, совместные проекты, доступ к корпоративным тендерам.',
      'uniq.c6.h': 'Этический кодекс ICU',
      'uniq.c6.p': 'Единые профессиональные стандарты для всех коучей Ассоциации — гарантия качества для клиентов.',

      'mod.h2': 'Программа обучения',
      'mod.sub': 'Полная подготовка от фундамента коучинга до международной сертификации ICU. Скачайте подробную программу — структура курса, формат занятий, длительность каждого блока и результаты обучения.',
      'mod.file_title': 'Программа ICU Professional Coach',
      'mod.file_meta': 'PDF · описание модулей, формат, длительность, результаты обучения',
      'mod.download': 'Скачать программу (PDF)',
      'mod.wa': 'Получить в WhatsApp',
      'mod.disclaimer': '⚠️ Финальная программа уточняется с тренером ICU. PDF будет загружен после согласования содержания.',

      'del.h2': 'Что получает выпускник',
      'del.sub': 'Не просто сертификат — полный пакет инструментов для запуска и масштабирования коучинговой практики.',
      'del.l1': 'Международный сертификат ICU Professional Coach',
      'del.l2': 'Запись в глобальной базе коучей ICU (доступна работодателям и клиентам по всему миру)',
      'del.l3': 'Diploma Supplement европейского образца — приложение к диплому для подтверждения квалификации в ЕС и за рубежом',
      'del.l4': 'Соответствие карточке профессии «Коуч/Тренер» на портале Enbek.kz',
      'del.l5': 'Доступ к закрытому сообществу выпускников ICU',
      'del.l6': 'Возможность повышения уровня: Professional Coach → Master Coach → ICU Trainer of Coaching',
      'del.l7': 'Право вести корпоративные тренинги под брендом ICU',

      'why.h2': 'ICU против типовых курсов',
      'why.sub': 'Сравните, что вы получаете в Ассоциации ICU — и что обычно предлагают локальные школы коучинга.',
      'why.col_crit': 'Критерий',
      'why.col_icu': 'Ассоциация ICU',
      'why.col_other': 'Типовые курсы коучинга',
      'why.r1.c': 'Признание',
      'why.r1.icu': '32+ страны, аккредитация в Казахстане (Enbek.kz), Diploma Supplement европейского образца',
      'why.r1.other': 'Локальный сертификат школы',
      'why.r2.c': 'Срок обучения',
      'why.r2.icu': '8 модулей, ~6 месяцев',
      'why.r2.other': 'От 2 недель до неопределённо',
      'why.r3.c': 'Супервизия',
      'why.r3.icu': 'Включена в каждый модуль',
      'why.r3.other': 'Опционально или отсутствует',
      'why.r4.c': 'Комьюнити',
      'why.r4.icu': '5 000+ коучей, 15+ лет опыта, 32+ страны',
      'why.r4.other': 'Чат выпускников одной группы',
      'why.r5.c': 'Карьера после',
      'why.r5.icu': 'Международные контракты, корпоративные тендеры',
      'why.r5.other': 'Частная практика',

      'tst.h2': 'Истории выпускников',
      'tst.sub': 'Реальные результаты — от смены роли в международной корпорации до запуска собственной школы коучинга.',
      'tst.t1.q': '«После сертификации ICU я закрыла первый корпоративный контракт за 1.2 млн ₸. Карточка профессии на Enbek.kz решила все вопросы у HR клиента.»',
      'tst.t1.n': 'Айгуль К.',
      'tst.t1.r': 'Бизнес-коуч · Алматы, Казахстан',
      'tst.t2.q': '«До ICU я 12 лет работала HR-директором. Программа дала структуру и международное признание — теперь веду executive-coaching для топ-менеджмента из 4 стран.»',
      'tst.t2.n': 'Динара С.',
      'tst.t2.r': 'Executive Coach · Астана, Казахстан',
      'tst.t3.q': '«Супервизия в каждом модуле — это редкость. Я почувствовал реальный рост в технике вопросов уже к третьему модулю.»',
      'tst.t3.n': 'Михаил Р.',
      'tst.t3.r': 'Командный коуч · Ташкент, Узбекистан',
      'tst.t4.q': '«Diploma Supplement европейского образца помог мне подтвердить квалификацию при переезде в Дубай — открыла собственную практику за 2 месяца, без переаттестации.»',
      'tst.t4.n': 'Елена Т.',
      'tst.t4.r': 'Life Coach · Дубай, ОАЭ',
      'tst.t5.q': '«Был психологом, искал способ легализовать практику. ICU дал и сертификат, и комьюнити, и первых трёх клиентов через нетворкинг выпускников.»',
      'tst.t5.n': 'Арман Н.',
      'tst.t5.r': 'Психолог-коуч · Шымкент, Казахстан',
      'tst.t6.q': '«Сравнивала с 4 другими школами. ICU выиграл по двум пунктам: международная база и реальная супервизия. Через год — окупила обучение в 5 раз.»',
      'tst.t6.n': 'Сабина А.',
      'tst.t6.r': 'Карьерный коуч · Бишкек, Кыргызстан',
      'tst.more': 'Больше отзывов на международном сайте ICU →',

      'ct.h2': 'Офис представительства в Казахстане',
      'ct.sub': 'Приходите познакомиться лично или свяжитесь любым удобным способом.',
      'ct.address_l': 'Адрес',
      'ct.address_v': 'г. Астана, БЦ Abu Dhabi Plaza, офис A-26',
      'ct.phone_l': 'Телефон',
      'ct.email_l': 'Email',
      'ct.hours_l': 'Часы работы',
      'ct.hours_v': 'Пн–Пт · 10:00–19:00 (UTC+5)',
      'ct.cta': 'Связаться в WhatsApp',
      'ct.map_stub': 'Интерактивная карта 2GIS подгрузится здесь. Требуется ключ API 2GIS и точный адрес офиса.',

      'gl.eyebrow': 'Международная Ассоциация',
      'gl.h2': 'Узнать больше о глобальной ICU',
      'gl.p': 'Международный Союз Коучей объединяет тысячи сертифицированных коучей в 32+ странах. Программы Executive Coach, Team Coach, Trainer of Coaching. Корпоративные клиенты по всему миру.',
      'gl.cta': 'Перейти на coachunion.com →',

      'fin.h2': 'Стартуй обучение в ближайшем потоке',
      'fin.seats': 'мест осталось',
      'fin.sub': 'Оставьте имя и WhatsApp — отправим программу в PDF и расскажем про рассрочку. Куратор свяжется в течение часа в рабочее время.',
      'fin.f_name': 'Ваше имя',
      'fin.f_phone': 'WhatsApp-номер',
      'fin.err_name': 'Пожалуйста, введите имя',
      'fin.err_phone': 'Формат: +7 и 10 цифр',
      'fin.consent': 'Согласен(на) на обработку персональных данных в соответствии с Политикой конфиденциальности (Закон РК «О персональных данных и их защите» от 21.05.2013 № 94-V)',
      'fin.submit': 'Получить программу в WhatsApp',
      'fin.note': 'После отправки откроется чат WhatsApp с pre-filled сообщением. Куратор ответит в течение 5 минут в рабочее время.',

      'ft.tag': 'Представительство International Coaches Union в Республике Казахстан.',
      'ft.docs': 'Документы',
      'ft.privacy': 'Политика конфиденциальности',
      'ft.offer': 'Договор-оферта',
      'ft.refund': 'Возврат',
      'ft.contacts': 'Контакты',
      'ft.addr': 'г. Астана, БЦ Abu Dhabi Plaza, офис A-26',
      'ft.legal': 'Реквизиты',
      'ft.legal_p': 'ТОО «ICU Kazakhstan». БИН: уточняется. Юр. адрес: уточняется.',
      'ft.rights': 'Все права защищены.',

      'cookie.text': 'Мы используем cookies для аналитики и улучшения сайта. Подробнее — в Политике конфиденциальности.',
      'cookie.accept': 'Принять'
    },

    kz: {
      'meta.title': 'ICU Kazakhstan — Халықаралық деңгейдегі коучтарды сертификаттау',
      'meta.description': 'Халықаралық деңгейдегі сертификатталған коуч атан. Қазақстанда аккредитациямен ICU дипломы, 32+ елде танылу, Enbek.kz сәйкестігі. Халықаралық Коучтар Одағының 8 модульді бағдарламасы.',
      'a11y.skip': 'Негізгі мазмұнға өту',

      'hero.eyebrow': 'International Coaches Union · Қазақстандағы өкілдік',
      'hero.h1': 'Халықаралық деңгейдегі сертификатталған коуч атан — Қазақстанда аккредитациямен ICU дипломы',
      'hero.sub': 'Халықаралық Коучтар Одағының (ICU) 8 модульді бағдарламасы. ТМД нарығында 15+ жыл, 5 000+ дайындалған маман. Сертификат Enbek.kz порталындағы «Коуч/Тренер» кәсіптік картасына сәйкес. Тегін WhatsApp кеңесі және PDF-те бағдарлама — бір ғана басумен.',
      'hero.cta_primary': 'WhatsApp-та бағдарламаны алу',
      'hero.cta_secondary': 'Құнын білу',
      'hero.badge_years': 'ТМД нарығында 15+ жыл',
      'hero.badge_supplement': 'Еуропалық үлгідегі Diploma Supplement',
      'hero.badge_enbek': 'Enbek.kz аккредитациясы',
      'hero.badge_grads': '5 000+ түлек',
      'hero.badge_countries': '32+ ел',
      'hero.visual_modules': 'модуль',
      'hero.visual_months': 'ай оқу',
      'hero.visual_countries': 'әлемде танылу',
      'hero.visual_cert': 'халықаралық сертификат',

      'uniq.h2': 'ICU Ассоциациясының мүшелігі неліктен ерекше',
      'uniq.sub': 'Біздің сертификатымыз әдеттегі коучинг курсынан неге қымбатырақ және халықаралық деңгейдегі келісімшарттармен ақталатынының алты себебі.',
      'uniq.c1.h': 'Халықаралық Коучтар Одағы',
      'uniq.c1.p': 'ТМД нарығында 15+ жыл, 5 000+ дайындалған маман, 32+ елде танылу. ICU коучтарының бірыңғай халықаралық базасы.',
      'uniq.c2.h': '4 біліктілік деңгейі',
      'uniq.c2.p': 'Professional Coach → Master Coach → ICU Trainer of Coaching. Тұрақты өсу құрылымы — бірінші сертификаттаудан коучтарды дайындауға дейін.',
      'uniq.c3.h': 'Enbek.kz-ке сәйкестік',
      'uniq.c3.p': 'Сертификат ҚР еңбек порталындағы «Коуч/Тренер» кәсібінің картасы талаптарын жабады.',
      'uniq.c4.h': 'Diploma Supplement',
      'uniq.c4.p': 'Түлектер еуропалық үлгідегі Diploma Supplement алады — ЕО елдері мен шетелде біліктілікті растайтын дипломға қосымша.',
      'uniq.c5.h': 'Жабық қауымдастық',
      'uniq.c5.p': 'Нетворкинг, рефералдар, бірлескен жобалар, корпоративтік тендерлерге қол жетімділік.',
      'uniq.c6.h': 'ICU этикалық кодексі',
      'uniq.c6.p': 'Ассоциацияның барлық коучтары үшін бірыңғай кәсіби стандарттар — клиенттер үшін сапа кепілдігі.',

      'mod.h2': 'Оқу бағдарламасы',
      'mod.sub': 'Коучинг негіздерінен халықаралық ICU сертификаттауына дейінгі толық дайындық. Толық бағдарламаны жүктеңіз — курс құрылымы, сабақ форматы, әр блоктың ұзақтығы және оқу нәтижелері.',
      'mod.file_title': 'ICU Professional Coach бағдарламасы',
      'mod.file_meta': 'PDF · модульдер сипаттамасы, формат, ұзақтық, оқу нәтижелері',
      'mod.download': 'Бағдарламаны жүктеу (PDF)',
      'mod.wa': 'WhatsApp-та алу',
      'mod.disclaimer': '⚠️ Соңғы бағдарлама ICU тренерімен нақтыланады. PDF мазмұн келісілгеннен кейін жүктеледі.',

      'del.h2': 'Түлек не алады',
      'del.sub': 'Жай ғана сертификат емес — коучинг практикасын іске қосу мен масштабтаудың толық құралдар жиынтығы.',
      'del.l1': 'Халықаралық ICU Professional Coach сертификаты',
      'del.l2': 'ICU жаһандық коучтар базасында жазба (бүкіл әлемдегі жұмыс берушілер мен клиенттерге қол жетімді)',
      'del.l3': 'Еуропалық үлгідегі Diploma Supplement — ЕО елдері мен шетелде біліктілікті растайтын дипломға қосымша',
      'del.l4': 'Enbek.kz порталындағы «Коуч/Тренер» кәсіптік картасына сәйкестік',
      'del.l5': 'ICU түлектерінің жабық қауымдастығына қол жетімділік',
      'del.l6': 'Деңгейді көтеру мүмкіндігі: Professional Coach → Master Coach → ICU Trainer of Coaching',
      'del.l7': 'ICU брендімен корпоративтік тренинг өткізу құқығы',

      'why.h2': 'ICU және әдеттегі курстар',
      'why.sub': 'ICU Ассоциациясында не алатыныңызды жергілікті коучинг мектептері әдетте ұсынатынмен салыстырыңыз.',
      'why.col_crit': 'Критерий',
      'why.col_icu': 'ICU Ассоциациясы',
      'why.col_other': 'Әдеттегі коучинг курстары',
      'why.r1.c': 'Тану',
      'why.r1.icu': '32+ ел, Қазақстанда аккредитация (Enbek.kz), еуропалық үлгідегі Diploma Supplement',
      'why.r1.other': 'Мектептің жергілікті сертификаты',
      'why.r2.c': 'Оқу мерзімі',
      'why.r2.icu': '8 модуль, ~6 ай',
      'why.r2.other': '2 аптадан анықталмаған мерзімге дейін',
      'why.r3.c': 'Супервизия',
      'why.r3.icu': 'Әр модульге кіреді',
      'why.r3.other': 'Қосымша немесе жоқ',
      'why.r4.c': 'Қауымдастық',
      'why.r4.icu': '5 000+ коуч, 15+ жыл тәжірибе, 32+ ел',
      'why.r4.other': 'Бір топтың түлектер чаты',
      'why.r5.c': 'Кейінгі мансап',
      'why.r5.icu': 'Халықаралық келісімшарттар, корпоративтік тендерлер',
      'why.r5.other': 'Жеке практика',

      'tst.h2': 'Түлектер тарихы',
      'tst.sub': 'Нақты нәтижелер — халықаралық корпорацияда рөл ауыстырудан өз коучинг мектебін іске қосуға дейін.',
      'tst.t1.q': '«ICU сертификаттаудан кейін бірінші корпоративтік келісімшартты 1.2 млн ₸-ге жаптым. Enbek.kz кәсіптік картасы клиенттің HR-індегі барлық сұрақтарды шешті.»',
      'tst.t1.n': 'Айгүл К.',
      'tst.t1.r': 'Бизнес-коуч · Алматы, Қазақстан',
      'tst.t2.q': '«ICU-ге дейін 12 жыл HR-директор болдым. Бағдарлама құрылым мен халықаралық тану берді — қазір 4 елдің топ-менеджментіне executive-коучинг жүргіземін.»',
      'tst.t2.n': 'Динара С.',
      'tst.t2.r': 'Executive Coach · Астана, Қазақстан',
      'tst.t3.q': '«Әр модульдегі супервизия — сирек кездеседі. Үшінші модульге дейін сұрақтар техникасында нақты өсуді сездім.»',
      'tst.t3.n': 'Михаил Р.',
      'tst.t3.r': 'Командалық коуч · Ташкент, Өзбекстан',
      'tst.t4.q': '«Еуропалық үлгідегі Diploma Supplement Дубайға көшкенде біліктілігімді растауға көмектесті — қайта аттестациясыз 2 айда жеке практикамды аштым.»',
      'tst.t4.n': 'Елена Т.',
      'tst.t4.r': 'Life Coach · Дубай, БАӘ',
      'tst.t5.q': '«Психолог болдым, практиканы заңдастыру жолын іздедім. ICU маған сертификатты, қауымдастықты және түлектер нетворкингі арқылы алғашқы үш клиентті берді.»',
      'tst.t5.n': 'Арман Н.',
      'tst.t5.r': 'Психолог-коуч · Шымкент, Қазақстан',
      'tst.t6.q': '«4 басқа мектеппен салыстырдым. ICU екі пунктпен жеңді: халықаралық база және нақты супервизия. Бір жылда оқуды 5 есе ақтап алдым.»',
      'tst.t6.n': 'Сабина А.',
      'tst.t6.r': 'Мансап коучы · Бішкек, Қырғызстан',
      'tst.more': 'ICU халықаралық сайтында көбірек пікірлер →',

      'ct.h2': 'Қазақстандағы өкілдік кеңсесі',
      'ct.sub': 'Жеке танысып келіңіз немесе қолайлы тәсілмен хабарласыңыз.',
      'ct.address_l': 'Мекенжай',
      'ct.address_v': 'Астана қ., Abu Dhabi Plaza БО, A-26 кеңсе',
      'ct.phone_l': 'Телефон',
      'ct.email_l': 'Email',
      'ct.hours_l': 'Жұмыс уақыты',
      'ct.hours_v': 'Дс–Жм · 10:00–19:00 (UTC+5)',
      'ct.cta': 'WhatsApp-та хабарласу',
      'ct.map_stub': '2GIS интерактивті картасы осында жүктеледі. 2GIS API кілті және кеңсенің нақты мекенжайы қажет.',

      'gl.eyebrow': 'Халықаралық Ассоциация',
      'gl.h2': 'Жаһандық ICU туралы көбірек білу',
      'gl.p': 'Халықаралық Коучтар Одағы 32+ елде мыңдаған сертификатталған коучты біріктіреді. Executive Coach, Team Coach, Trainer of Coaching бағдарламалары. Әлем бойынша корпоративтік клиенттер.',
      'gl.cta': 'coachunion.com сайтына өту →',

      'fin.h2': 'Жақын ағында оқуды бастаңыз',
      'fin.seats': 'орын қалды',
      'fin.sub': 'Атыңыз бен WhatsApp нөміріңізді қалдырыңыз — PDF бағдарламасын жібереміз және бөліп төлеу туралы айтамыз. Куратор жұмыс уақытында бір сағат ішінде хабарласады.',
      'fin.f_name': 'Атыңыз',
      'fin.f_phone': 'WhatsApp нөмірі',
      'fin.err_name': 'Атыңызды енгізіңіз',
      'fin.err_phone': 'Пішім: +7 және 10 сан',
      'fin.consent': 'Жеке деректерді өңдеуге Құпиялылық саясатына сәйкес келісемін (ҚР «Жеке деректер және оларды қорғау туралы» 21.05.2013 ж. № 94-V Заңы)',
      'fin.submit': 'WhatsApp-та бағдарлама алу',
      'fin.note': 'Жіберілгеннен кейін WhatsApp чаты pre-filled хабарламамен ашылады. Куратор жұмыс уақытында 5 минут ішінде жауап береді.',

      'ft.tag': 'Қазақстан Республикасындағы International Coaches Union өкілдігі.',
      'ft.docs': 'Құжаттар',
      'ft.privacy': 'Құпиялылық саясаты',
      'ft.offer': 'Шарт-оферта',
      'ft.refund': 'Қайтару',
      'ft.contacts': 'Байланыс',
      'ft.addr': 'Астана қ., Abu Dhabi Plaza БО, A-26 кеңсе',
      'ft.legal': 'Деректемелер',
      'ft.legal_p': '«ICU Kazakhstan» ЖШС. БСН: нақтыланады. Заңды мекенжайы: нақтыланады.',
      'ft.rights': 'Барлық құқықтар қорғалған.',

      'cookie.text': 'Сайтты талдау мен жақсарту үшін cookie файлдарын пайдаланамыз. Толығырақ — Құпиялылық саясатында.',
      'cookie.accept': 'Қабылдау'
    },

    en: {
      'meta.title': 'ICU Kazakhstan — International coach certification',
      'meta.description': 'Become a certified international-level coach. ICU diploma accredited in Kazakhstan, recognized in 32+ countries, aligned with Enbek.kz. 8-module program from the International Coaches Union.',
      'a11y.skip': 'Skip to content',

      'hero.eyebrow': 'International Coaches Union · Kazakhstan office',
      'hero.h1': 'Become a certified international-level coach — an ICU diploma accredited in Kazakhstan',
      'hero.sub': 'An 8-module program from the International Coaches Union (ICU). 15+ years on the CIS market, 5,000+ specialists trained. The certificate aligns with the "Coach/Trainer" profession card on the Enbek.kz portal. Free WhatsApp consultation and the full program in PDF — one click away.',
      'hero.cta_primary': 'Get the program via WhatsApp',
      'hero.cta_secondary': 'See pricing',
      'hero.badge_years': '15+ years on the CIS market',
      'hero.badge_supplement': 'European-style Diploma Supplement',
      'hero.badge_enbek': 'Enbek.kz accreditation',
      'hero.badge_grads': '5,000+ graduates',
      'hero.badge_countries': '32+ countries',
      'hero.visual_modules': 'program modules',
      'hero.visual_months': 'months of study',
      'hero.visual_countries': 'global recognitions',
      'hero.visual_cert': 'international certificate',

      'uniq.h2': 'Why ICU membership is unique',
      'uniq.sub': 'Six reasons our certificate is worth more than a typical coaching course and pays back through international contracts.',
      'uniq.c1.h': 'International Coaches Union',
      'uniq.c1.p': '15+ years on the CIS market, 5,000+ trained specialists, recognition in 32+ countries. A single international ICU coaches registry.',
      'uniq.c2.h': '4 levels of certification',
      'uniq.c2.p': 'Professional Coach → Master Coach → ICU Trainer of Coaching. A structure for continuous growth — from a first certification to training other coaches.',
      'uniq.c3.h': 'Enbek.kz alignment',
      'uniq.c3.p': 'The certificate meets the requirements of the "Coach/Trainer" profession card on the Republic of Kazakhstan\'s national labor portal.',
      'uniq.c4.h': 'Diploma Supplement',
      'uniq.c4.p': 'Graduates receive a European-style Diploma Supplement — an annex to the diploma that confirms qualifications across EU countries and abroad.',
      'uniq.c5.h': 'Closed community',
      'uniq.c5.p': 'Networking, referrals, joint projects, access to corporate tenders.',
      'uniq.c6.h': 'ICU code of ethics',
      'uniq.c6.p': 'A unified professional standard for all ICU coaches — a quality guarantee for clients.',

      'mod.h2': 'Training program',
      'mod.sub': 'A full path from coaching fundamentals to international ICU certification. Download the detailed program — course structure, session format, the length of each block and learning outcomes.',
      'mod.file_title': 'ICU Professional Coach program',
      'mod.file_meta': 'PDF · module descriptions, format, duration, learning outcomes',
      'mod.download': 'Download program (PDF)',
      'mod.wa': 'Get via WhatsApp',
      'mod.disclaimer': '⚠️ Final program is being confirmed with an ICU trainer. The PDF will be uploaded once the content is approved.',

      'del.h2': 'What graduates receive',
      'del.sub': 'Not just a certificate — a complete toolkit to launch and scale a coaching practice.',
      'del.l1': 'International ICU Professional Coach certificate',
      'del.l2': 'Entry in the global ICU coaches registry (visible to employers and clients worldwide)',
      'del.l3': 'European-style Diploma Supplement — an annex to the diploma that confirms qualifications in the EU and abroad',
      'del.l4': '"Coach/Trainer" profession card alignment on Enbek.kz',
      'del.l5': 'Access to the closed community of ICU graduates',
      'del.l6': 'A path to advance: Professional Coach → Master Coach → ICU Trainer of Coaching',
      'del.l7': 'The right to run corporate training under the ICU brand',

      'why.h2': 'ICU vs typical courses',
      'why.sub': 'Compare what you get with ICU against what local coaching schools usually offer.',
      'why.col_crit': 'Criterion',
      'why.col_icu': 'ICU Association',
      'why.col_other': 'Typical coaching courses',
      'why.r1.c': 'Recognition',
      'why.r1.icu': '32+ countries, accreditation in Kazakhstan (Enbek.kz), European-style Diploma Supplement',
      'why.r1.other': 'A local school certificate',
      'why.r2.c': 'Duration',
      'why.r2.icu': '8 modules, ~6 months',
      'why.r2.other': 'From 2 weeks to undefined',
      'why.r3.c': 'Supervision',
      'why.r3.icu': 'Included in every module',
      'why.r3.other': 'Optional or absent',
      'why.r4.c': 'Community',
      'why.r4.icu': '5,000+ coaches, 15+ years of experience, 32+ countries',
      'why.r4.other': 'A single-cohort alumni chat',
      'why.r5.c': 'Career after',
      'why.r5.icu': 'International contracts, corporate tenders',
      'why.r5.other': 'Private practice',

      'tst.h2': 'Graduate stories',
      'tst.sub': 'Real results — from role change in an international corporation to launching one\'s own coaching school.',
      'tst.t1.q': '"After ICU certification I closed my first corporate contract for 1.2 million KZT. The Enbek.kz profession card resolved every question from the client\'s HR."',
      'tst.t1.n': 'Aigul K.',
      'tst.t1.r': 'Business coach · Almaty, Kazakhstan',
      'tst.t2.q': '"Before ICU I spent 12 years as an HR director. The program gave structure and international recognition — now I run executive coaching for top management across 4 countries."',
      'tst.t2.n': 'Dinara S.',
      'tst.t2.r': 'Executive coach · Astana, Kazakhstan',
      'tst.t3.q': '"Supervision in every module is rare. I felt real growth in my questioning technique by module three."',
      'tst.t3.n': 'Mikhail R.',
      'tst.t3.r': 'Team coach · Tashkent, Uzbekistan',
      'tst.t4.q': '"The European-style Diploma Supplement helped me confirm my qualifications after relocating to Dubai — opened my private practice in 2 months, no re-certification."',
      'tst.t4.n': 'Elena T.',
      'tst.t4.r': 'Life coach · Dubai, UAE',
      'tst.t5.q': '"I was a psychologist looking to legalize the practice. ICU gave me the certificate, the community, and my first three clients through alumni networking."',
      'tst.t5.n': 'Arman N.',
      'tst.t5.r': 'Psychologist-coach · Shymkent, Kazakhstan',
      'tst.t6.q': '"I compared 4 other schools. ICU won on two counts: international registry and real supervision. Within a year I made back my tuition 5x."',
      'tst.t6.n': 'Sabina A.',
      'tst.t6.r': 'Career coach · Bishkek, Kyrgyzstan',
      'tst.more': 'More reviews on the international ICU site →',

      'ct.h2': 'Kazakhstan office',
      'ct.sub': 'Come meet us in person or get in touch the way that suits you best.',
      'ct.address_l': 'Address',
      'ct.address_v': 'Astana, Abu Dhabi Plaza Business Center, office A-26',
      'ct.phone_l': 'Phone',
      'ct.email_l': 'Email',
      'ct.hours_l': 'Hours',
      'ct.hours_v': 'Mon–Fri · 10:00–19:00 (UTC+5)',
      'ct.cta': 'Message us on WhatsApp',
      'ct.map_stub': '2GIS interactive map loads here. Requires a 2GIS API key and the exact office address.',

      'gl.eyebrow': 'International Association',
      'gl.h2': 'Learn more about the global ICU',
      'gl.p': 'The International Coaches Union brings together thousands of certified coaches in 32+ countries. Executive Coach, Team Coach and Trainer of Coaching programs. Corporate clients worldwide.',
      'gl.cta': 'Visit coachunion.com →',

      'fin.h2': 'Join the next cohort',
      'fin.seats': 'seats left',
      'fin.sub': 'Leave your name and WhatsApp — we\'ll send the PDF program and explain the installment plan. A curator will reach out within an hour during working hours.',
      'fin.f_name': 'Your name',
      'fin.f_phone': 'WhatsApp number',
      'fin.err_name': 'Please enter your name',
      'fin.err_phone': 'Format: +7 followed by 10 digits',
      'fin.consent': 'I consent to the processing of personal data per the Privacy Policy (Law of the Republic of Kazakhstan "On Personal Data and Their Protection" No. 94-V dated 21.05.2013).',
      'fin.submit': 'Get the program on WhatsApp',
      'fin.note': 'After submission, a WhatsApp chat opens with a pre-filled message. A curator will reply within 5 minutes during working hours.',

      'ft.tag': 'International Coaches Union representative office in the Republic of Kazakhstan.',
      'ft.docs': 'Documents',
      'ft.privacy': 'Privacy Policy',
      'ft.offer': 'Public Offer',
      'ft.refund': 'Refund Policy',
      'ft.contacts': 'Contacts',
      'ft.addr': 'Astana, Abu Dhabi Plaza Business Center, office A-26',
      'ft.legal': 'Legal',
      'ft.legal_p': 'ICU Kazakhstan LLP. BIN: TBC. Legal address: TBC.',
      'ft.rights': 'All rights reserved.',

      'cookie.text': 'We use cookies for analytics and to improve the site. See the Privacy Policy for details.',
      'cookie.accept': 'Accept'
    }
  };

  function apply(lang) {
    if (!SUPPORTED.includes(lang)) lang = DEFAULT_LANG;
    const dict = STRINGS[lang];

    // Text nodes
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      const val = dict[key];
      if (val === undefined) return;

      // <meta content="">
      if (el.tagName === 'META') {
        el.setAttribute('content', val);
        return;
      }
      // <title>
      if (el.tagName === 'TITLE') {
        el.textContent = val;
        document.title = val;
        return;
      }
      // Если внутри есть <a> — сохраняем разметку (для consent / cookie текста).
      const hasInnerLink = el.querySelector('a');
      if (hasInnerLink) return;

      el.textContent = val;
    });

    document.documentElement.setAttribute('lang', lang === 'kz' ? 'kk' : lang);
    document.documentElement.setAttribute('data-lang', lang);

    // Switch button states
    document.querySelectorAll('[data-lang-btn]').forEach(btn => {
      const active = btn.getAttribute('data-lang-btn') === lang;
      btn.classList.toggle('active', active);
      btn.setAttribute('aria-pressed', String(active));
    });

    try { localStorage.setItem(STORAGE_KEY, lang); } catch (e) {}
  }

  function detectInitialLang() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored && SUPPORTED.includes(stored)) return stored;
    } catch (e) {}
    const nav = (navigator.language || 'ru').toLowerCase();
    if (nav.startsWith('kk') || nav.startsWith('kz')) return 'kz';
    if (nav.startsWith('en')) return 'en';
    return 'ru';
  }

  document.addEventListener('DOMContentLoaded', function () {
    apply(detectInitialLang());

    document.querySelectorAll('[data-lang-btn]').forEach(btn => {
      btn.addEventListener('click', () => {
        const lang = btn.getAttribute('data-lang-btn');
        apply(lang);
        if (typeof window.icuTrack === 'function') {
          window.icuTrack('lang_change', { lang: lang });
        }
      });
    });
  });

  // Expose for debugging
  window.icuI18n = { apply: apply, current: detectInitialLang };
})();
