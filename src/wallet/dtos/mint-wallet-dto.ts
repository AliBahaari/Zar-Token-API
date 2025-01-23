import { IsString } from 'class-validator';

export class MintWalletDto {
  @IsString()
  walletAddress: string;

  @IsString()
  amount: string;

  @IsString()
  type: 'Pars' | 'ZKCoin' | 'Zar';
}
