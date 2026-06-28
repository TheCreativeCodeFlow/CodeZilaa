"use client";

import { useState, useId } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/context/AuthContext";
import {
  Mail,
  Lock,
  User,
  GraduationCap,
  Calendar,
  Eye,
  EyeOff,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  Loader2,
  Sparkles,
} from "lucide-react";

interface AuthCardProps {
  mode: "login" | "signup";
  onModeChange: (newMode: "login" | "signup") => void;
  onOpenForgotPassword: () => void;
  onSuccess: (message: string) => void;
}

export default function AuthCard({
  mode,
  onModeChange,
  onOpenForgotPassword,
  onSuccess,
}: AuthCardProps) {
  const router = useRouter();
  const { login, register } = useAuth();
  const emailInputId = useId();
  const passwordInputId = useId();
  const nameInputId = useId();
  const signupEmailId = useId();
  const signupPasswordId = useId();
  const confirmPasswordId = useId();
  const collegeInputId = useId();
  const yearInputId = useId();

  // Form states
  const [signInEmail, setSignInEmail] = useState("");
  const [signInPassword, setSignInPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(true);
  const [showSignInPassword, setShowSignInPassword] = useState(false);

  const [fullName, setFullName] = useState("");
  const [signUpEmail, setSignUpEmail] = useState("");
  const [signUpPassword, setSignUpPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [college, setCollege] = useState("");
  const [currentYear, setCurrentYear] = useState("3rd Year");
  const [showSignUpPassword, setShowSignUpPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Validation & UI states
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [shake, setShake] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // Password strength logic
  const getPasswordStrength = (pwd: string) => {
    if (!pwd) return { score: 0, label: "", color: "bg-gray-700" };
    let score = 0;
    if (pwd.length >= 8) score++;
    if (/[A-Z]/.test(pwd)) score++;
    if (/[0-9]/.test(pwd)) score++;
    if (/[^A-Za-z0-9]/.test(pwd)) score++;

    switch (score) {
      case 1:
        return { score: 25, label: "Weak", color: "bg-red-500", text: "text-red-400" };
      case 2:
        return { score: 50, label: "Fair", color: "bg-yellow-500", text: "text-yellow-400" };
      case 3:
        return { score: 75, label: "Strong", color: "bg-cyan-500", text: "text-cyan-400" };
      case 4:
        return { score: 100, label: "Excellent", color: "bg-green-500", text: "text-green-400" };
      default:
        return { score: 15, label: "Very Weak", color: "bg-red-600", text: "text-red-500" };
    }
  };

  const strength = getPasswordStrength(signUpPassword);

  const triggerShake = (msg: string) => {
    setErrorMsg(msg);
    setShake(true);
    setTimeout(() => setShake(false), 600);
  };

  const handleSignInSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!signInEmail || !signInEmail.includes("@")) {
      triggerShake("Please enter a valid email address.");
      return;
    }
    if (!signInPassword || signInPassword.length < 6) {
      triggerShake("Password must be at least 6 characters.");
      return;
    }

    setErrorMsg("");
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      login(signInEmail);
      onSuccess("Welcome back! Successfully logged in.");
      router.push("/workspace");
    }, 1200);
  };

  const handleSignUpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim()) {
      triggerShake("Please enter your full name.");
      return;
    }
    if (!signUpEmail || !signUpEmail.includes("@")) {
      triggerShake("Please enter a valid email address.");
      return;
    }
    if (!signUpPassword || signUpPassword.length < 8) {
      triggerShake("Password must be at least 8 characters long.");
      return;
    }
    if (signUpPassword !== confirmPassword) {
      triggerShake("Passwords do not match.");
      return;
    }
    if (!college.trim()) {
      triggerShake("Please enter your college or university.");
      return;
    }

    setErrorMsg("");
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      register(fullName, signUpEmail, college, currentYear);
      onSuccess("Account created successfully! Welcome to CodeZilaa.");
      router.push("/workspace");
    }, 1500);
  };

  const handleGoogleAuth = () => {
    setGoogleLoading(true);
    setTimeout(() => {
      setGoogleLoading(false);
      login("google.user@codezilaa.com", "Google Developer");
      onSuccess("Authenticated with Google successfully!");
      router.push("/workspace");
    }, 1400);
  };

  return (
    <motion.div
      animate={shake ? { x: [-10, 10, -8, 8, -4, 4, 0] } : {}}
      transition={{ duration: 0.5 }}
      className="relative w-full max-w-md mx-auto bg-[#111114]/90 backdrop-blur-2xl border border-white/10 rounded-[32px] p-6 sm:p-8 lg:p-10 shadow-2xl shadow-black/90 overflow-hidden"
    >
      {/* Top ambient highlight glow inside card */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent blur-xs opacity-80" />
      <div className="absolute -top-32 -left-32 w-64 h-64 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -right-32 w-64 h-64 bg-indigo-500/15 rounded-full blur-3xl pointer-events-none" />

      {/* Mode Switcher Tabs */}
      <div className="relative flex p-1 bg-[#18181c] rounded-2xl border border-white/5 mb-8">
        <button
          type="button"
          onClick={() => {
            setErrorMsg("");
            onModeChange("login");
          }}
          className={`relative flex-1 py-2.5 text-xs sm:text-sm font-semibold rounded-xl transition-colors z-10 cursor-pointer ${
            mode === "login" ? "text-white" : "text-gray-400 hover:text-gray-200"
          }`}
        >
          Sign In
          {mode === "login" && (
            <motion.div
              layoutId="activeTab"
              className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-indigo-500/20 border border-cyan-400/40 rounded-xl shadow-inner -z-10"
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
            />
          )}
        </button>
        <button
          type="button"
          onClick={() => {
            setErrorMsg("");
            onModeChange("signup");
          }}
          className={`relative flex-1 py-2.5 text-xs sm:text-sm font-semibold rounded-xl transition-colors z-10 cursor-pointer ${
            mode === "signup" ? "text-white" : "text-gray-400 hover:text-gray-200"
          }`}
        >
          Create Account
          {mode === "signup" && (
            <motion.div
              layoutId="activeTab"
              className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-indigo-500/20 border border-cyan-400/40 rounded-xl shadow-inner -z-10"
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
            />
          )}
        </button>
      </div>

      {/* Error Alert Box */}
      <AnimatePresence>
        {errorMsg && (
          <motion.div
            initial={{ opacity: 0, y: -10, height: 0 }}
            animate={{ opacity: 1, y: 0, height: "auto" }}
            exit={{ opacity: 0, y: -10, height: 0 }}
            className="mb-6 overflow-hidden"
          >
            <div className="flex items-center gap-2.5 p-3.5 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-xs font-medium">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mode Forms Container */}
      <AnimatePresence mode="wait">
        {mode === "login" ? (
          <motion.form
            key="login-form"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.25 }}
            onSubmit={handleSignInSubmit}
            className="space-y-4 sm:space-y-5"
          >
            <div>
              <label htmlFor={emailInputId} className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-500">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  id={emailInputId}
                  type="email"
                  value={signInEmail}
                  onChange={(e) => setSignInEmail(e.target.value)}
                  placeholder="alex@codezilaa.com"
                  className="w-full pl-10 pr-4 py-3 bg-[#18181c] border border-white/10 rounded-xl text-white placeholder-gray-500 text-sm focus:outline-none focus:border-cyan-400 focus:ring-4 focus:ring-cyan-400/20 transition-all"
                  autoFocus
                  required
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label htmlFor={passwordInputId} className="block text-xs font-semibold text-gray-300 uppercase tracking-wider">
                  Password
                </label>
                <button
                  type="button"
                  onClick={onOpenForgotPassword}
                  className="text-xs text-cyan-400 hover:text-cyan-300 font-medium transition-colors cursor-pointer"
                >
                  Forgot password?
                </button>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-500">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  id={passwordInputId}
                  type={showSignInPassword ? "text" : "password"}
                  value={signInPassword}
                  onChange={(e) => setSignInPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-10 pr-10 py-3 bg-[#18181c] border border-white/10 rounded-xl text-white placeholder-gray-500 text-sm focus:outline-none focus:border-cyan-400 focus:ring-4 focus:ring-cyan-400/20 transition-all"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowSignInPassword(!showSignInPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-gray-400 hover:text-white transition-colors cursor-pointer"
                  aria-label={showSignInPassword ? "Hide password" : "Show password"}
                >
                  {showSignInPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded bg-[#18181c] border-white/10 text-cyan-400 focus:ring-cyan-400/30 focus:ring-offset-0 transition-colors"
                />
                <span className="text-xs text-gray-400 font-medium">Remember me on this device</span>
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white font-semibold text-sm shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 transition-all active:scale-[0.98] flex items-center justify-center gap-2 disabled:opacity-70 cursor-pointer mt-2"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Signing In...</span>
                </>
              ) : (
                <>
                  <span>Sign In to Account</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </motion.form>
        ) : (
          <motion.form
            key="signup-form"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.25 }}
            onSubmit={handleSignUpSubmit}
            className="space-y-4"
          >
            <div>
              <label htmlFor={nameInputId} className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1.5">
                Full Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-500">
                  <User className="w-4 h-4" />
                </div>
                <input
                  id={nameInputId}
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Alex Sharma"
                  className="w-full pl-10 pr-4 py-2.5 bg-[#18181c] border border-white/10 rounded-xl text-white placeholder-gray-500 text-sm focus:outline-none focus:border-cyan-400 focus:ring-4 focus:ring-cyan-400/20 transition-all"
                  autoFocus
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor={signupEmailId} className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-500">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  id={signupEmailId}
                  type="email"
                  value={signUpEmail}
                  onChange={(e) => setSignUpEmail(e.target.value)}
                  placeholder="alex@example.com"
                  className="w-full pl-10 pr-4 py-2.5 bg-[#18181c] border border-white/10 rounded-xl text-white placeholder-gray-500 text-sm focus:outline-none focus:border-cyan-400 focus:ring-4 focus:ring-cyan-400/20 transition-all"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label htmlFor={signupPasswordId} className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1.5">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
                    <Lock className="w-3.5 h-3.5" />
                  </div>
                  <input
                    id={signupPasswordId}
                    type={showSignUpPassword ? "text" : "password"}
                    value={signUpPassword}
                    onChange={(e) => setSignUpPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-9 pr-8 py-2.5 bg-[#18181c] border border-white/10 rounded-xl text-white placeholder-gray-500 text-xs focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowSignUpPassword(!showSignUpPassword)}
                    className="absolute inset-y-0 right-0 pr-2.5 flex items-center text-gray-400 hover:text-white cursor-pointer"
                  >
                    {showSignUpPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              <div>
                <label htmlFor={confirmPasswordId} className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1.5">
                  Confirm Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
                    <Lock className="w-3.5 h-3.5" />
                  </div>
                  <input
                    id={confirmPasswordId}
                    type={showConfirmPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="••••••••"
                    className={`w-full pl-9 pr-8 py-2.5 bg-[#18181c] border ${
                      confirmPassword && confirmPassword !== signUpPassword
                        ? "border-red-500/60"
                        : confirmPassword && confirmPassword === signUpPassword
                        ? "border-green-500/60"
                        : "border-white/10"
                    } rounded-xl text-white placeholder-gray-500 text-xs focus:outline-none focus:border-cyan-400 transition-all`}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute inset-y-0 right-0 pr-2.5 flex items-center text-gray-400 hover:text-white cursor-pointer"
                  >
                    {showConfirmPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>
            </div>

            {/* Password Strength Indicator */}
            {signUpPassword && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="p-3 bg-white/5 rounded-xl border border-white/5 space-y-2"
              >
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-400 font-medium">Password Strength:</span>
                  <span className={`font-bold ${strength.text}`}>{strength.label}</span>
                </div>
                <div className="w-full h-1.5 bg-gray-800 rounded-full overflow-hidden flex gap-1">
                  <div
                    className={`h-full transition-all duration-300 ${strength.color}`}
                    style={{ width: `${strength.score}%` }}
                  />
                </div>
                <div className="grid grid-cols-2 gap-1 text-[11px] text-gray-400 pt-1">
                  <div className={`flex items-center gap-1 ${signUpPassword.length >= 8 ? "text-green-400" : ""}`}>
                    <CheckCircle2 className="w-3 h-3" /> 8+ Characters
                  </div>
                  <div className={`flex items-center gap-1 ${/[A-Z]/.test(signUpPassword) ? "text-green-400" : ""}`}>
                    <CheckCircle2 className="w-3 h-3" /> Uppercase Letter
                  </div>
                  <div className={`flex items-center gap-1 ${/[0-9]/.test(signUpPassword) ? "text-green-400" : ""}`}>
                    <CheckCircle2 className="w-3 h-3" /> Number
                  </div>
                  <div className={`flex items-center gap-1 ${/[^A-Za-z0-9]/.test(signUpPassword) ? "text-green-400" : ""}`}>
                    <CheckCircle2 className="w-3 h-3" /> Symbol
                  </div>
                </div>
              </motion.div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="sm:col-span-2">
                <label htmlFor={collegeInputId} className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1.5">
                  College / University
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
                    <GraduationCap className="w-3.5 h-3.5" />
                  </div>
                  <input
                    id={collegeInputId}
                    type="text"
                    value={college}
                    onChange={(e) => setCollege(e.target.value)}
                    placeholder="IIT Bombay / Stanford..."
                    className="w-full pl-9 pr-3 py-2.5 bg-[#18181c] border border-white/10 rounded-xl text-white placeholder-gray-500 text-xs focus:outline-none focus:border-cyan-400 transition-all"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor={yearInputId} className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1.5">
                  Current Year
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none text-gray-500">
                    <Calendar className="w-3.5 h-3.5" />
                  </div>
                  <select
                    id={yearInputId}
                    value={currentYear}
                    onChange={(e) => setCurrentYear(e.target.value)}
                    className="w-full pl-8 pr-2 py-2.5 bg-[#18181c] border border-white/10 rounded-xl text-white text-xs focus:outline-none focus:border-cyan-400 transition-all cursor-pointer"
                  >
                    <option value="1st Year">1st Year</option>
                    <option value="2nd Year">2nd Year</option>
                    <option value="3rd Year">3rd Year</option>
                    <option value="4th Year">4th Year</option>
                    <option value="Graduated">Graduated</option>
                  </select>
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white font-semibold text-sm shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 transition-all active:scale-[0.98] flex items-center justify-center gap-2 disabled:opacity-70 cursor-pointer mt-2"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Creating Account...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Create Free Account</span>
                </>
              )}
            </button>
          </motion.form>
        )}
      </AnimatePresence>

      {/* Divider */}
      <div className="relative my-6 flex items-center justify-center">
        <div className="w-full border-t border-white/10" />
        <span className="absolute bg-[#111114] px-3 text-[11px] uppercase tracking-wider text-gray-500 font-medium">
          or continue with
        </span>
      </div>

      {/* Google Auth Button */}
      <button
        type="button"
        onClick={handleGoogleAuth}
        disabled={googleLoading}
        className="w-full py-3 px-4 rounded-xl bg-[#18181c] hover:bg-[#222228] border border-white/10 hover:border-white/20 text-white font-medium text-sm transition-all flex items-center justify-center gap-3 shadow-md hover:shadow-lg cursor-pointer disabled:opacity-70"
      >
        {googleLoading ? (
          <Loader2 className="w-4 h-4 animate-spin text-gray-400" />
        ) : (
          <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"
            />
            <path
              fill="#34A853"
              d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.29v3.14C3.26 21.3 7.37 24 12 24z"
            />
            <path
              fill="#FBBC05"
              d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.59H1.29C.47 8.22 0 10.06 0 12s.47 3.78 1.29 5.41l3.99-3.14z"
            />
            <path
              fill="#EA4335"
              d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.37 0 3.26 2.7 1.29 6.59l3.99 3.14c.95-2.83 3.6-4.98 6.72-4.98z"
            />
          </svg>
        )}
        <span>Continue with Google</span>
      </button>

      {/* Footer Toggle text */}
      <div className="mt-6 text-center text-xs text-gray-400">
        {mode === "login" ? (
          <p>
            Don&apos;t have an account?{" "}
            <button
              type="button"
              onClick={() => {
                setErrorMsg("");
                onModeChange("signup");
              }}
              className="text-cyan-400 hover:text-cyan-300 font-semibold transition-colors ml-1 cursor-pointer"
            >
              Create Account
            </button>
          </p>
        ) : (
          <p>
            Already have an account?{" "}
            <button
              type="button"
              onClick={() => {
                setErrorMsg("");
                onModeChange("login");
              }}
              className="text-cyan-400 hover:text-cyan-300 font-semibold transition-colors ml-1 cursor-pointer"
            >
              Sign In
            </button>
          </p>
        )}
      </div>
    </motion.div>
  );
}
