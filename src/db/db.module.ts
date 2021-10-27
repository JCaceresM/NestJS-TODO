import { Module } from '@nestjs/common';
import { RolesModule } from './api/roles/roles.module';
import { TodosModule } from './api/todos/todos.module';
import { UsersModule } from './api/users/users.module';

@Module({
  imports: [UsersModule, TodosModule, RolesModule],
  exports: [UsersModule, TodosModule, RolesModule],
})
export class DatabaseEntitiesModule {}
