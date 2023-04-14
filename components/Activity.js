import axios from "axios";
import { useQuery } from "react-query";
import { useState } from "react";
import { BsArrowUpRightSquare } from "react-icons/bs";
import Link from "next/link";

export default function Activity({ contractAddress, tokenID }) {
  const [displayCount, setDisplayCount] = useState(3);

  const fetchAskOrder = async () => {
    const response = await axios.get(
      `https://api.looksrare.org/api/v1/events?collection=${contractAddress}&tokenId=${tokenID}`,
      { headers: { accept: "application/json" } }
    );

    return response.data;
  };

  const { data, isLoading, error } = useQuery(
    ["fetchActivity", contractAddress, tokenID],
    fetchAskOrder
  );

  if (isLoading) {
    return <p className="flex items-center py-3">Fetching activity ...</p>;
  }
  if (error) {
    return (
      <p className="flex items-center py-3">
        Error fetching activity: {error.message}
      </p>
    );
  }

  const itemsToDisplay = data.data.slice(0, displayCount);

  const handleLoadMore = () => {
    setDisplayCount(displayCount + 3);
  };

  return (
    <div className="text-sm 2xl:text-base flex flex-col justify-start h-80 overflow-y-auto w-full">
      {itemsToDisplay.map((item) => (
        <div
          key={item.id}
          className="flex flex-col gap-2 p-6 border-b border-gray-700"
        >
          <p className="flex justify-start border border-[#0ce466] rounded-2xl w-fit px-4">
            {item.type}
          </p>
          <p className="flex flex-row justify-between items-center">
            <div className="flex flex-row items-center gap-2">
              <p>From </p>
              <span className="font-bold">
                {item.from.slice(0, 6)}...
                {item.from.slice(item.from.length - 4)}
              </span>
              <Link
                href={`https://looksrare.org/accounts/${item.from}`}
                target="_blank"
              >
                <BsArrowUpRightSquare></BsArrowUpRightSquare>
              </Link>
            </div>
          </p>
          <p className="flex flex-row justify-between items-center">
            <div className="flex flex-row items-center gap-2">
              <p>Date </p>
              <span className="font-bold">
                {new Date(item.createdAt).toLocaleString("en-US", {
                  hour12: false,
                })}
              </span>
            </div>
          </p>
        </div>
      ))}
      <div className="py-6 flex place-content-center">
        {displayCount < data.data.length && (
          <button
            onClick={handleLoadMore}
            className="rounded-2xl border border-gray-700 px-3 py-1"
          >
            Load More
          </button>
        )}
      </div>
    </div>
  );
}
