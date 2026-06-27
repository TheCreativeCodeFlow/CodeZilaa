"use client";

import { motion } from "framer-motion";
import { Terminal, Binary, GitFork, Briefcase, Trophy, ChevronRight } from "lucide-react";

const steps = [
  {
    step: "01",
    title: "Programming Fundamentals",
    desc: "Syntax mastery in C++, Java, and Python with pointers, memory, and OOP principles.",
    icon: Terminal,
    color: "text-cyan-400",
  },
  {
    step: "02",
    title: "Data Structures",
    desc: "Arrays, Linked Lists, Stacks, Queues, Trees, Graphs, and Hash Maps with visual memory layouts.",
    icon: Binary,
    color: "text-indigo-400",
  },
  {
    step: "03",
    title: "Advanced Algorithms",
    desc: "Dynamic Programming, Greedy strategies, Backtracking, Divide & Conquer techniques.",
    icon: GitFork,
    color: "text-blue-400",
  },
  {
    step: "04",
    title: "Technical Interview Prep",
    desc: "Mock coding rounds, system design primers, space-time complexity analysis.",
    icon: Briefcase,
    color: "text-purple-400",
  },
  {
    step: "05",
    title: "Placement Ready",
    desc: "Verified student badges, referral networks, and top tech campus drive success.",
    icon: Trophy,
    color: "text-amber-400",
  },
];

export default function LearningJourney() {
  return (
    <section id="roadmap" className="py-24 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-20">
          <h2 className="text-xs font-semibold text-cyan-400 uppercase tracking-widest font-mono">
            Structured Curriculum
          </h2>
          <p className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Your Architectural Path to Success.
          </p>
          <p className="text-gray-400 text-base sm:text-lg">
            A battle-tested 5-stage roadmap designed to convert beginner coders into engineering leaders.
          </p>
        </div>

        {/* Journey Timeline */}
        <div className="relative">
          {/* Connecting Line */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-cyan-500/20 via-indigo-500/40 to-amber-500/20 -translate-y-1/2 z-0" />

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 relative z-10">
            {steps.map((item, idx) => {
              const IconComp = item.icon;
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="glass-panel p-6 rounded-2xl border border-white/10 flex flex-col justify-between hover:border-cyan-500/30 transition-all group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <span className="text-xs font-mono font-bold text-gray-500 group-hover:text-cyan-400 transition-colors">
                        STAGE {item.step}
                      </span>
                      <div className="w-10 h-10 rounded-xl bg-[#141414] border border-white/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <IconComp className={`w-5 h-5 ${item.color}`} />
                      </div>
                    </div>

                    <h3 className="text-lg font-semibold text-white mb-2 leading-snug">
                      {item.title}
                    </h3>
                    <p className="text-xs text-gray-400 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>

                  <div className="pt-6 mt-6 border-t border-white/5 flex items-center gap-1 text-xs font-medium text-cyan-400 group-hover:translate-x-1 transition-transform">
                    <span>Explore Track</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
