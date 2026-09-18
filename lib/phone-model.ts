import * as THREE from 'three';

// Real geometry, not a rotated flat image. Ratios approximate a 72 × 150 × 9 mm
// device. The front faces +Z; the chassis, back and buttons occupy real depth.
function outline(width: number, height: number, radius: number) {
  const x = -width / 2,
    y = -height / 2;
  const s = new THREE.Shape();
  s.moveTo(x + radius, y);
  s.lineTo(x + width - radius, y);
  s.quadraticCurveTo(x + width, y, x + width, y + radius);
  s.lineTo(x + width, y + height - radius);
  s.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  s.lineTo(x + radius, y + height);
  s.quadraticCurveTo(x, y + height, x, y + height - radius);
  s.lineTo(x, y + radius);
  s.quadraticCurveTo(x, y, x + radius, y);
  return s;
}

function slab(
  width: number,
  height: number,
  depth: number,
  radius: number,
  bevel: number,
) {
  const geometry = new THREE.ExtrudeGeometry(outline(width, height, radius), {
    depth,
    bevelEnabled: bevel > 0,
    bevelSize: bevel,
    bevelThickness: bevel,
    bevelSegments: 3,
    curveSegments: 12,
    steps: 1,
  });
  geometry.translate(0, 0, -depth / 2);
  return geometry;
}

export function createPhoneModel(screenTexture: THREE.Texture) {
  const phone = new THREE.Group();
  phone.name = 'arena-solid-smartphone';
  const metal = new THREE.MeshStandardMaterial({
    color: '#88928b',
    metalness: 0.9,
    roughness: 0.27,
  });
  const polished = new THREE.MeshStandardMaterial({
    color: '#b3bdb2',
    metalness: 1,
    roughness: 0.18,
  });
  const black = new THREE.MeshStandardMaterial({
    color: '#090d0b',
    metalness: 0.35,
    roughness: 0.3,
  });
  const back = new THREE.MeshPhysicalMaterial({
    color: '#29312a',
    metalness: 0.3,
    roughness: 0.35,
    clearcoat: 0.8,
    clearcoatRoughness: 0.2,
  });
  const lens = new THREE.MeshPhysicalMaterial({
    color: '#172d42',
    metalness: 0.5,
    roughness: 0.1,
    clearcoat: 1,
  });
  const add = (
    name: string,
    geometry: THREE.BufferGeometry,
    material: THREE.Material,
    x = 0,
    y = 0,
    z = 0,
  ) => {
    const mesh = new THREE.Mesh(geometry, material);
    mesh.name = name;
    mesh.position.set(x, y, z);
    phone.add(mesh);
    return mesh;
  };
  add('metal-chassis', slab(2.4, 5, 0.24, 0.3, 0.03), metal);
  add(
    'front-glass-bezel',
    slab(2.33, 4.93, 0.018, 0.29, 0.008),
    black,
    0,
    0,
    0.164,
  );
  add('solid-back', slab(2.33, 4.93, 0.018, 0.29, 0.008), back, 0, 0, -0.164);

  // UVs attach the placeholder (or future approved screenshot) to the actual
  // front surface, so it cannot float away from the chassis during rotation.
  const screenWidth = 2.2,
    screenHeight = 4.79;
  const screenGeometry = new THREE.ShapeGeometry(
    outline(screenWidth, screenHeight, 0.235),
    18,
  );
  const positions = screenGeometry.getAttribute('position');
  const uv = screenGeometry.getAttribute('uv');
  for (let i = 0; i < positions.count; i++)
    uv.setXY(
      i,
      positions.getX(i) / screenWidth + 0.5,
      positions.getY(i) / screenHeight + 0.5,
    );
  add(
    'front-screen',
    screenGeometry,
    new THREE.MeshBasicMaterial({ map: screenTexture, toneMapped: false }),
    0,
    0,
    0.184,
  );
  add(
    'front-camera-island',
    slab(0.4, 0.115, 0.006, 0.055, 0),
    black,
    0,
    2.21,
    0.19,
  );
  add(
    'front-camera-lens',
    new THREE.CircleGeometry(0.027, 24),
    lens,
    0.105,
    2.21,
    0.195,
  );

  const power = add(
    'power-button-right',
    slab(0.11, 0.56, 0.04, 0.045, 0.009),
    polished,
    1.236,
    0.6,
    0,
  );
  power.rotation.y = Math.PI / 2;
  for (const [name, y] of [
    ['volume-up-left', 1.05],
    ['volume-down-left', 0.37],
  ] as const) {
    const button = add(
      name,
      slab(0.105, 0.43, 0.04, 0.04, 0.008),
      polished,
      -1.236,
      y,
      0,
    );
    button.rotation.y = Math.PI / 2;
  }
  for (const x of [-1.23, 1.23])
    for (const y of [-1.84, 1.84]) {
      add(
        `antenna-${x}-${y}`,
        new THREE.BoxGeometry(0.014, 0.036, 0.236),
        black,
        x,
        y,
        0,
      );
    }
  add(
    'charging-port',
    new THREE.BoxGeometry(0.3, 0.009, 0.09),
    black,
    0,
    -2.53,
    0,
  );
  for (const x of [-0.79, -0.66, -0.53, 0.53, 0.66, 0.79]) {
    add(
      `speaker-${x}`,
      new THREE.CylinderGeometry(0.022, 0.022, 0.009, 12),
      black,
      x,
      -2.53,
      0,
    );
  }

  add(
    'rear-camera-island',
    slab(0.83, 0.97, 0.055, 0.16, 0.012),
    black,
    -0.63,
    1.66,
    -0.211,
  );
  for (const y of [1.89, 1.44]) {
    const ring = add(
      `rear-lens-ring-${y}`,
      new THREE.CylinderGeometry(0.17, 0.17, 0.063, 40),
      polished,
      -0.69,
      y,
      -0.278,
    );
    ring.rotation.x = Math.PI / 2;
    const glass = add(
      `rear-lens-glass-${y}`,
      new THREE.CircleGeometry(0.139, 40),
      lens,
      -0.69,
      y,
      -0.311,
    );
    glass.rotation.y = Math.PI;
  }
  const flash = add(
    'rear-flash',
    new THREE.CircleGeometry(0.051, 24),
    new THREE.MeshStandardMaterial({ color: '#e4dfc8', roughness: 0.35 }),
    -0.36,
    1.89,
    -0.253,
  );
  flash.rotation.y = Math.PI;
  return phone;
}

export function disposePhoneModel(phone: THREE.Group) {
  const materials = new Set<THREE.Material>();
  phone.traverse((object) => {
    if (object instanceof THREE.Mesh) {
      object.geometry.dispose();
      for (const material of Array.isArray(object.material)
        ? object.material
        : [object.material])
        materials.add(material);
    }
  });
  materials.forEach((material) => material.dispose());
}
