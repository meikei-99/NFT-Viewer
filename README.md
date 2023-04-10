# NFT viewer @ Ethereum mainnet

## Features:

1. Fetch data from <a href="https://looksrare.dev/reference/getcollectiontoken">LookRare’s API</a> to display the NFT's name, description, tokenId and image✅
2. Button for the user to connect their MetaMask wallet ✅
3. Ability to check whether the connected wallet owns the NFT with visual indication ✅
   (If you are the owner, display of "YOU" will be shown below the Owner's label. If you are not the owner, display of "0x..." which indicates the actual owner address will be shown below the Owner's label)
   
   <img src="./owner_truthy.png" alt="Truthy indication" title="Optional title" width="600px" height="200px">
   <img src="./owner_falsy.png" alt="Falsy indication" title="Optional title" width="600px" height="200px">

<br/>

## Bonus Features:

1. Fetch data using React Query ✅
   (Can refer to Activity.js, Metadata.js and OwnerAskBid.js in the "components" folder)
2. Populate the query collection address and tokenId using url params ✅
   (Parameters are added at the end of the URL as follows: `https://api.looksrare.org/api/v1/orders?isOrderAsk=true&collection=${contractAddress}&tokenId=${tokenID}&status%5B%5D=VALID`)
3. Ability to navigate to other NFTs ( token id of 9211,1380 and 5457) within the same collection (Azuki) ✅
4. Fetch and display more information such as attributes, historical activity, floor price, market cap, total supply, unique owners, owner's address, and contract address ✅
5. The React web app was built with Next.js and Chakra UI was used for components such as spinner ✅

<br/>

## Stretch Goal Features:

1. Display LooksRare ask order with parameters such as the owner’s address, current price, and time left ✅
2. Execute valid listing via the <a href="https://etherscan.io/address/0x59728544b08ab483533076417fbbb2fd0b17ce3a">V1 exchange contract</a> using `matchAskWithTakerBid`. The contract function was called using Ethers.js ✅
   <br/>

## **Disclaimer**

This project is still in development mode and future improvement is needed. It might take some time to load the webpages.
Thank you.
<br/>
Live demo:<a href="https://nft-viewer-one.vercel.app/" target="_blank"> here</a>.
