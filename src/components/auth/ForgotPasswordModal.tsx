"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Mail, CheckCircle2, Loader2, KeyRound } from "lucide-react";

interface ForgotPasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ForgotPasswordModal({ isOpen, onClose }: ForgotPasswordModalProps) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      setError("Please enter a valid email address");
      return;
    }
    setError("");
    setLoading(true);

    // Simulate API request delay
    setTimeout(() => {
      setLoading(false);
      setSent(true);
    }, 1200);
  };

  const handleReset = () => {
    setEmail("");
    setSent(false);
    setError("");
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleReset}
            className="absolute inset-0 bg-black/70 backdrop-blur-md"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", duration: 0.5, bounce: 0.3 }}
            className="relative w-full max-w-md bg-[#121214] border border-white/10 rounded-3xl p-6 md:p-8 shadow-2xl shadow-cyan-500/10 overflow-hidden z-10"
          >
            {/* Background Glow */}
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-cyan-500/20 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />

            {/* Close Button */}
            <button
              onClick={handleReset}
              className="absolute top-5 right-5 p-2 rounded-full text-gray-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            {!sent ? (
              <div>
                <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 mb-5 shadow-inner">
                  <KeyRound className="w-6 h-6" />
                </div>

                <h3 className="text-2xl font-bold text-white tracking-tight">Reset Password</h3>
                <p className="text-sm text-gray-400 mt-2 leading-relaxed">
                  Enter your email address associated with your CodeZilaa account and we&apos;ll send you instructions to reset your password.
                </p>

                <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                  <div>
                    <label htmlFor="reset-email" className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">
                      Email Address
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-500">
                        <Mail className="w-4 h-4" />
                      </div>
                      <input
                        id="reset-email"
                        type="email"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          if (error) setError("");
                        }}
                        placeholder="alex@example.com"
                        className={`w-full pl-10 pr-4 py-3 bg-[#18181b] border ${
                          error ? "border-red-500 focus:ring-red-500/20" : "border-white/10 focus:border-cyan-400 focus:ring-cyan-400/20"
                        } rounded-xl text-white placeholder-gray-500 text-sm focus:outline-none focus:ring-4 transition-all`}
                        autoFocus
                      />
                    </div>
                    {error && <p className="text-xs text-red-400 mt-1.5 font-medium">{error}</p>}
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white font-semibold text-sm shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 transition-all active:scale-[0.98] flex items-center justify-center gap-2 disabled:opacity-70 cursor-pointer"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Sending Link...</span>
                      </>
                    ) : (
                      <span>Send Reset Link</span>
                    )}
                  </button>
                </form>
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-4"
              >
                <div className="w-16 h-16 rounded-full bg-cyan-500/20 border border-cyan-400/30 flex items-center justify-center text-cyan-400 mx-auto mb-4 shadow-lg shadow-cyan-500/20">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-white tracking-tight">Check Your Inbox</h3>
                <p className="text-sm text-gray-300 mt-2 leading-relaxed">
                  We have sent a password reset link to <span className="text-cyan-400 font-medium">{email}</span>.
                </p>
                <p className="text-xs text-gray-500 mt-4">
                  Didn&apos;t receive the email? Check your spam folder or try resending.
                </p>
                <button
                  onClick={handleReset}
                  className="mt-6 px-6 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white text-sm font-medium transition-colors border border-white/10 cursor-pointer"
                >
                  Done
                </button>
              </motion.div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
