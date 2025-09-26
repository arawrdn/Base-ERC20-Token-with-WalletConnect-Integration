# WalletConnectV4

WalletConnectV4 is a minimal ERC20-like token contract designed for the Base network. It features per-wallet mint cap, automatic claim, token transfer, owner burn, and withdraw functionality. This repository contains everything needed for deployment and verification on BaseScan.


## Features

* Total supply: 100,000 tokens
* Maximum per wallet: 5,000 tokens
* `mint()` function with per-wallet cap
* `claim()` function to automatically mint remaining tokens up to cap
* ERC20 `transfer()` and `approve()` functionalities
* Owner can `burn()` tokens from their balance
* Owner can `withdraw()` Rest of Supply from the contract
* Owner can `rescueERC20()` mistakenly sent ERC20 tokens

## Deployment Guide

### Prerequisites

* [Remix IDE](https://remix.ethereum.org) or Node.js + ethers.js for deployment
* Base network wallet (MetaMask or any compatible wallet)

### Deploy via Remix

1. Open Remix IDE and create a new file `contracts/WalletConnectV4.sol`
2. Paste the Solidity code for WalletConnectV4 into the file.
3. Compile the contract:

   * Compiler version: 0.8.30
   * Enable optimization: Yes
   * Runs: 200
4. Deploy the contract:

   * Environment: Injected Provider - MetaMask
   * Network: Base Mainnet (or testnet)
   * Account: select your wallet as owner
   * Click `Deploy` and confirm in wallet
5. Verify the contract on BaseScan:

   * Copy the source code
   * Go to [BaseScan Contract Verify](https://basescan.org/verify)
   * Input contract address, compiler version, optimizer settings, and submit

## Usage

* **mint(amount)**: Mint tokens up to 5,000 per wallet
* **claim()**: Automatically mint remaining tokens up to the wallet cap
* **transfer(to, amount)**: Transfer tokens to another wallet
* **ownerBurn(amount)**: Owner-only burn function
* **withdraw()**: Owner-only withdrawal of native BASE/ETH
* **rescueERC20(tokenAddress, to, amount)**: Owner rescues ERC20 tokens sent to the contract by mistake

## Optional Deployment Script (deploy.js)

```javascript
import { ethers } from 'ethers';
import WalletConnectProvider from '@walletconnect/web3-provider';
import fs from 'fs';

const CONTRACT_ABI = [ /* ABI JSON */ ];
const CONTRACT_BYTECODE = fs.readFileSync('WalletConnectV4.bin');

async function deploy() {
    const provider = new WalletConnectProvider({ rpc: { 8453: 'https://mainnet.base.org' }});
    await provider.enable();
    const web3Provider = new ethers.providers.Web3Provider(provider);
    const signer = web3Provider.getSigner();

    const factory = new ethers.ContractFactory(CONTRACT_ABI, CONTRACT_BYTECODE, signer);
    const contract = await factory.deploy();
    await contract.deployed();
    console.log('Contract deployed at:', contract.address);
}

deploy().catch(console.error);
```

## License

MIT License
