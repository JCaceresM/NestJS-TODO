import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppConfigService } from './config/getterConfig.service';
import { AuthModule } from './auth/auth.module';
import { DatabaseProviderModule } from './db/db.provider';
import { RolesModule } from './db/Tables/roles/roles.module';
import { AccountRulesModule } from './db/Tables/account-rules/account-rules.module';

@Module({
  imports: [
    AuthModule,
    DatabaseProviderModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${
        process.env.NODE_ENV ? process.env.NODE_ENV : 'development'
      }`,
      cache: true,
    }),
   
    
   
  ],

  providers: [
    AppConfigService,
  ],
})
export class AppModule {
  static port: number | string;
  constructor(private readonly _configService: AppConfigService) {
    AppModule.port = this._configService.get('APP_PORT');
  }
}
