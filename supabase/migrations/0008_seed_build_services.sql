-- =========================================================
-- COREÉATERY / JEMBAR.DEV
-- Seed: What I Build
-- Migration: 0008_seed_build_services
-- =========================================================

insert into public.build_services (
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
  'Website',
  'Websites',
  'Website modern, responsif, dan siap digunakan untuk kebutuhan personal maupun bisnis.',
  'Modern, responsive websites built for personal and business needs.',
  'Globe2',
  1,
  true
),
(
  'Sistem Bisnis',
  'Business Systems',
  'Sistem digital untuk membantu operasional, pemesanan, administrasi, dan pengelolaan bisnis.',
  'Digital systems that support operations, ordering, administration, and business management.',
  'LayoutDashboard',
  2,
  true
),
(
  'Solusi Data',
  'Data Solutions',
  'Pengolahan, validasi, rekapitulasi, dan otomatisasi data untuk membantu pengambilan keputusan.',
  'Data processing, validation, reporting, and automation to support better decisions.',
  'Database',
  3,
  true
),
(
  'Digital UI',
  'Digital UI',
  'Interface modern, responsif, dan intuitif dengan fokus pada pengalaman pengguna.',
  'Modern, responsive, and intuitive interfaces focused on user experience.',
  'PanelsTopLeft',
  4,
  true
);
