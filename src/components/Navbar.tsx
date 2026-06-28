"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Code2, ChevronRight, Menu, X } from "lucide-react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Features", href: "#features" },
    { name: "Visualization", href: "#visualization" },
    { name: "Roadmap", href: "#roadmap" },
    { name: "Why CodeZilaa", href: "#why-us" },
    { name: "Pricing", href: "#pricing" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-4 px-4 transition-all duration-300">
      <motion.nav
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className={`w-full max-w-6xl rounded-full transition-all duration-300 flex items-center justify-between px-6 border ${
          scrolled
            ? "py-2.5 bg-[#111111]/80 backdrop-blur-xl border-white/10 shadow-2xl shadow-black/80"
            : "py-4 bg-[#111111]/40 backdrop-blur-md border-white/5"
        }`}
      >
        {/* Brand Logo */}
        <a href="#" className="flex items-center gap-2.5 group cursor-pointer">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 to-indigo-500 flex items-center justify-center p-0.5 shadow-lg shadow-cyan-500/20 group-hover:scale-105 transition-transform">
            <div className="w-full h-full bg-[#090909] rounded-[10px] flex items-center justify-center">
              <Code2 className="w-4 h-4 text-cyan-400" />
            </div>
          </div>
          <span className="font-semibold text-lg tracking-tight text-white flex items-center">
            Code<span className="text-cyan-400 font-bold">Zilaa</span>
          </span>
        </a>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center gap-8 text-sm text-gray-400 font-medium">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="hover:text-white transition-colors tracking-wide"
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="hidden md:flex items-center gap-4">
          <Link
            href="/auth?mode=login"
            className="text-sm font-medium text-gray-300 hover:text-white px-3 py-1.5 transition-colors"
          >
            Log In
          </Link>
          <Link
            href="/auth?mode=signup"
            className="group relative inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-full bg-white text-black hover:bg-gray-100 transition-all shadow-md shadow-white/10 hover:shadow-cyan-500/20 active:scale-95"
          >
            Get Started
            <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-gray-400 hover:text-white"
          aria-label="Toggle Navigation Menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </motion.nav>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="absolute top-20 left-4 right-4 bg-[#111111] border border-white/10 rounded-2xl p-6 shadow-2xl flex flex-col gap-4 md:hidden z-50"
        >
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="text-gray-300 hover:text-white text-base py-2 border-b border-white/5"
            >
              {link.name}
            </a>
          ))}
          <div className="flex flex-col gap-3 pt-2">
            <Link
              href="/auth?mode=login"
              onClick={() => setMobileMenuOpen(false)}
              className="text-center py-2.5 text-sm text-gray-300 border border-white/10 rounded-xl"
            >
              Log In
            </Link>
            <Link
              href="/auth?mode=signup"
              onClick={() => setMobileMenuOpen(false)}
              className="text-center py-2.5 text-sm font-medium text-black bg-white rounded-xl"
            >
              Get Started
            </Link>
          </div>
        </motion.div>
      )}
    </header>
  );
}
