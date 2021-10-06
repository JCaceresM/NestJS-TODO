import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('accounts')
export class User {
  @PrimaryGeneratedColumn()
  readonly user_id: number | string;

  @Column()
  readonly username: string;

  @Column()
  readonly password: string;

  @Column()
  readonly email: string;

  @Column()
  readonly created_on: Date;
  

  @Column()
  readonly last_login: Date;

  @Column()
  readonly status: string;

  constructor(
    user_id: number,
    username: string,
    password: string,
    email: string,
    created_on: Date,
    last_login: Date,
    status: string,
  ) {
    this.user_id = user_id;
    this.email = email;
    this.password = password;
    this.username = username;
    this.created_on = created_on;
    this.last_login = last_login;
    this.status = status;
  }
}
