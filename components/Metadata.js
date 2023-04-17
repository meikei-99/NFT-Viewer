import axios from "axios";
import { Spinner } from "@chakra-ui/react";
import { useQuery } from "react-query";
import { useState } from "react";
import Banner from "./Banner";
import { motion } from "framer-motion";
import NftBox from "./NftBox";

export default function Metadata() {
  const animateLeft = {
    offscreen: { x: -20, opacity: 0, transition: { duration: 1.5 } },
    onscreen: { x: 0, opacity: 1, transition: { duration: 1.5 } },
  };
  const popularList =
    "hover:underline hover:underline-offset-10 ... w-fit hover:animate-[slideRight_0.6s_ease-in-out_forwards] cursor-pointer hover:text-[#0ce466]";

  const contractAddress = "0xED5AF388653567Af2F388E6224dC7C4b3241C544";
  const [tokenID, setTokenId] = useState(4666);
  const fetchMetadata = async () => {
    const response = await axios.get(
      `https://api.looksrare.org/api/v1/tokens?collection=${contractAddress}&tokenId=${tokenID}`,
      { headers: { accept: "application/json" } }
    );
    return response.data;
  };

  const fetchStats = async () => {
    const response = await axios.get(
      `https://api.looksrare.org/api/v1/collections/stats?address=${contractAddress}`,
      { headers: { accept: "application/json" } }
    );
    return response.data;
  };

  const { data, isLoading, error } = useQuery(
    ["metadata", contractAddress, tokenID],
    fetchMetadata
  );

  const {
    data: dataStats,
    isLoading: isLoadingStats,
    error: errorStats,
  } = useQuery(["stats", contractAddress], fetchStats);

  if (isLoading || isLoadingStats) {
    return (
      <div className="grid place-content-center">
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="green.400"
          size="xl"
        />
      </div>
    );
  }
  if (error || errorStats) {
    return (
      <div className="grid place-content-center">
        Error Fetching Data. Please try again later.
      </div>
    );
  }

  const {
    collection: {
      logoURI,
      bannerURI,
      name,
      address,
      websiteLink,
      discordLink,
      instagramLink,
      twitterLink,
    },
    name: tokenName,
    imageURI,
    attributes,
  } = data?.data || {};

  const { countOwners, totalSupply, floorPrice, floorChange24h, marketCap } =
    dataStats?.data || {};

  return (
    <div className="w-full">
      <Banner
        bannerURI={bannerURI}
        logoURI={logoURI}
        countOwners={countOwners}
        marketCap={marketCap}
        floorChange24h={floorChange24h}
        discordLink={discordLink}
        twitterLink={twitterLink}
        instagramLink={instagramLink}
        websiteLink={websiteLink}
        floorPrice={floorPrice}
        totalSupply={totalSupply}
        address={address}
        contractAddress={contractAddress}
        name={name}
      ></Banner>
      <div className="p-10 flex flex-col gap-14 xl:gap-0 xl:grid xl:grid-cols-4">
        <div className="col-span-1 flex flex-col sm:flex-row xl:flex-col gap-3 sm:gap-12 xl:gap-8">
          <motion.h1
            className="text-3xl lg:text-4xl 2xl:text-5xl font-bold"
            initial={{ x: -20, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{
              delay: 0,
              duration: 0.7,
            }}
          >
            NAVIGATION
          </motion.h1>
          <motion.div
            initial={"offscreen"}
            whileInView={"onscreen"}
            transition={{ staggerChildren: 0.3 }}
            className="text-xl lg:text-2xl 2xl:text-3xl flex flex-row xl:flex-col gap-4 sm:gap-8 font-extralight"
          >
            <motion.button
              className={popularList}
              variants={animateLeft}
              onClick={() => {
                setTokenId("4666");
              }}
            >
              Azuki #4666
            </motion.button>
            <motion.button
              className={popularList}
              variants={animateLeft}
              onClick={() => {
                setTokenId("3407");
              }}
            >
              Azuki #3407
            </motion.button>
            <motion.button
              className={popularList}
              variants={animateLeft}
              onClick={() => {
                setTokenId("1102");
              }}
            >
              Azuki #1102
            </motion.button>
          </motion.div>
        </div>
        <div className="col-span-3 flex flex-row justify-center lg:justify-start gap-16">
          <NftBox
            imageURI={imageURI}
            tokenName={tokenName}
            contractAddress={contractAddress}
            tokenID={tokenID}
            attributes={attributes}
          ></NftBox>
        </div>
      </div>
    </div>
  );
}
