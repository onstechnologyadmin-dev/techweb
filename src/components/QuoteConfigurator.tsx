import React, { useState } from 'react';
import { Sliders, Cpu, Zap, Activity, ArrowRight, ShieldCheck, Check, Info } from 'lucide-react';

interface QuoteConfiguratorProps {
  onQuoteClick?: (configSummary?: string) => void;
}

export const QuoteConfigurator: React.FC<QuoteConfiguratorProps> = ({ onQuoteClick }) => {
  const [machineType, setMachineType] = useState<string>('Rotary Dial Assembly');
  const [targetSpeed, setTargetSpeed] = useState<number>(180);
  const [stationCount, setStationCount] = useState<number>(8);
  const [cleanroomGrade, setCleanroomGrade] = useState<string>('ISO 7 / Class 10,000');
  const [selectedOptions, setSelectedOptions] = useState<string[]>([
    'Machine Vision AI QC',
    'Force-Displacement Servo Press',
  ]);

  const toggleOption = (opt: string) => {
    setSelectedOptions((prev) =>
      prev.includes(opt) ? prev.filter((o) => o !== opt) : [...prev, opt]
    );
  };

  // Mathematical Feasibility Calculations
  const cycleTimeSeconds = (60 / targetSpeed).toFixed(2);
  const indexTimeSeconds = (parseFloat(cycleTimeSeconds) * 0.35).toFixed(2);
  const dwellTimeSeconds = (parseFloat(cycleTimeSeconds) * 0.65).toFixed(2);
  const annualCapacityMillions = ((targetSpeed * 60 * 16 * 250) / 1_000_000).toFixed(1);

  const controllerRecommendation = targetSpeed > 240
    ? 'Siemens S7-1518F Fail-Safe PLC with Profinet IRT'
    : 'Siemens S7-1515F / Rockwell GuardLogix 5580';

  const handleSendConfig = () => {
    const summary = `${machineType} (${targetSpeed} ppm, ${stationCount} stations, ${cleanroomGrade}, Modules: ${selectedOptions.join(', ')})`;
    if (onQuoteClick) {
      onQuoteClick(summary);
    }
  };

  return (
    <section id="configurator" className="py-24 bg-slate-900 border-b border-slate-800 text-white relative overflow-hidden">
      <div className="absolute inset-0 industrial-grid opacity-50 pointer-events-none" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="max-w-2xl mb-16">
          <div className="flex items-center gap-2 mb-3">
            <Sliders className="w-4 h-4 text-cyan-400" />
            <span className="text-xs font-mono font-semibold text-cyan-400 uppercase tracking-widest">
              INTERACTIVE FEASIBILITY TOOL
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
            Machine Specification & <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-orange-400">Throughput Calculator</span>
          </h2>
          <p className="mt-4 text-sm sm:text-base text-slate-300 leading-relaxed">
            Customize target cycle rates, station fixtures, and quality control modules to receive 
            instant kinematic feasibility metrics and an engineering budgetary assessment.
          </p>
        </div>

        {/* Configurator Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Side: Interactive Controls (7 Cols) */}
          <div className="lg:col-span-7 bg-slate-950/80 border border-slate-800 rounded-2xl p-6 sm:p-8 backdrop-blur-md space-y-8">
            {/* Step 1: Machine Architecture */}
            <div>
              <label className="block text-xs font-mono text-cyan-400 uppercase tracking-wider mb-3">
                01. MACHINE ARCHITECTURE TYPE
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { id: 'Rotary Dial Assembly', label: 'Rotary Dial Assembly SPM', desc: 'Cam indexer, high precision multi-nest' },
                  { id: 'Vibratory Parts Feeder', label: 'Vibratory Feeding Station', desc: 'Bulk hopper, bowl, track & ONS regulator' },
                  { id: 'Turnkey Cleanroom Line', label: 'Cleanroom Automated Line', desc: 'ISO 7 enclosed, dual lane sorting' },
                  { id: 'Linear Infeed & Sorter', label: 'Linear Infeed & Inspection', desc: 'High-speed dual V-track with HMI' },
                ].map((type) => (
                  <button
                    key={type.id}
                    onClick={() => setMachineType(type.id)}
                    className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
                      machineType === type.id
                        ? 'bg-slate-900 border-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.2)]'
                        : 'bg-slate-950/60 border-slate-800 hover:bg-slate-900/50'
                    }`}
                  >
                    <div className="text-sm font-bold text-white mb-0.5">{type.label}</div>
                    <div className="text-[11px] text-slate-400">{type.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Target Throughput Slider */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-mono text-cyan-400 uppercase tracking-wider">
                  02. TARGET THROUGHPUT VELOCITY
                </label>
                <div className="text-lg font-bold font-mono text-cyan-400">
                  {targetSpeed} <span className="text-xs text-slate-400">parts/min (ppm)</span>
                </div>
              </div>
              <input
                type="range"
                min="30"
                max="500"
                step="10"
                value={targetSpeed}
                onChange={(e) => setTargetSpeed(parseInt(e.target.value))}
                className="w-full accent-cyan-400 cursor-pointer h-2 bg-slate-800 rounded-lg appearance-none"
              />
              <div className="flex justify-between text-[11px] font-mono text-slate-500 mt-2">
                <span>30 ppm (Delicate)</span>
                <span>180 ppm (Standard Dial)</span>
                <span>350 ppm (High-Speed)</span>
                <span>500+ ppm (Kinematic)</span>
              </div>
            </div>

            {/* Step 3: Stations and Environment */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-mono text-cyan-400 uppercase tracking-wider mb-2">
                  03. TOOLING WORKSTATIONS
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {[4, 8, 12, 16].map((stg) => (
                    <button
                      key={stg}
                      onClick={() => setStationCount(stg)}
                      className={`py-2 text-center rounded-lg text-xs font-mono font-bold border transition-all cursor-pointer ${
                        stationCount === stg
                          ? 'bg-cyan-400 text-slate-950 border-cyan-400 shadow-sm'
                          : 'bg-slate-900 text-slate-300 border-slate-800 hover:bg-slate-800'
                      }`}
                    >
                      {stg} Stg
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-cyan-400 uppercase tracking-wider mb-2">
                  04. ENCLOSURE / CLEANROOM RATING
                </label>
                <select
                  value={cleanroomGrade}
                  onChange={(e) => setCleanroomGrade(e.target.value)}
                  className="w-full p-2.5 rounded-lg text-xs font-medium bg-slate-900 border border-slate-800 text-slate-200 outline-none focus:border-cyan-400"
                >
                  <option value="Standard Heavy Industrial">Standard Heavy Industrial (IP54)</option>
                  <option value="Controlled Anti-Dust">Controlled Anti-Dust (ESD-Safe)</option>
                  <option value="ISO 7 / Class 10,000">ISO 7 / Class 10,000 Cleanroom</option>
                  <option value="ISO 5 / Class 100 Pharma">ISO 5 / Class 100 Sterile Pharma</option>
                </select>
              </div>
            </div>

            {/* Step 4: Quality & Advanced Modules */}
            <div>
              <label className="block text-xs font-mono text-cyan-400 uppercase tracking-wider mb-3">
                05. INTEGRATED QUALITY & SUBSYSTEM MODULES
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {[
                  { name: 'Machine Vision AI QC', desc: '100% optical inspection & reject gate' },
                  { name: 'Force-Displacement Servo Press', desc: 'Dynamic load cell curve logging' },
                  { name: 'Pressure Decay Leak Testing', desc: '0.01 sccm precision pneumatic seal check' },
                  { name: 'Auto-Metering Bulk Hopper', desc: 'Maintains optimal parts level automatically' },
                  { name: 'OPC UA / Industry 4.0 Cloud', desc: 'Real-time telemetry and OEE logging' },
                  { name: 'Dual Escapement Track Splitter', desc: 'Doubles infeed throughput stream' },
                ].map((opt) => {
                  const isChecked = selectedOptions.includes(opt.name);
                  return (
                    <button
                      key={opt.name}
                      onClick={() => toggleOption(opt.name)}
                      className={`p-3 rounded-lg border text-left flex items-start gap-3 transition-colors cursor-pointer ${
                        isChecked
                          ? 'bg-slate-900 border-cyan-500/80 text-white'
                          : 'bg-slate-950/40 border-slate-800/80 text-slate-400 hover:bg-slate-900/40'
                      }`}
                    >
                      <div className={`w-4 h-4 rounded mt-0.5 flex items-center justify-center shrink-0 ${
                        isChecked ? 'bg-cyan-400 text-slate-950' : 'border border-slate-700'
                      }`}>
                        {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                      </div>
                      <div>
                        <div className="text-xs font-semibold">{opt.name}</div>
                        <div className="text-[10px] text-slate-500">{opt.desc}</div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Side: Feasibility Telemetry HUD (5 Cols) */}
          <div className="lg:col-span-5 bg-gradient-to-b from-slate-950 to-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 backdrop-blur-md shadow-2xl relative">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-6">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 radar-live" />
                <span className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-bold">
                  FEASIBILITY: VALIDATED
                </span>
              </div>
              <span className="text-[11px] font-mono text-slate-400">SPEC SUMMARY</span>
            </div>

            {/* Calculated Metrics Grid */}
            <div className="space-y-4 mb-6">
              <div className="bg-slate-900/90 border border-slate-800 p-4 rounded-xl">
                <div className="text-[11px] font-mono text-slate-400 uppercase mb-1">
                  TOTAL CYCLE BUDGET
                </div>
                <div className="text-2xl font-black font-mono text-white flex items-baseline gap-2">
                  <span>{cycleTimeSeconds} s</span>
                  <span className="text-xs text-cyan-400 font-normal">
                    ({indexTimeSeconds}s index / {dwellTimeSeconds}s dwell)
                  </span>
                </div>
              </div>

              <div className="bg-slate-900/90 border border-slate-800 p-4 rounded-xl">
                <div className="text-[11px] font-mono text-slate-400 uppercase mb-1">
                  PROJECTED ANNUAL OUTPUT
                </div>
                <div className="text-2xl font-black font-mono text-orange-400">
                  {annualCapacityMillions} Million Parts <span className="text-xs text-slate-400 font-normal">/ Year</span>
                </div>
                <div className="text-[11px] text-slate-500 mt-1">Based on 2 shifts (16 hrs/day), 250 operating days</div>
              </div>

              <div className="bg-slate-900/90 border border-slate-800 p-4 rounded-xl">
                <div className="text-[11px] font-mono text-slate-400 uppercase mb-1">
                  RECOMMENDED CONTROL ARCHITECTURE
                </div>
                <div className="text-xs font-bold font-mono text-slate-200">
                  {controllerRecommendation}
                </div>
              </div>

              <div className="bg-slate-900/90 border border-slate-800 p-4 rounded-xl">
                <div className="text-[11px] font-mono text-slate-400 uppercase mb-1">
                  CHASSIS & GUARDING STANDARD
                </div>
                <div className="text-xs font-semibold text-slate-200">
                  {cleanroomGrade} · Tubular AISI 304 Frame with Interlocked Polycarbonate
                </div>
              </div>
            </div>

            {/* Guarantee Tag */}
            <div className="p-3.5 bg-slate-950 border border-slate-800 rounded-xl flex items-center gap-3 text-xs text-slate-400 mb-6">
              <ShieldCheck className="w-5 h-5 text-cyan-400 shrink-0" />
              <span>Includes complete SolidWorks 3D CAD, EPLAN electrical files & FAT protocol sign-off.</span>
            </div>

            {/* Submit Action */}
            <button
              onClick={handleSendConfig}
              className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-cyan-400 via-sky-400 to-orange-400 text-slate-950 font-black text-sm hover:opacity-95 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-cyan-500/25"
            >
              <span>Request Formal Proposal with this Config</span>
              <ArrowRight className="w-4 h-4 stroke-[3]" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
