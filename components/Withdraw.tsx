"use client";

import Button from './Button';
import { withdrawToken } from './Soroban';


const Withdraw: React.FC = () => {
    
    const withdrawTokens = async () => {
  try{
    const response = await withdrawToken();
    console.log(response);
  }catch(e){
    console.log(e);
  }
        
    };

    

    return (
      <div>
        
        <Button onClick={withdrawTokens} text='withdraw Tokens' />
      </div>
    );
};

export default Withdraw;
