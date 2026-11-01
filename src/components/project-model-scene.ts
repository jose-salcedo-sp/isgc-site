/*
 * The project 3D viewer. three.js is only downloaded when the visitor asks
 * for the model, so the page stays light for everyone else. The scene draws
 * on demand (orbit changes and resizes), never in a permanent animation loop.
 */

interface ModelViewerOptions {
  canvas: HTMLCanvasElement;
  /** Fewer pixels and no antialiasing on touch devices. */
  lowPower: boolean;
  src: string;
}

export interface ModelViewer {
  /** Stops everything and frees GPU memory. */
  dispose: () => void;
}

export const createModelViewer = async ({
  canvas,
  lowPower,
  src,
}: ModelViewerOptions): Promise<ModelViewer | null> => {
  const [THREE, { GLTFLoader }, { OrbitControls }] = await Promise.all([
    import("three"),
    import("three/examples/jsm/loaders/GLTFLoader.js"),
    import("three/examples/jsm/controls/OrbitControls.js"),
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
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
  renderer.toneMapping = THREE.NeutralToneMapping;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 100);

  // Warm light from above and a gold rim from behind: the same palette as
  // the rest of the site, so the model sits on the dark panel.
  scene.add(new THREE.HemisphereLight(0xff_f3_dc, 0x3d_0a_1a, 1.3));
  const key = new THREE.DirectionalLight(0xff_ff_ff, 2.1);
  key.position.set(4, 6, 5);
  scene.add(key);
  const rim = new THREE.DirectionalLight(0xe2_c5_8f, 1.4);
  rim.position.set(-5, 2, -4);
  scene.add(rim);

  const controls = new OrbitControls(camera, canvas);
  controls.enablePan = false;
  controls.rotateSpeed = 0.8;
  controls.zoomSpeed = 0.8;

  const gltf = await new GLTFLoader().loadAsync(src);
  const model = gltf.scene;
  model.updateMatrixWorld(true);
  scene.add(model);

  // Center the model and pull the camera back until it fits the frame.
  const bounds = new THREE.Box3().setFromObject(model);
  const size = bounds.getSize(new THREE.Vector3());
  const center = bounds.getCenter(new THREE.Vector3());
  model.position.sub(center);

  const largest = Math.max(size.x, size.y, size.z) || 1;
  const distance =
    (largest / (2 * Math.tan(THREE.MathUtils.degToRad(camera.fov / 2)))) * 1.7;
  camera.position.set(distance * 0.6, distance * 0.35, distance);
  camera.near = distance / 100;
  camera.far = distance * 100;
  camera.updateProjectionMatrix();
  controls.target.set(0, 0, 0);
  controls.minDistance = distance * 0.5;
  controls.maxDistance = distance * 2.2;
  controls.update();

  const render = () => renderer.render(scene, camera);

  const resize = () => {
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    if (!(width && height)) {
      return;
    }
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    render();
  };

  const resizeObserver = new ResizeObserver(resize);
  resizeObserver.observe(canvas);
  resize();

  // Orbit changes are the only thing that moves, so each one paints once.
  let frame = 0;
  const invalidate = () => {
    cancelAnimationFrame(frame);
    frame = requestAnimationFrame(render);
  };
  controls.addEventListener("change", invalidate);

  const dispose = () => {
    cancelAnimationFrame(frame);
    resizeObserver.disconnect();
    controls.removeEventListener("change", invalidate);
    controls.dispose();

    model.traverse((object) => {
      if (!(object instanceof THREE.Mesh)) {
        return;
      }
      object.geometry.dispose();
      const materials = Array.isArray(object.material)
        ? object.material
        : [object.material];
      for (const material of materials) {
        for (const value of Object.values(material)) {
          if (value instanceof THREE.Texture) {
            value.dispose();
          }
        }
        material.dispose();
      }
    });

    renderer.dispose();
    renderer.forceContextLoss();
  };

  return { dispose };
};
