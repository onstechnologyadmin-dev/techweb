import React from 'react';
import { Phone, Mail, MapPin, ShieldCheck, ArrowUp } from 'lucide-react';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const handleNavClick = (href: string) => {
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 text-slate-400 text-xs border-t border-slate-800 py-16 relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Brand & Mission (Col 1-2) */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-cyan-500 via-sky-500 to-orange-500 p-0.5 flex items-center justify-center">
                <div className="w-full h-full bg-slate-950 rounded-[6px] flex items-center justify-center font-mono font-black text-cyan-400 text-xs">
                  ONS
                </div>
              </div>
              <div className="text-base font-extrabold tracking-tight text-white">
                ONS <span className="text-cyan-400 font-mono">TECHNOLOGY</span> AUTOMATION
              </div>
            </div>
            
            <p className="text-slate-400 leading-relaxed max-w-sm mb-4">
              Designing and fabricating high-precision industrial rotary dial assembly machines, 
              vibratory parts feeding systems, and turnkey cleanroom automation cells for continuous manufacturing.
            </p>

            <div className="space-y-1.5 text-[11px] font-mono text-slate-500">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <span>Chicago, Illinois · Global Engineering & Installation Hubs</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-orange-400 shrink-0" />
                <span>Hotline: +91 9158004910 / +1 (800) 555-8378</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                <span>Email: proposals@onstechnology.com</span>
              </div>
            </div>
          </div>

          {/* Machine Systems & Capabilities */}
          <div>
            <div className="font-mono font-bold text-white mb-3 uppercase tracking-wider text-xs">
              SYSTEMS & CAPABILITIES
            </div>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => handleNavClick('#equipment')}
                  className="hover:text-cyan-400 transition-colors cursor-pointer"
                >
                  Equipment Showcase
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavClick('#machines')}
                  className="hover:text-cyan-400 transition-colors cursor-pointer"
                >
                  3D Digital Twin Assembly
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavClick('#capabilities')}
                  className="hover:text-cyan-400 transition-colors cursor-pointer"
                >
                  Capabilities Matrix
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavClick('#metrics')}
                  className="hover:text-cyan-400 transition-colors cursor-pointer"
                >
                  ROI & Performance Metrics
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavClick('#process')}
                  className="hover:text-cyan-400 transition-colors cursor-pointer"
                >
                  6-Stage Process Roadmap
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavClick('#configurator')}
                  className="hover:text-cyan-400 transition-colors cursor-pointer"
                >
                  Throughput Calculator
                </button>
              </li>
            </ul>
          </div>

          {/* Quality & Industrial Compliance */}
          <div>
            <div className="font-mono font-bold text-white mb-3 uppercase tracking-wider text-xs">
              COMPLIANCE & QUALITY
            </div>
            <ul className="space-y-2 text-slate-400">
              <li className="flex items-center gap-2">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>ISO 9001:2015 Certified QA</span>
              </li>
              <li className="flex items-center gap-2">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>CE Machinery Directive 2006/42/EC</span>
              </li>
              <li className="flex items-center gap-2">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>UL 508A Industrial Control Enclosures</span>
              </li>
              <li className="flex items-center gap-2">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>GAMP 5 & 21 CFR Part 11 Pharma</span>
              </li>
              <li className="flex items-center gap-2">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>ISO 14644-1 Cleanroom Class 7</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Strip */}
        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500 text-[11px] font-mono">
          <div>
            &copy; {currentYear} ONS Technology Automation Systems LLC. All rights reserved.
          </div>
          
          <div className="flex items-center gap-6">
            <span>Proprietary Industrial Engineering</span>
            <span aria-hidden="true">·</span>
            <span>Zero-Scrape Original Content</span>
            <span aria-hidden="true">·</span>
            <button
              onClick={scrollToTop}
              className="hover:text-cyan-400 transition-colors flex items-center gap-1 cursor-pointer"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
