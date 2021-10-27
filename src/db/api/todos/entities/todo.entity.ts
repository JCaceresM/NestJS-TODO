import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, } from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity('todos')
export class Todo {
    @PrimaryGeneratedColumn()
    todo_id: number;

  @Column()
  title: string;

  @Column()
  status: string;

  @Column()
  description: string;

  @ManyToOne(() => User, (author: User) => author.TODO)
  public author: User;

  @Column()
  created_on: Date;

  @Column()
  IsDisabled: boolean;
}
