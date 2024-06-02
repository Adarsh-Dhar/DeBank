"use client";

import React from 'react';
import Button from './Button';

declare global {
    interface Window {
        ethereum: any;
    }
}

const Appbar: React.FC = () => {
    const connectWallet = async () => {
        try {
            const { ethereum } = window;
            if (!ethereum) {
                console.error('MetaMask is not installed!');
                return;
            }
            const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
            console.log(accounts[0]);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Button onClick={connectWallet} text='connect metamask'/>
    );
};

export default Appbar;
