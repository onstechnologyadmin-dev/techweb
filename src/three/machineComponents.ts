import * as THREE from 'three';
import { IndustrialMaterials } from './materials';

export interface MachineGroup extends THREE.Group {
  userData: {
    target: THREE.Vector3;
    explode: THREE.Vector3;
    targetRot: THREE.Euler;
    explodeRot: THREE.Euler;
    stageIndex: number;
    stageName: string;
    description: string;
  };
}

export interface BuildMachineResult {
  root: THREE.Group;
  components: MachineGroup[];
  dispose: () => void;
}

export function buildMachine(materials: IndustrialMaterials): BuildMachineResult {
  const root = new THREE.Group();
  root.name = 'MachineRoot';
  const components: MachineGroup[] = [];
  const geometriesToDispose: THREE.BufferGeometry[] = [];

  function registerGeo<T extends THREE.BufferGeometry>(geo: T): T {
    geometriesToDispose.push(geo);
    return geo;
  }

  function group(
    name: string,
    target: [number, number, number] = [0, 0, 0],
    explode: [number, number, number] = [0, 0, 0],
    rot: [number, number, number] = [0, 0, 0],
    stageIndex = 1,
    stageName = 'Assembly',
    description = ''
  ): MachineGroup {
    const g = new THREE.Group() as MachineGroup;
    g.name = name;
    root.add(g);
    g.position.set(...target);
    g.rotation.set(...rot);
    g.userData = {
      target: new THREE.Vector3(...target),
      explode: new THREE.Vector3(...explode),
      targetRot: new THREE.Euler(...rot),
      explodeRot: new THREE.Euler(
        rot[0] + (Math.random() - 0.5) * 0.16,
        rot[1] + (Math.random() - 0.5) * 0.22,
        rot[2] + (Math.random() - 0.5) * 0.16
      ),
      stageIndex,
      stageName,
      description,
    };
    components.push(g);
    return g;
  }

  function addMesh(
    parent: THREE.Group,
    geo: THREE.BufferGeometry,
    material: THREE.Material,
    pos: [number, number, number],
    rot?: [number, number, number]
  ): THREE.Mesh {
    const m = new THREE.Mesh(geo, material);
    m.position.set(...pos);
    if (rot) m.rotation.set(...rot);
    m.castShadow = true;
    m.receiveShadow = true;
    parent.add(m);
    return m;
  }

  function box(
    p: THREE.Group,
    size: [number, number, number],
    material: THREE.Material,
    pos: [number, number, number],
    rot?: [number, number, number]
  ) {
    const geo = registerGeo(new THREE.BoxGeometry(...size));
    return addMesh(p, geo, material, pos, rot);
  }

  function cyl(
    p: THREE.Group,
    r1: number,
    r2: number,
    h: number,
    material: THREE.Material,
    pos: [number, number, number],
    axis: 'x' | 'y' | 'z' = 'y',
    seg = 20
  ) {
    const geo = registerGeo(new THREE.CylinderGeometry(r1, r2, h, seg));
    const m = addMesh(p, geo, material, pos);
    if (axis === 'x') m.rotation.z = Math.PI / 2;
    if (axis === 'z') m.rotation.x = Math.PI / 2;
    return m;
  }

  function rod(
    p: THREE.Group,
    a: [number, number, number],
    b: [number, number, number],
    r: number,
    material: THREE.Material
  ) {
    const A = new THREE.Vector3(...a);
    const B = new THREE.Vector3(...b);
    const d = B.clone().sub(A);
    const geo = registerGeo(new THREE.CylinderGeometry(r, r, d.length(), 10));
    const m = addMesh(
      p,
      geo,
      material,
      A.clone().add(B).multiplyScalar(0.5).toArray() as [number, number, number]
    );
    m.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), d.normalize());
    return m;
  }

  function panel(
    g: THREE.Group,
    w: number,
    h: number,
    d: number,
    pos: [number, number, number],
    material: THREE.Material = materials.steel
  ) {
    box(g, [w, h, d], material, pos);
    for (const x of [-w / 2 + 0.035, w / 2 - 0.035]) {
      for (const y of [-h / 2 + 0.035, h / 2 - 0.035]) {
        cyl(g, 0.022, 0.022, d + 0.012, materials.brightSteel, [pos[0] + x, pos[1] + y, pos[2]], 'z', 8);
      }
    }
  }

  // 1. Lower skid and feet
  const base = group(
    'base frame',
    [0, 0.45, 0],
    [0, -1.8, 0],
    [0, 0, 0],
    1,
    'Chassis & Base',
    'Heavy-gauge 304 stainless steel base skid with vibration-dampened leveling feet.'
  );
  for (const x of [-1.75, 1.75]) {
    for (const z of [-0.7, 0.7]) {
      box(base, [0.17, 0.13, 0.17], materials.darkSteel, [x, 0.04, z]);
      cyl(base, 0.095, 0.11, 0.11, materials.rubber, [x, -0.08, z]);
      cyl(base, 0.065, 0.065, 0.12, materials.brightSteel, [x, -0.17, z]);
    }
  }
  for (const z of [-0.68, 0.68]) {
    box(base, [3.75, 0.16, 0.16], materials.steel, [0, 0.35, z]);
  }
  for (const x of [-1.8, 1.8]) {
    box(base, [0.16, 0.16, 1.42], materials.steel, [x, 0.35, 0]);
  }
  box(base, [3.55, 0.09, 0.09], materials.darkSteel, [0, 0.48, 0]);

  // 2. Four tall frame posts and cross rails
  const frame = group(
    'upright frame',
    [0, 1.65, 0],
    [0, 1.4, 0],
    [0, 0, 0],
    1,
    'Upright Gantry',
    'CNC-machined structural uprights with precision mounting channels.'
  );
  for (const x of [-1.55, 1.55]) {
    for (const z of [-0.57, 0.57]) {
      box(frame, [0.12, 2.15, 0.12], materials.brightSteel, [x, 0, z]);
      for (const y of [-0.8, -0.35, 0.1, 0.55, 0.9]) {
        box(frame, [0.145, 0.035, 0.145], materials.darkSteel, [x, y, z]);
      }
    }
  }
  for (const y of [-0.65, 0.55, 0.92]) {
    box(frame, [3.2, 0.1, 0.1], materials.steel, [0, y, -0.57]);
    box(frame, [3.2, 0.1, 0.1], materials.steel, [0, y, 0.57]);
    box(frame, [0.1, 0.1, 1.15], materials.steel, [-1.55, y, 0]);
    box(frame, [0.1, 0.1, 1.15], materials.steel, [1.55, y, 0]);
  }
  for (let i = 0; i < 8; i++) {
    const x = -1.25 + i * 0.36;
    box(frame, [0.045, 0.045, 0.045], materials.darkSteel, [x, 0.96, 0.63]);
  }

  // 3. Central processing mechanism, drive rollers and shafts
  const process = group(
    'processing core',
    [0, 1.45, 0],
    [0, 0.3, 1.8],
    [0, 0, 0],
    3,
    'Processing Module',
    'Synchronized high-speed rotary tooling with hardened alloy shafts.'
  );
  box(process, [2.15, 0.16, 1.08], materials.darkSteel, [0, -0.05, 0]);
  box(process, [1.95, 0.12, 0.9], materials.brightSteel, [0, 0.06, 0]);
  for (const x of [-0.82, -0.42, 0, 0.42, 0.82]) {
    cyl(process, 0.12, 0.12, 1.05, materials.brightSteel, [x, 0.22, 0], 'z', 24);
    cyl(process, 0.16, 0.16, 0.09, materials.darkSteel, [x, 0.22, 0.57], 'z', 20);
    cyl(process, 0.16, 0.16, 0.09, materials.darkSteel, [x, 0.22, -0.57], 'z', 20);
    for (let j = 0; j < 8; j++) {
      const a = (j * Math.PI) / 4;
      cyl(
        process,
        0.018,
        0.018,
        0.02,
        materials.steel,
        [x + Math.cos(a) * 0.115, 0.22 + Math.sin(a) * 0.115, 0.63],
        'z',
        6
      );
    }
  }
  for (const x of [-0.98, 0.98]) {
    box(process, [0.13, 0.68, 0.13], materials.steel, [x, 0.32, 0]);
    box(process, [0.2, 0.08, 1.15], materials.darkSteel, [x, 0.62, 0]);
  }
  for (let i = 0; i < 4; i++) {
    const x = -0.58 + i * 0.38;
    box(process, [0.2, 0.32, 0.18], materials.whitePaint, [x, 0.38, -0.22]);
    cyl(process, 0.07, 0.07, 0.25, materials.blue, [x, 0.42, 0.25], 'z', 16);
  }
  for (const x of [-1.15, 1.15]) {
    cyl(process, 0.21, 0.21, 0.25, materials.blue, [x, 0.03, 0], 'x', 24);
    cyl(process, 0.12, 0.12, 0.32, materials.darkSteel, [x + 0.15, 0.03, 0], 'x', 16);
  }

  // 4. Hopper, split into hopper body and throat
  const hopper = group(
    'hopper',
    [0, 2.92, 0],
    [0, 1.75, 0],
    [0, 0, 0],
    3,
    'Infeed Hopper',
    'Conical stainless infeed chute with sanitary weld finish and anti-bridging throat.'
  );
  const hopperTop: [number, number, number][] = [
    [-0.8, 0, -0.55],
    [0.8, 0, -0.55],
    [0.8, 0, 0.55],
    [-0.8, 0, 0.55],
  ];
  for (let i = 0; i < 4; i++) {
    const a = hopperTop[i];
    const b = hopperTop[(i + 1) % 4];
    rod(hopper, [a[0], 0.45, a[2]], [b[0], 0.45, b[2]], 0.045, materials.brightSteel);
  }
  const hopperGeo = registerGeo(new THREE.BufferGeometry());
  const verts = new Float32Array([
    -0.8, 0.45, -0.55, 0.8, 0.45, -0.55, -0.28, -0.18, -0.2,
    0.8, 0.45, -0.55, 0.8, 0.45, 0.55, -0.28, -0.18, 0.2,
    0.8, 0.45, 0.55, -0.8, 0.45, 0.55, -0.28, -0.18, 0.2,
    -0.8, 0.45, 0.55, -0.8, 0.45, -0.55, -0.28, -0.18, -0.2,
  ]);
  hopperGeo.setAttribute('position', new THREE.BufferAttribute(verts, 3));
  hopperGeo.computeVertexNormals();
  const hopperMesh = addMesh(hopper, hopperGeo, materials.steel, [0, 0, 0]);
  if (!Array.isArray(hopperMesh.material)) {
    (hopperMesh.material as THREE.Material).side = THREE.DoubleSide;
  }
  box(hopper, [0.48, 0.09, 0.42], materials.darkSteel, [0, -0.22, 0]);
  box(hopper, [0.37, 0.24, 0.32], materials.brightSteel, [0, -0.39, 0]);

  // 5. Top cover and guard rails
  const topCover = group(
    'top cover',
    [0, 2.38, 0],
    [0, 1.3, -1.1],
    [0, 0, 0],
    4,
    'Top Cover',
    'Overhead access canopy with safety interlock mounts.'
  );
  box(topCover, [2.65, 0.1, 1.22], materials.whitePaint, [0, 0, 0]);
  box(topCover, [2.45, 0.035, 1.02], materials.steel, [0, -0.07, 0]);
  for (const x of [-1.2, 1.2]) {
    box(topCover, [0.08, 0.2, 1.0], materials.steel, [x, -0.13, 0]);
  }
  for (const z of [-0.54, 0.54]) {
    box(topCover, [2.5, 0.06, 0.06], materials.brightSteel, [0, -0.12, z]);
  }

  // 6. Long infeed and outfeed conveyor belts
  function makeConveyor(name: string, targetX: number, explodeX: number, length: number, y: number, z: number) {
    const g = group(
      name,
      [targetX, y, z],
      [explodeX, 1.1, z + (z > 0 ? 1.2 : -1.2)],
      [0, 0, 0],
      2,
      'Conveyor System',
      'Food-grade polyurethane conveyor belt with precision tensioning rollers.'
    );
    box(g, [length, 0.12, 0.72], materials.darkSteel, [0, 0, 0]);
    box(g, [length - 0.16, 0.035, 0.56], materials.beltMat, [0, 0.085, 0]);
    for (const x of [-length / 2 + 0.11, length / 2 - 0.11]) {
      cyl(g, 0.105, 0.105, 0.62, materials.rubber, [x, 0.01, 0], 'z', 20);
      cyl(g, 0.055, 0.055, 0.66, materials.brightSteel, [x, 0.01, 0], 'z', 12);
    }
    for (let i = 0; i < Math.floor(length / 0.32); i++) {
      const x = -length / 2 + 0.22 + i * 0.32;
      box(g, [0.025, 0.012, 0.54], materials.conveyorRib, [x, 0.109, 0]);
    }
    for (const x of [-length / 2 + 0.1, length / 2 - 0.1]) {
      box(g, [0.06, 0.16, 0.07], materials.steel, [x, -0.11, 0.34]);
      box(g, [0.06, 0.16, 0.07], materials.steel, [x, -0.11, -0.34]);
    }
    for (const zside of [-0.37, 0.37]) {
      box(g, [length - 0.12, 0.055, 0.045], materials.brightSteel, [0, 0.15, zside]);
    }
    for (const x of [-length * 0.34, 0, length * 0.34]) {
      box(g, [0.08, 0.34, 0.08], materials.steel, [x, -0.24, 0.25]);
      box(g, [0.08, 0.34, 0.08], materials.steel, [x, -0.24, -0.25]);
      box(g, [0.18, 0.06, 0.56], materials.steel, [x, -0.39, 0]);
    }
    return g;
  }
  makeConveyor('infeed conveyor', -2.65, 0.8, 2.7, 1.0, 0);
  makeConveyor('outfeed conveyor', 2.65, -0.7, 2.7, 1.0, 0);

  // 7. Conveyor drive motors
  const motors = group(
    'drive motors',
    [1.35, 0.65, -0.9],
    [1.8, -0.4, -1.1],
    [0, 0, 0],
    2,
    'Drive Motors',
    'High-efficiency IP66 servo motor package with integrated planetary gear reducer.'
  );
  for (const [x, y, z] of [
    [0, 0, 0],
    [-2.7, 0.1, 0],
  ]) {
    const mx = x === 0 ? 0 : -2.7;
    cyl(motors, 0.23, 0.23, 0.42, materials.blue, [mx, y, z], 'x', 24);
    cyl(motors, 0.13, 0.13, 0.13, materials.darkSteel, [mx + 0.27, y, z], 'x', 20);
    for (let i = 0; i < 10; i++) {
      const a = (i * Math.PI) / 5;
      box(
        motors,
        [0.05, 0.06, 0.3],
        materials.brightSteel,
        [mx, y + Math.cos(a) * 0.19, z + Math.sin(a) * 0.19],
        [a, 0, 0]
      );
    }
    box(motors, [0.22, 0.1, 0.22], materials.darkSteel, [mx, y - 0.28, z]);
  }

  // 8. Control cabinet with touchscreen and emergency stop
  const control = group(
    'control cabinet',
    [2.18, 1.8, 0.05],
    [2.2, 0.5, 1.7],
    [0, 0, 0],
    4,
    'HMI Control Enclosure',
    'NEMA 4X / IP66 stainless cabinet with 15-inch industrial touch display and E-stop.'
  );
  box(control, [0.68, 1.15, 0.32], materials.whitePaint, [0, 0, 0]);
  box(control, [0.52, 0.42, 0.035], materials.darkSteel, [0, 0.27, 0.177]);
  box(control, [0.44, 0.32, 0.018], materials.glass, [0, 0.28, 0.201]);
  box(control, [0.13, 0.06, 0.035], materials.blue, [-0.17, 0.28, 0.216]);
  cyl(control, 0.055, 0.055, 0.045, materials.warningRed, [0.18, -0.18, 0.2], 'z', 16);
  cyl(control, 0.045, 0.045, 0.045, materials.warningYellow, [0.04, -0.18, 0.2], 'z', 16);
  cyl(control, 0.045, 0.045, 0.045, materials.warningGreen, [-0.09, -0.18, 0.2], 'z', 16);
  box(control, [0.07, 0.48, 0.04], materials.darkSteel, [0.25, -0.34, 0.18]);
  box(control, [0.1, 0.04, 0.035], materials.brightSteel, [-0.19, -0.45, 0.19]);

  // 9. Signal tower
  const tower = group(
    'signal tower',
    [2.18, 2.68, 0.05],
    [2.5, 1.5, 0.4],
    [0, 0, 0],
    4,
    'Telemetry Beacon',
    'Three-color optical status tower for line visibility and fault status.'
  );
  cyl(tower, 0.045, 0.045, 0.18, materials.darkSteel, [0, 0, 0]);
  const towerLamps: [number, THREE.Material][] = [
    [0.1, materials.warningGreen],
    [0.2, materials.warningYellow],
    [0.3, materials.warningRed],
  ];
  for (const [y, m] of towerLamps) {
    cyl(tower, 0.055, 0.055, 0.09, m, [0, y, 0]);
  }

  // 10. Outer stainless safety panels
  const guards = group(
    'safety guards',
    [0, 1.45, 0],
    [0, 0.2, -2.0],
    [0, 0, 0],
    4,
    'Safety Enclosure',
    'Heavy-duty stainless surround panels with flush fastener mountings.'
  );
  panel(guards, 1.12, 0.82, 0.055, [-0.92, 0.0, 0.69], materials.whitePaint);
  panel(guards, 1.12, 0.82, 0.055, [0.92, 0.0, 0.69], materials.whitePaint);
  panel(guards, 1.12, 0.82, 0.055, [-0.92, 0.0, -0.69], materials.whitePaint);
  panel(guards, 1.12, 0.82, 0.055, [0.92, 0.0, -0.69], materials.whitePaint);
  panel(guards, 0.055, 1.0, 1.35, [-1.62, 0.02, 0], materials.steel);
  panel(guards, 0.055, 1.0, 1.35, [1.62, 0.02, 0], materials.steel);
  panel(guards, 2.95, 0.22, 0.055, [0, -0.54, 0.69], materials.steel);
  panel(guards, 2.95, 0.22, 0.055, [0, -0.54, -0.69], materials.steel);

  // 11. Hinged clear door and its metal frame on the front
  const door = group(
    'front guard door',
    [0, 1.47, 0.78],
    [0, 0.15, 2.0],
    [0, 0, 0],
    4,
    'Hinged Inspection Door',
    'Shatter-resistant polycarbonate inspection window in welded tubular frame.'
  );
  box(door, [2.85, 0.88, 0.045], materials.glass, [0, 0, 0]);
  for (const x of [-1.45, 1.45]) {
    box(door, [0.065, 0.98, 0.075], materials.brightSteel, [x, 0, 0.015]);
  }
  for (const y of [-0.47, 0.47]) {
    box(door, [2.95, 0.065, 0.075], materials.brightSteel, [0, y, 0.015]);
  }
  for (const x of [-1.32, 1.32]) {
    for (const y of [-0.36, 0.36]) {
      cyl(door, 0.025, 0.025, 0.02, materials.darkSteel, [x, y, 0.06], 'z', 8);
    }
  }
  box(door, [0.055, 0.28, 0.055], materials.darkSteel, [1.23, -0.03, 0.07]);

  // 12. Side panels and service doors (FIXED the original [steel][0] bug!)
  const sidePanels = group(
    'service panels',
    [0, 1.3, 0],
    [0, -0.8, 2.1],
    [0, 0, 0],
    4,
    'Maintenance Access Panels',
    'Quarter-turn quick-release panels for rapid routine sanitation and belt service.'
  );
  panel(sidePanels, 0.62, 0.8, 0.06, [-1.83, 0.1, 0], materials.whitePaint);
  panel(sidePanels, 0.62, 0.8, 0.06, [1.83, 0.1, 0], materials.whitePaint);
  panel(sidePanels, 0.55, 0.68, 0.06, [-1.83, -0.52, 0.03], materials.steel);
  panel(sidePanels, 0.55, 0.68, 0.06, [1.83, -0.52, 0.03], materials.steel);
  for (const x of [-1.83, 1.83]) {
    // Fixed bug here: materials.steel cleanly passed instead of [steel][0]
    box(sidePanels, [0.035, 0.22, 0.05], materials.steel, [x, 0.1, 0.05]);
    cyl(sidePanels, 0.025, 0.025, 0.04, materials.darkSteel, [x + 0.15, 0.05, 0.06], 'z', 8);
  }

  // 13. Exposed fasteners, feet and fine hardware floating as an assembly group
  const hardware = group(
    'fasteners and brackets',
    [0, 1.4, 0],
    [0, 2.3, 0],
    [0, 0, 0],
    1,
    'Mounting Hardware',
    'A4-80 stainless steel fasteners and anti-vibration flange hardware.'
  );
  for (let i = 0; i < 24; i++) {
    const x = ((i % 6) - 2.5) * 0.49;
    const y = Math.floor(i / 6) * 0.42 - 0.5;
    const z = i % 2 ? -0.78 : 0.78;
    cyl(hardware, 0.035, 0.035, 0.035, materials.brightSteel, [x, y, z], 'z', 8);
    box(hardware, [0.018, 0.018, 0.045], materials.darkSteel, [x, y, z + 0.03]);
  }
  for (const x of [-1.35, 1.35]) {
    for (const z of [-0.5, 0.5]) {
      box(hardware, [0.16, 0.1, 0.13], materials.darkSteel, [x, -0.4, z]);
      cyl(hardware, 0.04, 0.04, 0.08, materials.brightSteel, [x, -0.33, z], 'y', 10);
    }
  }

  // 14. A compact sensor array near the infeed
  const sensors = group(
    'sensors',
    [-2.0, 1.55, 0.1],
    [-2.3, 1.5, 0.9],
    [0, 0, 0],
    2,
    'Infeed Sensor Array',
    'Optical position sensors with microsecond response time and IP69K washdown rating.'
  );
  box(sensors, [0.11, 0.42, 0.13], materials.darkSteel, [0, 0, 0]);
  box(sensors, [0.14, 0.15, 0.16], materials.brightSteel, [0, 0.2, 0]);
  box(sensors, [0.06, 0.06, 0.06], materials.warningRed, [0, 0.2, 0.09]);
  rod(sensors, [0, -0.18, 0], [0, -0.42, 0], 0.025, materials.steel);

  // 15. Additional gearboxes, bearings, and pneumatic cylinders
  const mechanisms = group(
    'auxiliary mechanisms',
    [0, 1.25, 0],
    [0, -1.3, -1.6],
    [0, 0, 0],
    2,
    'Internal Mechanics',
    'Precision gear assemblies, sealed bearings, and dual-acting pneumatic rams.'
  );
  for (const [x, z] of [
    [-1.12, 0.1],
    [1.12, 0.1],
    [-0.65, -0.52],
    [0.65, -0.52],
  ]) {
    box(mechanisms, [0.24, 0.32, 0.22], materials.darkSteel, [x, 0, z]);
    cyl(mechanisms, 0.12, 0.12, 0.18, materials.brightSteel, [x, 0.04, z + 0.15], 'z', 18);
    cyl(mechanisms, 0.065, 0.065, 0.26, materials.steel, [x, 0.04, z + 0.25], 'z', 14);
    for (let j = 0; j < 6; j++) {
      const a = (j * Math.PI) / 3;
      cyl(
        mechanisms,
        0.018,
        0.018,
        0.025,
        materials.brightSteel,
        [x + Math.cos(a) * 0.085, 0.04 + Math.sin(a) * 0.085, z + 0.35],
        'z',
        6
      );
    }
  }
  for (let i = 0; i < 3; i++) {
    const x = -0.55 + i * 0.55;
    cyl(mechanisms, 0.055, 0.055, 0.48, materials.brightSteel, [x, 0.35, -0.15], 'y', 14);
    cyl(mechanisms, 0.085, 0.085, 0.1, materials.darkSteel, [x, 0.12, -0.15], 'y', 14);
  }

  return {
    root,
    components,
    dispose: () => {
      geometriesToDispose.forEach((geo) => geo.dispose());
    },
  };
}
