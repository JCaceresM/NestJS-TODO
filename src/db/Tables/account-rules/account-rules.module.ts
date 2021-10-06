import { forwardRef, Module } from '@nestjs/common';
import { AccountRulesService } from './account-rules.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountRule } from './entities/account-rule.entity';
import { AuthModule } from 'src/auth/auth.module';
import { RolesModule } from '../roles/roles.module';

@Module({
  imports: [forwardRef(() => RolesModule),TypeOrmModule.forFeature([AccountRule]), ],

  providers: [AccountRulesService],
  exports: [AccountRulesService],
})
export class AccountRulesModule {}
