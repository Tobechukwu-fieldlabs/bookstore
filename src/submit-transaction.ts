import { Network } from "@injectivelabs/networks";
import { MsgExecuteContractCompat } from "@injectivelabs/sdk-ts";
import { ChainId } from "@injectivelabs/ts-types";
import { MsgBroadcaster, Wallet, WalletStrategy } from "@injectivelabs/wallet-ts";

type TransactionQuery = "add_book" | "remove_book";
export type SupportedWallets = "Keplr" | "Leap" | "Ninji";

interface SubmitTransactionArgs {
  address: string | undefined;
  args: Partial<Record<TransactionQuery, Record<string, any>>>;
  wallet: SupportedWallets;
}

export default async function submitTransaction({ address, args, wallet }: SubmitTransactionArgs) {
  const NETWORK = Network.Testnet;

  const contractAddress = "inj13s98tu305vzwhre7308cfef89k0r8v83l0kxhs";

  const walletStrategy = new WalletStrategy({
    chainId: ChainId.Testnet,
    wallet: Wallet[wallet],
  });

  const msgBroadcastClient = new MsgBroadcaster({
    walletStrategy,
    network: NETWORK,
  });

  try {
    const message = MsgExecuteContractCompat.fromJSON({
      contractAddress,
      sender: address ?? "",
      msg: args,
    });

    const _response = await msgBroadcastClient.broadcast({
      msgs: message,
      injectiveAddress: address,
    });

    console.log({ _response });

    return _response;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.log(error.message);
    }
  }
}
