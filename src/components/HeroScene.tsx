import { useSiteText } from '../lib/useSiteText';
import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import '../styles/hero-scene.css';

type HeroSceneProps = { className?: string };

/** A real, locally rendered sculpture. No model, texture, or network request is required. */
export default function HeroScene({ className = '' }: HeroSceneProps) {
  const l = useSiteText();
  const hostRef = useRef<HTMLDivElement>(null);
  const pausedRef = useRef(false);
  const requestFrameRef = useRef<(() => void) | null>(null);
  const [paused, setPaused] = useState(false);
  const [mode, setMode] = useState<'loading' | 'webgl' | 'fallback'>('loading');

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        powerPreference: 'high-performance',
      });
    } catch {
      setMode('fallback');
      return;
    }

    renderer.setPixelRatio(
      Math.min(window.devicePixelRatio || 1, window.innerWidth < 768 ? 1.5 : 2)
    );
    renderer.setClearColor(0x000000, 0);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.3;
    renderer.domElement.setAttribute('aria-hidden', 'true');
    host.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 40);
    camera.position.set(0, 0, 11.7);

    const pmrem = new THREE.PMREMGenerator(renderer);
    const room = new RoomEnvironment();
    let environment = pmrem.fromScene(room, 0.035);
    scene.environment = environment.texture;
    room.dispose();
    pmrem.dispose();

    const sculpture = new THREE.Group();
    const form = new THREE.Group();
    sculpture.add(form);
    scene.add(sculpture);

    const chrome = new THREE.MeshPhysicalMaterial({
      color: 0xe3e3ed,
      metalness: 1,
      roughness: 0.19,
      envMapIntensity: 1.8,
      clearcoat: 1,
      clearcoatRoughness: 0.1,
    });
    // Four physical letterforms assemble into the developer's signature.
    const polygon = (points: number[][]) => {
      const shape = new THREE.Shape(); shape.moveTo(points[0][0], points[0][1]);
      points.slice(1).forEach(point => shape.lineTo(point[0], point[1])); shape.closePath(); return shape;
    };
    const p = polygon([[0,0],[0,1.6],[.82,1.6],[1.02,1.4],[1.02,.94],[.82,.74],[.3,.74],[.3,0]]);
    const hole = new THREE.Path(); hole.moveTo(.3,1.02); hole.lineTo(.7,1.02); hole.lineTo(.73,1.08); hole.lineTo(.73,1.28); hole.lineTo(.67,1.33); hole.lineTo(.3,1.33); hole.closePath(); p.holes.push(hole);
    const shapes = [p, polygon([[0,0],[0,1.6],[.3,1.6],[.3,0]]), polygon([[0,0],[0,1.6],[.3,1.6],[.67,.99],[1.04,1.6],[1.34,1.6],[1.34,0],[1.04,0],[1.04,1.03],[.67,.43],[.3,1.03],[.3,0]]), polygon([[0,0],[.45,.82],[0,1.6],[.36,1.6],[.64,1.09],[.92,1.6],[1.28,1.6],[.82,.82],[1.28,0],[.91,0],[.64,.5],[.36,0]])];
    const letterGeometries = shapes.map(shape => new THREE.ExtrudeGeometry(shape, { depth: .38, bevelEnabled: true, bevelThickness: .07, bevelSize: .045, bevelSegments: 3, steps: 1 }));
    const letterOffsets = [-2.28, -1.02, -.42, 1.08];
    const letters = letterGeometries.map((geometry, i) => {
      const letter = new THREE.Mesh<THREE.ExtrudeGeometry, THREE.Material>(geometry, chrome); letter.position.set(letterOffsets[i], -.8, -.19); form.add(letter); return letter;
    });
    form.rotation.set(-0.08, -0.24, -0.1);

    const yellow = new THREE.MeshStandardMaterial({
      color: 0xd9ff53,
      metalness: 0.3,
      roughness: 0.25,
      emissive: 0xa6c735,
      emissiveIntensity: 0.45,
    });
    letters[3].material = yellow;
    const fragmentGeometry = new THREE.OctahedronGeometry(.12);
    const fragments = Array.from({ length: 9 }, (_, i) => {
      const fragment = new THREE.Mesh(fragmentGeometry, i % 3 ? chrome : yellow);
      const angle = i / 9 * Math.PI * 2; fragment.position.set(Math.cos(angle) * 2.6, Math.sin(angle) * 1.7, -.4); sculpture.add(fragment); return fragment;
    });
    const orbitGeometry = new THREE.TorusGeometry(3.08, 0.012, 8, 240);
    const orbit = new THREE.Mesh(orbitGeometry, yellow);
    orbit.rotation.set(1.02, -0.25, -0.44);
    sculpture.add(orbit);

    const darkChrome = new THREE.MeshStandardMaterial({
      color: 0x7d7797,
      metalness: 1,
      roughness: 0.28,
      envMapIntensity: 1.3,
    });
    const secondOrbitGeometry = new THREE.TorusGeometry(2.9, 0.006, 6, 200);
    const secondOrbit = new THREE.Mesh(secondOrbitGeometry, darkChrome);
    secondOrbit.rotation.set(-0.88, 0.42, 0.62);
    sculpture.add(secondOrbit);

    const satelliteGeometry = new THREE.SphereGeometry(0.055, 16, 12);
    const satellite = new THREE.Mesh(satelliteGeometry, yellow);
    satellite.position.set(3.08, 0, 0);
    orbit.add(satellite);

    const hemisphere = new THREE.HemisphereLight(0xe8e4ff, 0x111015, 2.3);
    const key = new THREE.DirectionalLight(0xffffff, 4.5);
    key.position.set(-3, 5, 5);
    const violet = new THREE.PointLight(0x9480ff, 55, 15, 2);
    violet.position.set(4, -1.8, 3);
    const warm = new THREE.PointLight(0xe2ff87, 26, 14, 2);
    warm.position.set(-4, -1, 2.5);
    scene.add(hemisphere, key, violet, warm);

    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    let reducedMotion = motionQuery.matches;
    let visible = true;
    let contextLost = false;
    let disposed = false;
    let frameId = 0;
    let lastTime = 0;
    let elapsed = 0;
    let dragging = false;
    let pointerId = -1;
    let lastX = 0;
    let lastY = 0;
    let dragX = 0;
    let dragY = 0;
    const pointer = new THREE.Vector2();
    const smoothedPointer = new THREE.Vector2();

    const render = () => {
      if (disposed || contextLost) return;
      sculpture.rotation.set(
        -0.04 + smoothedPointer.y * 0.12 + dragY,
        smoothedPointer.x * 0.16 + dragX,
        0
      );
      form.rotation.set(-0.08 + Math.sin(elapsed * .24) * .1, -.24 + Math.sin(elapsed * .2) * .32, -.1 + Math.sin(elapsed * .12) * .05);
      const assemble = reducedMotion ? 1 : THREE.MathUtils.smoothstep(elapsed, 0, 1.3);
      letters.forEach((letter, i) => { letter.position.y = -.8 + Math.sin(elapsed * .7 + i * .7) * .06 + (1 - assemble) * (i % 2 ? -1.2 : 1.2); letter.position.z = -.19 + Math.sin(elapsed * .5 + i) * .13; letter.rotation.y = Math.sin(elapsed * .6 + i * .8) * .045; });
      fragments.forEach((fragment, i) => { const angle = i / 9 * Math.PI * 2 + elapsed * .09; fragment.position.set(Math.cos(angle) * (2.6 + Math.sin(elapsed * .6 + i) * .1), Math.sin(angle) * 1.7, Math.sin(angle * 2) * .4 - .5); fragment.rotation.set(elapsed * .3 + i, elapsed * .25, 0); });
      sculpture.position.y = Math.sin(elapsed * 0.5) * 0.06;
      orbit.rotation.z = -0.44 + elapsed * 0.04;
      renderer.render(scene, camera);
    };

    const tick = (now: number) => {
      frameId = 0;
      if (disposed || contextLost || !visible || document.hidden) {
        lastTime = 0;
        return;
      }
      if (lastTime && !pausedRef.current && !reducedMotion)
        elapsed += Math.min((now - lastTime) / 1000, 0.05);
      lastTime = now;
      smoothedPointer.lerp(pointer, 0.045);
      render();
      if (!reducedMotion && !pausedRef.current)
        frameId = requestAnimationFrame(tick);
    };

    const requestFrame = () => {
      if (!frameId && !disposed && !contextLost && visible && !document.hidden)
        frameId = requestAnimationFrame(tick);
    };
    requestFrameRef.current = requestFrame;

    const resize = () => {
      const { width, height } = host.getBoundingClientRect();
      if (!width || !height) return;
      renderer.setSize(width, height);
      camera.aspect = width / height;
      // A portrait viewport retains the complete silhouette and its fine orbital line.
      camera.position.z = camera.aspect < 0.85 ? 11.7 / camera.aspect : 11.7;
      camera.updateProjectionMatrix();
      render();
    };

    const move = (event: PointerEvent) => {
      const bounds = host.getBoundingClientRect();
      if (!reducedMotion) {
        pointer.set(
          ((event.clientX - bounds.left) / bounds.width) * 2 - 1,
          ((event.clientY - bounds.top) / bounds.height) * 2 - 1
        );
      }
      if (dragging && event.pointerId === pointerId) {
        dragX += (event.clientX - lastX) * 0.007;
        dragY = THREE.MathUtils.clamp(
          dragY + (event.clientY - lastY) * 0.005,
          -0.7,
          0.7
        );
        lastX = event.clientX;
        lastY = event.clientY;
        render();
      }
      requestFrame();
    };
    const down = (event: PointerEvent) => {
      if (event.button !== 0) return;
      dragging = true;
      pointerId = event.pointerId;
      lastX = event.clientX;
      lastY = event.clientY;
      host.setPointerCapture(event.pointerId);
      host.classList.add('is-dragging');
    };
    const up = (event: PointerEvent) => {
      if (event.pointerId !== pointerId) return;
      dragging = false;
      host.classList.remove('is-dragging');
      if (host.hasPointerCapture(event.pointerId))
        host.releasePointerCapture(event.pointerId);
      pointerId = -1;
    };
    const leave = () => {
      pointer.set(0, 0);
      requestFrame();
    };
    const keydown = (event: KeyboardEvent) => {
      if (
        !['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(event.key)
      )
        return;
      event.preventDefault();
      if (event.key === 'ArrowLeft') dragX -= 0.16;
      if (event.key === 'ArrowRight') dragX += 0.16;
      if (event.key === 'ArrowUp') dragY = Math.max(-0.7, dragY - 0.12);
      if (event.key === 'ArrowDown') dragY = Math.min(0.7, dragY + 0.12);
      render();
    };
    const visibilityChange = () => {
      lastTime = 0;
      if (document.hidden) {
        cancelAnimationFrame(frameId);
        frameId = 0;
      } else requestFrame();
    };
    const motionChange = () => {
      reducedMotion = motionQuery.matches;
      lastTime = 0;
      if (reducedMotion) {
        cancelAnimationFrame(frameId);
        frameId = 0;
        pointer.set(0, 0);
        smoothedPointer.set(0, 0);
        render();
      } else requestFrame();
    };
    const onContextLost = (event: Event) => {
      event.preventDefault();
      contextLost = true;
      cancelAnimationFrame(frameId);
      frameId = 0;
      setMode('fallback');
    };
    const onContextRestored = () => {
      // Render-target pixels are lost with the context, so rebuild the studio reflections.
      environment.dispose();
      const restoredRoom = new RoomEnvironment();
      const restoredPmrem = new THREE.PMREMGenerator(renderer);
      environment = restoredPmrem.fromScene(restoredRoom, 0.035);
      scene.environment = environment.texture;
      restoredRoom.dispose();
      restoredPmrem.dispose();
      contextLost = false;
      setMode('webgl');
      resize();
      requestFrame();
    };

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(host);
    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        lastTime = 0;
        if (visible) requestFrame();
        else {
          cancelAnimationFrame(frameId);
          frameId = 0;
        }
      },
      { threshold: 0.01 }
    );
    intersectionObserver.observe(host);

    host.addEventListener('pointermove', move);
    host.addEventListener('pointerdown', down);
    host.addEventListener('pointerup', up);
    host.addEventListener('pointercancel', up);
    host.addEventListener('pointerleave', leave);
    host.addEventListener('keydown', keydown);
    renderer.domElement.addEventListener('webglcontextlost', onContextLost);
    renderer.domElement.addEventListener(
      'webglcontextrestored',
      onContextRestored
    );
    document.addEventListener('visibilitychange', visibilityChange);
    motionQuery.addEventListener('change', motionChange);
    resize();
    setMode('webgl');
    requestFrame();

    return () => {
      disposed = true;
      requestFrameRef.current = null;
      cancelAnimationFrame(frameId);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      host.removeEventListener('pointermove', move);
      host.removeEventListener('pointerdown', down);
      host.removeEventListener('pointerup', up);
      host.removeEventListener('pointercancel', up);
      host.removeEventListener('pointerleave', leave);
      host.removeEventListener('keydown', keydown);
      renderer.domElement.removeEventListener(
        'webglcontextlost',
        onContextLost
      );
      renderer.domElement.removeEventListener(
        'webglcontextrestored',
        onContextRestored
      );
      document.removeEventListener('visibilitychange', visibilityChange);
      motionQuery.removeEventListener('change', motionChange);
      letterGeometries.forEach(geometry => geometry.dispose());
      fragmentGeometry.dispose();
      orbitGeometry.dispose();
      secondOrbitGeometry.dispose();
      satelliteGeometry.dispose();
      chrome.dispose();
      yellow.dispose();
      darkChrome.dispose();
      environment.dispose();
      scene.clear();
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);

  const togglePause = () => {
    pausedRef.current = !pausedRef.current;
    setPaused(pausedRef.current);
    requestFrameRef.current?.();
  };

  return (
    <div className={`hero-scene hero-scene--${mode} ${className}`}>
      <div className="hero-scene__glow" aria-hidden="true" />
      <div className="hero-scene__fallback" aria-hidden="true">
        <b>PIMX</b>
        <span />
        <span />
        <span />
        <i />
      </div>
      <div
        ref={hostRef}
        className="hero-scene__canvas"
        role="img"
        aria-label={l("Interactive PIMX signature sculpted in chrome. Drag or use the arrow keys to rotate.")}
        tabIndex={mode === 'webgl' ? 0 : -1}
      />
      <div className="hero-scene__caption" aria-hidden="true">
        <span className="hero-scene__coordinate">{l("FIG. 001")}</span>
        <span className="hero-scene__caption-line" />
        <span>
          {l("EXPLORING THE")}<br />
          {l("NEXT DIMENSION")}</span>
      </div>
      {l(mode === 'webgl' && (
        <div className="hero-scene__controls">
          <span className="hero-scene__drag-hint" aria-hidden="true">
            <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
              <path
                d="M8 1v14M1 8h14M5 4l3-3 3 3M5 12l3 3 3-3M4 5 1 8l3 3M12 5l3 3-3 3"
                stroke="currentColor"
                strokeWidth=".8"
              />
            </svg>
            {l("DRAG TO EXPLORE")}</span>
          <button
            type="button"
            className="hero-scene__pause"
            onClick={togglePause}
            aria-label={
              l(paused
                ? 'Resume sculpture animation'
                : 'Pause sculpture animation')
            }
            aria-pressed={paused}
          >
            {l(paused ? (
              <svg
                width="10"
                height="10"
                viewBox="0 0 10 10"
                fill="currentColor"
              >
                <path d="m3 1 6 4-6 4Z" />
              </svg>
            ) : (
              <svg
                width="10"
                height="10"
                viewBox="0 0 10 10"
                fill="currentColor"
              >
                <path d="M2 1h2v8H2zM6 1h2v8H6z" />
              </svg>
            ))}
          </button>
        </div>
      ))}
    </div>
  );
}
