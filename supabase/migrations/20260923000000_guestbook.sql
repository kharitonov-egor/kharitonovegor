create table public.guestbook (
  id bigint generated always as identity primary key,
  user_id uuid not null default auth.uid() references auth.users (id) on delete cascade,
  name text not null default '',
  avatar_url text,
  message text not null check (char_length(trim(message)) between 1 and 280),
  created_at timestamptz not null default now()
);

create index guestbook_created_at_idx on public.guestbook (created_at desc);

alter table public.guestbook enable row level security;

create policy "Anyone can read the guestbook"
  on public.guestbook for select
  to anon, authenticated
  using (true);

create policy "Signed-in users can sign"
  on public.guestbook for insert
  to authenticated
  with check ((select auth.uid()) = user_id);

create policy "Authors can delete their own entries"
  on public.guestbook for delete
  to authenticated
  using ((select auth.uid()) = user_id);

-- Name and avatar come from the GitHub profile, not the client, so nobody can post as someone else.
create function public.guestbook_set_author()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  select
    coalesce(u.raw_user_meta_data ->> 'user_name', u.raw_user_meta_data ->> 'full_name', 'anonymous'),
    u.raw_user_meta_data ->> 'avatar_url'
  into new.name, new.avatar_url
  from auth.users u
  where u.id = new.user_id;
  return new;
end;
$$;

create trigger guestbook_set_author
  before insert on public.guestbook
  for each row execute function public.guestbook_set_author();
