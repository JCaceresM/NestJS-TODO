import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity('roles')
export class RoleEntity {
  @PrimaryGeneratedColumn('uuid')
  readonly role_id: number;

  @Column()
  readonly role_name: string;

  @Column()
  readonly status: string;

  @ManyToMany(() => User, (user: User) => user.permission)
  public user: User[];

  constructor(role_id: number , role_name: string, status:string) {
    this.role_id = role_id;
    this.role_name = role_name;
    this.status = status;
  }
}
