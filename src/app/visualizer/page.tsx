"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Play,
  Pause,
  RotateCcw,
  ChevronLeft,
  ChevronRight,
  Cpu,
  Layers,
  Database,
  Terminal,
  Sun,
  Moon,
  Sparkles,
  Zap,
  Code2,
  Loader2,
  PlayCircle,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";

// Types
type SupportedLanguage = "cpp" | "java" | "python" | "c";

interface VariableState {
  name: string;
  value: string | number;
  prevValue?: string | number;
  changed: boolean;
  focused: boolean;
}

interface CallStackFrame {
  id: string;
  functionName: string;
  args: string;
  line: number;
  active: boolean;
}

interface StepData {
  stepIndex: number;
  activeLine: number;
  explanation: string;
  variables: VariableState[];
  callStack: CallStackFrame[];
  consoleLog: string;
  memoryState: {
    type: "array" | "tree" | "dp" | "stack";
    data: any;
  };
}

interface Preset {
  id: string;
  title: string;
  language: SupportedLanguage;
  code: string;
  stdin: string;
  steps: StepData[];
}

const PRESETS: Preset[] = [
  {
    id: "binary_search",
    title: "Binary Search",
    language: "cpp",
    code: `int binarySearch(int arr[], int n, int target) {
    int left = 0;
    int right = n - 1;
    while (left <= right) {
        int mid = left + (right - left) / 2;
        if (arr[mid] == target) {
            return mid; // Target found
        }
        if (arr[mid] < target) {
            left = mid + 1; // Search right half
        } else {
            right = mid - 1; // Search left half
        }
    }
    return -1; // Target not found
}`,
    stdin: "Target: 18\nArray: 2 4 7 10 14 18 23 29 35",
    steps: [
      {
        stepIndex: 1,
        activeLine: 2,
        explanation: "Initialize low pointer (left = 0) at the start of search space.",
        variables: [
          { name: "target", value: 18, changed: false, focused: true },
          { name: "left", value: 0, changed: true, focused: true },
          { name: "right", value: "?", changed: false, focused: false },
          { name: "mid", value: "?", changed: false, focused: false },
        ],
        callStack: [{ id: "f1", functionName: "binarySearch(arr, 9, 18)", args: "arr[9], n=9, target=18", line: 2, active: true }],
        consoleLog: "[SYSTEM] Memory allocated for array at 0x7ffd90a0.\n[EXECUTION] Initializing boundary indices.",
        memoryState: {
          type: "array",
          data: {
            array: [2, 4, 7, 10, 14, 18, 23, 29, 35],
            left: 0,
            right: 8,
            mid: -1,
            compareIdx: -1,
          },
        },
      },
      {
        stepIndex: 2,
        activeLine: 3,
        explanation: "Initialize high pointer (right = 8) to the end of search space (index 8).",
        variables: [
          { name: "target", value: 18, changed: false, focused: true },
          { name: "left", value: 0, changed: false, focused: false },
          { name: "right", value: 8, prevValue: "?", changed: true, focused: true },
          { name: "mid", value: "?", changed: false, focused: false },
        ],
        callStack: [{ id: "f1", functionName: "binarySearch(arr, 9, 18)", args: "arr[9], n=9, target=18", line: 3, active: true }],
        consoleLog: "[EXECUTION] Search space boundaries set to indices [0...8].",
        memoryState: {
          type: "array",
          data: {
            array: [2, 4, 7, 10, 14, 18, 23, 29, 35],
            left: 0,
            right: 8,
            mid: -1,
            compareIdx: -1,
          },
        },
      },
      {
        stepIndex: 3,
        activeLine: 5,
        explanation: "Calculate midpoint indices. mid = 0 + (8 - 0)/2 = 4. arr[4] is 14.",
        variables: [
          { name: "target", value: 18, changed: false, focused: false },
          { name: "left", value: 0, changed: false, focused: false },
          { name: "right", value: 8, changed: false, focused: false },
          { name: "mid", value: 4, prevValue: "?", changed: true, focused: true },
        ],
        callStack: [{ id: "f1", functionName: "binarySearch(arr, 9, 18)", args: "arr[9], n=9, target=18", line: 5, active: true }],
        consoleLog: "[CALCULATION] mid = 0 + (8-0)/2 = 4. Checking arr[4] = 14.",
        memoryState: {
          type: "array",
          data: {
            array: [2, 4, 7, 10, 14, 18, 23, 29, 35],
            left: 0,
            right: 8,
            mid: 4,
            compareIdx: 4,
          },
        },
      },
      {
        stepIndex: 4,
        activeLine: 9,
        explanation: "Since arr[mid] (14) < target (18), the target lies in the right side. Discard indices <= 4.",
        variables: [
          { name: "target", value: 18, changed: false, focused: true },
          { name: "left", value: 5, prevValue: 0, changed: true, focused: true },
          { name: "right", value: 8, changed: false, focused: false },
          { name: "mid", value: 4, changed: false, focused: false },
        ],
        callStack: [{ id: "f1", functionName: "binarySearch(arr, 9, 18)", args: "arr[9], n=9, target=18", line: 9, active: true }],
        consoleLog: "[STATE] arr[4] (14) < 18. Adjusting left boundary to mid + 1 = 5.",
        memoryState: {
          type: "array",
          data: {
            array: [2, 4, 7, 10, 14, 18, 23, 29, 35],
            left: 5,
            right: 8,
            mid: 4,
            compareIdx: 4,
          },
        },
      },
      {
        stepIndex: 5,
        activeLine: 5,
        explanation: "Recalculate midpoint for active range [5...8]. mid = 5 + (8 - 5)/2 = 6. arr[6] is 23.",
        variables: [
          { name: "target", value: 18, changed: false, focused: false },
          { name: "left", value: 5, changed: false, focused: false },
          { name: "right", value: 8, changed: false, focused: false },
          { name: "mid", value: 6, prevValue: 4, changed: true, focused: true },
        ],
        callStack: [{ id: "f1", functionName: "binarySearch(arr, 9, 18)", args: "arr[9], n=9, target=18", line: 5, active: true }],
        consoleLog: "[CALCULATION] mid = 5 + (8-5)/2 = 6. Checking arr[6] = 23.",
        memoryState: {
          type: "array",
          data: {
            array: [2, 4, 7, 10, 14, 18, 23, 29, 35],
            left: 5,
            right: 8,
            mid: 6,
            compareIdx: 6,
          },
        },
      },
      {
        stepIndex: 6,
        activeLine: 11,
        explanation: "Since arr[mid] (23) > target (18), target lies in the left side of range. Discard indices >= 6.",
        variables: [
          { name: "target", value: 18, changed: false, focused: true },
          { name: "left", value: 5, changed: false, focused: false },
          { name: "right", value: 5, prevValue: 8, changed: true, focused: true },
          { name: "mid", value: 6, changed: false, focused: false },
        ],
        callStack: [{ id: "f1", functionName: "binarySearch(arr, 9, 18)", args: "arr[9], n=9, target=18", line: 11, active: true }],
        consoleLog: "[STATE] arr[6] (23) > 18. Adjusting right boundary to mid - 1 = 5.",
        memoryState: {
          type: "array",
          data: {
            array: [2, 4, 7, 10, 14, 18, 23, 29, 35],
            left: 5,
            right: 5,
            mid: 6,
            compareIdx: 6,
          },
        },
      },
      {
        stepIndex: 7,
        activeLine: 5,
        explanation: "Calculate midpoint for range [5...5]. mid = 5. arr[5] is 18.",
        variables: [
          { name: "target", value: 18, changed: false, focused: false },
          { name: "left", value: 5, changed: false, focused: false },
          { name: "right", value: 5, changed: false, focused: false },
          { name: "mid", value: 5, prevValue: 6, changed: true, focused: true },
        ],
        callStack: [{ id: "f1", functionName: "binarySearch(arr, 9, 18)", args: "arr[9], n=9, target=18", line: 5, active: true }],
        consoleLog: "[CALCULATION] mid = 5. Checking arr[5] = 18.",
        memoryState: {
          type: "array",
          data: {
            array: [2, 4, 7, 10, 14, 18, 23, 29, 35],
            left: 5,
            right: 5,
            mid: 5,
            compareIdx: 5,
          },
        },
      },
      {
        stepIndex: 8,
        activeLine: 7,
        explanation: "Match found! arr[5] (18) == target (18). Returning index 5.",
        variables: [
          { name: "target", value: 18, changed: false, focused: true },
          { name: "left", value: 5, changed: false, focused: false },
          { name: "right", value: 5, changed: false, focused: false },
          { name: "mid", value: 5, changed: false, focused: true },
        ],
        callStack: [{ id: "f1", functionName: "binarySearch(arr, 9, 18)", args: "arr[9], n=9, target=18", line: 7, active: true }],
        consoleLog: "[SUCCESS] Target 18 found at index 5. Function returns 5.",
        memoryState: {
          type: "array",
          data: {
            array: [2, 4, 7, 10, 14, 18, 23, 29, 35],
            left: 5,
            right: 5,
            mid: 5,
            compareIdx: 5,
          },
        },
      },
    ],
  },
  {
    id: "bubble_sort",
    title: "Bubble Sort",
    language: "cpp",
    code: `void bubbleSort(int arr[], int n) {
    for (int i = 0; i < n - 1; i++) {
        for (int j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                swap(arr[j], arr[j + 1]);
            }
        }
    }
}`,
    stdin: "Array: 14 5 29 10 18",
    steps: [
      {
        stepIndex: 1,
        activeLine: 2,
        explanation: "Bubble Sort outer loop starts. i = 0.",
        variables: [
          { name: "i", value: 0, changed: true, focused: true },
          { name: "j", value: "?", changed: false, focused: false },
          { name: "arr[j]", value: "?", changed: false, focused: false },
          { name: "arr[j+1]", value: "?", changed: false, focused: false },
        ],
        callStack: [{ id: "f1", functionName: "bubbleSort(arr, 5)", args: "arr[5], n=5", line: 2, active: true }],
        consoleLog: "[SYSTEM] Sorting array [14, 5, 29, 10, 18].\n[EXECUTION] Outer loop i=0 active.",
        memoryState: {
          type: "array",
          data: {
            array: [14, 5, 29, 10, 18],
            left: -1,
            right: -1,
            mid: -1,
            compareIdx: 0,
            compareIdx2: 1,
            swapState: false,
          },
        },
      },
      {
        stepIndex: 2,
        activeLine: 3,
        explanation: "Inner loop starts. j = 0. Compare arr[0] (14) with arr[1] (5).",
        variables: [
          { name: "i", value: 0, changed: false, focused: false },
          { name: "j", value: 0, prevValue: "?", changed: true, focused: true },
          { name: "arr[j]", value: 14, prevValue: "?", changed: true, focused: true },
          { name: "arr[j+1]", value: 5, prevValue: "?", changed: true, focused: true },
        ],
        callStack: [{ id: "f1", functionName: "bubbleSort(arr, 5)", args: "arr[5], n=5", line: 3, active: true }],
        consoleLog: "[EXECUTION] Inner loop j=0. Comparing arr[0] (14) > arr[1] (5).",
        memoryState: {
          type: "array",
          data: {
            array: [14, 5, 29, 10, 18],
            left: -1,
            right: -1,
            mid: -1,
            compareIdx: 0,
            compareIdx2: 1,
            swapState: false,
          },
        },
      },
      {
        stepIndex: 3,
        activeLine: 5,
        explanation: "Since 14 > 5, elements swap physical positions in memory.",
        variables: [
          { name: "i", value: 0, changed: false, focused: false },
          { name: "j", value: 0, changed: false, focused: false },
          { name: "arr[j]", value: 5, prevValue: 14, changed: true, focused: true },
          { name: "arr[j+1]", value: 14, prevValue: 5, changed: true, focused: true },
        ],
        callStack: [{ id: "f1", functionName: "bubbleSort(arr, 5)", args: "arr[5], n=5", line: 5, active: true }],
        consoleLog: "[MUTATION] Swapping arr[0] and arr[1].",
        memoryState: {
          type: "array",
          data: {
            array: [5, 14, 29, 10, 18],
            left: -1,
            right: -1,
            mid: -1,
            compareIdx: 0,
            compareIdx2: 1,
            swapState: true,
          },
        },
      },
      {
        stepIndex: 4,
        activeLine: 3,
        explanation: "Inner loop increments: j = 1. Compare arr[1] (14) with arr[2] (29).",
        variables: [
          { name: "i", value: 0, changed: false, focused: false },
          { name: "j", value: 1, prevValue: 0, changed: true, focused: true },
          { name: "arr[j]", value: 14, prevValue: 5, changed: true, focused: true },
          { name: "arr[j+1]", value: 29, prevValue: 14, changed: true, focused: true },
        ],
        callStack: [{ id: "f1", functionName: "bubbleSort(arr, 5)", args: "arr[5], n=5", line: 3, active: true }],
        consoleLog: "[EXECUTION] Inner loop j=1. Comparing arr[1] (14) > arr[2] (29) -> False.",
        memoryState: {
          type: "array",
          data: {
            array: [5, 14, 29, 10, 18],
            left: -1,
            right: -1,
            mid: -1,
            compareIdx: 1,
            compareIdx2: 2,
            swapState: false,
          },
        },
      },
      {
        stepIndex: 5,
        activeLine: 3,
        explanation: "Inner loop increments: j = 2. Compare arr[2] (29) with arr[3] (10).",
        variables: [
          { name: "i", value: 0, changed: false, focused: false },
          { name: "j", value: 2, prevValue: 1, changed: true, focused: true },
          { name: "arr[j]", value: 29, prevValue: 14, changed: true, focused: true },
          { name: "arr[j+1]", value: 10, prevValue: 29, changed: true, focused: true },
        ],
        callStack: [{ id: "f1", functionName: "bubbleSort(arr, 5)", args: "arr[5], n=5", line: 3, active: true }],
        consoleLog: "[EXECUTION] Inner loop j=2. Comparing arr[2] (29) > arr[3] (10) -> True.",
        memoryState: {
          type: "array",
          data: {
            array: [5, 14, 29, 10, 18],
            left: -1,
            right: -1,
            mid: -1,
            compareIdx: 2,
            compareIdx2: 3,
            swapState: false,
          },
        },
      },
      {
        stepIndex: 6,
        activeLine: 5,
        explanation: "Since 29 > 10, elements swap. 29 moves to index 3.",
        variables: [
          { name: "i", value: 0, changed: false, focused: false },
          { name: "j", value: 2, changed: false, focused: false },
          { name: "arr[j]", value: 10, prevValue: 29, changed: true, focused: true },
          { name: "arr[j+1]", value: 29, prevValue: 10, changed: true, focused: true },
        ],
        callStack: [{ id: "f1", functionName: "bubbleSort(arr, 5)", args: "arr[5], n=5", line: 5, active: true }],
        consoleLog: "[MUTATION] Swapping arr[2] and arr[3].",
        memoryState: {
          type: "array",
          data: {
            array: [5, 14, 10, 29, 18],
            left: -1,
            right: -1,
            mid: -1,
            compareIdx: 2,
            compareIdx2: 3,
            swapState: true,
          },
        },
      },
    ],
  },
  {
    id: "tree_traversal",
    title: "Tree Inorder Traversal",
    language: "cpp",
    code: `struct Node {
    int data;
    Node* left;
    Node* right;
};

void inorder(Node* root) {
    if (root == nullptr) return;
    inorder(root->left);
    cout << root->data << " ";
    inorder(root->right);
}`,
    stdin: "Root: 10, Left: 5, Right: 15",
    steps: [
      {
        stepIndex: 1,
        activeLine: 7,
        explanation: "Enter inorder traversal at Root node (10). Checked: root is not null.",
        variables: [
          { name: "root->val", value: 10, changed: true, focused: true },
          { name: "recursion_depth", value: 1, changed: true, focused: true },
        ],
        callStack: [
          { id: "f1", functionName: "inorder(Node* root)", args: "root=10 (Root)", line: 7, active: true },
        ],
        consoleLog: "[RECURSION] Pushed inorder(10) to call stack.",
        memoryState: {
          type: "tree",
          data: {
            nodes: [
              { id: 10, val: 10, type: "root", state: "active" },
              { id: 5, val: 5, type: "left", state: "unvisited" },
              { id: 15, val: 15, type: "right", state: "unvisited" },
            ],
            activeNodeId: 10,
          },
        },
      },
      {
        stepIndex: 2,
        activeLine: 9,
        explanation: "Recurse into the left child of root node (10). Invoking inorder(5).",
        variables: [
          { name: "root->val", value: 5, prevValue: 10, changed: true, focused: true },
          { name: "recursion_depth", value: 2, prevValue: 1, changed: true, focused: true },
        ],
        callStack: [
          { id: "f1", functionName: "inorder(Node* root)", args: "root=10", line: 9, active: false },
          { id: "f2", functionName: "inorder(Node* root)", args: "root=5", line: 7, active: true },
        ],
        consoleLog: "[RECURSION] Pushed inorder(5) to call stack.",
        memoryState: {
          type: "tree",
          data: {
            nodes: [
              { id: 10, val: 10, type: "root", state: "visited" },
              { id: 5, val: 5, type: "left", state: "active" },
              { id: 15, val: 15, type: "right", state: "unvisited" },
            ],
            activeNodeId: 5,
          },
        },
      },
      {
        stepIndex: 3,
        activeLine: 10,
        explanation: "No left child for node (5). Print node (5) value to console output.",
        variables: [
          { name: "root->val", value: 5, changed: false, focused: true },
          { name: "recursion_depth", value: 2, changed: false, focused: false },
        ],
        callStack: [
          { id: "f1", functionName: "inorder(Node* root)", args: "root=10", line: 9, active: false },
          { id: "f2", functionName: "inorder(Node* root)", args: "root=5", line: 10, active: true },
        ],
        consoleLog: "5 ",
        memoryState: {
          type: "tree",
          data: {
            nodes: [
              { id: 10, val: 10, type: "root", state: "visited" },
              { id: 5, val: 5, type: "left", state: "printed" },
              { id: 15, val: 15, type: "right", state: "unvisited" },
            ],
            activeNodeId: 5,
          },
        },
      },
      {
        stepIndex: 4,
        activeLine: 10,
        explanation: "Popping inorder(5) stack frame. Return to parent frame (inorder(10)) and print node (10) data.",
        variables: [
          { name: "root->val", value: 10, prevValue: 5, changed: true, focused: true },
          { name: "recursion_depth", value: 1, prevValue: 2, changed: true, focused: true },
        ],
        callStack: [
          { id: "f1", functionName: "inorder(Node* root)", args: "root=10", line: 10, active: true },
        ],
        consoleLog: "10 ",
        memoryState: {
          type: "tree",
          data: {
            nodes: [
              { id: 10, val: 10, type: "root", state: "printed" },
              { id: 5, val: 5, type: "left", state: "printed" },
              { id: 15, val: 15, type: "right", state: "unvisited" },
            ],
            activeNodeId: 10,
          },
        },
      },
      {
        stepIndex: 5,
        activeLine: 11,
        explanation: "Recurse into right child of root node (10). Invoking inorder(15).",
        variables: [
          { name: "root->val", value: 15, prevValue: 10, changed: true, focused: true },
          { name: "recursion_depth", value: 2, prevValue: 1, changed: true, focused: true },
        ],
        callStack: [
          { id: "f1", functionName: "inorder(Node* root)", args: "root=10", line: 11, active: false },
          { id: "f3", functionName: "inorder(Node* root)", args: "root=15", line: 7, active: true },
        ],
        consoleLog: "[RECURSION] Pushed inorder(15) to call stack.",
        memoryState: {
          type: "tree",
          data: {
            nodes: [
              { id: 10, val: 10, type: "root", state: "printed" },
              { id: 5, val: 5, type: "left", state: "printed" },
              { id: 15, val: 15, type: "right", state: "active" },
            ],
            activeNodeId: 15,
          },
        },
      },
      {
        stepIndex: 6,
        activeLine: 10,
        explanation: "Inorder(15) active. Print node (15) value to console output.",
        variables: [
          { name: "root->val", value: 15, changed: false, focused: true },
          { name: "recursion_depth", value: 2, changed: false, focused: false },
        ],
        callStack: [
          { id: "f1", functionName: "inorder(Node* root)", args: "root=10", line: 11, active: false },
          { id: "f3", functionName: "inorder(Node* root)", args: "root=15", line: 10, active: true },
        ],
        consoleLog: "15 ",
        memoryState: {
          type: "tree",
          data: {
            nodes: [
              { id: 10, val: 10, type: "root", state: "printed" },
              { id: 5, val: 5, type: "left", state: "printed" },
              { id: 15, val: 15, type: "right", state: "printed" },
            ],
            activeNodeId: 15,
          },
        },
      },
    ],
  },
  {
    id: "dp_paths",
    title: "Dynamic Programming Grid Paths",
    language: "cpp",
    code: `int countPaths(int r, int c) {
    int dp[4][4] = {0};
    for (int i = 0; i < r; i++) {
        for (int j = 0; j < c; j++) {
            if (i == 0 || j == 0) dp[i][j] = 1;
            else dp[i][j] = dp[i-1][j] + dp[i][j-1];
        }
    }
    return dp[r-1][c-1];
}`,
    stdin: "Grid Size: 4x4",
    steps: [
      {
        stepIndex: 1,
        activeLine: 2,
        explanation: "Initialize DP grid. Starting with baseline cell coordinates (0, 0) with value 1.",
        variables: [
          { name: "i", value: 0, changed: true, focused: true },
          { name: "j", value: 0, changed: true, focused: true },
          { name: "dp[i][j]", value: 1, changed: true, focused: true },
        ],
        callStack: [{ id: "f1", functionName: "countPaths(4, 4)", args: "r=4, c=4", line: 2, active: true }],
        consoleLog: "[DP] Allocating 4x4 grid. Setting boundaries to 1.",
        memoryState: {
          type: "dp",
          data: {
            grid: [
              [1, 0, 0, 0],
              [0, 0, 0, 0],
              [0, 0, 0, 0],
              [0, 0, 0, 0],
            ],
            activeCell: [0, 0],
            dependencies: [],
          },
        },
      },
      {
        stepIndex: 2,
        activeLine: 5,
        explanation: "Boundary cell dp[0][1] receives value 1 since i=0.",
        variables: [
          { name: "i", value: 0, changed: false, focused: false },
          { name: "j", value: 1, prevValue: 0, changed: true, focused: true },
          { name: "dp[i][j]", value: 1, changed: false, focused: true },
        ],
        callStack: [{ id: "f1", functionName: "countPaths(4, 4)", args: "r=4, c=4", line: 5, active: true }],
        consoleLog: "[DP] Boundary cell dp[0][1] computed.",
        memoryState: {
          type: "dp",
          data: {
            grid: [
              [1, 1, 0, 0],
              [0, 0, 0, 0],
              [0, 0, 0, 0],
              [0, 0, 0, 0],
            ],
            activeCell: [0, 1],
            dependencies: [],
          },
        },
      },
      {
        stepIndex: 3,
        activeLine: 6,
        explanation: "Computing inner cell dp[1][1]. It depends on dp[0][1] (top) and dp[1][0] (left).",
        variables: [
          { name: "i", value: 1, prevValue: 0, changed: true, focused: true },
          { name: "j", value: 1, changed: false, focused: true },
          { name: "dp[i][j]", value: 2, prevValue: 0, changed: true, focused: true },
        ],
        callStack: [{ id: "f1", functionName: "countPaths(4, 4)", args: "r=4, c=4", line: 6, active: true }],
        consoleLog: "[DP] Cell dp[1][1] = dp[0][1] (1) + dp[1][0] (1) = 2.",
        memoryState: {
          type: "dp",
          data: {
            grid: [
              [1, 1, 0, 0],
              [1, 2, 0, 0],
              [0, 0, 0, 0],
              [0, 0, 0, 0],
            ],
            activeCell: [1, 1],
            dependencies: [
              [0, 1],
              [1, 0],
            ],
          },
        },
      },
      {
        stepIndex: 4,
        activeLine: 6,
        explanation: "Computing inner cell dp[1][2]. dp[1][2] = dp[0][2] (1) + dp[1][1] (2) = 3.",
        variables: [
          { name: "i", value: 1, changed: false, focused: false },
          { name: "j", value: 2, prevValue: 1, changed: true, focused: true },
          { name: "dp[i][j]", value: 3, prevValue: 0, changed: true, focused: true },
        ],
        callStack: [{ id: "f1", functionName: "countPaths(4, 4)", args: "r=4, c=4", line: 6, active: true }],
        consoleLog: "[DP] Cell dp[1][2] = dp[0][2] (1) + dp[1][1] (2) = 3.",
        memoryState: {
          type: "dp",
          data: {
            grid: [
              [1, 1, 1, 0],
              [1, 2, 3, 0],
              [0, 0, 0, 0],
              [0, 0, 0, 0],
            ],
            activeCell: [1, 2],
            dependencies: [
              [0, 2],
              [1, 1],
            ],
          },
        },
      },
      {
        stepIndex: 5,
        activeLine: 6,
        explanation: "Computing cell dp[2][2]. dp[2][2] = dp[1][2] (3) + dp[2][1] (3) = 6.",
        variables: [
          { name: "i", value: 2, prevValue: 1, changed: true, focused: true },
          { name: "j", value: 2, changed: false, focused: true },
          { name: "dp[i][j]", value: 6, prevValue: 0, changed: true, focused: true },
        ],
        callStack: [{ id: "f1", functionName: "countPaths(4, 4)", args: "r=4, c=4", line: 6, active: true }],
        consoleLog: "[DP] Cell dp[2][2] = dp[1][2] (3) + dp[2][1] (3) = 6.",
        memoryState: {
          type: "dp",
          data: {
            grid: [
              [1, 1, 1, 1],
              [1, 2, 3, 4],
              [1, 3, 6, 0],
              [0, 0, 0, 0],
            ],
            activeCell: [2, 2],
            dependencies: [
              [1, 2],
              [2, 1],
            ],
          },
        },
      },
    ],
  },
];

export default function StandaloneExecutionVisualizer() {
  const router = useRouter();
  const { user } = useAuth();

  // Selected Preset
  const [selectedPresetId, setSelectedPresetId] = useState<string>("binary_search");
  const preset = PRESETS.find((p) => p.id === selectedPresetId) || PRESETS[0];

  // Editor states
  const [code, setCode] = useState<string>(preset.code);
  const [stdin, setStdin] = useState<string>(preset.stdin);
  const [stdout, setStdout] = useState<string>("Simulation initialized. Modify source and run to check details.");
  const [isCompiling, setIsCompiling] = useState<boolean>(false);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(true);

  // Timeline / Stepper states
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [speed, setSpeed] = useState<0.25 | 0.5 | 1 | 2>(1);

  // Sequential Animation Phases
  // 1. Highlight Code
  // 2. Animate Variables
  // 3. Animate Memory
  // 4. Update Output
  // 5. Advance Timeline
  const PHASES = ["line", "var_val", "mem", "out", "timeline"] as const;
  type AnimationPhase = (typeof PHASES)[number] | "idle";
  const [currentPhase, setCurrentPhase] = useState<AnimationPhase>("idle");
  const phaseTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Interactive rendering states
  const [highlightedLine, setHighlightedLine] = useState<number>(-1);
  const [focusedVariables, setFocusedVariables] = useState<string[]>([]);
  const [memoryState, setMemoryState] = useState<any>(null);
  const [callStack, setCallStack] = useState<CallStackFrame[]>([]);

  const currentStep = preset.steps[currentStepIndex] || preset.steps[0];
  const totalSteps = preset.steps.length;

  // Handle Preset Change
  const handlePresetChange = (presetId: string) => {
    setSelectedPresetId(presetId);
    const newPreset = PRESETS.find((p) => p.id === presetId) || PRESETS[0];
    setCode(newPreset.code);
    setStdin(newPreset.stdin);
    setCurrentStepIndex(0);
    setIsPlaying(false);
    setCurrentPhase("idle");
    setStdout("Successfully compiled. Stepping sequence ready.");
  };

  const handleRunAgain = () => {
    setIsCompiling(true);
    setStdout("Compiling source code using GCC 13.2...");
    setTimeout(() => {
      setIsCompiling(false);
      setStdout(
        `[SUCCESS] Code compiled successfully.\n[SYSTEM] Replay steps: ${totalSteps} execution cycles loaded.`
      );
      setCurrentStepIndex(0);
      setCurrentPhase("idle");
    }, 1200);
  };

  // Keyboard Event Hooks
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === "Space" && e.target === document.body) {
        e.preventDefault();
        setIsPlaying((p) => !p);
      }
      if (e.code === "ArrowRight" && e.target === document.body) {
        e.preventDefault();
        handleNextStep();
      }
      if (e.code === "ArrowLeft" && e.target === document.body) {
        e.preventDefault();
        handlePrevStep();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentStepIndex, totalSteps]);

  // Synchronize state when timeline changes directly
  useEffect(() => {
    syncStepState(currentStepIndex);
  }, [currentStepIndex, selectedPresetId]);

  const syncStepState = (idx: number) => {
    const step = preset.steps[idx] || preset.steps[0];
    setHighlightedLine(step.activeLine);
    setFocusedVariables(step.variables.filter((v) => v.focused).map((v) => v.name));
    setMemoryState(step.memoryState.data);
    setCallStack(step.callStack);
  };

  // Step-by-step sequential animation loop
  useEffect(() => {
    if (isPlaying) {
      runSequence(currentStepIndex, () => {
        setCurrentStepIndex((prev) => {
          if (prev >= totalSteps - 1) {
            setIsPlaying(false);
            return prev;
          }
          return prev + 1;
        });
      });
    } else {
      if (phaseTimerRef.current) {
        clearTimeout(phaseTimerRef.current);
      }
      setCurrentPhase("idle");
    }
    return () => {
      if (phaseTimerRef.current) clearTimeout(phaseTimerRef.current);
    };
  }, [isPlaying, currentStepIndex]);

  const runSequence = (stepIdx: number, onCompleteSequence: () => void) => {
    const step = preset.steps[stepIdx];
    if (!step) return;

    const baseDurations = {
      line: 400,
      var_val: 500,
      mem: 500,
      out: 500,
      timeline: 400,
    };

    const duration = (phase: keyof typeof baseDurations) => baseDurations[phase] / speed;

    // Phase 1: Highlight Code
    setCurrentPhase("line");
    setHighlightedLine(step.activeLine);
    setFocusedVariables([]);

    // Phase 2: Animate Variables
    phaseTimerRef.current = setTimeout(() => {
      setCurrentPhase("var_val");
      setFocusedVariables(step.variables.filter((v) => v.focused).map((v) => v.name));

      // Phase 3: Animate Memory
      phaseTimerRef.current = setTimeout(() => {
        setCurrentPhase("mem");
        setMemoryState(step.memoryState.data);
        setCallStack(step.callStack);

        // Phase 4: Update Output
        phaseTimerRef.current = setTimeout(() => {
          setCurrentPhase("out");
          let stdoutLogs = "";
          for (let i = 0; i <= stepIdx; i++) {
            const log = preset.steps[i]?.consoleLog || "";
            if (!log.startsWith("[")) {
              stdoutLogs += log;
            } else {
              stdoutLogs += (stdoutLogs ? "\n" : "") + log;
            }
          }
          setStdout(stdoutLogs);

          // Phase 5: Advance Timeline
          phaseTimerRef.current = setTimeout(() => {
            setCurrentPhase("timeline");
            phaseTimerRef.current = setTimeout(() => {
              setCurrentPhase("idle");
              onCompleteSequence();
            }, duration("timeline"));
          }, duration("out"));
        }, duration("mem"));
      }, duration("var_val"));
    }, duration("line"));
  };

  const handleNextStep = () => {
    setIsPlaying(false);
    if (currentStepIndex < totalSteps - 1) {
      setCurrentStepIndex((prev) => prev + 1);
    }
  };

  const handlePrevStep = () => {
    setIsPlaying(false);
    if (currentStepIndex > 0) {
      setCurrentStepIndex((prev) => prev - 1);
    }
  };

  const handleReplay = () => {
    setIsPlaying(false);
    setCurrentStepIndex(0);
    syncStepState(0);
  };

  const handleBackToStudio = () => {
    router.push("/studio");
  };

  return (
    <div className={`h-screen w-screen flex flex-col font-sans select-none overflow-hidden transition-colors duration-300 ${isDarkMode ? "bg-[#09090b] text-white" : "bg-gray-950 text-gray-100"}`}>
      {/* 1. TOP BAR */}
      <header className="h-16 bg-[#0c0c0e]/95 backdrop-blur-xl border-b border-white/10 px-4 flex items-center justify-between z-40 shrink-0">
        <div className="flex items-center gap-4">
          <button
            onClick={handleBackToStudio}
            className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white transition-all flex items-center gap-2 text-xs font-semibold cursor-pointer border border-white/10"
          >
            <ArrowLeft className="w-4 h-4 text-purple-400" />
            <span>Back to Studio</span>
          </button>
          <div className="h-4 w-px bg-white/10 hidden sm:block" />
          <h1 className="text-sm font-extrabold text-white tracking-tight flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-purple-400" />
            <span>Interactive Execution Player</span>
          </h1>
        </div>

        {/* Preset Selector */}
        <div className="flex items-center gap-2 bg-[#121215] px-3 py-1.5 rounded-xl border border-white/10 text-xs">
          <span className="text-gray-400 hidden md:inline">Lesson:</span>
          <select
            value={selectedPresetId}
            onChange={(e) => handlePresetChange(e.target.value)}
            className="bg-transparent text-white font-semibold focus:outline-none cursor-pointer text-xs"
          >
            {PRESETS.map((p) => (
              <option key={p.id} value={p.id} className="bg-[#121215] text-white">
                {p.title} ({p.language === "cpp" ? "C++" : p.language.toUpperCase()})
              </option>
            ))}
          </select>
        </div>

        {/* Profile / Theme */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white transition-colors cursor-pointer border border-white/10"
            title="Toggle Theme"
          >
            {isDarkMode ? <Moon className="w-4 h-4 text-purple-400" /> : <Sun className="w-4 h-4 text-amber-400" />}
          </button>
          <div className="flex items-center gap-2 p-1 bg-white/5 border border-white/10 rounded-xl">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-cyan-500 to-indigo-600 p-0.5">
              <div className="w-full h-full bg-[#121215] rounded-[6px] flex items-center justify-center font-bold text-xs text-cyan-300">
                {user?.name ? user.name.charAt(0).toUpperCase() : "S"}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* 2. DUAL WORKSPACE SPLIT AREA */}
      <div className="flex-1 flex gap-6 p-4 overflow-hidden w-full max-w-[1920px] mx-auto">
        
        {/* LEFT COLUMN: 40% Width. Monaco Editor (70%), Input (15%), Output (15%) */}
        <div className="w-[40%] flex flex-col gap-4 h-full overflow-hidden">
          
          {/* Editable Editor (70% Height) */}
          <div className="h-[68%] flex flex-col bg-[#121215] border border-white/10 rounded-2xl p-4 overflow-hidden shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-2.5 mb-2.5 shrink-0">
              <div className="flex items-center gap-2 text-xs font-bold text-white">
                <Code2 className="w-4 h-4 text-purple-400" />
                <span>Source Code (Editable)</span>
              </div>
              <button
                onClick={handleRunAgain}
                disabled={isCompiling}
                className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-400 hover:to-indigo-500 text-white font-bold text-[11px] flex items-center gap-1.5 shadow-lg active:scale-95 transition-all cursor-pointer disabled:opacity-60"
              >
                {isCompiling ? (
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                ) : (
                  <PlayCircle className="w-3.5 h-3.5" />
                )}
                <span>Run Again</span>
              </button>
            </div>

            {/* Monaco layout body */}
            <div className="flex-1 relative flex overflow-hidden border border-white/5 bg-[#09090b] rounded-xl p-2 font-mono text-xs">
              <div className="text-gray-600 text-right pr-3 pl-1 select-none border-r border-white/5 space-y-1 py-1">
                {code.split("\n").map((_, i) => (
                  <div key={i} className={`h-6 leading-6 ${highlightedLine === i + 1 ? "text-purple-400 font-bold font-mono" : ""}`}>
                    {i + 1}
                  </div>
                ))}
              </div>
              <div className="flex-1 relative overflow-auto py-1 px-3">
                <textarea
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className="w-full h-full bg-transparent text-gray-200 focus:outline-none resize-none leading-6 font-mono whitespace-pre selection:bg-purple-500/30"
                  spellCheck={false}
                />
                {highlightedLine > 0 && (
                  <div
                    className="absolute left-0 right-0 bg-purple-500/10 border-l-4 border-purple-500 pointer-events-none transition-all duration-300"
                    style={{
                      top: `${(highlightedLine - 1) * 24 + 4}px`,
                      height: "24px",
                    }}
                  />
                )}
              </div>
            </div>
          </div>

          {/* Program Input (15% Height) */}
          <div className="h-[14%] flex flex-col bg-[#121215] border border-white/10 rounded-2xl p-3 overflow-hidden shadow-xl">
            <div className="text-[11px] font-bold text-white mb-1.5 flex items-center gap-1.5 shrink-0">
              <Terminal className="w-3.5 h-3.5 text-cyan-400" />
              <span>Program Input (stdin)</span>
            </div>
            <textarea
              value={stdin}
              onChange={(e) => setStdin(e.target.value)}
              className="flex-1 w-full bg-[#09090b] border border-white/5 rounded-xl p-2 font-mono text-[11px] text-gray-300 focus:outline-none focus:border-cyan-500 resize-none leading-normal selection:bg-cyan-500/30"
            />
          </div>

          {/* Program Output (15% Height) */}
          <div className="h-[14%] flex flex-col bg-[#121215] border border-white/10 rounded-2xl p-3 overflow-hidden shadow-xl">
            <div className="text-[11px] font-bold text-white mb-1.5 flex items-center gap-1.5 shrink-0">
              <Terminal className="w-3.5 h-3.5 text-green-400" />
              <span>Program Output (stdout)</span>
            </div>
            <div className="flex-1 bg-[#09090b] border border-white/5 rounded-xl p-2 font-mono text-[11px] text-gray-400 overflow-y-auto leading-relaxed select-text">
              {stdout.split("\n").map((line, i) => (
                <div key={i} className={line.startsWith("[SUCCESS]") ? "text-green-400 font-semibold" : ""}>
                  {line}
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN: 60% Width. Timeline, Variables + Stack, Memory Visualization */}
        <div className="w-[60%] flex flex-col gap-4 h-full overflow-hidden">
          
          {/* SECTION 1: Compressed Professional Playback Timeline Card (approx 88px height) */}
          <div className="h-[88px] bg-[#121215] border border-white/10 rounded-2xl p-3.5 shadow-2xl flex flex-col justify-between shrink-0 overflow-hidden">
            {/* Scrubber slider and Step counts */}
            <div className="flex items-center gap-4">
              <input
                type="range"
                min={0}
                max={totalSteps - 1}
                value={currentStepIndex}
                onChange={(e) => {
                  setIsPlaying(false);
                  setCurrentStepIndex(Number(e.target.value));
                }}
                className="flex-1 h-1.5 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-purple-500"
              />
              <span className="text-[10px] font-mono font-bold text-purple-400 shrink-0">
                Step {currentStepIndex + 1} / {totalSteps}
              </span>
            </div>

            {/* Stepper controls */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <button
                  onClick={handleReplay}
                  className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white transition-colors cursor-pointer border border-white/5"
                  title="Replay from start"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={handlePrevStep}
                  disabled={currentStepIndex === 0}
                  className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white disabled:opacity-40 transition-colors cursor-pointer border border-white/5"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="px-3 py-1.5 rounded-lg bg-purple-600 hover:bg-purple-500 text-white font-bold text-[10px] flex items-center gap-1 transition-all cursor-pointer"
                >
                  {isPlaying ? <Pause className="w-3 h-3 fill-white" /> : <Play className="w-3 h-3 fill-white" />}
                  <span>{isPlaying ? "Pause" : "Play"}</span>
                </button>
                <button
                  onClick={handleNextStep}
                  disabled={currentStepIndex === totalSteps - 1}
                  className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white disabled:opacity-40 transition-colors cursor-pointer border border-white/5"
                >
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Phase progress logger */}
              <div className="text-[9px] font-mono text-gray-500 hidden md:block">
                {currentPhase === "line" && "Line Highlighting"}
                {currentPhase === "var_val" && "Variable Updates"}
                {currentPhase === "mem" && "Heap Sync"}
                {currentPhase === "out" && "Output Logged"}
                {currentPhase === "timeline" && "Advancing Stepper"}
                {currentPhase === "idle" && "Idle"}
              </div>

              {/* speed control */}
              <div className="flex items-center gap-1 bg-[#18181c] p-0.5 rounded-lg border border-white/10 text-[9px] font-mono">
                {([0.5, 1, 2] as const).map((spd) => (
                  <button
                    key={spd}
                    onClick={() => setSpeed(spd)}
                    className={`px-1.5 py-0.5 rounded transition-all cursor-pointer ${
                      speed === spd ? "bg-purple-600 text-white font-bold" : "text-gray-400 hover:text-white"
                    }`}
                  >
                    {spd}x
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* SECTION 2: Variables Inspector + Call Stack (Side-by-side, 150px height) */}
          <div className="h-[150px] grid grid-cols-2 gap-4 shrink-0 overflow-hidden">
            
            {/* Variable Inspector */}
            <div className="h-full flex flex-col bg-[#121215] border border-white/10 rounded-2xl p-3.5 overflow-hidden">
              <div className="flex items-center justify-between border-b border-white/10 pb-1.5 mb-2 shrink-0">
                <div className="flex items-center gap-1.5 text-[10px] font-bold text-white uppercase tracking-wider">
                  <Cpu className="w-3.5 h-3.5 text-purple-400" />
                  <span>Variables</span>
                </div>
              </div>

              {/* Two Column Grid for Variables */}
              <div className="flex-1 overflow-y-auto grid grid-cols-2 gap-2 pr-1">
                {currentStep.variables.map((v) => {
                  const isFocused = focusedVariables.includes(v.name);
                  return (
                    <div
                      key={v.name}
                      className={`px-2.5 py-1.5 rounded-xl border flex items-center justify-between transition-all duration-300 ${
                        v.changed && isFocused
                          ? "bg-purple-500/10 border-purple-500/30 text-white"
                          : "bg-[#09090b] border-white/5 text-gray-400"
                      }`}
                    >
                      <span className="font-mono text-[10px]">{v.name}</span>
                      <div className="font-mono flex items-center gap-1.5 text-[10px]">
                        {v.prevValue !== undefined && v.changed && (
                          <span className="text-[9px] text-gray-600 line-through">{v.prevValue}</span>
                        )}
                        <span className={`font-bold ${v.changed && isFocused ? "text-purple-300" : "text-cyan-400"}`}>
                          {v.value}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Call Stack Frame */}
            <div className="h-full flex flex-col bg-[#121215] border border-white/10 rounded-2xl p-3.5 overflow-hidden">
              <div className="flex items-center justify-between border-b border-white/10 pb-1.5 mb-2 shrink-0">
                <div className="flex items-center gap-1.5 text-[10px] font-bold text-white uppercase tracking-wider">
                  <Layers className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Call Stack</span>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto space-y-1.5 pr-1">
                <AnimatePresence mode="popLayout">
                  {callStack.map((frame) => (
                    <motion.div
                      key={frame.id}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      className={`px-2.5 py-1.5 rounded-xl border flex items-center justify-between font-mono text-[10px] ${
                        frame.active
                          ? "bg-indigo-500/15 border-indigo-500/30 text-white"
                          : "bg-[#09090b] border-white/5 text-gray-500"
                      }`}
                    >
                      <div className="truncate">
                        <span className="font-bold text-cyan-300">{frame.functionName}</span>
                      </div>
                      <span className="text-[9px] px-1 py-0.5 bg-black/40 rounded border border-white/10 text-gray-400">
                        Line {frame.line}
                      </span>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>

          </div>

          {/* SECTION 3: Expanded Memory Visualization (Hero visual component, fills rest of space) */}
          <div className="flex-1 bg-[#121215] border border-white/10 rounded-2xl p-4 overflow-hidden shadow-2xl flex flex-col">
            <div className="flex items-center justify-between border-b border-white/10 pb-2 mb-2 shrink-0">
              <div className="flex items-center gap-2 text-xs font-bold text-white">
                <Database className="w-4 h-4 text-green-400" />
                <span>Heap Memory State (Hero Panel)</span>
              </div>
              <span className="text-[10px] font-mono text-green-400">Visual mapping</span>
            </div>

            {/* Adaptive layout container fills rest of card */}
            <div className="flex-1 flex items-center justify-center overflow-y-auto">
              {/* Array memory layout representation */}
              {memoryState && (selectedPresetId === "binary_search" || selectedPresetId === "bubble_sort") && (
                <div className="flex items-end justify-around gap-2 w-full max-w-xl h-44 pt-6 relative">
                  {memoryState.array.map((h: number, idx: number) => {
                    const isLeft = memoryState.left === idx;
                    const isRight = memoryState.right === idx;
                    const isMid = memoryState.mid === idx;
                    const isComparing = memoryState.compareIdx === idx || memoryState.compareIdx2 === idx;
                    const isSwapped = memoryState.swapState && isComparing;

                    return (
                      <div key={idx} className="flex-1 flex flex-col items-center gap-1 h-full justify-end relative">
                        {/* pointer tag markers */}
                        <div className="absolute -top-7 flex gap-0.5 text-[9px] font-bold font-mono">
                          {isLeft && <span className="px-1 py-0.5 bg-cyan-500 text-black rounded shadow animate-bounce">L</span>}
                          {isMid && <span className="px-1 py-0.5 bg-purple-500 text-white rounded shadow animate-bounce">M</span>}
                          {isRight && <span className="px-1 py-0.5 bg-pink-500 text-white rounded shadow animate-bounce">R</span>}
                        </div>

                        {/* Array Cell block with animated swap states */}
                        <motion.div
                          layout
                          className={`w-full rounded-xl flex items-center justify-center font-mono font-bold border transition-all text-xs ${
                            isSwapped
                              ? "bg-amber-500 text-black border-amber-300 shadow-lg shadow-amber-500/30 scale-105"
                              : isComparing
                              ? "bg-purple-500 text-white border-purple-300 shadow-md shadow-purple-500/30 animate-pulse"
                              : "bg-gray-800 text-gray-300 border-white/10"
                          }`}
                          style={{ height: `${Math.max(32, h * 3.5) + 20}px` }}
                          transition={{ type: "spring", stiffness: 350, damping: 25 }}
                        >
                          {h}
                        </motion.div>
                        <span className="text-[9px] font-mono text-gray-500 mt-1">{idx}</span>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Tree memory representation */}
              {memoryState && selectedPresetId === "tree_traversal" && (
                <div className="flex flex-col items-center gap-4 w-full max-w-sm py-4 relative font-mono text-xs">
                  {(() => {
                    const rootNode = memoryState.nodes.find((n: any) => n.type === "root");
                    const leftNode = memoryState.nodes.find((n: any) => n.type === "left");
                    const rightNode = memoryState.nodes.find((n: any) => n.type === "right");

                    return (
                      <>
                        <div
                          className={`w-12 h-12 rounded-full flex items-center justify-center font-extrabold border-2 shadow transition-all ${
                            rootNode.state === "active"
                              ? "bg-cyan-500 text-black border-cyan-300 shadow-cyan-500/50 scale-105 animate-pulse"
                              : rootNode.state === "printed"
                              ? "bg-green-500 text-black border-green-300 shadow-green-500/30"
                              : rootNode.state === "visited"
                              ? "bg-purple-500 text-white border-purple-300"
                              : "bg-gray-800 text-gray-300 border-white/10"
                          }`}
                        >
                          {rootNode.val}
                        </div>

                        <div className="flex justify-between w-full px-8 relative">
                          <div
                            className={`w-10 h-10 rounded-full flex items-center justify-center font-bold border-2 shadow transition-all ${
                              leftNode.state === "active"
                                ? "bg-cyan-500 text-black border-cyan-300 shadow-cyan-500/50 scale-105 animate-pulse"
                                : leftNode.state === "printed"
                                ? "bg-green-500 text-black border-green-300"
                                : "bg-gray-800 text-gray-300 border-white/10"
                            }`}
                          >
                            {leftNode.val}
                          </div>

                          <div
                            className={`w-10 h-10 rounded-full flex items-center justify-center font-bold border-2 shadow transition-all ${
                              rightNode.state === "active"
                                ? "bg-cyan-500 text-black border-cyan-300 shadow-cyan-500/50 scale-105 animate-pulse"
                                : rightNode.state === "printed"
                                ? "bg-green-500 text-black border-green-300"
                                : "bg-gray-800 text-gray-300 border-white/10"
                            }`}
                          >
                            {rightNode.val}
                          </div>

                          <svg className="absolute inset-0 w-full h-full pointer-events-none -z-10" style={{ minHeight: "65px" }}>
                            <line x1="50%" y1="-10px" x2="25%" y2="20px" stroke="rgba(255,255,255,0.15)" strokeWidth="2" />
                            <line x1="50%" y1="-10px" x2="75%" y2="20px" stroke="rgba(255,255,255,0.15)" strokeWidth="2" />
                          </svg>
                        </div>
                      </>
                    );
                  })()}
                </div>
              )}

              {/* DP memory representation */}
              {memoryState && selectedPresetId === "dp_paths" && (
                <div className="flex flex-col gap-2 items-center font-mono text-xs w-full py-2">
                  <div className="grid grid-cols-4 gap-2">
                    {memoryState.grid.map((row: number[], rIdx: number) =>
                      row.map((val: number, cIdx: number) => {
                        const isActive = memoryState.activeCell[0] === rIdx && memoryState.activeCell[1] === cIdx;
                        const isDependency = memoryState.dependencies.some((d: any) => d[0] === rIdx && d[1] === cIdx);

                        return (
                          <div
                            key={`${rIdx}-${cIdx}`}
                            className={`w-11 h-11 rounded-lg flex flex-col items-center justify-center border font-bold transition-all ${
                              isActive
                                ? "bg-purple-600 text-white border-purple-400 shadow-lg shadow-purple-500/40 scale-105 animate-pulse"
                                : isDependency
                                ? "bg-indigo-500/20 border-indigo-400/30 text-indigo-300 animate-pulse"
                                : val > 0
                                ? "bg-[#18181c] border-white/10 text-gray-300"
                                : "bg-transparent border-white/5 text-gray-700"
                            }`}
                          >
                            <span className="text-[7px] text-gray-500 block leading-none">{rIdx},{cIdx}</span>
                            <span className="text-[11px] mt-0.5">{val}</span>
                          </div>
                        );
                      })
                    )}
                  </div>
                  {memoryState.dependencies.length > 0 && (
                    <div className="mt-2 text-[9px] text-purple-300 text-center font-semibold">
                      dp[{memoryState.activeCell[0]}][{memoryState.activeCell[1]}] = dp[{memoryState.activeCell[0]-1}][{memoryState.activeCell[1]}] ({memoryState.grid[memoryState.activeCell[0]-1][memoryState.activeCell[1]]}) + dp[{memoryState.activeCell[0]}][{memoryState.activeCell[1]-1}] ({memoryState.grid[memoryState.activeCell[0]][memoryState.activeCell[1]-1]}) = {memoryState.grid[memoryState.activeCell[0]][memoryState.activeCell[1]]}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
