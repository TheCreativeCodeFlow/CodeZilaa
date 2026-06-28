"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  Code2,
  Terminal,
  Cpu,
  MapPin,
  BookOpen,
  BarChart3,
  User,
  Settings,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  X,
} from "lucide-react";
import { useWorkspace } from "@/context/WorkspaceContext";

export default function LeftSidebar() {
  const pathname = usePathname();
  const { sidebarCollapsed, toggleSidebar } = useWorkspace();

  const navItems = [
    { name: "Home", href: "/workspace", icon: LayoutDashboard, category: "Core" },
    { name: "Coding Practice", href: "/workspace/practice", icon: Code2, category: "Core" },
    { name: "CodeZilaa Studio", href: "/studio", icon: Terminal, category: "Tools" },
    { name: "Visualizer", href: "/workspace/visualizer", icon: Cpu, category: "Tools" },
    { name: "Roadmaps", href: "/workspace/roadmaps", icon: MapPin, category: "Learning" },
    { name: "Aptitude", href: "/workspace/aptitude", icon: BookOpen, category: "Learning" },
    { name: "Progress", href: "/workspace/progress", icon: BarChart3, category: "Analytics" },
    { name: "Profile", href: "/workspace/profile", icon: User, category: "Account" },
    { name: "Settings", href: "/workspace/settings", icon: Settings, category: "Account" },
  ];

  return (
    <>
      {/* Desktop Sidebar */}
      <motion.aside
        animate={{ width: sidebarCollapsed ? 76 : 240 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="fixed top-16 bottom-0 left-0 z-30 hidden lg:flex flex-col justify-between p-3 bg-[#0c0c0e]/90 backdrop-blur-xl border-r border-white/10 select-none overflow-hidden"
      >
        {/* Navigation Items List */}
        <div className="space-y-6 pt-2 overflow-y-auto overflow-x-hidden pr-1">
          {/* Group items by section or render cleanly */}
          <div className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`relative flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all group cursor-pointer ${
                    isActive
                      ? "text-white"
                      : "text-gray-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {/* Active highlight background */}
                  {isActive && (
                    <motion.div
                      layoutId="activeSidebarHighlight"
                      className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-indigo-500/20 border border-cyan-400/30 rounded-xl shadow-inner -z-10"
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    />
                  )}

                  <Icon
                    className={`w-4 h-4 shrink-0 transition-colors ${
                      isActive ? "text-cyan-400" : "text-gray-400 group-hover:text-cyan-400"
                    }`}
                  />

                  <AnimatePresence mode="wait">
                    {!sidebarCollapsed && (
                      <motion.span
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        className="truncate tracking-wide"
                      >
                        {item.name}
                      </motion.span>
                    )}
                  </AnimatePresence>

                  {/* Tooltip on collapse */}
                  {sidebarCollapsed && (
                    <div className="absolute left-16 px-2.5 py-1 rounded-lg bg-[#18181c] border border-white/10 text-white text-xs font-medium opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity shadow-xl whitespace-nowrap z-50">
                      {item.name}
                    </div>
                  )}
                </Link>
              );
            })}
          </div>
        </div>

        {/* Bottom Collapse Toggle & Pro Status */}
        <div className="pt-3 border-t border-white/10 space-y-2">
          {!sidebarCollapsed && (
            <div className="p-3 bg-gradient-to-r from-cyan-500/10 to-indigo-500/10 border border-cyan-500/20 rounded-xl">
              <div className="flex items-center gap-2 text-xs font-bold text-white mb-1">
                <Sparkles className="w-3.5 h-3.5 text-cyan-400" /> Placement Ready
              </div>
              <p className="text-[10px] text-gray-400 leading-tight">
                94% Readiness Score. Keep practicing daily.
              </p>
            </div>
          )}

          <button
            onClick={toggleSidebar}
            className="w-full flex items-center justify-center p-2 rounded-xl text-gray-400 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
            aria-label={sidebarCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
          >
            {sidebarCollapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
          </button>
        </div>
      </motion.aside>
    </>
  );
}
