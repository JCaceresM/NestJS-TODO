
import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigDBModule } from 'src/config/getterConfig.module';
import { AppConfigService } from 'src/config/getterConfig.service';
import { UsersModule } from 'src/db/api/users/users.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { RolesGuard } from './guards/roles.guards';
import { JWTConfigEnum } from './jwt.key';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';

@Module({
  imports: [
    ConfigDBModule,
    UsersModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigDBModule],
      useFactory: async (_appConfigService: AppConfigService) => {
      
        
        return {
          secret: _appConfigService.get(JWTConfigEnum.SECRET),
          signOptions: {
            expiresIn:  _appConfigService.get(JWTConfigEnum.EXPIRESIN) ,algorithm:'HS512'
          },
        };
      },
      inject: [AppConfigService],
    }),
  ],
  providers: [AuthService, LocalStrategy,RolesGuard, JwtStrategy],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
