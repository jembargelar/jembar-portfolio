import React, { useState, useEffect } from 'react';

const CAREER_JOURNEY = [
  {
    period: "2 TAHUN 6 BULAN",
    role: "Operator Mesin",
    company: "CV Sinar Soccer Industries",
    location: "Garut / Jawa Barat",
    desc: "Mengoperasikan mesin produksi, menjaga kualitas produk secara konsisten, dan melakukan perawatan dasar mesin.",
    type: "Operational Foundation"
  },
  {
    period: "6 BULAN",
    role: "Waiter",
    company: "Kedai Susu Murni 26",
    location: "Jawa Barat",
    desc: "Melayani pelanggan dengan ramah, menjaga kebersihan area kerja, dan berkoordinasi secara aktif dengan tim operasional.",
    type: "Service & Communication"
  },
  {
    period: "3 BULAN",
    role: "Operator Cutting Laser",
    company: "PT Garyman Indonesia",
    location: "Jawa Barat",
    desc: "Mengoperasikan mesin laser cutting, melakukan Quality Control (QC) hasil produksi, serta menjaga target produksi harian.",
    type: "Technical Precision & QC"
  },
  {
    period: "NOV 2025 - AGUSTUS 2026",
    role: "Admin Data Entry / Staf Administrasi",
    company: "PT Syahrendra Megawatt Indonesia",
    location: "Cianjur, Jawa Barat",
    desc: "Memproses & memverifikasi basis data permohonan SLO & NIDI, menerbitkan faktur (invoice), mengelola arsip sistematis, dan menyusun laporan operasional berkala.",
    type: "Administrative & Data Management"
  },
  {
    period: "2026 - SEKARANG",
    role: "Mahasiswa S1 Manajemen",
    company: "Universitas Terbuka",
    location: "Indonesia",
    desc: "Mengembangkan pemahaman strategis dalam manajemen operasional, bisnis, dan kepemimpinan secara mandiri sambil bekerja.",
    type: "Higher Education"
  }
];

const FEATURED_PROJECTS = [
  {
    title: "Verifikasi & Pengolahan Basis Data SLO & NIDI",
    category: "Electrical Administration",
    problem: "Volume permohonan Sertifikat Laik Operasi (SLO) & NIDI memerlukan verifikasi komprehensif agar tidak terjadi kesalahan berkas.",
    solution: "Menjalankan sistem verifikasi dokumen persyaratan pelanggan secara teliti dan menata tata kelola pengarsipan data secara akurat.",
    result: "Menjamin akurasi, kerapian penyimpanan basis data pelanggan, serta kelancaran proses layanan ketenagalistrikan.",
    tools: ["Data Verification", "Filing System", "Document Management", "Microsoft Excel"]
  },
  {
    title: "Penerbitan Invoice & Rekapitulasi Laporan Operasional",
    category: "Financial & Administrative Support",
    problem: "Pengolahan tagihan dan laporan administrasi harus disajikan tepat waktu dengan tingkat eror nol.",
    solution: "Menerbitkan faktur (invoice) pelanggan dan merekapitulasi data operasional berkala menggunakan Microsoft Excel.",
    result: "Proses penagihan berjalan transparan dan laporan administrasi dapat diakses secara real-time oleh manajemen.",
    tools: ["Invoice Processing", "Microsoft Excel", "Reporting", "Reconciliation"]
  }
];

export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="fixed inset-0 bg-[#0B0F19] flex items-center justify-center text-white font-sans">
        <div className="text-center space-y-3">
          <h2 className="text-lg sm:text-xl font-bold tracking-widest text-white font-mono uppercase">
            JEMBAR GELAR K. W.
          </h2>
          <p className="text-xs text-sky-400 font-mono animate-pulse">
            LOADING PORTFOLIO...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#0B0F19] text-white min-h-screen font-sans selection:bg-blue-600 selection:text-white relative antialiased">
      
      {/* HEADER / NAVIGATION */}
      <nav className="sticky top-0 z-50 backdrop-blur-md bg-[#0B0F19]/80 border-b border-white/10 px-4 sm:px-8 py-4">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <span className="font-bold tracking-tight text-xs sm:text-sm font-mono text-zinc-300">
            JEMBAR GELAR KUSUMAH WIBAWA
          </span>
          <a 
            href="https://wa.me/6285119779156" 
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-semibold px-4 py-2 rounded-full bg-blue-600 hover:bg-blue-500 text-white transition-all shadow-lg shadow-blue-600/20"
          >
            Hubungi via WA
          </a>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-4 sm:px-8 pt-8 pb-20 space-y-16">
        
        {/* HERO SECTION */}
        <section className="space-y-6 pt-4">
          <div className="inline-block">
            <span className="bg-blue-500/10 border border-blue-500/30 text-sky-400 px-3 py-1.5 rounded-full text-[11px] font-mono font-semibold tracking-wider uppercase">
              Administrative & Data Entry Specialist
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight text-white">
            Kedisiplinan Operasional.<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-blue-400 to-indigo-200">
              Akurasi Data & Efisiensi Administrasi.
            </span>
          </h1>

          <p className="text-zinc-400 text-sm sm:text-base leading-relaxed max-w-2xl font-normal">
            Pengalaman lebih dari 3 tahun di bidang administrasi, entri data, operasional, dan manufaktur. Terbiasa memverifikasi dokumen SLO/NIDI, menerbitkan invoice, dan mengelola rekapitulasi Microsoft Excel.
          </p>
        </section>

        {/* CAREER JOURNEY */}
        <section className="space-y-6">
          <div className="border-b border-white/10 pb-3">
            <h2 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-500"></span>
              Pengalaman Kerja Faktual
            </h2>
          </div>

          <div className="space-y-4">
            {CAREER_JOURNEY.map((item, idx) => (
              <div 
                key={idx} 
                className="p-5 rounded-xl bg-white/[0.03] border border-white/10 hover:border-blue-500/40 transition-all space-y-3"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <h3 className="text-base sm:text-lg font-bold text-white">{item.role}</h3>
                  <span className="self-start sm:self-auto text-[10px] font-mono font-semibold text-sky-400 bg-sky-500/10 border border-sky-500/20 px-2.5 py-1 rounded-md">
                    {item.period}
                  </span>
                </div>

                <div className="text-xs sm:text-sm font-medium text-blue-400">
                  {item.company} <span className="text-zinc-500">•</span> <span className="text-zinc-400">{item.location}</span>
                </div>

                <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed font-normal">
                  {item.desc}
                </p>

                <div className="pt-1">
                  <span className="text-[10px] font-mono text-zinc-400 bg-white/5 border border-white/10 px-2.5 py-1 rounded">
                    {item.type}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* FEATURED PROJECTS */}
        <section className="space-y-6">
          <div className="border-b border-white/10 pb-3">
            <h2 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-sky-400"></span>
              Studi Kasus & Implementasi
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {FEATURED_PROJECTS.map((proj, idx) => (
              <div 
                key={idx} 
                className="p-5 rounded-xl bg-white/[0.03] border border-white/10 hover:border-sky-500/40 transition-all flex flex-col justify-between space-y-4"
              >
                <div className="space-y-2.5">
                  <span className="text-[10px] font-mono font-bold text-sky-400 uppercase tracking-wider">
                    {proj.category}
                  </span>
                  <h3 className="text-base font-bold text-white leading-snug">{proj.title}</h3>
                  
                  <div className="space-y-2 text-xs text-zinc-400 pt-1">
                    <p><strong className="text-zinc-200">Problem:</strong> {proj.problem}</p>
                    <p><strong className="text-zinc-200">Solution:</strong> {proj.solution}</p>
                    <p className="text-sky-300"><strong className="text-white">Result:</strong> {proj.result}</p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-3 border-t border-white/5">
                  {proj.tools.map((t, tIdx) => (
                    <span key={tIdx} className="text-[10px] font-mono text-zinc-300 bg-white/5 px-2 py-0.5 rounded border border-white/5">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* FOOTER */}
        <footer className="border-t border-white/10 pt-8 text-center space-y-3">
          <h3 className="text-sm font-bold text-white">Jembar Gelar Kusumah Wibawa</h3>
          <p className="text-xs text-zinc-400 font-mono">
            jembargelar@gmail.com | 0851-1977-9156
          </p>
          <p className="text-[11px] text-zinc-500 italic pt-2">
            "Success is built quietly, one disciplined day at a time."
          </p>
        </footer>

      </main>
    </div>
  );
}

