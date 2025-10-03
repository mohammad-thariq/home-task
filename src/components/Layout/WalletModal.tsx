import { Wallet, X } from "lucide-react";
import { useWallet } from "../../WalletContext";

export const WalletModal = () => {
  const {
    account,
    error,
    connectWallet,
    disconnectWallet,
    isModalOpen: isOpen,
    closeModal: onClose,
  } = useWallet();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-lg w-96 p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
        >
          <X className="w-5 h-5" />
        </button>

        <h2 className="text-xl font-semibold mb-4">
          {account ? "Connected" : "Connect"} Wallet
        </h2>

        {!account ? (
          <div className="flex items-center justify-center gap-3 py-3">
            <button
              onClick={connectWallet}
              className="flex justify-center items-center space-x-3 w-full px-4 py-3 border rounded-lg hover:bg-gray-50 transition bg-gradient-to-r from-blue-600 to-emerald-500 text-white"
            >
              <div className="flex flex-col items-center gap-3 justify-center p-3 ">
                <img
                  className="w-full h-12"
                  src="/icons/metamask.svg"
                  alt="metamask"
                />
                <span>MetaMask</span>
              </div>
            </button>
            <button
              disabled
              className="flex justify-center items-center m-0 w-full px-4 py-3 border rounded-lg transition bg-gray-200 text-gray-500 cursor-not-allowed"
            >
              <div className="flex flex-col items-center gap-3 justify-center p-3">
                <Wallet className="w-12 h-12" />

                <span>Other Wallets</span>
              </div>
            </button>
            {error && <p className="text-red-500 text-sm">{error}</p>}
          </div>
        ) : (
          <div className="text-center space-y-3">
            <div className="flex flex-col items-center gap-3 justify-center p-3">
              <img
                className="w-full h-12"
                src="/icons/metamask.svg"
                alt="metamask"
              />
              <p className="text-gray-700">Connected as</p>
            </div>
            <p className="font-mono bg-gray-100 p-2 rounded">
              {account.slice(0, 12)}...${account.slice(-4)}
            </p>
            <button
              onClick={disconnectWallet}
              className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
            >
              Disconnect
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
