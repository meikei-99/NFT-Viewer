import { useMoralis, useChain } from "react-moralis";
import { useEffect, useState } from "react";

export default function ConnectButton() {
  const {
    enableWeb3,
    isWeb3Enabled,
    account,
    Moralis,
    deactivateWeb3,
    isWeb3EnableLoading,
  } = useMoralis();
  const { chainId } = useChain();

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
        <div className="border border-[#0ce466] py-1 rounded-lg text-center">
          {chainId == "0x1" ? (
            <div className="px-6">
              {account.slice(0, 6)}...
              {account.slice(account.length - 4)}
            </div>
          ) : (
            <div className="px-2">Please switch to Ethereum Mainnet</div>
          )}
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
