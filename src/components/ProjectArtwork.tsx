import { useSiteText } from '../lib/useSiteText';
import {
  Asterisk,
  LockKeyhole,
  ArrowUpRight,
  Radio,
  ShieldCheck,
} from 'lucide-react';
export default function ProjectArtwork({ id }: { id: string }) {
  const l = useSiteText();
  if (id === 'pimx-moji')
    return (
      <div className="work-art art-moji" aria-hidden="true">
        <div className="art-topbar">
          <span>pimx_moji</span>
          <span>{l("CREATE SOMETHING WEIRD ↗")}</span>
        </div>
        <div className="moji-face">
          <span className="moji-eye" />
          <span className="moji-eye" />
          <span className="moji-mouth" />
        </div>
        <span className="moji-asterisk">✳</span>
        <div className="moji-type">
          {l("MAKE")}<br />
          <i>{l("SOME")}</i>
          <br />
          NOISE.
        </div>
        <div className="moji-bottom">
          <span>{l("ASCII ART. UNLIMITED EXPRESSION.")}</span>
          <ArrowUpRight size={28} />
        </div>
      </div>
    );
  if (id === 'pimx-node')
    return (
      <div className="work-art art-node" aria-hidden="true">
        <div className="art-topbar">
          <span>
            <Radio size={14} /> PIMX_NODE
          </span>
          <span>{l("PEER TO PEER")}</span>
        </div>
        <div className="node-orbits">
          <span />
          <span />
          <span />
          <span />
        </div>
        <div className="node-center">
          <Asterisk strokeWidth={1.2} />
        </div>
        <span className="node-endpoint endpoint-one" />
        <span className="node-endpoint endpoint-two" />
        <div className="node-type">
          {l("Closer.")}<br />
          <i>{l("Without the cloud.")}</i>
        </div>
        <div className="node-bottom">
          <span>
            {l("DIRECT CONNECTION")}<br />
            {l("WebRTC / SERVERLESS")}</span>
          <span className="node-status">
            <span />
            {l("CONNECTED")}</span>
        </div>
      </div>
    );
  return (
    <div className="work-art art-veil" aria-hidden="true">
      <div className="art-topbar">
        <span>
          <LockKeyhole size={14} /> PIMX_VEIL
        </span>
        <span>{l("LOCAL. PRIVATE. YOURS.")}</span>
      </div>
      <div className="veil-visual">
        <div className="veil-glass pane-one" />
        <div className="veil-glass pane-two" />
        <div className="veil-glass pane-three">
          <ShieldCheck size={56} strokeWidth={0.8} />
        </div>
        <div className="veil-glass pane-four" />
      </div>
      <div className="veil-type">
        {l("Invisible.")}<br />
        <i>{l("By intention.")}</i>
      </div>
      <div className="veil-bottom">
        <span>{l("ZERO KNOWLEDGE / AES-GCM 256")}</span>
        <span>{l("⌁ ENCRYPTED")}</span>
      </div>
    </div>
  );
}
