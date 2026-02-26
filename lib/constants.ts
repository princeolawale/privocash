// ─────────────────────────────────────────────────────────────────────
// DESIGN TOKENS
// ─────────────────────────────────────────────────────────────────────
export const C = {
  bg: "#06060A",
  surface: "rgba(255,255,255,0.032)",
  surfaceHov: "rgba(255,255,255,0.062)",
  border: "rgba(255,255,255,0.075)",
  borderHov: "rgba(255,255,255,0.18)",
  text: "#EEEDF4",
  muted: "rgba(238,237,244,0.48)",
  dim: "rgba(238,237,244,0.24)",
  faint: "rgba(238,237,244,0.08)",
  accent: "#2563EB",
  accentHi: "#3B7BFF",
  accentDim: "rgba(37,99,235,0.13)",
  accentBrd: "rgba(37,99,235,0.32)",
  ok: "#10B981",
  err: "#EF4444",
  warn: "#F59E0B",
} as const;

export const F = {
  display: "'Syne', sans-serif",
  body: "'Instrument Sans', sans-serif",
  mono: "'JetBrains Mono', monospace",
} as const;

export const CHAINS: Record<string, { color: string; label: string }> = {
  ETH: { color: "#627EEA", label: "Ethereum" },
  BTC: { color: "#F7931A", label: "Bitcoin" },
  SOL: { color: "#9945FF", label: "Solana" },
  TON: { color: "#0098EA", label: "TON" },
  MATIC: { color: "#8247E5", label: "Polygon" },
};

export const TOKENS = [
  "USDT",
  "USDC",
  "ETH",
  "BTC",
  "SOL",
  "TON",
  "MATIC",
  "BNB",
] as const;

export const EXPIRY = [
  { v: "10m", l: "10 min" },
  { v: "15m", l: "15 min" },
  { v: "30m", l: "30 min" },
  { v: "1h", l: "1 hour" },
] as const;

export const UNICORN_PROJECT = "q74MturjEeRrERoc3hmn";

export const MOCK_LINKS = [
  {
    id: "a7f3k2",
    title: "Invoice #001 — Design",
    amount: "500 USDT",
    chain: "ETH",
    status: "active",
    views: 7,
    date: "Dec 10",
  },
  {
    id: "b8m1p4",
    title: "Freelance Payment",
    amount: "0.05 ETH",
    chain: "ETH",
    status: "paid",
    views: 3,
    date: "Dec 8",
  },
  {
    id: "c3n7q1",
    title: "Course Sale",
    amount: "100 USDT",
    chain: "MATIC",
    status: "expired",
    views: 1,
    date: "Dec 5",
  },
  {
    id: "d9s2r5",
    title: "Consulting Fee — Q4",
    amount: "1.2 SOL",
    chain: "SOL",
    status: "active",
    views: 12,
    date: "Dec 3",
  },
];

export const MOCK_SENDS = [
  { to: "0x83a…f4c2", amount: "200 USDT", chain: "ETH", date: "Dec 11" },
  { to: "0x1b7…d390", amount: "0.02 BTC", chain: "BTC", date: "Dec 9" },
  { to: "0xf92…c71a", amount: "500 USDT", chain: "ETH", date: "Dec 6" },
];
