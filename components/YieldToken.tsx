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
  const infuraUrl = 'https://mainnet.infura.io/v3/dc10a4b3a75349aab5abdf2314cbad35'; // Infura URL for Sepolia network


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
    let signer = null;

    let provider;
    try{
        if (window.ethereum == null) {
            console.log("hi")
            // If MetaMask is not installed, we use the default provider,
            // which is backed by a variety of third-party services (such
            // as INFURA). They do not have private keys installed,
            // so they only have read-only access
            console.log("MetaMask not installed; using read-only defaults")
            provider = ethers.getDefaultProvider()
    
        } else {
            console.log("hello")
            // Connect to the MetaMask EIP-1193 object. This is a standard
            // protocol that allows Ethers access to make all read-only
            // requests through MetaMask.
            provider = new ethers.JsonRpcProvider(infuraUrl)
    
            // It also provides an opportunity to request access to write
            // operations, which will be performed by the private key
            // that MetaMask manages for the user.
            // signer = await provider.getSigner();
            //@ts-ignore
            const balance = await provider.getBalance(0x4838B106FCe9647Bdf1E7877BF73cE8B0BAD5f97n);
            console.log(balance);
        }
    } catch (error) {
        console.error(error);
        console.log("Error");
    }
   
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
