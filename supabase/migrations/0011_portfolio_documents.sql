begin;

-- =========================================================
-- PORTFOLIO DOCUMENTS
-- =========================================================

create table if not exists public.portfolio_documents (
  id uuid primary key default gen_random_uuid(),

  title_id text not null,
  title_en text,

  description_id text,
  description_en text,

  file_path text not null unique,
  file_name text not null,

  mime_type text not null,
  file_size bigint,

  category text not null default 'document',

  project_id uuid references public.projects(id)
    on delete set null,

  is_public boolean not null default true,
  is_active boolean not null default true,

  watermark text,

  sort_order integer not null default 0,

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- =========================================================
-- INDEXES
-- =========================================================

create index if not exists idx_portfolio_documents_active
on public.portfolio_documents (is_active);

create index if not exists idx_portfolio_documents_public
on public.portfolio_documents (is_public);

create index if not exists idx_portfolio_documents_sort
on public.portfolio_documents (sort_order);

create index if not exists idx_portfolio_documents_project
on public.portfolio_documents (project_id);

-- =========================================================
-- UPDATED_AT TRIGGER
-- =========================================================

create or replace function public.update_portfolio_documents_updated_at()
returns trigger
language plpgsql
security invoker
set search_path = public
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists portfolio_documents_updated_at
on public.portfolio_documents;

create trigger portfolio_documents_updated_at
before update on public.portfolio_documents
for each row
execute function public.update_portfolio_documents_updated_at();

-- =========================================================
-- RLS
-- =========================================================

alter table public.portfolio_documents enable row level security;

drop policy if exists "Public can view active portfolio documents"
on public.portfolio_documents;

create policy "Public can view active portfolio documents"
on public.portfolio_documents
for select
to anon, authenticated
using (
  is_public = true
  and is_active = true
);

drop policy if exists "Admins can manage portfolio documents"
on public.portfolio_documents;

create policy "Admins can manage portfolio documents"
on public.portfolio_documents
for all
to authenticated
using (
  is_admin()
)
with check (
  is_admin()
);

commit;
