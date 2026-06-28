"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Code2,
  Cpu,
  MapPin,
  BookOpen,
  BarChart3,
  User,
  Settings,
  ArrowRight,
  Terminal,
  FileCode,
} from "lucide-react";
import { useWorkspace } from "@/context/WorkspaceContext";

export default function CommandPalette() {
  const { commandPaletteOpen, setCommandPaletteOpen } = useWorkspace();
  const [query, setQuery] = useState("");
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setCommandPaletteOpen((prev) => !prev);
      }
      if (e.key === "Escape" && commandPaletteOpen) {
        setCommandPaletteOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [commandPaletteOpen, setCommandPaletteOpen]);

  useEffect(() => {
    if (commandPaletteOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery("");
    }
  }, [commandPaletteOpen]);

  const items = [
    { title: "Home Dashboard", category: "Navigation", href: "/workspace", icon: <Code2 className="w-4 h-4 text-cyan-400" /> },
    { title: "Coding Practice Studio", category: "Practice", href: "/workspace/practice", icon: <FileCode className="w-4 h-4 text-indigo-400" /> },
    { title: "Code Studio (IDE)", category: "Tools", href: "/studio", icon: <Terminal className="w-4 h-4 text-green-400" /> },
    { title: "Code Visualizer", category: "Tools", href: "/visualizer", icon: <Cpu className="w-4 h-4 text-purple-400" /> },
    { title: "Placement Roadmaps", category: "Learning", href: "/workspace/roadmaps", icon: <MapPin className="w-4 h-4 text-yellow-400" /> },
    { title: "Aptitude & Reasoning", category: "Learning", href: "/workspace/aptitude", icon: <BookOpen className="w-4 h-4 text-pink-400" /> },
    { title: "Analytics & Progress", category: "Analytics", href: "/workspace/progress", icon: <BarChart3 className="w-4 h-4 text-blue-400" /> },
    { title: "User Profile", category: "Account", href: "/workspace/profile", icon: <User className="w-4 h-4 text-amber-400" /> },
    { title: "Workspace Settings", category: "Account", href: "/workspace/settings", icon: <Settings className="w-4 h-4 text-gray-400" /> },
  ];

  const filteredItems = items.filter((item) =>
    item.title.toLowerCase().includes(query.toLowerCase()) ||
    item.category.toLowerCase().includes(query.toLowerCase())
  );

  const handleSelect = (href: string) => {
    setCommandPaletteOpen(false);
    router.push(href);
  };

  return (
    <AnimatePresence>
      {commandPaletteOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setCommandPaletteOpen(false)}
            className="absolute inset-0 bg-black/75 backdrop-blur-md"
          />

          {/* Dialog Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ type: "spring", duration: 0.4, bounce: 0.2 }}
            className="relative w-full max-w-2xl bg-[#121215] border border-white/10 rounded-2xl shadow-2xl shadow-cyan-500/10 overflow-hidden z-10"
          >
            {/* Search Input Bar */}
            <div className="flex items-center px-4 py-3.5 border-b border-white/10 bg-[#16161a]">
              <Search className="w-5 h-5 text-gray-400 mr-3 shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Type a command or search workspace... (e.g., Compiler, Roadmap)"
                className="w-full bg-transparent text-white placeholder-gray-500 text-sm focus:outline-none"
              />
              <kbd className="hidden sm:inline-block px-2 py-0.5 text-[10px] font-mono font-semibold text-gray-400 bg-white/5 border border-white/10 rounded-md">
                ESC
              </kbd>
            </div>

            {/* Results List */}
            <div className="p-2 max-h-96 overflow-y-auto space-y-1">
              {filteredItems.length > 0 ? (
                filteredItems.map((item, index) => (
                  <div
                    key={index}
                    onClick={() => handleSelect(item.href)}
                    className="flex items-center justify-between p-3 rounded-xl hover:bg-white/10 transition-colors cursor-pointer group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-black/40 border border-white/5 group-hover:border-cyan-500/30 transition-colors">
                        {item.icon}
                      </div>
                      <div>
                        <div className="text-sm font-medium text-white group-hover:text-cyan-400 transition-colors">
                          {item.title}
                        </div>
                        <div className="text-[10px] text-gray-500 font-mono uppercase tracking-wider">
                          {item.category}
                        </div>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-gray-500 group-hover:text-cyan-400 group-hover:translate-x-1 transition-all" />
                  </div>
                ))
              ) : (
                <div className="py-12 text-center text-sm text-gray-500">
                  No commands or topics found for &quot;{query}&quot;
                </div>
              )}
            </div>

            {/* Footer tips */}
            <div className="px-4 py-2.5 bg-[#0e0e10] border-t border-white/5 flex items-center justify-between text-[11px] text-gray-500 font-mono">
              <span>Navigation Shortcuts</span>
              <div className="flex items-center gap-3">
                <span><kbd className="px-1.5 py-0.5 bg-white/5 rounded">↑↓</kbd> Navigate</span>
                <span><kbd className="px-1.5 py-0.5 bg-white/5 rounded">↵</kbd> Select</span>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
