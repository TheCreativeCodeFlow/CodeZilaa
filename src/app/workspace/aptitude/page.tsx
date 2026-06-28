"use client";

import { BookOpen, CheckCircle2, Play, Sparkles } from "lucide-react";

export default function AptitudePage() {
  const categories = [
    { title: "Quantitative Aptitude", modules: "14 Modules", solved: "85/120" },
    { title: "Logical Reasoning", modules: "10 Modules", solved: "92/100" },
    { title: "Verbal Ability & English", modules: "8 Modules", solved: "60/80" },
    { title: "Core CS Fundamentals (OS, DBMS, CN)", modules: "12 Modules", solved: "110/150" },
  ];

  return (
    <div className="space-y-6">
      <div className="p-6 bg-[#121215] border border-white/10 rounded-3xl shadow-xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-500/10 border border-purple-500/20 text-pink-400 text-xs font-semibold mb-2">
          <Sparkles className="w-3.5 h-3.5" /> Company Screening Test Prep
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Aptitude & Core CS Prep</h1>
        <p className="text-xs sm:text-sm text-gray-400 mt-1">
          Master quantitative reasoning, logical puzzles, OS, DBMS, and Networking for online assessments.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {categories.map((cat, idx) => (
          <div key={idx} className="bg-[#121215] border border-white/10 rounded-3xl p-6 shadow-xl space-y-4 hover:border-pink-500/30 transition-all">
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-xl bg-pink-500/10 border border-pink-500/20 text-pink-400 flex items-center justify-center">
                <BookOpen className="w-5 h-5" />
              </div>
              <span className="text-xs font-mono text-cyan-400">{cat.solved} Solved</span>
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">{cat.title}</h3>
              <p className="text-xs text-gray-400 mt-1">{cat.modules}</p>
            </div>
            <button className="w-full py-2.5 rounded-xl bg-white/5 hover:bg-pink-500/20 hover:text-pink-300 text-xs font-semibold text-gray-300 transition-colors cursor-pointer">
              Start Practice Quiz
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
