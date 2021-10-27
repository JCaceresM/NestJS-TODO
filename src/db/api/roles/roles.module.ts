import { forwardRef, Module } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';
import { RoleEntity } from './entities/role.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleMapper } from './roles.mapper';

@Module({
  imports: [TypeOrmModule.forFeature([RoleEntity])],

  controllers: [RolesController],
  providers: [RolesService,RoleMapper],
  exports: [RolesService],
})
export class RolesModule {}
