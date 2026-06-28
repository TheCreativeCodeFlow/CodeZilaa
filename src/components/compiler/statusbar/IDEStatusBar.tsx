"use client";

import { ZoomIn, ZoomOut, Zap, CheckCircle2 } from "lucide-react";

interface IDEStatusBarProps {
  cursorLine: number;
  cursorCol: number;
  fontSize: number;
  onFontSizeChange: (size: number) => void;
}

export default function IDEStatusBar({
  cursorLine,
  cursorCol,
  fontSize,
  onFontSizeChange,
}: IDEStatusBarProps) {
  return (
    <div className="h-6 bg-[#0a0a0c] border-t border-white/5 px-3 flex items-center justify-between text-[11px] text-gray-500 font-mono select-none z-20">
      {/* Left Section: Status & Encoding */}
      <div className="flex items-center gap-4">
        <span className="flex items-center gap-1 text-green-400 font-semibold">
          <Zap className="w-3 h-3 fill-green-400" /> Cloud Compiler Ready
        </span>
        <span className="hidden sm:inline">UTF-8</span>
        <span className="hidden sm:inline">Spaces: 4</span>
      </div>

      {/* Right Section: Cursor Pos & Zoom */}
      <div className="flex items-center gap-4">
        <span>Ln {cursorLine}, Col {cursorCol}</span>

        <div className="flex items-center gap-1 pl-2 border-l border-white/10">
          <button
            onClick={() => onFontSizeChange(Math.max(10, fontSize - 1))}
            className="p-0.5 hover:text-white cursor-pointer"
            title="Decrease Font Size"
          >
            <ZoomOut className="w-3 h-3" />
          </button>
          <span>{fontSize}px</span>
          <button
            onClick={() => onFontSizeChange(Math.min(24, fontSize + 1))}
            className="p-0.5 hover:text-white cursor-pointer"
            title="Increase Font Size"
          >
            <ZoomIn className="w-3 h-3" />
          </button>
        </div>
      </div>
    </div>
  );
}
