"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Zap, Target, Flame, LineChart, Award } from "lucide-react";

const benefits = [
  {
    icon: CheckCircle2,
    title: "Understand Every Line of Code",
    desc: "Never copy-paste solutions blindly. Inspect variable mutation and call stacks in real-time.",
  },
  {
    icon: Zap,
    title: "Build Stronger Algorithmic Logic",
    desc: "Develop deep mental models for pointers, recursion, and dynamic programming state transitions.",
  },
  {
    icon: Target,
    title: "Learn Visually, Retain Longer",
    desc: "Visual learners absorb concepts 4x faster. See pointer movement and memory allocations live.",
  },
  {
    icon: Flame,
    title: "Stay Consistent with Streaks",
    desc: "Gamified learning daily challenges designed to keep your problem-solving momentum peak.",
  },
  {
    icon: LineChart,
    title: "Track Precise Improvement",
    desc: "Detailed diagnostic reports spotlighting speed bottlenecks, runtime bugs, and accuracy growth.",
  },
  {
    icon: Award,
    title: "Become Confidently Interview-Ready",
    desc: "Practice under simulated pressure with real company tags and interview time limits.",
  },
];

export default function WhyCodeZilaa() {
  return (
    <section id="why-us" className="py-24 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <h2 className="text-xs font-semibold text-cyan-400 uppercase tracking-widest font-mono">
            Pedagogical Philosophy
          </h2>
          <p className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Why Engineering Students Choose CodeZilaa.
          </p>
          <p className="text-gray-400 text-base sm:text-lg">
            Traditional platforms reward memorization. CodeZilaa builds architectural comprehension.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                className="glass-panel p-8 rounded-2xl border border-white/5 hover:border-cyan-500/20 transition-all flex items-start gap-4"
              >
                <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center shrink-0">
                  <Icon className="w-6 h-6 text-cyan-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-400 leading-relaxed font-normal">{item.desc}</p>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
