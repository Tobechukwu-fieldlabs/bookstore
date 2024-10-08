import { getNetworkEndpoints, Network } from "@injectivelabs/networks";
import { ChainGrpcWasmApi, fromBase64, toBase64 } from "@injectivelabs/sdk-ts";
import { useEffect, useState } from "react";
import submitTransaction from "./submit-transaction";
import { useChain } from "@cosmos-kit/react";

interface Books {
  author: string;
  id: number;
  price: number;
  title: string;
  year: number;
}

const NETWORK = Network.Testnet;
const ENDPOINTS = getNetworkEndpoints(NETWORK);

const _grpcConnection = new ChainGrpcWasmApi(ENDPOINTS.grpc);
const contractAddress = "inj13s98tu305vzwhre7308cfef89k0r8v83l0kxhs";

export default function Books() {
  const [books, setBooks] = useState<Array<Books>>([]);
  const { address, getStargateClient } = useChain("injectivetestnet");

  const getBookList = async () => {
    try {
      const _response = await _grpcConnection.fetchSmartContractState(contractAddress, toBase64({ get_books: {} }));
      const _response_data = fromBase64(_response.data as any);

      setBooks(_response_data.books);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteBook = async (id: number) => {
    const returnValue = await submitTransaction({
      address,
      args: {
        remove_book: {
          id: id,
        },
      },
    });

    console.log({ returnValue });
  };

  useEffect(() => {
    getBookList();
  }, []);

  return (
    <section className="mt-8 flex flex-col gap-8">
      {books.map((book) => (
        <div key={book.id} className="border border-slate-500 py-4 px-8 rounded-lg">
          <div className="flex items-center mb-8">
            {["Title", "Author", "Year", "Price", ""].map((headers) => (
              <p className="flex-1 text-3xl font-bold" key={headers}>
                {headers}
              </p>
            ))}
          </div>
          <div className="flex items-center text-2xl font-medium">
            <p className="flex-1">{book.title}</p>
            <p className="flex-1">{book.author}</p>
            <p className="flex-1">{book.year}</p>
            <p className="flex-1">{book.price}</p>
            <button
              onClick={() => deleteBook(book.id)}
              className="flex-1 bg-red-500 py-4 rounded-lg transition-colors hover:bg-red-600"
            >
              Delete book
            </button>
          </div>
        </div>
      ))}
    </section>
  );
}
