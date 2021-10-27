import {  Injectable } from '@nestjs/common';
import { UsersService } from 'src/db/api/users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Login } from 'src/common/types/login.types';
import { JWTExpirationToken } from 'src/common/utils/date/extimation.date';
import { GetUserDto } from 'src/db/api/users/dto/get-user.dto';
import { AppConfigService } from 'src/config/getterConfig.service';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService,    private jwtService: JwtService, private appConfigService: AppConfigService
    ) {}
  
  async validateUser(username: string, pass: string): Promise<any> {
    const user =await  this.usersService.findByUserName(username);
    const isMatch =  await bcrypt.compare(pass, user?.password);
    
    if (user && isMatch) {
      return { username: user.username, user_id: user.user_id };
    }
    return null;
  }

  async login(user: Login) {
    
    const payload = { username: user.username, user_id: user.user_id };
    return {
      access_token: this.jwtService.sign(payload),
      expiatedIn: JWTExpirationToken(this.appConfigService.get("EXPIRESIN"))
    };
  }
}
