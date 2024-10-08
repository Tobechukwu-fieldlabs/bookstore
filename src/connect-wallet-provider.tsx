import { ChainProvider } from "@cosmos-kit/react";
import { chains, assets } from "chain-registry";
import { wallets as KeplerWallet } from "@cosmos-kit/keplr";
import { wallets as NinjiWallet } from "@cosmos-kit/ninji";
import { wallets as OkxWallet } from "@cosmos-kit/okxwallet";
import { ReactNode } from "react";
import { wallets as LeapExtensionWallet } from "@cosmos-kit/leap-extension";

interface Props {
  children: ReactNode;
}

export default function WalletProvider({ children }: Props) {
  const wallets = [...KeplerWallet, ...NinjiWallet, ...OkxWallet, ...LeapExtensionWallet];

  const _chains = chains
    .filter((_chain) => _chain.chain_name.includes("injective"))
    .map((chain) => ({
      ...chain,
      apis: {
        ...chain.apis,
        rpc: [{ address: "https://testnet.sentry.tm.injective.network:443", provider: "injectiveLabs" }],
      },
    }));

  console.log({ _chains });

  return (
    <ChainProvider
      chains={_chains}
      assetLists={assets}
      wallets={wallets}
      walletConnectOptions={{ signClient: { projectId: "0x12345abcdef", name: "bookstore" } }}
    >
      {children}
    </ChainProvider>
  );
}
