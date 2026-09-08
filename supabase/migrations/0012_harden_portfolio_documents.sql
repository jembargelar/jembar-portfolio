begin;

-- Keep sensitive portfolio evidence in a private, type-restricted bucket.
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'portfolio-documents',
  'portfolio-documents',
  false,
  52428800,
  array['application/pdf', 'image/jpeg', 'image/png', 'image/webp']::text[]
)
on conflict (id) do update
set public = false,
    file_size_limit = excluded.file_size_limit,
    allowed_mime_types = excluded.allowed_mime_types;

alter table public.portfolio_documents
  add column if not exists content_hash text,
  add column if not exists deletion_status text not null default 'active',
  add column if not exists deletion_error text,
  add column if not exists deleted_at timestamptz;

alter table public.portfolio_documents
  drop constraint if exists portfolio_documents_category_check;

alter table public.portfolio_documents
  add constraint portfolio_documents_category_check
  check (category in (
    'document', 'certificate', 'education', 'work-experience',
    'achievement', 'portfolio', 'other'
  ));

alter table public.portfolio_documents
  drop constraint if exists portfolio_documents_content_hash_check;

alter table public.portfolio_documents
  add constraint portfolio_documents_content_hash_check
  check (content_hash is null or content_hash ~ '^[a-f0-9]{64}$');

alter table public.portfolio_documents
  drop constraint if exists portfolio_documents_deletion_status_check;

alter table public.portfolio_documents
  add constraint portfolio_documents_deletion_status_check
  check (deletion_status in ('active', 'pending_delete', 'delete_failed'));

-- A content hash allows legitimate revised documents while rejecting identical
-- active uploads, including concurrent uploads from separate admin sessions.
create unique index if not exists portfolio_documents_active_content_hash_key
  on public.portfolio_documents (content_hash)
  where content_hash is not null and deletion_status = 'active';

create index if not exists portfolio_documents_public_active_order_idx
  on public.portfolio_documents (sort_order, created_at)
  where is_public = true and is_active = true and deletion_status = 'active';

create index if not exists portfolio_documents_deletion_status_idx
  on public.portfolio_documents (deletion_status)
  where deletion_status <> 'active';

-- A database sequence, rather than client state, makes ordering safe under
-- concurrent uploads.
create sequence if not exists public.portfolio_documents_sort_order_seq;

select setval(
  'public.portfolio_documents_sort_order_seq',
  greatest((select coalesce(max(sort_order), 0) from public.portfolio_documents), 1),
  true
);

alter table public.portfolio_documents
  alter column sort_order set default nextval('public.portfolio_documents_sort_order_seq');

-- Explicitly version the private-bucket policy set. There is intentionally no
-- anonymous read policy: public viewing is mediated by the Edge Function.
drop policy if exists "Admins can view portfolio documents" on storage.objects;
drop policy if exists "Admins can upload portfolio documents" on storage.objects;
drop policy if exists "Admins can update portfolio documents" on storage.objects;
drop policy if exists "Admins can delete portfolio documents" on storage.objects;

create policy "Admins can view portfolio documents"
on storage.objects for select to authenticated
using (bucket_id = 'portfolio-documents' and public.is_admin());

create policy "Admins can upload portfolio documents"
on storage.objects for insert to authenticated
with check (bucket_id = 'portfolio-documents' and public.is_admin());

create policy "Admins can update portfolio documents"
on storage.objects for update to authenticated
using (bucket_id = 'portfolio-documents' and public.is_admin())
with check (bucket_id = 'portfolio-documents' and public.is_admin());

create policy "Admins can delete portfolio documents"
on storage.objects for delete to authenticated
using (bucket_id = 'portfolio-documents' and public.is_admin());

commit;
