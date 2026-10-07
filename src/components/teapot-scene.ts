/*
 * The hero's 3D scene: the Utah teapot, the classic test model of computer
 * graphics, rendered with three.js in three stages, like a render pipeline:
 *   1. vertices (points), 2. edges (wireframe), 3. smooth-shaded surface.
 * On load the vertices assemble from the bottom up. `getStage` (scroll
 * progress, 0 → 1) moves the drawing through the stages; the mouse orbits it.
 *
 * Lighting runs on the GPU; JavaScript only turns the model and, during the
 * two-second intro, moves the points.
 */

const INTRO_SECONDS = 2;
const GOLD = 0xe2_c5_8f;
const SHADOW = 0x3d_0a_1a;

/** 0 before `start`, 1 after `end`, eased in between. */
const stageBetween = (value: number, start: number, end: number): number => {
  const t = Math.min(1, Math.max(0, (value - start) / (end - start)));
  return t * t * (3 - 2 * t);
};

interface TeapotSceneOptions {
  canvas: HTMLCanvasElement;
  /** Fewer polygons, no antialiasing and 1x pixels. */
  lowPower: boolean;
  /** Draws one still frame of the finished teapot. */
  still: boolean;
  getStage: () => number;
}

/**
 * Loads three.js, builds the scene and starts animating while the canvas is
 * on screen. Resolves to a function that stops everything and frees GPU
 * memory, or to null when WebGL is not available.
 */
export const createTeapotScene = async ({
  canvas,
  lowPower,
  still,
  getStage,
}: TeapotSceneOptions): Promise<(() => void) | null> => {
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
    });
  } catch {
    // No WebGL: the hero simply shows its text.
    return null;
  }
  renderer.setPixelRatio(
    Math.min(window.devicePixelRatio || 1, lowPower ? 1 : 2)
  );

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(30, 1, 0.1, 100);
  camera.position.set(0, 0, 12);

  // Warm light from above, tinto bounce from below: the shadows take the
  // color of the page instead of going grey.
  scene.add(new THREE.HemisphereLight(0xff_f3_dc, SHADOW, 0.7));
  const sun = new THREE.DirectionalLight(0xff_ff_ff, 3.2);
  sun.position.set(-4, 5, 6);
  scene.add(sun);

  // `pivot` turns with scroll and the mouse; `model` holds the teapot,
  // centered on the pivot.
  const pivot = new THREE.Group();
  const model = new THREE.Group();
  pivot.add(model);
  scene.add(pivot);

  // Fewer subdivisions for points and wireframe keep them readable; the
  // surface gets more so it looks smooth. The last `true` (fitLid) closes
  // the gap around the lid.
  const coarse = new TeapotGeometry(
    1,
    lowPower ? 4 : 6,
    true,
    true,
    true,
    true
  );
  const smooth = new TeapotGeometry(
    1,
    lowPower ? 8 : 14,
    true,
    true,
    true,
    true
  );
  coarse.center();
  smooth.center();
  smooth.computeBoundingBox();
  const teapotWidth = smooth.boundingBox
    ? smooth.boundingBox.max.x - smooth.boundingBox.min.x
    : 5.4;

  const surfaceMaterial = new THREE.MeshStandardMaterial({
    color: GOLD,
    metalness: 0.1,
    opacity: 0,
    roughness: 0.35,
    transparent: true,
  });
  const surface = new THREE.Mesh(smooth, surfaceMaterial);
  model.add(surface);

  const wireGeometry = new THREE.WireframeGeometry(coarse);
  const wireMaterial = new THREE.LineBasicMaterial({
    color: GOLD,
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
    const spread = 4 + Math.random() * 3;
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
    size: lowPower ? 2 : 2.5,
    sizeAttenuation: false,
    transparent: true,
  });
  model.add(new THREE.Points(pointGeometry, pointMaterial));

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
    // Fully opaque surfaces sort and blend correctly.
    surfaceMaterial.transparent = faces < 1;
    surfaceMaterial.depthWrite = faces > 0.5;
    surface.visible = faces > 0.01;
    wireMaterial.opacity = edges * 0.55;
    wireframe.visible = edges > 0.01;
    pointMaterial.opacity = 1 - faces;
  };

  /** Places and sizes the teapot for the canvas shape (right side on wide
   * screens, top center on narrow ones). */
  const resize = () => {
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    if (!(width && height)) {
      return;
    }
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    const wide = width >= 1024;
    const visibleHeight =
      2 *
      Math.tan(THREE.MathUtils.degToRad(camera.fov / 2)) *
      camera.position.z;
    const visibleWidth = visibleHeight * camera.aspect;
    const centerX = wide ? 0.72 : 0.5;
    const centerY = wide ? 0.52 : 0.24;
    pivot.position.set(
      (centerX - 0.5) * visibleWidth,
      (0.5 - centerY) * visibleHeight,
      0
    );
    const targetWidth = wide
      ? Math.min(visibleWidth * 0.42, visibleHeight * 0.85)
      : Math.min(visibleWidth * 0.8, visibleHeight * 0.42);
    model.scale.setScalar(targetWidth / teapotWidth);
  };

  const render = () => renderer.render(scene, camera);
  resize();
  const resizeObserver = new ResizeObserver(() => {
    resize();
    render();
  });
  resizeObserver.observe(canvas);

  const disposeGpu = () => {
    resizeObserver.disconnect();
    coarse.dispose();
    smooth.dispose();
    wireGeometry.dispose();
    pointGeometry.dispose();
    surfaceMaterial.dispose();
    wireMaterial.dispose();
    pointMaterial.dispose();
    renderer.dispose();
  };

  if (still) {
    pivot.rotation.set(0.35, -0.6, 0);
    applyStage(getStage());
    render();
    return disposeGpu;
  }

  // Where the mouse wants the model to be; the model eases toward it.
  const pointer = { x: 0, y: 0 };
  const orbit = { x: 0, y: 0 };
  const onPointerMove = (event: PointerEvent) => {
    if (event.pointerType !== "mouse") {
      return;
    }
    pointer.x = event.clientX / window.innerWidth - 0.5;
    pointer.y = event.clientY / window.innerHeight - 0.5;
  };
  window.addEventListener("pointermove", onPointerMove, { passive: true });

  // Only animate while the canvas is on screen.
  let running = false;
  let animationFrame = 0;
  let lastTime = 0;
  let elapsed = 0;
  let spin = 0;
  let introDone = false;
  const tick = (time: number) => {
    animationFrame = requestAnimationFrame(tick);
    const delta = lastTime ? Math.min(0.05, (time - lastTime) / 1000) : 0;
    lastTime = time;
    elapsed += delta;
    spin += delta * 0.25;
    orbit.x += (pointer.x - orbit.x) * 0.06;
    orbit.y += (pointer.y - orbit.y) * 0.06;
    if (!introDone) {
      const intro = Math.min(1, elapsed / INTRO_SECONDS);
      placePoints(intro);
      introDone = intro === 1;
    }
    const stage = getStage();
    pivot.rotation.set(
      0.35 + stage * 0.2 + orbit.y * 0.5,
      -0.6 + spin + stage * 1.2 + orbit.x * 0.9,
      0
    );
    applyStage(stage);
    render();
  };
  const visibility = new IntersectionObserver(([entry]) => {
    if (entry.isIntersecting && !running) {
      running = true;
      lastTime = 0;
      animationFrame = requestAnimationFrame(tick);
    }
    if (!entry.isIntersecting && running) {
      running = false;
      cancelAnimationFrame(animationFrame);
    }
  });
  visibility.observe(canvas);

  return () => {
    cancelAnimationFrame(animationFrame);
    visibility.disconnect();
    window.removeEventListener("pointermove", onPointerMove);
    disposeGpu();
  };
};
