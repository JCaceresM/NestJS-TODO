import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('roles')
export class RoleEntity {
  @PrimaryGeneratedColumn()
  readonly role_id: number;

  @Column()
  readonly role_name: string;

  @Column()
  readonly status: string;


  constructor(role_id: number , role_name: string, status:string) {
    this.role_id = role_id;
    this.role_name = role_name;
    this.status = status;
  }
}
