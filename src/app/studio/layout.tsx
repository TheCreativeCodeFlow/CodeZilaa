"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AuthProvider, useAuth } from "@/context/AuthContext";
import BackgroundEffects from "@/components/ui/BackgroundEffects";
import { Loader2 } from "lucide-react";

function StudioGuard({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth();
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
        <p className="text-sm font-mono text-gray-400">Launching CodeZilaa Studio...</p>
      </div>
    );
  }

  return (
    <div className="h-screen w-screen bg-[#09090b] text-white selection:bg-cyan-500/30 selection:text-white overflow-hidden flex flex-col">
      <BackgroundEffects />
      <div className="relative z-10 flex-1 flex flex-col h-full overflow-hidden">
        {children}
      </div>
    </div>
  );
}

export default function StudioLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <StudioGuard>{children}</StudioGuard>
    </AuthProvider>
  );
}
