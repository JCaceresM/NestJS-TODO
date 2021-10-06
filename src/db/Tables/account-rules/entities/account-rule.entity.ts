import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('account_roles')
export class AccountRule {
  @PrimaryGeneratedColumn()
  readonly role_id: number ;

  @Column()
  readonly user_id: number;

  @Column()
  grant_date: Date;

  constructor(role_id: number , user_id: number, grant_date: Date) {
    this.role_id = role_id;
    this.user_id = user_id;
    this.grant_date = grant_date;
  }
}
