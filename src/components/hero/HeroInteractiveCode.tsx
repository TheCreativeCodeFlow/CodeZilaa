"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, RotateCcw, Cpu, Layers, Terminal, Variable } from "lucide-react";

interface ExecutionStep {
  line: number;
  code: string;
  variables: Record<string, string | number>;
  callStack: string[];
  output?: string;
  explanation: string;
}

const executionSteps: ExecutionStep[] = [
  {
    line: 2,
    code: "int low = 0, high = arr.size() - 1;",
    variables: { low: 0, high: 5, mid: "undefined" },
    callStack: ["main()", "binarySearch(arr, 19)"],
    explanation: "Initialize search range pointers across indices 0 to 5.",
  },
  {
    line: 3,
    code: "while (low <= high) {",
    variables: { low: 0, high: 5, mid: "undefined" },
    callStack: ["main()", "binarySearch(arr, 19)"],
    explanation: "Condition (0 <= 5) evaluates to true. Loop starts.",
  },
  {
    line: 4,
    code: "  int mid = low + (high - low) / 2;",
    variables: { low: 0, high: 5, mid: 2, "arr[mid]": 11 },
    callStack: ["main()", "binarySearch(arr, 19)"],
    explanation: "Calculate mid index: 0 + (5 - 0)/2 = 2. Value arr[2] is 11.",
  },
  {
    line: 6,
    code: "  if (arr[mid] < target)",
    variables: { low: 0, high: 5, mid: 2, "arr[mid]": 11, target: 19 },
    callStack: ["main()", "binarySearch(arr, 19)"],
    explanation: "Comparing arr[2] (11) < target (19). Evaluates to TRUE.",
  },
  {
    line: 7,
    code: "    low = mid + 1;",
    variables: { low: 3, high: 5, mid: 2, "arr[mid]": 11 },
    callStack: ["main()", "binarySearch(arr, 19)"],
    explanation: "Target is in right half. Move low pointer to index 3.",
  },
  {
    line: 4,
    code: "  int mid = low + (high - low) / 2;",
    variables: { low: 3, high: 5, mid: 4, "arr[mid]": 19 },
    callStack: ["main()", "binarySearch(arr, 19)"],
    explanation: "Recalculate mid index: 3 + (5 - 3)/2 = 4. Value arr[4] is 19.",
  },
  {
    line: 5,
    code: "  if (arr[mid] == target) return mid;",
    variables: { low: 3, high: 5, mid: 4, "arr[mid]": 19, target: 19 },
    callStack: ["main()", "binarySearch(arr, 19)"],
    output: "Found target 19 at index 4 in 2 iterations!",
    explanation: "Match found! Returning target index 4.",
  },
];

const codeLines = [
  "int binarySearch(vector<int>& arr, int target) {",
  "  int low = 0, high = arr.size() - 1;",
  "  while (low <= high) {",
  "    int mid = low + (high - low) / 2;",
  "    if (arr[mid] == target) return mid;",
  "    if (arr[mid] < target)",
  "      low = mid + 1;",
  "    else high = mid - 1;",
  "  }",
  "  return -1;",
  "}",
];

export default function HeroInteractiveCode() {
  const [currentStepIdx, setCurrentStepIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setCurrentStepIdx((prev) => (prev + 1) % executionSteps.length);
    }, 2400);
    return () => clearInterval(interval);
  }, [isPlaying]);

  const step = executionSteps[currentStepIdx];

  return (
    <div className="w-full rounded-2xl bg-[#111111] border border-white/10 overflow-hidden shadow-2xl shadow-cyan-950/20 text-xs font-mono">
      {/* Top Window Bar */}
      <div className="px-4 py-3 bg-[#141414] border-b border-white/10 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500/80" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
          <div className="w-3 h-3 rounded-full bg-green-500/80" />
          <span className="ml-2 text-gray-400 font-sans text-xs flex items-center gap-1.5 font-medium">
            <Cpu className="w-3.5 h-3.5 text-cyan-400" /> binary_search.cpp — Execution Profiler
          </span>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-2 bg-[#090909] px-2.5 py-1 rounded-lg border border-white/5">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="text-gray-300 hover:text-white transition-colors p-1"
            title={isPlaying ? "Pause" : "Play"}
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5 text-yellow-400" /> : <Play className="w-3.5 h-3.5 text-green-400" />}
          </button>
          <button
            onClick={() => setCurrentStepIdx(0)}
            className="text-gray-400 hover:text-white transition-colors p-1"
            title="Reset"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
          <span className="text-[10px] text-cyan-400/80 font-sans font-semibold pl-1 border-l border-white/10">
            Step {currentStepIdx + 1}/{executionSteps.length}
          </span>
        </div>
      </div>

      {/* Main Split Interface */}
      <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[360px]">
        {/* Left Code View (7 cols) */}
        <div className="lg:col-span-7 p-4 bg-[#0d0d0d] border-b lg:border-b-0 lg:border-r border-white/10 flex flex-col justify-between">
          <div className="space-y-1 overflow-x-auto">
            {codeLines.map((lineText, idx) => {
              const lineNum = idx + 1;
              const isCurrentLine = step.line === lineNum;
              return (
                <div
                  key={idx}
                  className={`flex items-center gap-3 px-2 py-0.5 rounded transition-colors ${
                    isCurrentLine ? "bg-cyan-500/15 border-l-2 border-cyan-400 text-white" : "text-gray-400"
                  }`}
                >
                  <span className="w-6 text-right text-gray-600 select-none text-[11px]">{lineNum}</span>
                  <span className={`font-mono text-[12px] whitespace-pre ${isCurrentLine ? "font-semibold text-cyan-200" : ""}`}>
                    {lineText}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Line Explanation Footer */}
          <div className="mt-4 pt-3 border-t border-white/5 flex items-start gap-2 text-gray-300 font-sans">
            <span className="px-1.5 py-0.5 rounded bg-cyan-500/20 text-cyan-400 text-[10px] font-semibold font-mono uppercase">
              Inspector
            </span>
            <p className="text-[11px] text-gray-300 leading-relaxed">{step.explanation}</p>
          </div>
        </div>

        {/* Right Execution State Inspector (5 cols) */}
        <div className="lg:col-span-5 p-4 bg-[#111111] flex flex-col gap-4 justify-between">
          {/* Memory & Variables */}
          <div>
            <div className="flex items-center gap-1.5 text-gray-400 text-[11px] font-sans font-semibold mb-2.5">
              <Variable className="w-3.5 h-3.5 text-indigo-400" /> Variable State Table
            </div>
            <div className="space-y-1.5">
              {Object.entries(step.variables).map(([key, value]) => (
                <motion.div
                  key={key}
                  layout
                  className="flex items-center justify-between px-3 py-1.5 rounded-lg bg-[#181818] border border-white/5"
                >
                  <span className="text-gray-400 font-mono">{key}</span>
                  <span className="font-semibold font-mono text-cyan-400 bg-cyan-950/40 px-2 py-0.5 rounded border border-cyan-500/20">
                    {String(value)}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Call Stack */}
          <div>
            <div className="flex items-center gap-1.5 text-gray-400 text-[11px] font-sans font-semibold mb-2">
              <Layers className="w-3.5 h-3.5 text-purple-400" /> Active Call Stack
            </div>
            <div className="space-y-1">
              {step.callStack.map((frame, i) => (
                <div
                  key={i}
                  className="px-3 py-1 rounded bg-[#141414] border border-white/5 text-gray-300 flex items-center justify-between"
                >
                  <span>{frame}</span>
                  <span className="text-[9px] text-gray-500 font-sans">Frame {i}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Console Output */}
          <div>
            <div className="flex items-center gap-1.5 text-gray-400 text-[11px] font-sans font-semibold mb-2">
              <Terminal className="w-3.5 h-3.5 text-green-400" /> Console Feed
            </div>
            <div className="p-2.5 rounded-lg bg-[#080808] border border-white/5 min-h-[48px] text-green-400 font-mono text-[11px]">
              {step.output ? (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  &gt; {step.output}
                </motion.div>
              ) : (
                <span className="text-gray-600 italic">&gt; Program executing...</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
