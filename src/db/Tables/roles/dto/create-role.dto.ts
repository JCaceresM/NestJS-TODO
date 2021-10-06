import { IsString, IsDate, IsEmail } from 'class-validator';

export class CreateRoleDto {
  @IsString()
  role_name: string;

}
