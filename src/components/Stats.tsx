"use client";

import { motion } from "framer-motion";

const stats = [
  { value: "50,000+", label: "Students Trained", desc: "Across 120+ tier-1 & tier-2 engineering colleges." },
  { value: "1,200+", label: "Questions Curated", desc: "Categorized by topic, company tag, and difficulty." },
  { value: "2.5M+", label: "Code Visualizations", desc: "Interactive memory profiling steps executed." },
  { value: "500,000+", label: "Hours Practiced", desc: "Accumulated by active students on the platform." },
  { value: "94.2%", label: "Placement Success", desc: "Verified interview clearance in top tech firms." },
];

export default function Stats() {
  return (
    <section className="py-20 relative z-10 border-y border-white/5 bg-[#0d0d0d]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-8">
          {stats.map((item, idx) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              className="space-y-2 text-center sm:text-left"
            >
              <div className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white font-mono tracking-tight accent-gradient-text">
                {item.value}
              </div>
              <h3 className="text-sm font-semibold text-gray-200 font-sans">{item.label}</h3>
              <p className="text-xs text-gray-500 leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
