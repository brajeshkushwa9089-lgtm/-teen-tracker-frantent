-- TeenSpend database schema (Supabase PostgreSQL)
-- Run this in Supabase SQL Editor before starting the authentication phase.

create extension if not exists "pgcrypto";

create table if not exists public.users (
  id uuid primary key default gen_random_uuid(),
  name varchar(100) not null check (char_length(trim(name)) between 2 and 100),
  email varchar(255) not null unique check (email = lower(email)),
  password_hash text not null,
  avatar_url text,
  monthly_allowance numeric(12, 2) not null default 0 check (monthly_allowance >= 0),
  currency varchar(3) not null default 'INR' check (char_length(currency) = 3),
  age smallint check (age between 10 and 120),
  preferred_theme varchar(10) not null default 'light' check (preferred_theme in ('light', 'dark', 'system')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.categories (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.users(id) on delete cascade,
  name varchar(60) not null check (char_length(trim(name)) between 1 and 60),
  icon varchar(32) not null default '📦',
  is_default boolean not null default false,
  created_at timestamptz not null default now(),
  constraint categories_owner_check check ((is_default and user_id is null) or (not is_default and user_id is not null))
);

create unique index if not exists unique_system_category_name
  on public.categories (lower(name)) where user_id is null;
create unique index if not exists unique_user_category_name
  on public.categories (user_id, lower(name)) where user_id is not null;

create table if not exists public.expenses (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.users(id) on delete cascade,
  category_id uuid not null references public.categories(id) on delete restrict,
  amount numeric(12, 2) not null check (amount > 0),
  description varchar(160) not null check (char_length(trim(description)) between 1 and 160),
  expense_date date not null,
  payment_method varchar(30) not null check (payment_method in ('Cash', 'UPI', 'Debit Card', 'Credit Card', 'Bank Transfer', 'Wallet', 'Other')),
  notes varchar(500),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.income (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.users(id) on delete cascade,
  source varchar(80) not null check (char_length(trim(source)) between 1 and 80),
  amount numeric(12, 2) not null check (amount > 0),
  income_date date not null,
  description varchar(300),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.budgets (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.users(id) on delete cascade,
  category_id uuid not null references public.categories(id) on delete restrict,
  amount numeric(12, 2) not null check (amount > 0),
  month smallint not null check (month between 1 and 12),
  year smallint not null check (year between 2020 and 2100),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (user_id, category_id, month, year)
);

create index if not exists expenses_user_date_index on public.expenses (user_id, expense_date desc);
create index if not exists expenses_user_category_index on public.expenses (user_id, category_id);
create index if not exists income_user_date_index on public.income (user_id, income_date desc);
create index if not exists budgets_user_period_index on public.budgets (user_id, year, month);

create or replace function public.set_updated_at()
returns trigger language plpgsql security invoker as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists users_set_updated_at on public.users;
create trigger users_set_updated_at before update on public.users for each row execute function public.set_updated_at();
drop trigger if exists expenses_set_updated_at on public.expenses;
create trigger expenses_set_updated_at before update on public.expenses for each row execute function public.set_updated_at();
drop trigger if exists income_set_updated_at on public.income;
create trigger income_set_updated_at before update on public.income for each row execute function public.set_updated_at();
drop trigger if exists budgets_set_updated_at on public.budgets;
create trigger budgets_set_updated_at before update on public.budgets for each row execute function public.set_updated_at();

insert into public.categories (name, icon, is_default) values
  ('Food', '🍔', true), ('Transport', '🚌', true), ('Education', '📚', true),
  ('Entertainment', '🎬', true), ('Shopping', '🛍️', true), ('Gaming', '🎮', true),
  ('Health', '💚', true), ('Mobile/Internet', '📱', true), ('Subscriptions', '🔄', true),
  ('Travel', '✈️', true), ('Bills', '🧾', true), ('Other', '📦', true)
on conflict (lower(name)) where user_id is null do nothing;

-- Enable RLS for defense in depth. These policies are for Supabase Auth JWTs;
-- the Express API will also enforce user isolation from its own JWT.
alter table public.users enable row level security;
alter table public.categories enable row level security;
alter table public.expenses enable row level security;
alter table public.income enable row level security;
alter table public.budgets enable row level security;

create policy "Users can view their own profile" on public.users for select using (id = auth.uid());
create policy "Users can update their own profile" on public.users for update using (id = auth.uid()) with check (id = auth.uid());
create policy "Users can read available categories" on public.categories for select using (is_default or user_id = auth.uid());
create policy "Users can manage their categories" on public.categories for all using (user_id = auth.uid()) with check (user_id = auth.uid() and not is_default);
create policy "Users manage their expenses" on public.expenses for all using (user_id = auth.uid()) with check (user_id = auth.uid());
create policy "Users manage their income" on public.income for all using (user_id = auth.uid()) with check (user_id = auth.uid());
create policy "Users manage their budgets" on public.budgets for all using (user_id = auth.uid()) with check (user_id = auth.uid());
