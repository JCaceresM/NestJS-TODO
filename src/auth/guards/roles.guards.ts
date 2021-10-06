import { CanActivate, ExecutionContext, forwardRef, Inject, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Login } from 'src/common/types/login.interfaces';
import { AccountRulesService } from 'src/db/Tables/account-rules/account-rules.service';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector,

    @Inject(forwardRef(() => AccountRulesService))
    private  accountRulesService: AccountRulesService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    console.log(roles);
    if (!roles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const user: Login = request.user;
    const userRoles = await this.accountRulesService.findUserRoles(user.user_id)
    const hasRole = () =>
      userRoles.some(role => !!roles.find(item => item.toLocaleLowerCase() === role.role_name.toLocaleLowerCase()));

    return  user &&  userRoles.length && hasRole();
  }
}