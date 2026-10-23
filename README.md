# «Ты не один» — сайт поддержки

Проект номинации **«Медицинские и социальные проекты»** конкурса
**«Добрые Сайты 2026»** (организатор — ВО «ДоброБит»).

Сайт объединяет три раздела: психологическая поддержка, первая помощь,
донорство. Стек: **React + Supabase (Postgres) + GitHub Pages**.

---

## 1. Быстрая проверка сайта (для жюри)

1. Открыть рабочую ссылку (GitHub Pages).
2. Пройти разделы: Главная → Психподдержка → Первая помощь → Донорство → FAQ.
3. Проверить форму обращения (раздел «Психподдержка») — запись данных видна
   в таблице БД (см. ниже), данные доступны и на мобильных.
4. Проверить адаптив: телефон (360), планшет (768), ПК (1280+).

**Live-ссылка:** _указать после первого деплоя_.

---

## 2. Как инициализировать базу данных (обязательная инструкция)

База — **Supabase** (PostgreSQL, облачный бесплатный тариф).

1. Зарегистрироваться на https://supabase.com и создать проект (Free tier).
2. открыть **SQL Editor** → *New query*, вставить содержимое файла
   `supabase/schema.sql` и выполнить (**Run**).
3. В разделе **Project Settings → API** взять два значения:
   - `Project URL` — вставить в `.env` как `VITE_SUPABASE_URL`;
   - `anon public key` — вставить как `VITE_SUPABASE_ANON_KEY`.
4. Создать файл `.env` в корне проекта (шаблон — `.env.example`):

   ```
   VITE_SUPABASE_URL=https://xxxx.supabase.co
   VITE_SUPABASE_ANON_KEY=eyJhb...
   ```

5. Пересобрать сайт (`npm run build`) и задеплоить. С этого момента
   формы пишут в базу.
6. **Проверка работоспособности БД** (для жюри, за 2 минуты):
   - открыть dashboard проекта → *Table Editor* — видно таблицы
     `support_requests`, `donor_pledges`;
   - отправить обращение через форму на сайте → строка появляется в
     `support_requests`;
   - вернуть счётчик доноров: функция `public.get_donor_count()`
     (в SQL Editor: `select get_donor_count();`);
   - приватность: строка `select * from support_requests;` под ключом
     `anon` возвращает **0 строк** (RLS) — anonymity на уровне БД.

Без настроенного `.env` сайт работает в демо-режиме (данные уходят в
`localStorage` браузера), чтобы страницы не падали.

---

## 3. Локальный запуск

Требуется Node.js 20+.

```bash
npm install
npm run dev        # разработка: http://localhost:5173
npm run build      # продакшен-сборка в dist/
npm run preview    # локальный просмотр сборки
```

---

## 4. Деплой на GitHub Pages

1. Создать **public**-репозиторий на GitHub и загрузить код (ветка `main`).
2. Действия workflow уже добавлены: `.github/workflows/deploy.yml`.
3. В репозитории: **Settings → Pages → Source: GitHub Actions**.
4. После каждого push в `main` сайт пересобирается и обновляется.
5. Адрес будет вида `https://<github-username>.github.io/<repo-name>/`.

Ключи БД не должны попадать в открытый репозиторий: в GitHub Pages
`VITE_*` не назначаются, потому деплой использует отдельные secrets:

- **Settings → Secrets → Actions** создать `VITE_SUPABASE_URL` и
  `VITE_SUPABASE_ANON_KEY`;
- раскомментировать блок `env` в `deploy.yml` (см. сам файл).

---

## 5. Доступность (WCAG 2.1 AA)

- Контраст основного текста 16.9:1, ссылок и кнопок ≥ 4.5:1.
- Всю навигацию можно пройти с клавиатуры: Tab, Enter, Esc (меню).
- Семантическая вёрстка (header/nav/main/section/footer), h1→h2→h3
  без пропусков, skip-link к содержимому.
- Видимые focus-обводки; `prefers-reduced-motion` поддерживается.
- Формы: подписи всегда видны, ошибки — текстом с иконкой, `role="alert"`.

---

## 6. Структура проекта

```
site/
├── index.html               # точка входа, шрифты Inter, метаданные
├── supabase/schema.sql      # таблицы + RLS + публичная функция
├── .github/workflows/deploy.yml
├── public/favicon.svg
└── src/
    ├── main.jsx             # рендер приложения
    ├── App.jsx              # маршруты + layout (header/ SOS/ footer)
    ├── styles/global.css    # токены дизайн-системы (ФОРМАТ_ДИЗАЙНА.md)
    ├── lib/supabaseClient.js# клиент БД + локальный fallback
    ├── data/content.js      # ВСЕ тексты сайта в одном файле
    ├── components/          # Header, Footer, SosBlock, Card, Accordion, формы
    └── pages/               # Home, PsychSupport, FirstAid, Donorship, Faq
```

## 7. Для справки

- Организатор конкурса: ВО «ДоброБит» (dobryesite@dobrobitvo.ru).
- Сайт **не заменяет** врача или психолога. Экстренный номер — **112**.
