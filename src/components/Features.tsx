"use client";

import { motion } from "framer-motion";
import {
  Code,
  Terminal,
  Eye,
  Brain,
  Compass,
  TrendingUp,
  LayoutDashboard,
  UserCheck,
} from "lucide-react";

const features = [
  {
    icon: Code,
    title: "Coding Practice",
    description: "Curated problem sets targeted for FAANG & top tech technical interviews with test case evaluation.",
    color: "text-cyan-400",
    glow: "group-hover:shadow-cyan-500/10",
  },
  {
    icon: Terminal,
    title: "Multi-language Compiler",
    description: "Ultra-fast execution engine supporting C++, Java, Python, and JavaScript with memory profiling.",
    color: "text-indigo-400",
    glow: "group-hover:shadow-indigo-500/10",
  },
  {
    icon: Eye,
    title: "Interactive Visualization",
    description: "Watch pointers, recursion trees, stack frames, and array operations update dynamically line by line.",
    color: "text-blue-400",
    glow: "group-hover:shadow-blue-500/10",
  },
  {
    icon: Brain,
    title: "Aptitude Preparation",
    description: "Quantitative, logical reasoning, and verbal modules designed for university campus placements.",
    color: "text-purple-400",
    glow: "group-hover:shadow-purple-500/10",
  },
  {
    icon: Compass,
    title: "Learning Roadmaps",
    description: "Step-by-step structured paths taking you from syntax fundamentals to advanced algorithmic mastery.",
    color: "text-emerald-400",
    glow: "group-hover:shadow-emerald-500/10",
  },
  {
    icon: TrendingUp,
    title: "Progress Tracking",
    description: "Detailed analytics on accuracy, consistency streaks, speed benchmarks, and weakness diagnosis.",
    color: "text-yellow-400",
    glow: "group-hover:shadow-yellow-500/10",
  },
  {
    icon: LayoutDashboard,
    title: "Student Dashboard",
    description: "Centralized hub organizing daily goals, ongoing contests, saved solutions, and company-wise prep.",
    color: "text-rose-400",
    glow: "group-hover:shadow-rose-500/10",
  },
  {
    icon: UserCheck,
    title: "Profile & Admin Panel",
    description: "Comprehensive verified portfolio for students and analytics portals for college placement officers.",
    color: "text-cyan-300",
    glow: "group-hover:shadow-cyan-400/10",
  },
];

export default function Features() {
  return (
    <section id="features" className="py-24 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <h2 className="text-xs font-semibold text-cyan-400 uppercase tracking-widest font-mono">
            Platform Capabilities
          </h2>
          <p className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Engineered for Placement Excellence.
          </p>
          <p className="text-gray-400 text-base sm:text-lg leading-relaxed">
            Every tool on CodeZilaa is built from the ground up to cultivate deep computational intuition and interview confidence.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feat, idx) => {
            const IconComponent = feat.icon;
            return (
              <motion.div
                key={feat.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.06 }}
                className={`group glass-panel p-6 rounded-2xl border border-white/5 transition-all duration-300 hover:-translate-y-1 hover:border-white/20 hover:bg-[#141414] ${feat.glow}`}
              >
                <div className="w-12 h-12 rounded-xl bg-[#181818] border border-white/10 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                  <IconComponent className={`w-6 h-6 ${feat.color}`} />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-cyan-300 transition-colors">
                  {feat.title}
                </h3>
                <p className="text-sm text-gray-400 leading-relaxed font-normal">
                  {feat.description}
                </p>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
