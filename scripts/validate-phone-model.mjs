import assert from 'node:assert/strict';
import * as THREE from 'three';
import { createPhoneModel, disposePhoneModel } from '../lib/phone-model.ts';

// CPU geometry checks, without a browser or GPU. Validate real depth, closed
// side faces, attached screen, physical buttons and camera framing at +/-45°.
const texture = new THREE.Texture();
const phone = createPhoneModel(texture);
phone.updateMatrixWorld(true);
for (const name of [
  'metal-chassis',
  'solid-back',
  'front-screen',
  'power-button-right',
  'volume-up-left',
  'volume-down-left',
  'rear-camera-island',
  'charging-port',
]) {
  assert.ok(phone.getObjectByName(name), name);
}
const chassis = phone.getObjectByName('metal-chassis');
const dimensions = new THREE.Box3()
  .setFromObject(chassis)
  .getSize(new THREE.Vector3());
assert.ok(
  dimensions.z > 0.29 && dimensions.z < 0.32,
  'chassis has real phone-like thickness',
);
assert.ok(
  dimensions.x > 2.4 && dimensions.y > 5,
  'rounded, beveled solid body',
);
const sideRay = new THREE.Raycaster(
  new THREE.Vector3(4, 0, 0),
  new THREE.Vector3(-1, 0, 0),
);
assert.ok(
  sideRay.intersectObject(chassis).length > 0,
  'side is a real surface, not an empty plane',
);
const frontRay = new THREE.Raycaster(
  new THREE.Vector3(0, 0, 5),
  new THREE.Vector3(0, 0, -1),
);
assert.equal(
  frontRay.intersectObject(phone, true)[0].object.name,
  'front-screen',
);
const rearRay = new THREE.Raycaster(
  new THREE.Vector3(0, 0, -5),
  new THREE.Vector3(0, 0, 1),
);
assert.equal(rearRay.intersectObject(phone, true)[0].object.name, 'solid-back');
const screen = phone.getObjectByName('front-screen');
assert.equal(screen.material.map, texture);
for (const value of screen.geometry.attributes.uv.array)
  assert.ok(
    value >= -1e-6 && value <= 1.000001,
    'screen texture mapped onto front',
  );

const camera = new THREE.PerspectiveCamera(32, 2 / 3, 0.1, 40);
camera.position.z = 10.5;
camera.updateMatrixWorld(true);
for (const angle of [-45, 0, 45]) {
  phone.rotation.set(
    THREE.MathUtils.degToRad(4),
    THREE.MathUtils.degToRad(angle),
    0,
  );
  phone.updateMatrixWorld(true);
  phone.traverse((mesh) => {
    if (!mesh.isMesh) return;
    const points = mesh.geometry.attributes.position;
    for (let i = 0; i < points.count; i++) {
      const point = new THREE.Vector3()
        .fromBufferAttribute(points, i)
        .applyMatrix4(mesh.matrixWorld)
        .project(camera);
      assert.ok(
        Math.abs(point.x) < 1 && Math.abs(point.y) < 1,
        `device fits canvas at ${angle} degrees`,
      );
    }
  });
}
let triangles = 0;
const geometries = new Set(),
  materials = new Set();
phone.traverse((mesh) => {
  if (!mesh.isMesh) return;
  triangles +=
    (mesh.geometry.index?.count ?? mesh.geometry.attributes.position.count) / 3;
  geometries.add(mesh.geometry);
  materials.add(mesh.material);
});
assert.ok(triangles < 10000, 'lightweight geometry for mobile');
let disposedGeometries = 0,
  disposedMaterials = 0;
geometries.forEach((geometry) =>
  geometry.addEventListener('dispose', () => disposedGeometries++),
);
materials.forEach((material) =>
  material.addEventListener('dispose', () => disposedMaterials++),
);
disposePhoneModel(phone);
assert.equal(disposedGeometries, geometries.size);
assert.equal(disposedMaterials, materials.size);
texture.dispose();
console.log(
  `PASS: solid chassis, side/back ray intersections, physical buttons, screen UVs, +/-45° framing, ${triangles} triangles and GPU-resource disposal.`,
);
