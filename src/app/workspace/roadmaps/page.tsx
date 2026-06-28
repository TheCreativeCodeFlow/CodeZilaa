"use client";

import { MapPin, CheckCircle2, Circle, ArrowRight, Sparkles } from "lucide-react";

const stages = [
  { step: 1, name: "Programming Fundamentals", status: "Completed", desc: "Syntax, Loops, Functions, Pointers, and Time Complexity Analysis" },
  { step: 2, name: "Data Structures Mastery", status: "Completed", desc: "Arrays, Linked Lists, Stacks, Queues, Hash Tables, and Trees" },
  { step: 3, name: "Algorithms Deep Dive", status: "In Progress", desc: "Sorting, Binary Search, Graph Traversals (BFS/DFS), and Backtracking" },
  { step: 4, name: "Advanced DSA & Dynamic Programming", status: "Upcoming", desc: "2D DP, Segment Trees, Disjoint Set Union, and String Matching" },
  { step: 5, name: "Placement Mock Interviews", status: "Locked", desc: "System Design basics, Behavioral rounds, and AI Mock Technical Interviews" },
];

export default function RoadmapsPage() {
  return (
    <div className="space-y-6">
      <div className="p-6 bg-[#121215] border border-white/10 rounded-3xl shadow-xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 text-xs font-semibold mb-2">
          <Sparkles className="w-3.5 h-3.5" /> Structured Placement Curriculum
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Placement Learning Roadmaps</h1>
        <p className="text-xs sm:text-sm text-gray-400 mt-1">
          Step-by-step roadmap tailored for product company campus placements and off-campus roles.
        </p>
      </div>

      <div className="bg-[#121215] border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
        {stages.map((stage) => (
          <div key={stage.step} className="flex items-start gap-4 p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-cyan-500/30 transition-all">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 font-bold text-sm ${
              stage.status === "Completed" ? "bg-green-500/20 text-green-400 border border-green-500/30" :
              stage.status === "In Progress" ? "bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 animate-pulse" :
              "bg-gray-800 text-gray-500"
            }`}>
              {stage.step}
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-white">{stage.name}</h3>
                <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${
                  stage.status === "Completed" ? "bg-green-500/10 text-green-400" :
                  stage.status === "In Progress" ? "bg-cyan-500/10 text-cyan-400" :
                  "bg-gray-800 text-gray-400"
                }`}>
                  {stage.status}
                </span>
              </div>
              <p className="text-xs text-gray-400 mt-1">{stage.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
