import React, { useState, useCallback } from 'react';
import { Navigation } from './components/Navigation';
import { Hero } from './components/Hero';
import { RoiMetrics } from './components/RoiMetrics';
import { MachineShowcase } from './components/MachineShowcase';
import { MachineAssembly } from './components/MachineAssembly';
import { CapabilitiesMatrix } from './components/CapabilitiesMatrix';
import { ProcessTimeline } from './components/ProcessTimeline';
import { QuoteConfigurator } from './components/QuoteConfigurator';
import { Applications } from './components/Applications';
import { Engineering } from './components/Engineering';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';

export default function App() {
  const [selectedMachineForQuote, setSelectedMachineForQuote] = useState<string>('');

  const scrollToContact = useCallback((customMachine?: string) => {
    if (customMachine && typeof customMachine === 'string') {
      setSelectedMachineForQuote(customMachine);
    }
    const contactElem = document.getElementById('contact');
    if (contactElem) {
      contactElem.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  const scrollToEquipment = useCallback(() => {
    const equipElem = document.getElementById('equipment');
    if (equipElem) {
      equipElem.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  const scrollTo3D = useCallback(() => {
    const machinesElem = document.getElementById('machines');
    if (machinesElem) {
      machinesElem.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-cyan-500 selection:text-slate-950 flex flex-col font-sans">
      {/* 1. Navigation Header */}
      <Navigation onQuoteClick={() => scrollToContact()} />

      {/* Main Content Sections */}
      <main className="flex-1 w-full">
        {/* 2. Dynamic Hero Section */}
        <Hero
          onExploreClick={scrollToEquipment}
          onQuoteClick={() => scrollToContact()}
          on3DClick={scrollTo3D}
        />

        {/* 3. ROI & Verified Performance Metrics Banner */}
        <RoiMetrics />

        {/* 4. Real Equipment Showcase (Referencing Exact Attached Filenames) */}
        <MachineShowcase onQuoteClick={scrollToContact} />

        {/* 5. Signature Interactive 3D Machine Assembly (Scroll-Linked Digital Twin) */}
        <MachineAssembly onQuoteClick={() => scrollToContact('Series 900 Rotary Processing Cell')} />

        {/* 6. Interactive Capabilities Matrix (PLC, Robotics, Vision AI, Feeding, Rotary, SPM) */}
        <CapabilitiesMatrix onQuoteClick={() => scrollToContact()} />

        {/* 7. "Our Process" Sleek Timeline (6-Stage Turnkey Delivery) */}
        <ProcessTimeline onQuoteClick={() => scrollToContact('Stage 01 Digital Feasibility Study')} />

        {/* 8. Interactive Machine Configurator & Throughput Calculator */}
        <QuoteConfigurator onQuoteClick={scrollToContact} />

        {/* 9. Target Industrial Applications & Sectors */}
        <Applications onQuoteClick={scrollToContact} />

        {/* 10. Engineering & Manufacturing Quality Standards */}
        <Engineering />

        {/* 11. Technical Proposal Request & Contact Desk */}
        <Contact preselectedEquipment={selectedMachineForQuote} />
      </main>

      {/* 12. Footer */}
      <Footer />
    </div>
  );
}
