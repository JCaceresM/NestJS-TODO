import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Todo } from './entities/todo.entity';

@Injectable()
export class TodosService {
constructor(
  @InjectRepository(Todo)
  private TodoRepository: Repository<Todo>,
){}

  create(createTodo: CreateTodoDto) {
    return this.TodoRepository.save(createTodo);
  }

  findAll() {
    return this.TodoRepository.find()
  }

  findOne(id: number) {
    return this.TodoRepository.find({todo_id:id})
  }

  async update(id: number, updateTodoDto: UpdateTodoDto) {
    const todo = await this.TodoRepository.findOneOrFail(id);
    if (!todo.user_id && todo.status != 'A') {
      throw new HttpException({ status: 404, message: 'Todo no found' }, 404);
    }
    await this.TodoRepository.update(id, updateTodoDto);
    return await this.TodoRepository.findOne(id);
  }

  async remove(id: number) {
    const todo = await this.TodoRepository.findOneOrFail(id);
    if (!todo.user_id && todo.status != 'A') {
      throw new HttpException({ status: 404, message: 'Todo no found' }, 404);
    }
    await this.TodoRepository.update(id, {IsDisabled:true});
    return `TODO Deleted`
  }
}


