-- Career Gyan website forms → Supabase (same project as the workshop registration:
-- https://veovdcqtyrbakyednkvr.supabase.co).
-- Run once in Supabase Dashboard → SQL Editor → New query → paste → Run.
--
-- The website inserts rows with the publishable (anon) key over the REST API.
-- Row Level Security lets visitors INSERT only. Nobody can read, change or delete rows
-- with the public key; you view them in the dashboard (Table Editor) or with the service key.

create extension if not exists pgcrypto;

-- ---------------------------------------------------------------------------
-- 1) Enquiry forms: home page "Book a free counselling session" + contact page
-- ---------------------------------------------------------------------------
create table if not exists public.enquiries (
  id            uuid primary key default gen_random_uuid(),
  created_at    timestamptz not null default now(),
  source        text not null check (source in ('home', 'contact')),
  full_name     text not null check (char_length(full_name) between 1 and 120),
  email         text not null check (char_length(email) between 3 and 200 and email like '%@%'),
  phone         text not null check (char_length(phone) between 5 and 30),
  city          text check (char_length(city) <= 120),
  destination   text check (char_length(destination) <= 120),
  course        text check (char_length(course) <= 120),
  intake_month  text check (char_length(intake_month) <= 20),
  intake_year   text check (char_length(intake_year) <= 10),
  message       text check (char_length(message) <= 3000),
  page_url      text check (char_length(page_url) <= 500),
  status        text not null default 'new'   -- for your team: new / contacted / closed
);

-- ---------------------------------------------------------------------------
-- 2) Eligibility checker (/eligibility)
-- ---------------------------------------------------------------------------
create table if not exists public.eligibility_submissions (
  id                   uuid primary key default gen_random_uuid(),
  created_at           timestamptz not null default now(),
  full_name            text check (char_length(full_name) <= 120),
  email                text check (char_length(email) <= 200),
  phone                text check (char_length(phone) <= 30),
  referral_code        text check (char_length(referral_code) <= 60),
  city                 text check (char_length(city) <= 120),
  explore_abroad       text check (char_length(explore_abroad) <= 10),
  degree               text check (char_length(degree) <= 40),
  budget               text check (char_length(budget) <= 40),
  preferred_countries  text[] not null default '{}' check (cardinality(preferred_countries) <= 20),
  suggested_countries  text[] not null default '{}' check (cardinality(suggested_countries) <= 40),
  answers              jsonb  not null default '{}'::jsonb check (pg_column_size(answers) < 30000),
  page_url             text check (char_length(page_url) <= 500),
  status               text not null default 'new'
);

create index if not exists enquiries_created_at_idx on public.enquiries (created_at desc);
create index if not exists eligibility_created_at_idx on public.eligibility_submissions (created_at desc);

-- ---------------------------------------------------------------------------
-- Security: website visitors may only INSERT
-- ---------------------------------------------------------------------------
alter table public.enquiries               enable row level security;
alter table public.eligibility_submissions enable row level security;

revoke all on public.enquiries               from anon, authenticated;
revoke all on public.eligibility_submissions from anon, authenticated;
grant insert on public.enquiries               to anon;
grant insert on public.eligibility_submissions to anon;

drop policy if exists "website can insert enquiries" on public.enquiries;
create policy "website can insert enquiries"
  on public.enquiries for insert to anon
  with check (status = 'new');

drop policy if exists "website can insert eligibility" on public.eligibility_submissions;
create policy "website can insert eligibility"
  on public.eligibility_submissions for insert to anon
  with check (status = 'new');

-- Quick test (run in the SQL editor; it should return 1 row each after a test submission):
-- select * from public.enquiries order by created_at desc limit 5;
-- select full_name, budget, suggested_countries, answers from public.eligibility_submissions order by created_at desc limit 5;
