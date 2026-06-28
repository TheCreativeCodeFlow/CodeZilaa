"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function LegacyVisualizerRedirect() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/visualizer");
  }, [router]);

  return (
    <div className="min-h-[400px] flex items-center justify-center text-gray-400 font-mono text-xs">
      Redirecting to Code Visualizer...
    </div>
  );
}
