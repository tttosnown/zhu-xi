-- 筑习 v1.8 云端学习快照表
create table if not exists public.user_app_state (
  user_id uuid primary key references auth.users(id) on delete cascade,
  payload jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

alter table public.user_app_state enable row level security;

drop policy if exists "Users can view own app state" on public.user_app_state;
drop policy if exists "Users can insert own app state" on public.user_app_state;
drop policy if exists "Users can update own app state" on public.user_app_state;
drop policy if exists "Users can delete own app state" on public.user_app_state;

create policy "Users can view own app state"
on public.user_app_state for select to authenticated
using (auth.uid() = user_id);

create policy "Users can insert own app state"
on public.user_app_state for insert to authenticated
with check (auth.uid() = user_id);

create policy "Users can update own app state"
on public.user_app_state for update to authenticated
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

create policy "Users can delete own app state"
on public.user_app_state for delete to authenticated
using (auth.uid() = user_id);
