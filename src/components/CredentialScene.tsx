import { useSiteText } from '../lib/useSiteText';
import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { Move, Pause, Play, RotateCcw } from 'lucide-react';
import '../styles/credential-scene.css';
import { pageIdentities } from '../lib/page_identity';

interface CredentialSceneProps {
  index: number;
  title: string;
  issuer: string;
  grade: string;
  labels: { scene: string; drag: string; pause: string; play: string; reset: string };
}

/** A procedural archive sculpture, not an image of the original certificate. */
export default function CredentialScene({ index, title, issuer, grade, labels }: CredentialSceneProps) {
  const l = useSiteText();
  const hostRef = useRef<HTMLDivElement>(null);
  const dataRef = useRef({ index, title, issuer, grade });
  const updateRef = useRef<(() => void) | null>(null);
  const resetRef = useRef<(() => void) | null>(null);
  const pauseRef = useRef(false);
  const [paused, setPaused] = useState(false);
  const [mode, setMode] = useState<'loading' | 'webgl' | 'fallback'>('loading');

  useEffect(() => {
    dataRef.current = { index, title, issuer, grade };
    updateRef.current?.();
  }, [index, title, issuer, grade]);

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
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
    renderer.setClearColor(0x000000, 0);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.18;
    renderer.domElement.setAttribute('aria-hidden', 'true');
    host.appendChild(renderer.domElement);
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 45);
    camera.position.set(0, 0, 13.5);

    const room = new RoomEnvironment();
    const pmrem = new THREE.PMREMGenerator(renderer);
    let environment = pmrem.fromScene(room, 0.06);
    scene.environment = environment.texture;
    room.dispose();
    pmrem.dispose();

    const geometries: THREE.BufferGeometry[] = [];
    const materials: THREE.Material[] = [];
    const geometry = <T extends THREE.BufferGeometry>(value: T) => { geometries.push(value); return value; };
    const material = <T extends THREE.Material>(value: T) => { materials.push(value); return value; };
    const metal = material(new THREE.MeshPhysicalMaterial({ color: 0xe0e2d5, metalness: 1, roughness: 0.21, clearcoat: 1, envMapIntensity: 1.8 }));
    const acid = material(new THREE.MeshStandardMaterial({ color: pageIdentities.playground.color, metalness: 0.5, roughness: 0.3, emissive: 0xc38338, emissiveIntensity: 0.13 }));
    const glass = material(new THREE.MeshPhysicalMaterial({ color: 0x99aca1, metalness: 0.35, roughness: 0.15, transparent: true, opacity: 0.3, side: THREE.DoubleSide, depthWrite: false, clearcoat: 1 }));
    const dark = material(new THREE.MeshStandardMaterial({ color: 0x282d25, metalness: 0.8, roughness: 0.26 }));
    const assembly = new THREE.Group();
    scene.add(assembly);
    const cards = new THREE.Group();
    assembly.add(cards);
    const bodyGeometry = geometry(new THREE.BoxGeometry(3.5, 4.7, 0.075));
    const horizontal = geometry(new THREE.BoxGeometry(3.5, 0.018, 0.095));
    const vertical = geometry(new THREE.BoxGeometry(0.018, 4.7, 0.095));
    for (let i = 0; i < 4; i++) {
      const sheet = new THREE.Group();
      sheet.add(new THREE.Mesh(bodyGeometry, i === 3 ? dark : glass));
      for (const y of [-2.35, 2.35]) {
        const border = new THREE.Mesh(horizontal, i === 1 ? acid : metal);
        border.position.y = y;
        sheet.add(border);
      }
      for (const x of [-1.75, 1.75]) {
        const border = new THREE.Mesh(vertical, i === 1 ? acid : metal);
        border.position.x = x;
        sheet.add(border);
      }
      sheet.position.set((i - 1.5) * 0.23, (i - 1.5) * -0.065, (i - 3) * 0.34);
      sheet.rotation.z = (i - 3) * -0.09;
      cards.add(sheet);
    }

    const canvas = document.createElement('canvas');
    canvas.width = 896;
    canvas.height = 1203;
    const ctx = canvas.getContext('2d');
    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.anisotropy = Math.min(4, renderer.capabilities.getMaxAnisotropy());
    const faceMaterial = material(new THREE.MeshBasicMaterial({ map: texture, toneMapped: false }));
    const face = new THREE.Mesh(geometry(new THREE.PlaneGeometry(3.43, 4.63)), faceMaterial);
    face.position.set(0.345, -0.0975, 0.044);
    cards.add(face);
    const print = () => {
      if (!ctx) return;
      const current = dataRef.current;
      ctx.fillStyle = '#151b16';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.strokeStyle = '#829477';
      ctx.lineWidth = 1;
      ctx.strokeRect(42, 42, 812, 1119);
      ctx.fillStyle = pageIdentities.playground.color;
      ctx.font = '18px monospace';
      ctx.fillText('PIMX / LEARNING ARCHIVE', 82, 100);
      ctx.font = '17px monospace';
      ctx.fillStyle = '#a4af9e';
      ctx.fillText('RECORD ' + String(current.index + 1).padStart(2, '0') + ' / 11', 82, 146);
      ctx.strokeStyle = '#455141';
      ctx.beginPath(); ctx.moveTo(82, 190); ctx.lineTo(810, 190); ctx.stroke();
      ctx.fillStyle = pageIdentities.playground.color;
      ctx.font = '260px Arial, sans-serif';
      ctx.fillText(String(current.index + 1).padStart(2, '0'), 67, 438);
      ctx.fillStyle = '#a4af9e';
      ctx.font = '23px Arial, sans-serif';
      ctx.fillText(current.issuer, 82, 515, 718);
      ctx.fillStyle = '#f1f2e9';
      ctx.font = '50px Arial, sans-serif';
      const words = current.title.split(' ');
      let line = '', y = 600;
      for (const word of words) {
        if (ctx.measureText(line + word).width > 704 && line) {
          ctx.fillText(line.trim(), 82, y); y += 61; line = word + ' ';
        } else line += word + ' ';
      }
      ctx.fillText(line.trim(), 82, y);
      ctx.strokeStyle = '#455141';
      ctx.beginPath(); ctx.moveTo(82, 941); ctx.lineTo(810, 941); ctx.stroke();
      ctx.fillStyle = '#a4af9e';
      ctx.font = '16px monospace';
      ctx.fillText('RECORDED FINAL GRADE', 82, 986);
      ctx.fillStyle = pageIdentities.playground.color;
      ctx.font = '42px Arial, sans-serif';
      ctx.fillText(current.grade, 82, 1046);
      ctx.fillStyle = '#a4af9e';
      ctx.font = '15px monospace';
      ctx.fillText('MOHAMMADREZA ABEDINPOOR', 82, 1120);
      texture.needsUpdate = true;
    };
    print();

    const seal = new THREE.Group();
    const sealShape = new THREE.Shape();
    for (let i = 0; i <= 64; i++) {
      const angle = (i / 64) * Math.PI * 2;
      const radius = i % 2 ? 0.68 : 0.79;
      const x = Math.cos(angle) * radius, y = Math.sin(angle) * radius;
      if (i === 0) sealShape.moveTo(x, y); else sealShape.lineTo(x, y);
    }
    const sealGeometry = geometry(new THREE.ExtrudeGeometry(sealShape, { depth: 0.13, bevelEnabled: true, bevelThickness: 0.035, bevelSize: 0.025, bevelSegments: 2, steps: 1 }));
    seal.add(new THREE.Mesh(sealGeometry, metal));
    const ring = new THREE.Mesh(geometry(new THREE.TorusGeometry(0.48, 0.025, 8, 80)), acid);
    ring.position.z = 0.2;
    seal.add(ring);
    const sphere = new THREE.Mesh(geometry(new THREE.IcosahedronGeometry(0.21, 0)), acid);
    sphere.position.z = 0.2;
    seal.add(sphere);
    seal.position.set(1.72, -1.8, 0.85);
    assembly.add(seal);
    const orbit = new THREE.Mesh(geometry(new THREE.TorusGeometry(3.52, 0.013, 6, 160)), acid);
    orbit.rotation.set(0.7, 0.5, 0.3);
    assembly.add(orbit);
    const orbit2 = new THREE.Mesh(geometry(new THREE.TorusGeometry(3.27, 0.009, 6, 140)), metal);
    orbit2.rotation.set(-0.9, -0.55, -0.4);
    assembly.add(orbit2);
    scene.add(new THREE.HemisphereLight(0xedf6e3, 0x0c100d, 2.3));
    const key = new THREE.DirectionalLight(0xffffff, 3.8);
    key.position.set(-4, 5, 7);
    const lime = new THREE.PointLight(pageIdentities.playground.color, 24, 15);
    lime.position.set(4, -2, 4);
    scene.add(key, lime);

    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    let reduced = query.matches, visible = true, disposed = false, lost = false;
    let frame = 0, last = 0, elapsed = 0, lastDraw = 0;
    let dragX = 0, dragY = 0, pointerId = -1, lastX = 0, lastY = 0;
    const pointer = new THREE.Vector2(), smooth = new THREE.Vector2();
    const render = () => {
      if (disposed || lost) return;
      assembly.rotation.set(-0.08 + dragY + smooth.y * 0.06, -0.33 + dragX + smooth.x * 0.09, -0.14);
      assembly.position.y = Math.sin(elapsed * 0.55) * 0.11;
      orbit.rotation.z = 0.3 + elapsed * 0.055;
      seal.rotation.z = elapsed * -0.055;
      renderer.render(scene, camera);
    };
    const tick = (now: number) => {
      frame = 0;
      if (disposed || lost || !visible || document.hidden) { last = 0; return; }
      if (last && !reduced && !pauseRef.current) elapsed += Math.min((now - last) / 1000, 0.05);
      last = now;
      smooth.lerp(pointer, 0.1);
      if (now - lastDraw >= 1000 / 30 || reduced || pauseRef.current || pointerId >= 0) { render(); lastDraw = now; }
      if (!reduced && !pauseRef.current) frame = requestAnimationFrame(tick);
    };
    const requestFrame = () => {
      if (!frame && !disposed && !lost && visible && !document.hidden) frame = requestAnimationFrame(tick);
    };
    updateRef.current = () => { print(); render(); requestFrame(); };
    resetRef.current = () => { dragX = 0; dragY = 0; pointer.set(0, 0); smooth.set(0, 0); render(); };
    const resize = () => {
      const { width, height } = host.getBoundingClientRect();
      if (!width || !height) return;
      renderer.setSize(width, height);
      camera.aspect = width / height;
      camera.position.z = camera.aspect < 0.88 ? 13.2 / camera.aspect : 13.2;
      camera.updateProjectionMatrix();
      render();
    };
    const down = (event: PointerEvent) => {
      if (event.button !== 0) return;
      pointerId = event.pointerId; lastX = event.clientX; lastY = event.clientY;
      host.setPointerCapture(pointerId);
      host.classList.add('is-dragging');
    };
    const move = (event: PointerEvent) => {
      const bounds = host.getBoundingClientRect();
      if (!reduced) pointer.set((event.clientX - bounds.left) / bounds.width * 2 - 1, (event.clientY - bounds.top) / bounds.height * 2 - 1);
      if (event.pointerId === pointerId) {
        dragX += (event.clientX - lastX) * 0.006;
        dragY = THREE.MathUtils.clamp(dragY + (event.clientY - lastY) * 0.004, -0.7, 0.7);
        lastX = event.clientX; lastY = event.clientY; render();
      }
      requestFrame();
    };
    const up = (event: PointerEvent) => {
      if (event.pointerId !== pointerId) return;
      if (host.hasPointerCapture(pointerId)) host.releasePointerCapture(pointerId);
      pointerId = -1; host.classList.remove('is-dragging');
    };
    const leave = () => { pointer.set(0, 0); requestFrame(); };
    const keyboard = (event: KeyboardEvent) => {
      if (!['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Home'].includes(event.key)) return;
      event.preventDefault();
      if (event.key === 'ArrowLeft') dragX -= 0.14;
      if (event.key === 'ArrowRight') dragX += 0.14;
      if (event.key === 'ArrowUp') dragY = Math.max(-0.7, dragY - 0.1);
      if (event.key === 'ArrowDown') dragY = Math.min(0.7, dragY + 0.1);
      if (event.key === 'Home') resetRef.current?.();
      render();
    };
    const visibility = () => {
      last = 0;
      if (document.hidden) { cancelAnimationFrame(frame); frame = 0; } else requestFrame();
    };
    const motionChange = () => {
      reduced = query.matches; last = 0;
      if (reduced) { cancelAnimationFrame(frame); frame = 0; pointer.set(0, 0); smooth.set(0, 0); render(); }
      else requestFrame();
    };
    const contextLost = (event: Event) => { event.preventDefault(); lost = true; cancelAnimationFrame(frame); frame = 0; setMode('fallback'); };
    const contextRestored = () => {
      environment.dispose();
      const newRoom = new RoomEnvironment(), newPmrem = new THREE.PMREMGenerator(renderer);
      environment = newPmrem.fromScene(newRoom, 0.06);
      scene.environment = environment.texture; newRoom.dispose(); newPmrem.dispose();
      lost = false; setMode('webgl'); resize(); requestFrame();
    };
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting; last = 0;
      if (visible) requestFrame(); else { cancelAnimationFrame(frame); frame = 0; }
    }, { threshold: 0.01 });
    const resizeObserver = new ResizeObserver(resize);
    observer.observe(host); resizeObserver.observe(host);
    host.addEventListener('pointerdown', down);
    host.addEventListener('pointermove', move);
    host.addEventListener('pointerup', up);
    host.addEventListener('pointercancel', up);
    host.addEventListener('pointerleave', leave);
    host.addEventListener('keydown', keyboard);
    document.addEventListener('visibilitychange', visibility);
    query.addEventListener('change', motionChange);
    renderer.domElement.addEventListener('webglcontextlost', contextLost);
    renderer.domElement.addEventListener('webglcontextrestored', contextRestored);
    resize(); setMode('webgl'); requestFrame();
    return () => {
      disposed = true; cancelAnimationFrame(frame); observer.disconnect(); resizeObserver.disconnect();
      updateRef.current = null; resetRef.current = null;
      host.removeEventListener('pointerdown', down); host.removeEventListener('pointermove', move);
      host.removeEventListener('pointerup', up); host.removeEventListener('pointercancel', up);
      host.removeEventListener('pointerleave', leave); host.removeEventListener('keydown', keyboard);
      document.removeEventListener('visibilitychange', visibility); query.removeEventListener('change', motionChange);
      renderer.domElement.removeEventListener('webglcontextlost', contextLost);
      renderer.domElement.removeEventListener('webglcontextrestored', contextRestored);
      geometries.forEach(value => value.dispose()); materials.forEach(value => value.dispose());
      texture.dispose(); environment.dispose(); scene.clear(); renderer.dispose(); renderer.domElement.remove();
    };
  }, []);

  const togglePause = () => {
    pauseRef.current = !pauseRef.current;
    setPaused(pauseRef.current);
    updateRef.current?.();
  };
  return (
    <div className={`credential-scene credential-scene--${mode}`}>
      <div className="credential-scene__aura" aria-hidden="true" />
      <div className="credential-scene__fallback" aria-hidden="true"><span /><span /><span><b>{l(String(index + 1).padStart(2, '0'))}</b><small>{l(title)}</small></span><i>✳</i></div>
      <div className="credential-scene__canvas" ref={hostRef} role="img" aria-label={l(labels.scene)} tabIndex={mode === 'webgl' ? 0 : -1} />
      <span className="credential-scene__coordinate" aria-hidden="true" dir="ltr">{l("ARCHIVE OBJECT /")}{l(String(index + 1).padStart(2, '0'))}</span>
      {l(mode === 'webgl' && <div className="credential-scene__controls">
        <span><Move size={13} aria-hidden="true" />{l(labels.drag)}</span>
        <button type="button" onClick={() => resetRef.current?.()} aria-label={l(labels.reset)} title={l(labels.reset)}><RotateCcw size={14} /></button>
        <button type="button" onClick={togglePause} aria-pressed={paused} aria-label={l(paused ? labels.play : labels.pause)} title={l(paused ? labels.play : labels.pause)}>{l(paused ? <Play size={14} /> : <Pause size={14} />)}</button>
      </div>)}
    </div>
  );
}
