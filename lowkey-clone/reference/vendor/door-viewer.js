import * as THREE from './three/three.module.min.js';
import { GLTFLoader } from './three/loaders/GLTFLoader.js';

const loader = new GLTFLoader();
const modelCache = new Map();

function loadModel(url) {
  if (!modelCache.has(url)) modelCache.set(url, loader.loadAsync(url));
  return modelCache.get(url);
}

function easeInOut(value) {
  return value < 0.5 ? 4 * value * value * value : 1 - Math.pow(-2 * value + 2, 3) / 2;
}

export function mountDoor(canvas, options = {}) {
  const modelUrl = options.modelUrl || '/models/yuanbai-door.glb';
  const passage = Boolean(options.passage);
  let active = options.active !== false;
  let opening = Boolean(options.opening);
  let openingProgress = opening ? 0 : 0;
  let disposed = false;
  let root = null;
  let mixer = null;
  let action = null;
  let clipDuration = 1;
  let focus = active ? 1 : 0;
  let lastTime = performance.now();
  const painted = [];

  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true, powerPreference: 'high-performance' });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.6));
  renderer.setClearColor(0x000000, 0);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = passage ? 1.1 : 1.02;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(passage ? 31 : 30, 1, 0.05, 30);
  camera.position.set(0, 1.14, passage ? 4.65 : 5.15);
  camera.lookAt(0, 1.14, 0);

  const hemi = new THREE.HemisphereLight(0xf8ffff, 0x101719, passage ? 2.15 : 1.75);
  scene.add(hemi);
  const key = new THREE.DirectionalLight(0xffffff, passage ? 4.1 : 3.35);
  key.position.set(-2.4, 3.9, 4.2);
  key.castShadow = true;
  key.shadow.mapSize.set(1024, 1024);
  key.shadow.camera.near = 0.1;
  key.shadow.camera.far = 12;
  key.shadow.camera.left = -2;
  key.shadow.camera.right = 2;
  key.shadow.camera.top = 3.2;
  key.shadow.camera.bottom = -0.5;
  scene.add(key);
  const rim = new THREE.PointLight(0xbde8ef, passage ? 18 : 10, 8, 2);
  rim.position.set(1.7, 2.4, -1.3);
  scene.add(rim);

  if (passage) {
    const portalGlow = new THREE.Mesh(
      new THREE.PlaneGeometry(0.92, 2.02),
      new THREE.ShaderMaterial({
        transparent: true,
        depthWrite: false,
        toneMapped: false,
        side: THREE.DoubleSide,
        vertexShader: `varying vec2 vUv;
          void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }`,
        fragmentShader: `varying vec2 vUv;
          void main() {
            vec2 edgeDistance = min(vUv, 1.0 - vUv);
            float edge = min(edgeDistance.x, edgeDistance.y);
            float feather = smoothstep(0.0, 0.065, edge);
            gl_FragColor = vec4(0.95, 1.0, 1.0, feather);
          }`
      })
    );
    portalGlow.position.set(0, 1.18, -0.16);
    portalGlow.name = 'Neutral_Portal_Light';
    scene.add(portalGlow);
  }

  const accent = new THREE.Color(options.accent || '#F26E4F');
  const neutral = new THREE.Color(0x505456);
  const current = new THREE.Color();

  function resize() {
    const width = Math.max(2, canvas.clientWidth);
    const height = Math.max(2, canvas.clientHeight);
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
  }

  const resizeObserver = new ResizeObserver(resize);
  resizeObserver.observe(canvas);
  resize();

  loadModel(modelUrl).then(gltf => {
    if (disposed) return;
    root = gltf.scene.clone(true);
    root.name = passage ? 'Passage_Door_Model' : 'Hub_Door_Model';
    root.traverse(object => {
      if (!object.isMesh) return;
      object.castShadow = true;
      object.receiveShadow = true;
      object.material = object.material.clone();
      const name = object.material.name || '';
      if (name.includes('Door_White') || name.includes('Door_Inset')) {
        painted.push({ material: object.material, shade: name.includes('Inset') ? 0.72 : 1 });
      }
      if (name.includes('Handle') || name.includes('Hinge')) {
        object.material.metalness = Math.max(object.material.metalness || 0, 0.72);
        object.material.roughness = 0.24;
      }
    });
    const bounds = new THREE.Box3().setFromObject(root);
    const center = bounds.getCenter(new THREE.Vector3());
    root.position.x -= center.x;
    root.position.y -= bounds.min.y;
    root.position.z -= center.z;
    scene.add(root);
    if (gltf.animations && gltf.animations.length) {
      const clip = gltf.animations.find(item => item.name === 'Door_Open') || gltf.animations[0];
      clipDuration = clip.duration || 1;
      mixer = new THREE.AnimationMixer(root);
      action = mixer.clipAction(clip);
      action.play();
      mixer.setTime(0);
    }
    canvas.classList.add('is-loaded');
  }).catch(error => {
    console.error('YUANBAI door model failed to load', error);
    canvas.classList.add('has-error');
  });

  let frameId = 0;
  function render(now) {
    if (disposed) return;
    const delta = Math.min(0.05, Math.max(0.001, (now - lastTime) / 1000));
    lastTime = now;
    const wrapper = canvas.closest('.door-wrap');
    const cssFocus = wrapper ? parseFloat(getComputedStyle(wrapper).getPropertyValue('--door-focus')) : NaN;
    const targetFocus = passage ? 1 : Number.isFinite(cssFocus) ? cssFocus : active ? 1 : 0;
    focus += (targetFocus - focus) * (1 - Math.exp(-delta * 9));
    for (const item of painted) {
      current.copy(neutral).lerp(accent, focus).multiplyScalar(item.shade);
      item.material.color.copy(current);
      item.material.roughness = 0.36 + (1 - focus) * 0.14;
    }
    if (opening && openingProgress < 1) openingProgress = Math.min(1, openingProgress + delta / 1.72);
    if (!opening && openingProgress > 0) openingProgress = Math.max(0, openingProgress - delta / 1.1);
    if (mixer && action) mixer.setTime(easeInOut(openingProgress) * clipDuration);
    renderer.render(scene, camera);
    frameId = requestAnimationFrame(render);
  }
  frameId = requestAnimationFrame(render);

  return {
    setActive(value) { active = Boolean(value); },
    setOpening(value) { opening = Boolean(value); },
    dispose() {
      disposed = true;
      cancelAnimationFrame(frameId);
      resizeObserver.disconnect();
      if (root) {
        root.traverse(object => {
          if (object.isMesh && object.material) object.material.dispose();
        });
        scene.remove(root);
      }
      renderer.dispose();
    }
  };
}
