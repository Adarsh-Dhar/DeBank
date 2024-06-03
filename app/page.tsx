"use client"

import Image from "next/image";
import Appbar from "@/components/Appbar";
import Ethers from "@/components/Ethers";
import { RecoilRoot } from "recoil";
import Token from "@/components/Token";

export default function Home() {
  return (
    <div>
      <RecoilRoot>
   <Appbar />
   <Token />

   </RecoilRoot>
   </div>
  );
}
