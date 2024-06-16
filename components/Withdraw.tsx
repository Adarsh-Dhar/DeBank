"use client";

import Button from './Button';
import { withdraw_token } from './Soroban';


const Withdraw: React.FC = () => {
    
    const withdrawToken = async () => {
  try{
    const response = await withdraw_token();
    console.log(response);
  }catch(e){
    console.log(e);
  }
        
    };

    

    return (
      <div>
        
        <Button onClick={withdrawToken} text='withdraw Tokens' />
      </div>
    );
};

export default Withdraw;
