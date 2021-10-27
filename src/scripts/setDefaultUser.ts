import { getRepository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { User } from 'src/db/api/users/entities/user.entity';
import { RoleEntity } from 'src/db/api/roles/entities/role.entity';

const setDefaultUser = async (config: ConfigService) => {
  const userRepository = getRepository<User>(User);
  const rolesRepository = getRepository<RoleEntity>(RoleEntity);
  let defaultRoles = await rolesRepository.find();
  const defaultUser = await userRepository.find({
    email: config.get<string>('DEFAULT_USER_EMAIL'),
    username: config.get<string>('DEFAULT_USER_NAME'),
  });
  if (!defaultRoles.length) {
    const roles = JSON.parse(config.get<string>('DEFAULT_ROLES')).map(
      (role: string) => {
        return rolesRepository.create({
          status: 'A',
          role_name: role,
        });
      },
    );
    return await rolesRepository.save(roles);
  }
  defaultRoles = await rolesRepository.find();
  if (!defaultUser.length && !!defaultRoles.length) {
    const adminRoles = await rolesRepository.find({role_name:"ADMIN"})
    const adminUser = userRepository.create({
      status: 'A',
      username: config.get<string>('DEFAULT_USER_NAME'),
      email: config.get<string>('DEFAULT_USER_EMAIL'),
      password: config.get<string>('DEFAULT_USER_PASSWORD'),
      permission: adminRoles,
    });

    return await userRepository.save(adminUser);
  }
};

export default setDefaultUser;
