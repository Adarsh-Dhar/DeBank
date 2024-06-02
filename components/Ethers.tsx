"use client";
import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { YIELDTOKEN_ABI } from '@/abi/YieldToken';
import Button from './Button';

const Ethers = () => {
  
  
 ; // Replace with your contract address
  const infuraUrl = 'https://mainnet.infura.io/v3/dc10a4b3a75349aab5abdf2314cbad35'; // Infura URL for Sepolia network
  const provider = new ethers.JsonRpcProvider(infuraUrl);

  const queryBlockchain = async () => {
    const block = await provider.getBlockNumber();
    console.log(`block number: ${block}`);

    const balance = await provider.getBalance('0x4838B106FCe9647Bdf1E7877BF73cE8B0BAD5f97');
    const formattedBalance = ethers.formatEther(balance);
    console.log(`balance: ${formattedBalance}`);
  }

return(
    <div><Button text='test' onClick={queryBlockchain}/></div>
)
};

export default Ethers;
