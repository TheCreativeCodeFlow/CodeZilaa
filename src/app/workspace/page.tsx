"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Sparkles,
  ArrowRight,
  Play,
  CheckCircle2,
  Clock,
  Flame,
  Target,
  BarChart3,
  BookOpen,
  Cpu,
  Terminal,
  Trophy,
  Activity,
  MapPin,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function WorkspaceHomePage() {
  const { user } = useAuth();

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
  };

  const stats = [
    { label: "Questions Solved", value: "342", change: "+14 this week", icon: CheckCircle2, color: "text-cyan-400" },
    { label: "Current Streak", value: "12 Days 🔥", change: "Personal Best!", icon: Flame, color: "text-amber-400" },
    { label: "Hours Practiced", value: "84.5 hrs", change: "12.2 hrs this week", icon: Clock, color: "text-indigo-400" },
    { label: "Interview Readiness", value: "94.8%", change: "Top 2% Candidate", icon: Target, color: "text-green-400" },
    { label: "Concept Mastery", value: "24/28 Topics", change: "DP & Graphs active", icon: BookOpen, color: "text-purple-400" },
    { label: "Accuracy Rate", value: "89.4%", change: "+2.1% improvement", icon: BarChart3, color: "text-blue-400" },
  ];

  return (
    <div className="space-y-8 select-none">
      {/* Welcome Header */}
      <div className="relative overflow-hidden bg-gradient-to-r from-cyan-500/10 via-[#121215] to-indigo-500/10 border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5" /> Placement Workstation Active
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            {getGreeting()}, {user?.name || "Developer"} 👋
          </h1>
          <p className="text-sm sm:text-base text-gray-300 mt-2 max-w-2xl leading-relaxed">
            Continue your placement preparation. Resume where you left off and complete today&apos;s coding targets.
          </p>
        </div>
      </div>

      {/* Continue Learning Feature Banner */}
      <div className="bg-[#121215] border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
        <div className="space-y-3 max-w-xl">
          <div className="flex items-center gap-3">
            <span className="px-2.5 py-0.5 rounded-full bg-red-500/10 text-red-400 text-[10px] font-bold border border-red-500/20">
              Hard
            </span>
            <span className="text-xs font-mono text-cyan-400">Dynamic Programming</span>
            <span className="text-xs text-gray-500">• Est. 25 mins remaining</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            Trapping Rain Water (2D Array Optimization)
          </h3>
          <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">
            You completed 2 of 3 test cases. Resume line-by-line step visualization to optimize your auxiliary space from O(N) to O(1).
          </p>
          <div className="w-full bg-gray-800 h-2 rounded-full overflow-hidden">
            <div className="bg-gradient-to-r from-cyan-400 to-indigo-500 h-full w-[65%]" />
          </div>
        </div>

        <Link
          href="/visualizer"
          className="px-6 py-3.5 rounded-2xl bg-white text-black hover:bg-gray-100 font-bold text-xs sm:text-sm flex items-center gap-2 shadow-xl shadow-white/10 hover:shadow-cyan-500/20 transition-all active:scale-95 shrink-0 cursor-pointer"
        >
          <Play className="w-4 h-4 fill-black" />
          <span>Resume Execution Visualizer</span>
        </Link>
      </div>

      {/* Statistic Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div
              key={idx}
              className="bg-[#121215] border border-white/10 hover:border-cyan-500/30 rounded-3xl p-5 shadow-xl transition-all group"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-semibold text-gray-400">{stat.label}</span>
                <div className="p-2 rounded-xl bg-white/5 border border-white/5 group-hover:border-cyan-500/30 transition-colors">
                  <Icon className={`w-4 h-4 ${stat.color}`} />
                </div>
              </div>
              <div className="text-2xl sm:text-3xl font-bold text-white font-mono">{stat.value}</div>
              <div className="text-xs text-gray-500 mt-1">{stat.change}</div>
            </div>
          );
        })}
      </div>

      {/* Two Column Section: Roadmap Timeline & Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Roadmap Preview */}
        <div className="lg:col-span-7 bg-[#121215] border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <MapPin className="w-4 h-4 text-cyan-400" /> Placement Roadmap Stage
            </h3>
            <Link href="/workspace/roadmaps" className="text-xs text-cyan-400 hover:underline font-medium">
              View Full Roadmap →
            </Link>
          </div>

          <div className="relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-white/10">
            <div className="relative">
              <div className="absolute -left-6 top-1 w-5 h-5 rounded-full bg-green-500/20 border-2 border-green-400 flex items-center justify-center text-[10px] text-green-400">
                ✓
              </div>
              <h4 className="text-sm font-bold text-white">Stage 1: Core Data Structures</h4>
              <p className="text-xs text-gray-400 mt-0.5">Arrays, Strings, Linked Lists, Stacks & Queues (100% Complete)</p>
            </div>

            <div className="relative">
              <div className="absolute -left-6 top-1 w-5 h-5 rounded-full bg-cyan-500 border-2 border-cyan-300 shadow-[0_0_10px_#00f2fe] animate-pulse" />
              <h4 className="text-sm font-bold text-cyan-400">Stage 2: Advanced Algorithms & DP</h4>
              <p className="text-xs text-gray-300 mt-0.5">Dynamic Programming, Graph Traversals, Segment Trees (65% Complete)</p>
            </div>

            <div className="relative opacity-50">
              <div className="absolute -left-6 top-1 w-5 h-5 rounded-full bg-gray-800 border-2 border-gray-600" />
              <h4 className="text-sm font-bold text-gray-400">Stage 3: AI Mock Technical Interviews</h4>
              <p className="text-xs text-gray-500 mt-0.5">System Design & Company-specific Question Sets</p>
            </div>
          </div>
        </div>

        {/* Right Column: Recent Activity Feed */}
        <div className="lg:col-span-5 bg-[#121215] border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Activity className="w-4 h-4 text-indigo-400" /> Recent Platform Activity
          </h3>

          <div className="space-y-4 text-xs">
            <div className="flex items-start gap-3 p-3 rounded-2xl bg-white/5 border border-white/5">
              <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400 shrink-0">
                <Terminal className="w-4 h-4" />
              </div>
              <div>
                <div className="font-semibold text-white">Compiled C++ Solution</div>
                <div className="text-gray-400 mt-0.5">Binary Search Tree Validation • 45m ago</div>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 rounded-2xl bg-white/5 border border-white/5">
              <div className="p-2 rounded-xl bg-purple-500/10 text-purple-400 shrink-0">
                <Cpu className="w-4 h-4" />
              </div>
              <div>
                <div className="font-semibold text-white">Visualized Memory Tree</div>
                <div className="text-gray-400 mt-0.5">Merge Sort Recursive Stack • 3h ago</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
