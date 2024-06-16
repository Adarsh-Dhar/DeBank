import React from 'react';
import Button from './Button';
// import { buyAgreement } from './Soroban';
import Link from "next/link";
import { buy_token, view_all_agreement } from './Soroban';

interface CardProps {
   price: any;
    timeLeft: any;
    finalAmount: any;
}

const BuyCard: React.FC<CardProps> = ({price, timeLeft, finalAmount }) => {
    const newPrice = price.toString();
    const newTimeLeft = timeLeft.toString();
    const newFinalAmount = finalAmount.toString();
    const buyThisAgreement = async () => {
        const response = await buy_token()
        console.log(response)
    }

    
    return (

<div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow ">
    <p className="mb-3 font-normal text-gray-700 ">{newPrice}</p>
    <p className="mb-3 font-normal text-gray-700 ">{newTimeLeft}</p>
    <p className="mb-3 font-normal text-gray-700 ">{newFinalAmount}</p>
    <Link href="/agreements/marketplace" passHref>
   <Button text='buy' onClick={buyThisAgreement} />
   </Link>
   
</div>

    );
};

export default BuyCard;