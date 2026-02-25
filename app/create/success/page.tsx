"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { PBanner, Countdown } from "@/components/Atoms";
import { C } from "@/lib/constants";

export default function CreateSuccess() {
  const router = useRouter();
  const [id] = useState("p" + Math.random().toString(36).slice(2,8));
  const url  = `privo.cash/pay/${id}`;
  const [copied, setCopied] = useState(false);
  const copy = () => { setCopied(true); setTimeout(() => setCopied(false), 2000); };

  const cells = Array.from({length:7}, (_,r) =>
    Array.from({length:7}, (_,c) => {
      if ((r<2&&c<2)||(r<2&&c>4)||(r>4&&c<2)) return "corner";
      return Math.random() > .45 ? "1" : "0";
    })
  );

  return (
    <div className="split">
      <div className="split-left">
        <div style={{ position:"absolute", top:"15%", left:"-8%", width:400, height:400, borderRadius:"50%", background:`radial-gradient(circle,${C.accent}07,transparent 65%)`, pointerEvents:"none" }}/>
        <div style={{ width:80, height:80, borderRadius:"50%", background:C.accentDim, border:`2px solid ${C.accentBrd}`, display:"flex", alignItems:"center", justifyContent:"center", marginBottom:36, animation:"glow 2s ease infinite" }}>
          <svg width={36} height={36} viewBox="0 0 24 24" fill="none"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" stroke={C.accent} strokeWidth="2" strokeLinecap="round"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" stroke={C.accent} strokeWidth="2" strokeLinecap="round"/></svg>
        </div>
        <span className="lbl" style={{ color:C.accent, display:"block", marginBottom:18 }}>PAYMENT LINK READY</span>
        <h1 className="d" style={{ fontSize:"clamp(44px,5.5vw,80px)", fontWeight:800, letterSpacing:"-.045em", color:C.text, lineHeight:.87, marginBottom:28 }}>
          Link<br/><em style={{ color:C.accent }}>Created.</em>
        </h1>
        <p style={{ color:C.muted, fontSize:16, fontWeight:300, lineHeight:1.78, maxWidth:380, marginBottom:40 }}>
          Share this link to receive payment. Payers will never see your wallet address at any point in the flow.
        </p>
        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", background:`${C.accent}08`, border:`1px solid ${C.accentBrd}`, borderRadius:14, padding:"15px 20px", marginBottom:24 }}>
          <span className="m" style={{ fontSize:14, color:C.accent, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap", flex:1, marginRight:12 }}>{url}</span>
          <button className="btn bo bsm" style={{ flexShrink:0 }} onClick={copy}>{copied ? "✓ COPIED" : "COPY"}</button>
        </div>
        <div style={{ display:"flex", gap:12 }}>
          <button className="btn bs" style={{ flex:1 }} onClick={() => router.push(`/pay/${id}`)}>Preview →</button>
          <button className="btn bp" style={{ flex:1 }} onClick={() => router.push("/create")}>Create Another</button>
        </div>
        <button onClick={() => router.push("/dashboard")}
          style={{ background:"none", border:"none", color:C.dim, cursor:"none", marginTop:16, fontSize:12, fontFamily:"'JetBrains Mono',monospace", letterSpacing:".08em", textTransform:"uppercase" }}>
          Go to Dashboard
        </button>
      </div>
      <div className="split-right" style={{ alignItems:"center" }}>
        <div style={{ width:"100%", maxWidth:400 }}>
          <div className="card" style={{ padding:40, marginBottom:20, textAlign:"center" }}>
            <div className="lbl" style={{ marginBottom:24 }}>SCAN TO PAY</div>
            <div style={{ display:"inline-block", padding:20, background:"#EEEDF4", borderRadius:16, marginBottom:28 }}>
              <svg width={160} height={160} viewBox="0 0 70 70">
                {cells.map((row,r) => row.map((cell,c) => {
                  if (cell==="corner") return null;
                  return cell==="1" ? <rect key={`${r}${c}`} x={c*10} y={r*10} width={9} height={9} rx={1.5} fill="#06060A"/> : null;
                }))}
                {[[0,0],[50,0],[0,50]].map(([x,y],i) => (
                  <g key={i}>
                    <rect x={x} y={y} width={20} height={20} rx={2.5} fill="#06060A"/>
                    <rect x={x+3} y={y+3} width={14} height={14} rx={1.5} fill="#EEEDF4"/>
                    <rect x={x+6} y={y+6} width={8} height={8} rx={1} fill="#06060A"/>
                  </g>
                ))}
              </svg>
            </div>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:14 }}>
              <div style={{ padding:"16px", background:"rgba(255,255,255,.03)", borderRadius:12, border:`1px solid ${C.border}`, textAlign:"left" }}>
                <div className="lbl" style={{ marginBottom:8 }}>AMOUNT</div>
                <div className="d" style={{ fontSize:24, fontWeight:800, letterSpacing:"-.03em", color:C.text }}>
                  500 <span style={{ fontSize:14, color:C.muted }}>USDT</span>
                </div>
              </div>
              <div style={{ padding:"16px", background:"rgba(255,255,255,.03)", borderRadius:12, border:`1px solid ${C.border}`, textAlign:"left" }}>
                <div className="lbl" style={{ marginBottom:8 }}>EXPIRES IN</div>
                <Countdown mins={15}/>
              </div>
            </div>
          </div>
          <PBanner text="Payers only see amount, token, and expiry. Your wallet address is never shown."/>
        </div>
      </div>
    </div>
  );
}
