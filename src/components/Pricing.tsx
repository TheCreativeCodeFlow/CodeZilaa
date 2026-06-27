"use client";

import { motion } from "framer-motion";
import { Check, Sparkles } from "lucide-react";

const plans = [
  {
    name: "Free Developer",
    price: "₹0",
    period: "forever",
    description: "Ideal for beginners starting their coding journey with core practice.",
    features: [
      "Access to 300+ Core Practice Problems",
      "Standard Compiler (C++, Java, Python)",
      "Basic Step Execution Profiler",
      "Community Discussion Forums",
      "Basic Progress Tracking Dashboard",
    ],
    cta: "Start Free",
    popular: false,
  },
  {
    name: "Placement Pro",
    price: "₹499",
    period: "per month",
    description: "Complete preparation suite for students targeting top technical interviews.",
    features: [
      "Access to All 1,200+ Interview Questions",
      "Unlimited Interactive Visualizations & Scrubber",
      "FAANG Company-Specific Problem Sheets",
      "Aptitude & System Design Primer Modules",
      "Full Memory Profiling & Dynamic Stack Inspector",
      "Mock Technical Interview Simulator",
    ],
    cta: "Get Pro Access",
    popular: true,
  },
  {
    name: "Campus Enterprise",
    price: "Custom",
    period: "for universities",
    description: "Tailored for college placement cells & computer science departments.",
    features: [
      "Bulk Student Access Licensing",
      "Placement Officer Analytics Portal",
      "Automated Campus Coding Contests",
      "Custom Batch Performance Diagnostics",
      "Dedicated Technical Account Manager",
    ],
    cta: "Contact Campus Team",
    popular: false,
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="py-24 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <h2 className="text-xs font-semibold text-cyan-400 uppercase tracking-widest font-mono">
            Transparent Investment
          </h2>
          <p className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Plans Engineered for Every Stage.
          </p>
          <p className="text-gray-400 text-base sm:text-lg">
            Invest in your engineering future with accessible student pricing and institutional scale.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {plans.map((plan, idx) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className={`rounded-3xl p-8 flex flex-col justify-between transition-all relative ${
                plan.popular
                  ? "bg-[#141414] border-2 border-cyan-400 shadow-2xl shadow-cyan-950/40 scale-105"
                  : "glass-panel border border-white/10 hover:border-white/20"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-cyan-400 text-black font-extrabold text-[11px] uppercase tracking-wider flex items-center gap-1.5 shadow-md">
                  <Sparkles className="w-3.5 h-3.5 fill-black" /> Recommended for Placements
                </div>
              )}

              <div>
                <h3 className="text-xl font-bold text-white mb-2">{plan.name}</h3>
                <p className="text-xs text-gray-400 min-h-[36px] mb-6">{plan.description}</p>
                
                <div className="flex items-baseline gap-1 mb-8">
                  <span className="text-4xl font-extrabold font-mono text-white tracking-tight">{plan.price}</span>
                  <span className="text-xs text-gray-400 font-medium">{plan.period}</span>
                </div>

                <div className="space-y-3 pt-6 border-t border-white/10">
                  {plan.features.map((feature, fIdx) => (
                    <div key={fIdx} className="flex items-start gap-3 text-xs text-gray-300">
                      <div className="w-4 h-4 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-3 h-3 stroke-[3]" />
                      </div>
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-8 mt-8 border-t border-white/5">
                <a
                  href="#signup"
                  className={`w-full py-3.5 rounded-full font-semibold text-xs text-center block transition-all active:scale-95 ${
                    plan.popular
                      ? "bg-cyan-400 text-black hover:bg-cyan-300 shadow-lg shadow-cyan-500/20"
                      : "bg-[#1c1c1c] text-white hover:bg-white hover:text-black border border-white/10"
                  }`}
                >
                  {plan.cta}
                </a>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
