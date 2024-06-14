import { requestAccess, signTransaction, setAllowed } from "@stellar/freighter-api";

async function checkConnection() {
    const isAllowed = await setAllowed()
    if(isAllowed){
        return isAllowed
    }
}

const retrievePublicKey = async () => {
    let publickey = "";
    let error = "";

    try {
        publickey = await requestAccess();
    }catch(e) {
        //@ts-ignore
        error = e;
    }

    if(error){
        return error;
    }

    return publickey;
}

const userSignTransaction = async (xdr : any,network : any,signWith : any) => {
    let signedTransaction = "";
    let error = "";
  
    try {
      signedTransaction = await signTransaction(xdr, {
        network,
        accountToSign: signWith,
      });
    } catch (e) {
        //@ts-ignore
      error = e;
    }
  
    if (error) {
      return error;
    }
  
    return signedTransaction;
  };

export { checkConnection , retrievePublicKey, userSignTransaction}