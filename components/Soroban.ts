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
import { amountAtom, durationAtom , idAtom} from '@/store/atoms/token';
import { useRecoilValue } from 'recoil';
import { priceAtom, offerIdAtom } from '@/store/atoms/offer'; 

const accountToScVal = (account : any) => new Address(account).toScVal();

const stringToSymbol = (value : any) => {
    return nativeToScVal(value, { type: "symbol" })
}

let rpcUrl = "https://soroban-testnet.stellar.org";
let contractAddress = 'CCJHM62AXEN3FAQCU4KBEPZT72PHLV6FHVFWQ57MHCLEG5CUMQ5QZOL7';


// const amount = useRecoilValue(amountAtom);
// const duration = useRecoilValue(durationAtom);





let params = {
    fee: BASE_FEE,
    networkPassphrase: Networks.TESTNET
}

async function contractInt(caller : any, functName : any, values : any) {
    console.log(`caller: ${caller}`)
    const provider = new SorobanRpc.Server(rpcUrl, { allowHttp: true });
    console.log(`provider: ${provider}`)
    const contract = new Contract(contractAddress);
    console.log(`contract: ${contract}`)
    const sourceAccount = await provider.getAccount(caller);
    console.log(`sourceAccount: ${sourceAccount}`)
    let buildTx;

    if (values == null) {
        console.log(functName)

        buildTx = new TransactionBuilder(sourceAccount, params)
        .addOperation(contract.call(functName))
        .setTimeout(30).build();
    }
    else {
        buildTx = new TransactionBuilder(sourceAccount, params)
        .addOperation(contract.call(functName, ...values))
        .setTimeout(30).build();
    }
    let _buildTx = await provider.prepareTransaction(buildTx);
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



// async function fetchVoter() {
//     let caller = await getPublicKey();
//     let voter = accountToScVal(caller);
//     let result = await contractInt(caller, 'view_voter', [voter]);
//     //@ts-ignore

//     let selected = (result._value[0]._attributes.val._value).toString();
//     //@ts-ignore

//     let time = (result._value[1]._attributes.val._value).toString();
//     //@ts-ignore

//     let votes = (result._value[2]._attributes.val._value).toString();
//     return [selected, time, votes]
// }

// async function vote(value : any) {
//     let caller = await getPublicKey();
//     let selected = stringToSymbol(value);
//     let voter = accountToScVal(caller);
//     let values = [voter, selected];
//     let result = await contractInt(caller, 'record_votes', values);
//     return result;
// }

async function depositTokens(){
 
    let caller = await getPublicKey();
    console.log(`caller: ${caller}`)
    let depositor = accountToScVal(caller);
    console.log(`depositor: ${depositor}`)
    let values = [1,1,depositor];
    console.log(`values: ${values}`)
    let result = await contractInt(caller, 'deposit_token', values);
    console.log(`result: ${result}`)
    return result;
}

async function withdrawTokens(){
const id = useRecoilValue(idAtom);

    let caller = await getPublicKey();
    console.log(caller)

    let result = await contractInt(caller, 'withdraw_token', id);
    return result;
}

// async function sellYield(value : any){
//     let caller = await getPublicKey();
//     value = [id, price];
//     let result = await contractInt(caller, 'buy_yield', value);
//     return result;
// }

// async function buyYield(){
//     let caller = await getPublicKey();
//     let result = await contractInt(caller, 'sell_yield', offerId);
//     return result;
// }






export { depositTokens, withdrawTokens};