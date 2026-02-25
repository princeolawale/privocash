"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ShieldSVG, ChainTag, STag } from "@/components/Atoms";
import { useWallet } from "@/lib/wallet-context";
import { C, MOCK_LINKS, MOCK_SENDS } from "@/lib/constants";

type Tab = "activity" | "links" | "sends";

export default function DashboardPage() {
  const router = useRouter();
  const { wallet, openModal } = useWallet();
  const [tab, setTab]         = useState<Tab>("activity");
  const [copied, setCopied]   = useState<string|null>(null);
  const copy = (id: string)   => { setCopied(id); setTimeout(() => setCopied(null), 2000); };

  // ── Not connected ──────────────────────────────────────────────
  if (!wallet) return (
    <div className="split">
      <div className="split-left">
        <ShieldSVG sz={52}/>
        <h2 className="d" style={{ fontSize:"clamp(40px,5.5vw,70px)", fontWeight:800, letterSpacing:"-.045em", color:C.text, marginTop:28, marginBottom:18, lineHeight:.9 }}>
          Connect your<br/><em style={{ color:C.accent }}>Wallet.</em>
        </h2>
        <p style={{ color:C.muted, fontSize:16, fontWeight:300, lineHeight:1.78, maxWidth:380, marginBottom:40 }}>
          Your transaction history and payment links are tied to your wallet. No account or email needed.
        </p>
        <button className="btn bp" style={{ width:"fit-content" }} onClick={openModal}>Connect Wallet</button>
      </div>
      <div className="split-right" style={{ gap:14, justifyContent:"center" }}>
        {[
          { i:"🔒", t:"100% Non-custodial",  d:"We never hold your funds or keys"         },
          { i:"🛡",  t:"Privacy by design",   d:"All payments use stealth addressing"       },
          { i:"⚡",  t:"Instant settlement",  d:"Direct on-chain — no escrow"               },
          { i:"🔗", t:"Shareable PayLinks",   d:"Create and share in under 30 seconds"      },
        ].map(f => (
          <div key={f.t} style={{ padding:"20px 24px", background:"rgba(255,255,255,.025)", borderRadius:16, border:`1px solid ${C.border}`, display:"flex", gap:16, alignItems:"flex-start" }}>
            <span style={{ fontSize:22 }}>{f.i}</span>
            <div><div style={{ fontWeight:600, color:C.text, marginBottom:4, fontSize:14 }}>{f.t}</div><div style={{ fontSize:13, color:C.dim }}>{f.d}</div></div>
          </div>
        ))}
      </div>
    </div>
  );

  // ── Dashboard ──────────────────────────────────────────────────
  return (
    <div style={{ minHeight:"100vh", paddingTop:68, display:"grid", gridTemplateColumns:"256px 1fr", position:"relative", zIndex:3, animation:"pin .5s ease both" }}>

      {/* SIDEBAR */}
      <div style={{ borderRight:`1px solid ${C.border}`, padding:"40px 24px", display:"flex", flexDirection:"column", gap:6, position:"sticky", top:68, height:"calc(100vh - 68px)", overflowY:"auto" }}>
        <div style={{ padding:"14px 16px", background:C.accentDim, border:`1px solid ${C.accentBrd}`, borderRadius:14, marginBottom:28 }}>
          <div className="lbl" style={{ marginBottom:6 }}>CONNECTED WALLET</div>
          <div style={{ display:"flex", alignItems:"center", gap:8 }}>
            <span style={{ width:7, height:7, borderRadius:"50%", background:C.accent, animation:"pulse 2s infinite", display:"inline-block" }}/>
            <span className="m" style={{ fontSize:12, color:C.accent }}>{wallet.slice(0,8)}…{wallet.slice(-4)}</span>
          </div>
        </div>

        <div className="lbl" style={{ marginBottom:8, paddingLeft:12 }}>NAVIGATION</div>
        {([["activity","📊","Activity"],["links","🔗","Payment Links"],["sends","→","Sent Payments"]] as const).map(([id,icon,label]) => (
          <button key={id} className={`snav ${tab===id?"on":""}`}
            onClick={() => setTab(id as Tab)}
            style={{ color: tab===id ? C.accent : C.muted }}>
            <span style={{ fontSize:15 }}>{icon}</span>{label}
          </button>
        ))}

        <div style={{ flex:1 }}/>
        <div className="lbl" style={{ marginBottom:10, paddingLeft:12 }}>QUICK ACTIONS</div>
        <button className="btn bp" style={{ width:"100%", padding:"12px 14px", fontSize:13, justifyContent:"flex-start", gap:10 }} onClick={() => router.push("/send")}>
          → Send Payment
        </button>
        <button className="btn bs" style={{ width:"100%", padding:"12px 14px", fontSize:13, justifyContent:"flex-start", gap:10, marginTop:8 }} onClick={() => router.push("/create")}>
          🔗 Create Link
        </button>
      </div>

      {/* MAIN */}
      <div style={{ padding:"48px 52px", overflowY:"auto" }}>
        <div style={{ marginBottom:36 }}>
          <span className="lbl" style={{ color:C.accent, display:"block", marginBottom:10 }}>DASHBOARD</span>
          <h1 className="d" style={{ fontSize:44, fontWeight:800, letterSpacing:"-.04em", color:C.text, lineHeight:.92 }}>Privacy Overview</h1>
        </div>

        {/* Stats */}
        <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:14, marginBottom:36 }}>
          {[
            { l:"Total Sent",    v:"$8,420", s:"+23%",     up:true  },
            { l:"Active Links",  v:"2",       s:"4 total",  up:true  },
            { l:"Protected TXs", v:"31",      s:"All stealth",up:true},
            { l:"Privacy Score", v:"HIGH",    s:"Stealth on",ac:true },
          ].map((st, i) => (
            <div key={i} className="card" style={{ padding:"24px 22px" }}>
              <div className="lbl" style={{ marginBottom:12 }}>{st.l}</div>
              <div className="d" style={{ fontSize:34, fontWeight:800, letterSpacing:"-.04em", color: (st as any).ac ? C.accent : C.text, lineHeight:1 }}>{st.v}</div>
              <div className="m" style={{ fontSize:11, color: st.up ? C.ok : C.err, marginTop:8 }}>
                {st.up?"↑":"↓"} {st.s}
              </div>
            </div>
          ))}
        </div>

        {/* Section header */}
        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:18 }}>
          <h3 className="d" style={{ fontSize:22, fontWeight:700, color:C.text }}>
            {tab==="activity" ? "All Activity" : tab==="links" ? "Payment Links" : "Sent Payments"}
          </h3>
          {tab==="links" && <button className="btn bo bsm">Export CSV</button>}
        </div>

        {/* LINKS */}
        {tab==="links" && (
          <div className="card" style={{ overflow:"hidden", padding:0 }}>
            <div style={{ display:"grid", gridTemplateColumns:"2fr 130px 90px 80px 110px 150px", padding:"12px 24px", borderBottom:`1px solid ${C.faint}` }}>
              {["LINK","AMOUNT","CHAIN","VIEWS","STATUS","ACTIONS"].map(h => <span key={h} className="lbl" style={{ fontSize:10 }}>{h}</span>)}
            </div>
            {MOCK_LINKS.map((l, i) => (
              <div key={i}
                style={{ display:"grid", gridTemplateColumns:"2fr 130px 90px 80px 110px 150px", padding:"16px 24px", borderBottom:`1px solid ${C.faint}`, alignItems:"center", transition:"background .15s" }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.background="rgba(255,255,255,.025)"}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.background="transparent"}>
                <div>
                  <div style={{ fontSize:14, fontWeight:500, color:C.text }}>{l.title}</div>
                  <div className="m" style={{ fontSize:11, color:C.dim, marginTop:3 }}>privo.cash/pay/{l.id} · {l.date}</div>
                </div>
                <span className="m" style={{ fontSize:13, color:C.text }}>{l.amount}</span>
                <ChainTag chain={l.chain}/>
                <span className="m" style={{ fontSize:13, color:C.muted }}>{l.views}</span>
                <STag s={l.status}/>
                <div style={{ display:"flex", gap:7 }}>
                  <button className="btn bo" style={{ padding:"5px 11px", fontSize:11, borderRadius:7 }} onClick={()=>copy(l.id)}>
                    {copied===l.id ? "✓" : "Copy"}
                  </button>
                  <button className="btn bs" style={{ padding:"5px 11px", fontSize:11, borderRadius:7 }} onClick={()=>router.push(`/pay/${l.id}`)}>
                    View
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* SENDS */}
        {tab==="sends" && (
          <div className="card" style={{ overflow:"hidden", padding:0 }}>
            {MOCK_SENDS.map((s, i) => (
              <div key={i}
                style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"18px 24px", borderBottom:`1px solid ${C.faint}`, transition:"background .15s" }}
                onMouseEnter={e=>(e.currentTarget as HTMLElement).style.background="rgba(255,255,255,.025)"}
                onMouseLeave={e=>(e.currentTarget as HTMLElement).style.background="transparent"}>
                <div style={{ display:"flex", alignItems:"center", gap:16 }}>
                  <div style={{ width:44, height:44, borderRadius:13, background:C.accentDim, border:`1px solid ${C.accentBrd}`, display:"flex", alignItems:"center", justifyContent:"center" }}>
                    <ShieldSVG sz={19}/>
                  </div>
                  <div>
                    <div style={{ fontSize:14, fontWeight:500, color:C.text }}>Stealth Send</div>
                    <div className="m" style={{ fontSize:11, color:C.dim, marginTop:3 }}>🔒 to {s.to} · {s.date}</div>
                  </div>
                </div>
                <div style={{ display:"flex", alignItems:"center", gap:16 }}>
                  <ChainTag chain={s.chain}/>
                  <span className="m" style={{ fontSize:14, fontWeight:700, color:C.text }}>{s.amount}</span>
                  <STag s="paid"/>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ACTIVITY */}
        {tab==="activity" && (
          <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
            {[...MOCK_LINKS.map(l=>({type:"link" as const,...l})), ...MOCK_SENDS.map(s=>({type:"send" as const, status:"paid", id:"", title:"", views:0,...s}))].map((item, i) => (
              <div key={i} className="card"
                style={{ padding:"16px 22px", display:"flex", justifyContent:"space-between", alignItems:"center", animation:"su .4s ease both", animationDelay:`${i*.06}s` }}>
                <div style={{ display:"flex", alignItems:"center", gap:14 }}>
                  <div style={{ width:42, height:42, borderRadius:12, background: item.type==="link" ? C.accentDim : "rgba(255,255,255,.05)", border:`1px solid ${item.type==="link" ? C.accentBrd : C.border}`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:17 }}>
                    {item.type==="link" ? "🔗" : "→"}
                  </div>
                  <div>
                    <div style={{ fontSize:14, fontWeight:500, color:C.text }}>
                      {item.type==="link" ? item.title : "Stealth Send"}
                    </div>
                    <div className="m" style={{ fontSize:11, color:C.dim, marginTop:3 }}>
                      {item.type==="link"
                        ? `privo.cash/pay/${item.id} · ${item.views} views · ${(item as any).date}`
                        : `🔒 to ${(item as any).to} · ${(item as any).date}`}
                    </div>
                  </div>
                </div>
                <div style={{ display:"flex", alignItems:"center", gap:14 }}>
                  <ChainTag chain={item.chain}/>
                  <span className="m" style={{ fontSize:14, fontWeight:700, color:C.text, minWidth:90, textAlign:"right" }}>{item.amount}</span>
                  <STag s={item.status||"active"}/>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
