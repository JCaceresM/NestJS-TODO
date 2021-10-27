import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { TodosService } from './todos.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { JoiValidationPipe } from 'src/common/utils/validations/JoinValidationPipe';
import { SchemaCreateUpdateTODO } from 'src/schemaValidation/todos/todos.schemas';
import { ApiHeader, ApiResponse, ApiTags } from '@nestjs/swagger';


@Controller('todos')
@UseGuards(JwtAuthGuard)
@ApiTags('todos')
@ApiHeader({
  name: 'Authentication',
  description: 'Bearer token',
})
@ApiResponse({ status: 403, description: 'Forbidden.'})
@ApiResponse({ status: 401, description: 'Unauthenticated.'})
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @Post('new_TODO')
  @ApiResponse({ status: 201, description: 'The record has been successfully saved'})
  create(@Body(new JoiValidationPipe(SchemaCreateUpdateTODO)) createTodoDto: CreateTodoDto) {
    return this.todosService.create(createTodoDto);
  }

  @Get('all')
  @ApiResponse({ status: 200, description: 'The records has been successfully got'})
  findAll() {
    return this.todosService.findAll();
  }

  @Get(':id')
  @ApiResponse({ status: 200, description: 'The record has been successfully got'})
  findOne(@Param('id') id: number) {
    return this.todosService.findOne(id);
  }

  @Patch(':id')
  @ApiResponse({ status: 200, description: 'The record has been successfully updated'})
  update(@Param('id') id: string, @Body(new JoiValidationPipe(SchemaCreateUpdateTODO)) updateTodoDto: UpdateTodoDto) {
    return this.todosService.update(+id, updateTodoDto);
  }

  @Delete(':id')
  @ApiResponse({ status: 200, description: 'The record has been successfully deleted'})
  remove(@Param('id') id: number) {
    return this.todosService.remove(id);
  }
}
