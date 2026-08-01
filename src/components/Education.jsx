import React from "react";
import { educations, education } from "../data/portfolio";

export default function Education() {
  const dataPendidikan = educations || education || [];

  return (
    <section id="education" className="py-10">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-emerald-400">
          Riwayat Pendidikan
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {dataPendidikan.map((edu, index) => (
            <div 
              key={index} 
              className="p-6 bg-slate-800/40 rounded-xl border border-slate-700/50 shadow-lg hover:border-emerald-500/50 transition-all"
            >
              <h3 className="text-xl font-semibold text-white mb-1">
                {edu.institution || edu.school}
              </h3>
              <div className="text-emerald-300 font-medium mb-3">
                {edu.degree || edu.major}
              </div>
              <span className="inline-block px-3 py-1 bg-slate-700/60 text-slate-300 text-sm rounded-md border border-slate-600/50">
                {edu.period || edu.year}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

