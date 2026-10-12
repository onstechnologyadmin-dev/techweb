import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight, Phone, ShieldCheck, Box } from 'lucide-react';

interface NavigationProps {
  onQuoteClick: () => void;
}

export const Navigation: React.FC<NavigationProps> = ({ onQuoteClick }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Equipment', href: '#equipment' },
    { label: '3D Twin', href: '#machines' },
    { label: 'Capabilities', href: '#capabilities' },
    { label: 'ROI & Metrics', href: '#metrics' },
    { label: 'Process', href: '#process' },
    { label: 'Industries', href: '#applications' },
    { label: 'Configurator', href: '#configurator' },
    { label: 'Contact', href: '#contact' },
  ];

  const handleLinkClick = (href: string) => {
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-slate-950/95 backdrop-blur-md border-b border-slate-800/90 shadow-xl py-3'
          : 'bg-slate-950/70 backdrop-blur-xs border-b border-slate-800/50 py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between gap-6">
        {/* Brand Identity Wordmark */}
        <a
          href="#"
          className="flex items-center gap-3 shrink-0 group cursor-pointer"
        >
          <div className="w-9 h-9 rounded-lg bg-gradient-to-tr from-cyan-500 via-sky-500 to-orange-500 p-0.5 flex items-center justify-center shadow-[0_0_15px_rgba(6,182,212,0.4)]">
            <div className="w-full h-full bg-slate-950 rounded-[6px] flex items-center justify-center">
              <span className="font-black text-xs font-mono tracking-tighter text-cyan-400">ONS</span>
            </div>
          </div>
          <div>
            <div className="text-base font-extrabold tracking-tight text-white flex items-center gap-1.5">
              <span>ONS</span>
              <span className="text-cyan-400 font-mono text-sm">TECHNOLOGY</span>
            </div>
            <div className="text-[10px] font-mono tracking-wider text-slate-400 uppercase">
              AUTOMATION & ROBOTICS
            </div>
          </div>
        </a>

        {/* Desktop Single-line Navigation Links */}
        <nav className="hidden lg:flex items-center gap-6 text-xs font-semibold text-slate-300">
          {navLinks.map((link) => (
            <button
              key={link.label}
              onClick={() => handleLinkClick(link.href)}
              className="hover:text-cyan-400 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* Right Action Zone */}
        <div className="hidden sm:flex items-center gap-3 shrink-0">
          <a
            href="tel:+919158004910"
            className="hidden xl:flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono text-slate-400 hover:text-white transition-colors"
            title="Direct Engineering Desk"
          >
            <Phone className="w-3.5 h-3.5 text-orange-400" />
            <span>+91 9158004910</span>
          </a>

          <button
            onClick={onQuoteClick}
            className="px-4 py-2 text-xs font-bold text-slate-950 bg-gradient-to-r from-cyan-400 to-sky-300 hover:from-cyan-300 hover:to-sky-200 rounded-lg transition-all whitespace-nowrap shrink-0 cursor-pointer flex items-center gap-1.5 shadow-md shadow-cyan-500/20"
          >
            <span>Request Quote</span>
            <ArrowUpRight className="w-3.5 h-3.5 stroke-[2.5]" />
          </button>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 text-slate-300 hover:text-white rounded-lg hover:bg-slate-900 transition-colors"
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-slate-800 bg-slate-950 px-6 py-6 space-y-4 shadow-2xl animate-in slide-in-from-top-2 duration-150">
          <div className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => handleLinkClick(link.href)}
                className="text-left text-sm font-semibold text-slate-300 hover:text-cyan-400 py-1 transition-colors"
              >
                {link.label}
              </button>
            ))}
          </div>
          <div className="pt-4 border-t border-slate-800 flex flex-col gap-3">
            <a
              href="tel:+919158004910"
              className="flex items-center gap-2 text-xs font-mono text-slate-400 hover:text-cyan-400"
            >
              <Phone className="w-3.5 h-3.5 text-orange-400" />
              <span>Direct Desk: +91 9158004910 / 1 (800) 555-8378</span>
            </a>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onQuoteClick();
              }}
              className="w-full py-2.5 px-4 text-xs font-bold text-slate-950 bg-gradient-to-r from-cyan-400 to-sky-300 rounded-lg text-center hover:opacity-95 transition-opacity flex items-center justify-center gap-2"
            >
              <span>Request a Quote</span>
              <ArrowUpRight className="w-3.5 h-3.5 stroke-[2.5]" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
