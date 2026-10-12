# Asset delivery: независимая бизнес-проверка

12 октября 2026 года. **PASS в проверенном объёме; подтверждённых регрессий не найдено.** Production browser QA выполняет ведущий агент после публикации.

| Проверка | Результат |
| --- | --- |
| Vite base | Исполнена текущая конфигурация с подставленным loadEnv: 10 случаев. Пустое значение сохраняет `/`; HTTPS alias с завершающим `/` или без него принимается. HTTP, credentials, path, query, hash и некорректный URL отклоняются. Dev base остаётся `/`. |
| Изображения и responsive | Актуальные TS-модули исполнены с `BASE_URL='/'` и внешним HTTPS base. В каждом режиме проверены 7 категорий, 214 моделей, 348 блоков аксессуаров и hero: 495 уникальных оригиналов и 495 вариантов 600 px существуют локально. imageSmall сохраняет нужный origin; абсолютные URL повторно не префиксуются. Четыре отсутствовавшие фотографии аксессуаров остаются отсутствующими, без новых сломанных ссылок. |
| Модель и маршруты | В обоих режимах прошли 562 round trip model/accessory query. URL обращения остаётся `/contact?model=...` на raystream.hk. Карты моделей/категорий работают. App, native href и router просмотрены; asset helper применяется к изображениям. |
| Форма | Актуальный hook исполнен с React/fetch stubs. Unset, пустой и пробельный endpoint дают `/send.php` независимо от CDN base. `/api/contact` и внешний явный override сохраняются. POST содержит выбранную SF24. Реальных HTTP-отправок не было. |
| Runtime SEO | По 226 страниц в каждом режиме: canonical, og:url и schema URL остаются raystream.hk; og:image и Product image используют нужный origin. 404 сохраняет noindex. |
| Готовый dist | Проверены все 226 HTML: canonical/OG/schema, alias у entry JS/CSS/font preload, alias у обеих WOFF2 ссылок CSS и существование файлов. Sitemap содержит 226 URL raystream.hk. send.php исключён из Vercel output. Сборку повторно QA-субагент не запускал. |
| Неизменность бизнес-файлов | SHA256 совпал с прежним baseline у api/contact.js, public/send.php, constants/contact.ts, utils/modelSelection.ts, hooks/useBrowserRoute.ts и data/catalog.json. В diff useContactForm изменён только fallback endpoint. |

Дополнительно `npm run check:contact` и `npm run check:model` завершились **exit 0**. Первый использует stub провайдера и не отправляет письмо; второй проверяет Unicode-границы, URL round trips, лимит длины и переводы строк.

Методика и машинные результаты сохранены в `work/asset-delivery-qa.cjs` и `work/asset-delivery-qa-results.json`. Начальная ошибка изоляции VM (не подставленный process.cwd) исправлена в QA-harness; итоговый запуск exit 0, production-код не менялся.

Пределы: проверка выполнялась чтением исходников, исполнением модулей в Node VM со stubs и анализом уже собранного dist. QA не менял source, Vercel, вкладки или browser overrides. Фактические загрузки в production, CORS шрифтов/модульного JS, клики и SSO scope независимым браузерным тестом здесь не подтверждались. Доставка письма и Resend-конфигурация также не проверялись; успешный stub означает только тестовое принятие. README обновлён ведущим агентом под optional asset origin и same-origin `/send.php`.
