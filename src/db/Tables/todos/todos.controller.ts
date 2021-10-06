import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { TodosService } from './todos.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { JoiValidationPipe } from 'src/common/utils/validations/JoinValidationPipe';
import { SchemaCreateUpdateTODO } from 'src/schemaValidation/todos/todos.schemas';

@Controller('todos')
@UseGuards(JwtAuthGuard)
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @Post('new_TODO')
  create(@Body(new JoiValidationPipe(SchemaCreateUpdateTODO)) createTodoDto: CreateTodoDto) {
    return this.todosService.create(createTodoDto);
  }

  @Get('all')
  findAll() {
    return this.todosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.todosService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body(new JoiValidationPipe(SchemaCreateUpdateTODO)) updateTodoDto: UpdateTodoDto) {
    return this.todosService.update(+id, updateTodoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.todosService.remove(id);
  }
}
