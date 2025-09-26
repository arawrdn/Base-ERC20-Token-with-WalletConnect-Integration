import { ethers } from 'ethers';
import fs from 'fs';

// ===== CONFIGURATION =====
const RPC_URL = 'https://mainnet.base.org'; // Base network RPC
const PRIVATE_KEY = 'YOUR_PRIVATE_KEY_HERE'; // Owner wallet private key
const CONTRACT_PATH = './contracts/WalletConnectV4.sol';

async function main() {
    // 1. Connect to Base network
    const provider = new ethers.providers.JsonRpcProvider(RPC_URL);
    const wallet = new ethers.Wallet(PRIVATE_KEY, provider);

    console.log('Wallet connected:', wallet.address);

    // 2. Compile contract using solc-js
    const solc = require('solc');
    const source = fs.readFileSync(CONTRACT_PATH, 'utf8');
    const input = {
        language: 'Solidity',
        sources: {
            'WalletConnectV4.sol': { content: source }
        },
        settings: {
            outputSelection: {
                '*': {
                    '*': ['abi', 'evm.bytecode']
                }
            },
            optimizer: { enabled: true, runs: 200 }
        }
    };

    const output = JSON.parse(solc.compile(JSON.stringify(input)));
    const contractFile = output.contracts['WalletConnectV4.sol']['WalletConnectV4'];

    const abi = contractFile.abi;
    const bytecode = contractFile.evm.bytecode.object;

    // 3. Deploy contract
    const factory = new ethers.ContractFactory(abi, bytecode, wallet);
    console.log('Deploying WalletConnectV4...');
    const contract = await factory.deploy();
    await contract.deployed();

    console.log('Contract deployed at:', contract.address);
}

main().catch(console.error);
