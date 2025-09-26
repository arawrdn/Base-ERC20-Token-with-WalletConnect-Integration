import { ethers } from 'ethers';
import fs from 'fs';
import WalletConnectProvider from '@walletconnect/web3-provider';

// ===== CONFIGURATION =====
const CONTRACT_ABI = JSON.parse(fs.readFileSync('./WalletConnectV4.abi', 'utf8'));
const CONTRACT_BYTECODE = fs.readFileSync('./WalletConnectV4.bin', 'utf8');
const RPC_URL = 'https://mainnet.base.org'; // Base network RPC

async function main() {
  // 1. Setup WalletConnect provider
  const provider = new WalletConnectProvider({
    rpc: { 8453: RPC_URL }
  });

  // Enable wallet connection (scan QR code)
  await provider.enable();

  // 2. Setup ethers provider and signer
  const web3Provider = new ethers.providers.Web3Provider(provider);
  const signer = web3Provider.getSigner();

  console.log('Wallet connected:', await signer.getAddress());

  // 3. Deploy contract
  const factory = new ethers.ContractFactory(CONTRACT_ABI, CONTRACT_BYTECODE, signer);
  console.log('Deploying WalletConnectV4 contract...');
  const contract = await factory.deploy();
  await contract.deployed();

  console.log('Contract deployed at:', contract.address);
}

main().catch(console.error);
