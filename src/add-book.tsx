import { useChain, useWallet, useWalletClient } from "@cosmos-kit/react";
import { ChangeEvent, FormEvent, useState } from "react";
import submitTransaction, { SupportedWallets } from "./submit-transaction";

interface InputField {
  author: string;
  title: string;
  year: string;
  price: string;
}

export default function AddBook() {
  const [inputField, setInputField] = useState<InputField>({
    author: "",
    price: "",
    title: "",
    year: "",
  });
  const { address, wallet } = useChain("injectivetestnet");

  const handleInputChange = (ev: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = ev.currentTarget;
    setInputField((currState) => ({ ...currState, [name]: value }));
  };

  const addBooks = async (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault();

    if (wallet) {
      const returnValue = await submitTransaction({
        address,
        args: {
          add_book: {
            author: inputField.author,
            title: inputField.title,
            year: +inputField.year,
            price: +inputField.price,
          },
        },
        wallet: wallet.prettyName as SupportedWallets,
      });
      console.log({ returnValue });
    }
  };

  return (
    <form onSubmit={addBooks} className="flex mt-10 flex-col gap-8 items-center justify-center w-3/4 mx-auto">
      <div className="w-full">
        <input
          name="title"
          onChange={handleInputChange}
          placeholder="Enter title"
          className="w-full text-2xl px-4 py-5 rounded-lg"
        />
      </div>

      <div className="w-full">
        <input
          name="author"
          onChange={handleInputChange}
          placeholder="Enter author"
          className="w-full text-2xl px-4 py-5 rounded-lg"
        />
      </div>

      <div className="w-full">
        <input
          name="year"
          onChange={handleInputChange}
          placeholder="Enter year"
          className="w-full text-2xl px-4 py-5 rounded-lg"
        />
      </div>

      <div className="w-full">
        <input
          name="price"
          onChange={handleInputChange}
          placeholder="Enter price"
          className="w-full text-2xl px-4 py-5 rounded-lg"
        />
      </div>

      <button
        type="submit"
        className="bg-orange-500 text-3xl px-8 py-5 rounded-md hover:bg-orange-300 transition-colors text-black"
      >
        Submit
      </button>
    </form>
  );
}
