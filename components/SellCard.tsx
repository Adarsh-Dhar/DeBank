import React from 'react';
import Button from './Button';
// import { buyAgreement } from './Soroban';
import Link from "next/link";
import { view_all_agreement } from './Soroban';

interface CardProps {
   price: any;
    timeLeft: any;
    finalAmount: any;
}

const SellCard: React.FC<CardProps> = ({price, timeLeft, finalAmount }) => {
    const newPrice = price.toString();
    const newTimeLeft = timeLeft.toString();
    const newFinalAmount = finalAmount.toString();
    const sellThisAgreement = async () => {
        const response = await view_all_agreement();
        console.log('Response:', response);
    }

    const withdrawThisAgreement = async () => {
        alert("agreement hasn't matured yet")
    }
    return (

<div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow ">
    <p className="mb-3 font-normal text-gray-700 ">{newPrice}</p>
    <p className="mb-3 font-normal text-gray-700 ">{newTimeLeft}</p>
    <p className="mb-3 font-normal text-gray-700 ">{newFinalAmount}</p>
    <Link href="/agreements/marketplace" passHref>
   <Button text='sell' onClick={sellThisAgreement} />
   </Link>
   <Button text='withdraw' onClick={withdrawThisAgreement} />
</div>

    );
};

export default SellCard;