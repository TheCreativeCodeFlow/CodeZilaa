"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AuthProvider, useAuth } from "@/context/AuthContext";
import { WorkspaceProvider, useWorkspace } from "@/context/WorkspaceContext";
import BackgroundEffects from "@/components/ui/BackgroundEffects";
import TopNavbar from "@/components/workspace/TopNavbar";
import LeftSidebar from "@/components/workspace/LeftSidebar";
import RightContextPanel from "@/components/workspace/RightContextPanel";
import CommandPalette from "@/components/workspace/CommandPalette";
import { Loader2 } from "lucide-react";

function WorkspaceGuard({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth();
  const { sidebarCollapsed } = useWorkspace();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && !isLoading && !isAuthenticated) {
      router.push("/auth?mode=login");
    }
  }, [mounted, isLoading, isAuthenticated, router]);

  if (!mounted || isLoading || !isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#090909] flex flex-col items-center justify-center text-white selection:bg-cyan-500/30">
        <Loader2 className="w-8 h-8 text-cyan-400 animate-spin mb-3" />
        <p className="text-sm font-mono text-gray-400">Loading Workspace Shell...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#090909] text-white selection:bg-cyan-500/30 selection:text-white overflow-x-hidden">
      <BackgroundEffects />
      <TopNavbar />
      <LeftSidebar />

      {/* Main Workspace Area with Dynamic Sidebar Padding */}
      <div
        className={`pt-16 transition-all duration-300 flex ${
          sidebarCollapsed ? "lg:pl-20" : "lg:pl-60"
        }`}
      >
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full min-h-[calc(100vh-4rem)]">
          {children}
        </main>
        <RightContextPanel />
      </div>

      <CommandPalette />
    </div>
  );
}

export default function WorkspaceLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <WorkspaceProvider>
        <WorkspaceGuard>{children}</WorkspaceGuard>
      </WorkspaceProvider>
    </AuthProvider>
  );
}
