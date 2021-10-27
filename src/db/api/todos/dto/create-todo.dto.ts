import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsNumber, IsString, } from 'class-validator';

export class CreateTodoDto {

  @IsNumber()
  @ApiProperty()
  readonly todo_id: number;

  @IsString()
  @ApiProperty()
  readonly title: string;

  @IsString()
  @ApiProperty()
  readonly description: string;

  @IsString()
  @ApiProperty()
  readonly status: string;

  @IsNumber()
  @ApiProperty()
  readonly user_id: number;

  @IsDate()
  @ApiProperty()
  readonly created_on: Date;

  constructor(
    todo_id: number,
    title: string,
    description: string,
    status: string,
    user_id: number,
    created_on: Date,
  ) {
    this.todo_id = todo_id;
    this.created_on = created_on;
    this.description = description;
    this.status = status;
    this.user_id = user_id;
    this.title = title;
  }
}
