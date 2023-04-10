//doneeeeee
import { MdOutlineContentCopy } from "react-icons/md";
import { BsDiscord, BsTwitter, BsInstagram, BsShop } from "react-icons/bs";
import Link from "next/link";
import Image from "next/image";

export default function Banner({
  bannerURI,
  logoURI,
  countOwners,
  marketCap,
  floorChange24h,
  discordLink,
  twitterLink,
  instagramLink,
  websiteLink,
  floorPrice,
  totalSupply,
  address,
  contractAddress,
  name,
}) {
  const number = "text-lg lg:text-xl 2xl:text-2xl font-bold";
  const des = "text-xs lg:text-sm 2xl:text-base text-gray-500";

  const handleCopy = async () => {
    await navigator.clipboard.writeText(address);
    alert("Contract address copied to clipboard!");
  };
  return (
    <div
      className="w-full h-72 bg-cover overflow-hidden relative"
      style={{ backgroundImage: `url(${bannerURI})` }}
    >
      <div className="absolute inset-0 bg-gradient-to-t from-[#121619]  via-[#121619]/[0.85] to-[#121619]/[0.8] z-10"></div>
      <div className="absolute w-full h-full px-6 xs:px-10 z-20 flex flex-col gap-4 justify-center align-middle">
        <div className="flex flex-row items-center gap-5 xs:gap-8">
          <div className="grid place-content-center h-28 w-28 xs:h-32 xs:w-32 rounded-2xl">
            <Image
              src={logoURI}
              alt="Logo"
              width={200}
              height={200}
              className="rounded-2xl"
            />
          </div>
          <div className="flex flex-col gap-4 justify-end ">
            <p className="text-3xl lg:text-4xl 2xl:text-5xl font-bold">
              {name}
            </p>
            <div className="flex flex-col xs:flex-row gap-2 ">
              <p className="text-xs lg:text-sm 2xl:text-base">
                {totalSupply} <span className="text-gray-400">NFTs</span>
              </p>
              <div className="text-xs lg:text-sm 2xl:text-base flex flex-row items-center gap-2 border border-white rounded-md px-3">
                <p>
                  {contractAddress.slice(0, 2)}...
                  {contractAddress.slice(contractAddress.length - 4)}
                </p>
                <button onClick={handleCopy}>
                  <MdOutlineContentCopy></MdOutlineContentCopy>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-2 sm:gap-0 sm:flex-row justify-between items-center text-base lg:text-lg 2xl:text-2xl">
          <div className="w-full flex flex-row gap-8">
            <div>
              <p className={number}>{(countOwners / 1e3).toFixed(1)}K</p>
              <p className={des}>Owners</p>
            </div>
            <div>
              <p className={number}>{(marketCap / 1e18 / 1e3).toFixed(1)}K </p>
              <p className={des}>M.Cap</p>
            </div>
            <div>
              <p className={number}>{(floorPrice / 1e18).toFixed(1)} ETH</p>
              <div className="flex justify-between">
                <p className={des}>Floor</p>
                <p className={des}>{floorChange24h}%</p>
              </div>
            </div>
          </div>
          <div className="flex flex-row w-full sm:w-fit">
            {websiteLink && (
              <Link
                target="_blank"
                href={websiteLink}
                className="hover:bg-gray-700 p-2 rounded-lg"
              >
                <BsShop></BsShop>
              </Link>
            )}
            {discordLink && (
              <Link
                target="_blank"
                href={discordLink}
                className="hover:bg-gray-700 p-2 rounded-lg"
              >
                <BsDiscord></BsDiscord>
              </Link>
            )}
            {twitterLink && (
              <Link
                target="_blank"
                href={twitterLink}
                className="hover:bg-gray-700 p-2 rounded-lg"
              >
                <BsTwitter></BsTwitter>
              </Link>
            )}
            {instagramLink && (
              <Link
                target="_blank"
                href={instagramLink}
                className="hover:bg-gray-700 p-2 rounded-lg"
              >
                <BsInstagram></BsInstagram>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
