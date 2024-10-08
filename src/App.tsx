import clsx from "clsx";
import ConnectWalletButton from "./connect-wallet-button";
import WalletProvider from "./connect-wallet-provider";
import "@interchain-ui/react/styles";
import { useEffect, useState } from "react";
import { getNetworkEndpoints, Network } from "@injectivelabs/networks";
import { ChainGrpcWasmApi, fromBase64, toBase64 } from "@injectivelabs/sdk-ts";
import AddBook from "./add-book";
import submitTransaction from "./submit-transaction";
import Books from "./books";

export default function App() {
  return (
    <WalletProvider>
      <main className="h-full">
        <nav
          className={clsx(
            "relative flex items-center px-6 py-4",
            "after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-full after:bg-slate-300"
          )}
        >
          <h1 className="text-4xl mr-auto">Bookstore</h1>
          <ConnectWalletButton />
        </nav>
        <Books />
        <section className="mt-10">
          <h2 className="text-5xl font-bold text-center">Add a book</h2>

          <AddBook />
        </section>
      </main>
    </WalletProvider>
  );
}
