import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { mnemonicNew, mnemonicToPrivateKey } from '@ton/crypto';
import { WalletContractV4 } from '@ton/ton';
import { Wallet, ethers } from 'ethers';
import { CreateWalletDto } from './dtos/create-wallet-dto';
import { Zar } from './abis/Zar';
import { ZKCoin } from './abis/ZKCoin';
import { Pars } from './abis/Pars';
import { MintWalletDto } from './dtos/mint-wallet-dto';

@Injectable()
export class WalletService {
  async handleCreate(createWalletDto: CreateWalletDto) {
    if (createWalletDto.fullName === '') {
      throw new HttpException('Full Name Is Required', HttpStatus.BAD_REQUEST);
    }
    // TON
    const tonMnemonics = await mnemonicNew();
    const keyPair = await mnemonicToPrivateKey(tonMnemonics);
    const workchain = 0;
    const tonWallet = WalletContractV4.create({
      workchain,
      publicKey: keyPair.publicKey,
    });

    // ETH
    const ethWallet = Wallet.createRandom();

    // Wallets Info
    const walletsInfo = {
      ton: {
        mnemonics: tonMnemonics,
        publicKey: keyPair.publicKey.toString('base64url'),
        privateKey: keyPair.secretKey.toString('base64url'),
        address: tonWallet.address,
      },
      eth: {
        mnemonics: ethWallet.mnemonic.phrase,
        publicKey: ethWallet.publicKey,
        privateKey: ethWallet.privateKey,
        address: ethWallet.address,
      },
    };

    return {
      fullName: createWalletDto.fullName,
      walletsInfo: JSON.stringify(walletsInfo),
    };
  }

  async handleMint(mintWalletDto: MintWalletDto) {
    if (mintWalletDto.walletAddress === '') {
      throw new HttpException(
        'Wallet Address Is Required',
        HttpStatus.BAD_REQUEST,
      );
    } else if (mintWalletDto.amount === '') {
      throw new HttpException('Amount Is Required', HttpStatus.BAD_REQUEST);
    } else if (
      mintWalletDto.type !== 'Zar' &&
      mintWalletDto.type !== 'ZKCoin' &&
      mintWalletDto.type !== 'Pars'
    ) {
      throw new HttpException(
        'Type Is Wrong Or Not Specified',
        HttpStatus.BAD_REQUEST,
      );
    }
    const provider = new ethers.JsonRpcProvider(
      'https://polygon-mainnet.g.alchemy.com/v2/Cp-fTeAYx1ecirS6Jf4m_tWzJtVOdYPQ',
    );

    const privateKey =
      '0xb9c2dc8e60dd852edf63251bcfe3832bae302a22acb2a68c67c5732c28bda179';
    const wallet = new Wallet(privateKey, provider);
    const contract = null;
    if (mintWalletDto.type === 'Zar') {
      new ethers.Contract(Zar.contractAddress, Zar.abi, wallet);
    } else if (mintWalletDto.type === 'ZKCoin') {
      new ethers.Contract(ZKCoin.contractAddress, ZKCoin.abi, wallet);
    } else if (mintWalletDto.type === 'Pars') {
      new ethers.Contract(Pars.contractAddress, Pars.abi, wallet);
    }

    const successBlock = {
      txHash: '',
      receipt: '',
    };

    try {
      const recipient = mintWalletDto.walletAddress;
      const amount = ethers.parseEther(mintWalletDto.amount);

      const tx = await contract.mint(recipient, amount);
      const receipt = await tx.wait();

      successBlock.txHash = tx.hash;
      successBlock.receipt = receipt;
    } catch (error) {
      throw new HttpException(
        `Error During Minting: ${error.message}`,
        HttpStatus.BAD_REQUEST,
      );
    }

    return successBlock;
  }

  async getBalance(walletAddress: string) {
    if (walletAddress === '') {
      throw new HttpException(
        'Wallet Address Is Required',
        HttpStatus.BAD_REQUEST,
      );
    }
    // ETH
    const provider = new ethers.JsonRpcProvider(
      'https://polygon-mainnet.g.alchemy.com/v2/Cp-fTeAYx1ecirS6Jf4m_tWzJtVOdYPQ',
    );

    const zarContract = new ethers.Contract(
      Zar.contractAddress,
      Zar.abi,
      provider,
    );
    const zkCoinContract = new ethers.Contract(
      ZKCoin.contractAddress,
      ZKCoin.abi,
      provider,
    );
    const parsContract = new ethers.Contract(
      Pars.contractAddress,
      Pars.abi,
      provider,
    );

    try {
      const contractBalances = {
        zarBalance: ethers.formatEther(
          await zarContract.balanceOf(walletAddress),
        ),
        zkCoinBalance: ethers.formatEther(
          await zkCoinContract.balanceOf(walletAddress),
        ),
        parsBalance: ethers.formatEther(
          await parsContract.balanceOf(walletAddress),
        ),
      };

      return contractBalances;
    } catch (error) {
      throw new HttpException(
        `Error During Getting Balance: ${error.message}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
