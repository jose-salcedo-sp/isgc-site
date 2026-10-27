/*
 * The hero's 3D scene: the Utah teapot, the classic test model of computer
 * graphics, rendered with three.js in three stages, like a render pipeline:
 *   1. vertices (points), 2. edges (wireframe), 3. flat-shaded surface.
 * On load the vertices assemble from the bottom up. Scroll progress (0 → 1)
 * moves the drawing through the stages; the mouse turns it a little.
 *
 * Kept light on purpose, so scrolling never stutters:
 * - While only the slow idle turn is moving, it draws at 30 fps; intro,
 *   scroll and mouse get 60 fps. Off screen it draws nothing. Call `wake()`
 *   when the scroll stage changes.
 * - The canvas covers only the teapot's area, at most 1.5x pixel density.
 * - Phong shading (cheap per pixel) instead of physically based shading.
 * - Shaders compile in the background before the intro starts, and no
 *   material setting changes mid-animation, so nothing recompiles later.
 */

const INTRO_SECONDS = 1.8;
// Idle turn, in radians per second.
const SPIN_SPEED = 0.18;
// While only the idle turn moves, 30 fps looks the same and costs half.
const CALM_FRAME_MS = 1000 / 30;
const GOLD = 0xe2_c5_8f;
const SHADOW = 0x3d_0a_1a;

/** 0 before `start`, 1 after `end`, eased in between. */
const stageBetween = (value: number, start: number, end: number): number => {
  const t = Math.min(1, Math.max(0, (value - start) / (end - start)));
  return t * t * (3 - 2 * t);
};

interface TeapotSceneOptions {
  canvas: HTMLCanvasElement;
  /** Fewer polygons and no antialiasing. */
  lowPower: boolean;
  /** Draws one still frame of the finished teapot. */
  still: boolean;
  getStage: () => number;
}

export interface TeapotScene {
  /** Draws again after the scroll stage changed. */
  wake: () => void;
  /** Stops everything and frees GPU memory. */
  dispose: () => void;
}

/**
 * Loads three.js, builds the scene and plays the intro. Resolves to null
 * when WebGL is not available (the hero then simply shows its text).
 */
export const createTeapotScene = async ({
  canvas,
  lowPower,
  still,
  getStage,
}: TeapotSceneOptions): Promise<TeapotScene | null> => {
  const [THREE, { TeapotGeometry }] = await Promise.all([
    import("three"),
    import("three/examples/jsm/geometries/TeapotGeometry.js"),
  ]);

  let renderer: InstanceType<typeof THREE.WebGLRenderer>;
  try {
    renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: !lowPower,
      canvas,
      powerPreference: "low-power",
    });
  } catch {
    return null;
  }
  // The canvas only covers the teapot, so 1.5x stays cheap even on phones.
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(30, 1, 0.1, 100);
  camera.position.set(0, 0, 12);

  // Warm light from above, tinto bounce from below: the shadows take the
  // color of the page instead of going grey.
  scene.add(new THREE.HemisphereLight(0xff_f3_dc, SHADOW, 0.9));
  const sun = new THREE.DirectionalLight(0xff_ff_ff, 2.4);
  sun.position.set(-4, 5, 6);
  scene.add(sun);

  const model = new THREE.Group();
  scene.add(model);

  // Fewer subdivisions for points and wireframe keep them readable; the
  // surface gets a few more. The last `true` (fitLid) closes the gap around
  // the lid.
  const coarse = new TeapotGeometry(
    1,
    lowPower ? 4 : 5,
    true,
    true,
    true,
    true
  );
  // Medium detail with flat shading: visible facets, but not blocky.
  const faceted = new TeapotGeometry(
    1,
    lowPower ? 5 : 7,
    true,
    true,
    true,
    true
  );
  coarse.center();
  faceted.center();
  faceted.computeBoundingBox();
  const teapotWidth = faceted.boundingBox
    ? faceted.boundingBox.max.x - faceted.boundingBox.min.x
    : 5.4;

  // Every material stays transparent the whole time: switching it on and
  // off would make three.js rebuild the shader in the middle of a scroll.
  const surfaceMaterial = new THREE.MeshPhongMaterial({
    color: GOLD,
    flatShading: true,
    opacity: 0,
    shininess: 40,
    specular: 0x55_44_33,
    transparent: true,
  });
  const surface = new THREE.Mesh(faceted, surfaceMaterial);
  model.add(surface);

  const wireGeometry = new THREE.WireframeGeometry(coarse);
  // Points and lines never write depth: fading out, they would otherwise
  // punch invisible holes in the surface behind them.
  const wireMaterial = new THREE.LineBasicMaterial({
    color: GOLD,
    depthWrite: false,
    opacity: 0,
    transparent: true,
  });
  const wireframe = new THREE.LineSegments(wireGeometry, wireMaterial);
  model.add(wireframe);

  // Points: each vertex starts somewhere random and travels home, the
  // lowest vertices first.
  // SAFETY: TeapotGeometry always stores its positions in a Float32Array.
  const home = coarse.getAttribute("position").array as Float32Array;
  const count = home.length / 3;
  const scattered = new Float32Array(home.length);
  const arrival = new Float32Array(count);
  let lowest = Number.POSITIVE_INFINITY;
  let highest = Number.NEGATIVE_INFINITY;
  for (let index = 0; index < count; index += 1) {
    lowest = Math.min(lowest, home[index * 3 + 1]);
    highest = Math.max(highest, home[index * 3 + 1]);
  }
  for (let index = 0; index < count; index += 1) {
    const spread = 3 + Math.random() * 2.5;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(Math.random() * 2 - 1);
    scattered[index * 3] = spread * Math.sin(phi) * Math.cos(theta);
    scattered[index * 3 + 1] = spread * Math.sin(phi) * Math.sin(theta);
    scattered[index * 3 + 2] = spread * Math.cos(phi);
    arrival[index] = (home[index * 3 + 1] - lowest) / (highest - lowest || 1);
  }
  const pointPositions = new Float32Array(still ? home : scattered);
  const pointGeometry = new THREE.BufferGeometry();
  pointGeometry.setAttribute(
    "position",
    new THREE.BufferAttribute(pointPositions, 3)
  );
  const pointMaterial = new THREE.PointsMaterial({
    color: GOLD,
    depthWrite: false,
    size: lowPower ? 2 : 2.5,
    sizeAttenuation: false,
    transparent: true,
  });
  const points = new THREE.Points(pointGeometry, pointMaterial);
  model.add(points);

  const placePoints = (intro: number) => {
    for (let index = 0; index < count; index += 1) {
      const raw = Math.min(
        1,
        Math.max(0, (intro - arrival[index] * 0.6) / 0.4)
      );
      const arrive = 1 - (1 - raw) ** 3;
      for (let axis = 0; axis < 3; axis += 1) {
        const k = index * 3 + axis;
        pointPositions[k] = scattered[k] + (home[k] - scattered[k]) * arrive;
      }
    }
    pointGeometry.getAttribute("position").needsUpdate = true;
  };

  /** Shows each stage according to scroll progress. */
  const applyStage = (stage: number) => {
    const faces = stageBetween(stage, 0.45, 0.8);
    // Edges fade out as the surface covers them.
    const edges = stageBetween(stage, 0.12, 0.42) * (1 - faces);
    surfaceMaterial.opacity = faces;
    surface.visible = faces > 0.01;
    wireMaterial.opacity = edges * 0.55;
    wireframe.visible = edges > 0.01;
    pointMaterial.opacity = 1 - faces;
    points.visible = faces < 0.99;
  };

  /** Fits the teapot to the canvas, which CSS sizes to the teapot's area. */
  const resize = () => {
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    if (!(width && height)) {
      return;
    }
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    const visibleHeight =
      2 *
      Math.tan(THREE.MathUtils.degToRad(camera.fov / 2)) *
      camera.position.z;
    const visibleWidth = visibleHeight * camera.aspect;
    const targetWidth = Math.min(visibleWidth * 0.82, visibleHeight * 1.5);
    model.scale.setScalar(targetWidth / teapotWidth);
  };

  // Compile every shader before anything moves (in parallel where the GPU
  // driver allows), so the first scroll into the surface stage does not
  // freeze.
  resize();
  await renderer.compileAsync(scene, camera);

  const render = () => renderer.render(scene, camera);

  // The turn: a little rotation during the intro and with scroll; the
  // mouse adds an eased offset.
  const pointer = { x: 0, y: 0 };
  const orbit = { x: 0, y: 0 };
  let intro = still ? 1 : 0;
  let spin = 0;
  const setPose = (stage: number) => {
    const settle = 1 - (1 - intro) ** 3;
    model.rotation.set(
      0.35 + stage * 0.2 + orbit.y * 0.4,
      -1.4 + settle * 0.8 + spin + stage * 1.2 + orbit.x * 0.7,
      0
    );
  };

  let running = false;
  let visible = true;
  let animationFrame = 0;
  let lastTime = 0;
  let lastStage = -1;

  // Draws one frame, then asks for another only while something is still
  // moving: the intro, the mouse easing, or a scroll stage change.
  // Draws a frame and asks for the next one. When only the idle turn is
  // moving, frames are spaced to 30 fps.
  let calm = false;
  const tick = (time: number) => {
    animationFrame = requestAnimationFrame(tick);
    if (calm && lastTime && time - lastTime < CALM_FRAME_MS) {
      return;
    }
    const delta = lastTime ? Math.min(0.05, (time - lastTime) / 1000) : 0;
    lastTime = time;
    if (intro < 1) {
      intro = Math.min(1, intro + delta / INTRO_SECONDS);
      placePoints(intro);
    }
    spin += delta * SPIN_SPEED;
    orbit.x += (pointer.x - orbit.x) * 0.08;
    orbit.y += (pointer.y - orbit.y) * 0.08;
    const stage = getStage();
    setPose(stage);
    applyStage(stage);
    render();
    calm =
      intro >= 1 &&
      stage === lastStage &&
      Math.abs(pointer.x - orbit.x) < 0.001 &&
      Math.abs(pointer.y - orbit.y) < 0.001;
    lastStage = stage;
  };
  const wake = () => {
    // Scroll or mouse: back to full frame rate right away.
    calm = false;
    if (running || !visible) {
      return;
    }
    running = true;
    animationFrame = requestAnimationFrame(tick);
  };

  const resizeObserver = new ResizeObserver(() => {
    resize();
    setPose(getStage());
    render();
  });
  resizeObserver.observe(canvas);

  const disposeGpu = () => {
    cancelAnimationFrame(animationFrame);
    resizeObserver.disconnect();
    coarse.dispose();
    faceted.dispose();
    wireGeometry.dispose();
    pointGeometry.dispose();
    surfaceMaterial.dispose();
    wireMaterial.dispose();
    pointMaterial.dispose();
    renderer.dispose();
  };

  if (still) {
    setPose(getStage());
    applyStage(getStage());
    render();
    return { dispose: disposeGpu, wake: () => render() };
  }

  const onPointerMove = (event: PointerEvent) => {
    if (event.pointerType !== "mouse") {
      return;
    }
    pointer.x = event.clientX / window.innerWidth - 0.5;
    pointer.y = event.clientY / window.innerHeight - 0.5;
    wake();
  };
  window.addEventListener("pointermove", onPointerMove, { passive: true });

  // Off screen, nothing draws; coming back draws the current state once.
  const visibility = new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    if (visible) {
      wake();
    } else {
      cancelAnimationFrame(animationFrame);
      running = false;
      lastTime = 0;
    }
  });
  visibility.observe(canvas);
  wake();

  return {
    dispose: () => {
      visibility.disconnect();
      window.removeEventListener("pointermove", onPointerMove);
      disposeGpu();
    },
    wake,
  };
};
