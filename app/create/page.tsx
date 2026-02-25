"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ShieldSVG, PBanner, ChainPills, TokenSelect, ExpiryPills, Spin } from "@/components/Atoms";
import { useWallet } from "@/lib/wallet-context";
import { C } from "@/lib/constants";

interface Form { amount: string; token: string; chain: string; expiry: string; note: string; }

export default function CreatePage() {
  const router = useRouter();
  const { wallet, openModal } = useWallet();
  const [form, setForm] = useState<Form>({ amount:"", token:"USDT", chain:"ETH", expiry:"15m", note:"" });
  const [errs, setErrs] = useState<Partial<Form>>({});
  const [loading, setLoading] = useState(false);
  const set = (k: keyof Form, v: string) => { setForm(f=>({...f,[k]:v})); setErrs(e=>({...e,[k]:""})); };

  const go = () => {
    if (!wallet) { openModal(); return; }
    if (!form.amount || isNaN(+form.amount) || +form.amount <= 0) { setErrs({ amount:"Enter a valid amount" }); return; }
    setLoading(true);
    setTimeout(() => { setLoading(false); router.push("/create/success"); }, 1900);
  };

  return (
    <div className="split">
      <div className="split-left">
        <div style={{ position:"absolute", bottom:"20%", right:"-12%", width:380, height:380, borderRadius:"50%", background:`radial-gradient(circle,${C.accent}07,transparent 65%)`, pointerEvents:"none" }}/>
        <span className="lbl" style={{ color:C.accent, display:"block", marginBottom:18 }}>STEALTH PAYMENT LINK</span>
        <h1 className="d" style={{ fontSize:"clamp(44px,5.5vw,82px)", fontWeight:800, letterSpacing:"-.045em", color:C.text, lineHeight:.87, marginBottom:28 }}>
          Create a<br/><em style={{ color:C.accent }}>Private Link.</em>
        </h1>
        <p style={{ color:C.muted, fontSize:16, fontWeight:300, lineHeight:1.78, maxWidth:400, marginBottom:52 }}>
          Generate a shareable payment URL. Anyone can pay you through it — without ever seeing your wallet address.
        </p>
        {[
          { icon:"🔗", t:"Shareable URL",        d:"privo.cash/pay/{id} — share anywhere"  },
          { icon:"⏱",  t:"Auto-expiring",        d:"Disables after 10m, 15m, 30m or 1h"   },
          { icon:"🔒", t:"Zero wallet exposure", d:"Payer never sees your primary address"  },
          { icon:"📱", t:"QR code included",     d:"Scan-to-pay for any wallet app"         },
        ].map(f => (
          <div key={f.t} style={{ display:"flex", alignItems:"flex-start", gap:16, padding:"16px 20px", background:"rgba(255,255,255,.025)", borderRadius:14, border:`1px solid ${C.border}`, marginBottom:12 }}>
            <span style={{ fontSize:19, lineHeight:1, flexShrink:0 }}>{f.icon}</span>
            <div>
              <div style={{ fontWeight:600, fontSize:14, color:C.text, marginBottom:3 }}>{f.t}</div>
              <div style={{ fontSize:12, color:C.dim }}>{f.d}</div>
            </div>
          </div>
        ))}
      </div>
      <div className="split-right">
        <div style={{ maxWidth:480, width:"100%" }}>
          <div className="card" style={{ padding:44 }}>
            <div style={{ display:"flex", flexDirection:"column", gap:24 }}>
              <div>
                <label className="lbl" style={{ display:"block", marginBottom:10 }}>Amount</label>
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
                <label className="lbl" style={{ display:"block", marginBottom:10 }}>Link Expires In</label>
                <ExpiryPills value={form.expiry} onChange={v=>set("expiry",v)}/>
              </div>
              <div>
                <label className="lbl" style={{ display:"block", marginBottom:10 }}>Note (optional)</label>
                <input className="inp" placeholder="Invoice #001, design services…" value={form.note} onChange={e=>set("note",e.target.value)}/>
              </div>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"16px 20px", background:`${C.accent}06`, border:`1px solid ${C.accent}20`, borderRadius:14 }}>
                <div style={{ display:"flex", alignItems:"center", gap:12 }}>
                  <ShieldSVG sz={20}/>
                  <div>
                    <div style={{ fontWeight:600, fontSize:14, color:C.text }}>Stealth Settlement</div>
                    <div style={{ fontSize:12, color:C.muted }}>Wallet address hidden from all payers</div>
                  </div>
                </div>
                <div style={{ width:46, height:26, borderRadius:13, background:C.accent, position:"relative", flexShrink:0 }}>
                  <div style={{ position:"absolute", right:3, top:3, width:20, height:20, borderRadius:"50%", background:"#fff" }}/>
                </div>
              </div>
              <button className="btn bp" style={{ width:"100%", padding:"17px", fontSize:15 }} onClick={go}>
                {loading ? <><Spin/> Generating…</> : <><ShieldSVG sz={17} col="#fff"/>{wallet ? "Create PayLink" : "Connect Wallet"}</>}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
