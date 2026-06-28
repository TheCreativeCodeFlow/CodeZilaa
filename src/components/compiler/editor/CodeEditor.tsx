"use client";

import { useState, useRef, useEffect } from "react";
import { Search, ZoomIn, ZoomOut, Eye, X, Check } from "lucide-react";
import { SupportedLanguage } from "../types/compilerTypes";

interface CodeEditorProps {
  code: string;
  language: SupportedLanguage;
  onChange: (newCode: string) => void;
  fontSize: number;
  onFontSizeChange: (size: number) => void;
  onCursorChange?: (line: number, col: number) => void;
}

export default function CodeEditor({
  code,
  language,
  onChange,
  fontSize,
  onFontSizeChange,
  onCursorChange,
}: CodeEditorProps) {
  const [showSearch, setShowSearch] = useState(false);
  const [findText, setFindText] = useState("");
  const [replaceText, setReplaceText] = useState("");
  const [showMinimap, setShowMinimap] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const lines = code.split("\n");

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "f") {
      e.preventDefault();
      setShowSearch(true);
    }
    if (e.key === "Tab") {
      e.preventDefault();
      const target = e.currentTarget;
      const start = target.selectionStart;
      const end = target.selectionEnd;
      const updated = code.substring(0, start) + "    " + code.substring(end);
      onChange(updated);
      setTimeout(() => {
        target.selectionStart = target.selectionEnd = start + 4;
      }, 0);
    }
  };

  const handleSelectionChange = () => {
    if (!textareaRef.current || !onCursorChange) return;
    const pos = textareaRef.current.selectionStart;
    const textUpToCursor = code.substring(0, pos);
    const line = textUpToCursor.split("\n").length;
    const lastLineStart = textUpToCursor.lastIndexOf("\n") + 1;
    const col = pos - lastLineStart + 1;
    onCursorChange(line, col);
  };

  const handleReplace = () => {
    if (!findText) return;
    const updated = code.replaceAll(findText, replaceText);
    onChange(updated);
  };

  return (
    <div className="relative flex-1 bg-[#0d0d10] flex flex-col h-full overflow-hidden font-mono select-none">
      {/* Search Overlay Bar */}
      {showSearch && (
        <div className="absolute top-3 right-6 z-30 bg-[#18181c] border border-cyan-500/40 rounded-xl p-2.5 shadow-2xl flex items-center gap-2 text-xs">
          <Search className="w-4 h-4 text-cyan-400 shrink-0" />
          <input
            type="text"
            value={findText}
            onChange={(e) => setFindText(e.target.value)}
            placeholder="Find..."
            className="w-32 px-2 py-1 bg-[#121215] border border-white/10 rounded text-white focus:outline-none text-xs"
            autoFocus
          />
          <input
            type="text"
            value={replaceText}
            onChange={(e) => setReplaceText(e.target.value)}
            placeholder="Replace..."
            className="w-32 px-2 py-1 bg-[#121215] border border-white/10 rounded text-white focus:outline-none text-xs"
          />
          <button
            onClick={handleReplace}
            className="px-2 py-1 bg-cyan-500/20 text-cyan-400 hover:bg-cyan-500/30 rounded font-semibold text-[11px] cursor-pointer"
          >
            Replace All
          </button>
          <button
            onClick={() => setShowSearch(false)}
            className="p-1 text-gray-400 hover:text-white cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Main Editor Canvas */}
      <div className="flex-1 flex overflow-hidden relative">
        {/* Line Numbers Gutter */}
        <div
          className="bg-[#09090b] text-gray-600 text-right py-3 pr-4 pl-3 select-none border-r border-white/5 font-mono"
          style={{ fontSize: `${fontSize}px`, lineHeight: "1.6" }}
        >
          {lines.map((_, i) => (
            <div key={i} className="leading-relaxed hover:text-gray-400 transition-colors">
              {i + 1}
            </div>
          ))}
        </div>

        {/* Textarea Code Input Area */}
        <div className="flex-1 relative overflow-auto py-3 px-4">
          <textarea
            ref={textareaRef}
            value={code}
            onChange={(e) => onChange(e.target.value)}
            onKeyDown={handleKeyDown}
            onKeyUp={handleSelectionChange}
            onClick={handleSelectionChange}
            className="w-full h-full bg-transparent text-gray-200 focus:outline-none resize-none leading-relaxed font-mono whitespace-pre selection:bg-cyan-500/30"
            style={{ fontSize: `${fontSize}px`, lineHeight: "1.6" }}
            spellCheck={false}
          />
        </div>

        {/* Minimap Simulation (Right edge) */}
        {showMinimap && (
          <div className="w-20 bg-[#09090b] border-l border-white/5 p-1 hidden md:block overflow-hidden opacity-40 pointer-events-none select-none">
            <div className="text-[4px] font-mono text-gray-500 leading-none space-y-0.5 truncate">
              {lines.map((l, i) => (
                <div key={i} className="truncate">{l || " "}</div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
