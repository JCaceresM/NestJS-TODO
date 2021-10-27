import * as path from 'path';
import { DatabaseType } from 'typeorm';
import { Module } from '@nestjs/common';
import {
  TypeOrmModule,
  TypeOrmModuleAsyncOptions,
  TypeOrmModuleOptions,
} from '@nestjs/typeorm';
import { DatabaseEntitiesModule } from './db.module';
import { AppConfigService } from '../config/getterConfig.service';
import { ConfigDBModule } from '../config/getterConfig.module';
import { ConfigEnum } from '../config/config.keys';
import { join } from 'path';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [DatabaseEntitiesModule, ConfigDBModule],
      useFactory: async (
        _dbConfigService: AppConfigService,
        config: ConfigService,
      ) => {
        return config.get<TypeOrmModuleOptions>(
          _dbConfigService.get(ConfigEnum.TYPEORM_CONFIG),
        );
      },
      inject: [AppConfigService, ConfigService],
    } as TypeOrmModuleAsyncOptions),
  ],
})
export class DatabaseProviderModule {}
