import { forwardRef, HttpException, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Equal, Repository } from 'typeorm';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { RoleEntity } from './entities/role.entity';
import { RoleMapper } from './roles.mapper';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(RoleEntity)
    private roleRepository: Repository<RoleEntity>,
    // @Inject(forwardRef(() => AccountRulesService))
    private mapper: RoleMapper,
  ) {}
  create(createRoleDto: CreateRoleDto) {
    return this.roleRepository.save(createRoleDto);
  }

  findAll() {
    return this.roleRepository.find({ status: Equal('A') });
  }
  findWhere<Generic>(options: Generic[]) {
    return this.roleRepository.find({ where: options });
  }

  async findOne(id: number) {
    const [role] = await this.roleRepository.find({
      where: { role_id: id, status: Equal('A') },
    });
    if (!role) {
      throw new HttpException({ status: 404, message: 'User no found' }, 404);
    }
    return this.mapper.entityToDto(role);
  }
  async findOneByName(name: string) {
    const [role] = await this.roleRepository.find({
      where: { role_name: name, status: Equal('A') },
    });
    if (!role) {
      throw new HttpException({ status: 404, message: 'User no found' }, 404);
    }
    return role;
  }

  async update(id: number, updateRoleDto: UpdateRoleDto) {
    const role = await this.roleRepository.findOneOrFail(id);
    if (!role.role_id && role.status != 'A') {
      throw new HttpException({ status: 404, message: 'User no found' }, 404);
    }
    await this.roleRepository.update(id, updateRoleDto);
    return await this.roleRepository.findOne(id);
  }

  async remove(id: number) {
    const user = await this.findOne(id);
    await this.roleRepository.update(id, { ...user, status: 'D' });
    return { status: 200, massage: `role with id ${id} was deleted` };
  }
}
