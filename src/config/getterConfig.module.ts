import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AppConfigService } from './getterConfig.service';

@Module({
   providers: [ConfigService, AppConfigService],
   exports: [ConfigService, AppConfigService],
})
export class ConfigDBModule {}
