import * as THREE from 'three';
import { MachineGroup } from './machineComponents';

export function smoothstep(a: number, b: number, x: number): number {
  const t = THREE.MathUtils.clamp((x - a) / (b - a), 0, 1);
  return t * t * (3 - 2 * t);
}

export function getComponentStagger(name: string): number {
  if (name === 'base frame') return 0;
  if (name === 'upright frame') return 0.08;
  if (name === 'processing core') return 0.18;
  if (name === 'auxiliary mechanisms') return 0.25;
  if (name === 'hopper') return 0.28;
  if (name.includes('conveyor')) return 0.36;
  if (name === 'sensors') return 0.45;
  if (name === 'drive motors') return 0.48;
  if (name === 'control cabinet' || name === 'signal tower') return 0.55;
  if (name === 'top cover') return 0.62;
  if (name === 'safety guards') return 0.7;
  if (name === 'front guard door') return 0.78;
  if (name === 'service panels') return 0.84;
  return 0.9;
}

export interface AssemblyTransformOptions {
  orbitAngleX?: number;
  orbitAngleY?: number;
  orbitDistanceZoom?: number;
}

export function applyAssemblyProgress(
  components: MachineGroup[],
  progress: number,
  camera: THREE.PerspectiveCamera,
  isMobile: boolean,
  options?: AssemblyTransformOptions
): void {
  const p = THREE.MathUtils.clamp(progress, 0, 1);

  for (let i = 0; i < components.length; i++) {
    const g = components[i];
    const stagger = getComponentStagger(g.name);
    const local = THREE.MathUtils.clamp((p - stagger * 0.35) / (1 - stagger * 0.35), 0, 1);
    const eased = smoothstep(0, 1, local);

    const ex = g.userData.explode;
    const tar = g.userData.target;

    // Strict deterministic final position at p === 1
    if (p >= 0.999) {
      g.position.copy(tar);
      g.rotation.copy(g.userData.targetRot);
    } else if (p <= 0.001) {
      g.position.set(ex.x + tar.x, ex.y + tar.y, ex.z + tar.z);
      g.rotation.copy(g.userData.explodeRot);
    } else {
      g.position.set(
        THREE.MathUtils.lerp(ex.x + tar.x, tar.x, eased),
        THREE.MathUtils.lerp(ex.y + tar.y, tar.y, eased),
        THREE.MathUtils.lerp(ex.z + tar.z, tar.z, eased)
      );

      const er = g.userData.explodeRot;
      const tr = g.userData.targetRot;
      g.rotation.set(
        THREE.MathUtils.lerp(er.x, tr.x, eased),
        THREE.MathUtils.lerp(er.y, tr.y, eased),
        THREE.MathUtils.lerp(er.z, tr.z, eased)
      );
    }
  }

  // Camera positioning
  const baseCamX = THREE.MathUtils.lerp(8.9, 7.9, p);
  const baseCamY = THREE.MathUtils.lerp(isMobile ? 7.9 : 7.1, isMobile ? 6.8 : 6.2, p);
  const baseCamZ = THREE.MathUtils.lerp(isMobile ? 15.0 : 13.8, isMobile ? 13.4 : 12.2, p);

  const lookTarget = new THREE.Vector3(0, 1.62, 0);

  // Apply subtle orbit offsets if user is dragging to inspect
  if (options && (options.orbitAngleX || options.orbitAngleY || options.orbitDistanceZoom)) {
    const ox = options.orbitAngleX || 0;
    const oy = options.orbitAngleY || 0;
    const zoom = options.orbitDistanceZoom || 1.0;

    // Convert base camera into spherical-like offset from target
    const currentOffset = new THREE.Vector3(baseCamX, baseCamY, baseCamZ).sub(lookTarget);
    const radius = currentOffset.length() * zoom;
    const theta = Math.atan2(currentOffset.x, currentOffset.z) + ox;
    const phi = Math.acos(THREE.MathUtils.clamp(currentOffset.y / radius, -0.99, 0.99)) - oy;

    const clampedPhi = THREE.MathUtils.clamp(phi, 0.2, Math.PI / 2 - 0.05);

    camera.position.x = lookTarget.x + radius * Math.sin(clampedPhi) * Math.sin(theta);
    camera.position.y = lookTarget.y + radius * Math.cos(clampedPhi);
    camera.position.z = lookTarget.z + radius * Math.sin(clampedPhi) * Math.cos(theta);
  } else {
    camera.position.set(baseCamX, baseCamY, baseCamZ);
  }

  camera.lookAt(lookTarget);
}
