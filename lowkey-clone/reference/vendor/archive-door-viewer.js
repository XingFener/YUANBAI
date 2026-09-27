import * as THREE from './three/three.module.min.js';

const textureLoader = new THREE.TextureLoader();
const textureCache = new Map();

function loadTexture(url, renderer) {
  if (!textureCache.has(url)) {
    textureCache.set(url, textureLoader.loadAsync(url).then(texture => {
      texture.colorSpace = THREE.SRGBColorSpace;
      texture.anisotropy = Math.min(8, renderer.capabilities.getMaxAnisotropy());
      texture.wrapS = texture.wrapT = THREE.ClampToEdgeWrapping;
      return texture;
    }));
  }
  return textureCache.get(url);
}

function bar(width, height, depth, material, x, y, z = 0) {
  const mesh = new THREE.Mesh(new THREE.BoxGeometry(width, height, depth), material);
  mesh.position.set(x, y, z);
  return mesh;
}

function addFrame(group, width, height, rail, depth, material, z = 0, centerX = 0) {
  group.add(
    bar(rail, height, depth, material, centerX - width / 2 + rail / 2, height / 2, z),
    bar(rail, height, depth, material, centerX + width / 2 - rail / 2, height / 2, z),
    bar(width - rail * 2, rail, depth, material, centerX, rail / 2, z),
    bar(width - rail * 2, rail, depth, material, centerX, height - rail / 2, z)
  );
}

export function mountArchiveDoor(canvas, options = {}) {
  let disposed = false;
  let frameId = 0;
  let lastTime = performance.now();
  let active = options.active !== false;
  let opening = Boolean(options.opening);
  let openingProgress = 0;
  let focus = active ? 1 : 0;
  let textureRequested = false;
  let idleTextureTimer = 0;
  let lastRenderedAt = 0;

  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true, powerPreference: 'high-performance' });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.25));
  renderer.setClearColor(0x000000, 0);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = options.passage ? 1.15 : 1.0;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(options.passage ? 30 : 29, 1, .05, 20);
  camera.position.set(0, 1.08, options.passage ? 4.0 : 4.55);
  camera.lookAt(0, 1.08, 0);

  scene.add(new THREE.HemisphereLight(0xf6ffff, 0x142329, 2.4));
  const key = new THREE.DirectionalLight(0xffffff, 4.0);
  key.position.set(-2.8, 4.2, 4.8);
  scene.add(key);
  const rim = new THREE.PointLight(0xbfefff, 14, 7, 2);
  rim.position.set(1.8, 2.2, -1.0);
  scene.add(rim);

  const accent = new THREE.Color(options.accent || '#F26E4F');
  const neutral = new THREE.Color(0x687176);
  const frameColor = new THREE.Color();
  const frameMaterial = new THREE.MeshPhysicalMaterial({
    color: neutral,
    metalness: 0,
    roughness: .075,
    transmission: .64,
    thickness: .18,
    ior: 1.49,
    transparent: true,
    opacity: .82,
    clearcoat: 1,
    clearcoatRoughness: .025,
    envMapIntensity: 1.25,
    side: THREE.DoubleSide,
    depthWrite: true
  });
  const innerMaterial = new THREE.MeshPhysicalMaterial({
    color: 0xcbd4d7,
    metalness: .18,
    roughness: .13,
    transmission: .28,
    transparent: true,
    opacity: .88,
    clearcoat: .75,
    clearcoatRoughness: .07
  });
  const glassMaterial = new THREE.MeshPhysicalMaterial({
    color: 0xdff8ff,
    metalness: 0,
    roughness: .04,
    transmission: .9,
    thickness: .025,
    ior: 1.49,
    transparent: true,
    opacity: .22,
    clearcoat: 1,
    clearcoatRoughness: .015,
    side: THREE.DoubleSide,
    depthWrite: false
  });
  const darkHardware = new THREE.MeshStandardMaterial({ color: 0x20272a, metalness: .78, roughness: .24 });
  const trayMaterial = new THREE.MeshStandardMaterial({ color: 0x161c1f, metalness: .08, roughness: .52 });

  const root = new THREE.Group();
  root.name = 'Archive_Case_Root';
  scene.add(root);
  const width = 1.04;
  const height = 2.18;
  const rail = .066;

  root.add(bar(.91, 1.99, .055, trayMaterial, 0, 1.09, -.09));
  addFrame(root, width, height, rail, .16, frameMaterial, -.015);
  addFrame(root, .94, 2.08, .025, .055, innerMaterial, .045);

  const artworkMaterial = new THREE.MeshBasicMaterial({ color: accent.clone().multiplyScalar(.42), side: THREE.DoubleSide });
  const artwork = new THREE.Mesh(new THREE.PlaneGeometry(.86, 1.92), artworkMaterial);
  artwork.position.set(0, 1.09, .078);
  artwork.name = 'Loadable_Artwork_Plane';
  root.add(artwork);

  const lidPivot = new THREE.Group();
  lidPivot.name = 'Archive_Lid_Pivot';
  lidPivot.position.set(-width / 2, 0, .115);
  root.add(lidPivot);
  addFrame(lidPivot, width, height, rail * .82, .052, frameMaterial, 0, width / 2);
  const glass = new THREE.Mesh(new THREE.PlaneGeometry(width - rail * 1.8, height - rail * 1.8), glassMaterial);
  glass.position.set(width / 2, height / 2, .004);
  lidPivot.add(glass);
  const handle = bar(.025, .34, .038, darkHardware, width - .105, height * .49, .045);
  lidPivot.add(handle);
  for (const y of [.3, 1.09, 1.88]) {
    const hinge = bar(.026, .15, .055, darkHardware, .018, y, .025);
    lidPivot.add(hinge);
  }

  function ensureImage() {
    if (disposed || textureRequested) return;
    textureRequested = true;
    loadTexture(options.image || '/archive/light-out-of-place/light-01.webp', renderer).then(texture => {
      if (disposed) return;
      artworkMaterial.map = texture;
      artworkMaterial.color.set(0xffffff);
      artworkMaterial.needsUpdate = true;
      canvas.classList.add('has-image');
    }).catch(error => console.warn('Archive door image failed to load', error));
  }
  if (active || options.passage) ensureImage();
  else idleTextureTimer = window.setTimeout(ensureImage, Math.max(400, Number(options.loadDelay) || 900));

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

  function ease(value) {
    return value < .5 ? 4 * value * value * value : 1 - Math.pow(-2 * value + 2, 3) / 2;
  }

  function render(now) {
    if (disposed) return;
    const delta = Math.min(.05, Math.max(.001, (now - lastTime) / 1000));
    lastTime = now;
    const wrapper = canvas.closest('.door-wrap');
    const cssFocus = wrapper ? parseFloat(getComputedStyle(wrapper).getPropertyValue('--door-focus')) : NaN;
    const targetFocus = options.passage ? 1 : Number.isFinite(cssFocus) ? cssFocus : active ? 1 : 0;
    focus += (targetFocus - focus) * (1 - Math.exp(-delta * 8));
    frameColor.copy(neutral).lerp(accent, focus * .58).lerp(new THREE.Color(0xdce4e5), .42);
    frameMaterial.color.copy(frameColor);
    frameMaterial.opacity = .58 + focus * .27;
    glassMaterial.opacity = .13 + focus * .12;
    if (opening && openingProgress < 1) openingProgress = Math.min(1, openingProgress + delta / 1.65);
    if (!opening && openingProgress > 0) openingProgress = Math.max(0, openingProgress - delta / 1.0);
    lidPivot.rotation.y = ease(openingProgress) * -1.72;
    const renderInterval = active || opening || options.passage ? 16 : 120;
    if (!document.hidden && now - lastRenderedAt >= renderInterval) {
      renderer.render(scene, camera);
      lastRenderedAt = now;
    }
    frameId = requestAnimationFrame(render);
  }
  frameId = requestAnimationFrame(render);
  canvas.classList.add('is-loaded');

  return {
    setActive(value) { active = Boolean(value); if (active) ensureImage(); },
    setOpening(value) { opening = Boolean(value); },
    dispose() {
      disposed = true;
      cancelAnimationFrame(frameId);
      clearTimeout(idleTextureTimer);
      resizeObserver.disconnect();
      root.traverse(object => { if (object.isMesh) object.geometry?.dispose(); });
      [frameMaterial, innerMaterial, glassMaterial, darkHardware, trayMaterial, artworkMaterial].forEach(material => material.dispose());
      renderer.dispose();
    }
  };
}
