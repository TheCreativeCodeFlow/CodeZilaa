import { SupportedLanguage, ExecutionResult, TestCase } from "../types/compilerTypes";

const STARTER_TEMPLATES: Record<SupportedLanguage, string> = {
  cpp: `#include <iostream>
#include <vector>
#include <algorithm>

using namespace std;

// CodeZilaa Developer Studio — Binary Search Tree Solution
int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);

    int n;
    if (cin >> n) {
        cout << "Processing " << n << " items..." << endl;
    } else {
        cout << "Welcome to CodeZilaa C++ IDE Studio!" << endl;
    }

    vector<int> data = {12, 5, 8, 19, 3, 27};
    sort(data.begin(), data.end());

    cout << "Sorted Array Execution Result: ";
    for (int val : data) {
        cout << val << " ";
    }
    cout << endl;

    return 0;
}`,
  java: `import java.util.*;

public className Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.println("Welcome to CodeZilaa Java IDE Studio!");
        
        int[] arr = {15, 3, 9, 24, 1};
        Arrays.sort(arr);
        
        System.out.print("Sorted Elements: ");
        for (int n : arr) {
            System.out.print(n + " ");
        }
        System.out.println();
    }
}`,
  python: `# CodeZilaa Developer Studio — Python 3.12 Engine
import sys

def main():
    print("Welcome to CodeZilaa Python IDE Studio!")
    input_data = sys.stdin.read().split()
    
    if input_data:
        print(f"Received Custom Input Tokens: {input_data}")
    else:
        print("Executing default algorithm test suite...")
        
    nums = [4, 1, 8, 3, 9, 2]
    nums.sort()
    print(f"Sorted Result: {nums}")

if __name__ == "__main__":
    main()
`,
  c: `#include <stdio.h>

int main() {
    printf("Welcome to CodeZilaa C IDE Studio!\\n");
    printf("Compilation Target: GCC 13.2 (x86_64)\\n");
    return 0;
}`
};

export class CompilerService {
  static getTemplate(lang: SupportedLanguage): string {
    return STARTER_TEMPLATES[lang] || STARTER_TEMPLATES.cpp;
  }

  static async runCode(
    code: string,
    lang: SupportedLanguage,
    customInput: string,
    testCases: TestCase[]
  ): Promise<ExecutionResult> {
    // Simulate compilation delay
    await new Promise((resolve) => setTimeout(resolve, 900));

    // Simple syntax validation check simulation
    if (code.includes("syntax_error_test")) {
      return {
        stdout: "",
        stderr: "main.cpp:12:5: error: 'err' was not declared in this scope\n   12 |     err = 404;\n      |     ^~~",
        exitCode: 1,
        time: "0.01s",
        memory: "1.2MB",
        status: "compilation_error",
      };
    }

    const hasInput = customInput.trim().length > 0;
    let stdoutOutput = "";

    if (lang === "cpp") {
      stdoutOutput = `Compilation finished successfully (GCC 13.2 -O3).\n\nOutput:\n`;
      if (hasInput) {
        stdoutOutput += `[Custom Stdin Processed]: "${customInput.trim()}"\n`;
      }
      stdoutOutput += `Welcome to CodeZilaa C++ IDE Studio!\nSorted Array Execution Result: 3 5 8 12 19 27 \n\nProcess finished with exit code 0`;
    } else if (lang === "java") {
      stdoutOutput = `Java Virtual Machine 21 Executing...\n\nOutput:\nWelcome to CodeZilaa Java IDE Studio!\nSorted Elements: 1 3 9 15 24 \n\nProcess finished with exit code 0`;
    } else if (lang === "python") {
      stdoutOutput = `Python 3.12 Interpreter Output:\nWelcome to CodeZilaa Python IDE Studio!\n`;
      if (hasInput) {
        stdoutOutput += `Received Custom Input Tokens: ['${customInput.trim()}']\n`;
      }
      stdoutOutput += `Sorted Result: [1, 2, 3, 4, 8, 9]\n\nProcess finished with exit code 0`;
    } else {
      stdoutOutput = `GCC Output:\nWelcome to CodeZilaa C IDE Studio!\nCompilation Target: GCC 13.2 (x86_64)\n\nProcess finished with exit code 0`;
    }

    const updatedTestCases: TestCase[] = testCases.map((tc) => ({
      ...tc,
      actualOutput: tc.expectedOutput,
      status: "passed",
      time: "0.02s",
    }));

    return {
      stdout: stdoutOutput,
      stderr: "",
      exitCode: 0,
      time: "0.04s",
      memory: "2.4MB",
      status: "success",
      testCases: updatedTestCases,
    };
  }

  static async formatCode(code: string, lang: SupportedLanguage): Promise<string> {
    await new Promise((resolve) => setTimeout(resolve, 300));
    // Simulated code formatting logic
    return code
      .split("\n")
      .map((line) => line.trimEnd())
      .join("\n");
  }
}
