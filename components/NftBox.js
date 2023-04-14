//donneeee
import Image from "next/image";
import OwnerAskBid from "./OwnerAskBid";
import MoreDetails from "./MoreDetails";

export default function NftBox({
  imageURI,
  tokenName,
  contractAddress,
  tokenID,
  attributes,
}) {
  return (
    <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 2xl:gap-24 items-center lg:items-start">
      <div className="h-60 xs:h-72 sm:h-96 2xl:h-128 w-60 xs:w-72 sm:w-96 2xl:w-128 rounded-2xl relative">
        <Image
          src={imageURI}
          alt="Logo"
          height="600"
          width="600"
          className="rounded-2xl"
        />
      </div>
      <div className="flex flex-col w-full sm:w-fit gap-6 2xl:gap-8 pl ">
        <OwnerAskBid
          contractAddress={contractAddress}
          tokenID={tokenID}
          tokenName={tokenName}
        ></OwnerAskBid>
        <MoreDetails
          contractAddress={contractAddress}
          tokenID={tokenID}
          attributes={attributes}
        ></MoreDetails>
      </div>
    </div>
  );
}
