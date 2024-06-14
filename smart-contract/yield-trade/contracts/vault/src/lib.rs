#![no_std]

use soroban_sdk::{contractimpl, contract, Env, Address, Symbol, symbol_short, contracttype, log};

#[derive(Clone)]
#[contracttype]
pub struct Agreement {
    depositor: Address,
    amount: i128,
    start_time: u64,
    end_time: u64,
    withdrawn: bool,
    
}

#[contracttype]
pub enum Registry {
    Record(Address)  //indexiing based on address
}

const AGREEMENT: Symbol = symbol_short!("AGREEMENT");


#[derive(Clone)]
#[contracttype]
pub struct Offer {
    agreement_id: u64,
    seller: Address,
    price: i128,
    active: bool,
}

// const OFFER: Symbol = symbol_short!("OFFER");


#[contract]
pub struct YieldVault;





#[contractimpl]
impl YieldVault {
    // Initialize the contract with the owner and set the token address to XLM
  

    // Deposit function for XLM and create a agreement
    pub fn deposit_token(env: Env, duration: u64, amount : i128, depositor : Address) -> Symbol{
       let mut agreement = Self::view_agreement(env.clone(),depositor.clone());
       depositor.require_auth();
       let start_time = env.ledger().timestamp();
       let end_time = start_time + duration;

       agreement.amount = amount;
       agreement.start_time = start_time;
       agreement.end_time = end_time;
       agreement.withdrawn = false;
       agreement.depositor = depositor.clone();
       log!(&env, "Count is: {}", start_time);

       env.storage().instance().set(&AGREEMENT, &agreement);
       env.storage().instance().extend_ttl(100, 100);
       log!(&env, "Votes Registered!");
       symbol_short!("Recorded") 
       
    }

    // // Withdraw function for XLM
    // pub fn withdraw_token(env: Env, token : Address)  {
    //     let mut agreement = Self::load_agreement(&env);
    //     agreement.depositor.require_auth();

    //     let duration = agreement.end_time - agreement.start_time; // x blocks , avg 1 block = 4 seconds, x block = 4x seconds, 1 % in 30 days== 30*24*60*60 seconds =  2592000 seconds, in 1 sec % earned is 1/2592000 %, so for x block = 4x * 1/2592000 =
    //     let yield_earned = (agreement.amount ) / 648000 ;
    //     agreement.amount = agreement.amount + yield_earned ;
    //     // Transfer XLM to the depositor
    //    token::Client::new(&env, &token).transfer(
    //         &env.current_contract_address(),
    //         &agreement.depositor,
    //         &agreement.amount,
            
    //     );
       
    // }

    pub fn view_agreement(env: Env,depositor : Address ) -> Agreement {
        
      env.storage().instance().get(&AGREEMENT).unwrap_or(Agreement {
            depositor: depositor,
            amount: 0,
            start_time: 0,
            end_time: 1,
            withdrawn: false,
        })
    }



    // pub fn view_agreement(env: Env, id: i128) -> Record {
    //     env.storage().instance().get(&id).unwrap_or(Record {
    //         selected: symbol_short!("none"),
    //         votes: 0,
    //         time: 0,
    //     })
    // }

    // pub fn sell_yield(env: Env, agreement_id: i128, price: i128) -> Offer {
    //     let agreement: Agreement = env.storage().get(&Symbol::new("agreement_{}", agreement_id)).unwrap();

    //     // Ensure the offer conditions are met
    //     if(agreement.depositor == !env.invoker()){
    //         panic!("Only the depositor can offer the agreement for sale");
    //     }
    //     if(agreement.withdrawn == true){
    //         panic!("Yield has already been withdrawn");
    //     }
      

    //     // Store the offer in the contract storage
    //     let offer = Offer {
    //         agreement_id,
    //         seller: env.invoker(),
    //         price,
    //         active: true,
    //     };
    //     let offer_count: i128 = env.storage().get(&Symbol::new("offer_count")).unwrap_or(0);
    //     env.storage().set(&Symbol::new("offer_{}", offer_count), &offer);
    //     env.storage().set(&Symbol::new("offer_count"), &(offer_count + 1));
    // }

    // Buy a yield agreement from the marketplace
    // pub fn buy_yield(env: Env, offer_id: i128) -> Offer {
        
    //     let offer: Offer = env.storage().get(&Symbol::new(&"offer_{}", offer_id)).unwrap();

    //     // Ensure the buy conditions are met
    //     if(offer.active == false){
    //         panic!("Offer is not active");
    //     }
    //     if(offer.price <= 0){
    //         panic!("Invalid offer price");
    //     }
      

        

    //     // Transfer the yield agreement to the buyer
    //     env.storage().set(&Symbol::new("agreement_{}", offer.agreement_id), &Agreement {
    //         depositor: env.invoker(),
    //         amount: agreement.amount,
    //         start_time: agreement.start_time,
    //         end_time: agreement.end_time,
    //         withdrawn: agreement.withdrawn,
    //     });

    //     // Deactivate the offer
    //     let mut updated_offer = offer.clone();
    //     updated_offer.active = false;
    //     env.storage().set(&Symbol::new(("offer_{}", offer_id)), &updated_offer);
    // }


    // // Additional helper function to get the agreement count (for demonstration)
    // pub fn get_agreement_count(env: Env) -> i128 {
    //     env.storage().get(&Symbol::new("agreement_count")).unwrap_or(0)
    // }

    // // Additional helper function to get an agreement by id (for demonstration)
    // pub fn get_agreement(env: Env, id: i128) -> Agreement {
    //     env.storage().get(&Symbol::new(&format!("agreement_{}", id))).unwrap()
    // }
}
