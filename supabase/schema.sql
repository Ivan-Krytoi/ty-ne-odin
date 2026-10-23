-- ============================================================
-- «Ты не один» — схема БД (Supabase / Postgres)
-- Выполняется в Supabase SQL Editor ОДИН раз (см. README).
-- ============================================================

-- 1) Обращения за психологической поддержкой (записи приватные)
create table if not exists public.support_requests (
  id uuid primary key default gen_random_uuid(),
  name text not null default 'Аноним',
  contact text not null default '',
  topic text not null default 'Другое',
  message text not null check (char_length(message) between 10 and 2000),
  created_at timestamptz not null default now()
);

-- 2) Желание стать донором (публичный счётчик, записи приватные)
create table if not exists public.donor_pledges (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  city text not null,
  contact text not null default '',
  note text not null default '',
  created_at timestamptz not null default now()
);

-- Включаем Row Level Security: анонимный браузер жюри работает через ключ anon
alter table public.support_requests enable row level security;
alter table public.donor_pledges enable row level security;

-- Анонимный пользователь может ТОЛЬКО отправлять (insert).
-- Читать (select) чужие обращения НЕ может — приватность защищена на уровне БД.
create policy "anon can insert support requests"
  on public.support_requests
  for insert to anon
  with check (true);

create policy "anon can insert donor pledges"
  on public.donor_pledges
  for insert to anon
  with check (true);

-- Публичный счётчик доноров: единственный разрешённый «select».
create or replace function public.get_donor_count()
returns integer
language sql
security definer
set search_path = public
as $$
  select count(*)::int from public.donor_pledges;
$$;

grant execute on function public.get_donor_count() to anon;
