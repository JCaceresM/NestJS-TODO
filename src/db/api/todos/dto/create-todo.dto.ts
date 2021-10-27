import { ApiProperty } from '@nestjs/swagger';
export class CreateTodoDto {
  @ApiProperty()
  readonly todo_id: number;

  @ApiProperty()
  readonly title: string;

  @ApiProperty()
  readonly description: string;

  @ApiProperty()
  readonly status: string;

  @ApiProperty()
  readonly user_id: number;

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
