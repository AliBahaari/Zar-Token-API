import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { WalletService } from './wallet.service';
import { CreateWalletDto } from './dtos/create-wallet-dto';

@Controller('wallet')
export class WalletController {
  constructor(private readonly walletService: WalletService) {}

  @Post('create')
  async handleCreate(@Body() createWalletDto: CreateWalletDto) {
    return await this.walletService.create(createWalletDto);
  }

  @Get('getBalance/:walletAddress')
  async getBalance(@Param('walletAddress') walletAddress: string) {
    return await this.walletService.getBalance(walletAddress);
  }
}
