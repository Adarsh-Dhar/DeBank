"use client";

import React from 'react';
import Button from './Button';
import { ethers } from 'ethers';
import { useRecoilValue ,useSetRecoilState} from 'recoil';
import { accountAtom,providerAtom } from '@/store/atoms/account';

declare global {
    interface Window {
        ethereum: any;
    }
}

const Appbar: React.FC = () => {
    const account = useRecoilValue(accountAtom)
    const setAccount = useSetRecoilState(accountAtom)
    const provider = useRecoilValue(providerAtom)
    const setProvider = useSetRecoilState(providerAtom)


    const connectWallet = async () => {
        if (window.ethereum) {
            try {
              const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
              //@ts-ignore
              setProvider(await new ethers.BrowserProvider(window.ethereum));
              setAccount(accounts[0]);
              console.log(account)
              console.log(provider)
            } catch (error) {
              console.error("Error connecting to MetaMask", error);
            }
          } else {
            alert("Please install MetaMask!");
          }
    };

    return (
        <Button onClick={connectWallet} text='connect metamask'/>
    );
};

export default Appbar;
