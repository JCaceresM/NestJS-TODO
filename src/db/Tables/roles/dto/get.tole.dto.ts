import { PartialType } from '@nestjs/swagger';
import { RoleDto } from './role.dto';

export class GetRoleDto extends PartialType(RoleDto) {}
