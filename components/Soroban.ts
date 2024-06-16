import 'dotenv/config';
import {
    Contract, SorobanRpc,
    TransactionBuilder,
    Networks,
    BASE_FEE,
    nativeToScVal, Address
} from "@stellar/stellar-sdk";
import { userSignTransaction } from './Freighter';
import { getPublicKey } from '@stellar/freighter-api';


let rpcUrl = "https://soroban-testnet.stellar.org";
let contractAddress = 'CBAMTMBMOECISX7P4ENQRFHL4HJS3TX5HZZ6MUKPR5TUN5IBAGY6DHHN';



const i128ToScVal = (value : any) => {
    return nativeToScVal(value, { type: "i128" })
}

const u64ToScVal = (value : any) => {
    return nativeToScVal(value, { type: "u64" })
}

const accountToScVal = (account : any) => new Address(account).toScVal();


let params = {
    fee: BASE_FEE,
    networkPassphrase: Networks.TESTNET
}




async function contractInt(caller : any, functName : any, values : any) {
    const provider = new SorobanRpc.Server(rpcUrl, { allowHttp: true });
    const contract = new Contract(contractAddress);
    const sourceAccount = await provider.getAccount(caller);
    console.log(`source account : ${sourceAccount}`)
    let buildTx;
    console.log(`source account : ${sourceAccount}`)
    if (values == null) {
        buildTx = new TransactionBuilder(sourceAccount, params)
        .addOperation(contract.call(functName))
        .setTimeout(30).build();
        console.log(1)
    }
    else {
        buildTx = new TransactionBuilder(sourceAccount, params)
        .addOperation(contract.call(functName, ...values))
        .setTimeout(30).build();
        console.log(2)
    }
    let _buildTx = await provider.prepareTransaction(buildTx);
    console.log(`buildTx : ${_buildTx}`)
    let prepareTx = _buildTx.toXDR();
    let signedTx = await userSignTransaction(prepareTx, "TESTNET", caller);
    let tx = TransactionBuilder.fromXDR(signedTx, Networks.TESTNET);
    try {
        let sendTx = await provider.sendTransaction(tx).catch(function (err) {
            return err;
        });
        if (sendTx.errorResult) {
            throw new Error("Unable to submit transaction");
        }
        if (sendTx.status === "PENDING") {
            let txResponse = await provider.getTransaction(sendTx.hash);
            while (txResponse.status === "NOT_FOUND") {
                txResponse = await provider.getTransaction(sendTx.hash);
                await new Promise((resolve) => setTimeout(resolve, 100));
            }
            if (txResponse.status === "SUCCESS") {
                let result = txResponse.returnValue;
                return result;
            }
        }
    } catch (err) {
        return err;
    }
}



async function deposit_token(duration : any, amount : any) {
    let token = "CDLZFC3SYJYDZT7K67VZ75HPJVIEUVNIXF47ZG2FB2RMQQVU2HHGCYSC"
    let caller = await getPublicKey();
    let voter = accountToScVal(caller);
    let newToken = accountToScVal(token);
    let values = [u64ToScVal(duration), i128ToScVal(amount), voter, newToken];
    let result = await contractInt(caller, 'deposit_token', values);
    return result;
}


async function buy_token() {
    let token = "CDLZFC3SYJYDZT7K67VZ75HPJVIEUVNIXF47ZG2FB2RMQQVU2HHGCYSC"
    let owner = "GBYP2HMUTRQ3I3WL3LDPKGO5KF7R5JVINSJIW7R5YUS2WLGQY7SXM3AA"
    let newOwner = accountToScVal(owner);
    let caller = await getPublicKey();
    let buyer = accountToScVal(caller);
    let newToken = accountToScVal(token);
    let values = [i128ToScVal(170000000),newOwner , newToken,buyer];
    let result = await contractInt(caller, 'deposit_token', values);
    return result;
}

async function withdraw_token() {
    let token = "CDLZFC3SYJYDZT7K67VZ75HPJVIEUVNIXF47ZG2FB2RMQQVU2HHGCYSC"
    let caller = await getPublicKey();
    let voter = accountToScVal(caller);
    let newToken = accountToScVal(token);
    let values = [ voter, newToken];
    let result = await contractInt(caller, 'withdraw_token', values);
    return result;
}

async function view_all_agreement() {
    let caller = await getPublicKey();
    let result = await contractInt(caller, 'view_all_agreement', null);
    
    return result
}






export {  deposit_token, withdraw_token, view_all_agreement,buy_token };