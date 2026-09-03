-- =========================================================
-- JEMBAR.DEV
-- CMS CORE
-- Migration: 0007_cms_core
-- =========================================================

-- =========================================================
-- SITE SETTINGS
-- =========================================================

create table if not exists public.site_settings (
  id uuid primary key default gen_random_uuid(),
  site_name text not null default 'JEMBAR.DEV',
  site_title_id text,
  site_title_en text,
  seo_description_id text,
  seo_description_en text,
  favicon_url text,
  default_language text not null default 'id',
  default_theme text not null default 'dark',
  maintenance_mode boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- =========================================================
-- HERO CONTENT
-- =========================================================

create table if not exists public.hero_content (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  role_id text,
  role_en text,
  tagline_id text,
  tagline_en text,
  description_id text,
  description_en text,
  location_id text,
  location_en text,
  profile_image_url text,
  cv_url text,
  primary_cta_id text default 'Lihat Proyek',
  primary_cta_en text default 'View Projects',
  secondary_cta_id text default 'Download CV',
  secondary_cta_en text default 'Download CV',
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- =========================================================
-- ABOUT CONTENT
-- =========================================================

create table if not exists public.about_content (
  id uuid primary key default gen_random_uuid(),
  title_id text,
  title_en text,
  description_id text,
  description_en text,
  highlight_id text,
  highlight_en text,
  image_url text,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- =========================================================
-- WHAT I BUILD
-- =========================================================

create table if not exists public.build_services (
  id uuid primary key default gen_random_uuid(),
  title_id text not null,
  title_en text not null,
  description_id text,
  description_en text,
  icon text,
  sort_order integer not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- =========================================================
-- EXPERIENCE
-- =========================================================

create table if not exists public.experiences (
  id uuid primary key default gen_random_uuid(),
  company text not null,
  role_id text,
  role_en text,
  period_id text,
  period_en text,
  description_id text,
  description_en text,
  highlights_id text[] not null default '{}',
  highlights_en text[] not null default '{}',
  tags text[] not null default '{}',
  sort_order integer not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- =========================================================
-- SKILLS
-- =========================================================

create table if not exists public.skills (
  id uuid primary key default gen_random_uuid(),
  name_id text not null,
  name_en text,
  category text not null default 'technical',
  sort_order integer not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- =========================================================
-- EDUCATION
-- =========================================================

create table if not exists public.education (
  id uuid primary key default gen_random_uuid(),
  institution text not null,
  degree_id text,
  degree_en text,
  period_id text,
  period_en text,
  description_id text,
  description_en text,
  sort_order integer not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- =========================================================
-- SOCIAL & CONTACT
-- =========================================================

create table if not exists public.social_links (
  id uuid primary key default gen_random_uuid(),
  email text,
  phone text,
  whatsapp text,
  github text,
  linkedin text,
  instagram text,
  location_id text,
  location_en text,
  contact_title_id text,
  contact_title_en text,
  contact_description_id text,
  contact_description_en text,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- =========================================================
-- SUPPORT MY WORK
-- =========================================================

create table if not exists public.support_content (
  id uuid primary key default gen_random_uuid(),
  title_id text,
  title_en text,
  description_id text,
  description_en text,
  qris_image_url text,
  payment_name text,
  payment_number text,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- =========================================================
-- INDEXES
-- =========================================================

create index if not exists build_services_sort_idx
  on public.build_services(sort_order);

create index if not exists experiences_sort_idx
  on public.experiences(sort_order);

create index if not exists skills_sort_idx
  on public.skills(sort_order);

create index if not exists education_sort_idx
  on public.education(sort_order);

-- =========================================================
-- RLS
-- =========================================================

alter table public.site_settings enable row level security;
alter table public.hero_content enable row level security;
alter table public.about_content enable row level security;
alter table public.build_services enable row level security;
alter table public.experiences enable row level security;
alter table public.skills enable row level security;
alter table public.education enable row level security;
alter table public.social_links enable row level security;
alter table public.support_content enable row level security;

-- =========================================================
-- PUBLIC SELECT
-- =========================================================

drop policy if exists "Public can view site settings"
  on public.site_settings;

create policy "Public can view site settings"
  on public.site_settings
  for select
  using (true);

drop policy if exists "Public can view hero content"
  on public.hero_content;

create policy "Public can view hero content"
  on public.hero_content
  for select
  using (true);

drop policy if exists "Public can view about content"
  on public.about_content;

create policy "Public can view about content"
  on public.about_content
  for select
  using (true);

drop policy if exists "Public can view build services"
  on public.build_services;

create policy "Public can view build services"
  on public.build_services
  for select
  using (true);

drop policy if exists "Public can view experiences"
  on public.experiences;

create policy "Public can view experiences"
  on public.experiences
  for select
  using (true);

drop policy if exists "Public can view skills"
  on public.skills;

create policy "Public can view skills"
  on public.skills
  for select
  using (true);

drop policy if exists "Public can view education"
  on public.education;

create policy "Public can view education"
  on public.education
  for select
  using (true);

drop policy if exists "Public can view social links"
  on public.social_links;

create policy "Public can view social links"
  on public.social_links
  for select
  using (true);

drop policy if exists "Public can view support content"
  on public.support_content;

create policy "Public can view support content"
  on public.support_content
  for select
  using (true);

-- =========================================================
-- AUTHENTICATED CMS ACCESS
-- =========================================================

drop policy if exists "Authenticated can manage site settings"
  on public.site_settings;

create policy "Authenticated can manage site settings"
  on public.site_settings
  for all
  to authenticated
  using (true)
  with check (true);

drop policy if exists "Authenticated can manage hero content"
  on public.hero_content;

create policy "Authenticated can manage hero content"
  on public.hero_content
  for all
  to authenticated
  using (true)
  with check (true);

drop policy if exists "Authenticated can manage about content"
  on public.about_content;

create policy "Authenticated can manage about content"
  on public.about_content
  for all
  to authenticated
  using (true)
  with check (true);

drop policy if exists "Authenticated can manage build services"
  on public.build_services;

create policy "Authenticated can manage build services"
  on public.build_services
  for all
  to authenticated
  using (true)
  with check (true);

drop policy if exists "Authenticated can manage experiences"
  on public.experiences;

create policy "Authenticated can manage experiences"
  on public.experiences
  for all
  to authenticated
  using (true)
  with check (true);

drop policy if exists "Authenticated can manage skills"
  on public.skills;

create policy "Authenticated can manage skills"
  on public.skills
  for all
  to authenticated
  using (true)
  with check (true);

drop policy if exists "Authenticated can manage education"
  on public.education;

create policy "Authenticated can manage education"
  on public.education
  for all
  to authenticated
  using (true)
  with check (true);

drop policy if exists "Authenticated can manage social links"
  on public.social_links;

create policy "Authenticated can manage social links"
  on public.social_links
  for all
  to authenticated
  using (true)
  with check (true);

drop policy if exists "Authenticated can manage support content"
  on public.support_content;

create policy "Authenticated can manage support content"
  on public.support_content
  for all
  to authenticated
  using (true)
  with check (true);

-- =========================================================
-- UPDATED_AT TRIGGER FUNCTION
-- =========================================================

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- =========================================================
-- UPDATED_AT TRIGGERS
-- =========================================================

drop trigger if exists site_settings_updated_at
  on public.site_settings;

create trigger site_settings_updated_at
before update on public.site_settings
for each row execute function public.set_updated_at();

drop trigger if exists hero_content_updated_at
  on public.hero_content;

create trigger hero_content_updated_at
before update on public.hero_content
for each row execute function public.set_updated_at();

drop trigger if exists about_content_updated_at
  on public.about_content;

create trigger about_content_updated_at
before update on public.about_content
for each row execute function public.set_updated_at();

drop trigger if exists build_services_updated_at
  on public.build_services;

create trigger build_services_updated_at
before update on public.build_services
for each row execute function public.set_updated_at();

drop trigger if exists experiences_updated_at
  on public.experiences;

create trigger experiences_updated_at
before update on public.experiences
for each row execute function public.set_updated_at();

drop trigger if exists skills_updated_at
  on public.skills;

create trigger skills_updated_at
before update on public.skills
for each row execute function public.set_updated_at();

drop trigger if exists education_updated_at
  on public.education;

create trigger education_updated_at
before update on public.education
for each row execute function public.set_updated_at();

drop trigger if exists social_links_updated_at
  on public.social_links;

create trigger social_links_updated_at
before update on public.social_links
for each row execute function public.set_updated_at();

drop trigger if exists support_content_updated_at
  on public.support_content;

create trigger support_content_updated_at
before update on public.support_content
for each row execute function public.set_updated_at();
