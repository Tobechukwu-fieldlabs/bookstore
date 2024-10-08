import { useChain } from "@cosmos-kit/react";

export default function ConnectWalletButton() {
  const { connect, address } = useChain("injectivetestnet");

  return (
    <div>
      <button
        className="bg-sky-500 text-2xl px-8 py-4 text-black rounded-lg hover:bg-sky-300 transition-colors"
        onClick={connect}
      >
        {address ? address : "Connect Wallet"}
      </button>
    </div>
  );
}
