import { HiOutlineDocument } from "react-icons/hi2";

export default function TokenDetails({ contractAddress, tokenID }) {
  const handleCopy = async () => {
    await navigator.clipboard.writeText(contractAddress);
    alert("Contract address copied to clipboard!");
  };
  const tokenDetailsContainer = "flex flex-row justify-between";
  const detailTag = "text-gray-400";
  const detailDes = "font-bold";
  return (
    <div className="w-full p-6 flex flex-col gap-3">
      <div className={tokenDetailsContainer}>
        <p className={detailTag}>Token ID</p>
        <p className={detailDes}>{tokenID}</p>
      </div>
      <div className={tokenDetailsContainer}>
        <p className={detailTag}>Blockchain</p>
        <p className={detailDes}>Ethereum</p>
      </div>
      <div className={tokenDetailsContainer}>
        <p className={detailTag}>Token Standard</p>
        <p className={detailDes}>ERC721</p>
      </div>
      <div className={tokenDetailsContainer}>
        <p className={detailTag}>Contract</p>
        <div className="flex flex-row items-center gap-3">
          <p className={detailDes}>
            {contractAddress.slice(0, 2)}...
            {contractAddress.slice(contractAddress.length - 4)}
          </p>
          <button onClick={handleCopy} className="cursor-pointer">
            <HiOutlineDocument />
          </button>
        </div>
      </div>
    </div>
  );
}
