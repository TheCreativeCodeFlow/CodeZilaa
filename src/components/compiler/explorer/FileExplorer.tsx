"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FileCode,
  Folder,
  FolderOpen,
  ChevronDown,
  ChevronRight,
  Plus,
  Search,
  BookOpen,
  Sparkles,
  FileText,
} from "lucide-react";
import { IDEFile, SupportedLanguage } from "../types/compilerTypes";

interface FileExplorerProps {
  files: IDEFile[];
  activeFileId: string;
  onSelectFile: (id: string) => void;
  onNewFile: (name: string, lang: SupportedLanguage) => void;
  onSelectTemplate: (lang: SupportedLanguage) => void;
}

export default function FileExplorer({
  files,
  activeFileId,
  onSelectFile,
  onNewFile,
  onSelectTemplate,
}: FileExplorerProps) {
  const [search, setSearch] = useState("");
  const [openSections, setOpenSections] = useState({
    files: true,
    templates: true,
    snippets: false,
  });
  const [showNewFileInput, setShowNewFileInput] = useState(false);
  const [newFileName, setNewFileName] = useState("");

  const toggleSection = (key: keyof typeof openSections) => {
    setOpenSections((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleCreateFile = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFileName.trim()) return;
    let lang: SupportedLanguage = "cpp";
    if (newFileName.endsWith(".java")) lang = "java";
    if (newFileName.endsWith(".py")) lang = "python";
    if (newFileName.endsWith(".c")) lang = "c";

    onNewFile(newFileName.trim(), lang);
    setNewFileName("");
    setShowNewFileInput(false);
  };

  const filteredFiles = files.filter((f) =>
    f.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="w-60 bg-[#121215] border-r border-white/10 flex flex-col h-full select-none text-xs font-medium">
      {/* Header bar */}
      <div className="p-3 border-b border-white/10 flex items-center justify-between">
        <span className="font-bold text-white text-xs tracking-wide uppercase">Explorer</span>
        <button
          onClick={() => setShowNewFileInput(true)}
          className="p-1 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white transition-colors cursor-pointer"
          title="New Source File"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>

      {/* Search Input */}
      <div className="p-2 border-b border-white/5">
        <div className="relative">
          <Search className="w-3.5 h-3.5 text-gray-500 absolute left-2.5 top-2.5" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search files..."
            className="w-full pl-8 pr-2 py-1.5 bg-[#18181c] border border-white/5 rounded-lg text-white text-xs placeholder-gray-500 focus:outline-none focus:border-cyan-400/50"
          />
        </div>
      </div>

      {/* Tree Sections */}
      <div className="flex-1 overflow-y-auto p-2 space-y-2">
        {/* Current Workspace Files */}
        <div>
          <button
            onClick={() => toggleSection("files")}
            className="w-full flex items-center gap-1.5 py-1 text-gray-400 hover:text-white font-semibold cursor-pointer"
          >
            {openSections.files ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
            <FolderOpen className="w-3.5 h-3.5 text-cyan-400" />
            <span>Workspace Files</span>
          </button>

          <AnimatePresence>
            {openSections.files && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="pl-4 space-y-0.5 pt-1 overflow-hidden"
              >
                {showNewFileInput && (
                  <form onSubmit={handleCreateFile} className="py-1">
                    <input
                      type="text"
                      value={newFileName}
                      onChange={(e) => setNewFileName(e.target.value)}
                      placeholder="solution.cpp"
                      className="w-full px-2 py-1 bg-[#18181c] border border-cyan-400 rounded text-xs text-white focus:outline-none"
                      autoFocus
                    />
                  </form>
                )}

                {filteredFiles.map((file) => {
                  const isActive = file.id === activeFileId;
                  return (
                    <div
                      key={file.id}
                      onClick={() => onSelectFile(file.id)}
                      className={`flex items-center justify-between px-2.5 py-1.5 rounded-lg cursor-pointer transition-colors ${
                        isActive
                          ? "bg-cyan-500/20 text-white font-semibold border border-cyan-400/30"
                          : "text-gray-400 hover:text-white hover:bg-white/5"
                      }`}
                    >
                      <div className="flex items-center gap-2 truncate">
                        <FileCode className={`w-3.5 h-3.5 shrink-0 ${isActive ? "text-cyan-400" : "text-gray-500"}`} />
                        <span className="truncate">{file.name}</span>
                      </div>
                      {file.isUnsaved && <span className="text-cyan-400 text-xs font-bold">•</span>}
                    </div>
                  );
                })}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Templates Section */}
        <div>
          <button
            onClick={() => toggleSection("templates")}
            className="w-full flex items-center gap-1.5 py-1 text-gray-400 hover:text-white font-semibold cursor-pointer"
          >
            {openSections.templates ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
            <Sparkles className="w-3.5 h-3.5 text-purple-400" />
            <span>Starter Templates</span>
          </button>

          <AnimatePresence>
            {openSections.templates && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="pl-4 space-y-1 pt-1 overflow-hidden"
              >
                {[
                  { name: "C++ Competitive Template", lang: "cpp" },
                  { name: "Java Solution Boilerplate", lang: "java" },
                  { name: "Python Interview Setup", lang: "python" },
                ].map((tpl, i) => (
                  <div
                    key={i}
                    onClick={() => onSelectTemplate(tpl.lang as SupportedLanguage)}
                    className="px-2.5 py-1.5 rounded-lg text-gray-400 hover:text-purple-300 hover:bg-purple-500/10 cursor-pointer transition-colors text-[11px] truncate"
                  >
                    ⚡ {tpl.name}
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
