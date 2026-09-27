import * as THREE from './three/three.module.min.js';

export function mountGradientWave(canvas, options = {}) {
  let disposed = false;
  let frameId = 0;
  let lastFrame = 0;
  let visible = true;
  const maxFPS = options.maxFPS || 45;
  const renderer = new THREE.WebGLRenderer({ canvas, alpha: false, antialias: false, powerPreference: 'high-performance' });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, options.quality === 'high' ? 1.5 : 1.15));
  renderer.outputColorSpace = THREE.SRGBColorSpace;

  const scene = new THREE.Scene();
  const camera = new THREE.Camera();
  const pointerTarget = new THREE.Vector2(.5, .34);
  const pointer = new THREE.Vector2(.5, .34);
  const resolution = new THREE.Vector2(1, 1);
  const uniforms = {
    uTime: { value: 0 },
    uResolution: { value: resolution },
    uMouse: { value: pointer }
  };

  const material = new THREE.ShaderMaterial({
    uniforms,
    depthWrite: false,
    depthTest: false,
    vertexShader: `void main() { gl_Position = vec4(position, 1.0); }`,
    fragmentShader: `
      precision highp float;
      uniform float uTime;
      uniform vec2 uResolution;
      uniform vec2 uMouse;

      float hash(vec2 p) {
        return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
      }

      float noise(vec2 p) {
        vec2 i = floor(p);
        vec2 f = fract(p);
        f = f * f * (3.0 - 2.0 * f);
        return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), f.x),
                   mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), f.x), f.y);
      }

      float fbm(vec2 p) {
        float value = 0.0;
        float amplitude = 0.52;
        for (int i = 0; i < 4; i++) {
          value += amplitude * noise(p);
          p = p * 2.03 + 17.17;
          amplitude *= 0.48;
        }
        return value;
      }

      float ridge(float x, float speed, float phase, float height, float amplitude) {
        float broad = sin(x * 5.3 + phase + uTime * speed) * 0.5;
        float fine = sin(x * 12.0 - phase * 1.7 - uTime * speed * .63) * 0.22;
        float organic = fbm(vec2(x * 3.1 + phase, uTime * .055 + phase)) - .5;
        float cursorLift = exp(-pow((x - uMouse.x) * 5.2, 2.0)) * (uMouse.y - .35) * .075;
        return height + amplitude * (broad + fine + organic * 1.35) + cursorLift;
      }

      float glowLine(float y, float lineY, float width) {
        float distanceToLine = abs(y - lineY);
        return exp(-distanceToLine * distanceToLine / max(.00001, width * width));
      }

      void main() {
        vec2 uv = gl_FragCoord.xy / uResolution.xy;
        float aspect = uResolution.x / max(1.0, uResolution.y);
        float t = uTime * .55;

        vec3 top = vec3(.006, .017, .025);
        vec3 lower = vec3(.035, .135, .195);
        vec3 color = mix(lower, top, smoothstep(.24, .98, uv.y));
        float horizon = exp(-pow((uv.y - .32) * 2.4, 2.0));
        color += vec3(.055, .22, .29) * horizon * .42;

        float y0 = ridge(uv.x, .34, .2, .115, .115);
        float y1 = ridge(uv.x, -.27, 1.6, .185, .105);
        float y2 = ridge(uv.x, .22, 3.0, .245, .095);
        float y3 = ridge(uv.x, -.18, 4.7, .305, .085);
        float y4 = ridge(uv.x, .14, 6.1, .365, .072);

        float l0 = glowLine(uv.y, y0, .008);
        float l1 = glowLine(uv.y, y1, .010);
        float l2 = glowLine(uv.y, y2, .012);
        float l3 = glowLine(uv.y, y3, .013);
        float l4 = glowLine(uv.y, y4, .014);
        color += vec3(.08, .82, .92) * l0 * .72;
        color += vec3(.32, .92, .94) * l1 * .61;
        color += vec3(.79, .96, .93) * l2 * .48;
        color += vec3(.55, .68, .96) * l3 * .32;
        color += vec3(.72, .94, 1.0) * l4 * .28;

        float mist = 0.0;
        mist += glowLine(uv.y, y1 + .035, .075) * .36;
        mist += glowLine(uv.y, y2 + .025, .095) * .28;
        mist += glowLine(uv.y, y3, .12) * .18;
        mist *= .72 + .28 * fbm(vec2(uv.x * 5.0 - t * .09, uv.y * 3.0 + t * .04));
        color += vec3(.58, .87, .91) * mist;

        float foreground = ridge(uv.x, .16, 8.2, .035, .075);
        float foregroundMask = 1.0 - smoothstep(foreground - .012, foreground + .018, uv.y);
        color = mix(color, vec3(.001, .004, .007), foregroundMask * .97);

        float vignette = 1.0 - smoothstep(.42, .92, distance(uv, vec2(.5, .47)));
        color *= .64 + .36 * vignette;
        float grain = hash(gl_FragCoord.xy + fract(uTime) * 113.0) - .5;
        color += grain * .018;
        gl_FragColor = vec4(color, 1.0);
      }
    `
  });

  const quad = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), material);
  scene.add(quad);

  function resize() {
    const width = Math.max(2, canvas.clientWidth);
    const height = Math.max(2, canvas.clientHeight);
    renderer.setSize(width, height, false);
    renderer.getDrawingBufferSize(resolution);
  }

  function onPointerMove(event) {
    const rect = canvas.getBoundingClientRect();
    pointerTarget.set(
      THREE.MathUtils.clamp((event.clientX - rect.left) / Math.max(1, rect.width), 0, 1),
      THREE.MathUtils.clamp(1 - (event.clientY - rect.top) / Math.max(1, rect.height), 0, 1)
    );
  }

  const resizeObserver = new ResizeObserver(resize);
  resizeObserver.observe(canvas);
  const visibilityObserver = new IntersectionObserver(entries => { visible = entries[0]?.isIntersecting !== false; });
  visibilityObserver.observe(canvas);
  window.addEventListener('pointermove', onPointerMove, { passive: true });
  resize();

  function render(now) {
    if (disposed) return;
    frameId = requestAnimationFrame(render);
    if (!visible || now - lastFrame < 1000 / maxFPS) return;
    lastFrame = now;
    pointer.lerp(pointerTarget, .045);
    uniforms.uTime.value = now * .001;
    renderer.render(scene, camera);
  }
  frameId = requestAnimationFrame(render);
  canvas.classList.add('is-loaded');

  return {
    dispose() {
      disposed = true;
      cancelAnimationFrame(frameId);
      resizeObserver.disconnect();
      visibilityObserver.disconnect();
      window.removeEventListener('pointermove', onPointerMove);
      quad.geometry.dispose();
      material.dispose();
      renderer.dispose();
    }
  };
}
