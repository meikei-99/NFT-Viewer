import React, { useState } from "react";
import { ethers } from "ethers";
import { abi } from "@/abi/abi";
import { useMoralis, useChain } from "react-moralis";
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
  const { chainId } = useChain();
  const [showEnteringNotification, setEnteringNotification] = useState(false);
  const [showSuccessNotification, setSuccessNotification] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  async function handleMatchAskWithTakerBid() {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const looksRareContract = "0x59728544B08AB483533076417FbBB2fD0B17CE3a";
    const contract = new ethers.Contract(looksRareContract, abi, signer);
    const paramsValue = [];

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

    try {
      console.log("entering into the function");
      setEnteringNotification(true);
      const tx = await contract.matchAskWithTakerBid(takerOrder, makerOrder, {
        gasLimit: 20000000,
      });
      console.log("waiting for the function");
      await tx.wait();
      setEnteringNotification(false);
      console.log("function done executing");
      setSuccessNotification(true);
      setTimeout(() => {
        setSuccessNotification(false);
      }, 5000);
    } catch (error) {
      setShowError(true);
      setTimeout(() => {
        setShowError(false);
        setEnteringNotification(false);
      }, 5000);
      setErrorMessage(error.code);
      console.log(`Error:${error.code}`);
    }
  }

  return (
    <div>
      <button
        className={`p-1 w-full rounded-2xl flex place-content-center cursor-pointer hover:text-black border ${
          showError
            ? "bg-red-600 border-black"
            : " border-[#0ce466] hover:bg-[#0ce466]"
        } ${showSuccessNotification ? "bg-[#0ce466]" : ""}`}
        onClick={() => {
          if (account && chainId == "0x1") {
            handleMatchAskWithTakerBid();
          } else {
            alert(
              "Please connect your MetaMask wallet to the Ethereum mainnet"
            );
          }
        }}
      >
        {showEnteringNotification ? (
          showError ? (
            <div className="flex flex-row gap-4 items-center">
              <p className="font-bold text-black">{errorMessage}</p>
            </div>
          ) : (
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
          )
        ) : showSuccessNotification ? (
          <p className="font-bold text-black">LISTING EXECUTED</p>
        ) : showError ? (
          <div className="flex flex-row gap-4 items-center">
            <p className="font-bold text-black">{errorMessage}</p>
          </div>
        ) : (
          "Buy Now"
        )}
      </button>
    </div>
  );
}
