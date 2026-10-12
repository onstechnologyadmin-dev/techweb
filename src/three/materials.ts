import * as THREE from 'three';

export interface IndustrialMaterials {
  steel: THREE.MeshStandardMaterial;
  brightSteel: THREE.MeshStandardMaterial;
  darkSteel: THREE.MeshStandardMaterial;
  innerDark: THREE.MeshStandardMaterial;
  blue: THREE.MeshStandardMaterial;
  beltMat: THREE.MeshStandardMaterial;
  rubber: THREE.MeshStandardMaterial;
  glass: THREE.MeshStandardMaterial;
  whitePaint: THREE.MeshStandardMaterial;
  warningRed: THREE.MeshStandardMaterial;
  warningYellow: THREE.MeshStandardMaterial;
  warningGreen: THREE.MeshStandardMaterial;
  conveyorRib: THREE.MeshStandardMaterial;
  shadowGround: THREE.ShadowMaterial;
  dispose: () => void;
}

export function createIndustrialMaterials(): IndustrialMaterials {
  const mat = (color: number, metalness = 0.55, roughness = 0.32) =>
    new THREE.MeshStandardMaterial({ color, metalness, roughness });

  const steel = mat(0xb9c1c7, 0.78, 0.27);
  const brightSteel = mat(0xe0e4e7, 0.7, 0.23);
  const darkSteel = mat(0x343b40, 0.72, 0.31);
  const innerDark = mat(0x171d22, 0.45, 0.38);
  const blue = mat(0x087fc4, 0.58, 0.26);
  const beltMat = mat(0x174f7b, 0.25, 0.55);
  const rubber = mat(0x202529, 0.08, 0.58);
  const conveyorRib = mat(0x2b6790, 0.2, 0.55);

  const glass = new THREE.MeshStandardMaterial({
    color: 0x27343b,
    metalness: 0.2,
    roughness: 0.17,
    emissive: 0x07131b,
    emissiveIntensity: 0.2,
    transparent: true,
    opacity: 0.88,
  });

  const whitePaint = mat(0xd9dee1, 0.48, 0.3);
  const warningRed = mat(0xe12b31, 0.15, 0.3);
  const warningYellow = mat(0xf2bd27, 0.12, 0.35);
  const warningGreen = mat(0x24a65a, 0.1, 0.3);

  const shadowGround = new THREE.ShadowMaterial({ opacity: 0.105 });

  const allMaterials = [
    steel,
    brightSteel,
    darkSteel,
    innerDark,
    blue,
    beltMat,
    rubber,
    glass,
    whitePaint,
    warningRed,
    warningYellow,
    warningGreen,
    conveyorRib,
    shadowGround,
  ];

  return {
    steel,
    brightSteel,
    darkSteel,
    innerDark,
    blue,
    beltMat,
    rubber,
    glass,
    whitePaint,
    warningRed,
    warningYellow,
    warningGreen,
    conveyorRib,
    shadowGround,
    dispose: () => {
      allMaterials.forEach((m) => m.dispose());
    },
  };
}
