"use client";

import React from 'react';
import Button from './Button';




const Marketplace: React.FC = () => {
    


    const sellYield = async () => {
        console.log("yields sold")
    };

    const buyYield = async () => {
        console.log("yields bought")
    };

    return (
      <div>
        
        <Button onClick={sellYield} text='Sell Yields' />
        <Button onClick={buyYield} text='Buy Yields' />

      </div>
    );
};

export default Marketplace;
