-- =========================================================
-- JEMBAR.DEV
-- COMPLETE PERSONAL CMS CONTENT
-- Migration: 0010_seed_personal_cms
-- =========================================================

begin;

-- =========================================================
-- JOURNEY TABLE
-- =========================================================

create table if not exists public.journey_items (
  id uuid primary key default gen_random_uuid(),
  year_label text not null,
  title_id text not null,
  title_en text,
  description_id text,
  description_en text,
  icon text default 'BriefcaseBusiness',
  sort_order integer not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists journey_items_sort_idx
  on public.journey_items(sort_order);

alter table public.journey_items enable row level security;

drop policy if exists "Public can view journey items"
  on public.journey_items;

create policy "Public can view journey items"
  on public.journey_items
  for select
  using (true);

drop policy if exists "Admins can manage journey items"
  on public.journey_items;

create policy "Admins can manage journey items"
  on public.journey_items
  for all
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

-- =========================================================
-- EXPERIENCE NORMALIZATION
-- =========================================================

update public.experiences
set
  role_id = 'Operator Mesin Produksi',
  role_en = 'Production Machine Operator',
  period_id = 'Mei 2023 – Oktober 2024',
  period_en = 'May 2023 – Oct 2024',
  description_id =
    'Mengoperasikan mesin produksi sesuai SOP, menjaga alur produksi, melakukan pengecekan kualitas, serta menjaga standar keselamatan kerja.',
  description_en =
    'Operated production machinery according to SOPs, maintained production flow, performed quality checks, and followed workplace safety standards.',
  highlights_id = array[
    'Mengoperasikan mesin produksi sesuai SOP perusahaan.',
    'Menyiapkan material dan memastikan proses produksi berjalan lancar.',
    'Melakukan pengecekan kualitas produk secara bertahap.',
    'Menjaga kebersihan area kerja dan melakukan perawatan ringan mesin.',
    'Bekerja sama dengan tim untuk mencapai target produksi.'
  ],
  highlights_en = array[
    'Operated production machinery according to company SOPs.',
    'Prepared materials and ensured smooth production flow.',
    'Performed step-by-step product quality inspections.',
    'Maintained work area cleanliness and performed light machine maintenance.',
    'Collaborated with the team to achieve production targets.'
  ],
  tags = array[
    'Machine Operation',
    'Quality Control',
    'Production',
    'SOP',
    'K3'
  ],
  sort_order = 4,
  is_active = true,
  updated_at = now()
where company = 'UD Sinar Soccer Industries';

update public.experiences
set
  role_id = 'Waiter & Kasir',
  role_en = 'Waiter & Cashier',
  period_id = 'Februari 2025 – Juli 2025',
  period_en = 'Feb 2025 – Jul 2025',
  sort_order = 3,
  is_active = true,
  updated_at = now()
where company = 'Kedai Susu Murni 26';

update public.experiences
set
  role_id = 'Operator Cutting Laser',
  role_en = 'Laser Cutting Operator',
  period_id = 'Agustus 2025 – Oktober 2025',
  period_en = 'Aug 2025 – Oct 2025',
  sort_order = 2,
  is_active = true,
  updated_at = now()
where company = 'PT Garyman Kreasi Indonesia';

update public.experiences
set
  role_id = 'Admin / Data Entry',
  role_en = 'Administration / Data Entry',
  period_id = 'November 2025 – Agustus 2026',
  period_en = 'Nov 2025 – Aug 2026',
  description_id =
    'Mengelola administrasi dan pengelolaan data operasional, termasuk SLO & NIDI, verifikasi dokumen, invoice, tracking data, dan pelaporan.',
  description_en =
    'Managed operational administration and data management, including SLO & NIDI, document verification, invoicing, data tracking, and reporting.',
  highlights_id = array[
    'Mengelola administrasi instalasi tenaga listrik (SLO & NIDI).',
    'Melakukan verifikasi dokumen pelanggan dan pengelolaan database operasional.',
    'Membuat invoice dan melakukan tracking data SLO.',
    'Menyusun rekapitulasi serta laporan operasional menggunakan Microsoft Excel.'
  ],
  highlights_en = array[
    'Managed power installation administration (SLO & NIDI).',
    'Verified customer documents and maintained operational databases.',
    'Created invoices and tracked SLO data.',
    'Prepared operational recaps and reports using Microsoft Excel.'
  ],
  tags = array[
    'SLO & NIDI',
    'Data Entry',
    'Document Control',
    'Excel',
    'Operational Reporting'
  ],
  sort_order = 1,
  is_active = true,
  updated_at = now()
where company = 'PT Syahrendra Megawatt Indonesia';

-- =========================================================
-- JOURNEY NORMALIZATION
-- =========================================================

delete from public.journey_items
where title_id in (
  'Memulai perjalanan profesional',
  'Memulai Perjalanan Profesional',
  'Lulus SMAN 1 Garut',
  'Memperluas pengalaman kerja',
  'Memperluas Pengalaman Kerja',
  'Administrasi & Data Management',
  'Beralih ke Administrasi & Data',
  'Masuk Universitas Terbuka',
  'Menggabungkan Manajemen & Teknologi'
);

insert into public.journey_items (
  year_label,
  title_id,
  title_en,
  description_id,
  description_en,
  icon,
  sort_order,
  is_active
)
values
(
  'Mei 2023',
  'Memulai Perjalanan Profesional',
  'Starting My Professional Journey',
  'Memulai perjalanan profesional sebagai Operator Mesin Produksi di UD Sinar Soccer Industries. Pengalaman ini menjadi dasar dalam memahami disiplin kerja, proses produksi, SOP, kualitas, dan kerja tim.',
  'Started my professional journey as a Production Machine Operator at UD Sinar Soccer Industries. This experience built a foundation in work discipline, production processes, SOPs, quality, and teamwork.',
  'BriefcaseBusiness',
  1,
  true
),
(
  'Mei 2023',
  'Lulus SMAN 1 Garut',
  'Graduated from SMAN 1 Garut',
  'Menyelesaikan pendidikan SMA jurusan Ilmu Pengetahuan Alam (IPA), dengan dasar berpikir analitis, logika, matematika, dan pemecahan masalah secara terstruktur.',
  'Graduated from SMAN 1 Garut with a Science major, developing analytical thinking, logical reasoning, mathematics, and structured problem-solving skills.',
  'GraduationCap',
  2,
  true
),
(
  '2025',
  'Memperluas Pengalaman Kerja',
  'Expanding Professional Experience',
  'Memperluas pengalaman melalui pekerjaan di bidang pelayanan, kasir, produksi, dan operasional, sekaligus mengembangkan kemampuan komunikasi, ketelitian, dan adaptasi.',
  'Expanded professional experience across customer service, cashier, production, and operational roles while developing communication, attention to detail, and adaptability.',
  'TrendingUp',
  3,
  true
),
(
  '2025–2026',
  'Beralih ke Administrasi & Data',
  'Moving into Administration & Data',
  'Beralih ke bidang administrasi dan pengelolaan data, menangani rekap data, dokumen SLO dan NIDI, invoice, tracking data, verifikasi dokumen, dan administrasi operasional.',
  'Moved into administration and data management, handling data recapitulation, SLO and NIDI documentation, invoices, data tracking, document verification, and operational administration.',
  'Database',
  4,
  true
),
(
  '2026',
  'Menggabungkan Manajemen & Teknologi',
  'Combining Management & Technology',
  'Memulai pendidikan S1 Manajemen di Universitas Terbuka sambil mengembangkan kemampuan web development dan membangun solusi digital untuk kebutuhan bisnis.',
  'Started a Bachelor of Management degree at Universitas Terbuka while developing web development skills and building digital solutions for business needs.',
  'Code2',
  5,
  true
);

-- =========================================================
-- EDUCATION NORMALIZATION
-- =========================================================

insert into public.education (
  institution,
  degree_id,
  degree_en,
  period_id,
  period_en,
  description_id,
  description_en,
  sort_order,
  is_active
)
select
  seed.institution,
  seed.degree_id,
  seed.degree_en,
  seed.period_id,
  seed.period_en,
  seed.description_id,
  seed.description_en,
  seed.sort_order,
  seed.is_active
from (
  values
  (
    'Universitas Terbuka',
    'S1 Manajemen',
    'Bachelor of Management',
    'September 2026 – Sekarang',
    'September 2026 – Present',
    'Mempelajari manajemen operasional, administrasi bisnis, sumber daya manusia, perencanaan strategis, dan analisis data.',
    'Studying operations management, business administration, human resources, strategic planning, and data analysis.',
    1,
    true
  ),
  (
    'SMAN 1 Garut',
    'SMA - Ilmu Pengetahuan Alam (IPA)',
    'Senior High School - Science',
    'Juli 2020 – Mei 2023',
    'July 2020 – May 2023',
    'Mengembangkan kemampuan berpikir analitis, logika, matematika, dan pemecahan masalah secara terstruktur melalui pendidikan bidang Ilmu Pengetahuan Alam.',
    'Developed analytical thinking, logical reasoning, mathematics, and structured problem-solving through a Science-focused education.',
    2,
    true
  )
) as seed(
  institution,
  degree_id,
  degree_en,
  period_id,
  period_en,
  description_id,
  description_en,
  sort_order,
  is_active
)
where not exists (
  select 1
  from public.education existing
  where existing.institution = seed.institution
);

update public.education
set
  degree_id = 'S1 Manajemen',
  degree_en = 'Bachelor of Management',
  period_id = 'September 2026 – Sekarang',
  period_en = 'September 2026 – Present',
  sort_order = 1,
  is_active = true,
  updated_at = now()
where institution = 'Universitas Terbuka';

update public.education
set
  degree_id = 'SMA - Ilmu Pengetahuan Alam (IPA)',
  degree_en = 'Senior High School - Science',
  period_id = 'Juli 2020 – Mei 2023',
  period_en = 'July 2020 – May 2023',
  sort_order = 2,
  is_active = true,
  updated_at = now()
where institution = 'SMAN 1 Garut';

-- =========================================================
-- SKILLS
-- =========================================================

insert into public.skills (
  name_id,
  name_en,
  category,
  sort_order,
  is_active
)
select
  seed.name_id,
  seed.name_en,
  seed.category,
  seed.sort_order,
  seed.is_active
from (
  values
  ('Administrasi','Administration','administration',1,true),
  ('Data Entry','Data Entry','administration',2,true),
  ('Data Validation','Data Validation','administration',3,true),
  ('Data Processing','Data Processing','administration',4,true),
  ('Document Control','Document Control','administration',5,true),
  ('Document Management','Document Management','administration',6,true),
  ('Invoice Processing','Invoice Processing','administration',7,true),
  ('Reporting','Reporting','administration',8,true),
  ('Data Recapitulation','Data Recapitulation','administration',9,true),
  ('SLO & NIDI Administration','SLO & NIDI Administration','administration',10,true),
  ('Microsoft Excel','Microsoft Excel','administration',11,true),
  ('Microsoft Word','Microsoft Word','administration',12,true),
  ('Google Sheets','Google Sheets','administration',13,true),
  ('Google Docs','Google Docs','administration',14,true),
  ('Data Management','Data Management','administration',15,true),
  ('Risk Management','Risk Management','administration',16,true),
  ('Customer Service','Customer Service','operational',1,true),
  ('Order Processing','Order Processing','operational',2,true),
  ('Production Machine Operation','Production Machine Operation','operational',3,true),
  ('Quality Control','Quality Control','operational',4,true),
  ('SOP & K3 Compliance','SOP & K3 Compliance','operational',5,true),
  ('React.js','React.js','technical',1,true),
  ('JavaScript','JavaScript','technical',2,true),
  ('Vite','Vite','technical',3,true),
  ('Tailwind CSS','Tailwind CSS','technical',4,true),
  ('Supabase','Supabase','technical',5,true),
  ('PostgreSQL','PostgreSQL','technical',6,true),
  ('REST API','REST API','technical',7,true),
  ('Git','Git','technical',8,true),
  ('GitHub','GitHub','technical',9,true),
  ('Vercel','Vercel','technical',10,true),
  ('Termux','Termux','technical',11,true),
  ('Web Development','Web Development','technical',12,true)
) as seed(
  name_id,
  name_en,
  category,
  sort_order,
  is_active
)
where not exists (
  select 1
  from public.skills existing
  where lower(existing.name_id) = lower(seed.name_id)
);

-- =========================================================
-- NORMALIZE SKILL ORDER / LABELS
-- =========================================================

update public.skills s
set
  name_en = seed.name_en,
  category = seed.category,
  sort_order = seed.sort_order,
  is_active = true,
  updated_at = now()
from (
  values
  ('Administrasi','Administration','administration',1),
  ('Data Entry','Data Entry','administration',2),
  ('Data Validation','Data Validation','administration',3),
  ('Data Processing','Data Processing','administration',4),
  ('Document Control','Document Control','administration',5),
  ('Document Management','Document Management','administration',6),
  ('Invoice Processing','Invoice Processing','administration',7),
  ('Reporting','Reporting','administration',8),
  ('Data Recapitulation','Data Recapitulation','administration',9),
  ('SLO & NIDI Administration','SLO & NIDI Administration','administration',10),
  ('Microsoft Excel','Microsoft Excel','administration',11),
  ('Microsoft Word','Microsoft Word','administration',12),
  ('Google Sheets','Google Sheets','administration',13),
  ('Google Docs','Google Docs','administration',14),
  ('Data Management','Data Management','administration',15),
  ('Risk Management','Risk Management','administration',16),
  ('Customer Service','Customer Service','operational',1),
  ('Order Processing','Order Processing','operational',2),
  ('Production Machine Operation','Production Machine Operation','operational',3),
  ('Quality Control','Quality Control','operational',4),
  ('SOP & K3 Compliance','SOP & K3 Compliance','operational',5),
  ('React.js','React.js','technical',1),
  ('JavaScript','JavaScript','technical',2),
  ('Vite','Vite','technical',3),
  ('Tailwind CSS','Tailwind CSS','technical',4),
  ('Supabase','Supabase','technical',5),
  ('PostgreSQL','PostgreSQL','technical',6),
  ('REST API','REST API','technical',7),
  ('Git','Git','technical',8),
  ('GitHub','GitHub','technical',9),
  ('Vercel','Vercel','technical',10),
  ('Termux','Termux','technical',11),
  ('Web Development','Web Development','technical',12)
) as seed(
  name_id,
  name_en,
  category,
  sort_order
)
where lower(s.name_id) = lower(seed.name_id);

commit;
