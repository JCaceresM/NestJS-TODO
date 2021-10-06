import { IsString, IsDate, IsEmail } from 'class-validator';

export class CreateUserDto {
  @IsString()
  user_id: string;


  @IsString()
  username: string;

  @IsString()
  password: string;

  @IsEmail()
  email: string;

  @IsDate()
  created_on: Date;

 

  @IsDate()
  last_login: Date;
}

export enum Role {
  ADMIN = 'admin',
  CHIEFEDITOR = 'chiefeditor',    
  EDITOR = 'editor',
  USER = 'user'
}