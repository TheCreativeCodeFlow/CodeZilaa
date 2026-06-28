"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Play,
  Sparkles,
  Save,
  Download,
  Share2,
  Maximize2,
  Minimize2,
  Wand2,
  Loader2,
  Check,
  Code2,
  Terminal,
  ArrowLeft,
} from "lucide-react";
import { SupportedLanguage } from "../types/compilerTypes";

interface IDEToolbarProps {
  fileName: string;
  isUnsaved: boolean;
  language: SupportedLanguage;
  onLanguageChange: (lang: SupportedLanguage) => void;
  onRun: () => void;
  onVisualize: () => void;
  onFormat: () => void;
  onSave: () => void;
  onDownload: () => void;
  isRunning: boolean;
}

export default function IDEToolbar({
  fileName,
  isUnsaved,
  language,
  onLanguageChange,
  onRun,
  onVisualize,
  onFormat,
  onSave,
  onDownload,
  isRunning,
}: IDEToolbarProps) {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [copiedShare, setCopiedShare] = useState(false);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedShare(true);
    setTimeout(() => setCopiedShare(false), 2000);
  };

  return (
    <div className="h-13 bg-[#121215] border-b border-white/10 px-4 flex items-center justify-between select-none text-xs font-medium z-20">
      {/* Left section: Studio Brand, Exit Link & File Info */}
      <div className="flex items-center gap-3">
        {/* Brand Logo & Exit Button */}
        <div className="flex items-center gap-2 pr-3 border-r border-white/10">
          <Link
            href="/workspace"
            className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-colors flex items-center gap-1 text-[11px] font-medium"
            title="Exit Studio to Workspace"
          >
            <ArrowLeft className="w-4 h-4 text-cyan-400" />
            <span className="hidden lg:inline">Workspace</span>
          </Link>

          <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-cyan-500 to-indigo-600 p-0.5 shadow-sm">
            <div className="w-full h-full bg-[#090909] rounded-[6px] flex items-center justify-center">
              <Code2 className="w-3.5 h-3.5 text-cyan-400" />
            </div>
          </div>
          <span className="font-bold text-sm tracking-tight text-white hidden sm:inline-block">
            Studio
          </span>
        </div>

        {/* Active File Name */}
        <div className="flex items-center gap-2 px-2.5 py-1 rounded-lg bg-black/40 border border-white/10 text-gray-300">
          <Terminal className="w-3.5 h-3.5 text-cyan-400" />
          <span className="font-mono text-white font-semibold">{fileName}</span>
          {isUnsaved && <span className="text-cyan-400 font-bold text-sm leading-none">•</span>}
        </div>

        {/* Language Selector */}
        <select
          value={language}
          onChange={(e) => onLanguageChange(e.target.value as SupportedLanguage)}
          className="px-3 py-1.5 bg-[#18181c] border border-white/10 rounded-lg text-white font-mono focus:outline-none focus:border-cyan-400 cursor-pointer hover:border-white/20 transition-colors"
        >
          <option value="cpp">C++ (GCC 13.2)</option>
          <option value="java">Java 21 (OpenJDK)</option>
          <option value="python">Python 3.12</option>
          <option value="c">C (GCC 13.2)</option>
        </select>
      </div>

      {/* Center Section: Core Actions (Run & Visualize) */}
      <div className="flex items-center gap-2">
        <button
          onClick={onRun}
          disabled={isRunning}
          className="px-4 py-1.5 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white font-bold shadow-lg shadow-cyan-500/20 active:scale-95 transition-all flex items-center gap-2 cursor-pointer disabled:opacity-60"
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

        <button
          onClick={onVisualize}
          className="px-3.5 py-1.5 rounded-xl bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/30 text-purple-300 font-semibold hover:text-white transition-all flex items-center gap-1.5 cursor-pointer"
        >
          <Sparkles className="w-3.5 h-3.5 text-purple-400" />
          <span>Visualize Execution</span>
        </button>

        <button
          onClick={onFormat}
          className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white transition-colors flex items-center gap-1.5 cursor-pointer"
          title="Format Code (Ctrl+Shift+F)"
        >
          <Wand2 className="w-3.5 h-3.5 text-indigo-400" />
          <span className="hidden md:inline">Format</span>
        </button>
      </div>

      {/* Right Section: Utilities & Fullscreen */}
      <div className="flex items-center gap-1.5">
        <button
          onClick={onSave}
          className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
          title="Save File (Ctrl+S)"
        >
          <Save className="w-4 h-4" />
        </button>

        <button
          onClick={onDownload}
          className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
          title="Download Source File"
        >
          <Download className="w-4 h-4" />
        </button>

        <button
          onClick={handleShare}
          className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
          title="Share Snippet URL"
        >
          {copiedShare ? <Check className="w-4 h-4 text-green-400" /> : <Share2 className="w-4 h-4" />}
        </button>

        <div className="w-px h-4 bg-white/10 mx-1" />

        <button
          onClick={toggleFullscreen}
          className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
          title={isFullscreen ? "Exit Fullscreen" : "Fullscreen IDE"}
        >
          {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
        </button>
      </div>
    </div>
  );
}
