import { useEffect, useRef, useState } from 'react';

/** The waveform, player and subtitle tracks are real geometry, rendered only while visible. */
export default function VoiceScene({ active }: { active: boolean }) {
  const host = useRef<HTMLDivElement>(null);
  const running = useRef(active);
  const [failed, setFailed] = useState(false);
  useEffect(() => { running.current = active; }, [active]);
  useEffect(() => {
    let cancelled = false;
    let cleanup = () => {};
    Promise.all([import('three'), import('../lib/project_sculptures')]).then(([THREE, { createProjectSculpture }]) => {
      if (cancelled || !host.current) return;
      const element = host.current;
      const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setClearColor(0, 0);
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      element.appendChild(renderer.domElement);
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(36, 1, .1, 40);
      camera.position.set(0, .1, 6.3);
      scene.add(new THREE.HemisphereLight('#ffffff', '#173846', 2.3));
      const light = new THREE.DirectionalLight('#ffffff', 3.2); light.position.set(2, 4, 5); scene.add(light);
      const art = createProjectSculpture('github-pimx-voice'); scene.add(art.root);
      art.root.rotation.y = -.13;
      let frame = 0; let time = 0; let previous = 0;
      const draw = (now: number) => {
        if (running.current) {
          time += previous ? Math.min((now - previous) / 1000, .05) : 0;
          art.update(time, 0); art.root.rotation.y = -.13 + Math.sin(time * .35) * .1;
          renderer.render(scene, camera);
        }
        previous = now;
        frame = requestAnimationFrame(draw);
      };
      const resize = new ResizeObserver(() => {
        const { width, height } = element.getBoundingClientRect();
        if (!width || !height) return;
        renderer.setSize(width, height); camera.aspect = width / height; camera.updateProjectionMatrix();
        art.update(time, 0); renderer.render(scene, camera);
      });
      resize.observe(element); frame = requestAnimationFrame(draw);
      cleanup = () => { cancelAnimationFrame(frame); resize.disconnect(); art.dispose(); renderer.dispose(); renderer.domElement.remove(); };
    }).catch(() => { if (!cancelled) setFailed(true); });
    return () => { cancelled = true; cleanup(); };
  }, []);
  return <div ref={host} className="voice-live-scene" style={{ position: 'absolute', inset: '2% 0 10%', pointerEvents: 'none' }} aria-hidden="true">
    {failed && <img src="/project-previews/github-pimx-voice-art.png" alt="" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />}
  </div>;
}
