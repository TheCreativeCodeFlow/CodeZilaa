"use client";

import { useState } from "react";
import { Terminal, CheckCircle2, XCircle, ChevronUp, ChevronDown, Sparkles } from "lucide-react";
import { TestCase } from "../types/compilerTypes";

interface ExecutionPanelProps {
  customInput: string;
  onCustomInputChange: (input: string) => void;
  testCases: TestCase[];
}

export default function ExecutionPanel({
  customInput,
  onCustomInputChange,
  testCases,
}: ExecutionPanelProps) {
  const [activeTab, setActiveTab] = useState<"input" | "testcases">("input");
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="bg-[#121215] border-t border-white/10 flex flex-col select-none text-xs font-medium">
      {/* Drawer Header */}
      <div className="px-4 py-2 border-b border-white/5 flex items-center justify-between bg-[#16161a]">
        <div className="flex gap-2">
          <button
            onClick={() => { setActiveTab("input"); setCollapsed(false); }}
            className={`px-3 py-1 rounded-lg font-semibold transition-colors cursor-pointer ${
              activeTab === "input" && !collapsed ? "bg-cyan-500/20 text-cyan-400 border border-cyan-500/30" : "text-gray-400 hover:text-white"
            }`}
          >
            Custom Input (Stdin)
          </button>
          <button
            onClick={() => { setActiveTab("testcases"); setCollapsed(false); }}
            className={`px-3 py-1 rounded-lg font-semibold transition-colors cursor-pointer flex items-center gap-1.5 ${
              activeTab === "testcases" && !collapsed ? "bg-cyan-500/20 text-cyan-400 border border-cyan-500/30" : "text-gray-400 hover:text-white"
            }`}
          >
            <span>Test Cases</span>
            <span className="px-1.5 py-0.5 rounded-full bg-white/10 text-[10px] text-gray-300 font-mono">
              {testCases.length}
            </span>
          </button>
        </div>

        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-1 text-gray-400 hover:text-white transition-colors cursor-pointer"
          title={collapsed ? "Expand Panel" : "Collapse Panel"}
        >
          {collapsed ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>
      </div>

      {/* Drawer Body */}
      {!collapsed && (
        <div className="p-3 h-36 overflow-y-auto bg-[#0d0d10]">
          {activeTab === "input" ? (
            <textarea
              value={customInput}
              onChange={(e) => onCustomInputChange(e.target.value)}
              placeholder="Enter custom standard input tokens here (e.g. 5\n12 4 8 2 9)..."
              className="w-full h-full bg-transparent text-gray-200 font-mono focus:outline-none resize-none placeholder-gray-600 text-xs leading-relaxed"
              spellCheck={false}
            />
          ) : (
            <div className="space-y-2">
              {testCases.map((tc, idx) => (
                <div key={tc.id} className="flex items-center justify-between p-2.5 rounded-xl bg-[#18181c] border border-white/5 font-mono text-xs">
                  <div className="flex items-center gap-3">
                    <span className="text-gray-500">Case #{idx + 1}</span>
                    <span className="text-gray-300">Input: &quot;{tc.input}&quot;</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {tc.status === "passed" && (
                      <span className="px-2 py-0.5 rounded-full bg-green-500/10 text-green-400 border border-green-500/20 text-[10px] font-bold flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" /> Passed ({tc.time})
                      </span>
                    )}
                    {tc.status === "failed" && (
                      <span className="px-2 py-0.5 rounded-full bg-red-500/10 text-red-400 border border-red-500/20 text-[10px] font-bold flex items-center gap-1">
                        <XCircle className="w-3 h-3" /> Failed
                      </span>
                    )}
                    {(!tc.status || tc.status === "untested") && (
                      <span className="px-2 py-0.5 rounded-full bg-gray-800 text-gray-400 text-[10px]">Untested</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
