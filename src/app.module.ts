import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WalletModule } from './wallet/wallet.module';
import { KeyModule } from './key/key.module';
import { WalletEntity } from './wallet/entities/wallet.entity';
import { KeyEntity } from './key/entities/key.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'zar_token_api',
      entities: [WalletEntity, KeyEntity],
      synchronize: true,
    }),

    WalletModule,
    KeyModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
