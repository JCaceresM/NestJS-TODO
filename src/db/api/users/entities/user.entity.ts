import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Todo } from '../../todos/entities/todo.entity';
import { Role } from '../dto/create-user.dto';
import { RoleEntity } from '../../roles/entities/role.entity';

@Entity('accounts')
export class User {
  @PrimaryGeneratedColumn()
  readonly user_id: number ;

  @Column()
  readonly username: string;

  @Column()
  password: string;

  @Column()
  readonly email: string;

  @CreateDateColumn()
  readonly created_on: Date;

  @UpdateDateColumn()
  readonly last_login: Date;

  @OneToMany(() => Todo, (todo: Todo) => todo.author)
  public TODO: Todo[];

  @Column()
  readonly status: string;

  @ManyToMany(() => RoleEntity, (role: RoleEntity) => role.user)
  @JoinTable()
  public permission: RoleEntity[];

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    const saltOrRounds = 10;
    if (!this.password) {
      return;
    }
    this.password = await bcrypt.hash(this.password, saltOrRounds);
  }
  // constructor(
  //   user_id: number,
  //   username: string,
  //   password: string,
  //   email: string,
  //   created_on: Date,
  //   last_login: Date,
  //   status: string,
  // ) {
  //   this.user_id = user_id;
  //   this.email = email;
  //   this.password = password;
  //   this.username = username;
  //   this.created_on = created_on;
  //   this.last_login = last_login;
  //   this.status = status;
  // }
}
