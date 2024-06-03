import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { useRecoilValue,useSetRecoilState } from 'recoil';
import { amountAtom, durationAtom } from '@/store/atoms/token';
import { contractAtom, providerAtom } from '@/store/atoms/account';
import { use } from 'chai';

const yieldVaultAbi = [
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_yieldToken",
        "type": "address"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "inputs": [],
    "name": "agreementCount",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "duration",
        "type": "uint256"
      }
    ],
    "name": "deposit",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "fixedYieldAgreements",
    "outputs": [
      {
        "internalType": "address",
        "name": "depositor",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "startTime",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "endTime",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "yieldAmount",
        "type": "uint256"
      },
      {
        "internalType": "bool",
        "name": "withdrawn",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "owner",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "agreementId",
        "type": "uint256"
      }
    ],
    "name": "withdrawYield",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "yieldToken",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
]

const yieldVaultAddress = "0x73283face4792af6555Ad7b3bA10663cC2686b6A";
//@ts-ignore
function Token() {
  const contract = useRecoilValue(contractAtom);
  const setContract = useSetRecoilState(contractAtom);
  const amount = useRecoilValue(amountAtom);
  const setAmount = useSetRecoilState(amountAtom);
  const duration = useRecoilValue(durationAtom);    
  const setDuration = useSetRecoilState(durationAtom);

  
    const depositTokens = async () => {
      try{
        const provider = new ethers.BrowserProvider(window.ethereum);
       await provider.send("eth_requestAccounts", []);
       const signer = await provider.getSigner();
       //@ts-ignore
       const contract = new ethers.Contract(yieldVaultAddress, yieldVaultAbi, signer);
       
       const tx = await contract.deposit(amount, duration);
       await tx.wait();
         console.log(await tx.wait())
         console.log("Transaction hash:", tx.hash);
         console.log("deposit Token successful")
      } catch (error) {
        console.log(error)
      }
       
    }
     ;

     useEffect(() => {
        depositTokens()
     },[])


    

  

  return (
    <div>
      <h1>Yield Vault</h1>
      <input
        type="text"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <input
        type="text"
        placeholder="Duration (in seconds)"
        value={duration}
        onChange={(e) => setDuration(e.target.value)}
      />
      <button onClick={depositTokens}>Deposit Tokens</button>
    </div>
  );
}

export default Token;
