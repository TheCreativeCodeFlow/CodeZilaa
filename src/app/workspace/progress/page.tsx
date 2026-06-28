"use client";

import { BarChart3, TrendingUp, Award, Target, Sparkles } from "lucide-react";

export default function ProgressPage() {
  return (
    <div className="space-y-6">
      <div className="p-6 bg-[#121215] border border-white/10 rounded-3xl shadow-xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold mb-2">
          <Sparkles className="w-3.5 h-3.5" /> Performance Intelligence
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Analytics & Progress Dashboard</h1>
        <p className="text-xs sm:text-sm text-gray-400 mt-1">
          Comprehensive metrics tracking your coding consistency, topic accuracy, and interview readiness.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-[#121215] border border-white/10 rounded-3xl p-6 shadow-xl space-y-2">
          <div className="text-xs text-gray-400 font-medium">Total Solved</div>
          <div className="text-3xl font-bold text-white font-mono">342</div>
          <div className="text-xs text-green-400 flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5" /> +28 this week
          </div>
        </div>

        <div className="bg-[#121215] border border-white/10 rounded-3xl p-6 shadow-xl space-y-2">
          <div className="text-xs text-gray-400 font-medium">Accuracy Rate</div>
          <div className="text-3xl font-bold text-cyan-400 font-mono">89.4%</div>
          <div className="text-xs text-gray-400">Based on 410 submissions</div>
        </div>

        <div className="bg-[#121215] border border-white/10 rounded-3xl p-6 shadow-xl space-y-2">
          <div className="text-xs text-gray-400 font-medium">Placement Score</div>
          <div className="text-3xl font-bold text-indigo-400 font-mono">94.8%</div>
          <div className="text-xs text-indigo-300 font-semibold">Top 2% among candidates</div>
        </div>
      </div>
    </div>
  );
}
