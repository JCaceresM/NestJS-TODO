export interface Login {
  username: string;
  user_id: number ;
}
import { ApiProperty } from '@nestjs/swagger';
import { IsString, } from 'class-validator';

export class Credentials {
  @IsString()
  @ApiProperty()
  username: string;

  @IsString()
  @ApiProperty()
  password: string;
}