import React from 'react';
import { Wrench, CheckCircle2, Shield, Activity, FileSpreadsheet, Download, Cpu, Sparkles } from 'lucide-react';

export const Engineering: React.FC<EngineeringProps> = () => {
  const specs = [
    { label: 'Structural Skid Material', value: 'AISI 304 / 316L Heavy-Gauge Passivated Stainless Steel' },
    { label: 'Rotary Indexing Drive', value: 'Hardened Roller Gear Cam Indexer with Zero-Backlash Dwell' },
    { label: 'Linear Actuation & Guides', value: 'THK Precision Ground Miniature Linear Guide Rails' },
    { label: 'Ingress Protection', value: 'IP66 Control Cabinet / IP69K Motor Enclosures / IP67 Junctions' },
    { label: 'Deterministic Fieldbus', value: 'EtherCAT, Profinet IRT, Ethernet/IP, Modbus TCP, OPC UA' },
    { label: 'Operating Voltage', value: '380V – 480V 3-Phase, 50/60 Hz / 24V DC Regulated Bus' },
    { label: 'Noise Emission Dampening', value: '< 68 dB(A) with Polyurethane-Coated Bowls & Enclosure' },
    { label: 'Preventive Service Life', value: '40,000+ continuous runtime hours between cam overhauls' },
  ];

  return (
    <section id="engineering" className="py-24 bg-slate-950 border-b border-slate-800 text-white relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="max-w-2xl mb-16">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-2 h-2 rounded-full bg-cyan-400 radar-live" />
            <span className="text-xs font-mono font-semibold text-cyan-400 uppercase tracking-widest">
              ENGINEERING & BUILD STANDARDS
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
            Designed for Uptime, Accessibility, and <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-orange-400">Total Cleanliness</span>
          </h2>
          <p className="mt-4 text-sm sm:text-base text-slate-300 leading-relaxed">
            Our engineering methodology prioritizes operator ergonomics, sub-millimeter repeatable kinematics, 
            and predictable component life cycles across continuous 24/7 production schedules.
          </p>
        </div>

        {/* 3-Column Engineering Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="bg-slate-900/80 border border-slate-800 p-6 sm:p-8 rounded-2xl hover:border-cyan-500/50 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mb-5">
              <Wrench className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">
              Rapid Toolless Maintenance
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Tooling nests and conveyor guide rails incorporate quick-release pneumatic and mechanical latching, 
              reducing format changeovers and sanitation teardowns from hours to under 8 minutes.
            </p>
          </div>

          <div className="bg-slate-900/80 border border-slate-800 p-6 sm:p-8 rounded-2xl hover:border-cyan-500/50 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-orange-500/10 border border-orange-500/30 flex items-center justify-center text-orange-400 mb-5">
              <Shield className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">
              Sanitary Cleanroom Framing
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Open structural frame geometries eliminate dead angles, crevices, and pooling areas where 
              dust or washdown fluid might collect, ensuring full compliance with ISO 14644-1 and EHEDG standards.
            </p>
          </div>

          <div className="bg-slate-900/80 border border-slate-800 p-6 sm:p-8 rounded-2xl hover:border-cyan-500/50 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-sky-500/10 border border-sky-500/30 flex items-center justify-center text-sky-400 mb-5">
              <Activity className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">
              Open Fieldbus Integration
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Native deterministic handshakes with third-party PLC platforms, ERP/MES databases, and SCADA monitoring 
              via standardized EtherCAT, Profinet, and OPC UA Industry 4.0 telemetry protocols.
            </p>
          </div>
        </div>

        {/* Technical Data Specification Sheet */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-2xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-6 border-b border-slate-800 gap-3">
            <div>
              <h3 className="text-xl font-bold text-white">
                Technical Specification Summary
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Verified mechanical, electrical, and pneumatic design parameters for baseline machines
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-md bg-slate-950 border border-slate-800 text-xs font-mono text-cyan-400">
                REV 5.0 · 2026 STANDARD
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-3">
            {specs.map((item, index) => (
              <div
                key={index}
                className="flex items-start justify-between py-2.5 border-b border-slate-800/60 text-xs gap-4"
              >
                <span className="text-slate-400 font-medium">{item.label}</span>
                <span className="text-white font-mono text-right tabular-nums font-semibold">
                  {item.value}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-8 pt-6 border-t border-slate-800 flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-slate-400">
            <div className="flex items-center gap-2 text-slate-300">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Full documentation, SolidWorks 3D CAD step files & EPLAN schematics provided with machine shipment.</span>
            </div>
            <div className="flex items-center gap-4 text-slate-400">
              <span>ISO 9001:2015</span>
              <span>·</span>
              <span>CE 2006/42/EC</span>
              <span>·</span>
              <span>UL 508A</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

interface EngineeringProps {}
