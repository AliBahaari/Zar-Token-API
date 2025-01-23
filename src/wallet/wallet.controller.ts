import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { WalletService } from './wallet.service';
import { CreateWalletDto } from './dtos/create-wallet-dto';
import { MintWalletDto } from './dtos/mint-wallet-dto';

@Controller('wallet')
export class WalletController {
  constructor(private readonly walletService: WalletService) {}

  @Post('create')
  async handleCreate(@Body() createWalletDto: CreateWalletDto) {
    return await this.walletService.handleCreate(createWalletDto);
  }

  @Post('mint')
  async handleMint(@Body() mintWalletDto: MintWalletDto) {
    return await this.walletService.handleMint(mintWalletDto);
  }

  @Get('getBalance/:walletAddress')
  async getBalance(@Param('walletAddress') walletAddress: string) {
    return await this.walletService.getBalance(walletAddress);
  }
}
