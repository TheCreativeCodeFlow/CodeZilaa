"use client";

import { Settings, Shield, Bell, Key, Sparkles } from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div className="p-6 bg-[#121215] border border-white/10 rounded-3xl shadow-xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gray-500/10 border border-gray-500/20 text-gray-300 text-xs font-semibold mb-2">
          <Sparkles className="w-3.5 h-3.5" /> Workspace Configuration
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Workspace Settings</h1>
        <p className="text-xs sm:text-sm text-gray-400 mt-1">
          Customize your compiler shortcuts, notifications, security, and editor preferences.
        </p>
      </div>

      <div className="bg-[#121215] border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 max-w-3xl">
        <div className="flex items-center justify-between py-3 border-b border-white/5 text-xs">
          <div>
            <div className="font-semibold text-white">Editor VIM Mode</div>
            <div className="text-gray-400 text-[11px]">Enable vim keybindings inside code editor windows</div>
          </div>
          <input type="checkbox" className="w-4 h-4 rounded bg-gray-800 text-cyan-400 focus:ring-0 cursor-pointer" />
        </div>

        <div className="flex items-center justify-between py-3 border-b border-white/5 text-xs">
          <div>
            <div className="font-semibold text-white">Daily Practice Reminders</div>
            <div className="text-gray-400 text-[11px]">Receive push notifications to protect your daily streak</div>
          </div>
          <input type="checkbox" defaultChecked className="w-4 h-4 rounded bg-gray-800 text-cyan-400 focus:ring-0 cursor-pointer" />
        </div>

        <div className="flex items-center justify-between py-3 text-xs">
          <div>
            <div className="font-semibold text-white">AI Mock Interview Voice Feedback</div>
            <div className="text-gray-400 text-[11px]">Enable real-time audio evaluation during technical interviews</div>
          </div>
          <input type="checkbox" defaultChecked className="w-4 h-4 rounded bg-gray-800 text-cyan-400 focus:ring-0 cursor-pointer" />
        </div>
      </div>
    </div>
  );
}
