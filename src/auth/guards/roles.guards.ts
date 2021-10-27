import { CanActivate, ExecutionContext , Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Login } from 'src/common/types/login.types';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector,

   ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!roles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const user: Login = request.user;
    const userRoles = []//await this.accountRulesService.findUserRoles(user.user_id)
    const hasRole = () =>
      userRoles.some(role => !!roles.find(item => item.toLocaleLowerCase() === role.role_name.toLocaleLowerCase()));

    return  user &&  userRoles.length && hasRole();
  }
}