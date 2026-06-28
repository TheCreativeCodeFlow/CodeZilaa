"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import { AuthProvider, useAuth } from "@/context/AuthContext";
import BackgroundEffects from "@/components/ui/BackgroundEffects";
import AuthLeftStory from "./AuthLeftStory";
import AuthCard from "./AuthCard";
import ForgotPasswordModal from "./ForgotPasswordModal";

function AuthContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { isAuthenticated, isLoading } = useAuth();

  const initialMode = searchParams.get("mode") === "signup" ? "signup" : "login";
  const [mode, setMode] = useState<"login" | "signup">(initialMode);
  const [forgotModalOpen, setForgotModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      router.push("/workspace");
    }
  }, [isLoading, isAuthenticated, router]);

  useEffect(() => {
    const paramMode = searchParams.get("mode");
    if (paramMode === "signup" || paramMode === "login") {
      setMode(paramMode);
    }
  }, [searchParams]);

  const handleModeChange = (newMode: "login" | "signup") => {
    setMode(newMode);
    const params = new URLSearchParams(searchParams.toString());
    params.set("mode", newMode);
    router.replace(`/auth?${params.toString()}`, { scroll: false });
  };

  const handleSuccess = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  return (
    <div className="relative min-h-screen bg-[#090909] text-white overflow-hidden flex flex-col justify-between selection:bg-cyan-500/30 selection:text-white">
      {/* Dynamic Background Effects */}
      <BackgroundEffects />

      {/* Navigation Header / Back Link */}
      <header className="relative z-20 p-4 sm:p-6 lg:p-8 flex items-center justify-between pointer-events-auto">
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 hover:border-cyan-500/40 text-xs sm:text-sm font-medium text-gray-300 hover:text-white backdrop-blur-md transition-all group shadow-md"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Back to Home</span>
        </Link>
      </header>

      {/* Main Content Split Screen */}
      <main className="relative z-10 flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-8">
        <div className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center min-h-[640px] rounded-3xl">
          {/* Left Column: Visual Storytelling */}
          <div className="lg:col-span-6 xl:col-span-7 h-full hidden lg:flex flex-col">
            <AuthLeftStory />
          </div>

          {/* Right Column: Authentication Card */}
          <div className="lg:col-span-6 xl:col-span-5 w-full flex justify-center py-4">
            <AuthCard
              mode={mode}
              onModeChange={handleModeChange}
              onOpenForgotPassword={() => setForgotModalOpen(true)}
              onSuccess={handleSuccess}
            />
          </div>
        </div>
      </main>

      {/* Footer copyright */}
      <footer className="relative z-20 py-4 text-center text-xs text-gray-500">
        © {new Date().getFullYear()} CodeZilaa Inc. All rights reserved. Built for developers worldwide.
      </footer>

      {/* Forgot Password Modal */}
      <ForgotPasswordModal
        isOpen={forgotModalOpen}
        onClose={() => setForgotModalOpen(false)}
      />

      {/* Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-8 right-8 z-50 flex items-center gap-3 px-5 py-3.5 bg-[#16161a] border border-cyan-500/40 rounded-2xl shadow-2xl shadow-cyan-500/20 text-white text-sm font-medium"
          >
            <div className="w-8 h-8 rounded-xl bg-cyan-500/20 flex items-center justify-center text-cyan-400">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function AuthContainer() {
  return (
    <AuthProvider>
      <AuthContent />
    </AuthProvider>
  );
}
