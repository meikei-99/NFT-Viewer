import { useMoralis } from "react-moralis";
import { useEffect } from "react";

export default function ConnectButton() {
  const {
    enableWeb3,
    isWeb3Enabled,
    account,
    Moralis,
    deactivateWeb3,
    isWeb3EnableLoading,
  } = useMoralis();

  useEffect(() => {
    if (window.localStorage.getItem("connected")) {
      enableWeb3();
    }
  }, [isWeb3Enabled]);

  useEffect(() => {
    Moralis.onAccountChanged((account) => {
      if (account == null) {
        window.localStorage.removeItem("connected");
        deactivateWeb3();
      }
    });
  });

  return (
    <div className="grid place-content-center text-xs lg:text-sm 2xl:text-base">
      {account ? (
        <div className="border border-[#0ce466] px-6 rounded-lg">
          {account.slice(0, 6)}...
          {account.slice(account.length - 4)}
        </div>
      ) : (
        <button
          onClick={async () => {
            await enableWeb3();
            window.localStorage.setItem("connected", "Injected to MetaMask");
          }}
          disabled={isWeb3EnableLoading}
          className="grid place-content-center rounded-2xl px-2 text-xs lg:text-sm 2xl:text-base border border-[#0ce466] hover:bg-[#0ce466] hover:text-black"
        >
          Connect Wallet
        </button>
      )}
    </div>
  );
}
