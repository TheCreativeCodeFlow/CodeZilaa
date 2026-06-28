"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Code2,
  Search,
  ChevronRight,
  User,
  LogOut,
  Settings,
  Shield,
  Menu,
  Sparkles,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useWorkspace } from "@/context/WorkspaceContext";
import NotificationsDropdown from "./NotificationsDropdown";

export default function TopNavbar() {
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const { setCommandPaletteOpen, toggleSidebar } = useWorkspace();
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const getBreadcrumbTitle = (path: string) => {
    const segments = path.split("/").filter(Boolean);
    if (segments.length <= 1) return "Home Dashboard";
    const sub = segments[1];
    switch (sub) {
      case "practice":
        return "Coding Practice Studio";
      case "compiler":
        return "Multi-Language Compiler";
      case "visualizer":
        return "Execution Visualizer";
      case "roadmaps":
        return "Placement Roadmaps";
      case "aptitude":
        return "Aptitude & Reasoning";
      case "progress":
        return "Analytics & Progress";
      case "profile":
        return "User Profile";
      case "settings":
        return "Workspace Settings";
      default:
        return sub.charAt(0).toUpperCase() + sub.slice(1);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-40 h-16 bg-[#0c0c0e]/80 backdrop-blur-xl border-b border-white/10 flex items-center justify-between px-4 lg:px-6 select-none">
      {/* Left section: Mobile menu toggle, Logo & Breadcrumbs */}
      <div className="flex items-center gap-3 lg:gap-4">
        <button
          onClick={toggleSidebar}
          className="p-2 rounded-xl text-gray-400 hover:text-white hover:bg-white/5 transition-colors lg:hidden cursor-pointer"
          aria-label="Toggle Navigation Sidebar"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Brand Logo */}
        <Link href="/workspace" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-cyan-500 to-indigo-600 p-0.5 shadow-md shadow-cyan-500/20 group-hover:scale-105 transition-transform">
            <div className="w-full h-full bg-[#090909] rounded-[10px] flex items-center justify-center">
              <Code2 className="w-4 h-4 text-cyan-400" />
            </div>
          </div>
          <span className="font-bold text-base tracking-tight text-white hidden sm:flex items-center">
            Code<span className="text-cyan-400">Zilaa</span>
          </span>
        </Link>

        {/* Divider & Breadcrumbs */}
        <div className="hidden sm:flex items-center gap-2 text-xs text-gray-500 font-medium pl-2 border-l border-white/10">
          <span className="text-gray-400">Workspace</span>
          <ChevronRight className="w-3.5 h-3.5 text-gray-600" />
          <span className="text-white font-semibold">{getBreadcrumbTitle(pathname)}</span>
        </div>
      </div>

      {/* Center Section: Search Bar Button */}
      <div className="flex-1 max-w-md mx-4 hidden md:block">
        <button
          onClick={() => setCommandPaletteOpen(true)}
          className="w-full flex items-center justify-between px-4 py-2 bg-[#141418] hover:bg-[#1a1a20] border border-white/10 hover:border-cyan-500/30 rounded-xl text-xs text-gray-400 transition-all cursor-pointer group shadow-inner"
        >
          <div className="flex items-center gap-2.5">
            <Search className="w-4 h-4 text-gray-500 group-hover:text-cyan-400 transition-colors" />
            <span>Search topics, compiler, roadmaps...</span>
          </div>
          <kbd className="px-2 py-0.5 font-mono text-[10px] font-semibold text-gray-400 bg-white/5 border border-white/10 rounded-md">
            ⌘K
          </kbd>
        </button>
      </div>

      {/* Right Section: Actions & Profile */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Mobile Search Icon */}
        <button
          onClick={() => setCommandPaletteOpen(true)}
          className="p-2 rounded-xl text-gray-400 hover:text-white hover:bg-white/5 transition-colors md:hidden cursor-pointer"
          aria-label="Search Workspace"
        >
          <Search className="w-5 h-5" />
        </button>

        {/* System Notifications */}
        <NotificationsDropdown />

        {/* User Profile Dropdown */}
        <div className="relative" ref={profileRef}>
          <button
            onClick={() => setProfileOpen(!profileOpen)}
            className="flex items-center gap-2.5 p-1.5 rounded-xl hover:bg-white/5 border border-transparent hover:border-white/10 transition-all cursor-pointer"
          >
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-cyan-500 to-indigo-500 p-0.5 shadow-md shadow-cyan-500/20">
              <div className="w-full h-full bg-[#121215] rounded-[10px] flex items-center justify-center font-bold text-xs text-cyan-300">
                {user?.name ? user.name.charAt(0).toUpperCase() : "U"}
              </div>
            </div>
            <div className="text-left hidden lg:block">
              <div className="text-xs font-semibold text-white leading-tight">{user?.name || "Developer"}</div>
              <div className="text-[10px] text-cyan-400 font-mono">Pro Workstation</div>
            </div>
          </button>

          <AnimatePresence>
            {profileOpen && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="absolute right-0 mt-3 w-64 bg-[#121215] border border-white/10 rounded-2xl shadow-2xl shadow-black/90 p-3 z-50 overflow-hidden"
              >
                {/* User info box */}
                <div className="p-3 bg-white/5 rounded-xl border border-white/5 mb-2">
                  <div className="text-xs font-bold text-white">{user?.name || "Developer"}</div>
                  <div className="text-[11px] text-gray-400 truncate mt-0.5">{user?.email || "alex@example.com"}</div>
                  <div className="inline-flex items-center gap-1 mt-2 px-2 py-0.5 rounded bg-cyan-500/10 border border-cyan-500/20 text-[10px] font-semibold text-cyan-400">
                    <Sparkles className="w-3 h-3" /> {user?.college || "Placement Ready"}
                  </div>
                </div>

                {/* Navigation Menu items */}
                <div className="space-y-1 text-xs font-medium text-gray-300">
                  <Link
                    href="/workspace/profile"
                    onClick={() => setProfileOpen(false)}
                    className="flex items-center gap-2.5 px-3 py-2 rounded-xl hover:bg-white/10 hover:text-white transition-colors"
                  >
                    <User className="w-4 h-4 text-cyan-400" />
                    <span>My Profile</span>
                  </Link>
                  <Link
                    href="/workspace/settings"
                    onClick={() => setProfileOpen(false)}
                    className="flex items-center gap-2.5 px-3 py-2 rounded-xl hover:bg-white/10 hover:text-white transition-colors"
                  >
                    <Settings className="w-4 h-4 text-indigo-400" />
                    <span>Workspace Settings</span>
                  </Link>
                  <div className="border-t border-white/5 my-1" />
                  <button
                    onClick={() => {
                      setProfileOpen(false);
                      logout();
                    }}
                    className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-red-400 hover:bg-red-500/10 transition-colors cursor-pointer text-left"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Sign Out</span>
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
}
