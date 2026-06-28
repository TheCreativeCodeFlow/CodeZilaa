"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

export default function CTA() {
  return (
    <section className="py-24 relative z-10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl bg-gradient-to-b from-[#141414] to-[#0d0d0d] border border-white/10 p-12 sm:p-20 text-center overflow-hidden shadow-2xl shadow-cyan-950/40">
          
          {/* Glowing Ambient Spotlights */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-cyan-500/15 rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[200px] bg-indigo-500/15 rounded-full blur-[100px] pointer-events-none" />

          <div className="relative z-10 max-w-3xl mx-auto space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Join 50,000+ Future Software Engineers</span>
            </div>

            <h2 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight leading-tight">
              Your Placement Journey <br />
              <span className="accent-gradient-text">Starts Here.</span>
            </h2>

            <p className="text-gray-400 text-base sm:text-lg max-w-xl mx-auto leading-relaxed">
              Transform the way you practice data structures, algorithms, and technical interviews. Build intuition that lasts a lifetime.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
              <Link
                href="/auth?mode=signup"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white text-black font-bold text-sm hover:bg-gray-100 transition-all shadow-xl shadow-white/10 hover:shadow-cyan-500/20 active:scale-95"
              >
                Start Learning Now
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href="#visualization"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[#181818] text-gray-200 font-medium text-sm border border-white/10 hover:bg-[#202020] hover:text-white transition-all active:scale-95"
              >
                Explore Interactive Engine
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
