"use client";

import React from 'react';
import Button from './Button';




const Withdraw: React.FC = () => {
    


    const withdrawTokens = async () => {
        console.log("tokens withdrawled")
    };

    return (
      <div>
        
        <Button onClick={withdrawTokens} text='Withdraw Tokens' />
      </div>
    );
};

export default Withdraw;
