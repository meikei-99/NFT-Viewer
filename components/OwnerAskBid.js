//done
import axios from "axios";
import { useQuery } from "react-query";
import { useState, useEffect } from "react";
import Link from "next/link";
import ExecuteListing from "./ExecuteListing";
import { useMoralis } from "react-moralis";

export default function OwnerAskBid({ contractAddress, tokenID, tokenName }) {
  const [timeLeft, setTimeLeft] = useState("");
  const { account } = useMoralis();
  const buttonDesign =
    "text-base 2xl:text-lg border border-[#0ce466] px-4 rounded-2xl text-center";
  const isLoadingOrError =
    "p-1 rounded-2xl flex place-content-center border border-[#0ce466]";

  const { data, isLoading, error } = useQuery(
    ["fetchOwner", contractAddress, tokenID],
    async () => {
      const response = await axios.get(
        `https://api.looksrare.org/api/v1/orders?isOrderAsk=true&collection=${contractAddress}&tokenId=${tokenID}&status%5B%5D=VALID`,
        { headers: { accept: "application/json" } }
      );
      return response.data;
    }
  );

  useEffect(() => {
    if (data?.data?.[0]?.endTime) {
      const endTime = data.data[0].endTime * 1000;
      const now = new Date().getTime();
      const timeDiff = endTime - now;

      if (timeDiff > 0) {
        const daysLeft = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
        const hoursLeft = Math.floor(
          (timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );

        if (daysLeft > 30) {
          const monthsLeft = Math.floor(daysLeft / 30);
          const remainingDays = daysLeft % 30;
          setTimeLeft(`${monthsLeft} mth ${remainingDays}d`);
        } else {
          setTimeLeft(`${daysLeft} d ${hoursLeft} hr`);
        }
      } else {
        setTimeLeft("Auction has ended");
      }
    }
  }, [data]);

  if (isLoading) {
    return <p className={isLoadingOrError}>Fetching</p>;
  }
  if (error) {
    return (
      <p className={isLoadingOrError}>
        Error in fetching owner: {error.message}
      </p>
    );
  }

  const {
    isOrderAsk,
    signer,
    strategy,
    currencyAddress,
    nonce,
    startTime,
    endTime,
    minPercentageToAsk,
    v,
    r,
    s,
    price,
  } = data.data?.[0] ?? {};

  return (
    <div className="flex flex-col gap-4 2xl:gap-8 justify-center">
      <p className="text-4xl 2xl:text-5xl font-bold">{tokenName}</p>
      <div className="text-sm 2xl:text-base flex flex-col gap-8 2xl:gap-10 justify-center">
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 justify-around">
          {signer ? (
            signer == account ? (
              <div className="flex flex-col gap-2">
                <p className="text-gray-400">Owner</p>
                <Link
                  href={`https://looksrare.org/accounts/${signer}`}
                  target="blank"
                  className={buttonDesign}
                >
                  You
                </Link>
              </div>
            ) : (
              <div className="flex flex-col gap-2">
                <p className="text-gray-400">Owner</p>
                <Link
                  href={`https://looksrare.org/accounts/${signer}`}
                  target="blank"
                  className={buttonDesign}
                >
                  {signer.slice(0, 6)}...
                  {signer.slice(signer.length - 4)}
                </Link>
              </div>
            )
          ) : (
            <div className="flex flex-col gap-2">
              <p className="text-gray-400">Owner</p>
              <span className={buttonDesign}>error</span>
            </div>
          )}
          {price !== undefined ? (
            <div className="flex flex-col gap-2">
              <p className="text-gray-400">Current Price</p>
              <p className={buttonDesign}>{(price / 1e18).toFixed(1)} ETH</p>
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              <p className="text-gray-400">Current Price</p>
              <p className={buttonDesign}>error</p>
            </div>
          )}
          {timeLeft ? (
            <div className="flex flex-col gap-2">
              <p className="text-gray-400">Time Left</p>
              <p className={buttonDesign}>{timeLeft}</p>
            </div>
          ) : (
            ""
          )}
        </div>
        <ExecuteListing
          contractAddress={contractAddress}
          tokenID={tokenID}
          price={price}
          isOrderAsk={isOrderAsk}
          signer={signer}
          strategy={strategy}
          currencyAddress={currencyAddress}
          nonce={nonce}
          startTime={startTime}
          endTime={endTime}
          minPercentageToAsk={minPercentageToAsk}
          v={v}
          r={r}
          s={s}
        ></ExecuteListing>
      </div>
    </div>
  );
}
