import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { DatabaseProviderModule } from './db/db.provider';
import { AppConfigService } from './config/getterConfig.service';


@Module({
  imports: [
    DatabaseProviderModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV? process.env.NODE_ENV: 'development'}`,
      cache: true,
    }),
    
  ],
    
    providers: [AppConfigService],
})
export class AppModule {
  static port: number | string;
  constructor(private readonly _configService: AppConfigService) {
    AppModule.port = this._configService.get("APP_PORT");
   
  }
}