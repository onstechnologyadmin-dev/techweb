import React from 'react';
import { Cog, Layers, Cpu, ShieldCheck } from 'lucide-react';

export const Technology: React.FC<TechnologyProps> = () => {
  const pillars = [
    {
      id: '01',
      title: 'Precision Processing',
      description:
        'Multi-axis rotary drive shafts coupled with synchronized servo drives ensure repeatable mechanical motion, minimal product vibration, and continuous material flow under demanding industrial production cycles.',
      icon: Cog,
      details: [
        'Hardened stainless steel guide shafts',
        'Direct-drive planetary gear reduction',
        'Sub-millimeter product positioning',
      ],
    },
    {
      id: '02',
      title: 'Modular Construction',
      description:
        'Standardized mounting points, quick-clamp conveyor sections, and modular gantry frames allow seamless integration into existing processing lines and swift retooling for changing product formats.',
      icon: Layers,
      details: [
        'Standardized structural mounting grid',
        'Toolless conveyor belt removal',
        'Interchangeable infeed hopper designs',
      ],
    },
    {
      id: '03',
      title: 'Intelligent Controls',
      description:
        'Integrated industrial HMI with real-time fieldbus communication provides direct oversight of line speed, motor torque, sensor telemetry, and comprehensive diagnostics with emergency stop interlocks.',
      icon: Cpu,
      details: [
        '15-inch IP66 optical bonding touchscreen',
        'EtherCAT and Profinet protocol support',
        'Multi-level operator access control',
      ],
    },
    {
      id: '04',
      title: 'Hygienic Stainless-Steel Design',
      description:
        'Fabricated with smooth continuous welds, sloped horizontal surfaces to prevent fluid pooling, and sanitary grade stainless components engineered for fast washdown regimens and stringent compliance.',
      icon: ShieldCheck,
      details: [
        'AISI 304 and 316L stainless steel contact parts',
        'Clean-in-place (CIP) friendly geometry',
        'Chemical and thermal washdown resistance',
      ],
    },
  ];

  return (
    <section id="technology" className="py-24 bg-slate-50 border-y border-slate-200">
      <div className="max-w-7xl mx-auto px-6">
        <div className="max-w-2xl mb-16">
          <div className="text-xs font-mono font-semibold text-sky-600 uppercase tracking-wider mb-3">
            Core Architecture
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 leading-tight">
            Engineered for continuous industrial throughput.
          </h2>
          <p className="mt-4 text-base text-slate-600 leading-relaxed">
            Every subsystem in the assembly is developed around mechanical precision, sanitary
            standards, and maintenance ergonomics to minimize total line downtime.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {pillars.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                className="bg-white border border-slate-200 p-8 rounded-lg shadow-xs hover:border-slate-300 transition-colors"
              >
                <div className="flex items-center justify-between mb-6">
                  <div className="w-10 h-10 rounded-md bg-slate-100 flex items-center justify-center text-slate-800">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-mono font-medium text-slate-400">
                    {item.id}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-slate-900 mb-3">{item.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed mb-6">
                  {item.description}
                </p>

                <div className="pt-4 border-t border-slate-100 space-y-2">
                  {item.details.map((detail, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs text-slate-700">
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-300 shrink-0" />
                      <span>{detail}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

interface TechnologyProps {}
