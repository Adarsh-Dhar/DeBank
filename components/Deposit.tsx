"use client";

import React, { useEffect } from 'react';
import Button from './Button';
import { deposit_token } from './Soroban';
import { publicKeyAtom } from '@/store/atoms/account';
import { useRecoilValue } from 'recoil';
import Input from './Input';




const Deposit: React.FC = () => {
    const publicKey = useRecoilValue(publicKeyAtom)
    const [amount, setAmount] = React.useState(0);
    const [duration, setDuration] = React.useState(0);


    const depositToken = async () => {
  try{
    const response = await deposit_token(duration, amount);
    console.log(response);
  }catch(e){
    console.log(e);
  }
        
    };

    

    return (
      <div>
        <Input value={amount} onChange={(e : any) => setAmount(e.target.value)} type='number' text='Amount' placeholder='Amount of token you want to deposit....' />
        <Input value={duration} onChange={(e : any) => setDuration(e.target.value)} type='number' text='Duration' placeholder='Till how much duration you want to keep the token....' />

        <Button onClick={depositToken} text='Deposit Tokens' />
      </div>
    );
};

export default Deposit;
