
import { IsString, IsDate } from 'class-validator';

export class CreateAccountRuleDto {
  @IsString()
  user_id: number;

  @IsString()
  role_id: number;
  
  @IsDate()
  grant_date: Date;
}
