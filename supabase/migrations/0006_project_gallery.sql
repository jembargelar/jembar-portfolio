-- JEMBAR.DEV
-- Project Gallery
-- Migration: 0006_project_gallery

create table if not exists public.gallery_items (
  id uuid primary key default gen_random_uuid(),

  project_id uuid not null
    references public.projects(id)
    on delete cascade,

  image_url text not null,

  sort_order integer not null default 0,

  alt_text_id text,
  alt_text_en text,

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists gallery_items_project_id_idx
  on public.gallery_items(project_id);

create index if not exists gallery_items_sort_order_idx
  on public.gallery_items(project_id, sort_order);

alter table public.gallery_items enable row level security;

drop policy if exists "Public can view project gallery"
  on public.gallery_items;

create policy "Public can view project gallery"
  on public.gallery_items
  for select
  using (true);

drop policy if exists "Authenticated admins can insert gallery"
  on public.gallery_items;

create policy "Authenticated admins can insert gallery"
  on public.gallery_items
  for insert
  to authenticated
  with check (true);

drop policy if exists "Authenticated admins can update gallery"
  on public.gallery_items;

create policy "Authenticated admins can update gallery"
  on public.gallery_items
  for update
  to authenticated
  using (true)
  with check (true);

drop policy if exists "Authenticated admins can delete gallery"
  on public.gallery_items;

create policy "Authenticated admins can delete gallery"
  on public.gallery_items
  for delete
  to authenticated
  using (true);

comment on table public.gallery_items is
  'Additional project images used by the JEMBAR.DEV project gallery';

comment on column public.gallery_items.project_id is
  'Related project ID';

comment on column public.gallery_items.image_url is
  'Public URL of gallery image';

comment on column public.gallery_items.sort_order is
  'Display order, lower values appear first';

comment on column public.gallery_items.alt_text_id is
  'Image alt text in Bahasa Indonesia';

comment on column public.gallery_items.alt_text_en is
  'Image alt text in English';

create or replace function public.set_gallery_items_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists gallery_items_updated_at
  on public.gallery_items;

create trigger gallery_items_updated_at
before update on public.gallery_items
for each row
execute function public.set_gallery_items_updated_at();
