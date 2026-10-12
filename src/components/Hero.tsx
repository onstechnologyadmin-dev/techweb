import React from 'react';
import { ArrowRight, ArrowDown, Activity, ShieldCheck, Zap, Cpu, Sparkles, Box } from 'lucide-react';

interface HeroProps {
  onExploreClick: () => void;
  onQuoteClick: () => void;
  on3DClick?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreClick, onQuoteClick, on3DClick }) => {
  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 bg-slate-950 text-white overflow-hidden border-b border-slate-800">
      {/* Background Graphic Elements */}
      <div className="absolute inset-0 industrial-grid opacity-60 pointer-events-none" />
      
      {/* High-Tech Glowing Orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-gradient-to-tr from-cyan-600/15 via-sky-500/10 to-orange-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-20 right-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Hero Container */}
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Live Telemetry Ticker Strip */}
        <div className="inline-flex items-center gap-3 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-slate-800 backdrop-blur-md mb-8 text-xs font-mono">
          <span className="w-2 h-2 rounded-full bg-emerald-400 radar-live" />
          <span className="text-cyan-400 font-semibold tracking-wider">SYSTEM ACTIVE</span>
          <span className="text-slate-600">|</span>
          <span className="text-slate-300">FIELDBUS: ETHERCAT SYNCHRONIZED</span>
          <span className="text-slate-600 hidden sm:inline">|</span>
          <span className="text-orange-400 font-medium hidden sm:inline">CAM DWELL: ±0.015 mm</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Core Value Proposition (7 Cols) */}
          <div className="lg:col-span-7">
            {/* Category / Sub-heading */}
            <div className="flex items-center gap-2 text-xs font-mono font-semibold text-orange-400 uppercase tracking-widest mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              <span>INDUSTRIAL MACHINE AUTOMATION & ROBOTICS</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.08] mb-6 [text-wrap:balance]">
              Automating the Future of{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-orange-400">
                Precision Manufacturing
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed mb-8 max-w-2xl font-normal">
              Turnkey rotary dial assembly machinery, high-velocity vibratory parts feeding systems, 
              and AI vision quality inspection cells engineered for relentless 24/7 uptime and zero-defect production.
            </p>

            {/* Call-to-Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 mb-10">
              <button
                onClick={onExploreClick}
                className="px-6 py-3.5 text-xs sm:text-sm font-bold text-slate-950 bg-gradient-to-r from-cyan-400 to-sky-300 hover:from-cyan-300 hover:to-sky-200 rounded-xl transition-all flex items-center gap-2 cursor-pointer shadow-lg shadow-cyan-500/25"
              >
                <span>Explore Equipment Catalog</span>
                <ArrowRight className="w-4 h-4 stroke-[2.5]" />
              </button>

              <button
                onClick={onQuoteClick}
                className="px-6 py-3.5 text-xs sm:text-sm font-bold text-white bg-slate-900 border border-slate-700/80 hover:bg-slate-800 hover:border-slate-600 rounded-xl transition-all cursor-pointer shadow-sm"
              >
                Request an Engineering Quote
              </button>

              {on3DClick && (
                <button
                  onClick={on3DClick}
                  className="px-4 py-3.5 text-xs font-mono text-cyan-400 bg-slate-900/60 border border-cyan-500/30 hover:border-cyan-400/80 rounded-xl transition-all cursor-pointer flex items-center gap-2"
                >
                  <Box className="w-3.5 h-3.5" />
                  <span>3D Digital Twin</span>
                </button>
              )}
            </div>

            {/* Trust and Certification Indicators */}
            <div className="flex flex-wrap items-center gap-6 pt-6 border-t border-slate-800/80 text-xs font-mono text-slate-400">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>ISO 14644-1 Class 7 Rated</span>
              </div>
              <div className="flex items-center gap-2">
                <Cpu className="w-4 h-4 text-cyan-400" />
                <span>Siemens & Rockwell GuardLogix</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-orange-400" />
                <span>Up to 500+ ppm Output</span>
              </div>
            </div>
          </div>

          {/* Right Column: High-Tech Equipment HUD Imagery (5 Cols) */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden border border-slate-800 bg-slate-900 shadow-2xl group">
              {/* Featured Real Machine Backdrop Image */}
              <img
                src="/images/IMG_20190908_103550.jpg.jpeg"
                alt="Turnkey Cleanroom Automated Production Line"
                className="w-full h-80 sm:h-96 object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              
              {/* Industrial Cyber Overlay Gradients */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
              <div className="absolute inset-0 bg-cyan-500/5 mix-blend-overlay" />

              {/* HUD Crosshairs & Telemetry Markers */}
              <div className="absolute top-4 left-4 flex items-center gap-2">
                <span className="px-2.5 py-1 rounded bg-slate-950/90 text-cyan-300 border border-cyan-500/40 text-[11px] font-mono font-bold backdrop-blur-md">
                  LIVE CELL // CELL-01
                </span>
                <span className="w-2 h-2 rounded-full bg-emerald-400 radar-live" />
              </div>

              <div className="absolute top-4 right-4 bg-slate-950/90 border border-slate-800 px-2.5 py-1 rounded text-[11px] font-mono text-slate-300 backdrop-blur-md">
                CAM: 8-STATION DIAL
              </div>

              {/* HUD Lower Telemetry Box */}
              <div className="absolute bottom-4 left-4 right-4 bg-slate-950/90 border border-slate-800/90 p-4 rounded-xl backdrop-blur-md">
                <div className="flex items-center justify-between text-xs font-mono mb-2">
                  <span className="text-slate-400">TURNKEY CLEANROOM CELL</span>
                  <span className="text-cyan-400 font-bold">240 PPM MAX</span>
                </div>
                <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-gradient-to-r from-cyan-400 to-orange-400 h-full w-[94%]" />
                </div>
                <div className="flex items-center justify-between text-[10px] font-mono text-slate-500 mt-2">
                  <span>Cycle Consistency: 99.8%</span>
                  <span>Tolerance: ±0.015 mm</span>
                </div>
              </div>
            </div>

            {/* Floating Metric Badge Pill */}
            <div className="absolute -bottom-6 -left-6 bg-slate-900 border border-slate-700/80 p-3.5 rounded-xl shadow-xl backdrop-blur-md hidden sm:flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-orange-500/20 border border-orange-500/40 flex items-center justify-center text-orange-400">
                <Activity className="w-5 h-5" />
              </div>
              <div>
                <div className="text-[11px] font-mono text-slate-400">SOLID-STATE CONTROLLERS</div>
                <div className="text-sm font-bold text-white font-mono">ONS 850VA / 1500VA REGULATOR</div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Prompt Affordance */}
        <div className="pt-16 flex items-center gap-3 text-xs font-mono text-slate-500">
          <ArrowDown className="w-4 h-4 text-cyan-400 animate-bounce" />
          <span>Scroll to explore verified performance metrics & interactive 3D digital twin</span>
        </div>
      </div>
    </section>
  );
};
