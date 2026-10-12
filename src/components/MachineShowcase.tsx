import React, { useState } from 'react';
import { REAL_MACHINES } from '../data/machineData';
import { MachineItem } from '../types';
import { Zap, Compass, CheckCircle2, X, ArrowRight, SlidersHorizontal, Eye, ShieldCheck, Factory } from 'lucide-react';

interface MachineShowcaseProps {
  onQuoteClick?: (machineTitle?: string) => void;
}

export const MachineShowcase: React.FC<MachineShowcaseProps> = ({ onQuoteClick }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeModalMachine, setActiveModalMachine] = useState<MachineItem | null>(null);

  const categories = ['All', 'Rotary Assembly', 'Parts Feeding', 'Automated Lines', 'Linear Infeed'];

  const filteredMachines = selectedCategory === 'All'
    ? REAL_MACHINES
    : REAL_MACHINES.filter((m) => m.category === selectedCategory);

  const handleInquireFromModal = () => {
    if (activeModalMachine && onQuoteClick) {
      onQuoteClick(activeModalMachine.title);
    }
    setActiveModalMachine(null);
  };

  return (
    <section id="equipment" className="py-24 bg-slate-950 border-b border-slate-800 text-white relative">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2 h-2 rounded-full bg-cyan-400 radar-live" />
              <span className="text-xs font-mono font-semibold text-cyan-400 uppercase tracking-widest">
                REAL EQUIPMENT & SPM PORTFOLIO
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
              Production Machinery <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-orange-400">Showcase</span>
            </h2>
            <p className="mt-4 text-sm sm:text-base text-slate-300 leading-relaxed">
              Explore our fleet of heavy-duty rotary assembly carousels, vibratory bowl feeders, 
              solid-state linear tracks, and turnkey ISO 7 cleanroom manufacturing cells.
            </p>
          </div>

          {/* Category Filter Tabs */}
          <div className="flex items-center gap-1.5 p-1.5 bg-slate-900 border border-slate-800 rounded-xl overflow-x-auto max-w-full">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-2 text-xs font-semibold rounded-lg transition-all whitespace-nowrap cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-gradient-to-r from-cyan-500 to-sky-500 text-slate-950 shadow-md font-bold'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Machine Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredMachines.map((machine) => (
            <div
              key={machine.id}
              className="group bg-slate-900/80 border border-slate-800 rounded-2xl overflow-hidden hover:border-cyan-500/50 hover:shadow-[0_0_30px_rgba(6,182,212,0.15)] transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Image Container with Exact Filename tag */}
                <div className="relative aspect-4/3 w-full bg-slate-950 overflow-hidden">
                  <img
                    src={machine.image}
                    alt={`${machine.title} - ${machine.category}`}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                  
                  {/* Top Badge */}
                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-1 rounded-md text-[11px] font-mono font-semibold bg-slate-950/90 text-cyan-300 border border-cyan-500/30 backdrop-blur-md">
                      {machine.badge}
                    </span>
                  </div>

                  {/* Category Pill */}
                  <div className="absolute top-3 right-3">
                    <span className="px-2.5 py-1 rounded-md text-[11px] font-mono text-slate-400 bg-slate-900/80 border border-slate-800 backdrop-blur-md">
                      {machine.category}
                    </span>
                  </div>

                  {/* Bottom Image Stats Bar */}
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs font-mono text-slate-300">
                    <div className="flex items-center gap-1.5 bg-slate-950/80 px-2 py-1 rounded border border-slate-800/80">
                      <Zap className="w-3.5 h-3.5 text-orange-400" />
                      <span>{machine.cycleRate}</span>
                    </div>
                    <div className="flex items-center gap-1.5 bg-slate-950/80 px-2 py-1 rounded border border-slate-800/80">
                      <Compass className="w-3.5 h-3.5 text-cyan-400" />
                      <span>{machine.tolerance}</span>
                    </div>
                  </div>
                </div>

                {/* Content Body */}
                <div className="p-6">
                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors line-clamp-2">
                    {machine.title}
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed mb-4 line-clamp-3">
                    {machine.description}
                  </p>

                  {/* Micro Specs List */}
                  <div className="space-y-1.5 mb-4">
                    {machine.specifications.slice(0, 3).map((spec, i) => (
                      <div key={i} className="flex items-center justify-between text-[11px] font-mono py-1 border-b border-slate-800/60">
                        <span className="text-slate-500">{spec.label}</span>
                        <span className="text-slate-300 truncate max-w-[170px] text-right font-medium">{spec.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="p-6 pt-0 flex items-center gap-3">
                <button
                  onClick={() => setActiveModalMachine(machine)}
                  className="flex-1 py-2.5 px-3 text-xs font-semibold rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors flex items-center justify-center gap-2 cursor-pointer border border-slate-700/80"
                >
                  <Eye className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Inspect Specs</span>
                </button>
                <button
                  onClick={() => onQuoteClick && onQuoteClick(machine.title)}
                  className="py-2.5 px-3.5 text-xs font-semibold rounded-lg bg-cyan-400 hover:bg-cyan-300 text-slate-950 transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-md font-bold"
                  title="Request quote for this model"
                >
                  <span>Quote</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal Inspector Lightbox */}
      {activeModalMachine && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative">
            {/* Modal Header */}
            <div className="sticky top-0 bg-slate-900/95 backdrop-blur-md p-6 border-b border-slate-800 flex items-center justify-between z-10">
              <div className="flex items-center gap-3">
                <span className="px-2.5 py-1 rounded bg-cyan-950 text-cyan-400 border border-cyan-800 text-xs font-mono font-bold">
                  {activeModalMachine.badge}
                </span>
                <span className="text-xs font-mono text-slate-400">
                  {activeModalMachine.category}
                </span>
              </div>
              <button
                onClick={() => setActiveModalMachine(null)}
                className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 sm:p-8 space-y-6">
              {/* Full Image */}
              <div className="aspect-16/9 w-full rounded-xl overflow-hidden bg-slate-950 border border-slate-800 relative">
                <img
                  src={activeModalMachine.image}
                  alt={activeModalMachine.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-3 left-3 bg-slate-950/90 border border-slate-800 px-3 py-1.5 rounded-lg text-xs font-mono text-cyan-300">
                  Exact Filename: {activeModalMachine.image.replace('/images/', '')}
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-white mb-2">
                  {activeModalMachine.title}
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed">
                  {activeModalMachine.description}
                </p>
              </div>

              {/* Key Features */}
              <div>
                <div className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-3">
                  ENGINEERING ADVANTAGES & FEATURES
                </div>
                <div className="space-y-2">
                  {activeModalMachine.keyFeatures.map((feat, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-200">
                      <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Technical Specifications Table */}
              <div>
                <div className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-3">
                  COMPLETE SPECIFICATIONS DOSSIER
                </div>
                <div className="border border-slate-800 rounded-xl overflow-hidden divide-y divide-slate-800">
                  {activeModalMachine.specifications.map((spec, i) => (
                    <div key={i} className="flex items-center justify-between p-3 text-xs sm:text-sm bg-slate-950/60">
                      <span className="text-slate-400 font-medium">{spec.label}</span>
                      <span className="text-white font-mono font-semibold text-right">{spec.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Modal Footer CTA */}
              <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-2 text-xs text-slate-400 font-mono">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>Backed by 24/7 Global Engineering SLA</span>
                </div>
                <button
                  onClick={handleInquireFromModal}
                  className="w-full sm:w-auto px-6 py-3 rounded-lg bg-gradient-to-r from-cyan-400 to-sky-400 text-slate-950 font-bold text-xs sm:text-sm hover:from-cyan-300 hover:to-sky-300 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-cyan-500/20"
                >
                  <span>Request Engineering Proposal for this Unit</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
