export type SupportedLanguage = "cpp" | "java" | "python" | "c";

export interface IDEFile {
  id: string;
  name: string;
  language: SupportedLanguage;
  content: string;
  isUnsaved?: boolean;
  isPinned?: boolean;
}

export interface TestCase {
  id: string;
  input: string;
  expectedOutput: string;
  actualOutput?: string;
  status?: "passed" | "failed" | "running" | "untested";
  time?: string;
}

export interface ExecutionResult {
  stdout: string;
  stderr: string;
  exitCode: number;
  time: string;
  memory: string;
  status: "success" | "compilation_error" | "runtime_error" | "time_limit_exceeded";
  testCases?: TestCase[];
}

export interface IDESettings {
  fontSize: number;
  tabSize: number;
  wordWrap: boolean;
  minimap: boolean;
  autoSave: boolean;
  theme: "vs-dark" | "one-dark" | "cyberpunk";
}
