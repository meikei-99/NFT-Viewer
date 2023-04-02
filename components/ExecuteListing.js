import React, { useState } from "react";
import { ethers } from "ethers";
import { abi } from "@/abi/abi";
import { useMoralis } from "react-moralis";
import { addressesByNetwork, SupportedChainId } from "@looksrare/sdk";
import { Spinner } from "@chakra-ui/react";

export default function ExecuteListing({
  contractAddress,
  tokenID,
  price,
  isOrderAsk,
  signer: owner,
  strategy,
  currencyAddress,
  nonce,
  startTime,
  endTime,
  minPercentageToAsk,
  v,
  r,
  s,
}) {
  const { account } = useMoralis();
  const [showEnteringNotification, setEnteringNotification] = useState(false);
  const [showSuccessNotification, setSuccessNotification] = useState(false);

  async function handleMatchAskWithTakerBid() {
    const provider = new ethers.providers.JsonRpcProvider(
      "https://goerli.infura.io/v3/5dc74bc41b2d473aa5dc375eca061cc3"
    );
    // const provider = new ethers.providers.AlchemyProvider(
    //   "goerli",
    //   "https://eth-goerli.g.alchemy.com/v2/TXOYMv7SbV9AUHtP3meXzaPvWiKcBZfH"
    // );
    const privateKey = process.env.NEXT_PUBLIC_WALLET_API;
    const signer = new ethers.Wallet(privateKey).connect(provider);
    const signerAddress = await signer.getAddress();
    const looksRareContract = "0x59728544B08AB483533076417FbBB2fD0B17CE3a";
    const chainId = SupportedChainId.GOERLI;
    const addresses = addressesByNetwork[chainId];
    const contract = new ethers.Contract(looksRareContract, abi, signer);
    const paramsValue = "0x";

    const makerOrder = {
      isOrderAsk: isOrderAsk,
      signer: owner,
      collection: contractAddress,
      price: price,
      tokenId: tokenID,
      amount: "1",
      strategy: strategy,
      currency: currencyAddress,
      nonce: nonce,
      startTime: startTime,
      endTime: endTime,
      minPercentageToAsk: minPercentageToAsk,
      params: paramsValue,
      v: v,
      r: r,
      s: s,
    };

    const takerOrder = {
      isOrderAsk: false,
      taker: account,
      price: price,
      tokenId: tokenID,
      minPercentageToAsk: 7500,
      params: paramsValue,
    };

    console.log("entering into the function");
    setEnteringNotification(true);
    const tx = await contract.matchAskWithTakerBid(takerOrder, makerOrder);
    console.log("waiting for the function");
    await tx.wait();
    setEnteringNotification(false);
    console.log("function done executing");
    setSuccessNotification(true);
    setTimeout(() => {
      setSuccessNotification(false);
    }, 5000);
  }

  return (
    <div>
      <button
        className={`p-1 w-full rounded-2xl flex place-content-center hover:bg-[#0ce466] cursor-pointer hover:text-black border border-[#0ce466] ${
          showSuccessNotification ? "bg-[#0ce466]" : ""
        }`}
        onClick={() => {
          if (account) {
            handleMatchAskWithTakerBid();
          } else {
            alert("Please connect your wallet");
          }
        }}
      >
        {showSuccessNotification ? (
          <p className="font-bold text-black">LISTING EXECUTED</p>
        ) : showEnteringNotification ? (
          <div className="flex flex-row gap-4 items-center">
            <p>Executing</p>
            <Spinner
              thickness="4px"
              speed="0.65s"
              emptyColor="gray.200"
              color="green.400"
              size="xs"
            />
          </div>
        ) : (
          "Buy Now"
        )}
      </button>
    </div>
  );
}
