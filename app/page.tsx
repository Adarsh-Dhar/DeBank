"use client"

import Image from "next/image";
import Appbar from "@/components/Appbar";
import { RecoilRoot } from "recoil";
import Deposit from "@/components/Deposit";

export default function Home() {
  return (
    <div>
      <RecoilRoot>
   <Appbar />
   <Deposit />
   {/* <Withdraw /> */}
   

   </RecoilRoot>
   </div>
  );
}
