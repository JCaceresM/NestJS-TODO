import { Body, HttpException, Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { JoiValidationPipe } from 'src/common/utils/validations/JoinValidationPipe';
import { GetUserDto } from 'src/db/api/users/dto/get-user.dto';
import { schemaLogin } from 'src/schemaValidation/login/login.schema';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super();
  }

  async validate( username: string, password: string): Promise<any> {
    const user = await this.authService.validateUser(username, password);
    if (!user) {      
      throw new HttpException({status:400, message: "credentials Incorrect"},400);
    }

    return user
  }
}
