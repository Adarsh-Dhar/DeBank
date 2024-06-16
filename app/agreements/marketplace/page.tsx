"use client"

import Appbar from "@/components/Appbar";
import { RecoilRoot } from "recoil";

import BuyAgreement from "@/components/BuyAgreements"

export default function Home() {
  return (
    <div>
      <RecoilRoot>
   <Appbar />
   <BuyAgreement />
  
   </RecoilRoot>
   </div>
  );
}
