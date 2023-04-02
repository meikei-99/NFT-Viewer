import Head from "next/head";
import Metadata from "./components/Metadata";
import Navbar from "./components/Navbar";

export default function Home() {
  return (
    <>
      <Head>
        <title>NFT Viewer</title>
        <meta name="description" content="NFT Viewer with LooksRare's API" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/logo.png" />
      </Head>

      <div className="bg-[#121619] min-h-screen h-full flex items-center justify-center text-white pt-20 xs:pt-16 relative">
        <Navbar></Navbar>
        <Metadata />
      </div>
    </>
  );
}
