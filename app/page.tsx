"use client";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ShieldSVG, Logo, Arr, PBanner } from "@/components/Atoms";
import { useReveal, useCounter } from "@/lib/hooks";
import { useWallet } from "@/lib/wallet-context";
import { C, F } from "@/lib/constants";

// ── Intro Page ─────────────────────────────────────────────────
function IntroPage({ onEnter }: { onEnter: () => void }) {
  const [zooming, setZooming] = useState(false);
  const go = () => { setZooming(true); setTimeout(onEnter, 820); };

  return (
    <div style={{ position:"fixed", inset:0, zIndex:10, display:"flex", alignItems:"center", justifyContent:"center", animation: zooming ? "fall .82s cubic-bezier(.4,0,.6,1) forwards" : "none", transformOrigin:"center center" }}>
      <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:44, textAlign:"center" }}>
        <div className="pbadge" style={{ animation:"fu .7s ease both", animationDelay:".5s", opacity:0 }}>
          <span style={{ width:6, height:6, borderRadius:"50%", background:C.accent, animation:"pulse 2s infinite", display:"inline-block" }}/>
          STEALTH ADDRESS PROTOCOL · LIVE
        </div>
        <div style={{ animation:"fu .9s ease both", animationDelay:".65s", opacity:0 }}>
          <h1 className="d" style={{ fontSize:"clamp(68px,13vw,172px)", fontWeight:800, letterSpacing:"-.055em", lineHeight:.82, color:C.text }}>
            Privo<br/><span style={{ color:C.accent }}>Cash</span>
          </h1>
        </div>
        <p style={{ fontSize:17, color:C.muted, maxWidth:400, lineHeight:1.72, fontWeight:300, animation:"fu .8s ease both", animationDelay:".82s", opacity:0 }}>
          Privacy infrastructure for crypto payments.<br/>Non-custodial. Unlinkable. Instant.
        </p>
        <button className="btn bp"
          onClick={go}
          style={{ padding:"20px 76px", fontSize:17, borderRadius:14, letterSpacing:".03em", animation:"fu .8s ease both", animationDelay:"1.05s", opacity:0 }}
          onMouseEnter={e => (e.currentTarget as HTMLElement).style.boxShadow=`0 0 88px ${C.accent}60`}
          onMouseLeave={e => (e.currentTarget as HTMLElement).style.boxShadow="none"}>
          Get Started <Arr sz={18}/>
        </button>
      </div>
      <span className="m lbl" style={{ position:"absolute", bottom:44, left:52, animation:"fi 1s ease both", animationDelay:"1.3s", opacity:0 }}>ERC-5564 · EVM COMPATIBLE</span>
      <span className="m lbl" style={{ position:"absolute", bottom:44, right:52, animation:"fi 1s ease both", animationDelay:"1.5s", opacity:0 }}>NON-CUSTODIAL PROTOCOL</span>
    </div>
  );
}

// ── Stat Counter ───────────────────────────────────────────────
function StatNum({ val, suf="", pre="" }: { val: number; suf?: string; pre?: string }) {
  const [active, setActive] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const ob = new IntersectionObserver(([e]) => { if (e.isIntersecting) setActive(true); });
    if (ref.current) ob.observe(ref.current);
    return () => ob.disconnect();
  }, []);
  const n = useCounter(val, active);
  return <div ref={ref}>{pre}{n % 1 === 0 ? Math.round(n).toLocaleString() : n}{suf}</div>;
}

// ── Landing Page ───────────────────────────────────────────────
function LandingPage() {
  const router = useRouter();
  const { wallet, openModal } = useWallet();
  const nav = (to: string) => wallet ? router.push(to) : openModal();

  const r1 = useReveal(0);
  const r2 = useReveal(80);
  const r3 = useReveal(160);
  const r4 = useReveal(0);
  const r5 = useReveal(0);
  const r6 = useReveal(0);
  const r7 = useReveal(0);

  return (
    <div style={{ animation:"pin .65s ease both" }}>

      {/* ── HERO ── */}
      <section style={{ minHeight:"100vh", display:"flex", flexDirection:"column", justifyContent:"center", padding:"148px 64px 100px", position:"relative" }}>
        <div style={{ position:"absolute", top:"22%", left:"6%", width:700, height:700, borderRadius:"50%", background:`radial-gradient(circle,${C.accent}07,transparent 64%)`, pointerEvents:"none" }}/>
        <div className="rv" ref={r1 as React.RefObject<HTMLDivElement>} style={{ marginBottom:36 }}>
          <div style={{ display:"flex", alignItems:"center", gap:14 }}>
            <span className="lbl" style={{ color:C.accent }}>Privacy Infrastructure · ERC-5564</span>
            <div style={{ width:40, height:1, background:C.accentBrd }}/>
            <span className="lbl">Non-Custodial</span>
          </div>
        </div>
        <h1 className="d rv" ref={r2 as React.RefObject<HTMLHeadingElement>}
          style={{ fontSize:"clamp(60px,9.5vw,132px)", fontWeight:800, letterSpacing:"-.05em", lineHeight:.86, color:C.text, maxWidth:"78vw", marginBottom:44 }}>
          The Privacy<br/>Layer for<br/>
          <em style={{ fontStyle:"italic", color:C.accent }}>Crypto Payments.</em>
        </h1>
        <div style={{ display:"flex", justifyContent:"flex-end" }}>
          <div style={{ maxWidth:460 }}>
            <p className="rv" ref={r3 as React.RefObject<HTMLParagraphElement>}
              style={{ fontSize:18, color:C.muted, lineHeight:1.78, fontWeight:300, marginBottom:44 }}>
              Send and receive cryptocurrency without exposing your wallet address. Powered by stealth address protocol — unlinkable, non-custodial, instant.
            </p>
            <div style={{ display:"flex", gap:14, flexWrap:"wrap" }}>
              <button className="btn bp" onClick={() => nav("/send")}>
                <ShieldSVG sz={17} col="#fff"/> Pay Privately <Arr/>
              </button>
              <button className="btn bs" onClick={() => nav("/create")}>
                Create PayLink
              </button>
            </div>
          </div>
        </div>
        <div style={{ position:"absolute", bottom:48, left:64, right:64, display:"flex", justifyContent:"space-between", alignItems:"flex-end" }}>
          <div><div className="lbl" style={{ color:C.accent, marginBottom:6 }}>Network Active</div><div className="m" style={{ fontSize:11, color:C.dim }}>Block #21,450,812</div></div>
          <div style={{ display:"flex", alignItems:"center", gap:8 }}>
            <span style={{ width:6, height:6, borderRadius:"50%", background:C.ok, animation:"pulse 2s infinite", display:"inline-block" }}/>
            <span className="m" style={{ fontSize:11, color:C.muted }}>All systems operational</span>
          </div>
        </div>
      </section>

      {/* ── MARQUEE ── */}
      <div style={{ borderTop:`1px solid ${C.border}`, borderBottom:`1px solid ${C.border}`, padding:"17px 0", overflow:"hidden", background:"rgba(6,6,10,.55)" }}>
        <div className="mq"><div className="mq-i">
          {Array(10).fill(null).map((_,i) => (
            <span key={i} style={{ paddingRight:52, display:"flex", alignItems:"center", gap:52 }}>
              <span className="lbl">STEALTH ADDRESS PROTOCOL</span><span style={{ color:C.accent, fontSize:8 }}>◆</span>
              <span className="lbl">NON-CUSTODIAL</span><span style={{ color:C.accent, fontSize:8 }}>◆</span>
              <span className="lbl">UNLINKABLE PAYMENTS</span><span style={{ color:C.accent, fontSize:8 }}>◆</span>
              <span className="lbl">EVM COMPATIBLE</span><span style={{ color:C.accent, fontSize:8 }}>◆</span>
              <span className="lbl">NOT A MIXER</span><span style={{ color:C.accent, fontSize:8 }}>◆</span>
            </span>
          ))}
        </div></div>
      </div>

      {/* ── STATS ── */}
      <section style={{ padding:"0 64px" }}>
        <div className="rv" ref={r4 as React.RefObject<HTMLDivElement>}
          style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", borderTop:`1px solid ${C.border}` }}>
          {[
            { val:12.4, suf:"M+", pre:"$", label:"Volume Protected"  },
            { val:3200,  suf:"+",  pre:"",  label:"Active Merchants"  },
            { val:18,    suf:"",   pre:"",  label:"Supported Assets"  },
            { val:0.3,   suf:"%",  pre:"",  label:"Protocol Fee"      },
          ].map((st, i) => (
            <div key={i} style={{ padding:"60px 52px", borderRight: i<3 ? `1px solid ${C.border}` : "none", borderBottom:`1px solid ${C.border}` }}>
              <div className="d" style={{ fontSize:"clamp(44px,5.5vw,78px)", fontWeight:800, letterSpacing:"-.04em", color:C.text, lineHeight:1, marginBottom:14 }}>
                <StatNum {...st}/>
              </div>
              <div className="lbl">{st.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── PROBLEM vs SOLUTION ── */}
      <section style={{ padding:"120px 64px" }}>
        <div className="rv" ref={r5 as React.RefObject<HTMLDivElement>}
          style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:80, alignItems:"start" }}>
          <div>
            <span className="lbl" style={{ color:C.err, display:"block", marginBottom:18 }}>THE PROBLEM</span>
            <h2 className="d" style={{ fontSize:"clamp(36px,4vw,58px)", fontWeight:800, letterSpacing:"-.04em", color:C.text, lineHeight:.92, marginBottom:28 }}>
              Every payment<br/><em style={{ color:"rgba(238,237,244,.35)" }}>leaves a trace.</em>
            </h2>
            <p style={{ fontSize:15, lineHeight:1.82, color:C.muted, marginBottom:28, fontWeight:300 }}>
              In standard crypto payments, the recipient's wallet address is visible to the sender, recorded permanently on-chain, and linkable to every future transaction.
            </p>
            {["Anyone can track your balance history","All payments are permanently linkable","Wallet reuse exposes your full identity","No opt-out once on-chain"].map(t => (
              <div key={t} style={{ display:"flex", alignItems:"flex-start", gap:12, marginBottom:12 }}>
                <span style={{ color:C.err, fontSize:14, marginTop:2 }}>✗</span>
                <span style={{ fontSize:14, color:C.muted, lineHeight:1.65 }}>{t}</span>
              </div>
            ))}
          </div>
          <div>
            <span className="lbl" style={{ color:C.accent, display:"block", marginBottom:18 }}>THE SOLUTION</span>
            <h2 className="d" style={{ fontSize:"clamp(36px,4vw,58px)", fontWeight:800, letterSpacing:"-.04em", color:C.text, lineHeight:.92, marginBottom:28 }}>
              One-time stealth<br/><em style={{ color:C.accent }}>addresses.</em>
            </h2>
            <p style={{ fontSize:15, lineHeight:1.82, color:C.muted, marginBottom:28, fontWeight:300 }}>
              Privo Cash derives a unique one-time address for every payment — mathematically linked to the recipient, but invisible to chain observers and the sender.
            </p>
            {["Recipient's primary wallet permanently hidden","Each payment uses a fresh stealth address","Zero wallet-to-payment linkage on-chain","Non-custodial — your keys, your coins"].map(t => (
              <div key={t} style={{ display:"flex", alignItems:"flex-start", gap:12, marginBottom:12 }}>
                <span style={{ color:C.accent, fontSize:14, marginTop:2 }}>✓</span>
                <span style={{ fontSize:14, color:C.muted, lineHeight:1.65 }}>{t}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section style={{ padding:"0 64px 140px" }}>
        <div className="rv" ref={r6 as React.RefObject<HTMLDivElement>}>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-end", marginBottom:72 }}>
            <div>
              <span className="lbl" style={{ color:C.accent, display:"block", marginBottom:16 }}>HOW IT WORKS</span>
              <h2 className="d" style={{ fontSize:"clamp(40px,5vw,72px)", fontWeight:800, letterSpacing:"-.04em", color:C.text, lineHeight:.9 }}>
                Simple steps to<br/>seamless crypto<br/><em style={{ color:C.accent }}>payments.</em>
              </h2>
            </div>
            <span className="m lbl">ERC-5564 STANDARD</span>
          </div>
        </div>

        <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)" }}>
          {[
            {
              n:"1",
              icon: <svg width={28} height={28} viewBox="0 0 24 24" fill="none"><rect x="2" y="5" width="20" height="14" rx="2" stroke={C.accent} strokeWidth="1.5"/><path d="M2 10h20" stroke={C.accent} strokeWidth="1.5"/><circle cx="6" cy="15" r="1.5" fill={C.accent}/></svg>,
              title: "Connect Wallet",
              desc:  "Link your wallet — MetaMask, WalletConnect, Coinbase or Rabby. No email or registration required. We remain non-custodial at all times. Your keys never leave your device.",
              tech:  "ECDH · EVM-Compatible",
            },
            {
              n:"2",
              icon: <svg width={28} height={28} viewBox="0 0 24 24" fill="none"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" stroke={C.accent} strokeWidth="1.5" strokeLinecap="round"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" stroke={C.accent} strokeWidth="1.5" strokeLinecap="round"/></svg>,
              title: "Create or Pay",
              desc:  "Choose to send a direct stealth payment to any wallet address, or generate a shareable PayLink — a time-limited URL anyone can use to pay you, without seeing your wallet.",
              tech:  "Stealth Meta-Address",
            },
            {
              n:"3",
              icon: <svg width={28} height={28} viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke={C.accent} strokeWidth="1.5"/><path d="M8 12l3 3 5-5" stroke={C.accent} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>,
              title: "Instant Settlement",
              desc:  "Transactions confirm on-chain in seconds. If privacy mode is active, the stealth address obscures the trail. The recipient sweeps funds at their discretion — no escrow, no delays.",
              tech:  "Direct Transfer · 0 Hops",
            },
          ].map((step, i) => (
            <div key={i} className="rv"
              style={{ padding:"52px 48px", borderLeft: i>0 ? `1px solid ${C.border}` : "none", borderTop:`1px solid ${C.border}`, position:"relative", overflow:"hidden" }}>
              <div className="d" style={{ position:"absolute", top:24, right:32, fontSize:90, fontWeight:800, color:C.accentDim, lineHeight:1, userSelect:"none" }}>{step.n}</div>
              <div style={{ width:54, height:54, borderRadius:14, background:C.accentDim, border:`1px solid ${C.accentBrd}`, display:"flex", alignItems:"center", justifyContent:"center", marginBottom:28 }}>
                {step.icon}
              </div>
              <div className="m lbl" style={{ color:C.accent, marginBottom:16 }}>STEP 0{step.n}</div>
              <h3 className="d" style={{ fontSize:34, fontWeight:700, letterSpacing:"-.03em", color:C.text, marginBottom:18, lineHeight:1.05 }}>{step.title}</h3>
              <p style={{ fontSize:15, lineHeight:1.82, color:C.muted, marginBottom:28, fontWeight:300 }}>{step.desc}</p>
              <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                <span style={{ width:5, height:5, background:C.accent, borderRadius:1, display:"inline-block" }}/>
                <span className="m" style={{ fontSize:10, color:C.dim, letterSpacing:".12em" }}>{step.tech}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── TWO PRODUCTS ── */}
      <section style={{ padding:"0 64px 140px" }}>
        <div className="rv" ref={r7 as React.RefObject<HTMLDivElement>} style={{ marginBottom:72 }}>
          <span className="lbl" style={{ color:C.accent, display:"block", marginBottom:16 }}>TWO PRODUCTS</span>
          <h2 className="d" style={{ fontSize:"clamp(40px,5vw,72px)", fontWeight:800, letterSpacing:"-.04em", color:C.text, lineHeight:.9 }}>
            Two ways to<br/><em style={{ color:C.accent }}>pay privately.</em>
          </h2>
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:2 }}>
          {[
            { label:"DIRECT PAY", primary:true, title:"Wallet-to-Wallet Stealth Transfer", body:"Send crypto directly to any wallet address using the stealth protocol. Recipient's primary wallet is never exposed — not to you, not to chain observers. No escrow. No custody. Direct on-chain settlement.", points:["No account required","Zero wallet exposure","Instant on-chain finality"], cta:"Send Now", href:"/send" },
            { label:"PAYMENT LINKS", primary:false, title:"Shareable, Expiring, Private Links", body:"Create a payment request link with configurable expiry. Share it anywhere. The payer completes the transaction without ever seeing your wallet address. Built for invoicing, freelancing, e-commerce, and donations.", points:["Expires automatically","QR code included","Payer sees zero wallet info"], cta:"Create Link", href:"/create" },
          ].map((p, i) => (
            <div key={i}
              style={{ padding:"64px 56px", border:`1px solid ${C.border}`, borderLeft: i>0 ? "none" : undefined, position:"relative", overflow:"hidden", transition:"background .3s" }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.background=`${C.accent}04`}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.background="transparent"}>
              {p.primary && <div style={{ position:"absolute", top:0, left:0, width:3, height:"100%", background:C.accent }}/>}
              <div className="m lbl" style={{ color: p.primary ? C.accent : C.dim, marginBottom:24 }}>{p.label}</div>
              <h3 className="d" style={{ fontSize:"clamp(26px,2.8vw,42px)", fontWeight:700, letterSpacing:"-.035em", color:C.text, marginBottom:20, lineHeight:1.05 }}>{p.title}</h3>
              <p style={{ fontSize:15, lineHeight:1.82, color:C.muted, marginBottom:32, fontWeight:300 }}>{p.body}</p>
              {p.points.map(pt => (
                <div key={pt} style={{ display:"flex", alignItems:"center", gap:10, marginBottom:10 }}>
                  <span style={{ color:C.accent, fontSize:14 }}>✓</span>
                  <span style={{ fontSize:14, color:"rgba(238,237,244,.6)" }}>{pt}</span>
                </div>
              ))}
              <button className={`btn ${p.primary?"bp":"bs"}`} style={{ marginTop:32 }} onClick={() => nav(p.href)}>
                {p.cta} <Arr/>
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* ── WHAT STEALTH PROTECTS ── */}
      <section style={{ padding:"0 64px 140px" }}>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:24 }}>
          <div style={{ padding:"48px 52px", border:`1px solid rgba(16,185,129,.2)`, background:"rgba(16,185,129,.02)", borderRadius:20 }}>
            <div className="lbl" style={{ color:C.ok, marginBottom:20 }}>WHAT STEALTH PROTECTS</div>
            {["Recipient's primary wallet address","Address reuse across transactions","On-chain wallet-to-payment linking","Public identity association"].map(t => (
              <div key={t} style={{ display:"flex", alignItems:"flex-start", gap:14, padding:"14px 16px", background:"rgba(16,185,129,.05)", borderRadius:12, marginBottom:10 }}>
                <span style={{ color:C.ok, fontSize:16 }}>✓</span>
                <span style={{ fontSize:14, color:"rgba(238,237,244,.7)", lineHeight:1.5 }}>{t}</span>
              </div>
            ))}
          </div>
          <div style={{ padding:"48px 52px", border:`1px solid rgba(239,68,68,.15)`, background:"rgba(239,68,68,.02)", borderRadius:20 }}>
            <div className="lbl" style={{ color:C.err, marginBottom:20 }}>WHAT IT DOES NOT HIDE</div>
            <p style={{ fontSize:13, color:C.muted, lineHeight:1.65, marginBottom:20 }}>
              Privo Cash provides unlinkability — not full anonymity. Sender address, transaction amount, and transaction existence remain visible on-chain.
            </p>
            {["Sender's wallet address","Transaction amount","The fact that a transaction occurred"].map(t => (
              <div key={t} style={{ display:"flex", alignItems:"flex-start", gap:14, padding:"14px 16px", background:"rgba(239,68,68,.05)", borderRadius:12, marginBottom:10 }}>
                <span style={{ color:C.err, fontSize:16 }}>✗</span>
                <span style={{ fontSize:14, color:"rgba(238,237,244,.7)", lineHeight:1.5 }}>{t}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── COMING SOON ── */}
      <section style={{ padding:"0 64px 140px" }}>
        <div style={{ border:`1px solid ${C.border}`, borderRadius:20, padding:"56px 60px" }}>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", flexWrap:"wrap", gap:40 }}>
            <div style={{ maxWidth:480 }}>
              <div className="lbl" style={{ color:C.dim, marginBottom:16 }}>ROADMAP — COMING SOON</div>
              <h3 className="d" style={{ fontSize:"clamp(28px,3.5vw,48px)", fontWeight:700, letterSpacing:"-.04em", color:"rgba(238,237,244,.4)", lineHeight:1 }}>
                Future modules<br/><em>in development.</em>
              </h3>
              <p style={{ fontSize:14, color:C.dim, marginTop:20, lineHeight:1.7 }}>Not in scope for Phase 1. Mentioned here for roadmap visibility only.</p>
            </div>
            <div style={{ minWidth:320 }}>
              {[{ t:"Fiat On-Ramp", s:"Q2 2025" },{ t:"Fiat Off-Ramp", s:"Q3 2025" },{ t:"Cross-Chain Stealth", s:"Q4 2025" },{ t:"Direct Bank Withdrawals", s:"2026" }].map(r => (
                <div key={r.t} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"16px 0", borderBottom:`1px solid ${C.faint}` }}>
                  <span style={{ fontSize:15, color:C.dim, fontWeight:300 }}>{r.t}</span>
                  <span className="m lbl">{r.s}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section style={{ padding:"0 64px 160px", textAlign:"center" }}>
        <div style={{ display:"flex", gap:5, justifyContent:"center", marginBottom:48 }}>
          {[1,0.5,0.2].map((o,i) => <div key={i} style={{ width:5, height:5, background:C.accent, opacity:o, borderRadius:1 }}/>)}
        </div>
        <h2 className="d" style={{ fontSize:"clamp(52px,9vw,130px)", fontWeight:800, letterSpacing:"-.05em", lineHeight:.86, color:C.text, marginBottom:44 }}>
          Start Sending<br/><em style={{ fontStyle:"italic", color:C.accent }}>Privately.</em>
        </h2>
        <p style={{ fontSize:18, color:C.muted, marginBottom:52, fontWeight:300 }}>
          No account. No email. Connect wallet — done in under a minute.
        </p>
        <div style={{ display:"flex", gap:16, justifyContent:"center", flexWrap:"wrap" }}>
          <button className="btn bp" style={{ padding:"18px 56px", fontSize:16 }} onClick={() => nav("/send")}>
            <ShieldSVG sz={18} col="#fff"/> Pay Privately
          </button>
          <button className="btn bs" style={{ padding:"18px 56px", fontSize:16 }} onClick={() => nav("/create")}>
            Create a PayLink
          </button>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ borderTop:`1px solid ${C.border}`, padding:"44px 64px" }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:32 }}>
          <Logo sz={24}/>
          <div style={{ display:"flex", gap:36 }}>
            {["Protocol","Privacy Policy","Terms of Use","Docs","Contact"].map(l => (
              <span key={l} className="nl" style={{ fontSize:13 }}>{l}</span>
            ))}
          </div>
        </div>
        <hr className="dv" style={{ marginBottom:28 }}/>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
          <span className="m lbl">© 2025 PRIVO CASH — PRIVACY INFRASTRUCTURE FOR CRYPTO PAYMENTS</span>
          <span className="m lbl">NOT A MIXER · NOT CUSTODY · PRIVACY BY DESIGN</span>
        </div>
      </footer>
    </div>
  );
}

// ── Root ───────────────────────────────────────────────────────
export default function Home() {
  const [done, setDone] = useState(false);
  return done ? <LandingPage/> : <IntroPage onEnter={() => setDone(true)}/>;
}
