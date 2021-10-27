import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Login } from 'src/common/types/login.types';
import { GetUserDto } from 'src/db/api/users/dto/get-user.dto';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
      super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.SECRET,
    });
   
  }

  async validate(payload: Login) {
    return { user_id: payload.user_id, username: payload.username };
  }
}
