import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsDate, IsEmail, } from 'class-validator';
import { RoleEntity } from '../../roles/entities/role.entity';

export class CreateUserDto {
  @IsString()
  @ApiProperty()
  user_id: number;

  @IsString()
  @ApiProperty()
  username: string;

  @IsString()
  @ApiProperty()
  password: string;

  @IsEmail()
  @ApiProperty()
  email: string;

  @IsDate()
  @ApiProperty()
  created_on: Date;
 
  @ApiProperty()
  permission: RoleEntity[]

  @IsDate()
  @ApiProperty()
  last_login: Date;
}

export enum Role {
  ADMIN = 'admin',
  CHIEFEDITOR = 'chiefeditor',    
  EDITOR = 'editor',
  USER = 'user'
}