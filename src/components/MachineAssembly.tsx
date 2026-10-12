import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { RotateCw, Compass, Sliders, ShieldCheck, Cpu, ArrowDown, Box, Sparkles, Layers } from 'lucide-react';
import { createIndustrialMaterials } from '../three/materials';
import { buildMachine, MachineGroup } from '../three/machineComponents';
import { applyAssemblyProgress, AssemblyTransformOptions } from '../three/assemblyAnimation';

interface MachineAssemblyProps {
  onQuoteClick?: () => void;
}

export const MachineAssembly: React.FC<MachineAssemblyProps> = ({ onQuoteClick }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Interaction & UI State
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [activeStage, setActiveStage] = useState<number>(1);
  const [isManualOverride, setIsManualOverride] = useState<boolean>(false);
  const [manualProgress, setManualProgress] = useState<number>(0);
  const [isOrbiting, setIsOrbiting] = useState<boolean>(false);
  const [orbitAngles, setOrbitAngles] = useState<{ x: number; y: number; zoom: number }>({
    x: 0,
    y: 0,
    zoom: 1.0,
  });
  const [mobileTouchOrbit, setMobileTouchOrbit] = useState<boolean>(false);
  const [webglError, setWebglError] = useState<string | null>(null);

  // References for render loop
  const targetProgressRef = useRef<number>(0);
  const currentProgressRef = useRef<number>(0);
  const orbitRef = useRef<{ x: number; y: number; zoom: number }>({ x: 0, y: 0, zoom: 1.0 });
  const isDraggingRef = useRef<boolean>(false);
  const lastPointerRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  // Sync orbit state with ref
  useEffect(() => {
    orbitRef.current = orbitAngles;
  }, [orbitAngles]);

  // Compute scroll progress with passive window listener
  useEffect(() => {
    let animId: number;
    const handleScroll = () => {
      cancelAnimationFrame(animId);
      animId = requestAnimationFrame(() => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        const totalScrollable = rect.height - window.innerHeight;
        if (totalScrollable <= 0) return;

        // Scrolled distance inside this dedicated container
        const scrolled = -rect.top;
        const p = Math.max(0, Math.min(1, scrolled / totalScrollable));

        setScrollProgress(p);

        if (!isManualOverride) {
          targetProgressRef.current = p;
        }

        // Active stage calculation
        if (p < 0.25) setActiveStage(1);
        else if (p < 0.55) setActiveStage(2);
        else if (p < 0.85) setActiveStage(3);
        else setActiveStage(4);
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    handleScroll();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [isManualOverride]);

  // Handle Three.js setup & render loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        canvas,
        antialias: true,
        alpha: false,
        powerPreference: 'high-performance',
      });
    } catch {
      setWebglError('WebGL is not available in your browser environment.');
      return;
    }

    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setSize(canvas.clientWidth, canvas.clientHeight, false);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.35;
    renderer.setClearColor(0x080c16, 1);

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x080c16);
    scene.fog = new THREE.FogExp2(0x080c16, 0.025);

    const camera = new THREE.PerspectiveCamera(
      window.innerWidth < 768 ? 39 : 34,
      canvas.clientWidth / canvas.clientHeight,
      0.1,
      100
    );
    camera.position.set(8.9, 7.1, 13.8);
    camera.lookAt(0, 1.62, 0);

    // High-tech industrial lighting
    const hemiLight = new THREE.HemisphereLight(0xe0f2fe, 0x0f172a, 2.4);
    scene.add(hemiLight);

    const key = new THREE.DirectionalLight(0xffffff, 3.4);
    key.position.set(7, 14, 8);
    key.castShadow = true;
    key.shadow.mapSize.set(2048, 2048);
    key.shadow.camera.left = -9;
    key.shadow.camera.right = 9;
    key.shadow.camera.top = 12;
    key.shadow.camera.bottom = -8;
    key.shadow.bias = -0.00015;
    scene.add(key);

    const cyanRim = new THREE.DirectionalLight(0x38bdf8, 2.0);
    cyanRim.position.set(-8, 8, -5);
    scene.add(cyanRim);

    const orangeAccent = new THREE.DirectionalLight(0xf97316, 1.6);
    orangeAccent.position.set(4, 5, -9);
    scene.add(orangeAccent);

    // Cyber industrial grid floor helper
    const gridHelper = new THREE.GridHelper(40, 40, 0x0284c7, 0x1e293b);
    gridHelper.position.set(0, -0.015, 0);
    scene.add(gridHelper);

    // Materials and geometry
    const materials = createIndustrialMaterials();
    const { root, components, dispose: disposeMachine } = buildMachine(materials);
    scene.add(root);

    // Shadow ground plane
    const groundGeo = new THREE.PlaneGeometry(200, 200);
    const ground = new THREE.Mesh(groundGeo, materials.shadowGround);
    ground.position.set(0, -0.02, 0);
    ground.rotation.set(-Math.PI / 2, 0, 0);
    ground.receiveShadow = true;
    scene.add(ground);

    // Handle canvas resize
    const handleResize = () => {
      if (!canvas || !renderer) return;
      const width = canvas.parentElement?.clientWidth || window.innerWidth;
      const height = canvas.parentElement?.clientHeight || window.innerHeight;
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.fov = width < 768 ? 40 : 34;
      camera.updateProjectionMatrix();
    };

    window.addEventListener('resize', handleResize, { passive: true });
    handleResize();

    // Context loss listeners
    const handleContextLost = (event: Event) => {
      event.preventDefault();
      setWebglError('WebGL context lost. Attempting to restore graphics...');
    };
    const handleContextRestored = () => {
      setWebglError(null);
      handleResize();
    };
    canvas.addEventListener('webglcontextlost', handleContextLost);
    canvas.addEventListener('webglcontextrestored', handleContextRestored);

    // Animation render loop
    let animationFrameId: number;
    let isDisposed = false;

    const render = () => {
      if (isDisposed) return;
      animationFrameId = requestAnimationFrame(render);

      // Light temporal smoothing for jitter-free scroll interpolation
      const targetP = targetProgressRef.current;
      currentProgressRef.current += (targetP - currentProgressRef.current) * 0.16;

      const effectiveP = currentProgressRef.current;
      const isMobile = window.innerWidth < 768;

      const opts: AssemblyTransformOptions = {
        orbitAngleX: orbitRef.current.x,
        orbitAngleY: orbitRef.current.y,
        orbitDistanceZoom: orbitRef.current.zoom,
      };

      applyAssemblyProgress(components as MachineGroup[], effectiveP, camera, isMobile, opts);

      renderer.render(scene, camera);
    };

    render();

    return () => {
      isDisposed = true;
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      canvas.removeEventListener('webglcontextlost', handleContextLost);
      canvas.removeEventListener('webglcontextrestored', handleContextRestored);
      disposeMachine();
      materials.dispose();
      groundGeo.dispose();
      gridHelper.dispose();
      renderer.dispose();
    };
  }, []);

  // Pointer drag for 360 inspection orbit
  const handlePointerDown = (e: React.PointerEvent) => {
    // On touch devices, allow natural page scrolling unless 3D touch rotation mode is specifically activated
    if (e.pointerType === 'touch' && !mobileTouchOrbit) {
      return;
    }

    isDraggingRef.current = true;
    lastPointerRef.current = { x: e.clientX, y: e.clientY };
    try {
      (e.target as HTMLElement).setPointerCapture(e.pointerId);
    } catch {
      // ignore
    }
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDraggingRef.current) return;
    const deltaX = e.clientX - lastPointerRef.current.x;
    const deltaY = e.clientY - lastPointerRef.current.y;
    lastPointerRef.current = { x: e.clientX, y: e.clientY };

    setOrbitAngles((prev) => ({
      ...prev,
      x: prev.x + deltaX * 0.007,
      y: Math.max(-0.6, Math.min(0.6, prev.y + deltaY * 0.005)),
    }));
    setIsOrbiting(true);
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    isDraggingRef.current = false;
    try {
      (e.target as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {
      // ignore
    }
  };

  const resetOrbit = useCallback(() => {
    setOrbitAngles({ x: 0, y: 0, zoom: 1.0 });
    setIsOrbiting(false);
  }, []);

  // Jump to specific assembly stage
  const jumpToStage = useCallback((progressValue: number) => {
    setIsManualOverride(true);
    setManualProgress(progressValue);
    targetProgressRef.current = progressValue;

    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const currentScrollY = window.scrollY;
      const containerTopDoc = currentScrollY + rect.top;
      const totalScrollable = rect.height - window.innerHeight;
      const targetScrollY = containerTopDoc + progressValue * totalScrollable;

      window.scrollTo({
        top: targetScrollY,
        behavior: 'smooth',
      });
    }
  }, []);

  const handleManualSlider = (val: number) => {
    setIsManualOverride(true);
    setManualProgress(val);
    targetProgressRef.current = val;
  };

  const returnToScrollSync = () => {
    setIsManualOverride(false);
    targetProgressRef.current = scrollProgress;
    resetOrbit();
  };

  const currentDisplayProgress = isManualOverride ? manualProgress : scrollProgress;
  const progressPercent = Math.round(currentDisplayProgress * 100);

  // Stage description definitions
  const stages = [
    {
      id: 1,
      title: '01. Heavy Structural Skid & Gantry Base',
      sub: 'AISI 304 stainless structural weldment, anti-vibration leveling mounts & CNC gantry linear rails',
      range: '0% - 25%',
      target: 0.1,
      badge: 'Chassis Skid',
    },
    {
      id: 2,
      title: '02. Dual Conveyance & Drive Servomotors',
      sub: 'Synchronized infeed/outfeed belts, tensioning rollers, and IP69K brushless servo drives',
      range: '25% - 55%',
      target: 0.45,
      badge: 'Transmission',
    },
    {
      id: 3,
      title: '03. Synchronized Processing Rotary Core',
      sub: 'Hardened globoidal roller cam indexer, sanitary hopper infeed & pneumatic pick-and-place rams',
      range: '55% - 85%',
      target: 0.72,
      badge: 'Tooling Core',
    },
    {
      id: 4,
      title: '04. Polycarbonate Enclosure & HMI Cabinet',
      sub: 'Full interlocked safety guarding, air exhaust evacuation & 15" industrial touch HMI console',
      range: '85% - 100%',
      target: 1.0,
      badge: 'Fully Assembled',
    },
  ];

  return (
    <section
      ref={containerRef}
      id="machines"
      className="relative w-full bg-slate-950 text-white min-h-[300vh] md:min-h-[480vh]"
      aria-label="Interactive 3D Machine Assembly Experience"
    >
      {/* Sticky Fullscreen 3D Viewport */}
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-slate-950 select-none">
        {/* Three.js Canvas */}
        <canvas
          ref={canvasRef}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          className={`w-full h-full block outline-none ${
            mobileTouchOrbit
              ? 'touch-none cursor-grab active:cursor-grabbing'
              : 'touch-pan-y cursor-default md:cursor-grab md:active:cursor-grabbing'
          }`}
          aria-label="3D exploded view of industrial processing machine progressively assembling on scroll"
        />

        {/* Fallback Error Overlay */}
        {webglError && (
          <div className="absolute inset-0 flex items-center justify-center bg-slate-950/95 p-6 text-center z-30">
            <div className="max-w-md p-8 bg-slate-900 border border-slate-800 rounded-xl">
              <ShieldCheck className="w-12 h-12 text-slate-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">Graphics Fallback</h3>
              <p className="text-sm text-slate-400 mb-4">{webglError}</p>
              <button
                onClick={() => window.location.reload()}
                className="px-4 py-2 text-xs font-semibold text-slate-950 bg-cyan-400 rounded-md hover:bg-cyan-300 transition-colors"
              >
                Reload Experience
              </button>
            </div>
          </div>
        )}

        {/* Top Progress & Telemetry Header Bar */}
        <div className="absolute top-20 left-0 right-0 px-6 md:px-12 pointer-events-none z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="pointer-events-auto bg-slate-900/90 backdrop-blur-md border border-slate-800 px-4 py-3 rounded-xl shadow-xl">
            <div className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-cyan-400 radar-live" />
              <span className="text-xs font-mono font-bold text-white tracking-wider uppercase">
                3D DIGITAL TWIN // ASSEMBLY
              </span>
              <span className="text-xs text-slate-600 font-mono">/</span>
              <span className="text-sm font-black font-mono tabular-nums text-cyan-400">
                {progressPercent}%
              </span>
              <span className="text-xs text-slate-600 font-mono">·</span>
              <span className="text-xs font-mono text-slate-400 hidden sm:inline">
                {progressPercent === 100
                  ? 'FULL SPECIFICATION READY'
                  : progressPercent === 0
                  ? 'EXPLODED ENGINEERING SCHEMATIC'
                  : 'PROGRESSIVE ASSEMBLY STAGE'}
              </span>
            </div>

            {/* Micro visual progress strip */}
            <div className="w-full bg-slate-800 h-1.5 rounded-full mt-2.5 overflow-hidden">
              <div
                className="bg-gradient-to-r from-cyan-400 via-sky-400 to-orange-400 h-full transition-all duration-150 ease-out"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Quick Inspection Controls */}
          <div className="pointer-events-auto flex items-center gap-2 bg-slate-900/90 backdrop-blur-md border border-slate-800 p-1.5 rounded-xl shadow-xl">
            {isOrbiting && (
              <button
                onClick={resetOrbit}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors whitespace-nowrap cursor-pointer"
                title="Reset Camera Angle"
              >
                <RotateCw className="w-3.5 h-3.5 text-cyan-400" />
                <span>Reset View</span>
              </button>
            )}

            {/* Mobile touch rotation toggle */}
            <button
              onClick={() => setMobileTouchOrbit((prev) => !prev)}
              className={`flex md:hidden items-center gap-1.5 px-2.5 py-1.5 text-xs font-mono rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                mobileTouchOrbit
                  ? 'bg-orange-500/20 text-orange-300 border border-orange-400/40'
                  : 'text-slate-300 hover:text-white bg-slate-800'
              }`}
              title="Toggle touch 3D rotation"
            >
              <RotateCw className="w-3.5 h-3.5 text-orange-400" />
              <span>{mobileTouchOrbit ? 'Rotating (Touch)' : 'Touch Rotate'}</span>
            </button>

            <button
              onClick={() => {
                if (isManualOverride) returnToScrollSync();
                else setIsManualOverride(true);
              }}
              className={`hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                isManualOverride
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/40'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Sliders className="w-3.5 h-3.5 text-cyan-400" />
              <span>{isManualOverride ? 'Manual Scrubber Active' : 'Scroll-Linked'}</span>
            </button>
          </div>
        </div>

        {/* Dynamic Engineering Callout Overlays */}
        <div className="absolute left-6 md:left-12 bottom-28 md:bottom-24 max-w-sm pointer-events-none z-10 transition-all duration-300">
          <div className="pointer-events-auto bg-slate-900/95 backdrop-blur-md border border-slate-800 p-5 rounded-2xl shadow-2xl">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider">
                Stage {stages[activeStage - 1].id} of 4
              </span>
              <span className="text-xs text-orange-400 font-mono font-semibold">
                {stages[activeStage - 1].range}
              </span>
            </div>
            <h4 className="text-base font-bold text-white mb-1">
              {stages[activeStage - 1].title.replace(/^0\d\.\s*/, '')}
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed mb-4">
              {stages[activeStage - 1].sub}
            </p>

            {/* Quick Stage Preset Selector */}
            <div className="grid grid-cols-4 gap-1.5 pt-3 border-t border-slate-800">
              {stages.map((stg) => {
                const isSelected = activeStage === stg.id;
                return (
                  <button
                    key={stg.id}
                    onClick={() => jumpToStage(stg.target)}
                    className={`py-1.5 px-1 text-center rounded-lg text-xs font-mono transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-gradient-to-r from-cyan-400 to-sky-400 text-slate-950 font-black shadow-md'
                        : 'bg-slate-950 text-slate-400 hover:bg-slate-800 hover:text-white border border-slate-800'
                    }`}
                  >
                    Stg {stg.id}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Manual Scrubber Toolbar */}
        {isManualOverride && (
          <div className="absolute right-6 md:right-12 bottom-28 md:bottom-24 w-72 pointer-events-none z-10">
            <div className="pointer-events-auto bg-slate-900/95 backdrop-blur-md border border-slate-800 p-4 rounded-2xl shadow-2xl">
              <div className="flex items-center justify-between text-xs text-slate-300 mb-2">
                <span className="font-mono font-bold text-white">Manual Timeline</span>
                <button
                  onClick={returnToScrollSync}
                  className="text-cyan-400 hover:text-cyan-300 font-mono text-[11px] cursor-pointer"
                >
                  Return to Scroll
                </button>
              </div>
              <input
                type="range"
                min="0"
                max="1"
                step="0.005"
                value={manualProgress}
                onChange={(e) => handleManualSlider(parseFloat(e.target.value))}
                className="w-full accent-cyan-400 cursor-pointer h-1.5 bg-slate-800 rounded-lg appearance-none"
              />
              <div className="flex justify-between text-[10px] font-mono text-slate-500 mt-1.5">
                <span>0% Exploded</span>
                <span>50% Core</span>
                <span>100% Assembled</span>
              </div>
            </div>
          </div>
        )}

        {/* Mobile Active Touch Rotation Banner */}
        {mobileTouchOrbit && (
          <div className="absolute top-36 left-1/2 -translate-x-1/2 md:hidden z-30 pointer-events-auto">
            <div className="flex items-center gap-2 px-3.5 py-2 bg-slate-900/95 border border-orange-500/80 rounded-full text-xs font-mono text-orange-200 shadow-2xl backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-orange-400 animate-pulse" />
              <span>Touch Rotate Active</span>
              <button
                onClick={() => setMobileTouchOrbit(false)}
                className="ml-2 px-2.5 py-1 bg-gradient-to-r from-cyan-400 to-sky-300 text-slate-950 font-bold rounded-full text-[10px] uppercase tracking-wider hover:opacity-90 transition-opacity cursor-pointer"
              >
                Resume Scroll
              </button>
            </div>
          </div>
        )}

        {/* Bottom Interactive Navigation / Orbit Hint */}
        <div className="absolute bottom-6 left-6 right-6 md:left-12 md:right-12 pointer-events-none z-10 flex items-center justify-between text-xs text-slate-400">
          <div className="flex items-center gap-2 pointer-events-auto bg-slate-900/90 backdrop-blur-md px-3.5 py-2 rounded-xl border border-slate-800">
            <Compass className="w-4 h-4 text-cyan-400" />
            <span className="font-mono text-[11px] hidden sm:inline">Click & drag 3D model to inspect from 360° angle</span>
            <span className="font-mono text-[11px] sm:hidden">
              {mobileTouchOrbit ? 'Drag to rotate 3D view' : 'Swipe down to scroll assembly'}
            </span>
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
            {/* Quick Skip Button on Mobile */}
            <button
              onClick={() => {
                const nextSection = document.getElementById('capabilities');
                if (nextSection) {
                  nextSection.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="sm:hidden pointer-events-auto px-2.5 py-2 bg-slate-900/90 border border-slate-800 text-slate-300 hover:text-white rounded-xl text-[11px] font-mono flex items-center gap-1 shadow-md cursor-pointer"
            >
              <span>Skip 3D</span>
              <ArrowDown className="w-3.5 h-3.5 text-cyan-400" />
            </button>

            {progressPercent < 95 ? (
              <div className="hidden sm:flex items-center gap-2 text-slate-400 bg-slate-900/90 backdrop-blur-md px-3.5 py-2 rounded-xl border border-slate-800 font-mono text-[11px]">
                <ArrowDown className="w-3.5 h-3.5 text-cyan-400 animate-bounce" />
                <span>Scroll down to continue assembly</span>
              </div>
            ) : (
              <button
                onClick={onQuoteClick}
                className="pointer-events-auto px-5 py-2.5 bg-gradient-to-r from-cyan-400 to-sky-300 text-slate-950 rounded-xl font-bold hover:from-cyan-300 hover:to-sky-200 transition-all shadow-lg shadow-cyan-500/25 flex items-center gap-2 cursor-pointer text-xs"
              >
                <Cpu className="w-4 h-4" />
                <span>Configure This Machine</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
