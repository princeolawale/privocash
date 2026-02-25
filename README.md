# Privo Cash — Next.js App Router

Privacy infrastructure for crypto payments. Stealth address protocol, non-custodial, EVM-compatible.

## Stack
- **Next.js 14** — App Router
- **TypeScript**
- **React 18**
- Unicorn Studio background (`q74MturjEeRrERoc3hmn`)

## Quick Start

```bash
npm install
npm run dev
# → http://localhost:3000
```

## Project Structure

```
privo-cash/
├── app/
│   ├── globals.css          ← All design system styles
│   ├── layout.tsx           ← Root layout (providers, cursor, Unicorn, Navbar)
│   ├── page.tsx             ← Landing (intro zoom → landing page)
│   ├── send/
│   │   ├── page.tsx         ← Send stealth payment
│   │   └── success/page.tsx ← Transaction confirmed
│   ├── create/
│   │   ├── page.tsx         ← Create PayLink
│   │   └── success/page.tsx ← Link created + QR
│   ├── pay/
│   │   ├── [id]/page.tsx    ← Dynamic payment link (payer view)
│   │   └── success/page.tsx ← Payment completed
│   └── dashboard/page.tsx   ← Activity, links, sent history
├── components/
│   ├── Atoms.tsx            ← All shared UI atoms
│   ├── Cursor.tsx           ← Custom cursor
│   ├── Navbar.tsx           ← Fixed nav with wallet display
│   ├── UBg.tsx              ← Unicorn Studio background
│   └── WalletModal.tsx      ← Wallet connect modal
└── lib/
    ├── constants.ts         ← Design tokens, chains, mock data
    ├── hooks.ts             ← useReveal, useCounter, useScrolled
    └── wallet-context.tsx   ← Global wallet state (React Context)
```

## Routes

| Route | Description |
|-------|-------------|
| `/` | Landing page (intro + full marketing) |
| `/send` | Send stealth payment to wallet |
| `/send/success` | Payment confirmed |
| `/create` | Create payment link |
| `/create/success` | Link created + share |
| `/pay/[id]` | Payer view — dynamic route |
| `/pay/success` | Payment completed |
| `/dashboard` | Activity & links dashboard |

## Key Design Decisions

- **App Router** — each page is a Server Component boundary; all interactive pages use `"use client"`
- **Wallet state** — React Context (`WalletProvider`) in root layout; no external state lib needed
- **No CSS-in-JS** — all styles in `globals.css` using plain class names; avoids SSR hydration issues
- **Unicorn Studio** — loaded via client-side script injection to avoid SSR conflicts
- **Custom cursor** — RAF-based, 60fps, client-side only

## Connect Real Wallet (Web3)

Replace the mock `connect()` in `WalletModal.tsx` with your preferred library:

```bash
# Option A — wagmi + viem (recommended for EVM)
npm install wagmi viem @tanstack/react-query

# Option B — ethers.js
npm install ethers

# Option C — Web3Modal
npm install @web3modal/wagmi wagmi viem
```

## Stealth Address Implementation

Replace the mock stealth derivation in send flows with ERC-5564:

```bash
npm install @stealth-address/sdk
# or
npm install @metamask/eth-sig-util
```

The stealth address derivation happens in `/app/send/page.tsx` → `confirm()` function.
