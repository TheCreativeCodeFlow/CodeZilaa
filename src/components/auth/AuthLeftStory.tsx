"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Code2,
  CheckCircle,
  Cpu,
  Sparkles,
  BarChart3,
  Terminal,
  Play,
  Layers,
  Zap,
} from "lucide-react";

export default function AuthLeftStory() {
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY, currentTarget } = e;
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    const x = (clientX - left - width / 2) / 25;
    const y = (clientY - top - height / 2) / 25;
    setMouseOffset({ x, y });
  };

  const trustBadges = [
    "Interactive Code Visualization",
    "Multi-language Compiler",
    "Interview Preparation",
    "Learning Roadmaps",
    "Progress Tracking",
  ];

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setMouseOffset({ x: 0, y: 0 })}
      className="relative flex flex-col justify-between h-full p-8 lg:p-12 xl:p-16 overflow-hidden select-none"
    >
      {/* Background ambient lighting effects */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-cyan-500/15 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-indigo-600/15 rounded-full blur-[140px] pointer-events-none" />

      {/* Floating background particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-30">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, -40, 0],
              opacity: [0.3, 0.8, 0.3],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 4 + i,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.7,
            }}
            className="absolute w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_10px_#00f2fe]"
            style={{
              top: `${15 + i * 15}%`,
              left: `${10 + (i * 17) % 80}%`,
            }}
          />
        ))}
      </div>

      {/* Top Section: Brand Header */}
      <div className="relative z-10">
        <a href="/" className="inline-flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-cyan-500 to-indigo-600 p-0.5 shadow-lg shadow-cyan-500/30 group-hover:scale-105 transition-transform duration-300">
            <div className="w-full h-full bg-[#090909] rounded-[14px] flex items-center justify-center">
              <Code2 className="w-5 h-5 text-cyan-400" />
            </div>
          </div>
          <div>
            <span className="font-bold text-xl tracking-tight text-white flex items-center gap-1">
              Code<span className="text-cyan-400">Zilaa</span>
            </span>
            <p className="text-[11px] font-medium tracking-wider text-gray-400 uppercase">
              Practice. Understand. Improve.
            </p>
          </div>
        </a>
      </div>

      {/* Middle Section: Visual Storytelling Floating Mockups */}
      <div className="relative z-10 my-8 lg:my-10 flex-1 flex flex-col justify-center">
        <motion.div
          style={{
            transform: `perspective(1000px) rotateX(${-mouseOffset.y}deg) rotateY(${mouseOffset.x}deg)`,
          }}
          transition={{ type: "spring", stiffness: 100, damping: 20 }}
          className="relative w-full max-w-lg mx-auto"
        >
          {/* Main Floating Code Editor Card */}
          <div className="relative bg-[#121215]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-4 shadow-2xl shadow-black/80">
            {/* Header bar */}
            <div className="flex items-center justify-between border-b border-white/5 pb-3 mb-3">
              <div className="flex items-center gap-2">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <div className="w-3 h-3 rounded-full bg-green-500/80" />
                </div>
                <span className="text-xs font-mono text-gray-400 ml-2 flex items-center gap-1.5">
                  <Terminal className="w-3.5 h-3.5 text-cyan-400" /> binary_search.cpp
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded-full bg-cyan-500/10 text-[10px] font-semibold text-cyan-400 border border-cyan-500/20 flex items-center gap-1">
                  <Play className="w-2.5 h-2.5 fill-cyan-400" /> Executing
                </span>
              </div>
            </div>

            {/* Code lines */}
            <div className="font-mono text-xs space-y-1 text-gray-300 leading-relaxed">
              <div className="flex items-center gap-3 text-gray-500">
                <span className="w-4 text-right">1</span>
                <span className="text-purple-400">int</span> <span className="text-blue-400">binarySearch</span>(vector&lt;<span className="text-purple-400">int</span>&gt;& arr, <span className="text-purple-400">int</span> target) &#123;
              </div>
              <div className="flex items-center gap-3">
                <span className="w-4 text-right text-gray-500">2</span>
                <span className="pl-4 text-gray-400"><span className="text-purple-400">int</span> low = 0, high = arr.size() - 1;</span>
              </div>
              <div className="flex items-center gap-3 bg-cyan-500/10 -mx-4 px-4 py-0.5 rounded border-l-2 border-cyan-400">
                <span className="w-4 text-right text-cyan-400 font-bold">3</span>
                <span className="pl-4 text-white"><span className="text-purple-400">while</span> (low &lt;= high) &#123; <span className="text-cyan-400 text-[11px] font-sans italic ml-2">← Step 4: mid = 12</span></span>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-4 text-right text-gray-500">4</span>
                <span className="pl-8 text-gray-400"><span className="text-purple-400">int</span> mid = low + (high - low) / 2;</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-4 text-right text-gray-500">5</span>
                <span className="pl-8 text-gray-400"><span className="text-purple-400">if</span> (arr[mid] == target) <span className="text-purple-400">return</span> mid;</span>
              </div>
            </div>
          </div>

          {/* Floating Card 2: Memory & Execution Visualization Overlay */}
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -bottom-8 -right-4 w-64 bg-[#18181c]/90 backdrop-blur-xl border border-cyan-500/30 rounded-xl p-3.5 shadow-2xl shadow-cyan-500/20"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-white flex items-center gap-1.5">
                <Cpu className="w-3.5 h-3.5 text-cyan-400" /> Array Memory Tree
              </span>
              <span className="text-[10px] text-green-400 font-mono">O(log N)</span>
            </div>
            <div className="grid grid-cols-5 gap-1 pt-1">
              {[2, 5, 8, 12, 16].map((num, i) => (
                <div
                  key={i}
                  className={`py-1 text-center font-mono text-xs rounded border ${
                    i === 3
                      ? "bg-cyan-500 text-black font-bold border-cyan-400 shadow-sm shadow-cyan-400/50"
                      : "bg-white/5 text-gray-400 border-white/5"
                  }`}
                >
                  {num}
                </div>
              ))}
            </div>
          </motion.div>

          {/* Floating Card 3: Placement Readiness Stats */}
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute -top-6 -left-6 bg-[#16161a]/90 backdrop-blur-xl border border-indigo-500/30 rounded-xl p-3 shadow-xl shadow-indigo-500/20 hidden sm:flex items-center gap-3"
          >
            <div className="w-8 h-8 rounded-lg bg-indigo-500/20 flex items-center justify-center text-indigo-400">
              <BarChart3 className="w-4 h-4" />
            </div>
            <div>
              <div className="text-[10px] uppercase tracking-wider text-gray-400 font-medium">Placement Score</div>
              <div className="text-xs font-bold text-white flex items-center gap-1">
                94.8% <span className="text-green-400 text-[10px]">↑ Top 2%</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom Section: Marketing Content & Trust Badges */}
      <div className="relative z-10 space-y-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5" /> Next-Gen Learning Ecosystem
          </div>
          <h1 className="text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-tight">
            Welcome to the future of <br className="hidden xl:block" />
            <span className="accent-gradient-text">placement preparation.</span>
          </h1>
          <p className="text-sm lg:text-base text-gray-400 mt-3 leading-relaxed max-w-xl">
            Master coding, visualize execution, prepare for interviews, and track your progress from one premium learning platform.
          </p>
        </div>

        {/* Small Trust Badges Grid */}
        <div className="flex flex-wrap gap-2.5 pt-2">
          {trustBadges.map((badge, index) => (
            <div
              key={index}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 backdrop-blur-md text-xs font-medium text-gray-300 hover:border-cyan-500/40 hover:text-white transition-colors"
            >
              <CheckCircle className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
              <span>{badge}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
