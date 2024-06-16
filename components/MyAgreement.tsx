import React from 'react';
import Button from './Button';
import { showMyAgreement } from './Soroban';

const MyAgreement: React.FC = () => {
    const getMyAgreement = async () => {
        const result = await showMyAgreement();
        console.log(result)
    }
    return (
       <div>
        <Button text='my agreement' onClick={getMyAgreement}/>
       </div>
    );
};

export default MyAgreement;