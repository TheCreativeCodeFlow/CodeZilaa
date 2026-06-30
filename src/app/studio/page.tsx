"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { AlertCircle } from "lucide-react";
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
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Restore state from visualizer context if coming back from visualizer
  useEffect(() => {
    const saved = sessionStorage.getItem("codezilaa_visualizer_context");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.code) setCode(parsed.code);
        if (parsed.language) setLanguage(parsed.language);
        if (parsed.customInput !== undefined) setCustomInput(parsed.customInput);
        if (parsed.cursorPos) setCursorPos(parsed.cursorPos);
        if (parsed.executionResult) setExecutionResult(parsed.executionResult);
        if (parsed.fontSize) setFontSize(parsed.fontSize);
        if (parsed.testCases) setTestCases(parsed.testCases);
      } catch (e) {
        console.error("Error restoring studio state from visualizer context", e);
      }
    }
  }, []);

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

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  const handleVisualize = () => {
    if (!executionResult) {
      showToast("Run your program successfully before opening the Execution Visualizer.");
      return;
    }

    if (executionResult.status !== "success") {
      if (executionResult.status === "compilation_error") {
        showToast("Compilation failed. Fix compilation errors before visualizing.");
      } else {
        showToast("Run your program successfully before opening the Execution Visualizer.");
      }
      return;
    }

    // Success! Save context and navigate
    const context = {
      code,
      language,
      customInput,
      executionResult,
      testCases,
      problemTitle: PROBLEM_INFO.title,
      difficulty: PROBLEM_INFO.difficulty,
      topic: PROBLEM_INFO.topic,
      timestamp: Date.now(),
      executionId: `exec_${Math.random().toString(36).substr(2, 9)}`,
      cursorPos,
      fontSize,
      hasExecuted: true,
    };

    sessionStorage.setItem("codezilaa_visualizer_context", JSON.stringify(context));
    router.push("/visualizer");
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
        onVisualize={handleVisualize}
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

      {/* Toast Notification for validation */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-20 right-8 z-50 flex items-center gap-3 px-5 py-3.5 bg-[#16161a] border border-red-500/40 rounded-2xl shadow-2xl shadow-red-500/20 text-white text-sm font-medium"
          >
            <div className="w-8 h-8 rounded-xl bg-red-500/20 flex items-center justify-center text-red-400">
              <AlertCircle className="w-5 h-5" />
            </div>
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
