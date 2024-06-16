# Soroban Project

## Project Structure

This repository uses the recommended structure for a Soroban project:
```text
.
├── contracts
│   └── hello_world
│       ├── src
│       │   ├── lib.rs
│       │   └── test.rs
│       └── Cargo.toml
├── Cargo.toml
└── README.md
```

- New Soroban contracts can be put in `contracts`, each in their own directory. There is already a `hello_world` contract in there to get you started.
- If you initialized this project with any other example contracts via `--with-example`, those contracts will be in the `contracts` directory as well.
- Contracts should have their own `Cargo.toml` files that rely on the top-level `Cargo.toml` workspace for their dependencies.
- Frontend libraries can be added to the top-level directory as well. If you initialized this project with a frontend template via `--frontend-template` you will have those files already included.

soroban keys address adarsh
GB4QUOYOIDWYMFQ2SZADXDFDSDEG42EKKZ77D2NEH3K3QZNDIRJWEUDB

soroban contract deploy \
  --wasm target/wasm32-unknown-unknown/release/hello_world.wasm \
  --source adarsh \
  --network testnet
CANEHW2NMJUNOHMR23FHCGSF6YXWYZKCHOHPDOFNJ6P42RUACPHP5HFM

soroban keys address alice
GCO3LXBZDY7D5EHHRYNUKTUSUSM7BXBB6PCVAFVMOEADIRW6TGX6IPBI


soroban contract build 

cargo build --target wasm32-unknown-unknown --release 

soroban contract optimize --wasm target/wasm32-unknown-unknown/release/hello_world.wasm

soroban contract deploy \                                                          --wasm target/wasm32-unknown-unknown/release/hello_world.wasm \
  --source alice \
  --network testnet