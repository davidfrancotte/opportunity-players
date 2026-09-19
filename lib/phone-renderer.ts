import * as THREE from 'three';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { createPhoneModel, disposePhoneModel } from './phone-model';

export type PhoneRenderer = {
  setPose: (x: number, y: number, immediate?: boolean) => void;
  resize: () => void;
  dispose: () => void;
};

function placeholderTexture(label: string) {
  const canvas = document.createElement('canvas');
  canvas.width = 768;
  canvas.height = 1664;
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Screen canvas unavailable');
  const font = getComputedStyle(document.body).fontFamily;
  ctx.fillStyle = '#101214';
  ctx.fillRect(0, 0, 768, 1664);
  const text = (
    value: string,
    size: number,
    y: number,
    color = '#f1f2eb',
    weight = 400,
  ) => {
    ctx.font = `${weight} ${size}px ${font}`;
    ctx.fillStyle = color;
    ctx.fillText(value, 62, y, 640);
  };
  text('op', 96, 258, '#f1f2eb', 600);
  const markX = 62 + ctx.measureText('op').width + 14;
  ctx.strokeStyle = '#d1f94c';
  ctx.lineWidth = 4.6;
  ctx.beginPath();
  ctx.moveTo(markX, 211);
  ctx.lineTo(markX + 14.4, 211);
  ctx.lineTo(markX + 14.4, 225.4);
  ctx.stroke();
  text('FUTURE APP ARENA', 25, 422, '#a7b09d');
  text('Votre sport.', 73, 548);
  text('Votre réseau.', 73, 638);
  ctx.strokeStyle = '#3f4837';
  ctx.lineWidth = 2;
  for (const y of [742, 1365]) {
    ctx.beginPath();
    ctx.moveTo(62, y);
    ctx.lineTo(706, y);
    ctx.stroke();
  }
  text('Capture à venir', 45, 1020);
  const words = label.split(' ');
  let line = '',
    lineY = 1100;
  ctx.font = `400 30px ${font}`;
  for (const word of words) {
    if (ctx.measureText(`${line} ${word}`).width > 600 && line) {
      text(line, 30, lineY, '#a7b09d');
      line = word;
      lineY += 43;
    } else line = line ? `${line} ${word}` : word;
  }
  text(line, 30, lineY, '#a7b09d');
  text('ÉCRAN PROVISOIRE', 24, 1470, '#d1f94c');
  ctx.fillStyle = '#6c7666';
  ctx.beginPath();
  ctx.roundRect(285, 1598, 198, 7, 3.5);
  ctx.fill();
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

export function mountPhoneRenderer(
  host: HTMLElement,
  label: string,
  screenSrc: string | undefined,
  onFailure: () => void,
): PhoneRenderer {
  const renderer = new THREE.WebGLRenderer({
    alpha: true,
    antialias: true,
    powerPreference: 'low-power',
  });
  renderer.setClearColor(0, 0);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.15;
  renderer.domElement.setAttribute('aria-hidden', 'true');
  renderer.domElement.className = 'app-phone-webgl';
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(32, 2 / 3, 0.1, 40);
  camera.position.z = 10.5;
  const environment = new RoomEnvironment();
  const pmrem = new THREE.PMREMGenerator(renderer);
  const environmentMap = pmrem.fromScene(environment, 0.04);
  scene.environment = environmentMap.texture;
  environment.dispose();
  pmrem.dispose();
  const key = new THREE.DirectionalLight('#ffffff', 3.1);
  key.position.set(-3, 5, 5);
  const rim = new THREE.DirectionalLight('#d1f94c', 1.3);
  rim.position.set(4, 1, -2);
  scene.add(key, rim, new THREE.HemisphereLight('#f5fff1', '#313d37', 1.4));
  let screenTexture: THREE.Texture = placeholderTexture(label);
  screenTexture.anisotropy = Math.min(
    4,
    renderer.capabilities.getMaxAnisotropy(),
  );
  const phone = createPhoneModel(screenTexture);
  scene.add(phone);
  let disposed = false,
    frame = 0,
    previousTime = 0;
  let targetX = 0,
    targetY = 0;
  const render = () => renderer.render(scene, camera);
  const tick = (time: number) => {
    frame = 0;
    if (disposed) return;
    const dt = previousTime ? Math.min(time - previousTime, 64) : 16;
    previousTime = time;
    const blend = 1 - Math.exp(-dt / 65);
    phone.rotation.x += (targetX - phone.rotation.x) * blend;
    phone.rotation.y += (targetY - phone.rotation.y) * blend;
    render();
    if (
      Math.abs(targetX - phone.rotation.x) +
        Math.abs(targetY - phone.rotation.y) >
      0.0002
    )
      frame = requestAnimationFrame(tick);
    else previousTime = 0;
  };
  const resize = () => {
    if (disposed) return;
    const width = Math.max(host.clientWidth, 1),
      height = Math.max(host.clientHeight, 1);
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    render();
  };
  const lost = (event: Event) => {
    event.preventDefault();
    cancelAnimationFrame(frame);
    onFailure();
  };
  renderer.domElement.addEventListener('webglcontextlost', lost);
  host.appendChild(renderer.domElement);
  resize();
  if (screenSrc)
    new THREE.TextureLoader().load(screenSrc, (texture) => {
      if (disposed) {
        texture.dispose();
        return;
      }
      texture.colorSpace = THREE.SRGBColorSpace;
      const screen = phone.getObjectByName('front-screen') as THREE.Mesh<
        THREE.BufferGeometry,
        THREE.MeshBasicMaterial
      >;
      screen.material.map = texture;
      screen.material.needsUpdate = true;
      screenTexture.dispose();
      screenTexture = texture;
      render();
    });
  return {
    resize,
    setPose: (x, y, immediate = false) => {
      if (disposed) return;
      targetX = THREE.MathUtils.degToRad(x);
      targetY = THREE.MathUtils.degToRad(y);
      if (immediate) {
        cancelAnimationFrame(frame);
        frame = 0;
        previousTime = 0;
        phone.rotation.set(targetX, targetY, 0);
        render();
      } else if (!frame) frame = requestAnimationFrame(tick);
    },
    dispose: () => {
      disposed = true;
      cancelAnimationFrame(frame);
      renderer.domElement.removeEventListener('webglcontextlost', lost);
      disposePhoneModel(phone);
      screenTexture.dispose();
      environmentMap.dispose();
      renderer.dispose();
      renderer.forceContextLoss();
      renderer.domElement.remove();
    },
  };
}
