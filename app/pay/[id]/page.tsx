"use client";
import { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { Logo, ShieldSVG, PBanner, Spin, Countdown } from "@/components/Atoms";
import { useWallet } from "@/lib/wallet-context";
import { C } from "@/lib/constants";

export default function PayLinkPage() {
  const router   = useRouter();
  const params   = useParams();
  const linkId   = params?.id as string;
  const { wallet, openModal } = useWallet();

  // Demo: treat IDs starting with 'e' as expired
  const expired = linkId?.startsWith("e") ?? false;

  const [step, setStep] = useState<"ready"|"pending"|"done">("ready");

  const pay = () => {
    if (!wallet) { openModal(); return; }
    setStep("pending");
    setTimeout(() => setStep("done"), 2600);
    setTimeout(() => router.push("/pay/success"), 3800);
  };

  return (
    <div className="split">
      {/* LEFT — amount context */}
      <div className="split-left">
        <div style={{ position:"absolute", top:"25%", left:"-12%", width:420, height:420, borderRadius:"50%", background:`radial-gradient(circle,${C.accent}07,transparent 65%)`, pointerEvents:"none" }}/>
        <div style={{ marginBottom:40 }}><Logo sz={22}/></div>
        <span className="lbl" style={{ color:C.accent, display:"block", marginBottom:18 }}>PAYMENT REQUEST</span>
        <div className="d" style={{ fontSize:"clamp(64px,9vw,128px)", fontWeight:800, letterSpacing:"-.065em", color:C.text, lineHeight:.82, marginBottom:12 }}>500</div>
        <div className="m" style={{ fontSize:20, color:C.accent, marginBottom:44 }}>USDT · ETH</div>
        {!expired ? (
          <div style={{ background:"rgba(255,255,255,.04)", borderRadius:16, padding:"24px 28px", marginBottom:36 }}>
            <div className="lbl" style={{ marginBottom:12 }}>EXPIRES IN</div>
            <Countdown mins={14}/>
          </div>
        ) : (
          <div style={{ background:`${C.err}0A`, border:`1px solid ${C.err}30`, borderRadius:16, padding:"24px 28px", marginBottom:36 }}>
            <div style={{ fontSize:28, marginBottom:10 }}>⏱</div>
            <div style={{ fontWeight:700, color:C.err, fontSize:18, marginBottom:6 }}>Link Expired</div>
            <div style={{ color:C.muted, fontSize:14, lineHeight:1.65 }}>This payment link is no longer active. Please request a new one.</div>
          </div>
        )}
        <div className="m lbl" style={{ display:"flex", alignItems:"center", gap:8 }}>
          <span>🔒</span> RECIPIENT WALLET HIDDEN BY STEALTH PROTOCOL
        </div>
      </div>

      {/* RIGHT — pay form */}
      <div className="split-right">
        <div style={{ maxWidth:440, width:"100%" }}>
          {step === "ready" && (
            <div className="card" style={{ padding:44 }}>
              <PBanner text="Recipient wallet is protected by stealth addressing. You pay without exposing their identity."/>
              <div style={{ margin:"32px 0", background:"rgba(255,255,255,.03)", borderRadius:14, border:`1px solid ${C.border}`, overflow:"hidden" }}>
                {[["You pay","500 USDT"],["Network","Ethereum"],["Recipient","Hidden (stealth)"],["Settlement","Instant"],["Privacy","Stealth · Unlinkable"]].map(([k,v]) => (
                  <div key={k} style={{ display:"flex", justifyContent:"space-between", padding:"12px 18px", borderBottom:`1px solid ${C.border}`, fontSize:14 }}>
                    <span style={{ color:C.muted }}>{k}</span>
                    <span className="m" style={{ color: k==="Recipient"?C.dim : k==="Privacy"?C.accent : C.text }}>{v}</span>
                  </div>
                ))}
              </div>
              <button className="btn bp" style={{ width:"100%", padding:"18px", fontSize:16, opacity: expired ? .45 : 1, pointerEvents: expired ? "none" : "auto" }} onClick={pay}>
                <ShieldSVG sz={18} col="#fff"/>
                {wallet ? "Pay Now" : "Connect Wallet to Pay"}
              </button>
              <p style={{ textAlign:"center", color:C.dim, fontSize:11, marginTop:16, fontFamily:"'JetBrains Mono',monospace" }}>
                THIS IS A FINAL TRANSACTION · CANNOT BE REVERSED
              </p>
            </div>
          )}
          {step === "pending" && (
            <div className="card" style={{ padding:52, textAlign:"center" }}>
              <div style={{ width:80, height:80, borderRadius:"50%", margin:"0 auto 28px", background:C.accentDim, border:`2px solid ${C.accentBrd}`, display:"flex", alignItems:"center", justifyContent:"center", animation:"glow 1.5s ease infinite" }}><Spin/></div>
              <h3 className="d" style={{ fontSize:32, fontWeight:700, letterSpacing:"-.03em", color:C.text, marginBottom:12 }}>Broadcasting…</h3>
              <p style={{ color:C.muted, fontSize:15, lineHeight:1.65, marginBottom:28 }}>Deriving stealth address and submitting to network.</p>
              <div className="sb"/>
            </div>
          )}
          {step === "done" && (
            <div className="card" style={{ padding:52, textAlign:"center" }}>
              <div style={{ width:80, height:80, borderRadius:"50%", margin:"0 auto 24px", background:C.accentDim, border:`2px solid ${C.accentBrd}`, display:"flex", alignItems:"center", justifyContent:"center" }}>
                <svg width={36} height={36} viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke={C.accent} strokeWidth="1.5"/><path d="M8 12l3 3 5-5" stroke={C.accent} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </div>
              <h3 className="d" style={{ fontSize:32, fontWeight:700, letterSpacing:"-.03em", color:C.accent, marginBottom:8 }}>Done!</h3>
              <p style={{ color:C.muted }}>Redirecting to confirmation…</p>
            </div>
          )}
          <div style={{ textAlign:"center", marginTop:20 }}>
            <span className="m lbl">SECURED BY PRIVO CASH · ERC-5564 STEALTH PROTOCOL</span>
          </div>
        </div>
      </div>
    </div>
  );
}
