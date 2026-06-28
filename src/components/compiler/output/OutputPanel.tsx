"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal, CheckCircle2, AlertTriangle, XCircle, Clock, Cpu, RotateCcw } from "lucide-react";
import { ExecutionResult } from "../types/compilerTypes";

interface OutputPanelProps {
  result: ExecutionResult | null;
  isRunning: boolean;
  onClear: () => void;
}

export default function OutputPanel({ result, isRunning, onClear }: OutputPanelProps) {
  const [activeTab, setActiveTab] = useState<"output" | "errors" | "logs">("output");

  return (
    <div className="w-80 lg:w-96 bg-[#121215] border-l border-white/10 flex flex-col h-full select-none text-xs font-medium">
      {/* Tab Header */}
      <div className="p-2 border-b border-white/10 flex items-center justify-between bg-[#16161a]">
        <div className="flex gap-1">
          <button
            onClick={() => setActiveTab("output")}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-colors cursor-pointer ${
              activeTab === "output" ? "bg-cyan-500/20 text-cyan-400 border border-cyan-500/30" : "text-gray-400 hover:text-white"
            }`}
          >
            Output
          </button>
          <button
            onClick={() => setActiveTab("errors")}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-colors cursor-pointer ${
              activeTab === "errors" ? "bg-red-500/20 text-red-400 border border-red-500/30" : "text-gray-400 hover:text-white"
            }`}
          >
            Errors
          </button>
          <button
            onClick={() => setActiveTab("logs")}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-colors cursor-pointer ${
              activeTab === "logs" ? "bg-purple-500/20 text-purple-400 border border-purple-500/30" : "text-gray-400 hover:text-white"
            }`}
          >
            Logs
          </button>
        </div>

        <button
          onClick={onClear}
          className="p-1.5 text-gray-500 hover:text-white hover:bg-white/5 rounded-lg transition-colors cursor-pointer"
          title="Clear Output Console"
        >
          <RotateCcw className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Execution Status Metrics Badge */}
      {result && (
        <div className="p-3 border-b border-white/5 bg-[#18181c] grid grid-cols-3 gap-2 text-center font-mono">
          <div className="p-2 rounded-xl bg-white/5 border border-white/5">
            <div className="text-[10px] text-gray-500 flex items-center justify-center gap-1">
              <Clock className="w-3 h-3 text-cyan-400" /> Time
            </div>
            <div className="text-xs font-bold text-white mt-0.5">{result.time}</div>
          </div>
          <div className="p-2 rounded-xl bg-white/5 border border-white/5">
            <div className="text-[10px] text-gray-500 flex items-center justify-center gap-1">
              <Cpu className="w-3 h-3 text-indigo-400" /> Memory
            </div>
            <div className="text-xs font-bold text-white mt-0.5">{result.memory}</div>
          </div>
          <div className="p-2 rounded-xl bg-white/5 border border-white/5">
            <div className="text-[10px] text-gray-500">Exit Code</div>
            <div className={`text-xs font-bold mt-0.5 ${result.exitCode === 0 ? "text-green-400" : "text-red-400"}`}>
              {result.exitCode}
            </div>
          </div>
        </div>
      )}

      {/* Main Content Pane */}
      <div className="flex-1 p-4 overflow-y-auto font-mono leading-relaxed text-xs">
        {isRunning ? (
          <div className="flex flex-col items-center justify-center h-full text-gray-400 space-y-3">
            <div className="w-6 h-6 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin" />
            <span className="text-xs">Compiling & Executing Source Code...</span>
          </div>
        ) : activeTab === "output" ? (
          result ? (
            <pre className="text-green-400 whitespace-pre-wrap">{result.stdout}</pre>
          ) : (
            <div className="text-gray-600 italic">Click &quot;Run Code&quot; (⌘↵) to execute your program and view stdout output...</div>
          )
        ) : activeTab === "errors" ? (
          result?.stderr ? (
            <pre className="text-red-400 whitespace-pre-wrap">{result.stderr}</pre>
          ) : (
            <div className="text-gray-600 italic">No compilation or runtime errors detected.</div>
          )
        ) : (
          <div className="text-gray-400 space-y-1 text-[11px]">
            <div>[00:00:01] Container environment initialized.</div>
            <div>[00:00:02] Compiler GCC 13.2 target set to x86_64.</div>
            {result && <div>[00:00:03] Process returned {result.exitCode} in {result.time}.</div>}
          </div>
        )}
      </div>
    </div>
  );
}
