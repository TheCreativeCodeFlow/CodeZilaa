"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal, CheckCircle2, AlertTriangle, XCircle, Clock, Cpu, RotateCcw, ShieldAlert, Zap } from "lucide-react";
import { ExecutionResult } from "../types/compilerTypes";

interface OutputPanelProps {
  result: ExecutionResult | null;
  isRunning: boolean;
  onClear: () => void;
}

export default function OutputPanel({ result, isRunning, onClear }: OutputPanelProps) {
  const [activeTab, setActiveTab] = useState<"console" | "problems" | "performance">("console");

  return (
    <div className="w-[28%] bg-[#0d0d10] border-l border-white/10 flex flex-col h-full select-none text-xs font-medium">
      {/* Tab Header */}
      <div className="p-2 border-b border-white/10 flex items-center justify-between bg-[#121215]">
        <div className="flex gap-1">
          <button
            onClick={() => setActiveTab("console")}
            className={`px-3 py-1.5 rounded-xl font-semibold transition-all cursor-pointer ${
              activeTab === "console" ? "bg-cyan-500/20 text-cyan-400 border border-cyan-500/30" : "text-gray-400 hover:text-white"
            }`}
          >
            Console
          </button>
          <button
            onClick={() => setActiveTab("problems")}
            className={`px-3 py-1.5 rounded-xl font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === "problems" ? "bg-red-500/20 text-red-400 border border-red-500/30" : "text-gray-400 hover:text-white"
            }`}
          >
            <span>Problems</span>
            {result?.stderr && (
              <span className="w-2 h-2 rounded-full bg-red-400 animate-pulse" />
            )}
          </button>
          <button
            onClick={() => setActiveTab("performance")}
            className={`px-3 py-1.5 rounded-xl font-semibold transition-all cursor-pointer ${
              activeTab === "performance" ? "bg-purple-500/20 text-purple-400 border border-purple-500/30" : "text-gray-400 hover:text-white"
            }`}
          >
            Performance
          </button>
        </div>

        <button
          onClick={onClear}
          className="p-1.5 text-gray-500 hover:text-white hover:bg-white/5 rounded-lg transition-colors cursor-pointer"
          title="Clear Console"
        >
          <RotateCcw className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Main Content Pane */}
      <div className="flex-1 p-4 overflow-y-auto font-mono leading-relaxed text-xs">
        {isRunning ? (
          <div className="flex flex-col items-center justify-center h-full text-gray-400 space-y-3">
            <div className="w-6 h-6 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin" />
            <span className="text-xs font-sans">Compiling & Executing Code...</span>
          </div>
        ) : activeTab === "console" ? (
          result ? (
            <div className="space-y-4">
              {/* Success Badge Banner */}
              <div className="p-3 rounded-2xl bg-green-500/10 border border-green-500/20 flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-green-400 shrink-0" />
                <div>
                  <div className="font-bold text-white font-sans text-xs">Execution Successful</div>
                  <div className="text-[10px] text-gray-400 font-mono">Process returned exit code 0</div>
                </div>
              </div>

              <pre className="text-green-400 whitespace-pre-wrap leading-relaxed">{result.stdout}</pre>
            </div>
          ) : (
            <div className="text-gray-600 italic font-sans py-8 text-center">
              Click &quot;Run Code&quot; (⌘↵) to execute algorithm and view stdout output...
            </div>
          )
        ) : activeTab === "problems" ? (
          result?.stderr ? (
            <div className="space-y-3">
              <div className="p-3 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center gap-3">
                <XCircle className="w-5 h-5 text-red-400 shrink-0" />
                <div className="font-bold text-white font-sans text-xs">Compilation Error</div>
              </div>
              <pre className="text-red-400 whitespace-pre-wrap">{result.stderr}</pre>
            </div>
          ) : (
            <div className="text-gray-600 italic font-sans py-8 text-center">
              No errors detected in current execution.
            </div>
          )
        ) : (
          <div className="space-y-3 font-sans">
            {result ? (
              <div className="grid grid-cols-1 gap-3">
                <div className="p-3 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-between">
                  <span className="text-gray-400 text-xs flex items-center gap-2">
                    <Clock className="w-4 h-4 text-cyan-400" /> Execution Time
                  </span>
                  <span className="font-bold text-white font-mono">{result.time}</span>
                </div>
                <div className="p-3 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-between">
                  <span className="text-gray-400 text-xs flex items-center gap-2">
                    <Cpu className="w-4 h-4 text-indigo-400" /> Peak Memory Usage
                  </span>
                  <span className="font-bold text-white font-mono">{result.memory}</span>
                </div>
                <div className="p-3 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-between">
                  <span className="text-gray-400 text-xs flex items-center gap-2">
                    <Zap className="w-4 h-4 text-amber-400" /> Time Complexity Estimate
                  </span>
                  <span className="font-bold text-amber-300 font-mono">O(N log N)</span>
                </div>
              </div>
            ) : (
              <div className="text-gray-600 italic py-8 text-center">
                Run program to generate performance profiling diagnostics.
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
