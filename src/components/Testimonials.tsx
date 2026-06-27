"use client";

import { motion } from "framer-motion";
import { Quote, Star } from "lucide-react";

const testimonials = [
  {
    name: "Aarav Sharma",
    college: "IIT Bombay '25",
    company: "Software Engineer @ Google",
    quote: "The interactive stack and memory visualizer completely changed how I approach dynamic programming. I cleared Google's technical rounds on my first attempt.",
    avatarBg: "from-cyan-500 to-blue-600",
    initials: "AS",
  },
  {
    name: "Priya Nair",
    college: "BITS Pilani '24",
    company: "SDE-1 @ Amazon",
    quote: "Unlike LeetCode where I just memorized patterns, CodeZilaa helped me understand what happens inside RAM during execution. Indispensable tool!",
    avatarBg: "from-indigo-500 to-purple-600",
    initials: "PN",
  },
  {
    name: "Rohan Verma",
    college: "NIT Trichy '25",
    company: "Backend Engineer @ Atlassian",
    quote: "The structured roadmap from basic syntax to advanced graph algorithms saved me months of fragmented studying. Highly recommended for placements.",
    avatarBg: "from-emerald-500 to-teal-600",
    initials: "RV",
  },
];

export default function Testimonials() {
  return (
    <section className="py-24 relative z-10 bg-[#0d0d0d] border-y border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <h2 className="text-xs font-semibold text-cyan-400 uppercase tracking-widest font-mono">
            Student Proof
          </h2>
          <p className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            From Engineering Classrooms to Tier-1 Tech.
          </p>
          <p className="text-gray-400 text-base sm:text-lg">
            See how CodeZilaa alumni cracked high-paying technical offers at leading technology companies.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((item, idx) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="glass-panel p-8 rounded-2xl border border-white/10 flex flex-col justify-between relative"
            >
              <Quote className="w-8 h-8 text-cyan-500/20 absolute top-6 right-6" />
              
              <div className="space-y-4">
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
                <p className="text-gray-300 text-sm leading-relaxed italic">
                  "{item.quote}"
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-white/5 flex items-center gap-4">
                <div className={`w-11 h-11 rounded-full bg-gradient-to-tr ${item.avatarBg} flex items-center justify-center text-white font-bold text-sm shadow-md`}>
                  {item.initials}
                </div>
                <div>
                  <h3 className="text-white font-semibold text-sm">{item.name}</h3>
                  <p className="text-xs text-gray-400">{item.college}</p>
                  <span className="inline-block mt-1 text-[11px] font-medium font-mono text-cyan-400 bg-cyan-950/40 px-2 py-0.5 rounded border border-cyan-500/20">
                    {item.company}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
