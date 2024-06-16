"use client";

import React, { useEffect } from 'react';
import Button from './Button';
import { deposit_token, view_all_agreement} from './Soroban';
import { publicKeyAtom } from '@/store/atoms/account';
import { useRecoilValue } from 'recoil';
import Input from './Input';
import { get } from 'http';
import Link from "next/link";




const Deposit: React.FC = () => {
    const publicKey = useRecoilValue(publicKeyAtom)
    const [amount, setAmount] = React.useState(0);
    const [duration, setDuration] = React.useState(0);
    const [owner , getOwner] = React.useState("")
    const [token , getToken] = React.useState("")

    const [price , getPrice] = React.useState("")

    const [initialAmount , getInitialAmount] = React.useState("")

    const [finalAmount , getFinalAmount] = React.useState(0)

    const [startTime , getStartTime] = React.useState("")

    const [endTime , getEndTime] = React.useState(0)

    const [withdrawn , getWithdrawn] = React.useState(false)

    const [onMarket , getOnMarket] = React.useState(false)

    const [active , getActive] = React.useState(false)
    const [timeLeft , getTimeLeft] = React.useState("")





    const viewAgreement = async () => {
  try{
    const response = await view_all_agreement();
    console.log(response);
    //@ts-ignore

    getActive(response._value[0]._attributes.val._value);
    console.log(active);
    //@ts-ignore
    getEndTime(response._value[1]._attributes.val._value._value)
    //@ts-ignore

    console.log(response._value[1]._attributes.val._value._value);

    //@ts-ignore
    getFinalAmount(response._value[2]._attributes.val._value._attributes.lo._value)
    //@ts-ignore

    console.log(response._value[2]._attributes.val._value._attributes.lo._value);
    //@ts-ignore

    console.log(response._value[3]._attributes.val._value._attributes.lo._value);
    //@ts-ignore
    getOnMarket(response._value[4]._attributes.val._value);
    console.log(onMarket);
    //@ts-ignore

    console.log(response._value[5]._attributes.val._value);
    //@ts-ignore

    console.log(response._value[6]._attributes.val._value._attributes.lo._value);
    //@ts-ignore

    console.log(response._value[7]._attributes.val._value._value);
    //@ts-ignore

    console.log(response._value[8]._attributes.val._value._value);
    //@ts-ignore
    getWithdrawn(response._value[9]._attributes.val._value);
    console.log(withdrawn);
    //@ts-ignore

    console.log(response._value[10]._attributes.val._value);


  }catch(e){
    console.log(e);
  }
        
    };

    const depositToken = async () => {
      const response = await deposit_token(duration, amount);
      console.log(response);
    }

    

    return (
      <div>
        <Input value={amount} onChange={(e : any) => setAmount(e.target.value)} type='number' text='Amount' placeholder='Amount of token you want to deposit....' />
        <Input value={duration} onChange={(e : any) => setDuration(e.target.value)} type='number' text='Duration' placeholder='Till how much duration you want to keep the token....' />

        <Button onClick={depositToken} text='Deposit Tokens' />
        <Link href="/agreements" passHref>
        <Button onClick={viewAgreement} text='View Agreements' />
        </Link>
      </div>
    );
};

export default Deposit;
