"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import IDEToolbar from "@/components/compiler/toolbar/IDEToolbar";
import FileExplorer from "@/components/compiler/explorer/FileExplorer";
import CodeEditor from "@/components/compiler/editor/CodeEditor";
import OutputPanel from "@/components/compiler/output/OutputPanel";
import ExecutionPanel from "@/components/compiler/bottom-panel/ExecutionPanel";
import IDEStatusBar from "@/components/compiler/statusbar/IDEStatusBar";
import { CompilerService } from "@/components/compiler/services/compilerService";
import { IDEFile, SupportedLanguage, ExecutionResult, TestCase } from "@/components/compiler/types/compilerTypes";

const INITIAL_FILES: IDEFile[] = [
  {
    id: "1",
    name: "binary_search.cpp",
    language: "cpp",
    content: CompilerService.getTemplate("cpp"),
  },
  {
    id: "2",
    name: "Solution.java",
    language: "java",
    content: CompilerService.getTemplate("java"),
  },
];

const INITIAL_TEST_CASES: TestCase[] = [
  { id: "tc1", input: "6\n12 5 8 19 3 27", expectedOutput: "3 5 8 12 19 27", status: "untested" },
  { id: "tc2", input: "4\n15 3 9 24", expectedOutput: "3 9 15 24", status: "untested" },
];

export default function StudioPage() {
  const router = useRouter();
  const [files, setFiles] = useState<IDEFile[]>(INITIAL_FILES);
  const [activeFileId, setActiveFileId] = useState<string>("1");
  const [customInput, setCustomInput] = useState<string>("");
  const [testCases, setTestCases] = useState<TestCase[]>(INITIAL_TEST_CASES);
  const [executionResult, setExecutionResult] = useState<ExecutionResult | null>(null);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [fontSize, setFontSize] = useState<number>(13);
  const [cursorPos, setCursorPos] = useState({ line: 1, col: 1 });

  const activeFile = files.find((f) => f.id === activeFileId) || files[0];

  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
        e.preventDefault();
        handleRunCode();
      }
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "s") {
        e.preventDefault();
        handleSaveFile();
      }
    };
    window.addEventListener("keydown", handleGlobalKeyDown);
    return () => window.removeEventListener("keydown", handleGlobalKeyDown);
  }, [activeFile, customInput, testCases]);

  const handleCodeChange = (newCode: string) => {
    setFiles((prev) =>
      prev.map((f) => (f.id === activeFileId ? { ...f, content: newCode, isUnsaved: true } : f))
    );
  };

  const handleLanguageChange = (newLang: SupportedLanguage) => {
    const ext = newLang === "cpp" ? ".cpp" : newLang === "java" ? ".java" : newLang === "python" ? ".py" : ".c";
    const newName = activeFile.name.split(".")[0] + ext;
    const template = CompilerService.getTemplate(newLang);

    setFiles((prev) =>
      prev.map((f) => (f.id === activeFileId ? { ...f, language: newLang, name: newName, content: template, isUnsaved: true } : f))
    );
  };

  const handleRunCode = async () => {
    setIsRunning(true);
    setExecutionResult(null);
    try {
      const result = await CompilerService.runCode(activeFile.content, activeFile.language, customInput, testCases);
      setExecutionResult(result);
      if (result.testCases) {
        setTestCases(result.testCases);
      }
    } finally {
      setIsRunning(false);
    }
  };

  const handleFormatCode = async () => {
    const formatted = await CompilerService.formatCode(activeFile.content, activeFile.language);
    handleCodeChange(formatted);
  };

  const handleSaveFile = () => {
    setFiles((prev) =>
      prev.map((f) => (f.id === activeFileId ? { ...f, isUnsaved: false } : f))
    );
  };

  const handleDownloadFile = () => {
    const blob = new Blob([activeFile.content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = activeFile.name;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleNewFile = (name: string, lang: SupportedLanguage) => {
    const newFile: IDEFile = {
      id: Date.now().toString(),
      name,
      language: lang,
      content: CompilerService.getTemplate(lang),
      isUnsaved: false,
    };
    setFiles((prev) => [...prev, newFile]);
    setActiveFileId(newFile.id);
  };

  const handleSelectTemplate = (lang: SupportedLanguage) => {
    handleLanguageChange(lang);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.99 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="h-full flex flex-col bg-[#09090b] text-white overflow-hidden select-none"
    >
      {/* Top IDE Toolbar */}
      <IDEToolbar
        fileName={activeFile.name}
        isUnsaved={!!activeFile.isUnsaved}
        language={activeFile.language}
        onLanguageChange={handleLanguageChange}
        onRun={handleRunCode}
        onVisualize={() => router.push("/workspace/visualizer")}
        onFormat={handleFormatCode}
        onSave={handleSaveFile}
        onDownload={handleDownloadFile}
        isRunning={isRunning}
      />

      {/* Main IDE Workspace 3-Pane Grid */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Explorer */}
        <FileExplorer
          files={files}
          activeFileId={activeFileId}
          onSelectFile={(id) => setActiveFileId(id)}
          onNewFile={handleNewFile}
          onSelectTemplate={handleSelectTemplate}
        />

        {/* Center Editor & Bottom Panel Column */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <CodeEditor
            code={activeFile.content}
            language={activeFile.language}
            onChange={handleCodeChange}
            fontSize={fontSize}
            onFontSizeChange={setFontSize}
            onCursorChange={(line, col) => setCursorPos({ line, col })}
          />

          <ExecutionPanel
            customInput={customInput}
            onCustomInputChange={setCustomInput}
            testCases={testCases}
          />
        </div>

        {/* Right Output Panel */}
        <OutputPanel
          result={executionResult}
          isRunning={isRunning}
          onClear={() => setExecutionResult(null)}
        />
      </div>

      {/* Bottom IDE Status Bar */}
      <IDEStatusBar
        cursorLine={cursorPos.line}
        cursorCol={cursorPos.col}
        fontSize={fontSize}
        onFontSizeChange={setFontSize}
      />
    </motion.div>
  );
}
