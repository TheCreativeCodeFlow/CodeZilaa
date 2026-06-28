"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Play,
  Sparkles,
  Download,
  MoreHorizontal,
  Wand2,
  Copy,
  Share2,
  RotateCcw,
  Settings,
  HelpCircle,
  Code2,
  ArrowLeft,
  Loader2,
  Check,
  Maximize2,
  Minimize2,
} from "lucide-react";
import { SupportedLanguage } from "../types/compilerTypes";

interface IDEToolbarProps {
  problemTitle: string;
  difficulty: "Easy" | "Medium" | "Hard";
  topic: string;
  language: SupportedLanguage;
  onLanguageChange: (lang: SupportedLanguage) => void;
  onRun: () => void;
  onVisualize: () => void;
  onFormat: () => void;
  onSave: () => void;
  onDownload: () => void;
  onReset: () => void;
  isRunning: boolean;
}

export default function IDEToolbar({
  problemTitle,
  difficulty,
  topic,
  language,
  onLanguageChange,
  onRun,
  onVisualize,
  onFormat,
  onSave,
  onDownload,
  onReset,
  isRunning,
}: IDEToolbarProps) {
  const [moreOpen, setMoreOpen] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);
  const [copiedShare, setCopiedShare] = useState(false);
  const moreRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (moreRef.current && !moreRef.current.contains(e.target as Node)) {
        setMoreOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleCopyCode = () => {
    onSave();
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedShare(true);
    setTimeout(() => setCopiedShare(false), 2000);
  };

  return (
    <div className="h-14 bg-[#0c0c0e] border-b border-white/10 px-4 flex items-center justify-between select-none text-xs font-medium z-30">
      {/* Left Section: Back Link, Studio Brand & Problem Information */}
      <div className="flex items-center gap-3">
        <Link
          href="/workspace"
          className="px-2.5 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white transition-all flex items-center gap-1.5 text-xs font-semibold cursor-pointer border border-white/5"
        >
          <ArrowLeft className="w-4 h-4 text-cyan-400" />
          <span className="hidden sm:inline">Workspace</span>
        </Link>

        <div className="h-4 w-px bg-white/10 hidden sm:block" />

        {/* Problem Title & Badges */}
        <div className="flex items-center gap-2.5">
          <h1 className="text-sm sm:text-base font-extrabold text-white tracking-tight truncate max-w-xs sm:max-w-md">
            {problemTitle}
          </h1>
          <span
            className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider ${
              difficulty === "Hard"
                ? "bg-red-500/15 text-red-400 border border-red-500/30"
                : difficulty === "Medium"
                ? "bg-yellow-500/15 text-yellow-400 border border-yellow-500/30"
                : "bg-green-500/15 text-green-400 border border-green-500/30"
            }`}
          >
            {difficulty}
          </span>
          <span className="hidden md:inline-block px-2.5 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 text-[10px] font-mono font-semibold">
            {topic}
          </span>
        </div>
      </div>

      {/* Right Section: Essential Actions & More Dropdown */}
      <div className="flex items-center gap-2">
        {/* Language Selector */}
        <select
          value={language}
          onChange={(e) => onLanguageChange(e.target.value as SupportedLanguage)}
          className="px-3 py-1.5 bg-[#16161a] border border-white/10 rounded-xl text-white font-mono focus:outline-none focus:border-cyan-400 cursor-pointer hover:border-white/20 transition-colors"
        >
          <option value="cpp">C++ (GCC 13.2)</option>
          <option value="java">Java 21 (OpenJDK)</option>
          <option value="python">Python 3.12</option>
          <option value="c">C (GCC 13.2)</option>
        </select>

        {/* Run Code */}
        <button
          onClick={onRun}
          disabled={isRunning}
          className="px-4 py-1.5 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white font-bold shadow-lg shadow-cyan-500/25 active:scale-95 transition-all flex items-center gap-2 cursor-pointer disabled:opacity-60"
        >
          {isRunning ? (
            <>
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
              <span>Compiling...</span>
            </>
          ) : (
            <>
              <Play className="w-3.5 h-3.5 fill-white" />
              <span>Run Code</span>
              <kbd className="hidden sm:inline-block ml-1 px-1.5 py-0.5 text-[9px] font-mono font-semibold bg-black/30 rounded">
                ⌘↵
              </kbd>
            </>
          )}
        </button>

        {/* Visualize Execution */}
        <button
          onClick={onVisualize}
          className="px-3.5 py-1.5 rounded-xl bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/30 text-purple-300 font-semibold hover:text-white transition-all flex items-center gap-1.5 cursor-pointer"
        >
          <Sparkles className="w-3.5 h-3.5 text-purple-400" />
          <span className="hidden sm:inline">Visualize</span>
        </button>

        {/* Download Code */}
        <button
          onClick={onDownload}
          className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white transition-colors flex items-center gap-1.5 cursor-pointer border border-white/5"
          title={`Download Solution (${language === "cpp" ? ".cpp" : language === "java" ? ".java" : language === "python" ? ".py" : ".c"})`}
        >
          <Download className="w-3.5 h-3.5 text-cyan-400" />
          <span className="hidden lg:inline">Download</span>
        </button>

        {/* More Actions (...) Dropdown */}
        <div className="relative" ref={moreRef}>
          <button
            onClick={() => setMoreOpen(!moreOpen)}
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white transition-colors cursor-pointer border border-white/5"
            title="More Actions"
          >
            <MoreHorizontal className="w-4 h-4" />
          </button>

          <AnimatePresence>
            {moreOpen && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                transition={{ duration: 0.15 }}
                className="absolute right-0 mt-2 w-56 bg-[#141418] border border-white/10 rounded-2xl shadow-2xl p-2 z-50 overflow-hidden text-xs space-y-0.5"
              >
                <button
                  onClick={() => { onFormat(); setMoreOpen(false); }}
                  className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-gray-300 hover:text-white hover:bg-white/10 transition-colors text-left cursor-pointer"
                >
                  <Wand2 className="w-4 h-4 text-indigo-400" />
                  <span>Format Code (Ctrl+Shift+F)</span>
                </button>

                <button
                  onClick={() => { handleCopyCode(); setMoreOpen(false); }}
                  className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-gray-300 hover:text-white hover:bg-white/10 transition-colors text-left cursor-pointer"
                >
                  {copiedCode ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4 text-cyan-400" />}
                  <span>{copiedCode ? "Copied!" : "Copy Code to Clipboard"}</span>
                </button>

                <button
                  onClick={() => { handleShare(); setMoreOpen(false); }}
                  className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-gray-300 hover:text-white hover:bg-white/10 transition-colors text-left cursor-pointer"
                >
                  {copiedShare ? <Check className="w-4 h-4 text-green-400" /> : <Share2 className="w-4 h-4 text-purple-400" />}
                  <span>{copiedShare ? "Link Copied!" : "Share Solution URL"}</span>
                </button>

                <div className="border-t border-white/5 my-1" />

                <button
                  onClick={() => { onReset(); setMoreOpen(false); }}
                  className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-yellow-400 hover:bg-yellow-500/10 transition-colors text-left cursor-pointer"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Reset to Starter Template</span>
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
