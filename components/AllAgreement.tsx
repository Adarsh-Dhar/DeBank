import React from 'react';
import Button from './Button';
import { view_all_agreement } from './Soroban';

const AllAgreement: React.FC = () => {
    const getAllAgreement = async () => {
        const result = await view_all_agreement();
        console.log(result)
    }
    return (
       <div>
        <Button text='all agreement' onClick={getAllAgreement}/>
       </div>
    );
};

export default AllAgreement;