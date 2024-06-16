#![no_std]

use soroban_sdk::{contractimpl, contract, Env, Address, Symbol, symbol_short,token, contracttype, log};

#[contracttype]
#[derive(Clone)]
pub struct Agreement {
   
    pub owner: Address, //5
    pub token : Address, //9
    pub price : i128, //6
    pub initialAmount: i128, //3
    pub finalAmount : i128, //2
    pub startTime: u64, //7
    pub endTime: u64, //1
    pub withdrawn: bool, //10
    pub onMarket : bool, //4
    pub active : bool, //0
    pub timeLeft : u64, //8
    
}

#[contracttype]
pub enum DataKey {
    AgreementAddress,
    Init,
    
}

const DEPOSIT: Symbol = symbol_short!("DEPOSIT");

#[contract]
pub struct YieldVault;

#[contractimpl]
impl YieldVault {
    // Initialize the contract with the owner and set the token address to XLM
  

    // Deposit function for XLM and create a agreement
    pub fn deposit_token(env: Env, duration: u64, amount : i128, owner : Address, token : Address) -> Symbol{
       if amount <= 0 {
        panic!("Amount must be greater than 0");
       }
       log!(&env, "amount is: {}", amount);


       if Self::is_initialized(&env) {
        panic!("contract has been already initialized");
    }
    log!(&env, "duration is: {}", duration);



    owner.require_auth();

    log!(&env, "owner is: {}", owner);



    let yield_earned = (amount * duration as i128) / 6 ;

    log!(&env, "yield_earned is: {}", yield_earned);


    let final_amount = amount + yield_earned ;

    log!(&env, "final_amount is: {}", final_amount);
    log!(&env, "1 {}",1);


    let token_client = token::Client::new(&env, &token);
    log!(&env, "2 {}", 2);


    let contract_address = env.current_contract_address();
    log!(&env, "3 {}", 3);
    
    log!(&env, "owner {}", owner);
    log!(&env, "contract_address {}", contract_address);
    log!(&env, "amount {}", amount);



    
    token_client.transfer(&owner, &contract_address, &amount);

    log!(&env, "4 {}", 4);

  


    env.storage().instance().set(
        &DataKey::AgreementAddress,
        &Agreement {
            owner,
            token,
            price : 0,
            initialAmount : amount,
            finalAmount : final_amount,
            startTime : env.ledger().timestamp(),
            endTime : env.ledger().timestamp() + duration,
            withdrawn : false,
            onMarket : false,
            active : false,
            timeLeft : duration,
        },
    );

     
    env.storage().instance().set(&DataKey::Init, &());
    env.storage().instance().extend_ttl(100, 100);


    log!(&env, "Token Registered!");
    symbol_short!("Recorded") 
  

    }

    pub fn withdraw_token(env: Env, owner : Address, token : Address) -> Symbol{
        owner.require_auth();

        let mut agreement: Agreement =
        env.storage().instance().get(&DataKey::AgreementAddress).unwrap();

        if agreement.withdrawn == true{
            panic!("Yield has already been withdrawn");
        }

        if agreement.endTime < env.ledger().timestamp(){
            panic!("Yield has not matured yet");
        }



        token::Client::new(&env, &token).transfer(
            &env.current_contract_address(),
            &owner,
            &agreement.finalAmount,
        );

        agreement.withdrawn = true;


        symbol_short!("WITHDRAWN")

    }

    fn is_initialized(env: &Env) -> bool {
        env.storage().instance().has(&DataKey::Init)
        
    }

    pub fn view_all_agreement(env : Env) -> Agreement {
        
        env.storage().instance().get(&DataKey::AgreementAddress).unwrap()

       

    }

    pub fn sell_agreement(env: Env, price: i128, owner : Address, token : Address) -> Agreement {

        owner.require_auth();

        let mut agreement: Agreement =
        env.storage().instance().get(&DataKey::AgreementAddress).unwrap();

        if agreement.withdrawn == true{
            panic!("Yield has already been withdrawn");
        }

        if agreement.endTime >= env.ledger().timestamp(){
            panic!("Yield has been matured");
        }

        if price <= 0 {
            panic!("Price must be greater than 0");
        }

        if price >= agreement.finalAmount {
            panic!("Price must be less than the final amount");
        }

        agreement.onMarket = true;
        agreement.price = price;
        agreement.active = true;

        

        env.storage().instance().set(&DataKey::Init, &());
        env.storage().instance().extend_ttl(100, 100);

        env.storage().instance().get(&DataKey::AgreementAddress).unwrap()
       
    }

    pub fn show_agreement(env: Env) -> Option<Agreement> {
        let agreement: Agreement =
        env.storage().instance().get(&DataKey::AgreementAddress).unwrap();

        if agreement.onMarket == false {
            return None;
        } else {
            return core::prelude::v1::Some(agreement);
        }

    }

    pub fn show_my_agreement(env: Env, owner : Address) -> Option<Agreement> {
        let agreement: Agreement =
        env.storage().instance().get(&DataKey::AgreementAddress).unwrap();

        if agreement.owner != owner {
            return None;
        } else {
            return core::prelude::v1::Some(agreement);   
        }

    }

    pub fn buy_agreement(env: Env, buyer : Address, token : Address){
        buyer.require_auth();

        let mut agreement: Agreement =
        env.storage().instance().get(&DataKey::AgreementAddress).unwrap();

        if agreement.onMarket == false {
            panic!("Agreement is not on market");
        }

        if agreement.active == false {
            panic!("Agreement is not active");
        }

        if agreement.price <= 0 {
            panic!("Price must be greater than 0");
        }

        if agreement.price >= agreement.finalAmount {
            panic!("Price must be less than the final amount");
        }

        token::Client::new(&env, &token).transfer(
            &agreement.owner,
            &buyer,
            &agreement.price,
        );

        agreement.onMarket = false;
        agreement.active = false;
        agreement.owner = buyer;

        env.storage().instance().set(&DataKey::AgreementAddress, &agreement);
    }

}
