"use client";

import { motion } from "framer-motion";
import { Code2, Search, Filter, Play, CheckCircle2, Star, Clock, Sparkles } from "lucide-react";

const problems = [
  { id: 1, title: "Trapping Rain Water", difficulty: "Hard", topic: "Two Pointers", status: "Solved", accuracy: "94%" },
  { id: 2, title: "Longest Substring Without Repeating Characters", difficulty: "Medium", topic: "Sliding Window", status: "Attempted", accuracy: "88%" },
  { id: 3, title: "Binary Tree Maximum Path Sum", difficulty: "Hard", topic: "Trees / DFS", status: "Todo", accuracy: "82%" },
  { id: 4, title: "Course Schedule II", difficulty: "Medium", topic: "Graph / Topological Sort", status: "Solved", accuracy: "91%" },
  { id: 5, title: "Merge K Sorted Lists", difficulty: "Hard", topic: "Heap / Divide & Conquer", status: "Todo", accuracy: "79%" },
];

export default function PracticePage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 bg-[#121215] border border-white/10 rounded-3xl shadow-xl">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold mb-2">
            <Sparkles className="w-3.5 h-3.5" /> 500+ Curated Placement Problems
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Coding Practice Studio</h1>
          <p className="text-xs sm:text-sm text-gray-400 mt-1">
            Master Data Structures & Algorithms with real company interview questions.
          </p>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-gray-500 absolute left-3.5 top-3.5" />
          <input
            type="text"
            placeholder="Search problem by name, tag, or company (e.g. Amazon, Dynamic Programming)..."
            className="w-full pl-10 pr-4 py-3 bg-[#121215] border border-white/10 rounded-2xl text-xs text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 transition-all"
          />
        </div>
        <button className="px-4 py-3 bg-[#121215] border border-white/10 rounded-2xl text-xs text-gray-300 hover:text-white hover:border-white/20 flex items-center gap-2 transition-all cursor-pointer">
          <Filter className="w-4 h-4 text-cyan-400" /> Filter Topics
        </button>
      </div>

      {/* Problem List Table */}
      <div className="bg-[#121215] border border-white/10 rounded-3xl p-4 sm:p-6 overflow-x-auto shadow-2xl">
        <table className="w-full text-left text-xs text-gray-300">
          <thead>
            <tr className="border-b border-white/10 text-gray-500 uppercase tracking-wider text-[10px]">
              <th className="pb-3 pl-2">Status</th>
              <th className="pb-3">Title</th>
              <th className="pb-3">Topic</th>
              <th className="pb-3">Difficulty</th>
              <th className="pb-3">Acceptance</th>
              <th className="pb-3 text-right pr-2">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {problems.map((problem) => (
              <tr key={problem.id} className="hover:bg-white/5 transition-colors group">
                <td className="py-4 pl-2">
                  {problem.status === "Solved" ? (
                    <CheckCircle2 className="w-4 h-4 text-green-400" />
                  ) : (
                    <Clock className="w-4 h-4 text-yellow-400" />
                  )}
                </td>
                <td className="py-4 font-semibold text-white group-hover:text-cyan-400 transition-colors">
                  {problem.title}
                </td>
                <td className="py-4 font-mono text-gray-400">{problem.topic}</td>
                <td className="py-4">
                  <span
                    className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                      problem.difficulty === "Hard"
                        ? "bg-red-500/10 text-red-400 border border-red-500/20"
                        : "bg-yellow-500/10 text-yellow-400 border border-yellow-500/20"
                    }`}
                  >
                    {problem.difficulty}
                  </span>
                </td>
                <td className="py-4 font-mono text-gray-400">{problem.accuracy}</td>
                <td className="py-4 text-right pr-2">
                  <button className="px-3 py-1.5 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 font-semibold text-xs transition-colors inline-flex items-center gap-1 cursor-pointer">
                    <Play className="w-3 h-3 fill-cyan-400" /> Solve
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
