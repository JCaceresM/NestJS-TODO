import { PartialType } from '@nestjs/swagger';
import { CreateAccountRuleDto } from './create-account-rule.dto';

export class UpdateAccountRuleDto extends PartialType(CreateAccountRuleDto) {}
