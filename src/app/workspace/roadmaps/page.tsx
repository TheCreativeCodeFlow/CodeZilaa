"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  MapPin,
  CheckCircle2,
  Circle,
  ArrowRight,
  Sparkles,
  Search,
  BookOpen,
  HelpCircle,
  Building2,
  Calendar,
  AlertCircle,
  Lightbulb,
  Clock,
  Compass,
  LineChart,
} from "lucide-react";

interface SubTopic {
  name: string;
  difficulty: "Easy" | "Medium" | "Hard";
  status: "Completed" | "In Progress" | "Upcoming";
}

interface Milestone {
  id: string;
  step: number;
  name: string;
  status: "Completed" | "In Progress" | "Upcoming" | "Locked";
  desc: string;
  topicsCount: number;
  questionsCount: number;
  duration: string;
  difficulty: "Easy" | "Medium" | "Hard" | "Elite";
  prerequisites: string;
  companies: string[];
  subTopics: SubTopic[];
  theory: string;
  practiceQuestions: Array<{ name: string; difficulty: "Easy" | "Medium" | "Hard"; link: string }>;
  visualizations: string[];
  revisionNotes: string;
}

const MILESTONES: Milestone[] = [
  {
    id: "programming_foundations",
    step: 1,
    name: "Programming Foundations",
    status: "Completed",
    desc: "Syntax, loops, conditionals, pointers, and memory layout basics.",
    topicsCount: 12,
    questionsCount: 35,
    duration: "2 Weeks",
    difficulty: "Easy",
    prerequisites: "None",
    companies: ["TCS", "Infosys", "Wipro", "Cognizant"],
    subTopics: [
      { name: "Variables & Core Data Types", difficulty: "Easy", status: "Completed" },
      { name: "Pointers & Memory Addressing", difficulty: "Medium", status: "Completed" },
      { name: "Control Flow & Loops", difficulty: "Easy", status: "Completed" },
      { name: "Functions & Call Stack Anatomy", difficulty: "Medium", status: "Completed" },
    ],
    theory: "Programming foundations cover the execution lifecycle of compiled code. When variables are declared, they allocate contiguous segments in heap/stack memory. Pointers store hexadecimal RAM addresses, enabling raw memory operations.",
    practiceQuestions: [
      { name: "Reverse an Array In-Place", difficulty: "Easy", link: "/studio" },
      { name: "Check Palindrome String", difficulty: "Easy", link: "/studio" },
      { name: "Find GCD using Euclidean Algorithm", difficulty: "Medium", link: "/studio" },
    ],
    visualizations: ["Hexadecimal Heap Allocations", "Functions Call Stack Frames Lifecycle"],
    revisionNotes: "Stack memory stores execution frames and local variables. Heap memory is allocated dynamically for runtime structures. Pointers represent direct memory boundaries.",
  },
  {
    id: "data_structures",
    step: 2,
    name: "Data Structures Mastery",
    status: "Completed",
    desc: "Arrays, Linked Lists, Stacks, Queues, Hash Tables, and Trees.",
    topicsCount: 18,
    questionsCount: 60,
    duration: "3 Weeks",
    difficulty: "Medium",
    prerequisites: "Programming Foundations",
    companies: ["Amazon", "Microsoft", "Adobe", "Uber"],
    subTopics: [
      { name: "Singly & Doubly Linked Lists", difficulty: "Medium", status: "Completed" },
      { name: "Binary Trees & BST Traversals", difficulty: "Medium", status: "Completed" },
      { name: "Stacks & Queues Array Implementation", difficulty: "Easy", status: "Completed" },
      { name: "Hash Tables & Collision Resolution", difficulty: "Hard", status: "Completed" },
    ],
    theory: "Linear structures organize data sequentially in memory. Linked lists use node pointers to cross-reference disjoint heap addresses, trading O(1) random access for dynamic insertions. Non-linear trees maintain hierarchical branch configurations.",
    practiceQuestions: [
      { name: "Reverse Linked List Nodes", difficulty: "Medium", link: "/studio" },
      { name: "Implement Stack using Queue", difficulty: "Medium", link: "/studio" },
      { name: "BST Lowest Common Ancestor", difficulty: "Hard", link: "/studio" },
    ],
    visualizations: ["Linked List Pointer Traversal", "Inorder Tree Recurse Flow"],
    revisionNotes: "Binary Search Tree holds structural invariants where all left descendants are smaller, and all right descendants are larger than parent node.",
  },
  {
    id: "algorithms",
    step: 3,
    name: "Algorithms Deep Dive",
    status: "In Progress",
    desc: "Sorting, Binary Search, Graph Traversals, and Backtracking.",
    topicsCount: 22,
    questionsCount: 75,
    duration: "4 Weeks",
    difficulty: "Medium",
    prerequisites: "Data Structures Mastery",
    companies: ["Google", "Meta", "Netflix", "Apple"],
    subTopics: [
      { name: "Binary Search Search-Space Reduction", difficulty: "Medium", status: "In Progress" },
      { name: "Graph Breadth-First & Depth-First Search", difficulty: "Medium", status: "Upcoming" },
      { name: "Merge & Quick Sort Partition Mechanics", difficulty: "Medium", status: "Completed" },
      { name: "Backtracking Recursion Pruning", difficulty: "Hard", status: "Upcoming" },
    ],
    theory: "Algorithms establish mathematical bounds (Big O) for complexity optimization. Binary search performs search-space pruning, decreasing processing scale logarithmically: O(log N). Graph BFS tracks shortest path levels, whereas DFS explores recursion paths.",
    practiceQuestions: [
      { name: "Binary Search target in Rotated Array", difficulty: "Medium", link: "/studio" },
      { name: "Graph Shortest Path (BFS)", difficulty: "Medium", link: "/studio" },
      { name: "N-Queens Backtracking Simulation", difficulty: "Hard", link: "/studio" },
    ],
    visualizations: ["Binary Search Boundary reduction", "BFS Tree Level illumination"],
    revisionNotes: "Always define base validation conditions in recursive algorithms to prevent stack overflow. Prune search branches early using bounding constraints.",
  },
  {
    id: "advanced_dsa",
    step: 4,
    name: "Advanced DSA & DP",
    status: "Upcoming",
    desc: "Dynamic Programming, Segment Trees, Disjoint Set Union.",
    topicsCount: 15,
    questionsCount: 40,
    duration: "3 Weeks",
    difficulty: "Hard",
    prerequisites: "Algorithms Deep Dive",
    companies: ["Google", "Meta", "Uber", "ByteDance"],
    subTopics: [
      { name: "1D & 2D Dynamic Programming (DP)", difficulty: "Hard", status: "Upcoming" },
      { name: "Segment Trees & Range Queries", difficulty: "Hard", status: "Upcoming" },
      { name: "Disjoint Set Union (DSU) Path Compression", difficulty: "Medium", status: "Upcoming" },
    ],
    theory: "Dynamic Programming resolves overlapping subproblems by storing intermediate answers (Memoization/Tabulation). Segment trees provide log-time query intervals across dynamic array segments.",
    practiceQuestions: [
      { name: "Trapping Rain Water 2D Array", difficulty: "Hard", link: "/studio" },
      { name: "Longest Common Subsequence DP", difficulty: "Medium", link: "/studio" },
      { name: "DSU Cycle Detection in Graph", difficulty: "Medium", link: "/studio" },
    ],
    visualizations: ["DP Table state dependency arrows", "Segment Tree interval division"],
    revisionNotes: "DP requires mapping state transitions: dp[i] = dp[i-1] + dp[i-2]. Verify overlapping constraints prior to coding.",
  },
  {
    id: "cs_fundamentals",
    step: 5,
    name: "CS Fundamentals",
    status: "Upcoming",
    desc: "Operating Systems, DBMS & SQL, Computer Networks.",
    topicsCount: 10,
    questionsCount: 30,
    duration: "2 Weeks",
    difficulty: "Medium",
    prerequisites: "None",
    companies: ["Oracle", "Cisco", "Qualcomm", "Intel"],
    subTopics: [
      { name: "OS Memory Management & Threading", difficulty: "Medium", status: "Upcoming" },
      { name: "DBMS ACID Transaction Isolation levels", difficulty: "Hard", status: "Upcoming" },
      { name: "TCP/IP Three-Way Handshake protocol", difficulty: "Easy", status: "Upcoming" },
    ],
    theory: "Operating system fundamentals explain resource scheduling, thread concurrency, virtual memory pages, and thread locks. Database Management Systems enforce consistency through ACID principles.",
    practiceQuestions: [
      { name: "Write Complex SQL JOIN Query", difficulty: "Medium", link: "/studio" },
      { name: "Implement Thread Pool in C++", difficulty: "Hard", link: "/studio" },
    ],
    visualizations: ["Virtual memory page mapping", "TCP packet segments flow"],
    revisionNotes: "ACID stands for Atomicity, Consistency, Isolation, and Durability. Isolation levels prevent dirty reads, non-repeatable reads, and phantom reads.",
  },
  {
    id: "placement_ready",
    step: 6,
    name: "Software Placement Success",
    status: "Locked",
    desc: "Mock Interviews, Resume optimization, company specific prep.",
    topicsCount: 8,
    questionsCount: 20,
    duration: "Immediate",
    difficulty: "Elite",
    prerequisites: "All previous checkpoints",
    companies: ["Your Dream Job"],
    subTopics: [
      { name: "Technical Portfolio Architecture", difficulty: "Medium", status: "Upcoming" },
      { name: "Behavioral STAR interview questions", difficulty: "Easy", status: "Upcoming" },
      { name: "Company-specific Past Papers", difficulty: "Hard", status: "Upcoming" },
    ],
    theory: "The final stretch focuses on systemic communication, project packaging, behavioral leadership alignment, and simulated company test patterns.",
    practiceQuestions: [
      { name: "Mock System Design: Uber Backend", difficulty: "Hard", link: "/studio" },
      { name: "STAR method presentation practice", difficulty: "Easy", link: "/studio" },
    ],
    visualizations: ["Microservices API gateway architecture"],
    revisionNotes: "Format responses using STAR: Situation, Task, Action, Result. Highlight measurable engineering impacts.",
  },
];

// Service stations / checkpoints located along the road curves
interface ServiceStation {
  id: string;
  name: string;
  type: "revision" | "mock" | "contest" | "resume";
  yOffset: number; // Percent down the road SVG
  xOffset: number; // Pixels off-center
  description: string;
}

const SERVICE_STATIONS: ServiceStation[] = [
  { id: "s1", name: "Revision Stop: Foundations", type: "revision", yOffset: 12, xOffset: -10, description: "Review time complexity boundaries & memory references." },
  { id: "s2", name: "Mock Test Station: DS", type: "mock", yOffset: 28, xOffset: 15, description: "Compete in a 90-minute stack & linked lists benchmark test." },
  { id: "s3", name: "Weekly Assessment: Algorithms", type: "mock", yOffset: 46, xOffset: -15, description: "Verify sorting & search invariants under time limits." },
  { id: "s4", name: "Contest Stop: Advanced DSA", type: "contest", yOffset: 65, xOffset: 20, description: "Participate in CodeZilaa Weekly Placement Contest." },
  { id: "s5", name: "Resume Review checkpoint", type: "resume", yOffset: 82, xOffset: -10, description: "Analyze project packaging and key impact statements." },
];

export default function HighwayRoadmapPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedMilestoneId, setExpandedMilestoneId] = useState<string | null>("algorithms");
  const [hoveredStation, setHoveredStation] = useState<ServiceStation | null>(null);
  const [activeTab, setActiveTab] = useState<"theory" | "practice" | "vis" | "notes">("theory");

  const roadContainerRef = useRef<HTMLDivElement>(null);

  // Focus a milestone and center it on the screen
  const handleMilestoneClick = (id: string) => {
    if (expandedMilestoneId === id) {
      setExpandedMilestoneId(null);
      return;
    }
    setExpandedMilestoneId(id);
    setActiveTab("theory");

    // Smooth scroll to the component
    setTimeout(() => {
      const element = document.getElementById(`milestone-${id}`);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }, 150);
  };

  const filteredMilestones = MILESTONES.filter((m) =>
    m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    m.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
    m.subTopics.some((t) => t.name.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="space-y-8 select-none max-w-[1400px] mx-auto pb-24">
      {/* 1. PROGRESS VISUALIZATION (COMPLETION TRACKER) */}
      <div className="relative overflow-hidden bg-gradient-to-r from-purple-500/10 via-[#121215] to-indigo-500/10 border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl">
        <div className="absolute top-0 right-0 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/15 border border-purple-500/30 text-purple-300 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5 animate-pulse" /> Complete Placement Journey Highway
            </div>
            <h1 className="text-3xl font-extrabold text-white tracking-tight">Your Placement Journey</h1>
            <p className="text-xs sm:text-sm text-gray-400 max-w-xl">
              Track your progress from baseline foundations to dynamic programming and mock assessments. Follow the vertical highway to status unlock.
            </p>
          </div>

          {/* Progress bar */}
          <div className="w-full md:w-80 space-y-2 shrink-0">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-gray-400">Total Progress</span>
              <span className="font-bold text-purple-300">72% Completed</span>
            </div>
            <div className="w-full bg-white/5 border border-white/10 h-3 rounded-full overflow-hidden p-0.5">
              <div className="bg-gradient-to-r from-purple-500 to-indigo-600 h-full rounded-full w-[72%] shadow-lg shadow-purple-500/30" />
            </div>
            <div className="flex justify-between text-[10px] text-gray-500 font-mono">
              <span>182 Topics Done</span>
              <span>68 Remaining</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. SEARCH & FILTER HUB */}
      <div className="flex items-center gap-3 bg-[#121215] border border-white/10 rounded-2xl px-4 py-2.5 max-w-md">
        <Search className="w-4.5 h-4.5 text-gray-500 shrink-0" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search placement checkpoints, topics, concepts..."
          className="bg-transparent text-xs text-white placeholder-gray-500 w-full focus:outline-none"
        />
      </div>

      {/* 3. HIGHWAY DISPLAY WINDOW */}
      <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left/Center Highway Map Column (Occupies 5 Columns on desktop) */}
        <div
          ref={roadContainerRef}
          className="lg:col-span-5 bg-[#0c0c0f] border border-white/10 rounded-3xl p-6 relative overflow-hidden flex flex-col items-center min-h-[900px] shadow-2xl"
        >
          <div className="text-center mb-6 shrink-0 z-10">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center justify-center gap-1.5">
              <Compass className="w-4 h-4 text-purple-400" />
              <span>Placement Road map Guide</span>
            </h3>
            <p className="text-[10px] text-gray-500 mt-0.5">Vertical path coordinates. Select to focus details.</p>
          </div>

          {/* SVG Asphalt Winding Road System */}
          <div className="absolute inset-0 top-16 bottom-16 flex justify-center w-full select-none pointer-events-none">
            <svg className="w-full h-full min-h-[750px]" style={{ overflow: "visible" }}>
              <defs>
                <linearGradient id="glowing-grad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#8b5cf6" />
                  <stop offset="50%" stopColor="#6366f1" />
                  <stop offset="100%" stopColor="#3b82f6" />
                </linearGradient>
                <filter id="glow">
                  <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
                  <feMerge>
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
              </defs>

              {/* Asphalt Path Curve */}
              <path
                d="M 220 20 Q 280 180 180 320 T 260 620 T 180 920"
                stroke="#1c1c24"
                strokeWidth="48"
                fill="none"
                strokeLinecap="round"
              />

              {/* Lane Markings Asphalt border */}
              <path
                d="M 220 20 Q 280 180 180 320 T 260 620 T 180 920"
                stroke="#2a2b36"
                strokeWidth="44"
                fill="none"
                strokeLinecap="round"
              />

              {/* Dashed Center Markings */}
              <path
                d="M 220 20 Q 280 180 180 320 T 260 620 T 180 920"
                stroke="#fbbf24"
                strokeWidth="2"
                strokeDasharray="8 12"
                fill="none"
                strokeLinecap="round"
              />

              {/* Illuminated Path traversed by Student */}
              <path
                d="M 220 20 Q 280 180 180 320 T 260 480"
                stroke="url(#glowing-grad)"
                strokeWidth="4"
                fill="none"
                strokeLinecap="round"
                filter="url(#glow)"
                className="animate-pulse"
              />
            </svg>
          </div>

          {/* Interactive Checkpoint Nodes Placement Directly Over Curve */}
          {/* Coordinates correspond to Q curve nodes: Programming Foundations (y=5%), Data Structures (y=22%), Algorithms (y=40%), DP (y=58%), Fundamentals (y=75%), Placement Ready (y=92%) */}
          <div className="absolute inset-0 top-16 bottom-16 w-full pointer-events-none select-none">
            {/* Programming Foundations Checkpoint Node */}
            <button
              onClick={() => handleMilestoneClick("programming_foundations")}
              className="absolute left-[220px] top-[2%] -ml-4 w-8 h-8 rounded-full bg-green-500 border-4 border-[#0c0c0f] shadow-lg shadow-green-500/50 flex items-center justify-center font-bold text-xs text-[#0c0c0f] cursor-pointer pointer-events-auto hover:scale-110 transition-transform"
              title="Programming Foundations (Completed)"
            >
              ✓
            </button>

            {/* Data Structures Checkpoint Node */}
            <button
              onClick={() => handleMilestoneClick("data_structures")}
              className="absolute left-[242px] top-[22%] -ml-4 w-8 h-8 rounded-full bg-green-500 border-4 border-[#0c0c0f] shadow-lg shadow-green-500/50 flex items-center justify-center font-bold text-xs text-[#0c0c0f] cursor-pointer pointer-events-auto hover:scale-110 transition-transform"
              title="Data Structures Mastery (Completed)"
            >
              ✓
            </button>

            {/* Algorithms Checkpoint Node (Pulsing Active Vehicle Position) */}
            <div className="absolute left-[182px] top-[40%] -ml-6 -mt-2.5 z-20 flex flex-col items-center">
              {/* Vehicle marker */}
              <motion.div
                animate={{ scale: [1, 1.15, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
                onClick={() => handleMilestoneClick("algorithms")}
                className="w-10 h-10 rounded-full bg-cyan-400 border-4 border-[#0c0c0f] shadow-xl shadow-cyan-400/80 flex items-center justify-center font-extrabold text-[10px] text-black cursor-pointer pointer-events-auto hover:rotate-12"
                title="Algorithms Deep Dive (In Progress - You are here)"
              >
                🚗
              </motion.div>
              {/* Pointer indicator */}
              <span className="text-[8px] font-mono text-cyan-300 font-bold bg-[#09090b] border border-cyan-400/30 px-1 rounded mt-1 shadow">
                You
              </span>
            </div>

            {/* Advanced DSA Checkpoint Node */}
            <button
              onClick={() => handleMilestoneClick("advanced_dsa")}
              className="absolute left-[230px] top-[58%] -ml-4 w-8 h-8 rounded-full bg-[#18181c] border-4 border-white/10 hover:border-purple-500/30 shadow flex items-center justify-center text-gray-500 cursor-pointer pointer-events-auto hover:scale-110 transition-all"
              title="Advanced DSA (Locked)"
            >
              4
            </button>

            {/* CS Fundamentals Checkpoint Node */}
            <button
              onClick={() => handleMilestoneClick("cs_fundamentals")}
              className="absolute left-[210px] top-[75%] -ml-4 w-8 h-8 rounded-full bg-[#18181c] border-4 border-white/10 hover:border-purple-500/30 shadow flex items-center justify-center text-gray-500 cursor-pointer pointer-events-auto hover:scale-110 transition-all"
              title="CS Fundamentals (Locked)"
            >
              5
            </button>

            {/* Placement Ready Node (Final Destination) */}
            <div className="absolute left-[180px] top-[92%] -ml-5 flex flex-col items-center">
              <button
                onClick={() => handleMilestoneClick("placement_ready")}
                className="w-10 h-10 rounded-full bg-[#1e1a24] border-4 border-dashed border-purple-500/40 hover:border-purple-500 flex items-center justify-center text-xs text-purple-400 cursor-pointer pointer-events-auto hover:scale-110 transition-all"
                title="Placement Ready Destination (Locked)"
              >
                🏁
              </button>
              <span className="text-[8px] font-bold text-purple-400 mt-0.5 tracking-wider uppercase font-mono">
                Placement
              </span>
            </div>

            {/* Service Stations Placed on Path */}
            {SERVICE_STATIONS.map((station) => {
              const isRevision = station.type === "revision";
              const isMock = station.type === "mock";
              const isContest = station.type === "contest";
              const isResume = station.type === "resume";

              // Calculate positions matching curvature
              let leftX = 220;
              if (station.yOffset < 20) leftX = 220 + (station.yOffset / 20) * 22;
              else if (station.yOffset < 40) leftX = 242 - ((station.yOffset - 20) / 20) * 60;
              else if (station.yOffset < 60) leftX = 182 + ((station.yOffset - 40) / 20) * 48;
              else if (station.yOffset < 80) leftX = 230 - ((station.yOffset - 60) / 20) * 20;
              else leftX = 210 - ((station.yOffset - 75) / 25) * 30;

              return (
                <div
                  key={station.id}
                  className="absolute pointer-events-auto z-10"
                  style={{
                    left: `${leftX + station.xOffset}px`,
                    top: `${station.yOffset}%`,
                  }}
                >
                  <button
                    onMouseEnter={() => setHoveredStation(station)}
                    onMouseLeave={() => setHoveredStation(null)}
                    className={`w-5 h-5 rounded-lg border-2 border-[#0c0c0f] flex items-center justify-center text-[9px] cursor-pointer shadow transition-all ${
                      isRevision
                        ? "bg-amber-500/80 text-black border-amber-300"
                        : isMock
                        ? "bg-indigo-500/80 text-white"
                        : isContest
                        ? "bg-rose-500/80 text-white"
                        : "bg-blue-500/80 text-white"
                    }`}
                  >
                    ⛽
                  </button>
                </div>
              );
            })}
          </div>

          {/* Hover Service Station Info Drawer */}
          <div className="mt-auto w-full pt-6 border-t border-white/5 z-10 min-h-[100px]">
            <AnimatePresence mode="wait">
              {hoveredStation ? (
                <motion.div
                  key={hoveredStation.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="p-3 bg-purple-500/5 border border-purple-500/20 rounded-2xl"
                >
                  <div className="flex items-center justify-between text-[11px] font-bold">
                    <span className="text-purple-300 flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5" /> {hoveredStation.name}
                    </span>
                    <span className="text-[9px] uppercase tracking-wider text-purple-400 bg-purple-500/10 px-2 py-0.5 rounded font-mono">
                      Service Station
                    </span>
                  </div>
                  <p className="text-[10px] text-gray-400 mt-1">{hoveredStation.description}</p>
                </motion.div>
              ) : (
                <div className="h-full flex items-center justify-center text-center text-[10px] text-gray-500 italic py-4">
                  Hover over roadside service stations ⛽ to review assessments and practice steps.
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Right Detail / Expansive Content Column (Occupies 7 Columns) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <LineChart className="w-4 h-4 text-purple-400" /> Checkpoint Detail Workstations
            </h2>
            <span className="text-xs text-gray-400 font-mono">Selected: {filteredMilestones.length} active</span>
          </div>

          <div className="space-y-6">
            {filteredMilestones.map((milestone) => {
              const isExpanded = expandedMilestoneId === milestone.id;
              const isCompleted = milestone.status === "Completed";
              const isInProgress = milestone.status === "In Progress";

              return (
                <div
                  key={milestone.id}
                  id={`milestone-${milestone.id}`}
                  className={`bg-[#121215] border rounded-3xl p-5 shadow-2xl transition-all duration-300 ${
                    isExpanded
                      ? "border-purple-500/60 shadow-lg shadow-purple-500/10"
                      : isInProgress
                      ? "border-cyan-500/30 hover:border-cyan-500/50"
                      : "border-white/10 hover:border-white/20"
                  }`}
                >
                  {/* Card Header information */}
                  <div
                    onClick={() => handleMilestoneClick(milestone.id)}
                    className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 cursor-pointer"
                  >
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2.5">
                        <span className={`w-6 h-6 rounded-xl flex items-center justify-center font-bold text-[11px] ${
                          isCompleted
                            ? "bg-green-500/20 text-green-400 border border-green-500/30"
                            : isInProgress
                            ? "bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 animate-pulse"
                            : "bg-gray-800 text-gray-500"
                        }`}>
                          {milestone.step}
                        </span>
                        <h3 className="text-sm font-bold text-white tracking-tight">{milestone.name}</h3>
                        <span className={`text-[9px] font-extrabold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                          isCompleted
                            ? "bg-green-500/10 text-green-400 border border-green-500/20"
                            : isInProgress
                            ? "bg-cyan-500/10 text-cyan-400 border border-cyan-500/20"
                            : "bg-gray-800 text-gray-400 border border-white/5"
                        }`}>
                          {milestone.status}
                        </span>
                      </div>
                      <p className="text-xs text-gray-400 leading-normal max-w-xl">{milestone.desc}</p>
                    </div>

                    {/* Checkpoint Stats badges */}
                    <div className="flex items-center gap-2 flex-wrap shrink-0">
                      <div className="px-2.5 py-1 rounded-xl bg-white/5 border border-white/5 text-[10px] text-gray-400 font-mono">
                        {milestone.topicsCount} Topics
                      </div>
                      <div className="px-2.5 py-1 rounded-xl bg-white/5 border border-white/5 text-[10px] text-gray-400 font-mono">
                        {milestone.questionsCount} QA
                      </div>
                      <div className="px-2.5 py-1 rounded-xl bg-white/5 border border-white/5 text-[10px] text-gray-400 font-mono">
                        {milestone.duration}
                      </div>
                    </div>
                  </div>

                  {/* Detail expandable Hub */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden mt-5 pt-5 border-t border-white/10 space-y-5"
                      >
                        {/* Hub Tabs */}
                        <div className="flex flex-wrap items-center gap-1 bg-[#18181c] p-1 rounded-xl border border-white/5">
                          <button
                            onClick={() => setActiveTab("theory")}
                            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold cursor-pointer ${
                              activeTab === "theory" ? "bg-purple-600 text-white" : "text-gray-400 hover:text-white"
                            }`}
                          >
                            Conceptual Theory
                          </button>
                          <button
                            onClick={() => setActiveTab("practice")}
                            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold cursor-pointer ${
                              activeTab === "practice" ? "bg-purple-600 text-white" : "text-gray-400 hover:text-white"
                            }`}
                          >
                            Practice Problems
                          </button>
                          <button
                            onClick={() => setActiveTab("vis")}
                            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold cursor-pointer ${
                              activeTab === "vis" ? "bg-purple-600 text-white" : "text-gray-400 hover:text-white"
                            }`}
                          >
                            Visualization Lessons
                          </button>
                          <button
                            onClick={() => setActiveTab("notes")}
                            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold cursor-pointer ${
                              activeTab === "notes" ? "bg-purple-600 text-white" : "text-gray-400 hover:text-white"
                            }`}
                          >
                            Cheat Sheet Notes
                          </button>
                        </div>

                        {/* Tab Content Canvas */}
                        <div className="min-h-[140px] p-4 bg-[#09090b] border border-white/5 rounded-2xl text-xs leading-relaxed text-gray-300">
                          {activeTab === "theory" && (
                            <div className="space-y-3">
                              <div className="font-bold text-white text-xs flex items-center gap-1.5">
                                <BookOpen className="w-4 h-4 text-purple-400" />
                                <span>Curriculum Overview</span>
                              </div>
                              <p className="text-gray-400">{milestone.theory}</p>
                              
                              <div className="pt-2">
                                <span className="font-semibold text-gray-400 block mb-1.5">Topics Covered:</span>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 font-mono text-[10px]">
                                  {milestone.subTopics.map((topic, i) => (
                                    <div key={i} className="p-2 bg-white/5 rounded-lg border border-white/5 flex justify-between items-center">
                                      <span className="text-gray-300 truncate">{topic.name}</span>
                                      <span className={`px-1.5 py-0.5 rounded text-[8px] font-bold ${
                                        topic.difficulty === "Easy" ? "bg-green-500/10 text-green-400" :
                                        topic.difficulty === "Medium" ? "bg-yellow-500/10 text-yellow-400" :
                                        "bg-red-500/10 text-red-400"
                                      }`}>
                                        {topic.difficulty}
                                      </span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                          )}

                          {activeTab === "practice" && (
                            <div className="space-y-3">
                              <div className="font-bold text-white text-xs flex items-center gap-1.5">
                                <HelpCircle className="w-4 h-4 text-cyan-400" />
                                <span>Curated Practice Problems</span>
                              </div>
                              <p className="text-gray-400">Run code directly inside the CodeZilaa Compiler studio.</p>

                              <div className="space-y-2">
                                {milestone.practiceQuestions.map((q, idx) => (
                                  <div
                                    key={idx}
                                    className="p-3 bg-white/5 border border-white/5 rounded-xl flex items-center justify-between gap-4"
                                  >
                                    <div>
                                      <span className="font-semibold text-white text-xs">{q.name}</span>
                                      <span className={`ml-2 px-1.5 py-0.5 text-[8px] font-bold rounded uppercase ${
                                        q.difficulty === "Easy" ? "bg-green-500/15 text-green-400" :
                                        q.difficulty === "Medium" ? "bg-yellow-500/15 text-yellow-400" :
                                        "bg-red-500/15 text-red-400"
                                      }`}>
                                        {q.difficulty}
                                      </span>
                                    </div>
                                    <Link
                                      href={q.link}
                                      className="px-3 py-1.5 rounded-lg bg-purple-600 hover:bg-purple-500 text-white font-bold text-[10px] flex items-center gap-1 transition-colors cursor-pointer"
                                    >
                                      <span>Code</span>
                                      <ArrowRight className="w-3 h-3" />
                                    </Link>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          {activeTab === "vis" && (
                            <div className="space-y-3">
                              <div className="font-bold text-white text-xs flex items-center gap-1.5">
                                <Sparkles className="w-4 h-4 text-purple-400 animate-pulse" />
                                <span>Interactive Visualization Lessons</span>
                              </div>
                              <p className="text-gray-400">Step-by-step algorithms simulation logs available.</p>
                              
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1.5">
                                {milestone.visualizations.map((vis, idx) => (
                                  <div key={idx} className="p-3 bg-purple-500/5 border border-purple-500/10 rounded-xl flex items-center gap-2">
                                    <span className="text-purple-300 text-xs font-semibold font-mono">🎥 {vis}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          {activeTab === "notes" && (
                            <div className="space-y-3">
                              <div className="font-bold text-white text-xs flex items-center gap-1.5">
                                <Lightbulb className="w-4 h-4 text-amber-400" />
                                <span>Complexity Cheat Sheet & Revision Notes</span>
                              </div>
                              <p className="text-gray-400 leading-relaxed font-mono text-[11px] bg-white/5 p-3 rounded-xl border border-white/5">
                                {milestone.revisionNotes}
                              </p>
                              
                              <div className="grid grid-cols-2 gap-3 text-[10px] pt-1">
                                <div className="p-2.5 bg-white/5 rounded-xl">
                                  <span className="text-gray-500 block">Prerequisites:</span>
                                  <span className="text-gray-300 font-semibold">{milestone.prerequisites}</span>
                                </div>
                                <div className="p-2.5 bg-white/5 rounded-xl">
                                  <span className="text-gray-500 block">Estimated Time:</span>
                                  <span className="text-gray-300 font-semibold">{milestone.duration}</span>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>

                        {/* target placements companies list */}
                        <div className="pt-3 border-t border-white/5 flex flex-wrap items-center gap-2">
                          <span className="text-[10px] text-gray-500 uppercase font-bold flex items-center gap-1 mr-1">
                            <Building2 className="w-3.5 h-3.5" /> Asked Frequently In:
                          </span>
                          {milestone.companies.map((company, i) => (
                            <span
                              key={i}
                              className="px-2 py-0.5 rounded bg-white/5 border border-white/5 text-[10px] text-gray-400 font-mono"
                            >
                              {company}
                            </span>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
