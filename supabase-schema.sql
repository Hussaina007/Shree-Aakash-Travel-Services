-- Run this in the Supabase SQL Editor to create the inquiry table and allow
-- anonymous visitors to insert inquiries. No public read policy is created.
create table if not exists public.trip_inquiries (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  full_name text not null,
  phone text not null,
  email text,
  destination text not null,
  travel_date date,
  travelers integer,
  trip_type text check (trip_type is null or trip_type in ('Family', 'Couple', 'Group', 'Other')),
  message text
);

alter table public.trip_inquiries enable row level security;
revoke all on table public.trip_inquiries from anon, authenticated;
grant insert on table public.trip_inquiries to anon;

drop policy if exists "Allow public inquiry submissions" on public.trip_inquiries;
create policy "Allow public inquiry submissions"
  on public.trip_inquiries
  for insert
  to anon
  with check (true);
