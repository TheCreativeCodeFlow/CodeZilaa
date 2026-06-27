"use client";

import { useEffect, useState } from "react";

export default function BackgroundEffects() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Subtle Grid Pattern */}
      <div className="absolute inset-0 grid-pattern opacity-40" />

      {/* Mouse Follower Glow */}
      <div
        className="absolute w-[600px] h-[600px] rounded-full blur-[140px] opacity-15 transition-transform duration-700 ease-out bg-cyan-500/30"
        style={{
          transform: `translate(${mousePos.x - 300}px, ${mousePos.y - 300}px)`,
        }}
      />

      {/* Static Ambient Radial Glows */}
      <div className="absolute top-[-10%] left-[20%] w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[150px]" />
      <div className="absolute top-[40%] right-[-5%] w-[600px] h-[600px] bg-cyan-600/10 rounded-full blur-[180px]" />
      <div className="absolute bottom-[-10%] left-[30%] w-[700px] h-[700px] bg-blue-600/10 rounded-full blur-[200px]" />

      {/* Top Vignette Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#090909]/80 via-transparent to-[#090909]/90" />
    </div>
  );
}
