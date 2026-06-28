"use client";

import { useState } from "react";
import { Cpu, Play, SkipForward, RotateCcw, Sparkles, Layers } from "lucide-react";

export default function VisualizerPage() {
  const [step, setStep] = useState(3);
  const totalSteps = 6;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="p-6 bg-[#121215] border border-white/10 rounded-3xl shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-semibold mb-2">
            <Sparkles className="w-3.5 h-3.5" /> CodeZilaa Intuition Engine
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Execution Visualizer</h1>
          <p className="text-xs sm:text-sm text-gray-400 mt-1">
            Visualize pointer movements, stack calls, and memory trees line-by-line.
          </p>
        </div>

        {/* Stepper Controls */}
        <div className="flex items-center gap-2 bg-[#18181c] p-1.5 rounded-2xl border border-white/10">
          <button
            onClick={() => setStep((s) => Math.max(1, s - 1))}
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-white transition-colors cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
          <span className="px-3 text-xs font-mono font-bold text-cyan-400">
            Step {step}/{totalSteps}
          </span>
          <button
            onClick={() => setStep((s) => Math.min(totalSteps, s + 1))}
            className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs flex items-center gap-1.5 transition-all shadow-md shadow-purple-600/30 cursor-pointer"
          >
            <span>Next Step</span>
            <SkipForward className="w-3.5 h-3.5 fill-white" />
          </button>
        </div>
      </div>

      {/* Visualization Canvas */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Memory Tree Panel */}
        <div className="lg:col-span-8 bg-[#121215] border border-white/10 rounded-3xl p-6 shadow-2xl min-h-[400px] flex flex-col justify-between">
          <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-4">
            <span className="text-xs font-bold text-white flex items-center gap-2">
              <Layers className="w-4 h-4 text-purple-400" /> Binary Search Tree Execution
            </span>
            <span className="text-xs font-mono text-green-400">Target: 14</span>
          </div>

          <div className="flex-1 flex flex-col items-center justify-center py-8 space-y-8">
            <div className="w-12 h-12 rounded-full bg-cyan-500 text-black font-extrabold text-sm flex items-center justify-center shadow-lg shadow-cyan-500/50 border-2 border-cyan-300 animate-pulse">
              10 (Root)
            </div>
            <div className="flex justify-around w-full max-w-md">
              <div className="w-10 h-10 rounded-full bg-white/10 text-gray-400 text-xs flex items-center justify-center border border-white/10">
                5
              </div>
              <div className="w-12 h-12 rounded-full bg-purple-500 text-white font-bold text-xs flex items-center justify-center shadow-lg shadow-purple-500/50 border-2 border-purple-300">
                15 (Right)
              </div>
            </div>
          </div>

          <div className="p-3 bg-purple-500/10 border border-purple-500/20 rounded-2xl text-xs text-purple-300 font-mono">
            Line 14: Comparing target (14) with current node (15). Since 14 &lt; 15, moving left.
          </div>
        </div>

        {/* Variable Watch Panel */}
        <div className="lg:col-span-4 bg-[#121215] border border-white/10 rounded-3xl p-6 shadow-2xl space-y-4">
          <h3 className="text-xs font-bold text-white flex items-center gap-2">
            <Cpu className="w-4 h-4 text-cyan-400" /> Variable State Inspector
          </h3>
          <div className="space-y-2 font-mono text-xs">
            <div className="p-3 bg-[#18181c] rounded-xl border border-white/5 flex justify-between">
              <span className="text-gray-400">low</span>
              <span className="text-cyan-400 font-bold">0</span>
            </div>
            <div className="p-3 bg-[#18181c] rounded-xl border border-white/5 flex justify-between">
              <span className="text-gray-400">high</span>
              <span className="text-cyan-400 font-bold">7</span>
            </div>
            <div className="p-3 bg-purple-500/20 rounded-xl border border-purple-500/30 flex justify-between">
              <span className="text-purple-300">mid</span>
              <span className="text-purple-300 font-bold">3 (Value = 15)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
