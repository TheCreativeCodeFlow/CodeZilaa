"use client";

import { Code2, Github, Twitter, Linkedin, Youtube } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#080808] border-t border-white/10 pt-16 pb-12 relative z-10 text-xs text-gray-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          
          {/* Brand Column */}
          <div className="col-span-2 space-y-4">
            <a href="#" className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-cyan-500 to-indigo-500 flex items-center justify-center p-0.5">
                <div className="w-full h-full bg-[#090909] rounded-[6px] flex items-center justify-center">
                  <Code2 className="w-3.5 h-3.5 text-cyan-400" />
                </div>
              </div>
              <span className="font-semibold text-base text-white tracking-tight">
                Code<span className="text-cyan-400 font-bold">Zilaa</span>
              </span>
            </a>
            <p className="text-gray-400 leading-relaxed max-w-sm">
              CodeZilaa is the premier placement preparation platform empowering engineering students through visual code learning and execution profiling.
            </p>
            <div className="flex items-center gap-4 pt-2 text-gray-400">
              <a href="#" className="hover:text-white transition-colors" aria-label="GitHub"><Github className="w-4 h-4" /></a>
              <a href="#" className="hover:text-white transition-colors" aria-label="Twitter"><Twitter className="w-4 h-4" /></a>
              <a href="#" className="hover:text-white transition-colors" aria-label="LinkedIn"><Linkedin className="w-4 h-4" /></a>
              <a href="#" className="hover:text-white transition-colors" aria-label="YouTube"><Youtube className="w-4 h-4" /></a>
            </div>
          </div>

          {/* Product */}
          <div className="space-y-3">
            <h4 className="text-white font-semibold text-xs uppercase tracking-wider font-mono">Product</h4>
            <ul className="space-y-2">
              <li><a href="#features" className="hover:text-white transition-colors">Coding Compiler</a></li>
              <li><a href="#visualization" className="hover:text-white transition-colors">Visual Engine</a></li>
              <li><a href="#roadmap" className="hover:text-white transition-colors">Curriculum Roadmap</a></li>
              <li><a href="#pricing" className="hover:text-white transition-colors">Student Pricing</a></li>
            </ul>
          </div>

          {/* Company */}
          <div className="space-y-3">
            <h4 className="text-white font-semibold text-xs uppercase tracking-wider font-mono">Company</h4>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Campus Ambassadors</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Blog & Guides</a></li>
            </ul>
          </div>

          {/* Legal */}
          <div className="space-y-3">
            <h4 className="text-white font-semibold text-xs uppercase tracking-wider font-mono">Legal</h4>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Cookie Settings</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Security</a></li>
            </ul>
          </div>

        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-gray-500">
          <p>© {new Date().getFullYear()} CodeZilaa Technologies Inc. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Engineered with precision for ambitious developers globally.
          </p>
        </div>
      </div>
    </footer>
  );
}
