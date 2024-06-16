Welcome to DeBank -> A decentralised safe yet profitable investment solution

All the irregularities in ROI in investments with the likes of equity and crypto trading deBank aims to give a stable interest rate on your investments. But you might be wondering that you can also earn stable ROI by depositing your money to the bank but banks hardly give 3-4 % interest rate. On the otherside we aim to give 6-9 % rate of interest. But you can also earn that through fixed deposit right ? WRONG fixed deposit charges you a hefty fee if you want to take out the money before maturity.

But how does DeBank solves that. We have a simple user workflow the user deposits their token and in exchange get an agreement. After the maturity of the agreement user can withdraw the token with the interest rate. BUT WHAT IF I WANT TO WITHDRAW BEFORE MATURITY ? Don't worry we got you covered . We have a secondary market where you can sell your agreement and the person you sell to becomes the owner of the agreement. Now oviously you won't get as much money as you were initially getting through withdrawl but it will be pretty useful in case of emergency.



![alt text](Untitled(2).png)

how to start the file 

install node, npm and other dependency

install all dependency needed by stellar from [text](https://developers.stellar.org/docs/smart-contracts/getting-started/setup)

clone the repo 

npm install

npm run dev

go to the smart-contract/DeBank

add the testnet 

soroban network add \
  --global testnet \
  --rpc-url https://soroban-testnet.stellar.org:443 \
  --network-passphrase "Test SDF Network ; September 2015"


get key

soroban keys generate --global alice --network testnet


soroban contract build

cargo build --target wasm32-unknown-unknown --release

soroban contract optimize --wasm target/wasm32-unknown-unknown/release/hello_world.wasm

soroban contract deploy \
  --wasm target/wasm32-unknown-unknown/release/hello_world.wasm \
  --source alice \
  --network testnet


  ![alt text](<Screenshot 2024-06-16 at 7.47.30 PM.png>) 
  ![alt text](<Screenshot 2024-06-16 at 7.47.21 PM.png>) 
  ![alt text](<Screenshot 2024-06-16 at 7.47.12 PM.png>) 
  ![alt text](<Screenshot 2024-06-16 at 7.47.03 PM.png>)