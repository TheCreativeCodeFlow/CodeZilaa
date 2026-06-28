"use client";

import { useAuth } from "@/context/AuthContext";
import { User, Mail, GraduationCap, Calendar, Award, ShieldCheck, Sparkles } from "lucide-react";

export default function ProfilePage() {
  const { user } = useAuth();

  return (
    <div className="space-y-6">
      <div className="p-6 sm:p-8 bg-[#121215] border border-white/10 rounded-3xl shadow-xl flex flex-col sm:flex-row items-center gap-6">
        <div className="w-24 h-24 rounded-3xl bg-gradient-to-tr from-cyan-500 to-indigo-600 p-1 shadow-2xl shadow-cyan-500/30 shrink-0">
          <div className="w-full h-full bg-[#090909] rounded-[22px] flex items-center justify-center text-3xl font-bold text-cyan-400">
            {user?.name ? user.name.charAt(0).toUpperCase() : "U"}
          </div>
        </div>

        <div className="text-center sm:text-left space-y-2 flex-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" /> Verified Developer Profile
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">{user?.name || "Developer"}</h1>
          <p className="text-xs sm:text-sm text-gray-400 flex items-center justify-center sm:justify-start gap-2">
            <Mail className="w-3.5 h-3.5" /> {user?.email || "alex@example.com"}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-[#121215] border border-white/10 rounded-3xl p-6 shadow-xl space-y-4">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <GraduationCap className="w-4 h-4 text-cyan-400" /> Academic Details
          </h3>
          <div className="space-y-3 text-xs">
            <div className="flex justify-between p-3 bg-white/5 rounded-xl">
              <span className="text-gray-400">University</span>
              <span className="text-white font-semibold">{user?.college || "IIT Bombay"}</span>
            </div>
            <div className="flex justify-between p-3 bg-white/5 rounded-xl">
              <span className="text-gray-400">Current Batch</span>
              <span className="text-white font-semibold">{user?.currentYear || "3rd Year"}</span>
            </div>
          </div>
        </div>

        <div className="bg-[#121215] border border-white/10 rounded-3xl p-6 shadow-xl space-y-4">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Award className="w-4 h-4 text-amber-400" /> Platform Badges
          </h3>
          <div className="flex flex-wrap gap-2">
            <span className="px-3 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs font-semibold">
              🏆 12-Day Streak Master
            </span>
            <span className="px-3 py-1.5 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-xs font-semibold">
              ⚡ DP Expert
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
