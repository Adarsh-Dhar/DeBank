"use client";
import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { YIELDTOKEN_ABI } from '@/abi/YieldToken';
import Button from './Button';

const YieldToken = () => {
  const [balance, setBalance] = useState("");
  const [address, setAddress] = useState(''); 
  const [amount, setAmount] = useState(""); 
  const abi = YIELDTOKEN_ABI;
  
 ; // Replace with your contract address
  const infuraUrl = 'https://sepolia.infura.io/v3/dc10a4b3a75349aab5abdf2314cbad35'; // Infura URL for Sepolia network
  const provider = new ethers.JsonRpcProvider(infuraUrl);
  const walletAddress = "0xc7913E7954F77DcF81984ee0b5feE8f3eF740E16"



//   useEffect(() => {
//     const fetchBalance = async () => {
//     //   if (!window.ethereum) return; 
//       const provider = new ethers.BrowserProvider(window.ethereum);
//       const signer = await provider.getSigner(); 
//       const contract = new ethers.Contract(contractAddress, abi, signer); 
//       const signerAddress = await signer.getAddress();
//       const balance = await contract.balanceOf(signerAddress); 
//       setBalance(ethers.formatEther(balance)); 
//       console.log("hi");
//     };
//     fetchBalance(); 
//   }, [abi, contractAddress]);



  const mintTokens = async () => {
    const contract = new ethers.Contract(walletAddress, abi, provider);
  };

  return (
    <div>
      <h2>Yield Token Component</h2>
      <p>Current Balance: {balance}</p> 
      <input
        type="text"
        placeholder="Recipient Address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
      /> 
      <input
        type="text"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      /> 
      <Button onClick={mintTokens} text='Mint Token' />
    </div>
  );
};

export default YieldToken;
