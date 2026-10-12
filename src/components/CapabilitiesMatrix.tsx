import React, { useState } from 'react';
import { Cpu, Bot, Eye, Layers, RotateCw, Wrench, ArrowRight, CheckCircle2, ChevronRight, Sparkles } from 'lucide-react';
import { CAPABILITIES } from '../data/machineData';

interface CapabilitiesMatrixProps {
  onQuoteClick?: () => void;
}

const ICON_MAP: Record<string, React.ElementType> = {
  Cpu,
  Bot,
  Eye,
  Layers,
  RotateCw,
  Wrench,
};

export const CapabilitiesMatrix: React.FC<CapabilitiesMatrixProps> = ({ onQuoteClick }) => {
  const [activeCapId, setActiveCapId] = useState<string>(CAPABILITIES[0].id);

  const activeCapability = CAPABILITIES.find((c) => c.id === activeCapId) || CAPABILITIES[0];
  const ActiveIcon = ICON_MAP[activeCapability.iconName] || Cpu;

  return (
    <section id="capabilities" className="py-24 bg-slate-900 border-b border-slate-800 text-white relative overflow-hidden">
      {/* Background cyber grid & glow effects */}
      <div className="absolute inset-0 industrial-grid opacity-60 pointer-events-none" />
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="w-4 h-4 text-orange-400" />
              <span className="text-xs font-mono font-semibold text-orange-400 uppercase tracking-widest">
                CORE TECHNICAL COMPETENCIES
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
              Interactive Capabilities <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-orange-400">Matrix</span>
            </h2>
            <p className="mt-4 text-sm sm:text-base text-slate-300 leading-relaxed">
              Explore our full-stack engineering expertise across deterministic control architectures, 
              high-speed robotics kinematics, sub-micron machine vision AI, and custom special machinery.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-slate-400 bg-slate-950/80 border border-slate-800 px-4 py-2.5 rounded-lg">
            <span className="w-2 h-2 rounded-full bg-cyan-400 radar-live" />
            <span>6 INTEGRATED DISCIPLINES · IN-HOUSE LAB</span>
          </div>
        </div>

        {/* Interactive Matrix Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Interactive Capability Selector List (5 Cols) */}
          <div className="lg:col-span-5 space-y-3">
            {CAPABILITIES.map((cap, index) => {
              const Icon = ICON_MAP[cap.iconName] || Cpu;
              const isActive = cap.id === activeCapId;

              return (
                <button
                  key={cap.id}
                  onClick={() => setActiveCapId(cap.id)}
                  className={`w-full text-left p-4 sm:p-5 rounded-xl border transition-all duration-200 flex items-center justify-between group cursor-pointer ${
                    isActive
                      ? 'bg-gradient-to-r from-slate-800 to-slate-800/80 border-cyan-500/80 shadow-[0_0_25px_rgba(6,182,212,0.2)]'
                      : 'bg-slate-950/70 border-slate-800/80 hover:bg-slate-800/50 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-11 h-11 rounded-lg flex items-center justify-center transition-colors border ${
                        isActive
                          ? 'bg-cyan-500/20 text-cyan-300 border-cyan-400/40'
                          : 'bg-slate-900 text-slate-400 border-slate-800 group-hover:text-slate-200'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="text-[11px] font-mono text-cyan-400 font-semibold">
                          0{index + 1} // {cap.category}
                        </span>
                      </div>
                      <div className={`text-sm sm:text-base font-bold transition-colors ${
                        isActive ? 'text-white' : 'text-slate-300 group-hover:text-white'
                      }`}>
                        {cap.title}
                      </div>
                    </div>
                  </div>

                  <ChevronRight
                    className={`w-5 h-5 transition-transform duration-200 shrink-0 ${
                      isActive ? 'text-cyan-400 translate-x-1' : 'text-slate-600 group-hover:text-slate-400'
                    }`}
                  />
                </button>
              );
            })}
          </div>

          {/* Right Column: Detailed Capability Dossier (7 Cols) */}
          <div className="lg:col-span-7 bg-slate-950/90 border border-slate-800 rounded-2xl p-6 sm:p-8 backdrop-blur-md shadow-2xl relative overflow-hidden">
            {/* Top Tag & Metric Strip */}
            <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-slate-800 mb-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                  <ActiveIcon className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-semibold">
                    {activeCapability.category}
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white mt-0.5">
                    {activeCapability.title}
                  </h3>
                </div>
              </div>

              <span className="px-3 py-1 text-xs font-mono font-medium rounded-full bg-slate-900 border border-slate-700 text-slate-300">
                ACTIVE FOCUS
              </span>
            </div>

            {/* Tagline */}
            <div className="p-3.5 bg-slate-900/80 border border-slate-800 rounded-lg text-xs sm:text-sm font-medium text-cyan-300 mb-5 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
              <span>{activeCapability.tagline}</span>
            </div>

            {/* In-depth Description */}
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed mb-6">
              {activeCapability.description}
            </p>

            {/* Hard Metrics Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
              {activeCapability.metrics.map((metric, idx) => (
                <div
                  key={idx}
                  className="bg-slate-900/90 border border-slate-800/90 rounded-lg p-3.5"
                >
                  <div className="text-[11px] font-mono text-slate-400 uppercase mb-1">
                    {metric.label}
                  </div>
                  <div className="text-base sm:text-lg font-bold font-mono text-white text-orange-400">
                    {metric.value}
                  </div>
                </div>
              ))}
            </div>

            {/* Engineering Specifications Checklist */}
            <div className="mb-6">
              <div className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-3">
                TECHNICAL DELIVERABLES & PROTOCOLS
              </div>
              <div className="space-y-2.5">
                {activeCapability.techSpecs.map((spec, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                    <span>{spec}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Supported Hardware Brands */}
            <div className="pt-6 border-t border-slate-800">
              <div className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-3">
                INTEGRATED INDUSTRIAL HARDWARE & ECOSYSTEM
              </div>
              <div className="flex flex-wrap gap-2 mb-6">
                {activeCapability.supportedHardware.map((hw, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 text-xs font-medium rounded-md bg-slate-900 border border-slate-800 text-slate-300"
                  >
                    {hw}
                  </span>
                ))}
              </div>

              {/* Action Trigger */}
              <button
                onClick={onQuoteClick}
                className="w-full sm:w-auto px-6 py-3 text-xs sm:text-sm font-semibold text-slate-950 bg-gradient-to-r from-cyan-400 to-sky-300 rounded-lg hover:from-cyan-300 hover:to-sky-200 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-cyan-500/20"
              >
                <span>Request Custom Solution for {activeCapability.title}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
