"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, SkipForward, SkipBack, RefreshCw, Layers, CheckCircle2 } from "lucide-react";

interface ArrayStep {
  stepIndex: number;
  array: number[];
  comparing: number[];
  swapping: number[];
  sorted: number[];
  codeLine: number;
  description: string;
}

const sortingSteps: ArrayStep[] = [
  {
    stepIndex: 0,
    array: [42, 17, 89, 23, 56, 11],
    comparing: [],
    swapping: [],
    sorted: [],
    codeLine: 1,
    description: "Initialize unsorted array [42, 17, 89, 23, 56, 11]. Begin Bubble Sort pass.",
  },
  {
    stepIndex: 1,
    array: [42, 17, 89, 23, 56, 11],
    comparing: [0, 1],
    swapping: [],
    sorted: [],
    codeLine: 3,
    description: "Compare arr[0] (42) and arr[1] (17). Since 42 > 17, swap required.",
  },
  {
    stepIndex: 2,
    array: [17, 42, 89, 23, 56, 11],
    comparing: [],
    swapping: [0, 1],
    sorted: [],
    codeLine: 4,
    description: "Swapped elements at indices 0 and 1. Array updated.",
  },
  {
    stepIndex: 3,
    array: [17, 42, 89, 23, 56, 11],
    comparing: [1, 2],
    swapping: [],
    sorted: [],
    codeLine: 3,
    description: "Compare arr[1] (42) and arr[2] (89). 42 < 89, no swap needed.",
  },
  {
    stepIndex: 4,
    array: [17, 42, 89, 23, 56, 11],
    comparing: [2, 3],
    swapping: [],
    sorted: [],
    codeLine: 3,
    description: "Compare arr[2] (89) and arr[3] (23). 89 > 23, swap required.",
  },
  {
    stepIndex: 5,
    array: [17, 42, 23, 89, 56, 11],
    comparing: [],
    swapping: [2, 3],
    sorted: [],
    codeLine: 4,
    description: "Swapped 89 and 23. Largest value 89 continues bubbling right.",
  },
  {
    stepIndex: 6,
    array: [17, 42, 23, 56, 89, 11],
    comparing: [],
    swapping: [3, 4],
    sorted: [],
    codeLine: 4,
    description: "Swapped 89 and 56. Pushing max element to end.",
  },
  {
    stepIndex: 7,
    array: [17, 42, 23, 56, 11, 89],
    comparing: [],
    swapping: [],
    sorted: [5],
    codeLine: 6,
    description: "Pass 1 complete! Index 5 (89) is now locked in its final sorted position.",
  },
];

export default function VisualizationShowcase() {
  const [currentStepIdx, setCurrentStepIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (!isPlaying) return;
    const timer = setInterval(() => {
      setCurrentStepIdx((prev) => {
        if (prev >= sortingSteps.length - 1) {
          setIsPlaying(false);
          return prev;
        }
        return prev + 1;
      });
    }, 1800);
    return () => clearInterval(timer);
  }, [isPlaying]);

  const step = sortingSteps[currentStepIdx];

  return (
    <section id="visualization" className="py-24 relative z-10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <h2 className="text-xs font-semibold text-cyan-400 uppercase tracking-widest font-mono">
            Signature Engine
          </h2>
          <p className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            See Code Execute in Real-Time.
          </p>
          <p className="text-gray-400 text-base sm:text-lg leading-relaxed">
            Stop guessing how data structures behave in memory. Experience interactive visual step scrubbing engineered to build instant algorithmic intuition.
          </p>
        </div>

        {/* Product Showcase Apple-Style Panel */}
        <div className="rounded-3xl bg-[#111111] border border-white/10 p-6 sm:p-10 shadow-2xl shadow-cyan-950/30">
          
          {/* Top Scrubber & Playback Controls */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pb-8 border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center">
                <Layers className="w-5 h-5 text-cyan-400" />
              </div>
              <div>
                <h3 className="text-white font-semibold text-base font-mono">BubbleSort_Memory_Profiler</h3>
                <p className="text-xs text-gray-400 font-sans">Interactive Execution Scrubber</p>
              </div>
            </div>

            {/* Controls Bar */}
            <div className="flex items-center gap-3 bg-[#181818] p-2 rounded-2xl border border-white/5">
              <button
                onClick={() => setCurrentStepIdx((prev) => Math.max(0, prev - 1))}
                disabled={currentStepIdx === 0}
                className="p-2 text-gray-400 hover:text-white disabled:opacity-30 transition-colors"
                title="Step Back"
              >
                <SkipBack className="w-4 h-4" />
              </button>

              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-500 text-black font-semibold text-xs hover:bg-cyan-400 transition-all shadow-md shadow-cyan-500/20"
              >
                {isPlaying ? (
                  <>
                    <Pause className="w-4 h-4" /> Pause Simulation
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 fill-black" /> Play Execution
                  </>
                )}
              </button>

              <button
                onClick={() => setCurrentStepIdx((prev) => Math.min(sortingSteps.length - 1, prev + 1))}
                disabled={currentStepIdx === sortingSteps.length - 1}
                className="p-2 text-gray-400 hover:text-white disabled:opacity-30 transition-colors"
                title="Step Forward"
              >
                <SkipForward className="w-4 h-4" />
              </button>

              <button
                onClick={() => {
                  setCurrentStepIdx(0);
                  setIsPlaying(false);
                }}
                className="p-2 text-gray-400 hover:text-white transition-colors border-l border-white/10 ml-1 pl-3"
                title="Replay"
              >
                <RefreshCw className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Visualization Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-8 items-center">
            
            {/* Left Memory Array Graphic (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              <div className="flex items-center justify-between text-xs font-mono text-gray-400">
                <span>Memory Heap Array View</span>
                <span className="text-cyan-400 font-semibold">Active State</span>
              </div>

              {/* Array Bars / Nodes */}
              <div className="min-h-[220px] p-6 rounded-2xl bg-[#090909] border border-white/5 flex items-end justify-center gap-3 sm:gap-4">
                {step.array.map((val, idx) => {
                  const isComparing = step.comparing.includes(idx);
                  const isSwapping = step.swapping.includes(idx);
                  const isSorted = step.sorted.includes(idx);

                  let bgStyle = "bg-surface-200 border-white/10 text-gray-300";
                  if (isComparing) bgStyle = "bg-yellow-500/20 border-yellow-400 text-yellow-300 scale-105";
                  if (isSwapping) bgStyle = "bg-cyan-500/30 border-cyan-400 text-cyan-200 scale-110 shadow-lg shadow-cyan-500/30";
                  if (isSorted) bgStyle = "bg-emerald-500/20 border-emerald-400 text-emerald-300";

                  return (
                    <motion.div
                      key={idx}
                      layout
                      transition={{ type: "spring", stiffness: 350, damping: 25 }}
                      className="flex flex-col items-center gap-2 flex-1 max-w-[64px]"
                    >
                      <span className="text-[11px] font-mono text-gray-500">[{idx}]</span>
                      <div
                        className={`w-full rounded-xl border flex items-center justify-center font-bold font-mono text-base sm:text-lg transition-all duration-300 ${bgStyle}`}
                        style={{ height: `${Math.max(60, val * 2.2)}px` }}
                      >
                        {val}
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Status Banner */}
              <div className="p-4 rounded-xl bg-[#141414] border border-white/5 flex items-center gap-3 text-sm text-gray-300 font-sans">
                <CheckCircle2 className="w-5 h-5 text-cyan-400 shrink-0" />
                <span>{step.description}</span>
              </div>
            </div>

            {/* Right Algorithm Code (5 cols) */}
            <div className="lg:col-span-5 bg-[#0d0d0d] p-5 rounded-2xl border border-white/10 font-mono text-xs space-y-2">
              <div className="text-gray-500 pb-2 border-b border-white/5 font-sans font-medium">
                Algorithm: bubble_sort.cpp
              </div>
              <div className="space-y-1.5 pt-2">
                <div className={`p-1.5 rounded ${step.codeLine === 1 ? "bg-cyan-500/20 text-cyan-200 font-bold" : "text-gray-400"}`}>
                  1. void bubbleSort(int arr[], int n) &#123;
                </div>
                <div className={`p-1.5 rounded ${step.codeLine === 2 ? "bg-cyan-500/20 text-cyan-200 font-bold" : "text-gray-400"}`}>
                  2.   for (int i = 0; i &lt; n-1; i++) &#123;
                </div>
                <div className={`p-1.5 rounded ${step.codeLine === 3 ? "bg-cyan-500/20 text-cyan-200 font-bold" : "text-gray-400"}`}>
                  3.     if (arr[j] &gt; arr[j+1]) &#123;
                </div>
                <div className={`p-1.5 rounded ${step.codeLine === 4 ? "bg-cyan-500/20 text-cyan-200 font-bold" : "text-gray-400"}`}>
                  4.       swap(arr[j], arr[j+1]);
                </div>
                <div className={`p-1.5 rounded ${step.codeLine === 5 ? "bg-cyan-500/20 text-cyan-200 font-bold" : "text-gray-400"}`}>
                  5.     &#125;
                </div>
                <div className={`p-1.5 rounded ${step.codeLine === 6 ? "bg-cyan-500/20 text-cyan-200 font-bold" : "text-gray-400"}`}>
                  6.   &#125;
                </div>
                <div className="p-1.5 text-gray-400">7. &#125;</div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
