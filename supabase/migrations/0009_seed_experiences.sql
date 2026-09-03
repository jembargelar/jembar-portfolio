-- =========================================================
-- JEMBAR.DEV
-- EXPERIENCE SEED
-- Migration: 0009_seed_experiences
-- =========================================================

insert into public.experiences (
  company,
  role_id,
  role_en,
  period_id,
  period_en,
  description_id,
  description_en,
  highlights_id,
  highlights_en,
  tags,
  sort_order,
  is_active
)
select
  'PT Syahrendra Megawatt Indonesia',
  'Admin / Data Entry',
  'Admin / Data Entry',
  'November 2025 – Agustus 2026',
  'Nov 2025 – Aug 2026',
  'Mengelola pemrosesan administrasi SLO & NIDI, pencatatan operasional, validasi database pelanggan, dan pelaporan eksekutif.',
  'Managed SLO & NIDI administration, operational logging, customer database validation, and executive reporting.',
  array[
    'Mengelola administrasi instalasi tenaga listrik (SLO & NIDI).',
    'Verifikasi dokumen pelanggan, pembuatan invoice, dan database operasional.',
    'Penyusunan laporan operasional dan otomasi data dengan Microsoft Excel.'
  ],
  array[
    'Managed power installation administration (SLO & NIDI).',
    'Customer document verification, invoicing, and database management.',
    'Operational reporting and data automation using Microsoft Excel.'
  ],
  array[
    'SLO & NIDI',
    'Excel Advanced',
    'Document Control',
    'Operational Reporting'
  ],
  1,
  true
where not exists (
  select 1 from public.experiences
  where company = 'PT Syahrendra Megawatt Indonesia'
);

insert into public.experiences (
  company,
  role_id,
  role_en,
  period_id,
  period_en,
  description_id,
  description_en,
  highlights_id,
  highlights_en,
  tags,
  sort_order,
  is_active
)
select
  'PT Garyman Kreasi Indonesia',
  'Operator Cutting Laser',
  'Laser Cutting Operator',
  'Agustus 2025 – Oktober 2025',
  'Aug 2025 – Oct 2025',
  'Mengoperasikan mesin cutting laser sesuai SOP, mengatur parameter presisi material, serta melakukan kontrol kualitas (QC) dan perawatan berkala mesin.',
  'Operated laser cutting machinery according to SOPs, adjusted material precision parameters, and conducted quality control (QC) and maintenance.',
  array[
    'Mengoperasikan mesin cutting laser sesuai SOP perusahaan.',
    'Menyiapkan material dan mengatur parameter mesin sesuai spesifikasi.',
    'Melakukan pemeriksaan kualitas (QC) hasil pemotongan.',
    'Menjaga kebersihan area kerja dan perawatan ringan mesin.',
    'Berkolaborasi dengan tim produksi untuk mencapai target harian.'
  ],
  array[
    'Operated laser cutting machinery according to company SOPs.',
    'Prepared materials and adjusted machine parameters to specification.',
    'Conducted Quality Control (QC) inspections on cut results.',
    'Maintained work area cleanliness and light machine maintenance.',
    'Collaborated with production team to achieve daily targets.'
  ],
  array[
    'Laser Cutting',
    'Quality Control',
    'Preventive Maintenance',
    'SOP & K3'
  ],
  2,
  true
where not exists (
  select 1 from public.experiences
  where company = 'PT Garyman Kreasi Indonesia'
);

insert into public.experiences (
  company,
  role_id,
  role_en,
  period_id,
  period_en,
  description_id,
  description_en,
  highlights_id,
  highlights_en,
  tags,
  sort_order,
  is_active
)
select
  'Kedai Susu Murni 26',
  'Waiter & Kasir',
  'Waiter & Cashier',
  'Februari 2025 – Juli 2025',
  'Feb 2025 – Jul 2025',
  'Memberikan pelayanan responsif kepada pelanggan, mengelola transaksi kasir (POS), dan menjaga kebersihan area operasional.',
  'Provided responsive customer service, managed POS cashier transactions, and maintained operational area cleanliness.',
  array[
    'Mengelola transaksi kasir (POS) dan memproses pesanan.',
    'Menjaga kebersihan area operasional dan pelayanan pelanggan.'
  ],
  array[
    'Managed POS cashier transactions and processed orders.',
    'Maintained operational cleanliness and customer service.'
  ],
  array[
    'POS Cashier',
    'Customer Service',
    'Order Processing'
  ],
  3,
  true
where not exists (
  select 1 from public.experiences
  where company = 'Kedai Susu Murni 26'
);

insert into public.experiences (
  company,
  role_id,
  role_en,
  period_id,
  period_en,
  description_id,
  description_en,
  highlights_id,
  highlights_en,
  tags,
  sort_order,
  is_active
)
select
  'UD Sinar Soccer Industries',
  'Operator Mesin Produksi',
  'Production Machine Operator',
  'Juli 2022 – Desember 2024',
  'Jul 2022 – Dec 2024',
  'Mengoperasikan mesin produksi sesuai SOP, mengawasi alur manufaktur, melakukan pengecekan kualitas bertahap, dan menjaga standar K3 serta target harian.',
  'Operated production machinery according to SOPs, monitored manufacturing flow, conducted quality checks, and maintained K3 safety standards.',
  array[
    'Mengoperasikan mesin produksi sesuai SOP perusahaan.',
    'Menyiapkan bahan baku dan memastikan proses produksi lancar.',
    'Melakukan pengecekan kualitas produk secara bertahap.',
    'Melakukan perawatan ringan dan menjaga kebersihan mesin.',
    'Memastikan target harian tercapai sesuai standar K3.',
    'Bekerja sama dengan tim untuk meningkatkan efisiensi kerja.'
  ],
  array[
    'Operated production machinery according to company SOPs.',
    'Prepared raw materials and ensured smooth production flow.',
    'Conducted step-by-step product quality inspections.',
    'Performed routine light maintenance and machine cleaning.',
    'Ensured daily targets were met while adhering to K3 standards.',
    'Collaborated with team to improve workflow efficiency.'
  ],
  array[
    'Machine Operation',
    'Quality Control',
    'Preventive Maintenance',
    'SOP & K3 Compliance'
  ],
  4,
  true
where not exists (
  select 1 from public.experiences
  where company = 'UD Sinar Soccer Industries'
);
