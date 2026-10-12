import React, { useState } from 'react';
import { Search, FileText, Cog, Cpu, CheckCircle2, ShieldCheck, ArrowRight, Calendar, PackageCheck, Award } from 'lucide-react';
import { PROCESS_STEPS } from '../data/machineData';

interface ProcessTimelineProps {
  onQuoteClick?: () => void;
}

const STEP_ICONS: Record<string, React.ElementType> = {
  Search,
  FileText,
  Cog,
  Cpu,
  CheckCircle2,
  ShieldCheck,
};

export const ProcessTimeline: React.FC<ProcessTimelineProps> = ({ onQuoteClick }) => {
  const [selectedStepIndex, setSelectedStepIndex] = useState<number>(0);

  const activeStep = PROCESS_STEPS[selectedStepIndex];
  const StepIcon = STEP_ICONS[activeStep.iconName] || Search;

  return (
    <section id="process" className="py-24 bg-slate-950 border-b border-slate-800 text-white relative overflow-hidden">
      {/* Subtle grid background */}
      <div className="absolute inset-0 industrial-grid-dense opacity-40 pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-3">
              <Calendar className="w-4 h-4 text-cyan-400" />
              <span className="text-xs font-mono font-semibold text-cyan-400 uppercase tracking-widest">
                TURNKEY DELIVERY METHODOLOGY
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
              From Concept to Production: <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-orange-400">Our Process</span>
            </h2>
            <p className="mt-4 text-sm sm:text-base text-slate-300 leading-relaxed">
              A disciplined 6-stage engineering roadmap ensuring your automation investment is delivered 
              on schedule, within budget, and validated to stringent medical, pharma, and automotive standards.
            </p>
          </div>

          <div className="flex items-center gap-3 bg-slate-900/90 border border-slate-800 p-3 rounded-lg backdrop-blur-md">
            <div className="text-right">
              <div className="text-xs font-mono text-slate-400">STANDARD CYCLE</div>
              <div className="text-sm font-bold font-mono text-cyan-400">14 – 16 WEEKS TURNKEY</div>
            </div>
            <div className="h-8 w-px bg-slate-700" />
            <Award className="w-5 h-5 text-orange-400" />
          </div>
        </div>

        {/* Horizontal Process Stepper Bar (Interactive on Desktop) */}
        <div className="hidden lg:grid grid-cols-6 gap-3 mb-12">
          {PROCESS_STEPS.map((step, idx) => {
            const Icon = STEP_ICONS[step.iconName] || Search;
            const isCurrent = idx === selectedStepIndex;
            const isCompleted = idx < selectedStepIndex;

            return (
              <button
                key={step.step}
                onClick={() => setSelectedStepIndex(idx)}
                className={`relative text-left p-4 rounded-xl border transition-all duration-200 cursor-pointer ${
                  isCurrent
                    ? 'bg-slate-900 border-cyan-400/80 shadow-[0_0_20px_rgba(6,182,212,0.25)]'
                    : isCompleted
                    ? 'bg-slate-950/80 border-slate-700/80 hover:bg-slate-900/60'
                    : 'bg-slate-950/40 border-slate-800/80 opacity-60 hover:opacity-100 hover:bg-slate-900/40'
                }`}
              >
                {/* Micro progress line */}
                <div className="flex items-center justify-between mb-3">
                  <div
                    className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-mono font-bold ${
                      isCurrent
                        ? 'bg-cyan-400 text-slate-950'
                        : isCompleted
                        ? 'bg-slate-800 text-cyan-400'
                        : 'bg-slate-900 text-slate-500'
                    }`}
                  >
                    {step.step}
                  </div>
                  <Icon
                    className={`w-4 h-4 ${
                      isCurrent ? 'text-cyan-400' : 'text-slate-600'
                    }`}
                  />
                </div>

                <div className="text-[11px] font-mono text-cyan-400 font-semibold mb-1">
                  {step.duration}
                </div>
                <div className={`text-xs font-bold truncate ${
                  isCurrent ? 'text-white' : 'text-slate-300'
                }`}>
                  {step.phase}
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Stage Detailed Showcase Card */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-10 backdrop-blur-md shadow-2xl relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: Stage Overview (7 Cols) */}
            <div className="lg:col-span-7">
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
                  PHASE {activeStep.step} OF 06
                </span>
                <span className="text-xs font-mono text-orange-400 bg-orange-500/10 border border-orange-500/30 px-3 py-1 rounded-full">
                  TIMELINE: {activeStep.duration}
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-4">
                {activeStep.title}
              </h3>

              <p className="text-sm sm:text-base text-slate-300 leading-relaxed mb-6">
                {activeStep.description}
              </p>

              {/* Milestones checklist */}
              <div className="mb-6">
                <div className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-3">
                  KEY ENGINEERING MILESTONES
                </div>
                <div className="space-y-3">
                  {activeStep.milestones.map((m, i) => (
                    <div key={i} className="flex items-start gap-3 text-xs sm:text-sm text-slate-200">
                      <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                      <span>{m}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Formal Deliverables Dossier (5 Cols) */}
            <div className="lg:col-span-5 bg-slate-950/80 border border-slate-800/90 rounded-xl p-6">
              <div className="flex items-center gap-3 pb-4 border-b border-slate-800 mb-5">
                <div className="w-10 h-10 rounded-lg bg-orange-500/10 border border-orange-500/30 flex items-center justify-center text-orange-400">
                  <PackageCheck className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[11px] font-mono text-slate-400 uppercase">
                    FORMAL DOCUMENTATION
                  </div>
                  <div className="text-sm font-bold text-white">Stage Deliverables</div>
                </div>
              </div>

              <div className="space-y-3 mb-6">
                {activeStep.deliverables.map((deliv, idx) => (
                  <div
                    key={idx}
                    className="p-3 bg-slate-900 border border-slate-800/80 rounded-lg flex items-center justify-between text-xs sm:text-sm text-slate-300"
                  >
                    <span className="font-medium text-white">{deliv}</span>
                    <span className="text-[11px] font-mono text-cyan-400">VERIFIED</span>
                  </div>
                ))}
              </div>

              {/* Mobile Stage Nav Buttons */}
              <div className="flex items-center gap-2 lg:hidden mb-4">
                {PROCESS_STEPS.map((s, i) => (
                  <button
                    key={s.step}
                    onClick={() => setSelectedStepIndex(i)}
                    className={`flex-1 py-1.5 text-xs font-mono rounded ${
                      i === selectedStepIndex
                        ? 'bg-cyan-400 text-slate-950 font-bold'
                        : 'bg-slate-900 text-slate-400 border border-slate-800'
                    }`}
                  >
                    0{i + 1}
                  </button>
                ))}
              </div>

              {/* Call to action */}
              <button
                onClick={onQuoteClick}
                className="w-full py-3 px-4 text-xs sm:text-sm font-semibold text-slate-950 bg-gradient-to-r from-cyan-400 to-sky-300 hover:from-cyan-300 hover:to-sky-200 rounded-lg transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-cyan-500/20"
              >
                <span>Initiate Stage 01 Feasibility Study</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
