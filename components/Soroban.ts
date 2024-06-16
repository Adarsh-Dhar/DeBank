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
let contractAddress = 'CAGDTX4FFH2H64HCS53IQU5YTZUDAZU4ZCIWOBHGTPM4GOFIDA2L5NOX';



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

// async function fetchPoll() {
//     let caller = await getPublicKey();
//     let result = await contractInt(caller, 'view_poll', null);
//     let no = (result._value[0]._attributes.val._value).toString();
//     let total = (result._value[1]._attributes.val._value).toString();
//     let yes = (result._value[2]._attributes.val._value).toString()
//     return [no, total, yes]
// }

// async function fetchVoter() {
//     let caller = await getPublicKey();
//     let voter = accountToScVal(caller);
//     let result = await contractInt(caller, 'view_voter', [voter]);
//     let selected = (result._value[0]._attributes.val._value).toString();
//     let time = (result._value[1]._attributes.val._value).toString();
//     let votes = (result._value[2]._attributes.val._value).toString();
//     return [selected, time, votes]
// }

async function deposit_token(duration : any, amount : any) {
    let token = "CDLZFC3SYJYDZT7K67VZ75HPJVIEUVNIXF47ZG2FB2RMQQVU2HHGCYSC"
    let caller = await getPublicKey();
    let voter = accountToScVal(caller);
    let newToken = accountToScVal(token);
    let values = [u64ToScVal(duration), i128ToScVal(amount), voter, newToken];
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






export {  deposit_token, withdraw_token, view_all_agreement };