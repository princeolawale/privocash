"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react"; // ← ADD THIS
import { Logo } from "./Atoms";
import { useWallet } from "@/lib/wallet-context";
import { useScrolled } from "@/lib/hooks";
import { C } from "@/lib/constants";

const NAV = [
  { href: "/send", label: "Send" },
  { href: "/create", label: "Create Link" },
  { href: "/dashboard", label: "Dashboard" },
];

export default function Navbar() {
  const path = usePathname();
  const scrolled = useScrolled();
  const { wallet, openModal } = useWallet();
  const [open, setOpen] = useState(false);

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 500,
        height: 68,
        padding: "0 20px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        background: scrolled ? "rgba(6,6,10,.84)" : "transparent",
        backdropFilter: scrolled ? "blur(24px)" : "none",
        borderBottom: scrolled ? `1px solid ${C.border}` : "none",
        transition: "all .35s ease",
      }}
    >
      <Link href="/">
        <Logo sz={26} />
      </Link>

      {/* Desktop Nav */}
      <div
        style={{
          display: "none",
        }}
        className="md:flex items-center gap-2"
      >
        {NAV.map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            className={`nl ${path === href ? "on" : ""}`}
            style={{
              padding: "8px 16px",
              borderRadius: 9,
              background:
                path === href ? C.accentDim : "transparent",
            }}
          >
            {label}
          </Link>
        ))}
      </div>

      {/* Desktop Wallet */}
      <div className="hidden md:flex items-center gap-3">
        {wallet ? (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 9,
              background: C.accentDim,
              border: `1px solid ${C.accentBrd}`,
              borderRadius: 11,
              padding: "9px 16px",
            }}
          >
            <span
              style={{
                width: 7,
                height: 7,
                borderRadius: "50%",
                background: C.accent,
                animation: "pulse 2s infinite",
                display: "inline-block",
              }}
            />
            <span
              className="m"
              style={{ fontSize: 13, color: C.accent }}
            >
              {wallet.slice(0, 6)}…{wallet.slice(-4)}
            </span>
          </div>
        ) : (
          <button className="btn bp bsm" onClick={openModal}>
            Connect Wallet
          </button>
        )}
      </div>

      {/* Mobile Menu Button */}
      <button
  className="md:hidden"
  onClick={() => setOpen(!open)}
  style={{
    background: "transparent",
    border: `1px solid ${C.border}`,
    borderRadius: 10,
    padding: "8px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }}
>
  {open ? (
    <X size={20} color={C.text} />
  ) : (
    <Menu size={20} color={C.text} />
  )}
</button>

      {/* Mobile Dropdown */}
      {open && (
        <div
          style={{
            position: "absolute",
            top: 68,
            left: 0,
            right: 0,
            background: "#06060A",
            borderTop: `1px solid ${C.border}`,
            padding: "20px",
            display: "flex",
            flexDirection: "column",
            gap: 16,
          }}
        >
          {NAV.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              className="nl"
            >
              {label}
            </Link>
          ))}

          <div style={{ marginTop: 10 }}>
            {wallet ? (
              <span className="m">
                {wallet.slice(0, 6)}…{wallet.slice(-4)}
              </span>
            ) : (
              <button
                className="btn bp bsm"
                onClick={openModal}
              >
                Connect Wallet
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}