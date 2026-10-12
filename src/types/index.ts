export interface MachineItem {
  id: string;
  title: string;
  category: 'Rotary Assembly' | 'Parts Feeding' | 'Automated Lines' | 'Linear Infeed';
  image: string;
  thumbnail?: string;
  badge: string;
  cycleRate: string;
  stations?: string;
  tolerance: string;
  description: string;
  specifications: {
    label: string;
    value: string;
  }[];
  keyFeatures: string[];
}

export interface CapabilityItem {
  id: string;
  title: string;
  category: string;
  tagline: string;
  description: string;
  iconName: string;
  metrics: {
    label: string;
    value: string;
  }[];
  techSpecs: string[];
  supportedHardware: string[];
}

export interface ProcessStep {
  step: string;
  phase: string;
  title: string;
  duration: string;
  description: string;
  milestones: string[];
  deliverables: string[];
  iconName: string;
}

export interface IndustrySector {
  id: string;
  name: string;
  tagline: string;
  image: string;
  overview: string;
  throughput: string;
  tolerance: string;
  cleanroomRating: string;
  keyApplications: string[];
  specs: string[];
}
