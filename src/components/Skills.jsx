import React from "react";
import { skillCategories } from "../data/portfolio";

export default function Skills() {
  const categories = skillCategories || [];

  return (
    <section id="skills" className="skills-section py-10">
      <div className="container mx-auto px-4">
        <h2 className="section-title text-3xl font-bold mb-2 text-emerald-400">
          Keahlian & Kompetensi
        </h2>
        <p className="section-subtitle text-slate-400 mb-8">
          Ringkasan kualifikasi teknis, administrasi, dan keahlian personal
        </p>

        <div className="skills-grid grid grid-cols-1 md:grid-cols-2 gap-6">
          {categories.map((group, index) => (
            <div key={index} className="skill-card p-6 bg-slate-800/40 rounded-xl border border-slate-700/50">
              <h3 className="skill-category-title text-xl font-semibold mb-4 text-emerald-300">
                {group.category}
              </h3>
              <div className="badge-container flex flex-wrap gap-2">
                {group.skills && group.skills.map((skill, itemIndex) => (
                  <span key={itemIndex} className="skill-badge px-3 py-1 bg-slate-700/60 text-slate-200 text-sm rounded-md border border-slate-600/50">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
