import { forwardRef, Module } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';
import { RoleEntity } from './entities/role.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountRulesModule } from '../account-rules/account-rules.module';
import { RoleMapper } from './roles.mapper';

@Module({
  imports: [forwardRef(() =>AccountRulesModule),TypeOrmModule.forFeature([RoleEntity])],

  controllers: [RolesController],
  providers: [RolesService,RoleMapper],
  exports: [RolesService],
})
export class RolesModule {}
