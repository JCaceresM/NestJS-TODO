import { forwardRef, HttpException, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRoleDto } from '../roles/dto/create-role.dto';
import { GetRoleDto } from '../roles/dto/get.tole.dto';
import { RolesService } from '../roles/roles.service';
import { CreateAccountRuleDto } from './dto/create-account-rule.dto';
import { UpdateAccountRuleDto } from './dto/update-account-rule.dto';
import { AccountRule } from './entities/account-rule.entity';

@Injectable()
export class AccountRulesService {
  constructor(
    @InjectRepository(AccountRule)
    private accountRuleRepo: Repository<AccountRule>,
    @Inject(forwardRef(() => RolesService))
    private RulesServices: RolesService,
  ) {}

  create(createAccountRuleDto: CreateAccountRuleDto) {
    return this.accountRuleRepo.save(createAccountRuleDto);
  }

  findAll() {
    return this.accountRuleRepo.find({});
  }

  findOne(user_id:  number) {
    console.log(user_id);
    
    return this.accountRuleRepo.find({ user_id });
  }
   async findUserRoles(user_id:  number) {
   let userRoles =  await this.accountRuleRepo.find({ user_id });
   const params = userRoles.map((role)=> {
     return { role_id: role.role_id }
   })
  
    
    return await this.RulesServices.findWhere(params)
    //   (await userRoles).map( async (roleRelation)=> {
      
    // const role =  await this.RulesServices.findOne(roleRelation.role_id)
    // // console.log(role);
    
    // return role
    // })
  }

  async update(id: number, updateAccountRuleDto: UpdateAccountRuleDto) {
    const role = await this.accountRuleRepo.findOneOrFail(id);
    if (!role.role_id) {
      throw new HttpException({ status: 404, message: 'User no found' }, 404);
    }
    await this.accountRuleRepo.update(id, updateAccountRuleDto);
    return await this.accountRuleRepo.findOne(id);
  }

 
}
