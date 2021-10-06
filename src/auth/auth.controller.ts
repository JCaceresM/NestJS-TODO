import { Controller, Post, UseGuards, Request, UsePipes } from '@nestjs/common';
import { JoiValidationPipe } from 'src/common/utils/validations/JoinValidationPipe';
import { schemaLogin } from 'src/schemaValidation/login/login.schema';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @UsePipes(new JoiValidationPipe(schemaLogin))
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }
}
