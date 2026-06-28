"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import IDEToolbar from "@/components/compiler/toolbar/IDEToolbar";
import CodeEditor from "@/components/compiler/editor/CodeEditor";
import OutputPanel from "@/components/compiler/output/OutputPanel";
import ExecutionPanel from "@/components/compiler/bottom-panel/ExecutionPanel";
import IDEStatusBar from "@/components/compiler/statusbar/IDEStatusBar";
import { CompilerService } from "@/components/compiler/services/compilerService";
import { SupportedLanguage, ExecutionResult, TestCase } from "@/components/compiler/types/compilerTypes";

const PROBLEM_INFO = {
  title: "Trapping Rain Water",
  difficulty: "Hard" as const,
  topic: "Dynamic Programming",
};

const INITIAL_TEST_CASES: TestCase[] = [
  { id: "tc1", input: "6\n12 5 8 19 3 27", expectedOutput: "3 5 8 12 19 27", status: "untested" },
  { id: "tc2", input: "4\n15 3 9 24", expectedOutput: "3 9 15 24", status: "untested" },
];

export default function StudioPage() {
  const router = useRouter();
  const [language, setLanguage] = useState<SupportedLanguage>("cpp");
  const [code, setCode] = useState<string>(CompilerService.getTemplate("cpp"));
  const [customInput, setCustomInput] = useState<string>("");
  const [testCases, setTestCases] = useState<TestCase[]>(INITIAL_TEST_CASES);
  const [executionResult, setExecutionResult] = useState<ExecutionResult | null>(null);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [fontSize, setFontSize] = useState<number>(13);
  const [cursorPos, setCursorPos] = useState({ line: 1, col: 1 });

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
  }, [code, language, customInput, testCases]);

  const handleLanguageChange = (newLang: SupportedLanguage) => {
    setLanguage(newLang);
    setCode(CompilerService.getTemplate(newLang));
  };

  const handleRunCode = async () => {
    setIsRunning(true);
    setExecutionResult(null);
    try {
      const result = await CompilerService.runCode(code, language, customInput, testCases);
      setExecutionResult(result);
      if (result.testCases) {
        setTestCases(result.testCases);
      }
    } finally {
      setIsRunning(false);
    }
  };

  const handleFormatCode = async () => {
    const formatted = await CompilerService.formatCode(code, language);
    setCode(formatted);
  };

  const handleSaveFile = () => {
    // Save to local storage mock
    localStorage.setItem("codezilaa_saved_code", code);
  };

  const handleDownloadFile = () => {
    const ext = language === "cpp" ? ".cpp" : language === "java" ? ".java" : language === "python" ? ".py" : ".c";
    const filename = `${PROBLEM_INFO.title.toLowerCase().replace(/\s+/g, "_")}${ext}`;
    const blob = new Blob([code], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleResetCode = () => {
    setCode(CompilerService.getTemplate(language));
    setExecutionResult(null);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="h-full flex flex-col bg-[#09090b] text-white overflow-hidden select-none"
    >
      {/* Top Streamlined IDE Toolbar */}
      <IDEToolbar
        problemTitle={PROBLEM_INFO.title}
        difficulty={PROBLEM_INFO.difficulty}
        topic={PROBLEM_INFO.topic}
        language={language}
        onLanguageChange={handleLanguageChange}
        onRun={handleRunCode}
        onFormat={handleFormatCode}
        onSave={handleSaveFile}
        onDownload={handleDownloadFile}
        onReset={handleResetCode}
        isRunning={isRunning}
      />

      {/* Main Studio 2-Column Focused Workbench (72% Editor / 28% Output) */}
      <div className="flex-1 flex overflow-hidden">
        {/* Center Hero Code Editor Column (72% Width) */}
        <div className="w-[72%] flex flex-col overflow-hidden border-r border-white/10">
          <CodeEditor
            code={code}
            language={language}
            onChange={(newCode) => setCode(newCode)}
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

        {/* Right Output Console Column (28% Width) */}
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
