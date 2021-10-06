import { IsString, IsNumber } from 'class-validator';

export class RoleDto {
  @IsString()
  role_name: string;

  @IsString()
  status: string;

  @IsNumber()
  role_id: number;
  
  constructor(role_name: string, status: string, role_id: number) {
    this.status = status;
    this.role_id = role_id;
    this.role_name = role_name;
  }
}
