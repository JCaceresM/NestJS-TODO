import { GetRoleDto } from "./dto/get.tole.dto";
import { RoleEntity } from "./entities/role.entity";


export class RoleMapper {
  dtoToEntity(roleDto: GetRoleDto): RoleEntity {
    return new RoleEntity(
      roleDto.role_id,
      roleDto.role_name,
      roleDto.status,
     
    );
  }

  entityToDto(roleEntity: RoleEntity): GetRoleDto {
    return new GetRoleDto(
      roleEntity.role_name,
      roleEntity.status,
      roleEntity.role_id,
    );
  }
}
