import { useState, useEffect } from "react";
import ConnectButton from "./ConnectButton";

export default function Navbar() {
  const [showNav, setShowNav] = useState(true);
  const controlNavbar = () => {
    if (window.scrollY > 200) {
      setShowNav(false);
    } else {
      setShowNav(true);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", controlNavbar);
    return () => {
      window.removeEventListener("scroll", controlNavbar);
    };
  });

  return (
    <div
      className={`fixed top-0 left-0 bg-[#121619] z-30 w-full px-10 py-4 text-white flex flex-row justify-between ${
        showNav ? "" : "hidden ..."
      }`}
    >
      <h1 className="text-lg lg:text-xl 2xl:text-2xl text-[#0ce466]">
        NFT Viewer
      </h1>
      <ConnectButton></ConnectButton>
    </div>
  );
}
