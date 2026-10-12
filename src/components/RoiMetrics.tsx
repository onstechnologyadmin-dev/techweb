import React, { useEffect, useState, useRef } from 'react';
import { Award, Zap, Activity, Users, Clock, Compass } from 'lucide-react';

interface MetricItem {
  id: string;
  value: string;
  targetNum: number;
  suffix: string;
  label: string;
  sublabel?: string;
  icon: React.ElementType;
  accent: 'blue' | 'orange' | 'cyan';
}

export const RoiMetrics: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const metrics: MetricItem[] = [
    {
      id: 'machines',
      value: '650+',
      targetNum: 650,
      suffix: '+',
      label: 'Machines Installed',
      sublabel: '',
      icon: Award,
      accent: 'cyan',
    },
    {
      id: 'uptime',
      value: '99.85%',
      targetNum: 99.85,
      suffix: '%',
      label: 'Production Line Uptime',
      sublabel: 'Continuous 24/7 duty cycle reliability',
      icon: Activity,
      accent: 'blue',
    },
    {
      id: 'throughput',
      value: '500+',
      targetNum: 500,
      suffix: ' ppm',
      label: 'Peak Assembly Throughput',
      sublabel: 'Continuous kinematic continuous transfer',
      icon: Zap,
      accent: 'orange',
    },
    {
      id: 'clients',
      value: '120+',
      targetNum: 120,
      suffix: '+',
      label: 'Active Enterprise Clients',
      sublabel: 'Automotive, pharma, medical & FMCG leaders',
      icon: Users,
      accent: 'blue',
    },
    {
      id: 'changeover',
      value: '< 8',
      targetNum: 8,
      suffix: ' min',
      label: 'Rapid Tooling Retooling',
      sublabel: 'Toolless quick-clamp nest changeover',
      icon: Clock,
      accent: 'cyan',
    },
    {
      id: 'tolerance',
      value: '±0.015',
      targetNum: 0.015,
      suffix: ' mm',
      label: 'Kinematic Repeatability',
      sublabel: 'Hardened globoidal roller cam indexers',
      icon: Compass,
      accent: 'orange',
    },
  ];

  return (
    <section
      ref={containerRef}
      id="metrics"
      className="relative py-20 bg-slate-950 border-y border-slate-800/80 overflow-hidden industrial-grid"
    >
      {/* High-tech lighting accents */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2 h-2 rounded-full bg-cyan-400 radar-live" />
              <span className="text-xs font-mono font-semibold text-cyan-400 uppercase tracking-widest">
                VERIFIED PERFORMANCE METRICS
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
              Engineering Excellence Backed by <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-orange-400">Hard Industry Data</span>
            </h2>
            <p className="mt-3 text-sm sm:text-base text-slate-400 leading-relaxed">
              Every automation system is engineered for maximum overall equipment effectiveness (OEE), 
              near-zero downtime, and micrometric positioning repeatability.
            </p>
          </div>

          <div className="flex items-center gap-4 bg-slate-900/90 border border-slate-800 p-3 rounded-lg backdrop-blur-md">
            <div className="text-right">
              <div className="text-xs font-mono text-slate-400">REAL-TIME OEE STANDARD</div>
              <div className="text-sm font-bold font-mono text-cyan-400">CLASS A WORLD-CLASS</div>
            </div>
            <div className="h-8 w-px bg-slate-700" />
            <div className="w-3 h-3 rounded-full bg-emerald-500 radar-live" />
          </div>
        </div>

        {/* 6-Card High-Tech Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {metrics.map((m, index) => {
            const Icon = m.icon;
            const accentColors = {
              cyan: {
                border: 'hover:border-cyan-500/50',
                glow: 'group-hover:shadow-[0_0_30px_rgba(6,182,212,0.15)]',
                iconBg: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
                text: 'text-cyan-400',
                strip: 'from-cyan-500 to-sky-400',
              },
              orange: {
                border: 'hover:border-orange-500/50',
                glow: 'group-hover:shadow-[0_0_30px_rgba(249,115,22,0.15)]',
                iconBg: 'bg-orange-500/10 text-orange-400 border-orange-500/20',
                text: 'text-orange-400',
                strip: 'from-orange-500 to-amber-400',
              },
              blue: {
                border: 'hover:border-sky-500/50',
                glow: 'group-hover:shadow-[0_0_30px_rgba(14,165,233,0.15)]',
                iconBg: 'bg-sky-500/10 text-sky-400 border-sky-500/20',
                text: 'text-sky-400',
                strip: 'from-sky-500 to-indigo-400',
              },
            }[m.accent];

            return (
              <div
                key={m.id}
                className={`group relative bg-slate-900/80 border border-slate-800 rounded-xl p-6 backdrop-blur-md transition-all duration-300 ${accentColors.border} ${accentColors.glow}`}
                style={{
                  transitionDelay: `${index * 60}ms`,
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                }}
              >
                {/* Top micro status bar */}
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center border ${accentColors.iconBg}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="flex items-center gap-1.5 text-[11px] font-mono text-slate-500">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-600 group-hover:bg-cyan-400 transition-colors" />
                    <span>METRIC #{index + 1}</span>
                  </div>
                </div>

                {/* Counter value */}
                <div className="mb-2">
                  <div className={`text-4xl sm:text-5xl font-black font-mono tracking-tight text-white flex items-baseline gap-1`}>
                    <span className="tabular-nums">{m.value}</span>
                  </div>
                </div>

                {/* Labels */}
                <h3 className="text-base font-bold text-slate-200 mb-1 group-hover:text-white transition-colors">
                  {m.label}
                </h3>
                {m.sublabel ? (
                  <p className="text-xs text-slate-400 leading-relaxed font-normal">
                    {m.sublabel}
                  </p>
                ) : null}

                {/* Bottom accent glow bar */}
                <div className="w-full bg-slate-800 h-1 rounded-full mt-5 overflow-hidden">
                  <div className={`h-full bg-gradient-to-r ${accentColors.strip} rounded-full transition-all duration-1000 ease-out`}
                    style={{ width: isVisible ? '100%' : '0%' }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Industrial Benchmark Banner */}
        <div className="mt-12 bg-slate-900/60 border border-slate-800/80 rounded-xl p-5 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-400 font-mono">
          <div className="flex items-center gap-3">
            <span className="px-2.5 py-1 rounded bg-sky-950 text-cyan-400 border border-sky-800 font-semibold">
              FIELD TESTED
            </span>
            <span>All statistical metrics validated across 10,000+ cycle continuous Factory Acceptance Tests (FAT).</span>
          </div>
          <div className="flex items-center gap-6 text-slate-400">
            <span>ISO 9001:2015</span>
            <span className="text-slate-600">·</span>
            <span>CE 2006/42/EC</span>
            <span className="text-slate-600">·</span>
            <span>GAMP 5 VAL</span>
          </div>
        </div>
      </div>
    </section>
  );
};
