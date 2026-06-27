"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles, ShieldCheck, Users, GraduationCap, Award } from "lucide-react";
import HeroInteractiveCode from "./hero/HeroInteractiveCode";

export default function Hero() {
  return (
    <section className="relative pt-32 pb-20 md:pt-44 md:pb-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Hero Column */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="lg:col-span-6 space-y-8 text-left"
          >
            {/* Tagline Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-xs font-semibold tracking-wide">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Next-Generation Placement Engineering</span>
            </div>

            {/* Massive Headline */}
            <h1 className="text-4xl sm:text-6xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.1]">
              Practice. <br />
              Understand. <br />
              <span className="accent-gradient-text">Become Interview Ready.</span>
            </h1>

            {/* Subheading */}
            <p className="text-base sm:text-lg text-gray-400 max-w-xl leading-relaxed font-normal">
              CodeZilaa helps students practice coding, visualize program execution line-by-line, improve problem-solving intuition, and master technical placements from a unified platform.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href="#signup"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-white text-black font-semibold text-sm hover:bg-gray-100 transition-all shadow-xl shadow-white/10 hover:shadow-cyan-500/20 active:scale-95"
              >
                Start Learning
                <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="#visualization"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#141414] text-gray-200 font-medium text-sm border border-white/10 hover:bg-[#181818] hover:text-white transition-all active:scale-95"
              >
                Explore Platform
              </a>
            </div>

            {/* Trust Indicators */}
            <div className="pt-8 border-t border-white/10 grid grid-cols-3 gap-6">
              <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-white font-bold text-xl sm:text-2xl font-mono">
                  <Users className="w-4 h-4 text-cyan-400" /> 50,000+
                </div>
                <p className="text-xs text-gray-500 font-medium">Active Students</p>
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-white font-bold text-xl sm:text-2xl font-mono">
                  <GraduationCap className="w-4 h-4 text-indigo-400" /> 120+
                </div>
                <p className="text-xs text-gray-500 font-medium">Top Colleges</p>
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-white font-bold text-xl sm:text-2xl font-mono">
                  <Award className="w-4 h-4 text-green-400" /> 94.2%
                </div>
                <p className="text-xs text-gray-500 font-medium">Placement Rate</p>
              </div>
            </div>
          </motion.div>

          {/* Right Hero Column — Interactive Visualizer */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="lg:col-span-6 w-full"
          >
            <div className="relative">
              {/* Decorative Backlight */}
              <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500/20 to-indigo-500/20 rounded-3xl blur-2xl opacity-50" />
              <HeroInteractiveCode />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
