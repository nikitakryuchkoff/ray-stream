# Raystream: независимая проверка shadcn Button

Дата: 11 октября 2026 года. Проверяющий: отдельный субагент Business QA.

Статус: PASS в пределах чтения действующих исходников, сравнения SHA256 и трёх выполненных npm-проверок. Подтверждённых бизнес-регрессий в этой итерации не найдено. Браузерная приёмка ведущего агента выполняется отдельно и не подменяется этим статусом.

## Объём

Проверена замена основных CTA, Show more и кнопки очистки пустой выдачи на общий Button, а также удаление нижней линии hero. Проверены действующие импорты из `src/main.tsx` и `src/App.tsx`, общий `src/components/ui/button.tsx`, `button.css`, Layout, CatalogPage, ProductPage, ContactPage и каскад CSS. Все 214 моделей повторно в браузере не обходились: каталог и маршрутизация не менялись в этой итерации.

## Семантика и бизнес-логика

| Проверка | Результат и основание |
| --- | --- |
| CTA ведут по настоящим ссылкам | PASS по исходникам. ButtonLink использует `Button asChild` с единственным дочерним `<a href>`. Вложенного button нет. Общий Button не добавляет `preventDefault` или `stopPropagation`. |
| Модель в запросе | PASS по исходникам и check:model. Product CTA и ProjectCTA используют прежний enquiryUrl. Аксессуар передаёт модель и название аксессуара через тот же helper. |
| Submit и повторная отправка | PASS по исходникам. Реальный button сохраняет `type=submit`, `disabled`, `aria-busy`, текущий onSubmit и состояния Send / Sending / Retry. Spinner скрыт от accessibility tree; отдельный live status сохранён. |
| Props, события, ref | PASS по исходникам. Button использует forwardRef и передаёт native props, className, события и ARIA. Обычный Button получает безопасный default `type=button`. |
| Loading и disabled | PASS по CSS. Обычный disabled имеет opacity .5; loading submit остаётся opacity 1 и disabled. Spinner отключает анимацию при reduced motion. Фактическая ширина зависит от браузерной приёмки. |
| Show more | PASS по исходникам. Реальный `type=button`, прежний обработчик увеличивает limit на 36; стартовый limit 36 сохранён. |
| Empty / clear / поиск | PASS по исходникам. Clear сбрасывает query и limit до 36 и возвращает focus в input. Инлайн-кнопка очистки, фильтрация в текущей категории, history state сохранены. |
| Categories, мобильное меню | PASS по исходникам. Native toggle, `aria-expanded`, `aria-controls`, обработчики, Escape и возврат фокуса не заменялись. |
| Галерея и раскрытия | PASS по исходникам. Gallery aria-pressed, выбор изображения, спецификации 6 → все → 6 и аксессуары 3 → все → 3 сохраняют прежние обработчики. |
| Навигация и history | PASS по исходникам и SHA256. useBrowserRoute неизменён; новые anchor остаются совместимы с существующим History API и native modifier/new-tab поведением. Actual Back/Forward проверяет ведущий агент. |
| Длинные названия | PASS по CSS. Model CTA имеет button-wrap, max-width 100%, min-width 0, white-space normal и overflow-wrap anywhere. Фактическое отсутствие overflow на 320 px проверяет ведущий агент. |
| Нижняя линия hero | PASS по CSS. `.hero-footer` имеет `border-top:0`; повторная установка border-color в materials удалена. Текст и расположение footer сохранены. |
| Стек и источник | PASS по исходникам. React 18, Vite 5 и native CSS сохранены. Button адаптирован из shadcn/ui с Slot и cva; ссылка на источник и MIT attribution указаны в коде. |

Композиция anchor через asChild соответствует [официальному Button shadcn/ui](https://ui.shadcn.com/docs/components/radix/button). Передача свойств непосредственному дочернему элементу соответствует [Radix Slot](https://www.radix-ui.com/primitives/docs/utilities/slot). Здесь используется адаптация с 44 px геометрией Raystream, а не заявление о неизменённом компоненте shadcn.

## Выполненные проверки

Команды запущены независимо после сообщения о готовой сборке разработчика; все завершились exit 0:

- `npm run check:contact` — method, JSON, validation, model injection, отсутствие конфигурации, получатель и модель в payload, принятие и отказ провайдера. Провайдер подменён тестовым ответом; реальных писем не отправлялось.
- `npm run check:model` — Unicode-границы, round trip URL, длина и удаление переводов строк.
- `npm run typecheck` — TypeScript без ошибок.

SHA256 совпал с baseline у всех семи контролируемых файлов: useContactForm.ts, api/contact.js, public/send.php, constants/contact.ts, utils/modelSelection.ts, hooks/useBrowserRoute.ts, data/catalog.json. Результаты сохранены в `work/shadcn-qa-baseline.json` и `work/shadcn-qa-hash-verification.json`.

## Пределы проверки

В этой итерации QA-субагент выполнял чтение кода и npm-проверки. CUA в его предыдущей сессии возвращал пустой browser inventory и Browser not available для iab / 2; независимые браузерные клики здесь не заявляются. Ведущий агент отдельно проверяет desktop / mobile, actual href / Back / Show more / clear / toggles и форму с перехваченными 500 / 200 ответами. QA не менял вкладки, viewport, device/media overrides или сетевые перехваты.

Для браузерной приёмки передано наблюдение: submit резервирует `min-width:184px`, тогда как исходная спецификация задавала минимум 150 px. Это не подтверждённая бизнес-ошибка; требуется измерить ширину Send / Sending / Retry с загруженным Instrument Sans.

Успешные тестовые ответы формы и сборка не подтверждают доставку почты. Реальная доставка, SMTP/PHP mail или production API-конфигурация в этой проверке не тестировались. Production-файлы QA-субагент не изменял.
