"use client";
import { useRouter } from "next/navigation";
import { PBanner } from "@/components/Atoms";
import { C } from "@/lib/constants";

export default function PaySuccess() {
  const router = useRouter();
  const hash   = "0x" + Math.random().toString(16).slice(2,22);

  return (
    <div className="split">
      <div className="split-left">
        <div style={{ position:"absolute", top:"20%", left:"-12%", width:480, height:480, borderRadius:"50%", background:`radial-gradient(circle,${C.accent}06,transparent 65%)`, pointerEvents:"none" }}/>
        <div style={{ width:88, height:88, borderRadius:"50%", background:C.accentDim, border:`2px solid ${C.accentBrd}`, display:"flex", alignItems:"center", justifyContent:"center", marginBottom:40, animation:"glow 2s ease infinite" }}>
          <svg width={40} height={40} viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke={C.accent} strokeWidth="1.5"/><path d="M8 12l3 3 5-5" stroke={C.accent} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </div>
        <span className="lbl" style={{ color:C.accent, display:"block", marginBottom:18 }}>PAYMENT COMPLETE</span>
        <h1 className="d" style={{ fontSize:"clamp(44px,5.5vw,80px)", fontWeight:800, letterSpacing:"-.045em", color:C.text, lineHeight:.87, marginBottom:28 }}>
          Payment<br/><em style={{ color:C.accent }}>Completed.</em>
        </h1>
        <p style={{ color:C.muted, fontSize:16, fontWeight:300, lineHeight:1.78, maxWidth:380, marginBottom:48 }}>
          Sent successfully via stealth protocol. The recipient's identity was never visible to you, to chain observers, or recorded on-chain.
        </p>
        <div style={{ display:"flex", gap:12 }}>
          <button className="btn bs">View on Explorer ↗</button>
          <button className="btn bp" onClick={() => router.push("/")}>Return Home</button>
        </div>
      </div>
      <div className="split-right">
        <div style={{ maxWidth:480, width:"100%" }}>
          <span className="lbl" style={{ display:"block", marginBottom:24 }}>PAYMENT RECEIPT</span>
          <div className="card" style={{ padding:36, marginBottom:20 }}>
            {[["Amount","500 USDT"],["Token","USDT"],["Network","Ethereum"],["TX Hash",hash.slice(0,24)+"…"],["Privacy","Stealth · Unlinkable"]].map(([k,v]) => (
              <div key={k} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"14px 0", borderBottom:`1px solid ${C.border}`, fontSize:14 }}>
                <span style={{ color:C.muted }}>{k}</span>
                <span className="m" style={{ color: k==="Privacy"?C.accent:C.text, maxWidth:"56%", textAlign:"right", wordBreak:"break-all" }}>{v}</span>
              </div>
            ))}
          </div>
          <PBanner text="Transaction routed via stealth addressing. No wallet linkage recorded on-chain."/>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12, marginTop:16 }}>
            {[["STATUS","Confirmed ✓",C.ok],["BLOCK","#21,450,844",""]].map(([l,v,c]) => (
              <div key={l} style={{ padding:"16px 20px", background:"rgba(255,255,255,.025)", borderRadius:14, border:`1px solid ${C.border}` }}>
                <div className="lbl" style={{ marginBottom:8 }}>{l}</div>
                <div className="m" style={{ fontSize:16, fontWeight:700, color:c||C.text }}>{v}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
