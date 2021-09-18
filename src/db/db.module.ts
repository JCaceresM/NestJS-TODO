import { Module } from '@nestjs/common';
import { TodosModule } from './Tables/todos/todos.module';
import { UsersModule } from './Tables/users/users.module';


@Module({
  imports: [UsersModule,TodosModule, ],
  exports: [UsersModule, TodosModule,],
})
export class DatabaseEntitiesModule {}
