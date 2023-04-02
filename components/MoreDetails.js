import { useState } from "react";
import Attributes from "./Attributes";
import Activity from "./Activity";
import TokenDetails from "./TokenDetails";

export default function MoreDetails({ contractAddress, tokenID, attributes }) {
  const [showAttributes, setShowAttributes] = useState(false);
  const [showActivity, setShowActivity] = useState(false);
  const [showTokenDetails, setShowTokenDetails] = useState(false);
  const showMoreButton =
    "w-full xl:w-128 rounded-2xl text-gray-300 border border-[#292f35] flex flex-col items-center";

  const handleShowAttributes = () => {
    setShowAttributes(!showAttributes);
  };
  const handleShowActivity = () => {
    setShowActivity(!showActivity);
  };
  const handleShowTokenDetails = () => {
    setShowTokenDetails(!showTokenDetails);
  };
  return (
    <div className="text-sm 2xl:text-base flex flex-col gap-4">
      <button className={showMoreButton} onClick={handleShowAttributes}>
        <p
          className={`py-3 w-full bg-[#21252b] ${
            showAttributes ? " rounded-t-2xl border" : " rounded-2xl border"
          }}`}
        >
          Properties
        </p>
        {showAttributes && <Attributes attributes={attributes} />}
      </button>
      <p className={showMoreButton}>
        <button
          onClick={handleShowActivity}
          className={`py-3 w-full bg-[#21252b] ${
            showActivity ? " rounded-t-2xl border" : " rounded-2xl border"
          }}`}
        >
          Activity
        </button>
        {showActivity && (
          <Activity contractAddress={contractAddress} tokenID={tokenID} />
        )}
      </p>
      <p className={showMoreButton}>
        <button
          onClick={handleShowTokenDetails}
          className={`py-3 w-full bg-[#21252b] ${
            showTokenDetails ? " rounded-t-2xl border" : " rounded-2xl border"
          }}`}
        >
          Token Details
        </button>
        {showTokenDetails && (
          <TokenDetails contractAddress={contractAddress} tokenID={tokenID} />
        )}
      </p>
    </div>
  );
}
