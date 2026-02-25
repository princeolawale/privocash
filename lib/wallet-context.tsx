"use client";
import { createContext, useContext, useState, ReactNode } from "react";

interface WalletCtx {
  wallet: string | null;
  connect: (addr: string) => void;
  disconnect: () => void;
  showModal: boolean;
  openModal: () => void;
  closeModal: () => void;
}

const Ctx = createContext<WalletCtx>({
  wallet: null,
  connect: () => {},
  disconnect: () => {},
  showModal: false,
  openModal: () => {},
  closeModal: () => {},
});

export function WalletProvider({ children }: { children: ReactNode }) {
  const [wallet, setWallet]       = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);

  const connect    = (addr: string) => { setWallet(addr); setShowModal(false); };
  const disconnect = ()             => setWallet(null);
  const openModal  = ()             => setShowModal(true);
  const closeModal = ()             => setShowModal(false);

  return (
    <Ctx.Provider value={{ wallet, connect, disconnect, showModal, openModal, closeModal }}>
      {children}
    </Ctx.Provider>
  );
}

export const useWallet = () => useContext(Ctx);
