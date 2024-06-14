"use client"

import Image from "next/image";
import Appbar from "@/components/Appbar";
import { RecoilRoot } from "recoil";
import Deposit from "@/components/Deposit";
import Withdraw from "@/components/Withdraw";
import Marketplace from "@/components/Marketplace";

export default function Home() {
  return (
    <div>
      <RecoilRoot>
   <Appbar />
   <Deposit />
   <Withdraw />
   <Marketplace />

   </RecoilRoot>
   </div>
  );
}
