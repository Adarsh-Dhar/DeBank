import React from 'react';
import Button from './Button';
import { view_all_agreement } from './Soroban';
import Card from './BuyCard';
import { useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { priceAtom } from '@/store/atoms/offer';
import { finalAmountAtom, timeLeftAtom } from '@/store/atoms/card';

const BuyAgreement = () => {
    const price = useRecoilValue(priceAtom)
    const setPrice = useSetRecoilState(priceAtom)
    const timeLeft = useRecoilValue(timeLeftAtom)
    const setTimeLeft = useSetRecoilState(timeLeftAtom)
    const finalAmount = useRecoilValue(finalAmountAtom)
    const setFinalAmount = useSetRecoilState(finalAmountAtom)

    

    return (
        <div>
            <Card price={170000000} timeLeft={100} finalAmount={176666666} />
        </div>
    );
};

export default BuyAgreement;
