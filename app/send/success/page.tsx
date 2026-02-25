"use client";
import { useRouter } from "next/navigation";
import { ShieldSVG, PBanner } from "@/components/Atoms";
import { C } from "@/lib/constants";

export default function SendSuccess() {
  const router = useRouter();
  const hash    = "0x" + Math.random().toString(16).slice(2,20);
  const stealth = "0x" + Math.random().toString(16).slice(2,14);

  return (
    <div className="split">
      <div className="split-left">
        <div style={{ position:"absolute", top:"20%", left:"-12%", width:480, height:480, borderRadius:"50%", background:`radial-gradient(circle,${C.accent}06,transparent 65%)`, pointerEvents:"none" }}/>
        <div style={{ width:88, height:88, borderRadius:"50%", background:C.accentDim, border:`2px solid ${C.accentBrd}`, display:"flex", alignItems:"center", justifyContent:"center", marginBottom:40, animation:"glow 2s ease infinite" }}>
          <svg width={40} height={40} viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke={C.accent} strokeWidth="1.5"/><path d="M8 12l3 3 5-5" stroke={C.accent} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </div>
        <span className="lbl" style={{ color:C.accent, display:"block", marginBottom:18 }}>TRANSACTION COMPLETE</span>
        <h1 className="d" style={{ fontSize:"clamp(44px,5.5vw,80px)", fontWeight:800, letterSpacing:"-.045em", color:C.text, lineHeight:.87, marginBottom:28 }}>
          Payment Sent<br/><em style={{ color:C.accent }}>Successfully.</em>
        </h1>
        <p style={{ color:C.muted, fontSize:16, fontWeight:300, lineHeight:1.78, maxWidth:380, marginBottom:48 }}>
          Funds routed to a one-time stealth address. The recipient's primary wallet was never exposed — to you, to observers, or recorded on-chain.
        </p>
        <div style={{ display:"flex", gap:12 }}>
          <button className="btn bs" onClick={() => router.push("/send")}>Send Another</button>
          <button className="btn bp" onClick={() => router.push("/")}>← Home</button>
        </div>
      </div>
      <div className="split-right">
        <div style={{ maxWidth:480, width:"100%" }}>
          <span className="lbl" style={{ display:"block", marginBottom:24 }}>TRANSACTION RECEIPT</span>
          <div className="card" style={{ padding:36, marginBottom:20 }}>
            {[["Amount","500 USDT"],["Token","USDT"],["Network","Ethereum"],["TX Hash",hash.slice(0,20)+"…"],["Stealth Address",stealth+"…"],["Privacy Level","Stealth · Unlinkable"]].map(([k,v]) => (
              <div key={k} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"14px 0", borderBottom:`1px solid ${C.border}`, fontSize:14 }}>
                <span style={{ color:C.muted }}>{k}</span>
                <span className="m" style={{ color: k==="Privacy Level"?C.accent : k==="Stealth Address"?C.dim : C.text, maxWidth:"56%", textAlign:"right", wordBreak:"break-all" }}>{v}</span>
              </div>
            ))}
          </div>
          <PBanner text="Stealth address is mathematically derived. No one can link it back to the recipient's primary wallet."/>
          <button style={{ width:"100%", background:"none", border:`1px solid ${C.border}`, color:C.muted, cursor:"none", marginTop:14, fontSize:12, fontFamily:"'JetBrains Mono',monospace", padding:"13px", borderRadius:12, letterSpacing:".08em", transition:"all .18s" }}
            onMouseEnter={e=>{(e.currentTarget as HTMLElement).style.borderColor=C.borderHov;(e.currentTarget as HTMLElement).style.color=C.text;}}
            onMouseLeave={e=>{(e.currentTarget as HTMLElement).style.borderColor=C.border;(e.currentTarget as HTMLElement).style.color=C.muted;}}>
            VIEW ON EXPLORER ↗
          </button>
        </div>
      </div>
    </div>
  );
}
