import { useState, useEffect, useCallback, RefObject } from 'react';

export interface UseAssemblyScrollReturn {
  scrollProgress: number;
  isSectionActive: boolean;
  activeStage: number;
  prefersReducedMotion: boolean;
  scrollToProgress: (targetP: number) => void;
}

export function useAssemblyScroll(
  containerRef: RefObject<HTMLElement | null>
): UseAssemblyScrollReturn {
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [isSectionActive, setIsSectionActive] = useState<boolean>(false);
  const [activeStage, setActiveStage] = useState<number>(0);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState<boolean>(false);

  // Check reduced motion
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const listener = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', listener);
    return () => mediaQuery.removeEventListener('change', listener);
  }, []);

  // Compute scroll progress with passive listener
  useEffect(() => {
    let animationFrameId: number;

    const handleScroll = () => {
      cancelAnimationFrame(animationFrameId);
      animationFrameId = requestAnimationFrame(() => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        const totalDistance = rect.height - window.innerHeight;

        if (totalDistance <= 0) return;

        // If top of container is still below top of viewport, we haven't reached assembly start yet
        const scrolled = -rect.top;
        const rawProgress = Math.max(0, Math.min(1, scrolled / totalDistance));

        setScrollProgress(rawProgress);
        setIsSectionActive(rect.top <= 0 && rect.bottom >= window.innerHeight);

        // Map progress to 4 clear engineering stages
        if (rawProgress < 0.25) setActiveStage(1);
        else if (rawProgress < 0.55) setActiveStage(2);
        else if (rawProgress < 0.85) setActiveStage(3);
        else setActiveStage(4);
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    handleScroll();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [containerRef]);

  const scrollToProgress = useCallback(
    (targetP: number) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const currentScrollY = window.scrollY;
      const containerTopDoc = currentScrollY + rect.top;
      const totalDistance = rect.height - window.innerHeight;
      const targetScrollY = containerTopDoc + Math.max(0, Math.min(1, targetP)) * totalDistance;

      window.scrollTo({
        top: targetScrollY,
        behavior: 'smooth',
      });
    },
    [containerRef]
  );

  return {
    scrollProgress,
    isSectionActive,
    activeStage,
    prefersReducedMotion,
    scrollToProgress,
  };
}
