"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircle2,
  Circle,
  Sparkles,
  Trophy,
  Target,
  FileText,
  ChevronRight,
  ChevronLeft,
  Calendar,
  Zap,
} from "lucide-react";
import { useWorkspace } from "@/context/WorkspaceContext";

export default function RightContextPanel() {
  const { rightPanelOpen, setRightPanelOpen } = useWorkspace();

  const [tasks, setTasks] = useState([
    { id: 1, text: "Solve 2 Graph Algorithms (BFS/DFS)", completed: true },
    { id: 2, text: "Revise Sliding Window Techniques", completed: false },
    { id: 3, text: "Complete Mock Aptitude Quiz #4", completed: false },
  ]);

  const [note, setNote] = useState("Focus on space complexity optimizations for Dynamic Programming state arrays today.");

  const toggleTask = (id: number) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  return (
    <aside className="relative select-none">
      {/* Desktop Floating Right Panel */}
      <motion.div
        animate={{ width: rightPanelOpen ? 300 : 0, opacity: rightPanelOpen ? 1 : 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="hidden xl:flex flex-col h-[calc(100vh-4rem)] sticky top-16 bg-[#0c0c0e]/80 backdrop-blur-xl border-l border-white/10 p-4 space-y-6 overflow-y-auto"
      >
        {rightPanelOpen && (
          <>
            {/* Today's Goals Widget */}
            <div className="bg-[#121215] border border-white/10 rounded-2xl p-4 shadow-lg">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-xs font-bold text-white flex items-center gap-2">
                  <Target className="w-4 h-4 text-cyan-400" /> Today&apos;s Targets
                </h3>
                <span className="text-[10px] text-gray-500 font-mono">
                  {tasks.filter((t) => t.completed).length}/{tasks.length} Done
                </span>
              </div>
              <div className="space-y-2.5">
                {tasks.map((task) => (
                  <div
                    key={task.id}
                    onClick={() => toggleTask(task.id)}
                    className="flex items-start gap-2.5 p-2 rounded-xl bg-white/5 hover:bg-white/10 transition-colors cursor-pointer text-xs"
                  >
                    {task.completed ? (
                      <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                    ) : (
                      <Circle className="w-4 h-4 text-gray-500 shrink-0 mt-0.5" />
                    )}
                    <span className={`text-gray-300 leading-tight ${task.completed ? "line-through opacity-60" : ""}`}>
                      {task.text}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Placement Tip Widget */}
            <div className="bg-gradient-to-br from-indigo-500/10 via-[#121215] to-cyan-500/10 border border-indigo-500/20 rounded-2xl p-4 shadow-lg">
              <div className="flex items-center gap-2 text-xs font-bold text-indigo-400 mb-2">
                <Sparkles className="w-4 h-4" /> Daily Placement Tip
              </div>
              <p className="text-xs text-gray-300 leading-relaxed italic">
                &quot;When asked a system design question, always clarify scale requirements (QPS, storage) before picking storage components.&quot;
              </p>
            </div>

            {/* Quick Scratch Notes Widget */}
            <div className="bg-[#121215] border border-white/10 rounded-2xl p-4 shadow-lg">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-xs font-bold text-white flex items-center gap-2">
                  <FileText className="w-4 h-4 text-purple-400" /> Scratchpad
                </h3>
                <span className="text-[10px] text-gray-500 font-mono">Auto-saved</span>
              </div>
              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                rows={3}
                className="w-full bg-[#18181c] border border-white/5 rounded-xl p-2.5 text-xs text-gray-300 placeholder-gray-500 focus:outline-none focus:border-purple-400/50 transition-all resize-none"
                placeholder="Write quick formulas or interview notes here..."
              />
            </div>

            {/* Upcoming Milestones */}
            <div className="bg-[#121215] border border-white/10 rounded-2xl p-4 shadow-lg space-y-3">
              <h3 className="text-xs font-bold text-white flex items-center gap-2">
                <Calendar className="w-4 h-4 text-amber-400" /> Upcoming Milestones
              </h3>
              <div className="p-2.5 rounded-xl bg-white/5 border border-white/5 flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
                  <Zap className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-white">Amazon OA Mock Test</div>
                  <div className="text-[10px] text-gray-400">In 2 Days • 90 Mins</div>
                </div>
              </div>
            </div>
          </>
        )}
      </motion.div>
    </aside>
  );
}
