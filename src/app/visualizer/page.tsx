"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Play,
  Pause,
  RotateCcw,
  ChevronLeft,
  ChevronRight,
  Cpu,
  Layers,
  Database,
  Terminal,
  Sun,
  Moon,
  Sparkles,
  Zap,
  Code2,
  CheckCircle2,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";

// Simulated Program Steps for Execution Replay
interface ExecutionStep {
  stepIndex: number;
  activeLine: number;
  explanation: string;
  variables: Array<{ name: string; value: string | number; prevValue?: string | number; changed: boolean }>;
  callStack: Array<{ functionName: string; args: string; line: number }>;
  memory: {
    heightArray: number[];
    leftMaxArray: number[];
    rightMaxArray: number[];
    waterTrapped: number[];
    activePointers: { left?: number; right?: number; current?: number };
  };
  consoleLogs: string[];
}

const PROGRAM_CODE = [
  { line: 1, text: "#include <iostream>" },
  { line: 2, text: "#include <vector>" },
  { line: 3, text: "using namespace std;" },
  { line: 4, text: "" },
  { line: 5, text: "int trapWater(vector<int>& height) {" },
  { line: 6, text: "    int n = height.size();" },
  { line: 7, text: "    if (n == 0) return 0;" },
  { line: 8, text: "    int left = 0, right = n - 1;" },
  { line: 9, text: "    int leftMax = 0, rightMax = 0;" },
  { line: 10, text: "    int totalWater = 0;" },
  { line: 11, text: "    while (left <= right) {" },
  { line: 12, text: "        if (height[left] <= height[right]) {" },
  { line: 13, text: "            if (height[left] >= leftMax) leftMax = height[left];" },
  { line: 14, text: "            else totalWater += leftMax - height[left];" },
  { line: 15, text: "            left++;" },
  { line: 16, text: "        } else {" },
  { line: 17, text: "            if (height[right] >= rightMax) rightMax = height[right];" },
  { line: 18, text: "            else totalWater += rightMax - height[right];" },
  { line: 19, text: "            right--;" },
  { line: 20, text: "        }" },
  { line: 21, text: "    }" },
  { line: 22, text: "    return totalWater;" },
  { line: 23, text: "}" },
];

const REPLAY_STEPS: ExecutionStep[] = [
  {
    stepIndex: 1,
    activeLine: 6,
    explanation: "Initializing variables: height = [0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1]. Array size n = 12.",
    variables: [
      { name: "n", value: 12, changed: true },
      { name: "left", value: 0, changed: false },
      { name: "right", value: 11, changed: false },
      { name: "leftMax", value: 0, changed: false },
      { name: "rightMax", value: 0, changed: false },
      { name: "totalWater", value: 0, changed: false },
    ],
    callStack: [{ functionName: "main()", args: "int argc, char** argv", line: 28 }, { functionName: "trapWater(vector<int>&)", args: "height[12]", line: 6 }],
    memory: {
      heightArray: [0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1],
      leftMaxArray: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      rightMaxArray: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      waterTrapped: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      activePointers: { left: 0, right: 11 },
    },
    consoleLogs: ["[SYSTEM] Memory allocated for vector<int> height at 0x7fff5fbff800", "[EXECUTION] Entered function trapWater()"],
  },
  {
    stepIndex: 2,
    activeLine: 8,
    explanation: "Pointers initialized: left = 0 (val 0), right = 11 (val 1). leftMax = 0, rightMax = 0.",
    variables: [
      { name: "n", value: 12, changed: false },
      { name: "left", value: 0, changed: true },
      { name: "right", value: 11, changed: true },
      { name: "leftMax", value: 0, changed: false },
      { name: "rightMax", value: 0, changed: false },
      { name: "totalWater", value: 0, changed: false },
    ],
    callStack: [{ functionName: "main()", args: "int argc, char** argv", line: 28 }, { functionName: "trapWater(vector<int>&)", args: "height[12]", line: 8 }],
    memory: {
      heightArray: [0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1],
      leftMaxArray: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      rightMaxArray: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      waterTrapped: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      activePointers: { left: 0, right: 11 },
    },
    consoleLogs: ["[SYSTEM] Memory allocated for vector<int> height at 0x7fff5fbff800", "[EXECUTION] Entered function trapWater()", "[LOOP] Iteration 1: Comparing height[0] (0) <= height[11] (1) -> TRUE"],
  },
  {
    stepIndex: 3,
    activeLine: 13,
    explanation: "height[0] (0) >= leftMax (0). Update leftMax = 0. Increment left pointer to 1.",
    variables: [
      { name: "n", value: 12, changed: false },
      { name: "left", value: 1, prevValue: 0, changed: true },
      { name: "right", value: 11, changed: false },
      { name: "leftMax", value: 0, changed: true },
      { name: "rightMax", value: 0, changed: false },
      { name: "totalWater", value: 0, changed: false },
    ],
    callStack: [{ functionName: "main()", args: "int argc, char** argv", line: 28 }, { functionName: "trapWater(vector<int>&)", args: "height[12]", line: 13 }],
    memory: {
      heightArray: [0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1],
      leftMaxArray: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      rightMaxArray: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      waterTrapped: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      activePointers: { left: 1, right: 11 },
    },
    consoleLogs: [
      "[SYSTEM] Memory allocated for vector<int> height at 0x7fff5fbff800",
      "[EXECUTION] Entered function trapWater()",
      "[LOOP] Iteration 1: Comparing height[0] (0) <= height[11] (1) -> TRUE",
      "[STATE] leftMax updated to 0. Pointer left moved to index 1.",
    ],
  },
  {
    stepIndex: 4,
    activeLine: 14,
    explanation: "At index 2 (val 0), leftMax = 1 > height[2]. Trapped water at index 2 = 1 - 0 = 1 unit!",
    variables: [
      { name: "n", value: 12, changed: false },
      { name: "left", value: 2, prevValue: 1, changed: true },
      { name: "right", value: 11, changed: false },
      { name: "leftMax", value: 1, prevValue: 0, changed: true },
      { name: "rightMax", value: 0, changed: false },
      { name: "totalWater", value: 1, prevValue: 0, changed: true },
    ],
    callStack: [{ functionName: "main()", args: "int argc, char** argv", line: 28 }, { functionName: "trapWater(vector<int>&)", args: "height[12]", line: 14 }],
    memory: {
      heightArray: [0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1],
      leftMaxArray: [0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      rightMaxArray: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      waterTrapped: [0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      activePointers: { left: 2, right: 11, current: 2 },
    },
    consoleLogs: [
      "[SYSTEM] Memory allocated for vector<int> height at 0x7fff5fbff800",
      "[EXECUTION] Entered function trapWater()",
      "[LOOP] Iteration 1: Comparing height[0] (0) <= height[11] (1) -> TRUE",
      "[STATE] leftMax updated to 0. Pointer left moved to index 1.",
      "[WATER] Trapped +1 unit of rainwater at index 2. Cumulative totalWater = 1.",
    ],
  },
  {
    stepIndex: 5,
    activeLine: 18,
    explanation: "Processing right pointer at index 10 (val 2). leftMax (2) vs rightMax (3). Trapping water across inner boundary.",
    variables: [
      { name: "n", value: 12, changed: false },
      { name: "left", value: 4, prevValue: 2, changed: true },
      { name: "right", value: 9, prevValue: 11, changed: true },
      { name: "leftMax", value: 2, prevValue: 1, changed: true },
      { name: "rightMax", value: 3, prevValue: 0, changed: true },
      { name: "totalWater", value: 4, prevValue: 1, changed: true },
    ],
    callStack: [{ functionName: "main()", args: "int argc, char** argv", line: 28 }, { functionName: "trapWater(vector<int>&)", args: "height[12]", line: 18 }],
    memory: {
      heightArray: [0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1],
      leftMaxArray: [0, 1, 1, 2, 2, 0, 0, 0, 0, 0, 0, 0],
      rightMaxArray: [0, 0, 0, 0, 0, 0, 0, 3, 3, 3, 3, 3],
      waterTrapped: [0, 0, 1, 0, 1, 2, 0, 0, 0, 0, 0, 0],
      activePointers: { left: 4, right: 9, current: 5 },
    },
    consoleLogs: [
      "[SYSTEM] Memory allocated for vector<int> height at 0x7fff5fbff800",
      "[EXECUTION] Entered function trapWater()",
      "[LOOP] Iteration 1: Comparing height[0] (0) <= height[11] (1) -> TRUE",
      "[STATE] leftMax updated to 0. Pointer left moved to index 1.",
      "[WATER] Trapped +1 unit of rainwater at index 2. Cumulative totalWater = 1.",
      "[WATER] Trapped +1 unit at idx 4 and +2 units at idx 5. Cumulative totalWater = 4.",
    ],
  },
  {
    stepIndex: 6,
    activeLine: 22,
    explanation: "Execution Complete! All boundary pointers met at peak element index 7. Final calculated answer: 6 units of trapped water.",
    variables: [
      { name: "n", value: 12, changed: false },
      { name: "left", value: 7, prevValue: 4, changed: true },
      { name: "right", value: 7, prevValue: 9, changed: true },
      { name: "leftMax", value: 3, prevValue: 2, changed: true },
      { name: "rightMax", value: 3, prevValue: 3, changed: false },
      { name: "totalWater", value: 6, prevValue: 4, changed: true },
    ],
    callStack: [{ functionName: "main()", args: "int argc, char** argv", line: 28 }, { functionName: "trapWater(vector<int>&)", args: "height[12]", line: 22 }],
    memory: {
      heightArray: [0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1],
      leftMaxArray: [0, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 3],
      rightMaxArray: [3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
      waterTrapped: [0, 0, 1, 0, 1, 2, 1, 0, 0, 1, 0, 0],
      activePointers: { left: 7, right: 7 },
    },
    consoleLogs: [
      "[SYSTEM] Memory allocated for vector<int> height at 0x7fff5fbff800",
      "[EXECUTION] Entered function trapWater()",
      "[LOOP] Iteration 1: Comparing height[0] (0) <= height[11] (1) -> TRUE",
      "[STATE] leftMax updated to 0. Pointer left moved to index 1.",
      "[WATER] Trapped +1 unit of rainwater at index 2. Cumulative totalWater = 1.",
      "[WATER] Trapped +1 unit at idx 4 and +2 units at idx 5. Cumulative totalWater = 4.",
      "[RETURN] Return totalWater = 6. Function stack popped gracefully.",
    ],
  },
];

export default function StandaloneVisualizerPage() {
  const { user } = useAuth();
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState<1 | 2 | 0.5>(1);
  const [isDarkMode, setIsDarkMode] = useState(true);

  const currentStep = REPLAY_STEPS[currentStepIndex];
  const totalSteps = REPLAY_STEPS.length;

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentStepIndex((prev) => {
          if (prev >= totalSteps - 1) {
            setIsPlaying(false);
            return prev;
          }
          return prev + 1;
        });
      }, 2000 / speed);
    }
    return () => clearInterval(interval);
  }, [isPlaying, totalSteps, speed]);

  const handleNext = () => {
    if (currentStepIndex < totalSteps - 1) {
      setCurrentStepIndex((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex((prev) => prev - 1);
    }
  };

  const handleReplay = () => {
    setIsPlaying(false);
    setCurrentStepIndex(0);
  };

  return (
    <div className={`min-h-screen flex flex-col font-sans select-none transition-colors duration-300 ${isDarkMode ? "bg-[#09090b] text-white" : "bg-gray-950 text-gray-100"}`}>
      {/* 1. TOP NAVIGATION BAR (Extremely Minimal & Distraction-Free) */}
      <header className="h-16 bg-[#0c0c0e]/95 backdrop-blur-xl border-b border-white/10 px-4 lg:px-6 flex items-center justify-between z-40">
        {/* Left: Back to Workspace & Problem Title */}
        <div className="flex items-center gap-4">
          <Link
            href="/workspace"
            className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white transition-all flex items-center gap-2 text-xs font-semibold cursor-pointer border border-white/10"
          >
            <ArrowLeft className="w-4 h-4 text-cyan-400" />
            <span className="hidden sm:inline">Back to Workspace</span>
          </Link>

          <div className="h-4 w-px bg-white/10 hidden sm:block" />

          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-sm sm:text-base font-extrabold text-white tracking-tight">
                Trapping Rain Water
              </h1>
              <span className="px-2 py-0.5 rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/20 text-[10px] font-semibold">
                Execution Visualizer
              </span>
            </div>
            <p className="text-[10px] text-gray-400 hidden md:block">
              Standalone Step-by-Step Learning Environment
            </p>
          </div>
        </div>

        {/* Center: Execution Status Indicator */}
        <div className="hidden lg:flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#141418] border border-white/10 text-xs font-mono">
          <span className={`w-2 h-2 rounded-full ${isPlaying ? "bg-green-400 animate-ping" : "bg-amber-400"}`} />
          <span className="text-gray-300">
            {isPlaying ? "Replay Active" : currentStepIndex === totalSteps - 1 ? "Replay Complete" : "Replay Paused"}
          </span>
          <span className="text-gray-500">•</span>
          <span className="text-cyan-400 font-bold">Step {currentStep.stepIndex} of {totalSteps}</span>
        </div>

        {/* Right: Language Selector Indicator, Theme Toggle, Profile */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 bg-[#16161a] border border-white/10 rounded-xl text-xs font-mono text-cyan-300">
            <Code2 className="w-3.5 h-3.5 text-cyan-400" />
            <span>C++ (GCC 13.2)</span>
          </div>

          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white transition-colors cursor-pointer border border-white/10"
            title="Toggle Theme"
          >
            {isDarkMode ? <Moon className="w-4 h-4 text-purple-400" /> : <Sun className="w-4 h-4 text-amber-400" />}
          </button>

          <div className="flex items-center gap-2 p-1.5 rounded-xl bg-white/5 border border-white/10">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-cyan-500 to-indigo-600 p-0.5">
              <div className="w-full h-full bg-[#121215] rounded-[6px] flex items-center justify-center font-bold text-xs text-cyan-300">
                {user?.name ? user.name.charAt(0).toUpperCase() : "S"}
              </div>
            </div>
            <span className="text-xs font-semibold text-white hidden xl:inline">{user?.name || "Student"}</span>
          </div>
        </div>
      </header>

      {/* 2. MAIN APPLICATION CONTENT AREA */}
      <div className="flex-1 p-4 lg:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 overflow-y-auto max-w-[1920px] mx-auto w-full">
        {/* LEFT COLUMN: Read-only Syntax Highlighted Code Panel (5 Columns) */}
        <div className="lg:col-span-5 bg-[#121215] border border-white/10 rounded-3xl p-5 shadow-2xl flex flex-col justify-between overflow-hidden">
          <div>
            <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-3">
              <div className="flex items-center gap-2 text-xs font-bold text-white">
                <Code2 className="w-4 h-4 text-cyan-400" />
                <span>Program Source Code</span>
              </div>
              <span className="text-[10px] font-mono text-gray-400 bg-white/5 px-2 py-0.5 rounded-md">Read-Only View</span>
            </div>

            {/* Explanation box for current step */}
            <div className="mb-4 p-3 bg-purple-500/10 border border-purple-500/20 rounded-2xl text-xs text-purple-300 font-medium leading-relaxed flex items-start gap-2.5">
              <Sparkles className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold block mb-0.5 text-purple-200">Step Explanation:</span>
                {currentStep.explanation}
              </div>
            </div>

            {/* Code Lines with Active Highlight */}
            <div className="font-mono text-xs space-y-0.5 overflow-x-auto p-2 bg-[#09090b] rounded-2xl border border-white/5 max-h-[500px]">
              {PROGRAM_CODE.map((item) => {
                const isActive = item.line === currentStep.activeLine;
                return (
                  <motion.div
                    key={item.line}
                    animate={{ backgroundColor: isActive ? "rgba(168, 85, 247, 0.2)" : "transparent" }}
                    transition={{ duration: 0.2 }}
                    className={`flex items-center px-2 py-1 rounded-lg transition-colors ${
                      isActive ? "border-l-4 border-purple-500 text-white font-bold shadow-sm shadow-purple-500/30" : "text-gray-400 hover:text-gray-200"
                    }`}
                  >
                    <span className="w-8 shrink-0 text-[10px] text-gray-600 select-none text-right pr-3 font-mono">
                      {item.line}
                    </span>
                    <span className="whitespace-pre truncate">{item.text}</span>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Bottom helper footnote */}
          <div className="pt-4 border-t border-white/5 mt-4 text-[11px] text-gray-500 flex items-center justify-between font-mono">
            <span>Code Visualizer Replay Engine</span>
            <span>Focus: Execution Logic</span>
          </div>
        </div>

        {/* RIGHT COLUMN: Execution Analytics & Visual Panels (7 Columns) */}
        <div className="lg:col-span-7 space-y-6 flex flex-col justify-between">
          {/* TOP RIGHT: Execution Timeline Stepper & Playback Controls */}
          <div className="bg-[#121215] border border-white/10 rounded-3xl p-5 shadow-2xl space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-bold text-white">
                <Zap className="w-4 h-4 text-amber-400" />
                <span>Execution Timeline & Controls</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-mono text-cyan-400">
                <span>Step {currentStep.stepIndex} / {totalSteps}</span>
              </div>
            </div>

            {/* Timeline Scrubber */}
            <div className="space-y-1">
              <input
                type="range"
                min={0}
                max={totalSteps - 1}
                value={currentStepIndex}
                onChange={(e) => {
                  setIsPlaying(false);
                  setCurrentStepIndex(Number(e.target.value));
                }}
                className="w-full h-2 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
              />
              <div className="flex justify-between text-[10px] font-mono text-gray-500 px-1">
                <span>Init (Step 1)</span>
                <span>Loop Iterations (Steps 2-5)</span>
                <span>Complete (Step 6)</span>
              </div>
            </div>

            {/* Playback Button Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
              <div className="flex items-center gap-2">
                <button
                  onClick={handleReplay}
                  className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-white transition-colors cursor-pointer border border-white/10"
                  title="Replay from start"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
                <button
                  onClick={handlePrev}
                  disabled={currentStepIndex === 0}
                  className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-white disabled:opacity-40 transition-colors cursor-pointer border border-white/10"
                  title="Previous Step"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-cyan-500/25 cursor-pointer active:scale-95 transition-all"
                >
                  {isPlaying ? (
                    <>
                      <Pause className="w-4 h-4 fill-white" />
                      <span>Pause</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-4 h-4 fill-white" />
                      <span>Play Replay</span>
                    </>
                  )}
                </button>
                <button
                  onClick={handleNext}
                  disabled={currentStepIndex === totalSteps - 1}
                  className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-white disabled:opacity-40 transition-colors cursor-pointer border border-white/10"
                  title="Next Step"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              {/* Speed Controller */}
              <div className="flex items-center gap-1 bg-[#18181c] p-1 rounded-xl border border-white/10 text-xs font-mono">
                <span className="px-2 text-[10px] text-gray-400">Speed:</span>
                {([0.5, 1, 2] as const).map((spd) => (
                  <button
                    key={spd}
                    onClick={() => setSpeed(spd)}
                    className={`px-2 py-1 rounded-lg transition-colors cursor-pointer ${
                      speed === spd ? "bg-cyan-500 text-black font-bold" : "text-gray-400 hover:text-white"
                    }`}
                  >
                    {spd}x
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* MIDDLE RIGHT: Variable State Inspector & Call Stack (Grid 2 Cols) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Variable State Inspector */}
            <div className="bg-[#121215] border border-white/10 rounded-3xl p-5 shadow-2xl space-y-3">
              <div className="flex items-center justify-between border-b border-white/10 pb-2.5">
                <div className="flex items-center gap-2 text-xs font-bold text-white">
                  <Cpu className="w-4 h-4 text-cyan-400" />
                  <span>Variable Inspector</span>
                </div>
                <span className="text-[10px] font-mono text-cyan-400">Active Scope</span>
              </div>

              <div className="space-y-2 font-mono text-xs">
                {currentStep.variables.map((v) => (
                  <div
                    key={v.name}
                    className={`p-2.5 rounded-xl border flex items-center justify-between transition-all ${
                      v.changed
                        ? "bg-purple-500/15 border-purple-500/40 text-white shadow-md shadow-purple-500/10"
                        : "bg-[#16161a] border-white/5 text-gray-300"
                    }`}
                  >
                    <span className="text-gray-400">{v.name}</span>
                    <div className="flex items-center gap-2">
                      {v.prevValue !== undefined && v.changed && (
                        <span className="text-[10px] text-gray-500 line-through">{v.prevValue}</span>
                      )}
                      <span className={`font-bold ${v.changed ? "text-purple-300 text-sm" : "text-cyan-400"}`}>
                        {v.value}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Call Stack Panel */}
            <div className="bg-[#121215] border border-white/10 rounded-3xl p-5 shadow-2xl space-y-3">
              <div className="flex items-center justify-between border-b border-white/10 pb-2.5">
                <div className="flex items-center gap-2 text-xs font-bold text-white">
                  <Layers className="w-4 h-4 text-indigo-400" />
                  <span>Call Stack</span>
                </div>
                <span className="text-[10px] font-mono text-indigo-400">{currentStep.callStack.length} Frames</span>
              </div>

              <div className="space-y-2 font-mono text-xs">
                <AnimatePresence>
                  {currentStep.callStack.map((frame, idx) => (
                    <motion.div
                      key={frame.functionName}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className={`p-3 rounded-xl border flex items-center justify-between ${
                        idx === currentStep.callStack.length - 1
                          ? "bg-gradient-to-r from-indigo-500/20 to-purple-500/20 border-indigo-500/40 text-white shadow-md"
                          : "bg-[#16161a] border-white/5 text-gray-400"
                      }`}
                    >
                      <div>
                        <div className="font-bold text-cyan-300 text-xs">{frame.functionName}</div>
                        <div className="text-[10px] text-gray-400 truncate mt-0.5">{frame.args}</div>
                      </div>
                      <span className="text-[10px] px-2 py-0.5 bg-black/40 rounded border border-white/10 text-gray-400">
                        Line {frame.line}
                      </span>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* BOTTOM RIGHT: Memory & Visual Array Representation */}
          <div className="bg-[#121215] border border-white/10 rounded-3xl p-5 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-2.5">
              <div className="flex items-center gap-2 text-xs font-bold text-white">
                <Database className="w-4 h-4 text-green-400" />
                <span>Memory Allocation & Array Visualization</span>
              </div>
              <span className="text-[10px] font-mono text-green-400">Vector&lt;int&gt; Heap View</span>
            </div>

            {/* Interactive Height Array Visualizer Bar */}
            <div className="space-y-2">
              <div className="text-[11px] text-gray-400 font-medium flex items-center justify-between">
                <span>Height Elevation & Trapped Water (Indices 0..11)</span>
                <span className="text-cyan-400 font-mono text-[10px]">Pointers: L (Left), R (Right)</span>
              </div>
              <div className="h-32 bg-[#09090b] p-3 rounded-2xl border border-white/5 flex items-end justify-between gap-1 sm:gap-2">
                {currentStep.memory.heightArray.map((h, i) => {
                  const trapped = currentStep.memory.waterTrapped[i] || 0;
                  const isLeft = currentStep.memory.activePointers.left === i;
                  const isRight = currentStep.memory.activePointers.right === i;

                  return (
                    <div key={i} className="flex-1 flex flex-col items-center gap-1 h-full justify-end relative group">
                      {/* Pointer Badge */}
                      <div className="absolute -top-6 flex gap-0.5 text-[9px] font-bold font-mono">
                        {isLeft && <span className="px-1 py-0.5 bg-cyan-500 text-black rounded animate-bounce">L</span>}
                        {isRight && <span className="px-1 py-0.5 bg-purple-500 text-white rounded animate-bounce">R</span>}
                      </div>

                      {/* Trapped Water Bar Portion */}
                      {trapped > 0 && (
                        <motion.div
                          initial={{ height: 0 }}
                          animate={{ height: `${trapped * 24}px` }}
                          className="w-full bg-cyan-400/80 rounded-t border-t border-cyan-200 shadow-sm shadow-cyan-400/50 flex items-center justify-center text-[9px] font-bold text-black"
                        >
                          +{trapped}
                        </motion.div>
                      )}

                      {/* Elevation Block */}
                      <div
                        style={{ height: `${Math.max(8, h * 24)}px` }}
                        className={`w-full rounded-b flex items-center justify-center text-[10px] font-mono font-bold transition-all ${
                          isLeft || isRight
                            ? "bg-gradient-to-t from-purple-600 to-indigo-500 text-white border border-purple-300 shadow-lg shadow-purple-500/40"
                            : "bg-gray-800 text-gray-300 border border-white/10"
                        }`}
                      >
                        {h}
                      </div>

                      <span className="text-[9px] font-mono text-gray-500 mt-1">{i}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* BOTTOM CONSOLE OUTPUT REPLAY */}
          <div className="bg-[#121215] border border-white/10 rounded-3xl p-5 shadow-2xl space-y-3">
            <div className="flex items-center justify-between border-b border-white/10 pb-2.5">
              <div className="flex items-center gap-2 text-xs font-bold text-white">
                <Terminal className="w-4 h-4 text-amber-400" />
                <span>Synchronized Console Replay</span>
              </div>
              <span className="text-[10px] font-mono text-gray-400">stdout</span>
            </div>

            <div className="p-3 bg-[#09090b] rounded-2xl border border-white/5 font-mono text-xs space-y-1 max-h-32 overflow-y-auto text-gray-300">
              {currentStep.consoleLogs.map((log, index) => (
                <div key={index} className={log.includes("[WATER]") ? "text-cyan-300 font-bold" : log.includes("[RETURN]") ? "text-green-400 font-bold" : "text-gray-400"}>
                  {log}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
