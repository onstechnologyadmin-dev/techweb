import React, { useState } from 'react';
import { ArrowRight, Factory, ShieldCheck, Zap, Compass, CheckCircle2 } from 'lucide-react';
import { INDUSTRY_SECTORS } from '../data/machineData';

interface ApplicationsProps {
  onQuoteClick: (industryName?: string) => void;
}

export const Applications: React.FC<ApplicationsProps> = ({ onQuoteClick }) => {
  const [activeTab, setActiveTab] = useState<string>('all');

  const filteredIndustries =
    activeTab === 'all'
      ? INDUSTRY_SECTORS
      : INDUSTRY_SECTORS.filter((ind) => ind.id === activeTab);

  return (
    <section id="applications" className="py-24 bg-slate-900 border-b border-slate-800 text-white relative overflow-hidden">
      <div className="absolute inset-0 industrial-grid opacity-50 pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2 h-2 rounded-full bg-cyan-400 radar-live" />
              <span className="text-xs font-mono font-semibold text-cyan-400 uppercase tracking-widest">
                TARGET INDUSTRIAL SECTORS
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
              Tailored for Demanding <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-orange-400">Manufacturing Sectors</span>
            </h2>
            <p className="mt-4 text-sm sm:text-base text-slate-300 leading-relaxed">
              Modular hardware architecture and custom tooling nests engineered to meet stringent cleanroom, 
              high-throughput velocity, and cosmetic finish requirements across global industries.
            </p>
          </div>

          {/* Interactive filter tabs */}
          <div className="flex items-center gap-1.5 p-1.5 bg-slate-950 border border-slate-800 rounded-xl self-start md:self-auto overflow-x-auto max-w-full">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-3.5 py-2 text-xs font-semibold rounded-lg transition-all whitespace-nowrap cursor-pointer ${
                activeTab === 'all'
                  ? 'bg-gradient-to-r from-cyan-400 to-sky-400 text-slate-950 font-bold shadow-md'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              All Sectors
            </button>
            {INDUSTRY_SECTORS.map((ind) => (
              <button
                key={ind.id}
                onClick={() => setActiveTab(ind.id)}
                className={`px-3.5 py-2 text-xs font-semibold rounded-lg transition-all whitespace-nowrap cursor-pointer ${
                  activeTab === ind.id
                    ? 'bg-gradient-to-r from-cyan-400 to-sky-400 text-slate-950 font-bold shadow-md'
                    : 'text-slate-400 hover:text-white hover:bg-slate-900'
                }`}
              >
                {ind.name.split(' ')[0]}
              </button>
            ))}
          </div>
        </div>

        {/* Industry Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredIndustries.map((item) => (
            <div
              key={item.id}
              className="bg-slate-950/80 border border-slate-800 rounded-2xl overflow-hidden shadow-xl flex flex-col group hover:border-cyan-500/50 hover:shadow-[0_0_30px_rgba(6,182,212,0.15)] transition-all duration-300"
            >
              {/* Image Banner */}
              <div className="relative aspect-16/9 w-full bg-slate-950 overflow-hidden">
                <img
                  src={item.image}
                  alt={`${item.name} industrial automation application`}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
                
                {/* Sector Name & Tagline Overlay */}
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="text-[11px] font-mono tracking-wider uppercase text-cyan-400 font-semibold mb-0.5">
                    {item.tagline}
                  </div>
                  <div className="text-xl font-bold text-white">{item.name}</div>
                </div>

                {/* Rating Badge */}
                <div className="absolute top-3 left-3 bg-slate-950/90 border border-slate-800 px-2.5 py-1 rounded-md text-[11px] font-mono text-slate-300 backdrop-blur-md">
                  {item.cleanroomRating}
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
                <div>
                  {/* Metric Badges Strip */}
                  <div className="flex flex-wrap items-center gap-3 mb-4 text-xs font-mono">
                    <div className="flex items-center gap-1.5 bg-slate-900 px-2.5 py-1 rounded border border-slate-800 text-cyan-400">
                      <Zap className="w-3.5 h-3.5 text-orange-400" />
                      <span>{item.throughput}</span>
                    </div>
                    <div className="flex items-center gap-1.5 bg-slate-900 px-2.5 py-1 rounded border border-slate-800 text-slate-300">
                      <Compass className="w-3.5 h-3.5 text-cyan-400" />
                      <span>{item.tolerance}</span>
                    </div>
                  </div>

                  <p className="text-sm text-slate-300 leading-relaxed mb-6">
                    {item.overview}
                  </p>

                  {/* Typical Applications List */}
                  <div className="mb-6">
                    <div className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-2.5">
                      TYPICAL ASSEMBLY & SORTING PRODUCTS
                    </div>
                    <div className="space-y-1.5">
                      {item.keyApplications.map((app: string, i: number) => (
                        <div key={i} className="flex items-center gap-2 text-xs text-slate-300">
                          <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                          <span>{app}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Sector Specs */}
                  <div className="p-4 bg-slate-900/80 border border-slate-800/80 rounded-xl space-y-1.5 mb-6">
                    <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider mb-2">
                      ENGINEERING STANDARDS
                    </div>
                    {item.specs.map((spec: string, i: number) => (
                      <div key={i} className="flex items-center gap-2 text-xs text-slate-400">
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0" />
                        <span>{spec}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Footer Action */}
                <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
                  <button
                    onClick={() => onQuoteClick(item.name)}
                    className="text-xs sm:text-sm font-bold text-cyan-400 hover:text-cyan-300 transition-colors flex items-center gap-2 cursor-pointer"
                  >
                    <span>Configure Cell for {item.name.split('&')[0].trim()}</span>
                    <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                  </button>
                  <Factory className="w-4 h-4 text-slate-600" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
