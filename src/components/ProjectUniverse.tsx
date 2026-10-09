import { useSiteText } from '../lib/useSiteText';
import { useEffect, useRef, useState } from 'react';
import { Pause, Play, Rotate3D } from 'lucide-react';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import '../styles/project-universe.css';

export type UniverseNode = { id: string; title: string };

/** An interactive repository sculpture, generated locally without downloaded models. */
export default function ProjectUniverse({
  nodes,
  selectedId,
  onSelect,
  isFa,
}: {
  nodes: UniverseNode[];
  selectedId: string;
  onSelect: (id: string) => void;
  isFa: boolean;
}) {
  const l = useSiteText();
  const hostRef = useRef<HTMLDivElement>(null);
  const labelsRef = useRef<(HTMLButtonElement | null)[]>([]);
  const selectedRef = useRef(selectedId);
  const selectRef = useRef(onSelect);
  const pausedRef = useRef(false);
  const requestRef = useRef<(() => void) | null>(null);
  const [paused, setPaused] = useState(false);
  const [mode, setMode] = useState<'loading' | 'webgl' | 'fallback'>('loading');
  selectedRef.current = selectedId;
  selectRef.current = onSelect;

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'low-power' });
    } catch {
      setMode('fallback');
      return;
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, window.innerWidth < 768 ? 1.25 : 1.75));
    renderer.setClearColor(0x000000, 0);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.08;
    renderer.domElement.setAttribute('aria-hidden', 'true');
    host.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(37, 1, 0.1, 35);
    camera.position.set(0, 0.4, 11.8);
    camera.lookAt(0, 0, 0);
    let environment: THREE.WebGLRenderTarget | undefined;
    const rebuildEnvironment = () => {
      const pmrem = new THREE.PMREMGenerator(renderer);
      const room = new RoomEnvironment();
      const previous = environment;
      try {
        environment = pmrem.fromScene(room, 0.045);
        scene.environment = environment.texture;
        previous?.dispose();
      } finally {
        room.dispose();
        pmrem.dispose();
      }
    };
    rebuildEnvironment();

    const chrome = new THREE.MeshPhysicalMaterial({ color: 0x959e99, metalness: 1, roughness: 0.19, envMapIntensity: 1.3, clearcoat: 1 });
    const dark = new THREE.MeshStandardMaterial({ color: 0x2b3030, metalness: 0.9, roughness: 0.23 });
    const acid = new THREE.MeshStandardMaterial({ color: 0xe8fa72, emissive: 0xb2dd1e, emissiveIntensity: 0.5, metalness: 0.25, roughness: 0.25 });
    const wire = new THREE.LineBasicMaterial({ color: 0x6b7563, transparent: true, opacity: 0.36 });
    const stage = new THREE.Group();
    scene.add(stage);

    const sculpture = new THREE.Group();
    sculpture.rotation.set(0.16, -0.45, -0.16);
    stage.add(sculpture);
    const plateShape = new THREE.Shape();
    const half = 0.89;
    const radius = 0.12;
    plateShape.moveTo(-half + radius, -half);
    plateShape.lineTo(half - radius, -half);
    plateShape.quadraticCurveTo(half, -half, half, -half + radius);
    plateShape.lineTo(half, half - radius);
    plateShape.quadraticCurveTo(half, half, half - radius, half);
    plateShape.lineTo(-half + radius, half);
    plateShape.quadraticCurveTo(-half, half, -half, half - radius);
    plateShape.lineTo(-half, -half + radius);
    plateShape.quadraticCurveTo(-half, -half, -half + radius, -half);
    const plateGeometry = new THREE.ExtrudeGeometry(plateShape, { depth: 0.07, bevelEnabled: true, bevelThickness: 0.022, bevelSize: 0.027, bevelSegments: 2, curveSegments: 6 });
    plateGeometry.translate(0, 0, -0.035);
    plateGeometry.rotateX(-Math.PI / 2);
    const plates: THREE.Mesh[] = [];
    for (let i = 0; i < 7; i++) {
      const plate = new THREE.Mesh(plateGeometry, i === 3 ? acid : chrome);
      plate.position.y = (i - 3) * 0.24;
      plate.rotation.y = (i - 3) * 0.19;
      sculpture.add(plate);
      plates.push(plate);
      const edges = new THREE.LineSegments(new THREE.EdgesGeometry(plateGeometry), new THREE.LineBasicMaterial({ color: i === 3 ? 0xf6ffd0 : 0xa6ac9c, transparent: true, opacity: 0.45 }));
      plate.add(edges);
    }
    const core = new THREE.Mesh(new THREE.OctahedronGeometry(0.48, 0), acid);
    core.position.y = 1.28;
    sculpture.add(core);
    const lowerCore = new THREE.Mesh(new THREE.OctahedronGeometry(0.33, 0), chrome);
    lowerCore.position.y = -1.17;
    sculpture.add(lowerCore);

    const railsGeometry = new THREE.BoxGeometry(0.055, 1.93, 0.055);
    for (let i = 0; i < 4; i++) {
      const rail = new THREE.Mesh(railsGeometry, dark);
      rail.position.set(i < 2 ? -0.89 : 0.89, 0, i % 2 ? -0.89 : 0.89);
      sculpture.add(rail);
    }
    const orbitGeometry = new THREE.TorusGeometry(2.29, 0.014, 7, 160);
    const orbit = new THREE.Mesh(orbitGeometry, acid);
    orbit.rotation.set(0.93, -0.32, -0.38);
    stage.add(orbit);
    const orbit2 = new THREE.Mesh(new THREE.TorusGeometry(2.56, 0.008, 6, 160), chrome);
    orbit2.rotation.set(-0.74, 0.43, 0.54);
    stage.add(orbit2);

    const satellites: THREE.Group[] = [];
    const pickTargets: THREE.Mesh[] = [];
    const satelliteGeometry = new THREE.BoxGeometry(0.34, 0.18, 0.48);
    const indexGeometry = new THREE.OctahedronGeometry(0.08, 0);
    const nodePositions: THREE.Vector3[] = [];
    nodes.forEach((node, i) => {
      const angle = i / nodes.length * Math.PI * 2 + Math.PI * 0.15;
      const position = new THREE.Vector3(Math.cos(angle) * 3.32, Math.sin(angle) * 1.72, Math.sin(angle + 0.9) * 0.65);
      nodePositions.push(position);
      const satellite = new THREE.Group();
      satellite.position.copy(position);
      const mesh = new THREE.Mesh(satelliteGeometry, chrome);
      mesh.userData.projectId = node.id;
      satellite.add(mesh);
      pickTargets.push(mesh);
      const index = new THREE.Mesh(indexGeometry, acid);
      index.position.set(0, 0.19, 0);
      satellite.add(index);
      scene.add(satellite);
      satellites.push(satellite);
      const points = [new THREE.Vector3(0, 0, 0), position.clone()];
      const link = new THREE.Line(new THREE.BufferGeometry().setFromPoints(points), wire);
      scene.add(link);
    });

    const stars = new Float32Array(150 * 3);
    for (let i = 0; i < 150; i++) {
      // A deterministic dust field; no layout changes between mounts.
      stars[i * 3] = Math.sin(i * 17.31) * 6.8;
      stars[i * 3 + 1] = Math.cos(i * 11.7) * 4.5;
      stars[i * 3 + 2] = -2.5 - (i % 17) * 0.1;
    }
    const dustGeometry = new THREE.BufferGeometry();
    dustGeometry.setAttribute('position', new THREE.BufferAttribute(stars, 3));
    const dust = new THREE.Points(dustGeometry, new THREE.PointsMaterial({ color: 0xbdc3a2, size: 0.014, transparent: true, opacity: 0.5 }));
    scene.add(dust);
    scene.add(new THREE.HemisphereLight(0xf8ffe8, 0x151715, 1.5));
    const key = new THREE.DirectionalLight(0xffffff, 3);
    key.position.set(-3, 5, 5);
    const rim = new THREE.PointLight(0xe8fa72, 34, 13);
    rim.position.set(3, -1, 3);
    const fill = new THREE.PointLight(0xc4c9ff, 28, 15);
    fill.position.set(-4, 2, 1);
    scene.add(key, rim, fill);

    let disposed = false;
    let visible = true;
    let lost = false;
    let frame = 0;
    let lastTime = 0;
    let elapsed = 0;
    let currentSelection = selectedRef.current;
    let burst = 0;
    let dragX = 0;
    let dragY = 0;
    let dragging = false;
    let pointerId = -1;
    let downX = 0;
    let downY = 0;
    let lastX = 0;
    let lastY = 0;
    let wasDragged = false;
    const pointer = new THREE.Vector2();
    const smoothPointer = new THREE.Vector2();
    const projection = new THREE.Vector3();
    const scaleTarget = new THREE.Vector3();
    const raycaster = new THREE.Raycaster();
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    let reduced = motionQuery.matches;
    let width = 1;
    let height = 1;

    const render = (now: number) => {
      frame = 0;
      if (disposed || lost || !visible || document.hidden) { lastTime = 0; return; }
      const dt = lastTime ? Math.min((now - lastTime) / 1000, 0.05) : 0.016;
      lastTime = now;
      if (!pausedRef.current && !reduced) elapsed += dt;
      if (selectedRef.current !== currentSelection) {
        currentSelection = selectedRef.current;
        burst = reduced ? 0 : 1;
      }
      burst = Math.max(0, burst - dt * 1.2);
      smoothPointer.lerp(pointer, reduced ? 1 : 0.055);
      stage.rotation.set(smoothPointer.y * 0.09 + dragY, smoothPointer.x * 0.15 + dragX, 0);
      sculpture.rotation.y = -0.45 + elapsed * 0.12 + burst * 1.4;
      sculpture.position.y = Math.sin(elapsed * 0.65) * 0.08;
      plates.forEach((plate, i) => {
        plate.position.y = (i - 3) * (0.24 + burst * 0.14);
        plate.rotation.y = (i - 3) * (0.19 + burst * 0.15) + Math.sin(elapsed * 0.3 + i * 0.3) * 0.035;
      });
      core.rotation.y = -elapsed * 0.8;
      core.rotation.z = Math.sin(elapsed * 0.3) * 0.2;
      orbit.rotation.z = -0.38 + elapsed * 0.07;
      orbit2.rotation.z = 0.54 - elapsed * 0.04;
      satellites.forEach((satellite, i) => {
        const active = nodes[i].id === currentSelection;
        satellite.rotation.y = elapsed * 0.32 + i * 0.3;
        satellite.position.y = nodePositions[i].y + Math.sin(elapsed * 0.9 + i) * 0.06;
        scaleTarget.setScalar(active ? 1.6 : 1);
        if (reduced) satellite.scale.copy(scaleTarget);
        else satellite.scale.lerp(scaleTarget, 0.08);
        (satellite.children[0] as THREE.Mesh).material = active ? acid : chrome;
        const label = labelsRef.current[i];
        if (label) {
          satellite.getWorldPosition(projection);
          projection.project(camera);
          const labelX = Math.max(58, Math.min(width - 58, (projection.x * 0.5 + 0.5) * width));
          label.style.transform = `translate(${labelX}px, ${(-projection.y * 0.5 + 0.5) * height + 24}px) translate(-50%, 0)`;
          label.style.opacity = '1';
        }
      });
      renderer.render(scene, camera);
      if ((!reduced && !pausedRef.current) || burst > 0 || smoothPointer.distanceTo(pointer) > 0.002) frame = requestAnimationFrame(render);
    };
    const requestFrame = () => {
      if (!frame && !disposed && !lost && visible && !document.hidden) frame = requestAnimationFrame(render);
    };
    requestRef.current = requestFrame;
    const resize = () => {
      width = Math.max(host.clientWidth, 1);
      height = Math.max(host.clientHeight, 1);
      camera.aspect = width / height;
      camera.position.z = camera.aspect < 1.15 ? 12.8 / Math.max(camera.aspect, 0.6) : 11.8;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height, false);
      requestFrame();
    };
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(host);
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) requestFrame();
    }, { rootMargin: '80px' });
    observer.observe(host);
    const setPointer = (event: PointerEvent) => {
      const rect = host.getBoundingClientRect();
      pointer.set((event.clientX - rect.left) / rect.width * 2 - 1, -((event.clientY - rect.top) / rect.height * 2 - 1));
    };
    const move = (event: PointerEvent) => {
      setPointer(event);
      if (dragging) {
        if (Math.hypot(event.clientX - downX, event.clientY - downY) > 5) wasDragged = true;
        dragX += (event.clientX - lastX) * 0.004;
        dragY = Math.max(-0.35, Math.min(0.35, dragY + (event.clientY - lastY) * 0.003));
        lastX = event.clientX;
        lastY = event.clientY;
      }
      requestFrame();
    };
    const down = (event: PointerEvent) => {
      if (event.button !== 0) return;
      dragging = true;
      pointerId = event.pointerId;
      wasDragged = false;
      downX = lastX = event.clientX;
      downY = lastY = event.clientY;
      renderer.domElement.setPointerCapture(event.pointerId);
    };
    const up = (event: PointerEvent) => {
      if (event.type !== 'pointercancel' && !wasDragged) {
        setPointer(event);
        raycaster.setFromCamera(pointer, camera);
        const hit = raycaster.intersectObjects(pickTargets)[0];
        if (hit) selectRef.current(hit.object.userData.projectId as string);
      }
      dragging = false;
      if (pointerId >= 0 && renderer.domElement.hasPointerCapture(pointerId)) renderer.domElement.releasePointerCapture(pointerId);
      pointerId = -1;
      requestFrame();
    };
    const leave = () => { if (!dragging) pointer.set(0, 0); requestFrame(); };
    const motionChange = () => {
      reduced = motionQuery.matches;
      if (reduced) {
        burst = 0;
        pointer.set(0, 0);
        smoothPointer.set(0, 0);
        cancelAnimationFrame(frame);
        frame = 0;
        lastTime = 0;
      }
      requestFrame();
    };
    const visibility = () => { lastTime = 0; if (!document.hidden) requestFrame(); };
    const contextLost = (event: Event) => { event.preventDefault(); lost = true; cancelAnimationFrame(frame); frame = 0; lastTime = 0; setMode('fallback'); };
    const contextRestored = () => {
      try {
        rebuildEnvironment();
        lost = false;
        setMode('webgl');
        resize();
        requestFrame();
      } catch {
        lost = true;
        setMode('fallback');
      }
    };
    renderer.domElement.addEventListener('pointerdown', down);
    renderer.domElement.addEventListener('pointermove', move);
    renderer.domElement.addEventListener('pointerup', up);
    renderer.domElement.addEventListener('pointercancel', up);
    renderer.domElement.addEventListener('pointerleave', leave);
    renderer.domElement.addEventListener('webglcontextlost', contextLost);
    renderer.domElement.addEventListener('webglcontextrestored', contextRestored);
    document.addEventListener('visibilitychange', visibility);
    motionQuery.addEventListener('change', motionChange);
    setMode('webgl');
    resize();
    return () => {
      disposed = true;
      cancelAnimationFrame(frame);
      requestRef.current = null;
      resizeObserver.disconnect();
      observer.disconnect();
      document.removeEventListener('visibilitychange', visibility);
      motionQuery.removeEventListener('change', motionChange);
      renderer.domElement.removeEventListener('pointerdown', down);
      renderer.domElement.removeEventListener('pointermove', move);
      renderer.domElement.removeEventListener('pointerup', up);
      renderer.domElement.removeEventListener('pointercancel', up);
      renderer.domElement.removeEventListener('pointerleave', leave);
      renderer.domElement.removeEventListener('webglcontextlost', contextLost);
      renderer.domElement.removeEventListener('webglcontextrestored', contextRestored);
      const geometries = new Set<THREE.BufferGeometry>();
      const materials = new Set<THREE.Material>();
      scene.traverse((object) => {
        const drawable = object as THREE.Mesh;
        if (drawable.geometry) geometries.add(drawable.geometry);
        if (drawable.material) (Array.isArray(drawable.material) ? drawable.material : [drawable.material]).forEach((material) => materials.add(material));
      });
      geometries.forEach((geometry) => geometry.dispose());
      materials.forEach((material) => material.dispose());
      environment?.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, [nodes]);

  useEffect(() => { requestRef.current?.(); }, [selectedId, paused]);

  return (
    <div className={`project-universe universe-${mode}`}>
      <div className="universe-grid" aria-hidden="true" />
      <div className="universe-corner corner-top" aria-hidden="true">+</div>
      <div className="universe-corner corner-bottom" aria-hidden="true">+</div>
      <span className="universe-coordinate" aria-hidden="true">{l("PIMX / PROJECT ORBIT")}</span>
      <div className="universe-render" ref={hostRef} />
      {l(mode !== 'webgl' && <div className="universe-fallback-art" aria-hidden="true"><i /><i /><i /><i /><i /><i /><i /></div>)}
      <div className="universe-labels" aria-label={l(isFa ? 'انتخاب پروژه در مدار' : 'Choose a project in the orbit')}>
        {l(nodes.map((node, i) => (
          <button type="button" key={node.id} ref={(element) => { labelsRef.current[i] = element; }} className={`universe-node-label ${selectedId === node.id ? 'is-selected' : ''}`} aria-pressed={selectedId === node.id} onClick={() => onSelect(node.id)} dir="ltr">
            <span className="universe-node-index">{l(String(i + 1).padStart(2, '0'))}</span><span>{l(node.title)}</span>
          </button>
        )))}
      </div>
      <div className="universe-bottom-controls">
        <span><Rotate3D size={15} />{l(isFa ? 'بچرخان. یک پروژه را انتخاب کن.' : 'DRAG TO ROTATE. PICK A PROJECT.')}</span>
        <button type="button" className="universe-pause" aria-pressed={paused} aria-label={l(isFa ? (paused ? 'ادامه حرکت سه‌بعدی' : 'توقف حرکت سه‌بعدی') : (paused ? 'Resume 3D animation' : 'Pause 3D animation'))} onClick={() => { pausedRef.current = !paused; setPaused(!paused); }}>
          {l(paused ? <Play size={13} /> : <Pause size={13} />)}<span>{l(isFa ? (paused ? 'ادامه' : 'توقف') : (paused ? 'PLAY' : 'PAUSE'))}</span>
        </button>
      </div>
    </div>
  );
}
