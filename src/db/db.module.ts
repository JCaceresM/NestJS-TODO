import { Module } from '@nestjs/common';
import { AccountRulesModule } from './Tables/account-rules/account-rules.module';
import { RolesModule } from './Tables/roles/roles.module';
import { TodosModule } from './Tables/todos/todos.module';
import { UsersModule } from './Tables/users/users.module';


@Module({
  imports: [UsersModule,TodosModule,  RolesModule,
    AccountRulesModule,],
  exports: [UsersModule, TodosModule, RolesModule,
    AccountRulesModule,],
})
export class DatabaseEntitiesModule {}
