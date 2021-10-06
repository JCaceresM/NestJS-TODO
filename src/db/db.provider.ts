import * as path from 'path';
import { DatabaseType } from 'typeorm';
import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import { DatabaseEntitiesModule } from './db.module';
import { AppConfigService } from '../config/getterConfig.service';
import { ConfigDBModule } from '../config/getterConfig.module';
import { DBConfigEnum } from '../config/config.keys';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [DatabaseEntitiesModule,ConfigDBModule],
      useFactory: async (_dbConfigService: AppConfigService) => {
        if (_dbConfigService.get(DBConfigEnum.NODE_ENV) === 'production') {
          return {
            type: 'postgres' as DatabaseType,
            host: _dbConfigService.get(DBConfigEnum.HOST),
            port: _dbConfigService.get(DBConfigEnum.DB_PORT),
            username: _dbConfigService.get(DBConfigEnum.DB_USER),
            password: _dbConfigService.get(DBConfigEnum.DB_PASS),
            database: _dbConfigService.get(DBConfigEnum.DB_NAME),
            entities: [
              path.resolve(__dirname + '/../**/*.entity{.ts,.js}'),
            ],
            autoLoadEntities: true,
          };
        }
        return await {
          type: 'postgres' as DatabaseType,
            host: _dbConfigService.get(DBConfigEnum.HOST),
            port: _dbConfigService.get(DBConfigEnum.DB_PORT),
            username: _dbConfigService.get(DBConfigEnum.DB_USER),
            password: _dbConfigService.get(DBConfigEnum.DB_PASS),
            database: _dbConfigService.get(DBConfigEnum.DB_NAME),
          entities: [
            path.resolve(__dirname + '/../**/*.entity{.ts,.js}'),
          ],
          autoLoadEntities: true,
        };
      },
      inject: [AppConfigService],
    } as TypeOrmModuleAsyncOptions),
  ],
 
})
export class DatabaseProviderModule {}
