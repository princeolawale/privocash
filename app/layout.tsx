import type { Metadata } from "next";
import "./globals.css";
import { WalletProvider } from "@/lib/wallet-context";
import Cursor from "@/components/Cursor";
import Navbar from "@/components/Navbar";
import WalletModal from "@/components/WalletModal";
import UBg from "@/components/UBg";

export const metadata: Metadata = {
  title: "Privo Cash — Privacy Infrastructure for Crypto Payments",
  description:
    "Send and receive cryptocurrency without exposing your wallet address. Powered by stealth address protocol — unlinkable, non-custodial, instant.",
  keywords: [
    "stealth address",
    "private crypto payments",
    "ERC-5564",
    "privacy crypto",
  ],
  openGraph: {
    title: "Privo Cash",
    description:
      "Privacy infrastructure for crypto payments. Non-custodial. Unlinkable.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <WalletProvider>
          {/* Fixed background layers */}
          <UBg />
          <div className="noise" />
          <Cursor />

          {/* Nav + Modal */}
          <Navbar />
          <WalletModal />

          {/* Page content */}
          <main style={{ position: "relative", zIndex: 3 }}>{children}</main>
        </WalletProvider>
      </body>
    </html>
  );
}
