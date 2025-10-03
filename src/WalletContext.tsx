import React, { createContext, useContext, useEffect, useState } from "react";

interface WalletContextType {
  walletConnected: boolean;
  account: string | null;
  error: string | null;
  isModalOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
  connectWallet: () => Promise<void>;
  disconnectWallet: () => void;
  setError: (err: string | null) => void;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export const WalletProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [walletConnected, setWalletConnected] = useState<boolean>(
    localStorage.getItem("walletConnected") === "true"
  );
  const [account, setAccount] = useState<string | null>(
    localStorage.getItem("account")
  );
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  useEffect(() => {
    localStorage.setItem("walletConnected", String(walletConnected));
    if (account) localStorage.setItem("account", account);
    else localStorage.removeItem("account");
  }, [walletConnected, account]);

  const connectWallet = async () => {
    setError(null);
    try {
      if (!window.ethereum) {
        setError("MetaMask not detected. Please install MetaMask.");
        return;
      }
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      setAccount(accounts[0]);
      setWalletConnected(true);
    } catch (err: any) {
      if (err.code === 4001) setError("Connection request rejected.");
      else setError("Failed to connect wallet.");
    }
  };

  const disconnectWallet = () => {
    setWalletConnected(false);
    setAccount(null);
    setError(null);
    setIsModalOpen(false);
    localStorage.removeItem("walletConnected");
    localStorage.removeItem("account");
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <WalletContext.Provider
      value={{
        walletConnected,
        account,
        error,
        isModalOpen,
        openModal,
        closeModal,
        connectWallet,
        disconnectWallet,
        setError,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = () => {
  const ctx = useContext(WalletContext);
  if (!ctx) throw new Error("useWallet must be used within WalletProvider");
  return ctx;
};
