import { IsString, IsDate, IsEmail, } from 'class-validator';
import { RoleDto } from '../../roles/dto/role.dto';
import { RoleEntity } from '../../roles/entities/role.entity';

export class CreateUserDto {
  @IsString()
  user_id: number;


  @IsString()
  username: string;

  @IsString()
  password: string;

  @IsEmail()
  email: string;

  @IsDate()
  created_on: Date;
 
  permission: RoleEntity[]

  @IsDate()
  last_login: Date;
}

export enum Role {
  ADMIN = 'admin',
  CHIEFEDITOR = 'chiefeditor',    
  EDITOR = 'editor',
  USER = 'user'
}