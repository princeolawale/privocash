"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ShieldSVG, PBanner, ChainPills, TokenSelect, Spin, Arr } from "@/components/Atoms";
import { useWallet } from "@/lib/wallet-context";
import { C, TOKENS } from "@/lib/constants";

interface Form { amount: string; token: string; chain: string; recipient: string; }

export default function SendPage() {
  const router = useRouter();
  const { wallet, openModal } = useWallet();
  const [form, setForm] = useState<Form>({ amount:"", token:"USDT", chain:"ETH", recipient:"" });
  const [errs, setErrs] = useState<Partial<Form>>({});
  const [modal, setModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const set = (k: keyof Form, v: string) => { setForm(f=>({...f,[k]:v})); setErrs(e=>({...e,[k]:""})); };

  const validate = () => {
    const e: Partial<Form> = {};
    if (!form.amount || isNaN(+form.amount) || +form.amount <= 0) e.amount = "Enter a valid amount";
    if (!form.recipient || form.recipient.length < 10)           e.recipient = "Enter a valid wallet address";
    setErrs(e); return !Object.keys(e).length;
  };

  const go = () => { if (!wallet) { openModal(); return; } if (validate()) setModal(true); };
  const confirm = () => {
    setLoading(true);
    setTimeout(() => { setLoading(false); setModal(false); router.push("/send/success"); }, 2300);
  };

  return (
    <>
      <div className="split">
        {/* LEFT */}
        <div className="split-left">
          <div style={{ position:"absolute", top:"30%", left:"-12%", width:400, height:400, borderRadius:"50%", background:`radial-gradient(circle,${C.accent}08,transparent 65%)`, pointerEvents:"none" }}/>
          <span className="lbl" style={{ color:C.accent, display:"block", marginBottom:18, animation:"fu .6s ease both" }}>STEALTH TRANSFER</span>
          <h1 className="d" style={{ fontSize:"clamp(44px,5.5vw,82px)", fontWeight:800, letterSpacing:"-.045em", color:C.text, lineHeight:.87, marginBottom:28, animation:"fu .7s ease both" }}>
            Pay<br/><em style={{ color:C.accent }}>Privately.</em>
          </h1>
          <p style={{ color:C.muted, fontSize:16, fontWeight:300, lineHeight:1.78, maxWidth:400, marginBottom:52 }}>
            Send crypto to any wallet. Recipient's primary address is never exposed — on-chain or anywhere else.
          </p>
          {[
            { n:"01", t:"Connect wallet",          d:"No account or email required"    },
            { n:"02", t:"Enter amount & recipient", d:"Stealth address auto-derived"    },
            { n:"03", t:"Confirm transaction",      d:"Funds go direct — zero escrow"   },
          ].map((s,i) => (
            <div key={i} style={{ display:"flex", gap:20, padding:"20px 0", borderBottom:`1px solid ${C.border}` }}>
              <span className="m lbl" style={{ color:C.accentBrd, width:28, flexShrink:0, paddingTop:2 }}>{s.n}</span>
              <div>
                <div style={{ fontWeight:600, fontSize:14, color:C.text, marginBottom:4 }}>{s.t}</div>
                <div style={{ fontSize:13, color:C.dim }}>{s.d}</div>
              </div>
            </div>
          ))}
          <div style={{ display:"flex", gap:40, marginTop:48 }}>
            {[["0.3%","Fee"],["Instant","Settlement"],["Non-custodial","Always"]].map(([v,l]) => (
              <div key={l}>
                <div className="d" style={{ fontSize:22, fontWeight:700, color:C.accent, letterSpacing:"-.03em" }}>{v}</div>
                <div className="lbl" style={{ marginTop:5 }}>{l}</div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT */}
        <div className="split-right">
          <div style={{ maxWidth:480, width:"100%" }}>
            <div className="card" style={{ padding:44, marginBottom:16 }}>
              <div style={{ display:"flex", flexDirection:"column", gap:24 }}>
                <div>
                  <label className="lbl" style={{ display:"block", marginBottom:10 }}>Amount & Token</label>
                  <div style={{ display:"flex", gap:10 }}>
                    <div style={{ flex:1 }}>
                      <input className="inp" type="number" placeholder="0.00" value={form.amount} onChange={e=>set("amount",e.target.value)} style={errs.amount ? {borderColor:C.err} : {}}/>
                      {errs.amount && <p style={{ color:C.err, fontSize:12, marginTop:6 }}>{errs.amount}</p>}
                    </div>
                    <TokenSelect value={form.token} onChange={v=>set("token",v)}/>
                  </div>
                </div>
                <div>
                  <label className="lbl" style={{ display:"block", marginBottom:10 }}>Network</label>
                  <ChainPills value={form.chain} onChange={v=>set("chain",v)}/>
                </div>
                <div>
                  <label className="lbl" style={{ display:"block", marginBottom:10 }}>Recipient Wallet Address</label>
                  <input className="inp" placeholder="0x… or ENS name" value={form.recipient} onChange={e=>set("recipient",e.target.value)} style={errs.recipient ? {borderColor:C.err} : {}}/>
                  {errs.recipient && <p style={{ color:C.err, fontSize:12, marginTop:6 }}>{errs.recipient}</p>}
                  <p style={{ fontSize:11, color:C.accent, marginTop:8, display:"flex", alignItems:"center", gap:6, fontFamily:"'JetBrains Mono',monospace" }}>
                    🔒 Used for stealth key derivation only — never stored
                  </p>
                </div>
                <PBanner text="This payment uses stealth addressing. Recipient wallet is not exposed to chain observers or the sender."/>
                {wallet && (
                  <div style={{ display:"flex", justifyContent:"space-between", fontSize:13, color:C.muted, paddingTop:12, borderTop:`1px solid ${C.border}` }}>
                    <span>Available balance</span>
                    <span className="m" style={{ color:C.text }}>1,842.50 {form.token}</span>
                  </div>
                )}
                <button className="btn bp" style={{ width:"100%", padding:"17px", fontSize:15 }} onClick={go}>
                  <ShieldSVG sz={17} col="#fff"/>
                  {wallet ? "Pay Privately" : "Connect Wallet to Pay"}
                </button>
              </div>
            </div>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
              {[["PROTOCOL FEE","0.3%",""],["SETTLEMENT","Instant",C.ok]].map(([l,v,c]) => (
                <div key={l} style={{ padding:"16px 20px", background:"rgba(255,255,255,.025)", borderRadius:14, border:`1px solid ${C.border}` }}>
                  <div className="lbl" style={{ marginBottom:8 }}>{l}</div>
                  <div className="m" style={{ fontSize:20, fontWeight:700, color:c||C.text }}>{v}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Confirm Modal */}
      {modal && (
        <div style={{ position:"fixed", inset:0, zIndex:2000, background:"rgba(6,6,10,.9)", backdropFilter:"blur(20px)", display:"flex", alignItems:"center", justifyContent:"center" }}
          onClick={!loading ? ()=>setModal(false) : undefined}>
          <div className="card" style={{ padding:"44px 40px", width:460, animation:"pin .3s ease both" }} onClick={e=>e.stopPropagation()}>
            <div style={{ textAlign:"center", marginBottom:32 }}>
              <div style={{ width:76, height:76, borderRadius:"50%", margin:"0 auto 20px", background:C.accentDim, border:`2px solid ${C.accentBrd}`, display:"flex", alignItems:"center", justifyContent:"center", animation: loading ? "glow 1.5s ease infinite" : "none" }}>
                {loading ? <Spin/> : <ShieldSVG sz={34}/>}
              </div>
              <h3 className="d" style={{ fontSize:28, fontWeight:700, letterSpacing:"-.03em", color:C.text }}>
                {loading ? "Sending…" : "Confirm Transaction"}
              </h3>
            </div>
            {!loading && (
              <>
                <div style={{ background:"rgba(255,255,255,.03)", borderRadius:14, padding:20, marginBottom:24 }}>
                  {[["Amount",`${form.amount||"—"} ${form.token}`],["Network",form.chain],["Stealth Address","Auto-derived (hidden)"],["Fee","0.3%"]].map(([k,v]) => (
                    <div key={k} style={{ display:"flex", justifyContent:"space-between", padding:"10px 0", borderBottom:`1px solid ${C.border}`, fontSize:14 }}>
                      <span style={{ color:C.muted }}>{k}</span>
                      <span className="m" style={{ color: k==="Stealth Address" ? C.dim : C.text }}>{v}</span>
                    </div>
                  ))}
                </div>
                <PBanner text="Recipient's wallet is protected by stealth protocol."/>
                <div style={{ display:"flex", gap:12, marginTop:24 }}>
                  <button className="btn bs" style={{ flex:1 }} onClick={()=>setModal(false)}>Cancel</button>
                  <button className="btn bp" style={{ flex:2 }} onClick={confirm}>Confirm & Send</button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
