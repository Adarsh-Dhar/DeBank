"use client";

import React, { useEffect } from 'react';
import Button from './Button';
import { depositTokens } from './Soroban';




const Deposit: React.FC = () => {
    


    const depositToken = async () => {

        const response = await depositTokens();
        console.log(response);
    };

    

    return (
      <div>
        
        <Button onClick={depositToken} text='Deposit Tokens' />
      </div>
    );
};

export default Deposit;
