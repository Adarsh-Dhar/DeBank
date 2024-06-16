import React, { useEffect } from 'react';
import Button from './Button';
import { view_all_agreement } from './Soroban';
import Card from './SellCard';
import { useState } from 'react';
import Input from './Input';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { priceAtom } from '@/store/atoms/offer';
import { finalAmountAtom, timeLeftAtom } from '@/store/atoms/card';

const Marketplace = () => {
    const price = useRecoilValue(priceAtom)
    const setPrice = useSetRecoilState(priceAtom)
    const timeLeft = useRecoilValue(timeLeftAtom)
    const setTimeLeft = useSetRecoilState(timeLeftAtom)
    const finalAmount = useRecoilValue(finalAmountAtom)
    const setFinalAmount = useSetRecoilState(finalAmountAtom)

    const availableAgreements = async () => {
        try {
            const response = await view_all_agreement();
            
            console.log('Response:', response);

            //@ts-ignore
            const priceValue = response._value[6]._attributes.val._value._attributes.lo._value;
            //@ts-ignore
            const timeLeftValue = response._value[8]._attributes.val._value._value;
            //@ts-ignore
            const finalAmountValue = response._value[2]._attributes.val._value._attributes.lo._value;

            setPrice(priceValue);
            setTimeLeft(timeLeftValue);
            setFinalAmount(finalAmountValue);

            console.log(`price: ${price}, timeLeft: ${timeLeft}, finalAmount: ${finalAmount}`);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        availableAgreements();
    },[])

    return (
        <div>
            <Input type="text" value={price} onChange={(e : any) => setPrice(e.target.value)} placeholder='price' text='price'/>
            <Card price={price} timeLeft={timeLeft} finalAmount={finalAmount} />
        </div>
    );
};

export default Marketplace;
