import * as THREE from 'three';
import { getProjectSculptureProfile, projectSculptureProfiles, type ProjectSculptureProfile } from './project_sculpture_profiles';

export { getProjectSculptureProfile, projectSculptureProfiles } from './project_sculpture_profiles';

export interface ProjectSculpture {
  root: THREE.Group;
  update: (elapsed: number, interaction: number) => void;
  dispose: () => void;
  accent: string;
  title: string;
  signature: string;
}

type Tick = (time: number, interaction: number) => void;
const TAU = Math.PI * 2;
const WHITE = '#e9eef7';
const DARK = '#172032';

/** Small shared primitives; composition and choreography belong to the individual project. */
class Studio {
  root = new THREE.Group();
  ticks: Tick[] = [];
  geometries = new Map<string, THREE.BufferGeometry>();
  materials = new Map<string, THREE.Material>();
  textures: THREE.Texture[] = [];
  constructor(public profile: ProjectSculptureProfile) {}
  get a() { return this.profile.accent; }
  get b() { return this.profile.secondary; }
  geo(key: string, create: () => THREE.BufferGeometry) {
    if (!this.geometries.has(key)) this.geometries.set(key, create());
    return this.geometries.get(key)!;
  }
  mat(color: string, glass = false, metal = false) {
    const key = `${color}/${glass}/${metal}`;
    if (!this.materials.has(key)) this.materials.set(key, new THREE.MeshStandardMaterial({ color, roughness: metal ? .23 : .38, metalness: metal ? .84 : .24, emissive: color, emissiveIntensity: glass ? .13 : .075, transparent: glass, opacity: glass ? .3 : 1, depthWrite: !glass, side: glass ? THREE.DoubleSide : THREE.FrontSide }));
    return this.materials.get(key)!;
  }
  mesh(geometry: THREE.BufferGeometry, color: string, x = 0, y = 0, z = 0, parent: THREE.Object3D = this.root, glass = false, metal = false) {
    const mesh = new THREE.Mesh(geometry, this.mat(color, glass, metal));
    mesh.position.set(x, y, z); parent.add(mesh); return mesh;
  }
  group(x = 0, y = 0, z = 0, parent: THREE.Object3D = this.root) {
    const g = new THREE.Group(); g.position.set(x, y, z); parent.add(g); return g;
  }
  box(w: number, h: number, d: number, x = 0, y = 0, z = 0, color = this.a, parent: THREE.Object3D = this.root, glass = false, metal = false) {
    const m = this.mesh(this.geo('box', () => new THREE.BoxGeometry(1, 1, 1)), color, x, y, z, parent, glass, metal); m.scale.set(w, h, d); return m;
  }
  orb(r: number, x = 0, y = 0, z = 0, color = this.a, parent: THREE.Object3D = this.root, glass = false) {
    const tiny = r < .1;
    const m = this.mesh(this.geo(tiny ? 'orb-small' : 'orb', () => new THREE.SphereGeometry(1, tiny ? 8 : 16, tiny ? 6 : 12)), color, x, y, z, parent, glass, color === WHITE); m.scale.setScalar(r); return m;
  }
  crystal(r: number, x = 0, y = 0, z = 0, color = this.a, parent: THREE.Object3D = this.root, detail = 0) {
    const m = this.mesh(this.geo(`crystal${detail}`, () => new THREE.IcosahedronGeometry(1, detail)), color, x, y, z, parent, false, true); m.scale.setScalar(r); return m;
  }
  cylinder(top: number, bottom: number, height: number, x = 0, y = 0, z = 0, color = this.a, parent: THREE.Object3D = this.root, metal = false) {
    return this.mesh(this.geo(`cylinder/${top}/${bottom}/${height}`, () => new THREE.CylinderGeometry(top, bottom, height, 20)), color, x, y, z, parent, false, metal);
  }
  ring(r: number, x = 0, y = 0, z = 0, color = this.a, parent: THREE.Object3D = this.root, thickness = .026) {
    return this.mesh(this.geo(`ring/${r}/${thickness}`, () => new THREE.TorusGeometry(r, thickness, 6, 48)), color, x, y, z, parent, false, color === WHITE);
  }
  beam(from: THREE.Vector3 | number[], to: THREE.Vector3 | number[], color = this.a, thickness = .025, parent: THREE.Object3D = this.root) {
    const a = from instanceof THREE.Vector3 ? from : new THREE.Vector3(...from as [number, number, number]);
    const b = to instanceof THREE.Vector3 ? to : new THREE.Vector3(...to as [number, number, number]);
    const m = this.cylinder(thickness, thickness, a.distanceTo(b), 0, 0, 0, color, parent);
    m.position.copy(a).add(b).multiplyScalar(.5); m.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), b.clone().sub(a).normalize()); return m;
  }
  path(points: THREE.Vector3[] | number[][], color = this.a, parent: THREE.Object3D = this.root, closed = false) {
    const p = points.map(v => v instanceof THREE.Vector3 ? v : new THREE.Vector3(...v as [number, number, number]));
    if (closed) p.push(p[0].clone());
    const geometry = new THREE.BufferGeometry().setFromPoints(p);
    this.geometries.set(`line/${this.geometries.size}`, geometry);
    const key = `line/${color}`;
    if (!this.materials.has(key)) this.materials.set(key, new THREE.LineBasicMaterial({ color, transparent: true, opacity: .85 }));
    const line = new THREE.Line(geometry, this.materials.get(key)); parent.add(line); return line;
  }
  panel(w: number, h: number, x = 0, y = 0, z = 0, color = this.a, parent: THREE.Object3D = this.root, rows = 3) {
    const p = this.group(x, y, z, parent);
    this.box(w, h, .08, 0, 0, 0, color, p, true);
    this.box(w, .07, .12, 0, h / 2, 0, color, p);
    for (let i = 0; i < 3; i++) this.orb(.027, -w / 2 + .12 + i * .1, h / 2, .07, i ? WHITE : this.b, p);
    for (let i = 0; i < rows; i++) this.box(w * (.73 - (i % 3) * .1), .025, .035, -.04, h * .28 - i * h * .17, .07, i === 0 ? WHITE : color, p);
    return p;
  }
  label(text: string, x: number, y: number, z: number, size = .22, color = WHITE, parent: THREE.Object3D = this.root) {
    if (typeof document === 'undefined') return this.group(x, y, z, parent);
    const canvas = document.createElement('canvas'); canvas.width = 256; canvas.height = 96;
    const context = canvas.getContext('2d');
    if (!context) return this.group(x, y, z, parent);
    context.fillStyle = color; context.font = 'bold 48px monospace'; context.textAlign = 'center'; context.textBaseline = 'middle'; context.fillText(text, 128, 48);
    const texture = new THREE.CanvasTexture(canvas); texture.colorSpace = THREE.SRGBColorSpace; this.textures.push(texture);
    const material = new THREE.MeshBasicMaterial({ map: texture, transparent: true, depthWrite: false, side: THREE.DoubleSide });
    this.materials.set(`label/${this.materials.size}`, material);
    const mesh = new THREE.Mesh(this.geo('label', () => new THREE.PlaneGeometry(1, 1)), material); mesh.scale.set(size * 2.66, size, 1); mesh.position.set(x, y, z); parent.add(mesh); return mesh;
  }
  float(object: THREE.Object3D, amount = .12, rate = 1, phase = 0) {
    const y = object.position.y; this.ticks.push(t => { object.position.y = y + Math.sin(t * rate + phase) * amount; });
  }
  packet(from: number[], to: number[], phase = 0, color = this.b, parent: THREE.Object3D = this.root, r = .07) {
    const start = new THREE.Vector3(...from as [number, number, number]); const end = new THREE.Vector3(...to as [number, number, number]);
    const p = this.orb(r, 0, 0, 0, color, parent);
    this.ticks.push((t, interaction) => { p.position.lerpVectors(start, end, (t * (.24 + interaction * .12) + phase) % 1); p.scale.setScalar(r * (1 + interaction * .3)); }); return p;
  }
  document(x: number, y: number, z: number, color = WHITE, parent: THREE.Object3D = this.root, w = .65, h = .85) {
    const g = this.group(x, y, z, parent); this.box(w, h, .055, 0, 0, 0, color, g);
    for (let i = 0; i < 4; i++) this.box(w * (.65 - (i % 2) * .17), .025, .03, -.02, h * .22 - i * .12, .04, this.a, g);
    const fold = this.box(.16, .16, .04, w / 2 - .085, h / 2 - .085, .055, this.b, g); fold.rotation.z = Math.PI / 4; return g;
  }
  envelope(x: number, y: number, z: number, color = this.a, parent: THREE.Object3D = this.root, scale = 1) {
    const g = this.group(x, y, z, parent); g.scale.setScalar(scale); this.box(.9, .58, .13, 0, 0, 0, color, g);
    this.path([[-.44, .27, .08], [0, -.02, .12], [.44, .27, .08]], WHITE, g); return g;
  }
  handClock(x: number, y: number, z: number, radius = .65, phase = 0, parent: THREE.Object3D = this.root) {
    const g = this.group(x, y, z, parent); const face = this.cylinder(radius, radius, .1, 0, 0, 0, DARK, g); face.rotation.x = Math.PI / 2;
    this.ring(radius, 0, 0, .075, this.a, g, .05);
    for (let i = 0; i < 12; i++) { const angle = i / 12 * TAU; const mark = this.box(.025, .09, .02, Math.sin(angle) * radius * .82, Math.cos(angle) * radius * .82, .07, WHITE, g); mark.rotation.z = -angle; }
    const hour = this.group(0, 0, .09, g); this.box(.05, radius * .48, .025, 0, radius * .2, 0, WHITE, hour);
    const minute = this.group(0, 0, .12, g); this.box(.025, radius * .7, .025, 0, radius * .31, 0, this.b, minute);
    this.orb(.06, 0, 0, .15, this.a, g);
    this.ticks.push(t => { hour.rotation.z = -t * .09 - phase; minute.rotation.z = -t * .65 - phase; }); return g;
  }
  keyboard(x: number, y: number, z: number, parent: THREE.Object3D = this.root, columns = 7) {
    const g = this.group(x, y, z, parent); this.box(2.15, .15, 1.05, 0, 0, 0, DARK, g, false, true);
    const keys: THREE.Mesh[] = [];
    for (let row = 0; row < 3; row++) for (let column = 0; column < columns; column++) keys.push(this.box(.23, .09, .22, (column - (columns - 1) / 2) * .28, .12, (row - 1) * .28, (row + column) % 4 ? WHITE : this.a, g));
    return { group: g, keys };
  }
  database(x: number, y: number, z: number, color = this.a, parent: THREE.Object3D = this.root, scale = 1) {
    const g = this.group(x, y, z, parent); g.scale.setScalar(scale);
    for (let i = 0; i < 3; i++) this.cylinder(.36, .36, .19, 0, (i - 1) * .25, 0, i === 1 ? DARK : color, g, true);
    return g;
  }
  plane(x: number, y: number, z: number, color = this.a, parent: THREE.Object3D = this.root) {
    const g = this.group(x, y, z, parent);
    const geometry = new THREE.BufferGeometry(); geometry.setAttribute('position', new THREE.Float32BufferAttribute([-.6, -.3, 0, .7, .3, 0, -.1, -.08, .22, -.6, .3, 0, .7, .3, 0, -.1, -.08, .22], 3)); geometry.computeVertexNormals(); this.geometries.set(`plane/${this.geometries.size}`, geometry);
    const material = new THREE.MeshStandardMaterial({ color, side: THREE.DoubleSide, metalness: .4, roughness: .35 }); this.materials.set(`plane/${this.materials.size}`, material); g.add(new THREE.Mesh(geometry, material)); return g;
  }
  house(x: number, y: number, z: number, parent: THREE.Object3D = this.root, scale = 1) {
    const g = this.group(x, y, z, parent); g.scale.setScalar(scale);
    this.box(1, .85, .8, 0, 0, 0, WHITE, g);
    const roof = this.cylinder(.77, .77, 1.13, 0, .59, 0, this.a, g); roof.geometry = this.geo('roof', () => new THREE.CylinderGeometry(.72, .72, 1.1, 3)); roof.rotation.set(0, 0, Math.PI / 2);
    this.box(.22, .44, .07, -.2, -.18, .43, DARK, g); this.box(.23, .23, .07, .22, .12, .43, this.b, g); return g;
  }
  arrow(x: number, y: number, z: number, up = true, parent: THREE.Object3D = this.root) {
    const g = this.group(x, y, z, parent); this.box(.09, .55, .1, 0, 0, 0, this.a, g); const head = this.cylinder(0, .22, .35, 0, .32, 0, this.b, g); if (!up) g.rotation.z = Math.PI; head.rotation.y = Math.PI / 4; return g;
  }
}

type Builder = (s: Studio) => void;
const builders: Record<string, Builder> = {
  'soheil-portal': s => {
    // A personal link destination becomes a portrait pavilion with a cascading link ribbon.
    const portrait = s.group(-.63, .39, -.12);
    s.box(.93, 1.25, .13, 0, 0, 0, DARK, portrait, false, true);
    for (const x of [-.49, .49]) s.box(.035, 1.36, .16, x, 0, .08, s.a, portrait);
    s.box(1.02, .035, .16, 0, -.67, .08, s.a, portrait);
    const arch = s.ring(.49, 0, .62, .04, s.a, portrait, .035); arch.scale.y = .49;
    const head = s.orb(.17, 0, .17, .19, s.a, portrait); head.scale.z = .68;
    const shoulders = s.orb(.32, 0, -.21, .13, s.b, portrait); shoulders.scale.set(.32, .19, .105);
    const pedestal = s.group(-.63, -.61, -.12);
    s.box(1.21, .14, .65, 0, 0, 0, s.a, pedestal, false, true);
    s.box(1.45, .13, .84, 0, -.16, .0, DARK, pedestal);
    const tiles = [0, 1, 2].map(i => {
      const x = .48 + i * .19, y = .53 - i * .52;
      const tile = s.group(x, y, .21 + i * .11);
      s.box(.99, .36, .15, 0, 0, 0, i === 1 ? s.a : s.b, tile, false, true);
      const leftLink = s.ring(.071, -.3, 0, .095, WHITE, tile, .017); leftLink.scale.x = 1.5;
      const rightLink = s.ring(.071, -.21, 0, .12, WHITE, tile, .017); rightLink.scale.x = 1.5; rightLink.rotation.y = .8;
      s.box(.36, .024, .025, .1, 0, .092, DARK, tile);
      s.path([[.3, -.05, .094], [.37, .025, .094], [.37, -.045, .094], [.37, .025, .094], [.3, .025, .094]], DARK, tile);
      s.beam([-.13, .22, -.03], [x - .48, y, tile.position.z], s.a, .014);
      s.packet([-.13, .22, -.03], [x - .48, y, tile.position.z], i / 3, WHITE, s.root, .047);
      s.float(tile, .047, .72, i * .8);
      return tile;
    });
    s.label('LINKS', .62, -1.08, .34, .24, s.b);
    s.ticks.push((t, h) => {
      portrait.rotation.y = -.11 + Math.sin(t * .48) * .08 + h * .16;
      tiles.forEach((tile, i) => { tile.rotation.y = -.18 + Math.sin(t * .6 + i * .7) * .13 - h * .18; tile.rotation.z = -.05 + i * .065; });
    });
  },
  'github-pimx-agent': s => {
    const core = s.crystal(.73, 0, .05, 0, s.a, s.root, 1);
    const cage = s.group(); const equator = s.ring(.98, 0, .05, 0, s.b, cage); equator.rotation.x = .9;
    const tools = s.group();
    for (let i = 0; i < 5; i++) { const a = i / 5 * TAU; const x = Math.cos(a) * 1.5, y = Math.sin(a) * 1.13; const tool = s.panel(.48, .43, x, y, .25, i % 2 ? s.a : s.b, tools, 2); tool.rotation.z = -.12 * Math.sin(a); s.beam([0, .05, 0], [x, y, .25], s.a, .013, tools); s.packet([x, y, .25], [0, .05, 0], i / 5, WHITE, tools, .045); }
    s.ticks.push((t, h) => { core.rotation.set(t * .18, t * .3, .1); core.scale.setScalar(.73 * (1 + Math.sin(t * 1.7) * .035 + h * .1)); tools.rotation.z = Math.sin(t * .14) * .12; cage.rotation.y = t * .12; });
  },
  'github-pimx-morph': s => {
    const geometry = new THREE.BoxGeometry(1.5, 1.5, 1.5, 5, 5, 5); s.geometries.set('morphing-matter', geometry);
    const original = new Float32Array(geometry.getAttribute('position').array);
    const matter = s.mesh(geometry, s.a, 0, .05, 0, s.root, false, true);
    const shards = s.group(); for (let i = 0; i < 7; i++) { const a = i / 7 * TAU; const shard = s.crystal(.13 + (i % 3) * .035, Math.cos(a) * 1.35, Math.sin(a) * 1.15, .2, i % 2 ? s.b : WHITE, shards); s.float(shard, .08, 1.4, i); }
    const labels = ['PNG', 'PDF', 'WAV']; labels.forEach((text, i) => { const a = i / 3 * TAU - .6; s.label(text, Math.cos(a) * 1.42, Math.sin(a) * 1.4, .4, .22, s.b); });
    s.ticks.push((t, h) => { const amount = (Math.sin(t * 1.1) + 1) * .5; const positions = geometry.getAttribute('position'); for (let i = 0; i < positions.count; i++) { const x = original[i * 3], y = original[i * 3 + 1], z = original[i * 3 + 2]; const length = Math.sqrt(x * x + y * y + z * z); const k = 1 + (.9 / length - 1) * amount; positions.setXYZ(i, x * k, y * k, z * k); } positions.needsUpdate = true; geometry.computeVertexNormals(); matter.rotation.set(t * .16, t * .26 + h * .4, .15); shards.rotation.z = -t * .13; });
  },
  'pimx-veil': s => {
    const carrier = s.group(0, 0, -.3); s.box(1.8, 1.55, .7, 0, 0, 0, s.a, carrier, true);
    for (const x of [-.88, .88]) for (const y of [-.76, .76]) s.beam([x, y, -.35], [x, y, .35], WHITE, .025, carrier);
    const payload = s.crystal(.4, 0, 0, .02, s.b); const door = s.group(-.88, 0, .12);
    s.box(1.75, 1.55, .1, .88, 0, 0, DARK, door, true); const lock = s.ring(.25, .88, 0, .12, s.b, door, .055); s.box(.09, .25, .09, .88, -.08, .16, WHITE, door);
    s.document(1.22, -.58, .3, WHITE, s.root, .48, .63);
    s.ticks.push((t, h) => { door.rotation.y = -.35 - h * .9 - Math.sin(t * .8) * .12; payload.rotation.set(t * .25, t * .6, t * .16); lock.rotation.z = Math.sin(t) * .25; });
  },
  'pimx-node': s => {
    const left = s.group(-1.22, .3, 0), right = s.group(1.22, -.3, 0);
    s.panel(.68, .95, 0, 0, 0, s.a, left); s.panel(.68, .95, 0, 0, 0, s.b, right);
    s.box(.56, .065, .45, 0, -.57, .05, WHITE, left); s.box(.56, .065, .45, 0, -.57, .05, WHITE, right);
    for (let i = 0; i < 3; i++) { const yy = (i - 1) * .23; s.beam([-1, .3 + yy, .15], [1, -.3 + yy, .15], i % 2 ? s.b : s.a, .014); s.packet([-1, .3 + yy, .15], [1, -.3 + yy, .15], i / 3, WHITE, s.root, .075); }
    const knot = s.ring(.35, 0, 0, .24, WHITE); knot.rotation.y = .6;
    s.ticks.push((t, h) => { knot.rotation.z = t * .45; left.rotation.y = .25 + h * .15; right.rotation.y = -.25 - h * .15; });
  },
  'pimx-moji': s => {
    const face = s.group(0, .1, 0); const pattern = ['001111100', '011111110', '111111111', '110110011', '111111111', '110000011', '111000111', '011111110', '001111100'];
    pattern.forEach((row, y) => [...row].forEach((on, x) => { if (on === '1') s.box(.24, .24, .28, (x - 4) * .235, (4 - y) * .235, .05 + Math.cos(x + y) * .025, y === 3 && (x === 2 || x === 6) ? DARK : s.a, face); }));
    s.box(.17, .18, .37, -.47, .24, .03, DARK, face); s.box(.17, .18, .37, .47, .24, .03, DARK, face);
    for (let i = 0; i < 6; i++) { const a = i / 6 * TAU; const tile = s.box(.23, .23, .16, Math.cos(a) * 1.45, Math.sin(a) * 1.22, .15, s.b); tile.rotation.z = a; s.float(tile, .12, 1.3, i); }
    s.label(':)', 0, -1.4, .3, .22, s.b);
    s.ticks.push((t, h) => { face.rotation.y = Math.sin(t * .75) * .25 + h * .23; face.scale.y = 1 + Math.sin(t * 1.6) * .05; });
  },
  'github-pimxsats': s => {
    const earth = s.group(0, -.05, 0); s.orb(.83, 0, 0, 0, '#245d9a', earth);
    for (let i = 0; i < 4; i++) { const ring = s.ring(.84, 0, 0, 0, '#65b9ff', earth, .008); ring.rotation.y = i * Math.PI / 4; }
    for (let i = -2; i <= 2; i++) { const y = i * .26; const r = s.ring(Math.sqrt(.84 ** 2 - y ** 2), 0, y, 0, '#65b9ff', earth, .008); r.rotation.x = Math.PI / 2; }
    const land = [[-.7, .4], [-.56, .28], [-.4, .12], [-.33, -.07], [-.2, -.3], [.14, .46], [.3, .33], [.39, .11], [.48, -.14], [.24, -.32], [.69, -.42]];
    land.forEach(([lon, lat], i) => { const q = new THREE.Vector3(Math.sin(lon * 2) * Math.cos(lat * 2), Math.sin(lat * 2), Math.cos(lon * 2) * Math.cos(lat * 2)).multiplyScalar(.84); const patch = s.crystal(.13 + (i % 3) * .022, q.x, q.y, q.z, '#78bd92', earth); patch.scale.z *= .4; patch.lookAt(q.clone().multiplyScalar(2)); });
    const orbit = s.group(); orbit.rotation.set(.7, .2, -.35); s.ring(1.36, 0, 0, 0, s.b, orbit, .014);
    const satellite = s.group(1.36, 0, 0, orbit); s.box(.22, .27, .2, 0, 0, 0, WHITE, satellite, false, true);
    for (const x of [-.36, .36]) { s.box(.38, .31, .025, x, 0, 0, '#244982', satellite); for (let i = 0; i < 3; i++) s.box(.008, .31, .04, x - .12 + i * .12, 0, .02, s.a, satellite); }
    s.cylinder(0, .12, .19, 0, .23, 0, s.b, satellite);
    s.ticks.push((t, h) => { earth.rotation.y = t * .1; const a = t * (.35 + h * .2); satellite.position.set(Math.cos(a) * 1.36, Math.sin(a) * 1.36, 0); satellite.rotation.z = a; });
  },
  'github-pimx-swap': s => {
    const { group, keys } = s.keyboard(0, -.3, 0); group.rotation.x = .52;
    const left = s.box(.68, .61, .2, -.8, .8, .14, s.a), right = s.box(.68, .61, .2, .8, .8, .14, s.b);
    s.label('A', -.8, .8, .26, .36, DARK); s.label('آ', .8, .8, .26, .36, DARK);
    s.path([[-.4, .92, .2], [0, 1.13, .2], [.4, .92, .2]], WHITE); s.path([[-.4, .55, .2], [0, .34, .2], [.4, .55, .2]], WHITE);
    s.ticks.push((t, h) => { left.rotation.y = Math.sin(t) * .2; right.rotation.y = -Math.sin(t) * .2; keys.forEach((key, i) => { key.position.y = .12 - Math.max(0, Math.sin(t * 3 - i * .7)) * (.035 + h * .05); }); });
  },
  'github-pimxdash': s => {
    const browser = s.panel(2.35, 1.65, 0, .18, -.2, s.a, s.root, 0); browser.rotation.y = -.08;
    const tiles: THREE.Group[] = []; for (let i = 0; i < 4; i++) { const tile = s.group((i % 2 - .5) * 1.01, .42 - Math.floor(i / 2) * .65, .15); s.box(.87, .48, .11, 0, 0, 0, i % 2 ? s.b : s.a, tile, true); if (i === 0) s.ring(.15, 0, 0, .09, WHITE, tile); if (i === 1) for (let j = 0; j < 3; j++) s.box(.09, .1 + j * .09, .06, -.17 + j * .17, -.08 + j * .045, .1, WHITE, tile); if (i === 2) s.label('⌘', 0, 0, .14, .28, WHITE, tile); if (i === 3) s.orb(.12, 0, 0, .11, s.b, tile); tiles.push(tile); }
    s.box(1.5, .18, .12, 0, -1.05, .16, WHITE); s.ticks.push((t, h) => tiles.forEach((tile, i) => { tile.position.z = .15 + Math.sin(t * .8 + i) * .055 + h * .13 * (i + 1) / 4; }));
  },
  'pimx-wide': s => {
    const rings: THREE.Mesh[] = []; for (let i = 0; i < 3; i++) { const ring = s.ring(.62 + i * .22, 0, .15, 0, i % 2 ? s.b : s.a, s.root, .085); ring.rotation.set(.5 + i * .55, i * .65, i * .25); rings.push(ring); }
    s.orb(.28, 0, .15, 0, WHITE);
    for (let i = 0; i < 5; i++) { const d = s.document(-1.37 + i * .68, -1.05, .08, i % 2 ? s.b : s.a, s.root, .36, .42); d.rotation.z = (i - 2) * -.13; }
    s.ticks.push((t, h) => rings.forEach((ring, i) => { ring.rotation.z = t * (.18 + i * .08) * (i % 2 ? -1 : 1) + h * .2; }));
  },
  'github-pimx-eltex': s => {
    const strip = s.group(0, .12, 0); strip.rotation.set(-.12, -.13, -.12);
    s.box(2.8, 1.02, .12, 0, 0, 0, DARK, strip);
    for (let i = 0; i < 3; i++) { const frame = s.panel(.7, .66, (i - 1) * .9, 0, .1, i === 1 ? s.a : s.b, strip, 0); const play = s.cylinder(0, .16, .3, 0, 0, .13, WHITE, frame); play.rotation.set(0, 0, -Math.PI / 2); }
    for (let i = 0; i < 10; i++) for (const y of [-.45, .45]) s.box(.1, .08, .035, -1.26 + i * .28, y, .09, s.a, strip);
    const playhead = s.box(.05, 1.34, .1, 0, 0, .27, WHITE, strip);
    s.ring(.28, -.93, -.91, .04, s.a); s.ring(.28, .93, -.91, .04, s.b); s.beam([-.93, -.91, .04], [.93, -.91, .04], WHITE, .015);
    s.ticks.push((t, h) => { playhead.position.x = Math.sin(t * .6) * 1.16; strip.rotation.y = -.13 + h * .16; });
  },
  'github-pimx-weather': s => {
    const sun = s.group(-.75, .6, -.35); s.orb(.47, 0, 0, 0, s.a, sun);
    for (let i = 0; i < 10; i++) { const a = i / 10 * TAU; s.beam([Math.cos(a) * .58, Math.sin(a) * .58, 0], [Math.cos(a) * .76, Math.sin(a) * .76, 0], s.a, .026, sun); }
    const cloud = s.group(.2, .33, .05); [[-.61, 0, .38], [-.22, .15, .5], [.22, .06, .41], [.58, -.05, .29]].forEach(([x, y, r]) => s.orb(r, x, y, 0, WHITE, cloud));
    for (let i = 0; i < 7; i++) { const rain = s.cylinder(0, .053, .25, -.6 + i * .22, -.64, .08, s.b); rain.rotation.z = -.26; s.ticks.push(t => { rain.position.y = -.3 - ((t * .5 + i * .13) % 1) * .9; }); }
    s.ticks.push((t, h) => { sun.rotation.z = t * .12; cloud.position.x = .2 + Math.sin(t * .4) * .14 + h * .12; });
  },
  'pimx-pass': s => {
    const root = s.crystal(.28, 0, .98, .1, WHITE); const middle = [[-.85, .13, .05], [.85, .13, .05]];
    middle.forEach((p, i) => { s.orb(.21, ...p as [number, number, number], s.a); s.beam([0, .98, .1], p, s.b, .026); s.packet([0, .98, .1], p, i * .5, WHITE); for (let j = 0; j < 2; j++) { const leaf = [p[0] + (j - .5) * .72, -.85, .15]; s.box(.38, .3, .25, ...leaf as [number, number, number], s.b); s.beam(p, leaf, s.a, .022); s.packet(p, leaf, j * .45 + i * .2, WHITE); } });
    const lookup = s.ring(.42, 0, .98, .1, s.a); s.ticks.push(t => { root.rotation.y = t * .4; lookup.rotation.y = t * .3; });
  },
  'github-pimx-portal': s => {
    const portal = s.group(); for (const x of [-.83, .83]) s.box(.22, 2.05, .42, x, 0, 0, WHITE, portal, false, true); s.box(1.87, .24, .42, 0, 1, 0, s.a, portal, false, true);
    s.box(1.38, 1.69, .05, 0, 0, .02, s.b, portal, true); const halo = s.ring(.6, 0, .04, .12, s.a); halo.rotation.y = .5;
    for (let i = 0; i < 4; i++) { const module = s.box(.26, .26, .26, -1.4 + i * .92, -1.29, .25, i % 2 ? s.a : s.b); s.float(module, .09, 1.4, i); s.beam([module.position.x, -1.15, .25], [0, .03, .05], s.b, .01); }
    s.ticks.push((t, h) => { halo.rotation.y = t * .4; portal.rotation.y = Math.sin(t * .3) * .08 + h * .15; });
  },
  'github-pimx-fail': s => {
    const tower = s.group(-.55, -.05, 0); const blocks: THREE.Mesh[] = []; for (let i = 0; i < 5; i++) { const block = s.box(.67 - i * .05, .26, .62, i > 2 ? .08 * (i - 2) : 0, -.75 + i * .37, 0, i % 2 ? s.a : WHITE, tower, false, true); block.rotation.z = i > 2 ? (i - 2) * -.15 : 0; blocks.push(block); }
    const plan = s.document(.7, -.18, .34, s.b, s.root, .88, 1.27); plan.rotation.y = -.26;
    s.path([[.34, -.4, .39], [.55, -.1, .39], [.8, -.25, .39], [1.01, .24, .39]], DARK);
    s.ticks.push((t, h) => { blocks[4].rotation.z = -.3 + Math.sin(t * .8) * .045 - h * .15; blocks[4].position.x = .16 + h * .12; plan.rotation.y = -.26 + Math.sin(t * .5) * .1; });
  },
  'github-pimx': s => {
    const letter = s.group(0, 0, 0); s.beam([-1.14, -.86, 0], [-.74, .86, 0], WHITE, .14, letter); s.beam([-.74, .86, 0], [.03, .58, 0], s.a, .14, letter); s.beam([.03, .58, 0], [-.17, -.03, 0], s.a, .14, letter); s.beam([-.17, -.03, 0], [-.94, .11, 0], WHITE, .14, letter);
    s.beam([.25, -.83, 0], [1.08, .8, 0], s.a, .11); s.beam([.22, .8, 0], [1.16, -.83, 0], WHITE, .11);
    const star = s.group(1.27, 1.12, .14); for (let i = 0; i < 4; i++) { const a = i / 4 * Math.PI; s.beam([-.23 * Math.cos(a), -.23 * Math.sin(a), 0], [.23 * Math.cos(a), .23 * Math.sin(a), 0], s.a, .025, star); }
    s.ticks.push((t, h) => { star.rotation.z = t * .25; letter.rotation.y = Math.sin(t * .4) * .08 + h * .16; });
  },
  'github-import-export-company': s => {
    const ship = s.group(0, -.35, 0); s.box(2.5, .35, .7, 0, 0, 0, DARK, ship, false, true); s.box(.45, .8, .55, -.86, .52, 0, WHITE, ship);
    for (let i = 0; i < 4; i++) { const cargo = s.box(.37, .32, .48, -.35 + i * .44, .34, 0, i % 2 ? s.a : s.b, ship); for (let j = 0; j < 3; j++) s.box(.014, .29, .02, cargo.position.x - .12 + j * .12, .34, .255, WHITE, ship); }
    s.path([[-1.4, -.71, .48], [-.8, -.78, .48], [0, -.69, .48], [.8, -.77, .48], [1.4, -.72, .48]], s.b);
    const route = s.ring(1.3, 0, .36, -.5, s.a, s.root, .015); route.scale.y = .43;
    const parcel = s.box(.27, .27, .27, 0, 1, 0, s.b); s.ticks.push(t => { ship.rotation.z = Math.sin(t * .8) * .026; parcel.position.set(Math.cos(t * .45) * 1.3, .36 + Math.sin(t * .45) * .56, -.5); });
  },
  'github-3d-animated-interactive-portfolio': s => {
    const stage = s.group(0, -.18, 0); s.box(1.92, .08, 1.72, 0, -.8, 0, s.a, stage, true);
    for (const x of [-.9, .9]) for (const z of [-.8, .8]) s.beam([x, -.8, z], [x, .83, z], s.b, .018, stage);
    for (const z of [-.8, .8]) s.beam([-.9, .83, z], [.9, .83, z], WHITE, .018, stage);
    const subject = s.mesh(s.geo('knot', () => new THREE.TorusKnotGeometry(.38, .13, 48, 8)), WHITE, 0, .08, 0, stage, false, true);
    const camera = s.group(1.4, .4, .3); s.box(.39, .3, .29, 0, 0, 0, s.a, camera); const lens = s.cylinder(.11, .14, .17, 0, 0, .22, s.b, camera); lens.rotation.x = Math.PI / 2;
    s.path([[1.3, .4, .35], [.73, .82, .35], [.73, -.38, .35], [1.3, .4, .35]], s.a);
    s.ticks.push((t, h) => { subject.rotation.set(t * .3, t * .4, 0); camera.position.y = .4 + Math.sin(t * .5) * .2; stage.rotation.y = -.25 + h * .25; });
  },
  'github-bot': s => {
    const robot = s.group(-.17, .14, 0); s.box(1.04, .84, .62, 0, 0, 0, s.a, robot, false, true);
    for (const x of [-.25, .25]) { s.box(.14, .17, .05, x, .09, .34, DARK, robot); s.orb(.055, x, .09, .38, s.b, robot); }
    s.box(.39, .06, .05, 0, -.2, .35, WHITE, robot); s.beam([0, .42, 0], [0, .75, 0], WHITE, .035, robot); s.orb(.1, 0, .77, 0, s.b, robot);
    s.cylinder(.32, .46, .54, 0, -.77, 0, DARK, robot);
    const memory = s.database(1.05, -.52, -.1, s.b, s.root, .66); const bubble = s.panel(.63, .38, -1.05, .73, .1, WHITE, s.root, 1);
    s.packet([1.05, -.52, -.1], [0, .1, 0], 0, s.b); s.ticks.push((t, h) => { robot.rotation.y = Math.sin(t * .65) * .17 + h * .2; bubble.scale.y = 1 + Math.sin(t * 1.3) * .04; memory.rotation.y = t * .2; });
  },
  'github-c-mn': s => {
    const file = s.document(.82, .08, 0, WHITE, s.root, .93, 1.37); file.rotation.y = -.16;
    s.box(.15, 1.12, .45, -.88, 0, 0, DARK); s.label('>>', -.91, .72, .16, .3, s.a);
    for (let i = 0; i < 5; i++) { const token = s.box(.2, .2, .2, -.8, .36 - i * .18, .19, i % 2 ? s.a : s.b); s.ticks.push(t => { token.position.x = -.72 + ((t * .32 + i * .18) % 1) * 1.26; token.rotation.z = t * .3 + i; }); }
    s.beam([-.76, -.8, .04], [.86, -.8, .04], s.a, .023); s.label('FILE', .82, -.78, .22, .19, s.b);
  },
  'github-chat': s => {
    const bubbles: THREE.Group[] = []; for (let i = 0; i < 4; i++) { const g = s.group(i % 2 ? .46 : -.46, .85 - i * .55, i * .09); s.box(1.36, .39, .22, 0, 0, 0, i % 2 ? s.a : s.b, g, true); const tail = s.box(.17, .17, .14, i % 2 ? .5 : -.5, -.2, 0, i % 2 ? s.a : s.b, g); tail.rotation.z = Math.PI / 4; for (let j = 0; j < 3; j++) s.box(.2 + j * .04, .023, .035, -.34 + j * .36, 0, .14, WHITE, g); bubbles.push(g); }
    const dots = [-.14, 0, .14].map(x => s.orb(.055, x, -1.33, .34, WHITE));
    s.ticks.push((t, h) => { bubbles.forEach((g, i) => { g.position.x = (i % 2 ? .46 : -.46) + Math.sin(t * .7 + i) * .045 + (i % 2 ? 1 : -1) * h * .1; }); dots.forEach((dot, i) => { dot.position.y = -1.33 + Math.max(0, Math.sin(t * 3 - i * .6)) * .11; }); });
  },
  'github-chess-timer-with-python': s => {
    s.box(2.55, .83, .67, 0, -.12, 0, DARK, s.root, false, true); const left = s.handClock(-.66, -.05, .38, .43, 0), right = s.handClock(.66, -.05, .38, .43, 1.8);
    const buttons = [-.7, .7].map(x => s.box(.48, .09, .48, x, .4, 0, s.a));
    const king = s.group(0, .99, -.1); s.cylinder(.09, .2, .42, 0, 0, 0, WHITE, king, true); s.box(.25, .06, .1, 0, .34, 0, s.b, king); s.box(.06, .27, .1, 0, .31, 0, s.b, king);
    s.ticks.push(t => { const side = Math.sin(t * .65) > 0; buttons[0].position.y = side ? .35 : .44; buttons[1].position.y = side ? .44 : .35; left.scale.setScalar(side ? 1.025 : .97); right.scale.setScalar(side ? .97 : 1.025); });
  },
  'github-clock': s => {
    const clock = s.handClock(0, .16, .12, .96, .7); s.beam([-.54, -.67, 0], [-.72, -1.12, 0], WHITE, .055); s.beam([.54, -.67, 0], [.72, -1.12, 0], WHITE, .055);
    s.label('12:24', 0, -.37, .29, .18, s.b, clock); const pendulum = s.group(0, -.67, -.18); s.beam([0, 0, 0], [0, -.48, 0], s.b, .022, pendulum); s.orb(.15, 0, -.48, 0, s.a, pendulum);
    s.ticks.push((t, h) => { pendulum.rotation.z = Math.sin(t * 2.2) * (.23 + h * .12); clock.rotation.y = h * .13; });
  },
  'github-coursera': s => {
    const desktop = s.panel(1.52, 1.01, -.55, .2, -.2, s.a, s.root, 0); s.box(.16, .35, .14, -.55, -.5, -.2, WHITE); s.box(.74, .07, .42, -.55, -.67, -.16, WHITE);
    for (let i = 0; i < 3; i++) s.box(.34, .38, .08, -.99 + i * .44, .09, -.08, i % 2 ? s.b : s.a);
    const mobile = s.panel(.54, 1.0, 1.03, -.04, .28, s.b, s.root, 3); const tablet = s.panel(.87, .65, .37, .75, -.43, WHITE, s.root, 2);
    s.ticks.push((t, h) => { mobile.rotation.y = -.2 + Math.sin(t * .5) * .08 + h * .15; tablet.rotation.z = .08 + Math.sin(t * .4) * .05; desktop.rotation.y = .1; });
  },
  'github-cpp': s => {
    const cells: THREE.Mesh[] = []; for (let row = 0; row < 3; row++) for (let col = 0; col < 3; col++) { const x = (col - 1) * .57, y = (1 - row) * .57; const block = s.box(.46, .46, .3, x, y, 0, col === 1 ? s.a : DARK); cells.push(block); s.label(String(row * 3 + col + 1), x, y, .17, .21, col === 1 ? DARK : WHITE); }
    for (const x of [-1, 1]) s.path([[x, .9, 0], [x * 1.13, .9, 0], [x * 1.13, -.9, 0], [x, -.9, 0]], s.b);
    s.ticks.push((t, h) => cells.forEach((cell, i) => { cell.position.z = i % 3 === Math.floor(t * .65) % 3 ? .12 + h * .17 : 0; }));
  },
  'github-email-generator': s => {
    const inbox = s.group(0, -.4, 0); s.box(1.78, .18, .94, 0, -.43, 0, DARK, inbox); s.box(.14, .65, .94, -.83, -.02, 0, s.a, inbox); s.box(.14, .65, .94, .83, -.02, 0, s.a, inbox); s.box(1.78, .65, .12, 0, -.02, -.42, s.a, inbox);
    const letters = [s.envelope(-.38, .1, .23, s.b, s.root, .85), s.envelope(.29, .68, -.08, WHITE, s.root, .8)]; letters[0].rotation.z = -.17; letters[1].rotation.z = .19;
    const code = s.panel(.86, .4, .81, -.13, .56, s.b, s.root, 0); s.label('2048', 0, -.015, .08, .23, DARK, code);
    s.ticks.push(t => { letters[1].position.y = .68 + Math.sin(t * .9) * .14; code.rotation.y = Math.sin(t * .5) * .13; });
  },
  'github-exam': s => {
    const card = s.panel(1.65, 1.15, .16, .06, 0, s.a, s.root, 0); card.rotation.z = -.1;
    s.orb(.18, -.44, .19, .15, WHITE, card); s.cylinder(.16, .25, .3, -.44, -.14, .1, s.b, card);
    for (let i = 0; i < 3; i++) s.box(.56 - i * .09, .045, .03, .34, .27 - i * .21, .11, WHITE, card);
    const file = s.document(-.94, -.68, -.27, s.b, s.root, .55, .77); s.packet([-.94, -.68, -.27], [.5, -.3, .1], 0, WHITE); s.ticks.push((t, h) => { card.rotation.y = Math.sin(t * .45) * .1 + h * .2; file.rotation.z = -.14; });
  },
  'github-gussing-number': s => {
    const die = s.group(-.25, .1, 0); s.box(1.25, 1.25, 1.25, 0, 0, 0, s.a, die);
    [[-.3, .3], [0, 0], [.3, -.3]].forEach(([x, y]) => s.orb(.095, x, y, .64, DARK, die));
    for (const y of [-.29, .29]) for (const z of [-.29, .29]) s.orb(.09, .64, y, z, DARK, die);
    const target = s.ring(.33, 1.07, -.54, .08, s.b, s.root, .055); s.ring(.17, 1.07, -.54, .08, WHITE); s.orb(.06, 1.07, -.54, .08, s.b);
    s.label('?', -.93, 1.08, .04, .3, WHITE); s.ticks.push((t, h) => { die.rotation.set(.25 + Math.sin(t * .7) * .15, t * .18 + h * .35, -.08); target.rotation.y = t * .2; });
  },
  'github-gussing-number-with-js': s => {
    s.box(2.68, .08, .18, 0, -.06, 0, WHITE); for (let i = 0; i < 11; i++) s.box(.025, i % 5 ? .15 : .26, .07, -1.25 + i * .25, -.02, .05, s.b);
    s.label('0', -1.25, -.43, .1, .19, s.b); s.label('999', 1.18, -.43, .1, .19, s.b);
    const marker = s.crystal(.16, 0, .25, .15, s.a); const high = s.arrow(-.76, .78, .04, true), low = s.arrow(.8, .8, .04, false);
    const readout = s.panel(.89, .38, 0, -.94, .15, s.a, s.root, 0); s.label('500', 0, 0, .09, .24, DARK, readout);
    s.ticks.push((t, h) => { marker.position.x = Math.sin(t * .55) * (1.12 - h * .35); high.position.y = .78 + Math.sin(t * 1.3) * .07; low.position.y = .8 - Math.sin(t * 1.3) * .07; });
  },
  'github-mcino-introduction-to-git-and-github': s => {
    const trunk = [[-.58, -.95, 0], [-.58, -.33, 0], [-.58, .31, 0], [-.58, .96, 0]]; s.path(trunk, WHITE);
    trunk.forEach((p, i) => { s.orb(.12, ...p as [number, number, number], s.a); s.label(`C${i + 1}`, -.93, p[1], .15, .14, s.b); });
    s.path([trunk[1], [.65, -.16, .08], [.65, .53, .08], trunk[3]], s.b); s.orb(.12, .65, -.16, .08, s.b); s.orb(.12, .65, .53, .08, s.b);
    s.packet([.65, .53, .08], trunk[3], 0, WHITE); const merge = s.ring(.27, -.58, .96, .04, s.b); s.ticks.push(t => { merge.scale.setScalar(1 + Math.sin(t * 1.4) * .1); });
  },
  'mml-wallet-bot': s => {
    const wallet = s.group(-.16, -.2, 0); s.box(1.74, 1.02, .45, 0, 0, 0, DARK, wallet, false, true); s.box(.85, .41, .12, .5, 0, .3, s.a, wallet); s.orb(.075, .7, 0, .39, WHITE, wallet);
    const coins: THREE.Mesh[] = []; for (let i = 0; i < 4; i++) { const c = s.cylinder(.25, .25, .08, -.67 + i * .48, .73 + i % 2 * .15, -.03, i % 2 ? s.a : s.b, s.root, true); c.rotation.x = Math.PI / 2; coins.push(c); }
    s.label('0x', -.57, -.2, .25, .19, s.b, wallet); s.ticks.push((t, h) => coins.forEach((coin, i) => { coin.position.y = .73 + i % 2 * .15 + Math.sin(t * .85 + i) * .11; coin.rotation.y = t * .4 + i + h * .2; }));
  },
  'github-mohammadrezaabedinpoor': s => {
    const bust = s.group(); s.orb(.44, 0, .53, .02, WHITE, bust); s.cylinder(.37, .64, .7, 0, -.22, 0, s.a, bust); s.box(1.16, .1, .73, 0, -.65, 0, DARK, bust);
    const orbit = s.group(); orbit.rotation.x = .4; s.ring(1.23, 0, .1, 0, s.b, orbit, .023);
    for (let i = 0; i < 4; i++) { const a = i / 4 * TAU; const c = s.box(.19, .19, .19, Math.cos(a) * 1.23, .1 + Math.sin(a) * 1.23, 0, i % 2 ? WHITE : s.a, orbit); c.rotation.z = a; }
    s.label('PIMX', 0, -1.03, .33, .31, s.a); s.ticks.push((t, h) => { orbit.rotation.z = t * .16; bust.rotation.y = Math.sin(t * .4) * .11 + h * .2; });
  },
  'github-my-project': s => {
    const funnel = s.cylinder(.66, .18, .67, -.7, .48, 0, s.a); s.cylinder(.17, .17, .41, -.7, -.02, 0, WHITE);
    const file = s.document(.72, -.11, .09, s.b, s.root, .73, .98); file.rotation.y = -.18;
    const integers = [s.box(.22, .22, .22, -.91, 1.16, 0, WHITE), s.box(.22, .22, .22, -.53, 1.3, 0, s.b), s.box(.22, .22, .22, -.76, .93, .03, s.b)];
    s.beam([-.69, -.27, 0], [.5, -.53, .04], WHITE, .025); s.label('3', .72, -.16, .17, .32, DARK);
    s.ticks.push((t, h) => { integers.forEach((v, i) => { v.position.y = .98 + ((1 - (t * .23 + i * .33) % 1)) * .49; v.rotation.y = t * .7; }); funnel.rotation.y = h * .2; });
  },
  'github-open-random-window': s => {
    const positions = [[-1.03, .68, -.28], [-.36, .9, -.48], [.69, .72, -.21], [1.12, .04, -.35], [.77, -.69, -.17], [-.11, -.88, -.38], [-1.03, -.59, -.24], [-.67, -.06, .16], [.08, .29, .43], [.64, -.22, .35]];
    const windows = positions.map((p, i) => { const w = s.panel(.54 + i % 3 * .04, .39, ...p as [number, number, number], i % 2 ? s.a : s.b, s.root, 1); w.rotation.z = (i % 3 - 1) * .1; return w; });
    s.ticks.push((t, h) => windows.forEach((window, i) => { window.position.x = positions[i][0] + Math.sin(t * .33 + i * 1.8) * (.05 + h * .08); window.position.y = positions[i][1] + Math.cos(t * .43 + i) * .06; }));
  },
  'personal-resume-gate': s => {
    const sheet = s.document(-.16, .13, 0, WHITE, s.root, 1.4, 1.85); sheet.rotation.z = -.08;
    const fold = s.group(.53, -.55, .15); const lower = s.document(0, 0, 0, s.b, fold, .86, .59); lower.rotation.z = .14;
    const seal = s.cylinder(.22, .22, .05, -.52, -.65, .14, s.a); seal.rotation.x = Math.PI / 2; s.ring(.15, -.52, -.65, .18, s.b);
    for (const x of [-.61, -.44]) { const ribbon = s.box(.13, .38, .03, x, -.99, .11, s.a); ribbon.rotation.z = x < -.5 ? -.14 : .14; }
    s.ticks.push((t, h) => { sheet.rotation.y = Math.sin(t * .5) * .1 + h * .12; fold.rotation.x = -.2 + Math.sin(t * .6) * .09; });
  },
  'pimx-pass-bot': s => {
    const dish = s.group(-.64, -.24, 0); const bowl = s.orb(.62, 0, .39, 0, s.a, dish); bowl.scale.z = .21; bowl.rotation.y = -.4; s.beam([0, .3, .02], [.16, .45, .56], WHITE, .035, dish); s.orb(.09, .16, .45, .56, s.b, dish); s.cylinder(.1, .23, .66, 0, -.29, 0, WHITE, dish);
    for (let i = 0; i < 3; i++) { const x = .56 + i * .32, y = .77 - i * .65; s.orb(.12, x, y, -.09, i === 1 ? s.a : s.b); const arc = s.ring(.36 + i * .18, .05, .35, .2, s.b); arc.scale.x = .5; s.packet([.09, .39, .45], [x, y, -.09], i / 3, WHITE); }
    s.ticks.push((t, h) => { dish.rotation.y = Math.sin(t * .5) * .26 + h * .2; });
  },
  'github-pimx-pass-panel': s => {
    const rack = s.group(-.5, .06, -.08); s.box(.99, 1.9, .75, 0, 0, 0, DARK, rack, false, true);
    for (let i = 0; i < 5; i++) { s.box(.85, .24, .08, 0, .68 - i * .34, .43, s.a, rack); for (let j = 0; j < 3; j++) s.orb(.025, -.29 + j * .12, .68 - i * .34, .49, j ? s.b : WHITE, rack); }
    const tunnel = s.group(.83, -.17, .13); for (let i = 0; i < 4; i++) { const r = s.ring(.36, 0, 0, -.32 + i * .22, i % 2 ? s.a : s.b, tunnel, .034); r.rotation.y = -.3; }
    s.packet([-.2, -.18, .34], [1.14, -.18, .34], 0, WHITE, s.root, .09); s.ticks.push((t, h) => { tunnel.rotation.y = -.23 + Math.sin(t * .4) * .11 + h * .15; });
  },
  'github-pimx-personal': s => {
    const globe = s.group(-.26, .15, -.08); s.orb(.64, 0, 0, 0, s.a, globe, true);
    for (let i = 0; i < 5; i++) { const ring = s.ring(.66, 0, 0, 0, s.a, globe, .013); ring.rotation.y = i / 5 * Math.PI; }
    const servers = [[-1.08, -.77, .09], [.92, -.59, .25], [.9, .77, -.03]];
    servers.forEach((p, i) => { s.database(...p as [number, number, number], i % 2 ? s.b : WHITE, s.root, .55); s.beam([-.26, .15, -.08], p, s.b, .018); s.packet([-.26, .15, -.08], p, i / 3, WHITE); });
    s.ticks.push(t => { globe.rotation.y = t * .2; });
  },
  'github-pimx-planner': s => {
    const calendar = s.panel(1.62, 1.61, -.26, .15, -.08, s.a, s.root, 0); for (let i = 0; i < 2; i++) s.ring(.09, -.69 + i * .89, .99, -.04, WHITE);
    const days: THREE.Mesh[] = []; for (let row = 0; row < 3; row++) for (let col = 0; col < 4; col++) days.push(s.box(.24, .23, .05, -.82 + col * .36, .5 - row * .36, .05, row * 4 + col === 6 ? s.b : WHITE));
    const timeline = s.group(.99, -.04, .31); s.beam([0, -.86, 0], [0, .86, 0], s.b, .025, timeline); for (let i = 0; i < 3; i++) { s.orb(.08, 0, .62 - i * .57, 0, s.a, timeline); s.box(.42, .2, .1, .24, .62 - i * .57, 0, s.b, timeline, true); }
    s.ticks.push((t, h) => { days[6].position.z = .1 + Math.sin(t * 1.5) * .04 + h * .12; calendar.rotation.y = -.06 + h * .1; });
  },
  'pimx-play-bot': s => {
    const cabinet = s.group(0, -.16, 0); s.box(1.22, 1.7, .79, 0, -.05, 0, DARK, cabinet, false, true); s.box(1.3, .22, .82, 0, .85, 0, s.a, cabinet); s.label('PLAY', 0, .86, .43, .24, DARK, cabinet);
    s.panel(.86, .66, 0, .28, .46, s.b, cabinet, 0); const pixel = s.crystal(.15, 0, .27, .6, s.a, cabinet);
    s.box(1.3, .19, .88, 0, -.21, .09, s.a, cabinet); s.cylinder(.04, .04, .23, -.32, -.01, .34, WHITE, cabinet); s.orb(.075, -.32, .13, .34, s.b, cabinet); for (let i = 0; i < 2; i++) s.cylinder(.065, .065, .035, .16 + i * .2, -.09, .36, s.b, cabinet);
    const cartridge = s.box(.38, .51, .16, 1.08, -.52, .15, s.b); s.ticks.push((t, h) => { pixel.rotation.z = t * .55; pixel.position.x = Math.sin(t * 1.5) * .23; cartridge.rotation.y = t * .3 + h * .4; });
  },
  'pimx-sonic-bot': s => {
    const record = s.group(-.47, .22, .06); const vinyl = s.cylinder(.89, .89, .1, 0, 0, 0, DARK, record); vinyl.rotation.x = Math.PI / 2;
    for (const r of [.4, .59, .76]) s.ring(r, 0, 0, .065, '#6b516d', record, .009); s.ring(.21, 0, 0, .08, s.a, record, .085); s.orb(.055, 0, 0, .11, WHITE, record);
    const wave = s.group(.86, -.12, .13); const bars: THREE.Mesh[] = []; for (let i = 0; i < 7; i++) bars.push(s.box(.065, .7, .09, (i - 3) * .13, 0, 0, i % 2 ? s.a : s.b, wave));
    s.beam([.41, .76, .13], [.57, .47, .15], WHITE, .03); s.beam([.57, .47, .15], [.13, .23, .15], WHITE, .03);
    s.ticks.push((t, h) => { record.rotation.z = -t * (.35 + h * .3); bars.forEach((bar, i) => { bar.scale.y = .3 + Math.abs(Math.sin(t * 2.1 + i * .7)) * .9; }); });
  },
  'github-pimx-save-bot': s => {
    const mixer = s.group(0, -.1, 0); mixer.rotation.x = .35; s.box(2.42, .21, 1.24, 0, 0, 0, DARK, mixer, false, true);
    const faders: THREE.Mesh[] = []; for (let i = 0; i < 5; i++) { s.box(.028, .025, .75, -1 + i * .5, .13, .06, s.b, mixer); faders.push(s.box(.19, .07, .14, -1 + i * .5, .19, -.11 + i % 3 * .12, i % 2 ? s.a : s.b, mixer)); s.cylinder(.08, .08, .07, -1 + i * .5, .17, -.45, WHITE, mixer); }
    for (let i = 0; i < 3; i++) { const media = s.panel(.43, .49, -.73 + i * .73, .84, -.1, i % 2 ? s.b : s.a, s.root, 1); s.packet([media.position.x, .59, -.1], [media.position.x, .07, .1], i / 3, WHITE); }
    s.ticks.push((t, h) => faders.forEach((fader, i) => { fader.position.z = Math.sin(t * .8 + i) * (.2 + h * .06); }));
  },
  'github-pimx-support': s => {
    const hand = s.group(0, -.63, 0); s.box(1.1, .23, .65, -.08, 0, 0, WHITE, hand); for (let i = 0; i < 4; i++) { const finger = s.box(.19, .55 + i % 2 * .1, .22, -.45 + i * .27, .32, -.09, s.a, hand); finger.rotation.x = -.28; }
    const thumb = s.box(.21, .58, .27, -.69, .2, .13, s.a, hand); thumb.rotation.z = -.65;
    const coin = s.cylinder(.35, .35, .085, .16, .78, .08, s.b); coin.rotation.x = Math.PI / 2; s.label('+', .16, .78, .16, .35, DARK); const ring = s.ring(.66, .16, .78, -.03, s.a, s.root, .013); ring.rotation.y = .7;
    s.ticks.push((t, h) => { coin.rotation.y = Math.sin(t * .8) * .22; coin.position.y = .78 + Math.sin(t * 1.1) * .1; ring.rotation.z = t * .25; hand.rotation.y = h * .16; });
  },
  'github-pwa-chatbot': s => {
    const phone = s.group(-.37, .1, 0); s.box(.97, 1.85, .19, 0, 0, 0, DARK, phone, false, true); s.box(.83, 1.53, .025, 0, .02, .115, s.a, phone, true); s.box(.28, .04, .03, 0, .82, .13, WHITE, phone);
    for (let i = 0; i < 3; i++) s.box(.57, .22, .06, i % 2 ? .08 : -.07, .45 - i * .37, .16, i % 2 ? s.b : WHITE, phone);
    const cache = s.database(.82, -.52, .02, s.b, s.root, .67); s.packet([-.24, -.37, .14], [.82, -.52, .02], 0, WHITE);
    const offline = s.ring(.25, .83, .56, .12, s.a); s.beam([.64, .37, .15], [1.02, .75, .15], s.b, .035);
    s.ticks.push((t, h) => { phone.rotation.y = -.12 + Math.sin(t * .45) * .1 + h * .18; cache.rotation.y = t * .15; offline.rotation.y = Math.sin(t * .7) * .15; });
  },
  'github-shop': s => {
    const store = s.group(-.44, .19, -.17); s.box(1.35, 1.35, .7, 0, 0, 0, WHITE, store); s.box(.94, .74, .08, 0, -.15, .4, s.b, store, true);
    for (let i = 0; i < 6; i++) s.box(.22, .24, .55, -.55 + i * .22, .58, .26, i % 2 ? WHITE : s.a, store);
    const cart = s.group(.83, -.51, .43); s.box(.7, .07, .47, 0, 0, 0, s.a, cart); for (const x of [-.29, .29]) { s.beam([x, .02, -.18], [x, .48, -.23], WHITE, .023, cart); s.beam([x, .48, -.23], [x, .48, .23], WHITE, .023, cart); }
    s.box(.39, .3, .31, 0, .23, 0, s.b, cart); for (const x of [-.22, .22]) { const wheel = s.cylinder(.09, .09, .055, x, -.13, .2, DARK, cart); wheel.rotation.x = Math.PI / 2; }
    s.ticks.push((t, h) => { cart.position.x = .83 + Math.sin(t * .6) * .11 + h * .12; });
  },
  'github-shop2': s => {
    const display = s.group(-.57, .2, 0); s.box(1.0, .13, .73, 0, -.78, 0, DARK, display); s.box(.09, 1.69, .13, -.48, .02, -.27, WHITE, display); s.box(.09, 1.69, .13, .48, .02, -.27, WHITE, display);
    for (let i = 0; i < 3; i++) { s.box(1.09, .09, .65, 0, -.63 + i * .57, 0, s.a, display); s.box(.31, .37, .28, -.24, -.4 + i * .57, 0, i % 2 ? s.a : s.b, display); s.orb(.15, .25, -.4 + i * .57, .01, WHITE, display); }
    for (let i = 0; i < 3; i++) { const x = .34 + i * .3, y = -.7 + i * .6; s.box(.35, .21, .4, x, y, .03, s.b); s.box(.19, .19, .19, x, y + .2, .03, s.a); if (i < 2) s.beam([x, y + .2, .03], [x + .3, y + .8, .03], WHITE, .016); }
    const order = s.orb(.065, .5, 0, .18, WHITE); s.ticks.push(t => { const v = (t * .2) % 1; order.position.set(.34 + v * .6, -.5 + v * 1.2, .18); });
  },
  'github-shop3': s => {
    const warehouse = s.group(0, .3, -.43); for (const x of [-1.12, 1.12]) s.box(.12, 1.31, .12, x, 0, 0, WHITE, warehouse); s.box(2.37, .12, .14, 0, .61, 0, s.a, warehouse); s.box(2.37, .12, .14, 0, -.22, 0, s.b, warehouse);
    for (let i = 0; i < 5; i++) s.box(.27, .28 + i % 2 * .12, .36, -.9 + i * .45, .02 + i % 2 * .06, 0, i % 2 ? s.a : s.b, warehouse);
    s.box(2.67, .13, .69, 0, -.72, .3, DARK); for (let i = 0; i < 8; i++) { const roller = s.cylinder(.07, .07, .65, -1.12 + i * .32, -.65, .3, WHITE); roller.rotation.x = Math.PI / 2; }
    const parcel = s.box(.41, .41, .41, 0, -.39, .31, s.a); s.box(.055, .42, .42, 0, 0, 0, s.b, parcel); s.ticks.push((t, h) => { parcel.position.x = -1.09 + ((t * (.26 + h * .2)) % 1) * 2.18; });
  },
  'github-spam-with-pyautogui': s => {
    const { group, keys } = s.keyboard(0, -.46, 0); group.rotation.x = .5;
    const cursor = s.group(-.53, .6, .35); const cursorShape = new THREE.Shape(); cursorShape.moveTo(0, 0); cursorShape.lineTo(0, -.62); cursorShape.lineTo(.16, -.44); cursorShape.lineTo(.31, -.69); cursorShape.lineTo(.43, -.62); cursorShape.lineTo(.29, -.39); cursorShape.lineTo(.55, -.37); cursorShape.closePath();
    const geometry = new THREE.ExtrudeGeometry(cursorShape, { depth: .08, bevelEnabled: false }); s.geometries.set('cursor', geometry); s.mesh(geometry, s.b, 0, 0, 0, cursor);
    s.label('PRESS', .64, .82, .03, .23, s.a); const pulse = s.ring(.22, -.53, .5, .4, s.a);
    s.ticks.push((t, h) => { const key = Math.floor(t * 2) % keys.length; keys.forEach((mesh, i) => { mesh.position.y = i === key ? .065 : .12; }); cursor.position.x = Math.sin(t * .7) * .63; pulse.position.x = cursor.position.x; pulse.scale.setScalar(.6 + (t % 1) * .6 + h * .1); });
  },
  'github-sqlalchemy': s => {
    const stores = [[-.81, .54, -.12], [.79, .47, -.14], [0, -.74, .1]]; stores.forEach((p, i) => { s.database(...p as [number, number, number], i === 1 ? s.b : s.a, s.root, .85); s.beam(p, stores[(i + 1) % 3], WHITE, .022); s.packet(p, stores[(i + 1) % 3], i / 3, s.b); });
    const record = s.panel(.61, .43, 0, .1, .59, WHITE, s.root, 2); s.label('SQL', 0, -.43, .45, .2, s.b); s.ticks.push((t, h) => { record.rotation.y = Math.sin(t * .6) * .18 + h * .25; });
  },
  'github-telegram-bot': s => {
    const plane = s.plane(-.28, -.07, .2, s.a); plane.rotation.z = .2;
    const stars = [s.group(-.69, .89, -.03), s.group(.87, .57, .1)]; stars.forEach((g, i) => { for (let j = 0; j < 4; j++) { const a = j / 4 * Math.PI; s.beam([Math.cos(a) * -.24, Math.sin(a) * -.24, 0], [Math.cos(a) * .24, Math.sin(a) * .24, 0], i ? s.b : WHITE, .035, g); } });
    s.path([[-1.2, -.71, .08], [-.73, -.58, .08], [-.8, -.94, .08], [-.29, -.85, .08], [.21, -.48, .08]], s.b);
    const bubble = s.panel(.61, .38, .91, -.55, .09, s.b, s.root, 1); s.ticks.push((t, h) => { plane.position.y = -.07 + Math.sin(t * .8) * .12; plane.rotation.y = Math.sin(t * .55) * .2 + h * .25; stars.forEach((star, i) => { star.rotation.z = t * (i ? -.12 : .17); }); bubble.position.y = -.55 + Math.sin(t * .5) * .05; });
  },
  'housing-ads-scrapper-bot': s => {
    const home = s.house(-.32, .06, -.1, s.root, 1.28); const lens = s.group(.72, .16, .73); s.ring(.44, 0, 0, 0, s.a, lens, .064); s.orb(.4, 0, 0, -.04, s.b, lens, true); s.beam([.3, -.3, 0], [.69, -.69, 0], WHITE, .065, lens);
    const listing = s.panel(.74, .37, -.77, -.95, .52, s.b, s.root, 1); s.label('$', -.78, -.93, .62, .2, WHITE);
    s.ticks.push((t, h) => { lens.position.x = .72 + Math.sin(t * .6) * .15 + h * .12; lens.position.y = .16 + Math.cos(t * .6) * .1; home.rotation.y = -.2; listing.rotation.z = -.05; });
  },
  'github-temperuture': s => {
    const hot = s.group(-.8, -.15, 0); s.box(.81, 1.08, .53, 0, 0, 0, DARK, hot); for (let i = 0; i < 4; i++) s.box(.075, .75, .09, -.24 + i * .16, 0, .31, s.a, hot);
    const cool = s.group(.82, -.15, 0); s.box(.8, 1.07, .53, 0, 0, 0, DARK, cool); s.ring(.31, 0, 0, .32, s.b, cool); const fan = s.group(0, 0, .34, cool); for (let i = 0; i < 4; i++) { const blade = s.box(.14, .38, .045, 0, .14, 0, s.b, fan); const arm = s.group(0, 0, 0, fan); arm.add(blade); arm.rotation.z = i / 4 * TAU; }
    const meter = s.box(2.25, .12, .12, 0, .93, .13, WHITE); const mark = s.box(.13, .34, .12, 0, .93, .25, s.a);
    s.ticks.push((t, h) => { fan.rotation.z = -t * (1.4 + h); mark.position.x = Math.sin(t * .65) * .93; meter.rotation.y = 0; });
  },
  'github-test': s => {
    const coins: THREE.Group[] = []; for (let i = 0; i < 5; i++) { const stack = s.group(-1 + i * .5, -.73 + i * .17, 0); for (let j = 0; j <= i; j++) s.cylinder(.18, .18, .08, 0, j * .1, 0, j % 2 ? s.a : s.b, stack, true); coins.push(stack); }
    s.path([[-1.18, -.3, .19], [-.62, -.17, .19], [-.05, .04, .19], [.51, .42, .19], [1.05, 1, .19]], WHITE);
    const dial = s.handClock(-.86, .68, -.12, .38, .8); s.label('%', .47, .95, .27, .3, s.a);
    s.ticks.push((t, h) => { coins.forEach((coin, i) => { coin.position.y = -.73 + i * .17 + Math.sin(t * .9 + i) * .025; }); dial.rotation.y = h * .22; });
  },
  'github-thermometer': s => {
    const levels: THREE.Mesh[] = []; for (const [i, x] of [-.58, .58].entries()) { const g = s.group(x, .1, 0); s.box(.44, 1.93, .14, 0, 0, -.1, WHITE, g); s.orb(.2, 0, -.76, .07, i ? s.b : s.a, g); const tube = s.cylinder(.055, .055, 1.21, 0, .08, .07, i ? s.b : s.a, g); levels.push(tube); const glass = s.cylinder(.083, .083, 1.5, 0, .14, .06, WHITE, g); glass.material = s.mat(WHITE, true); tube.position.z = .1; for (let j = 0; j < 9; j++) s.box(j % 3 ? .09 : .15, .017, .02, .14, -.44 + j * .14, .08, DARK, g); }
    s.label('°C', 0, 1.23, .15, .28, s.a); s.ticks.push((t, h) => levels.forEach((tube, i) => { const value = .55 + Math.sin(t * .7 + i * 1.8) * .25 + h * .08; tube.scale.y = value; tube.position.y = -.51 + value * .61; }));
  },
  'github-time-with-tkinter-library': s => {
    const glass = s.group(0, -.05, 0); const upper = s.cylinder(.54, .07, .85, 0, .48, 0, s.b, glass); upper.material = s.mat(s.b, true); const lower = s.cylinder(.07, .54, .85, 0, -.48, 0, s.b, glass); lower.material = s.mat(s.b, true);
    for (const y of [-.97, .97]) s.cylinder(.64, .64, .1, 0, y, 0, WHITE, glass, true); for (const x of [-.58, .58]) s.beam([x, -.95, 0], [x, .95, 0], s.a, .028, glass);
    const sand = s.cylinder(0, .39, .5, 0, -.62, 0, s.a, glass); for (let i = 0; i < 8; i++) { const grain = s.orb(.025, 0, 0, 0, s.a, glass); s.ticks.push(t => { grain.position.set(Math.sin(i * 7) * .025, .11 - ((t * .6 + i * .12) % 1) * .56, Math.cos(i * 7) * .025); }); }
    s.label('00:10', 1.02, -.21, .06, .2, s.b); s.ticks.push((t, h) => { sand.scale.y = .8 + Math.sin(t * .3) * .1; glass.rotation.y = .22 + h * .18; });
  },
  'github-timer-with-threading-library': s => {
    const left = s.handClock(-.75, .26, .13, .55, 0), right = s.handClock(.75, -.23, .13, .55, 1.6);
    const threads = [s.path([[-1.12, -.83, .07], [-.55, -.67, .07], [-.16, -.9, .07], [.31, -.71, .07], [.82, -.91, .07]], s.a), s.path([[-.86, .99, .01], [-.31, .77, .01], [.13, 1.0, .01], [.75, .77, .01], [1.13, .99, .01]], s.b)];
    s.label('T1', -.75, -.49, .15, .2, s.a); s.label('T2', .75, .58, .15, .2, s.b);
    s.ticks.push((t, h) => { left.rotation.y = Math.sin(t * .41) * .08; right.rotation.y = Math.sin(t * .67) * .08 + h * .15; threads[0].position.y = Math.sin(t * .8) * .03; threads[1].position.y = Math.cos(t * 1.2) * .04; });
  },
  'github-turtle-library': s => {
    const turtle = s.group(0, -.67, .2); const shell = s.orb(.35, 0, 0, 0, s.a, turtle); shell.scale.multiply(new THREE.Vector3(1, .55, 1.25)); s.orb(.13, 0, .04, .49, WHITE, turtle); for (const x of [-.3, .3]) for (const z of [-.22, .22]) s.orb(.09, x, -.05, z, s.b, turtle);
    const points: number[][] = []; for (let i = 0; i <= 160; i++) { const a = i / 160 * TAU; const r = .65 + Math.sin(a * 5) * .26; points.push([Math.cos(a) * r, .39 + Math.sin(a) * r, -.08]); } const drawing = s.path(points, s.a);
    const nib = s.crystal(.07, 0, 0, -.08, s.b); s.ticks.push((t, h) => { const step = Math.floor(t * (14 + h * 12)) % 160; drawing.geometry.setDrawRange(0, Math.max(8, step)); nib.position.set(...points[step] as [number, number, number]); turtle.rotation.y = Math.sin(t * .6) * .18; });
  },
  'github-web-application-technologies-and-django-coursera': s => {
    const steps = s.group(); for (let i = 0; i < 5; i++) { const x = -1.12 + i * .56, y = -.82 + i * .28; s.box(.47, .18 + i * .26, .75, x, y, -.12, i % 2 ? s.a : s.b, steps); s.label(String(i + 1), x, y + .16 + i * .13, .3, .19, WHITE); }
    const window = s.panel(1.07, .67, .38, .91, -.13, s.a, s.root, 2); s.label('WEB', -.87, .81, .06, .24, s.b);
    s.ticks.push((t, h) => { window.position.y = .91 + Math.sin(t * .7) * .06; steps.rotation.y = -.12 + h * .15; });
  },
  'school-blog-cms': s => {
    const school = s.house(-.62, .3, -.14, s.root, .84); s.box(.57, .17, .45, -.62, .9, -.14, s.a); s.label('ABC', -.62, .38, .24, .16, DARK);
    const press = s.group(.61, -.28, .02); s.box(.86, .46, .69, 0, 0, 0, DARK, press); s.box(.79, .11, .77, 0, -.23, .13, s.a, press);
    const article = s.document(0, .26, -.03, WHITE, press, .54, .74); article.rotation.x = -.22;
    const published = s.document(.52, -.86, .49, s.b, s.root, .52, .49); s.ticks.push((t, h) => { published.position.y = -.86 + Math.sin(t * .9) * .07; article.position.y = .26 + Math.sin(t * 1.4) * .045; school.rotation.y = -.1 + h * .15; });
  },
  'advanced-monitoring-chatbot': s => {
    const tower = s.group(-.71, .05, -.14); s.beam([-.25, -.99, 0], [0, .98, 0], WHITE, .032, tower); s.beam([.25, -.99, 0], [0, .98, 0], WHITE, .032, tower); for (let i = 0; i < 5; i++) s.beam([-.22 + i * .04, -.83 + i * .33, 0], [.22 - i * .04, -.83 + i * .33, 0], s.a, .018, tower);
    for (let i = 0; i < 3; i++) { const signal = s.ring(.2 + i * .16, 0, .92, 0, s.a, tower, .014); signal.scale.y = .56; s.ticks.push(t => { signal.scale.x = 1 + Math.sin(t * 1.2 - i * .5) * .09; }); }
    const monitor = s.panel(1.28, .84, .67, -.19, .1, s.b, s.root, 0); s.path([[-.54, -.1, .11], [-.3, -.1, .11], [-.17, .19, .11], [-.04, -.28, .11], [.11, .12, .11], [.27, -.1, .11], [.54, -.1, .11]], s.a, monitor);
    const dot = s.orb(.06, .2, -.2, .23, WHITE); s.ticks.push((t, h) => { dot.position.x = .17 + ((t * .3) % 1) * .99; monitor.rotation.y = -.15 + h * .16; });
  },
  'multilingual-frontend-bot': s => {
    const globe = s.group(); s.orb(.56, 0, .09, -.17, s.a, globe, true); for (let i = 0; i < 3; i++) { const r = s.ring(.58, 0, .09, -.17, WHITE, globe, .013); r.rotation.y = i / 3 * Math.PI; }
    const languages = ['EN', 'فا', '中文', 'DE']; const ribbon = s.group(); languages.forEach((language, i) => { const angle = i / 4 * TAU + .3; const x = Math.cos(angle) * 1.04, y = Math.sin(angle) * .91; const tile = s.box(.67, .4, .16, x, y, .17, i % 2 ? s.b : s.a, ribbon); s.label(language, x, y, .27, .22, DARK, ribbon); tile.rotation.z = Math.sin(angle) * .05; });
    s.ticks.push((t, h) => { globe.rotation.y = t * .2; ribbon.rotation.y = Math.sin(t * .4) * .14 + h * .18; });
  },
  'telegram-agent-admin-panel': s => {
    const console = s.group(0, -.62, .11); s.box(2.14, .23, .8, 0, 0, 0, DARK, console); for (let i = 0; i < 4; i++) s.cylinder(.07, .07, .08, -.78 + i * .52, .16, .13, i % 2 ? s.a : s.b, console);
    const centre = s.panel(1.09, .77, 0, .26, -.05, s.a, s.root, 2);
    const arms = [-1, 1].map(side => { const g = s.group(side * .76, -.42, -.07); s.beam([0, 0, 0], [side * .35, .61, 0], WHITE, .065, g); s.orb(.11, side * .35, .61, 0, s.b, g); s.beam([side * .35, .61, 0], [side * .1, 1.03, .1], s.a, .06, g); s.crystal(.15, side * .1, 1.03, .1, s.b, g); return g; });
    s.ticks.push((t, h) => { arms.forEach((arm, i) => { arm.rotation.z = Math.sin(t * .7 + i) * .1 + (i ? 1 : -1) * h * .1; }); centre.rotation.y = h * .15; });
  },
  'gemini-webhook-mailer': s => {
    const star = s.group(-.82, .46, .1); for (let i = 0; i < 4; i++) { const angle = i * Math.PI / 4; s.beam([-Math.cos(angle) * .42, -Math.sin(angle) * .42, 0], [Math.cos(angle) * .42, Math.sin(angle) * .42, 0], s.b, .055, star); }
    const hook = s.path([[-.33, .41, .12], [.32, .41, .12], [.52, .21, .12], [.52, -.18, .12], [.26, -.4, .12]], WHITE);
    const mail = s.envelope(.83, -.55, .08, s.a); const trigger = s.orb(.08, 0, .4, .2, s.b); s.label('POST', -.71, -.43, .12, .21, s.a);
    s.ticks.push((t, h) => { star.rotation.z = t * .17; mail.position.x = .83 + Math.sin(t * .8) * .075 + h * .11; trigger.position.x = -.3 + ((t * .25) % 1) * .75; hook.position.z = 0; });
  },
  'flutter-chatbot-arcade': s => {
    const console = s.group(0, -.04, 0); s.box(2.48, 1.12, .31, 0, 0, 0, s.a, console, false, true); s.box(1.38, .87, .07, 0, 0, .19, DARK, console);
    const dpad = s.group(-.94, 0, .21, console); s.box(.34, .09, .04, 0, 0, 0, WHITE, dpad); s.box(.09, .34, .04, 0, 0, 0, WHITE, dpad);
    for (let i = 0; i < 2; i++) { const b = s.cylinder(.09, .09, .05, .86 + i * .2, -.1 + i * .17, .22, s.b, console); b.rotation.x = Math.PI / 2; }
    const bubble = s.panel(.81, .42, -.08, .08, .29, s.b, console, 1); const pixel = s.box(.1, .1, .04, 0, -.3, .28, WHITE, console);
    s.label('FLUTTER', 0, .88, .1, .25, s.b); s.ticks.push((t, h) => { pixel.position.x = Math.sin(t * 1.6) * .47; bubble.scale.setScalar(1 + Math.sin(t * 1.1) * .025); console.rotation.y = -.08 + h * .2; });
  },
  'telegram-content-maker-make': s => {
    s.box(2.7, .13, .59, 0, -.66, 0, DARK); for (let i = 0; i < 7; i++) { const roller = s.cylinder(.065, .065, .56, -1.15 + i * .38, -.6, 0, s.b); roller.rotation.x = Math.PI / 2; }
    const stations = [-.96, 0, .96].map((x, i) => { const g = s.group(x, .28, -.05); s.box(.59, .66, .28, 0, 0, 0, i % 2 ? s.a : s.b, g, true); i === 0 ? s.document(0, 0, .16, WHITE, g, .28, .38) : i === 1 ? s.crystal(.18, 0, 0, .21, s.a, g) : s.plane(0, 0, .22, WHITE, g).scale.setScalar(.45); s.beam([0, -.34, 0], [0, -.65, 0], WHITE, .023, g); return g; });
    const content = s.box(.29, .25, .28, 0, -.46, .02, WHITE); s.ticks.push((t, h) => { content.position.x = -1.2 + ((t * (.22 + h * .08)) % 1) * 2.4; stations[1].rotation.y = Math.sin(t * .7) * .13; });
  },
  'persian-chatbot-dashboard': s => {
    const dashboard = s.panel(2.26, 1.37, 0, .14, -.1, s.a, s.root, 0); s.box(.76, 1.09, .09, .66, .1, .02, s.b, s.root, true);
    for (let i = 0; i < 3; i++) { s.box(.49, .18, .05, .64 + (i % 2 ? -.06 : .06), .44 - i * .31, .13, WHITE); s.label(i % 2 ? 'سلام' : 'پیام', .64, .44 - i * .31, .17, .11, DARK); }
    const bars: THREE.Mesh[] = []; for (let i = 0; i < 4; i++) bars.push(s.box(.17, .4 + i * .09, .09, -.92 + i * .31, -.17 + i * .045, .1, i % 2 ? s.a : s.b));
    s.label('فارسی', 0, -1.0, .2, .3, s.b); s.ticks.push((t, h) => { bars.forEach((bar, i) => { bar.scale.y = .85 + Math.sin(t * .9 + i) * .15; }); dashboard.rotation.y = h * .08; });
  },
  'school-grading-platform': s => {
    const report = s.document(-.56, .16, -.13, WHITE, s.root, 1.2, 1.68); report.rotation.z = .06; s.label('A+', -.6, .67, .0, .3, s.a);
    const bars: THREE.Mesh[] = []; for (let i = 0; i < 4; i++) { const h = .45 + i * .28; bars.push(s.box(.25, h, .35, .24 + i * .29, -.72 + h / 2, .19, i % 2 ? s.a : s.b)); }
    s.box(1.31, .06, .42, .68, -.75, .18, DARK); const tick = s.group(-.57, -.62, .09); s.beam([-.15, .02, 0], [-.04, -.1, 0], s.a, .036, tick); s.beam([-.04, -.1, 0], [.18, .17, 0], s.a, .036, tick);
    s.ticks.push((t, h) => { bars.forEach((bar, i) => { bar.scale.y = .9 + Math.sin(t * .5 + i) * .045 + h * .04; }); report.rotation.y = Math.sin(t * .4) * .08; });
  },
  'anonymous-teacher-peer-review': s => {
    const masks = [-.77, .77].map((x, i) => { const g = s.group(x, .22, -.05); const mask = s.orb(.45, 0, 0, 0, i ? s.b : s.a, g); mask.scale.z = .29; for (const eye of [-.16, .16]) { const socket = s.orb(.09, eye, .09, .3, DARK, g); socket.scale.multiply(new THREE.Vector3(1.4, .55, .3)); } s.path([[-.13, -.2, .31], [0, -.16, .32], [.13, -.2, .31]], WHITE, g); return g; });
    const assessment = s.document(0, -.83, .41, WHITE, s.root, .72, .58); s.beam([-.55, -.14, .05], [0, -.66, .37], s.a, .019); s.beam([.55, -.14, .05], [0, -.66, .37], s.b, .019); s.packet([-.55, -.14, .05], [0, -.66, .37], 0, s.a); s.packet([.55, -.14, .05], [0, -.66, .37], .5, s.b);
    const shield = s.ring(.28, 0, .78, -.03, WHITE); shield.scale.y = 1.13;
    s.ticks.push((t, h) => { masks.forEach((mask, i) => { mask.rotation.y = (i ? -.12 : .12) + Math.sin(t * .6 + i) * .08 + (i ? -h : h) * .1; }); assessment.rotation.y = Math.sin(t * .4) * .07; });
  },
};

const fallbackBuilder: Builder = s => {
  const idea = s.crystal(.65, 0, .16, 0, s.a, s.root, 1); const frame = s.ring(1.04, 0, .16, -.1, s.b); frame.rotation.y = .56;
  s.document(.97, -.79, .12, WHITE, s.root, .45, .58); s.ticks.push((t, h) => { idea.rotation.set(t * .12, t * .25 + h * .3, 0); frame.rotation.z = -t * .1; });
};

/** One bounded, self-contained scene for each catalog entry, suitable for a shared renderer. */
export function createProjectSculpture(id: string): ProjectSculpture {
  const profile = getProjectSculptureProfile(id); const studio = new Studio(profile);
  (builders[id] || fallbackBuilder)(studio);
  studio.root.name = `project-sculpture:${id}`;
  studio.root.userData.projectId = id;
  studio.root.userData.signature = profile.signature;
  // Preserve the intended arrangement while giving unusually wide compositions the same safe viewport.
  studio.root.updateMatrixWorld(true);
  const bounds = new THREE.Box3().setFromObject(studio.root); const dimensions = bounds.getSize(new THREE.Vector3());
  const maximum = Math.max(dimensions.x, dimensions.y, dimensions.z);
  if (maximum > 3.65) studio.root.scale.setScalar(3.65 / maximum);
  let disposed = false;
  return {
    root: studio.root,
    accent: profile.accent,
    title: profile.title,
    signature: profile.signature,
    update: (elapsed, interaction) => {
      if (disposed) return;
      const time = Number.isFinite(elapsed) ? elapsed : 0;
      const hover = THREE.MathUtils.clamp(Number.isFinite(interaction) ? interaction : 0, 0, 1);
      for (const tick of studio.ticks) tick(time, hover);
    },
    dispose: () => {
      if (disposed) return;
      disposed = true;
      for (const geometry of studio.geometries.values()) geometry.dispose();
      for (const material of studio.materials.values()) material.dispose();
      for (const texture of studio.textures) texture.dispose();
      studio.root.clear(); studio.root.removeFromParent(); studio.ticks.length = 0;
    },
  };
}

/** Used by review tooling to verify exhaustive coverage independently of the rendering layer. */
export const projectSculptureIds = Object.keys(builders);
export const projectSculptureCoverage = {
  designed: projectSculptureIds.length,
  profiles: Object.keys(projectSculptureProfiles).length,
  missingProfiles: projectSculptureIds.filter(id => !projectSculptureProfiles[id]),
  missingSculptures: Object.keys(projectSculptureProfiles).filter(id => !builders[id]),
};
