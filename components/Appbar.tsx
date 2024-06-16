"use client";

import React from 'react';
import Button from './Button';
import { ethers } from 'ethers';
import { useRecoilValue ,useSetRecoilState} from 'recoil';
import { publicKeyAtom } from '@/store/atoms/account';
import { useState } from 'react';
import { checkConnection,retrievePublicKey } from './Freighter';


declare global {
    interface Window {
        ethereum: any;
    }
}

const Appbar: React.FC = () => {
    const publicKey = useRecoilValue(publicKeyAtom)
    const getPublicKey = useSetRecoilState(publicKeyAtom)
  const [connect, getConnected] = useState("Connect");

   


    const connectWallet = async () => {
      if (await checkConnection()) {
        let publicKey = await retrievePublicKey();
        getPublicKey(publicKey);
        console.log(publicKey);
      }
      }
    

    return (
      <div className="flex items-center justify-between p-4 bg-indigo-950">
        <Button onClick={connectWallet} text='Connect Freighter' />
      </div>
    );
};

export default Appbar;
