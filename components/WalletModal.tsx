"use client";
import { ShieldSVG } from "./Atoms";
import { useWallet } from "@/lib/wallet-context";
import { C } from "@/lib/constants";

const WALLETS = [
  { n:"MetaMask",        i:"🦊", s:"Browser extension" },
  { n:"WalletConnect",   i:"🔗", s:"Mobile & desktop"  },
  { n:"Coinbase Wallet", i:"🔵", s:"Coinbase users"    },
  { n:"Rabby",           i:"🐰", s:"DeFi optimized"    },
];

export default function WalletModal() {
  const { showModal, connect, closeModal } = useWallet();
  if (!showModal) return null;

  const handleConnect = () =>
    connect("0x" + Math.random().toString(16).slice(2,12) + "dead");

  return (
    <div
      style={{ position:"fixed", inset:0, zIndex:2000, background:"rgba(6,6,10,.88)", backdropFilter:"blur(20px)", display:"flex", alignItems:"center", justifyContent:"center" }}
      onClick={closeModal}>
      <div className="card"
        style={{ padding:"44px 40px", width:420, animation:"pin .35s ease both" }}
        onClick={e => e.stopPropagation()}>
        <div style={{ textAlign:"center", marginBottom:32 }}>
          <ShieldSVG sz={44}/>
          <h3 className="d" style={{ fontSize:28, fontWeight:700, letterSpacing:"-.03em", color:C.text, marginTop:16 }}>
            Connect Wallet
          </h3>
          <p style={{ fontSize:14, color:C.muted, marginTop:10, lineHeight:1.7 }}>
            Your keys stay with you. We never hold funds or store private data.
          </p>
        </div>
        <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
          {WALLETS.map(w => (
            <button key={w.n} onClick={handleConnect}
              style={{ display:"flex", alignItems:"center", gap:16, padding:"15px 18px", background:"rgba(255,255,255,.04)", border:`1px solid ${C.border}`, borderRadius:14, cursor:"none", color:C.text, fontFamily:"'Instrument Sans',sans-serif", fontSize:15, textAlign:"left", transition:"all .18s", width:"100%" }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background="rgba(255,255,255,.08)"; (e.currentTarget as HTMLElement).style.borderColor=C.borderHov; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background="rgba(255,255,255,.04)"; (e.currentTarget as HTMLElement).style.borderColor=C.border; }}>
              <span style={{ fontSize:26 }}>{w.i}</span>
              <div>
                <div style={{ fontWeight:600 }}>{w.n}</div>
                <div style={{ fontSize:12, color:C.muted }}>{w.s}</div>
              </div>
            </button>
          ))}
        </div>
        <button onClick={closeModal}
          style={{ width:"100%", background:"none", border:"none", color:C.muted, cursor:"none", marginTop:20, fontSize:14, fontFamily:"'Instrument Sans',sans-serif" }}>
          Cancel
        </button>
      </div>
    </div>
  );
}
